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

// Parse export lines: export { NDDButton } from './actions/button/ndd-button.ts';
const exportRegex = /export\s+\{[^}]+\}\s+from\s+['"](\.\/[^'"]+)['"]/g;

const componentExports = {};
for (const match of indexContent.matchAll(exportRegex)) {
	const sourcePath = match[1]; // e.g. ./actions/button/ndd-button.ts

	// Extract component name from path: ./actions/button/ndd-button.ts → button
	const parts = sourcePath.split('/');
	const fileName = parts[parts.length - 1].replace(/\.ts$/, '');
	const componentName = fileName.replace(/^ndd-/, '');

	// Build dist path: ./actions/button/ndd-button.ts → ./dist/components/actions/button/ndd-button.js
	const distPath = `./dist/components/${sourcePath.replace(/^\.\//, '').replace(/\.ts$/, '')}`;

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
	'.': './dist/components/ndd-components.js',
	...componentExports,
	'./styles': './dist/css/global.css',
	'./styles/tokens': './dist/css/settings.css',
};

pkg.exports = exports;
writeFileSync(packagePath, JSON.stringify(pkg, null, '\t') + '\n', 'utf-8');

console.log(`Generated ${Object.keys(componentExports).length} component exports in package.json`);
