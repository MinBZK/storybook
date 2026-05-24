import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const pageFooterStyles = css`
	:host {
		--_max-width: var(--semantics-page-sections-body-max-width);
		--context-parent-background-color: var(--components-page-footer-background-color);

		display: block;
		background-color: var(--components-page-footer-background-color);
	}

	:host([hidden]) {
		display: none;
	}

	.page-footer {
		box-sizing: border-box;
		display: flex;
		position: relative;
		width: 100%;
		flex-direction: column;
		align-items: center;

		@container page-footer-container (max-width: ${smMax}) {
			padding-inline: var(--semantics-page-sections-sm-margin-inline);
		}

		@container page-footer-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-inline: var(--semantics-page-sections-md-margin-inline);
		}

		@container page-footer-container (min-width: ${lgMin}) {
			padding-inline: var(--semantics-page-sections-lg-margin-inline);
		}
	}

	.page-footer::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		background-color: #154273;
		transform: translateX(-50%);

		@container page-footer-container (max-width: ${smMax}) {
			width: var(--primitives-space-40);
			height: calc(var(--primitives-space-40) / 2);
		}

		@container page-footer-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			width: var(--primitives-space-44);
			height: calc(var(--primitives-space-44) / 2);
		}

		@container page-footer-container (min-width: ${lgMin}) {
			width: var(--primitives-space-48);
			height: calc(var(--primitives-space-48) / 2);
		}
	}

	.page-footer__body {
		display: flex;
		width: 100%;
		max-width: var(--_max-width);
		flex-direction: column;
	}

	.page-footer__breadcrumbs,
	.page-footer__legal-bar {
		@container page-footer-container (max-width: ${smMax}) {
			padding-block: var(--primitives-space-16);
		}

		@container page-footer-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-block: var(--primitives-space-24);
		}

		@container page-footer-container (min-width: ${lgMin}) {
			padding-block: var(--primitives-space-24);
		}
	}

	.page-footer__main {
		@container page-footer-container (max-width: ${smMax}) {
			padding-block: var(--primitives-space-24);
		}

		@container page-footer-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-block: var(--primitives-space-32);
		}

		@container page-footer-container (min-width: ${lgMin}) {
			padding-block: var(--primitives-space-48);
		}
	}

	.page-footer__body > div:not([hidden]):not(:has(~ div:not([hidden]))) {
		@container page-footer-container (max-width: ${smMax}) {
			padding-bottom: calc(var(--primitives-space-16) + var(--primitives-space-40) / 2);
		}

		@container page-footer-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-bottom: calc(var(--primitives-space-16) + var(--primitives-space-44) / 2);
		}

		@container page-footer-container (min-width: ${lgMin}) {
			padding-bottom: calc(var(--primitives-space-16) + var(--primitives-space-48) / 2);
		}
	}

	:host([single-slot]) .page-footer__body > div:not([hidden]) {
		@container page-footer-container (max-width: ${smMax}) {
			padding-top: calc(var(--primitives-space-16) + var(--primitives-space-40) / 2);
		}

		@container page-footer-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-top: calc(var(--primitives-space-16) + var(--primitives-space-44) / 2);
		}

		@container page-footer-container (min-width: ${lgMin}) {
			padding-top: calc(var(--primitives-space-16) + var(--primitives-space-48) / 2);
		}
	}

	.page-footer__breadcrumbs[hidden],
	.page-footer__main[hidden],
	.page-footer__legal-bar[hidden],
	.page-footer__divider[hidden] {
		display: none;
	}

	.page-footer__divider {
		margin: 0;
		border: none;
		background-color: var(--components-page-footer-divider-color);
		width: 100%;
		height: var(--semantics-dividers-thickness);
	}

	@media (forced-colors: active) {
		.page-footer__divider {
			background-color: CanvasText;
		}
	}
`;

export const pageFooterLegalBarStyles = css`
	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}

	.page-footer__legal-bar {
		display: flex;
		flex-wrap: wrap;
		row-gap: var(--primitives-space-4);
		column-gap: var(--primitives-space-16);
		align-items: flex-start;
		justify-content: space-between;
	}

	.page-footer__legal-bar-start {
		display: flex;
		flex-wrap: wrap;
		gap: var(--primitives-space-12);
		order: 0;
	}

	.page-footer__legal-bar-end {
		display: flex;
		flex-wrap: wrap;
		gap: var(--primitives-space-12);
		order: 1;
	}

	.page-footer__legal-bar-start[hidden],
	.page-footer__legal-bar-end[hidden] {
		display: none;
	}
`;

export const pageFooterLegalBarItemStyles = css`
	:host {
		display: inline-flex;
	}

	:host([hidden]) {
		display: none;
	}

	.page-footer__legal-bar-item {
		display: inline-flex;
		color: var(--components-page-footer-legal-bar-item-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}

	.page-footer__legal-bar-item-link {
		color: var(--components-page-footer-legal-bar-item-color);
		text-decoration: underline;
	}
`;
