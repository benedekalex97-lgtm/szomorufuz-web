import type { FormId } from '@/forms/definitions';

/**
 * Tartalomtípusok – a későbbi Sanity-sémák előképe (docs/content-model.md).
 *
 * Két kulcsfogalom:
 *  - Fact<T>: üzleti TÉNY (telefonszám, cím, ár, nyitvatartás, céges állítás).
 *    Csak "verified" státusszal jelenhet meg nyilvánosan.
 *  - CopyStatus: SZÖVEG szerkesztői állapota (vázlat / jóváhagyott / demonstrációs).
 */

export type VerificationStatus = 'verified' | 'unverified';

export interface Fact<T> {
  value: T;
  status: VerificationStatus;
  /** Honnan származik az adat (pl. audit fájl, élő oldal URL, ügyféltől kapott dokumentum). */
  source: string;
  /** Ellentmondás, kérdés vagy megjegyzés az ellenőrzéshez. */
  note?: string;
  /** ISO dátum – ki és mikor hagyta jóvá (verified esetén kötelező gyakorlat). */
  verifiedAt?: string;
  verifiedBy?: string;
}

export type CopyStatus = 'draft' | 'approved' | 'demo';

export interface PhoneNumber {
  /** Megjelenített forma, pl. "+36 1 234 5678" */
  display: string;
  /** E.164 forma a tel: linkhez, pl. "+3612345678" */
  e164: string;
}

export interface PostalAddress {
  postalCode?: string;
  locality: string;
  streetAddress: string;
  /** Pl. "VI. kerület" */
  district?: string;
}

export type DayOfWeek =
  'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface OpeningHoursRule {
  /** Emberi olvasásra, pl. "Hétfő–péntek" */
  label: string;
  days: DayOfWeek[];
  /** "HH:MM" */
  opens: string;
  closes: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface NavItem extends Link {
  /** Képernyőolvasónak kiegészítő leírás, ha a felirat önmagában nem elég. */
  description?: string;
}

export interface Navigation {
  /** Asztali fejléc (rövid lista) */
  header: NavItem[];
  /** Mobilmenü (teljes lista) */
  primary: NavItem[];
  footerImportant: NavItem[];
  footerLegal: NavItem[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  noindex?: boolean;
  /** Abszolút vagy gyökér-relatív útvonal; ha üres, a kanonikus URL az aktuális útvonal. */
  canonicalPath?: string;
  ogImage?: string;
}

export interface Company {
  displayName: string;
  tagline: string;
  legalName: Fact<string>;
  taxId: Fact<string>;
  email: Fact<string>;
}

export interface SiteSettings {
  company: Company;
  /** Elsődleges, sürgős esetben hívható szám (a hívássáv és a hero CTA ezt használja). */
  primaryPhone: Fact<PhoneNumber>;
  /** Elérhetőség leírása, pl. "0–24 órában hívható". Kitalálni tilos. */
  phoneAvailability: Fact<string>;
  defaultSeo: SeoMetadata;
}

export interface ServiceCategory {
  id: string;
  title: string;
}

export interface Service {
  id: string;
  title: string;
  summary: string;
  href: string;
  categoryId: string;
  copyStatus: CopyStatus;
}

export interface PriceValue {
  amount: number;
  currency: 'HUF';
  qualifier: 'from' | 'fixed';
}

export interface PricingItem {
  id: string;
  name: string;
  serviceId?: string;
  price: Fact<PriceValue>;
  includes?: string[];
}

export interface PricingCategory {
  id: string;
  title: string;
  items: PricingItem[];
}

export interface Office {
  id: string;
  slug: string;
  /** Az élő oldal elnevezése, pl. „Belvárosi iroda” */
  name: string;
  /** Pl. „VI. kerület” */
  district: string;
  /** Római szám a tipográfiai listához, pl. „VI.” */
  numeral: string;
  postalCode: string;
  locality: string;
  street: string;
  landline: PhoneNumber;
  mobile: PhoneNumber;
  /** Megközelítés – az élő oldal leírása alapján */
  directions: string;
  mapUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  copyStatus: CopyStatus;
}

export interface Step {
  title: string;
  body: string;
}

export interface TrustPoint {
  title: string;
  body: string;
  fact: Fact<true>;
}

export interface HelpPath {
  label: string;
  title: string;
  body: string;
  href: string;
}

export interface ServiceTeaser {
  title: string;
  body: string;
  href: string;
  points?: string[];
}

export interface Principle {
  title: string;
  body: string;
}

export interface Homepage {
  seo: SeoMetadata;
  hero: {
    eyebrow: string;
    title: string;
    /** A cím dőlt, kiemelt része (új sorban). */
    titleEmphasis: string;
    lead: string;
    secondaryCta: Link;
    paths: HelpPath[];
  };
  intro: { eyebrow: string; title: string; paragraphs: string[]; points: Principle[] };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    featured: ServiceTeaser[];
    others: ServiceTeaser[];
    cta: Link;
  };
  situations: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ServiceTeaser[];
    cta: Link;
  };
  handled: { eyebrow: string; title: string; intro: string; items: string[] };
  prices: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { label: string; value: string; note: string; href: string; quote?: boolean }[];
    cta: Link;
  };
  offices: { eyebrow: string; title: string; intro: string; cta: Link };
  faq: { eyebrow: string; title: string; intro: string; cta: Link };
  contact: { title: string; intro: string };
}

export interface ContentPage {
  slug: string;
  title: string;
  seo: SeoMetadata;
  /** A fejlesztés melyik fázisában készül el. */
  plannedPhase: number;
  breadcrumbParent?: Link;
}

export interface Redirect {
  from: string;
  to: string;
  status: 301 | 308 | 410;
  reason: string;
}

/** Központi elérhetőség (szerepenként elkülönítve). */
export interface ContactLine {
  label: string;
  phone: PhoneNumber;
  note?: string;
}

/** Cikk-blokkok a hosszú tájékoztató oldalakhoz. Szövegben: [link](url), **kiemelés**. */
export type ArticleBlock =
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string; id?: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'steps'; items: Step[] }
  | { type: 'price'; label: string; value: string; note?: string; condition?: string }
  | { type: 'callout'; title?: string; text: string }
  | { type: 'legal'; source: string; paragraphs: string[] }
  | { type: 'defs'; items: { term: string; text: string; id?: string }[] }
  | { type: 'facts'; items: { label: string; value: string }[] }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'contact' }
  | { type: 'quote-cta'; title?: string }
  | { type: 'quote-request' }
  | { type: 'form'; form: FormId }
  | { type: 'quote-forms' }
  | { type: 'gallery'; group: 'ravatalozo'; title: string; id: string }
  | { type: 'catalog'; group: 'sephia' | 'sirjelzok' | 'urnateritok' | 'urnaleeresztok' };

export interface Article {
  slug: string;
  /** Az élő oldal forrás-URL-je (vagy több). */
  source: string[];
  section: 'teendok' | 'szolgaltatas' | 'tudnivalo' | 'arak' | 'ceg' | 'jogi';
  eyebrow: string;
  title: string;
  titleEmphasis?: string;
  lead: string;
  seo: SeoMetadata;
  blocks: ArticleBlock[];
  /** Kapcsolódó cikkek (slug) */
  related?: string[];
}
