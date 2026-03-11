import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-simple-section.ts';

describe('rr-simple-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-simple-section></rr-simple-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<rr-simple-section></rr-simple-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('section')).not.toBeNull();
	});
});
