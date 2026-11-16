// Landing page flow check. Run through the Playwright MCP:
//   browser_run_code_unsafe { filename: "<repo>/tests/lp-flows.js" }
// against `npx astro preview --port 4321 --host 127.0.0.1` (after `npm run build`).
// Checks every flow on /lp/trades and /lp/trades-quick at 390, 1024 and 1440 wide.
async (page) => {
  const BASE = 'http://127.0.0.1:4321';
  const widths = [
    [390, 844],
    [1024, 768],
    [1440, 900],
  ];
  const results = [];
  const fail = (r, msg) => r.fails.push(msg);

  for (const path of ['/lp/trades/', '/lp/trades-quick/']) {
    for (const [w, h] of widths) {
      const r = { page: path, width: w, fails: [], passed: 0 };
      const errors = [];
      const onConsole = (m) => m.type() === 'error' && errors.push(m.text());
      const onError = (e) => errors.push(String(e));
      page.on('console', onConsole);
      page.on('pageerror', onError);
      await page.setViewportSize({ width: w, height: h });
      await page.goto(`${BASE}${path}?utm_source=flowtest&utm_medium=cpc&utm_campaign=lp-check`, { waitUntil: 'networkidle' });
      await page.evaluate(() => sessionStorage.clear());
      await page.reload({ waitUntil: 'networkidle' });
      const ok = (cond, msg) => (cond ? r.passed++ : fail(r, msg));
      const events = () => page.evaluate(() => (window.dataLayer || []).map((e) => e.event));

      // Layout
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      ok(sw <= w, `horizontal overflow: scrollWidth ${sw}`);
      ok((await page.locator('meta[name=robots]').getAttribute('content')).includes('noindex'), 'missing noindex');
      ok((await page.locator('h1').count()) === 1, 'expected exactly one h1');

      // Hero CTA + call above the fold
      const cta = page.locator('.hero .btn--primary');
      const box = await cta.boundingBox();
      ok(box && box.y + box.height <= h, `hero CTA below the fold (bottom ${box && Math.round(box.y + box.height)})`);
      const callHref = await page.locator('.hero a[href^="tel:"]').getAttribute('href');
      ok(callHref && callHref.startsWith('tel:+1'), 'hero click-to-call missing tel: link');

      // Small tap targets (visible interactive elements under 44px tall)
      const small = await page.evaluate(() =>
        [...document.querySelectorAll('a, button, summary, input:not([type=hidden]):not([type=radio]), .seg__opt, .opt')]
          .filter((el) => {
            const b = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && b.height < 43.5 && !el.closest('.skip-link, .proof__src, .calc__note, .foot__src ul, .form__fine, .form-card__or');
          })
          .map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 60)),
      );
      ok(small.length === 0, `tap targets under 44px: ${small.join(', ')}`);

      // Call click tracking
      await page.evaluate(() => document.querySelector('.hero a[href^="tel:"]').addEventListener('click', (e) => e.preventDefault(), { once: true }));
      await page.locator('.hero a[href^="tel:"]').click();
      ok((await events()).includes('call_click'), 'call_click not tracked');

      // Hero CTA goes to the audit form
      await cta.click();
      await page.waitForTimeout(900);
      ok(page.url().endsWith('#audit'), 'hero CTA did not go to #audit');
      ok((await events()).includes('book_call'), 'book_call not tracked on CTA');

      if (path === '/lp/trades/') {
        // Calculator
        await page.locator('#calculator').scrollIntoViewIfNeeded();
        await page.locator('.seg__opt', { hasText: 'Roofing' }).click();
        ok((await page.inputValue('input[name=ticket]')) === '1500', 'roofing default ticket not applied');
        await page.fill('input[name=calls]', '100');
        await page.waitForFunction(() => document.querySelector('[data-out]').textContent.replace(/\D/g, '') === '18630', null, { timeout: 3000 }).catch(() => {});
        const out = await page.locator('[data-out]').textContent();
        // 100 calls x 27% x 46% x $1,500 = $18,630
        ok(out.replace(/\D/g, '') === '18630', `calculator result wrong: ${out}`);
        ok((await events()).includes('calculator_used'), 'calculator_used not tracked');

        // Booking demo
        await page.locator('#demo').scrollIntoViewIfNeeded();
        await page.locator('.opt', { hasText: 'Roof leak' }).click();
        await page.locator('.slot:not(.slot--taken)').first().click();
        await page.locator('[data-confirm]').click();
        ok(await page.locator('[data-err]').isVisible(), 'demo address error not shown');
        await page.fill('#demo-addr', '123 Example St, St. Paul');
        await page.locator('[data-confirm]').click();
        ok(await page.locator('.pane--done').isVisible(), 'demo did not reach done');
        ok((await page.locator('[data-summary]').textContent()).includes('Roof leak'), 'demo summary missing job');
        ok((await events()).includes('demo_complete'), 'demo_complete not tracked');
        await page.locator('[data-reset]').click();
        ok(await page.locator('[data-pane="0"]').isVisible(), 'demo reset failed');

        // FAQ: one open at a time
        await page.locator('#faq').scrollIntoViewIfNeeded();
        await page.locator('#faq summary').nth(0).click();
        await page.locator('#faq summary').nth(2).click();
        const open = await page.locator('#faq details[open]').count();
        ok(open === 1, `FAQ open count ${open}, expected 1`);
        ok((await events()).includes('faq_open'), 'faq_open not tracked');
      } else {
        ok((await page.locator('#calculator').count()) === 0, 'short page should not have the calculator');
        const words = await page.evaluate(() => {
          const t = document.querySelector('.hero__copy').innerText;
          return t.split(/\s+/).filter(Boolean).length;
        });
        ok(words < 100, `short hero has ${words} words`);
      }

      // Audit form: empty submit shows errors, valid submit shows placeholder done state
      await page.locator('#audit').scrollIntoViewIfNeeded();
      await page.locator('[data-audit-form] button[type=submit]').click();
      ok((await page.locator('[data-audit-form] .f__err:visible').count()) === 3, 'empty form should show 3 errors');
      await page.fill('input[name=name]', 'Test Owner');
      await page.fill('input[name=phone]', '651-555-0199');
      await page.fill('input[name=business]', 'Example Plumbing');
      ok((await page.inputValue('input[name=utm_source]')) === 'flowtest', 'utm_source not captured into form');
      await page.locator('[data-audit-form] button[type=submit]').click();
      await page.waitForTimeout(200);
      ok(await page.locator('[data-done]').isVisible(), 'form done state not shown');
      ok((await page.locator('[data-done-msg]').textContent()).includes('not connected') && (await page.locator('[data-done-h]').textContent()).includes('nothing was sent'), 'unconnected form must say nothing was sent');

      // Sticky mobile bar
      if (w < 768) {
        // Just past the hero, before the audit form (the bar hides while the form is on screen).
        await page.evaluate(() => window.scrollTo(0, document.getElementById('hero').getBoundingClientRect().bottom + window.scrollY + 40));
        await page.waitForTimeout(500);
        const on = await page.locator('[data-sticky]').evaluate((el) => el.classList.contains('is-on'));
        const formInView = await page.locator('#audit').evaluate((el) => el.getBoundingClientRect().top < innerHeight * 0.85);
        // The bar shows once the hero is gone and hides while the audit form is on screen.
        // On the short page the form follows the proof bar directly, so it is expected to stay hidden there.
        ok(on === !formInView, `sticky bar state wrong (on=${on}, formInView=${formInView})`);
      } else {
        ok(!(await page.locator('[data-sticky]').isVisible()), 'sticky bar should be hidden on wide screens');
      }

      // Placeholders are labeled
      const pending = await page.locator('[data-pending]').count();
      ok(pending > 0, 'unapproved terms are not marked');

      ok(errors.length === 0, `console errors: ${errors.join(' | ')}`);
      page.off('console', onConsole);
      page.off('pageerror', onError);
      results.push(r);
    }
  }
  const total = results.reduce((a, r) => a + r.passed, 0);
  const fails = results.flatMap((r) => r.fails.map((f) => `${r.page} @${r.width}: ${f}`));
  return { total_passed: total, fails };
};
