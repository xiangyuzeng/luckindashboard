# 瑞幸咖啡美国市场用户分析面板

Luckin Coffee US Market Analytics Dashboard

## 🚀 快速部署指南

### 方法一: 部署到 Vercel (推荐，最简单)

1. **将此项目推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/luckin-analytics.git
   git push -u origin main
   ```

2. **在 Vercel 部署**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 GitHub 仓库
   - 点击 "Deploy"
   - 几分钟后即可获得公开链接！

### 方法二: 部署到 Netlify

1. 推送到 GitHub (同上)
2. 访问 [netlify.com](https://netlify.com)
3. 点击 "New site from Git"
4. 选择你的仓库
5. Build command: `npm run build`
6. Publish directory: `build`
7. 点击 Deploy

### 方法三: 部署到 GitHub Pages

1. 安装 gh-pages: `npm install gh-pages --save-dev`
2. 在 package.json 中添加:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/luckin-analytics",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. 运行: `npm run deploy`

## 📁 项目结构

```
luckin-dashboard-deploy/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # 主应用组件 (包含两个面板)
│   └── index.js        # React 入口
├── package.json
└── README.md
```

## 💻 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build
```

## 📊 面板功能

### 快速概览 (Overview)
- 5个关键KPI指标卡
- 整体留存曲线
- 人均杯数趋势
- 用户生命周期流向概览

### 深度分析 (Detailed Analysis)
- **品牌留存**: Cohort热力图、散点图、留存曲线
- **品类转化**: 自我复购率、流失率、转化矩阵
- **用户流向**: Mind Map形式的生命周期分析

## 🔧 技术栈

- React 18
- Recharts (图表库)
- CSS-in-JS (内联样式)

## 📝 数据说明

- 数据周期: 2025年9月 - 12月
- 覆盖门店: 8家
- SKU数量: 71个
- 用户规模: 97万+

---

Made with ☕ for Luckin Coffee Analytics
