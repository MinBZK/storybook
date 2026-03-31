import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.ts';

const smMax = unsafeCSS(breakpoints.smMax);

export const tabBarStyles = css`

	/* # Host */

	:host {
		display: inline-block;
		position: relative;
	}

	:host([hidden]) {
		display: none;
	}

	:host([full-width]) {
		display: block;
		width: 100%;
	}


	/* # Tab bar */

	.tab-bar {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.tab-bar__items {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		border-radius: var(--semantics-controls-md-corner-radius);
		padding: 0 var(--primitives-space-2);
	}

	:host([variant='compact']) .tab-bar__items {
		border-radius: var(--semantics-controls-lg-corner-radius);
	}


	/* # Focus */

	::slotted(rr-tab-bar-item:focus-within) {
		position: relative;
		z-index: 1;
	}

`;

export const tabBarItemStyles = css`

	/* # Host */

	:host {
		display: inline-block;
		position: relative;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Item */

	.tab-bar__item {
		appearance: none;
		border: none;
		margin: 0;
		padding: 0;
		background: none;
		text-decoration: none;
		box-sizing: border-box;
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		font: var(--semantics-buttons-md-font);
		color: var(--semantics-buttons-neutral-tinted-content-color);
	}

	:host([variant='icon-and-text']) .tab-bar__item {
		flex-direction: row;
		gap: var(--primitives-space-4);
		padding: var(--primitives-space-8) var(--primitives-space-12);
		height: var(--semantics-controls-md-min-size);
	}

	:host([variant='text']) .tab-bar__item {
		flex-direction: row;
		padding: var(--primitives-space-8) var(--primitives-space-12);
		height: var(--semantics-controls-md-min-size);
	}

	:host([variant='icon']) .tab-bar__item {
		flex-direction: row;
		padding: var(--primitives-space-8);
		height: var(--semantics-controls-md-min-size);
	}

	:host([variant='compact']) .tab-bar__item {
		flex-direction: column;
		padding: var(--primitives-space-8);
		height: var(--semantics-controls-lg-min-size);
	}

	:host([responsive]) .tab-bar__item {
		@container layout-area (max-width: ${smMax}) {
			flex-direction: column;
			gap: 0;
			padding: var(--primitives-space-8);
			height: var(--semantics-controls-lg-min-size);
		}
	}

	:host([selected]) .tab-bar__item {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	:host([disabled]) .tab-bar__item {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	.tab-bar__item:focus-visible {
		outline: none;
	}


	/* # Indicator */

	.tab-bar__item-indicator {
		position: absolute;
		inset: var(--primitives-space-4) var(--primitives-space-2);
		border-radius: var(--primitives-corner-radius-sm);
		background-color: transparent;
		z-index: 0;
		pointer-events: none;
	}

	.tab-bar__item:hover .tab-bar__item-indicator {
		background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
	}

	:host([selected]) .tab-bar__item-indicator {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);

		@media (forced-colors: active) {
			background-color: Highlight;
		}
	}


	/* # Focus */

	.tab-bar__item:focus-visible .tab-bar__item-indicator {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}


	/* # Icon */

	.tab-bar__item-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 1;
		flex-shrink: 0;
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
	}

	:host([variant='text']) .tab-bar__item-icon {
		display: none;
	}

	::slotted([slot='icon']) {
		display: block;
		width: 100%;
		height: 100%;
	}


	/* # Label */

	.tab-bar__item-text {
		position: relative;
		z-index: 1;
	}

	:host([variant='compact']) .tab-bar__item-text {
		font: var(--primitives-font-body-xxs-bold-flat);
	}

	:host([variant='icon']) .tab-bar__item-text {
		display: none;
	}

	:host([responsive]) .tab-bar__item-text {
		@container layout-area (max-width: ${smMax}) {
			font: var(--primitives-font-body-xxs-bold-flat);
		}
	}

`;
