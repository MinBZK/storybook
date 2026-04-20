import { css } from 'lit';

export const iconStyles = css`


	/* # Host */

	:host {
		display: inline-block;
		width: 100%;
		height: 100%;
		aspect-ratio: 1 / 1;
		color: inherit;
	}

	.icon__container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	svg {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;
