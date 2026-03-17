import { css } from 'lit';

export const segmentedControlStyles = css`
	/* # Host */

	:host {
		display: inline-grid;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
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

	::slotted(rr-segmented-control-item:focus-within) {
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


	/* # Indicator */

	.segmented-control__item-indicator {
		position: absolute;
		inset: 0;
		background-color: var(--semantics-buttons-accent-filled-background-color);
		opacity: 0;
		pointer-events: none;
	}

	:host([size='md']) .segmented-control__item-indicator,
	:host(:not([size])) .segmented-control__item-indicator {
		inset-block: var(--primitives-space-4);
		inset-inline: var(--primitives-space-2);
		border-radius: calc(var(--semantics-controls-md-corner-radius) - var(--primitives-space-2));
	}

	:host([size='sm']) .segmented-control__item-indicator {
		inset-block: 3px;
		inset-inline: 1px;
		border-radius: calc(var(--semantics-controls-sm-corner-radius) - 1px);
	}

	:host([content-type='icon'][size='md']) .segmented-control__item-indicator,
	:host([content-type='icon']:not([size])) .segmented-control__item-indicator {
		inset-block: var(--primitives-space-4);
		inset-inline: var(--primitives-space-4);
		border-radius: calc(var(--semantics-controls-md-corner-radius) - var(--primitives-space-2));
	}

	:host([content-type='icon'][size='sm']) .segmented-control__item-indicator {
		inset-block: 3px;
		inset-inline: 3px;
		border-radius: calc(var(--semantics-controls-sm-corner-radius) - 1px);
	}

	:host([selected]) .segmented-control__item-indicator {
		opacity: 1;
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
		pointer-events: none;
	}

	:host([size='md']) .segmented-control__item-label,
	:host(:not([size])) .segmented-control__item-label {
		min-height: var(--semantics-controls-md-min-size);
		padding-block: calc(var(--primitives-space-4) + var(--primitives-space-4));
		padding-inline: calc(var(--primitives-space-2) + var(--primitives-space-8));
		font: var(--semantics-buttons-md-font);
	}

	:host([size='sm']) .segmented-control__item-label {
		min-height: var(--semantics-controls-sm-min-size);
		padding-block: calc(3px + 3px);
		padding-inline: calc(1px + var(--primitives-space-6));
		font: var(--semantics-buttons-sm-font);
	}

	:host([selected]) .segmented-control__item-label {
		color: var(--semantics-buttons-accent-filled-content-color);
	}

	:host([disabled]) .segmented-control__item-label {
		opacity: var(--primitives-opacity-disabled);
	}


	/* # Text */

	.segmented-control__item-text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}


	/* # Icon slot */

	.segmented-control__item-icon {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	:host([size='md']) .segmented-control__item-icon,
	:host(:not([size])) .segmented-control__item-icon {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
	}

	:host([size='sm']) .segmented-control__item-icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
	}

	::slotted(rr-icon) {
		display: block;
		width: 100%;
		height: 100%;
	}


	/* # Slot visibility */

	:host([content-type='text']) .segmented-control__item-icon {
		display: none;
	}

	:host([content-type='icon']) .segmented-control__item-text {
		display: none;
	}


	/* # Focus */

	.segmented-control__item-input:focus-visible ~ .segmented-control__item-indicator {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		opacity: 1;
		z-index: 1;
	}
`;
