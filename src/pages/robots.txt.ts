import type { APIRoute } from 'astro';
import { allowIndexing } from '@/config/site';

/** Nem éles környezetben minden tiltott – a staging nem kerülhet indexbe. */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  const body = allowIndexing
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `# Nem éles környezet – indexelés tiltva\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
