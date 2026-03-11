import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.ts';


/* # rr-simple-section styles */

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

	.section {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
	}


	/* # Body */

	.section__body {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: var(--semantics-page-sections-body-max-width);
	}


	/* # Container: sm */

	@container (max-width: ${unsafeCSS(breakpoints.smMax)}) {
		.section {
			padding-inline: var(--semantics-page-sections-sm-margin-inline);
			padding-block: var(--semantics-page-sections-sm-margin-block);
		}

		.section__body {
			gap: var(--semantics-page-sections-sm-gap);
		}
	}


	/* # Container: md */

	@container (min-width: ${unsafeCSS(breakpoints.mdMin)}) and (max-width: ${unsafeCSS(breakpoints.mdMax)}) {
		.section {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
			padding-block: var(--semantics-page-sections-md-margin-block);
		}

		.section__body {
			gap: var(--semantics-page-sections-md-gap);
		}
	}


	/* # Container: lg */

	@container (min-width: ${unsafeCSS(breakpoints.lgMin)}) {
		.section {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
			padding-block: var(--semantics-page-sections-lg-margin-block);
		}

		.section__body {
			gap: var(--semantics-page-sections-lg-gap);
		}
	}
`;
