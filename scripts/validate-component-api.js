/**
 * Checks that every attribute a component actually has is documented.
 *
 * The JSDoc `@attr` block is hand-written and feeds skills/nldd/reference.md,
 * the plugin skill and anything generated from it. The existing drift check
 * only proves the generator ran: it compares generated output against generated
 * output, so a property that never reached the JSDoc stays invisible to it.
 * That is how nldd-top-title-bar ended up in the published reference with no
 * attributes at all while having seven.
 *
 * This script compares the other way round: from the `@property` decorators,
 * which are what the code really does, to the `@attr` lines. It reads the JSDoc
 * with the same parser as the reference generator, so the two cannot disagree.
 *
 * Only locally declared properties are required. Attributes a mixin brings in
 * belong to that mixin and are documented there, not copied into every
 * component that uses it.
 *
 * Documented-but-absent attributes are reported as a warning rather than an
 * error: some are plain attributes a parent sets on the host, without a
 * property behind them.
 *
 * Usage: node scripts/validate-component-api.js
 */

import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractLeadingBlock, parseComponent } from './lib/component-jsdoc.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const componentsDir = resolve(repoRoot, 'src/components');

const SKIP_SUFFIXES = ['.styles.ts', '.template.ts', '.test.ts', '.stories.ts', '.i18n.ts'];

/** Ships a custom element but is not consumer-facing; the reference skips it too. */
const INTERNAL_TAGS = new Set(['nldd-lqip-encoder']);

/**
 * Attributes the shared mixins bring in, read from the mixins themselves so the
 * list cannot go stale when one gains a property. They are documented with the
 * mixin, so a component neither has to repeat them nor is wrong for doing so.
 */
function mixinAttributes() {
	const utilities = resolve(repoRoot, 'src/utilities');
	const names = new Set();
	for (const file of readdirSync(utilities)) {
		if (!file.endsWith('.ts') || file.endsWith('.test.ts')) continue;
		for (const name of declaredAttributes(readFileSync(join(utilities, file), 'utf8'))) names.add(name);
	}
	return names;
}

/**
 * The attribute name Lit derives when none is given: the property name
 * lowercased, NOT kebab-cased. `groupName` becomes `groupname`. Getting this
 * wrong means demanding documentation for an attribute that does not exist.
 */
function toAttributeName(propertyName) {
	return propertyName.toLowerCase();
}

function collectFiles(dir) {
	const found = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) found.push(...collectFiles(full));
		else if (entry.name.endsWith('.ts') && !SKIP_SUFFIXES.some((s) => entry.name.endsWith(s))) found.push(full);
	}
	return found;
}

/**
 * Attributes declared in one class body. `attribute: false` means the value is
 * only reachable as a DOM property (a function or an object), so there is no
 * attribute to document.
 */
function declaredAttributes(body) {
	const found = new Set();
	for (const match of body.matchAll(/@property\(/g)) {
		// Brace-balanced rather than /\{([^}]*)\}/: an options object may contain
		// a nested one (a converter with fromAttribute/toAttribute) and span
		// several lines. A non-greedy regex stops at the first inner "}" and skips
		// the property entirely, which is how nldd-toolbar-item's `priority` went
		// unchecked - exactly the kind of gap this script exists to close.
		const optionsStart = body.indexOf('{', match.index);
		const parenEnd = body.indexOf(')', match.index);
		if (optionsStart === -1 || (parenEnd !== -1 && parenEnd < optionsStart)) continue;
		let depth = 0;
		let i = optionsStart;
		for (; i < body.length; i++) {
			if (body[i] === '{') depth++;
			else if (body[i] === '}' && --depth === 0) break;
		}
		const options = body.slice(optionsStart, i + 1);
		// `get`/`set` because a property may be declared as an accessor
		// (nldd-token-field exposes `values` that way).
		const after = body.slice(i + 1).match(/^\s*\)\s*\n\s*(?:override\s+)?(?:public\s+|readonly\s+)?(?:get\s+|set\s+)?([A-Za-z_][A-Za-z0-9_]*)/);
		if (!after) continue;
		const propertyName = after[1];
		if (/attribute:\s*false/.test(options)) continue;
		// A leading underscore marks a property a parent sets on its children
		// (nldd-tab-bar on its items), not something a consumer writes.
		if (propertyName.startsWith('_')) continue;
		const explicit = options.match(/attribute:\s*'([^']+)'/);
		found.add(explicit ? explicit[1] : toAttributeName(propertyName));
	}
	return found;
}

/**
 * The class body belonging to each element. A file may ship several elements
 * (toolbar.ts has three), and reading it as a whole hands one element's
 * properties to another.
 */
function bodiesByTag(source) {
	const positions = [...source.matchAll(/@customElement\('([^']+)'\)/g)].map((m) => ({ tag: m[1], index: m.index }));
	const bodies = new Map();
	positions.forEach((position, i) => {
		bodies.set(position.tag, source.slice(position.index, positions[i + 1]?.index ?? source.length));
	});
	return bodies;
}

const MIXIN_ATTRIBUTES = mixinAttributes();

const problems = [];
const warnings = [];
let componentCount = 0;

for (const file of collectFiles(componentsDir)) {
	const source = readFileSync(file, 'utf8');
	const bodies = bodiesByTag(source);
	if (bodies.size === 0) continue;

	const block = extractLeadingBlock(source);
	const documentedByTag = new Map();
	if (block) {
		for (const parsed of parseComponent(block, file, [...bodies.keys()][0])) {
			documentedByTag.set(parsed.tag, new Set(parsed.attrs.map((a) => a.name)));
		}
	}

	for (const [tag, body] of bodies) {
		if (INTERNAL_TAGS.has(tag)) continue;
		componentCount += 1;
		const declared = declaredAttributes(body);
		const documented = documentedByTag.get(tag) ?? new Set();

		const undocumented = [...declared].filter((name) => !documented.has(name));
		if (undocumented.length > 0) {
			problems.push({ tag, file: file.replace(`${repoRoot}/`, ''), attributes: undocumented });
		}

		const absent = [...documented].filter((name) => !declared.has(name) && !MIXIN_ATTRIBUTES.has(name));
		if (absent.length > 0) warnings.push({ tag, attributes: absent });
	}
}

console.log(`🔍 ${componentCount} componenten gecontroleerd\n`);

if (warnings.length > 0) {
	console.log('⚠️  Gedocumenteerd zonder eigen property (door een ouder gezet, of verouderd):');
	for (const { tag, attributes } of warnings) console.log(`   ${tag}: ${attributes.join(', ')}`);
	console.log('');
}

if (problems.length === 0) {
	console.log('✅ Elk attribuut heeft een @attr-regel.');
	process.exit(0);
}

const total = problems.reduce((sum, p) => sum + p.attributes.length, 0);
console.error(`❌ ${total} attributen in ${problems.length} componenten hebben geen @attr-regel:\n`);
for (const { tag, file, attributes } of problems) {
	console.error(`   ${tag}  (${file})`);
	for (const name of attributes) console.error(`      @attr ${name}`);
}
console.error('\nVoeg ze toe aan het JSDoc-blok van het component. Zonder @attr-regel');
console.error('ontbreken ze in skills/nldd/reference.md en in alles wat daaruit volgt.');
process.exit(1);
