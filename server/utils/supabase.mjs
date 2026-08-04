import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient(accessToken) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase is not configured. Add SUPABASE_URL and SUPABASE_ANON_KEY to .env",
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined,
  });
}

export function getBearerToken(req) {
  const [scheme, token] = req.headers.authorization?.split(" ") ?? [];
  return scheme?.toLowerCase() === "bearer" && token ? token : null;
}
