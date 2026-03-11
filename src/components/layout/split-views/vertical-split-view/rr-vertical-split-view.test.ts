import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-vertical-split-view.ts';

describe('rr-vertical-split-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders header, content and footer panes', async () => {
		el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.vertical-split-view__header')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.vertical-split-view__main')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.vertical-split-view__footer')).not.toBeNull();
	});

	it('renders 2 dividers', async () => {
		el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(2);
	});

	it('hides header and its divider when show-header is false', async () => {
		el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
		(el as any).showHeader = false;
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.vertical-split-view__header')).toBeNull();
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(1);
	});

	it('hides footer and its divider when show-footer is false', async () => {
		el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
		(el as any).showFooter = false;
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.vertical-split-view__footer')).toBeNull();
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(1);
	});

	it('always renders content pane', async () => {
		el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
		(el as any).showHeader = false;
		(el as any).showFooter = false;
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.vertical-split-view__main')).not.toBeNull();
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(0);
	});
});
