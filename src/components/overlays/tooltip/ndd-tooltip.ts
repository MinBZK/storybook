/**
 * Nederlandse Digitale Dienst Tooltip Component (Lit + TypeScript)
 *
 * A tooltip component that displays informational text.
 *
 * @element ndd-tooltip
 * @attr {string} text - Tooltip text content
 *
 * @csspart tooltip - The tooltip container
 * @csspart text - The text content
 *
 * @note This component renders the tooltip visual only. The consumer is responsible
 * for trigger logic (hover/focus), positioning, and show/hide behavior.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ndd-tooltip')
export class NDDTooltip extends LitElement {
	static override styles = css`
		:host {
			display: inline-flex;
			font-family: var(--ndd-font-family-body);
		}

		:host([hidden]) {
			display: none;
		}

		.tooltip {
			display: inline-flex;
			align-items: center;
			box-shadow: var(--primitives-box-shadows-level-2);
		}

		.tooltip__body {
			background-color: var(--primitives-color-neutral-0);
			color: var(--semantics-content-color);
			font: var(--primitives-font-body-xs-regular-tight);
			padding: var(--primitives-space-4) var(--primitives-space-8);
			white-space: nowrap;
		}

		/* Accessibility: High Contrast Mode */
		@media (forced-colors: active) {
			.tooltip__body {
				border: 1px solid CanvasText;
			}
		}
	`;

	@property({ type: String })
	text = '';

	override render() {
		return html`
			<div class="tooltip" part="tooltip" role="tooltip">
				<div class="tooltip__body" part="text">${this.text}</div>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-tooltip': NDDTooltip;
	}
}
