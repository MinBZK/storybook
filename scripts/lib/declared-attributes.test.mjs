import { test } from 'node:test';
import assert from 'node:assert/strict';
import { declaredAttributes } from './declared-attributes.js';

test('leest een meerregelige declaratie', () => {
	const body = "@property({ type: Boolean, reflect: true })\n\tdisabled = false;";
	assert.deepEqual([...declaredAttributes(body)], ['disabled']);
});

// De literal \n in de regex sloeg dit stil over, precies het gat dat dit script
// moet dichten.
test('leest een enkelregelige declaratie', () => {
	const body = '@property({ type: Boolean }) disabled = false;';
	assert.deepEqual([...declaredAttributes(body)], ['disabled']);
});

test('leest een expliciete attribuutnaam met dubbele quotes', () => {
	const body = '@property({ attribute: "group-name" })\n\tgroupName = \'\';';
	assert.deepEqual([...declaredAttributes(body)], ['group-name']);
});

test('leidt de attribuutnaam kleingeletterd af, niet kebab', () => {
	const body = '@property({ type: String })\n\tgroupName = \'\';';
	assert.deepEqual([...declaredAttributes(body)], ['groupname']);
});

test('kijkt door een geneste converter heen', () => {
	const body = "@property({\n\t\treflect: true,\n\t\tconverter: { fromAttribute: (v) => v, toAttribute: (v) => v },\n\t})\n\tpriority = 0;";
	assert.deepEqual([...declaredAttributes(body)], ['priority']);
});

test('slaat attribute: false over', () => {
	const body = '@property({ attribute: false })\n\tisDateUnavailable;';
	assert.deepEqual([...declaredAttributes(body)], []);
});

test('slaat een underscore-property over', () => {
	const body = '@property({ type: String })\n\t_groupVariant = \'\';';
	assert.deepEqual([...declaredAttributes(body)], []);
});

test('leest een accessor-property', () => {
	const body = '@property({ type: Array })\n\tget values() { return []; }';
	assert.deepEqual([...declaredAttributes(body)], ['values']);
});
