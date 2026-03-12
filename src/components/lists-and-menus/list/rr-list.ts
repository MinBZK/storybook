import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-list.styles.ts';
import { template } from './rr-list.template.ts';

export type ListVariant = 'simple' | 'box' | 'inset';

/**
 * A container for `rr-list-item` elements, with optional header and footer slots.
 *
 * @slot         - List items (`rr-list-item`)
 * @slot header  - Content above the list body (e.g. `rr-title-bar`)
 * @slot footer  - Content below the list body (e.g. a short description)
 */
@customElement('rr-list')
export class RrList extends LitElement {
	static styles = [styles];

	/** Visual style of the list. */
	@property({ reflect: true })
	variant: ListVariant = 'simple';

	render() {
		return template();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-list': RrList;
	}
}
