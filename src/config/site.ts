/*
  The website's map: one list drives the nav, the footer, the sitemap and llms.txt.
  /lp/* landing pages are NOT here on purpose: they are noindex ad pages.
  The domain is not bought yet; astro.config.mjs `site` holds a placeholder (accelera.example.com).
*/

export interface PageEntry {
  path: string;
  title: string;
  /* One line for the footer, llms.txt and link cards. */
  summary: string;
  group: 'main' | 'service' | 'trade' | 'company' | 'tool';
}

export const pages: PageEntry[] = [
  { path: '/', title: 'Home', summary: 'Websites, online booking and after-hours answering for Twin Cities trades.', group: 'main' },
  {
    path: '/website-design-minnesota/',
    title: 'Website design',
    summary: 'A website built to show up when people search your trade and your city.',
    group: 'service',
  },
  {
    path: '/online-booking-minnesota/',
    title: 'Online booking',
    summary: 'Customers book a job and a time on your site with no account.',
    group: 'service',
  },
  {
    path: '/after-hours-answering-service-minnesota/',
    title: 'After-hours answering',
    summary: 'Calls get answered nights, weekends and holidays, and the job gets booked.',
    group: 'service',
  },
  { path: '/plumbers/', title: 'Plumbers', summary: 'Catch the 2 a.m. burst-pipe calls and let customers book drains and water heaters online.', group: 'trade' },
  { path: '/roofers/', title: 'Roofers', summary: 'Get found after a storm and book inspections, even at night.', group: 'trade' },
  { path: '/auto-repair/', title: 'Auto repair', summary: 'Let drivers book a repair after you close, without a phone call.', group: 'trade' },
  { path: '/contractors/', title: 'Contractors', summary: 'Let homeowners book an estimate online while you are on the job.', group: 'trade' },
  { path: '/pricing/', title: 'Pricing', summary: 'What each part costs and how payment works.', group: 'company' },
  { path: '/how-it-works/', title: 'How it works', summary: 'One short call, we build it, you approve it.', group: 'company' },
  { path: '/about/', title: 'About', summary: 'Who runs Accelera and why it is Twin Cities only.', group: 'company' },
  { path: '/faq/', title: 'FAQ', summary: 'Straight answers to the questions owners ask most.', group: 'company' },
  { path: '/contact/', title: 'Contact', summary: 'Ask for a free missed-call and booking audit.', group: 'company' },
  { path: '/privacy/', title: 'Privacy', summary: 'What we collect, why, and how to have it deleted.', group: 'company' },
  {
    path: '/tools/missed-call-calculator/',
    title: 'Missed-call calculator',
    summary: 'See what missed calls may cost your business each month.',
    group: 'tool',
  },
];

export const nav = [
  { label: 'Services', path: '/website-design-minnesota/', children: pages.filter((p) => p.group === 'service') },
  { label: 'Who we help', path: '/plumbers/', children: pages.filter((p) => p.group === 'trade') },
  { label: 'Pricing', path: '/pricing/' },
  { label: 'How it works', path: '/how-it-works/' },
  { label: 'About', path: '/about/' },
];

/* The seven-county Twin Cities metro: the only area Accelera serves. */
export const serviceArea = ['Hennepin', 'Ramsey', 'Dakota', 'Anoka', 'Washington', 'Scott', 'Carver'];

export const business = {
  name: 'Accelera',
  founder: 'Tyler Maxwell',
  description:
    'Accelera builds websites, online booking and after-hours call answering for plumbers, roofers, auto repair shops and contractors in the Twin Cities metro of Minnesota.',
};
