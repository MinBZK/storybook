import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.ts';

const mdMin = unsafeCSS(breakpoints.mdMin);


/* # ndd-collection styles */

export const collectionStyles = css`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 0;
		gap: 16px;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Items */

	.collection__items {
		display: flex;
		width: 100%;
		gap: var(--primitives-space-16);

		@media (min-width: ${mdMin}) {
			gap: var(--primitives-space-24);
		}
	}


	/* # Grid */

	:host([layout='grid']) .collection__items,
	:host(:not([layout])) .collection__items {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--primitives-area-280), 1fr));
	}


	/* # List */

	:host([layout='list']) .collection__items {
		flex-direction: column;
	}


	/* # Horizontal scroll */

	:host([layout='horizontal-scroll']) .collection__items {
		flex-direction: row;
		flex-wrap: nowrap;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		margin-inline-start: calc(var(--primitives-space-16) * -1);
		padding-inline-start: var(--primitives-space-16);
		scroll-padding-inline-start: var(--primitives-space-16);
		padding-block: var(--primitives-space-16);
		margin-block: calc(var(--primitives-space-16) * -1);
		mask-image: linear-gradient(
			to right,
			transparent 0,
			black var(--primitives-space-16),
			black calc(100% - var(--primitives-space-48)),
			transparent 100%
		);
	}

	:host([layout='horizontal-scroll']) .collection__items::after {
		content: '';
		flex: 0 0 var(--primitives-space-48);
	}

	:host([layout='horizontal-scroll']) .collection__items::-webkit-scrollbar {
		display: none;
	}

	:host([layout='horizontal-scroll']) .collection__items ::slotted(*) {
		flex-grow: 1;
		flex-shrink: 0;
		flex-basis: var(--primitives-area-280);
		scroll-snap-align: start;
	}


	/* # Footer */

	.collection__footer {
		display: flex;
		width: 100%;
	}


	/* # Load more (grid/list) */

	:host([layout='grid']) .collection__footer,
	:host([layout='list']) .collection__footer,
	:host(:not([layout])) .collection__footer {
		justify-content: stretch;
	}

	:host([layout='grid']) .collection__footer ndd-button,
	:host([layout='list']) .collection__footer ndd-button,
	:host(:not([layout])) .collection__footer ndd-button {
		width: 100%;
	}

	:host([layout='grid']) .collection__footer ndd-button::part(button),
	:host([layout='list']) .collection__footer ndd-button::part(button),
	:host(:not([layout])) .collection__footer ndd-button::part(button) {
		width: 100%;
	}


	/* # Scroll navigation (horizontal scroll) */

	:host([layout='horizontal-scroll']) .collection__footer {
		justify-content: flex-end;
		gap: var(--primitives-space-16);
	}
`;
