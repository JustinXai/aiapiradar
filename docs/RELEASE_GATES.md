# AI API Radar — Release Gates

This document defines all gates that must pass before a release is considered complete.

## Local Gates (Must All Pass Before Git Push)

```bash
git status
git log --oneline -3
git rev-parse HEAD
git ls-remote origin HEAD
npm run verify
npm run build
npm run check:release
```

If any gate fails, do not push to main.

## Sitemap / LLMs Gates

| Gate | Expected | Forbidden |
|------|----------|-----------|
| sitemap.xml <loc> count | 29 | — |
| sitemap.xml includes homepage | yes | — |
| sitemap.xml includes /404 | no | /404 must be excluded |
| llms.txt page entries count | 29 | — |
| llms.txt includes homepage | yes | — |
| llms.txt includes /404 | no | /404 must be excluded |

## CTA Gates (Full-Site, No Exceptions)

| Gate | Expected |
|------|----------|
| Pages with aiapidoctor.com | 29/29 |
| Pages with api1.link-ai.cc/register | 29/29 |
| Pages with #/register | 0 |
| Pages with /tools/ | 0 |

CTA checks are NEVER optional. A report with sampled CTA checks (e.g., only 7 pages) is incomplete.

## SEO Gates

| Gate | Expected |
|------|----------|
| All pages canonical = https://aiapiradar.com/[slug]/ | yes |
| Homepage canonical = https://aiapiradar.com/ | yes |
| Public pages with noindex | 0 |
| Homepage with noindex | 0 |

## 404 Gates

| Gate | Expected |
|------|----------|
| Invalid route HTTP status | 404 (not 200) |
| 404 page contains "页面未找到" | yes |
| 404 page has noindex meta | yes |
| 404 excluded from sitemap | yes |
| 404 excluded from llms.txt | yes |

## www Redirect Gate

| Gate | Expected |
|------|----------|
| https://www.aiapiradar.com/ -> 301 | yes |
| Redirect preserves path | yes |
| Redirect preserves query | yes |
| www returns 200 | NO — must be 301 |

## Forbidden Phrase Gate

| Gate | Expected |
|------|----------|
| Forbidden phrase true hits in prose | 0 |
| Context output on any hit | required |
| CSS "100%" flagged as forbidden | NO (false positive) |

Forbidden phrases: LinkAI最便宜, 保证稳定, 官方替代, 永久免费, 不会扣费 (promise context), 100%安全, 保证解决, 全网最低, 无限使用, 免费无限, 官方同款, 零风险, 必定可用, 所有模型都可用, 100%成功, 失败一定不扣费

## Cloudflare Commit Gate

| Gate | Expected |
|------|----------|
| Cloudflare latest production commit == origin/main | yes |
| "auto-deploying" used as deployed status | NO |
| Stale production + retry old deployment | NO |

If Cloudflare is behind, do not retry old deployment. Push a trigger commit.

## GSC / Bing Submission Gate

| Gate | Expected |
|------|----------|
| All local gates passed | yes |
| All production gates passed | yes |
| Cloudflare latest production commit confirmed | yes |
| sitemap.xml and llms.txt verified live (not cached) | yes |

GSC and Bing submission are only allowed after ALL gates pass.

## Production Live Check Items (npm run check:live)

Must verify all of:
- https://aiapiradar.com/ returns 200
- All 6 full pages return 200
- sitemap.xml returns 200 with 29 <loc>
- robots.txt returns 200
- llms.txt returns 200 with 29 entries
- Invalid route returns 404
- 404 page contains "not-found" text
- 404 page contains noindex
- www -> apex 301 redirect works
- CTA present on all checked pages
- Forbidden phrases: 0 true hits

## check:gsc-ready Output

Only outputs this line when ALL gates pass:
```
GSC/Bing submission allowed
```

If any gate fails, exits with non-zero code.
