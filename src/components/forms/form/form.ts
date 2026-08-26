/**
 * Nederlandse Digitale Dienst Form Component
 *
 * Plain custom element (extends HTMLElement, no Lit), required for light-DOM
 * autofill. Renders a real <form> element in the LIGHT DOM around its
 * children. Chrome's autofill engine looks for native <input> elements that
 * have a <form> ancestor in the light DOM; with shadow-DOM inputs it can't
 * find them, so we keep this component shadow-less.
 *
 * **Differs from other nldd-* components:**
 * - No shadowRoot: all children live in the light DOM (inside the inner <form>)
 * - No Lit: a plain HTMLElement with manual attribute mirroring
 * - **Requires a global stylesheet import**: the vertical rhythm rules live in
 *   `dist/css/form.css` (or `global.css`), not in a component-specific shadow
 *   stylesheet. Import it as part of your app's global CSS bundle.
 *
 * **Two usage modes:**
 *
 * 1. **Auto-wrap** (default): write children directly. Component creates a
 *    `<form>` element and migrates children into it via MutationObserver.
 *    Simplest API.
 *
 * 2. **User-provided form** (framework-friendly): write your own `<form>`
 *    as direct child. Component detects it, takes over attribute mirroring,
 *    and skips the migration. Children stay where your framework puts them,
 *    so there is no DOM shuffling to conflict with React/Vue/Angular
 *    reconciliation.
 *
 * **Framework interop:**
 *
 * In auto-wrap mode every direct child is moved into the inner form through a
 * MutationObserver. That works fine for most React/Vue use cases, because
 * frameworks only mutate the DOM when their virtual DOM changes. For edge
 * cases (animation libraries that track DOM position, SSR hydration
 * mismatches, frameworks that actively check sibling positions) use
 * **user-provided form** mode instead.
 *
 * For programmatic manipulation, use the `form` getter so you work with the
 * inner `<form>` element directly:
 *
 *     const inner = document.querySelector('nldd-form').form;
 *     inner.checkValidity();
 *     inner.appendChild(myInput);  // skips the migration overhead
 *
 * @element nldd-form
 *
 * @attr {string} name - Form name
 * @attr {string} action - URL endpoint for submission
 * @attr {string} method - HTTP method ('get' | 'post' | 'dialog')
 * @attr {boolean} novalidate - Skip native browser validation
 * @attr {string} enctype - Encoding type for submission
 * @attr {string} target - Submit target ('_self' | '_blank' | ...)
 * @attr {string} autocomplete - 'on' | 'off' (form-level autofill toggle)
 * @attr {string} label-alignment - Default `label-alignment` for descendant nldd-form-field and nldd-form-actions ('top' | 'right' | 'left'). Propagated to descendants as `form-label-alignment`. A `label-alignment` of its own on the descendant takes precedence through the CSS cascade.
 *
 * @prop {HTMLFormElement | null} form - The inner <form> element (read-only). Use it for `form.checkValidity()`, direct DOM manipulation, or as the target for framework-managed children.
 *
 * Events bubble naturally from the inner <form>:
 * @fires submit
 * @fires reset
 *
 * @example
 * Global stylesheet import (once, in your app entry):
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
			// nested form-section are pulled in by the propagation as well.
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
	 * elements as a separate `form-label-alignment` attribute, defaulting to
	 * `'top'` when the form itself has no `label-alignment`. Descendant CSS
	 * uses `[label-alignment="X"]` first and falls back to
	 * `[form-label-alignment="X"]` when no own value is set, so a consumer's
	 * explicit `label-alignment` always wins automatically — without us having
	 * to track which elements we previously inherited to.
	 *
	 * Always-setting (rather than only when the form has its own value) lets
	 * downstream selectors assume the attribute is present on every descendant
	 * inside an `nldd-form`, which keeps form.css's adjacent-sibling tight-gap
	 * rule simple.
	 *
	 * The two-attribute split also avoids the historical Lit reflect-default
	 * vs MutationObserver timing race: we never touch `label-alignment` on
	 * the descendant, so a freshly upgraded Lit element reflecting its default
	 * doesn't conflict with the form's intent.
	 */
	private _propagateLabelAlignment(value: string | null): void {
		const fields = this.querySelectorAll<HTMLElement>(DESCENDANT_SELECTOR);
		fields.forEach(f => f.setAttribute('form-label-alignment', value ?? 'top'));
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
