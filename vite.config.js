const vuePlugin = require('@vitejs/plugin-vue')
const Path = require('path');
const { defineConfig } = require('vite')

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
			"@": Path.resolve(__dirname, "src/renderer"),
		},
	},
    plugins: [vuePlugin()],
});

module.exports = config;
