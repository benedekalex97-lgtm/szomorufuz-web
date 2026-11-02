import { SITE_URL } from '@/config/site';
import type { SiteSettings } from '@/content/types';
import { verifiedOnly } from '@/lib/facts';

const BRAND = 'Szomorúfűz Temetkezés';
const TITLE_MAX = 60;

/** Title: ha a márkanév még belefér 60 karakterbe, utótagként hozzáadjuk. */
export function buildTitle(title: string): string {
  if (title.includes(BRAND)) return title;
  const withBrand = `${title} | ${BRAND}`;
  return withBrand.length <= TITLE_MAX ? withBrand : title;
}

/** Abszolút, https + www, perjellel végződő kanonikus URL (SEO-migrációs terv 4. pont). */
export function canonicalUrl(pathname: string): string {
  const clean = pathname.split(/[?#]/)[0] ?? '/';
  const withSlash = clean.endsWith('/') || /\.[a-z0-9]+$/i.test(clean) ? clean : `${clean}/`;
  return new URL(withSlash, SITE_URL).href;
}

type JsonLd = Record<string, unknown>;

/** Organization + WebSite séma – csak ellenőrzött mezőkkel. */
export function organizationJsonLd(settings: SiteSettings): JsonLd[] {
  const legalName = verifiedOnly(settings.company.legalName);
  const taxId = verifiedOnly(settings.company.taxId);
  const email = verifiedOnly(settings.company.email);
  const phone = verifiedOnly(settings.primaryPhone);

  const org: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#org`,
    name: BRAND,
    url: `${SITE_URL}/`,
    ...(legalName ? { legalName } : {}),
    ...(taxId ? { taxID: taxId } : {}),
    ...(email ? { email } : {}),
    ...(phone
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: phone.e164,
            contactType: 'customer service',
            areaServed: 'HU',
            availableLanguage: 'hu',
          },
        }
      : {}),
  };

  const website: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BRAND,
    url: `${SITE_URL}/`,
    inLanguage: 'hu-HU',
    publisher: { '@id': `${SITE_URL}/#org` },
  };

  return [org, website];
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}
