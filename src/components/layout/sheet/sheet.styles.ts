import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const sheetStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_width: initial;
		--_height: initial;

		/* contents, not block: the sheet itself is a position:fixed <dialog>, so the
		   host would only add an empty box. Left as a block it is a flex item like
		   any other, and inside a split-view pane it collects the pane's
		   ::slotted flex-grow and eats the height its siblings needed.
		   nldd-modal-dialog does the same for the same reason. */
		display: contents;
	}


	/* # Keyframes */

	@keyframes sheet-slide-in-right {
		from { transform: translateX(100%); }
		to { transform: translateX(0); }
	}

	@keyframes sheet-slide-out-right {
		from { transform: translateX(0); }
		to { transform: translateX(100%); }
	}

	@keyframes sheet-slide-in-left {
		from { transform: translateX(-100%); }
		to { transform: translateX(0); }
	}

	@keyframes sheet-slide-out-left {
		from { transform: translateX(0); }
		to { transform: translateX(-100%); }
	}

	@keyframes sheet-slide-in-bottom {
		from { transform: translateY(100%); }
		to { transform: translateY(0); }
	}

	@keyframes sheet-slide-out-bottom {
		from { transform: translateY(0); }
		to { transform: translateY(100%); }
	}


	/* # Block */

	.sheet {
		display: flex;
		position: fixed;
		margin: 0;
		outline: none;
		border: none;
		box-shadow: var(--semantics-overlays-box-shadow);
		background: var(--semantics-surfaces-base-background-color);
		overflow: hidden;
		padding: 0;
		flex-direction: column;

		@media (max-width: ${smMax}) {
			inset: auto 0 0 0;
			border-radius: var(--semantics-overlays-corner-radius) var(--semantics-overlays-corner-radius) 0 0;
			width: 100%;
			max-width: 100%;
			max-height: calc(100dvh - var(--semantics-sheets-bottom-top-inset));
			height: var(--_height, calc(100dvh - var(--semantics-sheets-bottom-top-inset)));

			&[open] {
				animation: sheet-slide-in-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
			}

			&.is-closing {
				animation: sheet-slide-out-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
			}
		}

		@media (min-width: ${mdMin}) {
			inset: var(--semantics-overlays-inset) var(--semantics-overlays-inset) var(--semantics-overlays-inset) auto;
			border-radius: var(--semantics-overlays-corner-radius);
			width: min(var(--_width, var(--semantics-sheets-side-md-width)), calc(100vw - var(--semantics-overlays-inset) * 2));
			height: calc(100dvh - var(--semantics-overlays-inset) * 2);

			&[open] {
				animation: sheet-slide-in-right var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
			}

			&.is-closing {
				animation: sheet-slide-out-right var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
			}
		}

		@media (min-width: ${lgMin}) {
			width: min(var(--_width, var(--semantics-sheets-side-lg-width)), calc(100vw - var(--semantics-overlays-inset) * 2));
		}
	}

	.sheet:focus-visible:not(.is-pointer-focus) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--semantics-overlays-box-shadow);
	}

	.sheet:not([open]) {
		display: none;
	}

	.sheet::backdrop {
		background: var(--semantics-overlays-backdrop-color);
	}

	:host([modeless]) .sheet::backdrop {
		background: transparent;
	}

	:host([placement="left"]) .sheet {
		@media (min-width: ${mdMin}) {
			inset: var(--semantics-overlays-inset) auto var(--semantics-overlays-inset) var(--semantics-overlays-inset);
			border-radius: var(--semantics-overlays-corner-radius);
			width: min(var(--_width, var(--semantics-sheets-side-md-width)), calc(100vw - var(--semantics-overlays-inset) * 2));
			height: calc(100dvh - var(--semantics-overlays-inset) * 2);

			&[open] {
				animation: sheet-slide-in-left var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
			}

			&.is-closing {
				animation: sheet-slide-out-left var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
			}
		}

		@media (min-width: ${lgMin}) {
			width: min(var(--_width, var(--semantics-sheets-side-lg-width)), calc(100vw - var(--semantics-overlays-inset) * 2));
		}
	}

	:host([placement="bottom"]) .sheet {
		@media (min-width: ${mdMin}) {
			inset: auto 0 0 0;
			margin-inline: auto;
			border-radius: var(--semantics-overlays-corner-radius) var(--semantics-overlays-corner-radius) 0 0;
			width: calc(100% - var(--semantics-sheets-bottom-md-inline-inset));
			max-width: var(--semantics-page-sections-body-max-width);
			max-height: calc(100dvh - var(--semantics-sheets-bottom-top-inset));
			height: var(--_height, calc(100dvh - var(--semantics-sheets-bottom-top-inset)));

			&[open] {
				animation: sheet-slide-in-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
			}

			&.is-closing {
				animation: sheet-slide-out-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
			}
		}

		@media (min-width: ${lgMin}) {
			width: calc(100% - var(--semantics-sheets-bottom-lg-inline-inset));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sheet[open],
		.sheet.is-closing {
			animation: none;
		}
	}


	/* # Elements */

	.sheet__body {
		display: flex;
		min-height: 0;
		width: 100%;
		flex-direction: column;
		flex-grow: 1;
	}

	/* A slotted page or container fills the sheet body (so its own content scrolls
	   within the sheet). Scoped to these two so other direct children keep their
	   intrinsic height instead of being stretched. */
	::slotted(nldd-page),
	::slotted(nldd-container) {
		min-height: 0;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}
`;
