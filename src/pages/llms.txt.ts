/* llms.txt: a plain summary for AI assistants, built from the same page list as the nav. */
import type { APIRoute } from 'astro';
import { pages, business, serviceArea } from '../config/site';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://accelera.example.com');
  const link = (p: (typeof pages)[number]) => `- [${p.title}](${new URL(p.path, base).href}): ${p.summary}`;
  const section = (label: string, group: string) =>
    `## ${label}\n${pages.filter((p) => p.group === group).map(link).join('\n')}`;
  const body = [
    `# ${business.name}`,
    `> ${business.description}`,
    `Service area: ${serviceArea.join(', ')} counties, Minnesota. Twin Cities only. Founder: ${business.founder}.`,
    section('Services', 'service'),
    section('Trades', 'trade'),
    section('Company', 'company'),
    section('Tools', 'tool'),
  ].join('\n\n');
  return new Response(body + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
