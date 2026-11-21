import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  acceptInvite, handleAuthCallback, logout as identityLogout, onAuthChange, updateUser,
} from '@netlify/identity';
import { apiRequest, setSessionToken } from '../lib/api';
import type { UserProfile } from '../types';

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  refreshUser: () => Promise<UserProfile | null>;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [callback, setCallback] = useState<{ type: 'invite' | 'recovery'; token?: string } | null>(null);
  const [callbackError, setCallbackError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [saving, setSaving] = useState(false);
  const initializing = useRef(true);
  const requestVersion = useRef(0);

  const refreshUser = useCallback(async (): Promise<UserProfile | null> => {
    const version = ++requestVersion.current;
    try {
      const res = await apiRequest<{ user: UserProfile | null }>('/api/auth/me');
      if (version === requestVersion.current) setUser(res.user);
      return res.user;
    } catch {
      if (version === requestVersion.current) setUser(null);
      return null;
    } finally {
      if (version === requestVersion.current) setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    ++requestVersion.current;
    try {
      await Promise.allSettled([
        apiRequest('/api/auth/logout', { method: 'POST' }), identityLogout(),
      ]);
    } finally {
      ++requestVersion.current;
      // Also clear browser cookies if the logout request failed while offline.
      for (const name of ['nf_jwt', 'nf_refresh']) {
        document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
      }
      setSessionToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const onUnauthorized = () => {
      ++requestVersion.current;
      setUser(null);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'prepwise_session_token') {
        setSessionToken(event.newValue);
        void refreshUser();
      }
    };
    window.addEventListener('auth:unauthorized', onUnauthorized);
    window.addEventListener('storage', onStorage);
    const unsubscribe = onAuthChange(() => {
      if (!initializing.current) void refreshUser();
    });
    void (async () => {
      try {
        const result = await handleAuthCallback();
        if (!active) return;
        if (result?.type === 'invite' || result?.type === 'recovery') {
          setSessionToken(null);
          setCallback({ type: result.type, token: result.token });
          setLoading(false);
          return;
        }
        await refreshUser();
      } catch {
        if (active) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
          setCallbackError('This sign-in link is invalid or has expired. Request a new invitation or password reset link.');
          setLoading(false);
        }
      } finally {
        initializing.current = false;
      }
    })();
    return () => {
      active = false; unsubscribe();
      window.removeEventListener('auth:unauthorized', onUnauthorized);
      window.removeEventListener('storage', onStorage);
    };
  }, [refreshUser]);

  const finishCallback = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!callback || saving) return;
    setCallbackError('');
    if (password !== confirmation) {
      setCallbackError('Passwords do not match.');
      return;
    }
    setSaving(true);
    try {
      if (callback.type === 'invite' && callback.token) await acceptInvite(callback.token, password);
      else await updateUser({ password });
      const profile = await refreshUser();
      if (!profile) throw new Error('Unable to restore your session. Please sign in again.');
      setCallback(null);
      setPassword('');
      setConfirmation('');
      window.location.replace(profile.role === 'admin' ? '/admin' : '/dashboard');
    } catch {
      setCallbackError('Unable to save your password. Try again or request a new sign-in link.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, setUser, logout }}>
      {callback || callbackError ? (
        <main className="min-h-screen bg-[#F5F4FB] flex items-center justify-center p-4">
          <div className="prepwise-card p-7 w-full max-w-md space-y-4">
            <h1 className="font-display text-2xl font-bold text-[#1A1635]">
              {callback?.type === 'invite' ? 'Accept your invitation' : callback ? 'Set a new password' : 'Sign-in link unavailable'}
            </h1>
            {callbackError && <p role="alert" className="text-sm text-rose-700">{callbackError}</p>}
            {callback && (
              <form onSubmit={finishCallback} className="space-y-4">
                <label className="block text-sm">New password
                  <input type="password" required minLength={8} autoComplete="new-password" value={password}
                    onChange={(event) => setPassword(event.target.value)} disabled={saving}
                    className="mt-1 w-full rounded-xl border border-[#DED9F2] px-3 py-2" />
                </label>
                <label className="block text-sm">Confirm password
                  <input type="password" required minLength={8} autoComplete="new-password" value={confirmation}
                    onChange={(event) => setConfirmation(event.target.value)} disabled={saving}
                    className="mt-1 w-full rounded-xl border border-[#DED9F2] px-3 py-2" />
                </label>
                <button disabled={saving} className="w-full rounded-xl bg-[#6B34E8] text-white py-2.5 disabled:opacity-60">
                  {saving ? 'Saving password...' : 'Save password and continue'}
                </button>
              </form>
            )}
            <button type="button" disabled={saving} className="text-sm text-[#6B34E8] hover:underline"
              onClick={async () => { await logout(); window.location.replace('/admin/login'); }}>
              Return to sign in
            </button>
          </div>
        </main>
      ) : children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
