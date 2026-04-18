import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './simple-section.ts';

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

	it('reflects align property to attribute', async () => {
		el = await fixture('<nldd-simple-section></nldd-simple-section>');
		await waitForUpdate(el);
		(el as any).align = 'center';
		await waitForUpdate(el);
		expect(el.getAttribute('align')).toBe('center');
	});
});
