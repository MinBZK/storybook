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
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

// Marker element — geen logica, geen styles, puur een tag voor slotchange detectie
if (!customElements.get('rr-button-bar-divider')) {
	customElements.define('rr-button-bar-divider', class extends HTMLElement {});
}

type Size = 'xs' | 'sm' | 'md';

type BarChild =
	| { type: 'divider'; id: number }
	| { type: 'button'; element: Element; id: number };

@customElement('rr-button-bar')
export class RRButtonBar extends LitElement {
	static override styles = css`
		:host {
			display: inline-flex;
		}

		:host([hidden]) {
			display: none;
		}

		:host([disabled]) {
			opacity: var(--primitives-opacity-disabled);
			pointer-events: none;
			cursor: not-allowed;
		}

		:host([disabled]) ::slotted(rr-button),
		:host([disabled]) ::slotted(rr-icon-button) {
			opacity: 1;
		}

		.button-bar {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			background-color: var(--semantics-buttons-neutral-tinted-background-color);
		}

		/* Size: XS */
		:host([size="xs"]) .button-bar {
			height: var(--semantics-controls-xs-min-size);
			border-radius: var(--semantics-controls-xs-corner-radius);
		}

		/* Size: SM */
		:host([size="sm"]) .button-bar {
			height: var(--semantics-controls-sm-min-size);
			border-radius: var(--semantics-controls-sm-corner-radius);
		}

		/* Size: MD (default) */
		:host([size="md"]) .button-bar,
		:host(:not([size])) .button-bar {
			height: var(--semantics-controls-md-min-size);
			border-radius: var(--semantics-controls-md-corner-radius);
		}

		/* Divider */
		.button-bar__divider {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
		}

		:host([size="xs"]) .button-bar__divider {
			height: var(--semantics-controls-xs-min-size);
		}

		:host([size="sm"]) .button-bar__divider {
			height: var(--semantics-controls-sm-min-size);
		}

		:host([size="md"]) .button-bar__divider,
		:host(:not([size])) .button-bar__divider {
			height: var(--semantics-controls-md-min-size);
		}

		.button-bar__divider-line {
			width: var(--semantics-dividers-thickness);
			background-color: var(--semantics-buttons-neutral-tinted-divider-color);
		}

		:host([size="xs"]) .button-bar__divider-line {
			height: var(--semantics-buttons-xs-divider-length);
		}

		:host([size="sm"]) .button-bar__divider-line {
			height: var(--semantics-buttons-sm-divider-length);
		}

		:host([size="md"]) .button-bar__divider-line,
		:host(:not([size])) .button-bar__divider-line {
			height: var(--semantics-buttons-md-divider-length);
		}
	`;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@state()
	private _children: BarChild[] = [];

	private _idCounter = 0;
	private _observer: MutationObserver | null = null;

	override connectedCallback(): void {
		super.connectedCallback();
		this._observer = new MutationObserver(() => this._buildChildren());
		this._observer.observe(this, { childList: true });
		this._buildChildren();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('size')) {
			this._propagateSize();
		}
		if (changedProperties.has('disabled')) {
			this._propagateDisabled();
		}
	}

	private _propagateSize(): void {
		Array.from(this.children)
			.filter(el => ['rr-button', 'rr-icon-button'].includes(el.tagName.toLowerCase()))
			.forEach(el => el.setAttribute('size', this.size));
	}

	private _propagateDisabled(): void {
		Array.from(this.children)
			.filter(el => ['rr-button', 'rr-icon-button'].includes(el.tagName.toLowerCase()))
			.forEach(el => {
				if (this.disabled) {
					el.setAttribute('disabled', '');
				} else {
					el.removeAttribute('disabled');
				}
			});
	}

	private _buildChildren(): void {
		// Clean up stale slot attributes from previous render
		Array.from(this.children).forEach(el => el.removeAttribute('slot'));

		this._children = Array.from(this.children).map(el => {
			const tag = el.tagName.toLowerCase();

			if (tag === 'rr-button-bar-divider') {
				return { type: 'divider', id: this._idCounter++ } as BarChild;
			}

			if (['rr-button', 'rr-icon-button'].includes(tag)) {
				el.setAttribute('size', this.size);
				if (this.disabled) {
					el.setAttribute('disabled', '');
				}
			}

			const id = this._idCounter++;
			el.setAttribute('slot', `child-${id}`);
			return { type: 'button', element: el, id } as BarChild;
		});
	}

	private _renderChild(child: BarChild) {
		if (child.type === 'divider') {
			return html`
				<div
					class="button-bar__divider"
					role="separator"
				>
					<div class="button-bar__divider-line"></div>
				</div>
			`;
		}

		return html`<slot name="child-${child.id}"></slot>`;
	}

	override render() {
		return html`
			<div class="button-bar" role="group">
				${repeat(this._children, c => c.id, c => this._renderChild(c))}
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-button-bar': RRButtonBar;
		'rr-button-bar-divider': HTMLElement;
	}
}
