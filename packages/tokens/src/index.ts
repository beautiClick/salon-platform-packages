/**
 * The three kinds of salon the platform supports.
 * A salon's type decides its theme: women -> pink, men -> blue, unisex -> violet.
 * Presets are named by salon type (identity), not by color (value), so colors
 * can change later without the names becoming lies.
 */
export const SALON_TYPES = ['women', 'men', 'unisex'] as const;

export type SalonType = (typeof SALON_TYPES)[number];

/** Used when a salon type is missing or invalid, and on the login page. */
export const DEFAULT_SALON_TYPE: SalonType = 'unisex';

/** Runtime check for values coming from outside the type system (API, cookies). */
export function isSalonType(value: unknown): value is SalonType {
  return typeof value === 'string' && (SALON_TYPES as readonly string[]).includes(value);
}
