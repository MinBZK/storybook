import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import { NDDSimpleSection } from './ndd-simple-section.ts';

describe('ndd-simple-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-simple-section></ndd-simple-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<ndd-simple-section></ndd-simple-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.simple-section')).not.toBeNull();
	});

	it('reflects align property to attribute', async () => {
		el = await fixture('<ndd-simple-section></ndd-simple-section>');
		await waitForUpdate(el);
		(el as NDDSimpleSection).align = 'center';
		await waitForUpdate(el);
		expect(el.getAttribute('align')).toBe('center');
	});
});
