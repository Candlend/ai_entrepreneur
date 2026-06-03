# 健康饮食助手 MVP

基于 AI 的食物识别和热量计算应用 - 精美移动端优化版

## ✨ 功能特点

- 📸 **智能拍照识别**：使用 Claude Vision API 识别食物种类和重量
- 🔢 **精准热量计算**：结合本地食物数据库提供准确的营养数据
- 📊 **今日摘要展示**：实时追踪每日热量和营养素摄入
- 💪 **营养素分析**：显示蛋白质、碳水化合物、脂肪的详细数据
- 📱 **移动端优化**：完美适配 iPhone、Android 和平板设备
- 🎨 **精美设计**：现代渐变配色、玻璃拟态效果、流畅动画

## 🎨 设计亮点

- **响应式设计**：完美支持从 iPhone SE (375px) 到 iPad (768px+) 的所有屏幕尺寸
- **触摸优化**：所有按钮符合 44px 最小触摸目标标准
- **视觉效果**：
  - 渐变背景和圆形进度指示器
  - 玻璃拟态卡片效果（backdrop-blur）
  - 平滑的 CSS 动画（shake、slideUp、fadeIn 等）
  - Emoji 图标增强用户体验
- **交互体验**：
  - 拖拽上传或相机拍照
  - 悬停和激活状态反馈
  - 实时加载状态显示
  - 友好的空状态引导

## 🛠 技术栈

- **前端框架**: Next.js 15 + React 19 + TypeScript
- **样式**: Tailwind CSS v4
- **AI 模型**: Claude 3.5 Sonnet (Vision API)
- **状态管理**: React Hooks
- **文件上传**: react-dropzone
- **测试**: Playwright (移动端测试)

## 快速开始

### 1. 环境要求

- Node.js 18+ 
- npm 或 yarn

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
CLAUDE_API_KEY=your_claude_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 5. 运行移动端测试

```bash
npm install --save-dev playwright
npx playwright install chromium
node test-mobile.mjs
```

测试覆盖设备：
- iPhone SE (375x667)
- iPhone 12 Pro (390x844)
- Pixel 5 (393x851)
- iPad Mini (768x1024)

## 📂 项目结构

```
health-management-app/
├── app/
│   ├── api/
│   │   └── food-recognition/  # 食物识别 API
│   ├── page.tsx               # 主页面（今日摘要）
│   ├── layout.tsx             # 应用布局
│   └── globals.css            # 全局样式和动画
├── components/
│   └── FoodCamera.tsx         # 拍照上传组件
├── data/
│   └── food_database.json     # 本地食物数据库
├── test-mobile.mjs            # 移动端自动化测试
└── .env.local                 # 环境变量配置
```

## ✅ 测试通过

所有移动端测试已通过：
- ✓ 响应式布局正确显示
- ✓ 触摸目标尺寸符合标准（≥44px）
- ✓ 所有交互元素可点击
- ✓ 渐变和玻璃拟态效果正常
- ✓ 动画流畅运行
- ✓ 生产构建成功

## MVP 限制

当前 MVP 版本的限制：

- ⚠️ 无用户账号系统（数据仅保存在浏览器内存中）
- ⚠️ 无数据持久化（刷新页面数据丢失）
- ⚠️ 食物数据库有限（仅12种常见食物）
- ⚠️ 无体重记录功能
- ⚠️ 无外卖推荐功能

## 成本估算

**API 成本**（基于 Claude 3.5 Sonnet）:
- 图像识别：约 $0.024/次
- 100 用户/天 × 5 次 = $12/天
- **月成本**：约 $360-400

---

**注意**：本项目为 MVP 演示版本，仅供学习和展示使用。
