// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { supabase } from "../_shared/supabaseClient.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { player1, player1_card, region } = await req.json();
    const selected_region = region || "mondstadt";

    const { characters, error: characters_error } = await supabase
      .from("character_info")
      .select()
      .match({ region: selected_region })
      .select();

    if (characters_error) {
      return new Response(
        JSON.stringify({ success: false, error: characters_error }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 500,
        }
      );
    }

    // Select a random character in the array for the bot.
    const random_character =
      characters[Math.floor(Math.random() * characters.length)];

    const { data: game, error: games_error } = await supabase
      .from("games")
      .insert([
        {
          player1,
          player2: null,
          player1_card,
          player2_card: random_character,
        },
      ])
      .select();

    if (games_error) {
      return new Response(
        JSON.stringify({ success: false, error: games_error }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 500,
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data: game }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
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
