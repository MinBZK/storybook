import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const mdMin = unsafeCSS(breakpoints.mdMin);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const collectionStyles = css`


	/* # Host */

	:host {
		--_item-width: var(--primitives-area-280);
		--_focus-ring-z-index: 1;

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

	/* ## Stack ('list' is a deprecated alias) */

	:host([layout="stack"]) .collection__items,
	:host([layout="list"]) .collection__items {
		flex-direction: column;
	}

	/* ## Horizontal scroll */

	:host([layout="horizontal-scroll"]) .collection__items {
		margin-inline: calc(var(--primitives-space-16) * -1);
		margin-block: calc(var(--primitives-space-16) * -1);
		overflow-x: auto;
		padding-inline: var(--primitives-space-16);
		padding-block: var(--primitives-space-16);
		flex-direction: row;
		flex-wrap: nowrap;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		scroll-padding-inline-start: var(--primitives-space-16);
	}

	:host([layout="horizontal-scroll"][scrollable]) .collection__items {
		mask-image: linear-gradient(
			to right,
			transparent 0,
			black var(--primitives-space-16),
			black calc(100% - var(--primitives-space-16)),
			transparent 100%
		);
	}

	:host([layout="horizontal-scroll"]) .collection__items::-webkit-scrollbar {
		display: none;
	}

	:host([layout="horizontal-scroll"]) .collection__items ::slotted(*) {
		max-width: 100%;
		flex-grow: 1;
		flex-shrink: 0;
		flex-basis: var(--_item-width);
		scroll-snap-align: start;
	}

	/* The horizontal-scroll items has a mask-image that fades the left
	 * and right edges, which would clip an outline drawn directly on it.
	 * The .collection__scroll-area wrapper has no mask and is the layout
	 * box that matches the visible content area; its ::after sits above
	 * slotted cards via z-index, so card box-shadows can't overlap the
	 * ring. :has() works here because both elements are in the same
	 * shadow tree (unlike :host(:has()), which doesn't pierce). */
	.collection__scroll-area {
		position: relative;
	}

	.collection__items:focus-visible {
		outline: none;
	}

	.collection__scroll-area:has(.collection__items:focus-visible)::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: var(--_focus-ring-z-index);
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
		pointer-events: none;
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
