import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const tabBarStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_gap: var(--primitives-space-1);
		--_z-index-selected: 1;
		--_z-index-focus: 2;

		${inheritedTextReset}
		display: inline-block;
		position: relative;
		max-width: 100%;
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
		display: grid;
		position: relative;
		border-radius: var(--semantics-controls-md-corner-radius);
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		min-width: 0;
		grid-auto-flow: column;
		grid-auto-columns: auto;
		align-items: center;
		gap: var(--_gap);
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
		--_lg-item-padding: var(--primitives-space-8);
		--_highlight-border-color: transparent;
		--_z-index-content: 1;

		${inheritedTextReset}
		display: inline-block;
		position: relative;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	/* Text-bearing items may shrink (their grid track narrows below content) so the
	 * text can truncate. Icon-only items keep min-width:auto, so their track floors
	 * at the fixed touch-target size — an icon can't truncate. */
	:host([variant="text"]),
	:host([variant="icon-and-text"]) {
		min-width: 0;
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
		font: var(--semantics-buttons-md-primary-text-font);
		text-decoration: none;
		appearance: none;
	}

	a.tab-bar__item {
		cursor: var(--semantics-controls-link-cursor);
	}

	/* Text-bearing items fill their (shrinkable) grid track so the text can
	 * truncate; icon-only items keep their fixed square size. */
	:host([variant="text"]) .tab-bar__item,
	:host([variant="icon-and-text"]) .tab-bar__item {
		width: 100%;
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
		padding: var(--_lg-item-padding);
		flex-direction: column;
	}

	:host([variant="text"][size="lg"]) .tab-bar__item {
		min-height: var(--semantics-controls-lg-min-size);
		padding: var(--semantics-controls-lg-block-padding) var(--primitives-space-16);
		font: var(--semantics-buttons-lg-primary-text-font);
	}

	:host([variant="icon"][size="lg"]) .tab-bar__item {
		width: var(--semantics-controls-lg-min-size);
		height: var(--semantics-controls-lg-min-size);
		padding: var(--_lg-item-padding);
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
		z-index: var(--_z-index-content);
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
		width: var(--semantics-buttons-lg-icon-only-icon-size);
		height: var(--semantics-buttons-lg-icon-only-icon-size);
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
		z-index: var(--_z-index-content);
		min-width: 0;
		max-width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	:host([variant="icon-and-text"][size="lg"]) .tab-bar__item-text {
		font: var(--primitives-font-body-xxs-medium-flat);
	}

	:host([variant="icon"]) .tab-bar__item-text {
		display: none;
	}
`;
