import { css } from 'lit';

export const styles = css`
	:host {
		display: block;
	}


	/* # Body */

	.list__body {
		display: flex;
		flex-direction: column;
		gap: var(--primitives-space-12);
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
		border-radius: var(--primitives-corner-radius-md);
	}


	/* # Variant: inset */

	:host([variant='inset']) .list__items {
		background-color: var(--semantics-surfaces-background-color);
		border-radius: var(--primitives-corner-radius-md);
	}
`;
