import { css } from 'lit';
import { boxSizingReset, inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const segmentedControlStyles = css`
	${boxSizingReset}


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_width: auto;
		--_gap: var(--primitives-space-1);
		--_z-index-selected: 1;
		--_z-index-focus: 2;

		${inheritedTextReset}
		display: inline-grid;
		position: relative;
		border-radius: var(--_corner-radius);
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		width: var(--_width);
		max-width: 100%;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
		gap: var(--_gap);
		isolation: isolate;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	:host::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--semantics-buttons-neutral-tinted-highlight-border-color);
		pointer-events: none;
	}

	:host([hidden]) {
		display: none;
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size="lg"]) {
		--_corner-radius: var(--semantics-controls-lg-corner-radius);
	}

	:host([width="full"]) {
		--_width: 100%;

		display: grid;
	}

	:host([width="fit-content"]) {
		grid-auto-columns: auto;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Elements */

	::slotted(nldd-segmented-control-item[selected]) {
		position: relative;
		z-index: var(--_z-index-selected);
	}

	::slotted(nldd-segmented-control-item:focus-within) {
		position: relative;
		z-index: var(--_z-index-focus);
	}
`;

export const segmentedControlItemStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_min-size: var(--semantics-controls-md-min-size);
		--_padding-inline: var(--primitives-space-12);
		--_gap: var(--semantics-buttons-md-gap);
		--_font: var(--semantics-buttons-md-primary-text-font);
		--_icon-size: var(--semantics-buttons-md-icon-size);
		--_icon-only-icon-size: var(--semantics-buttons-md-icon-only-icon-size);
		--_highlight-border-color: transparent;

		${inheritedTextReset}
		display: flex;
		position: relative;
		min-width: 0;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_min-size: var(--semantics-controls-sm-min-size);
		--_padding-inline: var(--primitives-space-8);
		--_gap: var(--semantics-buttons-sm-gap);
		--_font: var(--semantics-buttons-sm-primary-text-font);
		--_icon-size: var(--semantics-buttons-sm-icon-size);
		--_icon-only-icon-size: var(--semantics-buttons-sm-icon-only-icon-size);
	}

	:host([size="lg"]) {
		--_corner-radius: var(--semantics-controls-lg-corner-radius);
		--_min-size: var(--semantics-controls-lg-min-size);
		--_padding-inline: var(--primitives-space-16);
		--_gap: var(--semantics-buttons-lg-gap);
		--_font: var(--semantics-buttons-lg-primary-text-font);
		--_icon-size: var(--semantics-buttons-lg-icon-size);
		--_icon-only-icon-size: var(--primitives-space-28);
	}

	:host([size="lg"][variant="icon-and-text"]) .segmented-control__item {
		flex-direction: column;
		gap: var(--primitives-space-2);
		padding-inline: var(--primitives-space-8);
		padding-block: var(--primitives-space-8);
	}

	:host([size="lg"][variant="icon-and-text"]) .segmented-control__item-text {
		font: var(--primitives-font-body-xxs-medium-flat);
	}


	/* # Block */

	.segmented-control__item {
		box-sizing: border-box;
		display: flex;
		position: relative;
		cursor: default;
		border-radius: var(--_corner-radius);
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--_highlight-border-color);
		width: 100%;
		min-width: var(--_min-size);
		height: var(--_min-size);
		padding-inline: var(--_padding-inline);
		gap: var(--_gap);
		align-items: center;
		justify-content: center;
		color: var(--semantics-buttons-neutral-tinted-primary-content-color);
		font: var(--_font);
	}

	:host([variant="icon"]) .segmented-control__item {
		padding: 0;
	}

	:host([selected]) .segmented-control__item {
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-selected-highlight-border-color);
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-primary-content-color);
	}

	@media (hover: hover) {
		:host(:not([selected])) .segmented-control__item:hover {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		}

		:host([selected]) .segmented-control__item:hover {
			--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-selected-is-hovered-highlight-border-color);
		}
	}

	:host(:not([selected])) .segmented-control__item:active {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-primary-content-color);
	}

	:host([selected]) .segmented-control__item:active {
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-selected-is-active-highlight-border-color);
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-is-active-primary-content-color);
	}

	:host([disabled]) .segmented-control__item {
		opacity: var(--primitives-opacity-disabled);
	}

	.segmented-control__item:has(:focus-visible) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow), inset 0 0 0 var(--primitives-border-width-thin) var(--_highlight-border-color);
	}


	/* # Elements */

	.segmented-control__item-input {
		position: absolute;
		inset: 0;
		opacity: 0;
		z-index: 1;
		margin: 0;
		width: 100%;
		height: 100%;
	}

	.segmented-control__item-text {
		pointer-events: none;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	:host([variant="icon"]) .segmented-control__item-text {
		display: none;
	}

	.segmented-control__item-icon {
		display: flex;
		pointer-events: none;
		width: var(--_icon-size);
		height: var(--_icon-size);
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	:host([variant="icon"]) .segmented-control__item-icon {
		width: var(--_icon-only-icon-size);
		height: var(--_icon-only-icon-size);
	}

	:host([variant="text"]) .segmented-control__item-icon {
		display: none;
	}

	::slotted(nldd-icon) {
		display: block;
		width: 100%;
		height: 100%;
	}
`;
