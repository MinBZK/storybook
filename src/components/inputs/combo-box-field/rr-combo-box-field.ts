/**
 * RegelRecht Combo Box Field Component (Lit + TypeScript)
 *
 * Een tekstveld met autocomplete/dropdown via rr-menu.
 *
 * @element rr-combo-box-field
 * @attr {string}  value        - De huidige invoerwaarde
 * @attr {string}  placeholder  - Placeholder tekst
 * @attr {boolean} disabled     - Uitgeschakelde toestand
 * @attr {string}  name         - Naam voor formulierverwerking
 * @attr {object}  translations - Vertalingen; niet-opgegeven sleutels vallen terug op Nederlands
 *
 * @prop {ComboBoxOption[]} options - Opties voor het dropdown menu
 *
 * @fires input  - Wanneer de invoerwaarde verandert; detail: { value: string }
 * @fires change - Wanneer een optie geselecteerd wordt; detail: { value: string }
 *
 * @example
 * ```html
 * <rr-combo-box-field
 *   placeholder="Zoek een land"
 *   .options=${[
 *     { text: 'Nederland', value: 'nl' },
 *     { text: 'België', value: 'be' },
 *   ]}
 * ></rr-combo-box-field>
 * ```
 */
import { LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { comboBoxFieldStyles } from './rr-combo-box-field.styles.ts';
import { comboBoxFieldTemplate } from './rr-combo-box-field.template.ts';
import { rrComboBoxFieldTranslations } from './rr-combo-box-field.i18n.ts';
import type { RRComboBoxFieldTranslations } from './rr-combo-box-field.i18n.ts';
import '../../lists-and-menus/menu/rr-menu.ts';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';

export type ComboBoxOption =
	| { type?: 'item'; text: string; value?: string; details?: string; disabled?: boolean }
	| { type: 'divider' };

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

	@property({ type: Array })
	options: ComboBoxOption[] = [];

	/** Overschrijf een of meer vertalingssleutels. Niet-opgegeven sleutels vallen terug op Nederlands. */
	@property({ type: Object })
	translations: Partial<RRComboBoxFieldTranslations> = {};

	@state()
	_isOpen = false;

	readonly _menuId = `rr-combo-box-menu-${Math.random().toString(36).slice(2)}`;

	private _menu: HTMLElement | null = null;

	@query('.combo-box-field__native')
	_input!: HTMLInputElement;

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof RRComboBoxFieldTranslations): string {
		return this.translations[key] ?? rrComboBoxFieldTranslations[key];
	}

	// — Lifecycle ————————————————————————————————————————————————————————————

	override firstUpdated(): void {
		this._createMenu();
		this._syncMenuItems();
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('options')) {
			this._syncMenuItems();
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._menu?.removeEventListener('toggle', this._handleMenuToggle);
		this._menu?.removeEventListener('select', this._handleMenuSelect);
		this._menu?.remove();
		this._menu = null;
	}

	// — Menu management ——————————————————————————————————————————————————————

	private _createMenu(): void {
		const menu = document.createElement('rr-menu') as any;
		menu.id = this._menuId;
		menu.anchorElement = this;
		menu.placement = 'bottom-start';
		menu.addEventListener('toggle', this._handleMenuToggle);
		menu.addEventListener('select', this._handleMenuSelect);
		document.body.appendChild(menu);
		this._menu = menu;
	}

	private _syncMenuItems(): void {
		if (!this._menu) return;
		this._menu.innerHTML = '';

		for (const option of this.options) {
			if (option.type === 'divider') {
				this._menu.appendChild(document.createElement('rr-menu-divider'));
			} else {
				const item = document.createElement('rr-menu-item') as any;
				item.text = option.text;
				if (option.details) item.details = option.details;
				if (option.disabled) item.disabled = true;
				item.dataset.value = option.value ?? option.text;
				this._menu.appendChild(item);
			}
		}
	}

	private _handleMenuToggle = (e: Event): void => {
		this._isOpen = (e as ToggleEvent).newState === 'open';
	};

	private _handleMenuSelect = (e: Event): void => {
		const item = e.target as any;
		this.value = item.dataset.value ?? item.text ?? '';
		this._closeMenu();
		this._resetFilter();
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
		this._input?.focus();
	};

	public _openMenu(): void {
		if (!this._menu || this._isOpen) return;
		const rect = this.getBoundingClientRect();
		this._menu.style.width = `${rect.width}px`;
		(this._menu as any).showPopover?.();
	}

	public _closeMenu(): void {
		if (!this._menu || !this._isOpen) return;
		(this._menu as any).hidePopover?.();
	}

	public _toggleMenu(): void {
		if (this._isOpen) {
			this._closeMenu();
		} else {
			this._openMenu();
		}
	}

	// — Filtering ————————————————————————————————————————————————————————————

	private _filterItems(query: string): void {
		this._menu?.querySelectorAll('rr-menu-item').forEach(item => {
			const text = (item as any).text?.toLowerCase() ?? '';
			if (query && !text.includes(query.toLowerCase())) {
				item.setAttribute('hidden', '');
			} else {
				item.removeAttribute('hidden');
			}
		});
	}

	private _resetFilter(): void {
		this._menu?.querySelectorAll('rr-menu-item').forEach(item => {
			item.removeAttribute('hidden');
		});
	}

	// — Handlers ————————————————————————————————————————————————————————————

	public _handleInput(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.value = input.value;
		this._filterItems(this.value);
		if (!this._isOpen) this._openMenu();
		this.dispatchEvent(new CustomEvent('input', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	public _handleChange(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.value = input.value;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
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
