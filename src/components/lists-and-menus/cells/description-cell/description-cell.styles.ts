import { css } from 'lit';

export const descriptionCellStyles = css`


	/* # Host */

	:host {
		--_width: auto;
		--_min-width: 0;
		--_max-width: none;
		--_min-height: 0;

		display: flex;
		width: var(--_width);
		min-width: var(--_min-width);
		max-width: var(--_max-width);
		min-height: var(--_min-height);
		flex-direction: column;
		justify-content: center;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Width */

	:host([width="full"]),
	:host(:not([width])),
	:host([width=""]) {
		flex-grow: 1;
		flex-shrink: 1;
	}

	:host([width="fit-content"]) {
		width: fit-content;
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: auto;
	}

	:host([width]:not([width="full"]):not([width="fit-content"]):not([width=""])) {
		flex-shrink: 0;
	}

	:host([max-width]) {
		flex-basis: var(--_max-width);
	}


	/* # Vertical alignment */

	/* "center" (default) stretches to the full row height then centers content;
	   use vertical-alignment="top" for strict top without a minimum height */

	:host([vertical-alignment="center"]),
	:host(:not([vertical-alignment])) {
		align-self: stretch;
	}

	:host([vertical-alignment="top"]) {
		align-self: flex-start;
	}

	:host([vertical-alignment="bottom"]) {
		align-self: flex-end;
	}


	/* # Elements */

	::slotted([slot="title"]) {
		margin: 0;
		min-width: 0;
		align-self: stretch;
		color: var(--context-cell-content-color, var(--semantics-content-secondary-color));
		font: var(--primitives-font-body-sm-regular-flat);
	}

	@media (forced-colors: active) {
		::slotted([slot="title"]) {
			forced-color-adjust: none;
		}
	}

	::slotted([slot="description"]) {
		margin: 0;
		min-width: 0;
		align-self: stretch;
		color: var(--context-cell-content-color, var(--semantics-content-color));
		font: var(--primitives-font-body-md-regular-tight);
	}

	@media (forced-colors: active) {
		::slotted([slot="description"]) {
			forced-color-adjust: none;
		}
	}
`;
