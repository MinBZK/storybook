import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const tabBarStyles = css`


	/* # Host */

	:host {
		--_z-index-selected: 1;
		--_z-index-focus: 2;

		${inheritedTextReset}
		display: inline-block;
		position: relative;
		isolation: isolate;
		user-select: none;
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
		align-items: center;
		justify-content: flex-start;
	}

	:host([centered]) .tab-bar {
		justify-content: center;
	}

	.tab-bar__items {
		display: flex;
		position: relative;
		border-radius: var(--semantics-controls-md-corner-radius);
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: var(--primitives-space-1);
	}

	:host([size="lg"]) .tab-bar__items {
		border-radius: var(--semantics-controls-lg-corner-radius);
	}

	.tab-bar__items::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--semantics-buttons-neutral-tinted-highlight-border-color);
		pointer-events: none;
	}


	/* # Focus */

	::slotted(nldd-tab-bar-item[selected]) {
		position: relative;
		z-index: var(--_z-index-selected);
	}

	::slotted(nldd-tab-bar-item:focus-within) {
		position: relative;
		z-index: var(--_z-index-focus);
	}
`;

export const tabBarItemStyles = css`


	/* # Host */

	:host {
		${inheritedTextReset}
		display: inline-block;
		position: relative;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.tab-bar__item {
		box-sizing: border-box;
		display: flex;
		position: relative;
		margin: 0;
		border: none;
		border-radius: var(--semantics-controls-md-corner-radius);
		background: none;
		padding: 0;
		align-items: center;
		justify-content: center;
		color: var(--semantics-buttons-neutral-tinted-primary-content-color);
		font: var(--semantics-buttons-md-font);
		text-decoration: none;
		appearance: none;
	}

	:host([variant="icon-and-text"]:not([size="lg"])) .tab-bar__item {
		height: var(--semantics-controls-md-min-size);
		padding: var(--primitives-space-8) var(--primitives-space-12);
		gap: var(--semantics-buttons-md-gap);
	}

	:host([variant="text"]:not([size="lg"])) .tab-bar__item {
		height: var(--semantics-controls-md-min-size);
		padding: var(--primitives-space-8) var(--primitives-space-12);
	}

	:host([variant="icon"]:not([size="lg"])) .tab-bar__item {
		width: var(--semantics-controls-md-min-size);
		height: var(--semantics-controls-md-min-size);
		padding: 0;
	}

	:host([variant="icon-and-text"][size="lg"]) .tab-bar__item {
		height: var(--semantics-controls-lg-min-size);
		padding: var(--primitives-space-8);
		flex-direction: column;
	}

	:host([variant="text"][size="lg"]) .tab-bar__item {
		min-height: var(--semantics-controls-lg-min-size);
		padding: var(--semantics-controls-lg-block-padding) var(--primitives-space-16);
		font: var(--semantics-buttons-lg-font);
	}

	:host([variant="icon"][size="lg"]) .tab-bar__item {
		width: var(--semantics-controls-lg-min-size);
		height: var(--semantics-controls-lg-min-size);
		padding: var(--primitives-space-8);
	}

	@media (hover: hover) {
		.tab-bar__item:hover {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		}

		:host([selected]) .tab-bar__item:hover {
			--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-selected-is-hovered-highlight-border-color);

			background-color: var(--semantics-buttons-neutral-tinted-is-selected-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-selected-is-hovered-primary-content-color);
		}
	}

	.tab-bar__item:active {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-primary-content-color);
	}

	:host([selected]) .tab-bar__item {
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-selected-highlight-border-color);

		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-primary-content-color);
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--_highlight-border-color);
	}

	:host([selected]) .tab-bar__item:active {
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-selected-is-active-highlight-border-color);

		background-color: var(--semantics-buttons-neutral-tinted-is-selected-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-is-active-primary-content-color);
	}

	@media (forced-colors: active) {
		:host([selected]) .tab-bar__item {
			background-color: Highlight;
		}
	}

	.tab-bar__item:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	:host([selected]) .tab-bar__item:focus-visible {
		box-shadow: var(--semantics-focus-ring-box-shadow), inset 0 0 0 var(--primitives-border-width-thin) var(--_highlight-border-color);
	}


	/* # Elements */

	.tab-bar__item-icon {
		display: flex;
		position: relative;
		z-index: 1;
		width: var(--semantics-buttons-md-icon-size);
		height: var(--semantics-buttons-md-icon-size);
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	:host([variant="icon"]:not([size="lg"])) .tab-bar__item-icon {
		width: var(--semantics-buttons-md-icon-only-icon-size);
		height: var(--semantics-buttons-md-icon-only-icon-size);
	}

	:host([variant="icon-and-text"][size="lg"]) .tab-bar__item-icon {
		width: var(--semantics-buttons-md-icon-only-icon-size);
		height: var(--semantics-buttons-md-icon-only-icon-size);
	}

	:host([variant="icon"][size="lg"]) .tab-bar__item-icon {
		width: var(--primitives-space-28);
		height: var(--primitives-space-28);
	}

	:host([variant="text"]) .tab-bar__item-icon {
		display: none;
	}

	::slotted([slot="icon"]) {
		display: block;
		width: 100%;
		height: 100%;
	}

	.tab-bar__item-text {
		position: relative;
		z-index: 1;
	}

	:host([variant="icon-and-text"][size="lg"]) .tab-bar__item-text {
		font: var(--primitives-font-body-xxs-medium-flat);
	}

	:host([variant="icon"]) .tab-bar__item-text {
		display: none;
	}
`;
