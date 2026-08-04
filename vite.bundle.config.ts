import { defineConfig } from 'vite';
import { resolve } from 'node:path';

/**
 * De zelfstandige browserbundel: één geminified bestand dat je met een gewone
 * <script src> op een pagina zet, zonder buildstap aan de andere kant.
 *
 * Anders dan vite.config.ts, die de ESM-build voor bundelende consumenten maakt:
 * daar blijven lit, Floating UI en de rest extern en staat de code in chunks.
 * Hier gaat alles mee en wordt er niet gesplitst, zodat er precies één URL is om
 * naar te wijzen.
 */
export default defineConfig({
	build: {
		lib: {
			entry: resolve(import.meta.dirname, 'src/components/index.ts'),
			formats: ['iife'],
			name: 'NLDD',
			fileName: () => 'nldd.min.js',
		},
		outDir: 'dist',
		emptyOutDir: false,
		target: 'es2020',
		minify: true,
		rollupOptions: {
			output: {
				// Eén bestand: een IIFE kan niet splitsen, maar dit maakt expliciet
				// dat er ook geen losse assets naast mogen verschijnen.
				inlineDynamicImports: true,
			},
		},
	},
});
