/**
 * check-release.mjs
 * Comprehensive release gate checks — runs against local files.
 * Must pass before any push to main.
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

let allPassed = true;

function pass(label) {
  console.log(`  [PASS] ${label}`);
}
function fail(label, detail) {
  console.error(`  [FAIL] ${label}`);
  if (detail) console.error(`        ${detail}`);
  allPassed = false;
}
function warn(label) {
  console.warn(`  [WARN] ${label}`);
}

// ============================================================
// 1. Sitemap checks
// ============================================================
console.log('\n=== Sitemap ===');
const sitemapPath = join(rootDir, 'public', 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  fail('sitemap.xml exists');
} else {
  const sitemap = readFileSync(sitemapPath, 'utf-8');
  const locCount = (sitemap.match(/<loc>/g) || []).length;
  console.log(`  URL count: ${locCount}`);
  if (locCount === 32) {
    pass('sitemap <loc> count = 32');
  } else {
    fail('sitemap <loc> count = 32', `got ${locCount}`);
  }
  if (sitemap.includes('<loc>https://aiapiradar.com/</loc>')) {
    pass('homepage in sitemap');
  } else {
    fail('homepage in sitemap');
  }
  if (sitemap.includes('/404')) {
    fail('sitemap excludes /404', '/404 found in sitemap');
  } else {
    pass('sitemap excludes /404');
  }
}

// ============================================================
// 2. LLMs checks
// ============================================================
console.log('\n=== LLMs ===');
const llmsPath = join(rootDir, 'public', 'llms.txt');
if (!existsSync(llmsPath)) {
  fail('llms.txt exists');
} else {
  const llms = readFileSync(llmsPath, 'utf-8');
  // Count page entries: lines that start with "- " and contain aiapiradar.com URL
  const lines = llms.split('\n');
  const pageLines = lines.filter(l => l.startsWith('- ') && l.includes('aiapiradar.com/'));
  console.log(`  Page entries: ${pageLines.length}`);
  if (pageLines.length === 32) {
    pass('llms page count = 32');
  } else {
    fail('llms page count = 32', `got ${pageLines.length}`);
  }
  // Homepage check: first page entry should be the base URL
  if (pageLines.length > 0 && pageLines[0].includes('aiapiradar.com/')) {
    pass('homepage is first entry in llms');
  } else {
    fail('homepage is first entry in llms');
  }
  if (llms.includes('aiapiradar.com/404')) {
    fail('llms excludes /404', '/404 found in llms');
  } else {
    pass('llms excludes /404');
  }
}

// ============================================================
// 3. CTA checks (homepage + 29 pages = 30 public URLs)
// ============================================================
console.log('\n=== CTA (public URLs) ===');
const pagesContentForCta = readFileSync(join(rootDir, 'src', 'data', 'pages.ts'), 'utf-8');
const slugMatchesForCta = [...pagesContentForCta.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
const homepagePath = join(rootDir, 'dist', 'index.html');
const publicPaths = [homepagePath];
for (const slug of slugMatchesForCta) {
  publicPaths.push(join(rootDir, 'dist', slug, 'index.html'));
}
console.log(`  Public URLs checked: ${publicPaths.length}`);

const requiredCtas = [
  'https://aiapidoctor.com/',
  'https://api1.link-ai.cc/register',
];
let ctaMissing = 0;
let hashRegisterHits = 0;
let toolsHits = 0;

for (const filePath of publicPaths) {
  if (!existsSync(filePath)) {
    fail('public page exists', filePath);
    continue;
  }
  const html = readFileSync(filePath, 'utf-8');
  const rel = filePath.replace(rootDir, '').replace(/\\/g, '/');
  let ok = true;

  for (const cta of requiredCtas) {
    if (!html.includes(cta)) {
      ok = false;
      ctaMissing++;
    }
  }
  if (html.includes('#/register')) {
    ok = false;
    hashRegisterHits++;
  }
  if (html.includes('/tools/')) {
    ok = false;
    toolsHits++;
  }
  if (ok) pass(`CTA on ${rel}`);
  else fail(`CTA on ${rel}`, 'missing CTA or contains prohibited link');
}

if (ctaMissing === 0) pass('all public URLs contain aiapidoctor.com and register CTA');
else fail('all public URLs contain aiapidoctor.com and register CTA', `missing CTA hits: ${ctaMissing}`);

if (hashRegisterHits === 0) pass('no #/register');
else fail('no #/register', `found on ${hashRegisterHits} pages`);

if (toolsHits === 0) pass('no /tools/');
else fail('no /tools/', `found on ${toolsHits} pages`);

// ============================================================
// 4. 404 page checks
// ============================================================
console.log('\n=== 404 Page ===');
const distDir = join(rootDir, 'dist');
const dist404Path = join(distDir, '404.html');
if (!existsSync(dist404Path)) {
  fail('dist/404.html exists');
} else {
  const content404 = readFileSync(dist404Path, 'utf-8');
  if (content404.includes('noindex')) {
    pass('404 has noindex meta');
  } else {
    fail('404 has noindex meta');
  }
  if (content404.includes('follow')) {
    pass('404 has follow directive');
  } else {
    warn('404 follow directive not found (may be implicit)');
  }
}

// ============================================================
// 5. Canonical checks
// ============================================================
console.log('\n=== Canonical ===');
// Check dist HTML files for canonical consistency
function findFiles(dir, base = '') {
  const items = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const item of items) {
    if (item.isDirectory()) {
      files.push(...findFiles(join(dir, item.name), join(base, item.name)));
    } else {
      files.push(join(base, item.name).replace(/\\/g, '/'));
    }
  }
  return files;
}

if (existsSync(distDir)) {
  const distFiles = findFiles(distDir);
  const htmlFiles = distFiles.filter(f => f.endsWith('/index.html') && !f.includes('/404/'));
  let canonicalIssues = 0;
  for (const htmlFile of htmlFiles) {
    const fullPath = join(distDir, htmlFile);
    const content = readFileSync(fullPath, 'utf-8');
    const canonicalMatch = content.match(/rel="canonical"[^>]+href="([^"]+)"/);
    const canonicalMatch2 = content.match(/href="([^"]+)"[^>]+rel="canonical"/);
    const canonical = (canonicalMatch || canonicalMatch2 || { 1: '' })[1];
    // Expected canonical: https://aiapiradar.com/[slug]/
    const expectedSlug = htmlFile.replace('/index.html', '/').replace(/^\//, '');
    const expected = expectedSlug === ''
      ? 'https://aiapiradar.com/'
      : `https://aiapiradar.com/${expectedSlug}`;
    if (canonical !== expected) {
      canonicalIssues++;
    }
  }
  if (canonicalIssues === 0) {
    pass('all canonical URLs correct');
  } else {
    fail('all canonical URLs correct', `${canonicalIssues} pages have wrong canonical`);
  }

  // Check noindex on public pages
  let noindexPages = 0;
  for (const htmlFile of htmlFiles) {
    const fullPath = join(distDir, htmlFile);
    const content = readFileSync(fullPath, 'utf-8');
    if (content.includes('noindex')) {
      noindexPages++;
    }
  }
  if (noindexPages === 0) {
    pass('no noindex on public pages');
  } else {
    fail('no noindex on public pages', `${noindexPages} pages have noindex`);
  }
}

// ============================================================
// 6. Forbidden phrases
// ============================================================
console.log('\n=== Forbidden Phrases ===');
const pagesContent = readFileSync(join(rootDir, 'src', 'data', 'pages.ts'), 'utf-8');
const forbidden = [
  'LinkAI 最便宜', '保证稳定', '官方替代', '永久免费',
  '不会扣费', '100% 安全', '保证解决', '全网最低',
  '无限使用', '免费无限', '官方同款', '零风险',
  '必定可用', '所有模型都可用', '100% 成功', '失败一定不扣费',
];

// Check pages.ts
let forbiddenHits = [];
for (const phrase of forbidden) {
  if (pagesContent.includes(phrase)) {
    // Find context
    const idx = pagesContent.indexOf(phrase);
    const start = Math.max(0, idx - 120);
    const end = Math.min(pagesContent.length, idx + phrase.length + 120);
    const context = pagesContent.substring(start, end).replace(/\n/g, ' ');
    forbiddenHits.push({ phrase, file: 'src/data/pages.ts', context });
  }
}

// Check homepage
const homePath = join(distDir, 'index.html');
if (existsSync(homePath)) {
  const homeContent = readFileSync(homePath, 'utf-8');
  for (const phrase of forbidden) {
    if (homeContent.includes(phrase)) {
      const idx = homeContent.indexOf(phrase);
      const start = Math.max(0, idx - 120);
      const end = Math.min(homeContent.length, idx + phrase.length + 120);
      const context = homeContent.substring(start, end).replace(/\n/g, ' ');
      forbiddenHits.push({ phrase, file: 'dist/index.html', context });
    }
  }
}

if (forbiddenHits.length === 0) {
  pass('no forbidden phrases');
} else {
  for (const hit of forbiddenHits) {
    fail(`forbidden phrase: "${hit.phrase}"`, `in ${hit.file}`);
    console.error(`        context: ...${hit.context}...`);
  }
}

// ============================================================
// 7. Prohibited CTA welfare copy (full dist scan)
// ============================================================
console.log('\n=== Prohibited CTA Welfare Copy ===');
const prohibitedCtaPatterns = [
  '注册 LinkAI，领取 $2 免费福利',
  '$2 免费福利',
  '免费福利',
  '1 RMB = 1 USD',
];
let prohibitedCtaHits = [];

if (existsSync(distDir)) {
  const distFiles = findFiles(distDir);
  const htmlFiles = distFiles.filter(f => f.endsWith('.html'));
  for (const htmlFile of htmlFiles) {
    const fullPath = join(distDir, htmlFile);
    const content = readFileSync(fullPath, 'utf-8');
    for (const pattern of prohibitedCtaPatterns) {
      if (content.includes(pattern)) {
        const rel = htmlFile.replace(/\\/g, '/');
        prohibitedCtaHits.push({ pattern, file: rel });
      }
    }
  }
}

if (prohibitedCtaHits.length === 0) {
  pass('no prohibited CTA welfare copy in dist');
} else {
  for (const hit of prohibitedCtaHits) {
    fail(`prohibited CTA welfare copy: "${hit.pattern}"`, `in ${hit.file}`);
  }
}

// ============================================================
// Summary
// ============================================================
console.log('\n========================================');
if (allPassed) {
  console.log('check:release — ALL PASSED');
  console.log('========================================');
  process.exit(0);
} else {
  console.error('check:release — SOME CHECKS FAILED');
  console.error('========================================');
  process.exit(1);
}
