import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0-rc.3";

export const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);
