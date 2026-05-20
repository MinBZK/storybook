import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const containerStyles = css`


	/* # Host */

	:host {
		display: flex;
		height: 100%;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: var(--_justify-content);
		align-items: var(--_align-items);
		gap: var(--_gap, 0);
		padding-top: var(--_padding-top, 0);
		padding-right: var(--_padding-right, 0);
		padding-bottom: var(--_padding-bottom, 0);
		padding-left: var(--_padding-left, 0);

		@media (max-width: ${smMax}) {
			gap: var(--_sm-gap, var(--_gap, 0));
			padding-top: var(--_sm-padding-top, var(--_padding-top, 0));
			padding-right: var(--_sm-padding-right, var(--_padding-right, 0));
			padding-bottom: var(--_sm-padding-bottom, var(--_padding-bottom, 0));
			padding-left: var(--_sm-padding-left, var(--_padding-left, 0));
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			gap: var(--_md-gap, var(--_gap, 0));
			padding-top: var(--_md-padding-top, var(--_padding-top, 0));
			padding-right: var(--_md-padding-right, var(--_padding-right, 0));
			padding-bottom: var(--_md-padding-bottom, var(--_padding-bottom, 0));
			padding-left: var(--_md-padding-left, var(--_padding-left, 0));
		}

		@media (min-width: ${lgMin}) {
			gap: var(--_lg-gap, var(--_gap, 0));
			padding-top: var(--_lg-padding-top, var(--_padding-top, 0));
			padding-right: var(--_lg-padding-right, var(--_padding-right, 0));
			padding-bottom: var(--_lg-padding-bottom, var(--_padding-bottom, 0));
			padding-left: var(--_lg-padding-left, var(--_padding-left, 0));
		}

		@container layout-container (max-width: ${smMax}) {
			gap: var(--_sm-gap, var(--_gap, 0));
			padding-top: var(--_sm-padding-top, var(--_padding-top, 0));
			padding-right: var(--_sm-padding-right, var(--_padding-right, 0));
			padding-bottom: var(--_sm-padding-bottom, var(--_padding-bottom, 0));
			padding-left: var(--_sm-padding-left, var(--_padding-left, 0));
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			gap: var(--_md-gap, var(--_gap, 0));
			padding-top: var(--_md-padding-top, var(--_padding-top, 0));
			padding-right: var(--_md-padding-right, var(--_padding-right, 0));
			padding-bottom: var(--_md-padding-bottom, var(--_padding-bottom, 0));
			padding-left: var(--_md-padding-left, var(--_padding-left, 0));
		}

		@container layout-container (min-width: ${lgMin}) {
			gap: var(--_lg-gap, var(--_gap, 0));
			padding-top: var(--_lg-padding-top, var(--_padding-top, 0));
			padding-right: var(--_lg-padding-right, var(--_padding-right, 0));
			padding-bottom: var(--_lg-padding-bottom, var(--_padding-bottom, 0));
			padding-left: var(--_lg-padding-left, var(--_padding-left, 0));
		}
	}

	:host([hidden]) {
		display: none;
	}

	:host([direction="row"]) {
		flex-direction: row;
	}

	:host([wrap]) {
		flex-wrap: wrap;
	}
`;
