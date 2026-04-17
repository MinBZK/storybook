import { css } from 'lit';

export const styles = css`
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


	/* # Title */

	::slotted([slot='title']) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		font: var(--primitives-font-body-sm-regular-flat);
		color: var(--semantics-content-secondary-color);
	}


	/* # Description */

	::slotted([slot='description']) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		font: var(--primitives-font-body-md-regular-tight);
		color: var(--semantics-content-color);
	}


	/* # Selected */

	:host([selected]) ::slotted([slot='title']),
	:host([selected]) ::slotted([slot='description']) {
		color: var(--components-list-item-is-selected-content-color);
	}


	/* # Highlighted */

	:host([highlighted]) ::slotted([slot='title']),
	:host([highlighted]) ::slotted([slot='description']) {
		color: var(--components-list-item-is-highlighted-content-color);
	}


	/* # Forced colors */

	@media (forced-colors: active) {
		::slotted([slot='title']),
		::slotted([slot='description']) {
			forced-color-adjust: none;
		}
	}
`;
