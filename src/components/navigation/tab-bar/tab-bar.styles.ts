import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);

export const tabBarStyles = css`


	/* # Host */

	:host {
		--_tab-bar-item-indicator-inset: var(--primitives-space-4);

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
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		border-radius: var(--semantics-controls-md-corner-radius);
		padding: 0 var(--primitives-space-2);
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
		gap: var(--semantics-buttons-md-gap);
		padding: var(--primitives-space-8) var(--primitives-space-12);
		height: var(--semantics-controls-md-min-size);
	}

	:host([variant='text']) .tab-bar__item {
		padding: var(--primitives-space-8) var(--primitives-space-12);
		height: var(--semantics-controls-md-min-size);
	}

	:host([variant='icon']) .tab-bar__item {
		padding: 0;
		height: var(--semantics-controls-md-min-size);
		width: calc(var(--semantics-controls-md-min-size) - var(--_tab-bar-item-indicator-inset));
	}

	:host([variant='compact']) .tab-bar__item {
		flex-direction: column;
		padding: var(--primitives-space-8);
		height: var(--semantics-controls-lg-min-size);
	}

	:host([responsive]) .tab-bar__item {
		@media (max-width: ${smMax}) {
			flex-direction: column;
			gap: 0;
			padding: var(--primitives-space-8);
			height: var(--semantics-controls-lg-min-size);
		}

		@container layout-container (max-width: ${smMax}) {
			flex-direction: column;
			gap: 0;
			padding: var(--primitives-space-8);
			height: var(--semantics-controls-lg-min-size);
		}
	}

	:host([selected]) .tab-bar__item {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	.tab-bar__item:focus-visible {
		outline: none;
	}


	/* # Indicator */

	.tab-bar__item::before {
		content: '';
		position: absolute;
		inset-block: var(--_tab-bar-item-indicator-inset);
		inset-inline: calc(var(--_tab-bar-item-indicator-inset) / 2);
		border-radius: calc(var(--semantics-controls-md-corner-radius) - (var(--_tab-bar-item-indicator-inset) / 2));
		background-color: transparent;
		z-index: 0;
		pointer-events: none;
	}

	@media (hover: hover) {
		.tab-bar__item:hover::before {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		}
	}

	:host([selected]) .tab-bar__item::before {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);

		@media (forced-colors: active) {
			background-color: Highlight;
		}
	}

	.tab-bar__item:focus-visible::before {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Icon */

	.tab-bar__item-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 1;
		flex-shrink: 0;
		width: var(--semantics-buttons-md-icon-size);
		height: var(--semantics-buttons-md-icon-size);
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
