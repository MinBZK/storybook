/**
 * Nederlandse Digitale Dienst Table Component (Lit + TypeScript)
 *
 * Exports both NLDDTable and NLDDTableRow.
 *
 * A data table that mirrors `nldd-list` visually (simple/box variants,
 * surfaces, row dividers) but aligns content into shared columns using a CSS
 * grid + subgrid. Column widths are defined ONCE on the table via the
 * `columns` attribute (a CSS grid track list), like an HTML `<colgroup>`.
 * Rows are `<nldd-table-row>` elements whose children are the existing
 * `nldd-cell` family — every row uses `grid-template-columns: subgrid`, so all
 * rows snap to the same columns.
 *
 * Header: put one `<nldd-table-row slot="header">` in the `header` slot. Its
 * cells become column headers (role="columnheader").
 *
 * Responsive: two complementary strategies. (1) Give columns a minimum width
 * (e.g. `minmax(160px,1fr)`) and wrap the table in an `overflow-x: auto`
 * container — it scrolls horizontally when too narrow, no coordination needed.
 * (2) Drop columns at breakpoints: provide `sm-columns`/`md-columns`/
 * `lg-columns` (shorter track lists) and hide the dropped columns' cells with
 * `hide-below`/`hide-above` at the matching breakpoint. The table picks the
 * track list for its own width via the standard sm/md/lg breakpoints.
 *
 * Selection and sorting are intentionally NOT built in: add a column with an
 * `nldd-cell` + `nldd-checkbox` for selection, and drive sorting from an
 * external control (e.g. a dropdown).
 *
 * @element nldd-table
 *
 * @attr {'simple'|'box'} variant - Visual treatment; 'box' adds a rounded surface + border ring (default 'simple')
 * @attr {'tinted'|'base'} background - Surface fill for variant="box" (default 'tinted')
 * @attr {string} columns - CSS grid track list defining the columns once, e.g. "minmax(200px,1fr) 120px 80px"
 * @attr {string} sm-columns - Track list when the table is sm-wide (≤640px); falls back to `columns`
 * @attr {string} md-columns - Track list when the table is md-wide (641–1007px); falls back to `columns`
 * @attr {string} lg-columns - Track list when the table is lg-wide (≥1008px); falls back to `columns`
 * @attr {string} accessible-label - Accessible name for the table
 * @attr {string} empty-text - Text for the default empty-state dialog (falls back to the Dutch i18n default). Ignored when `[slot=empty]` is filled
 * @attr {string} empty-supporting-text - Supporting text for the default empty-state dialog. Ignored when `[slot=empty]` is filled
 * @attr {object} translations - Override translation keys; unset keys fall back to Dutch
 *
 * @slot header - One `<nldd-table-row slot="header">` carrying the column headers
 * @slot - The body rows (`<nldd-table-row>`)
 * @slot empty - Shown when there are no visible body rows (the header is hidden too). Defaults to `nldd-inline-dialog` with `empty-text` / `empty-supporting-text`
 *
 * @element nldd-table-row
 *
 * @attr {boolean} selected - Highlights the row (same treatment as nldd-list-item[selected])
 *
 * @slot - The row's cells (`nldd-cell` and variants), one per column
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tableStyles, tableRowStyles } from './table.styles.js';
import { tableTemplate, tableRowTemplate } from './table.template.js';
import { nlddTableTranslations } from './table.i18n.js';
import type { NLDDTableTranslations } from './table.i18n.js';
import { breakpoints } from '../../../assets/styles/breakpoints.js';
import '../../status-and-feedback/inline-dialog/inline-dialog.js';

export type TableVariant = 'simple' | 'box';
export type TableBackground = 'tinted' | 'base';

// Standard container breakpoints. The table picks its track list against its
// own content-box width; the same values back the cells' `hide-below`.
const SM_MAX = parseInt(breakpoints.smMax, 10);
const MD_MAX = parseInt(breakpoints.mdMax, 10);


// # nldd-table

@customElement('nldd-table')
export class NLDDTable extends LitElement {
	static override styles = tableStyles;

	@property({ type: String, reflect: true })
	variant: TableVariant = 'simple';

	@property({ type: String, reflect: true })
	background?: TableBackground;

	/** CSS grid track list applied once as the table's columns. */
	@property({ type: String, reflect: true })
	columns = '';

	/** Track list when the table is sm-wide (≤640px); falls back to `columns`. */
	@property({ type: String, reflect: true, attribute: 'sm-columns' })
	smColumns = '';

	/** Track list when the table is md-wide (641–1007px); falls back to `columns`. */
	@property({ type: String, reflect: true, attribute: 'md-columns' })
	mdColumns = '';

	/** Track list when the table is lg-wide (≥1008px); falls back to `columns`. */
	@property({ type: String, reflect: true, attribute: 'lg-columns' })
	lgColumns = '';

	@property({ type: String, reflect: true, attribute: 'accessible-label' })
	accessibleLabel = '';

	/** Text for the default empty-state dialog. Falls back to the Dutch i18n
	 *  default. Ignored when consumers slot their own `[slot=empty]` content. */
	@property({ type: String, attribute: 'empty-text' })
	emptyText = '';

	/** Optional supporting text for the default empty-state dialog. Ignored
	 *  when consumers slot their own `[slot=empty]` content. */
	@property({ type: String, attribute: 'empty-supporting-text' })
	emptySupportingText = '';

	@property({ type: Object })
	translations: Partial<NLDDTableTranslations> = {};

	private _warnedColumns = false;
	private _resizeObserver?: ResizeObserver;
	private _rowsObserver?: MutationObserver;
	/** Last observed content-box width, to resolve the active track list. */
	private _width = 0;

	public _t(key: keyof NLDDTableTranslations): string {
		return this.translations[key] ?? nlddTableTranslations[key];
	}

	override connectedCallback(): void {
		super.connectedCallback();
		// display:grid strips native table semantics — restore them for AT.
		this.setAttribute('role', 'table');
		// Cells (VisibilityMixin) hide/show against a container named
		// 'cells-container'. Set it here, like nldd-list, so cell hide-below/
		// hide-above measure the table width (not the row). Inline because
		// Safari ignores container-name set from a shadow stylesheet.
		this.style.containerType = 'inline-size';
		this.style.containerName = 'cells-container';
		// An element can't query its OWN container, so the responsive track list
		// is chosen from the observed width (the cells keep their @container).
		// The same observer keeps the scroll affordance (focusable when the box
		// overflows) in sync.
		this._resizeObserver = new ResizeObserver((entries) => {
			this._width = entries[0].contentRect.width;
			this._applyColumns();
			this._syncHostA11y();
		});
		this._resizeObserver.observe(this);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._resizeObserver?.disconnect();
		this._resizeObserver = undefined;
		this._rowsObserver?.disconnect();
		this._rowsObserver = undefined;
	}

	override firstUpdated(): void {
		// Recompute the empty state when body rows are slotted, added/removed, or
		// toggled [hidden] (consumer-driven filtering) — mirrors nldd-list.
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		slot?.addEventListener('slotchange', () => this._updateEmpty());
		this._rowsObserver = new MutationObserver((mutations) => {
			const relevant = mutations.some((m) => {
				if (m.type === 'childList') return m.target === this;
				if (m.type === 'attributes' && m.attributeName === 'hidden') {
					return m.target instanceof Element && m.target.parentElement === this;
				}
				return false;
			});
			if (relevant) this._updateEmpty();
		});
		this._rowsObserver.observe(this, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['hidden'],
		});
		this._updateEmpty();
	}

	/** Show the empty-state slot when there are no visible body rows (header
	 *  excluded). Toggled imperatively (like the tabindex affordance) so it
	 *  doesn't schedule a reactive re-render out of firstUpdated. The `is-empty`
	 *  host class drives hiding the header (CSS) so only the message shows. */
	private _updateEmpty(): void {
		const empty = this.shadowRoot?.querySelector('.table__empty');
		if (!empty) return;
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		const rows = (slot?.assignedElements() ?? []).filter(
			(el) => el.localName === 'nldd-table-row',
		);
		const isEmpty = rows.length === 0 || rows.every((row) => row.hasAttribute('hidden'));
		empty.toggleAttribute('hidden', !isEmpty);
		this.classList.toggle('is-empty', isEmpty);
	}

	/** The track list for the current width: a breakpoint override when set,
	 *  otherwise the base `columns`. */
	private _activeColumns(): string {
		if (this._width <= SM_MAX) return this.smColumns || this.columns;
		if (this._width <= MD_MAX) return this.mdColumns || this.columns;
		return this.lgColumns || this.columns;
	}

	private _applyColumns(): void {
		const cols = this._activeColumns();
		if (cols) {
			this.style.setProperty('--_columns', cols);
		} else {
			this.style.removeProperty('--_columns');
		}
	}

	/** Make the table focusable while it scrolls horizontally so keyboard users
	 *  can pan it (mirrors nldd-code-viewer / nldd-rich-text), and keep its
	 *  accessible name in sync. Both variants are their own scroll container
	 *  (overflow-x: auto); the overflow-x check (not width alone) keeps a
	 *  hypothetical non-scrolling variant from becoming a dead focus stop. The
	 *  consumer's accessible-label wins; when the table scrolls without one, a
	 *  translated fallback names the focusable region. */
	private _syncHostA11y(): void {
		const overflowX = getComputedStyle(this).overflowX;
		const scrollableOverflow = overflowX === 'auto' || overflowX === 'scroll';
		const scrollable = scrollableOverflow && this.scrollWidth > this.clientWidth;
		if (scrollable) {
			this.setAttribute('tabindex', '0');
		} else {
			this.removeAttribute('tabindex');
		}
		if (this.accessibleLabel) {
			this.setAttribute('aria-label', this.accessibleLabel);
		} else if (scrollable) {
			this.setAttribute('aria-label', this._t('components.table.scroll-label'));
		} else {
			this.removeAttribute('aria-label');
		}
	}

	override updated(changed: Map<string, unknown>): void {
		if (
			changed.has('columns') || changed.has('smColumns')
			|| changed.has('mdColumns') || changed.has('lgColumns')
		) {
			this._applyColumns();
		}
		if (changed.has('accessibleLabel')) {
			this._syncHostA11y();
		}
		if (import.meta.env?.DEV && !this.columns && !this._warnedColumns) {
			this._warnedColumns = true;
			console.warn('<nldd-table>: no `columns` set. Define a CSS grid track list (e.g. columns="200px 1fr 80px") so cells align into columns.');
		} else if (this.columns) {
			this._warnedColumns = false;
		}
	}

	override render() {
		return tableTemplate(
			this.emptyText || this._t('components.table.empty-text'),
			this.emptySupportingText,
		);
	}
}


