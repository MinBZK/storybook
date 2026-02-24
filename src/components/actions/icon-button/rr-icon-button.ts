/**
 * RegelRecht Icon Button Component (Lit + TypeScript)
 *
 * @element rr-icon-button
 * @attr {string} variant - Button variant: 'accent-filled' | 'accent-outlined' | 'accent-transparent' | 'neutral-tinted' | 'neutral-transparent' | 'danger-tinted' | 'primary' | 'secondary' | 'destructive'
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' | 'lg' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset'
 * @attr {string} title - Accessible label and visible text in lg size
 * @attr {string} icon - Icon name to display (uses rr-icon internally, falls back to slot)
 * @attr {boolean} has-menu - Whether the button opens a menu (shows chevron)
 *
 * @slot - Fallback slot when no icon attribute is provided
 *
 * @fires click - When button is clicked (not fired when disabled)
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './../../content/icon/rr-icon.ts';

type Size = 'xs' | 'sm' | 'md' | 'lg';
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
type ButtonType = 'button' | 'submit' | 'reset';

@customElement('rr-icon-button')
export class RRIconButton extends LitElement {
	static override styles = css`
		:host {
			display: inline-block;
		}

		:host([hidden]) {
			display: none;
		}

		:host([disabled]) {
			opacity: var(--primitives-opacity-disabled);
			cursor: not-allowed;
			pointer-events: none;
		}

		.icon-button {
			/* Reset */
			appearance: none;
			border: none;
			margin: 0;
			padding: 0;
			background: none;
			font: inherit;
			box-sizing: border-box;

			/* Layout */
			display: inline-flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			/* Transitions */
			transition:
				background-color 0.15s ease-out,
				color 0.15s ease-out;
		}

		.icon-button:focus-visible {
			box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
			outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		}

		.icon-button:focus:not(:focus-visible) {
			outline: none;
		}

		/* Icon area */
		.icon-button__icon-area {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}

		.icon-button__icon {
			display: flex;
			flex-shrink: 0;
			align-items: center;
			justify-content: center;
		}

		.icon-button__picker-icon {
			display: flex;
			flex-shrink: 0;
		}

		/* Title - only visible in lg */
		.icon-button__title {
			display: none;
			text-align: center;
			white-space: nowrap;
			color: inherit;
			font: var(--primitives-font-body-xxs-bold-flat);
		}

		:host([size='lg']) .icon-button__title {
			display: block;
		}

		/* Size: XS */
		:host([size='xs']) .icon-button {
			width: auto;
			height: var(--semantics-controls-xs-min-size);
			min-width: var(--semantics-controls-xs-min-size);
			min-height: var(--semantics-controls-xs-min-size);
			padding: var(--primitives-space-4);
			border-radius: var(--semantics-controls-xs-corner-radius);
		}

		:host([size='xs']) .icon-button__icon {
			width: var(--primitives-space-16);
			height: var(--primitives-space-16);
		}

		:host([size='xs']) .icon-button__picker-icon {
			width: var(--primitives-space-16);
			height: var(--primitives-space-16);
		}

		/* Size: SM */
		:host([size='sm']) .icon-button {
			width: auto;
			height: var(--semantics-controls-sm-min-size);
			min-width: var(--semantics-controls-sm-min-size);
			min-height: var(--semantics-controls-sm-min-size);
			padding: var(--primitives-space-6);
			border-radius: var(--semantics-controls-sm-corner-radius);
		}

		:host([size='sm']) .icon-button__icon {
			width: var(--primitives-space-20);
			height: var(--primitives-space-20);
		}

		:host([size='sm']) .icon-button__picker-icon {
			width: var(--primitives-space-20);
			height: var(--primitives-space-20);
			margin-right: calc(var(--primitives-space-2) * -1);
		}

		/* Size: MD (default) */
		:host([size='md']) .icon-button,
		:host(:not([size])) .icon-button {
			width: auto;
			height: var(--semantics-controls-md-min-size);
			min-width: var(--semantics-controls-md-min-size);
			min-height: var(--semantics-controls-md-min-size);
			padding: var(--primitives-space-8);
			border-radius: var(--semantics-controls-md-corner-radius);
		}

		:host([size='md']) .icon-button__icon,
		:host(:not([size])) .icon-button__icon {
			width: var(--primitives-space-24);
			height: var(--primitives-space-24);
		}

		:host([size='md']) .icon-button__picker-icon,
		:host(:not([size])) .icon-button__picker-icon {
			width: var(--primitives-space-20);
			height: var(--primitives-space-20);
			margin-right: calc(var(--primitives-space-2) * -1);
		}

		/* Size: LG */
		:host([size='lg']) .icon-button {
			width: auto;
			height: var(--semantics-controls-lg-min-size);
			min-width: var(--semantics-controls-lg-min-size);
			min-height: var(--semantics-controls-lg-min-size);
			padding: var(--primitives-space-8);
			border-radius: var(--semantics-controls-lg-corner-radius);
			gap: 1px;
		}

		:host([size='lg']) .icon-button__icon {
			width: var(--primitives-space-24);
			height: var(--primitives-space-24);
		}

		:host([size='lg']) .icon-button__picker-icon {
			width: var(--primitives-space-20);
			height: var(--primitives-space-20);
			margin-right: calc(var(--primitives-space-2) * -1);
		}

		/* Variant: neutral-tinted (secondary) */
		:host([variant='neutral-tinted']) .icon-button,
		:host([variant='secondary']) .icon-button,
		:host(:not([variant])) .icon-button {
			background-color: var(--semantics-buttons-neutral-tinted-background-color);
			color: var(--semantics-buttons-neutral-tinted-content-color);
		}

		:host([variant='neutral-tinted']) .icon-button:hover,
		:host([variant='secondary']) .icon-button:hover,
		:host(:not([variant])) .icon-button:hover {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
		}

		:host([variant='neutral-tinted']) .icon-button:active,
		:host([variant='secondary']) .icon-button:active,
		:host(:not([variant])) .icon-button:active {
			background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
		}

		/* Variant: neutral-transparent */
		:host([variant='neutral-transparent']) .icon-button {
			background-color: transparent;
			color: var(--semantics-buttons-neutral-transparent-content-color);
		}

		:host([variant='neutral-transparent']) .icon-button:hover {
			background-color: var(--semantics-buttons-neutral-transparent-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-transparent-is-hovered-content-color);
		}

		:host([variant='neutral-transparent']) .icon-button:active {
			background-color: var(--semantics-buttons-neutral-transparent-is-active-background-color);
			color: var(--semantics-buttons-neutral-transparent-is-active-content-color);
		}

		/* Variant: accent-filled (primary) */
		:host([variant='accent-filled']) .icon-button,
		:host([variant='primary']) .icon-button {
			background-color: var(--semantics-buttons-accent-filled-background-color);
			color: var(--semantics-buttons-accent-filled-content-color);
		}

		:host([variant='accent-filled']) .icon-button:hover,
		:host([variant='primary']) .icon-button:hover {
			background-color: var(--semantics-buttons-accent-filled-is-hovered-background-color);
			color: var(--semantics-buttons-accent-filled-is-hovered-content-color);
		}

		:host([variant='accent-filled']) .icon-button:active,
		:host([variant='primary']) .icon-button:active {
			background-color: var(--semantics-buttons-accent-filled-is-active-background-color);
			color: var(--semantics-buttons-accent-filled-is-active-content-color);
		}

		/* Variant: accent-outlined */
		:host([variant='accent-outlined']) .icon-button {
			background-color: transparent;
			border-width: var(--semantics-buttons-accent-outlined-border-thickness);
			border-style: solid;
			border-color: var(--semantics-buttons-accent-outlined-border-color);
			color: var(--semantics-buttons-accent-outlined-content-color);
		}

		:host([variant='accent-outlined']) .icon-button:hover {
			border-color: var(--semantics-buttons-accent-outlined-is-hovered-border-color);
			color: var(--semantics-buttons-accent-outlined-is-hovered-content-color);
		}

		:host([variant='accent-outlined']) .icon-button:active {
			border-color: var(--semantics-buttons-accent-outlined-is-active-border-color);
			color: var(--semantics-buttons-accent-outlined-is-active-content-color);
		}

		/* Variant: accent-transparent */
		:host([variant='accent-transparent']) .icon-button {
			background-color: transparent;
			color: var(--semantics-buttons-accent-transparent-content-color);
		}

		:host([variant='accent-transparent']) .icon-button:hover {
			color: var(--semantics-buttons-accent-transparent-is-hovered-content-color);
		}

		:host([variant='accent-transparent']) .icon-button:active {
			color: var(--semantics-buttons-accent-transparent-is-active-content-color);
		}

		/* Variant: danger-tinted (destructive) */
		:host([variant='danger-tinted']) .icon-button,
		:host([variant='destructive']) .icon-button {
			background-color: var(--semantics-buttons-danger-tinted-background-color);
			color: var(--semantics-buttons-danger-tinted-content-color);
		}

		:host([variant='danger-tinted']) .icon-button:hover,
		:host([variant='destructive']) .icon-button:hover {
			background-color: var(--semantics-buttons-danger-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-danger-tinted-is-hovered-content-color);
		}

		:host([variant='danger-tinted']) .icon-button:active,
		:host([variant='destructive']) .icon-button:active {
			background-color: var(--semantics-buttons-danger-tinted-is-active-background-color);
			color: var(--semantics-buttons-danger-tinted-is-active-content-color);
		}

		/* Accessibility: Reduced motion */
		@media (prefers-reduced-motion: reduce) {
			.icon-button {
				transition: none;
			}
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

	@property({ type: String })
	title = '';

	@property({ type: String })
	icon = 'icon-placeholder';

	@property({ type: Boolean, reflect: true, attribute: 'has-menu' })
	hasMenu = false;

	private _handleClick(e: MouseEvent): void {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	override render() {
		return html`
			<button
				class="icon-button"
				type=${this.type}
				?disabled=${this.disabled}
				aria-disabled=${this.disabled}
				aria-label=${this.title}
				@click=${this._handleClick}
			>
				<span class="icon-button__icon-area">
					<span class="icon-button__icon">
						${this.icon
							? html`<rr-icon name=${this.icon}></rr-icon>`
							: html`<slot></slot>`}
					</span>
					${this.hasMenu ? html`
						<span class="icon-button__picker-icon">
							<rr-icon name="chevron-down-small"></rr-icon>
						</span>
					` : ''}
				</span>
				<span class="icon-button__title">${this.title}</span>
			</button>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-icon-button': RRIconButton;
	}
}