/**
 * Nederlandse Digitale Dienst Form Component
 *
 * Plain custom element (extends HTMLElement, no Lit) — required for light-DOM
 * autofill. Renders a real <form> element in the LIGHT DOM around its
 * children. Chrome's autofill engine looks for native <input> elements that
 * have a <form> ancestor in the light DOM; with shadow-DOM inputs it can't
 * find them, so we keep this component shadow-less.
 *
 * **Differs from other nldd-* components:**
 * - Geen shadowRoot — alle children leven in light DOM (binnen het inner <form>)
 * - Geen Lit — pure HTMLElement met handmatige attribute-mirroring
 * - **Vereist global stylesheet import** — vertical rhythm en form-section
 *   divider-suppression regels staan in `dist/css/form.css` (of `global.css`),
 *   niet in een component-specifieke shadow stylesheet. Import deze als deel
 *   van je app's globale CSS bundle.
 *
 * @element nldd-form
 *
 * @attr {string}  name             - Form name
 * @attr {string}  action           - URL endpoint for submission
 * @attr {string}  method           - HTTP method ('get' | 'post' | 'dialog')
 * @attr {boolean} novalidate       - Skip native browser validation
 * @attr {string}  enctype          - Encoding type for submission
 * @attr {string}  target           - Submit target ('_self' | '_blank' | ...)
 * @attr {string}  autocomplete     - 'on' | 'off' (form-level autofill toggle)
 * @attr {string}  label-alignment  - Default `label-alignment` voor descendant
 *                                    nldd-form-field en nldd-form-actions
 *                                    ('top' | 'right' | 'left'). Individuele
 *                                    elementen kunnen het overrulen.
 *
 * Events bubble naturally from the inner <form>:
 * @fires submit
 * @fires reset
 *
 * @example
 * ```js
 * // Globale stylesheet import (eenmalig in je app entry):
 * import '@minbzk/storybook/dist/css/global.css';
 * ```
 * ```html
 * <nldd-form name="profile" novalidate>
 *   <nldd-text-field name="email" autocomplete="email"></nldd-text-field>
 *   <nldd-button type="submit" text="Verstuur"></nldd-button>
 * </nldd-form>
 * ```
 */

const FORWARDED_ATTRIBUTES = [
	'name',
	'action',
	'method',
	'novalidate',
	'enctype',
	'target',
	'autocomplete',
] as const;

const DESCENDANT_SELECTOR = 'nldd-form-field, nldd-form-actions';
const INHERITED_MARKER = 'formAlignmentInherited';

export class NLDDForm extends HTMLElement {
	static get observedAttributes() {
		return [...FORWARDED_ATTRIBUTES, 'label-alignment'];
	}

	private _form: HTMLFormElement | null = null;
	private _observer: MutationObserver | null = null;

	connectedCallback(): void {
		// One-time setup: create inner <form> and migrate initial children.
		// Subsequent connect cycles (move in DOM) skip this block but still
		// re-attach the observer below.
		if (!this._form) {
			const form = document.createElement('form');
			this._form = form;
			this._mirrorAttributes();

			// Move existing light-DOM children into the form.
			// For HTML parsed by the browser, connectedCallback fires at the
			// opening tag — children are added one-by-one AFTER and surface
			// via the MutationObserver below. This loop only matters for
			// programmatic patterns (createElement + appendChild children +
			// then attach), where children are already present at connect.
			const initialChildren = Array.from(this.childNodes);
			for (const node of initialChildren) {
				form.appendChild(node);
			}
			this.appendChild(form);
		}

		// (Re-)attach the observer on every connect. After disconnectedCallback
		// nulls _observer, a subsequent connectedCallback must rebuild it —
		// otherwise children appended after a move/reconnect would never land
		// in the inner <form>.
		if (!this._observer) {
			const form = this._form;
			this._observer = new MutationObserver(mutations => {
				for (const m of mutations) {
					// Migrate only direct children of the host (children of
					// the nldd-form itself, NOT descendants of e.g. a nested
					// form-section). Nested children are already inside the
					// inner form via their parent migration.
					if (m.target !== this) continue;
					m.addedNodes.forEach(node => {
						if (node === form) return;
						form.appendChild(node);
					});
				}
				// Newly added descendants — also from inside a nested
				// nldd-form-section — should receive the inherited alignment.
				this._propagateLabelAlignment(this.getAttribute('label-alignment'));
			});
			// subtree:true so dynamically added form-fields inside a
			// nested form-section ook getrokken worden door de propagation.
			this._observer.observe(this, { childList: true, subtree: true });
		}

		// Propagate label-alignment to current children (initial + after reconnect)
		this._propagateLabelAlignment(this.getAttribute('label-alignment'));
	}

	disconnectedCallback(): void {
		this._observer?.disconnect();
		this._observer = null;
	}

	attributeChangedCallback(name: string, _oldVal: string | null, newVal: string | null): void {
		if (name === 'label-alignment') {
			this._propagateLabelAlignment(newVal);
			return;
		}
		if (!this._form) return;
		if (newVal === null) this._form.removeAttribute(name);
		else this._form.setAttribute(name, newVal);
	}

	/**
	 * Push `label-alignment` to descendant nldd-form-field and nldd-form-actions
	 * elements that don't have an explicit own value. We track inherited
	 * assignments via a data-attribute so subsequent updates only touch the
	 * elements we previously inherited to — explicit per-element overrides
	 * are preserved.
	 */
	private _propagateLabelAlignment(value: string | null): void {
		const fields = this.querySelectorAll<HTMLElement>(DESCENDANT_SELECTOR);
		fields.forEach(f => {
			const isInherited = f.dataset[INHERITED_MARKER] === 'true';
			const hasOwn = f.hasAttribute('label-alignment');
			// Skip elements that have an explicit own attribute we didn't set
			if (hasOwn && !isInherited) return;
			if (value) {
				f.setAttribute('label-alignment', value);
				f.dataset[INHERITED_MARKER] = 'true';
			} else if (isInherited) {
				f.removeAttribute('label-alignment');
				delete f.dataset[INHERITED_MARKER];
			}
		});
	}

	private _mirrorAttributes(): void {
		if (!this._form) return;
		for (const attr of FORWARDED_ATTRIBUTES) {
			const val = this.getAttribute(attr);
			if (val !== null) this._form.setAttribute(attr, val);
		}
	}

	/** The inner <form> element. Useful for `form.checkValidity()` etc. */
	get form(): HTMLFormElement | null {
		return this._form;
	}
}

if (!customElements.get('nldd-form')) {
	customElements.define('nldd-form', NLDDForm);
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-form': NLDDForm;
	}
}
