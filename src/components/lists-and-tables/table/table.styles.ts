import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const tableStyles = css`
	:host {
		--_columns: none;
		--_corner-radius: var(--components-table-corner-radius);
		--_column-gap: var(--components-table-column-gap);
		--_padding-inline: var(--components-table-row-padding-inline);
		--_background-color: var(--semantics-surfaces-tinted-background-color);
		--_border-color: var(--semantics-surfaces-tinted-border-color);

		${inheritedTextReset}
		box-sizing: border-box;
		display: grid;
		grid-template-columns: var(--_columns);
		width: 100%;
		/* Both variants are their own horizontal scroll container: the columns
		   scroll when they don't fit, and the table is made focusable in JS
		   while it scrolls so keyboard users can pan it. overflow-y stays hidden
		   (the box variant relies on it to clip its rounded corners). */
		overflow-x: auto;
		overflow-y: hidden;
		column-gap: var(--_column-gap);
		row-gap: 0;
	}

	:host([hidden]) {
		display: none;
	}

	:host([variant="box"][background="base"]) {
		--_background-color: var(--semantics-surfaces-background-color);
		--_border-color: var(--semantics-surfaces-border-color);
	}

	/* Box adds a rounded surface + inset border ring. padding-inline insets the
	   rows from the ring while their subgrid stays aligned (padding on the rows
	   would break it). */
	:host([variant="box"]) {
		border-radius: var(--_corner-radius);
		box-shadow: inset 0 0 0 var(--semantics-dividers-thickness) var(--_border-color);
		background-color: var(--_background-color);
		padding-inline: var(--_padding-inline);
	}

	/* Context messages to the rows: the border ring closes the table off, so the
	   outer row edges drop their dividers; the selected highlight squares its
	   corners and gains the inline padding as bleed so it reaches the box edge. */
	:host([variant="box"]) {
		--context-table-edge-divider-width: 0;
		--context-table-selected-radius: 0;
		--context-table-selected-extra-bleed: var(--components-table-row-padding-inline);
	}

	slot {
		display: contents;
	}

	/* Empty state spans all columns below the rows; the cell padding gives the
	   message room (in box the host padding-inline insets it further). The
	   header is hidden in the empty state so only the message shows. */
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
		--_padding-block: var(--components-table-row-padding-block);
		--_divider-color: var(--semantics-dividers-color);
		--_divider-thickness: var(--semantics-dividers-thickness);

		${inheritedTextReset}
		box-sizing: border-box;
		display: grid;
		position: relative;
		isolation: isolate;
		grid-column: 1 / -1;
		grid-template-columns: subgrid;
		border-bottom: var(--_divider-thickness) solid var(--_divider-color);
		padding-block: var(--_padding-block);
		align-items: center;
	}

	:host([hidden]) {
		display: none;
	}

	/* Selection mirrors nldd-list-item: tint the content, draw the highlight
	   behind the cells (slot::after below). */
	:host([selected]) {
		--context-cell-content-color: var(--components-list-item-is-selected-content-color);
	}

	/* First/last rows close the table's outer edges in the simple variant; box
	   zeroes the width via the edge context var (its border ring is the edge). */
	:host(:first-child) {
		border-top: var(--context-table-edge-divider-width, var(--_divider-thickness)) solid var(--_divider-color);
	}

	:host(:last-child) {
		border-bottom-width: var(--context-table-edge-divider-width, var(--_divider-thickness));
	}

	/* The header is the first child but its bottom divider already separates it
	   from the body, so it carries no top edge (overrides :host(:first-child)). */
	:host([slot="header"]) {
		border-top: none;
	}

	/* display:contents so the cells become grid items of this subgrid. */
	slot {
		display: contents;
	}

	/* The selected highlight sits behind the cells. The table is a horizontal
	   scroll container, so the highlight must not bleed past the content edge
	   (that would add scroll width — a stray scrollbar). In box it reaches the
	   inline padding edge (--context-table-selected-extra-bleed = the padding)
	   and squares its corners; in simple it stays flush (no bleed — the list's
	   past-the-edge stick-out is clipped here). A display:contents element
	   renders its ::after as a child of :host, so no extra DOM node is needed —
	   and the subgrid must stay on :host. */
	slot::after {
		content: '';
		position: absolute;
		inset-block: 0;
		inset-inline: calc(-1 * var(--context-table-selected-extra-bleed, 0px));
		z-index: -1;
		border-radius: var(--context-table-selected-radius, var(--components-list-item-indicator-corner-radius));
	}

	:host([selected]) slot::after {
		background-color: var(--components-list-item-is-selected-background-color);
	}
`;
