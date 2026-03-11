import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-stacked-split-view.ts';

describe('rr-stacked-split-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-stacked-split-view></rr-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders 2 panes by default', async () => {
		el = await fixture('<rr-stacked-split-view></rr-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.split-view__pane').length).toBe(2);
	});

	it('renders the correct number of panes', async () => {
		el = await fixture('<rr-stacked-split-view panes="3"></rr-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.split-view__pane').length).toBe(3);
	});

	it('renders dividers between panes', async () => {
		el = await fixture('<rr-stacked-split-view panes="3"></rr-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(2);
	});
});
