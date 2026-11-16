/* Sitemap of the public website. /lp/* landing pages are noindex and left out on purpose. */
import type { APIRoute } from 'astro';
import { pages } from '../config/site';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://accelera.example.com');
  const urls = pages.map((p) => `  <url><loc>${new URL(p.path, base).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
