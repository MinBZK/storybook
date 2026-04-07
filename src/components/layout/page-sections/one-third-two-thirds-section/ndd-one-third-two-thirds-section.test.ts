import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './ndd-one-third-two-thirds-section.ts';

describe('ndd-one-third-two-thirds-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-one-third-two-thirds-section></ndd-one-third-two-thirds-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<ndd-one-third-two-thirds-section></ndd-one-third-two-thirds-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('section')).not.toBeNull();
	});

	it('renders aside and main columns', async () => {
		el = await fixture('<ndd-one-third-two-thirds-section></ndd-one-third-two-thirds-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.one-third-two-thirds-section__left-column')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.one-third-two-thirds-section__right-column')).not.toBeNull();
	});

	it('reflects align attribute to the host', async () => {
		el = await fixture('<ndd-one-third-two-thirds-section align="center"></ndd-one-third-two-thirds-section>');
		await waitForUpdate(el);
		expect(el.getAttribute('align')).toBe('center');
	});
});
