import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import { NDDOneHalfOneHalfSection } from './ndd-one-half-one-half-section.ts';

describe('ndd-one-half-one-half-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-one-half-one-half-section></ndd-one-half-one-half-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<ndd-one-half-one-half-section></ndd-one-half-one-half-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('section')).not.toBeNull();
	});

	it('renders main and aside columns', async () => {
		el = await fixture('<ndd-one-half-one-half-section></ndd-one-half-one-half-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.one-half-one-half-section__left-column')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.one-half-one-half-section__right-column')).not.toBeNull();
	});

	it('reflects align property to attribute', async () => {
		el = await fixture('<ndd-one-half-one-half-section></ndd-one-half-one-half-section>');
		await waitForUpdate(el);
		(el as NDDOneHalfOneHalfSection).align = 'center';
		await waitForUpdate(el);
		expect(el.getAttribute('align')).toBe('center');
	});
});
