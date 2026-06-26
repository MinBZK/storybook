import { boxSizingReset } from '../../../../assets/styles/style-resets.js';
import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const simpleSectionStyles = css`
	${boxSizingReset}


	/* # Host */

	:host {
		container-type: inline-size;
		/* Block-padding overrides from PageSectionMixin; 'initial' makes the
		   var() in .simple-section fall back to the responsive default until the
		   mixin sets a value inline on the host. */
		--_padding-top: initial;
		--_padding-bottom: initial;
		--_sm-padding-top: initial;
		--_sm-padding-bottom: initial;
		--_md-padding-top: initial;
		--_md-padding-bottom: initial;
		--_lg-padding-top: initial;
		--_lg-padding-bottom: initial;
		--_max-width: var(--semantics-page-sections-body-max-width);

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


	/* # Block */

	.simple-section {
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: column;
		flex-grow: 1;
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


	/* # Elements */

	.simple-section__body {
		display: flex;
		width: 100%;
		max-width: var(--_max-width);
		flex-direction: column;
		flex-grow: 1;

		@container (max-width: ${smMax}) {
			gap: var(--semantics-page-sections-sm-gap);
		}

		@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			gap: var(--semantics-page-sections-md-gap);
		}

		@container (min-width: ${lgMin}) {
			gap: var(--semantics-page-sections-lg-gap);
		}
	}

	.simple-section__header[hidden] {
		display: none;
	}

	.simple-section__main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.simple-section__footer[hidden] {
		display: none;
	}
`;
