import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './ndd-simple-section.ts';

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

	it('reflects align attribute to the host', async () => {
		el = await fixture('<ndd-simple-section align="center"></ndd-simple-section>');
		await waitForUpdate(el);
		expect(el.getAttribute('align')).toBe('center');
	});
});
