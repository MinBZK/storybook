import { css } from 'lit';

export const badgeStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--components-badge-critical-background-color);
		--_height: var(--primitives-space-20);
		--_inline-padding: var(--primitives-space-6);
		--_gap: var(--primitives-space-3);
		--_content-color: var(--components-badge-critical-content-color);
		--_font: var(--primitives-font-body-xs-bold-flat);
		--_dot-size: var(--primitives-space-10);
		--_icon-size: var(--primitives-space-14);
		--_icon-offset-correction: var(--primitives-space-1);

		display: inline-flex;
		vertical-align: middle;
	}

	:host([size="sm"]) {
		--_height: var(--primitives-space-16);
		--_inline-padding: var(--primitives-space-4);
		--_gap: var(--primitives-space-2);
		--_font: var(--primitives-font-body-xxs-bold-flat);
		--_dot-size: var(--primitives-space-6);
		--_icon-size: var(--primitives-space-12);
	}

	/* ## Color */

	:host([color="accent"]) {
		--_background-color: var(--components-badge-accent-background-color);
		--_content-color: var(--components-badge-accent-content-color);
	}

	:host([color="neutral"]) {
		--_background-color: var(--components-badge-neutral-background-color);
		--_content-color: var(--components-badge-neutral-content-color);
	}

	:host([color="warning"]) {
		--_background-color: var(--components-badge-warning-background-color);
		--_content-color: var(--components-badge-warning-content-color);
	}

	:host([color="success"]) {
		--_background-color: var(--components-badge-success-background-color);
		--_content-color: var(--components-badge-success-content-color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.badge {
		box-sizing: border-box;
		display: inline-flex;
		border-radius: var(--components-badge-corner-radius);
		box-shadow: 0 0 0 1px var(--context-parent-background-color, var(--semantics-surfaces-background-color));
		background-color: var(--_background-color);
		min-width: var(--_height);
		height: var(--_height);
		padding: 0 var(--_inline-padding);
		gap: var(--_gap);
		align-items: center;
		justify-content: center;
		color: var(--_content-color);
		font: var(--_font);
		white-space: nowrap;
	}

	@media (forced-colors: active) {
		.badge {
			border: 1px solid CanvasText;
			background-color: Canvas;
			color: CanvasText;
		}
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


	/* # Elements */

	.badge__icon {
		display: inline-flex;
		width: var(--_icon-size);
		height: var(--_icon-size);
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	.badge__icon:has(+ .badge__text) {
		margin-left: calc((var(--_height) - var(--_icon-size)) / 2 - var(--_inline-padding) + var(--_icon-offset-correction));
	}

	.badge__icon nldd-icon {
		width: 100%;
		height: 100%;
	}

	.badge__text {
		display: inline-block;
	}
`;
