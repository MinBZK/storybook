import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);

export const popoverStyles = css`


	/* # Host */

	:host {
		--_max-height: calc(100vh - var(--semantics-overlays-inset) * 2);

		margin: 0;
		padding: 0;
		border: none;
		background-color: var(--semantics-surfaces-background-color);
		box-shadow: var(--semantics-overlays-box-shadow);
		overflow: auto;
		outline: none;
		isolation: isolate;

		@media (max-width: ${smMax}) {
			position: fixed;
			inset: auto 0 0 0;
			width: 100%;
			max-width: 100%;
			max-height: calc(100dvh - var(--semantics-sheets-bottom-top-inset));
			border-radius: var(--semantics-overlays-corner-radius) var(--semantics-overlays-corner-radius) 0 0;
			transform: translateY(100%);
			transition:
				transform var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default),
				display var(--semantics-sheets-bottom-animation-duration) allow-discrete,
				overlay var(--semantics-sheets-bottom-animation-duration) allow-discrete;
		}

		@media (min-width: ${mdMin}) {
			position: absolute;
			inset: unset;
			border-radius: var(--semantics-overlays-corner-radius);
			width: var(--components-popover-default-width);
			max-width: calc(100vw - var(--semantics-overlays-inset) * 2);
			max-height: var(--_max-height);
		}
	}

	:host([hidden]) {
		display: none;
	}

	:host(:not(:popover-open)) {
		display: none;
	}

	:host(:focus-visible:not(.is-pointer-focus)) {
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--semantics-overlays-box-shadow);
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
	}


	:host(:popover-open) {
		@media (max-width: ${smMax}) {
			transform: translateY(0);

			@starting-style {
				transform: translateY(100%);
			}
		}
	}

	:host::backdrop {
		@media (max-width: ${smMax}) {
			background-color: var(--semantics-overlays-backdrop-color);
		}
	}

	:host([sm-full-height]) {
		@media (max-width: ${smMax}) {
			height: calc(100dvh - var(--semantics-sheets-bottom-top-inset));
		}
	}


	/* # Reduced motion — top-level safety net.
	   Currently transitions zijn alleen gedefinieerd binnen de sm
	   bottom-sheet-rule, maar deze top-level guard zorgt dat ook
	   toekomstige desktop-viewport animaties automatisch worden
	   gedeactiveerd voor users met prefers-reduced-motion. */

	:host {
		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	}
`;
