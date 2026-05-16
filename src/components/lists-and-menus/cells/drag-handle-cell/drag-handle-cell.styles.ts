import { css } from 'lit';

export const dragHandleCellStyles = css`


	/* # Host */

	:host {
		display: inline-flex;
		cursor: grab;
		width: fit-content;
		align-items: center;
		justify-content: center;
	}

	:host([hidden]) {
		display: none;
	}

	:host(:active) {
		cursor: grabbing;
	}


	/* # Control */

	.drag-handle-cell__control {
		display: flex;
		margin: 0;
		border: none;
		background-color: var(--semantics-grab-handles-background-color);
		cursor: inherit;
		padding: 0;
		align-items: center;
		justify-content: center;
		-webkit-appearance: none;
		appearance: none;
	}

	.drag-handle-cell__control:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* ## Size: MD (default) */

	:host([size="md"]) .drag-handle-cell__control,
	:host(:not([size])) .drag-handle-cell__control {
		border-radius: var(--semantics-controls-md-corner-radius);
		width: var(--semantics-controls-sm-min-size);
		height: var(--semantics-controls-md-min-size);
	}


	/* ## Size: SM */

	:host([size="sm"]) .drag-handle-cell__control {
		border-radius: var(--semantics-controls-sm-corner-radius);
		width: var(--semantics-controls-xs-min-size);
		height: var(--semantics-controls-sm-min-size);
	}


	/* # Grip */

	.drag-handle-cell__control-grip {
		display: block;
		color: var(--semantics-grab-handles-grip-color);
	}
`;
