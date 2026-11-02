// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
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
      // ---- Űrlapok (audit SZF-002). Értékek: Vercel → Settings → Environment Variables ----
      // disabled | dry-run | smtp. Hiányában: Vercel preview és helyi fejlesztés → dry-run,
      // minden más (production) → disabled. Csak jóváhagyott adatkezelési tájékoztató után: smtp.
      FORMS_DELIVERY: envField.enum({
        context: 'server',
        access: 'public',
        values: ['disabled', 'dry-run', 'smtp'],
        optional: true,
      }),
      // Vercel automatikusan beállítja (production | preview | development).
      VERCEL_ENV: envField.string({ context: 'server', access: 'public', optional: true }),
      FORMS_RECIPIENT: envField.string({ context: 'server', access: 'secret', optional: true }),
      FORMS_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
      FORMS_ALLOWED_ORIGINS: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      FORMS_RATE_SALT: envField.string({ context: 'server', access: 'secret', optional: true }),
      SMTP_HOST: envField.string({ context: 'server', access: 'secret', optional: true }),
      SMTP_PORT: envField.number({ context: 'server', access: 'secret', optional: true }),
      SMTP_SECURE: envField.boolean({ context: 'server', access: 'secret', optional: true }),
      SMTP_USER: envField.string({ context: 'server', access: 'secret', optional: true }),
      SMTP_PASS: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  // Statikus oldalak + egyetlen szerveroldali végpont (/api/urlap/, prerender = false).
  adapter: vercel(),
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
