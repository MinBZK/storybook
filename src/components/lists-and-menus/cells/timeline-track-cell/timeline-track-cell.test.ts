import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './timeline-track-cell.ts';

describe('nldd-timeline-track-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-timeline-track-cell></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});
});
