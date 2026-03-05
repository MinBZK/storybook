import { css } from 'lit';
export const styles = css`

	/* # Host */

	:host {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-family: var(--rr-font-family-body);
		box-sizing: border-box;
		--_item-width: auto;
		--_item-min-width: 0px;
		--_title-group-min-width: 200px;
	}

	:host([hidden]) {
		display: none;
	}

	:host([size="sm"]) {
		gap: var(--components-toolbar-sm-gap);
	}

	:host([size="md"]),
	:host(:not([size])) {
		gap: var(--components-toolbar-md-gap);
	}

	/* # Items */

	.toolbar__items {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		flex: 1;
		min-width: 0;
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
		flex-grow: 1;
		flex-shrink: 1;
		margin-left: calc(-1 * var(--components-toolbar-md-gap));
	}

	:host([size="sm"]) .toolbar__flexible-spacer {
		margin-left: calc(-1 * var(--components-toolbar-sm-gap));
	}

	.toolbar__left-spacer {
		flex-shrink: 1;
		flex-grow: 0;
		min-width: 0;
		margin-right: calc(-1 * var(--components-toolbar-md-gap));
		flex-basis: calc(
			var(--rr-toolbar-width) / 2
			- var(--rr-toolbar-start-width)
			- var(--rr-toolbar-center-width) / 2
			- var(--components-toolbar-md-gap)
		);
	}

	:host([size="sm"]) .toolbar__left-spacer {
		margin-right: calc(-1 * var(--components-toolbar-sm-gap));
		flex-basis: calc(
			var(--rr-toolbar-width) / 2
			- var(--rr-toolbar-start-width)
			- var(--rr-toolbar-center-width) / 2
			- var(--components-toolbar-sm-gap)
		);
	}

	.toolbar__right-spacer {
		flex-shrink: 1;
		flex-grow: 0;
		min-width: 0;
		margin-left: calc(-1 * var(--components-toolbar-md-gap));
		flex-basis: calc(
			var(--rr-toolbar-width) / 2
			- var(--rr-toolbar-end-width)
			- var(--rr-toolbar-center-width) / 2
			- var(--components-toolbar-md-gap)
			- var(--rr-toolbar-overflow-button-width, 0px)
		);
	}

	:host([size="sm"]) .toolbar__right-spacer {
		margin-left: calc(-1 * var(--components-toolbar-sm-gap));
		flex-basis: calc(
			var(--rr-toolbar-width) / 2
			- var(--rr-toolbar-end-width)
			- var(--rr-toolbar-center-width) / 2
			- var(--components-toolbar-sm-gap)
			- var(--rr-toolbar-overflow-button-width, 0px)
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
		flex-basis: var(--_item-width);
		min-width: var(--_item-min-width);
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
		align-items: center;
		width: 100%;
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

	:host([show-labels]) .toolbar__item-label {
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

	:host([show-labels]) .toolbar__overflow-button .toolbar__item-label {
		display: block;
	}

	/* # Title group */

	.toolbar__title-group {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		min-width: var(--_title-group-min-width);
		overflow: hidden;
		flex-shrink: 1;
	}

	.toolbar__title-group.is-solo-fluid {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: 0;
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
	}

	:host([size="sm"]) .toolbar__title {
		font: var(--primitives-font-body-sm-bold-flat);
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
		font: var(--primitives-font-body-xxs-regular-flat);
	}
`;
