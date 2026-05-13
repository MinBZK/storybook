import { css } from 'lit';

export const topTitleBarStyles = css`


	/* # Host */

	:host {
		display: block;
		width: 100%;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.top-title-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		padding-inline: var(--primitives-space-6);
	}


	/* # Start */

	.top-title-bar__start {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: 0;
	}


	/* # End */

	.top-title-bar__end {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-grow: 0;
		flex-shrink: 0;
		margin-top: var(--primitives-space-6);
	}

	.top-title-bar__end[hidden] {
		display: none;
	}


	/* # Back button — text variant (default state) */

	.top-title-bar__back-button {
		display: var(--context-back-button-display, flex);
		flex-direction: row;
		align-items: center;
		min-width: 0;
		margin-top: var(--primitives-space-6);
	}

	.top-title-bar__text-back-button {
		display: flex;
		min-width: 0;
	}

	:host(.is-compact) .top-title-bar__text-back-button {
		display: none;
	}


	/* # Back button — icon variant (compact state) */

	.top-title-bar__icon-back-button {
		display: none;
	}

	:host(.is-compact) .top-title-bar__icon-back-button {
		display: flex;
	}


	/* # Divider */

	.top-title-bar__divider {
		display: none;
		width: var(--semantics-dividers-thickness);
		height: var(--primitives-space-24);
		background-color: var(--components-top-title-bar-divider-color);
		flex-shrink: 0;
	}

	:host(.is-compact) .top-title-bar__divider {
		display: block;
	}


	/* # Title group */

	.top-title-bar__title-group {
		display: none;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;
		flex-shrink: 1;
		min-width: 0;
		min-height: var(--semantics-controls-md-min-size);
		margin-top: var(--primitives-space-6);
		padding-inline: var(--primitives-space-10);
		overflow: hidden;
	}

	:host(.is-compact) .top-title-bar__title-group {
		display: flex;
	}

	.top-title-bar__title {
		margin: 0;
		font: var(--primitives-font-body-lg-bold-flat);
		color: var(--semantics-content-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.top-title-bar__title:has(+ .top-title-bar__subtitle) {
		font: var(--primitives-font-body-md-bold-flat);
	}

	.top-title-bar__subtitle {
		margin: 0;
		font: var(--primitives-font-body-xxs-regular-flat);
		color: var(--semantics-content-secondary-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}


	/* # Dismiss button */

	.top-title-bar__dismiss-button {
		display: var(--context-dismiss-button-display, block);
	}


	/* # Accessibility: High Contrast Mode */

	@media (forced-colors: active) {
		.top-title-bar__title {
			color: CanvasText;
		}
	}
`;
