import type { ContactLine, Office, PhoneNumber } from '../types';

/**
 * ELÉRHETŐSÉGEK – egyetlen forrás minden oldalnak.
 * Forrás: https://www.budapest-temetkezes.hu (oldalsáv „Elérhetőségeink”, /elerhetoseg/),
 * lekérve: 2026-11-02. Az élő oldalon publikált adatok jóváhagyott forrásadatok.
 * Ellentmondások listája: docs/content-migration.md
 */

export const phone = (display: string): PhoneNumber => ({
  display,
  e164: `+${display.replace(/\D/g, '')}`,
});

/** Központi telefonszámok – szerepenként elkülönítve (az élő oldal szerint). */
export const central: {
  info: ContactLine;
  transport: ContactLine;
  office: ContactLine;
  email: string;
} = {
  info: {
    label: 'Információ',
    phone: phone('+36 30 847 1915'),
    note: '6:00 és 22:00 óra között hívható',
  },
  transport: {
    label: 'Ügyeleti halottszállítás',
    phone: phone('+36 30 849 3538'),
    note: '06-30-ÜGYELET',
  },
  office: {
    label: 'Központi iroda',
    phone: phone('+36 1 919 0170'),
    note: 'Központi fax is',
  },
  email: 'budapest@temetkezes.hu',
};

/** Ügyfélfogadás irodáinkban (élő oldal: /elerhetoseg/ és oldalsáv). */
export const officeHours: { days: string; hours: string }[] = [
  { days: 'Hétfő–péntek', hours: '8:00–16:00' },
  { days: 'Szombat–vasárnap', hours: 'zárva' },
];

const maps = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/** Az öt budapesti iroda – cím, vezetékes és mobilszám, megközelítés (élő oldal /elerhetoseg/). */
export const offices: Office[] = [
  {
    id: 'izabella',
    slug: 'belvarosi-iroda',
    name: 'Belvárosi iroda',
    district: 'VI. kerület',
    numeral: 'VI.',
    postalCode: '1064',
    locality: 'Budapest',
    street: 'Izabella utca 65.',
    landline: phone('+36 1 919 0170'),
    mobile: phone('+36 30 847 1915'),
    directions:
      'A VI. kerület frekventált részén, közel az Oktogonhoz: az Izabella és Aradi utca sarkától 50 méterre, a Podmaniczky utca irányában.',
    mapUrl: maps('1064 Budapest, Izabella utca 65.'),
  },
  {
    id: 'nagyenyed',
    slug: 'budai-iroda',
    name: 'Budai iroda',
    district: 'XII. kerület',
    numeral: 'XII.',
    postalCode: '1123',
    locality: 'Budapest',
    street: 'Nagyenyed utca 1.',
    landline: phone('+36 1 919 0886'),
    mobile: phone('+36 30 203 2300'),
    directions:
      'Krisztinaváros szívében, a Déli pályaudvar közvetlen közelében, az Alkotás utcáról nyíló Nagyenyed utca legelején.',
    mapUrl: maps('1123 Budapest, Nagyenyed utca 1.'),
  },
  {
    id: 'thokoly',
    slug: 'zugloi-iroda',
    name: 'Zuglói iroda',
    district: 'XIV. kerület',
    numeral: 'XIV.',
    // Az /elerhetoseg/ oldal 1146-ot, az oldalsáv 1147-et ír – eltérés: docs/content-migration.md
    postalCode: '1146',
    locality: 'Budapest',
    street: 'Thököly út 167.',
    landline: phone('+36 1 919 0172'),
    mobile: phone('+36 30 965 1783'),
    directions:
      'Zugló szívében, a Thököly úton, a Bosnyák tér és a Róna utca közötti szakaszon, az Uzsoki utcai kórház közelében, a XIV. kerületi Önkormányzattól 50 méterre.',
    mapUrl: maps('Budapest, Thököly út 167.'),
  },
  {
    id: 'pesti',
    slug: 'rakoskereszturi-iroda',
    name: 'Rákoskeresztúri iroda',
    district: 'XVII. kerület',
    numeral: 'XVII.',
    postalCode: '1173',
    locality: 'Budapest',
    street: 'Pesti út 41/A.',
    landline: phone('+36 1 919 0171'),
    mobile: phone('+36 30 313 7920'),
    directions:
      'Rákoskeresztúron, a XVII. kerület legforgalmasabb részén, az Önkormányzattól 500 méterre, Budapest központjának irányában, a Pesti úton.',
    mapUrl: maps('1173 Budapest, Pesti út 41/A.'),
  },
  {
    id: 'szivacs',
    slug: 'pesterzsebeti-iroda',
    name: 'Pesterzsébeti iroda',
    district: 'XX. kerület',
    numeral: 'XX.',
    postalCode: '1204',
    locality: 'Budapest',
    street: 'Szivacs utca 5.',
    landline: phone('+36 1 919 0173'),
    mobile: phone('+36 30 576 7206'),
    directions:
      'Pesterzsébet központjában, a Tátra téri piac közvetlen közelében, a Dél-pesti Centrum Kórháztól néhány buszmegállóra.',
    mapUrl: maps('1204 Budapest, Szivacs utca 5.'),
  },
];

/** A Belvárosi iroda tömegközlekedési megközelítése (élő oldal /elerhetoseg/). */
export const izabellaTransit: string[] = [
  'A 76-os trolibusz Izabella utcai megállójától 40 méter gyalog, vagy a 73-as trolibusz Andrássy úti megállójától 200 méter gyalog.',
  'A 105-ös autóbusz Vörösmarty utcai megállójától 210 méter gyalog.',
  'Az M1 (Földalatti) Vörösmarty utcai megállójától 250 méter gyalog.',
  'A 4-es vagy 6-os villamos Oktogon megállójától 450 méter gyalog.',
];
export const izabellaParking =
  'Az Aradi utca az Izabella utca felől egyirányú, de itt általában könnyen talál parkolóhelyet.';

/** Céginformációk (élő oldal /ceginformaciok/). */
export const company = {
  legalName: 'Szomorúfűz Temetkezési Hálózat Kft.',
  seat: '1064 Budapest, Izabella utca 65.',
  sites: ['4029 Debrecen, Csapó utca 53.', '4400 Nyíregyháza, Dózsa György utca 70.'],
  // A /ceginformaciok/ oldalon szereplő szám – eltér a központi irodai számtól (lásd QA).
  listedPhone: phone('+36 1 720 2710'),
  email: 'budapest@temetkezes.hu',
  taxId: '26704450-2-42',
  registrationNo: '01-09-340188',
  bankAccount: '16200106-11641388-00000000',
  iban: 'HU06 1620 0106 1164 1388 0000 0000',
  swift: 'HBWEHUHB',
  bank: 'MagNet Bank',
  authority: 'Budapest VI. Kerületi Kormányhivatala',
  permit: 'Tem/1/2023.',
};
