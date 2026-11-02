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
  /** Rövid, strukturális név (kerület + utca) – nem tartalmaz ellenőrizendő részletet. */
  name: string;
  address: Fact<PostalAddress>;
  phones: Fact<PhoneNumber[]>;
  openingHours: Fact<OpeningHoursRule[]>;
  /** Útvonaltervező link. */
  mapUrl: Fact<string>;
  geo?: Fact<{ latitude: number; longitude: number }>;
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
    primaryCtaLabel: string;
    secondaryCta: Link;
    paths: HelpPath[];
  };
  firstSteps: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Step[];
    cta: Link;
    copyStatus: CopyStatus;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    featured: ServiceTeaser[];
    others: ServiceTeaser[];
    cta: Link;
    copyStatus: CopyStatus;
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    stages: Step[];
    copyStatus: CopyStatus;
  };
  pricing: { eyebrow: string; title: string; body: string; cta: Link; copyStatus: CopyStatus };
  about: {
    eyebrow: string;
    quote: string;
    principles: Principle[];
    facts: TrustPoint[];
    copyStatus: CopyStatus;
  };
  offices: { eyebrow: string; title: string; intro: string; cta: Link };
  faq: { eyebrow: string; title: string; intro: string; cta: Link };
  contact: { title: string; intro: string };
}

/** Szolgáltatás-aloldal (Hamvasztás, Hagyományos temetés) tartalma. */
export interface ServicePage {
  slug: string;
  seo: SeoMetadata;
  eyebrow: string;
  title: string;
  titleEmphasis?: string;
  lead: string;
  /** Rövid, áttekintő pontok a hero mellett. */
  overview: { title: string; points: string[] };
  intro: { title: string; paragraphs: string[] };
  steps: { title: string; intro: string; items: Step[] };
  options: { title: string; intro: string; items: Principle[] };
  related: ServiceTeaser[];
  faqIds: string[];
  copyStatus: CopyStatus;
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
