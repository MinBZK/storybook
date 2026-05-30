/**
 * Generates skills/nldd/reference.md from component JSDoc.
 *
 * Walks src/components, parses the leading JSDoc block of each component
 * entry file for @element, @attr, @slot and @fires tags, and emits one
 * markdown section per component, grouped by category. This keeps the
 * consumer-facing reference in sync with the source: the JSDoc is the
 * single source of truth.
 *
 * WARNING: this script overwrites skills/nldd/reference.md in-place.
 * After changing a component's public API (attributes, slots, events),
 * run `npm run generate:component-reference` and commit the result.
 *
 * Usage: node scripts/generate-component-reference.js
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const componentsDir = resolve(__dirname, '../src/components');
const outputPath = resolve(__dirname, '../skills/nldd/reference.md');

// Human-readable titles for the category directories, in display order.
const CATEGORY_TITLES = {
	actions: 'Actions',
	content: 'Content',
	forms: 'Forms',
	inputs: 'Inputs',
	layout: 'Layout',
	'lists-and-menus': 'Lists & menus',
	navigation: 'Navigation',
	'status-and-feedback': 'Status & feedback',
};

// File suffixes that are never the component entry file.
const NON_ENTRY_SUFFIXES = [
	'.styles.ts',
	'.template.ts',
	'.stories.ts',
	'.test.ts',
	'.i18n.ts',
];

/** Recursively collect candidate component entry files (*.ts, excluding the non-entry suffixes). */
function collectEntryFiles(dir) {
	const files = [];
	for (const name of readdirSync(dir)) {
		const full = join(dir, name);
		if (statSync(full).isDirectory()) {
			files.push(...collectEntryFiles(full));
			continue;
		}
		if (!name.endsWith('.ts')) continue;
		if (NON_ENTRY_SUFFIXES.some((suffix) => name.endsWith(suffix))) continue;
		if (name === 'index.ts') continue;
		files.push(full);
	}
	return files;
}

