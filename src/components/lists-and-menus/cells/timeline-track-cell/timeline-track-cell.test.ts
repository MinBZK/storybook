import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './ndd-timeline-track-cell.ts';

describe('ndd-timeline-track-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-timeline-track-cell></ndd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});
});
