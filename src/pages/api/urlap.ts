/**
 * POST /api/urlap/ – az összes űrlap szerveroldali végpontja (audit SZF-002).
 * Szerveroldalon fut (Vercel Function); a logika: src/forms/handler.ts.
 */
import type { APIRoute } from 'astro';
import {
  FORMS_ALLOWED_ORIGINS,
  FORMS_FROM,
  FORMS_RATE_SALT,
  FORMS_RECIPIENT,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from 'astro:env/server';

import { formsMode } from '@/forms/config';
import {
  type DeliveryAdapter,
  disabledAdapter,
  dryRunAdapter,
  smtpAdapter,
} from '@/forms/delivery';
import { handleSubmission } from '@/forms/handler';
import { renderFallbackPage } from '@/forms/fallback';
import { IdempotencyStore, RateLimiter } from '@/forms/security';

export const prerender = false;

// Példányonként (egy futó függvényen belül) megosztott tárak.
const limiter = new RateLimiter();
const store = new IdempotencyStore();

function adapter(): DeliveryAdapter {
  if (formsMode === 'smtp') {
    return smtpAdapter({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      user: SMTP_USER,
      pass: SMTP_PASS,
      from: FORMS_FROM,
      to: FORMS_RECIPIENT,
    });
  }
  return formsMode === 'dry-run' ? dryRunAdapter : disabledAdapter;
}

const SECURITY_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
  'X-Content-Type-Options': 'nosniff',
};

/** Kliens-IP csak a korlátozó kulcsához (sózott kivonatként); nem tároljuk, nem naplózzuk. */
function clientIp(context: Parameters<APIRoute>[0]): string | undefined {
  const forwarded = context.request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (forwarded) return forwarded;
  try {
    return context.clientAddress;
  } catch {
    return undefined;
  }
}

export const POST: APIRoute = async (context) => {
  const { request } = context;
  const ip = clientIp(context);
  try {
    const result = await handleSubmission(request, {
      adapter: adapter(),
      limiter,
      store,
      allowedOrigins: (FORMS_ALLOWED_ORIGINS ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      ip,
      salt: FORMS_RATE_SALT ?? 'szomorufuz-urlap',
      log: (entry) => console.info(JSON.stringify(entry)),
    });
    const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
    if (wantsJson) {
      return new Response(JSON.stringify(result.body), {
        status: result.status,
        headers: {
          ...SECURITY_HEADERS,
          ...result.headers,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    }
    // JavaScript nélküli beküldés: egyszerű, saját HTML-válasz.
    return new Response(renderFallbackPage(result), {
      status: result.status,
      headers: {
        ...SECURITY_HEADERS,
        ...result.headers,
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch {
    console.error(JSON.stringify({ event: 'form_submission', outcome: 'exception' }));
    return new Response(
      JSON.stringify({
        ok: false,
        message: 'Váratlan hiba történt. Kérjük, hívjon minket a +36 30 847 1915-ös számon.',
      }),
      {
        status: 500,
        headers: { ...SECURITY_HEADERS, 'Content-Type': 'application/json; charset=utf-8' },
      },
    );
  }
};

export const ALL: APIRoute = () =>
  new Response(null, { status: 405, headers: { ...SECURITY_HEADERS, Allow: 'POST' } });
