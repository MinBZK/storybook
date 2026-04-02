import { css } from 'lit';

export const styles = css`
	/* # host */

	:host {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--semantics-content-color);
	}

	:host([hidden]) {
		display: none;
	}

	/* # vertical-alignment */

	/* ## vertical-alignment: center (default) */

	:host([vertical-alignment='center']),
	:host(:not([vertical-alignment])) {
		justify-content: center;
	}

	/* ## vertical-alignment: top */

	:host([vertical-alignment='top']) {
		justify-content: flex-start;
	}

	/* # size */

	::slotted(*) {
		display: block;
		flex-shrink: 0;
	}

	/* ## size: 16 */

	:host([size='16']) {
		width: var(--primitives-space-16);
	}

	:host([size='16']) ::slotted(*) {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}

	/* ## size: 20 */

	:host([size='20']) {
		width: var(--primitives-space-20);
	}

	:host([size='20']) ::slotted(*) {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
	}

	/* ## size: 24 (default) */

	:host([size='24']) {
		width: var(--primitives-space-24);
	}

	:host([size='24']) ::slotted(*),
	:host(:not([size])) ::slotted(*) {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
	}

	/* ## size: 32 */

	:host([size='32']) {
		width: var(--primitives-space-32);
	}

	:host([size='32']) ::slotted(*) {
		width: var(--primitives-space-32);
		height: var(--primitives-space-32);
	}

	/* # selected */

	:host([selected]) {
		color: var(--semantics-controls-is-selected-contrast-color);
	}

	/* # color: inherit */

	:host([color='inherit']) {
		color: inherit;
	}
`;
