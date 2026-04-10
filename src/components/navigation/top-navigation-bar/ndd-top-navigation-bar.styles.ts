import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

// # Menu bar item styles

export const menuBarItemStyles = css`

	/* ## Host */

	:host {
		display: inline-block;
		position: relative;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	/* ## Item */

	.top-navigation-bar__menu-item {
		appearance: none;
		border: none;
		margin: 0;
		background: none;
		text-decoration: none;
		display: flex;
		position: relative;
		height: var(--semantics-controls-md-min-size);
		min-width: var(--semantics-controls-md-min-size);
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		gap: var(--primitives-space-4);
		font: var(--components-menu-bar-menu-item-font);
		color: var(--components-menu-bar-menu-item-color);
		text-align: center;
		padding: 0 var(--primitives-space-8);
		white-space: nowrap;
	}

	/* ## Hover indicator (::before) */

	.top-navigation-bar__menu-item::before {
		content: '';
		position: absolute;
		top: var(--primitives-space-6);
		bottom: var(--primitives-space-6);
		left: 0;
		right: 0;
		height: var(--components-menu-bar-menu-item-is-hovered-indicator-height);
		border-radius: var(--semantics-controls-sm-corner-radius);
		pointer-events: none;
		z-index: 0;
	}

	.top-navigation-bar__menu-item:hover::before {
		background-color: var(--components-menu-bar-menu-item-is-hovered-indicator-background-color);
	}

	/* ## Selection indicator (::after) */

	:host([selected]) .top-navigation-bar__menu-item::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: var(--primitives-space-8);
		right: var(--primitives-space-8);
		height: var(--components-menu-bar-menu-item-is-selected-indicator-height);
		background-color: var(--components-menu-bar-menu-item-is-selected-indicator-background-color);
		pointer-events: none;
		z-index: 1;
	}

	/* ## Text */

	.top-navigation-bar__menu-item-text {
		position: relative;
		z-index: 2;
	}

	/* ## Icon */

	.top-navigation-bar__menu-item-icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		flex-shrink: 0;
		z-index: 2;
	}

	/* ## Disclosure icon */

	.top-navigation-bar__menu-item-disclosure-icon {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
		z-index: 2;
	}

	/* ## Focus */

	:host(:focus-within) {
		z-index: 1;
	}

	.top-navigation-bar__menu-item:focus-visible {
		outline: none;
	}

	.top-navigation-bar__menu-item:focus-visible::before {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	/* ## Slotted menu items (hidden, used by expandable popover) */

	::slotted(ndd-menu-item),
	::slotted(ndd-menu-divider) {
		display: none;
	}

	/* ## Disabled */

	:host([disabled]) .top-navigation-bar__menu-item {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	/* ## Icon-only (always, via icon-only attribute) */

	:host([icon-only]) .top-navigation-bar__menu-item {
		padding: var(--primitives-space-8);
	}

	:host([icon-only]) .top-navigation-bar__menu-item-text {
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

	:host([icon-only]) .top-navigation-bar__menu-item-disclosure-icon {
		display: none;
	}

	/* ## Icon-only when compact (opt-in via sm-icon-only, requires icon to be set) */

	:host([sm-icon-only][compact][icon]:not([icon=""])) .top-navigation-bar__menu-item {
		padding: var(--primitives-space-8);
	}

	:host([sm-icon-only][compact][icon]:not([icon=""])) .top-navigation-bar__menu-item-text {
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

	/* ## Text-only when compact (opt-in via sm-text-only, activated by compact attribute from parent) */

	:host([sm-text-only][compact]) .top-navigation-bar__menu-item-icon {
		display: none;
	}
`;

// # Top navigation bar styles

