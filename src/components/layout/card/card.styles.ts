import { css } from 'lit';


/* # ndd-card styles */

export const cardStyles = css`


	/* # Host */

	:host {
		display: flex;
		flex-direction: column;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Card */

	.card {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		background-color: var(--components-card-background-color);
		border-radius: var(--components-card-corner-radius);
		box-shadow: var(--components-card-box-shadow);
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;
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
		flex-direction: column;
		flex-grow: 1;
		min-height: 0;
	}


	/* # Footer */

	.card__footer {
		flex-shrink: 0;
	}

	.card__footer[hidden] {
		display: none;
	}
`;
