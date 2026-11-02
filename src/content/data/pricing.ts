import type { PricingCategory } from '../types';

/**
 * Árlista – JÓVÁHAGYÁSRA VÁR. Egyetlen ár sem jelenik meg, amíg status !== 'verified'.
 * A koporsós temetés "-tól" ára az élő oldalon szerepel, de aktualitása nem igazolt.
 */
export const pricingCategories: PricingCategory[] = [
  {
    id: 'temetesek',
    title: 'Temetési módok',
    items: [
      {
        id: 'koporsos-temetes-alap',
        name: 'Koporsós temetés',
        serviceId: 'koporsos-temetes',
        price: {
          value: { amount: 232288, currency: 'HUF', qualifier: 'from' },
          status: 'unverified',
          source: 'Szomorufuz-webaudit: reports/seo-audit.md 3. (élő oldal /koporsos-temetes/)',
          note: 'Aktuális-e az ár, és pontosan mit tartalmaz?',
        },
      },
    ],
  },
];
