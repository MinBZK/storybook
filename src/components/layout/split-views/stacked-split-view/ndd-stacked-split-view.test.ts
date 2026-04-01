import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './ndd-stacked-split-view.ts';

describe('ndd-stacked-split-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-stacked-split-view></ndd-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders 2 panes by default', async () => {
		el = await fixture('<ndd-stacked-split-view></ndd-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.stacked-split-view__pane').length).toBe(2);
	});

	it('renders the correct number of panes', async () => {
		el = await fixture('<ndd-stacked-split-view panes="3"></ndd-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.stacked-split-view__pane').length).toBe(3);
	});

	it('renders dividers between panes', async () => {
		el = await fixture('<ndd-stacked-split-view panes="3"></ndd-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('ndd-split-view-divider').length).toBe(2);
	});
});
