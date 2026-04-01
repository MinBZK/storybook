import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.ts';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);


/* # ndd-title-bar styles */

export const titleBarStyles = css`
	:host {
		display: flex;
		container-type: inline-size;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Title bar */

	.title-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--primitives-space-12);
		width: 100%;
	}


	/* # Title group */

	.title-bar__title-group {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
	}


	/* # Overline */

	::slotted([slot='overline']) {
		margin: 0;
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}


	/* # Title */

	::slotted(:not([slot])) {
		margin: 0;
		padding: 0;
		color: var(--semantics-content-color);
	}


	/* # Subtitle */

	::slotted([slot='subtitle']) {
		margin: 0;
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}


	/* # Actions */

	.title-bar__actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-shrink: 0;
	}


	/* # Size 1 */

	@container layout-area (max-width: ${smMax}) {
		:host([size='1']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-1-sm);
		}
	}

	@container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) {
		:host([size='1']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-1-md);
		}
	}

	@container layout-area (min-width: ${lgMin}) {
		:host([size='1']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-1-lg);
		}
	}


	/* # Size 2 */

	@container layout-area (max-width: ${smMax}) {
		:host([size='2']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-2-sm);
		}
	}

	@container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) {
		:host([size='2']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-2-md);
		}
	}

	@container layout-area (min-width: ${lgMin}) {
		:host([size='2']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-2-lg);
		}
	}


	/* # Size 3 */

	@container layout-area (max-width: ${smMax}) {
		:host([size='3']) ::slotted(:not([slot])),
		:host(:not([size])) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-3-sm);
		}
	}

	@container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) {
		:host([size='3']) ::slotted(:not([slot])),
		:host(:not([size])) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-3-md);
		}
	}

	@container layout-area (min-width: ${lgMin}) {
		:host([size='3']) ::slotted(:not([slot])),
		:host(:not([size])) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-3-lg);
		}
	}


	/* # Size 4 */

	@container layout-area (max-width: ${smMax}) {
		:host([size='4']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-4-sm);
		}
	}

	@container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) {
		:host([size='4']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-4-md);
		}
	}

	@container layout-area (min-width: ${lgMin}) {
		:host([size='4']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-4-lg);
		}
	}


	/* # Size 5 */

	@container layout-area (max-width: ${smMax}) {
		:host([size='5']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-5-sm);
		}
	}

	@container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) {
		:host([size='5']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-5-md);
		}
	}

	@container layout-area (min-width: ${lgMin}) {
		:host([size='5']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-5-lg);
		}
	}


	/* # Size 6 */

	@container layout-area (max-width: ${smMax}) {
		:host([size='6']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-6-sm);
		}
	}

	@container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) {
		:host([size='6']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-6-md);
		}
	}

	@container layout-area (min-width: ${lgMin}) {
		:host([size='6']) ::slotted(:not([slot])) {
			font: var(--primitives-font-display-6-lg);
		}
	}
`;
