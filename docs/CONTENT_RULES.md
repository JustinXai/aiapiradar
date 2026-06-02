# AI API Radar — Content Rules

## Page Structure

Every content page (from pages.ts) must contain all of:

1. **Quick Answer** — one sentence answering the page's core question
2. **适合谁** — who this page is for
3. **概念解释** — explanation of core concept(s)
4. **检查步骤** — step-by-step checklist for verification
5. **风险** — risk section covering price, availability, security
6. **AI Summary** — brief summary of key points
7. **FAQ** — minimum 2 questions and answers
8. **内部链接** — links to at least 2 related pages
9. **两个 CTA** — detection and registration links

## CTA Requirements

Every public page MUST include:
- `https://aiapidoctor.com/` — detection CTA
- `https://api1.link-ai.cc/register` — registration CTA with "$2 免费福利" copy

Pages must NOT contain:
- `#/register` (hash router links)
- `/tools/` (fake tool pages)

## Agent API Page Requirements

Pages about agent tools (Claude Code, OpenClaw, Kilo Code, etc.) must explain:
- API Key: how to obtain, store, and protect
- Base URL: what to enter, common patterns
- OpenRouter: aggregation, credits system, model routing
- Model name: how to specify, common models
- Error 401: authentication failure — wrong key or expired
- Error 403: permission denied — insufficient credits or model access
- Error 429: rate limit exceeded
- model not found: model not available on this provider
- Token cost: input vs output pricing, context window
- Security: credential exposure risks, credits drain

## Image and Video API Page Requirements

Must clearly distinguish between:
1. **Official API** — vendor's direct REST API endpoint
2. **Third-party aggregation API** — proxy services (e.g., LinkAI)
3. **Product web page capabilities** — features available only through UI, not API
4. **Current availability unknown** — when availability cannot be confirmed

Must explain:
- **Async job submission** — POST request returns job ID
- **Polling** — repeated GET requests to check job status
- **Webhook/callback** — server-side notification on completion
- **Timeout** — request timeout configuration and handling
- **Retry on failure** — idempotency, retry conditions, cost implications
- **Billing on failure** — when does a failed job still get charged?

## Price and Availability Rules

Mandatory phrases:
- "以当前官方文档或服务商后台为准"
- "先小额测试"

Never promise:
- "所有模型都可用"
- "必定可用"
- "保证稳定"
- Any statement that guarantees availability

## Forbidden Phrases

Must never appear in any page prose:

| Phrase | Context |
|--------|---------|
| LinkAI最便宜 | false claim |
| 保证稳定 | unprovable guarantee |
| 官方替代 | misleading |
| 永久免费 | unverifiable |
| 不会扣费 | promise context |
| 100%安全 | absolute guarantee |
| 保证解决 | unprovable |
| 全网最低 | unverifiable |
| 无限使用 | unverifiable |
| 免费无限 | unverifiable |
| 官方同款 | misleading |
| 零风险 | false |
| 必定可用 | unprovable |
| 所有模型都可用 | unverifiable |
| 100%成功 | absolute |
| 失败一定不扣费 | unprovable |

## Forbidden Phrase Checking Rules

When scanning for forbidden phrases:
- Match **complete risk phrases**, not substrings
- Example: check "100% 安全", NOT "100%"
- CSS `linear-gradient(... 100%)` does NOT count as forbidden content
- HTML attributes with "100%" do NOT count
- On any hit: output matched term + file/URL + 120-character context

## Homepage Content

The homepage (`src/pages/index.astro`) must contain:
- H1: "AI API 雷达：模型 API、MCP、Agent、图像视频 API、Base URL 与扣费透明指南"
- The 6-cluster section: 模型 API, MCP, Agent API, 图像与视频 API, Base URL / API Key, 扣费透明
- CTAs: aiapidoctor.com + api1.link-ai.cc/register
