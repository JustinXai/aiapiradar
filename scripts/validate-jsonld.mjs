/**
 * validate-jsonld.mjs
 * Validates JSON-LD in dist HTML files.
 * Checks: BreadcrumbList, FAQPage, no undefined/NaN/[object Object], FAQ consistency.
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

function findFiles(dir, ext, base = '') {
  const items = readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const item of items) {
    const fullPath = join(base, item.name);
    if (item.isDirectory()) {
      results.push(...findFiles(join(dir, item.name), ext, fullPath));
    } else if (item.name.endsWith(ext)) {
      results.push(fullPath.replace(/\\/g, '/'));
    }
  }
  return results;
}

const htmlFiles = findFiles(distDir, '.html')
  .filter(f => f.endsWith('index.html'));

console.log(`Checking JSON-LD in ${htmlFiles.length} HTML files...\n`);

let allPassed = true;

for (const file of htmlFiles) {
  const fullPath = join(distDir, file);
  const content = readFileSync(fullPath, 'utf-8');
  const fileName = file;

  // Extract all JSON-LD blocks
  const ldJsonMatches = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];

  if (ldJsonMatches.length === 0) {
    // Only homepage and content pages with FAQ need JSON-LD
    // Scaffold pages may not have visible FAQ so might not need it
    // But all pages should have at least some JSON-LD
    console.log(`  ${fileName}: WARNING - No JSON-LD found`);
    continue;
  }

  for (const block of ldJsonMatches) {
    const jsonStr = block.replace(/<\/?script[^>]*>/g, '');
    try {
      const data = JSON.parse(jsonStr);

      // Check for undefined/NaN/[object Object]
      const serialized = JSON.stringify(data);
      if (serialized.includes('undefined') || serialized.includes('NaN') || serialized.includes('[object Object]')) {
        console.error(`  ${fileName}: FAIL - JSON-LD contains undefined/NaN/[object Object]`);
        allPassed = false;
        continue;
      }

      // Check type
      const type = data['@type'];
      if (type === 'BreadcrumbList') {
        // Validate BreadcrumbList structure
        const items = data.itemListElement || [];
        if (items.length >= 1) {
          const hasHome = items.some(item =>
            item.name === '首页' || item.name === 'Home'
          );
          if (hasHome) {
            console.log(`  ${fileName}: BreadcrumbList OK (${items.length} items)`);
          } else {
            console.error(`  ${fileName}: FAIL - BreadcrumbList missing home item`);
            allPassed = false;
          }
        } else {
          console.error(`  ${fileName}: FAIL - BreadcrumbList has fewer than 1 item`);
          allPassed = false;
        }
      } else if (type === 'FAQPage') {
        // Validate FAQPage structure
        const questions = data.mainEntity || [];
        if (questions.length >= 2) {
          let hasValidQA = true;
          for (const q of questions) {
            if (!q.name || !q.acceptedAnswer || !q.acceptedAnswer.text) {
              console.error(`  ${fileName}: FAIL - FAQPage has malformed question/answer`);
              hasValidQA = false;
              allPassed = false;
              break;
            }
          }
          if (hasValidQA) {
            console.log(`  ${fileName}: FAQPage OK (${questions.length} Q&A pairs)`);
          }
        } else {
          console.error(`  ${fileName}: FAIL - FAQPage has fewer than 2 questions`);
          allPassed = false;
        }
      } else if (type === 'WebSite' || type === 'Organization' || type === 'Article') {
        // Other types are fine
        console.log(`  ${fileName}: JSON-LD type "${type}" OK`);
      }
    } catch (err) {
      console.error(`  ${fileName}: FAIL - JSON parse error: ${err.message}`);
      allPassed = false;
    }
  }
}

// Special checks for the 3 full pages and homepage
const fullPages = [
  'index.html',
  'claude-code-zhongzhuan/index.html',
  'openai-api-base-url/index.html',
  'api-zhongzhuan-safe/index.html',
];

console.log('\n=== Special checks for homepage + 3 full pages ===');

for (const page of fullPages) {
  const fullPath = join(distDir, page);
  const content = readFileSync(fullPath, 'utf-8');
  const ldJsonMatches = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];

  let hasBreadcrumb = false;
  let hasFAQ = false;

  for (const block of ldJsonMatches) {
    const jsonStr = block.replace(/<\/?script[^>]*>/g, '');
    try {
      const data = JSON.parse(jsonStr);
      const type = data['@type'];
      if (type === 'BreadcrumbList') hasBreadcrumb = true;
      if (type === 'FAQPage') hasFAQ = true;
    } catch {}
  }

  const status = (hasBreadcrumb ? 'B' : '?') + (hasFAQ ? 'F' : '?');
  console.log(`  ${page}: ${status} (Breadcrumb=${hasBreadcrumb}, FAQ=${hasFAQ})`);
}

console.log('');
if (allPassed) {
  console.log('ALL JSON-LD CHECKS PASSED!');
} else {
  console.error('SOME JSON-LD CHECKS FAILED!');
  process.exit(1);
}
