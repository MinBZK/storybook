import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const sidebarSectionStyles = css`


	/* # Host

	   Container queries on the section's OWN width (not the viewport): the row
	   <-> stacked switch and the padding follow the space the section is given.
	   The collapse-to-sheet is JS-driven — a ResizeObserver on the host sets
	   [collapsed] (see the .ts) — and only happens when the section is narrow AND
	   not [no-collapse]; the lg breakpoint (>= ${lgMin}) is the switch. */

	:host {
		container-type: inline-size;
		/* Block-padding overrides from PageSectionMixin; resolved per breakpoint
		   below (scope override -> base override -> responsive default). */
		--_padding-top: initial;
		--_padding-bottom: initial;
		--_sm-padding-top: initial;
		--_sm-padding-bottom: initial;
		--_md-padding-top: initial;
		--_md-padding-bottom: initial;
		--_lg-padding-top: initial;
		--_lg-padding-bottom: initial;
		--_max-width: var(--semantics-page-sections-body-max-width);
		/* Sticky insets default to 16px top and bottom; override via sticky-top /
		   sticky-bottom to clear other sticky page elements (e.g. a sticky header). */
		--_sticky-top: var(--primitives-space-16);
		--_sticky-bottom: var(--primitives-space-16);
		--_sidebar-width: var(--primitives-area-320);

		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
	}

	:host([hidden]) {
		display: none;
	}

	:host([width="full"]) {
		--_max-width: none;
	}


	/* # Block */

	.sidebar-section {
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;

		@container (max-width: ${smMax}) {
			padding-inline: var(--semantics-page-sections-sm-margin-inline);
			padding-top: var(--_sm-padding-top, var(--_padding-top, var(--semantics-page-sections-sm-margin-block)));
			padding-bottom: var(--_sm-padding-bottom, var(--_padding-bottom, var(--semantics-page-sections-sm-margin-block)));
		}

		@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
			padding-top: var(--_md-padding-top, var(--_padding-top, var(--semantics-page-sections-md-margin-block)));
			padding-bottom: var(--_md-padding-bottom, var(--_padding-bottom, var(--semantics-page-sections-md-margin-block)));
		}

		@container (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
			padding-top: var(--_lg-padding-top, var(--_padding-top, var(--semantics-page-sections-lg-margin-block)));
			padding-bottom: var(--_lg-padding-bottom, var(--_padding-bottom, var(--semantics-page-sections-lg-margin-block)));
		}
	}


	/* # Body */

	.sidebar-section__body {
		display: flex;
		width: 100%;
		max-width: var(--_max-width);
		flex-direction: column;

		@container (max-width: ${smMax}) { gap: var(--semantics-page-sections-sm-gap); }
		@container (min-width: ${mdMin}) and (max-width: ${mdMax}) { gap: var(--semantics-page-sections-md-gap); }
		@container (min-width: ${lgMin}) { gap: var(--semantics-page-sections-lg-gap); }
	}

	.sidebar-section__header[hidden],
	.sidebar-section__footer[hidden] {
		display: none;
	}


	/* # Columns — stacked (column) by default, two columns (row) when the section
	   is wide. Pure width switch, like the other page-sections. When collapsed the
	   aside is removed in JS (it moves to the sheet), so only the main remains;
	   with [no-collapse] the aside stays and this is the stacked fallback. */

	.sidebar-section__columns {
		display: flex;
		flex-direction: column;

		@container (max-width: ${smMax}) { gap: var(--semantics-page-sections-sm-gap); }
		@container (min-width: ${mdMin}) and (max-width: ${mdMax}) { gap: var(--semantics-page-sections-md-gap); }
		@container (min-width: ${lgMin}) {
			flex-direction: row;
			gap: var(--semantics-page-sections-lg-gap);
		}
	}

	.sidebar-section__main {
		min-width: 0;
		flex-grow: 1;
	}


	/* # Sidebar — full-width when stacked (narrow, [no-collapse]); a fixed-width
	   column beside the main when wide. */

	.sidebar-section__sidebar {
		flex-shrink: 0;

		@container (min-width: ${lgMin}) {
			width: var(--_sidebar-width);
			max-width: var(--_sidebar-width);
		}
	}

	/* # Box — tinted always. Sticky + scrollable only beside the main (wide); when
	   stacked it's a plain full-width tinted box above the main, so no sticky (which
	   would scroll over the main) and no viewport height cap. */

	.sidebar-section__sidebar-box {
		box-sizing: border-box;
		border-radius: var(--components-sidebar-section-sidebar-box-corner-radius);
		background-color: var(--components-sidebar-section-sidebar-box-background-color);
		box-shadow: inset 0 0 0 1px var(--components-sidebar-section-sidebar-box-border-color);

		@container (min-width: ${lgMin}) {
			position: sticky;
			top: var(--_sticky-top);
			bottom: var(--_sticky-bottom);
			max-height: calc(100dvh - var(--_sticky-top) - var(--_sticky-bottom));
			overflow-y: auto;
		}
	}
`;
