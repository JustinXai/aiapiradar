/**
 * validate-content.mjs
 * Validates page data completeness, uniqueness, and forbidden phrases.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Load pages data
let pages;
try {
  const dataPath = join(rootDir, 'src', 'data', 'pages.ts');
  const content = readFileSync(dataPath, 'utf-8');
  // Extract pages array
  const match = content.match(/export const pages: PageData\[\] = \[([\s\S]*?)\n\];/);
  if (!match) throw new Error('Could not parse pages array');

  // Use regex-based validation since we can't run TS
  const allPagesContent = content;

  // Basic count checks
  const fullPageCount = (allPagesContent.match(/status: "full"/g) || []).length;
  const scaffoldPageCount = (allPagesContent.match(/status: "scaffold"/g) || []).length;

  console.log(`  Total pages: ${fullPageCount + scaffoldPageCount}`);
  console.log(`  Full pages: ${fullPageCount}`);
  console.log(`  Scaffold pages: ${scaffoldPageCount}`);

  if (fullPageCount + scaffoldPageCount !== 20) {
    console.error(`ERROR: Expected 20 pages, got ${fullPageCount + scaffoldPageCount}`);
    process.exit(1);
  }

  if (fullPageCount !== 3) {
    console.error(`ERROR: Expected 3 full pages, got ${fullPageCount}`);
    process.exit(1);
  }

  if (scaffoldPageCount !== 17) {
    console.error(`ERROR: Expected 17 scaffold pages, got ${scaffoldPageCount}`);
    process.exit(1);
  }

  console.log('  Page count: PASS');

  // Check required slugs for full pages
      const requiredFullSlugs = ['claude-code-zhongzhuan', 'openai-api-base-url', 'api-zhongzhuan-safe'];
      for (const slug of requiredFullSlugs) {
        if (!allPagesContent.includes(`slug: "${slug}"`)) {
          console.error(`ERROR: Required full page slug "${slug}" not found`);
          process.exit(1);
        }
      }
      console.log('  Required full page slugs: PASS');

      // Extract slugs and check uniqueness
      const slugMatches = [...allPagesContent.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
      const slugSet = new Set(slugMatches);
      if (slugSet.size !== slugMatches.length) {
        console.error('ERROR: Duplicate slugs found');
        process.exit(1);
      }
      console.log('  Slug uniqueness: PASS');

      // Check URL format
      const urlMatches = [...allPagesContent.matchAll(/url: "(\/[^"]+)"/g)].map(m => m[1]);
      for (const url of urlMatches) {
        if (!url.startsWith('/') || !url.endsWith('/')) {
          console.error(`ERROR: URL "${url}" must start and end with /`);
          process.exit(1);
        }
      }
      console.log('  URL format (trailing slash): PASS');

      // Check canonical
      const canonicalMatches = [...allPagesContent.matchAll(/canonical: "([^"]+)"/g)].map(m => m[1]);
      const baseUrl = 'https://aiapiradar.com';
      for (const canonical of canonicalMatches) {
        if (!canonical.startsWith(baseUrl)) {
          console.error(`ERROR: Canonical "${canonical}" must start with ${baseUrl}`);
          process.exit(1);
        }
        if (!canonical.endsWith('/')) {
          console.error(`ERROR: Canonical "${canonical}" must end with /`);
          process.exit(1);
        }
      }
      console.log('  Canonical format: PASS');

      // Check CTA URLs
      const primaryCTACount = (allPagesContent.match(/primaryCTA:.*?url: "https:\/\/aiapidoctor\.com\/"/gs) || []).length;
      const secondaryCTACount = (allPagesContent.match(/secondaryCTA:.*?url: "https:\/\/api1\.link-ai\.cc\/register"/gs) || []).length;
      const pricingCTACount = (allPagesContent.match(/pricingCTA:.*?url: "https:\/\/api1\.link-ai\.cc\/pricing"/gs) || []).length;

      if (primaryCTACount !== 20) {
        console.error(`ERROR: Expected 20 primary CTA URLs (aiapidoctor.com), got ${primaryCTACount}`);
        process.exit(1);
      }
      if (secondaryCTACount !== 20) {
        console.error(`ERROR: Expected 20 secondary CTA URLs (register), got ${secondaryCTACount}`);
        process.exit(1);
      }
      if (pricingCTACount !== 20) {
        console.error(`ERROR: Expected 20 pricing CTA URLs (pricing), got ${pricingCTACount}`);
        process.exit(1);
      }
      console.log('  CTA URLs: PASS');

      // Check forbidden phrases (exclude legitimate "不等于绝对安全结论" which is correct caveat text)
      const forbiddenPhrases = [
        'LinkAI 最便宜', '保证稳定', '官方替代', '官方合作', '所有模型可用',
        '永久免费', '不会扣费', '100% 安全', '中转站一定安全', '保证解决',
        'AI API Doctor 能发现所有风险', '全网最低', '无限使用', '免费无限',
        '官方同款', '官方平替', '零风险', '必定可用',
      ];

      let foundForbidden = false;
      for (const phrase of forbiddenPhrases) {
        if (allPagesContent.includes(phrase)) {
          console.error(`ERROR: Forbidden phrase found: "${phrase}"`);
          foundForbidden = true;
        }
      }
      if (foundForbidden) process.exit(1);
      console.log('  Forbidden phrases: PASS');

      // Check placeholder text
      const placeholderPhrases = ['TODO', 'TBD', 'placeholder', 'lorem ipsum', '示例标题', '待补充', '这里填写', 'Your title', 'Your description'];
      let foundPlaceholder = false;
      for (const phrase of placeholderPhrases) {
        if (allPagesContent.includes(phrase)) {
          console.error(`ERROR: Placeholder found: "${phrase}"`);
          foundPlaceholder = true;
        }
      }
      if (foundPlaceholder) process.exit(1);
      console.log('  Placeholder text: PASS');

      // Check prohibited links
      const prohibitedLinks = [
        '#/register', '/tools/', 'docs.link-ai.cc/tools',
        'href="https://api1.link-ai.cc/v1"', 'href="https://api2.link-ai.cc/v1"',
      ];
      let foundProhibited = false;
      for (const link of prohibitedLinks) {
        if (allPagesContent.includes(link)) {
          console.error(`ERROR: Prohibited link pattern found: "${link}"`);
          foundProhibited = true;
        }
      }
      if (foundProhibited) process.exit(1);
      console.log('  Prohibited link patterns: PASS');

      // Check meta description uniqueness
      const metaDescMatches = [...allPagesContent.matchAll(/metaDescription:\s*\n\s*"([^"]+)"/gs)].map(m => m[1].trim());
      const metaDescSet = new Set(metaDescMatches);
      if (metaDescSet.size !== metaDescMatches.length) {
        console.error('ERROR: Duplicate meta descriptions found');
        process.exit(1);
      }
      console.log('  Meta description uniqueness: PASS');

      // Check meta description length (total chars, allowing for mixed CJK+ASCII)
      for (const desc of metaDescMatches) {
        const totalChars = desc.length;
        if (totalChars < 50 || totalChars > 250) {
          console.error(`ERROR: Meta description length out of range (50-250 chars): ${totalChars} chars - "${desc.substring(0, 50)}..."`);
          process.exit(1);
        }
      }
      console.log('  Meta description length: PASS');

      // Check relatedLinks count (>= 3 per page)
      const relatedLinksSection = [...allPagesContent.matchAll(/relatedLinks:\s*\[([\s\S]*?)\],/g)];
      for (const match of relatedLinksSection) {
        const count = (match[1].match(/title:/g) || []).length;
        if (count < 3) {
          console.error(`ERROR: Page has only ${count} related links, need at least 3`);
          process.exit(1);
        }
      }
      console.log('  Related links count (>= 3): PASS');

      // Check FAQ count
      const faqSection = [...allPagesContent.matchAll(/faq:\s*\[([\s\S]*?)\],/g)];
      let lowFAQ = false;
      for (const match of faqSection) {
        const count = (match[1].match(/question:/g) || []).length;
        if (count < 2) {
          console.error(`ERROR: Page has only ${count} FAQs, need at least 2`);
          lowFAQ = true;
        }
      }
      if (lowFAQ) process.exit(1);
      console.log('  FAQ count (>= 2): PASS');

      // Check internal links in relatedLinks
      const relatedUrls = [...allPagesContent.matchAll(/url:\s*"((\/[^"]+\/)|(\/))"/g)].map(m => m[1]);
      for (const url of relatedUrls) {
        if (url !== '/' && (!url.startsWith('/') || !url.endsWith('/'))) {
          console.error(`ERROR: Related link URL "${url}" must start and end with /`);
          process.exit(1);
        }
      }
      console.log('  Related link URL format: PASS');

      console.log('\nAll content validations PASSED!');

} catch (err) {
  console.error('Validation error:', err.message);
  process.exit(1);
}
