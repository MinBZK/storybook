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
 * @slot (auto) - Place an rr-icon before or after the label to auto-detect position
 *
 * @fires click - When button is clicked (not fired when disabled)
 *
 * @csspart button - The native button element
 * @csspart content - The content wrapper
 *
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './../../content/icon/rr-icon.ts';

type Variant = 'primary' | 'secondary' | 'destructive' | 'accent-filled' | 'accent-outlined' | 'neutral-tinted' | 'accent-transparent' | 'neutral-transparent' | 'danger-tinted';
type Size = 'xs' | 'sm' | 'md';
type ButtonType = 'button' | 'submit' | 'reset';
type IconPosition = 'start' | 'end' | 'both' | null;

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
		
		:host([disabled]) .button {
			opacity: var(--primitives-opacity-disabled);
			cursor: not-allowed;
			pointer-events: none;
		}

		/* Slots */
		::slotted(rr-icon) {
			flex-shrink: 0;
		}
		
		:host([size="md"]) ::slotted(rr-icon) {
			width: var(--primitives-space-20);
			height: var(--primitives-space-20);
		}
		
		:host([size="sm"]) ::slotted(rr-icon) {
			width: var(--primitives-space-18);
			height: var(--primitives-space-18);
		}
		
		:host([size="xs"]) ::slotted(rr-icon) {
			width: var(--primitives-space-16);
			height: var(--primitives-space-16);
		}

		.content {
			display: contents;
		}
		
		.picker-icon {
			display: block;
			flex-shrink: 0;
		}
		
		:host([size="md"]) .picker-icon {
			width: var(--primitives-space-20);
			height: var(--primitives-space-20);
			margin-left: -2px;
			margin-right: -2px;
		}
		
		:host([size="sm"]) .picker-icon {
			width: var(--primitives-space-18);
			height: var(--primitives-space-18);
			margin-left: -1px;
			margin-right: -2px;
		}
		
		:host([size="xs"]) .picker-icon {
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

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, reflect: true })
	type: ButtonType = 'button';

	@property({ type: Boolean, reflect: true, attribute: 'has-menu' })
	hasMenu = false;

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false;

	@state()
	private _iconPosition: IconPosition = null;

	private _observer: MutationObserver | null = null;

	override connectedCallback(): void {
		super.connectedCallback();
		this._observer = new MutationObserver(() => this._detectIconPosition());
		this._observer.observe(this, { childList: true });
		this._detectIconPosition();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
	}

	private _detectIconPosition(): void {
		const children = Array.from(this.children);
		const icons = children.filter(el => el.tagName.toLowerCase() === 'rr-icon');

		// Reset all icon slots first
		icons.forEach(el => el.removeAttribute('slot'));

		if (icons.length === 0) {
			this._iconPosition = null;
			return;
		}

		if (icons.length > 2) {
			console.warn('<rr-button>: Too many rr-icon elements provided. Maximum is one before and one after the label. Extra icons will be ignored.');
			// Trim to max 2 for further processing
			icons.splice(2);
		}

		if (icons.length === 2) {
			const first = children[0];
			const last = children[children.length - 1];
			const firstIsIcon = first.tagName.toLowerCase() === 'rr-icon';
			const lastIsIcon = last.tagName.toLowerCase() === 'rr-icon';

			if (!firstIsIcon || !lastIsIcon) {
				console.warn('<rr-button>: Two rr-icon elements detected but they are not surrounding the label. Expected pattern: <rr-icon> label <rr-icon>. Falling back to using the first icon as a start icon.');
				icons[0].slot = '__icon-start';
				this._iconPosition = 'start';
				return;
			}

			icons[0].slot = '__icon-start';
			icons[1].slot = '__icon-end';
			this._iconPosition = 'both';
			return;
		}

		// Exactly one icon
		const icon = icons[0];
		const isFirst = children[0] === icon;
		this._iconPosition = isFirst ? 'start' : 'end';
		icon.slot = isFirst ? '__icon-start' : '__icon-end';
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
				<span class="content" part="content">
					${this._iconPosition === 'start' || this._iconPosition === 'both'
						? html`<slot name="__icon-start"></slot>`
						: ''}
					<slot></slot>
					${this._iconPosition === 'end' || this._iconPosition === 'both'
						? html`<slot name="__icon-end"></slot>`
						: ''}
					${this.hasMenu ? html`
						<rr-icon
							class="picker-icon"
							name="chevron-down-small"
						></rr-icon>
					` : ''}
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