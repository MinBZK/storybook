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

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
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
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...collectEntryFiles(full));
			continue;
		}
		if (!entry.name.endsWith('.ts')) continue;
		if (NON_ENTRY_SUFFIXES.some((suffix) => entry.name.endsWith(suffix))) continue;
		if (entry.name === 'index.ts') continue;
		files.push(full);
	}
	return files;
}

/** Extract the JSDoc block that documents the component(s). Prefers the first
 * block containing @element or @customElement so a license/module header before
 * it does not get picked by mistake; falls back to the first block. */
function extractLeadingBlock(source) {
	const blocks = [...source.matchAll(/\/\*\*([\s\S]*?)\*\//g)];
	if (blocks.length === 0) return null;
	const chosen =
		blocks.find((m) => /@element\b|@customElement\b/.test(m[1])) ?? blocks[0];
	// Strip the leading " * " from each line.
	return chosen[1]
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
	// Strip the JSDoc `[optional]` bracket convention from the attribute name.
	const name = nameMatch[1].replace(/^\[|\]$/g, '');
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

/** Parse one component file's JSDoc block into one or more records — a file may
 * document several custom elements (e.g. nldd-tab-bar + nldd-tab-bar-item), each
 * with its own @element. attrs/slots/events are assigned to the @element that
 * precedes them. The fallbackTag (from @customElement) is used only when the
 * JSDoc has no @element at all. Returns an array of components. */
function parseComponent(block, filePath, fallbackTag) {
	const lines = block.split('\n');
	const category = filePath.slice(componentsDir.length + 1).split(sep)[0];
	const summaryLines = [];
	const components = [];

	const newComponent = (tag) => ({
		tag,
		summary: '',
		attrs: [],
		slots: [],
		events: [],
		category,
	});

	let current = null;
	// The most recent description-bearing entry (attr/slot/event), so a
	// multi-line JSDoc tag's continuation lines append to it instead of dropping.
	let lastEntry = null;

	for (const line of lines) {
		const tagMatch = line.match(/^@(\w+)\s*([\s\S]*)$/);
		if (!tagMatch) {
			if (line.trim() === '') {
				lastEntry = null;
				continue;
			}
			if (lastEntry) {
				lastEntry.description = `${lastEntry.description} ${line.trim()}`.trim();
				continue;
			}
			// Prose before the first @element is the shared summary.
			if (!current && !line.startsWith('#')) {
				summaryLines.push(line.trim());
			}
			continue;
		}
		lastEntry = null;
		const [, tag, rest] = tagMatch;
		switch (tag) {
			case 'element':
				current = newComponent(rest.trim());
				components.push(current);
				break;
			case 'attr': {
				if (!current) break;
				const entry = parseTypedTag(rest);
				current.attrs.push(entry);
				lastEntry = entry;
				break;
			}
			case 'slot': {
				if (!current) break;
				const entry = parseNamedTag(rest);
				current.slots.push(entry);
				lastEntry = entry;
				break;
			}
			case 'fires': {
				if (!current) break;
				const entry = parseNamedTag(rest);
				current.events.push(entry);
				lastEntry = entry;
				break;
			}
			default:
				break;
		}
	}

	// No @element at all: fall back to the @customElement decorator tag.
	if (components.length === 0) {
		if (!fallbackTag) return [];
		components.push(newComponent(fallbackTag));
	}

	// The shared prose summary (minus the boilerplate title line) goes to the
	// first element; sub-elements keep their own per-element prose if any.
	const summary = summaryLines
		.filter((l) => !/Components? \(Lit \+ TypeScript\)\s*$/.test(l))
		.join(' ')
		.replace(/\s+/g, ' ')
		.trim();
	if (components[0]) components[0].summary = summary;

	return components;
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

// The pure parsing helpers (and componentsDir, for path-derived assertions) are
// exported so they can be unit-tested without triggering the file-walking and
// file-writing side effects of the main routine.
export { parseTypedTag, parseNamedTag, parseComponent, extractLeadingBlock, componentsDir };

// --- Main ---

// Internal helpers that ship a custom element but are not part of the public,
// consumer-facing surface. Exclude them from the reference.
const INTERNAL_TAGS = new Set(['nldd-lqip-encoder']);

// --- Icon names ---
// The valid `name` values for <nldd-icon> are the SVG filenames in the icon
// folder plus the aliases. Both are build inputs, so we read them directly to
// give consumers an offline, in-sync catalog instead of "see Storybook".

function collectIconNames() {
	const iconsDir = resolve(componentsDir, 'content/icon/icons');
	const aliasesFile = resolve(componentsDir, 'content/icon/icon-aliases.js');
	let entries;
	try {
		entries = readdirSync(iconsDir);
	} catch (err) {
		if (err.code === 'ENOENT') {
			throw new Error(`Icon directory not found at ${iconsDir}.`);
		}
		throw err;
	}
	const names = entries
		.filter((f) => f.endsWith('.svg'))
		.map((f) => f.slice(0, -4));
	let aliases = [];
	try {
		const src = readFileSync(aliasesFile, 'utf-8');
		aliases = [...src.matchAll(/^\s*'([^']+)'\s*:/gm)].map((m) => m[1]);
	} catch (err) {
		// The aliases file is optional; only a missing file is tolerated.
		// Surface anything else (permission, read errors) instead of hiding it.
		if (err.code !== 'ENOENT') throw err;
	}
	return { names: names.sort(), aliases: aliases.sort() };
}

function renderIcons({ names, aliases }) {
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

function main() {
	const entryFiles = collectEntryFiles(componentsDir);
	const components = [];
	for (const file of entryFiles) {
		const source = readFileSync(file, 'utf-8');
		const block = extractLeadingBlock(source);
		if (!block) continue;
		const ceMatch = source.match(/@customElement\(['"]([^'"]+)['"]\)/);
		const fallbackTag = ceMatch ? ceMatch[1] : null;
		for (const parsed of parseComponent(block, file, fallbackTag)) {
			if (parsed.tag && !INTERNAL_TAGS.has(parsed.tag)) components.push(parsed);
		}
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

	// Read the icon catalog once and reuse it for both rendering and the summary.
	const iconInfo = collectIconNames();
	sections.push(renderIcons(iconInfo));

	const body = header + sections.join('\n');
	writeFileSync(outputPath, body.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');

	console.log(`Wrote ${outputPath}`);
	console.log(`Components: ${total} across ${orderedCategories.length} categories`);
	console.log(`Icons: ${iconInfo.names.length} names + ${iconInfo.aliases.length} aliases`);
}

// Run the generator only when executed directly, not when imported for tests.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	main();
}
