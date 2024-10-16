import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 在此处添加其他配置
  server: {
    port: 3000,  // 指定开发服务器的端口号
    open: true,  // 启动开发服务器时自动打开浏览器
  },
  build: {
    outDir: 'dist',  // 构建输出目录
    sourcemap: true, // 是否生成 source map
  },
  base: process.env.NODE_ENV === 'production'
    ? ''/efolio/' '  // 替换为您的 GitHub 仓库名
    : '/',
})