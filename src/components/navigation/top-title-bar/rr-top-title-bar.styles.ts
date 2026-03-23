import { css } from 'lit';

export const styles = css`

	/* # Host */

	:host {
		display: block;
		width: 100%;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Top title bar */

	.top-title-bar {
		display: flex;
		flex-direction: column;
		width: 100%;
	}


	/* # Toolbar */

	.top-title-bar__toolbar {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		padding: var(--primitives-space-4) var(--primitives-space-4) 0;
	}

	.top-title-bar__toolbar-start {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: 0;
	}

	.top-title-bar__toolbar-end {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-grow: 0;
		flex-shrink: 0;
	}


	.top-title-bar__divider {
		width: 1px;
		height: var(--primitives-space-24);
		background-color: var(--primitives-color-neutral-200);
		flex-shrink: 0;
	}


	/* # Toolbar title group (compact mode) */

	.top-title-bar__toolbar-title-group {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;
		flex-shrink: 1;
		min-width: 0;
		min-height: var(--semantics-controls-md-min-size);
		overflow: hidden;
		padding: 0 var(--primitives-space-10);
	}

	.top-title-bar__toolbar-title {
		margin: 0;
		font: var(--primitives-font-body-lg-bold-flat);
		color: var(--semantics-content-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		opacity: 1;
		transition: opacity 0.2s ease;
	}

	.top-title-bar__toolbar-title.is-hidden {
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.top-title-bar__toolbar-title {
			transition: none;
		}
	}

	.top-title-bar__toolbar-subtitle {
		margin: 0;
		font: var(--primitives-font-body-xs-regular-flat);
		color: var(--semantics-content-secondary-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}


	/* # Accessibility: High Contrast Mode */

	@media (forced-colors: active) {
		.top-title-bar__toolbar-title {
			color: CanvasText;
		}
	}
`;
