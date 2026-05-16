import { css } from 'lit';

export const toolbarStyles = css`


	/* # Host */

	:host {
		--_item-width: auto;
		--_item-min-width: 0px;
		--_title-group-min-width: 200px;
		/* These are computed by JS (toolbar.ts measures and sets them).
		   Initial 0px keeps the CSS valid before measurement. */
		--_width: 0px;
		--_start-width: 0px;
		--_center-width: 0px;
		--_end-width: 0px;
		--_overflow-button-width: 0px;

		display: block;
		box-sizing: border-box;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.toolbar {
		display: flex;
		width: 100%;
		flex-direction: row;
		align-items: center;
	}

	:host([size="sm"]) .toolbar {
		gap: var(--components-toolbar-sm-gap);
	}

	:host([size="md"]) .toolbar,
	:host(:not([size])) .toolbar {
		gap: var(--components-toolbar-md-gap);
	}


	/* # Items */

	.toolbar__items {
		display: flex;
		min-width: 0;
		flex-direction: row;
		align-items: flex-start;
		flex: 1;
	}

	:host([size="sm"]) .toolbar__items {
		gap: var(--components-toolbar-sm-gap);
	}

	:host([size="md"]) .toolbar__items,
	:host(:not([size])) .toolbar__items {
		gap: var(--components-toolbar-md-gap);
	}


	/* # Spacers */

	.toolbar__flexible-spacer {
		margin-left: calc(-1 * var(--components-toolbar-md-gap));
		flex-grow: 1;
		flex-shrink: 1;
	}

	:host([size="sm"]) .toolbar__flexible-spacer {
		margin-left: calc(-1 * var(--components-toolbar-sm-gap));
	}

	.toolbar__center-fill {
		display: flex;
		min-width: 0;
		flex-direction: row;
		align-items: flex-start;
		flex-grow: 1;
		flex-shrink: 1;
		justify-content: center;
	}

	.toolbar__left-spacer {
		margin-right: calc(-1 * var(--components-toolbar-md-gap));
		min-width: 0;
		flex-shrink: 1;
		flex-grow: 0;
		flex-basis: calc(
			var(--_width) / 2
			- var(--_start-width)
			- var(--_center-width) / 2
			- var(--components-toolbar-md-gap)
		);
	}

	:host([size="sm"]) .toolbar__left-spacer {
		margin-right: calc(-1 * var(--components-toolbar-sm-gap));
		flex-basis: calc(
			var(--_width) / 2
			- var(--_start-width)
			- var(--_center-width) / 2
			- var(--components-toolbar-sm-gap)
		);
	}

	.toolbar__right-spacer {
		margin-left: calc(-1 * var(--components-toolbar-md-gap));
		min-width: 0;
		flex-shrink: 1;
		flex-grow: 0;
		flex-basis: calc(
			var(--_width) / 2
			- var(--_end-width)
			- var(--_center-width) / 2
			- var(--components-toolbar-md-gap)
			- var(--_overflow-button-width, 0px)
		);
	}

	:host([size="sm"]) .toolbar__right-spacer {
		margin-left: calc(-1 * var(--components-toolbar-sm-gap));
		flex-basis: calc(
			var(--_width) / 2
			- var(--_end-width)
			- var(--_center-width) / 2
			- var(--components-toolbar-sm-gap)
			- var(--_overflow-button-width, 0px)
		);
	}


	/* # Item */

	.toolbar__item {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		flex-grow: 0;
	}

	.toolbar__item.is-fluid {
		min-width: var(--_item-min-width);
		flex-basis: var(--_item-width);
		flex-shrink: 1;
	}

	.toolbar__item.is-solo-fluid {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}

	.toolbar__item.is-hidden {
		display: none;
	}

	.toolbar__item-content {
		display: inline-flex;
		width: 100%;
		align-items: center;
		justify-content: center;
	}

	.toolbar__item.is-fluid .toolbar__item-content ::slotted(*),
	.toolbar__item.is-solo-fluid .toolbar__item-content ::slotted(*) {
		width: 100%;
	}

	.toolbar__item-label {
		display: none;
		margin-top: var(--primitives-space-2);
		font: var(--primitives-font-body-xs-regular-flat);
		color: var(--semantics-content-color);
		white-space: nowrap;
	}

	:host([show-item-labels]) .toolbar__item-label {
		display: block;
	}


	/* # Overflow button */

	.toolbar__overflow-button {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		flex-grow: 0;
	}

	.toolbar__overflow-button.is-hidden {
		display: none;
	}

	.toolbar__overflow-button .toolbar__item-label {
		display: none;
	}

	:host([show-item-labels]) .toolbar__overflow-button .toolbar__item-label {
		display: block;
	}


	/* # Title group */

	.toolbar__title-group {
		display: inline-flex;
		min-width: var(--_title-group-min-width);
		overflow: hidden;
		flex-direction: column;
		justify-content: center;
		flex-shrink: 1;
	}

	.toolbar__title-group.is-solo-fluid {
		min-width: 0;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
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
		overflow: hidden;
		max-width: 100%;
		color: var(--semantics-content-color);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([size="md"]) .toolbar__title,
	:host(:not([size])) .toolbar__title {
		font: var(--primitives-font-body-lg-bold-flat);
	}

	:host([size="sm"]) .toolbar__title {
		font: var(--primitives-font-body-sm-bold-flat);
	}

	.toolbar__subtitle {
		margin: 0;
		overflow: hidden;
		max-width: 100%;
		color: var(--semantics-content-secondary-color);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([size="md"]) .toolbar__subtitle,
	:host(:not([size])) .toolbar__subtitle {
		font: var(--primitives-font-body-xs-regular-flat);
	}

	:host([size="sm"]) .toolbar__subtitle {
		font: var(--primitives-font-body-xxs-regular-flat);
	}
`;
