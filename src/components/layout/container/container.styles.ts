import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const containerStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host — external contract; padding and the query container live on
	   .container in the shadow root, out of reach of consumer resets */

	:host {
		--_min-column-width: var(--primitives-area-280);
		--_justify-content: initial;
		--_justify-items: initial;
		--_align-items: initial;
		--_gap: 0;
		--_sm-gap: var(--_gap);
		--_md-gap: var(--_gap);
		--_lg-gap: var(--_gap);
		--_padding-top: 0;
		--_padding-right: 0;
		--_padding-bottom: 0;
		--_padding-left: 0;
		--_sm-padding-top: var(--_padding-top);
		--_sm-padding-right: var(--_padding-right);
		--_sm-padding-bottom: var(--_padding-bottom);
		--_sm-padding-left: var(--_padding-left);
		--_md-padding-top: var(--_padding-top);
		--_md-padding-right: var(--_padding-right);
		--_md-padding-bottom: var(--_padding-bottom);
		--_md-padding-left: var(--_padding-left);
		--_lg-padding-top: var(--_padding-top);
		--_lg-padding-right: var(--_padding-right);
		--_lg-padding-bottom: var(--_padding-bottom);
		--_lg-padding-left: var(--_padding-left);
		--_slot-order: 0;
		--_slot-sm-order: var(--_slot-order);
		--_slot-md-order: var(--_slot-order);
		--_slot-lg-order: var(--_slot-order);
		/* One resolved gap for every layout to read. Multicol splits the gap
		   over two properties (column-gap plus a margin on the items), so a
		   per-breakpoint declaration would have to be repeated in three
		   rules; swapping the var keeps that in one place. */
		--_resolved-gap: var(--_gap);

		@media (max-width: ${smMax}) { --_resolved-gap: var(--_sm-gap); }
		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) { --_resolved-gap: var(--_md-gap); }
		@media (min-width: ${lgMin}) { --_resolved-gap: var(--_lg-gap); }

		@container layout-container (max-width: ${smMax}) { --_resolved-gap: var(--_sm-gap); }
		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) { --_resolved-gap: var(--_md-gap); }
		@container layout-container (min-width: ${lgMin}) { --_resolved-gap: var(--_lg-gap); }

		display: block;
		width: 100%;
		height: auto;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Outer chrome — padding + query container. Size queries measure the
	   content box, so .container reports the same padded interior width the
	   host reported when it carried the padding itself. */

	.container {
		container-type: inline-size;
		box-sizing: border-box;
		padding-top: var(--_padding-top);
		padding-right: var(--_padding-right);
		padding-bottom: var(--_padding-bottom);
		padding-left: var(--_padding-left);

		@media (max-width: ${smMax}) {
			padding-top: var(--_sm-padding-top);
			padding-right: var(--_sm-padding-right);
			padding-bottom: var(--_sm-padding-bottom);
			padding-left: var(--_sm-padding-left);
		}

		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-top: var(--_md-padding-top);
			padding-right: var(--_md-padding-right);
			padding-bottom: var(--_md-padding-bottom);
			padding-left: var(--_md-padding-left);
		}

		@media (min-width: ${lgMin}) {
			padding-top: var(--_lg-padding-top);
			padding-right: var(--_lg-padding-right);
			padding-bottom: var(--_lg-padding-bottom);
			padding-left: var(--_lg-padding-left);
		}

		@container layout-container (max-width: ${smMax}) {
			padding-top: var(--_sm-padding-top);
			padding-right: var(--_sm-padding-right);
			padding-bottom: var(--_sm-padding-bottom);
			padding-left: var(--_sm-padding-left);
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			padding-top: var(--_md-padding-top);
			padding-right: var(--_md-padding-right);
			padding-bottom: var(--_md-padding-bottom);
			padding-left: var(--_md-padding-left);
		}

		@container layout-container (min-width: ${lgMin}) {
			padding-top: var(--_lg-padding-top);
			padding-right: var(--_lg-padding-right);
			padding-bottom: var(--_lg-padding-bottom);
			padding-left: var(--_lg-padding-left);
		}
	}


	/* # Inner — actual layout */

	.container__inner {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: var(--_justify-content);
		justify-items: var(--_justify-items);
		align-items: var(--_align-items);
		gap: var(--_resolved-gap);
	}

	/* Fills the space it is given and puts its content in the middle of it: for a
	   state that should own the area rather than sit at the top of it (an empty
	   list, a spinner). An explicit horizontal-alignment or vertical-alignment
	   still wins — those land as inline custom properties on the host. */
	:host([centered]) {
		flex-grow: 1;
		align-self: stretch;
		--_justify-content: center;
		--_align-items: center;
	}

	:host([centered]) .container {
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	:host([centered]) .container__inner {
		flex: 1;
	}

	:host([layout="row"]) .container__inner {
		flex-direction: row;
	}

	:host([layout="wrap"]) .container__inner {
		flex-direction: row;
		flex-wrap: wrap;
	}

	:host([layout="grid"]) .container__inner {
		display: grid;
		grid-template-columns: repeat(
			var(--_column-count, auto-fit),
			minmax(var(--_track-min, var(--_min-column-width)), 1fr)
		);
	}

	:host([layout="columns"]) .container__inner {
		display: block;
		columns: var(--_min-column-width);
		column-gap: var(--_resolved-gap);
	}

	:host([layout="columns"]) ::slotted(*) {
		break-inside: avoid;
	}

	/* Lanes â native CSS grid-lanes where supported, CSS multicol fallback
	   otherwise. CSS-only (no JS). Fallback flows column-order; native lanes
	   packs shortest-column (row-order). */
	:host([layout="lanes"]) .container__inner {
		display: block;
		columns: var(--_min-column-width);
		column-gap: var(--_resolved-gap);
	}

	:host([layout="lanes"]) ::slotted(*) {
		break-inside: avoid;
		/* multicol has no row-gap; item margin supplies the vertical gap. The
		   native branch resets this (grid-lanes gap covers both axes). */
		margin-bottom: var(--_resolved-gap);
	}

	@supports (display: grid-lanes) {
		:host([layout="lanes"]) .container__inner {
			display: grid-lanes;
			grid-template-columns: repeat(
				var(--_column-count, auto-fill),
				minmax(var(--_track-min, var(--_min-column-width)), 1fr)
			);
		}

		:host([layout="lanes"]) ::slotted(*) {
			margin-bottom: 0;
		}
	}

	:host([layout="columns"][column-count]) .container__inner,
	:host([layout="columns"][sm-column-count]) .container__inner,
	:host([layout="columns"][md-column-count]) .container__inner,
	:host([layout="columns"][lg-column-count]) .container__inner,
	:host([layout="lanes"][column-count]) .container__inner,
	:host([layout="lanes"][sm-column-count]) .container__inner,
	:host([layout="lanes"][md-column-count]) .container__inner,
	:host([layout="lanes"][lg-column-count]) .container__inner {
		column-count: var(--_column-count);
		column-width: auto;
	}


	/* # Column count — base scope */

	:host([column-count="1"]) .container__inner { --_column-count: 1; }
	:host([column-count="2"]) .container__inner { --_column-count: 2; }
	:host([column-count="3"]) .container__inner { --_column-count: 3; }
	:host([column-count="4"]) .container__inner { --_column-count: 4; }
	:host([column-count="5"]) .container__inner { --_column-count: 5; }
	:host([column-count="6"]) .container__inner { --_column-count: 6; }
	:host([column-count="7"]) .container__inner { --_column-count: 7; }
	:host([column-count="8"]) .container__inner { --_column-count: 8; }
	:host([column-count]) .container__inner { --_track-min: 0; }


	/* # Column count — sm scope (queries :host own width) */

	@container (max-width: ${smMax}) {
		:host([sm-column-count="1"]) .container__inner { --_column-count: 1; }
		:host([sm-column-count="2"]) .container__inner { --_column-count: 2; }
		:host([sm-column-count="3"]) .container__inner { --_column-count: 3; }
		:host([sm-column-count="4"]) .container__inner { --_column-count: 4; }
		:host([sm-column-count="5"]) .container__inner { --_column-count: 5; }
		:host([sm-column-count="6"]) .container__inner { --_column-count: 6; }
		:host([sm-column-count="7"]) .container__inner { --_column-count: 7; }
		:host([sm-column-count="8"]) .container__inner { --_column-count: 8; }
		:host([sm-column-count]) .container__inner { --_track-min: 0; }
	}


	/* # Column count — md scope */

	@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
		:host([md-column-count="1"]) .container__inner { --_column-count: 1; }
		:host([md-column-count="2"]) .container__inner { --_column-count: 2; }
		:host([md-column-count="3"]) .container__inner { --_column-count: 3; }
		:host([md-column-count="4"]) .container__inner { --_column-count: 4; }
		:host([md-column-count="5"]) .container__inner { --_column-count: 5; }
		:host([md-column-count="6"]) .container__inner { --_column-count: 6; }
		:host([md-column-count="7"]) .container__inner { --_column-count: 7; }
		:host([md-column-count="8"]) .container__inner { --_column-count: 8; }
		:host([md-column-count]) .container__inner { --_track-min: 0; }
	}


	/* # Column count — lg scope */

	@container (min-width: ${lgMin}) {
		:host([lg-column-count="1"]) .container__inner { --_column-count: 1; }
		:host([lg-column-count="2"]) .container__inner { --_column-count: 2; }
		:host([lg-column-count="3"]) .container__inner { --_column-count: 3; }
		:host([lg-column-count="4"]) .container__inner { --_column-count: 4; }
		:host([lg-column-count="5"]) .container__inner { --_column-count: 5; }
		:host([lg-column-count="6"]) .container__inner { --_column-count: 6; }
		:host([lg-column-count="7"]) .container__inner { --_column-count: 7; }
		:host([lg-column-count="8"]) .container__inner { --_column-count: 8; }
		:host([lg-column-count]) .container__inner { --_track-min: 0; }
	}


	/* # Slot order — per-child via order / sm-order / md-order / lg-order
	   attributes on slotted children. Container JS bridges those to
	   --_slot-{attr} inline custom props on the child; the queries below
	   pick the right value per breakpoint with var() cascading
	   sm/md/lg-order → order → 0. No-op for layout="columns" (multicol). */

	::slotted(*) {
		/* Keep padded slotted items inside their track (multicol/grid columns). */
		box-sizing: border-box;
		order: var(--_slot-order, 0);
	}

	@container (max-width: ${smMax}) {
		::slotted(*) { order: var(--_slot-sm-order, var(--_slot-order, 0)); }
	}

	@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
		::slotted(*) { order: var(--_slot-md-order, var(--_slot-order, 0)); }
	}

	@container (min-width: ${lgMin}) {
		::slotted(*) { order: var(--_slot-lg-order, var(--_slot-order, 0)); }
	}
`;
