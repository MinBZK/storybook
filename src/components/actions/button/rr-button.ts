/**
 * RegelRecht Button Component (Lit + TypeScript)
 *
 * @element rr-button
 * @attr {string} variant - Button variant: 'primary' | 'secondary' | 'destructive' | 'accent-filled' | 'accent-outlined' | 'accent-transparent' | 'neutral-tinted' | 'neutral-transparent' | 'danger-tinted'
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset'
 * @attr {boolean} has-menu - Whether the button has a dropdown menu icon
 * @attr {boolean} full-width - Whether the button stretches to fill its container width
 *
 * @slot - Slot for button title
 * @slot (auto) - Place an rr-icon before or after the title to auto-detect position
 *
 * @fires click - When button is clicked (not fired when disabled)
 *
 * @csspart button - The native button element
 * @csspart content - The content wrapper
 *
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './../../content/icon/rr-icon.ts';

type Variant =
	| 'primary'
	| 'secondary'
	| 'destructive'
	| 'accent-filled'
	| 'accent-outlined'
	| 'accent-transparent'
	| 'neutral-tinted'
	| 'neutral-transparent'
	| 'danger-tinted';
type Size = 'xs' | 'sm' | 'md';
type ButtonType = 'button' | 'submit' | 'reset';

interface IconState {
	name: string;
	attributes: Record<string, string>;
}

@customElement('rr-button')
export class RRButton extends LitElement {
	static override styles = css`
		:host {
			display: inline-block;
		}

		:host([full-width]) {
			display: block;
			width: 100%;
		}

		:host([hidden]) {
			display: none;
		}

		:host([disabled]) {
			opacity: var(--primitives-opacity-disabled);
			cursor: not-allowed;
			pointer-events: none;
		}

		.button {
			/* Reset */
			appearance: none;
			border: none;
			margin: 0;
			padding: 0;
			background: none;
			font: inherit;
			box-sizing: border-box;
			text-decoration: none;

			/* Layout */
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 100%;

			/* Transitions */
			transition:
				background-color 0.15s ease-out,
				color 0.15s ease-out
			;
		}

		@media (prefers-reduced-motion: reduce) {
			.button {
				transition: none;
			}
		}

		.button:focus-visible {
			box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
			outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		}

		.button:focus:not(:focus-visible) {
			outline: none;
		}

		/* Size: XS */
		:host([size="xs"]) .button {
			min-height: var(--semantics-controls-xs-min-size);
			min-width: var(--semantics-controls-xs-min-size);
			padding: var(--primitives-space-4) var(--primitives-space-6);
			font: var(--semantics-buttons-xs-font);
			border-radius: var(--semantics-controls-xs-corner-radius);
			gap: var(--primitives-space-2);
		}

		/* Size: SM */
		:host([size="sm"]) .button {
			min-height: var(--semantics-controls-sm-min-size);
			min-width: var(--semantics-controls-sm-min-size);
			padding: var(--primitives-space-6) var(--primitives-space-10);
			font: var(--semantics-buttons-sm-font);
			border-radius: var(--semantics-controls-sm-corner-radius);
			gap: var(--primitives-space-2);
		}

		/* Size: MD (default) */
		:host([size="md"]) .button,
		:host(:not([size])) .button {
			min-height: var(--semantics-controls-md-min-size);
			min-width: var(--semantics-controls-md-min-size);
			padding: var(--primitives-space-12);
			font: var(--semantics-buttons-md-font);
			border-radius: var(--semantics-controls-md-corner-radius);
			gap: var(--primitives-space-4);
		}

		/* Variant: neutral-tinted (default, secondary) */
		:host([variant="neutral-tinted"]) .button,
		:host([variant="secondary"]) .button,
		:host(:not([variant])) .button  {
			background-color: var(--semantics-buttons-neutral-tinted-background-color);
			color: var(--semantics-buttons-neutral-tinted-content-color);
		}

		:host([variant="neutral-tinted"]) .button:hover,
		:host([variant="secondary"]) .button:hover,
		:host(:not([variant])) .button:hover {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
		}

		:host([variant="neutral-tinted"]) .button:active,
		:host([variant="secondary"]) .button:active,
		:host(:not([variant])) .button:active {
			background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
		}

		/* Variant: neutral-transparent */
		:host([variant="neutral-transparent"]) .button {
			background-color: transparent;
			color: var(--semantics-buttons-neutral-transparent-content-color);
		}

		:host([variant="neutral-transparent"]) .button:hover {
			color: var(--semantics-buttons-neutral-transparent-is-hovered-content-color);
		}

		:host([variant="neutral-transparent"]) .button:active {
			color: var(--semantics-buttons-neutral-transparent-is-active-content-color);
		}

		/* Variant: accent-filled (primary) */
		:host([variant="accent-filled"]) .button,
		:host([variant="primary"]) .button {
			background-color: var(--semantics-buttons-accent-filled-background-color);
			color: var(--semantics-buttons-accent-filled-content-color);
		}

		:host([variant="accent-filled"]) .button:hover,
		:host([variant="primary"]) .button:hover {
			background-color: var(--semantics-buttons-accent-filled-is-hovered-background-color);
			color: var(--semantics-buttons-accent-filled-is-hovered-content-color);
		}

		:host([variant="accent-filled"]) .button:active,
		:host([variant="primary"]) .button:active {
			background-color: var(--semantics-buttons-accent-filled-is-active-background-color);
			color: var(--semantics-buttons-accent-filled-is-active-content-color);
		}

		:host([variant="accent-outlined"]) .button {
			background-color: transparent;
			padding: calc(var(--primitives-space-12) - var(--semantics-buttons-accent-outlined-border-thickness));
			color: var(--semantics-buttons-accent-outlined-content-color);
			border-width: var(--semantics-buttons-accent-outlined-border-thickness);
			border-style: solid;
			border-color: var(--semantics-buttons-accent-outlined-border-color);
		}

		:host([variant="accent-outlined"][size="md"]) .button {
			padding: calc(var(--primitives-space-12) - var(--semantics-buttons-accent-outlined-border-thickness));
		}

		:host([variant="accent-outlined"][size="sm"]) .button {
			padding:
				calc(var(--primitives-space-6) - var(--semantics-buttons-accent-outlined-border-thickness))
				calc(var(--primitives-space-10) - var(--semantics-buttons-accent-outlined-border-thickness))
			;
		}

		:host([variant="accent-outlined"][size="xs"]) .button {
			padding:
				calc(var(--primitives-space-4) - var(--semantics-buttons-accent-outlined-border-thickness))
				calc(var(--primitives-space-6) - var(--semantics-buttons-accent-outlined-border-thickness))
			;
		}

		:host([variant="accent-outlined"]) .button:hover {
			color: var(--semantics-buttons-accent-outlined-is-hovered-content-color);
			border-color: var(--semantics-buttons-accent-outlined-is-hovered-border-color);
		}

		:host([variant="accent-outlined"]) .button:active {
			color: var(--semantics-buttons-accent-outlined-is-active-content-color);
			border-color: var(--semantics-buttons-accent-outlined-is-active-border-color);
		}

		/* Variant: accent-transparent */
		:host([variant="accent-transparent"]) .button {
			background-color: transparent;
			color: var(--semantics-buttons-accent-transparent-content-color);
		}

		:host([variant="accent-transparent"]) .button:hover {
			color: var(--semantics-buttons-accent-transparent-is-hovered-content-color);
		}

		:host([variant="accent-transparent"]) .button:active {
			color: var(--semantics-buttons-accent-transparent-is-active-content-color);
		}

		/* Variant: danger-tinted */
		:host([variant="danger-tinted"]) .button,
		:host([variant="destructive"]) .button {
			background-color: var(--semantics-buttons-danger-tinted-background-color);
			color: var(--semantics-buttons-danger-tinted-content-color);
		}

		:host([variant="danger-tinted"]) .button:hover,
		:host([variant="destructive"]) .button:hover {
			background-color: var(--semantics-buttons-danger-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-danger-tinted-is-hovered-content-color);
		}

		:host([variant="danger-tinted"]) .button:active,
		:host([variant="destructive"]) .button:active {
			background-color: var(--semantics-buttons-danger-tinted-is-active-background-color);
			color: var(--semantics-buttons-danger-tinted-is-active-content-color);
		}

		.button__content {
			display: contents;
		}

		/* Hide projected rr-icon elements — we render them ourselves in shadow DOM */
		::slotted(rr-icon) {
			display: none;
		}

		.button__start-icon,
		.button__end-icon{
			display: block;
			flex-shrink: 0;
		}

		:host([size="md"]) .button__start-icon,
		:host([size="md"]) .button__end-icon {
			width: var(--primitives-space-20);
			height: var(--primitives-space-20);
		}

		:host([size="sm"]) .button__start-icon,
		:host([size="sm"]) .button__end-icon {
			width: var(--primitives-space-18);
			height: var(--primitives-space-18);
		}

		:host([size="xs"]) .button__start-icon,
		:host([size="xs"]) .button__end-icon {
			width: var(--primitives-space-16);
			height: var(--primitives-space-16);
		}

		.button__picker-icon {
			display: block;
			flex-shrink: 0;
		}

		:host([size="md"]) .button__picker-icon {
			width: var(--primitives-space-20);
			height: var(--primitives-space-20);
			margin-left: -2px;
			margin-right: -2px;
		}

		:host([size="sm"]) .button__picker-icon {
			width: var(--primitives-space-18);
			height: var(--primitives-space-18);
			margin-left: -1px;
			margin-right: -2px;
		}

		:host([size="xs"]) .button__picker-icon {
			width: var(--primitives-space-16);
			height: var(--primitives-space-16);
			margin-left: -1px;
			margin-right: -2px;
		}
	`;

	@property({ type: String, reflect: true })
	variant: Variant = 'neutral-tinted';

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false;

	@property({ type: Boolean, reflect: true, attribute: 'has-menu' })
	hasMenu = false;

	@property({ type: String, reflect: true })
	type: ButtonType = 'button';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@state()
	private _iconStart: IconState | null = null;

	@state()
	private _iconEnd: IconState | null = null;

	private _observer: MutationObserver | null = null;

	override connectedCallback(): void {
		super.connectedCallback();
		this._observer = new MutationObserver(() => this._detectIconPosition());
		this._observer.observe(this, { childList: true, subtree: true, attributes: true });
		this.updateComplete.then(() => this._detectIconPosition());
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
	}

	/**
	 * Extracts all attributes from an Element into a plain record,
	 * excluding the 'slot' attribute which we manage ourselves.
	 */
	private _extractAttributes(el: Element): Record<string, string> {
		const attrs: Record<string, string> = {};
		for (const attr of Array.from(el.attributes)) {
			if (attr.name !== 'slot') {
				attrs[attr.name] = attr.value;
			}
		}
		return attrs;
	}

	/**
	 * Resolves the effective child nodes, following slot projection.
	 *
	 * When rr-button is used inside a component that passes a <slot> as its
	 * child (e.g. rr-split-button), `this.children` only sees that <slot>
	 * element — not the nodes the end-user projected into it.
	 *
	 * By querying our own shadow <slot> and calling assignedNodes({ flatten: true }),
	 * we get the fully resolved, flattened list of nodes regardless of how many
	 * slot-layers deep they are.
	 */
	private _getEffectiveNodes(): Node[] {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		if (!slot) {
			return Array.from(this.childNodes);
		}
		return slot.assignedNodes({ flatten: true });
	}

	private _detectIconPosition(): void {
		const effectiveNodes = this._getEffectiveNodes();

		const icons = effectiveNodes.filter(
			(n): n is Element =>
				n.nodeType === Node.ELEMENT_NODE &&
				(n as Element).tagName.toLowerCase() === 'rr-icon'
		);

		if (icons.length === 0) {
			this._iconStart = null;
			this._iconEnd = null;
			return;
		}

		if (icons.length > 2) {
			console.warn('<rr-button>: Too many rr-icon elements provided. Maximum is one before and one after the title. Extra icons will be ignored.');
			icons.splice(2);
		}

		// Filter to only significant nodes (elements + non-whitespace text)
		const significantNodes = effectiveNodes.filter(
			n =>
				n.nodeType === Node.ELEMENT_NODE ||
				(n.nodeType === Node.TEXT_NODE && n.textContent?.trim() !== '')
		);

		if (icons.length === 2) {
			const first = significantNodes[0];
			const last = significantNodes[significantNodes.length - 1];
			const firstIsIcon = (first as Element)?.tagName?.toLowerCase() === 'rr-icon';
			const lastIsIcon = (last as Element)?.tagName?.toLowerCase() === 'rr-icon';

			if (!firstIsIcon || !lastIsIcon) {
				console.warn('<rr-button>: Two rr-icon elements detected but they are not surrounding the title. Expected pattern: <rr-icon> title <rr-icon>. Falling back to using the first icon as a start icon.');
				this._iconStart = {
					name: icons[0].getAttribute('name') ?? '',
					attributes: this._extractAttributes(icons[0]),
				};
				this._iconEnd = null;
				return;
			}

			this._iconStart = {
				name: icons[0].getAttribute('name') ?? '',
				attributes: this._extractAttributes(icons[0]),
			};
			this._iconEnd = {
				name: icons[1].getAttribute('name') ?? '',
				attributes: this._extractAttributes(icons[1]),
			};
			return;
		}

		// Exactly one icon — determine position
		const icon = icons[0];
		const isFirst = significantNodes[0] === icon;
		const iconState: IconState = {
			name: icon.getAttribute('name') ?? '',
			attributes: this._extractAttributes(icon),
		};

		if (isFirst) {
			this._iconStart = iconState;
			this._iconEnd = null;
		} else {
			this._iconStart = null;
			this._iconEnd = iconState;
		}
	}

	private _renderIcon(icon: IconState): unknown {
		// Spread all original attributes onto the shadow DOM icon
		const attrEntries = Object.entries(icon.attributes)
			.filter(([key]) => key !== 'name')
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ');

		return html`<rr-icon
			class="icon"
			name=${icon.name}
			${attrEntries ? html`...` : nothing}
		></rr-icon>`;
	}

	private _handleClick(e: MouseEvent): void {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	override render() {
		return html`
			<button
				class="button"
				part="button"
				type=${this.type}
				?disabled=${this.disabled}
				aria-disabled=${this.disabled}
				@click=${this._handleClick}
			>
				<span class="button__content" part="content">
					${this._iconStart ? html`
						<rr-icon
							class="button__start-icon"
							name=${this._iconStart.name}
						></rr-icon>
					` : nothing}
					<slot @slotchange=${this._detectIconPosition}></slot>
					${this._iconEnd ? html`
						<rr-icon
							class="button__end-icon"
							name=${this._iconEnd.name}
						></rr-icon>
					` : nothing}
					${this.hasMenu ? html`
						<rr-icon
							class="button__picker-icon"
							name="chevron-down-small"
						></rr-icon>
					` : nothing}
				</span>
			</button>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-button': RRButton;
	}
}
