/**
 * RegelRecht Button Component (Lit + TypeScript)
 *
 * @element rr-button
 * @attr {string} variant - Button variant: 'primary' | 'secondary' | 'destructive' | 'accent-filled' | 'accent-outlined' | 'accent-transparent' | 'neutral-tinted' | 'neutral-transparent' | 'danger-tinted'
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset'
 * @attr {boolean} has-start-icon - Whether the button has a start icon
 * @attr {boolean} has-end-icon - Whether the button has a end icon
 * @attr {boolean} has-menu - Whether the button has a dropdown menu icon
 * @attr {boolean} full-width - Whether the button stretches to fill its container width
 *
 * @slot title - Slot for button title
 * @slot icon-start - Slot for icon before text
 * @slot icon-end - Slot for icon after text
 *
 * @fires click - When button is clicked (not fired when disabled)
 *
 * @csspart button - The native button element
 * @csspart content - The content wrapper
 *
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Variant = 'primary' | 'secondary' | 'destructive' | 'accent-filled' | 'accent-outlined' | 'accent-tinted' | 'neutral-tinted' | 'accent-transparent' | 'neutral-transparent' | 'danger-tinted';
type Size = 'xs' | 'sm' | 'md';
type ButtonType = 'button' | 'submit' | 'reset';

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
			box-shadow: 0 0 0 4px var(--semantics-focus-rings-center-color);
			outline: 6px double var(--semantics-focus-rings-inner-color);
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
			padding: var(--primitives-space-6) var(--primitives-space-8);
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
			color: var(--semantics-buttons-neutral-tinted-content-color);
		}
		
		:host([variant="neutral-transparent"]) .button:hover {
			color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
		}
		
		:host([variant="neutral-transparent"]) .button:active {
			color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
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

		/* Variant: accent-outlined - uses outline instead of border to avoid layout impact */
		:host([variant="accent-outlined"]) .button {
			padding: var(--primitives-space-10);
			background-color: transparent;
			color: var(--semantics-buttons-accent-outlined-content-color);
			border-width: var(--semantics-buttons-accent-outlined-border-thickness);
			border-style: solid;
			border-color: var(--semantics-buttons-accent-outlined-border-color);
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
		::slotted([slot="icon-start"]),
		::slotted([slot="icon-end"]) {
			flex-shrink: 0;
		}
		
		:host([size="md"]) ::slotted([slot="icon-start"]),
		:host([size="md"]) ::slotted([slot="icon-end"]) {
			width: 20px;
			height: 20px;
		}
		
		:host([size="sm"]) ::slotted([slot="icon-start"]),
		:host([size="sm"]) ::slotted([slot="icon-end"]) {
			width: 18px;
			height: 18px;
		}
		
		:host([size="xs"]) ::slotted([slot="icon-start"]),
		:host([size="xs"]) ::slotted([slot="icon-end"]) {
			width: 16px;
			height: 16px;
		}

		.content {
			/* Use display: contents to remove wrapper from layout flow */
			/* This ensures text aligns directly with button's flex alignment */
			display: contents;
		}
		
		.picker-icon {
			display: block;
			flex-shrink: 0;
		}
		
		:host([size="md"]) .picker-icon {
			width: 20px;
			height: 20px;
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

	@property({ type: Boolean, reflect: true, attribute: 'has-start-icon' })
	hasStartIcon = false;

	@property({ type: Boolean, reflect: true, attribute: 'has-end-icon' })
	hasEndIcon = false;

	@property({ type: Boolean, reflect: true, attribute: 'has-menu' })
	hasMenu = false;

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false;

	private _handleClick(e: MouseEvent): void {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	private _shouldShowStartIcon(): boolean {
		return this.hasStartIcon;
	}

	private _shouldShowEndIcon(): boolean {
		return this.hasEndIcon;
	}
	
	private _shouldShowPicker(): boolean {
		return this.hasMenu;
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
					${this._shouldShowStartIcon() ? html`<slot name="icon-start"></slot>` : ''}
					<slot></slot>
					${this._shouldShowEndIcon() ? html`<slot name="icon-end"></slot>` : ''}
					${this._shouldShowPicker() ? html`
						<svg
							class="picker-icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M12 14.172 5.4 7.6 4 9l8 8 8-8-1.4-1.4z"
							/>
						</svg>
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
