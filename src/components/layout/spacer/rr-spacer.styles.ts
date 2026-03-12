import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.ts';


/* # rr-spacer styles */

export const spacerStyles = css`
	:host {
		display: block;
		flex-shrink: 0;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Flexible and responsive */

	:host([size='flexible']) {
		flex: 1;
		min-width: 0;
		min-height: 0;
	}

	:host([size='md']) {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);

		@media (min-width: ${unsafeCSS(breakpoints.smMax)}) {
			width: var(--primitives-space-24);
			height: var(--primitives-space-24);
		}
	}


	/* # Fixed sizes */

	:host([size='2']) {
		width: var(--primitives-space-2);
		height: var(--primitives-space-2);
	}

	:host([size='4']) {
		width: var(--primitives-space-4);
		height: var(--primitives-space-4);
	}

	:host([size='6']) {
		width: var(--primitives-space-6);
		height: var(--primitives-space-6);
	}

	:host([size='16']),
	:host(:not([size])) {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}

	:host([size='8']) {
		width: var(--primitives-space-8);
		height: var(--primitives-space-8);
	}

	:host([size='10']) {
		width: var(--primitives-space-10);
		height: var(--primitives-space-10);
	}

	:host([size='12']) {
		width: var(--primitives-space-12);
		height: var(--primitives-space-12);
	}

	:host([size='16']) {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}

	:host([size='20']) {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
	}

	:host([size='24']) {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
	}

	:host([size='28']) {
		width: var(--primitives-space-28);
		height: var(--primitives-space-28);
	}

	:host([size='32']) {
		width: var(--primitives-space-32);
		height: var(--primitives-space-32);
	}

	:host([size='40']) {
		width: var(--primitives-space-40);
		height: var(--primitives-space-40);
	}

	:host([size='44']) {
		width: var(--primitives-space-44);
		height: var(--primitives-space-44);
	}

	:host([size='48']) {
		width: var(--primitives-space-48);
		height: var(--primitives-space-48);
	}

	:host([size='56']) {
		width: var(--primitives-space-56);
		height: var(--primitives-space-56);
	}

	:host([size='64']) {
		width: var(--primitives-space-64);
		height: var(--primitives-space-64);
	}

	:host([size='80']) {
		width: var(--primitives-space-80);
		height: var(--primitives-space-80);
	}

	:host([size='96']) {
		width: var(--primitives-space-96);
		height: var(--primitives-space-96);
	}


	/* # Direction modifiers */

	:host([direction='horizontal']) {
		height: auto;
	}

	:host([direction='vertical']) {
		width: auto;
	}

	:host([size='flexible'][direction='horizontal']) {
		height: auto;
		min-height: auto;
	}

	:host([size='flexible'][direction='vertical']) {
		width: auto;
		min-width: auto;
	}
`;
