// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
//
//
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { supabaseClient } from "../_shared/supabaseClient.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    // Set the Auth context of the user that called the function.
    // This way our row-level-security (RLS) policies are applied.
    supabaseClient.auth.setAuth(
      req.headers.get("Authorization").replace("Bearer ", "")
    );

    const { player1, player2 } = await req.json();

    const { data, error } = await supabaseClient
      .from("games")
      .insert([
        {
          player1,
          player2,
        },
      ])
      .select();

    return new Response(JSON.stringify({ data, error }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        data: null,
        error: error.message,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
});
