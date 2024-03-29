const vuePlugin = require('@vitejs/plugin-vue')
const Path = require('path')
const { defineConfig } = require('vite')
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
  root: Path.join(__dirname, 'src', 'renderer'),
  publicDir: 'public',
  server: {
    port: 8080,
  },
  open: false,
  build: {
    outDir: Path.join(__dirname, 'build', 'renderer'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': Path.resolve(__dirname, 'src/renderer'),
    },
  },
  plugins: [
    vuePlugin(),
    AutoImport({
      dts: './types/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      dirs: ['./components'],
      dts: './types/components.d.ts',
      resolvers: [NaiveUiResolver()],
    }),
  ],
  optimizeDeps: {
    include: ['markdown-it'],
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: "@import '@/styles/variables.scss';",
  //     },
  //   },
  // },
})

module.exports = config
