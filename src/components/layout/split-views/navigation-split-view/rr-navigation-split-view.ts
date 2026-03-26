/**
 * RegelRecht Navigation Split View Component (Lit + TypeScript)
 *
 * A four-column layout with a sidebar, secondary sidebar, main content area, and inspector.
 * The sidebars show navigation or lists, the main area shows primary content,
 * and the inspector shows additional details or properties of the selection.
 * Panes are shown automatically when content is slotted into them.
 *
 * @element rr-navigation-split-view
 *
 * Use <code>rr-split-view-pane</code> as direct children for automatic
 * back button handling.
 *
 * @attr {boolean} inspector-auto-hidden       - Inspector hidden to free up space for other panes (read-only, set by the split view)
 * @attr {boolean} inspector-as-sheet          - Always show the inspector as a sheet regardless of available space
 * @attr {boolean} sidebar-as-sheet            - Always show the sidebar as a sheet, keeping main visible at full width
 * @attr {string}  inspector-accessible-label  - Accessible name for the inspector sheet dialog (default: 'Details')
 * @attr {string}  sidebar-accessible-label    - Accessible name for the sidebar sheet dialog (default: 'Navigatie')
 *
 * @slot sidebar           - Left pane for primary navigation
 * @slot secondary-sidebar - Second pane for secondary navigation (shown when slotted)
 * @slot main              - Center pane for primary content
 * @slot inspector         - Right pane for details or properties
 *
 * @method showInspectorSheet() - Opens the inspector as a sheet (async); only has effect when inspector-auto-hidden or inspector-as-sheet is active
 * @method hideInspectorSheet() - Closes the inspector sheet
 * @method showSidebarSheet()   - Opens the sidebar as a sheet (async); only has effect when sidebar-as-sheet is active
 * @method hideSidebarSheet()   - Closes the sidebar sheet
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { navigationSplitViewStyles } from './rr-navigation-split-view.styles.ts';
import { navigationSplitViewTemplate } from './rr-navigation-split-view.template.ts';

@customElement('rr-navigation-split-view')
export class RRNavigationSplitView extends LitElement {
	static override styles = navigationSplitViewStyles;

	@property({ type: Boolean, reflect: true, attribute: 'inspector-auto-hidden' })
	inspectorAutoHidden = false;

	@property({ type: Boolean, reflect: true, attribute: 'inspector-as-sheet' })
	inspectorAsSheet = false;

	@property({ type: Boolean, reflect: true, attribute: 'sidebar-as-sheet' })
	sidebarAsSheet = false;

	/** Accessible name for the inspector sheet dialog. */
	@property({ type: String, attribute: 'inspector-accessible-label' })
	inspectorAccessibleLabel = 'Details';

	/** Accessible name for the sidebar sheet dialog. */
	@property({ type: String, attribute: 'sidebar-accessible-label' })
	sidebarAccessibleLabel = 'Navigatie';

	// Internal visibility driven by layout algorithm — not part of public API
	@state()
	_showSidebar = false;

	@state()
	_showSecondarySidebar = false;

	@state()
	_showMain = true;

	@state()
	_showInspector = true;

	private _mode: 'spatial' | 'sidebar-stack' | 'full-stack' = 'spatial';
	private _resizeObserver: ResizeObserver | null = null;
	private _paneObserver: MutationObserver | null = null;
	private _hostObserver: MutationObserver | null = null;

	// Cached pane min-widths — read from CSS in firstUpdated
	private _paneMinWidths = { sidebar: 320, secondarySidebar: 320, main: 480, inspector: 320 };

	private get _inspectorSheet(): HTMLDialogElement | null {
		return this.shadowRoot?.querySelector('.navigation-split-view__inspector-sheet') ?? null;
	}

	private get _sidebarSheet(): HTMLDialogElement | null {
		return this.shadowRoot?.querySelector('.navigation-split-view__sidebar-sheet') ?? null;
	}

	private get _hasSidebar(): boolean {
		return this.querySelector(':scope > [slot="sidebar"]') !== null;
	}

	private get _hasSecondarySidebar(): boolean {
		return this.querySelector(':scope > [slot="secondary-sidebar"]') !== null;
	}

	private get _hasInspector(): boolean {
		return this.querySelector(':scope > [slot="inspector"]') !== null;
	}

	_paneHasContent(slot: string): boolean {
		return this.querySelector(`:scope > rr-split-view-pane[slot="${slot}"]`)?.hasAttribute('has-content') ?? false;
	}

	override connectedCallback() {
		super.connectedCallback();
		this._resizeObserver = new ResizeObserver(() => this._updateLayout());
		this._resizeObserver.observe(this);
		this.addEventListener('dismiss', this._handleDismiss);

		this._paneObserver = new MutationObserver(() => this._updateLayout());
		this._hostObserver = new MutationObserver(() => {
			this._observePanes();
			this._updateLayout();
		});
		this._hostObserver.observe(this, { childList: true });
		this._observePanes();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._resizeObserver?.disconnect();
		this._resizeObserver = null;
		this._paneObserver?.disconnect();
		this._paneObserver = null;
		this._hostObserver?.disconnect();
		this._hostObserver = null;
		this.removeEventListener('dismiss', this._handleDismiss);
	}

	private _observePanes() {
		this._paneObserver?.disconnect();
		this.querySelectorAll(':scope > rr-split-view-pane').forEach(pane => {
			this._paneObserver!.observe(pane, {
				attributes: true,
				attributeFilter: ['has-content'],
			});
		});
	}

	override firstUpdated() {
		// Read pane min-widths from CSS after first render — styles are guaranteed applied
		const style = getComputedStyle(this);
		const read = (prop: string) => parseFloat(style.getPropertyValue(prop));
		this._paneMinWidths = {
			sidebar: read('--_sidebar-min-width') || this._paneMinWidths.sidebar,
			secondarySidebar: read('--_secondary-sidebar-min-width') || this._paneMinWidths.secondarySidebar,
			main: read('--_main-min-width') || this._paneMinWidths.main,
			inspector: read('--_inspector-min-width') || this._paneMinWidths.inspector,
		};
		this._updateLayout();
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('inspectorAsSheet') || changed.has('sidebarAsSheet')) {
			this._updateLayout();
		}
		// Close inspector sheet immediately when inspector-auto-hidden clears and inspector-as-sheet is not set
		if (changed.has('inspectorAutoHidden') && !this.inspectorAutoHidden && !this.inspectorAsSheet) {
			this._closeSheetImmediate(this._inspectorSheet);
		}
	}

	_updateLayout() {
		const width = this.getBoundingClientRect().width;
		const { sidebar: sidebarMin, secondarySidebar: secondarySidebarMin, main: mainMin, inspector: inspectorMin } = this._paneMinWidths;

		// When sidebar-as-sheet, sidebars never render inline — main always fills full width
		let sidebar = this.sidebarAsSheet ? false : this._hasSidebar;
		let secondarySidebar = this.sidebarAsSheet ? false : this._hasSecondarySidebar;
		let main = true;
		let inspector = this._hasInspector;

		// Sum min-widths of currently requested panes
		const requestedWidth = () => [
			sidebar && sidebarMin,
			secondarySidebar && secondarySidebarMin,
			main && mainMin,
			inspector && inspectorMin,
		].reduce((sum: number, v) => sum + (v || 0), 0);

		// Step 1: hide inspector if not enough space
		if (inspector && requestedWidth() > width) inspector = false;

		// Step 2: collapse sidebar into secondary sidebar if still not enough space
		if (sidebar && secondarySidebar && requestedWidth() > width) sidebar = false;

		// Determine mode
		const sidebarCollapsed = this._hasSidebar && this._hasSecondarySidebar && !sidebar && secondarySidebar;
		const fits = requestedWidth() <= width;

		let mode: 'spatial' | 'sidebar-stack' | 'full-stack';
		if (sidebarCollapsed && fits) {
			mode = 'sidebar-stack';
		} else if (!sidebarCollapsed && fits) {
			mode = 'spatial';
		} else {
			mode = 'full-stack';
		}

		// Full-stack: show only the deepest pane with content
		if (mode === 'full-stack') {
			sidebar = false;
			secondarySidebar = false;
			main = false;
			inspector = false;

			// Priority: main > secondary sidebar (if available) > sidebar (if available) > main fallback
			if (this._paneHasContent('main')) {
				main = true;
			} else if (this._hasSecondarySidebar && this._paneHasContent('secondary-sidebar')) {
				secondarySidebar = true;
			} else if (this._hasSidebar && this._paneHasContent('sidebar')) {
				sidebar = true;
			} else {
				main = true; // fallback to empty state
			}
		}

		// No nav and no content — hide inspector
		if (!sidebar && !secondarySidebar && inspector && !this._paneHasContent('main')) {
			inspector = false;
		}

		this._showSidebar = sidebar;
		this._showSecondarySidebar = secondarySidebar;
		this._showMain = main;
		// Inspector shown inline only when it fits AND consumer has not forced sheet mode
		this._showInspector = inspector && !this.inspectorAsSheet;

		this.inspectorAutoHidden = this._hasInspector && !inspector;
		this._mode = mode;
		this.classList.toggle('full-stack', mode === 'full-stack');

		this._updatePaneBackButtons();
	}

	private _updatePaneBackButtons() {
		const panes = {
			sidebar: this.querySelector(':scope > rr-split-view-pane[slot="sidebar"]'),
			secondarySidebar: this.querySelector(':scope > rr-split-view-pane[slot="secondary-sidebar"]'),
			main: this.querySelector(':scope > rr-split-view-pane[slot="main"]'),
		};

		// When sidebar-as-sheet, main is always the only visible inline pane — no back buttons
		// Secondary sidebar in the sheet can go back to sidebar — keep its back button
		if (this.sidebarAsSheet) {
			panes.secondarySidebar?.removeAttribute('hide-back');
			panes.main?.setAttribute('hide-back', '');
			return;
		}

		// All panes visible side by side — sidebar never gets hide-back,
		// secondary sidebar gets hide-back because sidebar is visible alongside it
		if (this._mode === 'spatial') {
			panes.secondarySidebar?.setAttribute('hide-back', '');
			panes.main?.setAttribute('hide-back', '');
			return;
		}

		// Sidebar is hidden — secondary sidebar can go back to it
		// Main is visible alongside secondary sidebar — no sequential navigation
		if (this._mode === 'sidebar-stack') {
			panes.secondarySidebar?.removeAttribute('hide-back');
			panes.main?.setAttribute('hide-back', '');
			return;
		}

		// Sidebar never gets hide-back — consumer controls navigation depth
		if (this._mode === 'full-stack') {
			panes.secondarySidebar?.removeAttribute('hide-back');
			panes.main?.removeAttribute('hide-back');
			return;
		}
	}

	// ----------------------------------------------------------------
	// Sidebar sheet
	// ----------------------------------------------------------------

	/** Opens the sidebar as a sheet. Awaitable — resolves once the dialog is open. */
	async showSidebarSheet(): Promise<void> {
		if (!this.sidebarAsSheet) return;
		await this.updateComplete;
		this._sidebarSheet?.showModal();
		this._manageSidebarSheetFocus();
	}

	hideSidebarSheet() {
		this._hideSheet(this._sidebarSheet);
	}

	private _manageSidebarSheetFocus() {
		// Focus the active slot — secondary sidebar when it has content, sidebar otherwise
		const activeSlotName = this._hasSecondarySidebar && this._paneHasContent('secondary-sidebar')
			? 'secondary-sidebar'
			: 'sidebar';
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>(`slot[name="${activeSlotName}"]`);
		const assigned = slot?.assignedElements({ flatten: true }) ?? [];
		this._manageFocusForSlot(assigned, this._sidebarSheet);
	}

	_handleSidebarSheetClick(e: MouseEvent) {
		if (e.target === this._sidebarSheet) this.hideSidebarSheet();
	}

	_handleSidebarSheetCancel(e: Event) {
		e.preventDefault();
		this.hideSidebarSheet();
	}

	// ----------------------------------------------------------------
	// Inspector sheet
	// ----------------------------------------------------------------

	/** Opens the inspector as a sheet. Awaitable — resolves once the dialog is open. */
	async showInspectorSheet(): Promise<void> {
		if (!this.inspectorAutoHidden && !this.inspectorAsSheet) return;
		await this.updateComplete;
		this._inspectorSheet?.showModal();
		this._manageInspectorSheetFocus();
	}

	hideInspectorSheet() {
		this._hideSheet(this._inspectorSheet);
	}

	private _manageInspectorSheetFocus() {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="inspector"]');
		const assigned = slot?.assignedElements({ flatten: true }) ?? [];
		this._manageFocusForSlot(assigned, this._inspectorSheet);
	}

	_handleInspectorSheetClick(e: MouseEvent) {
		if (e.target === this._inspectorSheet) this.hideInspectorSheet();
	}

	_handleInspectorSheetCancel(e: Event) {
		e.preventDefault();
		this.hideInspectorSheet();
	}

	// ----------------------------------------------------------------
	// Shared focus helper
	// ----------------------------------------------------------------

	private _manageFocusForSlot(assigned: Element[], fallback: HTMLDialogElement | null) {
		// 1. autofocus element present — let the browser handle it natively
		if (assigned.some(el => el.querySelector('[autofocus]'))) return;

		// 2. Focus the first heading — check rr-top-title-bar shadow root first,
		// then fall back to light DOM headings inside assigned elements
		const topTitleBar = assigned.flatMap(el => [
			el.tagName === 'RR-TOP-TITLE-BAR' ? el : null,
			el.querySelector('rr-top-title-bar'),
		]).find(Boolean) as HTMLElement | null;

		const heading = (
			topTitleBar?.shadowRoot?.querySelector('h1,h2,h3,h4,h5,h6') as HTMLElement | null
		) ?? (
			assigned.map(el => el.querySelector('h1,h2,h3,h4,h5,h6')).find(Boolean) as HTMLElement | null
		);

		if (heading) {
			const hadTabindex = heading.hasAttribute('tabindex');
			if (!hadTabindex) heading.setAttribute('tabindex', '-1');
			heading.focus();
			if (!hadTabindex) {
				heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
			}
			return;
		}

		// 3. Fallback — focus the dialog itself
		fallback?.focus();
	}

	// ----------------------------------------------------------------
	// Shared sheet helpers
	// ----------------------------------------------------------------

	private _handleDismiss = (e: Event) => {
		// Route dismiss events to the correct sheet based on composed path
		const path = e.composedPath();
		if (path.some(el => el === this._sidebarSheet)) {
			this.hideSidebarSheet();
		} else if (this.inspectorAutoHidden || this.inspectorAsSheet) {
			this.hideInspectorSheet();
		}
	};

	private _hideSheet(dialog: HTMLDialogElement | null) {
		if (!dialog?.open) return;

		dialog.classList.add('is-closing');
		dialog.addEventListener('animationend', () => {
			dialog.classList.remove('is-closing');
			dialog.close();
		}, { once: true });

		// Fallback for prefers-reduced-motion — no animation fires
		requestAnimationFrame(() => {
			if (dialog.classList.contains('is-closing') && getComputedStyle(dialog).animationName === 'none') {
				dialog.classList.remove('is-closing');
				dialog.close();
			}
		});
	}

	private _closeSheetImmediate(dialog: HTMLDialogElement | null) {
		if (!dialog?.open) return;
		dialog.classList.remove('is-closing');
		dialog.close();
	}

	override render() {
		return navigationSplitViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-navigation-split-view': RRNavigationSplitView;
	}
}
