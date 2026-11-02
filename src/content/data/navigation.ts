import type { Navigation } from '../types';

/**
 * Útvonalak: a meglévő, SEO-értékes URL-eket megtartjuk (strategy/redirect-map.csv),
 * új URL csak új oldalnál keletkezik (/arak/, /irodak/, /rolunk/, /szolgaltatasok/, /tudnivalok/).
 */
export const navigation: Navigation = {
  primary: [
    { label: 'Főoldal', href: '/' },
    { label: 'Teendők haláleset esetén', href: '/teendok-halaleset-utan/' },
    { label: 'Szolgáltatások', href: '/szolgaltatasok/' },
    { label: 'Árak', href: '/arak/' },
    { label: 'Irodáink', href: '/irodak/' },
    { label: 'Tudnivalók', href: '/tudnivalok/' },
    { label: 'Rólunk', href: '/rolunk/' },
    { label: 'Kapcsolat', href: '/elerhetoseg/' },
  ],
  footerImportant: [
    { label: 'Teendők haláleset esetén', href: '/teendok-halaleset-utan/' },
    { label: 'Szükséges iratok', href: '/szukseges-iratok/' },
    { label: 'Szolgáltatások', href: '/szolgaltatasok/' },
    { label: 'Árak', href: '/arak/' },
    { label: 'Gyakori kérdések', href: '/gyakori-kerdesek/' },
  ],
  footerLegal: [
    { label: 'Adatkezelési tájékoztató', href: '/adatkezeles/' },
    { label: 'Sütiinformációk', href: '/suti-tajekoztato/' },
    { label: 'Impresszum', href: '/ceginformaciok/' },
    { label: 'ÁSZF', href: '/a-sz-f/' },
  ],
};
