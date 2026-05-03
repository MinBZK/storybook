import { css } from 'lit';

export const textCellStyles = css`


	/* # Host */

	:host {
		display: flex;
		flex-direction: column;
		justify-content: center;
		--_width: auto;
		--_min-width: 0;
		--_max-width: none;
		--_min-height: 0;
		width: var(--_width);
		min-width: var(--_min-width);
		max-width: var(--_max-width);
		min-height: var(--_min-height);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Width */

	:host([width='stretch']),
	:host(:not([width])) {
		flex-grow: 1;
		min-width: 0;
	}

	:host([width='fit-content']) {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: auto;
		width: fit-content;
	}

	:host([width]:not([width='stretch']):not([width='fit-content'])) {
		flex-shrink: 0;
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

	:host([horizontal-alignment='right']) {
		align-items: flex-end;
	}


	/* # Overline */

	.text-cell__overline {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		color: var(--context-cell-content-color, var(--semantics-content-secondary-color));
	}

	:host([size='md']) .text-cell__overline,
	:host(:not([size])) .text-cell__overline {
		font: var(--primitives-font-body-xs-regular-tight);
	}

	:host([size='sm']) .text-cell__overline {
		font: var(--primitives-font-body-xxs-regular-tight);
	}

	:host([horizontal-alignment='right']) .text-cell__overline {
		text-align: right;
	}


	/* # Text */

	.text-cell__text {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		text-wrap: pretty;
	}

	:host([size='md']) .text-cell__text,
	:host(:not([size])) .text-cell__text {
		font: var(--primitives-font-body-md-regular-tight);
	}

	:host([size='sm']) .text-cell__text {
		font: var(--primitives-font-body-sm-regular-tight);
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

	/* ## Color: inherit */

	:host([color='inherit']) .text-cell__text,
	:host([color='inherit']) .text-cell__overline,
	:host([color='inherit']) .text-cell__supporting-text {
		color: inherit;
	}


	/* # Supporting text */

	.text-cell__supporting-text {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		color: var(--context-cell-content-color, var(--semantics-content-secondary-color));
	}

	:host([size='md']) .text-cell__supporting-text,
	:host(:not([size])) .text-cell__supporting-text {
		font: var(--primitives-font-body-xs-regular-tight);
	}

	:host([size='sm']) .text-cell__supporting-text {
		font: var(--primitives-font-body-xxs-regular-tight);
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
