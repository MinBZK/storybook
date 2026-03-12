import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-full-bleed-section.ts';

describe('rr-full-bleed-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-full-bleed-section></rr-full-bleed-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<rr-full-bleed-section></rr-full-bleed-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.full-bleed-section')).not.toBeNull();
	});
});
