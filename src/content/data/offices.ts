import type { Fact, OpeningHoursRule, Office, PhoneNumber, PostalAddress } from '../types';

const SRC = 'Szomorufuz-webaudit: reports/seo-audit.md 6.1 (élő oldal oldalsáv és /elerhetoseg/)';

const unverified = <T>(value: T, note?: string): Fact<T> => ({
  value,
  status: 'unverified',
  source: SRC,
  ...(note ? { note } : {}),
});

const phone = (display: string): PhoneNumber => ({
  display,
  e164: `+${display.replace(/\D/g, '')}`,
});

const address = (streetAddress: string, district: string, postalCode?: string): PostalAddress => ({
  streetAddress,
  district,
  locality: 'Budapest',
  ...(postalCode ? { postalCode } : {}),
});

const weekdayHours: OpeningHoursRule[] = [
  {
    label: 'Hétfő–péntek',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '16:00',
  },
];

const HOURS_NOTE =
  'Az élő oldal egységesen 8–16 órát említ; irodánként és hétvégére külön ellenőrizendő.';

const mapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/**
 * Az öt budapesti iroda – minden részletadat ELLENŐRIZETLEN jelölt érték.
 * A slugok a SEO-migrációs terv javaslatai (strategy/redirect-map.csv).
 */
export const offices: Office[] = [
  {
    id: 'izabella',
    slug: 'belvaros-izabella-utca',
    name: 'VI. kerület – Izabella utca',
    address: unverified(
      address('Izabella utca 65.', 'VI. kerület', '1064'),
      'Az élő oldal térképlinkje "Izabella u. 68"-at mutat – melyik a helyes házszám?',
    ),
    phones: unverified(
      [phone('+36 1 919 0170'), phone('+36 30 847 1915')],
      'A főoldalon +36 1 720 2710 is szerepel ehhez az irodához.',
    ),
    openingHours: unverified(weekdayHours, HOURS_NOTE),
    mapUrl: unverified(mapsSearch('Budapest, Izabella utca 65.')),
  },
  {
    id: 'nagyenyed',
    slug: 'buda-nagyenyed-utca',
    name: 'XII. kerület – Nagyenyed utca',
    address: unverified(address('Nagyenyed utca 1.', 'XII. kerület'), 'Irányítószám hiányzik.'),
    phones: unverified([phone('+36 1 919 0886'), phone('+36 30 203 2300')]),
    openingHours: unverified(weekdayHours, HOURS_NOTE),
    mapUrl: unverified(mapsSearch('Budapest, Nagyenyed utca 1.')),
  },
  {
    id: 'thokoly',
    slug: 'zuglo-thokoly-ut',
    name: 'XIV. kerület – Thököly út',
    address: unverified(
      address('Thököly út 167.', 'XIV. kerület'),
      'Irányítószám-ellentmondás: oldalsáv 1147, /elerhetoseg/ 1146.',
    ),
    phones: unverified([phone('+36 1 919 0172'), phone('+36 30 965 1783')]),
    openingHours: unverified(weekdayHours, HOURS_NOTE),
    mapUrl: unverified(mapsSearch('Budapest, Thököly út 167.')),
  },
  {
    id: 'pesti',
    slug: 'rakoskeresztur-pesti-ut',
    name: 'XVII. kerület – Pesti út',
    address: unverified(address('Pesti út 41/A.', 'XVII. kerület'), 'Irányítószám hiányzik.'),
    phones: unverified([phone('+36 1 919 0171'), phone('+36 30 313 7920')]),
    openingHours: unverified(weekdayHours, HOURS_NOTE),
    mapUrl: unverified(mapsSearch('Budapest, Pesti út 41/A.')),
  },
  {
    id: 'szivacs',
    slug: 'pesterzsebet-szivacs-utca',
    name: 'XX. kerület – Szivacs utca',
    address: unverified(address('Szivacs utca 5.', 'XX. kerület'), 'Irányítószám hiányzik.'),
    phones: unverified([phone('+36 1 919 0173'), phone('+36 30 576 7206')]),
    openingHours: unverified(weekdayHours, HOURS_NOTE),
    mapUrl: unverified(mapsSearch('Budapest, Szivacs utca 5.')),
  },
];
