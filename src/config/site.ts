import { PUBLIC_CONTENT_MODE, PUBLIC_SITE_ENV } from 'astro:env/client';

export const SITE_URL = 'https://www.budapest-temetkezes.hu';
export const SITE_LOCALE = 'hu-HU';
export const SITE_LANG = 'hu';
export const OG_LOCALE = 'hu_HU';

export const siteEnv = PUBLIC_SITE_ENV;
export const isProduction = siteEnv === 'production';

/** Csak éles környezetben engedjük az indexelést – a staging/preview soha ne kerüljön indexbe. */
export const allowIndexing = isProduction;

/**
 * "review" módban az ellenőrizetlen adatok is látszanak (jelölve) belső átnézéshez.
 * Éles környezetben a review mód TILTOTT – ott mindig strict.
 */
export const contentMode: 'strict' | 'review' = isProduction ? 'strict' : PUBLIC_CONTENT_MODE;
