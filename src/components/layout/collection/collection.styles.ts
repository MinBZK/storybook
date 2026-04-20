import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const mdMin = unsafeCSS(breakpoints.mdMin);
const lgMin = unsafeCSS(breakpoints.lgMin);


/* # nldd-collection styles */

export const collectionStyles = css`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 0;
		gap: 16px;
		--_item-width: var(--primitives-area-280);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Items */

	.collection__items {
		display: flex;
		width: 100%;
		gap: var(--components-collection-sm-gap);

		@media (min-width: ${mdMin}) {
			gap: var(--components-collection-md-gap);
		}

		@media (min-width: ${lgMin}) {
			gap: var(--components-collection-lg-gap);
		}
	}


	/* # Grid */

	:host([layout='grid']) .collection__items,
	:host(:not([layout])) .collection__items {
		display: grid;
		/* min(item-width, 100%) clamps the track min to the container width so
		   a single column never forces horizontal overflow on narrow screens. */
		grid-template-columns: repeat(auto-fill, minmax(min(var(--_item-width), 100%), 1fr));
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
		flex-basis: var(--_item-width);
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

	:host([layout='grid']) .collection__footer nldd-button,
	:host([layout='list']) .collection__footer nldd-button,
	:host(:not([layout])) .collection__footer nldd-button {
		width: 100%;
	}

	:host([layout='grid']) .collection__footer nldd-button::part(button),
	:host([layout='list']) .collection__footer nldd-button::part(button),
	:host(:not([layout])) .collection__footer nldd-button::part(button) {
		width: 100%;
	}


	/* # Scroll navigation (horizontal scroll) */

	:host([layout='horizontal-scroll']) .collection__footer {
		justify-content: flex-end;
		gap: var(--primitives-space-16);
	}
`;
