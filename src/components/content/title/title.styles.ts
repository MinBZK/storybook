import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const titleStyles = css`


	/* # Host */

	:host {
		display: flex;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.title {
		display: flex;
		width: 100%;
		flex-direction: row;
		align-items: center;
		gap: var(--primitives-space-12);
	}


	/* # Title group */

	.title__title-group {
		display: flex;
		min-width: 0;
		flex-direction: column;
		flex: 1;
	}


	/* # Overline */

	::slotted([slot='overline']) {
		margin: 0;
		overflow-wrap: anywhere;
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}


	/* # Title */

	::slotted(:not([slot])) {
		margin: 0;
		overflow-wrap: anywhere;
		color: var(--semantics-content-color);
		text-wrap: pretty;
	}

	:host([size='1']) ::slotted(:not([slot])) {
		@media (max-width: ${smMax}) {
			font: var(--primitives-font-display-1-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-1-md);
		}

		@media (min-width: ${lgMin}) {
			font: var(--primitives-font-display-1-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			font: var(--primitives-font-display-1-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-1-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			font: var(--primitives-font-display-1-lg);
		}
	}

	:host([size='2']) ::slotted(:not([slot])) {
		@media (max-width: ${smMax}) {
			font: var(--primitives-font-display-2-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-2-md);
		}

		@media (min-width: ${lgMin}) {
			font: var(--primitives-font-display-2-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			font: var(--primitives-font-display-2-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-2-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			font: var(--primitives-font-display-2-lg);
		}
	}

	:host([size='3']) ::slotted(:not([slot])),
	:host(:not([size])) ::slotted(:not([slot])) {
		@media (max-width: ${smMax}) {
			font: var(--primitives-font-display-3-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-3-md);
		}

		@media (min-width: ${lgMin}) {
			font: var(--primitives-font-display-3-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			font: var(--primitives-font-display-3-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-3-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			font: var(--primitives-font-display-3-lg);
		}
	}

	:host([size='4']) ::slotted(:not([slot])) {
		@media (max-width: ${smMax}) {
			font: var(--primitives-font-display-4-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-4-md);
		}

		@media (min-width: ${lgMin}) {
			font: var(--primitives-font-display-4-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			font: var(--primitives-font-display-4-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-4-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			font: var(--primitives-font-display-4-lg);
		}
	}

	:host([size='5']) ::slotted(:not([slot])) {
		@media (max-width: ${smMax}) {
			font: var(--primitives-font-display-5-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-5-md);
		}

		@media (min-width: ${lgMin}) {
			font: var(--primitives-font-display-5-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			font: var(--primitives-font-display-5-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-5-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			font: var(--primitives-font-display-5-lg);
		}
	}

	:host([size='6']) ::slotted(:not([slot])) {
		@media (max-width: ${smMax}) {
			font: var(--primitives-font-display-6-sm);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-6-md);
		}

		@media (min-width: ${lgMin}) {
			font: var(--primitives-font-display-6-lg);
		}

		@container layout-container (max-width: ${smMax}) {
			font: var(--primitives-font-display-6-sm);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			font: var(--primitives-font-display-6-md);
		}

		@container layout-container (min-width: ${lgMin}) {
			font: var(--primitives-font-display-6-lg);
		}
	}


	/* # Subtitle */

	::slotted([slot='subtitle']) {
		margin: 0;
		overflow-wrap: anywhere;
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}


	/* # Actions */

	.title__actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-shrink: 0;
	}

`;
