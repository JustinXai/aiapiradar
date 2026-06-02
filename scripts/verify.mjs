/**
 * verify.mjs
 * Master verification script - runs all checks sequentially.
 */

import { execSync } from 'child_process';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

function run(name, command) {
  console.log(`\n=== ${name} ===`);
  try {
    const output = execSync(command, { cwd: rootDir, encoding: 'utf-8' });
    console.log(output);
    console.log(`[OK] ${name}`);
    return true;
  } catch (err) {
    console.error(`[FAIL] ${name}`);
    console.error(err.stdout || err.message);
    return false;
  }
}

console.log('========================================');
console.log('AI API Radar - Full Verification');
console.log('========================================');

let allPassed = true;

// 1. Validate content
if (!run('validate-content', 'node scripts/validate-content.mjs')) allPassed = false;

// 2. Validate links
if (!run('validate-links', 'node scripts/validate-links.mjs')) allPassed = false;

// 3. Generate sitemap
if (!run('generate-sitemap', 'node scripts/generate-sitemap.mjs')) allPassed = false;

// 4. Generate llms.txt
if (!run('generate-llms', 'node scripts/generate-llms.mjs')) allPassed = false;

// 5. Check sitemap exists
const sitemapPath = join(rootDir, 'public', 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  console.error('[FAIL] sitemap.xml does not exist');
  allPassed = false;
} else {
  const sitemapContent = readFileSync(sitemapPath, 'utf-8');
  const urlCount = (sitemapContent.match(/<url>/g) || []).length;
  console.log(`\n=== sitemap check ===`);
    console.log(`  sitemap.xml exists: OK (${urlCount} URLs)`);
    if (urlCount !== 29) {
      console.error(`  [WARN] Expected 29 URLs (homepage + 28 content), got ${urlCount}`);
    } else {
      console.log(`  [OK] URL count 29 (correct)`);
    }
}

// 6. Check llms.txt exists
const llmsPath = join(rootDir, 'public', 'llms.txt');
if (!existsSync(llmsPath)) {
  console.error('[FAIL] llms.txt does not exist');
  allPassed = false;
} else {
  const llmsContent = readFileSync(llmsPath, 'utf-8');
  const llmsUrlCount = (llmsContent.match(/https:\/\/aiapiradar\.com\//g) || []).length;
  console.log(`  llms.txt exists: OK (${llmsUrlCount} URLs referenced)`);
}

// 7. Check robots.txt
const robotsPath = join(rootDir, 'public', 'robots.txt');
if (!existsSync(robotsPath)) {
  console.error('[FAIL] robots.txt does not exist');
  allPassed = false;
} else {
  const robotsContent = readFileSync(robotsPath, 'utf-8');
  console.log(`\n=== robots.txt check ===`);
  console.log(`  robots.txt exists: OK`);
  if (!robotsContent.includes('Sitemap:')) {
    console.error('  [WARN] robots.txt missing Sitemap directive');
  } else {
    console.log('  Sitemap directive: OK');
  }
}

// 8. Build
if (!run('build', 'npm run build')) allPassed = false;

// 9. Check dist
const distDir = join(rootDir, 'dist');
if (!existsSync(distDir)) {
  console.error('[FAIL] dist directory does not exist');
  allPassed = false;
} else {
  console.log(`\n=== dist check ===`);

  // Recursively find all files
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

  const distFiles = findFiles(distDir);
  const requiredFiles = [
    'index.html',
    'sitemap.xml',
    'robots.txt',
    'llms.txt',
  ];
  for (const file of requiredFiles) {
    if (distFiles.includes(file)) {
      console.log(`  ${file}: OK`);
    } else {
      console.error(`  ${file}: MISSING`);
      allPassed = false;
    }
  }

  // Check 6 full pages
  const fullPages = [
    'claude-code-zhongzhuan/index.html',
    'openai-api-base-url/index.html',
    'api-zhongzhuan-safe/index.html',
    'openclaw-wechat/index.html',
    'claude-code-token-cost/index.html',
    'shipin-shengcheng-api/index.html',
  ];
  for (const page of fullPages) {
    if (distFiles.includes(page)) {
      console.log(`  ${page}: OK`);
    } else {
      console.error(`  ${page}: MISSING`);
      allPassed = false;
    }
  }

  // Count total pages
  const htmlFiles = distFiles.filter(f => f.endsWith('/index.html'));
  console.log(`  Total pages built: ${htmlFiles.length}`);
}

console.log('\n========================================');
if (allPassed) {
  console.log('ALL VERIFICATION PASSED!');
  console.log('========================================');
  process.exit(0);
} else {
  console.error('SOME CHECKS FAILED - see above');
  console.error('========================================');
  process.exit(1);
}
