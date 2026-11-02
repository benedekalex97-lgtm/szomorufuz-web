/**
 * Tartalom-hozzáférési réteg.
 * A komponensek KIZÁRÓLAG ezen keresztül kérnek adatot. A 3. fázisban a függvények
 * törzse Sanity GROQ-lekérdezésre cserélődik – a hívó oldalak változatlanok maradnak.
 */
import { faqItems } from '@/content/data/faq';
import { homepage } from '@/content/data/homepage';
import { navigation } from '@/content/data/navigation';
import { offices } from '@/content/data/offices';
import placeholderPages from '@/content/data/placeholder-pages.json';
import { pricingCategories } from '@/content/data/pricing';
import { servicePages } from '@/content/data/service-pages';
import { serviceCategories, services } from '@/content/data/services';
import { teendok } from '@/content/data/teendok';
import { siteSettings } from '@/content/data/site-settings';
import type {
  ContentPage,
  FaqItem,
  Homepage,
  Navigation,
  Office,
  PricingCategory,
  ServicePage,
  Service,
  ServiceCategory,
  SiteSettings,
} from '@/content/types';

export const getSiteSettings = async (): Promise<SiteSettings> => siteSettings;
export const getNavigation = async (): Promise<Navigation> => navigation;
export const getHomepage = async (): Promise<Homepage> => homepage;
export const getServices = async (): Promise<Service[]> => services;
export const getServiceCategories = async (): Promise<ServiceCategory[]> => serviceCategories;
export const getPricingCategories = async (): Promise<PricingCategory[]> => pricingCategories;
export const getOffices = async (): Promise<Office[]> => offices;
export const getFaqItems = async (): Promise<FaqItem[]> => faqItems;
export const getServicePage = async (slug: string): Promise<ServicePage> => {
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Ismeretlen szolgáltatásoldal: ${slug}`);
  return page;
};
export const getTeendok = async () => teendok;

export const getPlaceholderPages = async (): Promise<ContentPage[]> =>
  placeholderPages.map((p) => ({
    slug: p.slug,
    title: p.title,
    plannedPhase: p.plannedPhase,
    seo: {
      title: `${p.title} – fejlesztés alatt`,
      description: `${p.title}: ez az oldal a weboldal-megújítás ${p.plannedPhase}. fázisában készül el.`,
      noindex: true,
    },
  }));
