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
 * **Two usage modes:**
 *
 * 1. **Auto-wrap** (default): write children directly. Component creates a
 *    `<form>` element and migrates children into it via MutationObserver.
 *    Simplest API.
 *
 * 2. **User-provided form** (framework-friendly): write your own `<form>`
 *    as direct child. Component detects it, takes over attribute-mirroring,
 *    en skipt de migration. Children blijven waar je framework ze plaatst —
 *    geen DOM-shuffling die met React/Vue/Angular reconciliation conflicteert.
 *
 * **Framework interop:**
 *
 * In auto-wrap mode wordt elke direct child verplaatst naar het inner form
 * via een MutationObserver. Voor de meeste React/Vue use cases werkt dit
 * prima omdat frameworks alleen DOM-mutaties doen wanneer hun virtual DOM
 * verandert. Voor edge cases (animatie-libs die DOM-positie tracken,
 * SSR-hydration mismatches, frameworks die actief sibling-positions
 * controleren) gebruik dan **user-provided form** mode.
 *
 * Voor programmatische manipulatie: gebruik de `form` getter zodat je
 * direct met het inner `<form>` element werkt:
 *
 *     const inner = document.querySelector('nldd-form').form;
 *     inner.checkValidity();
 *     inner.appendChild(myInput);  // skipt migration-overhead
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
 * @prop {HTMLFormElement | null} form - The inner <form> element (read-only).
 *                                       Use voor `form.checkValidity()`,
 *                                       directe DOM-manipulatie, of als doel
 *                                       voor framework-managed children.
 *
 * Events bubble naturally from the inner <form>:
 * @fires submit
 * @fires reset
 *
 * @example
 * Globale stylesheet import (eenmalig in je app entry):
 * ```js
 * import '@nldd/design-system/styles';
 * ```
 *
 * Auto-wrap mode:
 * ```html
 * <nldd-form name="profile" novalidate>
 *   <nldd-text-field name="email" autocomplete="email"></nldd-text-field>
 *   <nldd-button type="submit" text="Verstuur"></nldd-button>
 * </nldd-form>
 * ```
 *
 * User-provided form mode (React/Vue/Angular):
 * ```html
 * <nldd-form name="profile" novalidate>
 *   <form>
 *     <nldd-text-field name="email" autocomplete="email"></nldd-text-field>
 *     <nldd-button type="submit" text="Verstuur"></nldd-button>
 *   </form>
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
	/** When true, user provided their own <form> child — skip migration. */
	private _userProvidedForm = false;

	connectedCallback(): void {
		// One-time setup: detect user-provided <form> or create one ourselves.
		// Subsequent connect cycles (move in DOM) skip this block but still
		// re-attach the observer below.
		if (!this._form) {
			// User-provided form mode: framework-managed <form> as direct
			// child. We take it over for attribute-mirroring/propagation but
			// skip migration so we don't conflict with framework reconciliation.
			const userForm = this.querySelector(':scope > form');
			if (userForm) {
				this._form = userForm as HTMLFormElement;
				this._userProvidedForm = true;
				this._mirrorAttributes();
			} else {
				// Auto-wrap mode: create inner <form> and migrate initial children.
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
		}

		// (Re-)attach the observer on every connect. After disconnectedCallback
		// nulls _observer, a subsequent connectedCallback must rebuild it —
		// otherwise children appended after a move/reconnect would never land
		// in the inner <form>.
		if (!this._observer) {
			const form = this._form;
			const userProvided = this._userProvidedForm;
			this._observer = new MutationObserver(mutations => {
				for (const m of mutations) {
					// Migrate only direct children of the host (children of
					// the nldd-form itself, NOT descendants of e.g. a nested
					// form-section). Nested children are already inside the
					// inner form via their parent migration.
					if (m.target !== this) continue;
					// In user-provided form mode: skip migration. User's
					// framework controls placement; we don't shuffle DOM.
					if (userProvided) continue;
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
	 *
	 * **Timing-subtleties (Lit reflect-default + MutationObserver race):**
	 *
	 * Lit-based descendants (nldd-form-field, nldd-form-actions) reflecten hun
	 * default `label-alignment="top"` op het attribuut wanneer hun eerste
	 * update fired. Een naïeve `hasOwn`-check zou dan elke vers gemaakte
	 * descendant als "explicit own value" zien en propagation skippen.
	 *
	 * In praktijk werkt 't omdat:
	 * 1. Bij parsed HTML fires de form's connectedCallback VOORDAT children
	 *    upgraden — propagation set 'right' op het attribuut, child upgrade
	 *    leest dat als initial value (geen reflect-default-conflict).
	 * 2. Bij dynamic appendChild fires de MutationObserver na DOM-mutation
	 *    maar microtask-volgorde laat de propagation z'n attribuut zetten
	 *    voordat Lit's reflection 't kan overschrijven (Lit reflect = ook
	 *    microtask, maar de MO callback runt eerder in deze flow).
	 *
	 * Regression test: form.test.ts "propageert ook naar later toegevoegde
	 * form-actions children" verifieert deze flow. Verander deze guard
	 * niet zonder die test te draaien.
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
