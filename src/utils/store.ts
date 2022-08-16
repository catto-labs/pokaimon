import { reactive } from "vue";
import { Session } from "@supabase/gotrue-js";

interface globalStore {
  authSession: Session | null;
}

export const store: globalStore = reactive({
  authSession: null,
});
