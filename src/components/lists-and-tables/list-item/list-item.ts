import { LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { listItemStyles } from './list-item.styles.js';
import { template } from './list-item.template.js';
import { isPointerMode } from '../../../utilities/input-modality.js';
import { withTranslations } from '../../../utilities/with-translations.js';
import { nlddListItemTranslations } from './list-item.i18n.js';
import type { NLDDList, ListType } from '../list/list.js';
import '../cells/spacer-cell/spacer-cell.js';

export type ListItemSize = 'sm' | 'md';

/**
 * A row within an `nldd-list`, providing layout for start, main and end areas.
 * Renders as a link when `href` is set, as a button when `button` is set, or
 * as a plain container otherwise. When it renders as a link, `target` and `rel`
 * are forwarded to the inner `<a>` (e.g. `target="_blank" rel="noopener noreferrer"`). With
 * `target="_blank"` the item also injects a visually hidden "opens in new tab"
 * announcement for assistive technology (WCAG 2.1 SC 3.2.2).
 *
 * The item synchronises its ARIA with its parent `nldd-list`'s `type`:
 * - `list` parent       → `role="listitem"`
 * - `navigation` parent → `role="listitem"` + `aria-current="page"` on the
 *                         inner `<a>` / `<button>` when `selected`
 *
 * @slot         - Main content area
 * @slot start   - Content at the start of the row
 * @slot end     - Content at the end of the row
 */
@customElement('nldd-list-item')
export class NLDDListItem extends withTranslations(LitElement, nlddListItemTranslations) {
	static override styles = [listItemStyles];

	@property({ reflect: true })
	size: ListItemSize = 'md';

	@property({ type: Boolean, reflect: true })
	selected = false;

	/** When set, renders the item as a button; ignored when href is set. */
	@property({ type: Boolean, reflect: true })
	button = false;

	/** When set, renders the item as a link. */
	@property({ reflect: true })
	href?: string;

	/**
	 * Link target (e.g. '_blank' to open in a new tab). Forwarded to the `<a>`; only applies with href.
	 * When set to '_blank', the item appends a visually hidden "opens in new tab" announcement to the
	 * link so the change of context is conveyed to assistive technology (WCAG 2.1 SC 3.2.2). Override
	 * the wording via the `translations` property.
	 */
	@property({ reflect: true })
	target?: string;

	/** Link rel (e.g. 'noopener noreferrer'). Forwarded to the `<a>`; only applies with href. */
	@property({ reflect: true })
	rel?: string;

	/** Set by the parent nldd-list when reorderable is enabled. Used as a CSS hook for drag handle visibility. */
	@property({ type: Boolean, reflect: true })
	reorderable = false;

	@state()
	private _showStart = false;

	@state()
	private _showEnd = false;

	@state()
	private _parentType: ListType = 'list';

	@query('.list-item__action')
	private _action?: HTMLElement;

	private _isBoxed = false;
	private _listObserver: MutationObserver | null = null;

	override connectedCallback() {
		super.connectedCallback();
		// Skip setup for drag clones — they are visual-only copies inside nldd-list's shadow root
		if (this.hasAttribute('data-nldd-clone')) return;
		this.setAttribute('role', 'listitem');
		// Attach focus/click listeners here (not firstUpdated) so they are
		// re-attached when the element is removed and re-inserted into the DOM.
		// _action is resolved lazily via @query inside the handlers.
		this.addEventListener('focusin', this._handleFocusIn);
		this.addEventListener('focusout', this._handleFocusOut);
		this.addEventListener('click', this._handleClick);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._listObserver?.disconnect();
		this._listObserver = null;
		this.removeEventListener('focusin', this._handleFocusIn);
		this.removeEventListener('focusout', this._handleFocusOut);
		this.removeEventListener('click', this._handleClick);
	}

	override firstUpdated() {
		if (this.hasAttribute('data-nldd-clone')) {
			// Clone is visual-only — skip list sync but still observe slots
			// so start/end areas render correctly based on cloned light DOM
			this._observeStartSlot();
			this._observeEndSlot();
			return;
		}
		this._syncWithList();
		this._observeStartSlot();
		this._observeEndSlot();
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('selected') || changed.has('button') || changed.has('href') || changed.has('_parentType')) {
			this._updateAriaState();
		}
	}

	/**
	 * Syncs the item with the closest parent nldd-list (variant + type).
	 * Called once in firstUpdated. If the item is moved to a different nldd-list
	 * after first render, the MutationObserver will still watch the original list.
	 * This is acceptable as moving items between lists is not a supported use case.
	 */
	private _syncWithList() {
		const list = this.closest<NLDDList>('nldd-list');
		if (!list) {
			if (import.meta.env?.DEV) {
				console.warn('nldd-list-item: no parent nldd-list found. Variant/type sync will not work if appended into a list after first render.');
			}
			return;
		}
		this._applyVariant(list.variant);
		this._applyParentType(list.type);
		this._listObserver = new MutationObserver(() => {
			this._applyVariant(list.variant);
			this._applyParentType(list.type);
		});
		this._listObserver.observe(list, {
			attributes: true,
			attributeFilter: ['variant', 'type'],
		});
	}

	private _applyVariant(variant: string) {
		this._isBoxed = variant === 'box';
		this.classList.toggle('is-boxed', this._isBoxed);
		this._updateVisibility();
	}

	private _applyParentType(type: ListType) {
		this._parentType = type;
	}

	private _updateAriaState() {
		this.setAttribute('role', 'listitem');

		// aria-current on the inner action (link/button) — navigation only
		const action = this.shadowRoot?.querySelector<HTMLElement>('.list-item__action');
		if (this._parentType === 'navigation' && this.selected && action) {
			action.setAttribute('aria-current', 'page');
		} else {
			action?.removeAttribute('aria-current');
		}
	}

	private _updateVisibility() {
		const startSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="start"]');
		const endSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="end"]');
		this._showStart = this._isBoxed || (startSlot?.assignedElements().length ?? 0) > 0;
		this._showEnd = this._isBoxed || (endSlot?.assignedElements().length ?? 0) > 0;
	}

	private _observeStartSlot() {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="start"]');
		slot?.addEventListener('slotchange', () => this._updateVisibility());
	}

	private _observeEndSlot() {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="end"]');
		slot?.addEventListener('slotchange', () => this._updateVisibility());
	}

	private _handleClick = () => {
		// Safari and Firefox on Mac don't focus buttons on click. Force focus
		// so :has(.list-item__action:focus) and :focus-within CSS work reliably.
		this._action?.focus();
	};

	private _handleFocusIn = () => {
		// Safari treats programmatic focus (forced on click for Safari/Firefox)
		// as focus-visible. Opt out by marking pointer-originated focus with a
		// class the CSS uses to suppress the ::before focus ring. If JS fails,
		// is-pointer-focus is never set so the CSS selector still matches on
		// keyboard focus and the custom ring renders — accessible by default.
		this._action?.classList.toggle('is-pointer-focus', isPointerMode());
	};

	private _handleFocusOut = () => {
		this._action?.classList.remove('is-pointer-focus');
	};

	/**
	 * Delegates focus to the inner `.list-item__action` (the button or anchor),
	 * so consumers can call `listItemEl.focus()` without reaching into shadow DOM.
	 */
	override focus(options?: FocusOptions): void {
		this._action?.focus(options);
	}

	override render() {
		const newTabLabel =
			this.href && this.target === '_blank'
				? this._t('components.list-item.opens-in-new-tab-label')
				: undefined;
		return template(
			this.button,
			this.href,
			this.target,
			this.rel,
			this._showStart,
			this._showEnd,
			newTabLabel,
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-list-item': NLDDListItem;
	}
}
