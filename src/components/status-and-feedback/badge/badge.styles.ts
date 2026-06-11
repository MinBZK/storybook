import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const badgeStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--components-badge-critical-background-color);
		--_border-color: var(--components-badge-critical-border-color);
		--_border-width: var(--components-badge-border-width);
		--_height: var(--primitives-space-20);
		--_inline-padding: var(--primitives-space-6);
		--_gap: var(--primitives-space-3);
		--_content-color: var(--components-badge-critical-content-color);
		--_font: var(--primitives-font-body-xs-medium-flat);
		--_dot-size: var(--primitives-space-10);
		--_icon-size: var(--primitives-space-14);
		--_icon-offset-correction: var(--primitives-space-1);

		${inheritedTextReset}
		display: inline-flex;
		vertical-align: middle;
	}

	:host([size="sm"]) {
		--_height: var(--primitives-space-16);
		--_inline-padding: var(--primitives-space-4);
		--_gap: var(--primitives-space-2);
		--_font: var(--primitives-font-body-xxs-medium-flat);
		--_dot-size: var(--primitives-space-6);
		--_icon-size: var(--primitives-space-12);
	}

	/* ## Color */

	:host([color="accent"]) {
		--_background-color: var(--components-badge-accent-background-color);
		--_border-color: var(--components-badge-accent-border-color);
		--_content-color: var(--components-badge-accent-content-color);
	}

	:host([color="neutral"]) {
		--_background-color: var(--components-badge-neutral-background-color);
		--_border-color: var(--components-badge-neutral-border-color);
		--_content-color: var(--components-badge-neutral-content-color);
	}

	:host([color="warning"]) {
		--_background-color: var(--components-badge-warning-background-color);
		--_border-color: var(--components-badge-warning-border-color);
		--_content-color: var(--components-badge-warning-content-color);
	}

	:host([color="success"]) {
		--_background-color: var(--components-badge-success-background-color);
		--_border-color: var(--components-badge-success-border-color);
		--_content-color: var(--components-badge-success-content-color);
	}


	/* ## Color — rijkskleuren */

	:host([color="lintblauw"]) {
		--_background-color: var(--components-badge-lintblauw-background-color);
		--_border-color: var(--components-badge-lintblauw-border-color);
		--_content-color: var(--components-badge-lintblauw-content-color);
	}

	:host([color="donkerblauw"]) {
		--_background-color: var(--components-badge-donkerblauw-background-color);
		--_border-color: var(--components-badge-donkerblauw-border-color);
		--_content-color: var(--components-badge-donkerblauw-content-color);
	}

	:host([color="hemelblauw"]) {
		--_background-color: var(--components-badge-hemelblauw-background-color);
		--_border-color: var(--components-badge-hemelblauw-border-color);
		--_content-color: var(--components-badge-hemelblauw-content-color);
	}

	:host([color="lichtblauw"]) {
		--_background-color: var(--components-badge-lichtblauw-background-color);
		--_border-color: var(--components-badge-lichtblauw-border-color);
		--_content-color: var(--components-badge-lichtblauw-content-color);
	}

	:host([color="paars"]) {
		--_background-color: var(--components-badge-paars-background-color);
		--_border-color: var(--components-badge-paars-border-color);
		--_content-color: var(--components-badge-paars-content-color);
	}

	:host([color="violet"]) {
		--_background-color: var(--components-badge-violet-background-color);
		--_border-color: var(--components-badge-violet-border-color);
		--_content-color: var(--components-badge-violet-content-color);
	}

	:host([color="robijnrood"]) {
		--_background-color: var(--components-badge-robijnrood-background-color);
		--_border-color: var(--components-badge-robijnrood-border-color);
		--_content-color: var(--components-badge-robijnrood-content-color);
	}

	:host([color="roze"]) {
		--_background-color: var(--components-badge-roze-background-color);
		--_border-color: var(--components-badge-roze-border-color);
		--_content-color: var(--components-badge-roze-content-color);
	}

	:host([color="rood"]) {
		--_background-color: var(--components-badge-rood-background-color);
		--_border-color: var(--components-badge-rood-border-color);
		--_content-color: var(--components-badge-rood-content-color);
	}

	:host([color="oranje"]) {
		--_background-color: var(--components-badge-oranje-background-color);
		--_border-color: var(--components-badge-oranje-border-color);
		--_content-color: var(--components-badge-oranje-content-color);
	}

	:host([color="donkergeel"]) {
		--_background-color: var(--components-badge-donkergeel-background-color);
		--_border-color: var(--components-badge-donkergeel-border-color);
		--_content-color: var(--components-badge-donkergeel-content-color);
	}

	:host([color="geel"]) {
		--_background-color: var(--components-badge-geel-background-color);
		--_border-color: var(--components-badge-geel-border-color);
		--_content-color: var(--components-badge-geel-content-color);
	}

	:host([color="donkerbruin"]) {
		--_background-color: var(--components-badge-donkerbruin-background-color);
		--_border-color: var(--components-badge-donkerbruin-border-color);
		--_content-color: var(--components-badge-donkerbruin-content-color);
	}

	:host([color="bruin"]) {
		--_background-color: var(--components-badge-bruin-background-color);
		--_border-color: var(--components-badge-bruin-border-color);
		--_content-color: var(--components-badge-bruin-content-color);
	}

	:host([color="donkergroen"]) {
		--_background-color: var(--components-badge-donkergroen-background-color);
		--_border-color: var(--components-badge-donkergroen-border-color);
		--_content-color: var(--components-badge-donkergroen-content-color);
	}

	:host([color="groen"]) {
		--_background-color: var(--components-badge-groen-background-color);
		--_border-color: var(--components-badge-groen-border-color);
		--_content-color: var(--components-badge-groen-content-color);
	}

	:host([color="mosgroen"]) {
		--_background-color: var(--components-badge-mosgroen-background-color);
		--_border-color: var(--components-badge-mosgroen-border-color);
		--_content-color: var(--components-badge-mosgroen-content-color);
	}

	:host([color="mintgroen"]) {
		--_background-color: var(--components-badge-mintgroen-background-color);
		--_border-color: var(--components-badge-mintgroen-border-color);
		--_content-color: var(--components-badge-mintgroen-content-color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.badge {
		box-sizing: border-box;
		display: inline-flex;
		border-radius: var(--components-badge-corner-radius);
		box-shadow:
			0 0 0 1px var(--context-parent-background-color, var(--semantics-surfaces-base-background-color)),
			inset 0 0 0 var(--_border-width) var(--_border-color);
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
