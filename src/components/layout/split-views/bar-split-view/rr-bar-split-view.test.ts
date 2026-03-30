import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-bar-split-view.ts';
import type { RRBarSplitView } from './rr-bar-split-view.ts';

// jsdom returns 0 for getBoundingClientRect().width, so the component always
// initialises at the 'sm' breakpoint in tests. Breakpoint-specific rendering
// (e.g. dividers on md/lg) is tested by setting _currentBreakpoint directly.

describe('rr-bar-split-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-bar-split-view></rr-bar-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('always renders main pane', async () => {
		el = await fixture('<rr-bar-split-view></rr-bar-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.bar-split-view__main')).not.toBeNull();
	});

	it('renders no bar wrappers when no bar children are slotted', async () => {
		el = await fixture('<rr-bar-split-view></rr-bar-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.bar-split-view__bar').length).toBe(0);
	});

	it('renders a bar wrapper for each slotted bar child', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="toolbar">Toolbar</div>
				<div slot="main">Main</div>
				<div slot="status">Status</div>
			</rr-bar-split-view>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.bar-split-view__bar').length).toBe(2);
	});

	it('renders no dividers on sm viewports', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="toolbar">Toolbar</div>
				<div slot="main">Main</div>
				<div slot="status">Status</div>
			</rr-bar-split-view>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.bar-split-view__divider').length).toBe(0);
	});

	it('renders dividers between panes on md viewports', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="toolbar">Toolbar</div>
				<div slot="main">Main</div>
				<div slot="status">Status</div>
			</rr-bar-split-view>
		`);
		(el as RRBarSplitView)._currentBreakpoint = 'md';
		(el as RRBarSplitView).requestUpdate();
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.bar-split-view__divider').length).toBe(2);
	});

	it('renders no dividers when no bars are present, even on md', async () => {
		el = await fixture('<rr-bar-split-view><div slot="main">Main</div></rr-bar-split-view>');
		(el as RRBarSplitView)._currentBreakpoint = 'md';
		(el as RRBarSplitView).requestUpdate();
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.bar-split-view__divider').length).toBe(0);
	});

	it('sorts children by the active breakpoint order attribute', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="toolbar" sm-order="2" md-order="1">Toolbar</div>
				<div slot="main"    sm-order="1" md-order="2">Main</div>
			</rr-bar-split-view>
		`);
		await waitForUpdate(el);

		// On sm (jsdom default): main (sm-order=1) should be rendered before toolbar (sm-order=2)
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames.indexOf('main')).toBeLessThan(slotNames.indexOf('toolbar'));
	});

	it('ignores and warns about children without a slot attribute', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture(`
			<rr-bar-split-view>
				<div>No slot</div>
				<div slot="main">Main</div>
			</rr-bar-split-view>
		`);
		await waitForUpdate(el);
		expect(warn).toHaveBeenCalledWith(
			expect.stringContaining('<rr-bar-split-view>'),
			expect.anything()
		);
		expect(el.shadowRoot!.querySelectorAll('slot[name=""]').length).toBe(0);
		warn.mockRestore();
	});
	it('falls back to DOM order when no order attributes are set', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="toolbar">Toolbar</div>
				<div slot="main">Main</div>
				<div slot="status">Status</div>
			</rr-bar-split-view>
		`);
		await waitForUpdate(el);

		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).toEqual(['toolbar', 'main', 'status']);
	});

	it('hides a bar with only="md" on sm viewports', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="toolbar" only="md">Toolbar</div>
				<div slot="main">Main</div>
			</rr-bar-split-view>
		`);
		// jsdom width is 0 → sm breakpoint
		await waitForUpdate(el);
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).not.toContain('toolbar');
	});

	it('shows a bar with only="sm" on sm viewports', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="toolbar" only="sm">Toolbar</div>
				<div slot="main">Main</div>
			</rr-bar-split-view>
		`);
		await waitForUpdate(el);
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).toContain('toolbar');
	});

	it('hides a bar with above="md" on sm viewports', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="toolbar" above="md">Toolbar</div>
				<div slot="main">Main</div>
			</rr-bar-split-view>
		`);
		await waitForUpdate(el);
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).not.toContain('toolbar');
	});

	it('shows a bar with above="md" on md viewports', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="toolbar" above="md">Toolbar</div>
				<div slot="main">Main</div>
			</rr-bar-split-view>
		`);
		(el as RRBarSplitView)._currentBreakpoint = 'md';
		(el as RRBarSplitView).requestUpdate();
		await waitForUpdate(el);
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).toContain('toolbar');
	});

	it('hides a bar with below="sm" on md viewports', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="mobile-bar" below="sm">Mobile</div>
				<div slot="main">Main</div>
			</rr-bar-split-view>
		`);
		(el as RRBarSplitView)._currentBreakpoint = 'md';
		(el as RRBarSplitView).requestUpdate();
		await waitForUpdate(el);
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).not.toContain('mobile-bar');
	});

	it('shows a bar with below="sm" on sm viewports', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="mobile-bar" below="sm">Mobile</div>
				<div slot="main">Main</div>
			</rr-bar-split-view>
		`);
		await waitForUpdate(el);
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).toContain('mobile-bar');
	});
});
