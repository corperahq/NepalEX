"use client";

/* ------------------------------------------------------------------ */
/*  Demo client auth (front-end only).                                 */
/*  Replace with the real NepalEX backend / NextAuth when available.   */
/* ------------------------------------------------------------------ */

export const DEMO_CREDENTIALS = {
  username: "client",
  password: "Abcd@123",
};

const KEY = "nepalex_client_auth";

export interface Session {
  username: string;
  name: string;
  loggedInAt: number;
}

export function login(username: string, password: string): boolean {
  if (
    username.trim() === DEMO_CREDENTIALS.username &&
    password === DEMO_CREDENTIALS.password
  ) {
    const session: Session = {
      username: DEMO_CREDENTIALS.username,
      name: "Himalaya Crafts",
      loggedInAt: Date.now(),
    };
    try {
      localStorage.setItem(KEY, JSON.stringify(session));
    } catch {
      /* ignore storage errors */
    }
    return true;
  }
  return false;
}

export function logout(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
