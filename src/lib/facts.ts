import { contentMode } from '@/config/site';
import type { Fact } from '@/content/types';

export interface Publishable<T> {
  value: T;
  /** true, ha az érték csak review módban látszik (ellenőrizetlen). */
  pending: boolean;
}

/**
 * Egy tény megjeleníthetőségét dönti el.
 *  - verified → mindig megjelenik
 *  - unverified → strict módban null, review módban "pending" jelöléssel
 */
export function publishable<T>(fact: Fact<T> | undefined): Publishable<T> | null {
  if (!fact) return null;
  if (fact.status === 'verified') return { value: fact.value, pending: false };
  if (contentMode === 'review') return { value: fact.value, pending: true };
  return null;
}

/** Csak ellenőrzött érték – strukturált adathoz (JSON-LD) és tel: linkhez review módban sem engedünk mást. */
export function verifiedOnly<T>(fact: Fact<T> | undefined): T | null {
  return fact?.status === 'verified' ? fact.value : null;
}
