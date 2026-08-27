/**
 * Shared SEO helpers — all absolute URLs are resolved from
 * NEXT_PUBLIC_APP_URL (set in netlify.toml) with a safe fallback.
 */

export const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "https://whizzlylab.com";

export function ogImage(path = "/og-image.png") {
  return `${BASE_URL}${path}`;
}

export function absolutePath(path: string) {
  return `${BASE_URL}${path}`;
}
