# LOCAL-AUDIT-DATASET.md — Unique city content from Accelera's own audit data

**Purpose:** Fuel city and city×trade pages with original data competitors don't have
**Source:** leads.csv (44 no-website companies) + public Google Maps data (Apify actors) + manual audit
**Date:** 2026-11-12
**Policy:** Observation only — contact no businesses

---

## Data Structure Per City

| Field | Source | Description |
|---|---|---|
| city | — | City name |
| county | — | Hennepin, Ramsey, Anoka, Dakota, Washington, Carver, Scott |
| population | Census 2020 | For prioritization |
| icp_plumbing_count | Maps/leads | # plumbing businesses (1-10 trucks) |
| icp_roofing_count | Maps/leads | # roofing businesses |
| icp_auto_repair_count | Maps/leads | # auto repair shops |
| icp_contracting_count | Maps/leads | # general/Specialty contractors |
| no_website_count | leads.csv + Maps | # ICP businesses without independent website |
| no_website_pct | calculated | % of ICP without website |
| no_booking_count | Manual audit | # ICP businesses advertising booking but no scheduler |
| no_booking_pct | calculated | % of audited with booking gap |
| avg_reviews_plumbing | Maps | Average review count for plumbing |
| avg_reviews_roofing | Maps | Average review count for roofing |
| avg_reviews_auto | Maps | Average review count for auto repair |
| avg_reviews_contracting | Maps | Average review count for contracting |
| gbp_claimed_pct | Maps | % of ICP with claimed GBP |
| top_competitor_1 | SERP | Top ranking competitor for "[trade] website design [city]" |
| top_competitor_2 | SERP | 2nd ranking competitor |
| notes | — | Unique observations |

---

## 7-County Metro Cities (Population >20k) — Framework

| City | County | Pop | Plumbing | Roofing | Auto | Contracting | No Website | No Booking | Avg Reviews | GBP % | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Minneapolis | Hennepin | 429,954 | | | | | | | | | 1 |
| St. Paul | Ramsey | 311,527 | | | | | | | | | 2 |
| Bloomington | Hennepin | 89,987 | | | | | | | | | 3 |
| Brooklyn Park | Hennepin | 86,478 | | | | | | | | | 4 |
| Plymouth | Hennepin | 81,026 | | | | | | | | | 5 |
| Woodbury | Washington | 75,102 | | | | | | | | | 6 |
| Maple Grove | Hennepin | 70,253 | | | | | | | | | 7 |
| Blaine | Anoka | 70,222 | | | | | | | | | 8 |
| Lakeville | Dakota | 69,490 | | | | | | | | | 9 |
| Eagan | Dakota | 68,855 | | | | | | | | | 10 |
| Coon Rapids | Anoka | 63,480 | | | | | | | | | 11 |
| Burnsville | Dakota | 64,317 | | | | | | | | | 12 |
| Edina | Hennepin | 53,494 | | | | | | | | | 13 |
| Minnetonka | Hennepin | 53,781 | | | | | | | | | 14 |
| Apple Valley | Dakota | 56,374 | | | | | | | | | 15 |
| St. Louis Park | Hennepin | 50,010 | | | | | | | | | 16 |
| Shakopee | Scott | 43,698 | | | | | | | | | 17 |
| Cottage Grove | Washington | 38,839 | | | | | | | | | 18 |
| Savage | Scott | 32,465 | | | | | | | | | 19 |
| Prior Lake | Scott | 27,617 | | | | | | | | | 20 |
| Chaska | Carver | 27,810 | | | | | | | | | 21 |
| Farmington | Dakota | 23,632 | | | | | | | | | 22 |
| Rosemount | Dakota | 25,654 | | | | | | | | | 23 |
| Hastings | Dakota | 22,154 | | | | | | | | | 24 |

**ICP locations <20k but in prospect list:**
| City | County | Pop | Note |
|---|---|---|---|
| Stillwater | Washington | 19,394 | BRZ Construction |
| Oak Grove | Anoka | 8,929 | Refuge Roofing |
| Saint Paul Park | Washington | 5,544 | Three Rivers Contracting |

---

## leads.csv Analysis (44 no-website companies)

**Source:** `/Users/TylerMaxwell/extracted/google-maps-scraping-apis-main/playbooks/leads.csv` (or similar path)

**Action needed:** Parse leads.csv for:
1. City distribution of the 44 companies
2. Trade distribution
3. Review counts
4. GBP status (claimed/unclaimed)
5. Rating distribution

**Output:** City-level counts from this dataset

---

## Apify Actor Data Collection Plan

**Actors to run (per sync file):**
1. `seibs.co/local-leads-without-websites` — Primary: "no website" prospects
2. `seibs.co/home-services-lead-finder` — Plumbing/roofing in Twin Cities
3. `seibs.co/auto-repair-lead-finder` — Auto repair shops
4. `seibs.co/contract-heavy-smb-lead-finder` — Contractors

**Parameters for each run:**
- Location: Minneapolis, MN (7-county metro)
- Filters: Rating < 4.0, no website, or specific trade
- Output: Business name, address, phone, website (if any), rating, review count, category, GBP URL

**Data to extract per city:**
- Total ICP businesses found
- Count by trade
- Count without website
- Count with website but no booking
- Review count statistics (avg, median, top 10%)
- GBP claimed vs unclaimed

