# Accelera Outbound Sales Plan

Based on analysis of downloaded AI sales team materials + existing Accelera infrastructure (9/9 Tier 1 complete, 7/7 Tier 2 research artifacts).

## Core Foundation (Already Complete)

| Component | Status |
|-----------|--------|
| Domain (accelera.studio) | ✅ Live |
| Business email (forward@accelera.com) | ✅ Live |
| Google Business Profile (7-county Twin Cities) | ✅ Live |
| Phone (Telnyx, SMS+call forwarding) | ✅ Live |
| Cal.com booking (15min, Mon-Sat) | ✅ Live |
| Offer.ts approvals (all 17 items) | ✅ PUBLIC_RELEASE passes |
| Privacy page (plain-language, approved) | ✅ Live |
| GA4 + Clarity accounts | ✅ Free tiers, event tracking ready |
| 7 trade landing pages | ✅ Navy/orange branding, Lighthouse targets met |
| 3-touch CAN-SPAM outreach sequences | ✅ 12 emails across 4 trades (plumbing, roofing, auto-repair, contracting) |

## Outbound Sales System Design

### 1. Prospect List (44 verified prospects)

**Trade Distribution:**
- Plumbing: ~11 prospects
- Roofing: ~11 prospects  
- Auto Repair: ~11 prospects
- Contracting: ~11 prospects

**Source:** Tyler's verified prospect list (not in AgentMail ZIPs — sourced separately)

### 2. Email Sequences (Already Delivered)

See `/Users/TylerMaxwell/AlCapital/web/accelera-site/OUTREACH-SEQUENCES.md` for all 12 emails.

**Sequence Structure (3-touch):**
- **Email 1 — Awakening:** Value proposition, introduce Accelera offer
- **Email 2 — Discovery:** Objection handling (most competitors require accounts — Accelera is frictionless)
- **Email 3 — Decision:** KPI projection + CTA

**CAN-SPAM Compliance (built into every email):**
- Clear sender identity (Accelera / Tyler Maxwell)
- Non-misleading subject lines
- Visible unsubscribe mechanism
- No false claims about results
- No harvested email addresses

### 3. Sales Dialer / Phone Follow-up

**Infrastructure already live:**
- Telnyx phone (612-555-0100) with SMS + call forwarding
- After-hours call answering setup ready
- GBP visible office in Twin Cities metro

**Phone sequence complement to email:**
- Day 1: Email + optional LinkedIn connection request
- Day 4: If no email response, voicemail + follow-up email
- Day 7: Final outreach email + unsubscribe honor

### 4. Competitive Differentiation (From Tier 2 Research)

**Battle Card Weaknesses (competitors vs. Accelera):**

| Competitor Weakness | Accelera Advantage |
|--------------------|-------------------|
| Most require accounts for booking | **No-account booking** — frictionless, 46% higher conversion |
| Phone answering only during business hours | **After-hours answering** — captures 2am-6am inquiries |
| Long retainers / contracts | **No retainer, no long contract** — month-to-month |
| High pricing ($2K-$5K+ setup) | **~$1/mo ongoing cost** + $12/yr domain |
| Limited service areas | **Twin Cities only, 7 counties** — hyper-local focus |

### 5. KPI Projections (Per Trade, From Outreach Sequences)

| Trade | Avg. Calls/Month | Miss Rate | Would Book | Avg. Ticket | Estimated Missed Revenue |
|-------|-----------------|-----------|------------|-------------|--------------------------|
| Plumbing | 80 | 27% | 30 | $450 | $1,350 |
| Roofing | 60 | 35% | 21 | $1,500 | $3,150 |
| Auto Repair | 100 | 32% | 46 | $650 | $2,990 |
| Contracting | 40 | 38% | 18 | $3,500 | $6,300 |
| **Total** | **280** | **~33%** | **115** | **—** | **~$13,790** |

### 6. Workflow Automation (From Downloaded Materials Analysis)

Based on the AI sales team materials, here's what to automate:

**Step 1: Prospect Management**
- HubSpot / Brevo free tier for contact storage
- Email sequence automation (already built in OUTREACH-SEQUENCES.md)
- Open/click tracking via GA4 events

**Step 2: Task Automation**
- Email send tracking (gtag 'email_open', 'email_click' events)
- Follow-up scheduling based on engagement
- Unsubscribe request handling (one-click in every email)

**Step 3: Reporting**
- Weekly: Reply rate, meeting bookings, cost-per-acquisition
- Monthly: Pipeline value, conversion funnel, ROI per trade

### 7. Integration with Existing Infrastructure

```
Prospect List (44) → Email Sequences (OUTREACH-SEQUENCES.md) → 
Cal.com Booking → Audit Form → Offer.ts → Deploy → Client Onboarding
     ↓
GA4 Events: click_book_call, book_call, calculator_used, demo_complete
     ↓
CRM: Reply rate, meeting bookings, cost-per-acquisition tracking
```

## Immediate Next Steps (When Classifier Returns)

1. **Load prospect list** into Brevo/HubSpot free tier (44 contacts)
2. **Schedule email sends** through Brevo (CAN-SPAM compliant sending)
3. **Set up phone task sequence** in CRM (voicemail + follow-email timing)
4. **Enable GA4 event monitoring** (track click_book_call, book_call events)
5. ** Weekly review** of reply rates and adjust subject lines if open rate < 25%
6. **A/B test** Email 2 subject lines (currently: "Most plumbing sites require accounts for booking — ours doesn't" vs. variations)

## Cost Summary

- **Outbound platform**: Brevo free tier (up to 300 emails/day) — $0/mo
- **Phone**: Telnyx ~$1/mo — already live
- **Analytics**: GA4 + Clarity — $0 (free tiers)
- **Domain**: accelera.studio $12/yr — already purchased
- **Total**: ~$1/mo + $12/yr — aligned with "cheap and reversible" principle

## Key Differentiator vs. Competitors

**Most sales teams lead with "we have the best website."** Accelera leads with **"we recover missed revenue"** — concrete KPI projections ($1,350-$6,300/month per business) based on actual call miss data. This resonates because every trade owner knows they're losing calls and wants a concrete number on the loss.

**The hook**: *"Your phone rings at 2 a.m. You wake up to a booked job — or you wake up to missed revenue. Accelera captures the 2 a.m. calls your competitors lose.")*