// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

// Környezet a build idejére (.env fájl vagy a hosting környezeti változói).
const { PUBLIC_SITE_ENV } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const IS_PRODUCTION = (process.env.PUBLIC_SITE_ENV ?? PUBLIC_SITE_ENV) === 'production';

// A kanonikus domain a SEO-migrációs terv szerint változatlan marad.
const SITE_URL = 'https://www.budapest-temetkezes.hu';

// Belső oldalak (stílusútmutató) – szintén noindex.
const INTERNAL_PATHS = new Set(['/stilus/']);

export default defineConfig({
  env: {
    schema: {
      PUBLIC_SITE_ENV: envField.enum({
        context: 'client',
        access: 'public',
        values: ['development', 'preview', 'production'],
        default: 'development',
      }),
      PUBLIC_CONTENT_MODE: envField.enum({
        context: 'client',
        access: 'public',
        values: ['strict', 'review'],
        default: 'strict',
      }),
    },
  },
  site: SITE_URL,
  // Összevont / duplikált URL-ek (a SEO-migrációs terv szerint)
  redirects: {
    '/arajanlatkeres/': '/arajanlat-keres-itt/',
    '/irodak/': '/elerhetoseg/#irodak',
    '/suti-tajekoztato/': '/adatkezeles/#sutik',
    '/ravatalozo-galeria/': '/ravatalozo-terem/',
    '/termek-adatlapok/': '/urnak/',
    '/hasznos-linkek/': '/jogszabalyok/',
  },
  // A meglévő URL-ek perjellel végződnek – ezt megtartjuk.
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // A kis méretű CSS beágyazása megszünteti a renderblokkoló kérést (mobil FCP/LCP).
    inlineStylesheets: 'always',
  },
  // Sitemap csak éles környezetben készül – a felülvizsgálati buildek ne hivatkozzanak
  // az éles domainre, és ne kínáljanak fel URL-listát a keresőknek.
  integrations: IS_PRODUCTION
    ? [
        sitemap({
          filter: (page) => {
            const { pathname } = new URL(page);
            return !INTERNAL_PATHS.has(pathname);
          },
        }),
      ]
    : [],
});
