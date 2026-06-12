import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const badgeStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--semantics-categories-critical-filled-background-color);
		--_border-color: var(--semantics-categories-critical-filled-highlight-border-color);
		--_border-width: var(--components-badge-border-width);
		--_height: var(--primitives-space-20);
		--_inline-padding: var(--primitives-space-6);
		--_gap: var(--primitives-space-3);
		--_content-color: var(--semantics-categories-critical-filled-primary-content-color);
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
		--_background-color: var(--semantics-categories-accent-filled-background-color);
		--_border-color: var(--semantics-categories-accent-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-accent-filled-primary-content-color);
	}

	:host([color="neutral"]) {
		--_background-color: var(--semantics-categories-neutral-filled-background-color);
		--_border-color: var(--semantics-categories-neutral-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-neutral-filled-primary-content-color);
	}

	:host([color="warning"]) {
		--_background-color: var(--semantics-categories-warning-filled-background-color);
		--_border-color: var(--semantics-categories-warning-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-warning-filled-primary-content-color);
	}

	:host([color="success"]) {
		--_background-color: var(--semantics-categories-success-filled-background-color);
		--_border-color: var(--semantics-categories-success-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-success-filled-primary-content-color);
	}


	/* ## Color — rijkskleuren */

	:host([color="lintblauw"]) {
		--_background-color: var(--semantics-categories-lintblauw-filled-background-color);
		--_border-color: var(--semantics-categories-lintblauw-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-lintblauw-filled-primary-content-color);
	}

	:host([color="donkerblauw"]) {
		--_background-color: var(--semantics-categories-donkerblauw-filled-background-color);
		--_border-color: var(--semantics-categories-donkerblauw-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-donkerblauw-filled-primary-content-color);
	}

	:host([color="hemelblauw"]) {
		--_background-color: var(--semantics-categories-hemelblauw-filled-background-color);
		--_border-color: var(--semantics-categories-hemelblauw-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-hemelblauw-filled-primary-content-color);
	}

	:host([color="lichtblauw"]) {
		--_background-color: var(--semantics-categories-lichtblauw-filled-background-color);
		--_border-color: var(--semantics-categories-lichtblauw-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-lichtblauw-filled-primary-content-color);
	}

	:host([color="paars"]) {
		--_background-color: var(--semantics-categories-paars-filled-background-color);
		--_border-color: var(--semantics-categories-paars-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-paars-filled-primary-content-color);
	}

	:host([color="violet"]) {
		--_background-color: var(--semantics-categories-violet-filled-background-color);
		--_border-color: var(--semantics-categories-violet-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-violet-filled-primary-content-color);
	}

	:host([color="robijnrood"]) {
		--_background-color: var(--semantics-categories-robijnrood-filled-background-color);
		--_border-color: var(--semantics-categories-robijnrood-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-robijnrood-filled-primary-content-color);
	}

	:host([color="roze"]) {
		--_background-color: var(--semantics-categories-roze-filled-background-color);
		--_border-color: var(--semantics-categories-roze-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-roze-filled-primary-content-color);
	}

	:host([color="rood"]) {
		--_background-color: var(--semantics-categories-rood-filled-background-color);
		--_border-color: var(--semantics-categories-rood-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-rood-filled-primary-content-color);
	}

	:host([color="oranje"]) {
		--_background-color: var(--semantics-categories-oranje-filled-background-color);
		--_border-color: var(--semantics-categories-oranje-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-oranje-filled-primary-content-color);
	}

	:host([color="donkergeel"]) {
		--_background-color: var(--semantics-categories-donkergeel-filled-background-color);
		--_border-color: var(--semantics-categories-donkergeel-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-donkergeel-filled-primary-content-color);
	}

	:host([color="geel"]) {
		--_background-color: var(--semantics-categories-geel-filled-background-color);
		--_border-color: var(--semantics-categories-geel-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-geel-filled-primary-content-color);
	}

	:host([color="donkerbruin"]) {
		--_background-color: var(--semantics-categories-donkerbruin-filled-background-color);
		--_border-color: var(--semantics-categories-donkerbruin-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-donkerbruin-filled-primary-content-color);
	}

	:host([color="bruin"]) {
		--_background-color: var(--semantics-categories-bruin-filled-background-color);
		--_border-color: var(--semantics-categories-bruin-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-bruin-filled-primary-content-color);
	}

	:host([color="donkergroen"]) {
		--_background-color: var(--semantics-categories-donkergroen-filled-background-color);
		--_border-color: var(--semantics-categories-donkergroen-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-donkergroen-filled-primary-content-color);
	}

	:host([color="groen"]) {
		--_background-color: var(--semantics-categories-groen-filled-background-color);
		--_border-color: var(--semantics-categories-groen-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-groen-filled-primary-content-color);
	}

	:host([color="mosgroen"]) {
		--_background-color: var(--semantics-categories-mosgroen-filled-background-color);
		--_border-color: var(--semantics-categories-mosgroen-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-mosgroen-filled-primary-content-color);
	}

	:host([color="mintgroen"]) {
		--_background-color: var(--semantics-categories-mintgroen-filled-background-color);
		--_border-color: var(--semantics-categories-mintgroen-filled-highlight-border-color);
		--_content-color: var(--semantics-categories-mintgroen-filled-primary-content-color);
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
