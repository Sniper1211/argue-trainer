# Argue Trainer - AI沟通训练平台

纯前端实现的AI沟通训练工具，帮助提升理性思辨与情绪控制能力。

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/Sniper1211/argue-trainer.git
cd argue-trainer

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑.env.local，添加你的DeepSeek API密钥

# 启动开发服务器
npm run dev
```

## 📁 项目结构

```
argue-trainer/
├── src/app/
│   ├── page.tsx          # 主页面
│   └── api/chat/route.ts # AI API代理
├── public/              # 静态资源
└── package.json         # 依赖配置
```

## 🔧 技术栈

- **前端**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **AI**: DeepSeek API
- **部署**: Vercel (免费)

## 🎯 核心功能

- AI模拟对话训练
- 职场/亲密关系等场景
- 本地数据存储
- 响应式设计

## 🌐 部署到Vercel

1. 推送代码到GitHub
2. 在Vercel导入仓库
3. 配置环境变量 `DEEPSEEK_API_KEY`
4. 自动部署完成

## 📄 许可证

MIT