/**
 * RegelRecht Button Bar Component (Lit + TypeScript)
 *
 * A horizontal container for grouping buttons with a neutral background.
 * Automatically propagates its size to all child rr-button and rr-icon-button elements.
 * Renders rr-button-bar-divider elements as internal dividers — no separate component needed.
 *
 * @element rr-button-bar
 * @attr {string} size - Bar size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 *
 * @slot - Default slot for rr-button, rr-icon-button and rr-button-bar-divider elements
 *
 * @csspart bar - The button bar container
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './rr-button-bar.styles.ts';
import { template } from './rr-button-bar.template.ts';
import { repeat } from 'lit/directives/repeat.js';

if (!customElements.get('rr-button-bar-divider')) {
	customElements.define('rr-button-bar-divider', class extends HTMLElement {});
}

export type Size = 'xs' | 'sm' | 'md';

export type BarChild =
	| { type: 'divider'; id: number }
	| { type: 'button'; element: Element; id: number };

const BUTTON_TAGS = ['rr-button', 'rr-icon-button'];

@customElement('rr-button-bar')
export class RRButtonBar extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@state()
	_children: BarChild[] = [];

	private _idCounter = 0;
	private _observer: MutationObserver | null = null;
	private _building = false;

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
		if (changedProperties.has('size')) {
			this._propagateSize();
		}
		if (changedProperties.has('disabled')) {
			this._propagateDisabled();
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

	private _individuallyDisabled = new WeakSet<Element>();

	private _propagateDisabled(): void {
		const buttons = Array.from(this.children).filter(el =>
			BUTTON_TAGS.includes(el.tagName.toLowerCase())
		);

		if (this.disabled) {
			// Snapshot which buttons are already disabled before we touch them
			buttons.forEach(el => {
				if (el.hasAttribute('disabled')) {
					this._individuallyDisabled.add(el);
				}
			});
			buttons.forEach(el => el.setAttribute('disabled', ''));
		} else {
			// Only re-enable buttons that weren't individually disabled
			buttons.forEach(el => {
				if (!this._individuallyDisabled.has(el)) {
					el.removeAttribute('disabled');
				}
			});
			this._individuallyDisabled = new WeakSet();
		}
	}

	private _buildChildren(): void {
		this._idCounter = 0;
		if (this._building) return;
		this._building = true;

		Array.from(this.children).forEach(el => el.removeAttribute('slot'));

		this._children = Array.from(this.children).map(el => {
			const tag = el.tagName.toLowerCase();

			if (tag === 'rr-button-bar-divider') {
				return { type: 'divider', id: this._idCounter++ } as BarChild;
			}

			if (BUTTON_TAGS.includes(tag)) {
				el.setAttribute('size', this.size);
				if (this.disabled) {
					el.setAttribute('disabled', '');
				}
			}

			const id = this._idCounter++;
			el.setAttribute('slot', `child-${id}`);
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
		'rr-button-bar': RRButtonBar;
		'rr-button-bar-divider': HTMLElement;
	}
}
