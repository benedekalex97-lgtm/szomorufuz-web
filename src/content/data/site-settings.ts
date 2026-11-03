import type { SiteSettings } from '../types';

/**
 * Az élő weboldalon (budapest-temetkezes.hu) publikált adatok – az ügyfél utasítása
 * szerint jóváhagyott forrásadatok (2026-11-02). Részletek: src/content/data/contact.ts
 */
const LIVE = 'https://www.budapest-temetkezes.hu (élő oldal, 2026-11-02)';
const approved = {
  status: 'verified' as const,
  source: LIVE,
  verifiedAt: '2026-11-02',
  verifiedBy: 'Ügyfél: az élő oldal adatai jóváhagyottak',
};
export const siteSettings: SiteSettings = {
  company: {
    displayName: 'Szomorúfűz',
    tagline: 'Temetkezési szolgáltatások',
    legalName: { value: 'Szomorúfűz Temetkezési Hálózat Kft.', ...approved },
    taxId: { value: '26704450-2-42', ...approved },
    email: { value: 'budapest@temetkezes.hu', ...approved },
  },
  primaryPhone: { value: { display: '+36 30 847 1915', e164: '+36308471915' }, ...approved },
  phoneAvailability: { value: '6:00 és 22:00 óra között hívható', ...approved },
  defaultSeo: {
    title: 'Szomorúfűz Temetkezés – temetkezési szolgáltatások Budapesten',
    description:
      'Hamvasztásos és koporsós temetés teljes körű ügyintézéssel, öt budapesti irodában. Információ: +36 30 847 1915, ügyeleti halottszállítás: +36 30 849 3538.',
  },
};
