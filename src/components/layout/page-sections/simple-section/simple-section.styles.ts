import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const simpleSectionStyles = css`


	/* # Host
	   Geen eigen container-type: page-sections luisteren naar de outer
	   layout-area (gezet door nldd-page / nldd-card). Voor contexten
	   zonder layout-area dient @media als fallback. */

	:host {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	:host([hidden]) {
		display: none;
	}

	:host([align="center"]) {
		flex-grow: 1;
	}


	/* # Block — sm = base; md/lg via @media (fallback) en
	   @container layout-area (heeft voorrang binnen layout-area). */

	.simple-section {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		padding-inline: var(--semantics-page-sections-sm-margin-inline);
		padding-block: var(--semantics-page-sections-sm-margin-block);

		@media (min-width: ${mdMin}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
			padding-block: var(--semantics-page-sections-md-margin-block);
		}

		@media (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
			padding-block: var(--semantics-page-sections-lg-margin-block);
		}

		@container layout-area (max-width: ${smMax}) {
			padding-inline: var(--semantics-page-sections-sm-margin-inline);
			padding-block: var(--semantics-page-sections-sm-margin-block);
		}

		@container layout-area (min-width: ${mdMin}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
			padding-block: var(--semantics-page-sections-md-margin-block);
		}

		@container layout-area (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
			padding-block: var(--semantics-page-sections-lg-margin-block);
		}
	}


	/* # Header */

	.simple-section__header[hidden] {
		display: none;
	}


	/* # Body */

	.simple-section__body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		width: 100%;
		max-width: var(--semantics-page-sections-body-max-width);
		gap: var(--semantics-page-sections-sm-gap);

		@media (min-width: ${mdMin}) {
			gap: var(--semantics-page-sections-md-gap);
		}

		@media (min-width: ${lgMin}) {
			gap: var(--semantics-page-sections-lg-gap);
		}

		@container layout-area (max-width: ${unsafeCSS(breakpoints.smMax)}) {
			gap: var(--semantics-page-sections-sm-gap);
		}

		@container layout-area (min-width: ${mdMin}) {
			gap: var(--semantics-page-sections-md-gap);
		}

		@container layout-area (min-width: ${lgMin}) {
			gap: var(--semantics-page-sections-lg-gap);
		}
	}


	/* # Footer */

	.simple-section__footer[hidden] {
		display: none;
	}


	/* # Main */

	.simple-section__main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	:host([align="center"]) .simple-section__main {
		justify-content: center;
	}
`;
