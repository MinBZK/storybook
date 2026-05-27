import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const mdMin = unsafeCSS(breakpoints.mdMin);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const collectionStyles = css`


	/* # Host */

	:host {
		--_item-width: var(--primitives-area-280);

		display: flex;
		width: 100%;
		min-width: 0;
		flex-direction: column;
		gap: var(--components-collection-sm-gap);

		@media (min-width: ${mdMin}) {
			gap: var(--components-collection-md-gap);
		}

		@media (min-width: ${lgMin}) {
			gap: var(--components-collection-lg-gap);
		}
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

	/* ## Grid */

	:host([layout="grid"]) .collection__items,
	:host(:not([layout])) .collection__items {
		/* min(item-width, 100%) clamps the track min to the container width so
		   a single column never forces horizontal overflow on narrow screens. */
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(var(--_item-width), 100%), 1fr));
	}

	/* ## List */

	:host([layout="list"]) .collection__items {
		flex-direction: column;
	}

	/* ## Horizontal scroll */

	:host([layout="horizontal-scroll"]) .collection__items {
		margin-inline-start: calc(var(--primitives-space-16) * -1);
		margin-block: calc(var(--primitives-space-16) * -1);
		overflow-x: auto;
		padding-inline-start: var(--primitives-space-16);
		padding-block: var(--primitives-space-16);
		flex-direction: row;
		flex-wrap: nowrap;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		scroll-padding-inline-start: var(--primitives-space-16);
		mask-image: linear-gradient(
			to right,
			transparent 0,
			black var(--primitives-space-16),
			black calc(100% - var(--primitives-space-48)),
			transparent 100%
		);
	}

	:host([layout="horizontal-scroll"]) .collection__items::after {
		content: '';
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: var(--primitives-space-48);
	}

	:host([layout="horizontal-scroll"]) .collection__items::-webkit-scrollbar {
		display: none;
	}

	:host([layout="horizontal-scroll"]) .collection__items ::slotted(*) {
		flex-grow: 1;
		flex-shrink: 0;
		flex-basis: var(--_item-width);
		scroll-snap-align: start;
	}

	/* The horizontal-scroll items has a mask-image that fades the left and
	 * right edges, which would clip an outline rendered directly on it.
	 * Render the focus-ring on the host instead — the host has no mask
	 * and its bounding box matches the visible content area (items
	 * extends outside via negative margins, exactly the area the mask
	 * fades away). The host is flagged via an is-focus-on-items attribute
	 * by the component when items has keyboard focus — :host(:has())
	 * doesn't pierce shadow boundaries in current browsers. */
	.collection__items:focus-visible {
		outline: none;
	}

	:host([is-focus-on-items]) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Footer */

	.collection__footer {
		display: flex;
		width: 100%;
	}

	.collection__footer[hidden] {
		display: none;
	}

	/* ## Scroll navigation — horizontal scroll */

	:host([layout="horizontal-scroll"]) .collection__footer {
		justify-content: flex-end;
		gap: var(--primitives-space-16);
	}
`;
