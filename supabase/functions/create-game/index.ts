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
    const { player1, player2, region } = await req.json();
    const selected_region = region || "mondstadt";

    /** Used when one of the players is a bot. */
    let region_characters = [];

    /** When there's a bot, get available characters for the region. */
    if (!player1 || !player2) {
      const { data: characters, error } = await supabase
        .from("character_info")
        .select()
        .match({ region: selected_region })
        .select();

      if (error) {
        return new Response(JSON.stringify({ success: false, error }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 500,
        });
      }

      // Store them for later use.
      region_characters = characters;
    }

    /** Filled when we fetch the users. */
    let player1_card, player2_card;

    // Check and fetch data for `player1`.
    if (player1) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .match({ id: player1 })
        .single();

      if (data || error) {
        return new Response(JSON.stringify({ success: false, error }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 500,
        });
      }

      player1_card = data.selected_character;
    } else {
      /** When the user is a bot, give a random `character_info` ID. */
      player1_card =
        region_characters[Math.floor(Math.random() * region_characters.length)]
          .id;
    }

    // Check and fetch data for `player2`.
    if (player2) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .match({ id: player2 })
        .single();

      if (data || error) {
        return new Response(JSON.stringify({ success: false, error }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 500,
        });
      }

      player2_card = data.selected_character;
    } else {
      /** When the user is a bot, give a random `character_info` ID. */
      player2_card =
        region_characters[Math.floor(Math.random() * region_characters.length)]
          .id;
    }

    const { data: game, error } = await supabase
      .from("games")
      .insert([
        {
          player1,
          player1_card,
          player2,
          player2_card,
        },
      ])
      .select();

    if (error) {
      return new Response(JSON.stringify({ success: false, error }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      });
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
