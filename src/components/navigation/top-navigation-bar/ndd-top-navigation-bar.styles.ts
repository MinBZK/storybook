import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

// # Top navigation bar styles

export const styles = css`


	/* # Host */

	:host {
		--_logo-width: var(--primitives-space-40);
		--_wordmark-content-color: light-dark(var(--primitives-color-reference-lintblauw), var(--primitives-color-neutral-1000));
		display: block;
		width: 100%;

		@container layout-area (min-width: ${mdMin}) {
			--_logo-width: var(--primitives-space-44);
		}

		@container layout-area (min-width: ${lgMin}) {
			--_logo-width: var(--primitives-space-48);
		}
	}

	:host([hidden]) {
		display: none;
	}


	/* # Container */

	.top-navigation-bar {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		container-type: inline-size;
		container-name: top-navigation-bar;
	}


	/* # Logo bar */

	.top-navigation-bar__logo-bar {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: var(--primitives-space-8);
		align-items: center;
		padding-inline: var(--semantics-page-sections-sm-margin-inline);

		@container layout-area (min-width: ${mdMin}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
		}

		@container layout-area (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
		}
	}

	/* ## Logo */

	.top-navigation-bar__logo {
		grid-column: 2;
		align-self: start;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--_logo-width);
		height: calc(var(--_logo-width) * 2);
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
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}

	/* ## Logo and wordmark */

	.top-navigation-bar__logo-and-wordmark {
		grid-column: 2 / 4;
		display: grid;
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
		color: inherit;
		text-decoration: none;
	}

	a.top-navigation-bar__logo-and-wordmark:focus-visible {
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}

	/* ## Wordmark */

	.top-navigation-bar__wordmark {
		grid-column: 3;
		display: flex;
		flex-direction: column;
		height: calc(var(--_logo-width) * 2);
		color: var(--_wordmark-content-color);
	}

	.top-navigation-bar__wordmark-spacer {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 50%;
	}

	.top-navigation-bar__wordmark-content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 50%;
	}

	.top-navigation-bar__wordmark-title {
		font: var(--primitives-font-body-md-bold-flat);
		margin: 0;
	}

	.top-navigation-bar__wordmark-subtitle {
		font: var(--primitives-font-body-xs-regular-flat);
		margin: 0;
	}

	.top-navigation-bar__wordmark-supporting-text {
		font: var(--primitives-font-body-xxs-regular-flat);
		margin: 0;
	}


	/* # Main bar */

	.top-navigation-bar__main-bar {
		display: flex;
		flex-direction: column;
		padding-inline: calc(var(--semantics-page-sections-sm-margin-inline) - var(--components-menu-bar-item-inline-padding));

		@container layout-area (min-width: ${mdMin}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
		}

		@container layout-area (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
		}

		@container top-navigation-bar (min-width: ${mdMin}) {
			flex-direction: row;
			align-items: center;
		}
	}

	/* ## Title bar */

	.top-navigation-bar__website-title-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--primitives-space-4) var(--primitives-space-8);

		@container top-navigation-bar (min-width: ${mdMin}) {
			justify-content: flex-start;
			padding: 0;
		}
	}

	/* ## Title */

	.top-navigation-bar__website-title {
		font: var(--components-top-navigation-bar-title-sm-font);
		color: var(--semantics-content-color);
		margin-inline-end: var(--primitives-space-8);
		white-space: nowrap;

		@container top-navigation-bar (min-width: ${mdMin}) {
			font: var(--components-top-navigation-bar-title-md-font);
		}

		@container top-navigation-bar (min-width: ${lgMin}) {
			font: var(--components-top-navigation-bar-title-lg-font);
		}
	}

	a.top-navigation-bar__website-title {
		text-decoration: none;
		border-radius: var(--primitives-corner-radius-xxs);
	}

	a.top-navigation-bar__website-title:focus-visible {
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}

	/* ## Menu bar */

	.top-navigation-bar__menu-bar {
		display: flex;
		align-items: center;
		flex-grow: 1;
		min-width: 0;
	}

	/* ## Menu bar start */

	.top-navigation-bar__menu-bar-start {
		display: flex;
		align-items: center;
		flex-grow: 1;
		flex-shrink: 1;
		min-width: 0;

		@container top-navigation-bar (max-width: ${smMax}) {
			flex-shrink: 0;
		}
	}

	/* ## Menu bar end */

	.top-navigation-bar__menu-bar-end {
		display: flex;
		align-items: center;
		flex-shrink: 0;

		@container top-navigation-bar (max-width: ${smMax}) {
			flex-shrink: 1;
			min-width: 0;
		}
	}

	/* ## Global bar */

	.top-navigation-bar__global-menu-bar {
		display: none;
		flex-grow: 1;
		flex-shrink: 1;
		min-width: 0;
		@container top-navigation-bar (min-width: ${lgMin}) {
			:host(.has-global-items) & {
				display: flex;
			}
		}
	}

	/* ## Menu button */

	.top-navigation-bar__menu-button {
		display: none;

		@container top-navigation-bar (max-width: ${mdMax}) {
			:host(.has-global-items) & {
				display: inline-block;
			}
		}
	}

	/* ## Utility menu bar */

	.top-navigation-bar__utility-menu-bar {
		display: flex;
		flex-grow: 1;
		flex-shrink: 1;
		min-width: 0;
	}
`;
