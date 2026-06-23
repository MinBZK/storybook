import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import type { NLDDNavigationSplitView } from './navigation-split-view.js';
import './navigation-split-view.js';
import '../split-view-pane/split-view-pane.js';

async function setWidth(el: NLDDNavigationSplitView, width: number) {
	vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({ width } as DOMRect);
	el._updateLayout();
	await waitForUpdate(el);
}

// All four panes slotted
async function fixtureAllPanes(width = 1280) {
	const el = await fixture<NLDDNavigationSplitView>(`
		<nldd-navigation-split-view>
			<nldd-split-view-pane slot="primary-sidebar"></nldd-split-view-pane>
			<nldd-split-view-pane slot="secondary-sidebar"></nldd-split-view-pane>
			<nldd-split-view-pane slot="main" has-content></nldd-split-view-pane>
			<nldd-split-view-pane slot="inspector"></nldd-split-view-pane>
		</nldd-navigation-split-view>
	`);
	await setWidth(el, width);
	return el;
}


/* ============================================================
   Smoke tests
   ============================================================ */

describe('nldd-navigation-split-view', () => {
	let el: NLDDNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('renders without error', async () => {
		el = await fixture('<nldd-navigation-split-view></nldd-navigation-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults inspector-auto-hidden to false', async () => {
		el = await fixture('<nldd-navigation-split-view></nldd-navigation-split-view>');
		await waitForUpdate(el);
		expect(el.inspectorAutoHidden).toBe(false);
	});
});


/* ============================================================
   Primary sidebar — deprecated 'sidebar' slot alias
   ============================================================ */

describe('nldd-navigation-split-view – primary sidebar alias', () => {
	let el: NLDDNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('treats the deprecated slot="sidebar" alias as a primary sidebar', async () => {
		el = await fixture<NLDDNavigationSplitView>(`
			<nldd-navigation-split-view>
				<nldd-split-view-pane slot="sidebar" has-content></nldd-split-view-pane>
				<nldd-split-view-pane slot="main" has-content></nldd-split-view-pane>
			</nldd-navigation-split-view>
		`);
		await setWidth(el, 1280);
		expect(el.shadowRoot!.querySelector('.navigation-split-view__primary-sidebar-pane')).not.toBeNull();
	});
});


/* ============================================================
   Inspector sheet
   ============================================================ */

describe('nldd-navigation-split-view – inspector sheet', () => {
	let el: NLDDNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('sets inspector-auto-hidden when inspector does not fit', async () => {
		el = await fixtureAllPanes(640);
		expect(el.inspectorAutoHidden).toBe(true);
	});

	it('renders inspector dialog when inspector-auto-hidden', async () => {
		el = await fixtureAllPanes(640);
		expect(el.shadowRoot!.querySelector('.navigation-split-view__inspector-sheet')).not.toBeNull();
	});

	it('showInspectorSheet() opens the dialog', async () => {
		el = await fixtureAllPanes(640);
		await el.showInspectorSheet();
		const dialog = el.shadowRoot!.querySelector<HTMLDialogElement>('.navigation-split-view__inspector-sheet')!;
		expect(dialog.open).toBe(true);
	});

	it('hideInspectorSheet() adds is-closing class', async () => {
		el = await fixtureAllPanes(640);
		await el.showInspectorSheet();
		el.hideInspectorSheet();
		const dialog = el.shadowRoot!.querySelector<HTMLDialogElement>('.navigation-split-view__inspector-sheet')!;
		expect(dialog.classList.contains('is-closing')).toBe(true);
	});

	it('does not set inspector-auto-hidden when no inspector slotted', async () => {
		el = await fixture<NLDDNavigationSplitView>(`
			<nldd-navigation-split-view>
				<nldd-split-view-pane slot="main" has-content></nldd-split-view-pane>
			</nldd-navigation-split-view>
		`);
		await setWidth(el, 1280);
		expect(el.inspectorAutoHidden).toBe(false);
	});
});
