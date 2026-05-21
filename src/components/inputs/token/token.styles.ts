import { css } from 'lit';

export const tokenStyles = css`


	/* # Host */

	:host {
		display: inline-block;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
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
		height: var(--semantics-controls-sm-min-size);
		padding: 0 var(--primitives-space-6);
		align-items: center;
		color: var(--semantics-buttons-neutral-tinted-content-color);
		font: var(--semantics-buttons-sm-font);
		transition: background-color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default);
		appearance: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.token {
			transition: none;
		}
	}

	@media (hover: hover) {
		:host([control="menu"]) .token:hover:not(:disabled) {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
		}
	}

	:host([control="menu"]) .token:active:not(:disabled) {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
	}

	:host([expanded]) .token {
		background-color: var(--semantics-buttons-neutral-tinted-is-expanded-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-expanded-content-color);
	}

	@media (hover: hover) {
		:host([expanded]) .token:hover:not(:disabled) {
			background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-content-color);
		}
	}

	:host([expanded]) .token:active:not(:disabled) {
		background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-content-color);
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
		display: flex;
		padding: 0 var(--primitives-space-2);
		align-items: center;
	}

	.token__icon {
		display: block;
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
		flex-shrink: 0;
	}
`;
