import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-horizontal-split-view.ts';

describe('rr-horizontal-split-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-horizontal-split-view></rr-horizontal-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders sidebar, main and inspector panes', async () => {
		el = await fixture('<rr-horizontal-split-view></rr-horizontal-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.split-view__sidebar')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.split-view__main')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.split-view__inspector')).not.toBeNull();
	});

	it('renders 2 dividers', async () => {
		el = await fixture('<rr-horizontal-split-view></rr-horizontal-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(2);
	});

	it('hides sidebar and its divider when show-sidebar is false', async () => {
		el = await fixture('<rr-horizontal-split-view></rr-horizontal-split-view>');
		(el as any).showSidebar = false;
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.split-view__sidebar')).toBeNull();
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(1);
	});

	it('hides inspector and its divider when show-inspector is false', async () => {
		el = await fixture('<rr-horizontal-split-view></rr-horizontal-split-view>');
		(el as any).showInspector = false;
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.split-view__inspector')).toBeNull();
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(1);
	});
});
