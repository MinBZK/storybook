import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-one-third-two-thirds-section.ts';

describe('rr-one-third-two-thirds-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-one-third-two-thirds-section></rr-one-third-two-thirds-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<rr-one-third-two-thirds-section></rr-one-third-two-thirds-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('section')).not.toBeNull();
	});

	it('renders aside and main columns', async () => {
		el = await fixture('<rr-one-third-two-thirds-section></rr-one-third-two-thirds-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.section__aside')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.section__main')).not.toBeNull();
	});
});
