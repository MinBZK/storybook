import { css } from 'lit';
export const styles = css`

	/* # Host */

	:host {
		display: block;
		font-family: var(--rr-font-family-body);
	}
	:host([hidden]) {
		display: none;
	}

	/* # Toolbar */

	.toolbar {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		width: 100%;
	}

	/* # Areas */

	.toolbar__start-area,
	.toolbar__center-area,
	.toolbar__end-area {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		flex-shrink: 0;
		flex-grow: 0;
	}

	:host([size="sm"]) .toolbar__start-area,
	:host([size="sm"]) .toolbar__center-area,
	:host([size="sm"]) .toolbar__end-area {
		gap: var(--components-toolbar-sm-gap);
	}

	:host([size="md"]) .toolbar__start-area,
	:host([size="md"]) .toolbar__center-area,
	:host([size="md"]) .toolbar__end-area,
	:host(:not([size])) .toolbar__start-area,
	:host(:not([size])) .toolbar__center-area,
	:host(:not([size])) .toolbar__end-area {
		gap: var(--components-toolbar-md-gap);
	}

	.toolbar__start-area {
		justify-content: flex-start;
	}

	.toolbar__center-area {
		justify-content: center;
		min-width: 0;
		overflow: hidden;
	}

	.toolbar__end-area {
		justify-content: flex-end;
		margin-left: auto;
	}

	:host([has-center]) .toolbar__end-area {
		margin-left: 0;
	}

	/* # Spacers */

	.toolbar__left-spacer,
	.toolbar__right-spacer {
		flex-shrink: 0;
		flex-grow: 0;
	}

	/* # Divider */

	.toolbar__divider {
		display: flex;
		justify-content: center;
		align-self: stretch;
	}

	:host([size="sm"]) .toolbar__divider {
		padding: 3px 0;
	}

	:host([size="md"]) .toolbar__divider,
	:host(:not([size])) .toolbar__divider {
		padding: 5px 0;
	}

	.toolbar__divider-line {
		width: var(--semantics-dividers-thickness);
		background-color: var(--semantics-dividers-color);
	}

	:host([size="sm"]) .toolbar__divider-line {
		height: 26px;
	}

	:host([size="md"]) .toolbar__divider-line,
	:host(:not([size])) .toolbar__divider-line {
		height: 34px;
	}

	/* # Item */

	.toolbar__item {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: var(--primitives-space-2);
	}

	.toolbar__item.is-hidden {
		display: none;
	}

	.toolbar__item-content {
		display: inline-flex;
		align-items: center;
	}

	.toolbar__item-label {
		display: none;
		margin-top: var(--primitives-space-2);
		font: var(--primitives-font-body-xs-regular-flat);
		color: var(--semantics-content-primary-color);
		white-space: nowrap;
	}

	:host([show-labels]) .toolbar__item-label {
		display: block;
	}

	/* # Overflow button */

	.toolbar__more-button {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		flex-grow: 0;
		flex-basis: auto;
	}

	/* ## Overflow button sizer */

	.toolbar__more-button-sizer {
		position: absolute;
		visibility: hidden;
		pointer-events: none;
		display: inline-flex;
		align-items: center;
	}

	/* # Title group */

	.toolbar__title-group {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
		overflow: hidden;
	}

	:host([size="sm"]) .toolbar__title-group {
		height: var(--semantics-controls-sm-min-size);
	}

	:host([size="md"]) .toolbar__title-group,
	:host(:not([size])) .toolbar__title-group {
		height: var(--semantics-controls-md-min-size);
	}

	.toolbar__title-group--center-text-align {
		align-items: center;
		text-align: center;
	}

	.toolbar__title-group--left-text-align {
		align-items: flex-start;
		text-align: left;
	}

	.toolbar__title {
		margin: 0;
		color: var(--semantics-content-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}

	:host([size="md"]) .toolbar__title,
	:host(:not([size])) .toolbar__title {
		font: var(--primitives-font-body-lg-bold-flat);
		font-weight: 550;
	}

	:host([size="sm"]) .toolbar__title {
		font: var(--primitives-font-body-sm-bold-flat);
		font-weight: 550;
	}

	.toolbar__subtitle {
		margin: 0;
		color: var(--semantics-content-secondary-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}

	:host([size="md"]) .toolbar__subtitle,
	:host(:not([size])) .toolbar__subtitle {
		font: var(--primitives-font-body-xs-regular-flat);
	}

	:host([size="sm"]) .toolbar__subtitle {
		font-size: 12px;
		font-weight: 400;
		line-height: 1.125;
	}
`;
