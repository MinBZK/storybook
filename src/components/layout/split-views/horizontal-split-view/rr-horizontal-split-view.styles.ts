import { css } from 'lit';


/* # rr-horizontal-split-view styles */

export const horizontalSplitViewStyles = css`
	:host {
		display: flex;
		width: 100%;
		height: 100%;

		/* Pane min-widths — read by JS via getComputedStyle in firstUpdated */
		--_sidebar-min-width: var(--primitives-area-320);
		--_secondary-sidebar-min-width: var(--primitives-area-320);
		--_main-min-width: var(--primitives-area-480);
		--_inspector-min-width: var(--primitives-area-320);
	}



	/* # Split view */

	.horizontal-split-view {
		display: flex;
		flex-direction: row;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
	}


	/* # Sidebar */

	.horizontal-split-view__sidebar-pane {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-height: 0;
		min-width: var(--_sidebar-min-width);
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;
	}


	/* # Secondary sidebar */

	.horizontal-split-view__secondary-sidebar-pane {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-height: 0;
		min-width: var(--_secondary-sidebar-min-width);
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;
	}


	/* # Main */

	.horizontal-split-view__main-pane {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: var(--_main-min-width);
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;
	}


	/* # Full-stack: single pane fills available space, no minimum */

	:host(.full-stack) .horizontal-split-view__sidebar-pane,
	:host(.full-stack) .horizontal-split-view__secondary-sidebar-pane,
	:host(.full-stack) .horizontal-split-view__main-pane {
		min-width: 0;
	}

	/* # Sidebar — inline pane suppresses dismiss button */

	.horizontal-split-view__sidebar-pane,
	.horizontal-split-view__secondary-sidebar-pane {
		--dismiss-button-display: none;
	}

	.horizontal-split-view__inspector-pane {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-height: 0;
		min-width: var(--_inspector-min-width);
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;

		/* Suppress dismiss button — inspector is always dismissable as a sheet, not inline */
		--dismiss-button-display: none;
	}


	/* # Inspector — sheet (dialog) */

	@keyframes horizontal-split-view-inspector-slide-in {
		from { transform: translateX(100%); }
		to { transform: translateX(0); }
	}

	@keyframes horizontal-split-view-inspector-slide-out {
		from { transform: translateX(0); }
		to { transform: translateX(100%); }
	}

	.horizontal-split-view__inspector-sheet {
		border: none;
		padding: 0;
		margin: 0;
		background: var(--semantics-surfaces-overlay-background-color);
		box-shadow: var(--components-sheet-box-shadow);
		overflow: hidden;
		position: fixed;
		inset: 16px 16px 16px auto;
		width: 360px;
		height: calc(100vh - 32px);
		border-radius: var(--semantics-overlays-corner-radius);

		&:focus-visible {
			box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color), var(--components-sheet-box-shadow);
			outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		}

		&:not([open]) {
			display: none;
		}

		&::backdrop {
			background: rgba(0, 0, 0, 0.2);
		}

		&[open] {
			animation: horizontal-split-view-inspector-slide-in 0.3s ease both;
		}

		&.is-closing {
			animation: horizontal-split-view-inspector-slide-out 0.3s ease both;
		}
	}

	.horizontal-split-view__inspector-sheet-body {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}


	/* # Sidebar — sheet (dialog) */

	@keyframes horizontal-split-view-sidebar-slide-in {
		from { transform: translateX(-100%); }
		to { transform: translateX(0); }
	}

	@keyframes horizontal-split-view-sidebar-slide-out {
		from { transform: translateX(0); }
		to { transform: translateX(-100%); }
	}

	.horizontal-split-view__sidebar-sheet {
		border: none;
		padding: 0;
		margin: 0;
		background: var(--semantics-surfaces-overlay-background-color);
		box-shadow: var(--components-sheet-box-shadow);
		overflow: hidden;
		position: fixed;
		inset: 16px auto 16px 16px;
		width: 360px;
		height: calc(100vh - 32px);
		border-radius: var(--semantics-overlays-corner-radius);

		&:focus-visible {
			box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color), var(--components-sheet-box-shadow);
			outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		}

		&:not([open]) {
			display: none;
		}

		&::backdrop {
			background: rgba(0, 0, 0, 0.2);
		}

		&[open] {
			animation: horizontal-split-view-sidebar-slide-in 0.3s ease both;
		}

		&.is-closing {
			animation: horizontal-split-view-sidebar-slide-out 0.3s ease both;
		}
	}

	.horizontal-split-view__sidebar-sheet-body {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;

		/* Show dismiss button inside sidebar sheet */
		--dismiss-button-display: block;
	}


	/* # Reduced motion */

	@media (prefers-reduced-motion: reduce) {
		.horizontal-split-view__inspector-sheet[open],
		.horizontal-split-view__inspector-sheet.is-closing,
		.horizontal-split-view__sidebar-sheet[open],
		.horizontal-split-view__sidebar-sheet.is-closing {
			animation: none;
		}
	}


	/* # Slotted */

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;
