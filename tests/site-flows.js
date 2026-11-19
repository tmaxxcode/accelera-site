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
  // Home hero: pinned scroll film (cinematic upgrade, 2026-11-18). The story buttons work with or without 3D.
  ok((await fetch(BASE + '/hero/night-call.webp')).ok, 'hero still picture served');
  const beatOf = (p) => (p < 0.3 ? '0' : p < 0.6 ? '1' : '2'); // mirrors film-timeline.ts beatAt
  const pin = () => page.evaluate(() => window.__heroPin);
  const scrollToPin = async (f) => {
    const r = await pin();
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(r.start + f * (r.end - r.start)));
    await page.waitForTimeout(400);
  };
  const beat = () => page.locator('[data-night-hero]').getAttribute('data-beat');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  ok((await page.locator('[data-beat-btn]').count()) === 3, 'hero: three story buttons');
  ok((await page.locator('#hero canvas').getAttribute('aria-hidden')) === 'true', 'hero: canvas must be hidden from screen readers');
  ok((await page.locator('[data-night-hero][data-pinned="true"]').count()) === 1 && !!(await pin()), 'pinned: hero is not pinned');
  if (await pin()) {
    await scrollToPin(0.45);
    ok((await beat()) === '1', `scrub: beat ${await beat()} at 45%, expected 1`);
    const cta = await page.locator('[data-night-hero] a[href="#audit"]').boundingBox();
    ok(cta && cta.y >= 0 && cta.y + cta.height <= 900, 'scrub: hero CTA must stay on screen during the pin');
    await page.locator('[data-beat-btn="2"]').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1500);
    ok((await beat()) === '2' && (await page.locator('[data-beat-btn="2"]').getAttribute('aria-pressed')) === 'true', `keyboard beat: beat ${await beat()}, expected 2`);
    await scrollToPin(0.7);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    ok((await beat()) === '2', `reload mid-pin: beat ${await beat()}, expected 2`);
    await scrollToPin(0.45);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(600);
    const r = await pin();
    const y = await page.evaluate(() => window.scrollY);
    const prog = Math.min(1, Math.max(0, (y - r.start) / (r.end - r.start)));
    ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= 390, 'resize mid-pin: horizontal overflow');
    ok((await beat()) === beatOf(prog), `resize mid-pin: beat ${await beat()} does not match position ${prog.toFixed(2)}`);
    ok(await page.locator('.site-header__cta').isVisible(), 'resize mid-pin: header CTA hidden');
    await page.setViewportSize({ width: 1440, height: 900 });
  }
  // Deep link to the form with the pin and smooth scroll active
  await page.goto(BASE + '/#audit', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const deep = await page.locator('#audit').boundingBox();
  ok(deep && Math.abs(deep.y - 64) < 8, `audit deep link: form top ${deep && Math.round(deep.y)}, expected 64`);
  // No WebGL and reduced motion: still picture, no pin, buttons still tell the story
  const ctx = page.context();
  for (const mode of ['no webgl', 'reduced motion']) {
    const p2 = await ctx.newPage();
    await p2.setViewportSize({ width: 1440, height: 900 });
    if (mode === 'no webgl') {
      await p2.addInitScript(() => {
        const orig = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type, ...a) {
          return /webgl/.test(type) ? null : orig.call(this, type, ...a);
        };
      });
    } else await p2.emulateMedia({ reducedMotion: 'reduce' });
    await p2.goto(BASE + '/', { waitUntil: 'networkidle' });
    await p2.waitForTimeout(500);
    ok((await p2.locator('.pin-spacer').count()) === 0, `${mode}: hero must not pin`);
    ok(await p2.locator('.nh__still').isVisible(), `${mode}: still picture hidden`);
    await p2.locator('[data-beat-btn="1"]').click();
    ok((await p2.locator('[data-night-hero]').getAttribute('data-beat')) === '1', `${mode}: story button did not switch the beat`);
    await p2.close();
  }

  // 3D object heroes (cinematic upgrade): which pages get which object, and when it starts
  const objects = {
    '/after-hours-answering-service-minnesota/': 'phone', '/plumbers/': 'phone', '/roofers/': 'phone', '/about/': 'phone',
    '/online-booking-minnesota/': 'calendar', '/auto-repair/': 'calendar', '/how-it-works/': 'calendar',
    '/website-design-minnesota/': 'browser', '/contractors/': 'browser', '/pricing/': 'browser',
  };
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [path, kind] of Object.entries(objects)) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    const hero = page.locator(`[data-object-hero="${kind}"]`);
    ok((await hero.count()) === 1, `${path}: ${kind} object hero missing`);
    if (!(await hero.count())) continue;
    ok((await hero.locator('canvas').getAttribute('aria-hidden')) === 'true', `${path}: object canvas must be hidden from screen readers`);
    await page.waitForSelector(`[data-object-hero][data-object-ready]`, { timeout: 3000 }).catch(() => {});
    const size = await hero.locator('canvas').boundingBox();
    ok((await hero.getAttribute('data-object-ready')) !== null && size && size.width > 0 && !(await hero.locator('img').isVisible()), `${path}: 3D object did not start`);
  }
  for (const path of ['/faq/', '/contact/', '/privacy/', '/tools/missed-call-calculator/']) {
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
    ok((await page.locator('[data-object-hero]').count()) === 0, `${path}: should have no object hero`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE + '/plumbers/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  ok((await page.locator('[data-object-hero]').count()) === 1 && (await page.locator('[data-object-hero]').getAttribute('data-object-ready')) === null && (await page.locator('[data-object-hero] img').isVisible()), 'phone: 3D object must wait for the first touch or scroll');
  const p3 = await ctx.newPage();
  await p3.emulateMedia({ reducedMotion: 'reduce' });
  await p3.setViewportSize({ width: 1440, height: 900 });
  await p3.goto(BASE + '/plumbers/', { waitUntil: 'networkidle' });
  await p3.waitForTimeout(1500);
  ok((await p3.locator('[data-object-hero]').count()) === 1 && (await p3.locator('[data-object-hero]').getAttribute('data-object-ready')) === null && (await p3.locator('[data-object-hero] img').isVisible()), 'reduced motion: object hero must stay a still picture');
  await p3.close();
  await page.setViewportSize({ width: 1440, height: 900 });

  // Premium blocks (Framer Motion + 21st.dev): same links and prices, with or without JS; no motion under reduced motion
  const premiumChecks = async (pg, tag) => {
    await pg.goto(BASE + '/', { waitUntil: 'networkidle' });
    const bento = await pg.$$eval('[data-premium="bento"] a', (as) => as.map((a) => a.getAttribute('href')).sort());
    ok(JSON.stringify(bento) === JSON.stringify(['/after-hours-answering-service-minnesota/', '/online-booking-minnesota/', '/website-design-minnesota/']), `${tag}: bento links ${bento}`);
    const trades = await pg.$$eval('[data-premium="trades"] a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')).sort());
    ok(JSON.stringify(trades) === JSON.stringify(['/auto-repair/', '/contractors/', '/plumbers/', '/roofers/']), `${tag}: trade links ${trades}`);
    ok((await pg.locator('[data-premium="trades"] a[href^="https://"]').count()) === 2, `${tag}: 99 Calls source links missing`);
    ok(await pg.locator('[data-premium="bento"] a').first().isVisible(), `${tag}: bento not visible`);
    await pg.goto(BASE + '/pricing/', { waitUntil: 'networkidle' });
    const prices = pg.locator('[data-premium="pricing"] .part__price');
    ok((await prices.count()) === 3, `${tag}: pricing cards missing`);
    for (let i = 0; i < (await prices.count()); i++) {
      ok((await prices.nth(i).locator('[data-pending]').count()) > 0 && (await prices.nth(i).isVisible()), `${tag}: price ${i} not marked pending or not visible`);
    }
  };
  await premiumChecks(page, 'premium');
  const noJs = await ctx.browser().newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const pj = await noJs.newPage();
  await premiumChecks(pj, 'premium no-js');
  await noJs.close();
  const p4 = await ctx.newPage();
  await p4.emulateMedia({ reducedMotion: 'reduce' });
  await p4.setViewportSize({ width: 1440, height: 900 });
  await p4.goto(BASE + '/', { waitUntil: 'networkidle' });
  if (await p4.locator('[data-premium="bento"] a').count()) {
    await p4.locator('[data-premium="bento"] a').first().scrollIntoViewIfNeeded();
    await p4.waitForTimeout(800);
    await p4.locator('[data-premium="bento"] a').first().hover({ position: { x: 10, y: 10 } });
    await p4.waitForTimeout(400);
  }
  const moved = await p4.$$eval('[data-premium] *', (els) => els.filter((e) => getComputedStyle(e).transform !== 'none').length);
  ok(moved === 0, `reduced motion: ${moved} premium elements still transformed`);
  await p4.close();

  // Page transitions: native cross-document view transitions on the main site only (no script lifecycle to break)
  const hasVT = (pg) => pg.evaluate(() => {
    const walk = (rules) => [...rules].some((r) => r.cssText.startsWith('@view-transition') || (r.cssRules && walk(r.cssRules)));
    return [...document.styleSheets].some((s) => { try { return walk(s.cssRules); } catch { return false; } });
  });
  await page.goto(BASE + '/pricing/', { waitUntil: 'domcontentloaded' });
  ok(await hasVT(page), 'view transitions: main site should opt in');
  await page.goto(BASE + '/lp/trades/', { waitUntil: 'domcontentloaded' });
  ok(!(await hasVT(page)), 'view transitions: /lp/ must not opt in');

  // Final-review fixes (2026-11-18)
  // 1. Scroll restoration is really manual, and each history entry returns to its own spot
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  ok((await page.evaluate(() => history.scrollRestoration)) === 'manual', `restore: scrollRestoration is ${await page.evaluate(() => history.scrollRestoration)}`);
  const at = (y) => page.evaluate((y) => window.scrollTo(0, y), y).then(() => page.waitForTimeout(400));
  const sy = () => page.evaluate(() => Math.round(window.scrollY));
  await at(500);
  await page.goto(BASE + '/pricing/', { waitUntil: 'networkidle' });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await at(3000);
  await page.goto(BASE + '/pricing/', { waitUntil: 'networkidle' });
  await page.goBack({ waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  ok(Math.abs((await sy()) - 3000) < 6, `restore: back to the second home visit at ${await sy()}, expected 3000`);
  await page.goBack({ waitUntil: 'networkidle' });
  await page.goBack({ waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  ok(Math.abs((await sy()) - 500) < 6, `restore: back to the first home visit at ${await sy()}, expected 500`);
  await page.goto(BASE + '/pricing/', { waitUntil: 'networkidle' });
  await at(0);
  await page.locator('.site-header__cta').click();
  await page.waitForTimeout(1500);
  await page.goBack();
  await page.waitForTimeout(800);
  ok((await sy()) < 6, `restore: back after the header CTA jump at ${await sy()}, expected the top`);
  // 2. Short screens (landscape phones) get no pin; rotating to portrait pins, back to landscape unpins
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  ok((await page.locator('.pin-spacer').count()) === 0 && !(await page.locator('[data-night-hero][data-pinned]').count()), 'landscape phone: hero must not pin');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  ok((await page.locator('[data-night-hero][data-pinned="true"]').count()) === 1, 'rotate to portrait: hero should pin');
  await page.setViewportSize({ width: 844, height: 390 });
  await page.waitForTimeout(600);
  ok((await page.locator('.pin-spacer').count()) === 0 && !(await page.locator('[data-night-hero][data-pinned]').count()), 'rotate to landscape: hero must unpin');
  // 3. The hero's primary CTA stays full width on phones
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const ctaW = (await page.locator('[data-night-hero] a[href="#audit"]').boundingBox()).width;
  const callW = (await page.locator('[data-night-hero] a[href^="tel:"]').boundingBox()).width;
  ok(ctaW >= callW - 2, `phone: hero CTA ${Math.round(ctaW)}px narrower than Call (${Math.round(callW)}px)`);
  // 4. No pin where the 3D will not run: data saver, WebGL1 only
  for (const [mode, init] of [
    ['data saver', () => Object.defineProperty(navigator, 'connection', { value: { saveData: true } })],
    ['webgl1 only', () => { const g = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { return t === 'webgl2' ? null : g.call(this, t, ...a); }; }],
  ]) {
    const p5 = await ctx.newPage();
    await p5.addInitScript(init);
    await p5.setViewportSize({ width: 1440, height: 900 });
    await p5.goto(BASE + '/', { waitUntil: 'networkidle' });
    ok((await p5.locator('.pin-spacer').count()) === 0, `${mode}: hero must not pin when the 3D stays off`);
    await p5.close();
  }
  await page.setViewportSize({ width: 1440, height: 900 });

  // Taste/impeccable refinement: cards lift (no tilt), no per-section fade-in, no section numbers
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.getElementById('how').scrollIntoView());
  await page.waitForTimeout(60);
  const howOpacity = await page.evaluate(() => getComputedStyle(document.getElementById('how')).opacity);
  ok(howOpacity === '1', `no reveal: #how opacity ${howOpacity} right after scrolling to it`);
  ok((await page.locator('.bento__num').count()) === 0, 'bento: no 01/02/03 section numbers');
  const card = page.locator('[data-premium="bento"] .lift-card').first();
  ok((await card.count()) === 1, 'bento: lift card missing');
  if (await card.count()) {
    await card.scrollIntoViewIfNeeded();
    await card.hover({ position: { x: 20, y: 20 } });
    await page.waitForTimeout(500);
    const m = await card.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform));
    ok(Math.abs(m.f + 2) < 0.6 && Math.abs(m.b) < 0.001 && Math.abs(m.c) < 0.001 && m.is2D, `bento: hover should lift 2px with no tilt (ty ${m.f.toFixed(2)})`);
  }

  // Finish-review fixes (2026-11-19)
  // a. Phone: the pinned frame is the scene and story only, never a slice of the copy column
  {
    const [pw, ph] = [390, 844];
    await page.setViewportSize({ width: pw, height: ph });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, 5));
    await page.waitForTimeout(500);
    const r = await page.evaluate(() => window.__heroPin);
    if (r) {
      await page.evaluate((y) => window.scrollTo(0, y), Math.round(r.start + 0.5 * (r.end - r.start)));
      await page.waitForTimeout(500);
      const b = await page.evaluate(() => {
        const g = (s) => document.querySelector(s).getBoundingClientRect();
        return { copyBottom: Math.round(g('.nh__trust').bottom), stageTop: Math.round(g('.nh__stage').top), stageBottom: Math.round(g('.nh__stage').bottom) };
      });
      ok(b.copyBottom <= 66 && b.stageTop >= 56 && b.stageTop <= 120 && b.stageBottom <= ph + 1, `phone pin frame: copy ends at ${b.copyBottom}, stage ${b.stageTop}-${b.stageBottom} (want copy out of view, stage filling the screen)`);
    } else ok(false, 'phone pin frame: hero not pinned');
  }
  // b. Services bento: the lead cell spans the row (no hollow two-row cell); the other two share the next row
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  {
    const cells = await page.$$eval('[data-premium="bento"] > li', (ls) => ls.map((l) => { const r = l.getBoundingClientRect(); return { x: r.x, y: Math.round(r.y), w: Math.round(r.width) }; }));
    const ul = await page.$eval('[data-premium="bento"]', (u) => Math.round(u.getBoundingClientRect().width));
    ok(cells.length === 3 && Math.abs(cells[0].w - ul) <= 2 && cells[1].y === cells[2].y && cells[1].y > cells[0].y, `bento: lead cell should span the row (${JSON.stringify(cells)}, list ${ul})`);
  }
  // c. Service hero: the example card never covers the 3D object
  for (const path of ['/after-hours-answering-service-minnesota/', '/online-booking-minnesota/', '/website-design-minnesota/']) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    const o = await page.$eval('[data-object-hero]', (e) => e.getBoundingClientRect().bottom);
    const c = await page.$eval('.page-hero__card', (e) => e.getBoundingClientRect().top);
    ok(c >= o - 1, `${path}: example card overlaps the 3D object by ${Math.round(o - c)}px`);
  }

  // 404: one h1, noindex, no canonical
  await page.goto(BASE + '/no-such-page/');
  ok((await page.locator('h1').count()) === 1 && (await page.locator('meta[name=robots][content="noindex"]').count()) === 1 && !(await page.locator('link[rel=canonical]').count()), '404 page');
  return { passed, fails };
};
