import { css } from 'lit';

export const cardStyles = css`


	/* # Host */

	:host {
		--_highlight-border: inset 0 0 0 var(--components-card-highlight-border-width) var(--components-card-highlight-border-color);

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

	.card::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		box-shadow: var(--_highlight-border);
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
