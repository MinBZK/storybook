import { css } from 'lit';

export const dragHandleCellStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_width: var(--semantics-controls-sm-min-size);
		--_height: var(--semantics-controls-md-min-size);

		display: inline-flex;
		/* !important: shields the row padding from consumer universal resets, which beat normal :host declarations per CSS Scoping. */
		padding-block: var(--context-cell-padding-block, 0px) !important;
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

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_width: var(--semantics-controls-xs-min-size);
		--_height: var(--semantics-controls-sm-min-size);
	}


	/* # Block */

	.drag-handle-cell__control {
		display: flex;
		margin: 0;
		border: none;
		border-radius: var(--_corner-radius);
		background-color: var(--semantics-grab-handles-background-color);
		cursor: inherit;
		width: var(--_width);
		height: var(--_height);
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


	/* # Elements */

	.drag-handle-cell__control-grip {
		display: block;
		color: var(--semantics-grab-handles-grip-color);
	}
`;
