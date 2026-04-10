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
		left: 0;
		right: 0;
		height: var(--components-menu-bar-menu-item-is-selected-indicator-height);
		background-color: var(--components-menu-bar-menu-item-is-selected-indicator-background-color);
		pointer-events: none;
		z-index: 1;
	}

	/* ## Content */

	.top-navigation-bar__menu-item-content {
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

	.top-navigation-bar__menu-item:focus-visible {
		outline: none;
	}

	.top-navigation-bar__menu-item:focus-visible::before {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
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

	:host([icon-only]) .top-navigation-bar__menu-item-content {
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

	:host([sm-icon-only][compact][icon]:not([icon=""])) .top-navigation-bar__menu-item-content {
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
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: var(--primitives-space-16);
		background-color: var(--semantics-surfaces-background-color);
	}

	/* ## Logo */

	.top-navigation-bar__logo {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
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
		display: flex;
		flex-direction: column;
		gap: var(--primitives-space-2);
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
		font: 400 14px/1.25 var(--ndd-font-family-body);
		color: var(--primitives-color-neutral-700);
		margin: 0;

		@container top-navigation-bar (min-width: ${mdMin}) {
			font-size: 16px;
		}

		@container top-navigation-bar (min-width: ${lgMin}) {
			font-size: 18px;
		}
	}

	.top-navigation-bar__wordmark-supporting {
		font: 400 12px/1.25 var(--ndd-font-family-body);
		color: var(--primitives-color-accent-100);
		margin: 0;

		@container top-navigation-bar (min-width: ${mdMin}) {
			font-size: 14px;
		}

		@container top-navigation-bar (min-width: ${lgMin}) {
			font-size: 16px;
		}
	}

	/* ## Title bar (own row on mobile, hidden on desktop) */

	.top-navigation-bar__title-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--primitives-space-4) var(--primitives-space-8);
		background-color: var(--semantics-surfaces-background-color);

		@container top-navigation-bar (min-width: ${mdMin}) {
			display: none;
		}
	}

	/* ## Title item */

	.top-navigation-bar__title-item {
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

	/* ## Title item inline (in menu-bar-start, hidden on mobile, visible on desktop) */

	.top-navigation-bar__title-item--inline {
		display: none;

		@container top-navigation-bar (min-width: ${mdMin}) {
			display: inline;
		}
	}

	/* ## Menu bar */

	.top-navigation-bar__menu-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 44px;
		background-color: var(--semantics-surfaces-background-color);
		padding-inline: var(--semantics-page-sections-sm-margin-inline);

		@container layout-area (min-width: ${mdMin}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
		}

		@container layout-area (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
		}
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

	/* ## Overflow menu item (global bar) */

	.top-navigation-bar__overflow-menu-item {
		display: none;
	}

	/* ## Utility overflow menu item */

	.top-navigation-bar__utility-overflow-menu-item {
		display: none;
	}

	/* ## Utility slot */

	::slotted(ndd-menu-bar-item[slot="utility"]) {
		flex: 0 0 auto;
	}
`;
