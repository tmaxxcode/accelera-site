# SERP-ANALYSIS.md — SERP analysis for priority keywords

**Method:** Firecrawl with location=Minneapolis, MN
**Target:** Top 30 Tier 1 keywords (by GKP volume once available)
**Date:** 2026-11-12 (framework created; execution pending Firecrawl runs)

---

## Analysis Template (per keyword)

| Field | Description |
|---|---|
| Keyword | Exact query analyzed |
| Search Date | YYYY-MM-DD |
| Location | Minneapolis, MN (Firecrawl param) |
| Map Pack Present | Yes/No |
| Map Pack Count | Number of GBP listings (typically 3) |
| Organic Results Count | Number of organic blue links (typically 10) |
| Top 10 URLs | Full URLs of positions 1-10 |
| Page Types | Homepage / Service page / City page / Directory / Blog / Other |
| Word Count (avg) | Average word count of top 5 organic results |
| Schema Types | LocalBusiness, Service, FAQPage, etc. found |
| Title Patterns | Common title tag patterns in top 10 |
| H1 Patterns | Common H1 patterns in top 5 |
| Difficulty Indicator | Low/Med/High based on: DA of top sites, content depth, commercial intent |
| Accelera Opportunity | Can we create a better page? What's missing? |

---

## Priority Keywords for SERP Analysis (Top 30 by expected volume)

### Tier 1: Trade × Service × Core Geo

| # | Keyword | Trade | Service | Geo | Priority |
|---|---|---|---|---|---|
| 1 | plumber website design Minneapolis | Plumbing | Website design | Minneapolis | 1 |
| 2 | plumbing website design Minneapolis | Plumbing | Website design | Minneapolis | 2 |
| 3 | plumber web design Minneapolis | Plumbing | Web design | Minneapolis | 3 |
| 4 | roofing website design Minneapolis | Roofing | Website design | Minneapolis | 4 |
| 5 | roofer website design Minneapolis | Roofing | Website design | Minneapolis | 5 |
| 6 | auto repair website design Minneapolis | Auto | Website design | Minneapolis | 6 |
| 7 | auto repair shop website Minneapolis | Auto | Website design | Minneapolis | 7 |
| 8 | contractor website design Minneapolis | Contracting | Website design | Minneapolis | 8 |
| 9 | plumbing website design St Paul | Plumbing | Website design | St Paul | 9 |
| 10 | roofing website design St Paul | Roofing | Website design | St Paul | 10 |
| 11 | auto repair website design St Paul | Auto | Website design | St Paul | 11 |
| 12 | contractor website design St Paul | Contracting | Website design | St Paul | 12 |
| 13 | plumber website design Minnesota | Plumbing | Website design | Minnesota | 13 |
| 14 | roofing website design Minnesota | Roofing | Website design | Minnesota | 14 |
| 15 | contractor website design Minnesota | Contracting | Website design | Minnesota | 15 |
| 16 | after hours answering service plumbers Minneapolis | Plumbing | After-hours answering | Minneapolis | 16 |
| 17 | after hours answering service roofers Minneapolis | Roofing | After-hours answering | Minneapolis | 17 |
| 18 | online booking for plumbers Minneapolis | Plumbing | Online booking | Minneapolis | 18 |
| 19 | online booking for contractors Minnesota | Contracting | Online booking | Minnesota | 19 |
| 20 | virtual receptionist for plumbers Minneapolis | Plumbing | Virtual receptionist | Minneapolis | 20 |
| 21 | plumber web designer Minneapolis | Plumbing | Web designer | Minneapolis | 21 |
| 22 | roofer web designer Minneapolis | Roofing | Web designer | Minneapolis | 22 |
| 23 | web design for plumbers Minneapolis | Plumbing | Web design | Minneapolis | 23 |
| 24 | web design for roofers Minneapolis | Roofing | Web design | Minneapolis | 24 |
| 25 | small business website design Minneapolis | General | Website design | Minneapolis | 25 |
| 26 | local SEO for contractors Minneapolis | Contracting | SEO | Minneapolis | 26 |
| 27 | plumber website design Twin Cities | Plumbing | Website design | Twin Cities | 27 |
| 28 | roofing website design Twin Cities | Roofing | Website design | Twin Cities | 28 |
| 29 | contractor website Twin Cities | Contracting | Website design | Twin Cities | 29 |
| 30 | emergency plumber website Minneapolis | Plumbing | Website design | Minneapolis | 30 |

---

## Execution Notes

**Firecrawl command pattern:**
```
firecrawl scrape "https://www.google.com/search?q=plumber+website+design+Minneapolis&gl=us&hl=en&uule=w+CAIQICIJTWlubmVhcG9saXM" 
```
Or use Firecrawl's search API with location parameter.

**Map Pack Detection:**
- Look for `div[data-hveid][data-ved]` with local business cards
- Extract: Business name, rating, review count, address, phone, website link, GBP CID

**Schema Extraction:**
- Check for JSON-LD in `<head>` or `<body>`
- Types: LocalBusiness, ProfessionalService, Service, FAQPage, BreadcrumbList, Organization, WebSite

**Content Depth:**
- Use Firecrawl extract to get main content word count
- Note: service area pages, city pages, blog posts, homepage

---

## Competitor Domains to Track (from plan + expected SERP presence)

| Domain | Type | Expected Strength |
|---|---|---|
| clickbuiltwebsites.com | Agency (city×trade matrix) | High — published pricing, many city pages |
| transformeddesign.com | Agency (trade×city pages) | High — specific trade pages |
| proweb365.com | Agency (MN-focused) | High — local presence |
| minnesotadesign.com | Agency (MN) | Medium |
| wyfimarketing.com | Agency (HVAC/plumbing/electrical) | Medium |
| optimumdesigntech.com | Agency | Unknown |
| portkeyseominneapolis.com | SEO agency | Medium |
| askotter.ai | AI answering service | High for answering queries |
| plaudit.com | Agency | Unknown |
| gorapidlocal.com | Answering service (city×trade) | High for answering |
| answeringinnovations.com | Answering service (state pages) | High for answering |
| absentanswer.com | Answering service | Medium |
| voksha.com | Agency | Unknown |

---

## Results Log (to be filled after Firecrawl runs)

| Keyword | Map Pack | Top 3 Organic | Difficulty | Opportunity | Notes |
|---|---|---|---|---|---|
| plumber website design Minneapolis | | | | | |
| plumbing website design Minneapolis | | | | | |
| ... | | | | | |

---

## Next Steps After SERP Analysis

1. Export top 10 URLs per keyword → deduplicate → competitor list
2. Crawl competitor sitemaps for city×trade page matrices
3. Run gtm-skills SEO pipeline on keyword + competitor data
4. Produce SEO-STRATEGY.md with keyword→page map, build order, GBP plan