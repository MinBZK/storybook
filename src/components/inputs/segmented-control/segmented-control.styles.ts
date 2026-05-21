import { css } from 'lit';

export const segmentedControlStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_width: auto;
		--_gap: var(--primitives-space-2);

		display: inline-grid;
		border-radius: var(--_corner-radius);
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		width: var(--_width);
		max-width: 100%;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
		gap: var(--_gap);
		isolation: isolate;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
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

	::slotted(nldd-segmented-control-item:focus-within) {
		position: relative;
		z-index: 1;
	}
`;

export const segmentedControlItemStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_min-size: var(--semantics-controls-md-min-size);
		--_padding-inline: var(--primitives-space-12);
		--_font: var(--semantics-buttons-md-font);
		--_icon-size: var(--semantics-buttons-md-icon-only-icon-size);

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
		--_font: var(--semantics-buttons-sm-font);
		--_icon-size: var(--semantics-buttons-sm-icon-only-icon-size);
	}


	/* # Block */

	.segmented-control__item {
		box-sizing: border-box;
		display: flex;
		position: relative;
		cursor: default;
		border-radius: var(--_corner-radius);
		width: 100%;
		min-width: var(--_min-size);
		height: var(--_min-size);
		padding-inline: var(--_padding-inline);
		align-items: center;
		justify-content: center;
		color: var(--semantics-buttons-neutral-tinted-content-color);
		font: var(--_font);
	}

	:host([variant="icon"]) .segmented-control__item {
		padding: 0;
	}

	:host([selected]) .segmented-control__item {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	@media (hover: hover) {
		:host(:not([selected])) .segmented-control__item:hover {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		}
	}

	:host(:not([selected])) .segmented-control__item:active {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
	}

	:host([selected]) .segmented-control__item:active {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-is-active-content-color);
	}

	:host([disabled]) .segmented-control__item {
		opacity: var(--primitives-opacity-disabled);
	}

	.segmented-control__item:has(:focus-visible) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
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

	:host([variant="text"]) .segmented-control__item-icon {
		display: none;
	}

	::slotted(nldd-icon) {
		display: block;
		width: 100%;
		height: 100%;
	}
`;