// # nldd-table-row

@customElement('nldd-table-row')
export class NLDDTableRow extends LitElement {
	static override styles = tableRowStyles;

	/** Highlights the row. Selection is consumer-driven (e.g. a checkbox cell). */
	@property({ type: Boolean, reflect: true })
	selected = false;

	override connectedCallback(): void {
		super.connectedCallback();
		// display:grid strips native row semantics — restore them for AT.
		this.setAttribute('role', 'row');
	}

	/** A header row lives in the table's `header` slot. */
	private get _isHeader(): boolean {
		return this.getAttribute('slot') === 'header';
	}

	private _onSlotChange(e: Event): void {
		const slot = e.target as HTMLSlotElement;
		const cells = slot.assignedElements();
		const cellRole = this._isHeader ? 'columnheader' : 'cell';
		for (const cell of cells) {
			// Cells need explicit roles since the grid layout drops native
			// table semantics.
			cell.setAttribute('role', cellRole);
			// A generic nldd-cell defaults to width="fit-content" (reflected),
			// which would shrink-wrap inside a grid track. Default it to fill
			// the column. The reflected default is indistinguishable from an
			// explicit width="fit-content", so both become "full"; an author
			// who set a length or "full" is left untouched.
			if (cell.localName === 'nldd-cell') {
				const w = cell.getAttribute('width');
				if (w === null || w === '' || w === 'fit-content') {
					cell.setAttribute('width', 'full');
				}
			}
		}
	}

	override render() {
		return tableRowTemplate(this._onSlotChangeBound);
	}

	private _onSlotChangeBound = this._onSlotChange.bind(this);
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-table': NLDDTable;
		'nldd-table-row': NLDDTableRow;
	}
}
