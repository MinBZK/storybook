import { css } from 'lit';

export const styles = css`
	:host {
		display: block;
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


	/* # Variant: simple */

	:host([variant='simple']) .list__items {
		border-top: var(--semantics-dividers-thickness) solid var(--semantics-dividers-color);
	}


	/* # Variant: box */

	:host([variant='box']) .list__items {
		background-color: var(--semantics-surfaces-tinted-background-color);
		border-radius: var(--components-list-corner-radius);
		overflow: hidden;
	}


	/* # Variant: inset */

	:host([variant='inset']) .list__items {
		background-color: var(--semantics-surfaces-background-color);
		border-radius: var(--components-list-corner-radius);
		overflow: hidden;
	}


	/* # Drag placeholder */

	::slotted(.rr-list-drag-placeholder) {
		box-sizing: border-box;
		background-color: var(--components-list-drag-placeholder-background-color);
		pointer-events: none;
		border-radius: var(--components-list-item-indicator-corner-radius);
	}


	/* # Announcer */

	.list__announcer {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
`;
