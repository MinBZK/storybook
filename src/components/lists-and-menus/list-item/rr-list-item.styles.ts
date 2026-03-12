import { css } from 'lit';

export const styles = css`
	:host {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		position: relative;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Indicator */

	.list-item__indicator {
		display: none;
		position: absolute;
		inset-block: 0;
		inset-inline: var(--_list-item-indicator-inset, -8px);
		background-color: var(--semantics-buttons-accent-filled-background-color);
		border-radius: var(--primitives-corner-radius-sm);
		z-index: 0;
	}

	:host([selected]) .list-item__indicator {
		display: block;
	}


	/* # Areas */

	.list-item__start-area,
	.list-item__end-area {
		display: none;
		flex-direction: row;
		align-items: center;
		flex-shrink: 0;
		position: relative;
		z-index: 1;
	}

	.list-item__start-area.is-visible,
	.list-item__end-area.is-visible {
		display: flex;
	}

	.list-item__main-area {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
		min-width: 0;
		position: relative;
		z-index: 1;
	}


	/* # Divider */

	.list-item__divider {
		position: absolute;
		inset-block-end: 0;
		inset-inline: 0;
		height: var(--semantics-dividers-thickness);
		background-color: var(--semantics-dividers-color);
	}

	:host([selected]) .list-item__divider,
	:host(.is-boxed:last-child) .list-item__divider {
		display: none;
	}


	/* # Size: md (default) */

	.list-item__main-area,
	.list-item__start-area.is-visible,
	.list-item__end-area.is-visible {
		padding-block: var(--primitives-space-12);
	}


	/* # Size: sm */

	:host([size='sm']) .list-item__main-area,
	:host([size='sm']) .list-item__start-area,
	:host([size='sm']) .list-item__end-area {
		padding-block: var(--primitives-space-8);
	}


	/* # Hover */

	:host(:hover:not([selected])) .list-item__indicator {
		display: block;
		background-color: var(--semantics-surfaces-tinted-background-color);
	}


	/* # Focus */

	:host(:focus-visible) {
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
	}
`;
