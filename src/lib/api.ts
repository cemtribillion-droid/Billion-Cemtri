import { getUser as getIdentityUser } from '@netlify/identity';

const SESSION_STORAGE_KEY = 'prepwise_session_token';
let memorySessionToken: string | null = null;

export function getSessionToken(): string | null {
  if (memorySessionToken) return memorySessionToken;
  try {
    const ss = typeof window !== 'undefined' ? window.sessionStorage?.getItem(SESSION_STORAGE_KEY) : null;
    if (ss) {
      memorySessionToken = ss;
      return ss;
    }
    const ls = typeof window !== 'undefined' ? window.localStorage?.getItem(SESSION_STORAGE_KEY) : null;
    if (ls) {
      memorySessionToken = ls;
      return ls;
    }
  } catch {
    // Storage may be blocked in restricted third-party contexts; in-memory token still works.
  }
  return null;
}

export function setSessionToken(token: string | null): void {
  memorySessionToken = token;
  try {
    if (typeof window === 'undefined') return;
    if (token) {
      window.sessionStorage?.setItem(SESSION_STORAGE_KEY, token);
      window.localStorage?.setItem(SESSION_STORAGE_KEY, token);
    } else {
      window.sessionStorage?.removeItem(SESSION_STORAGE_KEY);
      window.localStorage?.removeItem(SESSION_STORAGE_KEY);
    }
  } catch {
    // Ignore storage quota / third-party storage errors safely.
  }
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const headers = new Headers(options.headers);
  if (!isFormData && options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  // Restoring the Identity session also starts automatic token refresh.
  await getIdentityUser();
  const activeToken = getSessionToken();
  if (activeToken && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${activeToken}`);
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...options, headers, credentials: 'include', cache: 'no-store',
      signal: options.signal ?? AbortSignal.timeout(20000),
    });
  } catch (error) {
    if (error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name)) {
      throw new ApiError('The request timed out. Please try again.', 0);
    }
    throw new ApiError('Unable to connect. Check your connection and try again.', 0);
  }

  const contentType = response.headers.get('content-type') || '';
  let data: any = null;
  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      throw new ApiError('The server returned an invalid response. Please try again.', response.status);
    }
  } else {
    throw new ApiError('The account service is unavailable. Please try again shortly.', response.status || 503);
  }

  if (!response.ok) {
    if (response.status === 401) {
      setSessionToken(null);
      if (url !== '/api/auth/login' && typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth:unauthorized'));
      }
    }
    const message = (data && typeof data.error === 'string' ? data.error : null) || `Request failed (${response.status})`;
    throw new ApiError(message, response.status);
  }

  if (typeof data?.session_token === 'string') setSessionToken(data.session_token);
  if (url === '/api/auth/logout' || (url === '/api/auth/me' && !data?.authenticated)) setSessionToken(null);
  return data as T;
}