/** Extract the first leading block comment (/** ... *​/) from a source file. */
function extractLeadingBlock(source) {
	const match = source.match(/\/\*\*([\s\S]*?)\*\//);
	if (!match) return null;
	// Strip the leading " * " from each line.
	return match[1]
		.split('\n')
		.map((line) => line.replace(/^\s*\*?\s?/, ''))
		.join('\n')
		.trim();
}

/**
 * Parse a single JSDoc tag line of the form
 *   @attr {type} name - description
 * The type is brace-balanced (so unions like {'a'|'b'} survive), the name is
 * the next whitespace-delimited token, and the description is the remainder
 * after an optional "-" separator.
 */
function parseTypedTag(rest) {
	let type = '';
	let remainder = rest.trim();
	if (remainder.startsWith('{')) {
		let depth = 0;
		let i = 0;
		for (; i < remainder.length; i++) {
			if (remainder[i] === '{') depth++;
			else if (remainder[i] === '}') {
				depth--;
				if (depth === 0) {
					i++;
					break;
				}
			}
		}
		type = remainder.slice(0, i).replace(/^\{|\}$/g, '').trim();
		remainder = remainder.slice(i).trim();
	}
	const nameMatch = remainder.match(/^(\S+)\s*(.*)$/s);
	if (!nameMatch) return { type, name: '', description: '' };
	const name = nameMatch[1];
	const description = nameMatch[2].replace(/^-\s*/, '').replace(/\s+/g, ' ').trim();
	return { type, name, description };
}

/** Parse a @slot / @fires line: "name - description" (name optional for default slot). */
function parseNamedTag(rest) {
	const m = rest.trim().match(/^(\S+)?\s*-?\s*([\s\S]*)$/);
	if (!m) return { name: '', description: '' };
	let name = m[1] ?? '';
	let description = m[2] ?? '';
	// A leading "-" means the default (unnamed) slot.
	if (name === '-') {
		name = '';
	} else {
		description = description.replace(/^-\s*/, '');
	}
	return { name, description: description.replace(/\s+/g, ' ').trim() };
}

/** Parse one component's JSDoc block into a structured record. The fallbackTag
 * (from the @customElement decorator) is used when the JSDoc omits @element. */
function parseComponent(block, filePath, fallbackTag) {
	const lines = block.split('\n');
	const component = {
		tag: null,
		summary: [],
		attrs: [],
		slots: [],
		events: [],
	};

	let sawTag = false;
	for (const line of lines) {
		const tagMatch = line.match(/^@(\w+)\s*([\s\S]*)$/);
		if (!tagMatch) {
			// Lines before the first @-tag form the prose summary.
			if (!sawTag && line.trim() && !line.startsWith('#')) {
				component.summary.push(line.trim());
			}
			continue;
		}
		sawTag = true;
		const [, tag, rest] = tagMatch;
		switch (tag) {
			case 'element':
				component.tag = rest.trim();
				break;
			case 'attr': {
				const { type, name, description } = parseTypedTag(rest);
				component.attrs.push({ name, type, description });
				break;
			}
			case 'slot': {
				const { name, description } = parseNamedTag(rest);
				component.slots.push({ name, description });
				break;
			}
			case 'fires': {
				const { name, description } = parseNamedTag(rest);
				component.events.push({ name, description });
				break;
			}
			default:
				break;
		}
	}

	// Fall back to the @customElement tag when the JSDoc omits @element.
	if (!component.tag) component.tag = fallbackTag;
	if (!component.tag) return null;
	// The first summary line is the boilerplate "… Component (Lit + TypeScript)"
	// title; drop it and keep the genuine description that follows.
	component.summary = component.summary.filter(
		(l) => !/Component \(Lit \+ TypeScript\)\s*$/.test(l),
	);
	component.summary = component.summary.join(' ').replace(/\s+/g, ' ').trim();
	component.category = filePath
		.slice(componentsDir.length + 1)
		.split(sep)[0];
	return component;
}

function escapeCell(text) {
	return (text || '').replace(/\|/g, '\\|');
}

/** Render one component as a markdown section. */
function renderComponent(c) {
	const out = [`### \`<${c.tag}>\``, ''];
	if (c.summary) {
		out.push(c.summary, '');
	}
	if (c.attrs.length) {
		out.push('**Attributes**', '');
		out.push('| Attribuut | Type | Beschrijving |');
		out.push('| --- | --- | --- |');
		for (const a of c.attrs) {
			out.push(
				`| \`${escapeCell(a.name)}\` | ${a.type ? `\`${escapeCell(a.type)}\`` : '—'} | ${escapeCell(a.description) || '—'} |`,
			);
		}
		out.push('');
	}
	if (c.slots.length) {
		out.push('**Slots**', '');
		out.push('| Slot | Beschrijving |');
		out.push('| --- | --- |');
		for (const s of c.slots) {
			out.push(
				`| ${s.name ? `\`${escapeCell(s.name)}\`` : '_(default)_'} | ${escapeCell(s.description) || '—'} |`,
			);
		}
		out.push('');
	}
	if (c.events.length) {
		out.push('**Events**', '');
		out.push('| Event | Beschrijving |');
		out.push('| --- | --- |');
		for (const e of c.events) {
			out.push(`| \`${escapeCell(e.name)}\` | ${escapeCell(e.description) || '—'} |`);
		}
		out.push('');
	}
	return out.join('\n');
}

// --- Main ---

// Internal helpers that ship a custom element but are not part of the public,
// consumer-facing surface. Exclude them from the reference.
const INTERNAL_TAGS = new Set(['nldd-lqip-encoder']);

