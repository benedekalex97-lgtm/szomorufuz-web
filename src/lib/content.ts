/**
 * Tartalom-hozzáférési réteg.
 * A komponensek ezen keresztül kérnek adatot; a 3. fázisban a függvények törzse
 * Sanity-lekérdezésre cserélhető – a hívó oldalak változatlanok maradnak.
 */
import { articles } from '@/content/articles';
import { offices } from '@/content/data/contact';
import { homepage } from '@/content/data/homepage';
import { navigation } from '@/content/data/navigation';
import { siteSettings } from '@/content/data/site-settings';
import type { Article, Homepage, Navigation, Office, SiteSettings } from '@/content/types';

export const getSiteSettings = async (): Promise<SiteSettings> => siteSettings;
export const getNavigation = async (): Promise<Navigation> => navigation;
export const getHomepage = async (): Promise<Homepage> => homepage;
export const getOffices = async (): Promise<Office[]> => offices;
export const getArticles = async (): Promise<Article[]> => articles;
