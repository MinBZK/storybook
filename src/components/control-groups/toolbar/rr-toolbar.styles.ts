import { css } from 'lit';

export const styles = css`
	/* # host */

	:host {
		display: block;
		font-family: var(--rr-font-family-body);
	}

	:host([hidden]) {
		display: none;
	}

	/* # toolbar */

	.toolbar {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		width: 100%;
	}

	:host([size="sm"]) .toolbar {
		gap: var(--primitives-space-6);
		min-height: var(--semantics-controls-sm-min-size);
	}

	:host([size="md"]) .toolbar,
	:host(:not([size])) .toolbar {
		gap: var(--primitives-space-8);
		min-height: var(--semantics-controls-md-min-size);
	}

	/* # areas */

	.toolbar__area {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1 1 0%;
	}

	:host([size="sm"]) .toolbar__area {
		gap: var(--primitives-space-6);
	}

	:host([size="md"]) .toolbar__area,
	:host(:not([size])) .toolbar__area {
		gap: var(--primitives-space-8);
	}

	.toolbar__area--start {
		justify-content: flex-start;
	}

	.toolbar__area--center {
		justify-content: center;
	}

	.toolbar__area--end {
		justify-content: flex-end;
	}

	/* # divider */

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
		width: 1px;
		background-color: var(--semantics-dividers-color);
	}

	:host([size="sm"]) .toolbar__divider-line {
		height: 26px;
	}

	:host([size="md"]) .toolbar__divider-line,
	:host(:not([size])) .toolbar__divider-line {
		height: 34px;
	}

	/* # item */

	.toolbar__item {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: var(--primitives-space-2);
	}

	.toolbar__item-content {
		display: inline-flex;
		align-items: center;
	}

	.toolbar__item-label {
		display: none;
		font: var(--primitives-font-body-xs-regular-flat);
		color: var(--semantics-content-secondary-color);
		white-space: nowrap;
	}

	:host([show-labels]) .toolbar__item-label {
		display: block;
	}

	/* # title-group */

	.toolbar__title-group {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
	}

	:host([size="sm"]) .toolbar__title-group {
		height: var(--semantics-controls-sm-min-size);
	}

	:host([size="md"]) .toolbar__title-group,
	:host(:not([size])) .toolbar__title-group {
		height: var(--semantics-controls-md-min-size);
	}

	.toolbar__title-group--center {
		align-items: center;
		text-align: center;
	}

	.toolbar__title-group--left {
		align-items: flex-start;
		text-align: left;
	}

	.toolbar__title {
		margin: 0;
		color: var(--semantics-content-color);
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
