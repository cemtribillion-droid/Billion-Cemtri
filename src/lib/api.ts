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
  const headers: Record<string, string> = isFormData
    ? { ...(options.headers as Record<string, string> | undefined) }
    : {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> | undefined),
      };

  const activeToken = getSessionToken();
  if (activeToken && !headers.Authorization && !headers.authorization) {
    headers.Authorization = `Bearer ${activeToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (data && typeof data === 'object' && typeof (data as { session_token?: unknown }).session_token === 'string') {
    setSessionToken((data as { session_token: string }).session_token);
  }
  if (url === '/api/auth/logout') {
    setSessionToken(null);
  }

  if (!response.ok) {
    if (response.status === 401) {
      setSessionToken(null);
    }
    const message = (data && typeof data.error === 'string' ? data.error : null) || `Request failed (${response.status})`;
    throw new ApiError(message, response.status);
  }

  return data as T;
}
