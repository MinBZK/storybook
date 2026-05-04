import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './full-bleed-section.js';

describe('nldd-full-bleed-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-full-bleed-section></nldd-full-bleed-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<nldd-full-bleed-section></nldd-full-bleed-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.full-bleed-section')).not.toBeNull();
	});

	it('reflects full-width property to attribute', async () => {
		el = await fixture('<nldd-full-bleed-section></nldd-full-bleed-section>');
		await waitForUpdate(el);
		(el as any).fullWidth = true;
		await waitForUpdate(el);
		expect(el.hasAttribute('full-width')).toBe(true);
	});
});
