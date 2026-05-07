import { css } from 'lit';

export const tagStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--components-tag-neutral-background-color);
		--_content-color: var(--components-tag-neutral-content-color);
		--_min-height: var(--primitives-space-24);
		--_inline-padding: var(--primitives-space-8);
		--_gap: var(--primitives-space-3);
		--_font: var(--primitives-font-body-sm-bold-flat);
		--_icon-size: var(--primitives-space-16);
		--_icon-offset-correction: var(--primitives-space-1);
		--_corner-radius: var(--components-tag-md-corner-radius);

		display: inline-flex;
		vertical-align: middle;
	}

	:host([size="sm"]) {
		--_min-height: var(--primitives-space-20);
		--_inline-padding: var(--primitives-space-6);
		--_gap: var(--primitives-space-2);
		--_font: var(--primitives-font-body-xs-bold-flat);
		--_icon-size: var(--primitives-space-14);
		--_corner-radius: var(--components-tag-sm-corner-radius);
	}

	:host([hidden]) {
		display: none;
	}


	/* ## Variants */

	:host([variant="neutral"]),
	:host(:not([variant])) {
		--_background-color: var(--components-tag-neutral-background-color);
		--_content-color: var(--components-tag-neutral-content-color);
	}

	:host([variant="accent"]) {
		--_background-color: var(--components-tag-accent-background-color);
		--_content-color: var(--components-tag-accent-content-color);
	}

	:host([variant="success"]) {
		--_background-color: var(--components-tag-success-background-color);
		--_content-color: var(--components-tag-success-content-color);
	}

	:host([variant="warning"]) {
		--_background-color: var(--components-tag-warning-background-color);
		--_content-color: var(--components-tag-warning-content-color);
	}

	:host([variant="critical"]) {
		--_background-color: var(--components-tag-critical-background-color);
		--_content-color: var(--components-tag-critical-content-color);
	}


	/* # Block */

	.tag {
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		min-height: var(--_min-height);
		padding: 0 var(--_inline-padding);
		gap: var(--_gap);
		background-color: var(--_background-color);
		color: var(--_content-color);
		border-radius: var(--_corner-radius);
		white-space: nowrap;
		font: var(--_font);
	}


	/* # Icon */

	.tag__icon {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		width: var(--_icon-size);
		height: var(--_icon-size);
		margin-inline: calc((var(--_min-height) - var(--_icon-size)) / 2 - var(--_inline-padding));
	}

	.tag__icon:has(+ .tag__text) {
		margin-left: calc((var(--_min-height) - var(--_icon-size)) / 2 - var(--_inline-padding) + var(--_icon-offset-correction));
		margin-right: 0;
	}


	/* # Text */

	.tag__text {
		display: inline-block;
	}
`;
