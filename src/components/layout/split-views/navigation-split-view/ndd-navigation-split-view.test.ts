import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import type { NDDNavigationSplitView } from './ndd-navigation-split-view.js';
import './ndd-navigation-split-view.ts';
import '../split-view-pane/ndd-split-view-pane.ts';

async function setWidth(el: NDDNavigationSplitView, width: number) {
	vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({ width } as DOMRect);
	el._updateLayout();
	await waitForUpdate(el);
}

// All four panes slotted
async function fixtureAllPanes(width = 1280) {
	const el = await fixture<NDDNavigationSplitView>(`
		<ndd-navigation-split-view>
			<ndd-split-view-pane slot="sidebar"></ndd-split-view-pane>
			<ndd-split-view-pane slot="secondary-sidebar"></ndd-split-view-pane>
			<ndd-split-view-pane slot="main" has-content></ndd-split-view-pane>
			<ndd-split-view-pane slot="inspector"></ndd-split-view-pane>
		</ndd-navigation-split-view>
	`);
	await setWidth(el, width);
	return el;
}


/* ============================================================
   Smoke tests
   ============================================================ */

describe('ndd-navigation-split-view', () => {
	let el: NDDNavigationSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	it('renders without error', async () => {
		el = await fixture('<ndd-navigation-split-view></ndd-navigation-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults inspector-auto-hidden to false', async () => {
		el = await fixture('<ndd-navigation-split-view></ndd-navigation-split-view>');
		await waitForUpdate(el);
		expect(el.inspectorAutoHidden).toBe(false);
	});
});


/* ============================================================
   Inspector sheet
   ============================================================ */

describe('ndd-navigation-split-view – inspector sheet', () => {
	let el: NDDNavigationSplitView;

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
		el = await fixture<NDDNavigationSplitView>(`
			<ndd-navigation-split-view>
				<ndd-split-view-pane slot="main" has-content></ndd-split-view-pane>
			</ndd-navigation-split-view>
		`);
		await setWidth(el, 1280);
		expect(el.inspectorAutoHidden).toBe(false);
	});
});
