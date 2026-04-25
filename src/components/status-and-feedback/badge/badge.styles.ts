import { css } from 'lit';

export const badgeStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--components-badge-critical-background-color);
		--_content-color: var(--components-badge-critical-content-color);
		--_height: var(--primitives-space-20);
		--_inline-padding: var(--primitives-space-6);
		--_gap: var(--primitives-space-3);
		--_font: var(--primitives-font-body-xs-bold-flat);
		--_icon-size: var(--primitives-space-14);
		--_icon-offset-correction: var(--primitives-space-1);
		--_dot-size: var(--primitives-space-10);
		display: inline-flex;
		vertical-align: middle;
	}

	:host([size="sm"]) {
		--_height: var(--primitives-space-16);
		--_inline-padding: var(--primitives-space-4);
		--_gap: var(--primitives-space-2);
		--_font: var(--primitives-font-body-xxs-bold-flat);
		--_icon-size: var(--primitives-space-12);
		--_dot-size: var(--primitives-space-6);
	}

	:host([hidden]) {
		display: none;
	}


	/* ## Variants */

	:host([variant="critical"]),
	:host(:not([variant])) {
		--_background-color: var(--components-badge-critical-background-color);
		--_content-color: var(--components-badge-critical-content-color);
	}

	:host([variant="accent"]) {
		--_background-color: var(--components-badge-accent-background-color);
		--_content-color: var(--components-badge-accent-content-color);
	}

	:host([variant="neutral"]) {
		--_background-color: var(--components-badge-neutral-background-color);
		--_content-color: var(--components-badge-neutral-content-color);
	}

	:host([variant="warning"]) {
		--_background-color: var(--components-badge-warning-background-color);
		--_content-color: var(--components-badge-warning-content-color);
	}

	:host([variant="success"]) {
		--_background-color: var(--components-badge-success-background-color);
		--_content-color: var(--components-badge-success-content-color);
	}


	/* # Block */

	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		min-width: var(--_height);
		height: var(--_height);
		padding: 0 var(--_inline-padding);
		gap: var(--_gap);
		background-color: var(--_background-color);
		color: var(--_content-color);
		border-radius: var(--components-badge-corner-radius);
		white-space: nowrap;
		font: var(--_font);
	}

	.badge--dot {
		min-width: var(--_dot-size);
		width: var(--_dot-size);
		height: var(--_dot-size);
		padding: 0;
	}

	.badge--icon-only {
		min-width: var(--_height);
		width: var(--_height);
		padding: 0;
	}


	/* # Icon */

	.badge__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: var(--_icon-size);
		height: var(--_icon-size);
	}

	.badge__icon:has(+ .badge__text) {
		margin-left: calc((var(--_height) - var(--_icon-size)) / 2 - var(--_inline-padding) + var(--_icon-offset-correction));
	}

	.badge__icon nldd-icon {
		width: 100%;
		height: 100%;
	}


	/* # Text */

	.badge__text {
		display: inline-block;
	}


	/* # Toegankelijkheid */

	@media (forced-colors: active) {
		.badge {
			border: 1px solid CanvasText;
			background-color: Canvas;
			color: CanvasText;
		}
	}
`;
