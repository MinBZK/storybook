import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDAppView } from './app-view.js';
import './app-view.js';
import type { NLDDNavigationSplitView } from '../split-views/navigation-split-view/navigation-split-view.js';
import '../split-views/navigation-split-view/navigation-split-view.js';
import '../split-views/bar-split-view/bar-split-view.js';
import '../split-views/split-view-pane/split-view-pane.js';
import '../page/page.js';

describe('nldd-app-view', () => {
	let el: NLDDAppView;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the app-view container', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.app-view')).not.toBeNull();
	});

	it('renders slotted content', async () => {
		el = await fixture('<nldd-app-view><div id="child"></div></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.querySelector('#child')).not.toBeNull();
	});

	it('defaults background to "base"', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		expect((el as unknown as { background: string }).background).toBe('base');
		expect(el.hasAttribute('background')).toBe(false);
	});

	it('reflects background="tinted" attribute', async () => {
		el = await fixture('<nldd-app-view background="tinted"></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('tinted');
	});

	it('setting background property reflects to attribute', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		el.background = 'tinted';
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('tinted');
	});

	describe('document.body background ownership', () => {
		// Track every fixture so a mid-test failure can't leave a detached
		// instance still listed as `_bodyBackgroundOwner` inside the module.
		const instances: NLDDAppView[] = [];
		async function track(html: string): Promise<NLDDAppView> {
			const el = await fixture<NLDDAppView>(html);
			instances.push(el);
			return el;
		}

		afterEach(() => {
			while (instances.length > 0) {
				const inst = instances.pop()!;
				if (inst.isConnected) cleanup(inst);
			}
			document.body.style.removeProperty('background-color');
		});

		it('writes the body background on connect', async () => {
			el = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(el);
			expect(document.body.style.backgroundColor).not.toBe('');
		});

		it('clears the body background on disconnect when sole owner', async () => {
			el = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(el);
			cleanup(el);
			el = undefined as unknown as NLDDAppView;
			expect(document.body.style.backgroundColor).toBe('');
		});

		it('does not erase a surviving instance when an older one disconnects', async () => {
			const first = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(first);
			const second = await track('<nldd-app-view background="tinted"></nldd-app-view>');
			await waitForUpdate(second);

			// `second` is the most recent writer; its background sits on body.
			const ownedBySecond = document.body.style.backgroundColor;
			expect(ownedBySecond).not.toBe('');

			// Disconnecting the older instance must not clear the surviving one's
			// background — that was the multi-instance regression.
			cleanup(first);
			expect(document.body.style.backgroundColor).toBe(ownedBySecond);

			// Then disconnecting the actual owner clears it.
			cleanup(second);
			expect(document.body.style.backgroundColor).toBe('');
		});
	});

	describe('overscroll-behavior on documentElement and body', () => {
		const instances: NLDDAppView[] = [];
		async function track(html: string): Promise<NLDDAppView> {
			const el = await fixture<NLDDAppView>(html);
			instances.push(el);
			return el;
		}

		afterEach(() => {
			while (instances.length > 0) {
				const inst = instances.pop()!;
				if (inst.isConnected) cleanup(inst);
			}
			document.documentElement.style.removeProperty('overscroll-behavior');
			document.body.style.removeProperty('overscroll-behavior');
		});

		it('locks overscroll on connect and clears on last disconnect', async () => {
			el = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(el);
			expect(document.documentElement.style.overscrollBehavior).toBe('none');
			expect(document.body.style.overscrollBehavior).toBe('none');

			cleanup(el);
			el = undefined as unknown as NLDDAppView;
			expect(document.documentElement.style.overscrollBehavior).toBe('');
			expect(document.body.style.overscrollBehavior).toBe('');
		});

		it('keeps the lock while another instance is still connected', async () => {
			const first = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(first);
			const second = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(second);

			cleanup(first);
			expect(document.body.style.overscrollBehavior).toBe('none');

			cleanup(second);
			expect(document.body.style.overscrollBehavior).toBe('');
		});
	});
});


/* ============================================================
   Derived scroll mode (Phase 3 — auto root/nested)
   ============================================================ */

