import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const site = {
  name: "AI API 雷达",
  nameEn: "AI API Radar",
  domain: "aiapiradar.com",
  baseUrl: "https://aiapiradar.com",
};

// Dynamically read slugs from pages.ts to avoid manual duplication
const pagesContent = readFileSync(join(rootDir, 'src', 'data', 'pages.ts'), 'utf-8');
const slugMatches = [...pagesContent.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
// Remove duplicates while preserving order
const seen = new Set();
const uniqueSlugs = slugMatches.filter(s => { if (seen.has(s)) return false; seen.add(s); return true; });

// Always add homepage first, then all content slugs
const urls = [`${site.baseUrl}/`, ...uniqueSlugs.map(slug => `${site.baseUrl}/${slug}/`)];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === site.baseUrl + "/" ? "1.0" : "0.8"}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outPath = join(rootDir, 'public', 'sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log(`Sitemap generated: ${outPath} (${urls.length} URLs)`);
