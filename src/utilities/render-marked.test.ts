import { html, render, nothing } from 'lit';
import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import { renderBold, renderMarked } from './render-marked.js';

function segments(host: HTMLElement): Array<{ text: string; bold: boolean }> {
	return Array.from(host.childNodes)
		.filter(n => n.nodeType === Node.TEXT_NODE || (n instanceof Element && n.tagName === 'B'))
		.map(n => n instanceof Element
			? { text: n.textContent ?? '', bold: true }
			: { text: n.textContent ?? '', bold: false })
		.filter(s => s.text.length > 0);
}

describe('renderBold', () => {
	let host: HTMLElement;

	beforeEach(() => {
		host = document.createElement('div');
		document.body.appendChild(host);
	});

	afterEach(() => {
		host.remove();
	});

	it('returns plain text when no ** markers', () => {
		const result = renderBold('Hello world');
		expect(result).toBe('Hello world');
	});

	it('renders **...** as <b>', () => {
		render(html`${renderBold('Hello **world**')}`, host);
		expect(host.textContent).toBe('Hello world');
		expect(segments(host)).toEqual([
			{ text: 'Hello ', bold: false },
			{ text: 'world', bold: true },
		]);
	});

	it('leaves unbalanced ** as plain text', () => {
		render(html`${renderBold('Hello **world')}`, host);
		expect(host.textContent).toBe('Hello **world');
		expect(host.querySelector('b')).toBeNull();
	});
});

describe('renderMarked', () => {
	let host: HTMLElement;

	beforeEach(() => {
		host = document.createElement('div');
		document.body.appendChild(host);
	});

	afterEach(() => {
		host.remove();
	});

	it('returns nothing for empty text', () => {
		expect(renderMarked('', 'q')).toBe(nothing);
	});

	it('returns plain text when query is empty', () => {
		const result = renderMarked('Aardappelen', '');
		expect(result).toBe('Aardappelen');
	});

	it('falls back to renderBold when query is empty', () => {
		render(html`${renderMarked('Hello **world**', '')}`, host);
		expect(host.querySelector('b')?.textContent).toBe('world');
	});

	it('returns text unchanged when query not found', () => {
		const result = renderMarked('Aardappelen', 'zz');
		expect(result).toBe('Aardappelen');
	});

	it('match mode bolds the query substring (case-insensitive)', () => {
		render(html`${renderMarked('Aardappelen', 'aa', 'match')}`, host);
		expect(host.textContent).toBe('Aardappelen');
		expect(segments(host)).toEqual([
			{ text: 'Aa', bold: true },
			{ text: 'rdappelen', bold: false },
		]);
	});

	it('predictive mode bolds the remainder', () => {
		render(html`${renderMarked('Aardappelen', 'aa', 'predictive')}`, host);
		expect(host.textContent).toBe('Aardappelen');
		expect(segments(host)).toEqual([
			{ text: 'Aa', bold: false },
			{ text: 'rdappelen', bold: true },
		]);
	});

	it('defaults to predictive mode', () => {
		render(html`${renderMarked('Aardappelen', 'aa')}`, host);
		expect(segments(host)).toEqual([
			{ text: 'Aa', bold: false },
			{ text: 'rdappelen', bold: true },
		]);
	});

	it('handles query appearing multiple times in match mode', () => {
		render(html`${renderMarked('banana', 'na', 'match')}`, host);
		expect(host.textContent).toBe('banana');
		expect(segments(host)).toEqual([
			{ text: 'ba', bold: false },
			{ text: 'na', bold: true },
			{ text: 'na', bold: true },
		]);
	});

	it('handles query appearing multiple times in predictive mode', () => {
		render(html`${renderMarked('banana', 'na', 'predictive')}`, host);
		expect(host.textContent).toBe('banana');
		expect(segments(host)).toEqual([
			{ text: 'ba', bold: true },
			{ text: 'na', bold: false },
			{ text: 'na', bold: false },
		]);
	});

	it('handles query in the middle (predictive mode)', () => {
		render(html`${renderMarked('foobarbaz', 'bar', 'predictive')}`, host);
		expect(host.textContent).toBe('foobarbaz');
		expect(segments(host)).toEqual([
			{ text: 'foo', bold: true },
			{ text: 'bar', bold: false },
			{ text: 'baz', bold: true },
		]);
	});

	it('handles query at the end (predictive mode)', () => {
		render(html`${renderMarked('foobar', 'bar', 'predictive')}`, host);
		expect(host.textContent).toBe('foobar');
		expect(segments(host)).toEqual([
			{ text: 'foo', bold: true },
			{ text: 'bar', bold: false },
		]);
	});

	it('trims whitespace-only queries', () => {
		const result = renderMarked('Aardappelen', '   ');
		expect(result).toBe('Aardappelen');
	});
});
