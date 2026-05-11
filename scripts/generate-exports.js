/**
 * Generates the package.json "exports" field from src/components/index.ts.
 * Parses export lines to create per-component export paths.
 *
 * WARNING: This script rewrites package.json in-place. After adding or
 * removing a component in index.ts, run `npm run build:exports` and commit
 * the updated package.json.
 *
 * Usage: node scripts/generate-exports.js
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = resolve(__dirname, '../src/components/index.ts');
const packagePath = resolve(__dirname, '../package.json');

const indexContent = readFileSync(indexPath, 'utf-8');
const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));

// Parse named export lines: export { NLDDButton } from './actions/button/button.ts';
// Note: does not match `export * from` barrel re-exports — only named exports are mapped.
const exportRegex = /export\s+\{[^}]+\}\s+from\s+['"](\.\/[^'"]+)['"]/g;

const componentExports = {};
for (const match of indexContent.matchAll(exportRegex)) {
	const sourcePath = match[1]; // e.g. ./actions/button/button.ts

	// Extract component name from path: ./actions/button/button.js → button
	const parts = sourcePath.split('/');
	const componentName = parts[parts.length - 1].replace(/\.(ts|js)$/, '');

	// Build dist path: ./actions/button/button.js → ./dist/components/actions/button/button.js
	// Assumes tsconfig.build.json rootDir=src, outDir=dist — src/components/… maps to dist/components/….
	const distPath = `./dist/components/${sourcePath.replace(/^\.\//, '').replace(/\.(ts|js)$/, '')}`;

	const exportKey = `./${componentName}`;
	if (componentExports[exportKey]) {
		console.error(`ERROR: Export key collision for "${exportKey}":`);
		console.error(`  Existing: ${componentExports[exportKey].default}`);
		console.error(`  New:      ${distPath}.js`);
		process.exit(1);
	}

	componentExports[exportKey] = {
		types: `${distPath}.d.ts`,
		default: `${distPath}.js`,
	};
}

// Build complete exports map
const exports = {
	'.': './dist/components/components.js',
	...componentExports,
	'./styles': './dist/css/global.css',
	'./styles/tokens': './dist/css/settings.css',
	// JS-accessible design tokens (breakpoints, etc.) — for consumers that
	// need to drive matchMedia / layout logic from the same source as CSS.
	// Aggregator lives at src/assets/styles/tokens.ts.
	'./tokens': {
		types: './dist/assets/styles/tokens.d.ts',
		default: './dist/assets/styles/tokens.js',
	},
};

pkg.exports = exports;
writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');

console.log(`Generated ${Object.keys(componentExports).length} component exports in package.json`);
