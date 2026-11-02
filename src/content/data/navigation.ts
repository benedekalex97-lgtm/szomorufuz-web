import type { Navigation } from '../types';

/** A meglévő, SEO-értékes URL-ek változatlanok (strategy/redirect-map.csv). */
export const navigation: Navigation = {
  header: [
    { label: 'Teendők', href: '/teendok-halaleset-utan/', description: 'Teendők haláleset után' },
    { label: 'Szolgáltatások', href: '/szolgaltatasok/' },
    { label: 'Árak', href: '/arak/' },
    { label: 'Árajánlat', href: '/arajanlat-keres-itt/', description: 'Árajánlat kérés' },
    { label: 'Tudnivalók', href: '/tudnivalok/' },
    { label: 'Kapcsolat', href: '/elerhetoseg/' },
  ],
  primary: [
    { label: 'Főoldal', href: '/' },
    { label: 'Teendők haláleset után', href: '/teendok-halaleset-utan/' },
    { label: 'Szolgáltatások', href: '/szolgaltatasok/' },
    { label: 'Árak és árgarancia', href: '/arak/' },
    { label: 'Árajánlat kérés', href: '/arajanlat-keres-itt/' },
    { label: 'Tudnivalók', href: '/tudnivalok/' },
    { label: 'Rólunk', href: '/rolunk/' },
    { label: 'Kapcsolat és irodák', href: '/elerhetoseg/' },
  ],
  footerImportant: [
    { label: 'Teendők haláleset után', href: '/teendok-halaleset-utan/' },
    { label: 'Szükséges iratok', href: '/szukseges-iratok/' },
    { label: 'A hamvasztás menete', href: '/hamvasztas-menete/' },
    { label: 'Szociális temetés', href: '/szocialis-temetes/' },
    { label: 'Jogszabályok', href: '/jogszabalyok/' },
    { label: 'Gyakori kérdések', href: '/gyakori-kerdesek/' },
  ],
  footerLegal: [
    { label: 'Céginformációk', href: '/ceginformaciok/' },
    { label: 'Adatkezelés és sütik', href: '/adatkezeles/' },
    { label: 'Jogi nyilatkozat', href: '/jogi-nyilatkozat/' },
    { label: 'Rólunk', href: '/rolunk/' },
  ],
};
