import { css } from 'lit';

export const styles = css`
	/* # host */

	:host {
		display: flex;
		flex-direction: column;
		font-family: var(--rr-font-family-body);
	}

	:host([hidden]) {
		display: none;
	}

	/* # width */

	:host([width="stretch"]),
	:host(:not([width])) {
		flex-grow: 1;
		min-width: 0;
	}

	:host([width="fit-content"]) {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: auto;
		width: fit-content;
	}

	/* # vertical-alignment */

	:host([vertical-alignment="center"]),
	:host(:not([vertical-alignment])) {
		justify-content: center;
	}

	:host([vertical-alignment="top"]) {
		justify-content: flex-start;
	}

	/* # horizontal-alignment */

	:host([horizontal-alignment="left"]),
	:host(:not([horizontal-alignment])) {
		align-items: flex-start;
	}

	:host([horizontal-alignment="right"]) {
		align-items: flex-end;
	}

	/* # overline */

	::slotted([slot="overline"]) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		color: var(--semantics-content-secondary-color);
	}

	:host([size="md"]) ::slotted([slot="overline"]),
	:host(:not([size])) ::slotted([slot="overline"]) {
		font: var(--primitives-font-body-xs-regular-tight);
	}

	:host([size="sm"]) ::slotted([slot="overline"]) {
		font: var(--primitives-font-body-xxs-regular-tight);
	}

	:host([horizontal-alignment="right"]) ::slotted([slot="overline"]) {
		text-align: right;
	}

	/* # text */

	::slotted([slot="text"]),
	::slotted(:not([slot])) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
	}

	:host([size="md"]) ::slotted([slot="text"]),
	:host(:not([size])) ::slotted([slot="text"]),
	:host([size="md"]) ::slotted(:not([slot])),
	:host(:not([size])) ::slotted(:not([slot])) {
		font: var(--primitives-font-body-md-regular-tight);
	}

	:host([size="sm"]) ::slotted([slot="text"]),
	:host([size="sm"]) ::slotted(:not([slot])) {
		font: var(--primitives-font-body-sm-regular-tight);
	}

	:host([horizontal-alignment="right"]) ::slotted([slot="text"]),
	:host([horizontal-alignment="right"]) ::slotted(:not([slot])) {
		text-align: right;
	}

	/* # color */

	:host([color="default"]) ::slotted([slot="text"]),
	:host(:not([color])) ::slotted([slot="text"]),
	:host([color="default"]) ::slotted(:not([slot])),
	:host(:not([color])) ::slotted(:not([slot])) {
		color: var(--semantics-content-color);
	}

	:host([color="secondary"]) ::slotted([slot="text"]),
	:host([color="secondary"]) ::slotted(:not([slot])) {
		color: var(--semantics-content-secondary-color);
	}

	/* # supporting-text */

	::slotted([slot="supporting-text"]) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		color: var(--semantics-content-secondary-color);
	}

	:host([size="md"]) ::slotted([slot="supporting-text"]),
	:host(:not([size])) ::slotted([slot="supporting-text"]) {
		font: var(--primitives-font-body-xs-regular-tight);
	}

	:host([size="sm"]) ::slotted([slot="supporting-text"]) {
		font: var(--primitives-font-body-xxs-regular-tight);
	}

	:host([horizontal-alignment="right"]) ::slotted([slot="supporting-text"]) {
		text-align: right;
	}

	/* # selected */

	:host([selected]) ::slotted([slot="text"]),
	:host([selected]) ::slotted(:not([slot])),
	:host([selected]) ::slotted([slot="overline"]),
	:host([selected]) ::slotted([slot="supporting-text"]) {
		color: var(--semantics-controls-is-selected-contrast-color);
	}

	/* # forced-colors */

	@media (forced-colors: active) {
		::slotted([slot="text"]),
		::slotted(:not([slot])) {
			forced-color-adjust: none;
		}
	}
`;
