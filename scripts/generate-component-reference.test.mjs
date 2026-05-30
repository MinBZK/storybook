/**
 * Unit tests for the JSDoc parser in generate-component-reference.js.
 *
 * Pure-logic tests, run with Node's built-in runner (no browser, no vitest):
 *   node --test scripts/generate-component-reference.test.mjs
 * or via `npm run test:scripts`.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
	parseTypedTag,
	parseNamedTag,
	parseComponent,
	extractLeadingBlock,
} from './generate-component-reference.js';

test('parseTypedTag: simple type, name, description', () => {
	assert.deepEqual(parseTypedTag('{string} label - The label'), {
		type: 'string',
		name: 'label',
		description: 'The label',
	});
});

test('parseTypedTag: union type with quotes survives brace balancing', () => {
	assert.deepEqual(parseTypedTag("{'a'|'b'} variant - The variant"), {
		type: "'a'|'b'",
		name: 'variant',
		description: 'The variant',
	});
});

test('parseTypedTag: nested generic type', () => {
	assert.deepEqual(parseTypedTag('{Record<string, string>} t - Overrides'), {
		type: 'Record<string, string>',
		name: 't',
		description: 'Overrides',
	});
});

test('parseTypedTag: strips [optional] bracket convention from name', () => {
	assert.equal(parseTypedTag('{string} [background] - bg').name, 'background');
});

test('parseTypedTag: missing type', () => {
	assert.deepEqual(parseTypedTag('name - desc only'), {
		type: '',
		name: 'name',
		description: 'desc only',
	});
});

test('parseNamedTag: default slot via leading dash', () => {
	assert.deepEqual(parseNamedTag('- Default slot content'), {
		name: '',
		description: 'Default slot content',
	});
});

test('parseNamedTag: named slot', () => {
	assert.deepEqual(parseNamedTag('header - Header content'), {
		name: 'header',
		description: 'Header content',
	});
});

test('parseComponent: single element with attrs, slots, events', () => {
	const block = [
		'Some Component (Lit + TypeScript)',
		'',
		'A short summary.',
		'',
		'@element nldd-thing',
		'@attr {string} label - The label',
		'@slot - Default content',
		'@fires change - When it changes',
	].join('\n');
	const [c] = parseComponent(block, '/x/src/components/content/thing/thing.ts', null);
	assert.equal(c.tag, 'nldd-thing');
	assert.equal(c.summary, 'A short summary.');
	// category is derived relative to the real componentsDir prefix, which a
	// synthetic path doesn't share; it's covered by the integration run instead.
	assert.deepEqual(c.attrs, [{ type: 'string', name: 'label', description: 'The label' }]);
	assert.equal(c.slots.length, 1);
	assert.equal(c.events[0].name, 'change');
});

test('parseComponent: multi-line tag description is joined, not truncated', () => {
	const block = [
		'@element nldd-thing',
		'@attr {string} size - First line',
		'  that wraps to a second line.',
	].join('\n');
	const [c] = parseComponent(block, '/x/src/components/a/b/b.ts', null);
	assert.equal(c.attrs[0].description, 'First line that wraps to a second line.');
});

test('parseComponent: multiple @element blocks split into separate components', () => {
	const block = [
		'@element nldd-group',
		'@attr {string} value - Group value',
		'@element nldd-group-item',
		'@attr {boolean} selected - Item selected',
	].join('\n');
	const result = parseComponent(block, '/x/src/components/a/group/group.ts', null);
	assert.equal(result.length, 2);
	assert.equal(result[0].tag, 'nldd-group');
	assert.equal(result[0].attrs[0].name, 'value');
	assert.equal(result[1].tag, 'nldd-group-item');
	assert.equal(result[1].attrs[0].name, 'selected');
});

test('parseComponent: drops plural boilerplate title from summary', () => {
	const block = [
		'Some Components (Lit + TypeScript)',
		'@element nldd-thing',
	].join('\n');
	const [c] = parseComponent(block, '/x/src/components/a/b/b.ts', null);
	assert.equal(c.summary, '');
});

test('parseComponent: falls back to @customElement tag when no @element', () => {
	const block = 'Just prose, no element tag.';
	const [c] = parseComponent(block, '/x/src/components/a/b/b.ts', 'nldd-fallback');
	assert.equal(c.tag, 'nldd-fallback');
});

test('extractLeadingBlock: prefers the block containing @element over a license header', () => {
	const source = [
		'/** Copyright 2026. License header, no tags. */',
		'import { LitElement } from "lit";',
		'/**',
		' * @element nldd-thing',
		' * @attr {string} label - x',
		' */',
		'@customElement("nldd-thing")',
		'export class X {}',
	].join('\n');
	const block = extractLeadingBlock(source);
	assert.match(block, /@element nldd-thing/);
	assert.doesNotMatch(block, /Copyright/);
});
