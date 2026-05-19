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
		position: fixed;
		margin: auto;
		outline: none;
		border: none;
		border-radius: var(--semantics-overlays-corner-radius);
		box-shadow: var(--semantics-overlays-box-shadow);
		background-color: var(--semantics-surfaces-background-color);
		width: var(--components-window-default-width);
		max-width: calc(100vw - var(--semantics-overlays-inset) * 2);
		max-height: calc(100dvh - var(--semantics-overlays-inset) * 2);
		overflow: hidden;
		padding: 0;
		flex-direction: column;
	}

	.window:not([open]) {
		display: none;
	}

	.window:focus-visible:not(.is-pointer-focus) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--semantics-overlays-box-shadow);
	}

	.window::backdrop {
		background-color: var(--semantics-overlays-backdrop-color);
	}


	/* # Elements */

	.window__body {
		display: flex;
		min-height: 0;
		width: 100%;
		flex-direction: column;
		flex-grow: 1;
	}

	:host([movable]:not([has-drag-handle])) .window__body {
		cursor: grab;
	}

	:host([movable]:not([has-drag-handle])) .window__body:active {
		cursor: grabbing;
	}

	/* Drag handle cursor is set via JS in _detectDragHandle because
	   ::slotted cannot reach nested elements (e.g. nldd-top-title-bar
	   inside nldd-page). */

	::slotted(*) {
		min-height: 0;
	}

	/* ## Responsive: sm — fixed insets, no dragging */

	@media (max-width: ${smMax}) {
		.window {
			left: var(--semantics-overlays-inset);
			right: var(--semantics-overlays-inset);
			width: calc(100vw - var(--semantics-overlays-inset) * 2);
		}

		:host([movable]:not([has-drag-handle])) .window__body {
			cursor: default;
		}

		:host([movable]:not([has-drag-handle])) .window__body:active {
			cursor: default;
		}
	}
`;
