import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.ts';

/* # ndd-simple-section styles */

export const simpleSectionStyles = css`
	:host {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		container-type: inline-size;
	}

	:host([hidden]) {
		display: none;
	}

	/* # Section */

	.simple-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		box-sizing: border-box;

		@container (max-width: ${unsafeCSS(breakpoints.smMax)}) {
			padding-inline: var(--semantics-page-sections-sm-margin-inline);
			padding-block: var(--semantics-page-sections-sm-margin-block);
		}

		@container (min-width: ${unsafeCSS(breakpoints.mdMin)}) and (max-width: ${unsafeCSS(
			breakpoints.mdMax
		)}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
			padding-block: var(--semantics-page-sections-md-margin-block);
		}

		@container (min-width: ${unsafeCSS(breakpoints.lgMin)}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
			padding-block: var(--semantics-page-sections-lg-margin-block);
		}
	}

	/* # Body */

	.simple-section__body {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: var(--semantics-page-sections-body-max-width);

		@container (max-width: ${unsafeCSS(breakpoints.smMax)}) {
			gap: var(--semantics-page-sections-sm-gap);
		}

		@container (min-width: ${unsafeCSS(breakpoints.mdMin)}) and (max-width: ${unsafeCSS(
			breakpoints.mdMax
		)}) {
			gap: var(--semantics-page-sections-md-gap);
		}

		@container (min-width: ${unsafeCSS(breakpoints.lgMin)}) {
			gap: var(--semantics-page-sections-lg-gap);
		}
	}
`;
