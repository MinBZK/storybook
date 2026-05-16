import { css } from 'lit';

export const segmentedControlStyles = css`


	/* # Host */

	:host {
		--_width: auto;
		--_gap: var(--primitives-space-2);

		display: inline-grid;
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

	:host([size='md']),
	:host(:not([size])) {
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	:host([size='sm']) {
		border-radius: var(--semantics-controls-sm-corner-radius);
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
		position: relative;
		min-width: 0;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Item */

	.segmented-control__item {
		box-sizing: border-box;
		display: flex;
		position: relative;
		cursor: default;
		width: 100%;
		align-items: center;
		justify-content: center;
		color: var(--semantics-buttons-neutral-tinted-content-color);
	}

	:host([size='md']) .segmented-control__item,
	:host(:not([size])) .segmented-control__item {
		border-radius: var(--semantics-controls-md-corner-radius);
		min-width: var(--semantics-controls-md-min-size);
		height: var(--semantics-controls-md-min-size);
		padding-inline: var(--primitives-space-12);
		font: var(--semantics-buttons-md-font);
	}

	:host([size='sm']) .segmented-control__item {
		border-radius: var(--semantics-controls-sm-corner-radius);
		min-width: var(--semantics-controls-sm-min-size);
		height: var(--semantics-controls-sm-min-size);
		padding-inline: var(--primitives-space-8);
		font: var(--semantics-buttons-sm-font);
	}

	:host([variant='icon'][size='md']) .segmented-control__item,
	:host([variant='icon']:not([size])) .segmented-control__item {
		padding: 0;
	}

	:host([variant='icon'][size='sm']) .segmented-control__item {
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

	:host([disabled]) .segmented-control__item {
		opacity: var(--primitives-opacity-disabled);
	}

	.segmented-control__item:has(:focus-visible) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Input */

	.segmented-control__item-input {
		position: absolute;
		inset: 0;
		opacity: 0;
		z-index: 1;
		margin: 0;
		width: 100%;
		height: 100%;
	}


	/* # Text */

	.segmented-control__item-text {
		pointer-events: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([variant='icon']) .segmented-control__item-text {
		display: none;
	}


	/* # Icon */

	.segmented-control__item-icon {
		display: flex;
		pointer-events: none;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
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
`;
