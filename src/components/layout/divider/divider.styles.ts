import { css } from 'lit';

export const dividerStyles = css`


	/* # Host */

	:host {
		display: block;
		flex-shrink: 0;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.divider {
		display: block;
		width: 100%;
		height: var(--semantics-dividers-thickness);
		margin: 0;
		border: none;
		background-color: var(--semantics-dividers-color);

		@media (forced-colors: active) {
			background-color: CanvasText;
		}
	}
`;