const entryFiles = collectEntryFiles(componentsDir);
const components = [];
for (const file of entryFiles) {
	const source = readFileSync(file, 'utf-8');
	const block = extractLeadingBlock(source);
	if (!block) continue;
	const ceMatch = source.match(/@customElement\(['"]([^'"]+)['"]\)/);
	const fallbackTag = ceMatch ? ceMatch[1] : null;
	const parsed = parseComponent(block, file, fallbackTag);
	if (parsed && !INTERNAL_TAGS.has(parsed.tag)) components.push(parsed);
}

// Group by category, in the declared order; unknown categories come last.
const byCategory = new Map();
for (const c of components) {
	if (!byCategory.has(c.category)) byCategory.set(c.category, []);
	byCategory.get(c.category).push(c);
}

const orderedCategories = [
	...Object.keys(CATEGORY_TITLES).filter((k) => byCategory.has(k)),
	...[...byCategory.keys()].filter((k) => !(k in CATEGORY_TITLES)).sort(),
];

const header = `<!--
  GEGENEREERD BESTAND — niet handmatig bewerken.
  Bron: de JSDoc (@element / @attr / @slot / @fires) van elk component in
  src/components, plus de iconnamen uit content/icon/icons en icon-aliases.
  Hergenereren: npm run generate:component-reference
-->

# Componentreferentie — @nldd/design-system

Elk custom element met zijn attributen, slots en events. Dit is een offline
snelreferentie; de levende documentatie met voorbeelden staat in
[Storybook](https://minbzk.github.io/storybook/), en de exacte types staan in
de \`.d.ts\` bestanden van het pakket.

> Let op: deze referentie komt uit de JSDoc van de componenten. Een paar
> componenten documenteren niet al hun \`@attr\`s; daar tonen de \`.d.ts\` types
> of Storybook de volledige set. Raadpleeg die bij twijfel.

`;

const sections = [];
let total = 0;
for (const cat of orderedCategories) {
	const list = byCategory.get(cat).sort((a, b) => a.tag.localeCompare(b.tag));
	total += list.length;
	const title = CATEGORY_TITLES[cat] || cat;
	sections.push(`## ${title}\n`);
	sections.push(list.map(renderComponent).join('\n'));
}

// --- Icon names ---
// The valid `name` values for <nldd-icon> are the SVG filenames in the icon
// folder plus the aliases. Both are build inputs, so we read them directly to
// give consumers an offline, in-sync catalog instead of "see Storybook".

function collectIconNames() {
	const iconsDir = resolve(componentsDir, 'content/icon/icons');
	const aliasesFile = resolve(componentsDir, 'content/icon/icon-aliases.js');
	const names = readdirSync(iconsDir)
		.filter((f) => f.endsWith('.svg'))
		.map((f) => f.slice(0, -4));
	let aliases = [];
	try {
		const src = readFileSync(aliasesFile, 'utf-8');
		aliases = [...src.matchAll(/^\s*'([^']+)'\s*:/gm)].map((m) => m[1]);
	} catch {
		// aliases are optional
	}
	return { names: names.sort(), aliases: aliases.sort() };
}

function renderIcons() {
	const { names, aliases } = collectIconNames();
	const out = [
		'## Iconen',
		'',
		`Geldige \`name\`-waarden voor \`<nldd-icon>\` (${names.length} iconen` +
			`${aliases.length ? ` + ${aliases.length} aliassen` : ''}). Verzin geen naam; kies er een uit deze set.`,
		'',
		'**Iconen**',
		'',
		names.map((n) => `\`${n}\``).join(', '),
		'',
	];
	if (aliases.length) {
		out.push('**Aliassen** (verwijzen naar een icoon hierboven)', '');
		out.push(aliases.map((n) => `\`${n}\``).join(', '), '');
	}
	return out.join('\n');
}

sections.push(renderIcons());

const body = header + sections.join('\n');
writeFileSync(outputPath, body.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');

const iconInfo = collectIconNames();
console.log(`Wrote ${outputPath}`);
console.log(`Components: ${total} across ${orderedCategories.length} categories`);
console.log(`Icons: ${iconInfo.names.length} names + ${iconInfo.aliases.length} aliases`);
