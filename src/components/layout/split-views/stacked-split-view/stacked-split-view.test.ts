import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './stacked-split-view.ts';

describe('nldd-stacked-split-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-stacked-split-view></nldd-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders 2 panes by default', async () => {
		el = await fixture('<nldd-stacked-split-view></nldd-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.stacked-split-view__pane').length).toBe(2);
	});

	it('renders the correct number of panes', async () => {
		el = await fixture('<nldd-stacked-split-view panes="3"></nldd-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.stacked-split-view__pane').length).toBe(3);
	});

	it('renders dividers between panes', async () => {
		el = await fixture('<nldd-stacked-split-view panes="3"></nldd-stacked-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('nldd-split-view-divider').length).toBe(2);
	});
});
