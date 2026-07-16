import { css } from 'lit';
import { inheritedTextReset } from '../../../../assets/styles/style-resets.js';

export const textCellStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_width: auto;
		--_min-width: 0;
		--_max-width: none;
		--_min-height: 0;
		--_secondary-color: var(--context-content-secondary-color, var(--semantics-content-secondary-color));
		--_secondary-font: var(--primitives-font-body-xs-regular-tight);
		--_text-align: start;
		--_text-color: var(--context-content-color, var(--semantics-content-color));
		--_text-font: var(--primitives-font-body-md-regular-tight);

		${inheritedTextReset}
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

	:host([size="sm"]) {
		--_secondary-font: var(--primitives-font-body-xxs-regular-tight);
		--_text-font: var(--primitives-font-body-sm-regular-tight);
	}


	/* # Color */

	:host([color="secondary"]) {
		--_text-color: var(--context-content-secondary-color, var(--semantics-content-secondary-color));
	}

	:host([color="accent"]) {
		--_secondary-color: var(--context-content-accent-color, var(--semantics-content-accent-color));
		--_text-color: var(--context-content-accent-color, var(--semantics-content-accent-color));
	}

	:host([color="success"]) {
		--_secondary-color: var(--context-content-success-color, var(--semantics-content-success-color));
		--_text-color: var(--context-content-success-color, var(--semantics-content-success-color));
	}

	:host([color="warning"]) {
		--_secondary-color: var(--context-content-warning-color, var(--semantics-content-warning-color));
		--_text-color: var(--context-content-warning-color, var(--semantics-content-warning-color));
	}

	:host([color="critical"]) {
		--_secondary-color: var(--context-content-critical-color, var(--semantics-content-critical-color));
		--_text-color: var(--context-content-critical-color, var(--semantics-content-critical-color));
	}


	/* # Elements */

	.text-cell__overline {
		margin: 0;
		min-width: 0;
		align-self: stretch;
		text-align: var(--_text-align);
		color: var(--_secondary-color);
		font: var(--_secondary-font);
		overflow-wrap: anywhere;
	}

	.text-cell__text {
		margin: 0;
		min-width: 0;
		align-self: stretch;
		text-align: var(--_text-align);
		color: var(--_text-color);
		font: var(--_text-font);
		overflow-wrap: anywhere;
		text-wrap: pretty;
	}

	@media (forced-colors: active) {
		.text-cell__text {
			forced-color-adjust: none;
		}
	}

	.text-cell__supporting-text {
		margin: 0;
		min-width: 0;
		align-self: stretch;
		text-align: var(--_text-align);
		color: var(--_secondary-color);
		font: var(--_secondary-font);
		overflow-wrap: anywhere;
	}
`;
