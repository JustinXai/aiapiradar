export type PageStatus = "full" | "scaffold";

export type PageCluster =
  | "mcp"
  | "claude-code"
  | "base-url"
  | "model-api"
  | "agent-api"
  | "image-video-api"
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
  // 6 FULL PAGES
  // ========================================

  // 1. openclaw-wechat (NEW FULL)
  {
    slug: "openclaw-wechat",
    url: "/openclaw-wechat/",
    cluster: "agent-api",
    targetKeyword: "OpenClaw 微信",
    title: "OpenClaw 微信配置教程：API Key、OpenRouter 与安全注意事项",
    metaDescription:
      "介绍 OpenClaw 微信集成方式，解释 OpenClaw、OpenRouter、API Key、credits、模型权限的关系，说明 401/403/no credits/model not found/rate limit/timeout 等常见错误，以及 Token 成本和安全风险。",
    h1: "OpenClaw 微信配置教程",
    pageType: "guide",
    status: "full",
    quickAnswer:
      "OpenClaw 微信是指通过 OpenClaw（基于 OpenRouter 的 AI Agent 客户端）接入微信场景的 AI 能力。OpenClaw 本身支持接入多个模型，通过 OpenRouter 管理 credits，微信集成需要额外配置消息接收和发送逻辑。配置时需要注意 API Key 安全、credits 余额和模型权限。",
    audience: [
      "想用 AI Agent 接入微信的开发者",
      "使用 OpenClaw 或 OpenRouter 的用户",
      "关心 Agent Token 成本和安全风险的用户",
    ],
    conceptExplanation:
      "OpenClaw 是一个基于 OpenRouter 的 AI Agent 客户端，支持多模型接入和工具调用。OpenClaw 的微信集成是指在微信环境中调用 AI Agent 能力，通常通过消息接收 + AI 处理 + 消息回复的流程实现。\n\n核心概念：\n- **OpenClaw**：AI Agent 客户端，支持工具调用、多轮对话和外部集成\n- **OpenRouter**：模型聚合平台，通过统一的 API Key 访问多个模型，按 credits 计费\n- **API Key**：OpenRouter 提供的凭证，用于身份认证\n- **Credits**：OpenRouter 的计费单位，按 token 消耗扣费\n- **模型权限**：OpenRouter 上不同模型有不同权限，部分模型需要额外申请\n\n微信集成方式：通常需要在服务器上部署消息接收端（如企业微信 webhook 或个人微信第三方框架），将消息转发给 OpenClaw/OpenRouter 处理，再将 AI 回复发回微信。",
    setupOrCheckSteps: [
      "在 OpenRouter 注册账号，获取 API Key 并充值 credits",
      "安装并配置 OpenClaw，设置 OpenRouter API Key 作为后端",
      "在 OpenClaw 中配置要使用的模型（如 claude-3-opus、gpt-4 等）",
      "配置微信集成：搭建消息接收服务器，设置 webhook 或长连接",
      "将微信消息转发到 OpenClaw/OpenRouter，处理后回传 AI 回复",
      "先用小额消息测试，检查 credits 消耗是否符合预期",
      "确认不需要给 OpenClaw 开放过多微信权限，只提供必要消息权限",
    ],
    commonErrors: [
      "OpenRouter API Key 填错或 credits 余额不足（no credits）",
      "模型不在 OpenRouter 已授权列表中（model not found）",
      "请求过于频繁触发 rate limit",
      "微信消息服务器配置错误导致消息无法接收或回复",
      "Token 消耗远超预期导致 credits 快速耗尽",
    ],
    riskNotes: [
      "OpenClaw 和 OpenRouter 可见你的请求内容和微信消息。",
      "Agent 工具调用、长上下文、多轮循环会显著增加 Token 消耗。",
      "Credits 按实际消耗扣费，微信消息量大时成本会快速上升。",
      "检测结果用于辅助判断，不等于绝对安全或绝对可用结论。",
      "以当前 OpenRouter 官方文档和后台模型列表为准。",
    ],
    whenToUseAIApiDoctor:
      "在配置 OpenClaw 的 OpenRouter API Key 后，用 AI API Doctor 检测 Base URL、API Key 和模型可见性，确认 credits 对应的模型是否真正可用。",
    whenToUseLinkAI:
      "OpenRouter credits 成本较高时，可以考虑在 LinkAI 注册账号，用 LinkAI 的服务进行小额测试，对比实际成本和可用性。",
    aiSummary:
      "OpenClaw 微信配置的核心是正确设置 OpenRouter API Key、确认 credits 余额和模型权限。OpenClaw 作为 Agent 客户端会显著增加 Token 消耗，建议先用小额消息测试成本，再决定是否长期使用。微信集成需要搭建消息服务器，注意 API Key 凭证安全和模型权限范围。",
    faq: [
      {
        question: "OpenClaw 和 OpenRouter 是什么关系？",
        answer: "OpenClaw 是一个 AI Agent 客户端，支持多种模型接入；OpenRouter 是模型聚合平台，提供统一的 API 访问多个模型。OpenClaw 可以将 OpenRouter 作为后端，通过 OpenRouter 的 credits 计费访问 Claude、GPT 等模型。",
      },
      {
        question: "OpenClaw 微信集成有哪些安全风险？",
        answer: "主要风险包括：微信消息内容经过 OpenClaw/OpenRouter 处理方可见；Agent 工具调用可能导致意外操作（如发送错误消息）；API Key 泄露或 credits 被滥用。建议限制 Agent 的消息发送权限，定期检查 credits 消耗记录。",
      },
      {
        question: "为什么 OpenClaw Token 成本可能很高？",
        answer: "Agent 模式通常涉及多轮对话、工具调用和长上下文，这些都会消耗 Token。微信场景下，一个对话链可能包含多条消息，Token 消耗会快速叠加。建议在 OpenRouter 后台观察 credits 消耗曲线，及时调整模型选择和上下文长度。",
      },
      {
        question: "出现 no credits 或 rate limit 怎么办？",
        answer: "no credits 表示 OpenRouter 账户余额不足，需要充值。rate limit 表示请求频率超出限制，可以降低消息处理频率或申请更高的 rate limit 配额。先检查 OpenRouter 后台的 credits 余额和使用记录。",
      },
      {
        question: "可以用国内中转服务替代 OpenRouter 吗？",
        answer: "可以参考。如果国内中转服务支持目标模型，可以减少 credits 成本和网络延迟。但需要注意中转服务的可靠性、API Key 安全和扣费透明度。建议先用小额测试对比成本。",
      },
    ],
    relatedLinks: [
      { title: "OpenClaw 是什么？", url: "/openclaw-shi-shenme/", reason: "理解 OpenClaw 的基本概念和功能定位" },
      { title: "OpenClaw API Key 配置", url: "/openclaw-api-key/", reason: "OpenClaw 的 API Key 配置和安全注意事项" },
      { title: "OpenClaw OpenRouter 使用方式", url: "/openclaw-openrouter/", reason: "OpenRouter 作为 OpenClaw 后端的配置方式" },
      { title: "Claude Code Token 成本分析", url: "/claude-code-token-cost/", reason: "理解 Agent 场景下的 Token 成本构成" },
      { title: "OpenAI API Base URL 是什么？", url: "/openai-api-base-url/", reason: "理解 Base URL 与 API Key 的关系" },
      { title: "API 中转站安全吗？", url: "/api-zhongzhuan-safe/", reason: "中转服务的风险评估方法" },
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
    canonical: "https://aiapiradar.com/openclaw-wechat/",
  },

  // 2. claude-code-token-cost (NEW FULL)
  {
    slug: "claude-code-token-cost",
    url: "/claude-code-token-cost/",
    cluster: "claude-code",
    targetKeyword: "Claude Code Token 成本",
    title: "Claude Code Token 成本分析：上下文、工具调用与小额测试策略",
    metaDescription:
      "详细分析 Claude Code 为什么 Token 成本可能很高，解释上下文长度、工具调用、代码库大小、多轮循环、模型选择与成本的关系，以及如何小额测试和结合 usage 判断扣费。",
    h1: "Claude Code Token 成本为什么可能很高",
    pageType: "guide",
    status: "full",
    quickAnswer:
      "Claude Code 的 Token 成本来自多个维度：输入上下文（你的代码和提示）、输出回复（AI 的代码和解释）、工具调用（每次工具使用都消耗 Token）、多轮循环（长对话累积）。建议先用小额任务估算成本，再结合 usage 记录判断。",
    audience: [
      "关心 Claude Code 使用成本的开发者",
      "发现 Claude Code 消耗远超预期的用户",
      "想理解 usage 和扣费关系的用户",
    ],
    conceptExplanation:
      "Claude Code 基于 Token 计费，每个请求和响应都消耗 Token。Token 成本由以下因素叠加：\n\n1. **上下文 Token**：Claude Code 会把当前代码库的相关文件读入上下文，上下文越长消耗越多。一个中等规模的代码库可能每次对话就消耗数万 Token。\n\n2. **工具调用 Token**：Claude Code 每次执行命令、读取文件、搜索代码都算一次工具调用，每次调用及其返回结果都会消耗 Token。\n\n3. **多轮循环**：Claude Code 会在任务完成前进行多轮思考和操作，每轮都累积 Token 消耗。\n\n4. **模型选择**：不同模型单价不同，Claude Opus 单价最高，Sonnet 次之，Haiku 最便宜。\n\n5. **中转溢价**：通过中转服务使用时，中转站会在官方价格上加收服务费，实际单价可能比官方高 20%-100%。\n\nToken 成本计算示例：一个包含 500 行代码的修复任务，上下文 5000 Token，工具调用返回 3000 Token，AI 回复 2000 Token，多轮循环 3 次，总计约 30000 Token，按 Sonnet 4o 中转价格约 ¥0.3-1.5 元。",
    setupOrCheckSteps: [
      "确认使用的模型（Opus/Sonnet/Haiku），不同模型单价差异很大",
      "在中转平台或官方后台查看当前模型的 Token 单价",
      "用小额简单任务测试（如修复单文件一个小 bug），记录消耗的 Token 数",
      "检查 usage 记录中的 prompt_tokens、completion_tokens、total_tokens",
      "对比 request_id 和扣费记录，确认是否匹配",
      "确认 stream 模式下 stream 中断是否仍全额计费",
      "定期检查 usage 曲线，发现异常消耗时及时排查",
    ],
    commonErrors: [
      "以为 Claude Code 按次收费，不知道按 Token 计费",
      "用大代码库做第一次测试，上下文直接爆量",
      "工具调用产生的 Token 消耗被忽略",
      "没有记录 request_id，出现问题时无法核对扣费",
      "stream 中断后可能仍被收费，实际规则以服务商定价为准",
      "混淆了 prompt_tokens 和 completion_tokens 的单价",
    ],
    riskNotes: [
      "Agent 工具调用、长上下文、多轮循环和文件读取会显著增加 Token 消耗。",
      "中转服务会在官方价格上加收服务费，实际单价以中转平台定价为准。",
      "检测结果用于辅助判断，不等于绝对安全或绝对可用结论。",
      "以当前官方文档或服务商后台的定价为准，价格可能随时调整。",
      "视频生成通常比文本生成更贵，可能按秒、credit、单次任务或视频时长计费。",
    ],
    whenToUseAIApiDoctor:
      "在配置 Claude Code 中转后，用 AI API Doctor 检测 API Key 和 Base URL 是否正确，/v1/models 是否返回目标模型，结合 usage 记录判断配置是否合理。",
    whenToUseLinkAI:
      "在 LinkAI 查看各模型的 Token 单价和可用模型，注册后用小额任务测试 Claude Code 配置，观察实际扣费情况，确认是否需要调整模型选择。",
    aiSummary:
      "Claude Code Token 成本由上下文、工具调用、多轮循环和模型选择共同决定。中转服务的实际单价需要以平台定价为准，建议先用小额任务建立成本基线，再结合 usage 记录持续监控，发现异常时及时调整任务复杂度和模型选择。",
    faq: [
      {
        question: "Claude Code 按次收费还是按 Token 收费？",
        answer: "按 Token 收费。每次对话的 Token 消耗 = prompt_tokens（输入）+ completion_tokens（输出），乘以所用模型的单价。中转服务还会加收服务费。",
      },
      {
        question: "Claude Code 一次对话大概消耗多少 Token？",
        answer: "取决于任务复杂度。一个简单单文件修复可能消耗 5000-20000 Token；涉及多文件修改或多轮循环的任务可能消耗 50000-200000 Token。建议先用最小任务建立基线。",
      },
      {
        question: "stream 模式中断了还会扣费吗？",
        answer: "取决于服务商规则。有些按已生成的内容计费，有些全额计费。如果 stream 中断后重新发起请求，可能产生两笔费用。建议在服务商后台查看具体计费规则。",
      },
      {
        question: "Claude Opus 比 Sonnet 贵多少？",
        answer: "Claude Opus 单价通常是 Sonnet 的 3-5 倍，Haiku 是 Sonnet 的 1/10。具体单价以中转平台或官方定价为准。对于简单任务，使用 Haiku 可以显著降低成本。",
      },
      {
        question: "怎么判断扣费是否异常？",
        answer: "对比 request_id、usage 记录（prompt_tokens + completion_tokens）和实际扣费金额。如果发现 usage 记录与扣费不符，保存相关 request_id 和 usage 截图作为凭证，向服务商核实。",
      },
    ],
    relatedLinks: [
      { title: "Claude Code 中转怎么配置？", url: "/claude-code-zhongzhuan/", reason: "Claude Code 中转配置的基础步骤" },
      { title: "Claude Code API Key 配置", url: "/claude-code-api-key/", reason: "API Key 配置与凭证安全" },
      { title: "OpenAI API Base URL 是什么？", url: "/openai-api-base-url/", reason: "理解 Base URL 与成本的关系" },
      { title: "OpenAI API Usage 怎么看？", url: "/openai-api-usage/", reason: "用 usage 记录判断扣费是否正常" },
      { title: "API 中转站安全吗？", url: "/api-zhongzhuan-safe/", reason: "中转服务的成本与风险评估" },
      { title: "Coding Agent Token 成本分析", url: "/coding-agent-token-cost/", reason: "其他 Agent 工具的 Token 成本对比" },
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
    canonical: "https://aiapiradar.com/claude-code-token-cost/",
  },

  // 3. shipin-shengcheng-api (NEW FULL)
  {
    slug: "shipin-shengcheng-api",
    url: "/shipin-shengcheng-api/",
    cluster: "image-video-api",
    targetKeyword: "视频生成 API",
    title: "视频生成 API 接入指南：官方 API、第三方聚合与可用性判断",
    metaDescription:
      "系统介绍视频生成 API 的接入方式，区分官方 API、第三方聚合 API、产品网页能力和当前可用性未知状态，说明文生视频、图生视频的 API Key、Base URL、计费单位（token/credit/秒/任务）、异步任务（轮询/回调/超时/失败重试）和失败扣费判断。",
    h1: "视频生成 API 接入指南",
    pageType: "guide",
    status: "full",
    quickAnswer:
      "视频生成 API 接入需要区分官方 API（如 Runway、Pika、Sora）、第三方聚合 API（如 Replicate）和中转服务。视频生成通常比文本生成更贵，计费单位可能是 token、credit、秒、图片或单次任务。视频生成大多为异步任务，需要轮询或回调获取结果，失败是否扣费需要结合 request_id、usage 和服务商规则综合判断。",
    audience: [
      "想接入视频生成 API 的开发者",
      "关心视频生成计费方式的用户",
      "遇到视频生成失败和扣费疑问的用户",
    ],
    conceptExplanation:
      "视频生成 API 市场分为几类：\n\n1. **官方 API**：如 OpenAI Sora、Runway、Pika Labs 等，提供原生视频生成接口，通常按生成秒数或 credit 计费。\n\n2. **第三方聚合 API**：如 Replicate，整合多个视频生成模型，提供统一接口，按平台 credit 计费。\n\n3. **产品网页能力**：很多服务商提供网页界面生成视频，但不一定开放 API，或 API 与网页能力不同步。\n\n4. **当前可用性未知**：由于政策、地区限制或服务商策略变化，部分视频生成 API 在国内可用性不确定，建议先小额测试。\n\n视频生成 API 的特殊之处：\n- **计费复杂**：可能按生成秒数、credit、单次任务、分辨率等多种方式计费\n- **异步任务**：大多数视频生成为异步，需要先提交任务，再轮询状态或配置回调\n- **超时问题**：视频生成耗时长，超时和失败处理是常见问题\n- **失败扣费**：与文本 API 不同，视频生成失败是否扣费的规则更复杂",
    setupOrCheckSteps: [
      "确认要使用的视频生成服务（官方 API / 第三方聚合 / 国内中转）",
      "获取 API Key 或注册账号并充值（credit / 余额）",
      "获取 Base URL（有些服务不需要 Base URL，直接用官方接口）",
      "确认模型名称：文生视频（如 Sora、Runway Gen-3）、图生视频等不同模型",
      "先小额测试：生成 1-5 秒短视频，观察实际扣费和生成质量",
      "测试异步任务流程：提交任务 → 轮询状态 / 配置回调 → 获取结果",
      "检查失败场景：超时后是否产生扣费、retry 是否重复计费",
      "以当前服务商后台和官方文档为准确认计费规则",
    ],
    commonErrors: [
      "混淆了官方 API 和第三方聚合 API 的接口格式",
      "没有配置回调或轮询机制，导致任务提交后无法获取结果",
      "超时时间设置过短，正常视频生成被误判为失败",
      "失败重试时没有检查是否已产生扣费，导致重复扣费",
      "以为视频 API 计费与文本 API 相同（实际上更贵更复杂）",
      "API 能力与网页能力不一致，API 返回错误但网页可以生成",
    ],
    riskNotes: [
      "视频生成通常比文本生成更贵，可能按秒、credit、单次任务或视频时长计费。",
      "视频生成常见异步任务、轮询、回调和超时问题。",
      "失败是否扣费要结合 request_id、usage、后台记录和服务商规则综合判断。",
      "检测结果用于辅助判断，不等于绝对安全或绝对可用结论。",
      "以当前官方文档或服务商后台的定价和可用性信息为准。",
    ],
    whenToUseAIApiDoctor:
      "在配置视频生成 API 的 Base URL 和 API Key 后，用 AI API Doctor 检测接口是否可访问、认证是否正常。视频生成的具体模型可用性建议直接小额测试。",
    whenToUseLinkAI:
      "在 LinkAI 查看是否支持目标视频生成模型，注册后领取 $2 免费福利，用小额视频生成任务测试实际扣费和可用性。",
    aiSummary:
      "视频生成 API 接入需要区分服务商类型、确认计费单位、测试异步任务流程。视频生成成本高于文本，建议先用最短时长和最低分辨率小额测试，确认实际扣费规则和生成质量后再扩大使用。失败扣费判断需要结合 request_id、usage 和服务商后台记录综合评估。",
    faq: [
      {
        question: "视频生成 API 和图片生成 API 计费一样吗？",
        answer: "不一样。图片生成通常按张计费，价格相对固定；视频生成通常按秒、credit 或单次任务计费，价格差异很大，且与视频时长、分辨率、模型版本相关。",
      },
      {
        question: "视频生成失败还扣费吗？",
        answer: "不一定。不同服务商规则不同。有些对失败请求不扣费，有些按已消耗的计算资源计费，有些全额计费。需要查看具体服务商的计费规则，并结合 request_id、usage 记录和后台日志综合判断。",
      },
      {
        question: "异步视频生成任务超时了怎么办？",
        answer: "视频生成任务耗时长，设置合理的超时时间很重要。如果超时，可以先查询任务状态（有些服务任务已完成后超时不影响结果），再决定是否重试。注意重试可能产生新的计费。",
      },
      {
        question: "国内可以用 OpenAI Sora 吗？",
        answer: "Sora 目前未全面开放 API，且有地区访问限制。国内可用性需要通过中转服务或等待官方开放。建议先用小额测试确认可用性，再决定是否投入更多预算。",
      },
      {
        question: "图生视频 API 和文生视频 API 有什么区别？",
        answer: "图生视频 API 需要先有一张图片作为输入，API 通常接受图片 URL 或 base64；文生视频 API 只需文字描述。两者使用的模型和计费方式可能不同。",
      },
    ],
    relatedLinks: [
      { title: "图片生成 API", url: "/tupian-shengcheng-api/", reason: "图片生成 API 的接入方式和计费逻辑" },
      { title: "GPT Image API", url: "/gpt-image-api/", reason: "OpenAI 图片生成 API 的接入方式" },
      { title: "即梦 API", url: "/jimeng-api/", reason: "字节即梦图片生成的接入方式" },
      { title: "OpenAI API Base URL 是什么？", url: "/openai-api-base-url/", reason: "理解 Base URL 与 API Key 的关系" },
      { title: "OpenAI API Usage 怎么看？", url: "/openai-api-usage/", reason: "用 usage 记录判断视频生成扣费是否正常" },
      { title: "API 中转站安全吗？", url: "/api-zhongzhuan-safe/", reason: "视频生成中转服务的风险评估" },
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
    canonical: "https://aiapiradar.com/shipin-shengcheng-api/",
  },

  // 4. claude-code-zhongzhuan (existing full)
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
        answer: "是的，国内用户如果想通过第三方中转服务访问 Claude API，就必须配置 Base URL。Base URL 告诉 Claude Code 客户端把请求发送到哪里。",
      },
      {
        question: "Claude Code timeout 是不是中转站一定有问题？",
        answer: "不一定。timeout 可能来自中转站处理慢、网络不稳定、请求体过大、模型响应过长等多个原因。建议先降低任务复杂度测试，同时检查 timeout 参数是否设置合理。",
      },
      {
        question: "model not found 应该先查哪里？",
        answer: "先查中转服务支持的模型列表（通过 /v1/models 端点确认），再确认填写的模型名是否完全一致（包括版本号）。不同中转服务可能用不同的模型别名。",
      },
      {
        question: "第一次测试应该跑长任务吗？",
        answer: "不应该。第一次测试建议用小额、简单的任务验证连通性，确认 API 能正常响应后再逐步扩大任务规模，避免一次性消耗大量预算。",
      },
      {
        question: "什么时候应该看 LinkAI 模型价格？",
        answer: "在你确认了要测试的模型名称之后，可以先查看 LinkAI 模型价格，了解各模型单价和可用模型列表，再决定用哪个模型进行小额测试。",
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

  // 5. openai-api-base-url (existing full)
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
        answer: "不是。Base URL 是 API 的域名地址前缀，endpoint 是 Base URL 后面具体的接口路径（如 /v1/models）。Base URL 指向服务入口，endpoint 指向具体功能。",
      },
      {
        question: "Base URL 一定要加 /v1 吗？",
        answer: "取决于具体工具。有些客户端要求填 Base URL 不含 /v1（如 Claude Code），让客户端自动追加路径；有些要求填完整路径含 /v1。需要仔细看客户端的填写说明。",
      },
      {
        question: "/v1/models 返回空代表什么？",
        answer: "可能代表 Base URL 填写错误、API Key 无权限、该中转服务不支持 /v1/models 端点，或者网络问题。先检查 Base URL 和 API Key 是否正确。",
      },
      {
        question: "OpenAI-compatible API 等于官方 OpenAI API 吗？",
        answer: "不完全等于。OpenAI-compatible API 是遵循 OpenAI API 格式的中转或代理服务，但背后的模型可能不是 OpenAI 官方模型（如换成 Claude、Qwen 等）。接口格式兼容，但服务商不同。",
      },
      {
        question: "什么时候应该查看模型价格？",
        answer: "在你确认了要用的模型 id 后，可以先查看 LinkAI 模型价格，了解该模型的单价和是否有免费额度，再决定是否注册并进行小额测试。",
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

  // 6. api-zhongzhuan-safe (existing full)
  {
    slug: "api-zhongzhuan-safe",
    url: "/api-zhongzhuan-safe/",
    cluster: "usage-risk",
    targetKeyword: "API 中转站安全吗",
    title: "API 中转站安全吗？Base URL、模型权限、扣费透明和风险检查清单",
    metaDescription:
      "面向准备使用 API 中转站的用户，解释 Base URL、API Key、模型权限、扣费透明度、日志记录和稳定性风险，并建议先检测再小额测试。",
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
        answer: "不一定。中转站本身不是原罪，但需要评估具体服务商的可靠性、透明度和技术能力。有些中转站有良好的隐私保护，有些则可能存在数据滥用风险。",
      },
      {
        question: "怎么判断模型权限是否真的可用？",
        answer: "最直接的方法是调用 /v1/models 端点，查看返回的模型列表是否包含你要用的模型。同时用小额请求测试，看是否能得到预期的响应。",
      },
      {
        question: "请求失败但 usage 有记录一定是异常扣费吗？",
        answer: "不一定。不同 API 服务商对失败请求的计费规则不同。有些服务会对失败的请求计费，有些不会。需要结合 request_id、usage、raw quota、completion_tokens、stream 状态和后台记录综合判断。",
      },
      {
        question: "AI API Doctor 能替代人工判断吗？",
        answer: "不能。AI API Doctor 的检测结果只用于辅助判断，帮助你了解 API 配置是否正确、模型是否可见等基础信息，但不能替代对服务商可靠性、隐私政策和扣费透明度的综合评估。",
      },
      {
        question: "什么时候应该先看模型价格？",
        answer: "在你决定使用某个中转服务之前，可以先查看 LinkAI 模型价格，了解同类模型的正规市场价格作为参考，防止被过度溢价，同时评估自己的使用成本。",
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
  // 22 SCAFFOLD PAGES
  // ========================================

  // 7. openclaw-shi-shenme
  {
    slug: "openclaw-shi-shenme",
    url: "/openclaw-shi-shenme/",
    cluster: "agent-api",
    targetKeyword: "OpenClaw 是什么",
    title: "OpenClaw 是什么？OpenRouter Agent 客户端简介与使用场景",
    metaDescription:
      "介绍 OpenClaw 是什么，OpenRouter 作为后端的 Agent 客户端，支持多模型接入、工具调用和 credits 计费，以及与 Claude Code、Cline 的区别。",
    h1: "OpenClaw 是什么？",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "OpenClaw 是一个基于 OpenRouter 的 AI Agent 客户端，支持多模型接入和工具调用，通过 credits 计费。适合需要灵活切换模型、多工具调用的场景。",
    audience: ["想了解 OpenClaw 的开发者", "寻找 Agent 工具的用户"],
    conceptExplanation: "OpenClaw 是一个 AI Agent 客户端，接入 OpenRouter 作为模型后端，支持 Claude、GPT、Gemini 等多模型。OpenClaw 通过 OpenRouter 的 credits 系统计费，支持工具调用和多轮对话。",
    setupOrCheckSteps: [
      "在 OpenRouter 注册账号并充值 credits",
      "下载安装 OpenClaw 客户端",
      "配置 OpenRouter API Key",
      "选择要使用的模型和工具",
      "用小额任务测试，观察 credits 消耗",
    ],
    commonErrors: ["credits 余额不足", "API Key 填错", "模型不在已授权列表中"],
    riskNotes: [
      "Agent 工具调用会显著增加 Token 消耗。",
      "OpenRouter credits 按实际消耗扣费，以平台定价为准。",
      "检测结果用于辅助判断，不等于绝对安全或绝对可用结论。",
    ],
    whenToUseAIApiDoctor: "配置 OpenClaw 后，用 AI API Doctor 检测 OpenRouter API Key 和 Base URL 是否正确。",
    whenToUseLinkAI: "OpenRouter credits 成本高时，可以在 LinkAI 对比成本和可用性。",
    aiSummary: "OpenClaw 是基于 OpenRouter 的 Agent 客户端，核心是 credits 计费和模型灵活切换。",
    faq: [
      { question: "OpenClaw 和 Claude Code 有什么区别？", answer: "两者都是 AI 编程/Agent 工具，OpenClaw 支持 OpenRouter 上的多模型，Claude Code 基于 Anthropic 模型。具体选择取决于使用场景和成本预算。" },
      { question: "OpenRouter credits 怎么充值？", answer: "在 OpenRouter 官网注册后，通过信用卡或加密货币充值。credits 按使用量扣除，具体单价在平台文档中。" },
    ],
    relatedLinks: [
      { title: "OpenClaw 微信配置", url: "/openclaw-wechat/", reason: "OpenClaw 的微信集成方式" },
      { title: "OpenClaw API Key 配置", url: "/openclaw-api-key/", reason: "OpenClaw 的 API Key 配置" },
      { title: "Claude Code Token 成本", url: "/claude-code-token-cost/", reason: "理解 Agent 的 Token 成本" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/openclaw-shi-shenme/",
  },

  // 8. openclaw-api-key
  {
    slug: "openclaw-api-key",
    url: "/openclaw-api-key/",
    cluster: "agent-api",
    targetKeyword: "OpenClaw API Key",
    title: "OpenClaw API Key 配置与安全指南",
    metaDescription:
      "介绍 OpenClaw 的 API Key 配置方式，OpenRouter API Key 的获取与安全使用，以及 credits 管理和凭证保护。",
    h1: "OpenClaw API Key 配置与安全指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "OpenClaw 使用 OpenRouter API Key 进行认证。建议通过环境变量引用，不要明文存储，定期检查 credits 使用记录。",
    audience: ["配置 OpenClaw 的开发者", "关心 API Key 安全的用户"],
    conceptExplanation: "OpenClaw 的 API Key 实为 OpenRouter API Key，用于访问 OpenRouter 上的模型服务，按 credits 扣费。API Key 安全和 credits 管理是核心注意事项。",
    setupOrCheckSteps: [
      "在 OpenRouter 获取 API Key",
      "在 OpenClaw 中安全配置 API Key（环境变量引用）",
      "确认 credits 余额充足",
      "测试 API Key 是否有效",
      "设置 credits 用量提醒",
    ],
    commonErrors: ["API Key 泄露", "credits 耗尽", "API Key 权限不足"],
    riskNotes: ["OpenRouter API Key 可见你的请求内容", "Credits 按实际消耗扣费", "检测结果用于辅助判断"],
    whenToUseAIApiDoctor: "OpenClaw 配置异常时，用 AI API Doctor 检测 API Key 是否有效。",
    whenToUseLinkAI: "OpenRouter 成本高时，对比 LinkAI 的成本和可用性。",
    aiSummary: "OpenClaw API Key 安全的核心是凭证保护、credits 管理和定期审计。",
    faq: [
      { question: "OpenRouter API Key 和 OpenAI API Key 一样吗？", answer: "不一样。OpenRouter API Key 用于访问 OpenRouter 聚合的多个模型，按 credits 计费；OpenAI API Key 仅用于 OpenAI 官方服务。" },
      { question: "OpenClaw API Key 泄露了怎么办？", answer: "立即在 OpenRouter 禁用该 API Key，重新生成一个新的，然后检查 credits 消耗记录，确认是否被滥用。" },
    ],
    relatedLinks: [
      { title: "OpenClaw 是什么？", url: "/openclaw-shi-shenme/", reason: "理解 OpenClaw 的基本概念" },
      { title: "OpenClaw OpenRouter 使用", url: "/openclaw-openrouter/", reason: "OpenRouter 作为 OpenClaw 后端" },
      { title: "Claude Code API Key 安全", url: "/claude-code-api-key/", reason: "API Key 安全通用原则" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/openclaw-api-key/",
  },

  // 9. openclaw-openrouter
  {
    slug: "openclaw-openrouter",
    url: "/openclaw-openrouter/",
    cluster: "agent-api",
    targetKeyword: "OpenClaw OpenRouter",
    title: "OpenClaw OpenRouter 使用方式：多模型聚合与 credits 计费",
    metaDescription:
      "介绍 OpenClaw 如何使用 OpenRouter 作为后端，支持多模型接入、credits 计费，以及与直接使用 OpenRouter 的区别。",
    h1: "OpenClaw OpenRouter 使用方式",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "OpenClaw 通过 OpenRouter 访问多个模型，OpenRouter 统一管理 credits。适合需要灵活切换模型的场景。",
    audience: ["使用 OpenClaw + OpenRouter 的用户", "寻找多模型聚合方案的用户"],
    conceptExplanation: "OpenClaw 是 OpenRouter 的客户端实现，通过 OpenRouter API 访问多个模型，所有费用通过 OpenRouter credits 统一结算。",
    setupOrCheckSteps: [
      "注册 OpenRouter 账号并充值 credits",
      "在 OpenClaw 中配置 OpenRouter API Key",
      "选择目标模型或使用自动路由",
      "观察 credits 消耗曲线",
    ],
    commonErrors: ["credits 不足", "模型不支持", "网络访问 OpenRouter 不稳定"],
    riskNotes: ["OpenRouter 可见请求内容", "Credits 按平台定价扣费，以官方为准", "检测结果用于辅助判断"],
    whenToUseAIApiDoctor: "OpenClaw 接入 OpenRouter 异常时检测配置。",
    whenToUseLinkAI: "OpenRouter 成本高时在 LinkAI 对比。",
    aiSummary: "OpenClaw + OpenRouter 的核心是 credits 统一计费和模型灵活切换。",
    faq: [
      { question: "OpenClaw 可以不用 OpenRouter 吗？", answer: "OpenClaw 基于 OpenRouter 设计，部分版本可能支持其他后端，具体取决于客户端实现。" },
      { question: "OpenRouter credits 余额怎么查看？", answer: "在 OpenRouter 官网控制台查看 credits 余额和使用明细，也可以设置余额告警以防止意外超支。" },
    ],
    relatedLinks: [
      { title: "OpenClaw 是什么？", url: "/openclaw-shi-shenme/", reason: "OpenClaw 基本概念" },
      { title: "OpenClaw API Key", url: "/openclaw-api-key/", reason: "API Key 配置" },
      { title: "Claude Code Token 成本", url: "/claude-code-token-cost/", reason: "Agent 成本分析" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/openclaw-openrouter/",
  },

  // 10. openclaw-security
  {
    slug: "openclaw-security",
    url: "/openclaw-security/",
    cluster: "agent-api",
    targetKeyword: "OpenClaw 安全",
    title: "OpenClaw 安全指南：凭证保护、credits 风险与聊天权限",
    metaDescription:
      "系统介绍 OpenClaw 的安全风险，包括 OpenRouter API Key 保护、credits 滥用风险、聊天入口安全、文件权限和 prompt injection 防护。",
    h1: "OpenClaw 安全指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "OpenClaw 安全风险来自 API Key 暴露、credits 被滥用、聊天权限过大和 prompt injection。建议通过环境变量引用 API Key，设置 credits 用量上限。",
    audience: ["关心 OpenClaw 安全的开发者", "使用 OpenClaw 的企业用户"],
    conceptExplanation: "OpenClaw 的安全风险包括：OpenRouter API Key 泄露导致 credits 被盗用；聊天权限过大导致意外操作；文件权限导致数据泄露；prompt injection 攻击等。",
    setupOrCheckSteps: [
      "通过环境变量引用 OpenRouter API Key，不要明文存储",
      "在 OpenRouter 设置 credits 用量上限提醒",
      "限制 OpenClaw 的文件访问权限",
      "审查工具调用日志，防止异常操作",
    ],
    commonErrors: ["API Key 明文存储", "credits 无上限", "文件权限过大"],
    riskNotes: [
      "OpenRouter API Key 泄露可能导致 credits 被盗用。",
      "Agent 工具调用可能执行意外操作。",
      "检测结果用于辅助判断，不等于绝对安全结论。",
    ],
    whenToUseAIApiDoctor: "怀疑 OpenClaw/OpenRouter 配置异常时检测 API Key 和可用性。",
    whenToUseLinkAI: "OpenRouter 成本或安全性存疑时在 LinkAI 对比。",
    aiSummary: "OpenClaw 安全核心是凭证保护、credits 管理和权限最小化。",
    faq: [
      { question: "OpenClaw 会保存我的聊天记录吗？", answer: "取决于 OpenClaw 的实现。OpenRouter 会在技术上看到你的请求内容以完成模型调用。查阅具体客户端的隐私政策。" },
      { question: "如何防止 OpenClaw credits 被盗用？", answer: "通过环境变量引用 API Key，不要明文存储；设置 credits 用量提醒；定期检查消耗记录；发现异常时立即禁用并重新生成 API Key。" },
    ],
    relatedLinks: [
      { title: "OpenClaw 是什么？", url: "/openclaw-shi-shenme/", reason: "基本概念" },
      { title: "OpenClaw API Key", url: "/openclaw-api-key/", reason: "凭证安全" },
      { title: "API 中转站安全吗？", url: "/api-zhongzhuan-safe/", reason: "中转风险评估" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/openclaw-security/",
  },

  // 11. kilo-code-vs-cline
  {
    slug: "kilo-code-vs-cline",
    url: "/kilo-code-vs-cline/",
    cluster: "agent-api",
    targetKeyword: "Kilo Code vs Cline",
    title: "Kilo Code 与 Cline 对比：VSCode AI 编程工具选型指南",
    metaDescription:
      "对比 Kilo Code 和 Cline 两个 VSCode AI 编程工具的功能、API 支持、MCP 集成、Token 成本和适用场景。",
    h1: "Kilo Code vs Cline：VSCode AI 编程工具对比",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "Kilo Code 和 Cline 都是 VSCode AI 编程插件，支持多模型和 OpenRouter，主要区别在于工具生态和成本管理方式。",
    audience: ["VSCode 用户选择 AI 编程工具", "想对比 Kilo Code 和 Cline 的开发者"],
    conceptExplanation: "Kilo Code 和 Cline 都是 VSCode 中的 AI 编程助手，支持通过 OpenRouter 或其他中转访问多模型，Token 成本取决于所选模型和后端。",
    setupOrCheckSteps: [
      "了解两个工具的模型支持范围",
      "对比 API 配置方式（OpenRouter / 其他中转）",
      "测试 Token 消耗差异",
      "评估工具调用能力",
    ],
    commonErrors: ["混淆了 API 配置方式", "Token 成本预估不足"],
    riskNotes: ["Agent 工具调用会显著增加 Token 消耗", "以服务商定价为准"],
    whenToUseAIApiDoctor: "配置任一工具后用 AI API Doctor 检测 API Key 和模型可用性。",
    whenToUseLinkAI: "对比 LinkAI 与 OpenRouter 的模型成本。",
    aiSummary: "Kilo Code vs Cline 的选择取决于具体使用场景和成本预算，两者均需关注 Token 成本。",
    faq: [
      { question: "Kilo Code 和 Cline 哪个更便宜？", answer: "取决于所选模型和后端平台。两者都支持 OpenRouter 和其他中转，成本比较应针对具体模型和后端分别计算。" },
      { question: "Kilo Code 支持哪些模型？", answer: "Kilo Code 支持 OpenRouter 上大部分模型，具体可用模型列表在 OpenRouter 后台查看，不同模型单价和可用性可能随时变化。" },
    ],
    relatedLinks: [
      { title: "Kilo Code OpenRouter 使用", url: "/kilo-code-openrouter/", reason: "Kilo Code 的 OpenRouter 配置" },
      { title: "Claude Code Token 成本", url: "/claude-code-token-cost/", reason: "Agent Token 成本分析" },
      { title: "Cline MCP", url: "/cline-mcp/", reason: "Cline MCP 配置" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/kilo-code-vs-cline/",
  },

  // 12. kilo-code-openrouter
  {
    slug: "kilo-code-openrouter",
    url: "/kilo-code-openrouter/",
    cluster: "agent-api",
    targetKeyword: "Kilo Code OpenRouter",
    title: "Kilo Code OpenRouter 配置教程：多模型接入与成本管理",
    metaDescription:
      "介绍 Kilo Code 如何配置 OpenRouter 作为后端，支持多模型接入，以及如何通过 OpenRouter credits 管理成本。",
    h1: "Kilo Code OpenRouter 配置教程",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "Kilo Code 通过 OpenRouter API Key 接入多模型，所有消耗通过 OpenRouter credits 结算，支持灵活切换模型。",
    audience: ["Kilo Code 用户", "使用 OpenRouter 的开发者"],
    conceptExplanation: "Kilo Code 支持 OpenRouter 作为后端，通过统一的 OpenRouter API Key 访问多个模型，credits 余额决定可用性。",
    setupOrCheckSteps: [
      "注册 OpenRouter 并获取 API Key",
      "在 Kilo Code 设置中配置 OpenRouter API Key",
      "选择目标模型",
      "观察 credits 消耗",
    ],
    commonErrors: ["API Key 填错", "credits 耗尽"],
    riskNotes: ["OpenRouter credits 按实际消耗扣费", "Agent 工具调用增加 Token 消耗"],
    whenToUseAIApiDoctor: "Kilo Code 配置异常时检测 API Key。",
    whenToUseLinkAI: "OpenRouter 成本高时在 LinkAI 对比。",
    aiSummary: "Kilo Code + OpenRouter 的核心是 credits 管理和模型灵活切换。",
    faq: [
      { question: "Kilo Code 支持哪些 OpenRouter 模型？", answer: "Kilo Code 支持 OpenRouter 上大部分模型，具体可用模型列表在 OpenRouter 后台查看。" },
      { question: "Kilo Code OpenRouter 成本怎么控制？", answer: "通过 OpenRouter 后台设置 credits 用量提醒，选择低价模型（如 Haiku）处理简单任务，复杂任务再切换到高价模型，定期审计消耗记录。" },
    ],
    relatedLinks: [
      { title: "Kilo Code vs Cline", url: "/kilo-code-vs-cline/", reason: "两个工具的对比" },
      { title: "Claude Code Token 成本", url: "/claude-code-token-cost/", reason: "Agent 成本分析" },
      { title: "Coding Agent Token 成本", url: "/coding-agent-token-cost/", reason: "通用 Agent 成本" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/kilo-code-openrouter/",
  },

  // 13. coding-agent-token-cost
  {
    slug: "coding-agent-token-cost",
    url: "/coding-agent-token-cost/",
    cluster: "agent-api",
    targetKeyword: "Coding Agent Token 成本",
    title: "Coding Agent Token 成本分析：多模型对比与成本优化策略",
    metaDescription:
      "对比 OpenClaw、Kilo Code、Cline、Claude Code 等 Coding Agent 的 Token 成本，解释上下文、工具调用与成本的关系，以及成本优化方法。",
    h1: "Coding Agent Token 成本分析",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "Coding Agent 的 Token 成本由模型单价、上下文长度和工具调用次数共同决定。建议先用小额任务建立成本基线，再选择性价比最高的组合。",
    audience: ["关心 Coding Agent 成本的开发者", "想优化 AI 编程成本的用户"],
    conceptExplanation: "Coding Agent（如 OpenClaw、Kilo Code、Cline）与普通 API 调用不同，会进行多轮对话、工具调用和文件操作，Token 消耗远高于单次问答。",
    setupOrCheckSteps: [
      "确认各 Agent 支持的模型和单价",
      "用小额任务测试各 Agent 的 Token 消耗",
      "对比 credits 消耗曲线",
      "选择性价比最高的组合",
    ],
    commonErrors: ["低估工具调用的 Token 消耗", "混淆模型单价"],
    riskNotes: [
      "Agent 工具调用、长上下文会显著增加 Token 消耗。",
      "以服务商定价为准，成本可能随时调整。",
    ],
    whenToUseAIApiDoctor: "配置任何 Agent 后检测 API Key 和 Base URL 是否正确。",
    whenToUseLinkAI: "在 LinkAI 查看各模型单价，对比 Agent 成本。",
    aiSummary: "Coding Agent Token 成本分析需考虑模型单价、上下文和工具调用三个维度。",
    faq: [
      { question: "哪个 Coding Agent 最便宜？", answer: "取决于任务类型和所选模型。Haiku 类低价模型适合简单任务，Opus 类高价模型适合复杂任务。需要分别测试才能得出结论。" },
      { question: "Claude Opus 比 Sonnet 贵多少？", answer: "Claude Opus 单价通常是 Sonnet 的 3-5 倍，Haiku 是 Sonnet 的 1/10。具体单价以中转平台或官方定价为准。不同模型适合不同复杂度的任务。" },
    ],
    relatedLinks: [
      { title: "Claude Code Token 成本", url: "/claude-code-token-cost/", reason: "Claude Code 成本详解" },
      { title: "Kilo Code vs Cline", url: "/kilo-code-vs-cline/", reason: "两个工具对比" },
      { title: "OpenClaw 是什么？", url: "/openclaw-shi-shenme/", reason: "OpenClaw 基本概念" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/coding-agent-token-cost/",
  },

  // 14. tushengshipin-api
  {
    slug: "tushengshipin-api",
    url: "/tushengshipin-api/",
    cluster: "image-video-api",
    targetKeyword: "图生视频 API",
    title: "图生视频 API 接入指南：即梦、可灵、Seedance 与万相",
    metaDescription:
      "介绍图生视频 API 的接入方式，包括即梦、可灵、Seedance、万相等国内模型的 API Key、Base URL、计费方式和异步任务处理。",
    h1: "图生视频 API 接入指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "图生视频 API 以图片为输入，通过 AI 生成视频。国内即梦、可灵、Seedance、万相等均提供图生视频能力，计费方式多样，需小额测试确认实际扣费。",
    audience: ["想接入图生视频 API 的开发者", "关心图像视频 API 计费的用户"],
    conceptExplanation: "图生视频 API 接受图片 URL 或 base64 作为输入，输出视频 URL。不同服务商的模型能力、计费方式和可用性差异较大。",
    setupOrCheckSteps: [
      "在目标服务商注册账号并获取 API Key",
      "确认服务商支持的图生视频模型",
      "配置 Base URL（如需要）",
      "用小额测试图生视频生成，观察扣费",
      "测试异步任务：提交 → 轮询/回调 → 获取结果",
    ],
    commonErrors: ["API Key 无权限", "图片格式不支持", "模型不在可用列表", "超时处理不当"],
    riskNotes: [
      "视频生成通常比文本生成更贵，以服务商定价为准。",
      "失败扣费结合 request_id、usage 和后台记录判断。",
      "以当前服务商后台的可用性为准，模型可能随时变化。",
    ],
    whenToUseAIApiDoctor: "图生视频 API 配置后检测接口可用性。",
    whenToUseLinkAI: "在 LinkAI 查看是否有图生视频模型支持。",
    aiSummary: "图生视频 API 接入需要区分服务商、确认计费方式和异步任务处理流程。",
    faq: [
      { question: "图生视频 API 和文生视频 API 哪个更贵？", answer: "图生视频通常比文生视频更贵，因为需要处理输入图片和生成视频两个步骤。具体价格以各服务商定价为准。" },
      { question: "图生视频 API 支持哪些图片格式？", answer: "常见支持 JPG、PNG、WebP 等主流格式，具体以各服务商 API 文档为准。图片尺寸也可能有限制，超出限制需要先预处理。" },
    ],
    relatedLinks: [
      { title: "视频生成 API", url: "/shipin-shengcheng-api/", reason: "视频生成 API 完整指南" },
      { title: "即梦 API", url: "/jimeng-api/", reason: "字节即梦 API 接入" },
      { title: "可灵 API", url: "/keling-api/", reason: "可灵 API 接入" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/tushengshipin-api/",
  },

  // 15. jimeng-api
  {
    slug: "jimeng-api",
    url: "/jimeng-api/",
    cluster: "image-video-api",
    targetKeyword: "即梦 API",
    title: "即梦 API 接入指南：字节图像视频生成与 SDK 使用",
    metaDescription:
      "介绍字节即梦（Jimuage）图像和视频生成 API 的接入方式，包括 API Key、SDK 使用、计费单位和当前可用性。",
    h1: "即梦 API 接入指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "即梦是字节跳动的 AI 图像和视频生成产品，提供 API 接入方式。图生图、文生图、图片编辑等能力边界以官方文档为准。",
    audience: ["想接入即梦 API 的开发者", "使用字节 AI 产品的用户"],
    conceptExplanation: "即梦（字节跳动旗下）提供图像和视频生成 API，支持文生图、图生图等能力。API 能力和定价以官方文档为准，国内访问通常无网络限制。",
    setupOrCheckSteps: [
      "在即梦平台注册并获取 API Key",
      "查阅官方 API 文档确认接口格式",
      "用小额测试生成图片或视频",
      "观察实际扣费和生成质量",
    ],
    commonErrors: ["API Key 无权限", "接口格式与文档不符", "生成失败但已扣费"],
    riskNotes: [
      "以当前官方文档和后台可用性为准。",
      "检测结果用于辅助判断，不等于绝对可用结论。",
    ],
    whenToUseAIApiDoctor: "即梦 API 配置异常时检测接口可用性。",
    whenToUseLinkAI: "在 LinkAI 查看是否有图像视频模型支持。",
    aiSummary: "即梦 API 接入需要以官方文档和后台可用性为准，小额测试确认计费和生成质量。",
    faq: [
      { question: "即梦 API 国内可以直接用吗？", answer: "可以。字节跳动是国内公司，即梦 API 在国内访问通常无网络限制。" },
      { question: "即梦 API 和其他图像 API 有什么区别？", answer: "即梦基于字节自研模型，在中文理解和图像生成方面有优化。具体能力边界以官方文档为准，不同版本模型能力可能随时升级。" },
    ],
    relatedLinks: [
      { title: "视频生成 API", url: "/shipin-shengcheng-api/", reason: "视频生成 API 完整指南" },
      { title: "图片生成 API", url: "/tupian-shengcheng-api/", reason: "图片生成 API 接入" },
      { title: "GPT Image API", url: "/gpt-image-api/", reason: "GPT Image API 接入" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/jimeng-api/",
  },

  // 16. keling-api
  {
    slug: "keling-api",
    url: "/keling-api/",
    cluster: "image-video-api",
    targetKeyword: "可灵 API",
    title: "可灵 API 接入指南：快手视频生成与计费方式",
    metaDescription:
      "介绍快手可灵视频生成 API 的接入方式，包括 API Key、计费单位（credit/秒）和当前可用性判断。",
    h1: "可灵 API 接入指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "可灵是快手的 AI 视频生成产品，提供 API 接入方式。视频生成通常按秒或 credit 计费，建议先用小额测试确认实际成本。",
    audience: ["想接入可灵 API 的开发者", "关注视频生成成本的用户"],
    conceptExplanation: "可灵（快手旗下）是 AI 视频生成工具，支持 API 接入，按视频秒数或平台 credit 计费。国内可用性较高，但 API 能力和定价以官方为准。",
    setupOrCheckSteps: [
      "在可灵平台注册并获取 API Key",
      "确认计费单位和单价",
      "用 1-5 秒视频小额测试",
      "观察实际扣费和生成质量",
    ],
    commonErrors: ["API Key 权限不足", "计费单位理解错误", "超时处理不当"],
    riskNotes: [
      "视频生成比文本贵，以服务商定价为准。",
      "以当前官方文档和后台可用性为准。",
    ],
    whenToUseAIApiDoctor: "可灵 API 配置后检测接口可用性。",
    whenToUseLinkAI: "在 LinkAI 查看是否有视频生成模型支持。",
    aiSummary: "可灵 API 接入核心是确认计费单位和实际生成质量。",
    faq: [
      { question: "可灵 API 国内可以直接用吗？", answer: "可以。快手是国内公司，可灵 API 在国内访问通常无网络限制。" },
      { question: "可灵 API 的视频分辨率有哪些选择？", answer: "不同版本模型支持的分辨率不同，具体以官方 API 文档为准。高分辨率通常意味着更高的生成成本。" },
    ],
    relatedLinks: [
      { title: "视频生成 API", url: "/shipin-shengcheng-api/", reason: "视频生成 API 完整指南" },
      { title: "图片生成 API", url: "/tupian-shengcheng-api/", reason: "图片生成 API" },
      { title: "即梦 API", url: "/jimeng-api/", reason: "即梦 API 接入" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/keling-api/",
  },

  // 17. gpt-image-api
  {
    slug: "gpt-image-api",
    url: "/gpt-image-api/",
    cluster: "image-video-api",
    targetKeyword: "GPT Image API",
    title: "GPT Image API 接入指南：DALL-E 与 OpenAI 图像生成",
    metaDescription:
      "介绍 GPT Image（DALL-E）API 的接入方式，包括 API Key、Base URL（需中转）、模型名、计费方式和国内可用性判断。",
    h1: "GPT Image API 接入指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "GPT Image API（基于 DALL-E）是 OpenAI 的图像生成 API，通过中转服务在国内可用。需注意 API Key、Base URL、模型名和按张计费的方式。",
    audience: ["想接入 GPT Image API 的开发者", "使用 OpenAI 图像生成的用户"],
    conceptExplanation: "GPT Image API（DALL-E）是 OpenAI 的图像生成接口，国内无法直连，需通过中转服务访问。按生成图片数量和分辨率计费。",
    setupOrCheckSteps: [
      "在支持 DALL-E 的中转平台注册并获取 API Key",
      "获取中转 Base URL",
      "确认模型名称（如 dall-e-3）",
      "用小额生成测试，观察按张计费",
    ],
    commonErrors: ["中转 Base URL 填错", "API Key 权限不足", "混淆了中转 API 和官方 API 能力"],
    riskNotes: [
      "以当前中转平台定价和可用性为准。",
      "检测结果用于辅助判断，不等于绝对安全或绝对可用结论。",
    ],
    whenToUseAIApiDoctor: "GPT Image API 配置后用 AI API Doctor 检测接口可用性。",
    whenToUseLinkAI: "在 LinkAI 查看是否有图像生成模型支持。",
    aiSummary: "GPT Image API 需通过中转访问，核心是确认中转 Base URL、API Key 和按张计费方式。",
    faq: [
      { question: "GPT Image API 国内能用吗？", answer: "OpenAI 官方 API 国内无法直连，需通过中转服务。不同中转的可用性和定价差异较大，建议先小额测试。" },
      { question: "GPT Image 按什么计费？", answer: "通常按生成图片数量和分辨率计费。DALL-E 3 比 DALL-E 2 贵很多。具体价格以中转平台定价为准。" },
    ],
    relatedLinks: [
      { title: "图片生成 API", url: "/tupian-shengcheng-api/", reason: "图片生成 API 完整指南" },
      { title: "视频生成 API", url: "/shipin-shengcheng-api/", reason: "视频生成 API 完整指南" },
      { title: "即梦 API", url: "/jimeng-api/", reason: "国内图像 API 替代方案" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/gpt-image-api/",
  },

  // 18. tupian-shengcheng-api
  {
    slug: "tupian-shengcheng-api",
    url: "/tupian-shengcheng-api/",
    cluster: "image-video-api",
    targetKeyword: "图片生成 API",
    title: "图片生成 API 接入指南：官方 API、第三方聚合与可用性判断",
    metaDescription:
      "系统介绍图片生成 API 的接入方式，区分官方 API、第三方聚合 API、产品网页能力，解释文生图、图生图、图片编辑的 API Key、Base URL、计费单位（token/credit/张）和小额测试策略。",
    h1: "图片生成 API 接入指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "图片生成 API 分为官方 API、第三方聚合和国内服务三类。计费单位可能是 token、credit 或按张计费。视频生成 API 的接入需要区分官方和第三方服务，以服务商后台为准确认可用性。",
    audience: ["想接入图片生成 API 的开发者", "关心图像生成计费的用户"],
    conceptExplanation: "图片生成 API 市场分为：官方 API（如 DALL-E、Midjourney）、第三方聚合（如 Replicate）、国内服务（即梦、万相、海螺等）。不同类型在接口格式、计费方式和可用性上差异很大。",
    setupOrCheckSteps: [
      "确认要使用的图片生成服务商",
      "获取 API Key 和 Base URL（如需要）",
      "确认计费单位（token / credit / 张）",
      "用小额生成测试，观察实际扣费",
      "以服务商官方文档和后台为准确认最新定价",
    ],
    commonErrors: ["混淆了官方 API 和聚合 API 能力", "计费单位理解错误", "API 能力与网页能力不一致"],
    riskNotes: [
      "以当前官方文档或服务商后台为准，价格可能随时调整。",
      "检测结果用于辅助判断，不等于绝对可用结论。",
    ],
    whenToUseAIApiDoctor: "图片生成 API 配置后检测接口可用性。",
    whenToUseLinkAI: "在 LinkAI 查看图像生成模型支持情况。",
    aiSummary: "图片生成 API 接入需区分服务商类型和计费单位，小额测试确认实际成本。",
    faq: [
      { question: "图片生成 API 和视频生成 API 计费一样吗？", answer: "不一样。图片通常按张或 credit 计费，视频通常按秒或任务计费。视频生成通常比图片生成贵得多。" },
      { question: "国内有哪些图片生成 API？", answer: "即梦（字节）、万相（阿里）、海螺（字节）、Midjourney（需中转）、DALL-E（需中转）等。具体可用性以各平台官方文档为准。" },
    ],
    relatedLinks: [
      { title: "视频生成 API", url: "/shipin-shengcheng-api/", reason: "视频生成 API 完整指南" },
      { title: "即梦 API", url: "/jimeng-api/", reason: "即梦 API 接入" },
      { title: "GPT Image API", url: "/gpt-image-api/", reason: "DALL-E API 接入" },
    ],
    primaryCTA: { label: "去 AI API Doctor 检测 API 配置", url: "https://aiapidoctor.com/" },
    secondaryCTA: { label: "注册 LinkAI，领取 $2 免费福利", url: "https://api1.link-ai.cc/register" },
    pricingCTA: { label: "查看 LinkAI 模型价格", url: "https://api1.link-ai.cc/pricing" },
    canonical: "https://aiapiradar.com/tupian-shengcheng-api/",
  },

  // 19. mcp-shi-shenme (existing)
  {
    slug: "mcp-shi-shenme",
    url: "/mcp-shi-shenme/",
    cluster: "mcp",
    targetKeyword: "MCP 是什么",
    title: "MCP 是什么？模型上下文协议简介与常见配置场景",
    metaDescription: "用中文介绍 MCP（模型上下文协议）是什么，适合谁用，以及在 Cursor、Claude Desktop、Cline 等工具中的配置基础。",
    h1: "MCP 是什么？",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "MCP（Model Context Protocol，模型上下文协议）是一种让 AI 模型与外部工具、数据源交互的标准协议。配置 MCP 需要注意 API Key 权限、环境变量安全和服务器来源可靠性。",
    audience: ["想了解 MCP 是什么的开发者", "想在 Cursor 或 Claude Desktop 中配置 MCP 的用户", "关心 MCP 安全风险的开发者"],
    conceptExplanation: "MCP（Model Context Protocol，模型上下文协议）是由 Anthropic 提出的开放协议，旨在让 AI 模型能够以标准化的方式与外部工具、API、数据源交互。简单来说，MCP 相当于 AI 模型的「USB 接口」——有了 MCP，AI 模型可以通过统一的协议调用各种外部工具，而不需要为每个工具单独集成。",
    setupOrCheckSteps: ["确认要配置的 MCP Server 来源是否可靠", "查看 MCP Server 需要的 API Key 类型和权限范围", "在 Claude Desktop 或 Cursor 中配置 MCP Server 地址", "设置必要的环境变量（如 API Key）", "测试 MCP 工具调用是否正常返回", "检查 MCP 是否有日志记录，以及日志记录的范围", "确认不需要给 MCP 过多权限，只提供必要的凭证"],
    commonErrors: ["给 MCP Server 配置了权限过大的 API Key", "使用了来源不明的 MCP Server", "没有检查 MCP Server 是否支持目标工具"],
    riskNotes: ["MCP Server 可见你的请求内容和返回数据。", "只给必要的权限，不要用主 API Key 配置 MCP。", "检测结果用于辅助判断，不等于绝对安全结论。"],
    whenToUseAIApiDoctor: "如果 MCP 出现连接失败或工具调用异常，可以用 AI API Doctor 检测基础 API 配置是否正确。",
    whenToUseLinkAI: "在 LinkAI 查看支持的模型和 API 配置方式，结合 MCP 的工具调用需求选择合适的模型。",
    aiSummary: "MCP 是让 AI 模型与外部工具交互的协议标准。配置 MCP 时需要注意 API Key 权限、环境变量安全和服务器来源可靠性。",
    faq: [
      { question: "MCP 和普通 API 调用有什么区别？", answer: "普通 API 调用是程序员手动写的代码调用；MCP 则是一种协议标准，让 AI 模型本身能够动态发现和调用工具，无需预先硬编码。" },
      { question: "MCP API Key 有什么风险？", answer: "如果 MCP Server 被恶意篡改或来源不可靠，你的 API Key 可能被记录或滥用。建议使用单独的、权限受限的 API Key 配置 MCP。" },
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

  // 20. cursor-mcp (existing)
  {
    slug: "cursor-mcp",
    url: "/cursor-mcp/",
    cluster: "mcp",
    targetKeyword: "Cursor MCP",
    title: "Cursor MCP 配置教程：基础设置与安全注意事项",
    metaDescription: "介绍如何在 Cursor 中配置 MCP（模型上下文协议），包括 API Key 设置、server 地址配置和安全注意事项。",
    h1: "Cursor MCP 配置教程",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "在 Cursor 中配置 MCP 需要编辑配置文件，填入 MCP Server 地址和 API Key。建议检查 server 来源可靠性，不要用主 API Key，用完记得审计 usage 记录。",
    audience: ["想在 Cursor 中配置 MCP 的开发者", "使用 Cursor 作为主力编辑器的 AI 辅助编程用户"],
    conceptExplanation: "Cursor 是一个内置 AI 功能的代码编辑器，支持通过 MCP 协议接入第三方工具和服务。在 Cursor 中配置 MCP 后，AI 助手可以使用 MCP 提供的工具来完成代码生成、文件操作、API 调用等任务。Cursor 的 MCP 配置通过 JSON 配置文件实现，需要指定 server 的 command（启动命令）和 args（参数），以及环境变量中的 API Key。",
    setupOrCheckSteps: ["确认要使用的 MCP Server 的官方文档地址", "在 Cursor 设置中找到 MCP 配置入口", "编辑 MCP 配置文件，添加 server 的 command 和 args", "在环境变量中设置 API Key（不要直接写在配置里）", "保存配置并重启 Cursor 使其生效", "测试 MCP 工具是否能正常调用", "定期检查 usage 记录，确认没有异常调用"],
    commonErrors: ["API Key 直接写在配置文件中导致泄露", "使用了未经审查的第三方 MCP Server", "没有给 MCP Server 分配最小权限的 API Key"],
    riskNotes: ["不要用主账号 API Key 配置 MCP。", "只使用来源可信的 MCP Server。", "定期检查 usage 记录。"],
    whenToUseAIApiDoctor: "如果 Cursor 的 MCP 工具调用失败，可以用 AI API Doctor 检测底层 API 配置是否正确。",
    whenToUseLinkAI: "在 LinkAI 查看支持的模型和 API 配置，选择适合与 MCP 工具配合使用的模型。",
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

  // 21. claude-desktop-mcp (existing)
  {
    slug: "claude-desktop-mcp",
    url: "/claude-desktop-mcp/",
    cluster: "mcp",
    targetKeyword: "Claude Desktop MCP",
    title: "Claude Desktop MCP 配置教程：连接第三方工具",
    metaDescription: "介绍如何在 Claude Desktop 中配置 MCP（模型上下文协议），包括 server 配置、API Key 设置和安全检查。",
    h1: "Claude Desktop MCP 配置教程",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "Claude Desktop 通过 JSON 配置文件添加 MCP Server。需要配置 server 的 command、args 和环境变量，确保 API Key 安全且权限最小化。",
    audience: ["Claude Desktop 用户", "想扩展 Claude 能力的用户"],
    conceptExplanation: "Claude Desktop 是 Anthropic 官方的桌面客户端，支持通过 MCP 协议接入外部工具和服务。配置 MCP 后，Claude 可以调用这些工具来辅助回答问题、完成任务。Claude Desktop 的 MCP 配置存储在 JSON 文件中，通过 mcpServers 字段定义每个 MCP Server 的启动方式和凭证。",
    setupOrCheckSteps: ["找到 Claude Desktop 的 MCP 配置文件路径", "创建或编辑 mcpServers 配置节点", "指定 MCP Server 的 command（命令）和 args（参数）", "在 env 字段中安全地设置 API Key（通过环境变量引用）", "保存配置并重启 Claude Desktop", "测试 MCP 工具是否出现在工具列表中", "验证工具调用结果是否符合预期"],
    commonErrors: ["API Key 直接明文写在配置中", "command 路径填写错误导致 server 无法启动", "args 中的 URL 末尾多了斜杠导致连接失败"],
    riskNotes: ["Claude Desktop 的 MCP 配置可见 API Key 内容，需要确保文件权限安全。", "使用最小权限的 API Key。", "不要安装来源不明的 MCP Server。"],
    whenToUseAIApiDoctor: "Claude Desktop MCP 调用失败时，用 AI API Doctor 检测底层 API 连通性。",
    whenToUseLinkAI: "在 LinkAI 查看 API 配置方式和可用模型，作为 MCP 工具后端的选择参考。",
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

  // 22. cline-mcp (existing)
  {
    slug: "cline-mcp",
    url: "/cline-mcp/",
    cluster: "mcp",
    targetKeyword: "Cline MCP",
    title: "Cline MCP 配置教程：扩展 AI 编程能力",
    metaDescription: "介绍如何在 Cline（VSCode 插件）中配置 MCP，包括 API Key 设置、server 配置和安全建议。",
    h1: "Cline MCP 配置教程",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "Cline 是 VSCode 中的 AI 编程助手插件，支持 MCP 协议扩展功能。配置时需要正确填写 server 地址和 API Key，注意凭证安全。",
    audience: ["VSCode + Cline 用户", "想扩展 AI 编程能力的开发者"],
    conceptExplanation: "Cline 是一个在 VSCode 中运行的 AI 编程助手插件，支持通过 MCP 协议接入外部工具和数据源。与 Cursor MCP 类似，Cline 也通过配置文件管理 MCP Server。",
    setupOrCheckSteps: ["在 Cline 设置中打开 MCP 配置页面", "添加新的 MCP Server，填写 name、command 和 args", "通过环境变量或安全存储设置 API Key", "测试 MCP 工具是否在 Cline 的工具列表中可见", "验证工具调用结果"],
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

  // 23. chatgpt-mcp-server (existing)
  {
    slug: "chatgpt-mcp-server",
    url: "/chatgpt-mcp-server/",
    cluster: "mcp",
    targetKeyword: "ChatGPT MCP Server",
    title: "ChatGPT MCP Server 配置与使用教程",
    metaDescription: "介绍 ChatGPT 的 MCP Server 配置方式，如何连接第三方工具，以及配置时的安全注意事项。",
    h1: "ChatGPT MCP Server 配置教程",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "ChatGPT 通过 MCP 协议支持接入外部工具和服务。配置时需要注意 API Key 安全和 server 来源可靠性。",
    audience: ["ChatGPT Plus/Pro 用户", "想扩展 ChatGPT 能力的用户"],
    conceptExplanation: "OpenAI 为 ChatGPT 提供了 MCP 支持，允许通过 MCP Server 连接外部数据源和工具。配置方式和 Claude Desktop 类似，通过 JSON 配置文件管理 server 连接。",
    setupOrCheckSteps: ["确认 ChatGPT 账号已开启 MCP 支持", "获取要配置的 MCP Server 的官方地址和文档", "在 ChatGPT MCP 配置中填入 server 地址和认证信息", "测试工具调用是否正常工作"],
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

  // 24. mcp-api-key-anquan (existing)
  {
    slug: "mcp-api-key-anquan",
    url: "/mcp-api-key-anquan/",
    cluster: "mcp",
    targetKeyword: "MCP API Key 安全",
    title: "MCP API Key 安全配置指南：权限最小化与凭证保护",
    metaDescription: "解释 MCP 配置中 API Key 的安全风险，包括权限最小化、环境变量使用、凭证轮换和安全审计建议。",
    h1: "MCP API Key 安全配置指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "配置 MCP 时不要用主 API Key，应该用权限受限的专用 Key，通过环境变量引用，定期审计 usage 记录。",
    audience: ["关心 API Key 安全的开发者", "配置过 MCP 的用户"],
    conceptExplanation: "MCP Server 作为中间层能够看到所有请求内容，因此配置 MCP 时的 API Key 安全尤为重要。如果 API Key 被滥用或泄露，可能造成数据泄露或意外扣费。",
    setupOrCheckSteps: ["不要用主账号的主 API Key 配置 MCP", "在中转平台创建一个权限受限的专用 API Key", "只授权该 Key 访问必要的模型和接口", "通过环境变量引用 API Key，不要明文写在配置文件中", "定期检查 usage 记录，确认没有异常调用", "设置用量告警，超过阈值时自动通知", "不再使用时及时删除该 API Key"],
    commonErrors: ["主 API Key 直接写在配置文件里", "给 MCP 分配的权限过大（如管理员权限）", "从不检查 usage 记录", "API Key 泄露后没有及时轮换"],
    riskNotes: ["MCP Server 可见你的请求内容。", "API Key 泄露可能导致未授权使用。", "检测结果用于辅助判断，不等于绝对安全结论。"],
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

  // 25. mcp-security (existing)
  {
    slug: "mcp-security",
    url: "/mcp-security/",
    cluster: "mcp",
    targetKeyword: "MCP 安全",
    title: "MCP 安全指南：Server 来源、数据隐私与风险控制",
    metaDescription: "系统介绍 MCP（模型上下文协议）的安全风险，包括 Server 来源验证、数据隐私、API Key 保护和风险控制策略。",
    h1: "MCP 安全指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "MCP 安全的关键是验证 Server 来源、不用主 API Key、通过环境变量引用凭证、定期审计 usage 记录。",
    audience: ["关心 MCP 安全的开发者", "企业安全合规负责人"],
    conceptExplanation: "MCP 的安全风险主要来自三个方面：Server 来源可信度（是否被篡改）、数据可见性（MCP Server 可见所有请求内容）、凭证管理（API Key 是否被滥用）。",
    setupOrCheckSteps: ["优先使用官方或有信誉的 MCP Server", "检查 Server 的开源状态和代码审计记录", "使用权限受限的专用 API Key", "通过环境变量传递凭证，不要明文存储", "启用用量监控和异常告警", "定期审查已安装的 MCP Server 列表", "不再需要时及时移除配置"],
    commonErrors: ["安装来源不明的 MCP Server", "主 API Key 用于 MCP 配置", "从不审查 usage 记录"],
    riskNotes: ["MCP Server 可见你的请求和响应内容。", "选择 MCP Server 时需要评估其可信度。", "检测结果用于辅助判断，不等于绝对安全结论。"],
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

  // 26. claude-code-api-key (existing)
  {
    slug: "claude-code-api-key",
    url: "/claude-code-api-key/",
    cluster: "claude-code",
    targetKeyword: "Claude Code API Key",
    title: "Claude Code API Key 配置与安全指南",
    metaDescription: "介绍 Claude Code 中 API Key 的配置方式、来源选择、安全注意事项和环境变量管理。",
    h1: "Claude Code API Key 配置指南",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "Claude Code 需要通过 API Key 认证才能调用 AI 模型。建议通过环境变量设置 API Key，选择可靠的中转服务。",
    audience: ["Claude Code 用户", "配置 API Key 时遇到问题的用户"],
    conceptExplanation: "Claude Code 使用 API Key 进行身份认证。通过中转服务使用时，API Key 是中转平台的账号凭证；直接使用官方 API 时，API Key 是 Anthropic 平台的凭证。",
    setupOrCheckSteps: ["在配置 Claude Code 前先选择中转服务或官方 API", "获取平台提供的 API Key（不要泄露给他人）", "通过环境变量 ANTHROPIC_API_KEY 传入，不要写在配置文件中", "确认 API Key 有足够的权限和额度", "测试 API Key 是否能正常调用", "定期检查 usage 记录"],
    commonErrors: ["API Key 通过命令行参数明文传入（可能被 shell 历史记录）", "API Key 配置错误或包含多余空格", "使用了无效或过期的 API Key"],
    riskNotes: ["API Key 不要分享给他人。", "通过环境变量引用，不要明文存储。", "定期检查 usage 记录。"],
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

  // 27. claude-code-base-url (existing)
  {
    slug: "claude-code-base-url",
    url: "/claude-code-base-url/",
    cluster: "claude-code",
    targetKeyword: "Claude Code Base URL",
    title: "Claude Code Base URL 配置教程：API 地址填写指南",
    metaDescription: "介绍 Claude Code 中 Base URL 的配置方式，如何填写中转服务的 API 地址，以及常见填写错误和排查方法。",
    h1: "Claude Code Base URL 配置教程",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "Claude Code 配置 Base URL 时需要填写中转服务的 API 地址前缀，注意是否需要加 /v1、末尾斜杠是否需要，以及 model 字段的正确填写。",
    audience: ["Claude Code 用户", "配置 Base URL 时遇到问题的用户"],
    conceptExplanation: "Claude Code 通过 Base URL 确定 API 请求的目标地址。国内用户通过中转服务使用时，需要填写中转服务提供的 Base URL，让请求先发往中转站再转发给官方 API。",
    setupOrCheckSteps: ["从可靠的中转服务获取 Base URL", "确认 Claude Code 要求填写的格式（是否需要 /v1）", "在 Claude Code 配置文件中正确填写 Base URL", "确认 model 字段填写的是模型 id（如 claude-sonnet-4-20250514）", "用小额请求测试连通性", "查看 LinkAI 模型价格，确认支持的模型"],
    commonErrors: ["Base URL 末尾多加了 /v1 导致路径重复", "model 字段填写了模型名称而非模型 id", "Base URL 使用了 http 而非 https", "中转服务本身不可用（先检查中转站状态）"],
    riskNotes: ["用 /v1/models 确认模型是否可见。", "检测结果用于辅助判断，不等于绝对安全结论。", "先小额测试。"],
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

  // 28. v1-models (existing)
  {
    slug: "v1-models",
    url: "/v1-models/",
    cluster: "base-url",
    targetKeyword: "/v1/models",
    title: "/v1/models 能检查什么？模型列表、权限与 API 配置验证",
    metaDescription: "详细解释 /v1/models API 端点的用途，如何用它检查中转服务支持的模型、验证 API Key 权限，以及排查配置问题。",
    h1: "/v1/models 能检查什么？",
    pageType: "guide",
    status: "scaffold",
    quickAnswer: "/v1/models 是 OpenAI-compatible API 的标准端点，调用它可以查看当前 API Key 有权限访问的模型列表，用于验证配置是否正确。",
    audience: ["配置 API 时需要验证模型可用性的用户", "遇到「model not found」错误的用户", "想确认 API Key 权限的用户"],
    conceptExplanation: "/v1/models 是 OpenAI-compatible API 体系中的标准端点，向该端点发送 GET 请求会返回一个模型列表，每个模型包含 id、object、created、owned_by 等字段。主要用途：验证 API Key 是否有效、确认模型是否可用、查看可用的模型 id、辅助排查配置问题。",
    setupOrCheckSteps: ["确认 Base URL 和 API Key 填写正确", "发送 GET 请求到 {Base URL}/v1/models", "检查返回状态码：200 表示正常，401 表示认证失败，404 表示端点不存在", "在返回的模型列表中查找你要用的模型 id", "如果模型列表为空，检查 Base URL 是否正确", "如果认证失败，检查 API Key 是否有效", "确认模型 id 与你要用的名称是否匹配"],
    commonErrors: ["Base URL 末尾多加了 /v1，导致路径变成 /v1/v1/models", "API Key 填错或已过期", "中转服务不支持 /v1/models 端点", "模型名称和模型 id 不匹配"],
    riskNotes: ["通过 /v1/models 检查配置是基础验证手段，但不能替代实际小额测试。", "第三方工具 UI 可能变化，以当前版本为准。", "检测结果用于辅助判断，不等于绝对安全结论。"],
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
];
