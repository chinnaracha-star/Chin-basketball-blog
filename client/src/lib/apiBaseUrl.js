/**
 * Resolve API base URL for local and production.
 * On Vercel, prefer same-origin (empty string) so every *.vercel.app alias works.
 */
export function getApiBaseUrl() {
  const fromEnv = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";

  if (import.meta.env.PROD) {
    // Same-origin avoids CORS issues across Vercel production aliases.
    if (!fromEnv || fromEnv.includes("localhost") || fromEnv.includes("vercel.app")) {
      return "";
    }
    return fromEnv;
  }

  return fromEnv || "http://localhost:4000";
}
