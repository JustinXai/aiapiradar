/**
 * validate-links.mjs
 * Validates internal links and external link allowlist.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const ALLOWED_EXTERNAL_LINKS = [
  'https://aiapidoctor.com/',
  'https://link-ai.cc/',
  'https://api1.link-ai.cc/register',
  'https://api1.link-ai.cc/login',
  'https://api1.link-ai.cc/pricing',
];

const VALID_INTERNAL_PATHS = [
  '/',
  '/claude-code-zhongzhuan/',
  '/openai-api-base-url/',
  '/api-zhongzhuan-safe/',
  '/mcp-shi-shenme/',
  '/cursor-mcp/',
  '/claude-desktop-mcp/',
  '/cline-mcp/',
  '/chatgpt-mcp-server/',
  '/mcp-api-key-anquan/',
  '/mcp-security/',
  '/claude-code-api-key/',
  '/claude-code-base-url/',
  '/claude-code-guonei/',
  '/claude-code-timeout-503-524/',
  '/openai-compatible-api/',
  '/v1-models/',
  '/tongyi-qianwen-api/',
  '/kimi-api/',
  '/doubao-api/',
  '/openai-api-usage/',
];

const VALID_INTERNAL_SET = new Set(VALID_INTERNAL_PATHS);

const PROHIBITED_PATTERNS = [
  '#/register',
  '/tools/',
  'docs.link-ai.cc/tools',
  'href="https://api1.link-ai.cc/v1"',
  'href="https://api2.link-ai.cc/v1"',
];

let errors = [];

try {
  const dataPath = join(rootDir, 'src', 'data', 'pages.ts');
  const content = readFileSync(dataPath, 'utf-8');

  // Check prohibited patterns
  for (const pattern of PROHIBITED_PATTERNS) {
    if (content.includes(pattern)) {
      errors.push(`Prohibited pattern found: ${pattern}`);
    }
  }

  // Extract only href values (not text content URLs)
  const hrefRegex = /href\s*=\s*"([^"]+)"/g;
  const hrefUrls = [...content.matchAll(hrefRegex)].map(m => m[1]);

  // Filter to only http/https URLs
  const externalHrefs = hrefUrls.filter(url => url.startsWith('http'));

  // Check external href URLs against allowlist
  for (const url of externalHrefs) {
    let allowed = false;
    for (const allowedUrl of ALLOWED_EXTERNAL_LINKS) {
      if (url === allowedUrl || url.startsWith(allowedUrl)) {
        allowed = true;
        break;
      }
    }
    if (!allowed) {
      // Check if it's an internal URL
      if (url.startsWith('https://aiapiradar.com/')) {
        const path = url.replace('https://aiapiradar.com', '');
        if (VALID_INTERNAL_SET.has(path)) {
          continue; // OK
        } else {
          errors.push(`Internal link to non-existent page: ${path}`);
        }
      } else {
        errors.push(`External URL not in allowlist: ${url}`);
      }
    }
  }

  // Extract internal URL patterns from relatedLinks url fields
  const relatedLinkUrls = [...content.matchAll(/url:\s*"(https:\/\/aiapiradar\.com(\/[^"]+\/))"/g)].map(m => m[2]);
  for (const path of relatedLinkUrls) {
    if (!VALID_INTERNAL_SET.has(path)) {
      errors.push(`Internal link to non-existent page: ${path}`);
    }
  }

  // Check index page
  const indexPath = join(rootDir, 'src', 'pages', 'index.astro');
  const indexContent = readFileSync(indexPath, 'utf-8');

  // Check homepage key links exist
  const homepageKeyLinks = [
    '/claude-code-zhongzhuan/',
    '/openai-api-base-url/',
    '/api-zhongzhuan-safe/',
    '/mcp-shi-shenme/',
    '/v1-models/',
  ];
  for (const link of homepageKeyLinks) {
    if (!indexContent.includes(`href="${link}"`)) {
      errors.push(`Homepage missing key link: ${link}`);
    }
  }

  if (errors.length > 0) {
    console.error('\nLink validation FAILED:');
    errors.forEach(e => console.error('  - ' + e));
    process.exit(1);
  }

  console.log('  External link allowlist: PASS');
  console.log('  Internal link paths: PASS');
  console.log('  Homepage key links: PASS');
  console.log('  Prohibited patterns: PASS');
  console.log('\nAll link validations PASSED!');

} catch (err) {
  console.error('Link validation error:', err.message);
  process.exit(1);
}
