// Website check. Run through the Playwright MCP (browser_run_code_unsafe) against
// `npx astro preview --port 4321 --host 127.0.0.1` after `npm run build`.
// Covers every page in src/config/site.ts at 390, 768, 1024 and 1440 wide.
async (page) => {
  const BASE = 'http://127.0.0.1:4321';
  const paths = ['/', '/website-design-minnesota/', '/online-booking-minnesota/', '/after-hours-answering-service-minnesota/',
    '/plumbers/', '/roofers/', '/auto-repair/', '/contractors/', '/pricing/', '/how-it-works/', '/about/', '/faq/', '/contact/',
    '/privacy/', '/tools/missed-call-calculator/'];
  const widths = [[390, 844], [768, 1024], [1024, 768], [1440, 900]];
  const fails = []; let passed = 0;
  const ok = (c, m) => (c ? passed++ : fails.push(m));

  // Site files
  const sm = await (await fetch(BASE + '/sitemap.xml')).text();
  ok((sm.match(/<url>/g) || []).length === paths.length, `sitemap has ${(sm.match(/<url>/g) || []).length} urls`);
  ok(!sm.includes('/lp/'), 'sitemap must not list /lp/');
  const robots = await (await fetch(BASE + '/robots.txt')).text();
  ok(robots.includes('Disallow: /lp/') && robots.includes('Sitemap:'), 'robots.txt');
  ok((await fetch(BASE + '/llms.txt')).ok, 'llms.txt');
  const ogImg = await fetch(BASE + '/og/accelera-1200x630.png');
  ok(ogImg.ok && ogImg.headers.get('content-type') === 'image/png', 'og image served');

  // Every internal link on every page resolves
  const seen = new Set();
  for (const path of paths) {
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
    const hrefs = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href').split('#')[0]).filter(Boolean));
    hrefs.forEach((h) => seen.add(h));
  }
  for (const h of seen) ok((await fetch(BASE + h)).ok, `broken internal link ${h}`);

  for (const path of paths) {
    for (const [w, h] of widths) {
      const tag = `${path} @${w}`;
      const errors = [];
      const oc = (m) => m.type() === 'error' && errors.push(m.text());
      const oe = (e) => errors.push(String(e));
      page.on('console', oc); page.on('pageerror', oe);
      await page.setViewportSize({ width: w, height: h });
      await page.goto(BASE + path + '?utm_source=sitetest', { waitUntil: 'networkidle' });

      ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= w, `${tag}: horizontal overflow`);
      if (w === 1440) {
        ok((await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--premium').trim())) === '1', `${tag}: premium tokens missing`);
        ok((await page.locator('h1').count()) === 1, `${tag}: expected one h1`);
        ok(!(await page.locator('meta[name=robots]').count()), `${tag}: site page must be indexable`);
        const canon = await page.locator('link[rel=canonical]').getAttribute('href');
        ok(canon && canon.endsWith(path), `${tag}: canonical ${canon}`);
        const og = await page.locator('meta[property="og:image"]').getAttribute('content');
        ok(og && og.endsWith('/og/accelera-1200x630.png') && (await page.locator('meta[name="twitter:card"][content="summary_large_image"]').count()) === 1, `${tag}: og image ${og}`);
        const title = await page.title();
        ok(title.length > 10 && title.length <= 75, `${tag}: title length ${title.length}`);
        const desc = await page.locator('meta[name=description]').getAttribute('content');
        ok(desc && desc.length >= 70 && desc.length <= 160, `${tag}: description length ${desc && desc.length}`);
        const ld = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => { try { JSON.parse(x.textContent); return true; } catch { return false; } }));
        ok(ld.length > 0 && ld.every(Boolean), `${tag}: JSON-LD missing or invalid`);
        const ldText = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => x.textContent).join(' '));
        ok(!/555-01|example\.com"|\$1,497|\$597|\$997/.test(ldText.replace(/accelera\.example\.com/g, '')), `${tag}: placeholder data leaked into JSON-LD`);
        ok(await page.locator('#audit').count() === 1, `${tag}: audit form missing`);
        ok(await page.$$eval('a[href^="tel:"]', (as) => as.every((a) => a.closest('[data-pending]') || a.hasAttribute('data-pending') || a.querySelector('[data-pending]'))), `${tag}: tel link without placeholder marker`);
      }

      // Small tap targets (inline text links in sentences are exempt)
      const small = await page.evaluate(() =>
        [...document.querySelectorAll('a, button, summary, input:not([type=hidden]):not([type=radio])')]
          .filter((el) => {
            const b = el.getBoundingClientRect(); const s = getComputedStyle(el);
            return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && b.height < 43.5 &&
              !el.closest('.skip-link, .proof__src, .calc__note, .form__fine, .form-card__or, .prose, .note li:not(:last-child), .crumbs, .site-nav__menu, .terms, .foot__src, .reach .ph, .row__fact');
          })
          .map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 50)));
      ok(small.length === 0, `${tag}: tap targets under 44px: ${small.join(', ')}`);

      // Navigation
      if (w >= 1024) {
        ok(await page.locator('.site-nav').isVisible(), `${tag}: desktop nav hidden`);
        await page.locator('.site-nav__group').first().hover();
        ok(await page.locator('.site-nav__menu').first().isVisible(), `${tag}: services menu does not open`);
      } else {
        await page.locator('.site-menu > summary').click();
        ok(await page.locator('.site-menu__panel a[href="/pricing/"]').isVisible(), `${tag}: phone menu does not open`);
        await page.locator('.site-menu > summary').click();
      }

      // Header CTA reaches the audit form
      await page.locator('.site-header__cta').click();
      // Smooth scroll on a long page can take more than a second: wait for it to settle.
      await page.waitForFunction(() => Math.abs(document.getElementById('audit').getBoundingClientRect().top - 64) < 8, null, { timeout: 4000 }).catch(() => {});
      ok(page.url().endsWith('#audit'), `${tag}: header CTA did not reach #audit`);
      const box = await page.locator('#audit').boundingBox();
      ok(box && Math.abs(box.y - 64) < 8, `${tag}: audit form should sit under the header after the CTA (top ${box && Math.round(box.y)})`);

      // Demo + form on 1440 only (same components everywhere)
      if (w === 1440) {
        if (await page.locator('#demo').count()) {
          await page.locator('#demo').scrollIntoViewIfNeeded();
          await page.locator('#demo .opt').first().click();
          await page.locator('#demo .slot:not(.slot--taken)').first().click();
          await page.fill('#demo-addr', '2014 Honda Civic');
          await page.locator('[data-confirm]').click();
          ok(await page.locator('.pane--done').isVisible(), `${tag}: booking demo did not finish`);
        }
        await page.locator('#audit').scrollIntoViewIfNeeded();
        await page.locator('[data-audit-form] button[type=submit]').click();
        ok((await page.locator('[data-audit-form] .f__err:visible').count()) === 3, `${tag}: empty form should show 3 errors`);
        await page.fill('[data-audit-form] input[name=name]', 'Test Owner');
        await page.fill('[data-audit-form] input[name=phone]', '651-555-0199');
        await page.fill('[data-audit-form] input[name=business]', 'Example Plumbing');
        ok((await page.inputValue('[data-audit-form] input[name=utm_source]')) === 'sitetest', `${tag}: utm not captured`);
        await page.locator('[data-audit-form] button[type=submit]').click();
        await page.waitForTimeout(200);
        ok((await page.locator('[data-done-h]').textContent()).includes('nothing was sent'), `${tag}: done state must say nothing was sent`);
      }

      ok(errors.length === 0, `${tag}: console errors: ${errors.join(' | ')}`);
      page.off('console', oc); page.off('pageerror', oe);
    }
  }
  // Home hero: the three story buttons work with or without the 3D scene, and the still picture is served
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  ok((await fetch(BASE + '/hero/night-call.webp')).ok, 'hero still picture served');
  ok((await page.locator('[data-beat-btn]').count()) === 3, 'hero: three story buttons');
  await page.locator('[data-beat-btn="2"]').click();
  ok((await page.locator('[data-night-hero]').getAttribute('data-beat')) === '2' && (await page.locator('[data-beat-btn="2"]').getAttribute('aria-pressed')) === 'true', 'hero: story button did not select the morning');
  ok((await page.locator('#hero canvas').getAttribute('aria-hidden')) === 'true', 'hero: canvas must be hidden from screen readers');

  // 404: one h1, noindex, no canonical
  await page.goto(BASE + '/no-such-page/');
  ok((await page.locator('h1').count()) === 1 && (await page.locator('meta[name=robots][content="noindex"]').count()) === 1 && !(await page.locator('link[rel=canonical]').count()), '404 page');
  return { passed, fails };
};
