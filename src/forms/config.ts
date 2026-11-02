/**
 * Az űrlapok működési módja – build időben rögzül, így az oldal és a végpont egyezik.
 * Lásd astro.config.mjs (env schema) és docs/audit-remediation-2026-11.md.
 */
import { FORMS_DELIVERY, VERCEL_ENV } from 'astro:env/server';

import type { DeliveryMode } from './delivery';

export function resolveMode(
  explicit: DeliveryMode | undefined,
  vercelEnv: string | undefined,
  dev: boolean,
): DeliveryMode {
  if (explicit) return explicit;
  return vercelEnv === 'preview' || dev ? 'dry-run' : 'disabled';
}

export const formsMode: DeliveryMode = resolveMode(FORMS_DELIVERY, VERCEL_ENV, import.meta.env.DEV);
