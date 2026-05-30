import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const toolbarStyles = css`


	/* # Host */

	:host {
		--_gap: var(--components-toolbar-md-gap);
		/* --_width..--_overflow-button-width: measured + set by toolbar.ts; 0px is a valid pre-measurement placeholder */
		--_width: 0px;
		--_start-width: 0px;
		--_center-width: 0px;
		--_end-width: 0px;
		--_overflow-button-width: 0px;
		--_item-min-width: 0px;
		--_item-width: auto;
		--_title-group-min-width: 200px;
		--_title-group-height: var(--semantics-controls-md-min-size);
		--_title-font: var(--primitives-font-body-lg-bold-flat);
		--_subtitle-font: var(--primitives-font-body-xs-regular-flat);

		${inheritedTextReset}
		box-sizing: border-box;
		display: block;
	}

	:host([size="sm"]) {
		--_gap: var(--components-toolbar-sm-gap);
		--_title-group-height: var(--semantics-controls-sm-min-size);
		--_title-font: var(--primitives-font-body-sm-bold-flat);
		--_subtitle-font: var(--primitives-font-body-xxs-regular-flat);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.toolbar {
		display: flex;
		width: 100%;
		flex-direction: row;
		gap: var(--_gap);
		align-items: center;
	}


	/* # Items */

	.toolbar__items {
		display: flex;
		min-width: 0;
		flex-direction: row;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		gap: var(--_gap);
		align-items: flex-start;
	}


	/* # Spacers */

	.toolbar__flexible-spacer {
		margin-left: calc(-1 * var(--_gap));
		flex-grow: 1;
		flex-shrink: 1;
	}

	.toolbar__center-fill {
		display: flex;
		min-width: 0;
		flex-direction: row;
		flex-grow: 1;
		flex-shrink: 1;
		align-items: flex-start;
		justify-content: center;
	}

	.toolbar__left-spacer {
		margin-right: calc(-1 * var(--_gap));
		min-width: 0;
		flex-grow: 0;
		flex-shrink: 1;
		flex-basis: calc(
			var(--_width) / 2
			- var(--_start-width)
			- var(--_center-width) / 2
			- var(--_gap)
		);
	}

	.toolbar__right-spacer {
		margin-left: calc(-1 * var(--_gap));
		min-width: 0;
		flex-grow: 0;
		flex-shrink: 1;
		flex-basis: calc(
			var(--_width) / 2
			- var(--_end-width)
			- var(--_center-width) / 2
			- var(--_gap)
			- var(--_overflow-button-width)
		);
	}


	/* # Item */

	.toolbar__item {
		display: inline-flex;
		flex-direction: column;
		flex-grow: 0;
		flex-shrink: 0;
		align-items: center;
	}

	.toolbar__item.is-fluid {
		min-width: var(--_item-min-width);
		flex-shrink: 1;
		flex-basis: var(--_item-width);
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
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-xs-regular-flat);
		white-space: nowrap;
	}

	:host([show-item-labels]) .toolbar__item-label {
		display: block;
	}


	/* # Overflow button */

	.toolbar__overflow-button {
		display: inline-flex;
		flex-direction: column;
		flex-grow: 0;
		flex-shrink: 0;
		align-items: center;
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
		height: var(--_title-group-height);
		overflow: hidden;
		flex-direction: column;
		flex-shrink: 1;
		justify-content: center;
	}

	.toolbar__title-group.is-solo-fluid {
		min-width: 0;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
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
		max-width: 100%;
		overflow: hidden;
		color: var(--semantics-content-color);
		font: var(--_title-font);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.toolbar__subtitle {
		margin: 0;
		max-width: 100%;
		overflow: hidden;
		color: var(--semantics-content-secondary-color);
		font: var(--_subtitle-font);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;
