import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.ts';

const smMax = unsafeCSS(breakpoints.smMax);

/* # ndd-bar-split-view styles */

export const barSplitViewStyles = css`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: var(--_background-color);

		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-background-color));
		--context-bar-split-view-top-bars-height: 0px;
		--context-bar-split-view-bottom-bars-height: 0px;
	}

	:host([background="default"]) {
		--context-parent-background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([background="tinted"]) {
		--context-parent-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Bar split view */

	.bar-split-view {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		position: relative;
	}


	/* # Bar */

	.bar-split-view__bar {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-width: 0;
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;

		@media (max-width: ${smMax}) {
			position: absolute;
			left: 0;
			right: 0;
			z-index: 2;
		}
	}


	/* # Divider */

	.bar-split-view__divider {
		flex-shrink: 0;
	}


	/* # Main */

	.bar-split-view__main {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;

		@media (max-width: ${smMax}) {
			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				z-index: 1;
				height: calc(var(--context-bar-split-view-top-bars-height) + var(--primitives-space-32));
				background: linear-gradient(
					to bottom,
					color-mix(in srgb, var(--_background-color) 95%, transparent) var(--context-bar-split-view-top-bars-height),
					transparent);
				pointer-events: none;
			}

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: 1;
				height: calc(var(--context-bar-split-view-bottom-bars-height) + var(--primitives-space-32));
				background: linear-gradient(
					to top,
					color-mix(in srgb, var(--_background-color) 95%, transparent) var(--context-bar-split-view-bottom-bars-height),
					transparent);
				pointer-events: none;
			}
		}
	}


	/* # Slotted */

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;
