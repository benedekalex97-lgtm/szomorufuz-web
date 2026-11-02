import type { OpeningHoursRule, PostalAddress, PriceValue } from '@/content/types';

export const telHref = (e164: string): string => `tel:${e164}`;

export const formatAddress = (a: PostalAddress): string =>
  [a.postalCode ? `${a.postalCode} ${a.locality}` : a.locality, a.streetAddress].join(', ');

export const formatHours = (r: OpeningHoursRule): string =>
  `${r.label}: ${r.opens.replace(/^0/, '')}–${r.closes.replace(/^0/, '')}`;

const huf = new Intl.NumberFormat('hu-HU', {
  style: 'currency',
  currency: 'HUF',
  maximumFractionDigits: 0,
});

export const formatPrice = (p: PriceValue): string =>
  p.qualifier === 'from' ? `${huf.format(p.amount)}-tól` : huf.format(p.amount);
