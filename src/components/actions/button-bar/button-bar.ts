/**
 * Nederlandse Digitale Dienst Button Bar Component (Lit + TypeScript)
 *
 * A horizontal container for grouping buttons with a neutral background.
 * Automatically propagates its size and variant to all child nldd-button and nldd-icon-button elements.
 * Renders nldd-button-bar-divider elements as internal dividers — no separate component needed.
 *
 * @element nldd-button-bar
 * @attr {string} size - Bar size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {string} variant - Button variant (default: 'neutral-tinted')
 * @attr {boolean} disabled - Disabled state
 *
 * @slot - Default slot for nldd-button, nldd-icon-button and nldd-button-bar-divider elements
 *
 * @csspart bar - The button bar container
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './button-bar.styles.js';
import { template } from './button-bar.template.js';

if (!customElements.get('nldd-button-bar-divider')) {
	customElements.define('nldd-button-bar-divider', class extends HTMLElement {});
}

export type Size = 'xs' | 'sm' | 'md';

export type BarChild =
	| { type: 'divider'; id: number }
	| { type: 'button'; element: Element; id: number };

const BUTTON_TAGS = ['nldd-button', 'nldd-icon-button'];

@customElement('nldd-button-bar')
export class NLDDButtonBar extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: String, reflect: true })
	variant: string = 'neutral-tinted';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@state()
	_children: BarChild[] = [];

	private _idCounter = 0;
	private _observer: MutationObserver | null = null;
	private _building = false;
	private _individuallyDisabled = new WeakSet<Element>();

	override connectedCallback(): void {
		super.connectedCallback();
		this._observer = new MutationObserver(() => this._buildChildren());
		this._observer.observe(this, { childList: true });
		this._buildChildren();
		this.addEventListener('focusin', this._handleFocusIn);
		this.addEventListener('focusout', this._handleFocusOut);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
		this.removeEventListener('focusin', this._handleFocusIn);
		this.removeEventListener('focusout', this._handleFocusOut);
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('size') || changedProperties.has('_children')) {
			this._propagateSize();
		}
		if (changedProperties.has('variant') || changedProperties.has('_children')) {
			this._propagateVariant();
		}
		if (changedProperties.has('disabled')) {
			this._propagateDisabled();
		} else if (changedProperties.has('_children') && this.disabled) {
			// New children added while bar is disabled — disable them
			Array.from(this.children)
				.filter(el => BUTTON_TAGS.includes(el.tagName.toLowerCase()))
				.forEach(el => el.setAttribute('disabled', ''));
		}
	}

	private _handleFocusIn(e: FocusEvent): void {
		const target = e.target as Element;
		if (BUTTON_TAGS.includes(target.tagName.toLowerCase())) {
			target.setAttribute('data-focused', '');
		}
	}

	private _handleFocusOut(e: FocusEvent): void {
		const target = e.target as Element;
		if (BUTTON_TAGS.includes(target.tagName.toLowerCase())) {
			target.removeAttribute('data-focused');
		}
	}

	private _propagateSize(): void {
		Array.from(this.children)
			.filter(el => BUTTON_TAGS.includes(el.tagName.toLowerCase()))
			.forEach(el => el.setAttribute('size', this.size));
	}

	private _propagateVariant(): void {
		Array.from(this.children)
			.filter(el => BUTTON_TAGS.includes(el.tagName.toLowerCase()))
			.forEach(el => el.setAttribute('variant', this.variant));
	}

	private _propagateDisabled(): void {
		const buttons = Array.from(this.children).filter(el =>
			BUTTON_TAGS.includes(el.tagName.toLowerCase())
		);

		if (this.disabled) {
			buttons.forEach(el => {
				if (el.hasAttribute('disabled')) {
					this._individuallyDisabled.add(el);
				}
			});
			buttons.forEach(el => el.setAttribute('disabled', ''));
		} else {
			buttons.forEach(el => {
				if (!this._individuallyDisabled.has(el)) {
					el.removeAttribute('disabled');
				}
			});
			this._individuallyDisabled = new WeakSet();
		}
	}

	private _buildChildren(): void {
		if (this._building) return;
		this._building = true;
		this._idCounter = 0;

		this._children = Array.from(this.children).map(el => {
			const tag = el.tagName.toLowerCase();

			if (tag === 'nldd-button-bar-divider') {
				return { type: 'divider', id: this._idCounter++ } as BarChild;
			}

			if (BUTTON_TAGS.includes(tag)) {
				el.setAttribute('size', this.size);
				el.setAttribute('variant', this.variant);
			}

			const id = this._idCounter++;
			const slotName = `child-${id}`;
			if (el.getAttribute('slot') !== slotName) {
				el.setAttribute('slot', slotName);
			}
			return { type: 'button', element: el, id } as BarChild;
		});

		this._building = false;
	}

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-button-bar': NLDDButtonBar;
		'nldd-button-bar-divider': HTMLElement;
	}
}
