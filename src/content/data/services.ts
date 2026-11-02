import type { Service, ServiceCategory } from '../types';

export const serviceCategories: ServiceCategory[] = [
  { id: 'bucsuztatas', title: 'Búcsúztatás és temetés' },
  { id: 'hamvak', title: 'Hamvak elhelyezése' },
];

/**
 * A szolgáltatásnevek a briefből és az élő oldalról származnak.
 * A rövid leírások szerkesztői VÁZLATOK (copyStatus: 'draft') – tényállítást nem tartalmaznak.
 * A hivatkozások a meglévő URL-ekre mutatnak (a hamvasztási pillér-oldal kiválasztása nyitott kérdés).
 */
export const services: Service[] = [
  {
    id: 'hamvasztas',
    title: 'Hamvasztás',
    summary: 'A hamvasztásos búcsúztatás lehetőségei, menete és a hamvak elhelyezésének módjai.',
    href: '/hamvasztasos-temetes/',
    categoryId: 'bucsuztatas',
    copyStatus: 'draft',
  },
  {
    id: 'koporsos-temetes',
    title: 'Koporsós temetés',
    summary: 'A hagyományos, koporsós búcsúztatás megszervezése és a választható lehetőségek.',
    href: '/koporsos-temetes/',
    categoryId: 'bucsuztatas',
    copyStatus: 'draft',
  },
  {
    id: 'hamvak-szorasa',
    title: 'Hamvak szórása',
    summary: 'Tájékoztatás a hamvak szórásáról és arról, hogyan zajlik a búcsú.',
    href: '/hamvak-szorasa-temeto/',
    categoryId: 'hamvak',
    copyStatus: 'draft',
  },
  {
    id: 'hajos-temetes',
    title: 'Hajós temetés',
    summary: 'Búcsú a Dunán: a hajós temetés menete és a szervezés tudnivalói.',
    href: '/hamvak-szorasa-dunaba/',
    categoryId: 'hamvak',
    copyStatus: 'draft',
  },
];
