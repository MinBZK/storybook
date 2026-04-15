import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.ts';

const smMax = unsafeCSS(breakpoints.smMax);


/* # ndd-window styles */

export const windowStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Window */

	.window {
		display: flex;
		flex-direction: column;
		border: none;
		padding: 0;
		background: var(--semantics-surfaces-background-color);
		border-radius: var(--semantics-overlays-corner-radius);
		box-shadow: var(--components-window-box-shadow);
		overflow: hidden;
		position: fixed;
		margin: auto;
		width: var(--components-window-default-width);
		max-width: calc(100vw - var(--components-window-inset) * 2);
		max-height: calc(100dvh - var(--components-window-inset) * 2);
	}

	.window:not([open]) {
		display: none;
	}

	.window:focus-visible {
		outline: none;
	}

	.window.is-keyboard-focus:focus {
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--components-window-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}


	/* # Backdrop (modal only) */

	.window::backdrop {
		background: var(--semantics-overlays-backdrop-color);
	}


	/* # Draggable — whole window as drag target (no handle) */

	:host([drag-enabled]:not([has-drag-handle])) .window__body {
		cursor: grab;
	}

	:host([drag-enabled]:not([has-drag-handle])) .window__body:active {
		cursor: grabbing;
	}


	/* ## Draggable — drag handle only */

	::slotted([window-drag-handle]) {
		cursor: grab;
	}

	::slotted([window-drag-handle]:active) {
		cursor: grabbing;
	}


	/* ## Responsive: sm — fixed insets, no dragging */

	@media (max-width: ${smMax}) {
		.window {
			left: var(--components-window-inset);
			right: var(--components-window-inset);
			width: calc(100vw - var(--components-window-inset) * 2);
		}

		:host([drag-enabled]:not([has-drag-handle])) .window__body {
			cursor: default;
		}

		:host([drag-enabled]:not([has-drag-handle])) .window__body:active {
			cursor: default;
		}

		::slotted([window-drag-handle]) {
			cursor: default;
		}

		::slotted([window-drag-handle]:active) {
			cursor: default;
		}
	}


	/* # Body */

	.window__body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		min-height: 0;
		width: 100%;
	}

	::slotted(*) {
		flex-grow: 1;
		min-height: 0;
	}
`;
