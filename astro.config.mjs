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
    // ---- Audit SZF-007: a régi oldal 404-et adó URL-jei (lásd docs/audit-remediation-2026-11.md) ----
    '/sirjelzo/': '/urnak/#sirjelzok',
    '/textiliak/': '/urnak/#textiliak',
    // SZF-012: az anonim visszajelző kérdőív üzleti jóváhagyásra vár → kapcsolatfelvételi űrlap
    '/visszajelzes-kuldese/': '/elerhetoseg/#uzenet',
    '/termek-adatlapok/fejfa-sephia-kezzel-festett-femurna-0102001/517/': '/urnak/#fejfa-0102001',
    '/termek-adatlapok/alkonyat-sephia-kezzel-festett-urna-0102002/1312/':
      '/urnak/#alkonyat-0102002',
    '/termek-adatlapok/cedrus-sephia-kezzel-festett-femurna-0102003/1313/':
      '/urnak/#cedrus-0102003',
    '/termek-adatlapok/csend-sephia-kezzel-festett-femurna-0102004/1317/': '/urnak/#csend-0102004',
    '/termek-adatlapok/erdo-sephia-kezzel-festett-femurna-0102005/1318/': '/urnak/#erdo-0102005',
    '/termek-adatlapok/liliom-sephia-kezzel-festett-femurna-0102006/1319/':
      '/urnak/#liliom-0102006',
    '/termek-adatlapok/vizpart-sephia-kezzel-festett-femurna-0102007/1320/':
      '/urnak/#vizpart-0102007',
    // Jogszabályok: a régi (elavulható) szövegek helyett a lista és a hivatalos forrás (njt.hu)
    '/jogszabalyok/1999-evi-xliii-torveny-a-temetokrol-es-a-temetkezesrol/24177/':
      '/jogszabalyok/#tv-1999-xliii',
    '/jogszabalyok/145-1999-x-1-korm-rendelet-a-temetokrol-es-a-temetkezesrol/24178/':
      '/jogszabalyok/#korm-145-1999',
    '/jogszabalyok/146-1999-x-1-korm-rendelet-a-nemzeti-kegyeleti-bizottsag-szervezeterol/24179/':
      '/jogszabalyok/#korm-146-1999',
    '/jogszabalyok/2005-evi-xxi-torveny/24180/': '/jogszabalyok/#tv-2005-xxi',
    '/jogszabalyok/34-1999-ix-24-bm-eum-im-egyuttes-rendelet/24181/':
      '/jogszabalyok/#bm-eum-im-34-1999',
    '/jogszabalyok/2013-evi-cxxxviii-torveny/24182/': '/jogszabalyok/#tv-2013-cxxxviii',
    '/jogszabalyok/379-2013-x-25-korm-rendelet/24183/': '/jogszabalyok/#korm-379-2013',
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
