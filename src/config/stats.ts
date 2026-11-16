/*
  Only stats from research/STATS.md marked VERIFIED, with source URL, retrieval date and sample size.
  Do not add a number here without a primary source.
*/

export interface Stat {
  id: string;
  value: string;
  label: string;
  source: string;
  sample: string;
  url: string;
  retrieved: string;
}

export const stats = {
  unanswered: {
    id: 'unanswered',
    value: '27%',
    label: 'of calls to home-service businesses go unanswered.',
    source: 'Invoca',
    sample: 'Invoca platform data, 2022 (sample size not published)',
    url: 'https://www.invoca.com/blog/how-much-missed-sales-calls-cost-home-services-businesses',
    retrieved: '2026-11-15',
  },
  voicemail: {
    id: 'voicemail',
    value: 'Under 3%',
    label: 'of callers sent to voicemail leave a message.',
    source: 'Invoca',
    sample: 'Invoca call data, 2024 (sample size not published)',
    url: 'https://www.invoca.com/blog/how-much-missed-sales-calls-cost-home-services-businesses',
    retrieved: '2026-11-15',
  },
  bookOnCall: {
    id: 'bookOnCall',
    value: '46%',
    label: 'of phone leads to home-service businesses convert on the call.',
    // Invoca Call Conversion Industry Benchmarks Report 2025 (60M+ calls, all industries; home services 46%).
    // Primary: https://www.invoca.com/reports/the-invoca-call-conversion-industry-benchmarks-report-2025
    // (gated; its public text does not show the 46%), so the page links the trade-press write-up that quotes it.
    source: 'Invoca 2025 benchmark report, via Plumbing & Mechanical',
    sample: '60M+ calls across industries',
    url: 'https://www.pmmag.com/articles/106597-home-services-call-performance-report-46-lead-conversion-rate-segment-benchmarks',
    retrieved: '2026-11-15',
  },
  roofers: {
    id: 'roofers',
    value: '28.1%',
    label: 'of calls to roofers get answered live.',
    source: '99 Calls',
    sample: '36,498 contractor calls',
    url: 'https://99calls.com/blog/contractor-call-answer-rate-benchmarks',
    retrieved: '2026-11-12',
  },
  threeOrFewer: {
    id: 'threeOrFewer',
    value: '72%',
    label: 'of people look at 3 or fewer businesses before they choose.',
    source: 'BrightLocal 2025',
    sample: '1,200+ US consumers',
    url: 'https://www.brightlocal.com/research/local-consumer-review-survey/2025/',
    retrieved: '2026-11-12',
  },
  bookingGap: {
    id: 'bookingGap',
    value: '7 of 8',
    label: 'Twin Cities businesses we checked offer booking but have no online scheduler.',
    source: 'Accelera audit',
    sample: '8 businesses, 2026-11-11',
    url: '',
    retrieved: '2026-11-11',
  },
} satisfies Record<string, Stat>;
