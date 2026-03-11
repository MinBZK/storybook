import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.ts';

const mdMin = unsafeCSS(breakpoints.mdMin);
const lgMin = unsafeCSS(breakpoints.lgMin);


/* # rr-title-bar styles */

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
		gap: var(--semantics-spacing-md);
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

	.title-bar__overline {
		margin: 0;
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}


	/* # Title */

	.title-bar__title {
		margin: 0;
		padding: 0;
		color: var(--semantics-content-color);

		@media (forced-colors: active) {
			color: CanvasText;
		}
	}


	/* # Subtitle */

	.title-bar__subtitle {
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
		gap: var(--semantics-spacing-sm);
	}


	/* # Size 1 */

	:host([size='1']) .title-bar__title {
		font: var(--primitives-font-display-1-sm);
	}

	@container (min-width: ${mdMin}) {
		:host([size='1']) .title-bar__title {
			font: var(--primitives-font-display-1-md);
		}
	}

	@container (min-width: ${lgMin}) {
		:host([size='1']) .title-bar__title {
			font: var(--primitives-font-display-1-lg);
		}
	}


	/* # Size 2 */

	:host([size='2']) .title-bar__title {
		font: var(--primitives-font-display-2-sm);
	}

	@container (min-width: ${mdMin}) {
		:host([size='2']) .title-bar__title {
			font: var(--primitives-font-display-2-md);
		}
	}

	@container (min-width: ${lgMin}) {
		:host([size='2']) .title-bar__title {
			font: var(--primitives-font-display-2-lg);
		}
	}


	/* # Size 3 */

	:host([size='3']) .title-bar__title,
	:host(:not([size])) .title-bar__title {
		font: var(--primitives-font-display-3-sm);
	}

	@container (min-width: ${mdMin}) {
		:host([size='3']) .title-bar__title,
		:host(:not([size])) .title-bar__title {
			font: var(--primitives-font-display-3-md);
		}
	}

	@container (min-width: ${lgMin}) {
		:host([size='3']) .title-bar__title,
		:host(:not([size])) .title-bar__title {
			font: var(--primitives-font-display-3-lg);
		}
	}


	/* # Size 4 */

	:host([size='4']) .title-bar__title {
		font: var(--primitives-font-display-4-sm);
	}

	@container (min-width: ${mdMin}) {
		:host([size='4']) .title-bar__title {
			font: var(--primitives-font-display-4-md);
		}
	}

	@container (min-width: ${lgMin}) {
		:host([size='4']) .title-bar__title {
			font: var(--primitives-font-display-4-lg);
		}
	}


	/* # Size 5 */

	:host([size='5']) .title-bar__title {
		font: var(--primitives-font-display-5-sm);
	}

	@container (min-width: ${mdMin}) {
		:host([size='5']) .title-bar__title {
			font: var(--primitives-font-display-5-md);
		}
	}

	@container (min-width: ${lgMin}) {
		:host([size='5']) .title-bar__title {
			font: var(--primitives-font-display-5-lg);
		}
	}


	/* # Size 6 */

	:host([size='6']) .title-bar__title {
		font: var(--primitives-font-display-6-sm);
	}

	@container (min-width: ${mdMin}) {
		:host([size='6']) .title-bar__title {
			font: var(--primitives-font-display-6-md);
		}
	}

	@container (min-width: ${lgMin}) {
		:host([size='6']) .title-bar__title {
			font: var(--primitives-font-display-6-lg);
		}
	}
`;
