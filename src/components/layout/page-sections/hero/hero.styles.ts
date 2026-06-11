import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.js';
import { inheritedTextReset, slottedReset } from '../../../../assets/styles/slotted-reset.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const heroStyles = css`


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
		/* Rijkshuisstijl shape language: the corner radius derives from the
		   ribbon width — 1.5X on small containers, 2X on md/lg, and the panel
		   corner at half the media radius so text clears the curve. Never
		   animated. */
		--_corner-radius: calc(var(--semantics-brand-ribbon-sm-width) * 1.5);
		--_main-width: 50%;
		--_main-background-color: var(--semantics-categories-filled-accent-background-color);
		--_main-content-color: var(--semantics-categories-filled-accent-content-color);
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
		--_main-background-color: var(--semantics-categories-filled-lintblauw-background-color);
		--_main-content-color: var(--semantics-categories-filled-lintblauw-content-color);
	}

	:host([main-background="donkerblauw"]) {
		--_main-background-color: var(--semantics-categories-filled-donkerblauw-background-color);
		--_main-content-color: var(--semantics-categories-filled-donkerblauw-content-color);
	}

	:host([main-background="hemelblauw"]) {
		--_main-background-color: var(--semantics-categories-filled-hemelblauw-background-color);
		--_main-content-color: var(--semantics-categories-filled-hemelblauw-content-color);
	}

	:host([main-background="lichtblauw"]) {
		--_main-background-color: var(--semantics-categories-filled-lichtblauw-background-color);
		--_main-content-color: var(--semantics-categories-filled-lichtblauw-content-color);
	}

	:host([main-background="paars"]) {
		--_main-background-color: var(--semantics-categories-filled-paars-background-color);
		--_main-content-color: var(--semantics-categories-filled-paars-content-color);
	}

	:host([main-background="violet"]) {
		--_main-background-color: var(--semantics-categories-filled-violet-background-color);
		--_main-content-color: var(--semantics-categories-filled-violet-content-color);
	}

	:host([main-background="robijnrood"]) {
		--_main-background-color: var(--semantics-categories-filled-robijnrood-background-color);
		--_main-content-color: var(--semantics-categories-filled-robijnrood-content-color);
	}

	:host([main-background="roze"]) {
		--_main-background-color: var(--semantics-categories-filled-roze-background-color);
		--_main-content-color: var(--semantics-categories-filled-roze-content-color);
	}

	:host([main-background="rood"]) {
		--_main-background-color: var(--semantics-categories-filled-rood-background-color);
		--_main-content-color: var(--semantics-categories-filled-rood-content-color);
	}

	:host([main-background="oranje"]) {
		--_main-background-color: var(--semantics-categories-filled-oranje-background-color);
		--_main-content-color: var(--semantics-categories-filled-oranje-content-color);
	}

	:host([main-background="donkergeel"]) {
		--_main-background-color: var(--semantics-categories-filled-donkergeel-background-color);
		--_main-content-color: var(--semantics-categories-filled-donkergeel-content-color);
	}


	/* # Block */

	.hero {
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: column;
		flex-grow: 1;
		align-items: center;

		/* The responsive overrides live here, not on :host — a container
		   query inside :host would match an ancestor container, while these
		   must query the host's own inline size. The derived panel radius is
		   also declared here (not on :host): a custom property resolves its
		   var() on the declaring element, so it must sit below the
		   breakpoint overrides to track them. */
		--_main-corner-radius: calc(var(--_corner-radius) / 2);

		@container (max-width: ${smMax}) {
			/* Full-bleed on mobile: drop the section gutters so the media
			   reaches the viewport edges. The panel keeps its own text
			   padding for legibility. */
			padding-inline: 0;
			padding-top: var(--_sm-padding-top, var(--_padding-top, var(--semantics-page-sections-sm-margin-block)));
			padding-bottom: var(--_sm-padding-bottom, var(--_padding-bottom, var(--semantics-page-sections-sm-margin-block)));
		}

		@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_corner-radius: calc(var(--semantics-brand-ribbon-md-width) * 2);
			--_main-padding: var(--primitives-space-24);
			padding-inline: var(--semantics-page-sections-md-margin-inline);
			padding-top: var(--_md-padding-top, var(--_padding-top, var(--semantics-page-sections-md-margin-block)));
			padding-bottom: var(--_md-padding-bottom, var(--_padding-bottom, var(--semantics-page-sections-md-margin-block)));
		}

		@container (min-width: ${lgMin}) {
			--_corner-radius: calc(var(--semantics-brand-ribbon-lg-width) * 2);
			--_main-padding: var(--primitives-space-32);
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
			padding-top: var(--_lg-padding-top, var(--_padding-top, var(--semantics-page-sections-lg-margin-block)));
			padding-bottom: var(--_lg-padding-bottom, var(--_padding-bottom, var(--semantics-page-sections-lg-margin-block)));
		}
	}


	/* # Body
	   The shape element: width-constrained to the section measure, with one
	   rounded corner, the media behind and the main panel placed in the
	   single grid cell.

	   No overflow clipping here: that would zero the grid's automatic
	   content minimum and stop the hero from growing with the panel. The
	   background rounds with the border-radius by itself; the media clips
	   itself. Painted in the panel color so subpixel seams between the media
	   and the panel (fractional aspect-ratio heights) never show through as
	   a light hairline. */

	.hero__body {
		display: grid;
		position: relative;
		background-color: var(--_main-background-color);
		width: 100%;
		max-width: var(--_max-width);
		flex-grow: 1;
		grid-template-columns: 100%;
	}

	/* Without media a base-colored shape would be invisible on the base
	   surface; border the sides that meet the rounded corner, like
	   blockquote does. */
	:host(:not([data-has-media])[main-background="base"][data-media-corner="top-left"]) .hero__body {
		border-top: var(--primitives-border-width-regular) solid var(--semantics-content-color);
		border-left: var(--primitives-border-width-regular) solid var(--semantics-content-color);
	}

	:host(:not([data-has-media])[main-background="base"][data-media-corner="top-right"]) .hero__body {
		border-top: var(--primitives-border-width-regular) solid var(--semantics-content-color);
		border-right: var(--primitives-border-width-regular) solid var(--semantics-content-color);
	}

	:host(:not([data-has-media])[main-background="base"][data-media-corner="bottom-left"]) .hero__body {
		border-bottom: var(--primitives-border-width-regular) solid var(--semantics-content-color);
		border-left: var(--primitives-border-width-regular) solid var(--semantics-content-color);
	}

	:host(:not([data-has-media])[main-background="base"][data-media-corner="bottom-right"]) .hero__body {
		border-bottom: var(--primitives-border-width-regular) solid var(--semantics-content-color);
		border-right: var(--primitives-border-width-regular) solid var(--semantics-content-color);
	}

	/* A ghost cell sets the body's minimum height from the aspect ratio
	   without forcing it: the panel shares the same grid cell, so a taller
	   panel grows the row past this floor. Putting the ratio on a ghost
	   (instead of aspect-ratio on the body) keeps growth content-driven
	   rather than rigidly tied to the width. align-self: start stops the
	   stretch fit from cancelling the ratio. */
	:host([data-has-media]) .hero__body::before {
		@container (min-width: ${mdMin}) {
			content: '';
			aspect-ratio: 21 / 9;
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

	:host([data-media-corner="top-left"]) .hero__body {
		border-top-left-radius: var(--_corner-radius);
	}

	:host([data-media-corner="top-right"]) .hero__body {
		border-top-right-radius: var(--_corner-radius);
	}

	:host([data-media-corner="bottom-left"]) .hero__body {
		border-bottom-left-radius: var(--_corner-radius);
	}

	:host([data-media-corner="bottom-right"]) .hero__body {
		border-bottom-right-radius: var(--_corner-radius);
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
		border-radius: inherit;
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

	/* Without media the big corner radius sits on the panel itself; give the
	   corner-adjacent inline side extra room so content clears the curve. */
	:host(:not([data-has-media]):is([data-media-corner="top-left"], [data-media-corner="bottom-left"])) .hero__main {
		padding-left: calc(var(--_main-padding) + var(--_corner-radius) / 2);
	}

	:host(:not([data-has-media]):is([data-media-corner="top-right"], [data-media-corner="bottom-right"])) .hero__main {
		padding-right: calc(var(--_main-padding) + var(--_corner-radius) / 2);
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

	/* A grown corner panel keeps at least the corner-radius height of media
	   visible on its media-facing side, so the rounded corner never gets
	   squeezed out. Only relevant in the overlay layout (md and up). */
	:host([data-has-media]:not([data-main-corner="none"]):is([main-position="bottom-left"], [main-position="bottom-right"])) .hero__main {
		@container (min-width: ${mdMin}) {
			margin-top: var(--_corner-radius);
		}
	}

	:host([data-has-media]:not([data-main-corner="none"]):is([main-position="top-left"], [main-position="top-right"])) .hero__main {
		@container (min-width: ${mdMin}) {
			margin-bottom: var(--_corner-radius);
		}
	}

	:host([data-main-corner="top-left"]) .hero__main {
		border-top-left-radius: var(--_main-corner-radius);
	}

	:host([data-main-corner="top-right"]) .hero__main {
		border-top-right-radius: var(--_main-corner-radius);
	}

	:host([data-main-corner="bottom-left"]) .hero__main {
		border-bottom-left-radius: var(--_main-corner-radius);
	}

	:host([data-main-corner="bottom-right"]) .hero__main {
		border-bottom-right-radius: var(--_main-corner-radius);
	}

	@media (forced-colors: active) {
		.hero__main {
			border: var(--primitives-border-width-thin) solid CanvasText;
		}
	}


	/* # Mobile
	   Small containers stack the body: media on top (or below for the
	   top positions), the panel full width and cornerless; the body's
	   rounded corner moves to the media so the panel reads as a plain
	   surface. Placed after the corner rules so the equal-specificity
	   zero-out wins on source order. */

	@container (max-width: ${smMax}) {
		.hero__body {
			display: flex;
			flex-direction: column;
		}

		:host(:is([main-position="top-left"], [main-position="top-right"])) .hero__body {
			flex-direction: column-reverse;
		}

		:host([data-media-corner]) .hero__body {
			border-radius: 0;
		}

		.hero__media {
			position: static;
			overflow: hidden;
			aspect-ratio: 21 / 9;
		}

		/* On mobile the rounded corner always sits at the top: a bottom
		   corner flips to its top counterpart, also when the consumer set
		   one explicitly. The radius goes on the body so its painted
		   background rounds along; the media inherits it. */
		:host(:is([data-media-corner="top-left"], [data-media-corner="bottom-left"])) .hero__body {
			border-top-left-radius: var(--_corner-radius);
		}

		:host(:is([data-media-corner="top-right"], [data-media-corner="bottom-right"])) .hero__body {
			border-top-right-radius: var(--_corner-radius);
		}

		:host([data-main-corner]) .hero__main {
			border-radius: 0;
		}

		.hero__main {
			width: 100%;
		}
	}
`;
