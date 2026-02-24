/**
 * RegelRecht Split Button Component (Lit + TypeScript)
 *
 * A split button combines a primary action button with a dropdown trigger.
 * The main button performs the default action, while the icon button opens a menu.
 *
 * @element rr-split-button
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 *
 * @slot - Default slot for button label text and optional icons
 *
 * @fires action-click - Fired when the main button is clicked
 * @fires menu-click - Fired when the dropdown trigger is clicked
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './../button/rr-button.ts';
import './../icon-button/rr-icon-button.ts';

type Size = 'xs' | 'sm' | 'md';

@customElement('rr-split-button')
export class RRSplitButton extends LitElement {
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

		:host([disabled]) rr-button,
		:host([disabled]) rr-icon-button {
			opacity: 1;
		}

		.split-button {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			background-color: var(--semantics-buttons-neutral-tinted-background-color);
		}

		.split-button__divider {
			width: 1px;
			flex-shrink: 0;
			background-color: var(--semantics-buttons-neutral-tinted-divider-color);
		}

		/* Size: XS */
		:host([size='xs']) .split-button {
			border-radius: var(--semantics-controls-xs-corner-radius);
		}

		:host([size='xs']) .split-button__divider {
			height: var(--semantics-buttons-xs-divider-length);
		}

		/* Size: SM */
		:host([size='sm']) .split-button {
			border-radius: var(--semantics-controls-sm-corner-radius);
		}

		:host([size='sm']) .split-button__divider {
			height: var(--semantics-buttons-sm-divider-length);
		}

		/* Size: MD (default) */
		:host([size='md']) .split-button,
		:host(:not([size])) .split-button {
			border-radius: var(--semantics-controls-md-corner-radius);
		}

		:host([size='md']) .split-button__divider,
		:host(:not([size])) .split-button__divider {
			height: var(--semantics-buttons-md-divider-length);
		}

		rr-button:focus-within,
		rr-icon-button:focus-within {
			position: relative;
			z-index: 1;
		}

	`;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	private _handleActionClick(e: MouseEvent): void {
		e.stopPropagation();
		this.dispatchEvent(new CustomEvent('action-click', { bubbles: true, composed: true }));
	}

	private _handleMenuClick(e: MouseEvent): void {
		e.stopPropagation();
		this.dispatchEvent(new CustomEvent('menu-click', { bubbles: true, composed: true }));
	}

	override render() {
		return html`
			<div class="split-button">
				<rr-button
					variant="neutral-tinted"
					size=${this.size}
					?disabled=${this.disabled}
					@click=${this._handleActionClick}
				>
					<slot></slot>
				</rr-button>
				<div
					class="split-button__divider"
					role="separator"
					aria-orientation="vertical"
				></div>
				<rr-icon-button
					variant="neutral-tinted"
					size=${this.size}
					?disabled=${this.disabled}
					aria-haspopup="menu"
					@click=${this._handleMenuClick}
				>
					<rr-icon name="chevron-down-small"></rr-icon>
					Meer opties
				</rr-icon-button>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-split-button': RRSplitButton;
	}
}
