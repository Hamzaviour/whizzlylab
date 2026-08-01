/**
 * Shared SEO helpers — all absolute URLs are resolved from
 * NEXT_PUBLIC_APP_URL (set in netlify.toml) with a safe fallback.
 */

export const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.URL ||
  "https://whizzlylab.netlify.app";

export function ogImage(path = "/logo-og.jpg") {
  return `${BASE_URL}${path}`;
}

export function absolutePath(path: string) {
  return `${BASE_URL}${path}`;
}
