import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import test from 'node:test';
import bcrypt from 'bcryptjs';
import serverless from 'serverless-http';
import type { User } from '@netlify/identity';
import { createExpressApp } from './app';
import { createDatabaseMiddleware, type DatabaseTransaction, type PrepWiseDatabase } from './db';
import { DEFAULT_PLATFORM_SETTINGS, SEED_DEPARTMENTS } from '../src/data/nd2QuestionBank';
import functionHandler, { normalizeApiPath } from '../netlify/functions/api';

async function fixture() {
  const password = crypto.randomUUID();
  const password_hash = await bcrypt.hash(password, 4);
  const now = new Date().toISOString();
  let stored: PrepWiseDatabase = {
    departments: structuredClone(SEED_DEPARTMENTS), courses: [], topics: [], questions: [],
    users: ['admin', 'student'].map((role) => ({
      id: role, email: `${role}@example.test`, full_name: `Test ${role}`,
      role: role as 'admin' | 'student', password_hash,
      department_id: SEED_DEPARTMENTS[0].id, department_name: SEED_DEPARTMENTS[0].name,
      academic_level: 'ND2', preferred_semester: 'Second Semester', study_goal_minutes_daily: 45,
      created_at: now, updated_at: now,
    })),
    auth_sessions: [], exam_attempts: [], student_answers: [], student_progress: [], saved_questions: [],
    ai_learning_history: [], pdf_imports: [], audit_logs: [], platform_settings: structuredClone(DEFAULT_PLATFORM_SETTINGS),
  };
  let failCommit = false;
  let queue = Promise.resolve();
  const transaction: DatabaseTransaction = async (work, shouldCommit) => {
    const previous = queue;
    let release!: () => void;
    queue = new Promise<void>((resolve) => { release = resolve; });
    await previous;
    try {
      const state = { db: structuredClone(stored), dirty: false };
      const result = await work(state);
      if (state.dirty && shouldCommit()) {
        if (failCommit) throw new Error('Simulated unavailable database');
        stored = structuredClone(state.db);
      }
      return result;
    } finally { release(); }
  };
  const createHandler = () => serverless(createExpressApp({ databaseMiddleware: createDatabaseMiddleware(transaction) }), {
    request(req: { identityUser?: User | null }, _event: unknown, context: { user?: User }) {
      req.identityUser = context.user ?? null;
    },
  });
  let handler = createHandler();
  async function request(path: string, options: {
    method?: string; body?: unknown; token?: string; cookie?: string; user?: User; origin?: string;
  } = {}) {
    const result = await handler({
      version: '2.0', rawPath: path, rawQueryString: '',
      requestContext: { http: { method: options.method ?? 'GET', sourceIp: '' } },
      headers: {
        host: 'example.test', 'content-type': 'application/json', 'x-forwarded-proto': 'https',
        ...(options.token ? { authorization: `Bearer ${options.token}` } : {}),
        ...(options.cookie ? { cookie: options.cookie } : {}),
        ...(options.origin ? { origin: options.origin } : {}),
      },
      body: options.body === undefined ? '' : JSON.stringify(options.body), isBase64Encoded: false,
    }, { user: options.user }) as { statusCode: number; headers: Record<string, string>; cookies: string[]; body: string };
    return { status: result.statusCode, headers: result.headers, cookies: [...(result.cookies ?? []), ...(result.headers['set-cookie'] ? [result.headers['set-cookie']] : [])], data: JSON.parse(result.body) };
  }
  return {
    password, request, stored: () => stored,
    restart: () => { handler = createHandler(); },
    failCommit: () => { failCommit = true; },
  };
}

test('admin login normalizes email, restores across function instances, and sets a secure cookie', async () => {
  const app = await fixture();
  const login = await app.request('/api/auth/login', {
    method: 'POST', body: { email: ' ADMIN@EXAMPLE.TEST ', password: app.password, admin_only: true },
  });
  assert.equal(login.status, 200);
  assert.equal(login.data.user.role, 'admin');
  assert.ok(!('password_hash' in login.data.user));
  assert.ok(login.cookies.some((cookie) => /HttpOnly/.test(cookie) && /Secure/.test(cookie) && /Max-Age=604800/.test(cookie) && /SameSite=Lax/.test(cookie)));
  assert.ok(app.stored().auth_sessions[0].token_hash !== login.data.session_token);
  app.restart();
  const me = await app.request('/api/auth/me', { token: login.data.session_token });
  assert.equal(me.status, 200);
  assert.equal(me.data.user.role, 'admin');
  const overview = await app.request('/api/admin/overview', { cookie: login.cookies[0].split(';')[0] });
  assert.equal(overview.status, 200);
  assert.equal(overview.headers['cache-control'], 'no-store');
});

