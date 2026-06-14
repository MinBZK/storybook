/**
 * Generates the user-invocable "ontwerprichtlijnen" skill from the canonical
 * design-guidelines doc (src/docs/design-guidelines.mdx — the Storybook
 * "Docs/Ontwerprichtlijnen" page).
 *
 * The MDX is the single source of truth. This script strips the MDX-only lines
 * (the JS import and the <Meta> element) and wraps the remaining Markdown in a
 * SKILL.md with frontmatter, so the invocable skill never drifts from the
 * documented principles. The skill description is derived from the doc's intro
 * paragraph.
 *
 * WARNING: overwrites .claude/skills/ontwerprichtlijnen/SKILL.md in-place. Run
 * `npm run generate:skill-docs` after editing the guidelines and commit the
 * result.
 *
 * Usage: node scripts/generate-skill-principles.js
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(__dirname, '../src/docs/design-guidelines.mdx');
const outputDir = resolve(__dirname, '../.claude/skills/ontwerprichtlijnen');
const outputPath = resolve(outputDir, 'SKILL.md');

let mdx;
try {
	mdx = readFileSync(sourcePath, 'utf-8');
} catch (err) {
	if (err.code === 'ENOENT') {
		console.error(`design-guidelines.mdx not found at ${sourcePath}.`);
		console.error('Verwacht de canonieke ontwerprichtlijnen in src/docs/design-guidelines.mdx.');
		process.exit(1);
	}
	throw err;
}

// Keep only the Markdown body: drop the JS import line(s) and the <Meta>
// element that make this an MDX/Storybook page. Everything else is plain
// Markdown and is carried over verbatim.
const body = `${mdx
	.split('\n')
	.filter((line) => !/^\s*import\s/.test(line) && !/^\s*<Meta\b/.test(line))
	.join('\n')
	.replace(/^\n+/, '')
	.trimEnd()}\n`;

// Derive the skill description from the first paragraph after the H1: collapse
// to a single line and escape it for a double-quoted YAML scalar.
const introMatch = body.match(/^#\s+.+?\n+([\s\S]+?)\n\s*\n/);
const intro = (introMatch ? introMatch[1] : 'Ontwerprichtlijnen en interface-principes van het NLDD Design System.')
	.replace(/\s+/g, ' ')
	.trim();
const description = intro.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const skill = `---
name: ontwerprichtlijnen
description: "${description}"
user-invocable: true
---

<!--
  GEGENEREERD BESTAND — niet handmatig bewerken.
  Bron: src/docs/design-guidelines.mdx (Storybook "Docs/Ontwerprichtlijnen").
  Hergenereren: npm run generate:skill-docs
-->

${body}`;

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, skill);

console.log(`Wrote ${outputPath} (${skill.split('\n').length} lines)`);
