import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const tagStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--components-tag-md-corner-radius);
		--_background-color: var(--semantics-categories-neutral-tinted-background-color);
		--_min-height: var(--primitives-space-24);
		--_inline-padding: var(--primitives-space-6);
		--_gap: var(--primitives-space-3);
		--_content-color: var(--semantics-categories-neutral-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-neutral-tinted-highlight-border-color);
		--_border-width: var(--primitives-border-width-thin);
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
		--_background-color: var(--semantics-categories-accent-tinted-background-color);
		--_content-color: var(--semantics-categories-accent-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-accent-tinted-highlight-border-color);
	}

	:host([color="success"]) {
		--_background-color: var(--semantics-categories-success-tinted-background-color);
		--_content-color: var(--semantics-categories-success-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-success-tinted-highlight-border-color);
	}

	:host([color="warning"]) {
		--_background-color: var(--semantics-categories-warning-tinted-background-color);
		--_content-color: var(--semantics-categories-warning-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-warning-tinted-highlight-border-color);
	}

	:host([color="critical"]) {
		--_background-color: var(--semantics-categories-critical-tinted-background-color);
		--_content-color: var(--semantics-categories-critical-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-critical-tinted-highlight-border-color);
	}

	/* ### Rijkskleuren */

	:host([color="lintblauw"]) {
		--_background-color: var(--semantics-categories-lintblauw-tinted-background-color);
		--_content-color: var(--semantics-categories-lintblauw-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-lintblauw-tinted-highlight-border-color);
	}

	:host([color="donkerblauw"]) {
		--_background-color: var(--semantics-categories-donkerblauw-tinted-background-color);
		--_content-color: var(--semantics-categories-donkerblauw-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-donkerblauw-tinted-highlight-border-color);
	}

	:host([color="hemelblauw"]) {
		--_background-color: var(--semantics-categories-hemelblauw-tinted-background-color);
		--_content-color: var(--semantics-categories-hemelblauw-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-hemelblauw-tinted-highlight-border-color);
	}

	:host([color="lichtblauw"]) {
		--_background-color: var(--semantics-categories-lichtblauw-tinted-background-color);
		--_content-color: var(--semantics-categories-lichtblauw-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-lichtblauw-tinted-highlight-border-color);
	}

	:host([color="paars"]) {
		--_background-color: var(--semantics-categories-paars-tinted-background-color);
		--_content-color: var(--semantics-categories-paars-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-paars-tinted-highlight-border-color);
	}

	:host([color="violet"]) {
		--_background-color: var(--semantics-categories-violet-tinted-background-color);
		--_content-color: var(--semantics-categories-violet-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-violet-tinted-highlight-border-color);
	}

	:host([color="robijnrood"]) {
		--_background-color: var(--semantics-categories-robijnrood-tinted-background-color);
		--_content-color: var(--semantics-categories-robijnrood-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-robijnrood-tinted-highlight-border-color);
	}

	:host([color="roze"]) {
		--_background-color: var(--semantics-categories-roze-tinted-background-color);
		--_content-color: var(--semantics-categories-roze-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-roze-tinted-highlight-border-color);
	}

	:host([color="rood"]) {
		--_background-color: var(--semantics-categories-rood-tinted-background-color);
		--_content-color: var(--semantics-categories-rood-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-rood-tinted-highlight-border-color);
	}

	:host([color="oranje"]) {
		--_background-color: var(--semantics-categories-oranje-tinted-background-color);
		--_content-color: var(--semantics-categories-oranje-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-oranje-tinted-highlight-border-color);
	}

	:host([color="donkergeel"]) {
		--_background-color: var(--semantics-categories-donkergeel-tinted-background-color);
		--_content-color: var(--semantics-categories-donkergeel-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-donkergeel-tinted-highlight-border-color);
	}

	:host([color="geel"]) {
		--_background-color: var(--semantics-categories-geel-tinted-background-color);
		--_content-color: var(--semantics-categories-geel-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-geel-tinted-highlight-border-color);
	}

	:host([color="donkerbruin"]) {
		--_background-color: var(--semantics-categories-donkerbruin-tinted-background-color);
		--_content-color: var(--semantics-categories-donkerbruin-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-donkerbruin-tinted-highlight-border-color);
	}

	:host([color="bruin"]) {
		--_background-color: var(--semantics-categories-bruin-tinted-background-color);
		--_content-color: var(--semantics-categories-bruin-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-bruin-tinted-highlight-border-color);
	}

	:host([color="donkergroen"]) {
		--_background-color: var(--semantics-categories-donkergroen-tinted-background-color);
		--_content-color: var(--semantics-categories-donkergroen-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-donkergroen-tinted-highlight-border-color);
	}

	:host([color="groen"]) {
		--_background-color: var(--semantics-categories-groen-tinted-background-color);
		--_content-color: var(--semantics-categories-groen-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-groen-tinted-highlight-border-color);
	}

	:host([color="mosgroen"]) {
		--_background-color: var(--semantics-categories-mosgroen-tinted-background-color);
		--_content-color: var(--semantics-categories-mosgroen-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-mosgroen-tinted-highlight-border-color);
	}

	:host([color="mintgroen"]) {
		--_background-color: var(--semantics-categories-mintgroen-tinted-background-color);
		--_content-color: var(--semantics-categories-mintgroen-tinted-primary-content-color);
		--_border-color: var(--semantics-categories-mintgroen-tinted-highlight-border-color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.tag {
		box-sizing: border-box;
		display: inline-flex;
		border-radius: var(--_corner-radius);
		/* Inset box-shadow rather than a border so the outline never adds to
		   the tag's size or shifts the text. */
		box-shadow: inset 0 0 0 var(--_border-width) var(--_border-color);
		background-color: var(--_background-color);
		min-height: var(--_min-height);
		padding: 0 var(--_inline-padding);
		gap: var(--_gap);
		align-items: center;
		color: var(--_content-color);
		font: var(--_font);
		white-space: nowrap;
	}

	@media (forced-colors: active) {
		.tag {
			border: 1px solid CanvasText;
			background-color: Canvas;
			color: CanvasText;
		}
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
