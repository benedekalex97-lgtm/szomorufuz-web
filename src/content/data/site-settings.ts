import type { SiteSettings } from '../types';

const AUDIT = 'Szomorufuz-webaudit';

/**
 * FIGYELEM: az alábbi adatok jelölt (candidate) értékek az auditból.
 * Egyik sem ellenőrzött – a status csak akkor lehet "verified", ha a
 * Szomorúfűz írásban megerősítette (verifiedAt + verifiedBy kitöltésével).
 */
export const siteSettings: SiteSettings = {
  company: {
    displayName: 'Szomorúfűz',
    tagline: 'Temetkezési szolgáltatások',
    legalName: {
      value: 'Szomorúfűz Temetkezési Hálózat Kft.',
      status: 'unverified',
      source: `${AUDIT}: reports/executive-summary.md (élő oldal /ceginformaciok/)`,
    },
    taxId: {
      value: '26704450-2-42',
      status: 'unverified',
      source: `${AUDIT}: reports/seo-audit.md 6.3 (élő oldal /ceginformaciok/)`,
    },
    email: {
      value: 'budapest@temetkezes.hu',
      status: 'unverified',
      source: `${AUDIT}: reports/seo-audit.md 6.3`,
      note: 'Az e-mail-cím aktív használatát és a fogadó postafiókot meg kell erősíteni.',
    },
  },
  primaryPhone: {
    value: { display: '+36 1 720 2710', e164: '+3617202710' },
    status: 'unverified',
    source: `${AUDIT}: reports/seo-audit.md 6.1 (főoldal, /ceginformaciok/)`,
    note:
      'Ellentmondás: az élő oldalon "Információ: +36 30 847-1915" is szerepel (FUN-01: a link a ' +
      '+36 30 313-7920-at hívja). Melyik legyen az egyetlen, kiemelt, sürgős esetben hívható szám?',
  },
  phoneAvailability: {
    value: 'Ügyelet 6:00 és 22:00 óra között',
    status: 'unverified',
    source: `${AUDIT}: reports/conversion-audit.md A. forgatókönyv`,
    note: 'Van-e 0–24 órás halottszállítási ügyelet? Ha igen, melyik számon? (UX-09)',
  },
  defaultSeo: {
    title: 'Szomorúfűz Temetkezés – temetkezési szolgáltatások Budapesten',
    description:
      'Segítünk eligazodni a haláleset utáni teendőkben, és támogatást nyújtunk a búcsúztatás megszervezésében. Szolgáltatások, árak és irodák egy helyen.',
  },
};
