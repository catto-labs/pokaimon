export interface Character {
  name: string;
  level: number;
  health: number;
  maxHealth: number;

  /** Should have 4 actions. */
  actions: CharacterAction[];
}

export interface CharacterAction {
  name: string;

  /** Min and max damage. */
  enemyHitDamage: number[];
  /** Decimal percentage (e.g 0.1 for 10%) */
  enemyHitChance: number;

  /** Min and max damage. */
  selfHitDamage: number[];
  /** Decimal percentage (e.g 0.1 for 10%) */
  selfHitChance: number;
}
