import { css } from 'lit';

export const segmentedControlStyles = css`
	/* # Host */

	:host {
		display: inline-grid;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([full-width]) {
		display: grid;
		width: 100%;
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

	::slotted(ndd-segmented-control-item:focus-within) {
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
		--_segmented-control-md-inset-size: var(--primitives-space-4);
		--_segmented-control-md-gap-size: var(--primitives-space-4);
		--_segmented-control-md-item-icon-size: var(--primitives-space-24);
		--_segmented-control-sm-inset-size: var(--primitives-space-3);
		--_segmented-control-sm-gap-size: var(--primitives-space-2);
		--_segmented-control-sm-item-icon-size: var(--primitives-space-20);
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
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


	/* # Label */

	.segmented-control__item-label {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		box-sizing: border-box;
		color: var(--semantics-buttons-neutral-tinted-content-color);
		cursor: default;
	}

	:host([size='md']) .segmented-control__item-label,
	:host(:not([size])) .segmented-control__item-label {
		height: var(--semantics-controls-md-min-size);
		padding-inline: calc(var(--_segmented-control-md-inset-size) / 2 + var(--primitives-space-12));
		font: var(--semantics-buttons-md-font);
	}

	:host([size='sm']) .segmented-control__item-label {
		height: var(--semantics-controls-sm-min-size);
		padding-inline: calc(var(--_segmented-control-sm-inset-size) / 2 + var(--primitives-space-8));
		font: var(--semantics-buttons-sm-font);
	}

	:host([variant='icon'][size='md']) .segmented-control__item-label,
	:host([variant='icon']:not([size])) .segmented-control__item-label {
		padding-inline: calc((var(--semantics-controls-md-min-size) - var(--_segmented-control-md-item-icon-size) - var(--_segmented-control-md-inset-size) * 2 + var(--_segmented-control-md-gap-size)) / 2);
	}

	:host([variant='icon'][size='sm']) .segmented-control__item-label {
		padding-inline: calc((var(--semantics-controls-sm-min-size) - var(--_segmented-control-sm-item-icon-size) - var(--_segmented-control-sm-inset-size) * 2 + var(--_segmented-control-sm-gap-size)) / 2);
	}

	:host([selected]) .segmented-control__item-label {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	:host([disabled]) .segmented-control__item-label {
		opacity: var(--primitives-opacity-disabled);
	}


	/* # Text */

	.segmented-control__item-text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		z-index: 2;
		pointer-events: none;
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
		width: var(--_segmented-control-md-item-icon-size);
		height: var(--_segmented-control-md-item-icon-size);
	}

	:host([size='sm']) .segmented-control__item-icon {
		width: var(--_segmented-control-sm-item-icon-size);
		height: var(--_segmented-control-sm-item-icon-size);
	}

	::slotted(ndd-icon) {
		display: block;
		width: 100%;
		height: 100%;
	}


	/* # Slot visibility */

	:host([variant='text']) .segmented-control__item-icon {
		display: none;
	}

	:host([variant='icon']) .segmented-control__item-text {
		display: none;
	}


	/* # Indicator */

	.segmented-control__item-label::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-color: transparent;
	}

	:host([size='md']) .segmented-control__item-label::before,
	:host(:not([size])) .segmented-control__item-label::before {
		inset-block: var(--_segmented-control-md-inset-size);
		inset-inline: calc(var(--_segmented-control-md-gap-size) / 2);
		border-radius: calc(var(--semantics-controls-md-corner-radius) - (var(--_segmented-control-md-inset-size) / 2));
	}

	:host([size='sm']) .segmented-control__item-label::before {
		inset-block: var(--_segmented-control-sm-inset-size);
		inset-inline: calc(var(--_segmented-control-sm-gap-size) / 2);
		border-radius: calc(var(--semantics-controls-sm-corner-radius) - (var(--_segmented-control-sm-inset-size) / 2));
	}

	:host([selected]) .segmented-control__item-label::before {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
	}

	:host(:not([selected])) .segmented-control__item-label:hover::before {
		background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
	}


	/* # Focus */

	.segmented-control__item-label:has(:focus-visible)::before {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}
`;
