import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const containerStyles = css`


	/* # Host */

	:host {
		--_justify-content: initial;
		--_align-items: initial;
		--_gap: 0;
		--_sm-gap: var(--_gap);
		--_md-gap: var(--_gap);
		--_lg-gap: var(--_gap);
		--_padding-top: 0;
		--_padding-right: 0;
		--_padding-bottom: 0;
		--_padding-left: 0;
		--_sm-padding-top: var(--_padding-top);
		--_sm-padding-right: var(--_padding-right);
		--_sm-padding-bottom: var(--_padding-bottom);
		--_sm-padding-left: var(--_padding-left);
		--_md-padding-top: var(--_padding-top);
		--_md-padding-right: var(--_padding-right);
		--_md-padding-bottom: var(--_padding-bottom);
		--_md-padding-left: var(--_padding-left);
		--_lg-padding-top: var(--_padding-top);
		--_lg-padding-right: var(--_padding-right);
		--_lg-padding-bottom: var(--_padding-bottom);
		--_lg-padding-left: var(--_padding-left);

		display: flex;
		height: 100%;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: var(--_justify-content);
		align-items: var(--_align-items);
		gap: var(--_gap);
		padding-top: var(--_padding-top);
		padding-right: var(--_padding-right);
		padding-bottom: var(--_padding-bottom);
		padding-left: var(--_padding-left);

		@media (max-width: ${smMax}) {
			gap: var(--_sm-gap);
			padding-top: var(--_sm-padding-top);
			padding-right: var(--_sm-padding-right);
			padding-bottom: var(--_sm-padding-bottom);
			padding-left: var(--_sm-padding-left);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			gap: var(--_md-gap);
			padding-top: var(--_md-padding-top);
			padding-right: var(--_md-padding-right);
			padding-bottom: var(--_md-padding-bottom);
			padding-left: var(--_md-padding-left);
		}

		@media (min-width: ${lgMin}) {
			gap: var(--_lg-gap);
			padding-top: var(--_lg-padding-top);
			padding-right: var(--_lg-padding-right);
			padding-bottom: var(--_lg-padding-bottom);
			padding-left: var(--_lg-padding-left);
		}

		@container layout-container (max-width: ${smMax}) {
			gap: var(--_sm-gap);
			padding-top: var(--_sm-padding-top);
			padding-right: var(--_sm-padding-right);
			padding-bottom: var(--_sm-padding-bottom);
			padding-left: var(--_sm-padding-left);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			gap: var(--_md-gap);
			padding-top: var(--_md-padding-top);
			padding-right: var(--_md-padding-right);
			padding-bottom: var(--_md-padding-bottom);
			padding-left: var(--_md-padding-left);
		}

		@container layout-container (min-width: ${lgMin}) {
			gap: var(--_lg-gap);
			padding-top: var(--_lg-padding-top);
			padding-right: var(--_lg-padding-right);
			padding-bottom: var(--_lg-padding-bottom);
			padding-left: var(--_lg-padding-left);
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
