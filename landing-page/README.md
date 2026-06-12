# 轻食AI Landing Page

智能健康管理产品的营销落地页，用于收集预订单。

## 功能特点

- 🎨 现代化响应式设计
- 📱 移动端完美适配
- 📊 预订单数据收集
- 🚀 一键部署到Vercel

## 本地运行

```bash
# 安装依赖
npm install

# 启动服务器
npm start
```

访问: http://localhost:3000

## 部署到Vercel

### 方法1: Vercel CLI（推荐）

```bash
# 安装Vercel CLI（如果还没有）
npm install -g vercel

# 部署到生产环境
vercel --prod
```

### 方法2: Vercel Dashboard

1. 登录 https://vercel.com
2. 点击 "Import Project"
3. 导入此仓库
4. Vercel会自动检测配置并部署

## 查看预订单数据

访问: `https://your-domain.vercel.app/api/preorders`

## 文件结构

```
landing-page/
├── index.html          # 主页面
├── server.js           # Express服务器 + API
├── package.json        # 项目配置
├── vercel.json         # Vercel部署配置
├── preorders.json      # 预订单数据（自动生成）
└── README.md           # 本文件
```

## API接口

- `POST /api/preorder` - 提交预订单
- `GET /api/preorders` - 获取所有预订单（包含数量统计）

## 技术栈

- HTML5 + Tailwind CSS
- Node.js + Express
- Vercel Serverless Functions
