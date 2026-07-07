import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const tokenStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-highlight-border-color);

		${inheritedTextReset}
		display: inline-block;
		max-width: 100%;
		/* min-width:0 lets the host shrink as a flex item (enables the label ellipsis). */
		min-width: 0;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	/* z-index raises the ring above adjacent tokens so it isn't clipped. */
	:host(:focus-visible) {
		position: relative;
		z-index: 1;
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}


	/* # Block */

	.token {
		box-sizing: border-box;
		display: inline-flex;
		margin: 0;
		border: none;
		border-radius: var(--semantics-controls-sm-corner-radius);
		background: none;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		position: relative;
		height: var(--semantics-controls-sm-min-size);
		max-width: 100%;
		min-width: 0;
		padding: 0 var(--primitives-space-6);
		align-items: center;
		color: var(--semantics-buttons-neutral-tinted-primary-content-color);
		font: var(--semantics-buttons-sm-primary-text-font);
		transition: background-color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default);
		appearance: none;
	}

	.token::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--_highlight-border-color);
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.token {
			transition: none;
		}
	}

	@media (hover: hover) {
		:host([control="menu"]) .token:hover:not(:disabled) {
			--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-hovered-highlight-border-color);
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-hovered-primary-content-color);
		}
	}

	:host([control="menu"]) .token:active:not(:disabled) {
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-active-highlight-border-color);
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-primary-content-color);
	}

	:host([expanded]) .token {
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-expanded-highlight-border-color);
		background-color: var(--semantics-buttons-neutral-tinted-is-expanded-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-expanded-primary-content-color);
	}

	@media (hover: hover) {
		:host([expanded]) .token:hover:not(:disabled) {
			--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-highlight-border-color);
			background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-primary-content-color);
		}
	}

	:host([expanded]) .token:active:not(:disabled) {
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-highlight-border-color);
		background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-primary-content-color);
	}

	:host([control="menu"]) .token:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	:host([control="menu"]) .token:focus:not(:focus-visible) {
		outline: none;
	}

	/* Remove right padding so the nldd-icon-button flush-fits the token edge */
	:host([control="dismiss"]) .token {
		padding-right: 0;
	}

	@media (forced-colors: active) {
		.token {
			border: 1px solid CanvasText;
		}

		:host([control="menu"]) .token:focus-visible,
		.token__dismiss:focus-visible {
			outline: 2px solid CanvasText;
			outline-offset: 2px;
		}
	}


	/* # Elements */

	.token__text {
		display: block;
		padding: 0 var(--primitives-space-2);
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.token__icon {
		display: block;
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
		flex-shrink: 0;
	}

	.token__dismiss-action {
		flex-shrink: 0;
	}
`;
