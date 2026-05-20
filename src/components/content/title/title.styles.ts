import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const titleStyles = css`


	/* # Host */

	:host {
		@media (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-3-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-3-md);
		}

		@media (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-3-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-3-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-3-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-3-lg);
		}

		display: flex;
	}

	:host([size="1"]) {
		@media (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-1-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-1-md);
		}

		@media (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-1-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-1-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-1-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-1-lg);
		}
	}

	:host([size="2"]) {
		@media (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-2-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-2-md);
		}

		@media (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-2-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-2-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-2-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-2-lg);
		}
	}

	:host([size="4"]) {
		@media (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-4-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-4-md);
		}

		@media (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-4-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-4-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-4-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-4-lg);
		}
	}

	:host([size="5"]) {
		@media (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-5-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-5-md);
		}

		@media (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-5-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-5-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-5-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-5-lg);
		}
	}

	:host([size="6"]) {
		@media (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-6-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-6-md);
		}

		@media (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-6-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			--_font: var(--primitives-font-display-6-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			--_font: var(--primitives-font-display-6-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			--_font: var(--primitives-font-display-6-lg);
		}
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.title {
		display: flex;
		width: 100%;
		flex-direction: row;
		gap: var(--primitives-space-12);
		align-items: center;
	}


	/* # Elements */

	.title__title-group {
		display: flex;
		min-width: 0;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}

	::slotted([slot="overline"]) {
		margin: 0;
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-sm-regular-tight);
		overflow-wrap: anywhere;
	}

	::slotted(:not([slot])) {
		margin: 0;
		color: var(--semantics-content-color);
		font: var(--_font);
		overflow-wrap: anywhere;
		text-wrap: pretty;
	}

	::slotted([slot="subtitle"]) {
		margin: 0;
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-sm-regular-tight);
		overflow-wrap: anywhere;
	}

	.title__actions {
		display: flex;
		flex-direction: row;
		flex-shrink: 0;
		align-items: center;
	}
`;
