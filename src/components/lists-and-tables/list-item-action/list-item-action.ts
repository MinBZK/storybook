import { LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { isPointerMode } from '../../../utilities/input-modality.js';
import { listItemActionStyles } from './list-item-action.styles.js';
import { template, type ListItemActionControl } from './list-item-action.template.js';
import type { NLDDList } from '../list/list.js';

export type ListItemActionWidth = 'fit-content' | 'full';

/**
 * A segmented action inside an `nldd-list-item`: it groups a run of cells
 * and makes just that run clickable. Use it when a row needs more than one
 * action — a tree row whose chevron expands while the label toggles a checkbox,
 * or a row that navigates with a separate button beside it.
 *
 * Slot it wherever cells go (`start`, default, `end`). The default slot sits
 * above the row divider, `start` and `end` sit outside it — so putting every
 * action in the default slot gives you a divider that runs the full width.
 *
 * A row is EITHER row-level interactive (`href` / `button` / `checkbox` on the
 * `nldd-list-item`) OR segmented (one or more of these). Both at once nests
 * a control inside a control, which is invalid HTML; the item DEV-warns.
 *
 * Unlike the row-wide action this does not bleed outward: a segmented action sits
 * between siblings, so an outward inset would overlap them. Widen the hit area
 * with spacer cells INSIDE the segmented action — that space then belongs to the target.
 * A segmented action never drops below the row's control size, so an icon-only one
 * still meets the WCAG 2.5.8 target size.
 *
 * In a `type="listbox"` list the segmented action renders as a plain container (no
 * control, not focusable) and DEV-warns: an `option` may not contain
 * interactive descendants. The cells render unchanged, so nothing shifts.
 *
 * @element nldd-list-item-action
 *
 * @attr {boolean} button - Renders the segmented action as a `<button>`; ignored when `href` is set
 * @attr {string} href - Renders the segmented action as an `<a>` with this URL; wins over `button` and `checkbox`
 * @attr {string} target - Link target forwarded to the `<a>`; only applies with `href`
 * @attr {string} rel - Link rel forwarded to the `<a>`; only applies with `href`
 * @attr {boolean} checkbox - Makes the segmented action a `role="checkbox"` control; ignored when `href` is set
 * @attr {boolean} checked - Checked state of a `checkbox` action; it toggles on activation
 * @attr {boolean} expanded - Disclosure state, reflected as `aria-expanded` on the control. Set it on the segmented action that opens something (e.g. a tree row's chevron). Leave it off entirely when the segmented action discloses nothing — an absent attribute emits no aria-expanded.
 * @attr {boolean} disclosure - Marks the segmented action as the row's disclosure control: `aria-expanded` comes from the parent item's `expanded`, so the state lives in one place. A slotted `nldd-icon-cell` rotates a quarter turn while the row is open
 * @attr {boolean} current - Marks the segmented action as the current page (`aria-current="page"`)
 * @attr {boolean} disabled - Disabled state; only applies to button and checkbox segmented actions
 * @attr {'fit-content'|'full'} width - `full` lets the segmented action grow to fill the row (default: 'fit-content')
 * @attr {string} accessible-label - Accessible name for the control. Set it when the segmented action holds only an icon, or when the cell text does not describe the action.
 *
 * @fires change - On a `checkbox` action after it toggles; detail: { checked: boolean } *
 * @slot - The cells that belong to this action
 */
@customElement('nldd-list-item-action')
export class NLDDListItemAction extends LitElement {
	static override styles = [listItemActionStyles];

	@property({ type: Boolean, reflect: true })
	button = false;

	@property({ reflect: true })
	href?: string;

	@property({ reflect: true })
	target?: string;

	@property({ reflect: true })
	rel?: string;

	@property({ type: Boolean, reflect: true })
	checkbox = false;

	@property({ type: Boolean, reflect: true })
	checked = false;

	/** Undefined (attribute absent) means "discloses nothing" — no aria-expanded is emitted. */
	@property({ type: Boolean, reflect: true })
	expanded?: boolean;

	/**
	 * Marks this action as the row's disclosure control: it takes `aria-expanded`
	 * from the parent item's `expanded` instead of its own. Use it on a tree row's
	 * chevron, so the open/closed state is written once — on the row, where it also
	 * drives the children group — rather than kept in step in two places.
	 *
	 * A slotted `nldd-icon-cell` turns a quarter with that state, so a chevron
	 * points down while the row is open without any consumer CSS.
	 */
	@property({ type: Boolean, reflect: true })
	disclosure = false;

	@property({ type: Boolean, reflect: true })
	current = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ reflect: true, converter: reflectNonDefault<ListItemActionWidth>('fit-content') })
	width: ListItemActionWidth = 'fit-content';

	@property({ attribute: 'accessible-label' })
	accessibleLabel = '';

	/** Set by the parent nldd-list-item, mirroring its list's type. */
	@state()
	_parentType = 'list';

	/** Set by the parent nldd-list-item on a `disclosure` action: the row's own
	 *  expanded state, which this action announces. */
	@state()
	_rowExpanded?: boolean;

	@query('.list-item-action')
	private _control?: HTMLElement;

	override connectedCallback() {
		super.connectedCallback();
		this.addEventListener('focusin', this._handleFocusIn);
		this.addEventListener('focusout', this._handleFocusOut);
		this.addEventListener('click', this._handleClick);
		this.addEventListener('pointerdown', this._onPointerDown);
		this.addEventListener('pointerup', this._clearPressed);
		this.addEventListener('pointercancel', this._clearPressed);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('focusin', this._handleFocusIn);
		this.removeEventListener('focusout', this._handleFocusOut);
		this.removeEventListener('click', this._handleClick);
		this.removeEventListener('pointerdown', this._onPointerDown);
		this.removeEventListener('pointerup', this._clearPressed);
		this.removeEventListener('pointercancel', this._clearPressed);
	}

	override firstUpdated() {
		const list = this.closest<NLDDList>('nldd-list');
		if (list) this._applyParentType(list.type);
	}

	/** Called by the parent nldd-list-item so a runtime type switch tracks. */
	_applyParentType(type: string) {
		this._parentType = type;
		if (import.meta.env?.DEV && type === 'listbox' && this._wantsControl) {
			console.warn('nldd-list-item-action: rendered as a plain container because the parent nldd-list is type="listbox". An `option` may not contain interactive descendants — move the action out of the listbox, or drive selection from the option itself.');
		}
	}

	/** Whether the consumer asked for an interactive action at all. */
	private get _wantsControl(): boolean {
		return Boolean(this.href) || this.button || this.checkbox;
	}

	get _controlType(): ListItemActionControl {
		if (this._parentType === 'listbox' || !this._wantsControl) return 'plain';
		if (this.href) return 'link';
		if (this.checkbox) return 'checkbox';
		return 'button';
	}

	private _handleClick = (e: Event) => {
		if (this.disabled) return;
		// Safari and Firefox on Mac don't focus buttons on click. Force focus so
		// the :focus-visible styling below stays reliable.
		this._control?.focus();
		if (this._controlType !== 'checkbox') return;
		if (!e.composedPath().includes(this._control as EventTarget)) return;
		this.checked = !this.checked;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked },
			bubbles: true,
			composed: true,
		}));
	};

	private _handleFocusIn = () => {
		// Safari treats the programmatic focus above as focus-visible. Mark
		// pointer-originated focus so the CSS can suppress the ring; if JS fails
		// the class is never set and the ring shows — accessible by default.
		this._control?.classList.toggle('is-pointer-focus', isPointerMode());
	};

	private _handleFocusOut = () => {
		this._control?.classList.remove('is-pointer-focus');
	};

	private _onPointerDown = (e: PointerEvent) => {
		if (e.button > 0 || this.disabled) return;
		this._control?.classList.add('is-pressed');
	};

	private _clearPressed = () => {
		this._control?.classList.remove('is-pressed');
	};

	/** Delegates focus to the inner control so consumers needn't reach into shadow DOM. */
	override focus(options?: FocusOptions): void {
		this._control?.focus(options);
	}

	/** The open state has to reach the styles, and it lives in a property (the
	 *  row's, for a disclosure action) that CSS cannot see. A host class is the
	 *  hook — the same mechanism nldd-list already uses for .is-boxed / .is-first. */
	override updated() {
		const expanded = this.disclosure ? this._rowExpanded : this.expanded;
		this.classList.toggle('is-expanded', expanded === true);
	}

	override render() {
		if (import.meta.env?.DEV && this.disclosure && this.expanded !== undefined) {
			console.warn('nldd-list-item-action: `disclosure` takes aria-expanded from the row, so the `expanded` on this action is ignored. Drop one of the two.');
		}
		return template(
			this._controlType,
			this.href,
			this.target,
			this.rel,
			this.checked,
			this.disclosure ? this._rowExpanded : this.expanded,
			this.current,
			this.disabled,
			this.accessibleLabel,
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-list-item-action': NLDDListItemAction;
	}
}
