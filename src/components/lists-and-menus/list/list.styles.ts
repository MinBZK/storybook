import { css } from 'lit';

export const listStyles = css`


	/* # Host */

	:host {
		--_drag-clone-top: 0px;
		--_drag-clone-left: 0px;
		--_drag-clone-width: 0px;
		--_drag-clone-height: 0px;
		--_drag-clone-opacity: 0.95;
		--_drag-clone-z-index: 100;

		display: block;
		position: relative;
		isolation: isolate;
	}


	/* # Body */

	.list__body {
		display: flex;
		flex-direction: column;
		gap: var(--primitives-space-8);
	}


	/* # Header & footer */

	.list__header,
	.list__footer {
		display: contents;
	}


	/* # Items */

	.list__items {
		display: flex;
		flex-direction: column;
	}


	/* # Empty slot */

	.list__empty {
		padding: var(--primitives-space-16);
	}

	.list__empty[hidden] {
		display: none;
	}


	/* # No dividers */

	:host([no-dividers]) {
		--context-list-divider-display: none;
	}


	/* # Variant: box */

	:host([variant='box']) .list__items {
		border-radius: var(--components-list-corner-radius);
		background-color: var(--semantics-surfaces-tinted-background-color);
		overflow: hidden;
	}


	/* # Variant: box-on-tinted */

	:host([variant='box-on-tinted']) .list__items {
		border-radius: var(--components-list-corner-radius);
		background-color: var(--semantics-surfaces-background-color);
		overflow: hidden;
	}


	/* # Drag placeholder */

	::slotted(.nldd-list-drag-placeholder) {
		box-sizing: border-box;
		border-radius: var(--components-list-item-indicator-corner-radius);
		background-color: var(--components-list-drag-placeholder-background-color);
		pointer-events: none;
	}


	/* # Drag clone */

	.list__drag-clone {
		position: absolute;
		top: var(--_drag-clone-top);
		left: var(--_drag-clone-left);
		display: flex;
		opacity: var(--_drag-clone-opacity);
		z-index: var(--_drag-clone-z-index);
		border-radius: var(--components-list-item-indicator-corner-radius);
		background: var(--semantics-surfaces-background-color);
		pointer-events: none;
		width: var(--_drag-clone-width);
		height: var(--_drag-clone-height);
		overflow: hidden;
		flex-direction: row;
		align-items: stretch;
	}


	/* # Announcer */

	.list__polite-announcer,
	.list__assertive-announcer {
		position: absolute;
		margin: -1px;
		border: 0;
		width: 1px;
		height: 1px;
		overflow: hidden;
		padding: 0;
		white-space: nowrap;
		clip-path: inset(50%);
	}
`;
