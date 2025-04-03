import { defineNuxtConfig } from 'nuxt/config'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import '@unocss/nuxt'

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt', // 确保它在这里
    '@element-plus/nuxt',
  ],
  unocss: {
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({ scale: 1.2, extraProperties: { display: 'inline-block' } }),
    ],
    rules: [[/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) / 4}rem` })]],
    shortcuts: {
      btn: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
    },
  },
  css: ['../assets/css/global.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false, // 桌面应用无需 SSR
  typescript: { strict: true },
  app: { baseURL: './' }, // Electron 使用相对路径
})
