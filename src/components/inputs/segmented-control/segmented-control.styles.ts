import { css } from 'lit';

export const segmentedControlStyles = css`


	/* # Host */

	:host {
		--_width: auto;
		--_segmented-control-md-item-indicator-inset: var(--primitives-space-4);
		--_segmented-control-sm-item-indicator-inset: var(--primitives-space-3);

		display: inline-grid;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
		width: var(--_width);
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		isolation: isolate;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([width="full"]) {
		display: grid;
		--_width: 100%;
	}

	:host([width="fit-content"]) {
		grid-auto-columns: auto;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	:host([size='md']),
	:host(:not([size])) {
		border-radius: var(--semantics-controls-md-corner-radius);
		padding-inline: var(--primitives-space-2);
	}

	:host([size='sm']) {
		border-radius: var(--semantics-controls-sm-corner-radius);
		padding-inline: var(--primitives-space-2);
	}


	/* # Focus */

	::slotted(nldd-segmented-control-item:focus-within) {
		position: relative;
		z-index: 1;
	}
`;

export const segmentedControlItemStyles = css`


	/* # Host */

	:host {
		display: flex;
		min-width: 0;
		position: relative;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Item */

	.segmented-control__item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		box-sizing: border-box;
		color: var(--semantics-buttons-neutral-tinted-content-color);
		cursor: default;
	}

	:host([size='md']) .segmented-control__item,
	:host(:not([size])) .segmented-control__item {
		height: var(--semantics-controls-md-min-size);
		padding-inline: calc(var(--_segmented-control-md-item-indicator-inset) / 2 + var(--primitives-space-12));
		font: var(--semantics-buttons-md-font);
	}

	:host([size='sm']) .segmented-control__item {
		height: var(--semantics-controls-sm-min-size);
		padding-inline: calc(var(--_segmented-control-sm-item-indicator-inset) / 2 + var(--primitives-space-8));
		font: var(--semantics-buttons-sm-font);
	}

	:host([variant='icon'][size='md']) .segmented-control__item,
	:host([variant='icon']:not([size])) .segmented-control__item {
		min-width: calc(var(--semantics-controls-md-min-size) - var(--_segmented-control-md-item-indicator-inset));
		padding: 0;
	}

	:host([variant='icon'][size='sm']) .segmented-control__item {
		min-width: calc(var(--semantics-controls-sm-min-size) - var(--_segmented-control-sm-item-indicator-inset));
		padding: 0;
	}

	:host([selected]) .segmented-control__item {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	:host([disabled]) .segmented-control__item {
		opacity: var(--primitives-opacity-disabled);
	}


	/* # Input */

	.segmented-control__item-input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		opacity: 0;
		z-index: 1;
	}


	/* # Text */

	.segmented-control__item-text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		z-index: 2;
		pointer-events: none;
	}

	:host([variant='icon']) .segmented-control__item-text {
		display: none;
	}


	/* # Icon slot */

	.segmented-control__item-icon {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		z-index: 2;
		pointer-events: none;
	}

	:host([size='md']) .segmented-control__item-icon,
	:host(:not([size])) .segmented-control__item-icon {
		width: var(--semantics-buttons-md-icon-only-icon-size);
		height: var(--semantics-buttons-md-icon-only-icon-size);
	}

	:host([size='sm']) .segmented-control__item-icon {
		width: var(--semantics-buttons-sm-icon-only-icon-size);
		height: var(--semantics-buttons-sm-icon-only-icon-size);
	}

	:host([variant='text']) .segmented-control__item-icon {
		display: none;
	}

	::slotted(nldd-icon) {
		display: block;
		width: 100%;
		height: 100%;
	}


	/* # Indicator */

	.segmented-control__item::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-color: transparent;
	}

	:host([size='md']) .segmented-control__item::before,
	:host(:not([size])) .segmented-control__item::before {
		inset-block: var(--_segmented-control-md-item-indicator-inset);
		inset-inline: calc(var(--_segmented-control-md-item-indicator-inset) / 2);
		border-radius: calc(var(--semantics-controls-md-corner-radius) - (var(--_segmented-control-md-item-indicator-inset) / 2));
	}

	:host([size='sm']) .segmented-control__item::before {
		inset-block: var(--_segmented-control-sm-item-indicator-inset);
		inset-inline: calc(var(--_segmented-control-sm-item-indicator-inset) / 2);
		border-radius: calc(var(--semantics-controls-sm-corner-radius) - (var(--_segmented-control-sm-item-indicator-inset) / 2));
	}

	:host([selected]) .segmented-control__item::before {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
	}

	@media (hover: hover) {
		:host(:not([selected])) .segmented-control__item:hover::before {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		}
	}


	/* # Focus */

	.segmented-control__item:has(:focus-visible)::before {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}
`;
