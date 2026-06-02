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

const siteDescription = "AI API 雷达是一个中文 AI API 配置与风险分诊站，覆盖模型 API、MCP、Agent API、图像视频 API、Base URL、扣费透明和 API 中转安全。帮助国内开发者搞清楚 DeepSeek、通义千问、Kimi、豆包、Claude、Gemini、OpenClaw、Claude Code、Kilo Code、GPT Image、可灵、即梦、Seedance、万相、海螺等 API 怎么接，Base URL、API Key、模型名怎么填，Token、图像和视频生成怎么计费，失败请求和生成失败时怎么判断扣费风险。先检测再小额测试。";

// Dynamically read pages from pages.ts
const pagesContent = readFileSync(join(rootDir, 'src', 'data', 'pages.ts'), 'utf-8');
const slugTitlePairs = [...pagesContent.matchAll(/slug: "([^"]+)"[\s\S]*?title: "([^"]+)"/g)]
  .map(m => ({ slug: m[1], title: m[2] }));

const lines = [
  `# ${site.name} / ${site.nameEn}`,
  `Site: ${site.baseUrl}`,
  `Description: ${siteDescription}`,
  ``,
  `## Pages`,
  ...slugTitlePairs.map(p =>
    `- ${p.title}: ${p.slug === "" ? site.baseUrl + "/" : site.baseUrl + "/" + p.slug + "/"}`
  ),
  ``,
  `## External Links`,
  `- AI API Doctor (检测): https://aiapidoctor.com/`,
  `- LinkAI 主页: https://link-ai.cc/`,
  `- LinkAI 注册: https://api1.link-ai.cc/register`,
  `- LinkAI 登录: https://api1.link-ai.cc/login`,
  `- LinkAI 模型价格: https://api1.link-ai.cc/pricing`,
].join('\n');

const outPath = join(rootDir, 'public', 'llms.txt');
writeFileSync(outPath, lines, 'utf-8');
console.log(`llms.txt generated: ${outPath} (${slugTitlePairs.length} pages)`);
