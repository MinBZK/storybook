import { css } from 'lit';

export const styles = css`
	/* # Host */

	:host {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		cursor: grab;
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
		align-items: center;
		justify-content: center;
		background-color: var(--semantics-grab-handles-background-color);
		border: none;
		padding: 0;
		margin: 0;
		cursor: inherit;
		-webkit-appearance: none;
		appearance: none;
	}

	.drag-handle-cell__control:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* ## Size: MD (default) */

	:host([size="md"]) .drag-handle-cell__control,
	:host(:not([size])) .drag-handle-cell__control {
		width: var(--semantics-controls-sm-min-size);
		height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}


	/* ## Size: SM */

	:host([size="sm"]) .drag-handle-cell__control {
		width: var(--semantics-controls-xs-min-size);
		height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}


	/* # Grip */

	.drag-handle-cell__control-grip {
		display: block;
		color: var(--semantics-grab-handles-grip-color);
	}
`;
