import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './side-by-side-split-view.js';
import type { NLDDSideBySideSplitView } from './side-by-side-split-view.js';

describe('nldd-side-by-side-split-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-side-by-side-split-view></nldd-side-by-side-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders 2 panes by default', async () => {
		el = await fixture('<nldd-side-by-side-split-view></nldd-side-by-side-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.side-by-side-split-view__pane').length).toBe(2);
	});

	it('renders the correct number of panes', async () => {
		el = await fixture('<nldd-side-by-side-split-view panes="3"></nldd-side-by-side-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('.side-by-side-split-view__pane').length).toBe(3);
	});

	it('renders dividers between panes', async () => {
		el = await fixture('<nldd-side-by-side-split-view panes="3"></nldd-side-by-side-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('nldd-split-view-divider').length).toBe(2);
	});
});


/* ============================================================
   Single column — isSingleColumn getter + single-column-change event
   ============================================================ */

describe('nldd-side-by-side-split-view – single column', () => {
	let el: NLDDSideBySideSplitView;

	afterEach(() => { cleanup(el); vi.restoreAllMocks(); });

	// Drive the responsive collapse deterministically: pin a pane min-width and a
	// mocked host width, then run the observer's callback (as ResizeObserver would).
	// floor(width / minWidth) panes fit; a count of <= 1 is single-column.
	async function setWidth(host: NLDDSideBySideSplitView, width: number) {
		(host as unknown as { _paneMinWidth: number })._paneMinWidth = 320;
		vi.spyOn(host, 'getBoundingClientRect').mockReturnValue({ width } as DOMRect);
		(host as unknown as { _updateVisiblePanes(): void })._updateVisiblePanes();
		await waitForUpdate(host);
	}

	it('reports isSingleColumn only when at most one pane fits', async () => {
		el = await fixture<NLDDSideBySideSplitView>('<nldd-side-by-side-split-view panes="2"></nldd-side-by-side-split-view>');
		await waitForUpdate(el);
		await setWidth(el, 1280);
		expect(el.isSingleColumn).toBe(false);
		await setWidth(el, 320);
		expect(el.isSingleColumn).toBe(true);
	});

	it('dispatches a bubbling, composed single-column-change event when the column count flips', async () => {
		el = await fixture<NLDDSideBySideSplitView>('<nldd-side-by-side-split-view panes="2"></nldd-side-by-side-split-view>');
		await waitForUpdate(el);
		await setWidth(el, 1280); // baseline: multi-column
		const seen: CustomEvent<{ singleColumn: boolean }>[] = [];
		// Listen on an ancestor to prove the event bubbles out of the component.
		el.parentElement!.addEventListener('nldd-single-column-change', (e) => seen.push(e as CustomEvent<{ singleColumn: boolean }>));
		await setWidth(el, 320);  // → single column
		await setWidth(el, 1280); // → multi column
		expect(seen.map(e => e.detail.singleColumn)).toEqual([true, false]);
		expect(seen[0].bubbles).toBe(true);
		expect(seen[0].composed).toBe(true);
	});

	it('does not re-dispatch while the column count is unchanged', async () => {
		el = await fixture<NLDDSideBySideSplitView>('<nldd-side-by-side-split-view panes="2"></nldd-side-by-side-split-view>');
		await waitForUpdate(el);
		await setWidth(el, 1280); // baseline: multi-column
		const seen: boolean[] = [];
		el.parentElement!.addEventListener('nldd-single-column-change', (e) => seen.push((e as CustomEvent<{ singleColumn: boolean }>).detail.singleColumn));
		await setWidth(el, 1600); // still multi-column → no event
		await setWidth(el, 1280); // still multi-column → no event
		expect(seen).toEqual([]);
	});
});

describe('nldd-side-by-side-split-view neemt de scrollmodus over', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	// Deze view bepaalt de modus voor iedereen (hij vuurt single-column-change)
	// maar paste hem niet op zichzelf toe. Hij bleef daardoor op kijkvensterhoogte
	// afkappen terwijl de panes erbinnen al meestroomden, en dan scrolt niets.
	it('reflecteert root naar data-scroll', async () => {
		el = await fixture(`
			<div style="--context-scroll-mode: root">
				<nldd-side-by-side-split-view></nldd-side-by-side-split-view>
			</div>
		`);
		const view = el.querySelector('nldd-side-by-side-split-view') as HTMLElement;
		await waitForUpdate(view);
		expect(view.dataset.scroll).toBe('root');
	});

	it('blijft nested zonder die variabele', async () => {
		el = await fixture('<div><nldd-side-by-side-split-view></nldd-side-by-side-split-view></div>');
		const view = el.querySelector('nldd-side-by-side-split-view') as HTMLElement;
		await waitForUpdate(view);
		expect(view.dataset.scroll).not.toBe('root');
	});
});
