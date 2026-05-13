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


	/* ### Rijkskleuren */

	:host([variant="coolgray"]) {
		--_background-color: var(--components-tag-coolgray-background-color);
		--_content-color: var(--components-tag-coolgray-content-color);
	}

	:host([variant="lintblauw"]) {
		--_background-color: var(--components-tag-lintblauw-background-color);
		--_content-color: var(--components-tag-lintblauw-content-color);
	}

	:host([variant="donkerblauw"]) {
		--_background-color: var(--components-tag-donkerblauw-background-color);
		--_content-color: var(--components-tag-donkerblauw-content-color);
	}

	:host([variant="hemelblauw"]) {
		--_background-color: var(--components-tag-hemelblauw-background-color);
		--_content-color: var(--components-tag-hemelblauw-content-color);
	}

	:host([variant="lichtblauw"]) {
		--_background-color: var(--components-tag-lichtblauw-background-color);
		--_content-color: var(--components-tag-lichtblauw-content-color);
	}

	:host([variant="paars"]) {
		--_background-color: var(--components-tag-paars-background-color);
		--_content-color: var(--components-tag-paars-content-color);
	}

	:host([variant="violet"]) {
		--_background-color: var(--components-tag-violet-background-color);
		--_content-color: var(--components-tag-violet-content-color);
	}

	:host([variant="robijnrood"]) {
		--_background-color: var(--components-tag-robijnrood-background-color);
		--_content-color: var(--components-tag-robijnrood-content-color);
	}

	:host([variant="roze"]) {
		--_background-color: var(--components-tag-roze-background-color);
		--_content-color: var(--components-tag-roze-content-color);
	}

	:host([variant="rood"]) {
		--_background-color: var(--components-tag-rood-background-color);
		--_content-color: var(--components-tag-rood-content-color);
	}

	:host([variant="oranje"]) {
		--_background-color: var(--components-tag-oranje-background-color);
		--_content-color: var(--components-tag-oranje-content-color);
	}

	:host([variant="donkergeel"]) {
		--_background-color: var(--components-tag-donkergeel-background-color);
		--_content-color: var(--components-tag-donkergeel-content-color);
	}

	:host([variant="geel"]) {
		--_background-color: var(--components-tag-geel-background-color);
		--_content-color: var(--components-tag-geel-content-color);
	}

	:host([variant="donkerbruin"]) {
		--_background-color: var(--components-tag-donkerbruin-background-color);
		--_content-color: var(--components-tag-donkerbruin-content-color);
	}

	:host([variant="bruin"]) {
		--_background-color: var(--components-tag-bruin-background-color);
		--_content-color: var(--components-tag-bruin-content-color);
	}

	:host([variant="donkergroen"]) {
		--_background-color: var(--components-tag-donkergroen-background-color);
		--_content-color: var(--components-tag-donkergroen-content-color);
	}

	:host([variant="groen"]) {
		--_background-color: var(--components-tag-groen-background-color);
		--_content-color: var(--components-tag-groen-content-color);
	}

	:host([variant="mosgroen"]) {
		--_background-color: var(--components-tag-mosgroen-background-color);
		--_content-color: var(--components-tag-mosgroen-content-color);
	}

	:host([variant="mintgroen"]) {
		--_background-color: var(--components-tag-mintgroen-background-color);
		--_content-color: var(--components-tag-mintgroen-content-color);
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
