# AI API Radar — Cursor Workflow

## Before Any Task

1. Read these files (in order):
   - `AGENTS.md` (root directory)
   - `docs/PROJECT_MEMORY.md`
   - `docs/RELEASE_GATES.md`
   - `docs/HISTORICAL_BUGS.md`
   - `docs/CONTENT_RULES.md`
   - `.cursor/rules/00-project-always.mdc`
   - `.cursor/rules/30-release-gates.mdc`

2. If any file is missing, report immediately. Do not proceed with code changes.

3. Check git status to understand current state:
   ```bash
   git status
   git log --oneline -3
   ```

## During a Task

### Allowed Actions
- Add/edit content in `src/data/pages.ts`
- Add new pages to `pages.ts` (must include all required fields)
- Update text in `src/pages/index.astro` (no visual changes)
- Modify sitemap/llms/robots generation scripts
- Add validation scripts
- Modify SEO meta tags in existing components
- Run `npm run verify`, `npm run build`, `npm run check:release`

### Forbidden Actions (by default)
- Modify global CSS or theme tokens
- Change Header, Footer, CTA visual styles
- Modify 404 page visual design
- Create login, database, payment, or backend systems
- Create /tools/* fake tool pages
- Modify LinkAI external properties
- Modify Cloudflare domain/redirect settings
- Deploy to non-production environments

### If Visual Changes Are Required
1. Stop immediately
2. Report the reason
3. Get explicit user confirmation
4. Document the exception

## After Completing a Task

### Mandatory Checks
```bash
npm run verify
npm run build
npm run check:release
```

### Completion Report Must Include
1. Rule files read (list)
2. UI/CSS changed? (must be NO)
3. Business page content changed? (must be NO unless explicitly requested)
4. `npm run verify` run? (result)
5. `npm run build` run? (result)
6. `check:release` run? (result)
7. Production live check needed? (yes/no)
8. GSC/Bing submission allowed? (yes/no)
9. New sitemap URL count
10. New llms page count

### Before GSC/Bing Submission
1. Confirm Cloudflare latest production commit == origin/main
2. Run `npm run check:live` against production
3. Verify sitemap and llms are live (not cached)
4. Only then submit to GSC and Bing

## Project-Specific Notes

### pages.ts Does Not Include Homepage
The homepage (`src/pages/index.astro`) is not a dynamic route and has no entry in `pages.ts`. When modifying sitemap or llms generation, remember to handle the homepage separately.

### Cloudflare Deployment Lag
After pushing to main, Cloudflare Pages auto-deployment can take several minutes. Always verify the actual deployed commit before reporting production as updated.

### PowerShell Encoding Issues
Chinese characters in PowerShell scripts can cause parsing errors. Use ASCII-safe character codes (`[char]0x####`) for Chinese strings in regex patterns and comparisons.

### CTA Checks Are Non-Negotiable
CTA must be checked on ALL 29 public pages. Sampling (e.g., only 7 pages) is not acceptable.

## Git Commit Workflow

1. Make changes
2. Run all local gates
3. git add <specific files> (never `git add .` unless intended)
4. git commit with message describing the change
5. git push origin main
6. Wait for Cloudflare deployment
7. Verify Cloudflare production commit == origin/main HEAD
8. Run production live checks
9. Submit to GSC/Bing only if all pass
