import { css } from 'lit';
import { inheritedTextReset } from '../../../../assets/styles/shadow-resets.js';

export const titleCellStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_width: auto;
		--_min-width: 0;
		--_max-width: none;
		--_min-height: 0;
		--_text-align: start;
		--_secondary-color: var(--context-content-secondary-color, var(--semantics-content-secondary-color));
		--_title-color: var(--context-content-color, var(--semantics-content-color));
		--_title-font: var(--primitives-font-display-5-sm);

		${inheritedTextReset}
		/* !important: shields the row padding from consumer universal resets, which beat normal :host declarations per CSS Scoping. */
		padding-block: var(--context-cell-padding-block, 0px) !important;
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
		flex-basis: 0;
	}

	:host([width="fit-content"]) {
		/* min-content en niet 0 als ondergrens: de cel wijkt zodra de rij te smal
		   wordt, maar houdt de breedte van zijn smalste breekpunt. De tekst breekt
		   met overflow-wrap: anywhere desnoods midden in een woord, dus dat is
		   krap; het houdt de cel wel binnen de rij in plaats van erbuiten. Een
		   eigen min-width van een consument wint hiervan, want die landt inline
		   op de host. */
		--_min-width: min-content;

		width: fit-content;
		flex-grow: 0;
		/* Krimpen mag: fit-content betekent min(max-content, max(min-content,
		   beschikbaar)), en met flex-shrink: 0 hield de cel zijn inhoudsbreedte
		   vast en duwde hij alles erachter de rij uit. */
		flex-shrink: 1;
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


	/* # Horizontal alignment */

	:host([horizontal-alignment="left"]),
	:host(:not([horizontal-alignment])) {
		align-items: flex-start;
	}

	:host([horizontal-alignment="center"]) {
		--_text-align: center;
		align-items: center;
	}

	:host([horizontal-alignment="right"]) {
		--_text-align: right;
		align-items: flex-end;
	}


	/* # Size */

	:host([size="1"]) {
		--_title-font: var(--primitives-font-display-1-sm);
	}

	:host([size="2"]) {
		--_title-font: var(--primitives-font-display-2-sm);
	}

	:host([size="3"]) {
		--_title-font: var(--primitives-font-display-3-sm);
	}

	:host([size="4"]) {
		--_title-font: var(--primitives-font-display-4-sm);
	}

	:host([size="6"]) {
		--_title-font: var(--primitives-font-display-6-sm);
	}


	/* # Color */

	:host([color="secondary"]) {
		--_title-color: var(--context-content-secondary-color, var(--semantics-content-secondary-color));
	}

	:host([color="accent"]) {
		--_secondary-color: var(--context-content-accent-color, var(--semantics-content-accent-color));
		--_title-color: var(--context-content-accent-color, var(--semantics-content-accent-color));
	}

	:host([color="success"]) {
		--_secondary-color: var(--context-content-success-color, var(--semantics-content-success-color));
		--_title-color: var(--context-content-success-color, var(--semantics-content-success-color));
	}

	:host([color="warning"]) {
		--_secondary-color: var(--context-content-warning-color, var(--semantics-content-warning-color));
		--_title-color: var(--context-content-warning-color, var(--semantics-content-warning-color));
	}

	:host([color="critical"]) {
		--_secondary-color: var(--context-content-critical-color, var(--semantics-content-critical-color));
		--_title-color: var(--context-content-critical-color, var(--semantics-content-critical-color));
	}


	/* # Elements */

	.title-cell__overline {
		margin: 0;
		min-width: 0;
		align-self: stretch;
		text-align: var(--_text-align);
		color: var(--_secondary-color);
		font: var(--primitives-font-body-xs-regular-tight);
		overflow-wrap: anywhere;
	}

	.title-cell__title {
		margin: 0;
		min-width: 0;
		align-self: stretch;
		text-align: var(--_text-align);
		color: var(--_title-color);
		font: var(--_title-font);
		overflow-wrap: break-word;
		text-wrap: pretty;
	}

	@media (forced-colors: active) {
		.title-cell__title {
			forced-color-adjust: none;
		}
	}

	.title-cell__supporting-text {
		margin: 0;
		min-width: 0;
		align-self: stretch;
		text-align: var(--_text-align);
		color: var(--_secondary-color);
		font: var(--primitives-font-body-sm-regular-tight);
		overflow-wrap: anywhere;
	}
`;
