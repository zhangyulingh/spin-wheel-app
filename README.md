## 🎡 Nuxt 抽奖助手

Nuxt 抽奖助手是一款基于 **Vue 3、TypeScript 和 Nuxt.js 3** 开发的互动式抽奖应用，支持自定义主题、调整抽奖数据，并提供流畅的动画体验。

![抽奖助手预览](./public/images/nuxtImage.png)

### 🌟 核心功能

✅ **抽奖转盘** 🎯 —— 可自由调整奖项数量、名称及中奖概率，实现公平公正的抽奖体验。  
🎨 **主题自定义** —— 支持更换背景、调整颜色主题，让抽奖界面更具个性化。  
📊 **数据管理** —— 实时调整抽奖数据，设置中奖概率，确保灵活运营。  
🚀 **高效性能** —— 采用 **Nuxt 3 + Vite** 提供极致流畅的用户体验，支持 **SSR（服务器端渲染）** 和 **SSG（静态生成）**。

### 🛠 技术栈

- **Vue 3 + Composition API**
- **Nuxt 3**
- **TypeScript**
- **Tailwind CSS**

### 🚀 快速启动

````bash
# 安装依赖
npm install

# 运行开发环境
npm run dev

# 构建生产版本
npm run build

---

### ⚠️ **注意事项**
1. **GitHub README 中的本地路径不能直接访问 `public/`**
   - Nuxt 会将 `public/` 目录中的文件暴露在 `/` 目录下，因此你应该这样写：
     ```markdown
     ![抽奖助手预览](/images/screenshot.png)
     ```
   - 但 **GitHub README 不解析 `public/` 目录**，你可能需要将图片**上传到 GitHub 仓库**，然后引用 GitHub 上的图片 URL：
     ```markdown
     ![抽奖助手预览](https://raw.githubusercontent.com/your-username/repository-name/main/public/images/screenshot.png)
     ```
   - 或者在 `assets/` 目录下存放图片，并通过 Vue 组件加载。

如果你希望 README 在 GitHub 上能正常显示图片，建议你把图片**拖到 GitHub Issue 或仓库里**，然后复制它的在线链接！🚀
````
