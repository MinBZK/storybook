import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);

export const windowStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.window {
		display: flex;
		flex-direction: column;
		border: none;
		padding: 0;
		background-color: var(--semantics-surfaces-background-color);
		border-radius: var(--semantics-overlays-corner-radius);
		box-shadow: var(--components-window-box-shadow);
		overflow: hidden;
		position: fixed;
		margin: auto;
		width: var(--components-window-default-width);
		max-width: calc(100vw - var(--components-window-inset) * 2);
		max-height: calc(100dvh - var(--components-window-inset) * 2);
		outline: none;
	}

	.window:not([open]) {
		display: none;
	}

	.window:focus-visible:not(.is-pointer-focus) {
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--components-window-box-shadow);
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
	}


	/* # Backdrop (modal only) */

	.window::backdrop {
		background-color: var(--semantics-overlays-backdrop-color);
	}


	/* # Draggable — whole window as drag target (no handle) */

	:host([movable]:not([has-drag-handle])) .window__body {
		cursor: grab;
	}

	:host([movable]:not([has-drag-handle])) .window__body:active {
		cursor: grabbing;
	}


	/* Drag handle cursor is set via JS in _detectDragHandle
	   because ::slotted cannot reach nested elements
	   (e.g. nldd-top-title-bar inside nldd-page). */


	/* ## Responsive: sm — fixed insets, no dragging */

	@media (max-width: ${smMax}) {
		.window {
			left: var(--components-window-inset);
			right: var(--components-window-inset);
			width: calc(100vw - var(--components-window-inset) * 2);
		}

		:host([movable]:not([has-drag-handle])) .window__body {
			cursor: default;
		}

		:host([movable]:not([has-drag-handle])) .window__body:active {
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
		min-height: 0;
	}
`;