describe('nldd-app-view – derived scroll mode', () => {
	let el: NLDDAppView;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	async function setNavWidth(nav: NLDDNavigationSplitView, width: number) {
		vi.spyOn(nav, 'getBoundingClientRect').mockReturnValue({ width } as DOMRect);
		nav._updateLayout();
		await waitForUpdate(el);
	}

	it('derives root when its split view collapses to one column, nested when it expands', async () => {
		el = await fixture<NLDDAppView>(`
			<nldd-app-view>
				<nldd-navigation-split-view>
					<nldd-split-view-pane slot="primary-sidebar" has-content></nldd-split-view-pane>
					<nldd-split-view-pane slot="main" has-content></nldd-split-view-pane>
				</nldd-navigation-split-view>
			</nldd-app-view>
		`);
		const nav = el.querySelector('nldd-navigation-split-view') as NLDDNavigationSplitView;

		await setNavWidth(nav, 320);   // sidebar + main can't fit → one column
		expect(el.style.getPropertyValue('--context-scroll-mode')).toBe('root');

		await setNavWidth(nav, 1280);  // both fit → multi-column
		expect(el.style.getPropertyValue('--context-scroll-mode')).toBe('nested');

		await setNavWidth(nav, 320);
		expect(el.style.getPropertyValue('--context-scroll-mode')).toBe('root');
	});

	it('pushes the derived mode down to a nested nldd-page', async () => {
		el = await fixture<NLDDAppView>(`
			<nldd-app-view>
				<nldd-navigation-split-view>
					<nldd-split-view-pane slot="main" has-content>
						<nldd-page></nldd-page>
					</nldd-split-view-pane>
				</nldd-navigation-split-view>
			</nldd-app-view>
		`);
		const nav = el.querySelector('nldd-navigation-split-view') as NLDDNavigationSplitView;
		const page = el.querySelector('nldd-page') as HTMLElement;

		await setNavWidth(nav, 320);   // full-stack → the whole app is one column
		expect(page.dataset.scroll).toBe('root');
	});

	it('propagates root through bar-split-view › nav-split-view › bar-split-view nesting', async () => {
		el = await fixture<NLDDAppView>(`
			<nldd-app-view>
				<nldd-bar-split-view>
					<nldd-split-view-pane slot="main">
						<nldd-navigation-split-view>
							<nldd-split-view-pane slot="main" has-content>
								<nldd-bar-split-view>
									<nldd-split-view-pane slot="main">
										<nldd-page></nldd-page>
									</nldd-split-view-pane>
								</nldd-bar-split-view>
							</nldd-split-view-pane>
						</nldd-navigation-split-view>
					</nldd-split-view-pane>
				</nldd-bar-split-view>
			</nldd-app-view>
		`);
		const nav = el.querySelector('nldd-navigation-split-view') as NLDDNavigationSplitView;
		// [0] = outer bar-split-view, [1] = the one nested inside the nav pane.
		const innerBar = el.querySelectorAll('nldd-bar-split-view')[1] as HTMLElement;
		const page = el.querySelector('nldd-page') as HTMLElement;

		await setNavWidth(nav, 320);   // collapse the nav → the whole app is one column

		expect(el.style.getPropertyValue('--context-scroll-mode')).toBe('root');
		// The mode reaches every layer regardless of nesting depth: the outer bar,
		// the deeply-nested inner bar, and the page all flip to root.
		expect(innerBar.dataset.scroll).toBe('root');
		expect(page.dataset.scroll).toBe('root');
	});

	it('hands the current derived mode to a layer that registers after derivation (navigation re-mount)', async () => {
		el = await fixture<NLDDAppView>(`
			<nldd-app-view>
				<nldd-navigation-split-view>
					<nldd-split-view-pane slot="main" has-content></nldd-split-view-pane>
				</nldd-navigation-split-view>
			</nldd-app-view>
		`);
		const nav = el.querySelector('nldd-navigation-split-view') as NLDDNavigationSplitView;
		await setNavWidth(nav, 320);   // app-view derives root before the new layer exists
		expect(el.style.getPropertyValue('--context-scroll-mode')).toBe('root');

		// A layer registering now (e.g. a page re-mounted on navigation) must be
		// handed the current mode immediately — not left to self-read a var that
		// can be stale mid-remount (the Chrome-only "stuck nested" bug).
		const received: (string | undefined)[] = [];
		const appView = el as unknown as { registerScrollConsumer(c: { readScrollMode(m?: string): void }): void };
		appView.registerScrollConsumer({ readScrollMode: (m) => received.push(m) });
		expect(received).toEqual(['root']);
	});

	it('leaves the mode unset for a bare-page app (no horizontal split view)', async () => {
		el = await fixture<NLDDAppView>(`
			<nldd-app-view>
				<nldd-page></nldd-page>
			</nldd-app-view>
		`);
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--context-scroll-mode')).toBe('');
	});
});
