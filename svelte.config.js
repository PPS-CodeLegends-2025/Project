import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$modules: './module-map.json',
			$templates: './src/lib/templates',
			$components: './src/lib/components',
			$services: './src/lib/server/services',
			$client: './src/lib/client',
			$server: './src/lib/server'
		}
	}
};

export default config;
