import { css } from 'lit';
import { boxSizingReset } from '../../../assets/styles/style-resets.js';

export const dividerStyles = css`
	${boxSizingReset}


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
		margin: 0;
		border: none;
		background-color: var(--semantics-dividers-color);
		width: 100%;
		height: var(--semantics-dividers-thickness);
	}

	@media (forced-colors: active) {
		.divider {
			background-color: CanvasText;
		}
	}
`;
