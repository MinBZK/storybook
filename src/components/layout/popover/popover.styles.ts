import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);

export const popoverStyles = css`


	/* # Host */

	:host {
		--_max-height: calc(100vh - var(--semantics-overlays-inset) * 2);
		position: absolute;
		inset: unset;
		margin: 0;
		padding: 0;
		border: none;
		background-color: var(--semantics-surfaces-background-color);
		border-radius: var(--semantics-overlays-corner-radius);
		box-shadow: var(--semantics-overlays-box-shadow);
		width: var(--components-popover-default-width);
		max-width: calc(100vw - var(--semantics-overlays-inset) * 2);
		max-height: var(--_max-height);
		overflow: auto;
		outline: none;
		isolation: isolate;
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


	/* # Responsive: sm viewport — bottom sheet */

	@media (max-width: ${smMax}) {
		:host {
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

		:host(:popover-open) {
			transform: translateY(0);
		}

		@starting-style {
			:host(:popover-open) {
				transform: translateY(100%);
			}
		}

		@media (prefers-reduced-motion: reduce) {
			:host {
				transition: none;
			}
		}
	}
`;
