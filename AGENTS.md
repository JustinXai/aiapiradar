# AI Agent Project Rules — AI API Radar

## Project Identity

- **Name**: AI API Radar / AI API 雷达
- **Domain**: https://aiapiradar.com/
- **Canonical base**: https://aiapiradar.com/
- **Repository**: https://github.com/JustinXai/aiapiradar
- **Deployment**: Cloudflare Pages (auto-deploys on push to main)
- **Tech stack**: Astro static site generator

## Positioning

AI API Radar is a neutral Chinese SEO/GEO引流站 covering AI API configuration, risks, and pricing transparency. It does NOT provide:
- LinkAI official documentation (that is guides.link-ai.cc)
- API detection/proxy services (that is aiapidoctor.com)
- User accounts, login, payment, or database functionality

## Site Division of Labor

| Property | Role |
|----------|------|
| https://aiapiradar.com | This repo — neutral SEO引流站 |
| https://guides.link-ai.cc | LinkAI official docs |
| https://aiapidoctor.com | Detection tool (external) |
| https://api1.link-ai.cc/register | Registration conversion page (external) |

## Current URL Count (Source of Truth)

- **Homepage**: https://aiapiradar.com/ (1 URL)
- **Content pages**: 29 slugs defined in `src/data/pages.ts`
- **Total public URLs**: 30
- **404 page**: Exists but excluded from sitemap and llms.txt

## sitemap.xml Rules

- Must contain homepage + 29 content pages = 30 `<loc>` entries
- Must NOT contain /404
- Homepage URL `https://aiapiradar.com/` must be the first entry
- Regenerate after any `pages.ts` change

## llms.txt Rules

- Must contain homepage + 29 content pages = 30 page entries
- Must NOT contain /404
- Homepage entry: `首页: https://aiapiradar.com/`
- Regenerate after any `pages.ts` change

## Required CTAs (Every Public Page)

- Detection: `https://aiapidoctor.com/`
- Registration: `https://api1.link-ai.cc/register`
- Registration copy: "注册 LinkAI"
- Forbidden: `#/register` — must not appear in any page
- Forbidden: `/tools/` — must not appear in any page

## Canonical URL Rules

- All content pages: `https://aiapiradar.com/[slug]/`
- Homepage: `https://aiapiradar.com/`
- Never use www domain in canonical
- Always use `https://`

## 404 Rules

- Invalid routes must return HTTP 404 (not homepage 200)
- 404 page must contain "页面未找到"
- 404 page must have `<meta name="robots" content="noindex, follow">`
- 404 page excluded from sitemap and llms.txt

## www Redirect Rule

- `https://www.aiapiradar.com/*` must 301 to `https://aiapiradar.com/[path]`
- Path and query string must be preserved

## Forbidden Content Phrases

The following must NEVER appear in page content:

| Phrase | Chinese |
|--------|---------|
| LinkAI最便宜 | LinkAI 最便宜 |
| 保证稳定 | guarantee stable |
| 官方替代 | official alternative |
| 永久免费 | permanently free |
| 不会扣费 | won't charge (in promise context) |
| 100%安全 | 100% safe |
| 保证解决 | guarantee resolution |
| 全网最低 | lowest on the entire web |
| 无限使用 | unlimited use |
| 免费无限 | free unlimited |
| 官方同款 | same as official |
| 零风险 | zero risk |
| 必定可用 | will definitely work |
| 所有模型都可用 | all models available |
| 100%成功 | 100% success |
| 失败一定不扣费 | failure definitely won't charge |

**Note**: CSS values like `linear-gradient(... 100%)` do not count as forbidden content. Only prose text is checked. When checking, match complete risk phrases, not standalone substrings like "100%".

## UI Freeze

- Do NOT modify global CSS, theme tokens, Header, Footer, CTA styles, or 404 visual design
- Only modify: page content text, pages.ts data, sitemap/llms scripts, validation scripts
- Any visual change requires prior justification and user confirmation

## Release Gates

### Local (Before Push)
```
git status
git log --oneline -3
git rev-parse HEAD
git ls-remote origin HEAD
npm run verify
npm run build
npm run check:release
```

### Production (Before GSC/Bing Submit)
- Cloudflare latest production commit == origin/main HEAD
- All `npm run check:live` checks PASS
- sitemap and llms live (not cached) before submit

## Completion Report Format

Every completion report must state:
1. List of rule files read
2. UI/CSS changed? (must be NO)
3. Business page content changed? (must be NO)
4. `npm run verify` run?
5. `npm run build` run?
6. `check:release` run?
7. Production live check needed?
8. GSC/Bing submission allowed?
9. New sitemap URL count
10. New llms page count

## Historical Bugs

See `docs/HISTORICAL_BUGS.md` for the full list. Key items:
- Cloudflare can lag behind main — always verify deployed commit
- Homepage is not in pages.ts — sitemap/llms must add it manually
- CTA must be checked on ALL 30 pages, not sampled
- 404 page requires both "页面未找到" text and noindex meta
- Forbidden phrase checks must target complete phrases, not substrings

## What This Project Is NOT

- NOT a LinkAI official site
- NOT a database-backed app
- NOT a login/auth system
- NOT an API proxy or detection service
- NOT a payment system

Do not implement these without explicit user request.
