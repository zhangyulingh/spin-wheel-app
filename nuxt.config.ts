// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt', // 添加 UnoCSS 模块
    '@element-plus/nuxt',
  ],
  unocss: {
    presets: [
      presetUno(), // 直接导入并调用
      presetAttributify(),
      presetIcons({
        scale: 1.2,
        extraProperties: {
          display: 'inline-block',
        },
      }),
    ],
    rules: [[/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) / 4}rem` })]],
    shortcuts: {
      btn: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
    },
  },
  css: ['../assets/css/global.css'], // 可选：全局样式
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false, // 桌面应用无需 SSR
  typescript: {
    strict: true,
  },
  app: {
    baseURL: './', // Electron 使用相对路径
  },
})
