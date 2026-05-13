import { css } from 'lit';

export const textCellStyles = css`


	/* # Host */

	:host {
		--_width: auto;
		--_min-width: 0;
		--_max-width: none;
		--_min-height: 0;

		display: flex;
		flex-direction: column;
		justify-content: center;
		width: var(--_width);
		min-width: var(--_min-width);
		max-width: var(--_max-width);
		min-height: var(--_min-height);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Width */

	:host([width='full']),
	:host(:not([width])),
	:host([width='']) {
		flex-grow: 1;
		flex-shrink: 1;
	}

	:host([width='fit-content']) {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: auto;
		width: fit-content;
	}

	:host([width]:not([width='full']):not([width='fit-content']):not([width=''])) {
		flex-shrink: 0;
	}

	:host([max-width]) {
		flex-basis: var(--_max-width);
	}


	/* # Vertical alignment
	 *
	 * 'center' (default): the cell stretches to fill the full row height, then
	 * centers its content within that space. When min-height is set, the cell is
	 * at least that tall and the content sits centered inside it. For strict top
	 * alignment without a minimum height, use vertical-alignment="top".
	 */

	:host([vertical-alignment='center']),
	:host(:not([vertical-alignment])) {
		align-self: stretch;
	}

	:host([vertical-alignment='top']) {
		align-self: flex-start;
	}

	:host([vertical-alignment='bottom']) {
		align-self: flex-end;
	}


	/* # Horizontal alignment */

	:host([horizontal-alignment='left']),
	:host(:not([horizontal-alignment])) {
		align-items: flex-start;
	}

	:host([horizontal-alignment='center']) {
		align-items: center;
	}

	:host([horizontal-alignment='right']) {
		align-items: flex-end;
	}


	/* # Overline */

	.text-cell__overline {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		overflow-wrap: anywhere;
		color: var(--context-cell-content-color, var(--semantics-content-secondary-color));
	}

	:host([size='md']) .text-cell__overline,
	:host(:not([size])) .text-cell__overline {
		font: var(--primitives-font-body-xs-regular-tight);
	}

	:host([size='sm']) .text-cell__overline {
		font: var(--primitives-font-body-xxs-regular-tight);
	}

	:host([horizontal-alignment='center']) .text-cell__overline {
		text-align: center;
	}

	:host([horizontal-alignment='right']) .text-cell__overline {
		text-align: right;
	}


	/* # Text */

	.text-cell__text {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		overflow-wrap: anywhere;
		text-wrap: pretty;
	}

	:host([size='md']) .text-cell__text,
	:host(:not([size])) .text-cell__text {
		font: var(--primitives-font-body-md-regular-tight);
	}

	:host([size='sm']) .text-cell__text {
		font: var(--primitives-font-body-sm-regular-tight);
	}

	:host([horizontal-alignment='center']) .text-cell__text {
		text-align: center;
	}

	:host([horizontal-alignment='right']) .text-cell__text {
		text-align: right;
	}


	/* # Color */

	/* ## Color: default */

	:host([color='default']) .text-cell__text,
	:host(:not([color])) .text-cell__text {
		color: var(--context-cell-content-color, var(--semantics-content-color));
	}

	/* ## Color: secondary */

	:host([color='secondary']) .text-cell__text {
		color: var(--context-cell-content-secondary-color, var(--semantics-content-secondary-color));
	}

	/* ## Color: accent */

	:host([color='accent']) .text-cell__text,
	:host([color='accent']) .text-cell__overline,
	:host([color='accent']) .text-cell__supporting-text {
		color: var(--context-cell-content-accent-color, var(--semantics-content-accent-color));
	}

	/* ## Color: success */

	:host([color='success']) .text-cell__text,
	:host([color='success']) .text-cell__overline,
	:host([color='success']) .text-cell__supporting-text {
		color: var(--context-cell-content-success-color, var(--semantics-content-success-color));
	}

	/* ## Color: warning */

	:host([color='warning']) .text-cell__text,
	:host([color='warning']) .text-cell__overline,
	:host([color='warning']) .text-cell__supporting-text {
		color: var(--context-cell-content-warning-color, var(--semantics-content-warning-color));
	}

	/* ## Color: critical */

	:host([color='critical']) .text-cell__text,
	:host([color='critical']) .text-cell__overline,
	:host([color='critical']) .text-cell__supporting-text {
		color: var(--context-cell-content-critical-color, var(--semantics-content-critical-color));
	}


	/* # Supporting text */

	.text-cell__supporting-text {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		overflow-wrap: anywhere;
		color: var(--context-cell-content-color, var(--semantics-content-secondary-color));
	}

	:host([size='md']) .text-cell__supporting-text,
	:host(:not([size])) .text-cell__supporting-text {
		font: var(--primitives-font-body-xs-regular-tight);
	}

	:host([size='sm']) .text-cell__supporting-text {
		font: var(--primitives-font-body-xxs-regular-tight);
	}

	:host([horizontal-alignment='center']) .text-cell__supporting-text {
		text-align: center;
	}

	:host([horizontal-alignment='right']) .text-cell__supporting-text {
		text-align: right;
	}


	/* # Forced colors */

	@media (forced-colors: active) {
		.text-cell__text {
			forced-color-adjust: none;
		}
	}
`;
