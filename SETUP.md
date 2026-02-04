# InvestIQ - Investment Advisor Website ✅ 已完成

## 项目状态

✅ **项目创建完成**
- Next.js 14 网站已创建
- 所有文件已生成
- Git 仓库已初始化
- 本地 commit 已完成

⚠️ **GitHub 推送待完成**
- 需要手动创建 GitHub 仓库
- 或使用有完整权限的 GitHub token

---

## 📁 项目位置

```
/Users/bot/.openclaw/workspace/investment-advisor
```

---

## 🚀 如何使用

### 1. 本地运行

```bash
cd /Users/bot/.openclaw/workspace/investment-advisor

# 安装依赖（如果还没有）
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 2. 推送到 GitHub

**选项 A：手动创建仓库**
1. 访问 https://github.com/new
2. 创建名为 `investment-advisor` 的仓库
3. 运行：
```bash
cd /Users/bot/.openclaw/workspace/investment-advisor
git remote add origin https://github.com/你的用户名/investment-advisor.git
git push -u origin main
```

**选项 B：更新 GitHub Token**
需要创建一个有 `repo` 权限的新 token。

### 3. 部署到 Cloudflare Pages

**方式 1：通过 Cloudflare Dashboard**
1. 登录 Cloudflare Dashboard
2. 进入 Pages > Create a project
3. 连接 GitHub 仓库
4. 构建设置：
   - 构建命令：`npm run build`
   - 输出目录：`out`

**方式 2：使用 Wrangler CLI**
```bash
npm install -g wrangler
wrangler login
wrangler pages deploy out --project-name=investment-advisor
```

---

## 🎨 功能特性

### 核心功能
- ✅ 投资策略计算器
- ✅ 三种风险等级（保守、平衡、激进）
- ✅ 动态资产分配可视化
- ✅ 投资组合明细
- ✅ 响应式设计
- ✅ 深色模式支持

### 页面结构
- 🏠 **首页**
  - Hero section with stats
  - 投资计算器表单
  - 策略结果展示
  - 资产分配条形图
  - 投资金额明细

### 技术栈
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hooks (useState)

---

## 📝 文件清单

```
investment-advisor/
├── app/
│   ├── globals.css        # 全局样式 + Tailwind
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面（13,330 行）
├── .gitignore             # Git 忽略规则
├── next.config.js         # Next.js 配置
├── package.json           # 项目依赖
├── postcss.config.js      # PostCSS 配置
├── README.md              # 项目说明
├── tailwind.config.ts     # Tailwind 配置
├── tsconfig.json          # TypeScript 配置
└── wrangler.toml          # Cloudflare Pages 配置
```

---

## 🎯 下一步

1. **测试本地网站**
   ```bash
   cd /Users/bot/.openclaw/workspace/investment-advisor
   npm run dev
   ```

2. **推送到 GitHub**（选择一种方式）
   - 手动创建仓库
   - 或更新 GitHub token

3. **部署到 Cloudflare Pages**
   - 使用 GitHub 集成（自动部署）
   - 或使用 Wrangler CLI（手动部署）

4. **语音修改演示准备**
   - 测试所有交互功能
   - 录制演示视频
   - 准备语音修改对比

---

*项目创建时间: 2026-02-04*
*状态: 🟢 开发完成，待部署*