export const styles = css`

	/* ## Host */

	:host {
		display: block;
		width: 100%;
	}

	:host([hidden]) {
		display: none;
	}

	/* ## Container */

	.top-navigation-bar {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		container-type: inline-size;
		container-name: top-navigation-bar;
	}

	/* ## Logo bar */

	.top-navigation-bar__logo-bar {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: var(--primitives-space-8);
		align-items: center;
		padding-inline: var(--semantics-page-sections-sm-margin-inline);

		@container layout-area (min-width: ${mdMin}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
		}

		@container layout-area (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
		}
	}

	/* ## Logo */

	.top-navigation-bar__logo {
		grid-column: 2;
		align-self: start;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--primitives-color-accent-100);
		width: 40px;
		height: 80px;

		@container top-navigation-bar (min-width: ${mdMin}) {
			width: 44px;
			height: 88px;
		}

		@container top-navigation-bar (min-width: ${lgMin}) {
			width: 48px;
			height: 96px;
		}
	}

	.top-navigation-bar__logo svg {
		width: 100%;
		height: 100%;
	}

	/* ## Wordmark */

	.top-navigation-bar__wordmark {
		grid-column: 3;
		display: flex;
		flex-direction: column;
		gap: var(--primitives-space-2);
		padding-block: var(--primitives-space-8);
	}

	.top-navigation-bar__wordmark-title {
		font: var(--components-menu-bar-title-item-s-font);
		color: var(--primitives-color-neutral-900);
		margin: 0;

		@container top-navigation-bar (min-width: ${mdMin}) {
			font: var(--components-menu-bar-title-item-m-font);
		}

		@container top-navigation-bar (min-width: ${lgMin}) {
			font: var(--components-menu-bar-title-item-l-font);
		}
	}

	.top-navigation-bar__wordmark-subtitle {
		font: var(--primitives-font-body-xs-regular-flat);
		color: var(--semantics-content-secondary-color);
		margin: 0;

		@container top-navigation-bar (min-width: ${mdMin}) {
			font: var(--primitives-font-body-sm-regular-flat);
		}
	}

	.top-navigation-bar__wordmark-supporting {
		font: var(--primitives-font-body-xxs-regular-flat);
		color: var(--semantics-content-secondary-color);
		margin: 0;

		@container top-navigation-bar (min-width: ${mdMin}) {
			font: var(--primitives-font-body-xs-regular-flat);
		}
	}

	/* ## Bar wrapper (title-bar + menu-bar, column on sm, row on md+) */

	.top-navigation-bar__main-bar {
		display: flex;
		flex-direction: column;
		padding-inline: var(--semantics-page-sections-sm-margin-inline);

		@container layout-area (min-width: ${mdMin}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
		}

		@container layout-area (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
		}

		@container top-navigation-bar (min-width: ${mdMin}) {
			flex-direction: row;
			align-items: center;
		}
	}

	/* ## Title bar */

	.top-navigation-bar__title-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--primitives-space-4) var(--primitives-space-8);

		@container top-navigation-bar (min-width: ${mdMin}) {
			justify-content: flex-start;
			padding: 0;
		}
	}

	/* ## Title item */

	.top-navigation-bar__title {
		font: var(--components-menu-bar-title-item-s-font);
		color: var(--primitives-color-neutral-900);
		padding: 0 var(--primitives-space-8);
		white-space: nowrap;

		@container top-navigation-bar (min-width: ${mdMin}) {
			font: var(--components-menu-bar-title-item-m-font);
		}

		@container top-navigation-bar (min-width: ${lgMin}) {
			font: var(--components-menu-bar-title-item-l-font);
		}
	}

	/* ## Menu bar */

	.top-navigation-bar__menu-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
		min-height: 44px;
		min-width: 0;
	}

	/* ## Menu bar start */

	.top-navigation-bar__menu-bar-start {
		display: flex;
		align-items: center;
		flex: 1;
		min-width: 0;
	}

	/* ## Menu bar end */

	.top-navigation-bar__menu-bar-end {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	/* ## Global bar */

	.top-navigation-bar__global-bar {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		position: relative;
		flex: 1;
		min-width: 0;
		overflow: visible;
	}

	::slotted(ndd-menu-bar-item[slot="global"]) {
		flex: 0 0 auto;

		@container top-navigation-bar (max-width: ${mdMax}) {
			display: none;
		}
	}

	/* ## Menu button (visible on sm and md, hidden on lg) */

	.top-navigation-bar__menu-button {
		display: none;

		@container top-navigation-bar (max-width: ${mdMax}) {
			display: inline-block;
		}
	}

	/* ## Overflow items (global bar + utility) */

	.top-navigation-bar__overflow-button {
		display: none;
	}

	/* ## Utility slot */

	::slotted(ndd-menu-bar-item[slot="utility"]) {
		flex: 0 0 auto;
	}
`;
