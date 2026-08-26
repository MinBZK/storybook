/**
 * Nederlandse Digitale Dienst Search Field Component (Lit + TypeScript)
 *
 * A search input with a leading search icon, an optional dismiss button,
 * and an optional search button.
 *
 * @element nldd-search-field
 * @attr {string} value - The search value
 * @attr {string} placeholder - Placeholder text for the input
 * @attr {string} accessible-label - Accessible label (aria-label) for the native input. Falls back to placeholder when not set. Set explicitly when a value is already present and the placeholder is no longer visible.
 * @attr {string} size - Field size: 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} name - Input name for form submission
 * @attr {boolean} show-search-button - When set, shows a search button on the right
 * @attr {object} translations - Override translation keys; unset keys fall back to Dutch
 * @attr {boolean} no-spellcheck - Disables browser spellchecking on the inner input
 * @attr {string} width - Optional fixed width (any CSS length, e.g. "240px"). Default: stretches to fill container.
 *
 * @fires input - When the input value changes; detail: { value: string }
 * @fires change - When the input value is committed; detail: { value: string }
 * @fires search - When search is submitted via Enter or the search button; detail: { value: string }
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { FormAssociated, type FormValue } from '../../../utilities/form-associated-mixin.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { searchFieldStyles } from './search-field.styles.js';
import { searchFieldTemplate } from './search-field.template.js';
import { nlddSearchFieldTranslations } from './search-field.i18n.js';
import type { NLDDSearchFieldTranslations } from './search-field.i18n.js';
import './../../actions/icon-button/icon-button.js';
import './../../actions/button/button.js';
import './../../content/icon/icon.js';
import { DescribedBy } from '../../../utilities/described-by-mixin.js';

export type SearchFieldSize = 'sm' | 'md';

@customElement('nldd-search-field')
export class NLDDSearchField extends DescribedBy(FormAssociated(LitElement)) {

	static override styles = searchFieldStyles;

	/** Says this is the control an nldd-form-field is about, so the field can
	 *  find it, name it and move focus into it. See nldd-form-field. */
	static isFormInput = true;

	/** Counts for the implicit-submission rule: a single-line field where Enter
	 *  would submit the form. See utilities/implicit-submission.ts. */
	static blocksImplicitSubmission = true;


	private _initialValue = '';

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

	@property({ reflect: true, converter: reflectNonDefault<SearchFieldSize>('md') })
	size: SearchFieldSize = 'md';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, reflect: true })
	name = '';

	@property({ type: Boolean, reflect: true, attribute: 'show-search-button' })
	showSearchButton = false;

	/** Override one or more translation keys. Unset keys fall back to Dutch. */
	@property({ type: Object })
	translations: Partial<NLDDSearchFieldTranslations> = {};

	@property({ type: Boolean, reflect: true, attribute: 'no-spellcheck' })
	noSpellcheck = false;

	/** Optional fixed width (any CSS length). When unset, the field stretches to fill its container. */
	@property({ type: String, reflect: true })
	width = '';

	@query('.search-field__input')
	_input!: HTMLInputElement;

	override firstUpdated(): void {
		this._initialValue = this.value;
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('width')) {
			const w = this.width;
			if (w && w !== 'full' && CSS.supports('width', w)) {
				this.style.setProperty('--_width', w);
			} else {
				this.style.removeProperty('--_width');
			}
		}
	}

	override formValue(): FormValue {
		return this.value;
	}

	formResetCallback(): void {
		this.value = this._initialValue;
	}


	formStateRestoreCallback(state: File | string | FormData | null): void {
		if (typeof state === 'string') this.value = state;
	}

	// — i18n ——————————————————————————————————————————————————————————————————

	public _t(key: keyof NLDDSearchFieldTranslations): string {
		return this.translations[key] ?? nlddSearchFieldTranslations[key];
	}

	// — Handlers ————————————————————————————————————————————————————————————

	// The native input/change events are composed, so without stopPropagation
	// they escape the shadow root and a consumer listening for `input` on the
	// host gets two events per keystroke: ours, carrying detail.value, and the
	// native one right behind it, where `detail` is the UIEvent number 0. A
	// handler that reads `e.detail?.value` then ends on undefined and, if it
	// writes that back to `value`, wipes the field as you type. Same guard as
	// text-field and password-field.
	public _handleInput(e: Event): void {
		e.stopPropagation();
		const input = e.target as HTMLInputElement;
		this.value = input.value;
		this.commitFormValue();
		this.dispatchEvent(new CustomEvent('input', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	public _handleChange(e: Event): void {
		e.stopPropagation();
		const input = e.target as HTMLInputElement;
		this.value = input.value;
		this.commitFormValue();
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
		this.commitFormValue();
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
		this.commitFormValue();
		this.dispatchEvent(new CustomEvent('search', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	/**
	 * Delegates focus to the inner native `<input>`, so consumers can call
	 * `searchFieldEl.focus()` without reaching into shadow DOM.
	 */
	override focus(options?: FocusOptions): void {
		this._input?.focus(options);
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
