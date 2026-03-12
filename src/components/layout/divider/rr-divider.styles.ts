import { css } from 'lit';


/* # rr-divider styles */

export const dividerStyles = css`
	:host {
		display: block;
		flex-shrink: 0;
	}

	:host([hidden]) {
		display: none;
	}

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
