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

// All four panes slotted
async function fixtureAllPanes(width = 1280) {
	const el = await fixture<RRNavigationSplitView>(`
		<rr-navigation-split-view>
			<rr-split-view-pane slot="sidebar"></rr-split-view-pane>
			<rr-split-view-pane slot="secondary-sidebar"></rr-split-view-pane>
			<rr-split-view-pane slot="main" has-content></rr-split-view-pane>
			<rr-split-view-pane slot="inspector"></rr-split-view-pane>
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

	it('defaults inspector-auto-hidden to false', async () => {
		el = await fixture('<rr-navigation-split-view></rr-navigation-split-view>');
		await waitForUpdate(el);
		expect(el.inspectorAutoHidden).toBe(false);
	});
});


/* ============================================================
   Inspector sheet
   ============================================================ */

describe('rr-navigation-split-view – inspector sheet', () => {
	let el: RRNavigationSplitView;

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
		el = await fixture<RRNavigationSplitView>(`
			<rr-navigation-split-view>
				<rr-split-view-pane slot="main" has-content></rr-split-view-pane>
			</rr-navigation-split-view>
		`);
		await setWidth(el, 1280);
		expect(el.inspectorAutoHidden).toBe(false);
	});
});
