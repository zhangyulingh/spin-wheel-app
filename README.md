# 🎡 Nuxt 抽奖助手（支持 Electron 桌面端）

Nuxt 抽奖助手是一款基于 **Vue 3、TypeScript 和 Nuxt.js 3** 开发的互动式抽奖应用，现已支持 **Electron 桌面端**！

✨ **核心功能**：

- 🎨 **自定义主题**：支持更换背景、Logo、按钮样式。
- 🔊 **自定义音效**：可设置旋转开始、停止时的音效，让抽奖更有氛围感。
- 🖥️ **桌面端支持**：集成 Electron，可作为独立应用运行。
- 🎡 **流畅旋转 & 真实物理效果**：带有动态高亮、精准停留等。
- 📱 **移动端适配**：支持 Web 和桌面端的响应式布局。

![抽奖助手预览](public/images/nuxtImage.jpg)

---

## 🚀 快速启动

```bash
# 安装依赖
pnpm install

# 运行 Web 版本
pnpm run dev

# 运行 Electron 桌面端
pnpm run electron:dev
```

---

## 🎯 超炫 Vue3 抽奖转盘 | Lucky Wheel 🚀

**Lucky Wheel** 是一款基于 **Vue 3 + TypeScript + Canvas** 开发的超丝滑 **抽奖转盘**，具备以下特性：

✅ **平滑旋转 & 精准停留**：旋转过程中智能减速，确保最终停留在目标奖项上。
✅ **动态高亮效果**：当前停留扇形会高亮显示，增强视觉体验。
✅ **真实物理模拟**：支持随机旋转圈数，避免固定模式，增加随机性。
✅ **音效反馈**：每次旋转都会触发音效，让抽奖更有沉浸感。
✅ **自定义奖项**：支持 **动态配置** 奖项、颜色、样式，灵活适配各种场景。
✅ **移动端 & 桌面端适配**：响应式布局，适配不同设备。

---

## 📦 配置自定义奖项 & 主题

### **🎁 自定义奖项**

在 `src/config/prizes.ts` 里修改 `prizes` 数组即可：

```ts
export const prizes = [
  { name: '一等奖 🏆', color: '#FFDD57' },
  { name: '二等奖 🎉', color: '#FF5733' },
  { name: '三等奖 🎁', color: '#33B5FF' },
  { name: '谢谢参与 🙏', color: '#999999' },
]
```

### **🎨 自定义背景 & Logo**

在 `public/config.json` 里修改：

```json
{
  "background": "public/images/bg.jpg",
  "logo": "public/images/logo.png"
}
```

### **🔊 自定义音效**

可替换 `public/sounds/spin.mp3` 和 `public/sounds/win.mp3` 以更改旋转和中奖音效。

---

## 🖥️ Electron 桌面版支持

项目已集成 Electron，可以打包成桌面应用：

### **运行 Electron 开发模式**

```bash
pnpm run electron:dev
```

### **打包桌面应用（Windows / Mac / Linux）**

```bash
pnpm run electron:build
```

---

## 🌍 适用场景

🎡 **电商抽奖活动** | 🏆 **公司年会抽奖** | 🎮 **游戏内抽奖** | 🎁 **在线福利赠送**

📌 **完全开源**，欢迎 **⭐ Star & Fork**！🔥 **快来试试，让你的抽奖更酷炫！** 🚀 [GitHub 地址](https://github.com/your-repo-url)

---

## 💖 赞助支持

如果你觉得这个项目对你有帮助，可以请我喝杯咖啡 ☕
你的每一份支持，都是对开源贡献的最大动力！ 🎉

|                    微信赞赏码                    |
| :----------------------------------------------: |
| <img src="public/images/4141.jpg" width="400" /> |

🚀 **A highly customizable lucky wheel for Vue 3, now with Electron desktop support!** 🎡🎉
