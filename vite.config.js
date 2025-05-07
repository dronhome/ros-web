import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		postcss: './postcss.config.cjs',
	},
	optimizeDeps: {
		exclude: ['chunk-HQFNBRH5'] // this exact chunk file, or the package causing it
	}
});
