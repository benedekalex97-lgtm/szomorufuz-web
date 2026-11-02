// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import placeholderPages from './src/content/data/placeholder-pages.json' with { type: 'json' };

// A kanonikus domain a SEO-migrációs terv szerint változatlan marad.
const SITE_URL = 'https://www.budapest-temetkezes.hu';

// Fejlesztés alatti (noindex) helyőrző oldalak – nem kerülnek a sitemapbe.
const PLACEHOLDER_PATHS = new Set(placeholderPages.map((p) => `/${p.slug}/`));
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
  // A meglévő URL-ek perjellel végződnek – ezt megtartjuk.
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // A kis méretű CSS beágyazása megszünteti a renderblokkoló kérést (mobil FCP/LCP).
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !PLACEHOLDER_PATHS.has(pathname) && !INTERNAL_PATHS.has(pathname);
      },
    }),
  ],
});
