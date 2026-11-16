/* robots.txt: everything open (AI crawlers included, per SEO-STRATEGY), landing pages kept out. */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://accelera.example.com');
  const body = `User-agent: *\nAllow: /\nDisallow: /lp/\n\nSitemap: ${new URL('/sitemap.xml', base).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
