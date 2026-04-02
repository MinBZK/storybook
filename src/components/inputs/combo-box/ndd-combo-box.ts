/**
 * Nederlandse Digitale Dienst Combo Box Component (Lit + TypeScript)
 *
 * A text input with autocomplete dropdown via ndd-menu.
 * Add a slotted ndd-menu with ndd-menu-item children to provide options.
 *
 * The component automatically sets no-auto-focus on the slotted ndd-menu
 * so that typing keeps focus on the input. The picker button moves focus
 * to the menu explicitly on activation.
 *
 * Note: Only ndd-menu-item type="button" is supported. Radio and checkbox
 * types are not supported in this context.
 *
 * @element ndd-combo-box
 * @attr {string}  value        - The selected form value
 * @attr {string}  placeholder  - Placeholder text for the input
 * @attr {boolean} disabled     - Disabled state
 * @attr {string}  name         - Input name for form submission
 * @attr {string}  accessible-label - Accessible label forwarded as aria-label to the input. Required for screen reader accessibility.
 * @attr {number}  max-items    - Maximum visible items before scrolling (default: 8)
 * @attr {object}  translations - Override translation keys; unset keys fall back to Dutch
 *
 * @note Free-text values: if the user types a value that does not match any menu option
 *       and presses Enter or moves focus away, the typed text is emitted as-is via the
 *       `change` event. Consumers are responsible for validating emitted values.
 *
 * @slot - An ndd-menu element with ndd-menu-item and ndd-menu-divider children
 *
 * @fires input  - When the input value changes; detail: { value: string }
 * @fires change - When an option is selected or a custom value is committed;
 *                 detail: { value: string }
 *
 * @example
 * ```html
 * <ndd-combo-box placeholder="Zoek een land" name="land">
 *   <ndd-menu>
 *     <ndd-menu-item text="Nederland" value="nl"></ndd-menu-item>
 *     <ndd-menu-item text="België" value="be"></ndd-menu-item>
 *   </ndd-menu>
 * </ndd-combo-box>
 * ```
 */
import { LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { comboBoxStyles } from './ndd-combo-box.styles.ts';
import { comboBoxTemplate } from './ndd-combo-box.template.ts';
import { nddComboBoxTranslations } from './ndd-combo-box.i18n.ts';
import type { NDDComboBoxTranslations } from './ndd-combo-box.i18n.ts';
import type { NDDMenu, NDDMenuItem } from '../../lists-and-menus/menu/ndd-menu.js';
import '../../lists-and-menus/menu/ndd-menu.ts';
import '../../actions/icon-button/ndd-icon-button.ts';
import '../../content/icon/ndd-icon.ts';

@customElement('ndd-combo-box')
export class NDDComboBox extends LitElement {
	static override styles = comboBoxStyles;

	@property({ type: String })
	value = '';

	@property({ type: String })
	placeholder = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	name = '';

	/** Maximum number of visible menu items before scrolling. Defaults to 8. */
	@property({ type: Number, attribute: 'max-items' })
	maxItems = 8;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Object })
	translations: Partial<NDDComboBoxTranslations> = {};

	@state()
	_isOpen = false;

	/** Display value shown in the input. May differ from value (form value). */
	@state()
	_displayValue = '';

	/** ID of the currently highlighted menu item for aria-activedescendant. */
	@state()
	_highlightedId = '';

	private static _counter = 0;
	readonly _menuId = `ndd-combo-box-menu-${NDDComboBox._counter++}`;

	private _menu: NDDMenu | null = null;
	private _resizeObserver: ResizeObserver | null = null;

	@query('.combo-box__input')
	_input!: HTMLInputElement;

	// — i18n ——————————————————————————————————————————————————————————————————

	public _t(key: keyof NDDComboBoxTranslations): string {
		return this.translations[key] ?? nddComboBoxTranslations[key];
	}

	// — Lifecycle ————————————————————————————————————————————————————————————

	override firstUpdated(): void {
		if (!this.accessibleLabel) {
			console.warn(
				'<ndd-combo-box>: No accessible-label provided. Add an accessible-label attribute for screen reader accessibility.'
			);
		}
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('maxItems') && this._menu) {
			this._menu.maxItems = this.maxItems;
		}
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this._resizeObserver = new ResizeObserver(() => this._updateMenuWidth());
		this._resizeObserver.observe(this);
		window.addEventListener('scroll', this._handleScrollOrResize, true);
		window.addEventListener('resize', this._handleScrollOrResize);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._resizeObserver?.disconnect();
		this._resizeObserver = null;
		window.removeEventListener('scroll', this._handleScrollOrResize, true);
		window.removeEventListener('resize', this._handleScrollOrResize);
		if (this._menu) {
			this._menu.removeEventListener('toggle', this._handleMenuToggle);
			this._menu.removeEventListener('select', this._handleMenuSelect);
			this._menu.removeEventListener('keydown', this._handleMenuKeydown);
			this._menu = null;
		}
	}

	// — Slot —————————————————————————————————————————————————————————————————

	public _onSlotChange(): void {
		const slot = this.shadowRoot?.querySelector('slot');
		const menu = slot
			?.assignedElements({ flatten: true })
			.find((el) => el.tagName.toLowerCase() === 'ndd-menu') as NDDMenu | undefined;

		if (!menu || menu === this._menu) return;

		this._menu = menu;
		menu.id = this._menuId;
		menu.anchorElement = this;
		menu.placement = 'bottom-start';
		menu.maxItems = this.maxItems;
		menu.variant = 'listbox';
		// Always prevent auto-focus so typing keeps focus on the input.
		// The picker button moves focus explicitly when activated.
		menu.noAutoFocus = true;
		menu.addEventListener('toggle', this._handleMenuToggle);
		menu.addEventListener('select', this._handleMenuSelect);
		menu.addEventListener('keydown', this._handleMenuKeydown);
		this._updateMenuWidth();
	}

	// — Menu width & position ————————————————————————————————————————————————

	private _updateMenuWidth(): void {
		if (!this._menu) return;
		const rect = this.getBoundingClientRect();
		this._menu.width = `${rect.width}px`;
	}

	private _handleScrollOrResize = (): void => {
		if (!this._isOpen) return;
		this._updateMenuWidth();
		this._menu?.reposition();
	};

	// — Menu management ——————————————————————————————————————————————————————

	private _handleMenuToggle = (e: Event): void => {
		this._isOpen = (e as ToggleEvent).newState === 'open';
		if (!this._isOpen) {
			this._highlightedId = '';
		} else {
			// Update highlight ID after menu opens and first item is highlighted
			requestAnimationFrame(() => {
				this._highlightedId = this._menu?.getHighlightedId() ?? '';
			});
		}
	};

	private _handleMenuSelect = (e: Event): void => {
		const item = e.target as NDDMenuItem;
		this._displayValue = item.text;
		this.value = item.value || item.text;
		this._highlightedId = '';
		this._closeMenu();
		this._menu?.filter('');
		this.dispatchEvent(
			new CustomEvent('change', {
				detail: { value: this.value },
				bubbles: true,
				composed: true,
			})
		);
		this._input?.focus();
	};

	private _updateActiveDescendant(): void {
		this._highlightedId = this._menu?.getHighlightedId() ?? '';
	}

	/**
	 * Open the menu. Focus always stays on the input — highlight moves via
	 * aria-activedescendant rather than by moving focus to items.
	 */
	public _openMenu(): void {
		if (!this._menu || this._isOpen) return;
		if (!('showPopover' in this._menu)) {
			console.warn(
				'<ndd-combo-box>: Popover API is not supported in this browser. The dropdown will not open.'
			);
			return;
		}
		this._updateMenuWidth();
		this._menu.noAutoFocus = true;
		(this._menu as HTMLElement).showPopover();
	}

	public _closeMenu(): void {
		if (!this._menu || !this._isOpen) return;
		(this._menu as HTMLElement).hidePopover();
	}

	private _pickerMousedown = false;

	public _toggleMenu(): void {
		if (this._pickerMousedown) {
			this._pickerMousedown = false;
			return;
		}
		if (this._isOpen) {
			this._closeMenu();
			this._input?.focus();
		} else {
			this._openMenu();
			this._input?.focus();
		}
	}

	public _handlePickerMousedown(): void {
		if (this._isOpen) {
			this._pickerMousedown = true;
		}
	}

	// — Handlers ————————————————————————————————————————————————————————————

	/**
	 * Handles Tab in the menu. The menu is a popover on the top layer — Tab
	 * would move focus to the next focusable element in DOM order, which may
	 * not be the next logical element. Instead, close the menu and return
	 * focus to the input so the user can Tab forward from there.
	 */
	private _handleMenuKeydown = (e: KeyboardEvent): void => {
		if (e.key !== 'Tab') return;
		e.preventDefault();
		this._closeMenu();
		this._input?.focus();
	};

	public _handleInput(e: Event): void {
		const input = e.target as HTMLInputElement;
		this._displayValue = input.value;
		this._menu?.filter(this._displayValue);
		this._updateActiveDescendant();
		if (!this._isOpen) this._openMenu();
		this.dispatchEvent(
			new CustomEvent('input', {
				detail: { value: this._displayValue },
				bubbles: true,
				composed: true,
			})
		);
	}

	/** Accept a custom typed value and close the menu when focus leaves the input. */
	public _handleBlur(e: FocusEvent): void {
		const relatedTarget = e.relatedTarget as Node | null;
		if (!relatedTarget || !this._menu?.contains(relatedTarget)) {
			this._closeMenu();
		}
		if (this._displayValue !== '' && this._displayValue !== this.value) {
			this.value = this._displayValue;
			this.dispatchEvent(
				new CustomEvent('change', {
					detail: { value: this.value },
					bubbles: true,
					composed: true,
				})
			);
		}
	}

	public _handleKeydown(e: KeyboardEvent): void {
		if (!this._isOpen) {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				this._openMenu();
			}
			return;
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				this._menu?.moveHighlight('next');
				this._updateActiveDescendant();
				break;
			case 'ArrowUp':
				e.preventDefault();
				this._menu?.moveHighlight('prev');
				this._updateActiveDescendant();
				break;
			case 'Enter': {
				e.preventDefault();
				const highlighted = this._menu?.getHighlighted();
				if (highlighted) {
					highlighted.select();
				} else {
					this.value = this._displayValue;
					this._closeMenu();
					this.dispatchEvent(
						new CustomEvent('change', {
							detail: { value: this.value },
							bubbles: true,
							composed: true,
						})
					);
				}
				break;
			}
			case 'Escape':
				e.preventDefault();
				this._closeMenu();
				break;
		}
	}

	override render() {
		return comboBoxTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-combo-box': NDDComboBox;
	}
}