test('student admin login is denied before any session is created', async () => {
  const app = await fixture();
  const denied = await app.request('/api/auth/login', {
    method: 'POST', body: { email: 'student@example.test', password: app.password, admin_only: true },
  });
  assert.equal(denied.status, 403);
  assert.equal(app.stored().auth_sessions.length, 0);
  assert.equal(denied.cookies.length, 0);
  const login = await app.request('/api/auth/login', {
    method: 'POST', body: { email: 'student@example.test', password: app.password },
  });
  assert.equal(login.status, 200);
  assert.equal((await app.request('/api/admin/overview', { token: login.data.session_token })).status, 403);
});

test('invalid credentials and malformed fields return useful client errors', async () => {
  const app = await fixture();
  for (const body of [{}, { email: {}, password: [] }, { email: 'admin@example.test', password: crypto.randomUUID() }]) {
    const result = await app.request('/api/auth/login', { method: 'POST', body });
    assert.ok(result.status === 400 || result.status === 401);
    assert.equal(result.cookies.length, 0);
  }
  assert.equal(app.stored().auth_sessions.length, 0);
});

test('logout revokes the session and expired sessions cannot access admin APIs', async () => {
  const app = await fixture();
  const login = await app.request('/api/auth/login', {
    method: 'POST', body: { email: 'admin@example.test', password: app.password },
  });
  const token = login.data.session_token;
  app.stored().auth_sessions[0].expires_at = new Date(0).toISOString();
  assert.equal((await app.request('/api/admin/overview', { token })).status, 401);
  app.stored().auth_sessions[0].expires_at = new Date(Date.now() + 60000).toISOString();
  assert.equal((await app.request('/api/auth/logout', { method: 'POST', token })).status, 200);
  assert.equal((await app.request('/api/admin/overview', { token })).status, 401);
  assert.equal((await app.request('/api/auth/me', { cookie: login.cookies[0].split(';')[0] })).data.authenticated, false);
});

test('administrator setup stays closed and student registration cannot assign roles', async () => {
  const app = await fixture();
  assert.equal((await app.request('/api/admin/setup', { method: 'POST', body: {} })).status, 403);
  assert.equal((await app.request('/api/admin/setup-status')).data.needs_admin_setup, false);
  const registered = await app.request('/api/auth/register', {
    method: 'POST', body: {
      full_name: 'Test Learner', email: 'learner@example.test', password: app.password,
      academic_level: 'ND2', role: 'admin', app_metadata: { roles: ['admin'] },
    },
  });
  assert.equal(registered.status, 201);
  assert.equal(registered.data.user.role, 'student');
});

test('Identity admin access uses trusted roles and observes role revocation', async () => {
  const app = await fixture();
  const identity: User = { id: 'invited-admin', email: 'invited@example.test', roles: ['admin'] };
  assert.equal((await app.request('/api/admin/overview', { user: identity })).status, 200);
  assert.equal((await app.request('/api/admin/overview', {
    user: { ...identity, roles: [], userMetadata: { roles: ['admin'] } },
  })).status, 403);
  assert.equal((await app.request('/api/admin/overview', {
    user: { ...identity, roles: [], appMetadata: { role: 'student' } },
  })).status, 403);
});

test('administrator roles honor the project role format without trusting editable user metadata', async () => {
  const app = await fixture();
  const identity: User = {
    id: 'configured-admin', email: 'configured@example.test', roles: [],
    appMetadata: { authorization: { roles: ['admin'] } },
  };
  assert.equal((await app.request('/api/admin/overview', { user: identity })).status, 200);
  const denied = await app.request('/api/admin/overview', {
    user: { ...identity, appMetadata: {}, userMetadata: { authorization: { roles: ['admin'] } } },
  });
  assert.equal(denied.status, 403);
  const collision = await app.request('/api/admin/overview', {
    user: { id: 'different-user', email: 'admin@example.test', roles: [] },
  });
  assert.equal(collision.status, 403);
});

test('commit failure cannot return a successful login or set an unusable cookie', async () => {
  const app = await fixture();
  app.failCommit();
  const login = await app.request('/api/auth/login', {
    method: 'POST', body: { email: 'admin@example.test', password: app.password },
  });
  assert.equal(login.status, 503);
  assert.equal(login.cookies.length, 0);
  assert.equal(typeof login.data.session_token, 'undefined');
  assert.equal(app.stored().auth_sessions.length, 0);
});

test('cross-site login requests are denied', async () => {
  const app = await fixture();
  const result = await app.request('/api/auth/login', {
    method: 'POST', origin: 'https://untrusted.example.test',
    body: { email: 'admin@example.test', password: app.password },
  });
  assert.equal(result.status, 403);
  assert.equal(app.stored().auth_sessions.length, 0);
});

test('function adapter handles rewritten and direct paths and invalid JSON', async () => {
  assert.equal(normalizeApiPath('/.netlify/functions/api/auth/login'), '/api/auth/login');
  assert.equal(normalizeApiPath('/api/auth/me'), '/api/auth/me');
  for (const path of ['/api/health', '/.netlify/functions/api/health']) {
    const response = await functionHandler(new Request(`https://example.test${path}`));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
  }
  const invalid = await functionHandler(new Request('https://example.test/api/auth/login', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{',
  }));
  assert.equal(invalid.status, 400);
});
