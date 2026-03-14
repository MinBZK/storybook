import { css } from 'lit';

export const styles = css`
	/* # Host */

	:host {
		display: flex;
		flex-direction: column;
		justify-content: center;
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


	/* # Vertical alignment */

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

	::slotted([slot='overline']) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		font: var(--primitives-font-body-xs-regular-tight);
		color: var(--semantics-content-secondary-color);
	}

	:host([horizontal-alignment='right']) ::slotted([slot='overline']) {
		text-align: right;
	}


	/* # Title */

	::slotted(:not([slot])) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		color: var(--semantics-content-color);
	}

	:host([horizontal-alignment='right']) ::slotted(:not([slot])) {
		text-align: right;
	}

	/* ## Size 1 */

	:host([size='1']) ::slotted(:not([slot])) {
		font: var(--primitives-font-display-1-sm);
	}

	/* ## Size 2 */

	:host([size='2']) ::slotted(:not([slot])) {
		font: var(--primitives-font-display-2-sm);
	}

	/* ## Size 3 */

	:host([size='3']) ::slotted(:not([slot])) {
		font: var(--primitives-font-display-3-sm);
	}

	/* ## Size 4 */

	:host([size='4']) ::slotted(:not([slot])) {
		font: var(--primitives-font-display-4-sm);
	}

	/* ## Size 5 */

	:host([size='5']) ::slotted(:not([slot])),
	:host(:not([size])) ::slotted(:not([slot])) {
		font: var(--primitives-font-display-5-sm);
	}

	/* ## Size 6 */

	:host([size='6']) ::slotted(:not([slot])) {
		font: var(--primitives-font-display-6-sm);
	}


	/* # Subtitle */

	::slotted([slot='subtitle']) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		font: var(--primitives-font-body-sm-regular-tight);
		color: var(--semantics-content-secondary-color);
	}

	:host([horizontal-alignment='right']) ::slotted([slot='subtitle']) {
		text-align: right;
	}


	/* # Color: inherit */

	:host([color='inherit']) ::slotted(:not([slot])),
	:host([color='inherit']) ::slotted([slot='overline']),
	:host([color='inherit']) ::slotted([slot='subtitle']) {
		color: inherit;
	}


	/* # Selected */

	:host([selected]) ::slotted(:not([slot])),
	:host([selected]) ::slotted([slot='overline']),
	:host([selected]) ::slotted([slot='subtitle']) {
		color: var(--semantics-controls-is-selected-contrast-color);
	}


	/* # Forced colors */

	@media (forced-colors: active) {
		::slotted(:not([slot])) {
			forced-color-adjust: none;
		}
	}
`;
