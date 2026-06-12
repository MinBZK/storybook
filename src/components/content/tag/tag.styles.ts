import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const tagStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--components-tag-md-corner-radius);
		--_background-color: var(--semantics-categories-neutral-filled-background-color);
		--_min-height: var(--primitives-space-24);
		--_inline-padding: var(--primitives-space-6);
		--_gap: var(--primitives-space-3);
		--_content-color: var(--semantics-categories-neutral-filled-primary-content-color);
		--_font: var(--primitives-font-body-sm-medium-flat);
		--_icon-size: var(--primitives-space-16);
		--_icon-offset-correction: var(--primitives-space-1);

		${inheritedTextReset}
		display: inline-flex;
		vertical-align: middle;
	}

	:host([size="sm"]) {
		--_corner-radius: var(--components-tag-sm-corner-radius);
		--_min-height: var(--primitives-space-20);
		--_inline-padding: var(--primitives-space-4);
		--_gap: var(--primitives-space-2);
		--_font: var(--primitives-font-body-xs-medium-flat);
		--_icon-size: var(--primitives-space-14);
	}

	/* ## Color */

	:host([color="accent"]) {
		--_background-color: var(--semantics-categories-accent-filled-background-color);
		--_content-color: var(--semantics-categories-accent-filled-primary-content-color);
	}

	:host([color="success"]) {
		--_background-color: var(--semantics-categories-success-filled-background-color);
		--_content-color: var(--semantics-categories-success-filled-primary-content-color);
	}

	:host([color="warning"]) {
		--_background-color: var(--semantics-categories-warning-filled-background-color);
		--_content-color: var(--semantics-categories-warning-filled-primary-content-color);
	}

	:host([color="critical"]) {
		--_background-color: var(--semantics-categories-critical-filled-background-color);
		--_content-color: var(--semantics-categories-critical-filled-primary-content-color);
	}

	/* ### Rijkskleuren */

	:host([color="lintblauw"]) {
		--_background-color: var(--semantics-categories-lintblauw-filled-background-color);
		--_content-color: var(--semantics-categories-lintblauw-filled-primary-content-color);
	}

	:host([color="donkerblauw"]) {
		--_background-color: var(--semantics-categories-donkerblauw-filled-background-color);
		--_content-color: var(--semantics-categories-donkerblauw-filled-primary-content-color);
	}

	:host([color="hemelblauw"]) {
		--_background-color: var(--semantics-categories-hemelblauw-filled-background-color);
		--_content-color: var(--semantics-categories-hemelblauw-filled-primary-content-color);
	}

	:host([color="lichtblauw"]) {
		--_background-color: var(--semantics-categories-lichtblauw-filled-background-color);
		--_content-color: var(--semantics-categories-lichtblauw-filled-primary-content-color);
	}

	:host([color="paars"]) {
		--_background-color: var(--semantics-categories-paars-filled-background-color);
		--_content-color: var(--semantics-categories-paars-filled-primary-content-color);
	}

	:host([color="violet"]) {
		--_background-color: var(--semantics-categories-violet-filled-background-color);
		--_content-color: var(--semantics-categories-violet-filled-primary-content-color);
	}

	:host([color="robijnrood"]) {
		--_background-color: var(--semantics-categories-robijnrood-filled-background-color);
		--_content-color: var(--semantics-categories-robijnrood-filled-primary-content-color);
	}

	:host([color="roze"]) {
		--_background-color: var(--semantics-categories-roze-filled-background-color);
		--_content-color: var(--semantics-categories-roze-filled-primary-content-color);
	}

	:host([color="rood"]) {
		--_background-color: var(--semantics-categories-rood-filled-background-color);
		--_content-color: var(--semantics-categories-rood-filled-primary-content-color);
	}

	:host([color="oranje"]) {
		--_background-color: var(--semantics-categories-oranje-filled-background-color);
		--_content-color: var(--semantics-categories-oranje-filled-primary-content-color);
	}

	:host([color="donkergeel"]) {
		--_background-color: var(--semantics-categories-donkergeel-filled-background-color);
		--_content-color: var(--semantics-categories-donkergeel-filled-primary-content-color);
	}

	:host([color="geel"]) {
		--_background-color: var(--semantics-categories-geel-filled-background-color);
		--_content-color: var(--semantics-categories-geel-filled-primary-content-color);
	}

	:host([color="donkerbruin"]) {
		--_background-color: var(--semantics-categories-donkerbruin-filled-background-color);
		--_content-color: var(--semantics-categories-donkerbruin-filled-primary-content-color);
	}

	:host([color="bruin"]) {
		--_background-color: var(--semantics-categories-bruin-filled-background-color);
		--_content-color: var(--semantics-categories-bruin-filled-primary-content-color);
	}

	:host([color="donkergroen"]) {
		--_background-color: var(--semantics-categories-donkergroen-filled-background-color);
		--_content-color: var(--semantics-categories-donkergroen-filled-primary-content-color);
	}

	:host([color="groen"]) {
		--_background-color: var(--semantics-categories-groen-filled-background-color);
		--_content-color: var(--semantics-categories-groen-filled-primary-content-color);
	}

	:host([color="mosgroen"]) {
		--_background-color: var(--semantics-categories-mosgroen-filled-background-color);
		--_content-color: var(--semantics-categories-mosgroen-filled-primary-content-color);
	}

	:host([color="mintgroen"]) {
		--_background-color: var(--semantics-categories-mintgroen-filled-background-color);
		--_content-color: var(--semantics-categories-mintgroen-filled-primary-content-color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.tag {
		box-sizing: border-box;
		display: inline-flex;
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		min-height: var(--_min-height);
		padding: 0 var(--_inline-padding);
		gap: var(--_gap);
		align-items: center;
		color: var(--_content-color);
		font: var(--_font);
		white-space: nowrap;
	}


	/* # Elements */

	.tag__icon {
		display: inline-flex;
		margin-inline: calc((var(--_min-height) - var(--_icon-size)) / 2 - var(--_inline-padding));
		width: var(--_icon-size);
		height: var(--_icon-size);
		flex-shrink: 0;
		align-items: center;
	}

	.tag__icon:has(+ .tag__text) {
		margin-left: calc((var(--_min-height) - var(--_icon-size)) / 2 - var(--_inline-padding) + var(--_icon-offset-correction));
		margin-right: 0;
	}

	.tag__text {
		display: inline-block;
	}
`;
