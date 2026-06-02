import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const tableStyles = css`
	:host {
		--_columns: none;
		--_corner-radius: var(--semantics-tables-corner-radius);
		--_column-gap: var(--semantics-tables-column-gap);
		--_background-color: var(--semantics-surfaces-background-color);
		--_border-color: var(--semantics-surfaces-border-color);
		/* Shared so the focus-visible rule can compose the focus ring over the
		   border ring with var(...) instead of repeating the inset literal. */
		--_border-shadow: inset 0 0 0 var(--semantics-tables-border-width) var(--_border-color);

		${inheritedTextReset}
		box-sizing: border-box;
		display: grid;
		grid-template-columns: var(--_columns);
		width: 100%;
		/* The table is always a boxed surface and its own horizontal scroll
		   container: the columns scroll when they don't fit and the table is made
		   focusable in JS while it scrolls. overflow-y stays hidden so the rounded
		   corners keep clipping the rows (and their full-bleed dividers). */
		border-radius: var(--_corner-radius);
		box-shadow: var(--_border-shadow);
		background-color: var(--_background-color);
		overflow-x: auto;
		overflow-y: hidden;
		column-gap: var(--_column-gap);
		row-gap: 0;
	}

	:host([hidden]) {
		display: none;
	}

	/* Default surface is base; tinted is opt-in. */
	:host([background="tinted"]) {
		--_background-color: var(--semantics-surfaces-tinted-background-color);
		--_border-color: var(--semantics-surfaces-tinted-border-color);
	}

	/* Keyboard focus while the table scrolls (it gains tabindex in JS): the
	   project focus ring, layered over the border ring (mirrors nldd-code-viewer).
	   Focus first (outer), border second (inner). */
	:host(:focus-visible) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--_border-shadow);
	}

	:host(:focus:not(:focus-visible)) {
		outline: none;
	}

	slot {
		display: contents;
	}

	/* Empty state spans all columns below the rows; its own padding gives the
	   message room. The header is hidden in the empty state (only the message). */
	.table__empty {
		grid-column: 1 / -1;
	}

	.table__empty[hidden] {
		display: none;
	}

	.table__empty-cell {
		padding: var(--primitives-space-16);
	}

	:host(.is-empty) slot[name="header"] {
		display: none;
	}
`;

export const tableRowStyles = css`
	:host {
		--_min-height: var(--semantics-tables-row-min-height);
		--_padding-block: var(--semantics-tables-row-padding-block);
		--_padding-inline: var(--semantics-tables-row-padding-inline);
		--_divider-color: var(--semantics-tables-border-color);
		--_divider-thickness: var(--semantics-tables-border-width);

		${inheritedTextReset}
		box-sizing: border-box;
		display: grid;
		grid-column: 1 / -1;
		grid-template-columns: subgrid;
		min-height: var(--_min-height);
		border-bottom: var(--_divider-thickness) solid var(--_divider-color);
		padding-block: var(--_padding-block);
		padding-inline: var(--_padding-inline);
		align-items: center;
	}

	:host([hidden]) {
		display: none;
	}

	/* Selection: a full-bleed row tint (reaches the box edges, corners clipped by
	   the table) plus the selected content color, from the shared table tokens. */
	:host([selected]) {
		background-color: var(--semantics-tables-row-is-selected-background-color);
		--context-cell-content-color: var(--semantics-tables-row-is-selected-content-color);
	}

	/* The box's border ring is the table's outer frame, so the last row drops its
	   divider (no doubling on the ring). Inner dividers run full-bleed to the
	   sides — the padding only insets the cell content, not the row's border. */
	:host(:last-child) {
		border-bottom: none;
	}

	/* display:contents so the cells become grid items of this subgrid. */
	slot {
		display: contents;
	}
`;
