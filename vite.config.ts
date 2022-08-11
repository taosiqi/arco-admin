import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import unoCss from 'unocss/vite'
import path from "path";
// import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-ignore
const resolve = dir => {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueJsx({}),
    unoCss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      rules: []
    })
  ],
  base: "./", //开发或生产环境服务的公共基础路径
  server: {
    https: false, // 是否开启 https
    open: true, // 是否自动在浏览器打开
    port: 8000, // 端口号
    host: "0.0.0.0",
    // 跨域代理
    proxy: {
      "/api": {
        target: "https://www.fastmock.site/mock/2c72ce673f122b20bdb3f4daa85ea6be/white", // 后台接口
        changeOrigin: true,
        // secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        // 截取api，并用api代替
      }
    }
  },
  build: {
    outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境去除 console
        drop_debugger: true // 生产环境去除 debugger
      }
    },
    chunkSizeWarningLimit: 1500 // chunk 大小警告的限制（以 kbs 为单位）
  },
  resolve: {
    alias: {
      '@': path.resolve('src') // 设置 `@` 指向 `src` 目录
    },
  },
  define: {
    // 定义全局常量替换方式：字符串值将直接作为一个表达式，所以如果需要定义一个字符串常量，它需要被显式地引用（例如：通过 JSON.stringify）
    // 'BUILD_TIME': JSON.stringify(moment().format('YYYY-MM-DD HH:mm:ss')),
  },
  // 依赖优化选项
  optimizeDeps: {
    include: [
      // 不是位于node_modules直接目录下的包不会被预构建，使用此选项可强制预构建链接的包
    ],
  }
});
