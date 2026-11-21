import { AsyncLocalStorage } from 'node:async_hooks';
import type { RequestHandler } from 'express';
import { eq } from 'drizzle-orm';
import { getDatabaseClient } from '../db/index.js';
import { applicationState } from '../db/schema.js';
import crypto from 'crypto';
import type {
  AiLearningHistory,
  AuditLog,
  Course,
  Department,
  ExamAttempt,
  PdfImportRecord,
  PlatformSettings,
  Question,
  SavedQuestion,
  StudentAnswer,
  StudentProgress,
  Topic,
  UserProfile,
} from '../src/types';
import {
  DEFAULT_PLATFORM_SETTINGS,
  SEED_COURSES,
  SEED_DEPARTMENTS,
  SEED_QUESTIONS,
  SEED_TOPICS,
} from '../src/data/nd2QuestionBank';

export interface StoredUserRecord extends UserProfile {
  password_hash?: string;
}

export interface PrepWiseDatabase {
  departments: Department[];
  courses: Course[];
  topics: Topic[];
  questions: Question[];
  users: StoredUserRecord[];
  auth_sessions: Array<{ token_hash: string; user_id: string; expires_at: string }>;
  exam_attempts: ExamAttempt[];
  student_answers: StudentAnswer[];
  student_progress: StudentProgress[];
  saved_questions: SavedQuestion[];
  ai_learning_history: AiLearningHistory[];
  pdf_imports: PdfImportRecord[];
  audit_logs: AuditLog[];
  platform_settings: PlatformSettings;
}

function createInitialDb(): PrepWiseDatabase {
  return {
    departments: structuredClone(SEED_DEPARTMENTS),
    courses: structuredClone(SEED_COURSES),
    topics: structuredClone(SEED_TOPICS),
    questions: structuredClone(SEED_QUESTIONS),
    users: [],
    auth_sessions: [],
    exam_attempts: [],
    student_answers: [],
    student_progress: [],
    saved_questions: [],
    ai_learning_history: [],
    pdf_imports: [],
    audit_logs: [],
    platform_settings: structuredClone(DEFAULT_PLATFORM_SETTINGS),
  };
}

// Each API request works in a database transaction. The locked row prevents concurrent
// account changes from overwriting one another, including across function instances.
const requestDatabase = new AsyncLocalStorage<{ db: PrepWiseDatabase; dirty: boolean }>();

export function readDb(): PrepWiseDatabase {
  const state = requestDatabase.getStore();
  if (!state) throw new Error('Database request context is unavailable.');
  return state.db;
}

export function writeDb(db: PrepWiseDatabase): void {
  const state = requestDatabase.getStore();
  if (!state || state.db !== db) throw new Error('Database request context is unavailable.');
  state.dirty = true;
}

export interface DatabaseRequestState { db: PrepWiseDatabase; dirty: boolean }
export type DatabaseTransaction = <T>(work: (state: DatabaseRequestState) => Promise<T>, shouldCommit: () => boolean) => Promise<T>;

const transact: DatabaseTransaction = async (work, shouldCommit) => {
  return getDatabaseClient().transaction(async (tx) => {
    await tx.insert(applicationState).values({ id: 'main', data: createInitialDb() }).onConflictDoNothing();
    const [record] = await tx.select().from(applicationState).where(eq(applicationState.id, 'main')).for('update');
    const state = { db: { ...createInitialDb(), ...record.data }, dirty: false };
    const result = await work(state);
    if (state.dirty && shouldCommit()) {
      await tx.update(applicationState).set({ data: state.db }).where(eq(applicationState.id, 'main'));
    }
    return result;
  });
};

export function createDatabaseMiddleware(transaction: DatabaseTransaction = transact): RequestHandler {
  return (_req, res, next) => {
    const sendJson = res.json.bind(res);
    res.setHeader('Cache-Control', 'no-store');
    void transaction((state) => requestDatabase.run(state, () => new Promise<unknown>((resolve, reject) => {
      const onClose = () => reject(new Error('Request closed before completion.'));
      res.once('close', onClose);
      // Delay the response until COMMIT succeeds, so a failed write cannot look successful.
      res.json = (body: unknown) => {
        res.removeListener('close', onClose);
        resolve(body);
        return res;
      };
      next();
    })), () => res.statusCode < 400).then((payload) => {
      res.json = sendJson;
      sendJson(payload);
    }).catch(() => {
      res.json = sendJson;
      if (!res.headersSent) {
        res.removeHeader('Set-Cookie');
        res.status(503);
        sendJson({ error: 'The account service is temporarily unavailable. Please try again.' });
      }
    });
  };
}

export const databaseMiddleware = createDatabaseMiddleware();

export function stripSensitiveUserFields(user: StoredUserRecord): UserProfile {
  const {
    password_hash: _ph,
    ...rest
  } = user as StoredUserRecord & Record<string, unknown>;
  delete rest.email_verified;
  delete rest.email_verification_token;
  delete rest.email_verification_code_hash;
  delete rest.email_verification_expires_at;
  delete rest.email_verification_attempts;
  delete rest.email_verification_sent_at;
  delete rest.reset_code_hash;
  delete rest.reset_code_expires_at;
  delete rest.reset_code_attempts;
  delete rest.reset_code_sent_at;
  delete rest.reset_token;
  delete rest.reset_token_expires_at;
  return rest as UserProfile;
}

export function recordAuditLog(
  db: PrepWiseDatabase,
  actor: { id: string; email: string },
  action: string,
  entity_type: string,
  entity_id: string,
  details: string
): void {
  db.audit_logs.unshift({
    id: `audit-${crypto.randomUUID()}`,
    actor_id: actor.id,
    actor_email: actor.email,
    action,
    entity_type,
    entity_id,
    details,
    created_at: new Date().toISOString(),
  });
  if (db.audit_logs.length > 500) {
    db.audit_logs = db.audit_logs.slice(0, 500);
  }
}

export function isSupabaseServerConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
