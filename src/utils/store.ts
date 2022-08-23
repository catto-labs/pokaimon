import { reactive } from "vue";
import { supabase } from "@/utils/supabase";

import type { Session } from "@supabase/gotrue-js";
import type {
  UsersTable,
  CharacterInventoryTable,
  CharacterInfoTable,
} from "@/types/Database";

type GlobalStore =
  | {
      first_load: boolean;
      initialized: false;
    }
  | {
      first_load: boolean;
      initialized: true;
      user_session: Session["user"];
      user_data: UsersTable;
      user_inventory: (Omit<CharacterInventoryTable, "base_character"> & {
        base_character: CharacterInfoTable;
      })[];
    };

export const store = reactive<GlobalStore>({
  first_load: false,
  initialized: false,
});

export const initialize = async () => {
  Object.assign(store, { first_load: false });

  // Get session and check if it exists.
  const { data, error } = await supabase.auth.getSession();
  if (!data.session || error) {
    Object.assign(store, { first_load: true });
    return false;
  }

  // Get the user's data and store them.
  const { data: user_data, error: user_error } = await supabase
    .from("users")
    .select()
    .match({ id: data.session.user.id })
    .single();

  if (!user_data || user_error) {
    window.location.reload();
    return;
  }

  const { data: user_inventory, error: user_inventory_error } = await supabase
    .from("character_inventory")
    .select()
    .match({ owner: data.session.user.id })
    .select(`*, base_character(*)`);

  if (user_inventory_error) {
    window.location.reload();
    return;
  }

  Object.assign(store, {
    first_load: true,
    initialized: true,
    user_session: data.session.user,
    user_data,
    user_inventory,
  });

  supabase
    .channel(`public:users:id=eq.${user_data.id}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "users",
        filter: `id=eq.${user_data.id}`,
      },
      (payload: { new: UsersTable }) => {
        console.info("[store:user_data] new data", payload);
        Object.assign(store, { user_data: payload.new });
      }
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "character_inventory",
        filter: `owner=eq.${user_data.id}`,
      },
      async (payload: {
        eventType: "UPDATE" | "INSERT" | "DELETE";
        new: CharacterInventoryTable;
        old: { id: number };
      }) => {
        if (!store.initialized) return;
        console.log("[store:user_inventory] new data", payload);

        if (payload.eventType === "DELETE") {
          const character_id = payload.old.id;

          const character_index = store.user_inventory.findIndex(
            (_character) => _character.id === character_id
          );

          store.user_inventory.splice(character_index, 1);
        }

        if (payload.eventType === "UPDATE") {
          const character_id = payload.new.id;

          const character_index = store.user_inventory.findIndex(
            (_character) => _character.id === character_id
          );

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { base_character: _, ...new_character } = payload.new;

          if (character_index === -1) return;
          Object.assign(store.user_inventory[character_index], new_character);
        }

        if (payload.eventType === "INSERT") {
          const base_character_id = payload.new.base_character;

          const { data: base_character, error: error_base_character } =
            await supabase
              .from("character_info")
              .select()
              .match({ id: base_character_id })
              .single();

          if (!base_character || error_base_character) return;
          payload.new.base_character = base_character;

          store.user_inventory.push(
            payload.new as unknown as Omit<
              CharacterInventoryTable,
              "base_character"
            > & {
              base_character: CharacterInfoTable;
            }
          );
          return;
        }
      }
    )
    .subscribe(() => console.info("[store] subscribed to database changes."));

  return true;
};
