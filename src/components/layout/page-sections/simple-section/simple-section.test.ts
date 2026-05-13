import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './simple-section.js';

describe('nldd-simple-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-simple-section></nldd-simple-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<nldd-simple-section></nldd-simple-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.simple-section')).not.toBeNull();
	});

	it('reflects width property to attribute', async () => {
		el = await fixture('<nldd-simple-section></nldd-simple-section>');
		await waitForUpdate(el);
		(el as any).width = 'full';
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('full');
	});
});
