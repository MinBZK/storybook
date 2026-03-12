import { css } from 'lit';

export const styles = css`
	/* # Host */

	:host {
		display: contents;
	}

	:host([hidden]) {
		display: none;
	}


	/* # List item */

	.list-item {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		position: relative;
		width: 100%;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		text-align: start;
		text-decoration: none;
		color: inherit;
		font: inherit;
	}

	button.list-item:focus-visible,
	a.list-item:focus-visible {
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
	}


	/* # Indicator */

	.list-item__indicator {
		display: none;
		position: absolute;
		inset-block: 0;
		inset-inline: calc(var(--primitives-space-12) * -1);
		border-radius: var(--components-list-item-indicator-corner-radius);
		z-index: 0;
	}

	:host([selected]) .list-item__indicator {
		display: block;
		background-color: var(--components-list-item-is-selected-background-color);
	}

	button.list-item:hover .list-item__indicator,
	a.list-item:hover .list-item__indicator {
		display: block;
		background-color: var(--components-list-item-is-hovered-background-color);
	}

	:host([selected]) button.list-item:hover .list-item__indicator,
	:host([selected]) a.list-item:hover .list-item__indicator {
		background-color: var(--components-list-item-is-selected-background-color);
	}


	/* # Start & end area */

	.list-item__start-area,
	.list-item__end-area {
		display: none;
		flex-direction: row;
		align-items: center;
		flex-shrink: 0;
		position: relative;
		z-index: 1;
		padding-block: var(--primitives-space-12);
	}

	.list-item__start-area.is-visible,
	.list-item__end-area.is-visible {
		display: flex;
	}

	:host([size='sm']) .list-item__start-area,
	:host([size='sm']) .list-item__end-area {
		padding-block: var(--primitives-space-8);
	}


	/* # Main area */

	.list-item__main-area {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
		min-width: 0;
		position: relative;
		z-index: 1;
		padding-block: var(--primitives-space-12);
	}

	:host([size='sm']) .list-item__main-area {
		padding-block: var(--primitives-space-8);
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
`;
