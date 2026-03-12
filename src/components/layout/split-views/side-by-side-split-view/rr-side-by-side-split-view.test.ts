import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-side-by-side-split-view.ts';

describe('rr-side-by-side-split-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-side-by-side-split-view></rr-side-by-side-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders 2 panes by default', async () => {
		el = await fixture('<rr-side-by-side-split-view></rr-side-by-side-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.side-by-side-split-view__pane').length).toBe(2);
	});

	it('renders the correct number of panes', async () => {
		el = await fixture('<rr-side-by-side-split-view panes="3"></rr-side-by-side-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.side-by-side-split-view__pane').length).toBe(3);
	});

	it('renders dividers between panes', async () => {
		el = await fixture('<rr-side-by-side-split-view panes="3"></rr-side-by-side-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(2);
	});
});
