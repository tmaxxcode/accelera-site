/*
  JSON-LD builders. Rules:
  - No address, phone or email in schema until Tyler approves real ones (offer.ts contact.* approved).
  - No prices in schema until offer.ts prices are approved.
  - No ratings or reviews: none exist.
*/
import { business, serviceArea } from './site';
import { contact } from './offer';

export function orgSchema(site: URL) {
  const org: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': new URL('/#org', site).href,
    name: business.name,
    url: site.href,
    logo: new URL('/brand/accelera-logo.png', site).href,
    description: business.description,
    founder: { '@type': 'Person', name: business.founder },
    areaServed: serviceArea.map((c) => ({ '@type': 'AdministrativeArea', name: `${c} County, Minnesota` })),
    knowsAbout: ['Website design', 'Online booking', 'After-hours call answering', 'Local search for trades'],
  };
  if (contact.phoneDisplay.approved) org.telephone = contact.phoneDisplay.value;
  if (contact.email.approved) org.email = contact.email.value;
  return org;
}

export function serviceSchema(site: URL, name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: new URL(path, site).href,
    provider: { '@id': new URL('/#org', site).href },
    areaServed: { '@type': 'AdministrativeArea', name: 'Twin Cities metro, Minnesota' },
  };
}

export function breadcrumbSchema(site: URL, trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: new URL(t.path, site).href,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}
