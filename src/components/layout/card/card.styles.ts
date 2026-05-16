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
		border-radius: var(--components-card-corner-radius);
		box-shadow: var(--components-card-box-shadow);
		background-color: var(--components-card-background-color);
		overflow: hidden;
		flex-direction: column;
		flex-grow: 1;
	}


	/* # Header */

	.card__header {
		flex-shrink: 0;
	}

	.card__header[hidden] {
		display: none;
	}


	/* # Main */

	.card__main {
		display: flex;
		min-height: 0;
		flex-direction: column;
		flex-grow: 1;
	}


	/* # Footer */

	.card__footer {
		flex-shrink: 0;
	}

	.card__footer[hidden] {
		display: none;
	}
`;
