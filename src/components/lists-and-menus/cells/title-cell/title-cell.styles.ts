import { css } from 'lit';

export const titleCellStyles = css`


	/* # Host */

	:host {
		--_width: auto;
		--_min-width: 0;
		--_max-width: none;
		--_min-height: 0;
		--_text-align: start;
		--_secondary-color: var(--context-cell-content-color, var(--semantics-content-secondary-color));
		--_title-color: var(--context-cell-content-color, var(--semantics-content-color));
		--_title-font: var(--primitives-font-display-5-sm);

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
		--_title-color: var(--context-cell-content-secondary-color, var(--semantics-content-secondary-color));
	}

	:host([color="accent"]) {
		--_secondary-color: var(--context-cell-content-accent-color, var(--semantics-content-accent-color));
		--_title-color: var(--context-cell-content-accent-color, var(--semantics-content-accent-color));
	}

	:host([color="success"]) {
		--_secondary-color: var(--context-cell-content-success-color, var(--semantics-content-success-color));
		--_title-color: var(--context-cell-content-success-color, var(--semantics-content-success-color));
	}

	:host([color="warning"]) {
		--_secondary-color: var(--context-cell-content-warning-color, var(--semantics-content-warning-color));
		--_title-color: var(--context-cell-content-warning-color, var(--semantics-content-warning-color));
	}

	:host([color="critical"]) {
		--_secondary-color: var(--context-cell-content-critical-color, var(--semantics-content-critical-color));
		--_title-color: var(--context-cell-content-critical-color, var(--semantics-content-critical-color));
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
