import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0-rc.3";

export const supabaseClient = (authorization: string) =>
  createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      },
    }
  );
