import { writeFileSync } from 'fs';
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

// Page slugs (20 pages)
const pageSlugs = [
  "", // homepage
  "claude-code-zhongzhuan",
  "openai-api-base-url",
  "api-zhongzhuan-safe",
  "mcp-shi-shenme",
  "cursor-mcp",
  "claude-desktop-mcp",
  "cline-mcp",
  "chatgpt-mcp-server",
  "mcp-api-key-anquan",
  "mcp-security",
  "claude-code-api-key",
  "claude-code-base-url",
  "claude-code-guonei",
  "claude-code-timeout-503-524",
  "openai-compatible-api",
  "v1-models",
  "tongyi-qianwen-api",
  "kimi-api",
  "doubao-api",
  "openai-api-usage",
];

const urls = pageSlugs.map(slug =>
  slug === "" ? `${site.baseUrl}/` : `${site.baseUrl}/${slug}/`
);

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
