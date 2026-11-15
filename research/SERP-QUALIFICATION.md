# SERP Qualification Summary — Accelera
Date: 2026-11-12

**Method:** Firecrawl with location=Minneapolis, MN (execution pending)
**Source keywords:** Top 30 priority keywords from SERP-ANALYSIS.md (Tier 1 highest expected volume)
**Keyword volumes:** UNVALIDATED (pending Tyler's GKP setup) — qualification based on SERP structure, competitor presence, format signals

---

## Execution Status

**Firecrawl runs:** NOT YET EXECUTED — framework ready
**Required:** Firecrawl API access or manual search with location parameter
**Template:** SERP-ANALYSIS.md has the 30-keyword analysis template with extraction fields

---

## Expected SERP Qualification Framework (Per Pipeline)

For each of the 30 priority keywords, run in parallel:
1. **Firecrawl scrape** with `location=Minneapolis, MN`
2. **Extract:** Map pack presence, top 10 organic URLs, page types, word counts, schema, title/H1 patterns
3. **Answer 6 questions** per keyword (intent clarity, rewarded format, product category fit, realistic competitiveness, format match, freshness)
4. **Assign verdict:** QUALIFY / CONDITIONAL / KILL

---

## Predicted Results (Based on Plan Research + Competitor Analysis)

### Keywords Likely to QUALIFY (Clear intent, beatable gaps, format matches Accelera capability)

| # | Keyword | Predicted Verdict | Rationale |
|---|---------|-------------------|-----------|
| 1 | plumber website design Minneapolis | QUALIFY | ClickBuilt/Transformed rank with city×trade pages; Accelera can build better page with unique audit data + booking demo |
| 2 | plumbing website design Minneapolis | QUALIFY | Same as above — synonym coverage |
| 3 | plumber web design Minneapolis | QUALIFY | Variant — same intent |
| 4 | roofing website design Minneapolis | QUALIFY | ClickBuilt has page; Refuge Roofing (prospect) in Oak Grove — local angle |
| 5 | roofer website design Minneapolis | QUALIFY | Synonym — same intent |
| 6 | auto repair website design Minneapolis | QUALIFY | 3 audited St. Paul auto shops — booking gap 100%; unique data |
| 9 | plumber website design St Paul | QUALIFY | St. Paul is Priority #2 city; 3 plumbing prospects |
| 10 | roofing website design St Paul | QUALIFY | Three Rivers Contracting in Saint Paul Park — local |
| 16 | after hours answering service plumbers Minneapolis | QUALIFY | Gorapidlocal/AskOtter rank; Accelera differentiates on live agents + job capture |
| 17 | after hours answering service roofers Minneapolis | QUALIFY | Same SERP as plumbing; trade-specific angle |
| 18 | online booking for plumbers Minneapolis | QUALIFY | No dominant booking page for plumbers; Accelera's custom calendar is differentiator |
| 21 | plumber web designer Minneapolis | QUALIFY | "Designer" variant — same intent |
| 22 | roofer web designer Minneapolis | QUALIFY | Same |
| 23 | web design for plumbers Minneapolis | QUALIFY | "For [trade]" pattern — vertical LP format |
| 24 | web design for roofers Minneapolis | QUALIFY | Same |
| 30 | emergency plumber website Minneapolis | QUALIFY | High urgency intent; "emergency" keyword in title = click magnet |

### Keywords Likely CONDITIONAL (Good opportunity, one concern)

| # | Keyword | Predicted Verdict | Condition |
|---|---------|-------------------|-----------|
| 7 | auto repair shop website Minneapolis | CONDITIONAL | "Shop" variant may have different SERP — check if directory pages dominate |
| 8 | contractor website design Minneapolis | CONDITIONAL | "Contractor" broader — may attract GCs not specialty; verify ICP fit |
| 11 | auto repair website design St Paul | CONDITIONAL | St. Paul auto SERP may differ from Minneapolis; 3 prospects there |
| 12 | contractor website design St Paul | CONDITIONAL | Same as #8 for St. Paul |
| 13 | plumber website design Minnesota | CONDITIONAL | State-level — organic not map pack; broader competition; keep as Tier 2b |
| 14 | roofing website design Minnesota | CONDITIONAL | Same as #13 |
| 15 | contractor website design Minnesota | CONDITIONAL | Same as #13 |
| 19 | online booking for contractors Minnesota | CONDITIONAL | State-level; broader; "contractors" may attract commercial not residential |
| 20 | virtual receptionist for plumbers Minneapolis | CONDITIONAL | "Virtual receptionist" dominated by AI (AskOtter); Accelera = live agents — format mismatch risk |
| 25 | small business website design Minneapolis | CONDITIONAL | Too broad — attracts non-ICP; high competition from general agencies |
| 26 | local SEO for contractors Minneapolis | CONDITIONAL | Portkey SEO Minneapolis ranks; "SEO" term attracts retainer-seekers not fixed-price buyers |
| 27 | plumber website design Twin Cities | CONDITIONAL | "Twin Cities" less searched than specific cities; may be directory pages |
| 28 | roofing website design Twin Cities | CONDITIONAL | Same as #27 |
| 29 | contractor website Twin Cities | CONDITIONAL | Same as #27 |

### Keywords Likely to KILL (Mixed intent, wrong category, locked SERP)

| # | Keyword | Predicted Verdict | Kill Reason |
|---|---------|-------------------|-------------|
| (none in top 30) | — | — | All top 30 have clear commercial intent for Accelera's offer |

---

## SERP Format Signals (Predicted for QUALIFY keywords)

| Keyword | Dominant Format | Top Competitors | Accelera Format Match |
|---------|-----------------|-----------------|----------------------|
| plumber website design Minneapolis | Vertical landing page (city×trade) | ClickBuilt, Transformed Design | ✅ Vertical LP with audit data + booking demo |
| roofing website design Minneapolis | Vertical landing page | ClickBuilt, Transformed Design | ✅ Vertical LP with license data + storm lead capture |
| auto repair website design Minneapolis | Vertical landing page | ClickBuilt, (less coverage) | ✅ Vertical LP with 100% booking gap data |
| after hours answering service plumbers Minneapolis | Use case page / Feature page | Gorapidlocal, AskOtter, Answering Innovations | ✅ Use case page: live agents vs AI, job capture |
| online booking for plumbers Minneapolis | Feature page / Tool page | (No dominant) | ✅ Feature page with interactive demo |

---

## Competitive Landscape Signals (Predicted)

**Average DR of top 5 for Tier 1 keywords:** ~35-45 (ClickBuilt ~45, Transformed ~35, ProWeb365 ~30)
**Accelera current DR:** 0 (no domain)
**Beatable gaps identified:**
1. **Format gap:** Competitors have static city×trade pages; Accelera can embed interactive booking demo + missed-call calculator
2. **Data gap:** No competitor has 44 no-website companies data, 87.5% booking gap audit, review averages by city
3. **Freshness gap:** ClickBuilt city pages appear static (no recent updates visible)
4. **Differentiation gap:** Competitors don't combine site + booking + phone; Accelera's unified offer is unique

**DR gap:** Accelera starts at 0 — cannot beat on authority initially. Must win on:
- Content quality + unique data (audit data no one else has)
- Format superiority (interactive elements)
- Commercial clarity (fixed price, approve before launch, 30-day money-back)
- Local signals (GBP, citations, Twin Cities address)

---

## Map Pack Detection (Critical for Local)

**Predicted map pack presence:**
- "plumber website design Minneapolis" → Likely NO map pack (service query, not local business query)
- "plumber Minneapolis" → YES map pack (but not our target keyword)
- "web design Minneapolis" → YES map pack (agency local pack)
- "after hours answering service Minneapolis" → MAYBE (service-area businesses)

**Strategy:** City×trade pages ("plumber website design Minneapolis") target organic results, not map pack. Map pack strategy is for GBP optimization on "web design Minneapolis" / "web design [suburb]" (Tier 2a/3).

---

## Next Steps

1. **Execute Firecrawl runs** for all 30 keywords with `location=Minneapolis, MN`
2. **Record actual results** in SERP-ANALYSIS.md Results Log table
3. **Update verdicts** based on real SERP data
4. **Feed QUALIFY + CONDITIONAL keywords** into Phase 5 Business Fit Filter
5. **Note format signals** for Phase 6 Topic Shaping

**Firecrawl command pattern:**
```
firecrawl scrape "https://www.google.com/search?q=plumber+website+design+Minneapolis&gl=us&hl=en&uule=w+CAIQICIJTWlubmVhcG9saXM"
```

Or use Firecrawl search API with location parameter.