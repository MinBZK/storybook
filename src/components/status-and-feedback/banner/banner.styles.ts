import { css } from 'lit';

export const bannerStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--components-banner-corner-radius);
		--_padding: var(--components-banner-padding);
		--_background-color: var(--components-banner-neutral-background-color);
		--_border-color: var(--components-banner-neutral-border-color);
		--_border-width: var(--primitives-border-width-thin);
		--_icon-color: var(--components-banner-neutral-icon-color);
		--_icon-size: var(--primitives-space-28);
		--_content-color: var(--components-banner-content-color);
		--_content-secondary-color: var(--components-banner-content-secondary-color);
		--_text-icon-offset: calc((var(--_icon-size) - var(--primitives-font-size-100) * var(--primitives-line-height-tight)) / 2);
		--_column-gap: var(--primitives-space-10);
		--_dismissible-padding-right: var(--primitives-space-44);
		--_main-gap: var(--primitives-space-8);
		--_actions-gap: var(--primitives-space-4);

		box-sizing: border-box;
		display: grid;
		position: relative;
		border: var(--_border-width) solid var(--_border-color);
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		width: 100%;
		padding: var(--_padding);
		grid-template-columns: auto 1fr;
		gap: var(--_column-gap);
		color: var(--_content-color);
	}

	:host([dismissible]) {
		padding-right: var(--_dismissible-padding-right);
	}

	:host([hidden]) {
		display: none;
	}

	:host([variant="success"]) {
		--_background-color: var(--components-banner-success-background-color);
		--_border-color: var(--components-banner-success-border-color);
		--_icon-color: var(--components-banner-success-icon-color);
	}

	:host([variant="warning"]) {
		--_background-color: var(--components-banner-warning-background-color);
		--_border-color: var(--components-banner-warning-border-color);
		--_icon-color: var(--components-banner-warning-icon-color);
	}

	:host([variant="critical"]) {
		--_background-color: var(--components-banner-critical-background-color);
		--_border-color: var(--components-banner-critical-border-color);
		--_icon-color: var(--components-banner-critical-icon-color);
	}


	/* # Icon */

	.banner__icon-area {
		display: flex;
		grid-column: 1;
		grid-row: 1;
		align-items: flex-start;
		justify-content: center;
		color: var(--_icon-color);
	}

	.banner__icon {
		width: var(--_icon-size);
		height: var(--_icon-size);
		flex-shrink: 0;
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
		color: var(--_content-secondary-color);
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
		top: 0;
		right: 0;
	}
`;
