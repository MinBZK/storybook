import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup } from '../../../test-utils.js';
import './rich-text.ts';

describe('nldd-rich-text', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-rich-text></nldd-rich-text>');
		expect(el).toBeDefined();
		expect(el.tagName.toLowerCase()).toBe('nldd-rich-text');
	});

	it('has no shadow DOM', async () => {
		el = await fixture('<nldd-rich-text></nldd-rich-text>');
		expect(el.shadowRoot).toBeNull();
	});

	it('renders slotted content as light DOM', async () => {
		el = await fixture('<nldd-rich-text><p>Tekst</p></nldd-rich-text>');
		const p = el.querySelector('p');
		expect(p).not.toBeNull();
		expect(p?.textContent).toBe('Tekst');
	});

	it('defaults to snug spacing', async () => {
		el = await fixture('<nldd-rich-text></nldd-rich-text>');
		expect(el.getAttribute('spacing')).toBe('snug');
	});

	it('reflects spacing attribute', async () => {
		el = await fixture('<nldd-rich-text spacing="loose"></nldd-rich-text>');
		expect(el.getAttribute('spacing')).toBe('loose');
	});
});
