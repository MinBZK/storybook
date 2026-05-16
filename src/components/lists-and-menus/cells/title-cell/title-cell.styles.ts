import { css } from 'lit';

export const titleCellStyles = css`


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

	:host([width='full']),
	:host(:not([width])),
	:host([width='']) {
		flex-grow: 1;
		flex-shrink: 1;
	}

	:host([width='fit-content']) {
		width: fit-content;
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: auto;
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

	.title-cell__overline {
		margin: 0;
		min-width: 0;
		align-self: stretch;
		overflow-wrap: anywhere;
		font: var(--primitives-font-body-xs-regular-tight);
		color: var(--context-cell-content-color, var(--semantics-content-secondary-color));
	}

	:host([horizontal-alignment='center']) .title-cell__overline {
		text-align: center;
	}

	:host([horizontal-alignment='right']) .title-cell__overline {
		text-align: right;
	}


	/* # Title */

	.title-cell__title {
		margin: 0;
		min-width: 0;
		align-self: stretch;
		overflow-wrap: break-word;
		color: var(--context-cell-content-color, var(--semantics-content-color));
		text-wrap: pretty;
	}

	:host([horizontal-alignment='center']) .title-cell__title {
		text-align: center;
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
		min-width: 0;
		align-self: stretch;
		overflow-wrap: anywhere;
		font: var(--primitives-font-body-sm-regular-tight);
		color: var(--context-cell-content-color, var(--semantics-content-secondary-color));
	}

	:host([horizontal-alignment='center']) .title-cell__supporting-text {
		text-align: center;
	}

	:host([horizontal-alignment='right']) .title-cell__supporting-text {
		text-align: right;
	}


	/* # Color */

	/* ## Color: secondary
	 *
	 * Overline and supporting-text are already muted by default, so we only
	 * demote the title to make the whole cell read as secondary.
	 */

	:host([color='secondary']) .title-cell__title {
		color: var(--context-cell-content-secondary-color, var(--semantics-content-secondary-color));
	}

	/* ## Color: accent
	 *
	 * Applies to all three text regions so the cell reads as a coherent
	 * highlight, not a mix of accent + muted overline / supporting-text.
	 */

	:host([color='accent']) .title-cell__title,
	:host([color='accent']) .title-cell__overline,
	:host([color='accent']) .title-cell__supporting-text {
		color: var(--context-cell-content-accent-color, var(--semantics-content-accent-color));
	}

	/* ## Color: success */

	:host([color='success']) .title-cell__title,
	:host([color='success']) .title-cell__overline,
	:host([color='success']) .title-cell__supporting-text {
		color: var(--context-cell-content-success-color, var(--semantics-content-success-color));
	}

	/* ## Color: warning */

	:host([color='warning']) .title-cell__title,
	:host([color='warning']) .title-cell__overline,
	:host([color='warning']) .title-cell__supporting-text {
		color: var(--context-cell-content-warning-color, var(--semantics-content-warning-color));
	}

	/* ## Color: critical */

	:host([color='critical']) .title-cell__title,
	:host([color='critical']) .title-cell__overline,
	:host([color='critical']) .title-cell__supporting-text {
		color: var(--context-cell-content-critical-color, var(--semantics-content-critical-color));
	}


	/* # Forced colors */

	@media (forced-colors: active) {
		.title-cell__title {
			forced-color-adjust: none;
		}
	}
`;
