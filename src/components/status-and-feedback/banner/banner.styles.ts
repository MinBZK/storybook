import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/shadow-resets.js';

export const bannerStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host
	 *
	 * The visual framework lives on .banner, not :host: outer-document rules
	 * (a consumer's universal reset) beat normal :host declarations per CSS
	 * Scoping. The host only keeps the external contract. */

	:host {
		--_corner-radius: var(--components-banner-corner-radius);
		--_padding: var(--components-banner-md-padding);
		--_background-color: var(--semantics-categories-neutral-tinted-background-color);
		--_border-color: var(--semantics-categories-neutral-tinted-highlight-border-color);
		--_border-width: var(--primitives-border-width-thin);
		--_icon-color: var(--semantics-categories-neutral-tinted-content-color);
		--_icon-size: var(--components-banner-md-icon-size);
		--_content-color: var(--components-banner-content-color);
		--_text-icon-offset: calc((var(--_icon-size) - var(--primitives-font-size-100) * var(--primitives-line-height-tight)) / 2);
		--_column-gap: var(--primitives-space-8);
		--_dismiss-inset: 0px;
		--_dismissible-padding-right: calc(var(--_dismiss-inset) + var(--semantics-controls-md-min-size));
		--_main-gap: var(--primitives-space-8);
		--_actions-gap: var(--primitives-space-4);

		${inheritedTextReset}
		display: block;
		width: 100%;
		color: var(--_content-color);
	}

	:host([hidden]) {
		display: none;
	}

	/* The dismiss slot narrows with the icon-button the template swaps in, so
	   the reserved right padding tracks the control size rather than a fixed
	   value. --_text-icon-offset follows --_icon-size on its own.

	   --_dismiss-inset pulls the 32px button up until its centre sits on the
	   24px icon's centre (8 - (32 - 24) / 2 = 4), and the same value on the
	   right gives the button equal air on both sides of its corner. */

	:host([size="sm"]) {
		--_padding: var(--components-banner-sm-padding);
		--_icon-size: var(--components-banner-sm-icon-size);
		--_column-gap: var(--primitives-space-4);
		--_dismiss-inset: calc(var(--_padding) - (var(--semantics-controls-sm-min-size) - var(--_icon-size)) / 2);
		--_dismissible-padding-right: calc(var(--_dismiss-inset) + var(--semantics-controls-sm-min-size));
	}

	:host([variant="accent"]) {
		--_background-color: var(--semantics-categories-accent-tinted-background-color);
		--_border-color: var(--semantics-categories-accent-tinted-highlight-border-color);
		--_icon-color: var(--semantics-categories-accent-tinted-content-color);
	}

	:host([variant="success"]) {
		--_background-color: var(--semantics-categories-success-tinted-background-color);
		--_border-color: var(--semantics-categories-success-tinted-highlight-border-color);
		--_icon-color: var(--semantics-categories-success-tinted-content-color);
	}

	:host([variant="warning"]) {
		--_background-color: var(--semantics-categories-warning-tinted-background-color);
		--_border-color: var(--semantics-categories-warning-tinted-highlight-border-color);
		--_icon-color: var(--semantics-categories-warning-tinted-content-color);
	}

	:host([variant="critical"]) {
		--_background-color: var(--semantics-categories-critical-tinted-background-color);
		--_border-color: var(--semantics-categories-critical-tinted-highlight-border-color);
		--_icon-color: var(--semantics-categories-critical-tinted-content-color);
	}

	/* # Block */

	.banner {
		box-sizing: border-box;
		display: grid;
		position: relative;
		border-radius: var(--_corner-radius);
		box-shadow: inset 0 0 0 var(--_border-width) var(--_border-color);
		background-color: var(--_background-color);
		padding: var(--_padding);
		grid-template-columns: auto 1fr;
		gap: var(--_column-gap);
	}

	:host([dismissible]) .banner {
		padding-right: var(--_dismissible-padding-right);
	}

	@media (forced-colors: active) {
		.banner {
			border: var(--_border-width) solid CanvasText;
		}
	}


	/* # Icon */

	.banner__icon {
		display: flex;
		grid-column: 1;
		grid-row: 1;
		width: var(--_icon-size);
		align-items: flex-start;
		color: var(--_icon-color);
	}


	/* # Main */

	.banner__main {
		display: flex;
		grid-column: 2;
		grid-row: 1;
		min-width: 0;
		flex-direction: column;
		gap: var(--_main-gap);
	}

	.banner__heading {
		display: flex;
		padding-top: var(--_text-icon-offset);
		flex-direction: column;
	}

	.banner__heading:has(.banner__supporting-text) {
		padding-top: calc(var(--_text-icon-offset) - var(--primitives-space-2));
	}

	.banner__text {
		margin: 0;
		font: var(--primitives-font-body-md-bold-tight);
		text-wrap: pretty;
	}

	.banner__supporting-text {
		margin: 0;
		font: var(--primitives-font-body-md-regular-tight);
		text-wrap: pretty;
	}

	.banner__content {
		display: contents;
	}

	.banner__content[hidden] {
		display: none;
	}

	.banner__actions {
		display: flex;
		margin-top: var(--_actions-gap);
	}

	.banner__actions[hidden] {
		display: none;
	}


	/* # Dismiss */

	.banner__dismiss-button {
		display: flex;
		position: absolute;
		top: var(--_dismiss-inset);
		right: var(--_dismiss-inset);
	}
`;
