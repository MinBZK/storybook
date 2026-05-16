import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const navigationSplitViewStyles = css`


	/* # Host */

	:host {
		--_sidebar-min-width: var(--primitives-area-320); /* Pane min-width — read by JS via getComputedStyle in firstUpdated */
		--_secondary-sidebar-min-width: var(--primitives-area-320); /* Pane min-width — read by JS via getComputedStyle in firstUpdated */
		--_main-min-width: var(--primitives-area-480); /* Pane min-width — read by JS via getComputedStyle in firstUpdated */
		--_inspector-min-width: var(--primitives-area-320); /* Pane min-width — read by JS via getComputedStyle in firstUpdated */
		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-background-color));

		display: flex;
		background-color: var(--_background-color);
		width: 100%;
		height: 100%;
	}

	:host([background="default"]) {
		--context-parent-background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([background="tinted"]) {
		--context-parent-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--context-parent-background-color);
	}


	/* # Block */

	.navigation-split-view {
		display: flex;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
		flex-direction: row;
		flex: 1;
	}


	/* # Sidebar */

	.navigation-split-view__sidebar-pane {
		display: flex;
		min-height: 0;
		min-width: var(--_sidebar-min-width);
		overflow: hidden;
		flex-direction: column;
		flex-shrink: 0;
	}


	/* # Secondary sidebar */

	.navigation-split-view__secondary-sidebar-pane {
		display: flex;
		min-height: 0;
		min-width: var(--_secondary-sidebar-min-width);
		overflow: hidden;
		flex-direction: column;
		flex-shrink: 0;
	}


	/* # Main */

	.navigation-split-view__main-pane {
		display: flex;
		min-height: 0;
		min-width: var(--_main-min-width);
		overflow: hidden;
		flex-direction: column;
		flex: 1;
	}


	/* # Full-stack: single pane fills available space, no minimum */

	:host(.full-stack) .navigation-split-view__sidebar-pane,
	:host(.full-stack) .navigation-split-view__secondary-sidebar-pane,
	:host(.full-stack) .navigation-split-view__main-pane {
		min-width: 0;
		flex: 1;
	}


	/* # Sidebar — inline pane suppresses dismiss button */

	.navigation-split-view__sidebar-pane,
	.navigation-split-view__secondary-sidebar-pane {
		--context-dismiss-button-display: none;
	}

	.navigation-split-view__inspector-pane {
		/* Suppress dismiss button — inspector is always dismissable as a sheet, not inline */
		--context-dismiss-button-display: none;

		display: flex;
		min-height: 0;
		min-width: var(--_inspector-min-width);
		overflow: hidden;
		flex-direction: column;
		flex-shrink: 0;
	}


	/* # Inspector — sheet (dialog) */

	@keyframes navigation-split-view-inspector-slide-in {
		from { transform: translateX(100%); }
		to { transform: translateX(0); }
	}

	@keyframes navigation-split-view-inspector-slide-out {
		from { transform: translateX(0); }
		to { transform: translateX(100%); }
	}

	.navigation-split-view__inspector-sheet {
		display: flex;
		position: fixed;
		margin: 0;
		border: none;
		box-shadow: var(--semantics-overlays-box-shadow);
		outline: none;
		background: var(--semantics-surfaces-background-color);
		overflow: hidden;
		padding: 0;
		flex-direction: column;

		@media (max-width: ${smMax}) {
			inset: auto 0 0 0;
			border-radius: var(--semantics-overlays-corner-radius) var(--semantics-overlays-corner-radius) 0 0;
			width: 100%;
			max-width: 100%;
			height: auto;
			max-height: calc(100dvh - var(--semantics-sheets-bottom-top-inset));
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			inset: var(--semantics-overlays-inset) var(--semantics-overlays-inset) var(--semantics-overlays-inset) auto;
			border-radius: var(--semantics-overlays-corner-radius);
			width: var(--semantics-sheets-side-md-width);
			height: calc(100dvh - var(--semantics-overlays-inset) * 2);
		}

		@media (min-width: ${lgMin}) {
			inset: var(--semantics-overlays-inset) var(--semantics-overlays-inset) var(--semantics-overlays-inset) auto;
			border-radius: var(--semantics-overlays-corner-radius);
			width: var(--semantics-sheets-side-lg-width);
			height: calc(100dvh - var(--semantics-overlays-inset) * 2);
		}

		&:focus-visible:not(.is-pointer-focus) {
			box-shadow: var(--semantics-focus-ring-box-shadow), var(--semantics-overlays-box-shadow);
			outline: var(--semantics-focus-ring-outline);
			outline-offset: var(--semantics-focus-ring-outline-offset);
		}

		&:not([open]) {
			display: none;
		}

		&::backdrop {
			background: var(--semantics-overlays-backdrop-color);
		}

		&[open] {
			@media (max-width: ${smMax}) {
				animation: navigation-split-view-slide-in-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
			}

			@media (min-width: ${mdMin}) {
				animation: navigation-split-view-inspector-slide-in var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
			}
		}

		&.is-closing {
			@media (max-width: ${smMax}) {
				animation: navigation-split-view-slide-out-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
			}

			@media (min-width: ${mdMin}) {
				animation: navigation-split-view-inspector-slide-out var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
			}
		}
	}

	.navigation-split-view__inspector-sheet-body {
		display: flex;
		min-height: 0;
		width: 100%;
		flex-direction: column;
		flex-grow: 1;
	}


	/* # Sidebar — sheet (dialog) */

	@keyframes navigation-split-view-sidebar-slide-in {
		from { transform: translateX(-100%); }
		to { transform: translateX(0); }
	}

	@keyframes navigation-split-view-sidebar-slide-out {
		from { transform: translateX(0); }
		to { transform: translateX(-100%); }
	}

	.navigation-split-view__sidebar-sheet {
		display: flex;
		position: fixed;
		margin: 0;
		border: none;
		box-shadow: var(--semantics-overlays-box-shadow);
		outline: none;
		background: var(--semantics-surfaces-background-color);
		overflow: hidden;
		padding: 0;
		flex-direction: column;

		@media (max-width: ${smMax}) {
			inset: auto 0 0 0;
			border-radius: var(--semantics-overlays-corner-radius) var(--semantics-overlays-corner-radius) 0 0;
			width: 100%;
			max-width: 100%;
			height: auto;
			max-height: calc(100dvh - var(--semantics-sheets-bottom-top-inset));
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			inset: var(--semantics-overlays-inset) auto var(--semantics-overlays-inset) var(--semantics-overlays-inset);
			border-radius: var(--semantics-overlays-corner-radius);
			width: var(--semantics-sheets-side-md-width);
			height: calc(100dvh - var(--semantics-overlays-inset) * 2);
		}

		@media (min-width: ${lgMin}) {
			inset: var(--semantics-overlays-inset) auto var(--semantics-overlays-inset) var(--semantics-overlays-inset);
			border-radius: var(--semantics-overlays-corner-radius);
			width: var(--semantics-sheets-side-lg-width);
			height: calc(100dvh - var(--semantics-overlays-inset) * 2);
		}

		&:focus-visible:not(.is-pointer-focus) {
			box-shadow: var(--semantics-focus-ring-box-shadow), var(--semantics-overlays-box-shadow);
			outline: var(--semantics-focus-ring-outline);
			outline-offset: var(--semantics-focus-ring-outline-offset);
		}

		&:not([open]) {
			display: none;
		}

		&::backdrop {
			background: var(--semantics-overlays-backdrop-color);
		}

		&[open] {
			@media (max-width: ${smMax}) {
				animation: navigation-split-view-slide-in-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
			}

			@media (min-width: ${mdMin}) {
				animation: navigation-split-view-sidebar-slide-in var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
			}
		}

		&.is-closing {
			@media (max-width: ${smMax}) {
				animation: navigation-split-view-slide-out-bottom var(--semantics-sheets-bottom-animation-duration) var(--primitives-transition-easing-default) both;
			}

			@media (min-width: ${mdMin}) {
				animation: navigation-split-view-sidebar-slide-out var(--semantics-sheets-side-animation-duration) var(--primitives-transition-easing-default) both;
			}
		}
	}

	.navigation-split-view__sidebar-sheet-body {
		/* Show dismiss button inside sidebar sheet */
		--context-dismiss-button-display: block;

		display: flex;
		min-height: 0;
		width: 100%;
		flex-direction: column;
		flex-grow: 1;
	}


	/* # Responsive: sm viewport — sheets become bottom sheets */

	@keyframes navigation-split-view-slide-in-bottom {
		from { transform: translateY(100%); }
		to { transform: translateY(0); }
	}

	@keyframes navigation-split-view-slide-out-bottom {
		from { transform: translateY(0); }
		to { transform: translateY(100%); }
	}


	/* # Reduced motion */

	@media (prefers-reduced-motion: reduce) {
		.navigation-split-view__inspector-sheet[open],
		.navigation-split-view__inspector-sheet.is-closing,
		.navigation-split-view__sidebar-sheet[open],
		.navigation-split-view__sidebar-sheet.is-closing {
			animation: none;
		}
	}


	/* # Slotted */

	::slotted(*) {
		min-height: 0;
		flex: 1;
	}
`;
