/**
 * check-gsc-ready.mjs
 * Final GSC/Bing submission readiness check.
 * Run after check:release and after confirming Cloudflare production.
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

let allPassed = true;

function pass(label) {
  console.log(`  [PASS] ${label}`);
}
function fail(label) {
  console.error(`  [FAIL] ${label}`);
  allPassed = false;
}

// NOTE: This script checks local files only.
// Cloudflare production commit must be verified MANUALLY before running.
// This script confirms the local gate is ready.
// Network/live checks are done by check-live.mjs.

console.log('========================================');
console.log('GSC/Bing Submission Readiness Check');
console.log('(Local gates only — verify Cloudflare manually)');
console.log('========================================');

// Check all release gates locally
const checks = [
  { name: 'sitemap.xml = 30 URLs', check: () => {
    const sitemap = readFileSync(join(rootDir, 'public', 'sitemap.xml'), 'utf-8');
    const count = (sitemap.match(/<loc>/g) || []).length;
    if (count === 30) { pass('sitemap.xml = 30 URLs'); return true; }
    fail(`sitemap.xml = 30 URLs (got ${count})`); return false;
  }},
  { name: 'sitemap includes homepage', check: () => {
    const sitemap = readFileSync(join(rootDir, 'public', 'sitemap.xml'), 'utf-8');
    if (sitemap.includes('<loc>https://aiapiradar.com/</loc>')) { pass('sitemap includes homepage'); return true; }
    fail('sitemap includes homepage'); return false;
  }},
  { name: 'sitemap excludes /404', check: () => {
    const sitemap = readFileSync(join(rootDir, 'public', 'sitemap.xml'), 'utf-8');
    if (!sitemap.includes('/404')) { pass('sitemap excludes /404'); return true; }
    fail('sitemap excludes /404'); return false;
  }},
  { name: 'llms.txt = 30 pages', check: () => {
    const llms = readFileSync(join(rootDir, 'public', 'llms.txt'), 'utf-8');
    const lines = llms.split('\n');
    const count = lines.filter(l => l.startsWith('- ') && l.includes('aiapiradar.com/')).length;
    if (count === 30) { pass('llms.txt = 30 pages'); return true; }
    fail(`llms.txt = 30 pages (got ${count})`); return false;
  }},
  { name: 'llms includes homepage', check: () => {
    const llms = readFileSync(join(rootDir, 'public', 'llms.txt'), 'utf-8');
    if (llms.includes('aiapiradar.com/')) { pass('llms includes homepage'); return true; }
    fail('llms includes homepage'); return false;
  }},
  { name: 'llms excludes /404', check: () => {
    const llms = readFileSync(join(rootDir, 'public', 'llms.txt'), 'utf-8');
    if (!llms.includes('/404')) { pass('llms excludes /404'); return true; }
    fail('llms excludes /404'); return false;
  }},
  { name: 'pages.ts: 29 slugs', check: () => {
    const content = readFileSync(join(rootDir, 'src', 'data', 'pages.ts'), 'utf-8');
    const count = (content.match(/slug: "([^"]+)"/g) || []).length;
    if (count === 29) { pass('pages.ts: 29 slugs'); return true; }
    fail(`pages.ts: 29 slugs (got ${count})`); return false;
  }},
  { name: 'pages.ts: 29 primary CTA (aiapidoctor)', check: () => {
    const content = readFileSync(join(rootDir, 'src', 'data', 'pages.ts'), 'utf-8');
    const count = (content.match(/primaryCTA:[\s\S]*?url: "https:\/\/aiapidoctor\.com\/"/g) || []).length;
    if (count === 29) { pass('pages.ts: 29 primary CTA'); return true; }
    fail(`pages.ts: 29 primary CTA (got ${count})`); return false;
  }},
  { name: 'pages.ts: 29 secondary CTA (register)', check: () => {
    const content = readFileSync(join(rootDir, 'src', 'data', 'pages.ts'), 'utf-8');
    const count = (content.match(/secondaryCTA:[\s\S]*?url: "https:\/\/api1\.link-ai\.cc\/register"/g) || []).length;
    if (count === 29) { pass('pages.ts: 29 secondary CTA'); return true; }
    fail(`pages.ts: 29 secondary CTA (got ${count})`); return false;
  }},
  { name: 'no #/register in pages.ts', check: () => {
    const content = readFileSync(join(rootDir, 'src', 'data', 'pages.ts'), 'utf-8');
    const count = (content.match(/#\/register/g) || []).length;
    if (count === 0) { pass('no #/register'); return true; }
    fail(`no #/register (got ${count})`); return false;
  }},
  { name: 'no /tools/ in pages.ts', check: () => {
    const content = readFileSync(join(rootDir, 'src', 'data', 'pages.ts'), 'utf-8');
    const count = (content.match(/\/tools\//g) || []).length;
    if (count === 0) { pass('no /tools/'); return true; }
    fail(`no /tools/ (got ${count})`); return false;
  }},
  { name: 'dist/404.html has noindex', check: () => {
    const path = join(rootDir, 'dist', '404.html');
    if (!existsSync(path)) { fail('dist/404.html exists'); return false; }
    const content = readFileSync(path, 'utf-8');
    if (content.includes('noindex')) { pass('dist/404.html has noindex'); return true; }
    fail('dist/404.html has noindex'); return false;
  }},
  { name: 'no forbidden phrases', check: () => {
    const content = readFileSync(join(rootDir, 'src', 'data', 'pages.ts'), 'utf-8');
    const forbidden = ['LinkAI 最便宜', '保证稳定', '官方替代', '永久免费',
      '不会扣费', '100% 安全', '保证解决', '全网最低',
      '无限使用', '免费无限', '官方同款', '零风险',
      '必定可用', '所有模型都可用', '100% 成功', '失败一定不扣费'];
    const hits = forbidden.filter(p => content.includes(p));
    if (hits.length === 0) { pass('no forbidden phrases'); return true; }
    fail(`forbidden phrases: ${hits.join(', ')}`); return false;
  }},
];

let passCount = 0;
for (const { name, check } of checks) {
  if (check()) passCount++;
}

console.log('\n========================================');
console.log(`Local gates: ${passCount}/${checks.length} passed`);
console.log('');
console.log('IMPORTANT: Before submitting to GSC/Bing:');
console.log('1. Confirm Cloudflare latest production commit = origin/main');
console.log('2. Run: npm run check:live');
console.log('3. Verify sitemap and llms are live (not cached)');
console.log('========================================');

if (allPassed) {
  console.log('GSC/Bing submission allowed');
  process.exit(0);
} else {
  console.error('GSC/Bing submission NOT allowed — fix failures above');
  process.exit(1);
}
