import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(import.meta.dirname, 'src/components/index.ts'),
			formats: ['es'],
			fileName: () => 'ndd-components.js',
		},
		outDir: 'dist/components',
		emptyOutDir: false,
		target: 'es2020',
		minify: false,
		rollupOptions: {
			external: ['lit', /^lit\//, /^@lit\//, '@floating-ui/dom'],
		},
	},
});
