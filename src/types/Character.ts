export interface Character {
  name: string;
  // level: number;
  health: number;
  maxHealth: number;

  /** Should have 4 actions. */
  actions: CharacterAction[];
}

export interface CharacterAction {
  name: string;

  /** Min damage. */
  enemy_min_damage: number;
  /** Max damage. */
  enemy_max_damage: number;
  /** Decimal percentage (e.g 0.1 for 10%) */
  enemy_hit_chance: number;

  /** Min damage. */
  self_min_damage: number;
  /** Max damage. */
  self_max_damage: number;
  /** Decimal percentage (e.g 0.1 for 10%) */
  self_hit_chance: number;
}
