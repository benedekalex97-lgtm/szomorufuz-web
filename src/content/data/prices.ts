/**
 * Árnyilvántartás (audit SZF-001) – az oldalon megjelenő árak EGYETLEN forrása.
 *
 * Minden ár az élő oldalról (budapest-temetkezes.hu) származik, változatlan összeggel.
 * Új árat (pl. hamvasztásos csomagár) üzleti jóváhagyás nélkül nem szabad felvenni.
 *
 * `conditionResolved`: ha a forrás feltételt említ, de annak tartalma nem egyértelmű
 * (pl. a ravatalozó „három szolgáltatása” nincs megnevezve), az ár kiemelt helyen
 * (főoldal, meta, GYIK) NEM jelenhet meg – helyette egyedi árajánlat-kérés szerepel.
 */

export type VatInfo =
  { status: 'included'; rate: 27; sourceText: string } | { status: 'not-stated' };

export type ApprovalStatus = 'jovahagyasra-var' | 'jovahagyva';

export interface PriceEntry {
  id: PriceId;
  name: string;
  /** Forint, egész szám */
  amount: number;
  /** „-tól” ár (minimum) vagy fix tételár */
  from: boolean;
  vat: VatInfo;
  /** A forrás szó szerinti feltétele, ha van */
  condition: string | null;
  /** A feltétel tartalma egyértelmű-e (üzletileg tisztázott) */
  conditionResolved: boolean;
  sourceUrl: string;
  /** A forrásban olvasható pontos szöveg */
  sourceText: string;
  /** Mikor ellenőriztük az élő oldalon (ÉÉÉÉ-HH-NN) */
  verifiedAt: string;
  approval: ApprovalStatus;
  detailPage: string;
}

export type PriceId =
  'koporsos-temetes' | 'ravatalozo-terem' | 'polgari-bucsuztatas' | 'sephia-urna';

const VERIFIED = '2026-11-02';
const SOURCE = 'https://www.budapest-temetkezes.hu';

export const prices: Record<PriceId, PriceEntry> = {
  'koporsos-temetes': {
    id: 'koporsos-temetes',
    name: 'Koporsós temetési díj',
    amount: 232288,
    from: true,
    vat: { status: 'included', rate: 27, sourceText: 'Az ár tartalmazza a 27 %-os ÁFA-t!' },
    condition: null,
    conditionResolved: true,
    sourceUrl: `${SOURCE}/koporsos-temetes/`,
    sourceText: 'Koporsós temetési díj: 232.288 Ft-tól.',
    verifiedAt: VERIFIED,
    approval: 'jovahagyasra-var',
    detailPage: '/koporsos-temetes/',
  },
  'ravatalozo-terem': {
    id: 'ravatalozo-terem',
    name: 'Ravatalozó terem díja',
    amount: 65000,
    from: true,
    vat: { status: 'included', rate: 27, sourceText: 'Az árak tartalmazzák a 27 %-os ÁFA-t!' },
    condition:
      'A fenti árak a három szolgáltatás egy időben történő megrendelésekor és egyszerre történő igénybevételekor érvényesek!',
    // A forrás nem nevezi meg, melyik a „három szolgáltatás” – üzleti tisztázásra vár.
    conditionResolved: false,
    sourceUrl: `${SOURCE}/ravatalozo-terem/`,
    sourceText: 'Ravatalozó terem díja: 65.000 Ft-tól',
    verifiedAt: VERIFIED,
    approval: 'jovahagyasra-var',
    detailPage: '/ravatalozo-terem/',
  },
  'polgari-bucsuztatas': {
    id: 'polgari-bucsuztatas',
    name: 'Polgári búcsúztatás díja',
    amount: 35000,
    from: true,
    // A forrásoldal nem nyilatkozik az ÁFA-tartalomról.
    vat: { status: 'not-stated' },
    condition: null,
    conditionResolved: true,
    sourceUrl: `${SOURCE}/polgari-bucsuztatas/`,
    sourceText: 'Szolgáltatásunk díja: 35.000 Ft-tól',
    verifiedAt: VERIFIED,
    approval: 'jovahagyasra-var',
    detailPage: '/polgari-bucsuztatas/',
  },
  'sephia-urna': {
    id: 'sephia-urna',
    name: 'Sephia kézzel festett fém díszurna',
    amount: 23900,
    from: false,
    vat: { status: 'included', rate: 27, sourceText: 'Az ár tartalmazza a 27 % ÁFA-t!' },
    condition: null,
    conditionResolved: true,
    sourceUrl: `${SOURCE}/termek-adatlapok/`,
    sourceText: 'Ár (Ft): 23 900 (mind a 7 Sephia termékadatlapon)',
    verifiedAt: VERIFIED,
    approval: 'jovahagyasra-var',
    detailPage: '/urnak/',
  },
};
