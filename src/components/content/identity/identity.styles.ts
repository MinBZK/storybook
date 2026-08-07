import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';
import { inheritedTextReset } from '../../../assets/styles/shadow-resets.js';

const smMax = unsafeCSS(breakpoints.smMax);

export const identityStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_gap: var(--primitives-space-8);
		--_text-color: var(--semantics-content-color);
		--_text-font: var(--primitives-font-body-md-medium-tight);
		--_supporting-text-color: var(--semantics-content-secondary-color);
		--_supporting-text-font: var(--primitives-font-body-sm-regular-tight);

		${inheritedTextReset}
		container-type: inline-size;
		display: block;
		width: 100%;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Identity */

	.identity {
		display: flex;
		align-items: center;
		gap: var(--_gap);
	}

	.identity[data-multiple-avatars] {
		@container (max-width: ${smMax}) {
			flex-direction: column;
			align-items: flex-start;
		}
	}


	/* # Avatars

	   The avatars themselves belong to nldd-avatar-group: it sizes them, makes
	   them overlap and draws the ring. Identity only decides where the row
	   sits. Note that a group has to be slotted by the consumer — an avatar
	   forwarded through this slot never becomes a child of a group rendered
	   here, and ::slotted() only reaches its own assigned nodes. */

	.identity__avatars {
		display: flex;
	}

	.identity__avatars[hidden] {
		display: none;
	}


	/* # Text area */

	.identity__text-area {
		display: flex;
		min-width: 0;
		flex-direction: column;
	}

	.identity__text-area[hidden] {
		display: none;
	}

	.identity__text {
		margin: 0;
		color: var(--_text-color);
		font: var(--_text-font);
		text-wrap: pretty;
	}

	.identity__text[hidden] {
		display: none;
	}

	.identity__supporting-text {
		margin: 0;
		color: var(--_supporting-text-color);
		font: var(--_supporting-text-font);
		text-wrap: pretty;
	}

	.identity__supporting-text[hidden] {
		display: none;
	}
`;
