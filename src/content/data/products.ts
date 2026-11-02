/**
 * Termékek (audit SZF-005). Forrás: az élő oldal /termek-adatlapok/ aloldalai (2026-11-02).
 * Ár: content/data/prices.ts → 'sephia-urna'. Kép: content/data/image-register.ts.
 */
export interface Product {
  /** Horgony az /urnak/ oldalon */
  slug: string;
  name: string;
  code: string;
  category: 'sephia';
  /** A régi termékadatlap URL-je */
  legacyPath: string;
  type: string;
  material: string;
  size: string;
}

const sephia = (
  name: string,
  code: string,
  slugBase: string,
  legacyId: number,
  full: string,
): Product => ({
  slug: `${slugBase}-${code}`,
  name,
  code,
  category: 'sephia',
  legacyPath: `/termek-adatlapok/${full}-${code}/${legacyId}/`,
  type: 'kerek urna',
  material: 'fém urna',
  size: 'normál urna',
});

export const products: Product[] = [
  sephia('Fejfa', '0102001', 'fejfa', 517, 'fejfa-sephia-kezzel-festett-femurna'),
  sephia('Alkonyat', '0102002', 'alkonyat', 1312, 'alkonyat-sephia-kezzel-festett-urna'),
  sephia('Cédrus', '0102003', 'cedrus', 1313, 'cedrus-sephia-kezzel-festett-femurna'),
  sephia('Csend', '0102004', 'csend', 1317, 'csend-sephia-kezzel-festett-femurna'),
  sephia('Erdő', '0102005', 'erdo', 1318, 'erdo-sephia-kezzel-festett-femurna'),
  sephia('Liliom', '0102006', 'liliom', 1319, 'liliom-sephia-kezzel-festett-femurna'),
  sephia('Vízpart', '0102007', 'vizpart', 1320, 'vizpart-sephia-kezzel-festett-femurna'),
];

/** „Fejfa Sephia kézzel festett fémurna – 0102001” (az eredeti adatlapcím szerint) */
export function productTitle(p: Product): string {
  const kind = p.slug.startsWith('alkonyat') ? 'urna' : 'fémurna';
  return `${p.name} Sephia kézzel festett ${kind} – ${p.code}`;
}
