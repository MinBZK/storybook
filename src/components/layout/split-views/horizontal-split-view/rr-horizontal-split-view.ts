/**
 * RegelRecht Horizontal Split View Component (Lit + TypeScript)
 *
 * Een vierkoloms layout met een zijbalk, secundaire zijbalk, inhoudsgebied en inspecteur.
 * De zijbalken tonen navigatie of lijsten, het inhoudsgebied de primaire inhoud,
 * en de inspecteur aanvullende details of eigenschappen van de selectie.
 *
 * @element rr-horizontal-split-view
 *
 * Gebruik <code>rr-split-view-pane</code> als directe kinderen voor automatische
 * terugknop- en modusafhandeling.
 *
 * Stel <code>max-levels</code> in om de navigatiestructuur te bepalen. Levels omvatten
 * alle navigeerbare panelen inclusief het inhoudsgebied:
 * - 1 (standaard): alleen inhoudsgebied
 * - 2: zijbalk + inhoudsgebied
 * - 3: zijbalk + secundaire zijbalk + inhoudsgebied
 * - >3: zijbalk + inhoudsgebied, consumer beheert eigen navigatiediepte
 *
 * @attr {number}                       max-levels            - Aantal navigatieniveaus inclusief inhoud (standaard: 1)
 * @attr {boolean}                      inspector-auto-hidden - Inspecteur verborgen om ruimte vrij te maken voor andere panelen (alleen-lezen, ingesteld door de split view)
 * @attr {boolean}                      inspector-as-sheet    - Toon de inspecteur altijd als sheet, ongeacht beschikbare ruimte
 *
 * @slot sidebar           - Linker paneel voor primaire navigatie (vereist max-levels >= 2)
 * @slot secondary-sidebar - Tweede paneel voor secundaire navigatie (vereist max-levels === 3)
 * @slot main              - Middelste paneel voor de primaire inhoud
 * @slot inspector         - Rechter paneel voor details of eigenschappen
 *
 * @method showInspectorSheet() - Opent de inspecteur als sheet; heeft alleen effect wanneer inspector-auto-hidden of inspector-as-sheet actief is
 * @method hideInspectorSheet() - Sluit de inspecteur sheet
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { horizontalSplitViewStyles } from './rr-horizontal-split-view.styles.ts';
import { horizontalSplitViewTemplate } from './rr-horizontal-split-view.template.ts';

@customElement('rr-horizontal-split-view')
export class RRHorizontalSplitView extends LitElement {
	static override styles = horizontalSplitViewStyles;

	@property({ type: Number, reflect: true, attribute: 'max-levels' })
	maxLevels = 1;

	private get _hasInspector(): boolean {
		return this.querySelector('[slot="inspector"]') !== null;
	}

	@state()
	private _mode: 'spatial' | 'sidebar-stack' | 'full-stack' = 'spatial';

	@property({ type: Boolean, reflect: true, attribute: 'inspector-auto-hidden' })
	inspectorAutoHidden = false;

	@property({ type: Boolean, reflect: true, attribute: 'inspector-as-sheet' })
	inspectorAsSheet = false;

	@state()
	private _inspectorMode: 'inline' | 'sheet' = 'inline';

	// Internal visibility driven by layout algorithm — not part of public API
	@state()
	_showSidebar = false;

	@state()
	_showSecondarySidebar = false;

	@state()
	_showMain = true;

	@state()
	_showInspector = true;

	@state()
	_inspectorSheetOpen = false;

	private _resizeObserver: ResizeObserver | null = null;
	private _paneObserver: MutationObserver | null = null;
	private _hostObserver: MutationObserver | null = null;

	// Cached pane min-widths — read from CSS in firstUpdated
	private _paneMinWidths = { sidebar: 320, secondarySidebar: 320, main: 320, inspector: 320 };

	private get _inspectorSheet(): HTMLDialogElement | null {
		return this.shadowRoot?.querySelector('.horizontal-split-view__inspector-sheet') ?? null;
	}

	private get _inspectorSlot(): HTMLSlotElement | null {
		return this.shadowRoot?.querySelector('slot[name="inspector"]') ?? null;
	}

	// Effective levels — clamp to minimum 1, accessible from template
	get _effectiveLevels(): number {
		return Math.max(1, this.maxLevels);
	}

	private get _hasSidebar(): boolean {
		return this._effectiveLevels >= 2;
	}

	private get _hasSecondarySidebar(): boolean {
		return this._effectiveLevels === 3;
	}

	private get _mainHasContent(): boolean {
		return this.querySelector('rr-split-view-pane[slot="main"]')?.hasAttribute('has-content') ?? false;
	}

	private get _sidebarHasContent(): boolean {
		return this.querySelector('rr-split-view-pane[slot="sidebar"]')?.hasAttribute('has-content') ?? false;
	}

	private get _secondarySidebarHasContent(): boolean {
		return this.querySelector('rr-split-view-pane[slot="secondary-sidebar"]')?.hasAttribute('has-content') ?? false;
	}

	override connectedCallback() {
		super.connectedCallback();
		this._resizeObserver = new ResizeObserver(() => this._updateLayout());
		this._resizeObserver.observe(this);
		this.addEventListener('dismiss', this._handleInspectorSheetDismiss);

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
		this.removeEventListener('dismiss', this._handleInspectorSheetDismiss);
	}

	private _observePanes() {
		this._paneObserver?.disconnect();
		this.querySelectorAll('rr-split-view-pane').forEach(pane => {
			this._paneObserver!.observe(pane, {
				attributes: true,
				attributeFilter: ['has-content'],
			});
		});
	}

	override firstUpdated() {
		// Read pane min-widths from CSS after first render — styles are guaranteed applied
		const style = getComputedStyle(this);
		const read = (prop: string) => parseFloat(style.getPropertyValue(prop)) || 320;
		this._paneMinWidths = {
			sidebar: read('--_sidebar-min-width'),
			secondarySidebar: read('--_secondary-sidebar-min-width'),
			main: read('--_main-min-width'),
			inspector: read('--_inspector-min-width'),
		};
		this._updateLayout();
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('maxLevels') || changed.has('inspectorAsSheet')) {
			this._updateLayout();
		}
		if (changed.has('inspectorAutoHidden') && !this.inspectorAutoHidden) {
			this._closeInspectorSheetImmediate();
		}
	}

	_updateLayout() {
		const width = this.getBoundingClientRect().width;
		const { sidebar: sidebarMin, secondarySidebar: secondarySidebarMin, main: mainMin, inspector: inspectorMin } = this._paneMinWidths;

		let sidebar = this._hasSidebar;
		let secondarySidebar = this._hasSecondarySidebar;
		let main = true;
		let inspector = this._hasInspector;

		// Calculate total min-width of requested panes
		const requestedWidth = () => [
			sidebar && sidebarMin,
			secondarySidebar && secondarySidebarMin,
			main && mainMin,
			inspector && inspectorMin,
		].reduce((sum: number, v) => sum + (v || 0), 0);

		// Step 1: hide inspector if not enough space
		if (inspector && requestedWidth() > width) {
			inspector = false;
		}

		// Step 2: collapse sidebar into secondary-sidebar when not enough space
		if (sidebar && secondarySidebar && requestedWidth() > width) {
			sidebar = false;
		}

		// Determine mode
		const sidebarCollapsed = this._hasSidebar && this._hasSecondarySidebar && !sidebar && secondarySidebar;

		let mode: 'spatial' | 'sidebar-stack' | 'full-stack';
		if (sidebarCollapsed && requestedWidth() <= width) {
			mode = 'sidebar-stack';
		} else if (!sidebarCollapsed && requestedWidth() <= width) {
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

			if (this._hasSecondarySidebar) {
				// Priority: main > secondary-sidebar > sidebar
				if (this._mainHasContent) {
					main = true;
				} else if (this._secondarySidebarHasContent) {
					secondarySidebar = true;
				} else if (this._sidebarHasContent) {
					sidebar = true;
				} else {
					main = true; // fallback empty state
				}
			} else if (this._hasSidebar) {
				// Priority: main > sidebar
				if (this._mainHasContent) {
					main = true;
				} else if (this._sidebarHasContent) {
					sidebar = true;
				} else {
					main = true; // fallback empty state
				}
			} else {
				main = true;
			}
		}

		// No nav, inspector requested, main has no content — hide inspector
		if (!sidebar && !secondarySidebar && inspector && !this._mainHasContent) {
			inspector = false;
		}

		this._showSidebar = sidebar;
		this._showSecondarySidebar = secondarySidebar;
		this._showMain = main;
		// Inspector shown inline only when it fits AND consumer hasn't forced sheet mode
		this._showInspector = inspector && !this.inspectorAsSheet;

		this.inspectorAutoHidden = this._hasInspector && !inspector;
		this._inspectorMode = (inspector && !this.inspectorAsSheet) ? 'inline' : 'sheet';
		this._mode = mode;
		this.classList.toggle('full-stack', mode === 'full-stack');

		this._updatePanes();
	}

	private _updatePanes() {
		const sidebarPane = this.querySelector('rr-split-view-pane[slot="sidebar"]');
		const secondarySidebarPane = this.querySelector('rr-split-view-pane[slot="secondary-sidebar"]');
		const mainPane = this.querySelector('rr-split-view-pane[slot="main"]');

		// Set mode on all panes
		[sidebarPane, secondarySidebarPane, mainPane].forEach(pane => {
			if (pane) pane.setAttribute('mode', this._mode);
		});

		if (this._mode === 'spatial') {
			// Spatial: all panes visible side by side — no back buttons
			[sidebarPane, secondarySidebarPane, mainPane].forEach(pane => {
				if (pane) pane.setAttribute('hide-back', '');
			});
			return;
		}

		if (this._mode === 'sidebar-stack') {
			// Secondary-sidebar is leftmost — hide-back (nothing to go back to)
			// Main has secondary-sidebar to its left — hide-back (both still visible side by side)
			// Secondary-sidebar has sidebar in consumer intent behind it — no hide-back
			if (sidebarPane) sidebarPane.setAttribute('hide-back', '');
			if (secondarySidebarPane) secondarySidebarPane.removeAttribute('hide-back');
			if (mainPane) mainPane.setAttribute('hide-back', '');
			return;
		}

		if (this._mode === 'full-stack') {
			if (this._hasSecondarySidebar) {
				// max-levels === 3: sidebar is root — hide-back; others have predecessors
				if (sidebarPane) sidebarPane.setAttribute('hide-back', '');
				if (secondarySidebarPane) secondarySidebarPane.removeAttribute('hide-back');
				if (mainPane) mainPane.removeAttribute('hide-back');
			} else if (this._hasSidebar && this._effectiveLevels === 2) {
				// max-levels === 2: sidebar is root — hide-back; main has sidebar behind it
				if (sidebarPane) sidebarPane.setAttribute('hide-back', '');
				if (mainPane) mainPane.removeAttribute('hide-back');
			} else {
				// max-levels === 1 or >3 or Infinity: consumer owns depth — never hide-back
				[sidebarPane, secondarySidebarPane, mainPane].forEach(pane => {
					if (pane) pane.removeAttribute('hide-back');
				});
				// Exception: no nav at all — main is root
				if (!this._hasSidebar && mainPane) {
					mainPane.setAttribute('hide-back', '');
				}
			}
		}
	}

	showInspectorSheet() {
		if (!this.inspectorAutoHidden && !this.inspectorAsSheet) return;
		this.updateComplete.then(() => {
			this._inspectorSheet?.showModal();
			this._inspectorSheetOpen = true;
			this._manageInspectorSheetFocus();
		});
	}

	private _manageInspectorSheetFocus() {
		const assigned = this._inspectorSlot?.assignedElements({ flatten: true }) ?? [];

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
			heading.setAttribute('tabindex', '-1');
			heading.focus();
			heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
			return;
		}

		// 3. Fallback — focus the dialog itself
		this._inspectorSheet?.focus();
	}

	private _handleInspectorSheetDismiss = () => {
		if (this.inspectorAutoHidden || this.inspectorAsSheet) {
			this.hideInspectorSheet();
		}
	};

	hideInspectorSheet() {
		const dialog = this._inspectorSheet;
		if (!dialog?.open) return;

		dialog.classList.add('is-closing');
		dialog.addEventListener('animationend', () => {
			dialog.classList.remove('is-closing');
			dialog.close();
			this._inspectorSheetOpen = false;
		}, { once: true });

		requestAnimationFrame(() => {
			if (dialog.classList.contains('is-closing') && getComputedStyle(dialog).animationName === 'none') {
				dialog.classList.remove('is-closing');
				dialog.close();
				this._inspectorSheetOpen = false;
			}
		});
	}

	private _closeInspectorSheetImmediate() {
		const dialog = this._inspectorSheet;
		if (!dialog?.open) return;
		dialog.classList.remove('is-closing');
		dialog.close();
		this._inspectorSheetOpen = false;
	}

	_handleInspectorSheetClick(e: MouseEvent) {
		if (e.target === this._inspectorSheet) {
			this.hideInspectorSheet();
		}
	}

	_handleInspectorSheetCancel(e: Event) {
		e.preventDefault();
		this.hideInspectorSheet();
	}

	override render() {
		return horizontalSplitViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-horizontal-split-view': RRHorizontalSplitView;
	}
}
