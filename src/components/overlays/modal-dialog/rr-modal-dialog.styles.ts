import { css } from 'lit';

/* # rr-modal-dialog styles */

export const modalDialogStyles = css`

	/* # Host */

	:host {
		display: contents;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Modal dialog */

	.modal-dialog {
		border: none;
		padding: var(--primitives-space-24) var(--primitives-space-16);
		max-width: var(--primitives-area-480);
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		background-color: var(--semantics-surfaces-background-color);
		border-radius: var(--semantics-overlays-corner-radius);
		box-shadow: var(--components-sheet-box-shadow);
		box-sizing: border-box;
	}

	.modal-dialog:not([open]) {
		display: none;
	}

	.modal-dialog:focus-visible {
		box-shadow: var(--components-sheet-box-shadow), 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	.modal-dialog::backdrop {
		background: var(--semantics-overlays-backdrop-color);
	}


	/* # Keyframes */

	@keyframes modal-dialog-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes modal-dialog-out {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.95);
		}
	}

	.modal-dialog[open] {
		animation: modal-dialog-in 150ms ease both;
	}

	.modal-dialog.is-closing {
		animation: modal-dialog-out 150ms ease both;
	}


	/* # Reduced motion */

	@media (prefers-reduced-motion: reduce) {
		.modal-dialog[open],
		.modal-dialog.is-closing {
			animation: none;
		}
	}
`;