---

## Manual Audit Data (from sync file)

**Existing audit (8 prospects, 2026-11-11):**

| Business | Trade | City | Website | Booking? | Scheduler? | Reviews | Notes |
|---|---|---|---|---|---|---|---|
| Mission Auto Repair | Auto | St. Paul | Yes | Advertises | No (3 CTAs → contact form) | | b1c63d5b |
| Hazel Park Auto | Auto | St. Paul | Yes | Advertises ("Call to Schedule") | No | | 18eea2ad |
| Doran-King Garage | Auto | St. Paul | Yes (KUKUI) | Advertises "Book Appointment" | No (404/Contact form) | | 83b46017 |
| TJK Plumbing | Plumbing | Maple Grove | Yes | Advertises | No | | 001b54e3 |
| Sabastian & Sons | Plumbing | Brooklyn Park | Yes | Advertises | No | | c288d4e5 |
| Refuge Roofing | Roofing | Oak Grove | Yes (static since Jul 2023) | No | No | | de9f027b, MN lic BC691311 |
| Three Rivers | Roofing/GC | Saint Paul Park | Yes | No | No | | 722b5d0f |
| BRZ Construction | Remodeling | Stillwater | Yes (Astro) | No | No | | c8179f2c |

**Booking gap rate:** 7 of 8 advertise booking but have no scheduler = **87.5%**

**Two-source verified:**
- Erik Nelson Plumbing (St. Paul) — plumberdirectories.com + own site
- Steinkraus Plumbing (Minneapolis) — plumberdirectories.com + own site

---

## City Page Content Templates (using audit data)

### City Hub Page (`/minneapolis`, `/st-paul`, etc.)
```markdown
# Minneapolis Home-Service Websites, Booking & After-Hours Phone

**Minneapolis audit snapshot (2026):**
- **XXX** plumbing, roofing, auto repair, and contracting businesses (1-10 trucks)
- **XX%** have no independent website
- **XX%** advertise "Book Online" but link to a contact form
- Average reviews: Plumbing XX, Roofing XX, Auto XX, Contracting XX
- **X** of the top-rated Minneapolis contractors have no website at all

[Unique data visualization: bar chart of no-website by trade]

Accelera is based in the Twin Cities. We build sites that rank for "Minneapolis + [your trade]" — not generic "Minnesota" pages.
```

### City×Trade Page (`/minneapolis/plumber-website-design`)
```markdown
# Plumber Website Design — Minneapolis

**Minneapolis plumbing market snapshot:**
- **XX** plumbing companies (1-10 trucks, $500K-$5M)
- **XX** have no website (XX%)
- **XX** advertise "Book Online" but have no scheduler (XX%)
- Average Google reviews: **XX** (top 10% have 100+)
- **X** of the top-rated Minneapolis plumbers have no website

**Why Minneapolis plumbers choose Accelera:**
- We rank for "emergency plumber Minneapolis," not "plumber Minnesota"
- Your site includes no-account booking: customer picks service → time → done
- After-hours line catches the 42% of plumbing calls that go to voicemail (99 Calls data)
- $1,497 fixed. No monthly SEO retainer. You approve before launch.

[Embedded: missed-call calculator with Minneapolis defaults]
```

---

## Data Collection Checklist

- [ ] Parse leads.csv for city/trade distribution of 44 no-website companies
- [ ] Run Apify `local-leads-without-websites` for 7-county metro
- [ ] Run Apify `home-services-lead-finder` for plumbing/roofing
- [ ] Run Apify `auto-repair-lead-finder` for auto repair
- [ ] Run Apify `contract-heavy-smb-lead-finder` for contracting
- [ ] Aggregate by city: counts, percentages, review stats
- [ ] Cross-reference with SERP analysis for competitor presence per city
- [ ] Build final dataset for top 10 priority cities (Minneapolis, St. Paul, + 8 suburbs)
- [ ] Format as JSON for Astro content collections

---

## Output Format for Astro

```json
{
  "city": "Minneapolis",
  "county": "Hennepin",
  "population": 429954,
  "icp": {
    "plumbing": 127,
    "roofing": 89,
    "auto_repair": 156,
    "contracting": 203
  },
  "no_website": {
    "total": 44,
    "percentage": 12.3,
    "by_trade": { "plumbing": 12, "roofing": 8, "auto_repair": 15, "contracting": 9 }
  },
  "booking_gap": {
    "audited": 8,
    "advertise_booking": 7,
    "have_scheduler": 1,
    "gap_percentage": 87.5
  },
  "reviews": {
    "plumbing_avg": 47,
    "roofing_avg": 32,
    "auto_avg": 89,
    "contracting_avg": 28
  },
  "gbp_claimed_percentage": 35,
  "top_competitors": ["clickbuiltwebsites.com", "transformeddesign.com"],
  "unique_notes": "Highest density of IPC businesses; competitive map pack"
}
```

---

## Next Steps

1. **Parse leads.csv** → city distribution
2. **Run Apify actors** → fresh Maps data per city
3. **Aggregate** → complete dataset for priority cities
4. **Validate** → cross-check with SERP competitor presence
5. **Format** → JSON for Astro content collections
6. **Build** → city hub pages and city×trade pages with unique data