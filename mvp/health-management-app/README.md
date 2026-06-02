# 健康饮食助手 MVP

基于 AI 的食物识别和热量计算应用

## 功能特点

- 📸 **智能拍照识别**：使用 Claude Vision API 识别食物种类和重量
- 🔢 **精准热量计算**：结合本地食物数据库提供准确的营养数据
- 📊 **今日摘要展示**：实时追踪每日热量和营养素摄入
- 💪 **营养素分析**：显示蛋白质、碳水化合物、脂肪的详细数据

## 技术栈

- **前端框架**: Next.js 15 + React 19
- **样式**: Tailwind CSS
- **AI 模型**: Claude 3.5 Sonnet (Vision API)
- **状态管理**: React Hooks
- **文件上传**: react-dropzone

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

## 项目结构

```
health-management-app/
├── app/
│   ├── api/
│   │   └── food-recognition/  # 食物识别 API
│   └── page.tsx               # 主页面
├── components/
│   └── FoodCamera.tsx         # 拍照上传组件
├── data/
│   └── food_database.json     # 本地食物数据库
└── .env.local                 # 环境变量配置
```

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
