import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import type { RRNavigationSplitView } from './rr-navigation-split-view.js';
import './rr-navigation-split-view.ts';
import '../split-view-pane/rr-split-view-pane.ts';

async function setWidth(el: RRNavigationSplitView, width: number) {
	vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({ width } as DOMRect);
	el._updateLayout();
	await waitForUpdate(el);
}

// max-levels="3" — all panes
async function fixtureLevel3(width = 1280) {
	const el = await fixture<RRNavigationSplitView>(`
		<rr-navigation-split-view max-levels="3">
			<rr-split-view-pane slot="sidebar"></rr-split-view-pane>
			<rr-split-view-pane slot="secondary-sidebar"></rr-split-view-pane>
			<rr-split-view-pane slot="main" has-content></rr-split-view-pane>
			<rr-split-view-pane slot="inspector"></rr-split-view-pane>
		</rr-navigation-split-view>
	`);
	await setWidth(el, width);
	return el;
}

// max-levels="2" — sidebar + main
async function fixtureLevel2(width = 640) {
	const el = await fixture<RRNavigationSplitView>(`
		<rr-navigation-split-view max-levels="2">
			<rr-split-view-pane slot="sidebar"></rr-split-view-pane>
			<rr-split-view-pane slot="main" has-content></rr-split-view-pane>
		</rr-navigation-split-view>
	`);
	await setWidth(el, width);
	return el;
}


/* ============================================================
   Smoke tests
   ============================================================ */

