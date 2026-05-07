import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const sheetStyles = css`


	/* # Host */

	:host {
		--_custom-width: initial;

		display: block;
	}


	/* # Keyframes — right */

	@keyframes sheet-slide-in-right {
		from { transform: translateX(100%); }
		to { transform: translateX(0); }
	}

	@keyframes sheet-slide-out-right {
		from { transform: translateX(0); }
		to { transform: translateX(100%); }
	}


	/* # Keyframes — left */

	@keyframes sheet-slide-in-left {
		from { transform: translateX(-100%); }
		to { transform: translateX(0); }
	}

	@keyframes sheet-slide-out-left {
		from { transform: translateX(0); }
		to { transform: translateX(-100%); }
	}


	/* # Keyframes — bottom */

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
		flex-direction: column;
		border: none;
		padding: 0;
		margin: 0;
		background: var(--semantics-surfaces-background-color);
		box-shadow: var(--semantics-overlays-box-shadow);
		overflow: hidden;
		position: fixed;
		outline: none;
	}

	.sheet:focus-visible:not(.is-pointer-focus) {
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--semantics-overlays-box-shadow);
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
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


	/* # Placement: right (default) */

	:host([placement='right']) .sheet,
	:host(:not([placement])) .sheet {
		inset: var(--semantics-overlays-inset) var(--semantics-overlays-inset) var(--semantics-overlays-inset) auto;
		width: min(var(--_custom-width, var(--semantics-sheets-side-md-width)), calc(100vw - var(--semantics-overlays-inset) * 2));
		height: calc(100dvh - var(--semantics-overlays-inset) * 2);
		border-radius: var(--semantics-overlays-corner-radius);

		@media (min-width: ${lgMin}) {
			width: min(var(--_custom-width, var(--semantics-sheets-side-lg-width)), calc(100vw - var(--semantics-overlays-inset) * 2));
		}

		&[open] {
			animation: sheet-slide-in-right var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
		}

		&.is-closing {
			animation: sheet-slide-out-right var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
		}
	}


	/* # Placement: left */

	:host([placement='left']) .sheet {
		inset: var(--semantics-overlays-inset) auto var(--semantics-overlays-inset) var(--semantics-overlays-inset);
		width: min(var(--_custom-width, var(--semantics-sheets-side-md-width)), calc(100vw - var(--semantics-overlays-inset) * 2));
		height: calc(100dvh - var(--semantics-overlays-inset) * 2);
		border-radius: var(--semantics-overlays-corner-radius);

		@media (min-width: ${lgMin}) {
			width: min(var(--_custom-width, var(--semantics-sheets-side-lg-width)), calc(100vw - var(--semantics-overlays-inset) * 2));
		}

		&[open] {
			animation: sheet-slide-in-left var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
		}

		&.is-closing {
			animation: sheet-slide-out-left var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
		}
	}


	/* # Placement: bottom */

	:host([placement='bottom']) .sheet {
		inset: auto 0 0 0;
		max-width: var(--semantics-page-sections-body-max-width);
		max-height: calc(100dvh - var(--semantics-sheets-bottom-top-inset));
		height: auto;
		margin-inline: auto;
		border-radius: var(--semantics-overlays-corner-radius) var(--semantics-overlays-corner-radius) 0 0;

		@media (max-width: ${smMax}) {
			width: 100%;
			max-width: 100%;
		}

		@media (min-width: ${mdMin}) {
			width: calc(100% - var(--semantics-sheets-bottom-md-inline-inset));
		}

		@media (min-width: ${lgMin}) {
			width: calc(100% - var(--semantics-sheets-bottom-lg-inline-inset));
		}

		&[open] {
			animation: sheet-slide-in-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
		}

		&.is-closing {
			animation: sheet-slide-out-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
		}
	}


	/* # Full-height
	   Force a bottom sheet to take its full max-height (= viewport minus
	   the top-inset), so visualisation-heavy content (graph view, full
	   editors) doesn't shrink to its intrinsic size. The top-inset stays
	   intact: it gives users a tap target to dismiss the sheet and a
	   visual cue that this is an overlay, not a full page. The sm
	   responsive block below covers the case where any placement
	   collapses to a bottom sheet on small viewports. */

	:host([placement='bottom'][full-height]) .sheet {
		height: calc(100dvh - var(--semantics-sheets-bottom-top-inset));
	}


	/* # Responsive: sm viewport — all placements become bottom sheet */

	@media (max-width: ${smMax}) {
		:host([placement='right']) .sheet,
		:host(:not([placement])) .sheet,
		:host([placement='left']) .sheet {
			inset: auto 0 0 0;
			width: 100%;
			max-width: 100%;
			height: auto;
			max-height: calc(100dvh - var(--semantics-sheets-bottom-top-inset));
			border-radius: var(--semantics-overlays-corner-radius) var(--semantics-overlays-corner-radius) 0 0;

			&[open] {
				animation: sheet-slide-in-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
			}

			&.is-closing {
				animation: sheet-slide-out-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
			}
		}

		:host([full-height]) .sheet {
			height: calc(100dvh - var(--semantics-sheets-bottom-top-inset));
		}
	}


	/* # Reduced motion */

	@media (prefers-reduced-motion: reduce) {
		.sheet[open],
		.sheet.is-closing {
			animation: none;
		}
	}


	/* # Sheet body */

	.sheet__body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		min-height: 0;
		width: 100%;
	}

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;
