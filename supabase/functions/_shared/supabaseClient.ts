import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0-rc.3";

export const supabaseClient = createClient(
  // Supabase API URL - env var exported by default when deployed.
  Deno.env.get("SUPABASE_URL") ?? "",
  // Supabase API ANON KEY - env var exported by default when deployed.
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);
