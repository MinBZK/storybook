import { css } from 'lit';

export const bannerStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--components-banner-corner-radius);
		--_padding: var(--components-banner-padding);
		--_background-color: var(--components-banner-neutral-background-color);
		--_icon-color: var(--components-banner-neutral-icon-color);
		--_icon-size: var(--primitives-space-28);
		--_content-color: var(--components-banner-content-color);
		--_content-secondary-color: var(--components-banner-content-secondary-color);
		--_text-icon-offset: calc((var(--_icon-size) - var(--primitives-font-size-100) * var(--primitives-line-height-tight)) / 2);

		box-sizing: border-box;
		display: grid;
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		width: 100%;
		padding: var(--_padding);
		grid-template-columns: auto 1fr auto;
		gap: var(--primitives-space-10);
		color: var(--_content-color);
	}

	:host([hidden]) {
		display: none;
	}

	:host([variant="accent"]) {
		--_background-color: var(--components-banner-accent-background-color);
		--_icon-color: var(--components-banner-accent-icon-color);
	}

	:host([variant="success"]) {
		--_background-color: var(--components-banner-success-background-color);
		--_icon-color: var(--components-banner-success-icon-color);
	}

	:host([variant="warning"]) {
		--_background-color: var(--components-banner-warning-background-color);
		--_icon-color: var(--components-banner-warning-icon-color);
	}

	:host([variant="critical"]) {
		--_background-color: var(--components-banner-critical-background-color);
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
		gap: var(--primitives-space-8);
	}

	.banner__heading {
		display: flex;
		flex-direction: column;
	}

	.banner__text {
		margin: 0;
		padding-top: var(--_text-icon-offset);
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
		margin-top: var(--primitives-space-4);
	}

	.banner__actions[hidden] {
		display: none;
	}


	/* # Dismiss */

	.banner__dismiss {
		display: flex;
		grid-column: 3;
		grid-row: 1;
		align-items: flex-start;
		justify-content: flex-end;
	}
`;
