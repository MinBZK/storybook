import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';
import { inheritedTextReset } from '../../../assets/styles/shadow-resets.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const topNavigationBarStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_logo-width: var(--semantics-brand-ribbon-sm-width);
		--_wordmark-content-color: light-dark(var(--primitives-color-reference-lintblauw), var(--primitives-color-neutral-1000));
		--_wordmark-max-width: 280px;
		--_max-width: var(--semantics-page-sections-body-max-width);

		${inheritedTextReset}
		container-type: inline-size;
		display: block;
		width: 100%;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.top-navigation-bar {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;

		/* The page-section inline margin lives on the wrapper; each bar caps to
		   the content width and centers, so bar content lines up with page
		   sections. width=full drops the cap (bars fill the margin box). */
		@container (max-width: ${smMax}) {
			padding-inline: var(--semantics-page-sections-sm-margin-inline);
		}

		@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
		}

		@container (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
		}
	}

	:host([width="full"]) {
		--_max-width: none;
	}


	/* # Logo bar */

	.top-navigation-bar__logo-bar {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: var(--primitives-space-8);
		align-items: center;
		width: 100%;
		max-width: var(--_max-width);
	}

	/* ## Logo */

	.top-navigation-bar__logo {
		display: flex;
		width: var(--_logo-width);
		height: calc(var(--_logo-width) * 2);
		grid-column: 2;
		align-self: start;
		align-items: center;
		justify-content: center;

		@container (max-width: ${smMax}) {
			--_logo-width: var(--semantics-brand-ribbon-sm-width);
		}

		@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_logo-width: var(--semantics-brand-ribbon-md-width);
		}

		@container (min-width: ${lgMin}) {
			--_logo-width: var(--semantics-brand-ribbon-lg-width);
		}
	}

	.top-navigation-bar__logo svg {
		width: 100%;
		height: 100%;
	}

	a.top-navigation-bar__logo {
		color: inherit;
		text-decoration: none;
	}

	a.top-navigation-bar__logo:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	/* ## Logo and wordmark */

	.top-navigation-bar__logo-and-wordmark {
		display: grid;
		grid-column: 2 / 4;
		grid-template-columns: subgrid;
		align-items: center;
	}

	.top-navigation-bar__logo-and-wordmark > .top-navigation-bar__logo {
		grid-column: 1;
	}

	.top-navigation-bar__logo-and-wordmark > .top-navigation-bar__wordmark {
		grid-column: 2;
	}

	a.top-navigation-bar__logo-and-wordmark {
		text-decoration: none;
	}

	a.top-navigation-bar__logo-and-wordmark:focus-visible {
		outline: none;
	}

	a.top-navigation-bar__logo-and-wordmark:focus-visible > .top-navigation-bar__logo {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	/* ## Wordmark */

	.top-navigation-bar__wordmark {
		display: flex;
		min-height: calc(var(--_logo-width) * 2);
		grid-column: 3;
		flex-direction: column;
		color: var(--_wordmark-content-color);
	}

	.top-navigation-bar__wordmark-spacer {
		height: var(--_logo-width);
		flex-grow: 0;
		flex-shrink: 0;
	}

	.top-navigation-bar__wordmark-content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 50%;
		max-width: var(--_wordmark-max-width);
	}

	.top-navigation-bar__wordmark-title {
		margin: 0;
		font: var(--primitives-font-body-sm-medium-flat);
		text-wrap: balance;
	}

	.top-navigation-bar__wordmark-subtitle {
		margin: 0;
		font: var(--primitives-font-body-xs-regular-flat);
		text-wrap: balance;
	}

	.top-navigation-bar__wordmark-supporting-text {
		margin: 0;
		font: var(--primitives-font-body-xxs-regular-flat);
		text-wrap: balance;
	}


	/* # Main bar */

	.top-navigation-bar__main-bar {
		display: flex;
		width: 100%;
		max-width: var(--_max-width);

		@container (max-width: ${smMax}) {
			flex-direction: column;
		}

		@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			flex-direction: row;
			align-items: center;
			gap: var(--components-menu-bar-item-inline-padding);
		}

		@container (min-width: ${lgMin}) {
			flex-direction: row;
			align-items: center;
			gap: var(--components-menu-bar-item-inline-padding);
		}
	}

	/* ## Title bar */

	.top-navigation-bar__website-title-bar {
		display: flex;
		align-items: center;

		@container (max-width: ${smMax}) {
			justify-content: center;
		}

		@container (min-width: ${mdMin}) {
			padding-inline-end: var(--components-menu-bar-item-inline-padding);
			justify-content: flex-start;
		}
	}

	/* Without a logo above it the title is the first thing in the bar, so its
	   focus ring has nothing to sit in. Six is what that ring needs: two of
	   offset, two of outline, and the halo that follows it. */

	:host([no-logo]) .top-navigation-bar__website-title-bar {
		@container (max-width: ${smMax}) {
			padding-top: var(--primitives-space-6);
		}
	}

	/* ## Title */

	/* Twenty-four in both directions, whatever the screen and whether or not it
	   is a link. WCAG 2.5.8 asks that of a target, and the padding that used to
	   make this row 24 sat on the bar around it, where it does nothing for the
	   size of the target inside. It is not conditional on the href either: a
	   title that changed height depending on whether it linked somewhere would
	   move the whole bar with it.

	   On a small screen the four pixels sit on top, so the text keeps the place
	   it had and the box grows downward into the row. Off-centre by four, which
	   nobody reads as a mistake, where padding on both sides would make the box
	   28: with border-box the text of 20 and two paddings of 4 no longer fit in
	   24. From md up the title stands beside a menu bar of 44, so there is room
	   around it for the ring without asking for any. */

	.top-navigation-bar__website-title {
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		min-width: var(--semantics-controls-xs-min-size);
		min-height: var(--semantics-controls-xs-min-size);
		font: var(--components-top-navigation-bar-title-sm-font);
		color: var(--semantics-content-color);
		white-space: nowrap;

		@container (max-width: ${smMax}) {
			padding-top: var(--primitives-space-4);
		}

		@container (min-width: ${mdMin}) {
			font: var(--components-top-navigation-bar-title-md-font);
		}

		@container (min-width: ${lgMin}) {
			font: var(--components-top-navigation-bar-title-lg-font);
		}
	}

	a.top-navigation-bar__website-title {
		border-radius: var(--primitives-corner-radius-xxs);
		text-decoration: none;
	}

	a.top-navigation-bar__website-title:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	/* ## Menu bar */

	.top-navigation-bar__menu-bar {
		display: flex;
		min-width: 0;
		align-items: center;
		gap: var(--primitives-space-12);
		flex-grow: 1;
		/* Pull the menu out by the menu-bar items own inline padding so the first
		   and last item text (not its hit-area) lines up with the content edge. */
		margin-inline: calc(-1 * var(--components-menu-bar-item-inline-padding));
	}

	/* ## Menu bar start */

	.top-navigation-bar__menu-bar-start {
		display: flex;
		min-width: 0;
		align-items: center;

		@container (max-width: ${mdMax}) {
			flex-grow: 0;
			flex-shrink: 0;
		}

		@container (min-width: ${lgMin}) {
			flex-grow: 1;
			flex-shrink: 1;
		}
	}

	/* ## Menu bar end */

	.top-navigation-bar__menu-bar-end {
		display: flex;
		min-width: 0;
		align-items: center;

		@container (max-width: ${mdMax}) {
			flex-grow: 1;
			flex-shrink: 1;
		}

		@container (min-width: ${lgMin}) {
			flex-grow: 0;
			flex-shrink: 0;
		}
	}

	/* ## Global bar */

	.top-navigation-bar__global-menu-bar {
		display: none;
		min-width: 0;
		flex-grow: 1;
		flex-shrink: 1;
		@container (min-width: ${lgMin}) {
			:host(.has-global-items) & {
				display: flex;
			}
		}
	}

	/* ## Menu button */

	.top-navigation-bar__menu-button {
		display: none;

		@container (max-width: ${mdMax}) {
			:host(.has-global-items) & {
				display: inline-block;
			}
		}
	}

	/* ## Utility menu bar */

	.top-navigation-bar__utility-menu-bar {
		display: flex;
		min-width: 0;
		flex-grow: 1;
		flex-shrink: 1;
		justify-content: flex-end;
	}

	slot[name="utility"]::slotted(nldd-menu-bar) {
		flex-grow: 0;
	}
`;
