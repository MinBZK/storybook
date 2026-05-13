import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const twoThirdsOneThirdSectionStyles = css`


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

	.two-thirds-one-third-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		box-sizing: border-box;

		@media (max-width: ${smMax}) {
			padding-inline: var(--semantics-page-sections-sm-margin-inline);
			padding-block: var(--semantics-page-sections-sm-margin-block);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
			padding-block: var(--semantics-page-sections-md-margin-block);
		}

		@media (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
			padding-block: var(--semantics-page-sections-lg-margin-block);
		}

		@container layout-container (max-width: ${smMax}) {
			padding-inline: var(--semantics-page-sections-sm-margin-inline);
			padding-block: var(--semantics-page-sections-sm-margin-block);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
			padding-block: var(--semantics-page-sections-md-margin-block);
		}

		@container layout-container (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
			padding-block: var(--semantics-page-sections-lg-margin-block);
		}
	}


	/* # Body */

	.two-thirds-one-third-section__body {
		display: flex;
		flex-direction: column;
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


	/* # Columns */

	.two-thirds-one-third-section__columns {
		display: flex;
		flex-wrap: wrap;

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

	.two-thirds-one-third-section__left-column {
		flex: 2;
		min-width: var(--primitives-area-280);
	}

	.two-thirds-one-third-section__right-column {
		flex: 1;
		min-width: var(--primitives-area-280);
	}
`;
