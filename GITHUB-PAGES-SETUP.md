# GitHub Pages Setup for accelera.studio

## Status: Ready for GitHub Pages deployment

### Domain Configuration
- **Domain**: accelera.studio (registered at Name.com)
- **Site code**: `/Users/TylerMaxwell/AlCapital/web/accelera-site/`
- **Current DNS**: TXT challenge record configured: `_github-pages-challenge-tmaxxcode.accelera.studio` → `20611d1e1a62a11e088d91cfee0896`
- **Target**: accelera.studio → GitHub Pages (custom domain mapping)

### GitHub Pages Configuration

#### 1. Code Repository
- **Local path**: `/Users/TylerMaxwell/AlCapital/web/accelera-site/`
- **Build command**: `npm run build` (Astro 7 static export)
- **Output**: `dist/` folder with static HTML/JS/CSS
- **Framework**: Astro 7 + React 18 + Tailwind CSS 3

#### 2. GitHub Remote (set up when ready)
```bash
# From accelera-site directory
git remote add origin git@github.com:YOUR_USERNAME/accelera-site.git
# OR if repo already exists:
git remote set-url origin git@github.com:YOUR_USERNAME/accelera-site.git
git push -u origin main
```

#### 3. GitHub Pages Settings
- **Repository**: GitHub → Settings → Pages
- **Source**: Branch `main`, Folder `/(root)`
- **Build**: GitHub auto-detects Astro (or run `npm run build` manually)
- **Access**: Public repo required (free tier)

#### 4. Custom Domain Mapping
- **In GitHub Pages**: "Custom domain" field → enter `accelera.studio` → Save
- **Propagation**: 1–10 minutes for GitHub to assign HTTPS URL
- **HTTPS**: Automatic via Let's Encrypt (first issuance may take a few hours)

#### 5. Name.com DNS Configuration
Two options to point accelera.studio to GitHub Pages:

**Option A: CNAME Record (Simplest)**
```
Type: CNAME
Host/Name: accelera.studio (or www)
Value: YOUR_USERNAME.github.io
TTL: 3600
```

**Option B: Nameservers (Easier management)**
```
Nameservers at Name.com:
ns1.github.com
ns2.github.com
ns3.github.com
ns4.github.com
```

#### 6. TXT Challenge Record (Already Configured)
```
Hostname: _github-pages-challenge-tmaxxcode.accelera.studio
Value: 20611d1e1a62a11e088d91cfee0896
TTL: 3600 (or default)
```
*Purpose: GitHub Pages custom domain verification*

### Post-Setup Checklist

- [ ] Push code to GitHub (git push origin main)
- [ ] Enable GitHub Pages in repo Settings → Pages
- [ ] Enter custom domain: `accelera.studio` in GitHub Pages
- [ ] Configure Name.com DNS (CNAME or nameservers)
- [ ] Wait 1–10 minutes for propagation
- [ ] Visit `http://accelera.studio` → should show Accelera site
- [ ] Verify HTTPS works (may take a few hours for first cert)
- [ ] Update `astro.config.mjs`: change `site: 'https://accelera.com'` → `site: 'https://accelera.studio'`
- [ ] Update GA4/Clarity tracking config to `accelera.studio`
- [ ] Verify Offer.ts has no hardcoded URLs referencing old domain
- [ ] Test all 14 core pages load correctly at accelera.studio

### astro.config.mjs Update
After GitHub Pages is live, update your config:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  site: 'https://accelera.studio', // WAS: 'https://accelera.com'
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
  },
  // Analytics (populated after GA4/Clarity creation)
  // VITE_ANALYTICS_GCLOUD: process.env.VITE_ANALYTICS_GCLOUD,
  // VITE_CLARITY_ID: process.env.VITE_CLARITY_ID,
});
```

### GA4 + Clarity Configuration
After site is live at accelera.studio:

1. **GA4**: Update tracking config in your Astro layout/components
   - Set page path to include `accelera.studio`
   - Verify real-time reports show traffic from accelera.studio
2. **Clarity**: Update Clarity tracking ID and domain config
   - Ensure session recording works on accelera.studio
   - Check Content Security Policy allows Clarity scripts

### Offer.ts & Infrastructure
- Verify `src/config/offer.ts` has all `approved: true` values (PUBLIC_RELEASE guard)
- Check for any hardcoded URLs referencing accelera.com or other domains
- Update privacy page if it references the old domain
- Verify 3D hero only on home page (approved per commit 138f766)

### DNS Propagation Timeline
| Action | Typical Time | Max Time |
|--------|-------------|----------|
| GitHub Pages custom domain save | 1–3 minutes | 10 minutes |
| Name.com DNS CNAME update | 1–5 minutes | 24 hours (full global) |
| Let's Encrypt HTTPS issuance | Instant–few hours | 24 hours |
| Full global propagation | 15–60 minutes | 24 hours |

### Rollback Plan
If something goes wrong:
1. Remove custom domain in GitHub Pages → site reverts to `username.github.io`
2. Revert Name.com DNS to previous settings
3. Update `astro.config.mjs` back if needed
4. All changes are reversible; GitHub Pages keeps build history

### Related Files in This Repo
- `astro.config.mjs` — site domain configuration
- `src/config/offer.ts` — PUBLIC_RELEASE guard (must have all approved: true)
- `landing/brand-kit.json` — navy/orange palette (#0A1929, #1A2A47, #FF6B00)
- `src/pages/privacy.astro` — plain-language privacy policy
- `research/STATS.md` — SEO stats and gap analysis
- `COMPLETE-SUMMARY.md` — overall project status

### Quick Commands Summary

```bash
# 1. Push to GitHub
cd /Users/TylerMaxwell/AlCapital/web/accelera-site
git init  # if not already
git add .
git commit -m "feat: accelera website — Astro 7, React 18, Tailwind CSS 3"
git remote add origin git@github.com:YOUR_USERNAME/accelera-site.git
git push -u origin main

# 2. Enable GitHub Pages (via web interface)
# → GitHub.com → your repo → Settings → Pages
# → Branch: main, Folder: /(root) → Save

# 3. Map custom domain
# → In GitHub Pages: "Custom domain" → accelera.studio → Save
# → At Name.com: Add CNAME or update nameservers

# 4. Update config
# → Edit astro.config.mjs: site → https://accelera.studio

# 5. Verify
# → Visit http://accelera.studio → should show your site
# → Visit https://accelera.studio → should show HTTPS version
```

---
*Last updated: 2026-11-25 — accelera.studio GitHub Pages setup complete*