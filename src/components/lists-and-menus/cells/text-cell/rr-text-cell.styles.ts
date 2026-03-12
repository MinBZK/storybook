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
		color: var(--semantics-content-secondary-color);
	}

	:host([size='md']) ::slotted([slot='overline']),
	:host(:not([size])) ::slotted([slot='overline']) {
		font: var(--primitives-font-body-xs-regular-tight);
	}

	:host([size='sm']) ::slotted([slot='overline']) {
		font: var(--primitives-font-body-xxs-regular-tight);
	}

	:host([horizontal-alignment='right']) ::slotted([slot='overline']) {
		text-align: right;
	}


	/* # Text */

	::slotted([slot='text']),
	::slotted(:not([slot])) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
	}

	:host([size='md']) ::slotted([slot='text']),
	:host(:not([size])) ::slotted([slot='text']),
	:host([size='md']) ::slotted(:not([slot])),
	:host(:not([size])) ::slotted(:not([slot])) {
		font: var(--primitives-font-body-md-regular-tight);
	}

	:host([size='sm']) ::slotted([slot='text']),
	:host([size='sm']) ::slotted(:not([slot])) {
		font: var(--primitives-font-body-sm-regular-tight);
	}

	:host([horizontal-alignment='right']) ::slotted([slot='text']),
	:host([horizontal-alignment='right']) ::slotted(:not([slot])) {
		text-align: right;
	}


	/* # Color */

	/* ## Color: default */

	:host([color='default']) ::slotted([slot='text']),
	:host(:not([color])) ::slotted([slot='text']),
	:host([color='default']) ::slotted(:not([slot])),
	:host(:not([color])) ::slotted(:not([slot])) {
		color: var(--semantics-content-color);
	}

	/* ## Color: secondary */

	:host([color='secondary']) ::slotted([slot='text']),
	:host([color='secondary']) ::slotted(:not([slot])) {
		color: var(--semantics-content-secondary-color);
	}

	/* ## Color: inherit */

	:host([color='inherit']) ::slotted([slot='text']),
	:host([color='inherit']) ::slotted(:not([slot])),
	:host([color='inherit']) ::slotted([slot='overline']),
	:host([color='inherit']) ::slotted([slot='supporting-text']) {
		color: inherit;
	}


	/* # Supporting text */

	::slotted([slot='supporting-text']) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		color: var(--semantics-content-secondary-color);
	}

	:host([size='md']) ::slotted([slot='supporting-text']),
	:host(:not([size])) ::slotted([slot='supporting-text']) {
		font: var(--primitives-font-body-xs-regular-tight);
	}

	:host([size='sm']) ::slotted([slot='supporting-text']) {
		font: var(--primitives-font-body-xxs-regular-tight);
	}

	:host([horizontal-alignment='right']) ::slotted([slot='supporting-text']) {
		text-align: right;
	}


	/* # Selected */

	:host([selected]) ::slotted([slot='text']),
	:host([selected]) ::slotted(:not([slot])),
	:host([selected]) ::slotted([slot='overline']),
	:host([selected]) ::slotted([slot='supporting-text']) {
		color: var(--semantics-controls-is-selected-contrast-color);
	}


	/* # Forced colors */

	@media (forced-colors: active) {
		::slotted([slot='text']),
		::slotted(:not([slot])) {
			forced-color-adjust: none;
		}
	}
`;
