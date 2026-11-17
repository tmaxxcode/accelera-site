/*
  Everything on the page that is a business commitment or a contact detail lives here.
  Anything with approved: false renders with a visible "Placeholder" tag.
  When Tyler approves an item, change its value and set approved: true. Nothing else needs editing.

  Release guard: building with PUBLIC_RELEASE=true fails while any item is unapproved,
  so placeholder prices, terms or contact details cannot be deployed by accident.
*/

export interface Term {
  value: string;
  approved: boolean;
  note?: string;
}

export const contact = {
  // Placeholder: 555-01xx numbers are reserved for fiction and cannot ring anyone.
  phoneDisplay: { value: '(612) 555-0100', approved: false, note: 'No business number yet (P3).' },
  phoneHref: { value: 'tel:+16125550100', approved: false },
  email: { value: 'hello@example.com', approved: false, note: 'No business email yet (P3).' },
  calLink: { value: 'https://cal.example.com/accelera/15min', approved: false, note: 'No Cal.com account yet.' },
  // Where the audit form posts. Empty = not connected; the form shows a placeholder notice instead of sending.
  formEndpoint: { value: '', approved: false, note: 'No form backend yet.' },
  privacyUrl: { value: '/privacy/', approved: false, note: 'Draft at /privacy/ (L-3). Tyler approves the wording.' },
} satisfies Record<string, Term>;

export const prices = {
  site: { value: '$1,497 one time', approved: false, note: 'Baseline in MASTER, not approved for client use.' },
  booking: { value: '$597 a month', approved: false },
  answering: { value: '$997 a month', approved: false },
  payment: { value: 'Half to start. Half when you approve the site.', approved: false },
} satisfies Record<string, Term>;

export const terms = {
  delivery: { value: 'Live in two weeks', approved: false, note: 'Two-week delivery is baseline, not a confirmed promise.' },
  guarantee: { value: '30-day money-back on booking and answering', approved: false },
  ownership: { value: 'You own your site', approved: false, note: 'Site ownership terms not confirmed (AL-2 platform open).' },
  approveFirst: { value: 'You approve the site before it goes live', approved: true, note: '"Approve before launch" is documented in MASTER Current facts.' },
  noRetainer: { value: 'No monthly retainer for search rankings', approved: false, note: 'Offer has no SEO retainer line item, but Tyler has not confirmed it as a promise.' },
} satisfies Record<string, Term>;

export function unapproved(): string[] {
  const groups = { contact, prices, terms } as Record<string, Record<string, Term>>;
  const out: string[] = [];
  for (const [g, items] of Object.entries(groups)) {
    for (const [k, t] of Object.entries(items)) if (!t.approved) out.push(`${g}.${k}`);
  }
  return out;
}

export function assertReleasable(site?: URL): void {
  if (import.meta.env.PUBLIC_RELEASE !== 'true') return;
  const open = unapproved();
  // astro.config.mjs `site` feeds canonicals, the sitemap, robots, llms.txt and schema: it must be the real domain.
  if (!site || /(^|\.)example\.(com|org|net)$|\.(test|invalid|localhost|example)$|^localhost$/.test(site.hostname)) open.push('astro.config.mjs site (placeholder domain)');
  if (open.length) {
    throw new Error(`PUBLIC_RELEASE build blocked. Unapproved items (src/config/offer.ts, astro.config.mjs): ${open.join(', ')}`);
  }
}
