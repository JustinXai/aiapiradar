# AI API Radar — GSC and Bing Submission

## Prerequisites

GSC and Bing submission is ONLY allowed after ALL of the following pass:

### Local Gates (already verified via check:release)
- [ ] `npm run verify` passes
- [ ] `npm run build` passes
- [ ] `npm run check:release` passes

### Cloudflare Commit Gate
- [ ] `git ls-remote origin HEAD` matches Cloudflare Dashboard "latest production deployment" commit
- [ ] NOT just "auto-deploying" — must be confirmed deployed

### Production Live Gates
- [ ] `npm run check:live` all PASS
- [ ] Homepage 200 verified
- [ ] Sitemap 200 with 29 <loc> verified (cache-busted)
- [ ] LLMs 200 with 29 entries verified (cache-busted)
- [ ] Invalid route 404 verified
- [ ] 404 has noindex, follow verified
- [ ] www -> apex 301 verified

## Submitting to Google Search Console (GSC)

### Sitemap Submission
1. Go to https://search.google.com/search-console
2. Select property: https://aiapiradar.com/
3. Navigate to Sitemaps
4. Submit: `https://aiapiradar.com/sitemap.xml`
5. Check for errors

### URL Inspection
For any page with issues, use URL Inspection to request indexing:
1. Enter the page URL
2. Test Live URL
3. Request Indexing

### When to Resubmit
- After any new page is added to the site
- After significant content updates
- After sitemap updates
- NOT after every minor fix

## Submitting to Bing

### Sitemap Submission
1. Go to https://www.bing.com/webmasters
2. Add property: https://aiapiradar.com/
3. Navigate to Configure My Site -> Sitemaps
4. Submit: `https://aiapiradar.com/sitemap.xml`

### URL Submission
Use the Bing Webmaster Tools URL submission API or manual submission for individual pages.

## Verification After Submission

After submission, monitor:
- GSC Coverage report for indexing status
- GSC Sitemap report for errors
- Bing Index report for Bing-specific issues

## What NOT to Do

- Do NOT submit to GSC/Bing before production live checks pass
- Do NOT submit to GSC/Bing if Cloudflare is on an old commit
- Do NOT submit to GSC/Bing if sitemap has wrong URL count
- Do NOT submit to GSC/Bing if pages have noindex (except /404)
- Do NOT submit to GSC/Bing if CTA checks fail

## check:gsc-ready

Run `npm run check:gsc-ready`. This script only outputs:

```
GSC/Bing submission allowed
```

when ALL gates pass. Otherwise it exits with a non-zero code and lists failures.

## Production URL Reference

| Asset | URL |
|-------|-----|
| Homepage | https://aiapiradar.com/ |
| Sitemap | https://aiapiradar.com/sitemap.xml |
| Robots | https://aiapiradar.com/robots.txt |
| LLMs | https://aiapiradar.com/llms.txt |
| 404 page | https://aiapiradar.com/nonexistent-page-xyz123/ (test) |
| www redirect | https://www.aiapiradar.com/ -> 301 |
