import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import webExtension from 'vite-plugin-web-extension';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.startsWith('m3e-'),
				},
			},
		}),
		vueDevTools(),
		webExtension({
			manifest: './manifest.json',
			browser: 'chrome',
			additionalInputs: ['src/scripts/block.ts', 'src/assets/css/block.css'],
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
