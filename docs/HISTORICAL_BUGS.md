# AI API Radar — Historical Bugs

This document records real bugs that have occurred on this project. Every agent must understand these to prevent regression.

---

## Bug 1: Cloudflare Production Stayed on Old Commit

**Severity**: Critical (release blocker)

**Symptom**: GitHub main branch had new commits (e.g., `6b2ea25`), but Cloudflare Pages production deployment remained on an old commit (e.g., `a632139`). The agent reported "auto-deploying" instead of confirming the actual deployed commit.

**Root Cause**: Cloudflare Pages auto-deployment can take several minutes after a push. The agent did not verify the final deployed commit.

**Detection**:
```bash
git ls-remote origin HEAD  # get latest main commit
# Compare with Cloudflare Dashboard "latest production deployment" commit
```

**Fix**: Always wait for Cloudflare to confirm deployment. Do not report production as updated until the commit hashes match.

**Rule**: Cloudflare latest production commit MUST equal `origin/main` HEAD. "auto-deploying" does NOT equal "deployed".

---

## Bug 2: Retrying Old Deployment Made Things Worse

**Severity**: High

**Symptom**: When Cloudflare production was behind, the user clicked "Retry deployment" on an old commit via Cloudflare Dashboard, which did not bring the new content live.

**Rule**: If Cloudflare is on an old commit, do NOT retry an old deployment. Push a new trigger commit to main or fix the deployment pipeline.

---

## Bug 3: Invalid Route Returned Homepage 200

**Severity**: High (SEO)

**Symptom**: Cloudflare Pages SPA fallback behavior caused all invalid routes to return the homepage HTML with HTTP 200 OK, including genuinely non-existent pages.

**Root Cause**: Cloudflare Pages' default SPA fallback serves `200 OK` for all routes that don't match a static file, including pages that should 404.

**Fix**: Created `src/pages/404.astro` with a custom 404 page. Cloudflare Pages is configured to return this page with HTTP 404 for unmatched routes.

**Detection**: Check with `curl -I https://aiapiradar.com/nonexistent-page-xyz123/`

**Rule**: Any invalid URL must return a real HTTP 404. Do not accept homepage content for non-existent paths.

---

## Bug 4: 404 Page Missing noindex Meta

**Severity**: High (SEO)

**Symptom**: The 404 page was rendering without the `<meta name="robots" content="noindex, follow">` tag, causing search engines to potentially index error pages.

**Root Cause**: `src/pages/404.astro` set `robots: 'noindex, follow'` in its frontmatter, but `src/components/Layout.astro` was not forwarding the `robots` prop to `src/components/SeoHead.astro`.

**Detection**: Check the final rendered `dist/404.html`, not just the `.astro` source.

**Fix**: Modified `Layout.astro` to accept and pass through the `robots` prop to `SeoHead.astro`.

**Rule**: When modifying SEO meta tags, always verify the final rendered HTML in `dist/`, not just source files.

---

## Bug 5: Layout Not Passing robots Prop to SeoHead

**Severity**: High (SEO)

**Symptom**: Same root cause as Bug 4. The `robots` prop was accepted by `Layout.astro` but never forwarded to `SeoHead.astro`, causing noindex directives to be silently dropped.

**Rule**: Any prop related to SEO meta (robots, title, description, canonical) must be traced through the full component chain: page -> Layout -> SeoHead.

---

## Bug 6: sitemap.xml and llms.txt Missing Homepage

**Severity**: Medium (SEO/discovery)

**Symptom**: Sitemap had 28 `<loc>` entries instead of 29. LLMs.txt had 28 page entries instead of 29. Homepage URL `https://aiapiradar.com/` was missing from both files.

**Root Cause**: Both `generate-sitemap.mjs` and `generate-llms.mjs` read slugs from `pages.ts`. The homepage has no slug in `pages.ts` because it is `src/pages/index.astro`, not a dynamic route. The `slug === ""` fallback branch was never triggered.

**Detection**:
```bash
grep -c '<loc>' public/sitemap.xml   # should be 29
grep 'aiapiradar.com/</loc>' public/sitemap.xml  # homepage must exist
grep -c '^- ' public/llms.txt        # should be 29
```

**Fix**:
- `generate-sitemap.mjs`: Always prepend homepage URL to uniqueSlugs array
- `generate-llms.mjs`: Add `{slug:'', title:'首页'}` as the first entry

**Rule**: Homepage is NOT in `pages.ts`. Always verify sitemap and llms include homepage separately after any change.

---

## Bug 7: CTA Only Checked 7 Pages (Not Full Site)

**Severity**: Medium (release integrity)

**Symptom**: The initial release report checked CTAs on only 7 full/sample pages instead of all 29 public pages.

**Rule**: CTA checks are NEVER optional or sample-based. Must check all 29 public pages. Any report with CTA "抽查" (sampled) is incomplete.

---

## Bug 8: Forbidden Phrase False Positive — CSS 100%

**Severity**: Low (false alarm)

**Symptom**: The forbidden phrase validator flagged "100%" in CSS `linear-gradient(... 100%)` as a forbidden phrase match.

**Root Cause**: The check pattern `100%` was too broad and matched CSS percentage values.

**Fix**: Forbidden phrase checks now target complete risk phrases (e.g., "100% 安全"), not standalone substrings. CSS values are not considered forbidden content.

**Rule**: When implementing forbidden phrase checks, ensure patterns match complete risk phrases. Do not create patterns that match generic CSS values or standalone numbers.

---

## Bug 9: PowerShell Multiline H1 Regex False Positive

**Severity**: Low (detection reliability)

**Symptom**: PowerShell's `-match` operator with `.*?` regex failed to match H1 content that contained embedded newline characters, causing false negatives in the H1 presence check.

**Root Cause**: HTML H1 tags may contain inline elements with embedded `\n` characters. A simple regex `<h1[^>]*>([^<]+)</h1>` fails when content spans multiple lines.

**Fix**: Use robust string parsing methods (String.IndexOf + Substring) instead of fragile multiline regex in PowerShell scripts.

**Rule**: When extracting HTML elements in PowerShell, prefer robust parsing over regex that may fail on multiline content.

---

## Bug 10: www Redirect Returned 200 Instead of 301

**Severity**: Medium (SEO/canonicalization)

**Symptom**: Before proper configuration, `https://www.aiapiradar.com/` returned HTTP 200 (the homepage content), not a 301 redirect to the apex domain.

**Detection**: `curl -I https://www.aiapiradar.com/`

**Rule**: www subdomain must always 301 redirect to the apex domain, preserving path and query string.