describe('rr-navigation-split-view', () => {
	let el: RRNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('renders without error', async () => {
		el = await fixture('<rr-navigation-split-view></rr-navigation-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults max-levels to 1', async () => {
		el = await fixture('<rr-navigation-split-view></rr-navigation-split-view>');
		await waitForUpdate(el);
		expect(el.maxLevels).toBe(1);
	});

	it('clamps max-levels <= 0 to effective level 1', async () => {
		el = await fixture('<rr-navigation-split-view max-levels="0"></rr-navigation-split-view>');
		await waitForUpdate(el);
		expect((el as any)._effectiveLevels).toBe(1);
	});

	it('defaults to mode spatial', async () => {
		el = await fixture('<rr-navigation-split-view></rr-navigation-split-view>');
		await waitForUpdate(el);
		expect(el.mode).toBe('spatial');
	});

	it('defaults inspector-auto-hidden to false', async () => {
		el = await fixture('<rr-navigation-split-view></rr-navigation-split-view>');
		await waitForUpdate(el);
		expect(el.inspectorAutoHidden).toBe(false);
	});
});


/* ============================================================
   max-levels="3" — spatial (≥ 1280px)
   ============================================================ */

describe('rr-navigation-split-view – max-levels="3" spatial', () => {
	let el: RRNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('shows all four panes', async () => {
		el = await fixtureLevel3(1280);
		expect(el._showSidebar).toBe(true);
		expect(el._showSecondarySidebar).toBe(true);
		expect(el._showMain).toBe(true);
		expect(el._showInspector).toBe(true);
	});

	it('sets mode to spatial', async () => {
		el = await fixtureLevel3(1280);
		expect(el.mode).toBe('spatial');
	});

	it('sets hide-back on all panes', async () => {
		el = await fixtureLevel3(1280);
		el.querySelectorAll('rr-split-view-pane').forEach(pane => {
			expect(pane.hasAttribute('hide-back')).toBe(true);
		});
	});
});


/* ============================================================
   max-levels="3" — sidebar-stack (640–959px)
   ============================================================ */

describe('rr-navigation-split-view – max-levels="3" sidebar-stack', () => {
	let el: RRNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('sets mode to sidebar-stack', async () => {
		el = await fixtureLevel3(640);
		expect(el.mode).toBe('sidebar-stack');
	});

	it('hides sidebar, shows secondary-sidebar and main', async () => {
		el = await fixtureLevel3(640);
		expect(el._showSidebar).toBe(false);
		expect(el._showSecondarySidebar).toBe(true);
		expect(el._showMain).toBe(true);
	});

	it('removes hide-back from secondary-sidebar (has sidebar behind it)', async () => {
		el = await fixtureLevel3(640);
		const secondarySidebar = el.querySelector('rr-split-view-pane[slot="secondary-sidebar"]');
		expect(secondarySidebar?.hasAttribute('hide-back')).toBe(false);
	});

	it('sets hide-back on main (visible alongside secondary-sidebar)', async () => {
		el = await fixtureLevel3(640);
		const main = el.querySelector('rr-split-view-pane[slot="main"]');
		expect(main?.hasAttribute('hide-back')).toBe(true);
	});
});


/* ============================================================
   max-levels="3" — full-stack (< 320px)
   ============================================================ */

describe('rr-navigation-split-view – max-levels="3" full-stack', () => {
	let el: RRNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('sets mode to full-stack', async () => {
		el = await fixtureLevel3(300);
		expect(el.mode).toBe('full-stack');
	});

	it('shows main when main has-content (highest priority)', async () => {
		el = await fixtureLevel3(300);
		expect(el._showMain).toBe(true);
		expect(el._showSidebar).toBe(false);
		expect(el._showSecondarySidebar).toBe(false);
	});

	it('shows secondary-sidebar when it has-content and main does not', async () => {
		const el2 = await fixture<RRNavigationSplitView>(`
			<rr-navigation-split-view max-levels="3">
				<rr-split-view-pane slot="sidebar"></rr-split-view-pane>
				<rr-split-view-pane slot="secondary-sidebar" has-content></rr-split-view-pane>
				<rr-split-view-pane slot="main"></rr-split-view-pane>
			</rr-navigation-split-view>
		`);
		await setWidth(el2, 300);
		expect(el2._showSecondarySidebar).toBe(true);
		expect(el2._showMain).toBe(false);
		cleanup(el2);
	});

	it('shows sidebar when only sidebar has-content', async () => {
		const el2 = await fixture<RRNavigationSplitView>(`
			<rr-navigation-split-view max-levels="3">
				<rr-split-view-pane slot="sidebar" has-content></rr-split-view-pane>
				<rr-split-view-pane slot="secondary-sidebar"></rr-split-view-pane>
				<rr-split-view-pane slot="main"></rr-split-view-pane>
			</rr-navigation-split-view>
		`);
		await setWidth(el2, 300);
		expect(el2._showSidebar).toBe(true);
		expect(el2._showMain).toBe(false);
		cleanup(el2);
	});

	it('sets hide-back on sidebar (root)', async () => {
		const el2 = await fixture<RRNavigationSplitView>(`
			<rr-navigation-split-view max-levels="3">
				<rr-split-view-pane slot="sidebar" has-content></rr-split-view-pane>
				<rr-split-view-pane slot="secondary-sidebar"></rr-split-view-pane>
				<rr-split-view-pane slot="main"></rr-split-view-pane>
			</rr-navigation-split-view>
		`);
		await setWidth(el2, 300);
		const sidebar = el2.querySelector('rr-split-view-pane[slot="sidebar"]');
		expect(sidebar?.hasAttribute('hide-back')).toBe(true);
		cleanup(el2);
	});

	it('does not set hide-back on secondary-sidebar in full-stack', async () => {
		el = await fixtureLevel3(300);
		const secondarySidebar = el.querySelector('rr-split-view-pane[slot="secondary-sidebar"]');
		expect(secondarySidebar?.hasAttribute('hide-back')).toBe(false);
	});

	it('does not set hide-back on main in full-stack', async () => {
		el = await fixtureLevel3(300);
		const main = el.querySelector('rr-split-view-pane[slot="main"]');
		expect(main?.hasAttribute('hide-back')).toBe(false);
	});
});


/* ============================================================
   max-levels="2" — sidebar + main
   ============================================================ */

describe('rr-navigation-split-view – max-levels="2"', () => {
	let el: RRNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('sets hide-back on sidebar in full-stack (root)', async () => {
		el = await fixtureLevel2(300);
		const sidebar = el.querySelector('rr-split-view-pane[slot="sidebar"]');
		expect(sidebar?.hasAttribute('hide-back')).toBe(true);
	});

	it('does not set hide-back on main in full-stack', async () => {
		el = await fixtureLevel2(300);
		const main = el.querySelector('rr-split-view-pane[slot="main"]');
		expect(main?.hasAttribute('hide-back')).toBe(false);
	});
});


/* ============================================================
   max-levels > 3 — consumer owns depth, never hide-back on sidebar
   ============================================================ */

describe('rr-navigation-split-view – max-levels > 3', () => {
	let el: RRNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('never sets hide-back on sidebar in full-stack', async () => {
		el = await fixture<RRNavigationSplitView>(`
			<rr-navigation-split-view max-levels="5">
				<rr-split-view-pane slot="sidebar" has-content></rr-split-view-pane>
				<rr-split-view-pane slot="main" has-content></rr-split-view-pane>
			</rr-navigation-split-view>
		`);
		await setWidth(el, 300);
		const sidebar = el.querySelector('rr-split-view-pane[slot="sidebar"]');
		expect(sidebar?.hasAttribute('hide-back')).toBe(false);
	});

	it('does not render secondary-sidebar slot', async () => {
		el = await fixture<RRNavigationSplitView>(`
			<rr-navigation-split-view max-levels="5">
				<rr-split-view-pane slot="sidebar"></rr-split-view-pane>
				<rr-split-view-pane slot="main" has-content></rr-split-view-pane>
			</rr-navigation-split-view>
		`);
		await setWidth(el, 1280);
		expect(el._showSecondarySidebar).toBe(false);
	});
});


/* ============================================================
   max-levels="1" — no sidebar, main is root
   ============================================================ */

describe('rr-navigation-split-view – max-levels="1"', () => {
	let el: RRNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('sets hide-back on main in full-stack (no nav)', async () => {
		el = await fixture<RRNavigationSplitView>(`
			<rr-navigation-split-view>
				<rr-split-view-pane slot="main" has-content></rr-split-view-pane>
			</rr-navigation-split-view>
		`);
		await setWidth(el, 300);
		const main = el.querySelector('rr-split-view-pane[slot="main"]');
		expect(main?.hasAttribute('hide-back')).toBe(true);
	});
});


/* ============================================================
   Inspector sheet
   ============================================================ */

describe('rr-navigation-split-view – inspector sheet', () => {
	let el: RRNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('sets inspector-auto-hidden when inspector does not fit', async () => {
		el = await fixtureLevel3(640);
		expect(el.inspectorAutoHidden).toBe(true);
	});

	it('renders inspector dialog when inspector-auto-hidden', async () => {
		el = await fixtureLevel3(640);
		expect(el.shadowRoot!.querySelector('.navigation-split-view__inspector-sheet')).not.toBeNull();
	});

	it('showInspectorSheet() opens the dialog', async () => {
		el = await fixtureLevel3(640);
		el.showInspectorSheet();
		await waitForUpdate(el);
		const dialog = el.shadowRoot!.querySelector<HTMLDialogElement>('.navigation-split-view__inspector-sheet')!;
		expect(dialog.open).toBe(true);
	});

	it('hideInspectorSheet() adds is-closing class', async () => {
		el = await fixtureLevel3(640);
		el.showInspectorSheet();
		await waitForUpdate(el);
		el.hideInspectorSheet();
		const dialog = el.shadowRoot!.querySelector<HTMLDialogElement>('.navigation-split-view__inspector-sheet')!;
		expect(dialog.classList.contains('is-closing')).toBe(true);
	});

	it('does not set inspector-auto-hidden when no inspector slotted', async () => {
		el = await fixture<RRNavigationSplitView>(`
			<rr-navigation-split-view max-levels="3">
				<rr-split-view-pane slot="main" has-content></rr-split-view-pane>
			</rr-navigation-split-view>
		`);
		await setWidth(el, 1280);
		expect(el.inspectorAutoHidden).toBe(false);
	});
});
