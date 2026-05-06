/**
 * Nederlandse Digitale Dienst Search Field Component (Lit + TypeScript)
 *
 * A search input with a leading search icon, an optional dismiss button,
 * and an optional search button.
 *
 * @element nldd-search-field
 * @attr {string}  value               - The search value
 * @attr {string}  placeholder         - Placeholder text for the input
 * @attr {string}  accessible-label    - Accessible label (aria-label) for the native input.
 *                                       Falls back to placeholder when not set.
 *                                       Set explicitly when a value is already present
 *                                       and the placeholder is no longer visible.
 * @attr {string}  size                - Field size: 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled            - Disabled state
 * @attr {string}  name                - Input name for form submission
 * @attr {boolean} show-search-button - When set, shows a search button on the right
 * @attr {object}  translations        - Override translation keys; unset keys fall back to Dutch
 * @attr {string}  width               - Optional fixed width (any CSS length, e.g. "240px"). Default: full-width.
 *
 * @fires input  - When the input value changes; detail: { value: string }
 * @fires change - When the input value is committed; detail: { value: string }
 * @fires search - When search is submitted via Enter or the search button; detail: { value: string }
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { searchFieldStyles } from './search-field.styles.js';
import { searchFieldTemplate } from './search-field.template.js';
import { nlddSearchFieldTranslations } from './search-field.i18n.js';
import type { NLDDSearchFieldTranslations } from './search-field.i18n.js';
import './../../actions/icon-button/icon-button.js';
import './../../actions/button/button.js';
import './../../content/icon/icon.js';

export type SearchFieldSize = 'sm' | 'md';

@customElement('nldd-search-field')
export class NLDDSearchField extends LitElement {
	static formAssociated = true;

	static override styles = searchFieldStyles;

	private _internals = this.attachInternals();

	@property({ type: String })
	value = '';

	@property({ type: String })
	placeholder = 'Zoeken';

	/** Accessible label forwarded as aria-label to the native input.
	 *  Use to describe what is being searched, e.g. "Zoek een document".
	 *  When not set, the placeholder value is used as aria-label automatically.
	 *  Set an explicit accessible-label when a value is already present and the
	 *  placeholder is no longer visible, to ensure screen readers still have context. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: String, reflect: true })
	size: SearchFieldSize = 'md';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	name = '';

	@property({ type: Boolean, reflect: true, attribute: 'show-search-button' })
	showSearchButton = false;

	/** Override one or more translation keys. Unset keys fall back to Dutch. */
	@property({ type: Object })
	translations: Partial<NLDDSearchFieldTranslations> = {};

	/** Optional fixed width (any CSS length). When unset, the field stretches to fill its container. */
	@property({ type: String, reflect: true })
	width = '';

	@query('.search-field__input')
	_input!: HTMLInputElement;

	override updated(changed: PropertyValues): void {
		if (changed.has('width')) {
			this.style.width = this.width || '';
		}
		if (changed.has('value')) {
			this._internals.setFormValue(this.value);
		}
	}

	formResetCallback(): void {
		this.value = '';
	}

	formDisabledCallback(disabled: boolean): void {
		this.disabled = disabled;
	}

	formStateRestoreCallback(state: string): void {
		if (typeof state === 'string') this.value = state;
	}

	// — i18n ——————————————————————————————————————————————————————————————————

	public _t(key: keyof NLDDSearchFieldTranslations): string {
		return this.translations[key] ?? nlddSearchFieldTranslations[key];
	}

	// — Handlers ————————————————————————————————————————————————————————————

	public _handleInput(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.value = input.value;
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

	public _handleKeydown(e: KeyboardEvent): void {
		if (e.key === 'Enter') {
			this._dispatchSearch();
		}
	}

	public _handleClear(): void {
		this.value = '';
		this.dispatchEvent(new CustomEvent('input', {
			detail: { value: '' },
			bubbles: true,
			composed: true,
		}));
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: '' },
			bubbles: true,
			composed: true,
		}));
		this._input?.focus();
	}

	public _handleSearch(): void {
		this._dispatchSearch();
	}

	private _dispatchSearch(): void {
		this.dispatchEvent(new CustomEvent('search', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return searchFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-search-field': NLDDSearchField;
	}
}
