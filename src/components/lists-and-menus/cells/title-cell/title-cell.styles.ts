import { css } from 'lit';

export const titleCellStyles = css`
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

	.title-cell__overline {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		font: var(--primitives-font-body-xs-regular-tight);
		color: var(--context-list-item-content-color, var(--semantics-content-secondary-color));
	}

	:host([horizontal-alignment='right']) .title-cell__overline {
		text-align: right;
	}


	/* # Title */

	.title-cell__title {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		color: var(--context-list-item-content-color, var(--semantics-content-color));
	}

	:host([horizontal-alignment='right']) .title-cell__title {
		text-align: right;
	}

	/* ## Size 1 */

	:host([size='1']) .title-cell__title {
		font: var(--primitives-font-display-1-sm);
	}

	/* ## Size 2 */

	:host([size='2']) .title-cell__title {
		font: var(--primitives-font-display-2-sm);
	}

	/* ## Size 3 */

	:host([size='3']) .title-cell__title {
		font: var(--primitives-font-display-3-sm);
	}

	/* ## Size 4 */

	:host([size='4']) .title-cell__title {
		font: var(--primitives-font-display-4-sm);
	}

	/* ## Size 5 */

	:host([size='5']) .title-cell__title,
	:host(:not([size])) .title-cell__title {
		font: var(--primitives-font-display-5-sm);
	}

	/* ## Size 6 */

	:host([size='6']) .title-cell__title {
		font: var(--primitives-font-display-6-sm);
	}


	/* # Subtitle */

	.title-cell__supporting-text {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		font: var(--primitives-font-body-sm-regular-tight);
		color: var(--context-list-item-content-color, var(--semantics-content-secondary-color));
	}

	:host([horizontal-alignment='right']) .title-cell__supporting-text {
		text-align: right;
	}


	/* # Color: inherit */

	:host([color='inherit']) .title-cell__title,
	:host([color='inherit']) .title-cell__overline,
	:host([color='inherit']) .title-cell__supporting-text {
		color: inherit;
	}


	/* # Forced colors */

	@media (forced-colors: active) {
		.title-cell__title {
			forced-color-adjust: none;
		}
	}
`;
