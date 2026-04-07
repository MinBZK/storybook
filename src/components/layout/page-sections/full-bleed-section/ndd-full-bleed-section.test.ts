import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './ndd-full-bleed-section.ts';

describe('ndd-full-bleed-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-full-bleed-section></ndd-full-bleed-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<ndd-full-bleed-section></ndd-full-bleed-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.full-bleed-section')).not.toBeNull();
	});

	it('reflects align attribute to the host', async () => {
		el = await fixture('<ndd-full-bleed-section align="center"></ndd-full-bleed-section>');
		await waitForUpdate(el);
		expect(el.getAttribute('align')).toBe('center');
	});
});
