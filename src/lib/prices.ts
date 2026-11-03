/**
 * Ár-megjelenítési szabályok (audit SZF-001). Minden ár ezen keresztül kerül az oldalra.
 */
import { type PriceEntry, type PriceId, prices } from '@/content/data/prices';
import type { ArticleBlock } from '@/content/types';

/** 232288 → „232 288” */
export function formatAmount(amount: number): string {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function priceValue(entry: PriceEntry): string {
  return `${formatAmount(entry.amount)} Ft${entry.from ? '-tól' : ''}`;
}

export function vatNote(entry: PriceEntry): string | null {
  return entry.vat.status === 'included'
    ? `Az ár tartalmazza a ${entry.vat.rate}%-os ÁFA-t.`
    : null;
}

/** Kiemelt helyen (főoldal, meta-leírás, GYIK, kártyák) megjeleníthető-e az összeg. */
export function canFeature(entry: PriceEntry): boolean {
  return entry.condition === null || entry.conditionResolved;
}

export function getPrice(id: PriceId): PriceEntry {
  return prices[id];
}

/**
 * Részletes ár-blokk cikkoldalra: az összeg mellett MINDIG ott van a feltétel,
 * ha a forrás feltételt említ.
 */
export function priceBlock(
  id: PriceId,
  opts: { label?: string; extraNote?: string } = {},
): ArticleBlock {
  const entry = prices[id];
  const note = [vatNote(entry), opts.extraNote].filter(Boolean).join(' ');
  return {
    type: 'price',
    label: opts.label ?? entry.name,
    value: priceValue(entry),
    ...(note ? { note } : {}),
    ...(entry.condition
      ? {
          condition: `Feltételhez kötött ár. A korábbi honlap szerint: „${entry.condition}” A feltétel részleteiről és a konkrét díjról egyedi árajánlatot adunk.`,
        }
      : {}),
  };
}

/** Kártya/kiemelés: ha az ár nem emelhető ki, egyedi árajánlat-kérés jelenik meg. */
export function featuredPrice(id: PriceId): { value: string; note: string; quote: boolean } {
  const entry = prices[id];
  if (!canFeature(entry)) {
    return {
      value: 'Egyedi árajánlat',
      note: 'Feltételhez kötött díj – kérjen ajánlatot',
      quote: true,
    };
  }
  return {
    value: priceValue(entry),
    note: entry.vat.status === 'included' ? `${entry.vat.rate}% ÁFA-val` : '',
    quote: false,
  };
}
