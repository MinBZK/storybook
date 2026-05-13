import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const fullBleedSectionStyles = css`


	/* # Host
	   Geen eigen container-type: page-sections luisteren naar de outer
	   layout-container (gezet door nldd-page / nldd-card). Voor contexten
	   zonder layout-container dient @media als fallback. */

	:host {
		--_max-width: var(--semantics-page-sections-body-max-width);

		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	:host([hidden]) {
		display: none;
	}

	:host([width="full"]) {
		--_max-width: none;
	}


	/* # Block */

	.full-bleed-section {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		width: 100%;
		box-sizing: border-box;

		@media (max-width: ${smMax}) {
			padding-block: var(--semantics-page-sections-sm-margin-block);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-block: var(--semantics-page-sections-md-margin-block);
		}

		@media (min-width: ${lgMin}) {
			padding-block: var(--semantics-page-sections-lg-margin-block);
		}

		@container layout-container (max-width: ${smMax}) {
			padding-block: var(--semantics-page-sections-sm-margin-block);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-block: var(--semantics-page-sections-md-margin-block);
		}

		@container layout-container (min-width: ${lgMin}) {
			padding-block: var(--semantics-page-sections-lg-margin-block);
		}
	}


	/* # Header */

	.full-bleed-section__header[hidden] {
		display: none;
	}


	/* # Body */

	.full-bleed-section__body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		width: 100%;
		max-width: var(--_max-width);

		@media (max-width: ${smMax}) {
			gap: var(--semantics-page-sections-sm-gap);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			gap: var(--semantics-page-sections-md-gap);
		}

		@media (min-width: ${lgMin}) {
			gap: var(--semantics-page-sections-lg-gap);
		}

		@container layout-container (max-width: ${smMax}) {
			gap: var(--semantics-page-sections-sm-gap);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			gap: var(--semantics-page-sections-md-gap);
		}

		@container layout-container (min-width: ${lgMin}) {
			gap: var(--semantics-page-sections-lg-gap);
		}
	}


	/* # Footer */

	.full-bleed-section__footer[hidden] {
		display: none;
	}


	/* # Main */

	.full-bleed-section__main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
`;
