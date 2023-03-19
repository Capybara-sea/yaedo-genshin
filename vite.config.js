const vuePlugin = require('@vitejs/plugin-vue')
const Path = require('path')
const { defineConfig } = require('vite')
import AutoImport from 'unplugin-auto-import/vite'

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
      dts: 'types/auto-imports.d.ts',
      imports: ['vue'],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ],
})

module.exports = config
