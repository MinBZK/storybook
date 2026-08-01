#!/usr/bin/env node
/**
 * Generate OKLCH palettes for all reference colors.
 *
 * Reads scripts/reference-colors.json, calls scripts/generate-palette.py
 * for each entry, and writes the combined output to
 * src/assets/styles/colors.generated.css.
 *
 * Run manually after changing the reference colors:
 *   npm run generate:colors
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONFIG = join(ROOT, 'scripts/reference-colors.json');
const SCRIPT = join(ROOT, 'scripts/generate-palette.py');
const OUTPUT = join(ROOT, 'src/assets/styles/colors.generated.css');

const colors = JSON.parse(readFileSync(CONFIG, 'utf8'));

const sections = colors.map(({ name, hex, neutral }) => {
	const args = [SCRIPT, hex, name];
	if (neutral) args.push('--neutral');
	const out = execFileSync('python3', args, { encoding: 'utf8' });
	return out.trimEnd();
});

const header = `/**
 * Auto-generated descriptive color palettes.
 *
 * Generated from scripts/reference-colors.json using scripts/generate-palette.py.
 * DO NOT EDIT BY HAND — run \`npm run generate:colors\` to regenerate.
 */

:root {
`;

const footer = '\n}\n';

writeFileSync(OUTPUT, header + sections.join('\n\n') + footer);

console.log(`Generated ${colors.length} palettes → ${OUTPUT.replace(ROOT + '/', '')}`);
