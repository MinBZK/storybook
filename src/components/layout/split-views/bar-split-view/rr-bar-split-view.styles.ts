import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.ts';

const smMax = unsafeCSS(breakpoints.smMax);

/* # rr-bar-split-view styles */

export const barSplitViewStyles = css`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: var(--_background-color);

		--_background-color: var(--background-color, var(--semantics-surfaces-background-color));
	}

	:host([background="default"]) {
		--background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--background-color);
	}

	:host([background="tinted"]) {
		--background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--background-color);
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


	/* # Primary bar */

	.bar-split-view__primary-bar {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-width: 0;
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;

		@media (max-width: ${smMax}) {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 2;
		}
	}


	/* # Primary bar divider */

	.bar-split-view__primary-bar-divider {
		flex-shrink: 0;

		@media (max-width: ${smMax}) {
			display: none;
		}
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
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: 1;
				height: calc(var(--rr-bar-split-view-bars-height) + var(--primitives-space-32));
				background: linear-gradient(
					to top,
					color-mix(in srgb, var(--_background-color) 95%, transparent) var(--rr-bar-split-view-bars-height),
					transparent);
				pointer-events: none;
			}
		}
	}


	/* # Secondary bar divider */

	.bar-split-view__secondary-bar-divider {
		flex-shrink: 0;

		@media (max-width: ${smMax}) {
			display: none;
		}
	}


	/* # Secondary bar */

	.bar-split-view__secondary-bar {
		display: flex;
		flex-direction: row;
		flex-shrink: 0;
		min-width: 0;
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;

		@media (max-width: ${smMax}) {
			position: absolute;
			bottom: var(--rr-bar-split-view-primary-bar-height, 0px);
			left: 0;
			right: 0;
			z-index: 2;
		}
	}


	/* # Slotted */

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;
