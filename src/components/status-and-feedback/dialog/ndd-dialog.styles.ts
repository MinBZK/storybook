import { css } from 'lit';

/* # ndd-dialog styles */

export const dialogStyles = css`

	/* # Host */

	:host {
		display: contents;
		--_max-height: 90vh;
		--_animation-duration: 150ms;
		--_animation-easing: ease;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Modal dialog */

	.dialog {
		border: none;
		padding: var(--primitives-space-24) var(--primitives-space-16);
		max-width: var(--primitives-area-480);
		width: calc(100% - var(--primitives-space-16) * 2);
		max-height: var(--_max-height);
		overflow-y: auto;
		background-color: var(--semantics-surfaces-background-color);
		border-radius: var(--semantics-overlays-corner-radius);
		box-shadow: var(--components-dialog-box-shadow);
		box-sizing: border-box;
	}

	.dialog:not([open]) {
		display: none;
	}

	.dialog:focus-visible {
		box-shadow: var(--components-dialog-box-shadow), 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	.dialog::backdrop {
		background: var(--semantics-overlays-backdrop-color);
	}


	/* # Keyframes */

	@keyframes dialog-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes dialog-out {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.95);
		}
	}

	.dialog[open] {
		animation: dialog-in var(--_animation-duration) var(--_animation-easing) both;
	}

	.dialog.is-closing {
		animation: dialog-out var(--_animation-duration) var(--_animation-easing) both;
	}


	/* # Reduced motion */

	@media (prefers-reduced-motion: reduce) {
		.dialog[open],
		.dialog.is-closing {
			animation: none;
		}
	}
`;
