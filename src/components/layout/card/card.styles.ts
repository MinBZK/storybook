import { css } from 'lit';

export const cardStyles = css`


	/* # Host */

	:host {
		display: flex;
		flex-direction: column;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.card {
		display: flex;
		position: relative;
		border-radius: var(--components-card-corner-radius);
		box-shadow: var(--components-card-box-shadow);
		background-color: var(--components-card-background-color);
		overflow: hidden;
		flex-direction: column;
		flex-grow: 1;
	}

	/* Inner highlight ring, painted on top of the children via a
	   non-interactive ::after so the 1px highlight still reads over
	   edge-to-edge media (e.g. a full-width image) — an inset box-shadow on
	   .card itself would sit beneath the children. border-radius: inherit
	   keeps the ring aligned with the clipped, rounded card edges. */
	.card::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--components-card-highlight-border-color);
		pointer-events: none;
	}


	/* # Elements */

	.card__header {
		flex-shrink: 0;
	}

	.card__header[hidden] {
		display: none;
	}

	.card__main {
		display: flex;
		min-height: 0;
		flex-direction: column;
		flex-grow: 1;
	}

	.card__footer {
		flex-shrink: 0;
	}

	.card__footer[hidden] {
		display: none;
	}
`;
