/**
 * Auth token management for cross-origin API requests.
 * 
 * Since the backend (onrender.com) and frontend (nolimit.win) are on different domains,
 * cookies don't work cross-origin. Instead, we store the JWT in localStorage
 * and send it as a Bearer token in the Authorization header.
 */

const AUTH_TOKEN_KEY = "nolimit_auth_token";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Returns headers object with Authorization Bearer token if available.
 * Merge this with your existing headers when making API requests.
 */
export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

/**
 * Convenience: make an authenticated fetch to the backend API.
 * Automatically includes the Bearer token and credentials.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
}
