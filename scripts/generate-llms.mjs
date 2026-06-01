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

const siteDescription = "AI API 雷达是一个中文 AI API 配置与风险分诊站，覆盖 Claude Code 中转、OpenAI-compatible Base URL、MCP 配置安全、模型 API 入门、usage/扣费透明和 API 中转风险。帮助国内开发者理解 Claude Code 中转、Base URL、MCP、/v1/models、usage 扣费透明和 API 中转安全，先检测再小额测试。";

// Page slugs and titles
const pageInfo = [
  { slug: "", title: "首页" },
  { slug: "claude-code-zhongzhuan", title: "Claude Code 中转怎么配置？" },
  { slug: "openai-api-base-url", title: "OpenAI API Base URL 是什么？" },
  { slug: "api-zhongzhuan-safe", title: "API 中转站安全吗？" },
  { slug: "mcp-shi-shenme", title: "MCP 是什么？" },
  { slug: "cursor-mcp", title: "Cursor MCP 配置教程" },
  { slug: "claude-desktop-mcp", title: "Claude Desktop MCP 配置教程" },
  { slug: "cline-mcp", title: "Cline MCP 配置教程" },
  { slug: "chatgpt-mcp-server", title: "ChatGPT MCP Server 配置教程" },
  { slug: "mcp-api-key-anquan", title: "MCP API Key 安全配置指南" },
  { slug: "mcp-security", title: "MCP 安全指南" },
  { slug: "claude-code-api-key", title: "Claude Code API Key 配置指南" },
  { slug: "claude-code-base-url", title: "Claude Code Base URL 配置教程" },
  { slug: "claude-code-guonei", title: "Claude Code 国内使用指南" },
  { slug: "claude-code-timeout-503-524", title: "Claude Code Timeout / 503 / 524 错误排查" },
  { slug: "openai-compatible-api", title: "OpenAI-compatible API 是什么？" },
  { slug: "v1-models", title: "/v1/models 能检查什么？" },
  { slug: "tongyi-qianwen-api", title: "通义千问 API 接入指南" },
  { slug: "kimi-api", title: "Kimi API 接入指南" },
  { slug: "doubao-api", title: "豆包 API 接入指南" },
  { slug: "openai-api-usage", title: "OpenAI API Usage 怎么看？" },
];

const lines = [
  `# ${site.name} / ${site.nameEn}`,
  `Site: ${site.baseUrl}`,
  `Description: ${siteDescription}`,
  ``,
  `## Pages`,
  ...pageInfo.map(p => `- ${p.title}: ${p.slug === "" ? site.baseUrl + "/" : site.baseUrl + "/" + p.slug + "/"}`),
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
console.log(`llms.txt generated: ${outPath} (${pageInfo.length} pages)`);
