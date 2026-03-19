import { css } from 'lit';

export const tokenStyles = css`


	/* # Host */

	:host {
		display: inline-block;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Base */

	.token {
		/* Reset (for menu button) */
		appearance: none;
		border: none;
		margin: 0;
		background: none;
		font: inherit;

		/* Layout */
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		height: var(--semantics-controls-sm-min-size);
		padding: 0 var(--primitives-space-6);

		/* Appearance */
		border-radius: var(--semantics-controls-sm-corner-radius);
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		color: var(--semantics-buttons-neutral-tinted-content-color);
		font: var(--semantics-buttons-sm-font);

		/* Animation */
		transition: background-color 0.15s ease-out;
	}

	@media (prefers-reduced-motion: reduce) {
		.token {
			transition: none;
		}
	}


	/* # Text */

	.token__text {
		display: flex;
		align-items: center;
		padding: 0 var(--primitives-space-2);
	}


	/* # Icon */

	.token__icon {
		display: block;
		flex-shrink: 0;
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}


	/* # States */

	/* ## Hover — menu */

	:host([control="menu"]) .token:hover:not(:disabled) {
		background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
	}

	/* ## Open — menu */

	:host([open]) .token {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
	}

	:host([open]) .token:hover:not(:disabled) {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
	}

	/* ## Focus — menu */

	:host([control="menu"]) .token:focus-visible {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	:host([control="menu"]) .token:focus:not(:focus-visible) {
		outline: none;
	}


	/* # Dismiss — padding compensation */

	/* Remove right padding so the rr-icon-button flush-fits the token edge */
	:host([control="dismiss"]) .token {
		padding-right: 0;
	}

	/* # Accessibility */

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
`;
