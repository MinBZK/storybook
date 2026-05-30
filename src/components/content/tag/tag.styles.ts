import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const tagStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--components-tag-md-corner-radius);
		--_background-color: var(--components-tag-neutral-background-color);
		--_min-height: var(--primitives-space-24);
		--_inline-padding: var(--primitives-space-6);
		--_gap: var(--primitives-space-3);
		--_content-color: var(--components-tag-neutral-content-color);
		--_font: var(--primitives-font-body-sm-bold-flat);
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
		--_font: var(--primitives-font-body-xs-bold-flat);
		--_icon-size: var(--primitives-space-14);
	}

	/* ## Color */

	:host([color="accent"]) {
		--_background-color: var(--components-tag-accent-background-color);
		--_content-color: var(--components-tag-accent-content-color);
	}

	:host([color="success"]) {
		--_background-color: var(--components-tag-success-background-color);
		--_content-color: var(--components-tag-success-content-color);
	}

	:host([color="warning"]) {
		--_background-color: var(--components-tag-warning-background-color);
		--_content-color: var(--components-tag-warning-content-color);
	}

	:host([color="critical"]) {
		--_background-color: var(--components-tag-critical-background-color);
		--_content-color: var(--components-tag-critical-content-color);
	}

	/* ### Rijkskleuren */

	:host([color="coolgray"]) {
		--_background-color: var(--components-tag-coolgray-background-color);
		--_content-color: var(--components-tag-coolgray-content-color);
	}

	:host([color="lintblauw"]) {
		--_background-color: var(--components-tag-lintblauw-background-color);
		--_content-color: var(--components-tag-lintblauw-content-color);
	}

	:host([color="donkerblauw"]) {
		--_background-color: var(--components-tag-donkerblauw-background-color);
		--_content-color: var(--components-tag-donkerblauw-content-color);
	}

	:host([color="hemelblauw"]) {
		--_background-color: var(--components-tag-hemelblauw-background-color);
		--_content-color: var(--components-tag-hemelblauw-content-color);
	}

	:host([color="lichtblauw"]) {
		--_background-color: var(--components-tag-lichtblauw-background-color);
		--_content-color: var(--components-tag-lichtblauw-content-color);
	}

	:host([color="paars"]) {
		--_background-color: var(--components-tag-paars-background-color);
		--_content-color: var(--components-tag-paars-content-color);
	}

	:host([color="violet"]) {
		--_background-color: var(--components-tag-violet-background-color);
		--_content-color: var(--components-tag-violet-content-color);
	}

	:host([color="robijnrood"]) {
		--_background-color: var(--components-tag-robijnrood-background-color);
		--_content-color: var(--components-tag-robijnrood-content-color);
	}

	:host([color="roze"]) {
		--_background-color: var(--components-tag-roze-background-color);
		--_content-color: var(--components-tag-roze-content-color);
	}

	:host([color="rood"]) {
		--_background-color: var(--components-tag-rood-background-color);
		--_content-color: var(--components-tag-rood-content-color);
	}

	:host([color="oranje"]) {
		--_background-color: var(--components-tag-oranje-background-color);
		--_content-color: var(--components-tag-oranje-content-color);
	}

	:host([color="donkergeel"]) {
		--_background-color: var(--components-tag-donkergeel-background-color);
		--_content-color: var(--components-tag-donkergeel-content-color);
	}

	:host([color="geel"]) {
		--_background-color: var(--components-tag-geel-background-color);
		--_content-color: var(--components-tag-geel-content-color);
	}

	:host([color="donkerbruin"]) {
		--_background-color: var(--components-tag-donkerbruin-background-color);
		--_content-color: var(--components-tag-donkerbruin-content-color);
	}

	:host([color="bruin"]) {
		--_background-color: var(--components-tag-bruin-background-color);
		--_content-color: var(--components-tag-bruin-content-color);
	}

	:host([color="donkergroen"]) {
		--_background-color: var(--components-tag-donkergroen-background-color);
		--_content-color: var(--components-tag-donkergroen-content-color);
	}

	:host([color="groen"]) {
		--_background-color: var(--components-tag-groen-background-color);
		--_content-color: var(--components-tag-groen-content-color);
	}

	:host([color="mosgroen"]) {
		--_background-color: var(--components-tag-mosgroen-background-color);
		--_content-color: var(--components-tag-mosgroen-content-color);
	}

	:host([color="mintgroen"]) {
		--_background-color: var(--components-tag-mintgroen-background-color);
		--_content-color: var(--components-tag-mintgroen-content-color);
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
