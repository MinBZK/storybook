import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.js';
import { inheritedTextReset, slottedReset } from '../../../../assets/styles/style-resets.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const heroStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		container-type: inline-size;
		/* Block-padding overrides from PageSectionMixin; 'initial' makes the
		   var() in .hero fall back to the responsive default until the mixin
		   sets a value inline on the host. */
		--_padding-top: initial;
		--_padding-bottom: initial;
		--_sm-padding-top: initial;
		--_sm-padding-bottom: initial;
		--_md-padding-top: initial;
		--_md-padding-bottom: initial;
		--_lg-padding-top: initial;
		--_lg-padding-bottom: initial;
		--_max-width: var(--semantics-page-sections-body-max-width);
		--_media-aspect-ratio: 21 / 9;
		--_main-width: 50%;
		--_main-background-color: var(--semantics-categories-accent-reference-background-color);
		--_main-content-color: var(--semantics-categories-accent-reference-primary-content-color);
		--_main-padding: var(--primitives-space-16);

		${inheritedTextReset}
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
	}

	:host([hidden]) {
		display: none;
	}

	:host(:last-child),
	:host(.is-last) {
		flex-grow: 1;
	}

	:host([width="full"]) {
		--_max-width: none;
	}

	:host([main-width="2/3"]) {
		--_main-width: 66.667%;
	}

	:host([main-width="3/4"]) {
		--_main-width: 75%;
	}

	:host([main-width="full"]) {
		--_main-width: 100%;
	}

	:host([main-background="base"]) {
		--_main-background-color: var(--semantics-surfaces-base-background-color);
		--_main-content-color: var(--semantics-content-color);
	}

	:host([main-background="lintblauw"]) {
		--_main-background-color: var(--semantics-categories-lintblauw-reference-background-color);
		--_main-content-color: var(--semantics-categories-lintblauw-reference-primary-content-color);
	}

	:host([main-background="donkerblauw"]) {
		--_main-background-color: var(--semantics-categories-donkerblauw-reference-background-color);
		--_main-content-color: var(--semantics-categories-donkerblauw-reference-primary-content-color);
	}

	:host([main-background="hemelblauw"]) {
		--_main-background-color: var(--semantics-categories-hemelblauw-reference-background-color);
		--_main-content-color: var(--semantics-categories-hemelblauw-reference-primary-content-color);
	}

	:host([main-background="lichtblauw"]) {
		--_main-background-color: var(--semantics-categories-lichtblauw-reference-background-color);
		--_main-content-color: var(--semantics-categories-lichtblauw-reference-primary-content-color);
	}

	:host([main-background="paars"]) {
		--_main-background-color: var(--semantics-categories-paars-reference-background-color);
		--_main-content-color: var(--semantics-categories-paars-reference-primary-content-color);
	}

	:host([main-background="violet"]) {
		--_main-background-color: var(--semantics-categories-violet-reference-background-color);
		--_main-content-color: var(--semantics-categories-violet-reference-primary-content-color);
	}

	:host([main-background="robijnrood"]) {
		--_main-background-color: var(--semantics-categories-robijnrood-reference-background-color);
		--_main-content-color: var(--semantics-categories-robijnrood-reference-primary-content-color);
	}

	:host([main-background="roze"]) {
		--_main-background-color: var(--semantics-categories-roze-reference-background-color);
		--_main-content-color: var(--semantics-categories-roze-reference-primary-content-color);
	}

	:host([main-background="rood"]) {
		--_main-background-color: var(--semantics-categories-rood-reference-background-color);
		--_main-content-color: var(--semantics-categories-rood-reference-primary-content-color);
	}

	:host([main-background="oranje"]) {
		--_main-background-color: var(--semantics-categories-oranje-reference-background-color);
		--_main-content-color: var(--semantics-categories-oranje-reference-primary-content-color);
	}

	:host([main-background="donkergeel"]) {
		--_main-background-color: var(--semantics-categories-donkergeel-reference-background-color);
		--_main-content-color: var(--semantics-categories-donkergeel-reference-primary-content-color);
	}

	:host([main-background="geel"]) {
		--_main-background-color: var(--semantics-categories-geel-reference-background-color);
		--_main-content-color: var(--semantics-categories-geel-reference-primary-content-color);
	}

	:host([main-background="donkerbruin"]) {
		--_main-background-color: var(--semantics-categories-donkerbruin-reference-background-color);
		--_main-content-color: var(--semantics-categories-donkerbruin-reference-primary-content-color);
	}

	:host([main-background="bruin"]) {
		--_main-background-color: var(--semantics-categories-bruin-reference-background-color);
		--_main-content-color: var(--semantics-categories-bruin-reference-primary-content-color);
	}

	:host([main-background="donkergroen"]) {
		--_main-background-color: var(--semantics-categories-donkergroen-reference-background-color);
		--_main-content-color: var(--semantics-categories-donkergroen-reference-primary-content-color);
	}

	:host([main-background="groen"]) {
		--_main-background-color: var(--semantics-categories-groen-reference-background-color);
		--_main-content-color: var(--semantics-categories-groen-reference-primary-content-color);
	}

	:host([main-background="mosgroen"]) {
		--_main-background-color: var(--semantics-categories-mosgroen-reference-background-color);
		--_main-content-color: var(--semantics-categories-mosgroen-reference-primary-content-color);
	}

	:host([main-background="mintgroen"]) {
		--_main-background-color: var(--semantics-categories-mintgroen-reference-background-color);
		--_main-content-color: var(--semantics-categories-mintgroen-reference-primary-content-color);
	}


	/* # Block */

	.hero {
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: column;
		flex-grow: 1;
		align-items: center;

		/* The responsive overrides live here, not on :host — a container query
		   inside :host would match an ancestor container, while these must query
		   the host's own inline size. */

		@container (max-width: ${smMax}) {
			padding-inline: var(--semantics-page-sections-sm-margin-inline);
			padding-top: var(--_sm-padding-top, var(--_padding-top, var(--semantics-page-sections-sm-margin-block)));
			padding-bottom: var(--_sm-padding-bottom, var(--_padding-bottom, var(--semantics-page-sections-sm-margin-block)));
		}

		@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_main-padding: var(--primitives-space-24);
			padding-inline: var(--semantics-page-sections-md-margin-inline);
			padding-top: var(--_md-padding-top, var(--_padding-top, var(--semantics-page-sections-md-margin-block)));
			padding-bottom: var(--_md-padding-bottom, var(--_padding-bottom, var(--semantics-page-sections-md-margin-block)));
		}

		@container (min-width: ${lgMin}) {
			--_main-padding: var(--primitives-space-32);
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
			padding-top: var(--_lg-padding-top, var(--_padding-top, var(--semantics-page-sections-lg-margin-block)));
			padding-bottom: var(--_lg-padding-bottom, var(--_padding-bottom, var(--semantics-page-sections-lg-margin-block)));
		}
	}


	/* # Body
	   No overflow clipping here: it would zero the grid's automatic content
	   minimum and stop the hero from growing with the panel. The background
	   is painted in the panel color so subpixel seams between the media and
	   the panel (fractional aspect-ratio heights) never show as a light
	   hairline. */

	.hero__body {
		display: grid;
		position: relative;
		background-color: var(--_main-background-color);
		width: 100%;
		max-width: var(--_max-width);
		flex-grow: 1;
		grid-template-columns: 100%;
	}

	/* Without media a base-colored panel would be invisible on the base surface;
	   give it a full border so the rectangle reads. */
	:host(:not([data-has-media])[main-background="base"]) .hero__body {
		border: var(--primitives-border-width-regular) solid var(--semantics-content-color);
	}

	/* A ghost cell sets the body's minimum height from the aspect ratio
	   without forcing it: the panel shares the same grid cell, so a taller
	   panel grows the row past this floor. Putting the ratio on a ghost
	   (instead of aspect-ratio on the body) keeps growth content-driven
	   rather than rigidly tied to the width. align-self: start stops the
	   stretch fit from cancelling the ratio. */
	:host([data-has-media]:not([main-width="full"])) .hero__body::before {
		@container (min-width: ${mdMin}) {
			content: '';
			aspect-ratio: var(--_media-aspect-ratio);
			grid-area: 1 / 1;
			align-self: start;
		}
	}

	/* Without media the full-bleed panel would paint square over the
	   body's rounded corner; clipping is safe here because there is no
	   aspect-ratio in this mode, so the content minimum still sizes the
	   body. */
	:host(:not([data-has-media])) .hero__body {
		overflow: hidden;
	}

	@media (forced-colors: active) {
		.hero__body {
			border: var(--primitives-border-width-thin) solid CanvasText;
		}
	}


	/* # Media */

	.hero__media {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.hero__media[hidden] {
		display: none;
	}

	.hero__media ::slotted(img) {
		${slottedReset}
		display: block !important;
		width: 100% !important;
		height: 100% !important;
		object-fit: cover !important;
	}

	.hero__media ::slotted(nldd-image) {
		display: block !important;
		width: 100% !important;
		height: 100% !important;
	}

	.hero__media img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}


	/* # Main */

	.hero__main {
		/* Cascade the panel color so descendants that key off the parent
		   background (inherit-filled buttons, badge rings) read this
		   surface. */
		--context-parent-background-color: var(--_main-background-color);

		box-sizing: border-box;
		display: flex;
		position: relative;
		grid-area: 1 / 1;
		align-self: end;
		justify-self: start;
		background-color: var(--_main-background-color);
		width: var(--_main-width);
		padding: var(--_main-padding);
		flex-direction: column;
		color: var(--_main-content-color);
	}

	:host(:not([data-has-media])) .hero__main {
		width: 100%;
	}

	:host([main-position="top-left"]) .hero__main {
		align-self: start;
	}

	:host([main-position="top-right"]) .hero__main {
		align-self: start;
		justify-self: end;
	}

	:host([main-position="bottom-right"]) .hero__main {
		justify-self: end;
	}

	:host([main-position="left"]) .hero__main {
		align-self: stretch;
	}

	:host([main-position="right"]) .hero__main {
		align-self: stretch;
		justify-self: end;
	}

	@media (forced-colors: active) {
		.hero__main {
			border: var(--primitives-border-width-thin) solid CanvasText;
		}
	}


	/* # Full-width strip (md+)
	   With main-width="full" the panel is a full top or bottom strip and the
	   media stacks on the opposite side instead of sitting behind it. Switch the
	   body to a column so the two blocks stack: a bottom panel keeps the media on
	   top, a top panel (column-reverse) drops it below. The media keeps the
	   overlay's 21/9 strip. Below sm every layout already stacks, so this only
	   targets md and up. */

	@container (min-width: ${mdMin}) {
		:host([data-has-media][main-width="full"]) .hero__body {
			display: flex;
			flex-direction: column;
		}

		:host([data-has-media][main-width="full"]:is([main-position="top-left"], [main-position="top-right"])) .hero__body {
			flex-direction: column-reverse;
		}

		:host([data-has-media][main-width="full"]) .hero__media {
			position: static;
			aspect-ratio: var(--_media-aspect-ratio);
		}
	}


	/* # Mobile — stack media over a full-width panel. */

	@container (max-width: ${smMax}) {
		.hero__body {
			display: flex;
			flex-direction: column;
		}

		:host(:is([main-position="top-left"], [main-position="top-right"])) .hero__body {
			flex-direction: column-reverse;
		}

		.hero__media {
			position: static;
			overflow: hidden;
			aspect-ratio: var(--_media-aspect-ratio);
		}

		.hero__main {
			width: 100%;
		}
	}
`;
