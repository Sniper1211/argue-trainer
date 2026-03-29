# Argue Trainer - AI吵架陪练/理性思辨训练平台

> 基于Vibe Coding实践的AI驱动沟通训练工具

## 🎯 产品愿景

帮助不善言辞的用户在冲突场景中提升理性思辨与情绪控制能力，通过AI模拟真实对话场景进行训练。

## ✨ 核心功能

### 1. 逻辑训练
- 识别常见逻辑谬误（偷换概念、人身攻击等）
- 提供有效反驳策略
- 逻辑思维训练模块

### 2. 情绪脱敏
- 模拟高压冲突环境
- 情绪状态识别与反馈
- 冷静保持训练

### 3. 策略选择
- 场景化应对策略（职场、亲密关系、消费维权）
- 策略建议与效果评估
- 个性化训练计划

## 🚀 技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **UI库**: Tailwind CSS + Shadcn/ui
- **状态管理**: Zustand
- **AI集成**: DeepSeek API

### 后端
- **运行时**: Node.js + Express (或Next.js API Routes)
- **数据库**: Supabase (PostgreSQL)
- **AI服务**: DeepSeek Chat API
- **部署**: Vercel

### 开发工具
- **代码质量**: ESLint, Prettier, TypeScript
- **测试**: Jest, React Testing Library
- **CI/CD**: GitHub Actions

## 📁 项目结构

```
argue-trainer/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # 可复用组件
│   ├── lib/                # 工具函数和配置
│   ├── styles/             # 全局样式
│   └── types/              # TypeScript类型定义
├── public/                 # 静态资源
├── docs/                  # 项目文档
└── tests/                 # 测试文件
```

## 🛠️ 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn 或 pnpm
- DeepSeek API密钥

### 安装步骤
```bash
# 克隆项目
git clone https://github.com/Sniper1211/argue-trainer.git
cd argue-trainer

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑.env.local文件，添加你的DeepSeek API密钥

# 启动开发服务器
npm run dev
```

### 环境变量
```env
DEEPSEEK_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📈 开发路线图

### Phase 1: MVP (1-2周)
- [ ] 基础对话界面
- [ ] DeepSeek API集成
- [ ] 3个基础场景模板
- [ ] 简单情绪反馈

### Phase 2: 功能完善 (2-3周)
- [ ] 用户系统
- [ ] 训练历史记录
- [ ] 进阶场景库
- [ ] 数据可视化报告

### Phase 3: 产品化 (3-4周)
- [ ] 移动端适配
- [ ] 社交分享功能
- [ ] 付费功能模块
- [ ] 多语言支持

## 🤝 贡献指南

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系与支持

- 项目主页: [https://github.com/Sniper1211/argue-trainer](https://github.com/Sniper1211/argue-trainer)
- 问题反馈: [GitHub Issues](https://github.com/Sniper1211/argue-trainer/issues)
- 功能建议: 通过Issue或Discussion提出

## 🙏 致谢

- 灵感来源: 小红书用户分享的"想找人帮忙练习吵架"需求
- AI技术支持: DeepSeek AI
- 开发方法论: Vibe Coding实践

---

**让每一次冲突都成为成长的机会**