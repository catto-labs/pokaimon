export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      character_info: {
        Row: {
          description: string | null;
          id: number;
          region: string | null;
          name: string | null;
          element: string | null;
          base_health: number | null;
          action_1: number | null;
          action_2: number | null;
          action_3: number | null;
          action_4: number | null;
        };
        Insert: {
          description?: string | null;
          id?: number;
          region?: string | null;
          name?: string | null;
          element?: string | null;
          base_health?: number | null;
          action_1?: number | null;
          action_2?: number | null;
          action_3?: number | null;
          action_4?: number | null;
        };
        Update: {
          description?: string | null;
          id?: number;
          region?: string | null;
          name?: string | null;
          element?: string | null;
          base_health?: number | null;
          action_1?: number | null;
          action_2?: number | null;
          action_3?: number | null;
          action_4?: number | null;
        };
      };
      character_inventory: {
        Row: {
          id: number;
          base_character: number | null;
          health: number | null;
          xp: number | null;
          owner: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          base_character?: number | null;
          health?: number | null;
          xp?: number | null;
          owner?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          base_character?: number | null;
          health?: number | null;
          xp?: number | null;
          owner?: string | null;
          created_at?: string | null;
        };
      };
      character_actions: {
        Row: {
          id: number;
          name: string | null;
          enemy_min_damage: number | null;
          enemy_max_damage: number | null;
          enemy_hit_chance: number | null;
          self_min_damage: number | null;
          self_max_damage: number | null;
          self_hit_chance: number | null;
          description: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
          enemy_min_damage?: number | null;
          enemy_max_damage?: number | null;
          enemy_hit_chance?: number | null;
          self_min_damage?: number | null;
          self_max_damage?: number | null;
          self_hit_chance?: number | null;
          description?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
          enemy_min_damage?: number | null;
          enemy_max_damage?: number | null;
          enemy_hit_chance?: number | null;
          self_min_damage?: number | null;
          self_max_damage?: number | null;
          self_hit_chance?: number | null;
          description?: string | null;
        };
      };
      games: {
        Row: {
          id: number;
          player1: string | null;
          player2: string | null;
          player1_card: number | null;
          player2_card: number | null;
        };
        Insert: {
          id?: number;
          player1?: string | null;
          player2?: string | null;
          player1_card?: number | null;
          player2_card?: number | null;
        };
        Update: {
          id?: number;
          player1?: string | null;
          player2?: string | null;
          player1_card?: number | null;
          player2_card?: number | null;
        };
      };
      users: {
        Row: {
          selected_character: number | null;
          primos: number | null;
          xp: number | null;
          id: string;
          username: string | null;
          starter_traveller: string | null;
        };
        Insert: {
          selected_character?: number | null;
          primos?: number | null;
          xp?: number | null;
          id: string;
          username?: string | null;
          starter_traveller?: string | null;
        };
        Update: {
          selected_character?: number | null;
          primos?: number | null;
          xp?: number | null;
          id?: string;
          username?: string | null;
          starter_traveller?: string | null;
        };
      };
    };
    Functions: Record<string, unknown>;
  };
}
