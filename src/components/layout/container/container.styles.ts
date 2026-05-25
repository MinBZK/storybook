import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const containerStyles = css`


	/* # Host — outer chrome (padding + scheme + query container) */

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

		container-type: inline-size;
		display: block;
		height: auto;
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

	:host([hidden]) {
		display: none;
	}


	/* # Inner — actual layout */

	.container {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: var(--_justify-content);
		justify-items: var(--_justify-items);
		align-items: var(--_align-items);
		gap: var(--_gap);

		@media (max-width: ${smMax}) { gap: var(--_sm-gap); }
		@media (min-width: ${mdMin}) and (max-width: ${mdMax}) { gap: var(--_md-gap); }
		@media (min-width: ${lgMin}) { gap: var(--_lg-gap); }

		@container layout-container (max-width: ${smMax}) { gap: var(--_sm-gap); }
		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) { gap: var(--_md-gap); }
		@container layout-container (min-width: ${lgMin}) { gap: var(--_lg-gap); }
	}

	:host([layout="row"]) .container {
		flex-direction: row;
	}

	:host([layout="wrap"]) .container {
		flex-direction: row;
		flex-wrap: wrap;
	}

	:host([layout="grid"]) .container {
		display: grid;
		grid-template-columns: repeat(
			var(--_column-count, auto-fit),
			minmax(var(--_track-min, var(--_min-column-width)), 1fr)
		);
	}

	:host([layout="columns"]) .container {
		display: block;
		columns: var(--_min-column-width);
		column-gap: var(--_gap);
	}

	:host([layout="columns"]) ::slotted(*) {
		break-inside: avoid;
	}

	:host([layout="columns"][column-count]) .container,
	:host([layout="columns"][sm-column-count]) .container,
	:host([layout="columns"][md-column-count]) .container,
	:host([layout="columns"][lg-column-count]) .container {
		column-count: var(--_column-count);
		column-width: auto;
	}


	/* # Column count — base scope */

	:host([column-count="1"]) .container { --_column-count: 1; }
	:host([column-count="2"]) .container { --_column-count: 2; }
	:host([column-count="3"]) .container { --_column-count: 3; }
	:host([column-count="4"]) .container { --_column-count: 4; }
	:host([column-count="5"]) .container { --_column-count: 5; }
	:host([column-count="6"]) .container { --_column-count: 6; }
	:host([column-count="7"]) .container { --_column-count: 7; }
	:host([column-count="8"]) .container { --_column-count: 8; }
	:host([column-count]) .container { --_track-min: 0; }


	/* # Column count — sm scope (queries :host own width) */

	@container (max-width: ${smMax}) {
		:host([sm-column-count="1"]) .container { --_column-count: 1; }
		:host([sm-column-count="2"]) .container { --_column-count: 2; }
		:host([sm-column-count="3"]) .container { --_column-count: 3; }
		:host([sm-column-count="4"]) .container { --_column-count: 4; }
		:host([sm-column-count="5"]) .container { --_column-count: 5; }
		:host([sm-column-count="6"]) .container { --_column-count: 6; }
		:host([sm-column-count="7"]) .container { --_column-count: 7; }
		:host([sm-column-count="8"]) .container { --_column-count: 8; }
		:host([sm-column-count]) .container { --_track-min: 0; }
	}


	/* # Column count — md scope */

	@container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
		:host([md-column-count="1"]) .container { --_column-count: 1; }
		:host([md-column-count="2"]) .container { --_column-count: 2; }
		:host([md-column-count="3"]) .container { --_column-count: 3; }
		:host([md-column-count="4"]) .container { --_column-count: 4; }
		:host([md-column-count="5"]) .container { --_column-count: 5; }
		:host([md-column-count="6"]) .container { --_column-count: 6; }
		:host([md-column-count="7"]) .container { --_column-count: 7; }
		:host([md-column-count="8"]) .container { --_column-count: 8; }
		:host([md-column-count]) .container { --_track-min: 0; }
	}


	/* # Column count — lg scope */

	@container (min-width: ${lgMin}) {
		:host([lg-column-count="1"]) .container { --_column-count: 1; }
		:host([lg-column-count="2"]) .container { --_column-count: 2; }
		:host([lg-column-count="3"]) .container { --_column-count: 3; }
		:host([lg-column-count="4"]) .container { --_column-count: 4; }
		:host([lg-column-count="5"]) .container { --_column-count: 5; }
		:host([lg-column-count="6"]) .container { --_column-count: 6; }
		:host([lg-column-count="7"]) .container { --_column-count: 7; }
		:host([lg-column-count="8"]) .container { --_column-count: 8; }
		:host([lg-column-count]) .container { --_track-min: 0; }
	}


	/* # Reverse — base (applies at all breakpoints) */

	:host([reverse]:not([layout])) .container,
	:host([reverse][layout="stack"]) .container {
		flex-direction: column-reverse;
	}

	:host([reverse][layout="row"]) .container {
		flex-direction: row-reverse;
	}

	:host([reverse][layout="wrap"]) .container {
		flex-direction: row-reverse;
		flex-wrap: wrap-reverse;
	}

	/* Grid + reverse: fall back to flex so the 2D order truly reverses.
	   Trade-off: last row no longer aligns to grid track. */
	:host([reverse][layout="grid"]) .container {
		display: flex;
		flex-direction: row-reverse;
		flex-wrap: wrap-reverse;
	}
	:host([reverse][layout="grid"]) ::slotted(*) {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: var(--_min-column-width);
		min-width: 0;
	}
	:host([reverse][layout="grid"][column-count]) ::slotted(*) {
		flex-basis: calc((100% - (var(--_column-count) - 1) * var(--_gap)) / var(--_column-count));
	}

	/* layout="columns" + reverse: intentional no-op (multicol has no
	   item-order hook). */


	/* # Reverse — sm scope */

	@media (max-width: ${smMax}) {
		:host([sm-reverse]:not([layout])) .container,
		:host([sm-reverse][layout="stack"]) .container { flex-direction: column-reverse; }
		:host([sm-reverse][layout="row"]) .container { flex-direction: row-reverse; }
		:host([sm-reverse][layout="wrap"]) .container { flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([sm-reverse][layout="grid"]) .container { display: flex; flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([sm-reverse][layout="grid"]) ::slotted(*) {
			flex-grow: 1;
			flex-shrink: 1;
			flex-basis: var(--_min-column-width);
			min-width: 0;
		}
		:host([sm-reverse][layout="grid"][column-count]) ::slotted(*) {
			flex-basis: calc((100% - (var(--_column-count) - 1) * var(--_gap)) / var(--_column-count));
		}
	}

	@container layout-container (max-width: ${smMax}) {
		:host([sm-reverse]:not([layout])) .container,
		:host([sm-reverse][layout="stack"]) .container { flex-direction: column-reverse; }
		:host([sm-reverse][layout="row"]) .container { flex-direction: row-reverse; }
		:host([sm-reverse][layout="wrap"]) .container { flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([sm-reverse][layout="grid"]) .container { display: flex; flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([sm-reverse][layout="grid"]) ::slotted(*) {
			flex-grow: 1;
			flex-shrink: 1;
			flex-basis: var(--_min-column-width);
			min-width: 0;
		}
		:host([sm-reverse][layout="grid"][column-count]) ::slotted(*) {
			flex-basis: calc((100% - (var(--_column-count) - 1) * var(--_gap)) / var(--_column-count));
		}
	}


	/* # Reverse — md scope */

	@media (min-width: ${mdMin}) and (max-width: ${mdMax}) {
		:host([md-reverse]:not([layout])) .container,
		:host([md-reverse][layout="stack"]) .container { flex-direction: column-reverse; }
		:host([md-reverse][layout="row"]) .container { flex-direction: row-reverse; }
		:host([md-reverse][layout="wrap"]) .container { flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([md-reverse][layout="grid"]) .container { display: flex; flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([md-reverse][layout="grid"]) ::slotted(*) {
			flex-grow: 1;
			flex-shrink: 1;
			flex-basis: var(--_min-column-width);
			min-width: 0;
		}
		:host([md-reverse][layout="grid"][column-count]) ::slotted(*) {
			flex-basis: calc((100% - (var(--_column-count) - 1) * var(--_gap)) / var(--_column-count));
		}
	}

	@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
		:host([md-reverse]:not([layout])) .container,
		:host([md-reverse][layout="stack"]) .container { flex-direction: column-reverse; }
		:host([md-reverse][layout="row"]) .container { flex-direction: row-reverse; }
		:host([md-reverse][layout="wrap"]) .container { flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([md-reverse][layout="grid"]) .container { display: flex; flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([md-reverse][layout="grid"]) ::slotted(*) {
			flex-grow: 1;
			flex-shrink: 1;
			flex-basis: var(--_min-column-width);
			min-width: 0;
		}
		:host([md-reverse][layout="grid"][column-count]) ::slotted(*) {
			flex-basis: calc((100% - (var(--_column-count) - 1) * var(--_gap)) / var(--_column-count));
		}
	}


	/* # Reverse — lg scope */

	@media (min-width: ${lgMin}) {
		:host([lg-reverse]:not([layout])) .container,
		:host([lg-reverse][layout="stack"]) .container { flex-direction: column-reverse; }
		:host([lg-reverse][layout="row"]) .container { flex-direction: row-reverse; }
		:host([lg-reverse][layout="wrap"]) .container { flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([lg-reverse][layout="grid"]) .container { display: flex; flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([lg-reverse][layout="grid"]) ::slotted(*) {
			flex-grow: 1;
			flex-shrink: 1;
			flex-basis: var(--_min-column-width);
			min-width: 0;
		}
		:host([lg-reverse][layout="grid"][column-count]) ::slotted(*) {
			flex-basis: calc((100% - (var(--_column-count) - 1) * var(--_gap)) / var(--_column-count));
		}
	}

	@container layout-container (min-width: ${lgMin}) {
		:host([lg-reverse]:not([layout])) .container,
		:host([lg-reverse][layout="stack"]) .container { flex-direction: column-reverse; }
		:host([lg-reverse][layout="row"]) .container { flex-direction: row-reverse; }
		:host([lg-reverse][layout="wrap"]) .container { flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([lg-reverse][layout="grid"]) .container { display: flex; flex-direction: row-reverse; flex-wrap: wrap-reverse; }
		:host([lg-reverse][layout="grid"]) ::slotted(*) {
			flex-grow: 1;
			flex-shrink: 1;
			flex-basis: var(--_min-column-width);
			min-width: 0;
		}
		:host([lg-reverse][layout="grid"][column-count]) ::slotted(*) {
			flex-basis: calc((100% - (var(--_column-count) - 1) * var(--_gap)) / var(--_column-count));
		}
	}
`;
