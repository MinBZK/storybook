/**
 * RegelRecht Combo Box Field Component (Lit + TypeScript)
 *
 * A text input with autocomplete dropdown via rr-menu.
 * Add a slotted rr-menu with rr-menu-item children to provide options.
 *
 * The component automatically sets no-auto-focus on the slotted rr-menu
 * so that typing keeps focus on the input. The picker button moves focus
 * to the menu explicitly on activation.
 *
 * Note: Only rr-menu-item type="button" is supported. Radio and checkbox
 * types are not supported in this context.
 *
 * @element rr-combo-box-field
 * @attr {string}  value        - The selected form value
 * @attr {string}  placeholder  - Placeholder text for the input
 * @attr {boolean} disabled     - Disabled state
 * @attr {string}  name         - Input name for form submission
 * @attr {object}  translations - Override translation keys; unset keys fall back to Dutch
 *
 * @slot - An rr-menu element with rr-menu-item and rr-menu-divider children
 *
 * @fires input  - When the input value changes; detail: { value: string }
 * @fires change - When an option is selected or a custom value is committed;
 *                 detail: { value: string }
 *
 * @example
 * ```html
 * <rr-combo-box-field placeholder="Search a country" name="country">
 *   <rr-menu>
 *     <rr-menu-item text="Netherlands" value="nl"></rr-menu-item>
 *     <rr-menu-item text="Belgium" value="be"></rr-menu-item>
 *   </rr-menu>
 * </rr-combo-box-field>
 * ```
 */
import { LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { comboBoxFieldStyles } from './rr-combo-box-field.styles.ts';
import { comboBoxFieldTemplate } from './rr-combo-box-field.template.ts';
import { rrComboBoxFieldTranslations } from './rr-combo-box-field.i18n.ts';
import type { RRComboBoxFieldTranslations } from './rr-combo-box-field.i18n.ts';
import type { RRMenu, RRMenuItem } from '../../lists-and-menus/menu/rr-menu.js';
import '../../lists-and-menus/menu/rr-menu.ts';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';

@customElement('rr-combo-box-field')
export class RRComboBoxField extends LitElement {
	static override styles = comboBoxFieldStyles;

	@property({ type: String })
	value = '';

	@property({ type: String })
	placeholder = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	name = '';

	/** Override one or more translation keys. Unset keys fall back to Dutch. */
	@property({ type: Object })
	translations: Partial<RRComboBoxFieldTranslations> = {};

	@state()
	_isOpen = false;

	/** Display value shown in the input. May differ from value (form value). */
	@state()
	_displayValue = '';

	readonly _menuId = `rr-combo-box-menu-${Math.random().toString(36).slice(2)}`;

	private _menu: RRMenu | null = null;
	private _resizeObserver: ResizeObserver | null = null;

	@query('.combo-box-field__native')
	_input!: HTMLInputElement;

	// — i18n ——————————————————————————————————————————————————————————————————

	public _t(key: keyof RRComboBoxFieldTranslations): string {
		return this.translations[key] ?? rrComboBoxFieldTranslations[key];
	}

	// — Lifecycle ————————————————————————————————————————————————————————————

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
			this._menu.remove();
			this._menu = null;
		}
	}

	// — Slot —————————————————————————————————————————————————————————————————

	public _onSlotChange(): void {
		const slot = this.shadowRoot?.querySelector('slot');
		const menu = slot?.assignedElements({ flatten: true })
			.find(el => el.tagName.toLowerCase() === 'rr-menu') as RRMenu | undefined;

		if (!menu || menu === this._menu) return;

		this._menu = menu;
		menu.id = this._menuId;
		menu.anchorElement = this;
		menu.placement = 'bottom-start';
		// Always prevent auto-focus so typing keeps focus on the input.
		// The picker button moves focus explicitly when activated.
		menu.noAutoFocus = true;
		menu.addEventListener('toggle', this._handleMenuToggle);
		menu.addEventListener('select', this._handleMenuSelect);
		document.body.appendChild(menu);
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
	};

	private _handleMenuSelect = (e: Event): void => {
		const item = e.target as RRMenuItem;
		this._displayValue = item.text;
		this.value = item.value || item.text;
		this._closeMenu();
		this._menu?.filter('');
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
		this._input?.focus();
	};

	/**
	 * Open the menu. Pass moveFocus=true to move focus to the first item
	 * (used when activating via the picker button).
	 */
	public _openMenu(moveFocus = false): void {
		if (!this._menu || this._isOpen) return;
		this._updateMenuWidth();
		this._menu.noAutoFocus = !moveFocus;
		(this._menu as any).showPopover?.();
	}

	public _closeMenu(): void {
		if (!this._menu || !this._isOpen) return;
		(this._menu as any).hidePopover?.();
	}

	public _toggleMenu(): void {
		if (this._isOpen) {
			this._closeMenu();
			this._input?.focus();
		} else {
			this._openMenu(true);
		}
	}

	// — Handlers ————————————————————————————————————————————————————————————

	public _handleInput(e: Event): void {
		const input = e.target as HTMLInputElement;
		this._displayValue = input.value;
		this._menu?.filter(this._displayValue);
		if (!this._isOpen) this._openMenu(false);
		this.dispatchEvent(new CustomEvent('input', {
			detail: { value: this._displayValue },
			bubbles: true,
			composed: true,
		}));
	}

	/** Accept a custom typed value when focus leaves the input. */
	public _handleBlur(): void {
		if (this._displayValue !== '' && this._displayValue !== this.value) {
			this.value = this._displayValue;
			this.dispatchEvent(new CustomEvent('change', {
				detail: { value: this.value },
				bubbles: true,
				composed: true,
			}));
		}
	}

	public _handleKeydown(e: KeyboardEvent): void {
		if (!this._isOpen) {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				this._openMenu(false);
			}
			return;
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				this._menu?.focusItem('next');
				break;
			case 'ArrowUp':
				e.preventDefault();
				this._menu?.focusItem('prev');
				break;
			case 'Tab':
				e.preventDefault();
				this._menu?.focusItem('first');
				break;
			case 'Enter': {
				e.preventDefault();
				const highlighted = this._menu?.getHighlighted();
				if (highlighted) {
					highlighted._handleClick();
				} else {
					this.value = this._displayValue;
					this._closeMenu();
					this.dispatchEvent(new CustomEvent('change', {
						detail: { value: this.value },
						bubbles: true,
						composed: true,
					}));
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
		return comboBoxFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-combo-box-field': RRComboBoxField;
	}
}
