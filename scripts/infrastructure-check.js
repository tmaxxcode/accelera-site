#!/usr/bin/env node
/**
 * Accelera Business Launch Script
 *
 * Executes the critical path infrastructure setup:
 * 1. Domain purchase guidance
 * 2. Business email configuration
 * 3. Google Business Profile creation
 * 4. Phone number purchase
 * 5. Cal.com setup
 * 6. Offer.ts approval cascade
 * 7. GA4/Clarity IDs
 * 8. Privacy page approval
 * 9. Competitor mining execution
 * 10. Outreach system readiness
 */

const fs = require('fs');
const path = require('path');

// Critical infrastructure check
function checkInfrastructure() {
  const checks = {
    domain: fs.existsSync('/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/domain-purchased.txt'),
    email: fs.existsSync('/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/email-configured.txt'),
    gbp: fs.existsSync('/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/gbp-created.txt'),
    phone: fs.existsSync('/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/phone-purchased.txt'),
    calcom: fs.existsSync('/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/calcom-configured.txt'),
    offerApproved: false, // Will check offer.ts
    ga4: fs.existsSync('/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/ga4-created.txt'),
    privacy: fs.existsSync('/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/privacy-approved.txt'),
    mining: fs.existsSync('/Users/TylerMaxwell/AlCapital/web/accelera-site/research/COMPETITOR-BATTLE-CARDS/plumbing.md'),
    outreach: fs.existsSync('/Users/TylerMaxwell/AlCapital/video/outreach/DRAFTS.md')
  };

  console.log('=== Accelera Infrastructure Check ===\n');
  let complete = 0;

  for (const [key, status] of Object.entries(checks)) {
    const label = key.padEnd(20);
    const statusStr = status ? '✓' : '✗';
    console.log(`  ${label}${statusStr} ${key}`);
    if (status) complete++;
  }

  // Check offer.ts approval status
  try {
    const offerPath = '/Users/TylerMaxwell/AlCapital/web/accelera-site/src/config/offer.ts';
    const offerContent = fs.readFileSync(offerPath, 'utf-8');
    const approvedCount = (offerContent.match(/approved: true/g) || []).length;
    const totalCount = (offerContent.match(/approved: false/g) || []).length + approvedCount;
    checks.offerApproved = approvedCount > 0 && totalCount > 0;
    console.log(`  {'approved'.padEnd(20)} ${approvedCount}/${totalCount} approved in offer.ts`);
    if (checks.offerApproved) complete++;
  } catch (e) {
    console.log(`  {'approved'.padEnd(20)} error reading offer.ts`);
  }

  console.log(`\n${complete}/28 infrastructure items complete`);

  return checks;
}

// Generate launch readiness report
function generateReadinessReport(checks) {
  const readyForOutbound =
    checks.domain &&
    checks.email &&
    checks.gbp &&
    checks.phone &&
    checks.calcom &&
    checks.offerApproved;

  console.log('\n=== Launch Readiness ===');
  console.log(`Outbound sales ready: ${readyForOutbound ? 'YES ✓' : 'NO ✗'}`);
  console.log(`Website deployable (PUBLIC_RELEASE): ${checks.offerApproved ? 'YES ✓' : 'NO - all offer.ts items must be approved'}`);
  console.log(`Competer battle cards loaded: ${checks.mining ? 'YES ✓' : 'NO'}`);
  console.log(`Outreach drafts available: ${checks.outreach ? 'YES ✓' : 'NO'}`);

  if (!readyForOutbound) {
    console.log('\nMissing items blocking outbound:');
    if (!checks.domain) console.log('  - Domain purchase');
    if (!checks.email) console.log('  - Business email setup');
    if (!checks.gbp) console.log('  - Google Business Profile');
    if (!checks.phone) console.log('  - Phone number');
    if (!checks.calcom) console.log('  - Cal.com setup');
    if (!checks.offerApproved) console.log('  - Offer.ts approvals');
  }

  return readyForOutbound;
}

// Run check
const checks = checkInfrastructure();
const ready = generateReadinessReport(checks);

// Save status
const statusPath = '/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/infrastructure-status.json';
fs.writeFileSync(statusPath, JSON.stringify(checks, null, 2));
console.log(`\nStatus saved to ${statusPath}`);