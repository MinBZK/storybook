import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);

export const tabBarStyles = css`


	/* # Host */

	:host {
		display: inline-block;
		position: relative;
		isolation: isolate;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([centered]) {
		display: block;
		width: 100%;
	}


	/* # Block */

	.tab-bar {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	:host([centered]) .tab-bar {
		justify-content: center;
	}

	.tab-bar__items {
		display: flex;
		border-radius: var(--semantics-controls-md-corner-radius);
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	:host([compact]) .tab-bar__items {
		border-radius: var(--semantics-controls-lg-corner-radius);
	}


	/* # Focus */

	::slotted(nldd-tab-bar-item:focus-within) {
		position: relative;
		z-index: 1;
	}

`;

export const tabBarItemStyles = css`


	/* # Host */

	:host {
		display: inline-block;
		position: relative;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Item */

	.tab-bar__item {
		box-sizing: border-box;
		display: flex;
		position: relative;
		margin: 0;
		border: none;
		border-radius: var(--semantics-controls-md-corner-radius);
		background: none;
		padding: 0;
		justify-content: center;
		align-items: center;
		color: var(--semantics-buttons-neutral-tinted-content-color);
		font: var(--semantics-buttons-md-font);
		text-decoration: none;
		appearance: none;
	}

	:host([variant='icon-and-text']) .tab-bar__item {
		height: var(--semantics-controls-md-min-size);
		padding: var(--primitives-space-8) var(--primitives-space-12);
		gap: var(--semantics-buttons-md-gap);
	}

	:host([variant='text']) .tab-bar__item {
		height: var(--semantics-controls-md-min-size);
		padding: var(--primitives-space-8) var(--primitives-space-12);
	}

	:host([variant='icon']) .tab-bar__item {
		width: var(--semantics-controls-md-min-size);
		height: var(--semantics-controls-md-min-size);
		padding: 0;
	}

	:host([variant='compact']) .tab-bar__item {
		height: var(--semantics-controls-lg-min-size);
		padding: var(--primitives-space-8);
		flex-direction: column;
	}

	:host([responsive]) .tab-bar__item {
		@media (max-width: ${smMax}) {
			height: var(--semantics-controls-lg-min-size);
			padding: var(--primitives-space-8);
			flex-direction: column;
			gap: 0;
		}

		@container layout-container (max-width: ${smMax}) {
			height: var(--semantics-controls-lg-min-size);
			padding: var(--primitives-space-8);
			flex-direction: column;
			gap: 0;
		}
	}

	@media (hover: hover) {
		.tab-bar__item:hover {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		}
	}

	:host([selected]) .tab-bar__item {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);

		@media (forced-colors: active) {
			background-color: Highlight;
		}
	}

	.tab-bar__item:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Icon */

	.tab-bar__item-icon {
		display: flex;
		position: relative;
		z-index: 1;
		width: var(--semantics-buttons-md-icon-size);
		height: var(--semantics-buttons-md-icon-size);
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
	}

	:host([variant='icon']) .tab-bar__item-icon {
		width: var(--semantics-buttons-md-icon-only-icon-size);
		height: var(--semantics-buttons-md-icon-only-icon-size);
	}

	:host([variant='compact']) .tab-bar__item-icon {
		width: var(--semantics-buttons-md-icon-only-icon-size);
		height: var(--semantics-buttons-md-icon-only-icon-size);
	}

	:host([responsive]) .tab-bar__item-icon {
		@media (max-width: ${smMax}) {
			width: var(--semantics-buttons-md-icon-only-icon-size);
			height: var(--semantics-buttons-md-icon-only-icon-size);
		}

		@container layout-container (max-width: ${smMax}) {
			width: var(--semantics-buttons-md-icon-only-icon-size);
			height: var(--semantics-buttons-md-icon-only-icon-size);
		}
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
		@media (max-width: ${smMax}) {
			font: var(--primitives-font-body-xxs-bold-flat);
		}

		@container layout-container (max-width: ${smMax}) {
			font: var(--primitives-font-body-xxs-bold-flat);
		}
	}

`;
