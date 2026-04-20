import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const sheetStyles = css`


	/* # Host */

	:host {
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
		box-shadow: var(--components-sheet-box-shadow);
		overflow: hidden;
		position: fixed;
		outline: none;
	}

	.sheet:focus-visible:not(.is-pointer-focus) {
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--components-sheet-box-shadow);
		outline: var(--semantics-focus-ring-outline);
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
		inset: var(--components-sheet-side-inset) var(--components-sheet-side-inset) var(--components-sheet-side-inset) auto;
		width: var(--components-sheet-side-md-width);
		height: calc(100dvh - var(--components-sheet-side-inset) * 2);
		border-radius: var(--semantics-overlays-corner-radius);

		@media (min-width: ${lgMin}) {
			width: var(--components-sheet-side-lg-width);
		}

		&[open] {
			animation: sheet-slide-in-right var(--components-sheet-side-animation-duration) ease both;
		}

		&.is-closing {
			animation: sheet-slide-out-right var(--components-sheet-side-animation-duration) ease both;
		}
	}


	/* # Placement: left */

	:host([placement='left']) .sheet {
		inset: var(--components-sheet-side-inset) auto var(--components-sheet-side-inset) var(--components-sheet-side-inset);
		width: var(--components-sheet-side-md-width);
		height: calc(100dvh - var(--components-sheet-side-inset) * 2);
		border-radius: var(--semantics-overlays-corner-radius);

		@media (min-width: ${lgMin}) {
			width: var(--components-sheet-side-lg-width);
		}

		&[open] {
			animation: sheet-slide-in-left var(--components-sheet-side-animation-duration) ease both;
		}

		&.is-closing {
			animation: sheet-slide-out-left var(--components-sheet-side-animation-duration) ease both;
		}
	}


	/* # Placement: bottom */

	:host([placement='bottom']) .sheet {
		inset: auto 0 0 0;
		max-width: var(--semantics-page-sections-body-max-width);
		max-height: calc(100dvh - var(--components-sheet-bottom-top-inset));
		height: auto;
		margin-inline: auto;
		border-radius: var(--semantics-overlays-corner-radius) var(--semantics-overlays-corner-radius) 0 0;

		@media (max-width: ${smMax}) {
			width: 100%;
			max-width: 100%;
		}

		@media (min-width: ${mdMin}) {
			width: calc(100% - var(--components-sheet-bottom-md-inline-inset));
		}

		@media (min-width: ${lgMin}) {
			width: calc(100% - var(--components-sheet-bottom-lg-inline-inset));
		}

		&[open] {
			animation: sheet-slide-in-bottom var(--components-sheet-bottom-animation-duration) ease both;
		}

		&.is-closing {
			animation: sheet-slide-out-bottom var(--components-sheet-bottom-animation-duration) ease both;
		}
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
			max-height: calc(100dvh - var(--components-sheet-bottom-top-inset));
			border-radius: var(--semantics-overlays-corner-radius) var(--semantics-overlays-corner-radius) 0 0;

			&[open] {
				animation: sheet-slide-in-bottom var(--components-sheet-bottom-animation-duration) ease both;
			}

			&.is-closing {
				animation: sheet-slide-out-bottom var(--components-sheet-bottom-animation-duration) ease both;
			}
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
