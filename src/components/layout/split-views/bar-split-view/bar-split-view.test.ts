import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './bar-split-view.js';
import type { NLDDBarSplitView } from './bar-split-view.js';

// jsdom returns 0 for getBoundingClientRect().width, so the component always
// initialises at the 'sm' breakpoint in tests. Breakpoint-specific rendering
// (e.g. dividers on md/lg) is tested by setting _currentBreakpoint directly.
// The ResizeObserver must be disconnected first to prevent it from resetting
// the breakpoint back to 'sm' on the next observation cycle.

async function setBreakpoint(el: HTMLElement, bp: 'sm' | 'md' | 'lg') {
	(el as any)._resizeObserver?.disconnect();
	(el as NLDDBarSplitView)._currentBreakpoint = bp;
	await waitForUpdate(el);
}

describe('nldd-bar-split-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-bar-split-view></nldd-bar-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('always renders main pane', async () => {
		el = await fixture('<nldd-bar-split-view></nldd-bar-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.bar-split-view__main')).not.toBeNull();
	});

	it('renders no bar wrappers when no bar children are slotted', async () => {
		el = await fixture('<nldd-bar-split-view></nldd-bar-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.bar-split-view__bar').length).toBe(0);
	});

	it('renders a bar wrapper for each slotted bar child', async () => {
		el = await fixture(`
			<nldd-bar-split-view>
				<div slot="toolbar">Toolbar</div>
				<div slot="main">Main</div>
				<div slot="status">Status</div>
			</nldd-bar-split-view>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.bar-split-view__bar').length).toBe(2);
	});

	it('renders no dividers when no bars are present, even on md', async () => {
		el = await fixture('<nldd-bar-split-view><div slot="main">Main</div></nldd-bar-split-view>');
		await setBreakpoint(el, 'md');
		expect(el.shadowRoot!.querySelectorAll('.bar-split-view__divider').length).toBe(0);
	});

	it('sorts children by the active breakpoint order attribute', async () => {
		el = await fixture(`
			<nldd-bar-split-view>
				<div slot="toolbar" sm-order="2" md-order="1">Toolbar</div>
				<div slot="main"    sm-order="1" md-order="2">Main</div>
			</nldd-bar-split-view>
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
			<nldd-bar-split-view>
				<div>No slot</div>
				<div slot="main">Main</div>
			</nldd-bar-split-view>
		`);
		await waitForUpdate(el);
		expect(warn).toHaveBeenCalledWith(
			expect.stringContaining('<nldd-bar-split-view>'),
			expect.anything()
		);
		expect(el.shadowRoot!.querySelectorAll('slot[name=""]').length).toBe(0);
		warn.mockRestore();
	});
	it('falls back to DOM order when no order attributes are set', async () => {
		el = await fixture(`
			<nldd-bar-split-view>
				<div slot="toolbar">Toolbar</div>
				<div slot="main">Main</div>
				<div slot="status">Status</div>
			</nldd-bar-split-view>
		`);
		await waitForUpdate(el);

		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).toEqual(['toolbar', 'main', 'status']);
	});

	it('hides a bar with only="md" on sm viewports', async () => {
		el = await fixture(`
			<nldd-bar-split-view>
				<div slot="toolbar" only="md">Toolbar</div>
				<div slot="main">Main</div>
			</nldd-bar-split-view>
		`);
		// jsdom width is 0 → sm breakpoint
		await waitForUpdate(el);
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).not.toContain('toolbar');
	});

	it('shows a bar with only="sm" on sm viewports', async () => {
		el = await fixture(`
			<nldd-bar-split-view>
				<div slot="toolbar" only="sm">Toolbar</div>
				<div slot="main">Main</div>
			</nldd-bar-split-view>
		`);
		await waitForUpdate(el);
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).toContain('toolbar');
	});

	it('hides a bar with above="md" on sm viewports', async () => {
		el = await fixture(`
			<nldd-bar-split-view>
				<div slot="toolbar" above="md">Toolbar</div>
				<div slot="main">Main</div>
			</nldd-bar-split-view>
		`);
		await waitForUpdate(el);
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).not.toContain('toolbar');
	});

	it('shows a bar with above="md" on md viewports', async () => {
		el = await fixture(`
			<nldd-bar-split-view>
				<div slot="toolbar" above="md">Toolbar</div>
				<div slot="main">Main</div>
			</nldd-bar-split-view>
		`);
		await setBreakpoint(el, 'md');
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).toContain('toolbar');
	});

	it('hides a bar with below="sm" on md viewports', async () => {
		el = await fixture(`
			<nldd-bar-split-view>
				<div slot="mobile-bar" below="sm">Mobile</div>
				<div slot="main">Main</div>
			</nldd-bar-split-view>
		`);
		await setBreakpoint(el, 'md');
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).not.toContain('mobile-bar');
	});

	it('shows a bar with below="sm" on sm viewports', async () => {
		el = await fixture(`
			<nldd-bar-split-view>
				<div slot="mobile-bar" below="sm">Mobile</div>
				<div slot="main">Main</div>
			</nldd-bar-split-view>
		`);
		await waitForUpdate(el);
		const slots = Array.from(el.shadowRoot!.querySelectorAll('slot'));
		const slotNames = slots.map(s => s.getAttribute('name'));
		expect(slotNames).toContain('mobile-bar');
	});

	describe('dividers — only where main meets an adjacent bar', () => {
		const dividerCount = (host: HTMLElement) =>
			host.shadowRoot!.querySelectorAll('.bar-split-view__divider').length;

		it('draws a divider between main and a single bar above it', async () => {
			el = await fixture(`
				<nldd-bar-split-view>
					<div slot="toolbar">Toolbar</div>
					<div slot="main">Main</div>
				</nldd-bar-split-view>
			`);
			await waitForUpdate(el);
			expect(dividerCount(el)).toBe(1);
		});

		it('draws a divider on both sides of main when bars sit above and below', async () => {
			el = await fixture(`
				<nldd-bar-split-view>
					<div slot="toolbar">Toolbar</div>
					<div slot="main">Main</div>
					<div slot="status">Status</div>
				</nldd-bar-split-view>
			`);
			await waitForUpdate(el);
			expect(dividerCount(el)).toBe(2);
		});

		it('never draws a divider between two stacked bars', async () => {
			el = await fixture(`
				<nldd-bar-split-view>
					<div slot="toolbar">Toolbar</div>
					<div slot="document-tabs">Tabs</div>
					<div slot="main">Main</div>
				</nldd-bar-split-view>
			`);
			await waitForUpdate(el);
			// toolbar↕tabs is a bar↕bar seam (no divider); only tabs↕main draws one.
			expect(dividerCount(el)).toBe(1);
		});

		it('groups multiple bars per side behind a single seam divider', async () => {
			el = await fixture(`
				<nldd-bar-split-view>
					<div slot="toolbar">Toolbar</div>
					<div slot="document-tabs">Tabs</div>
					<div slot="main">Main</div>
					<div slot="status">Status</div>
					<div slot="mobile-bar">Mobile</div>
				</nldd-bar-split-view>
			`);
			await waitForUpdate(el);
			// Above main: toolbar,tabs → one seam (tabs↕main). Below main:
			// status,mobile → one seam (main↕status). Bar↕bar seams: none.
			expect(dividerCount(el)).toBe(2);
		});

		it('places the divider directly adjacent to the main pane', async () => {
			el = await fixture(`
				<nldd-bar-split-view>
					<div slot="toolbar">Toolbar</div>
					<div slot="document-tabs">Tabs</div>
					<div slot="main">Main</div>
				</nldd-bar-split-view>
			`);
			await waitForUpdate(el);
			const wrapper = el.shadowRoot!.querySelector('.bar-split-view')!;
			const children = Array.from(wrapper.children);
			const dividerIndex = children.findIndex(c => c.classList.contains('bar-split-view__divider'));
			const mainIndex = children.findIndex(c => c.classList.contains('bar-split-view__main'));
			expect(dividerIndex).toBe(mainIndex - 1);
		});

		it('draws the same dividers on sm and md (breakpoint-independent)', async () => {
			el = await fixture(`
				<nldd-bar-split-view>
					<div slot="toolbar">Toolbar</div>
					<div slot="main">Main</div>
					<div slot="status">Status</div>
				</nldd-bar-split-view>
			`);
			await waitForUpdate(el); // jsdom width 0 → sm
			expect(dividerCount(el)).toBe(2);
			await setBreakpoint(el, 'md');
			expect(dividerCount(el)).toBe(2);
		});
	});
});
