export type PageStatus = "full" | "scaffold";

export type PageCluster =
  | "mcp"
  | "claude-code"
  | "base-url"
  | "model-api"
  | "usage-risk";

export type FAQItem = {
  question: string;
  answer: string;
};

export type RelatedLink = {
  title: string;
  url: string;
  reason: string;
};

export type PageData = {
  slug: string;
  url: string;
  cluster: PageCluster;
  targetKeyword: string;
  title: string;
  metaDescription: string;
  h1: string;
  pageType: string;
  status: PageStatus;
  quickAnswer: string;
  audience: string[];
  conceptExplanation: string;
  setupOrCheckSteps: string[];
  commonErrors: string[];
  riskNotes: string[];
  whenToUseAIApiDoctor: string;
  whenToUseLinkAI: string;
  aiSummary: string;
  faq: FAQItem[];
  relatedLinks: RelatedLink[];
  primaryCTA: {
    label: string;
    url: string;
  };
  secondaryCTA: {
    label: string;
    url: string;
  };
  pricingCTA: {
    label: string;
    url: string;
  };
  canonical: string;
};

export const pages: PageData[] = [
  // ========================================
  // 3 FULL PAGES
  // ========================================

  // 1. claude-code-zhongzhuan
  {
    slug: "claude-code-zhongzhuan",
    url: "/claude-code-zhongzhuan/",
    cluster: "claude-code",
    targetKeyword: "claude code 中转",
    title: "Claude Code 中转怎么用？Base URL、API Key 与模型权限检查",
    metaDescription:
      "面向国内 Claude Code 用户，解释中转配置、Base URL、API Key、模型名和权限检查，说明 timeout、503、524 的常见原因，并建议先检测再小额测试。",
    h1: "Claude Code 中转怎么配置？",
    pageType: "guide",
    status: "full",
    quickAnswer:
      "Claude Code 中转是指在国内使用 Claude Code 时，通过第三方 API 中转服务来访问 Claude 的 API 端口。配置时需要填入 Base URL、API Key 和模型名，建议先检测可用性再小额测试。",
    audience: [
      "国内 Claude Code 用户",
      "遇到 503/524/timeout 错误的用户",
      "想在国内使用 Claude Code 但不知道怎么配置中转的开发者",
    ],
    conceptExplanation:
      "Claude Code 是 Anthropic 官方推出的 AI 编程助手，支持命令行交互和代码编辑。国内用户由于网络限制，无法直连官方 API 接口，需要借助第三方中转服务来访问。\n\n中转服务的原理是：你的请求先发送到第三方中转服务器（如 LinkAI），再由中转服务器转发给 Claude 官方 API，最后把响应返回给你。这个过程中，中转服务充当了一个「代理」的角色。\n\n配置 Claude Code 中转需要三个核心信息：Base URL（中转服务的地址）、API Key（你的中转账号密钥）、模型名（你要使用的具体模型，如 claude-sonnet-4-20250514）。",
    setupOrCheckSteps: [
      "获取中转服务的 Base URL（如 LinkAI 提供的接口地址）",
      "在中转服务注册账号，获取 API Key",
      "打开 Claude Code 配置文件，填入 Base URL 和 API Key",
      "确认模型名称：在 /v1/models 中查看该中转服务支持的模型列表",
      "用小额任务测试基本连通性（不要上来就跑长任务）",
      "检查 timeout 设置是否合理，避免因网络延迟导致中断",
      "查看 LinkAI 模型价格，了解各模型的单价后再决定测试范围",
    ],
    commonErrors: [
      "Base URL 末尾多加了 /v1 导致路径重复",
      "API Key 填错或包含多余空格",
      "模型名称与中转服务支持的名称不匹配",
      "timeout 设置过短，网络延迟时被强制中断",
      "中转服务本身出现 503/524 错误",
    ],
    riskNotes: [
      "第三方工具 UI 可能变化，以当前版本为准。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
      "不要把长任务直接作为第一次测试。",
      "先查看模型价格和可见模型，再决定是否扩大使用。",
    ],
    whenToUseAIApiDoctor:
      "当你不确定 Base URL、API Key、模型名称是否正确配置时，先用 AI API Doctor 检测中转服务的连通性和模型可见性，避免无效请求消耗预算。",
    whenToUseLinkAI:
      "确认配置可用后，在 LinkAI 注册账号，用小额预算（如 $2 以内）测试实际任务，观察 usage 记录是否符合预期，再考虑扩大使用。",
    aiSummary:
      "Claude Code 中转配置的核心是正确填写 Base URL、API Key 和模型名。国内用户需借助第三方中转服务才能访问 Claude API，建议先用 AI API Doctor 检测配置是否正确，再用小额任务验证实际可用性。",
    faq: [
      {
        question: "Claude Code 中转一定需要 Base URL 吗？",
        answer:
          "是的，国内用户如果想通过第三方中转服务访问 Claude API，就必须配置 Base URL。Base URL 告诉 Claude Code 客户端把请求发送到哪里。",
      },
      {
        question: "Claude Code timeout 是不是中转站一定有问题？",
        answer:
          "不一定。timeout 可能来自中转站处理慢、网络不稳定、请求体过大、模型响应过长等多个原因。建议先降低任务复杂度测试，同时检查 timeout 参数是否设置合理。",
      },
      {
        question: "model not found 应该先查哪里？",
        answer:
          "先查中转服务支持的模型列表（通过 /v1/models 端点确认），再确认填写的模型名是否完全一致（包括版本号）。不同中转服务可能用不同的模型别名。",
      },
      {
        question: "第一次测试应该跑长任务吗？",
        answer:
          "不应该。第一次测试建议用小额、简单的任务验证连通性，确认 API 能正常响应后再逐步扩大任务规模，避免一次性消耗大量预算。",
      },
      {
        question: "什么时候应该看 LinkAI 模型价格？",
        answer:
          "在你确认了要测试的模型名称之后，可以先查看 LinkAI 模型价格，了解各模型单价和可用模型列表，再决定用哪个模型进行小额测试。",
      },
    ],
    relatedLinks: [
      {
        title: "OpenAI API Base URL 是什么？",
        url: "/openai-api-base-url/",
        reason: "理解 Base URL 的基本概念是配置中转的第一步",
      },
      {
        title: "/v1/models 能检查什么？",
        url: "/v1-models/",
        reason: "用 /v1/models 确认中转服务支持的模型列表",
      },
      {
        title: "API 中转站安全吗？",
        url: "/api-zhongzhuan-safe/",
        reason: "了解 API 中转的潜在风险再做选择",
      },
      {
        title: "Claude Code Timeout / 503 / 524 怎么办？",
        url: "/claude-code-timeout-503-524/",
        reason: "遇到报错时的具体排查步骤",
      },
    ],
    primaryCTA: {
      label: "去 AI API Doctor 检测 API 配置",
      url: "https://aiapidoctor.com/",
    },
    secondaryCTA: {
      label: "注册 LinkAI，领取 $2 免费福利",
      url: "https://api1.link-ai.cc/register",
    },
    pricingCTA: {
      label: "查看 LinkAI 模型价格",
      url: "https://api1.link-ai.cc/pricing",
    },
    canonical: "https://aiapiradar.com/claude-code-zhongzhuan/",
  },

  // 2. openai-api-base-url
  {
    slug: "openai-api-base-url",
    url: "/openai-api-base-url/",
    cluster: "base-url",
    targetKeyword: "openai api base url",
    title: "OpenAI API Base URL 是什么？/v1、endpoint 与客户端配置说明",
    metaDescription:
      "用中文解释 OpenAI API Base URL、/v1、endpoint 和代理地址的区别，帮助 Cursor、Cline、Claude Code 用户正确填写配置并先检测模型权限。",
    h1: "OpenAI API Base URL 是什么？",
    pageType: "guide",
    status: "full",
    quickAnswer:
      "OpenAI API Base URL 是 API 请求的目标地址前缀，指向服务提供商的 API 入口。配置时需要注意是否需要加 /v1，以及 model 参数的正确填写方式。",
    audience: [
      "配置 Claude Code / Cursor / Cline 的开发者",
      "使用 API 中转服务的用户",
      "想理解 Base URL 和 endpoint 区别的人",
    ],
    conceptExplanation:
      "Base URL（基础 URL）是 API 请求的目标地址前缀。在 OpenAI 以及 OpenAI-compatible API 中，所有请求都发往一个固定的域名地址，后面接具体的接口路径（如 /v1/chat/completions）。\n\n官方 OpenAI 的 Base URL 是 https://api.openai.com/v1。当你使用第三方中转服务时，中转商会提供另一个 Base URL 给你，比如 https://api.example.com/v1。\n\nendpoint（端点）是 Base URL 后面的具体接口路径，如 /v1/models、/v1/chat/completions。有些客户端要求只填 Base URL（不含 /v1），有些要求填完整路径（含 /v1），需要看清楚具体工具的要求。\n\nmodel id 和 model name 也需要区分：model id 是 API 请求时用的标识符（如 gpt-4o），model name 是人类可读的名称。不同服务商的模型 id 可能不同。",
    setupOrCheckSteps: [
      "确认你的服务提供商（官方或中转）提供的 Base URL",
      "确认是否需要额外添加 /v1 路径（看工具要求）",
      "用 /v1/models 端点检查当前服务支持哪些模型",
      "在客户端填写时注意：Base URL 末尾是否需要斜杠",
      "model 字段填模型 id（如 gpt-4o），不要填模型名称",
      "确认请求体格式是否与你的服务兼容（OpenAI-compatible vs 官方格式）",
      "先查看 LinkAI 模型价格，确认要用的模型再配置",
    ],
    commonErrors: [
      "Base URL 末尾多加了 /v1 导致路径重复变成 /v1/v1",
      "混淆了 model id 和 model name",
      "中转服务的 endpoint 与客户端要求的格式不匹配",
      "填了错误的端口号或协议（http vs https）",
    ],
    riskNotes: [
      "用 /v1/models 确认模型是否可见。",
      "第三方工具 UI 可能变化，以当前版本为准。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
    ],
    whenToUseAIApiDoctor:
      "在配置 Base URL 后，用 AI API Doctor 检测该地址是否可访问、/v1/models 是否返回正确数据、模型列表是否包含你要用的模型。",
    whenToUseLinkAI:
      "在确认 Base URL 配置正确后，可以注册 LinkAI 账号，查看支持的模型列表和单价，用小额任务测试 Base URL 的实际连通性。",
    aiSummary:
      "OpenAI API Base URL 是 API 请求的目标地址前缀，需要注意是否加 /v1、model 字段填模型 id、endpoint 格式是否匹配。配置前建议用 /v1/models 确认模型可见性，配置后建议先小额测试。",
    faq: [
      {
        question: "Base URL 和 endpoint 是一回事吗？",
        answer:
          "不是。Base URL 是 API 的域名地址前缀，endpoint 是 Base URL 后面具体的接口路径（如 /v1/models）。Base URL 指向服务入口，endpoint 指向具体功能。",
      },
      {
        question: "Base URL 一定要加 /v1 吗？",
        answer:
          "取决于具体工具。有些客户端要求填 Base URL 不含 /v1（如 Claude Code），让客户端自动追加路径；有些要求填完整路径含 /v1。需要仔细看客户端的填写说明。",
      },
      {
        question: "/v1/models 返回空代表什么？",
        answer:
          "可能代表 Base URL 填写错误、API Key 无权限、该中转服务不支持 /v1/models 端点，或者网络问题。先检查 Base URL 和 API Key 是否正确。",
      },
      {
        question: "OpenAI-compatible API 等于官方 OpenAI API 吗？",
        answer:
          "不完全等于。OpenAI-compatible API 是遵循 OpenAI API 格式的中转或代理服务，但背后的模型可能不是 OpenAI 官方模型（如换成 Claude、Qwen 等）。接口格式兼容，但服务商不同。",
      },
      {
        question: "什么时候应该查看模型价格？",
        answer:
          "在你确认了要用的模型 id 后，可以先查看 LinkAI 模型价格，了解该模型的单价和是否有免费额度，再决定是否注册并进行小额测试。",
      },
    ],
    relatedLinks: [
      {
        title: "OpenAI-compatible API 是什么？",
        url: "/openai-compatible-api/",
        reason: "深入理解 OpenAI-compatible API 的工作原理",
      },
      {
        title: "/v1/models 能检查什么？",
        url: "/v1-models/",
        reason: "用 /v1/models 确认模型可见性和权限",
      },
      {
        title: "Claude Code 中转怎么配置？",
        url: "/claude-code-zhongzhuan/",
        reason: "Base URL 配置的实际应用场景",
      },
      {
        title: "API 中转站安全吗？",
        url: "/api-zhongzhuan-safe/",
        reason: "理解中转站的风险和安全注意事项",
      },
    ],
    primaryCTA: {
      label: "去 AI API Doctor 检测 API 配置",
      url: "https://aiapidoctor.com/",
    },
    secondaryCTA: {
      label: "注册 LinkAI，领取 $2 免费福利",
      url: "https://api1.link-ai.cc/register",
    },
    pricingCTA: {
      label: "查看 LinkAI 模型价格",
      url: "https://api1.link-ai.cc/pricing",
    },
    canonical: "https://aiapiradar.com/openai-api-base-url/",
  },

  // 3. api-zhongzhuan-safe
  {
    slug: "api-zhongzhuan-safe",
    url: "/api-zhongzhuan-safe/",
    cluster: "usage-risk",
    targetKeyword: "API 中转站安全吗",
    title: "API 中转站安全吗？Base URL、模型权限、扣费透明和风险检查清单",
    metaDescription:
      "面向准备使用 API 中转站的用户，解释 Base URL、API Key、模型权限、扣费透明、日志记录和稳定性风险，并建议先检测再小额测试。",
    h1: "API 中转站安全吗？先看这份检查清单",
    pageType: "guide",
    status: "full",
    quickAnswer:
      "API 中转站的安全性需要从 Base URL 真实性、API Key 权限、扣费透明度、模型可用性等多个维度评估，没有万无一失的方案。建议先用 AI API Doctor 检测，再用小额任务验证。",
    audience: [
      "准备使用 API 中转服务的开发者",
      "关心 API Key 安全的用户",
      "想了解扣费透明度的用户",
    ],
    conceptExplanation:
      "API 中转站（或 API 代理/网关）是第三方服务商提供的服务，它在你的请求和目标 API（如 OpenAI、Claude）之间充当中间层。\n\n使用中转站时，你的请求流程是：客户端 → 中转站 → 官方 API → 中转站 → 客户端。中转站可以看到你的请求内容和响应内容。\n\n风险主要来自四个方面：\n1. **Base URL 真实性**：中转站可能提供假的或被篡改的地址；\n2. **API Key 安全**：你的中转站账号密钥可能被滥用或泄露；\n3. **模型权限**：中转站声称支持的模型可能并未真正可用；\n4. **扣费透明**：usage 记录可能不准确，或存在隐藏费用。\n\n中转站不是洪水猛兽，但也不是无风险的方案。在选择和使用时，需要有基本的风险意识。",
    setupOrCheckSteps: [
      "确认中转站的 Base URL 来源是否可靠（官方公告、口碑推荐）",
      "用 AI API Doctor 检测该 Base URL 是否可访问、是否返回有效模型列表",
      "检查中转站的隐私政策和日志记录政策",
      "用小额预算测试：先跑一个很小的任务，观察 usage 记录",
      "对比 request_id、usage 记录和实际扣费是否一致",
      "检查 completion_tokens 和 raw quota 是否符合预期",
      "测试 stream 模式是否正常工作（stream 中断可能暗示问题）",
      "查看 LinkAI 模型价格，了解正规渠道的定价作为参考",
    ],
    commonErrors: [
      "以为 API Key 只用于认证不会泄露数据，忽略中转站可见请求内容",
      "只关注价格，忽略模型权限和扣费透明度",
      "用长任务作为第一次测试，一出问题就损失大量预算",
      "没有记录 request_id，出现问题时无法核对",
    ],
    riskNotes: [
      "结合 request_id、usage、raw quota、completion_tokens、stream 状态和后台记录综合判断。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
      "先小额测试。",
      "第三方工具 UI 可能变化，以当前版本为准。",
    ],
    whenToUseAIApiDoctor:
      "在选择中转站之前或之后，用 AI API Doctor 检测 Base URL 的连通性、/v1/models 返回的模型列表、以及基本的 API 响应是否符合预期。",
    whenToUseLinkAI:
      "如果对某个中转站的安全性存疑，可以考虑使用 LinkAI 作为参照：查看 LinkAI 的模型价格、支持的模型列表，以及平台的扣费透明度，作为对比基准。",
    aiSummary:
      "API 中转站的安全风险是多维度的：Base URL 真实性、API Key 权限、模型可用性、扣费透明度都需要检查。建议先用 AI API Doctor 检测配置，再小额测试验证实际行为，结合 usage 记录综合判断。",
    faq: [
      {
        question: "API 中转站一定不安全吗？",
        answer:
          "不一定。中转站本身不是原罪，但需要评估具体服务商的可靠性、透明度和技术能力。有些中转站有良好的隐私保护，有些则可能存在数据滥用风险。",
      },
      {
        question: "怎么判断模型权限是否真的可用？",
        answer:
          "最直接的方法是调用 /v1/models 端点，查看返回的模型列表是否包含你要用的模型。同时用小额请求测试，看是否能得到预期的响应。",
      },
      {
        question: "请求失败但 usage 有记录一定是异常扣费吗？",
        answer:
          "不一定。不同 API 服务商对失败请求的计费规则不同。有些服务会对失败的请求计费，有些不会。需要结合 request_id、usage、raw quota、completion_tokens、stream 状态和后台记录综合判断。",
      },
      {
        question: "AI API Doctor 能替代人工判断吗？",
        answer:
          "不能。AI API Doctor 的检测结果只用于辅助判断，帮助你了解 API 配置是否正确、模型是否可见等基础信息，但不能替代对服务商可靠性、隐私政策和扣费透明度的综合评估。",
      },
      {
        question: "什么时候应该先看模型价格？",
        answer:
          "在你决定使用某个中转服务之前，可以先查看 LinkAI 模型价格，了解同类模型的正规市场价格作为参考，防止被过度溢价，同时评估自己的使用成本。",
      },
    ],
    relatedLinks: [
      {
        title: "OpenAI API Base URL 是什么？",
        url: "/openai-api-base-url/",
        reason: "理解 Base URL 是评估中转站的第一步",
      },
      {
        title: "/v1/models 能检查什么？",
        url: "/v1-models/",
        reason: "用 /v1/models 验证模型可用性",
      },
      {
        title: "OpenAI API Usage 怎么看？",
        url: "/openai-api-usage/",
        reason: "理解 usage 记录是判断扣费透明度的关键",
      },
      {
        title: "MCP 安全吗？",
        url: "/mcp-security/",
        reason: "MCP 配置也有 API Key 安全问题",
      },
    ],
    primaryCTA: {
      label: "去 AI API Doctor 检测 API 配置",
      url: "https://aiapidoctor.com/",
    },
    secondaryCTA: {
      label: "注册 LinkAI，领取 $2 免费福利",
      url: "https://api1.link-ai.cc/register",
    },
    pricingCTA: {
      label: "查看 LinkAI 模型价格",
      url: "https://api1.link-ai.cc/pricing",
    },
    canonical: "https://aiapiradar.com/api-zhongzhuan-safe/",
  },

  // ========================================
  // 17 SCAFFOLD PAGES
  // ========================================

  // 4. mcp-shi-shenme
  {
    slug: "mcp-shi-shenme",
    url: "/mcp-shi-shenme/",
    cluster: "mcp",
    targetKeyword: "MCP 是什么",
    title: "MCP 是什么？模型上下文协议简介与常见配置场景",
    metaDescription:
      "用中文介绍 MCP（模型上下文协议）是什么，适合谁用，以及在 Cursor、Claude Desktop、Cline 等工具中的配置基础。",
    h1: "MCP 是什么？",
    pageType: "guide",
    status: "scaffold",
    quickAnswer:
      "MCP（Model Context Protocol，模型上下文协议）是一种让 AI 模型与外部工具、数据源交互的标准协议。配置 MCP 需要注意 API Key 权限、环境变量安全和服务器来源可靠性。",
    audience: [
      "想了解 MCP 是什么的开发者",
      "想在 Cursor 或 Claude Desktop 中配置 MCP 的用户",
      "关心 MCP 安全风险的开发者",
    ],
    conceptExplanation:
      "MCP（Model Context Protocol，模型上下文协议）是由 Anthropic 提出的开放协议，旨在让 AI 模型能够以标准化的方式与外部工具、API、数据源交互。\n\n简单来说，MCP 相当于 AI 模型的「USB 接口」——有了 MCP，AI 模型可以通过统一的协议调用各种外部工具，而不需要为每个工具单独集成。\n\nMCP 的核心概念包括：MCP Server（提供具体功能的服务器）、MCP Client（连接并调用 server 的客户端，如 Claude Desktop）、MCP API Key（调用 server 时的身份认证凭证）。",
    setupOrCheckSteps: [
      "确认要配置的 MCP Server 来源是否可靠",
      "查看 MCP Server 需要的 API Key 类型和权限范围",
      "在 Claude Desktop 或 Cursor 中配置 MCP Server 地址",
      "设置必要的环境变量（如 API Key）",
      "测试 MCP 工具调用是否正常返回",
      "检查 MCP 是否有日志记录，以及日志记录的范围",
      "确认不需要给 MCP 过多权限，只提供必要的凭证",
    ],
    commonErrors: [
      "给 MCP Server 配置了权限过大的 API Key",
      "使用了来源不明的 MCP Server",
      "没有检查 MCP Server 是否支持目标工具",
    ],
    riskNotes: [
      "MCP Server 可见你的请求内容和返回数据。",
      "只给必要的权限，不要用主 API Key 配置 MCP。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
    ],
    whenToUseAIApiDoctor:
      "如果 MCP 出现连接失败或工具调用异常，可以用 AI API Doctor 检测基础 API 配置是否正确。",
    whenToUseLinkAI:
      "在 LinkAI 查看支持的模型和 API 配置方式，结合 MCP 的工具调用需求选择合适的模型。",
    aiSummary:
      "MCP 是让 AI 模型与外部工具交互的协议标准。配置 MCP 时需要注意 API Key 权限、环境变量安全和服务器来源可靠性。",
    faq: [
      {
        question: "MCP 和普通 API 调用有什么区别？",
        answer:
          "普通 API 调用是程序员手动写的代码调用；MCP 则是一种协议标准，让 AI 模型本身能够动态发现和调用工具，无需预先硬编码。",
      },
      {
        question: "MCP API Key 有什么风险？",
        answer:
          "如果 MCP Server 被恶意篡改或来源不可靠，你的 API Key 可能被记录或滥用。建议使用单独的、权限受限的 API Key 配置 MCP。",
      },
    ],
    relatedLinks: [
      { title: "Cursor MCP 配置", url: "/cursor-mcp/", reason: "在 Cursor 中配置 MCP 的具体步骤" },
      { title: "Claude Desktop MCP 配置", url: "/claude-desktop-mcp/", reason: "Claude Desktop 的 MCP 配置方式" },
      { title: "MCP 安全吗？", url: "/mcp-security/", reason: "MCP 的安全风险详解" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/mcp-shi-shenme/",
  },

  // 5. cursor-mcp
  {
    slug: "cursor-mcp",
    url: "/cursor-mcp/",
    cluster: "mcp",
    targetKeyword: "Cursor MCP",
    title: "Cursor MCP 配置教程：基础设置与安全注意事项",
    metaDescription:
      "介绍如何在 Cursor 中配置 MCP（模型上下文协议），包括 API Key 设置、server 地址配置和安全注意事项。",
    h1: "Cursor MCP 配置教程",
    pageType: "guide",
    status: "scaffold",
    quickAnswer:
      "在 Cursor 中配置 MCP 需要编辑配置文件，填入 MCP Server 地址和 API Key。建议检查 server 来源可靠性，不要用主 API Key，用完记得审计 usage 记录。",
    audience: [
      "想在 Cursor 中配置 MCP 的开发者",
      "使用 Cursor 作为主力编辑器的 AI 辅助编程用户",
    ],
    conceptExplanation:
      "Cursor 是一个内置 AI 功能的代码编辑器，支持通过 MCP 协议接入第三方工具和服务。在 Cursor 中配置 MCP 后，AI 助手可以使用 MCP 提供的工具来完成代码生成、文件操作、API 调用等任务。\n\nCursor 的 MCP 配置通过 JSON 配置文件实现，需要指定 server 的 command（启动命令）和 args（参数），以及环境变量中的 API Key。",
    setupOrCheckSteps: [
      "确认要使用的 MCP Server 的官方文档地址",
      "在 Cursor 设置中找到 MCP 配置入口",
      "编辑 MCP 配置文件，添加 server 的 command 和 args",
      "在环境变量中设置 API Key（不要直接写在配置里）",
      "保存配置并重启 Cursor 使其生效",
      "测试 MCP 工具是否能正常调用",
      "定期检查 usage 记录，确认没有异常调用",
    ],
    commonErrors: [
      "API Key 直接写在配置文件中导致泄露",
      "使用了未经审查的第三方 MCP Server",
      "没有给 MCP Server 分配最小权限的 API Key",
    ],
    riskNotes: [
      "不要用主账号 API Key 配置 MCP。",
      "只使用来源可信的 MCP Server。",
      "定期检查 usage 记录。",
    ],
    whenToUseAIApiDoctor:
      "如果 Cursor 的 MCP 工具调用失败，可以用 AI API Doctor 检测底层 API 配置是否正确。",
    whenToUseLinkAI:
      "在 LinkAI 查看支持的模型和 API 配置，选择适合与 MCP 工具配合使用的模型。",
    aiSummary: "Cursor MCP 配置需要谨慎处理 API Key 和 server 来源，建议使用权限受限的 Key 并定期审计 usage。",
    faq: [
      { question: "Cursor MCP 和 Claude Desktop MCP 有什么区别？", answer: "两者都支持 MCP 协议，但配置方式和界面不同。Cursor 通过 JSON 配置文件管理 MCP，Claude Desktop 有自己的配置界面。" },
      { question: "Cursor MCP 会泄露代码吗？", answer: "MCP Server 能够接收和处理你的请求内容，包括代码。选择 MCP Server 时需要确认其隐私政策和数据处理方式。" },
    ],
    relatedLinks: [
      { title: "MCP 是什么？", url: "/mcp-shi-shenme/", reason: "理解 MCP 的基本概念" },
      { title: "Claude Desktop MCP 配置", url: "/claude-desktop-mcp/", reason: "另一个 MCP 配置场景" },
      { title: "MCP 安全吗？", url: "/mcp-security/", reason: "MCP 安全风险详解" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/cursor-mcp/",
  },

  // 6. claude-desktop-mcp
  {
    slug: "claude-desktop-mcp",
    url: "/claude-desktop-mcp/",
    cluster: "mcp",
    targetKeyword: "Claude Desktop MCP",
    title: "Claude Desktop MCP 配置教程：连接第三方工具",
    metaDescription:
      "介绍如何在 Claude Desktop 中配置 MCP（模型上下文协议），包括 server 配置、API Key 设置和安全检查。",
    h1: "Claude Desktop MCP 配置教程",
    pageType: "guide",
    status: "scaffold",
    quickAnswer:
      "Claude Desktop 通过 JSON 配置文件添加 MCP Server。需要配置 server 的 command、args 和环境变量，确保 API Key 安全且权限最小化。",
    audience: ["Claude Desktop 用户", "想扩展 Claude 能力的用户"],
    conceptExplanation:
      "Claude Desktop 是 Anthropic 官方的桌面客户端，支持通过 MCP 协议接入外部工具和服务。配置 MCP 后，Claude 可以调用这些工具来辅助回答问题、完成任务。\n\nClaude Desktop 的 MCP 配置存储在 JSON 文件中，通过 mcpServers 字段定义每个 MCP Server 的启动方式和凭证。",
    setupOrCheckSteps: [
      "找到 Claude Desktop 的 MCP 配置文件路径",
      "创建或编辑 mcpServers 配置节点",
      "指定 MCP Server 的 command（命令）和 args（参数）",
      "在 env 字段中安全地设置 API Key（通过环境变量引用）",
      "保存配置并重启 Claude Desktop",
      "测试 MCP 工具是否出现在工具列表中",
      "验证工具调用结果是否符合预期",
    ],
    commonErrors: [
      "API Key 直接明文写在配置中",
      "command 路径填写错误导致 server 无法启动",
      "args 中的 URL 末尾多了斜杠导致连接失败",
    ],
    riskNotes: [
      "Claude Desktop 的 MCP 配置可见 API Key 内容，需要确保文件权限安全。",
      "使用最小权限的 API Key。",
      "不要安装来源不明的 MCP Server。",
    ],
    whenToUseAIApiDoctor:
      "Claude Desktop MCP 调用失败时，用 AI API Doctor 检测底层 API 连通性。",
    whenToUseLinkAI:
      "在 LinkAI 查看 API 配置方式和可用模型，作为 MCP 工具后端的选择参考。",
    aiSummary: "Claude Desktop MCP 配置通过 JSON 文件实现，需要注意 API Key 安全、server 路径正确和权限最小化。",
    faq: [
      { question: "Claude Desktop MCP 配置文件在哪里？", answer: "macOS 在 ~/Library/Application Support/Claude/claude_desktop_config.json，Windows 在 %APPDATA%/Claude/claude_desktop_config.json。" },
      { question: "MCP Server 启动失败怎么办？", answer: "检查 command 路径是否正确、args 中的 URL 是否正确、API Key 是否有效。查看 Claude Desktop 的日志输出获取详细错误信息。" },
    ],
    relatedLinks: [
      { title: "MCP 是什么？", url: "/mcp-shi-shenme/", reason: "MCP 基本概念" },
      { title: "Cursor MCP 配置", url: "/cursor-mcp/", reason: "Cursor 中的 MCP 配置" },
      { title: "MCP 安全吗？", url: "/mcp-security/", reason: "MCP 安全风险" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/claude-desktop-mcp/",
  },

  // 7. cline-mcp
  {
    slug: "cline-mcp",
    url: "/cline-mcp/",
    cluster: "mcp",
    targetKeyword: "Cline MCP",
    title: "Cline MCP 配置教程：扩展 AI 编程能力",
    metaDescription:
      "介绍如何在 Cline（VSCode 插件）中配置 MCP，包括 API Key 设置、server 配置和安全建议。",
    h1: "Cline MCP 配置教程",
    pageType: "guide",
    status: "scaffold",
    quickAnswer:
      "Cline 是 VSCode 中的 AI 编程插件，支持 MCP 协议扩展功能。配置时需要正确填写 server 地址和 API Key，注意凭证安全。",
    audience: ["VSCode + Cline 用户", "想扩展 AI 编程能力的开发者"],
    conceptExplanation:
      "Cline 是一个在 VSCode 中运行的 AI 编程助手插件，支持通过 MCP 协议接入外部工具和数据源。与 Cursor MCP 类似，Cline 也通过配置文件管理 MCP Server。",
    setupOrCheckSteps: [
      "在 Cline 设置中打开 MCP 配置页面",
      "添加新的 MCP Server，填写 name、command 和 args",
      "通过环境变量或安全存储设置 API Key",
      "测试 MCP 工具是否在 Cline 的工具列表中可见",
      "验证工具调用结果",
    ],
    commonErrors: ["API Key 暴露在配置文件中", "server URL 格式错误", "没有重启 Cline 导致配置未生效"],
    riskNotes: ["不要在配置文件中明文存储 API Key", "只使用可信的 MCP Server", "定期审查已安装的 MCP Server"],
    whenToUseAIApiDoctor: "Cline MCP 调用异常时，检测底层 API 配置。",
    whenToUseLinkAI: "在 LinkAI 查看支持的模型和 API 配置。",
    aiSummary: "Cline MCP 配置通过 VSCode 设置界面管理，需要注意 API Key 安全和 server 来源可靠。",
    faq: [
      { question: "Cline MCP 和 Cursor MCP 哪个更好？", answer: "两者都是 AI 编程工具的 MCP 扩展，选择取决于你的编辑器偏好。Cline 运行在 VSCode 中，Cursor 是独立编辑器。" },
      { question: "如何移除有问题的 MCP Server？", answer: "在 Cline MCP 设置中删除对应的 server 配置，然后重启 Cline。" },
    ],
    relatedLinks: [
      { title: "MCP 是什么？", url: "/mcp-shi-shenme/", reason: "MCP 基本概念" },
      { title: "Cursor MCP 配置", url: "/cursor-mcp/", reason: "Cursor 中的 MCP 配置方式" },
      { title: "MCP 安全吗？", url: "/mcp-security/", reason: "MCP 安全风险" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/cline-mcp/",
  },

  // 8. chatgpt-mcp-server
  {
    slug: "chatgpt-mcp-server",
    url: "/chatgpt-mcp-server/",
    cluster: "mcp",
    targetKeyword: "ChatGPT MCP Server",
    title: "ChatGPT MCP Server 配置与使用教程",
    metaDescription:
      "介绍 ChatGPT 的 MCP Server 配置方式，如何连接第三方工具，以及配置时的安全注意事项。",
    h1: "ChatGPT MCP Server 配置教程",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "ChatGPT 通过 MCP 协议支持接入外部工具和服务。配置时需要注意 API Key 安全和 server 来源可靠性。",
    audience: ["ChatGPT Plus/Pro 用户", "想扩展 ChatGPT 能力的用户"],
    conceptExplanation: "OpenAI 为 ChatGPT 提供了 MCP 支持，允许通过 MCP Server 连接外部数据源和工具。配置方式和 Claude Desktop 类似，通过 JSON 配置文件管理 server 连接。",
    setupOrCheckSteps: [
      "确认 ChatGPT 账号已开启 MCP 支持",
      "获取要配置的 MCP Server 的官方地址和文档",
      "在 ChatGPT MCP 配置中填入 server 地址和认证信息",
      "测试工具调用是否正常工作",
    ],
    commonErrors: ["server 地址填写错误", "API Key 权限不足", "ChatGPT 账号不支持 MCP"],
    riskNotes: ["MCP Server 可见你的请求内容", "只使用可信的 server", "检测结果用于辅助判断"],
    whenToUseAIApiDoctor: "MCP 调用失败时检测 API 配置。",
    whenToUseLinkAI: "查看 LinkAI 模型价格，了解替代方案。",
    aiSummary: "ChatGPT MCP 配置允许接入外部工具，但需要注意 server 来源和 API Key 安全。",
    faq: [
      { question: "ChatGPT 所有账号都支持 MCP 吗？", answer: "不是，MCP 支持通常只在 Plus 或 Pro 等付费账号中可用，具体取决于 OpenAI 的政策。" },
      { question: "ChatGPT MCP 和 Claude MCP 有什么区别？", answer: "两者遵循相同的 MCP 协议，但接入的 AI 模型不同（ChatGPT vs Claude），支持的工具生态也不同。" },
    ],
    relatedLinks: [
      { title: "MCP 是什么？", url: "/mcp-shi-shenme/", reason: "MCP 基本概念" },
      { title: "Claude Desktop MCP 配置", url: "/claude-desktop-mcp/", reason: "Claude Desktop 的 MCP 配置" },
      { title: "MCP 安全吗？", url: "/mcp-security/", reason: "MCP 安全风险" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/chatgpt-mcp-server/",
  },

  // 9. mcp-api-key-anquan
  {
    slug: "mcp-api-key-anquan",
    url: "/mcp-api-key-anquan/",
    cluster: "mcp",
    targetKeyword: "MCP API Key 安全",
    title: "MCP API Key 安全配置指南：权限最小化与凭证保护",
    metaDescription:
      "解释 MCP 配置中 API Key 的安全风险，包括权限最小化、环境变量使用、凭证轮换和安全审计建议。",
    h1: "MCP API Key 安全配置指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "配置 MCP 时不要用主 API Key，应该用权限受限的专用 Key，通过环境变量引用，定期审计 usage 记录。",
    audience: ["关心 API Key 安全的开发者", "配置过 MCP 的用户"],
    conceptExplanation: "MCP Server 作为中间层能够看到所有请求内容，因此配置 MCP 时的 API Key 安全尤为重要。如果 API Key 被滥用或泄露，可能造成数据泄露或意外扣费。",
    setupOrCheckSteps: [
      "不要用主账号的主 API Key 配置 MCP",
      "在中转平台创建一个权限受限的专用 API Key",
      "只授权该 Key 访问必要的模型和接口",
      "通过环境变量引用 API Key，不要明文写在配置文件中",
      "定期检查 usage 记录，确认没有异常调用",
      "设置用量告警，超过阈值时自动通知",
      "不再使用时及时删除该 API Key",
    ],
    commonErrors: [
      "主 API Key 直接写在配置文件里",
      "给 MCP 分配的权限过大（如管理员权限）",
      "从不检查 usage 记录",
      "API Key 泄露后没有及时轮换",
    ],
    riskNotes: [
      "MCP Server 可见你的请求内容。",
      "API Key 泄露可能导致未授权使用。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
    ],
    whenToUseAIApiDoctor: "如果怀疑 API Key 已被滥用，先用 AI API Doctor 检测配置是否有异常。",
    whenToUseLinkAI: "在 LinkAI 创建权限受限的专用 API Key 用于 MCP 配置。",
    aiSummary: "MCP API Key 安全的核心是权限最小化、环境变量引用、定期审计和及时轮换。",
    faq: [
      { question: "MCP 一定会看到我的 API Key 吗？", answer: "是的，MCP Server 作为中间层需要用 API Key 去请求上游 API，所以 Server 运营方在技术上有能力看到你的 Key。建议选择信誉良好的 MCP Server。" },
      { question: "如何检查 API Key 是否被滥用？", answer: "定期查看 usage 记录，检查请求来源、调用频率和消耗量是否与你的使用情况匹配。如果有异常，及时禁用该 Key 并重新生成。" },
    ],
    relatedLinks: [
      { title: "MCP 是什么？", url: "/mcp-shi-shenme/", reason: "理解 MCP 基础" },
      { title: "Cursor MCP 配置", url: "/cursor-mcp/", reason: "Cursor 中的实际配置" },
      { title: "API 中转站安全吗？", url: "/api-zhongzhuan-safe/", reason: "中转站的风险评估" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/mcp-api-key-anquan/",
  },

  // 10. mcp-security
  {
    slug: "mcp-security",
    url: "/mcp-security/",
    cluster: "mcp",
    targetKeyword: "MCP 安全",
    title: "MCP 安全指南：Server 来源、数据隐私与风险控制",
    metaDescription:
      "系统介绍 MCP（模型上下文协议）的安全风险，包括 Server 来源验证、数据隐私、API Key 保护和风险控制策略。",
    h1: "MCP 安全指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "MCP 安全的关键是验证 Server 来源、不用主 API Key、通过环境变量引用凭证、定期审计 usage 记录。",
    audience: ["关心 MCP 安全的开发者", "企业安全合规负责人"],
    conceptExplanation: "MCP 的安全风险主要来自三个方面：Server 来源可信度（是否被篡改）、数据可见性（MCP Server 可见所有请求内容）、凭证管理（API Key 是否被滥用）。",
    setupOrCheckSteps: [
      "优先使用官方或有信誉的 MCP Server",
      "检查 Server 的开源状态和代码审计记录",
      "使用权限受限的专用 API Key",
      "通过环境变量传递凭证，不要明文存储",
      "启用用量监控和异常告警",
      "定期审查已安装的 MCP Server 列表",
      "不再需要时及时移除配置",
    ],
    commonErrors: [
      "安装来源不明的 MCP Server",
      "主 API Key 用于 MCP 配置",
      "从不审查 usage 记录",
    ],
    riskNotes: [
      "MCP Server 可见你的请求和响应内容。",
      "选择 MCP Server 时需要评估其可信度。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
    ],
    whenToUseAIApiDoctor: "用 AI API Doctor 检测 MCP 底层 API 配置是否正确和安全。",
    whenToUseLinkAI: "在 LinkAI 查看 API 安全配置和用量管理功能。",
    aiSummary: "MCP 安全需要从 Server 来源、数据可见性和凭证管理三个维度综合评估和控制。",
    faq: [
      { question: "MCP Server 一定会保存我的数据吗？", answer: "技术上 MCP Server 能够接收和处理你的请求内容，是否保存取决于 Server 的实现和隐私政策。使用前应仔细阅读 Server 的隐私政策。" },
      { question: "企业用户使用 MCP 需要注意什么？", answer: "企业用户需要额外关注：Server 是否符合企业安全合规要求、是否有数据处理协议、API Key 管理是否有审计日志。建议与企业安全团队确认后再部署。" },
    ],
    relatedLinks: [
      { title: "MCP 是什么？", url: "/mcp-shi-shenme/", reason: "MCP 基本概念" },
      { title: "MCP API Key 安全", url: "/mcp-api-key-anquan/", reason: "API Key 安全配置" },
      { title: "API 中转站安全吗？", url: "/api-zhongzhuan-safe/", reason: "API 中转风险" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/mcp-security/",
  },

  // 11. claude-code-api-key
  {
    slug: "claude-code-api-key",
    url: "/claude-code-api-key/",
    cluster: "claude-code",
    targetKeyword: "Claude Code API Key",
    title: "Claude Code API Key 配置与安全指南",
    metaDescription:
      "介绍 Claude Code 中 API Key 的配置方式、来源选择、安全注意事项和环境变量管理。",
    h1: "Claude Code API Key 配置指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "Claude Code 需要通过 API Key 认证才能调用 AI 模型。建议通过环境变量设置 API Key，选择可靠的中转服务。",
    audience: ["Claude Code 用户", "配置 API Key 时遇到问题的用户"],
    conceptExplanation: "Claude Code 使用 API Key 进行身份认证。通过中转服务使用时，API Key 是中转平台的账号凭证；直接使用官方 API 时，API Key 是 Anthropic 平台的凭证。",
    setupOrCheckSteps: [
      "在配置 Claude Code 前先选择中转服务或官方 API",
      "获取平台提供的 API Key（不要泄露给他人）",
      "通过环境变量 ANTHROPIC_API_KEY 传入，不要写在配置文件中",
      "确认 API Key 有足够的权限和额度",
      "测试 API Key 是否能正常调用",
      "定期检查 usage 记录",
    ],
    commonErrors: [
      "API Key 通过命令行参数明文传入（可能被 shell 历史记录）",
      "API Key 配置错误或包含多余空格",
      "使用了无效或过期的 API Key",
    ],
    riskNotes: [
      "API Key 不要分享给他人。",
      "通过环境变量引用，不要明文存储。",
      "定期检查 usage 记录。",
    ],
    whenToUseAIApiDoctor: "Claude Code 调用失败时，用 AI API Doctor 检测 API Key 和配置是否正确。",
    whenToUseLinkAI: "在 LinkAI 获取 API Key，注册后领取 $2 免费福利进行测试。",
    aiSummary: "Claude Code API Key 配置通过环境变量实现，核心是凭证安全和来源可靠。",
    faq: [
      { question: "Claude Code 支持哪些 API Key？", answer: "Claude Code 支持 Anthropic 官方 API Key，也支持通过配置 Base URL 使用第三方中转服务的 API Key。" },
      { question: "API Key 泄露了怎么办？", answer: "立即在中转平台或官方平台禁用该 API Key，重新生成一个新的。然后检查 usage 记录，确认是否被滥用。" },
    ],
    relatedLinks: [
      { title: "Claude Code 中转怎么配置？", url: "/claude-code-zhongzhuan/", reason: "中转配置的完整流程" },
      { title: "Claude Code Base URL 配置", url: "/claude-code-base-url/", reason: "Base URL 配置方式" },
      { title: "Claude Code 国内使用", url: "/claude-code-guonei/", reason: "国内使用的特殊考虑" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/claude-code-api-key/",
  },

  // 12. claude-code-base-url
  {
    slug: "claude-code-base-url",
    url: "/claude-code-base-url/",
    cluster: "claude-code",
    targetKeyword: "Claude Code Base URL",
    title: "Claude Code Base URL 配置教程：API 地址填写指南",
    metaDescription:
      "介绍 Claude Code 中 Base URL 的配置方式，如何填写中转服务的 API 地址，以及常见填写错误和排查方法。",
    h1: "Claude Code Base URL 配置教程",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "Claude Code 配置 Base URL 时需要填写中转服务的 API 地址前缀，注意是否需要加 /v1、末尾斜杠是否需要，以及 model 字段的正确填写。",
    audience: ["Claude Code 用户", "配置 Base URL 时遇到问题的用户"],
    conceptExplanation: "Claude Code 通过 Base URL 确定 API 请求的目标地址。国内用户通过中转服务使用时，需要填写中转服务提供的 Base URL，让请求先发往中转站再转发给官方 API。",
    setupOrCheckSteps: [
      "从可靠的中转服务获取 Base URL",
      "确认 Claude Code 要求填写的格式（是否需要 /v1）",
      "在 Claude Code 配置文件中正确填写 Base URL",
      "确认 model 字段填写的是模型 id（如 claude-sonnet-4-20250514）",
      "用小额请求测试连通性",
      "查看 LinkAI 模型价格，确认支持的模型",
    ],
    commonErrors: [
      "Base URL 末尾多加了 /v1 导致路径重复",
      "model 字段填写了模型名称而非模型 id",
      "Base URL 使用了 http 而非 https",
      "中转服务本身不可用（先检查中转站状态）",
    ],
    riskNotes: [
      "用 /v1/models 确认模型是否可见。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
      "先小额测试。",
    ],
    whenToUseAIApiDoctor: "Base URL 配置后，用 AI API Doctor 检测该地址是否可访问、/v1/models 是否返回数据。",
    whenToUseLinkAI: "在 LinkAI 获取中转 Base URL，注册后领取 $2 免费福利进行测试。",
    aiSummary: "Claude Code Base URL 配置需要注意格式正确、model id 正确、连通性验证三个关键点。",
    faq: [
      { question: "Claude Code 的 Base URL 和普通 API 客户端一样吗？", answer: "基本相同，都是指向 API 入口的地址。区别在于 Claude Code 可能对格式有额外要求（如不能加 /v1，由客户端自动追加），需要仔细阅读 Claude Code 的配置说明。" },
      { question: "Base URL 配置后没有反应怎么办？", answer: "先确认 Base URL 是否正确，然后用 AI API Doctor 检测该地址是否可访问，检查 /v1/models 是否返回数据，最后确认 API Key 是否有权限。" },
    ],
    relatedLinks: [
      { title: "Claude Code 中转怎么配置？", url: "/claude-code-zhongzhuan/", reason: "完整的中转配置流程" },
      { title: "OpenAI API Base URL 是什么？", url: "/openai-api-base-url/", reason: "理解 Base URL 基础概念" },
      { title: "/v1/models 能检查什么？", url: "/v1-models/", reason: "用 /v1/models 验证配置" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/claude-code-base-url/",
  },

  // 13. claude-code-guonei
  {
    slug: "claude-code-guonei",
    url: "/claude-code-guonei/",
    cluster: "claude-code",
    targetKeyword: "Claude Code 国内使用",
    title: "Claude Code 国内使用指南：中转配置与替代方案",
    metaDescription:
      "面向国内用户，介绍 Claude Code 的中转配置方式、常见问题解决方案，以及中转服务的选择注意事项。",
    h1: "Claude Code 国内使用指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "国内使用 Claude Code 需要通过中转服务配置 Base URL 和 API Key。建议选择可靠的中转平台，先小额测试，确认可用后再扩大使用。",
    audience: ["国内 Claude Code 用户", "无法直连官方 API 的用户"],
    conceptExplanation: "由于网络限制，国内用户无法直连 Anthropic 官方 API，需要通过第三方中转服务访问。中转服务承担了网络代理的角色，帮助国内用户绕过访问限制。",
    setupOrCheckSteps: [
      "选择可靠的中转服务（如 LinkAI）",
      "注册账号并获取 API Key",
      "获取中转服务的 Base URL",
      "在 Claude Code 中配置 Base URL 和 API Key",
      "用小额任务测试连通性",
      "查看 LinkAI 模型价格和可用模型",
      "确认没有问题后再扩大使用",
    ],
    commonErrors: [
      "选择了不稳定或不可靠的中转服务",
      "中转 Base URL 填写格式错误",
      "API Key 权限不足或已过期",
      "中转服务本身出现 503/524 等错误",
    ],
    riskNotes: [
      "中转服务可见你的请求内容。",
      "先小额测试，确认可靠性后再扩大使用。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
    ],
    whenToUseAIApiDoctor: "国内使用 Claude Code 遇到问题时，用 AI API Doctor 检测配置是否正确。",
    whenToUseLinkAI: "在 LinkAI 注册账号，获取中转 Base URL 和 API Key，领取 $2 免费福利进行测试。",
    aiSummary: "国内使用 Claude Code 的核心是通过可靠的中转服务配置 Base URL 和 API Key，先小额测试确认可用性。",
    faq: [
      { question: "国内使用 Claude Code 需要翻墙吗？", answer: "通过中转服务配置后，通常不需要额外翻墙。中转服务充当代理，帮助转发请求到官方 API。" },
      { question: "Claude Code 国内使用稳定吗？", answer: "稳定性取决于中转服务的质量。建议选择有口碑的服务商，先小额测试观察稳定性，再决定是否长期使用。" },
    ],
    relatedLinks: [
      { title: "Claude Code 中转怎么配置？", url: "/claude-code-zhongzhuan/", reason: "完整的中转配置教程" },
      { title: "Claude Code Timeout / 503 / 524", url: "/claude-code-timeout-503-524/", reason: "常见错误排查" },
      { title: "API 中转站安全吗？", url: "/api-zhongzhuan-safe/", reason: "中转服务选择注意事项" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/claude-code-guonei/",
  },

  // 14. claude-code-timeout-503-524
  {
    slug: "claude-code-timeout-503-524",
    url: "/claude-code-timeout-503-524/",
    cluster: "claude-code",
    targetKeyword: "Claude Code timeout 503 524",
    title: "Claude Code Timeout / 503 / 524 错误排查指南",
    metaDescription:
      "详细解释 Claude Code 中 timeout、503 Service Unavailable、524 Origin Timeout 等错误的含义、原因和排查步骤。",
    h1: "Claude Code Timeout / 503 / 524 错误排查",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "Claude Code 的 timeout、503、524 错误可能来自中转站处理慢、网络不稳定、请求体过大或中转站本身有问题。建议先排查配置，再考虑换中转服务。",
    audience: [
      "遇到 Claude Code timeout 或 503/524 错误的用户",
      "Claude Code 中转配置后无法正常使用的用户",
    ],
    conceptExplanation:
      "timeout（超时）、503 Service Unavailable、524 Origin Timeout 是 Claude Code 中常见的错误类型。\n\n- **timeout**：客户端等待响应的时间超过了设定的阈值。可能是网络慢、中转站处理慢、请求体过大、或模型响应过长。\n- **503 Service Unavailable**：中转站返回的错误，表示中转服务暂时不可用，可能是服务器过载、维护或被限流。\n- **524 Origin Timeout**：Cloudflare CDN（很多中转服务使用 Cloudflare）的专用错误，表示 Cloudflare 与源站（实际 API 服务器）通信超时，通常意味着中转服务的上游（官方 API）不可达。",
    setupOrCheckSteps: [
      "确认错误是偶发的还是持续的",
      "检查中转服务的状态页面或公告",
      "降低任务复杂度测试（减少上下文、简化请求）",
      "检查 Claude Code 的 timeout 设置是否合理",
      "测试直接访问 /v1/models 是否正常",
      "用 AI API Doctor 检测 Base URL 和 API Key 是否正确",
      "如果问题持续，考虑更换中转服务",
    ],
    commonErrors: [
      "认为 503/524 一定是中转站的问题，实际可能是本地网络问题",
      "timeout 设置过短，正常请求也被中断",
      "任务太复杂（上下文过长、多次工具调用）导致超时",
    ],
    riskNotes: [
      "503/524 错误期间产生的请求可能仍然计费，需要检查 usage 记录。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
      "先小额测试。",
    ],
    whenToUseAIApiDoctor: "遇到 503/524 错误时，用 AI API Doctor 检测 Base URL 和 API Key 配置是否正确、中转站是否可访问。",
    whenToUseLinkAI: "如果当前中转服务不稳定，可以在 LinkAI 注册账号，用 LinkAI 的服务进行测试。",
    aiSummary: "Claude Code timeout/503/524 错误的排查需要从网络、中转站状态、请求复杂度、timeout 设置等多个角度分析。",
    faq: [
      { question: "503 错误一定是中转站的问题吗？", answer: "不一定。503 表示中转服务返回了「服务不可用」，可能是中转站过载、维护、网络问题，但也可能是你的请求触发了中转站的限流规则。" },
      { question: "524 和 503 有什么区别？", answer: "503 是中转服务本身返回的；524 是 Cloudflare CDN 返回的，表示中转服务（作为 Cloudflare 源站）无法响应。如果看到 524，说明中转站的源站可能挂了。" },
      { question: "timeout 设置多少合适？", answer: "没有固定值，取决于任务复杂度、网络状况和中转服务速度。建议从 120 秒开始测试，如果频繁超时再逐步调整。" },
    ],
    relatedLinks: [
      { title: "Claude Code 中转怎么配置？", url: "/claude-code-zhongzhuan/", reason: "正确的中转配置方式" },
      { title: "Claude Code 国内使用", url: "/claude-code-guonei/", reason: "国内使用的特殊考虑" },
      { title: "API 中转站安全吗？", url: "/api-zhongzhuan-safe/", reason: "选择可靠的中转服务" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/claude-code-timeout-503-524/",
  },

  // 15. openai-compatible-api
  {
    slug: "openai-compatible-api",
    url: "/openai-compatible-api/",
    cluster: "base-url",
    targetKeyword: "OpenAI-compatible API",
    title: "OpenAI-compatible API 是什么？接口兼容性与使用场景",
    metaDescription:
      "解释 OpenAI-compatible API 的含义、与官方 OpenAI API 的区别、如何使用，以及在 Cursor、Cline、Claude Code 中的配置方式。",
    h1: "OpenAI-compatible API 是什么？",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "OpenAI-compatible API 是指遵循 OpenAI API 格式的中转或代理服务。接口格式与官方兼容，但背后的服务商可能不同（如换成 Claude、Qwen 等）。",
    audience: ["使用中转 API 的开发者", "在多客户端配置 API 的用户"],
    conceptExplanation: "OpenAI-compatible API（又称 OpenAI-compatible endpoint）是指那些在请求格式、响应格式上与官方 OpenAI API 完全兼容的 API 服务。它们接受与 OpenAI 官方相同的请求格式（如 /v1/chat/completions），返回相同格式的响应，但背后的模型和提供商可能不同。\n\n这种兼容性使得已有的 OpenAI 客户端代码可以零修改或只需修改 Base URL 就能切换到其他模型。",
    setupOrCheckSteps: [
      "确认要使用的中转服务是否提供 OpenAI-compatible 接口",
      "获取中转服务的 Base URL",
      "在客户端中配置 Base URL（可能需要去掉 /v1，由客户端自动追加）",
      "用 /v1/models 端点检查可用的模型列表",
      "确认 model 字段使用模型 id 而非名称",
      "用小额请求测试接口兼容性",
      "查看 LinkAI 模型价格，了解费用结构",
    ],
    commonErrors: [
      "混淆了 OpenAI-compatible API 和官方 OpenAI API",
      "使用了不支持 OpenAI-compatible 的客户端工具",
      "中转服务的模型名称与 OpenAI 官方模型名不同但格式兼容",
    ],
    riskNotes: [
      "OpenAI-compatible 不等于官方 API，服务质量和数据处理方式可能不同。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
      "先小额测试。",
    ],
    whenToUseAIApiDoctor: "OpenAI-compatible API 配置后，用 AI API Doctor 检测接口是否正常工作、模型是否可见。",
    whenToUseLinkAI: "在 LinkAI 获取 OpenAI-compatible API 的 Base URL，注册后用小额测试验证。",
    aiSummary: "OpenAI-compatible API 是接口格式与官方兼容的中转服务，使用时需要关注背后的服务商可靠性和模型可用性。",
    faq: [
      { question: "OpenAI-compatible API 的模型和官方一样吗？", answer: "不一定。OpenAI-compatible API 只是格式兼容，背后的模型可能是 Claude、Qwen、Kimi 等其他模型。需要在 /v1/models 中确认实际可用的模型。" },
      { question: "Cursor/Cline/Claude Code 都支持 OpenAI-compatible API 吗？", answer: "大多数主流 AI 编程工具都支持 OpenAI-compatible API，因为它们的客户端代码大多基于 OpenAI 的 SDK，只需修改 Base URL 即可切换。" },
    ],
    relatedLinks: [
      { title: "OpenAI API Base URL 是什么？", url: "/openai-api-base-url/", reason: "Base URL 的基础概念" },
      { title: "/v1/models 能检查什么？", url: "/v1-models/", reason: "用 /v1/models 验证模型" },
      { title: "Claude Code 中转怎么配置？", url: "/claude-code-zhongzhuan/", reason: "实际配置场景" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/openai-compatible-api/",
  },

  // 16. v1-models
  {
    slug: "v1-models",
    url: "/v1-models/",
    cluster: "base-url",
    targetKeyword: "/v1/models",
    title: "/v1/models 能检查什么？模型列表、权限与 API 配置验证",
    metaDescription:
      "详细解释 /v1/models API 端点的用途，如何用它检查中转服务支持的模型、验证 API Key 权限，以及排查配置问题。",
    h1: "/v1/models 能检查什么？",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "/v1/models 是 OpenAI-compatible API 的标准端点，调用它可以查看当前 API Key 有权限访问的模型列表，用于验证配置是否正确。",
    audience: [
      "配置 API 时需要验证模型可用性的用户",
      "遇到「model not found」错误的用户",
      "想确认 API Key 权限的用户",
    ],
    conceptExplanation:
      "/v1/models 是 OpenAI-compatible API 体系中的标准端点，向该端点发送 GET 请求会返回一个模型列表，每个模型包含 id、object、created、owned_by 等字段。\n\n这个端点的主要用途：\n1. **验证 API Key 是否有效**：有效 Key 返回模型列表，无效 Key 返回认证错误\n2. **确认模型是否可用**：检查返回列表中是否包含你要用的模型\n3. **查看可用的模型 id**：不同服务商的模型 id 可能不同（如 gpt-4o vs claude-sonnet-4-20250514）\n4. **辅助排查配置问题**：如果返回空列表或错误，可能是 Base URL 填写错误或权限不足",
    setupOrCheckSteps: [
      "确认 Base URL 和 API Key 填写正确",
      "发送 GET 请求到 {Base URL}/v1/models",
      "检查返回状态码：200 表示正常，401 表示认证失败，404 表示端点不存在",
      "在返回的模型列表中查找你要用的模型 id",
      "如果模型列表为空，检查 Base URL 是否正确",
      "如果认证失败，检查 API Key 是否有效",
      "确认模型 id 与你要用的名称是否匹配",
    ],
    commonErrors: [
      "Base URL 末尾多加了 /v1，导致路径变成 /v1/v1/models",
      "API Key 填错或已过期",
      "中转服务不支持 /v1/models 端点",
      "模型名称和模型 id 不匹配",
    ],
    riskNotes: [
      "通过 /v1/models 检查配置是基础验证手段，但不能替代实际小额测试。",
      "第三方工具 UI 可能变化，以当前版本为准。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
    ],
    whenToUseAIApiDoctor: "直接用 AI API Doctor 检测 /v1/models 返回结果，无需手动调用。",
    whenToUseLinkAI: "在 LinkAI 查看支持的完整模型列表和模型 id，注册后用小额测试验证。",
    aiSummary: "/v1/models 是验证 API 配置和模型权限的关键端点，是每次配置前的必查项。",
    faq: [
      { question: "/v1/models 返回空列表代表什么？", answer: "可能代表：Base URL 填写错误、API Key 无权限、中转服务不支持该端点。先检查 Base URL 和 API Key 是否正确。" },
      { question: "所有 API 服务都支持 /v1/models 吗？", answer: "不是。部分中转服务可能不完全实现 OpenAI-compatible 的所有端点，/v1/models 可能不被支持或返回简化数据。" },
      { question: "/v1/models 和 /models 有什么区别？", answer: "/v1/models 是 OpenAI API v1 版本的端点，/models 是更早期的版本。新工具通常使用 /v1/models。" },
    ],
    relatedLinks: [
      { title: "OpenAI API Base URL 是什么？", url: "/openai-api-base-url/", reason: "理解 Base URL 和 endpoint" },
      { title: "OpenAI-compatible API 是什么？", url: "/openai-compatible-api/", reason: "理解接口兼容性" },
      { title: "Claude Code 中转怎么配置？", url: "/claude-code-zhongzhuan/", reason: "实际使用 /v1/models 验证配置" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/v1-models/",
  },

  // 17. tongyi-qianwen-api
  {
    slug: "tongyi-qianwen-api",
    url: "/tongyi-qianwen-api/",
    cluster: "model-api",
    targetKeyword: "通义千问 API",
    title: "通义千问 API 接入指南：Base URL、模型与中转配置",
    metaDescription:
      "介绍通义千问（Qwen）API 的接入方式，包括 Base URL、模型名称、认证方式和在国内使用时的中转配置注意事项。",
    h1: "通义千问 API 接入指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "通义千问 API 通过 DashScope 平台提供，也可以通过中转服务访问。配置时需要关注 Base URL、API Key 和模型名称的正确填写。",
    audience: ["想接入通义千问 API 的开发者", "在国内配置 AI API 的用户"],
    conceptExplanation: "通义千问（Qwen）是阿里云开发的开源大语言模型系列，通过 DashScope（阿里云百炼）平台对外提供 API 服务。在国内可以直接访问 DashScope，但也可以通过中转服务使用。",
    setupOrCheckSteps: [
      "在阿里云 DashScope 或中转平台获取 API Key",
      "确认要使用的通义千问模型（如 qwen-turbo、qwen-plus）",
      "获取对应的 Base URL（DashScope 地址或中转地址）",
      "在客户端中配置 Base URL 和 API Key",
      "用 /v1/models 确认模型是否可见",
      "用小额请求测试连通性",
      "查看 LinkAI 模型价格，了解通义千问的定价",
    ],
    commonErrors: [
      "混淆了 DashScope 官方地址和中转地址",
      "模型名称填写错误（不同版本模型名称不同）",
      "API Key 格式不正确或已过期",
    ],
    riskNotes: [
      "第三方工具 UI 可能变化，以当前版本为准。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
      "先小额测试。",
    ],
    whenToUseAIApiDoctor: "通义千问 API 配置后，用 AI API Doctor 检测配置是否正确。",
    whenToUseLinkAI: "在 LinkAI 查看通义千问模型的可用性和价格。",
    aiSummary: "通义千问 API 通过 DashScope 或中转服务接入，配置时需要关注 Base URL、API Key 和模型名称的正确性。",
    faq: [
      { question: "通义千问 API 可以直接在国内使用吗？", answer: "可以。DashScope（阿里云百炼）是国内服务，直接访问没有网络限制。也可以通过中转服务使用。" },
      { question: "通义千问的模型名称是什么？", answer: "常见的有 qwen-turbo、qwen-plus、qwen-max 等。具体可用模型和名称可以在 /v1/models 中查看或在 DashScope 文档中确认。" },
    ],
    relatedLinks: [
      { title: "OpenAI API Base URL 是什么？", url: "/openai-api-base-url/", reason: "理解 Base URL 基础" },
      { title: "/v1/models 能检查什么？", url: "/v1-models/", reason: "用 /v1/models 验证模型" },
      { title: "Claude Code 中转怎么配置？", url: "/claude-code-zhongzhuan/", reason: "Claude Code 中的配置应用" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/tongyi-qianwen-api/",
  },

  // 18. kimi-api
  {
    slug: "kimi-api",
    url: "/kimi-api/",
    cluster: "model-api",
    targetKeyword: "Kimi API",
    title: "Kimi API 接入指南：Moonshot 模型与中转配置",
    metaDescription:
      "介绍 Kimi（Moonshot）API 的接入方式，包括 Base URL、模型名称、认证方式和在国内使用时的中转配置注意事项。",
    h1: "Kimi API 接入指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "Kimi 是 Moonshot AI 开发的大语言模型，提供官方 API 也支持通过中转服务访问。配置时需要关注 Base URL、API Key 和模型名称。",
    audience: ["想接入 Kimi API 的开发者", "想使用 Kimi 模型的国内用户"],
    conceptExplanation: "Kimi 是 Moonshot AI（月之暗面）开发的大语言模型，以长上下文能力著称。Kimi API 通过 Moonshot 官方平台提供，在支持 OpenAI-compatible 的客户端中也可以通过中转访问。",
    setupOrCheckSteps: [
      "在 Moonshot 官方平台或中转平台获取 API Key",
      "确认要使用的 Kimi 模型（如 moonshot-v1-8k、moonshot-v1-32k）",
      "获取 Base URL（官方地址或中转地址）",
      "在客户端中配置 Base URL 和 API Key",
      "用 /v1/models 确认模型是否可见",
      "用小额请求测试",
    ],
    commonErrors: [
      "混淆了官方地址和中转地址",
      "模型名称填写不完整（如只写了 moonshot 而非 moonshot-v1-8k）",
      "上下文窗口设置超出模型支持范围",
    ],
    riskNotes: [
      "第三方工具 UI 可能变化，以当前版本为准。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
      "先小额测试。",
    ],
    whenToUseAIApiDoctor: "Kimi API 配置后，用 AI API Doctor 检测配置是否正确。",
    whenToUseLinkAI: "在 LinkAI 查看 Kimi 模型的可用性和价格。",
    aiSummary: "Kimi API 支持官方接入和中转访问，配置时需要关注 Base URL、API Key 和模型名称的正确性。",
    faq: [
      { question: "Kimi API 可以直接在国内使用吗？", answer: "可以。Moonshot AI 是国内公司，官方 API 在国内可以直接访问，没有网络限制。" },
      { question: "Kimi 的上下文窗口是多大？", answer: "不同模型版本不同。moonshot-v1-8k 支持 8K tokens，moonshot-v1-32k 支持 32K tokens，moonshot-v1-128k 支持 128K tokens。需要根据任务复杂度选择合适的模型。" },
    ],
    relatedLinks: [
      { title: "OpenAI API Base URL 是什么？", url: "/openai-api-base-url/", reason: "理解 Base URL 基础" },
      { title: "/v1/models 能检查什么？", url: "/v1-models/", reason: "验证模型可用性" },
      { title: "Claude Code 中转怎么配置？", url: "/claude-code-zhongzhuan/", reason: "Claude Code 中的配置应用" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/kimi-api/",
  },

  // 19. doubao-api
  {
    slug: "doubao-api",
    url: "/doubao-api/",
    cluster: "model-api",
    targetKeyword: "豆包 API",
    title: "豆包 API 接入指南：火山引擎模型与中转配置",
    metaDescription:
      "介绍豆包（Doubao）API 的接入方式，包括 Base URL、模型名称、认证方式和在国内使用时的中转配置注意事项。",
    h1: "豆包 API 接入指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "豆包是字节跳动开发的 AI 模型，通过火山引擎平台提供 API 服务。在国内可以直接访问，也支持通过中转服务访问。",
    audience: ["想接入豆包 API 的开发者", "使用字节系 AI 产品的用户"],
    conceptExplanation: "豆包是字节跳动基于云雀模型开发的 AI 产品，通过火山引擎（Volcengine）平台提供 API 服务。豆包 API 支持 OpenAI-compatible 格式，在大多数支持 OpenAI API 的客户端中可以零配置切换。",
    setupOrCheckSteps: [
      "在火山引擎或中转平台获取 API Key",
      "确认要使用的豆包模型",
      "获取 Base URL",
      "在客户端中配置 Base URL 和 API Key",
      "用 /v1/models 确认模型是否可见",
      "用小额请求测试",
    ],
    commonErrors: [
      "API Key 格式与标准 OpenAI Key 不同（火山引擎使用自己的认证格式）",
      "混淆了不同的火山引擎服务",
      "模型名称填写错误",
    ],
    riskNotes: [
      "第三方工具 UI 可能变化，以当前版本为准。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
      "先小额测试。",
    ],
    whenToUseAIApiDoctor: "豆包 API 配置后，用 AI API Doctor 检测配置是否正确。",
    whenToUseLinkAI: "在 LinkAI 查看豆包模型的可用性和价格。",
    aiSummary: "豆包 API 通过火山引擎提供，支持 OpenAI-compatible 格式，配置时需要注意认证格式和模型名称的正确性。",
    faq: [
      { question: "豆包 API 可以直接在国内使用吗？", answer: "可以。火山引擎是字节跳动的云服务平台，在国内可以直接访问，没有网络限制。" },
      { question: "豆包和其他模型有什么区别？", answer: "豆包基于字节跳动的云雀模型，在中文对话和内容生成方面有优化。具体能力对比建议直接测试体验。" },
    ],
    relatedLinks: [
      { title: "OpenAI API Base URL 是什么？", url: "/openai-api-base-url/", reason: "理解 Base URL 基础" },
      { title: "/v1/models 能检查什么？", url: "/v1-models/", reason: "验证模型可用性" },
      { title: "通义千问 API", url: "/tongyi-qianwen-api/", reason: "其他国内模型 API" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/doubao-api/",
  },

  // 20. openai-api-usage
  {
    slug: "openai-api-usage",
    url: "/openai-api-usage/",
    cluster: "usage-risk",
    targetKeyword: "OpenAI API usage",
    title: "OpenAI API Usage 怎么看？usage、raw quota 与扣费透明指南",
    metaDescription:
      "解释 OpenAI API 的 usage 记录怎么看、raw quota 的含义、completion_tokens 的计算方式，以及如何综合判断扣费是否异常。",
    h1: "OpenAI API Usage 怎么看？",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "OpenAI API usage 记录包含 prompt_tokens、completion_tokens、total_tokens 等字段，结合 request_id、raw quota 和 stream 状态综合判断扣费是否正常。",
    audience: [
      "关心 API 扣费透明度的用户",
      "发现 usage 记录有疑问的用户",
      "想理解 OpenAI API 计费方式的开发者",
    ],
    conceptExplanation: "OpenAI API 的 usage（用量）记录是理解扣费的核心依据。每次 API 调用后，返回的 response 中会包含 usage 字段，记录本次请求消耗的 token 数量：\n\n- **prompt_tokens**：输入提示词消耗的 token 数\n- **completion_tokens**：模型生成回复消耗的 token 数\n- **total_tokens**：前两者之和\n\n**raw quota** 是账户的原始额度记录，**request_id** 是每笔请求的唯一标识。综合这些数据可以核对实际扣费是否符合预期。",
    setupOrCheckSteps: [
      "在 API 响应中检查 usage 字段的三个 token 数",
      "记录每笔请求的 request_id，便于后续核对",
      "在账户后台查看 raw quota 和实际使用量对比",
      "注意 stream 模式下，stream 中断是否仍然计费",
      "检查是否有 tool call 产生的额外 token 消耗",
      "对比 completion_tokens 和实际回复长度是否合理",
      "发现异常时，保存 request_id 和 usage 记录作为凭证",
    ],
    commonErrors: [
      "只关注 total_tokens，忽略 prompt 和 completion 的分布",
      "以为请求失败后就不会产生扣费（不同服务计费规则不同）",
      "没有记录 request_id，出现问题时无法核对",
      "tool call 产生的 token 消耗被忽略",
    ],
    riskNotes: [
      "结合 request_id、usage、raw quota、completion_tokens、stream 状态和后台记录综合判断。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
      "先小额测试。",
    ],
    whenToUseAIApiDoctor: "如果对 usage 记录有疑问，AI API Doctor 的检测结果可以帮助了解 API 配置是否正确、模型是否可见。",
    whenToUseLinkAI: "在 LinkAI 查看详细的 usage 记录和扣费明细，注册后用小额任务观察实际扣费情况。",
    aiSummary: "OpenAI API usage 记录包含 token 消耗明细，结合 request_id、raw quota、stream 状态综合判断扣费是否正常。",
    faq: [
      { question: "prompt_tokens 和 completion_tokens 有什么区别？", answer: "prompt_tokens 是你发送给 API 的输入内容消耗的 token 数，completion_tokens 是模型生成的回复内容消耗的 token 数。不同模型的计费单价可能不同。" },
      { question: "请求失败也会扣费吗？", answer: "不一定，取决于具体的服务商和错误类型。有些服务对认证错误（401）不收费，但对处理过的请求（如格式错误）可能会计费。需要查看具体服务商的计费规则。" },
      { question: "stream 中断后还会继续计费吗？", answer: "通常 stream 模式下，每生成一部分内容就会计费。如果 stream 中断，取决于服务商的规则——有些按已生成的内容计费，有些可能全额计费。" },
    ],
    relatedLinks: [
      { title: "API 中转站安全吗？", url: "/api-zhongzhuan-safe/", reason: "扣费透明度的风险评估" },
      { title: "/v1/models 能检查什么？", url: "/v1-models/", reason: "验证模型可用性" },
      { title: "Claude Code Timeout / 503 / 524", url: "/claude-code-timeout-503-524/", reason: "常见错误与 usage 的关系" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/openai-api-usage/",
  },
];
