import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup } from '../../../test-utils.ts';
import './rr-rich-text.ts';

describe('rr-rich-text', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-rich-text></rr-rich-text>');
		expect(el).toBeDefined();
		expect(el.tagName.toLowerCase()).toBe('rr-rich-text');
	});

	it('has no shadow DOM', async () => {
		el = await fixture('<rr-rich-text></rr-rich-text>');
		expect(el.shadowRoot).toBeNull();
	});

	it('renders slotted content as light DOM', async () => {
		el = await fixture('<rr-rich-text><p>Tekst</p></rr-rich-text>');
		const p = el.querySelector('p');
		expect(p).not.toBeNull();
		expect(p?.textContent).toBe('Tekst');
	});

	it('defaults to snug spacing', async () => {
		el = await fixture('<rr-rich-text></rr-rich-text>');
		expect(el.getAttribute('spacing')).toBe('snug');
	});

	it('reflects spacing attribute', async () => {
		el = await fixture('<rr-rich-text spacing="loose"></rr-rich-text>');
		expect(el.getAttribute('spacing')).toBe('loose');
	});
});
