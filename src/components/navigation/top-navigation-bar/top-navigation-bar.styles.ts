import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const topNavigationBarStyles = css`


	/* # Host */

	:host {
		--_logo-width: var(--primitives-space-40);
		--_wordmark-content-color: light-dark(var(--primitives-color-reference-lintblauw), var(--primitives-color-neutral-1000));

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
		margin: 0 auto;
		width: 100%;
		flex-direction: column;
	}


	/* # Logo bar */

	.top-navigation-bar__logo-bar {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: var(--primitives-space-8);
		align-items: center;

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
			--_logo-width: var(--primitives-space-40);
		}

		@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_logo-width: var(--primitives-space-44);
		}

		@container (min-width: ${lgMin}) {
			--_logo-width: var(--primitives-space-48);
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
	}

	.top-navigation-bar__wordmark-title {
		margin: 0;
		font: var(--primitives-font-body-sm-bold-flat);
		text-wrap: pretty;
	}

	.top-navigation-bar__wordmark-subtitle {
		margin: 0;
		font: var(--primitives-font-body-xs-regular-flat);
		text-wrap: pretty;
	}

	.top-navigation-bar__wordmark-supporting-text {
		margin: 0;
		font: var(--primitives-font-body-xxs-regular-flat);
		text-wrap: pretty;
	}


	/* # Main bar */

	.top-navigation-bar__main-bar {
		display: flex;

		@container (max-width: ${smMax}) {
			padding-inline: calc(var(--semantics-page-sections-sm-margin-inline) - var(--components-menu-bar-item-inline-padding));
			flex-direction: column;
		}

		@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-inline: calc(var(--semantics-page-sections-md-margin-inline) - var(--components-menu-bar-item-inline-padding));
			flex-direction: row;
			align-items: center;
		}

		@container (min-width: ${lgMin}) {
			padding-inline: calc(var(--semantics-page-sections-lg-margin-inline) - var(--components-menu-bar-item-inline-padding));
			flex-direction: row;
			align-items: center;
		}
	}

	/* ## Title bar */

	.top-navigation-bar__website-title-bar {
		display: flex;
		padding-inline: calc(var(--primitives-space-8) + var(--components-menu-bar-item-inline-padding));
		align-items: center;
		justify-content: center;

		@container (max-width: ${smMax}) {
			padding-top: var(--primitives-space-4);
		}

		@container (min-width: ${mdMin}) {
			padding: 0;
			justify-content: flex-start;
		}
	}

	:host([no-logo]) .top-navigation-bar__website-title-bar {
		@container (max-width: ${smMax}) {
			padding-top: var(--primitives-space-8);
		}
	}

	/* ## Title */

	.top-navigation-bar__website-title {
		font: var(--components-top-navigation-bar-title-sm-font);
		color: var(--semantics-content-color);
		white-space: nowrap;

		@container (min-width: ${mdMin}) {
			font: var(--components-top-navigation-bar-title-md-font);
			margin-inline: var(--components-menu-bar-item-inline-padding);
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
