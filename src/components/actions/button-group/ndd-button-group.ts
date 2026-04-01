/**
 * Nederlandse Digitale Dienst Button Group Component (Lit + TypeScript)
 *
 * A container for grouping related buttons together, either horizontally or vertically.
 *
 * @element ndd-button-group
 * @attr {string} size - Button group size: 'sm' | 'md' (default: 'md')
 * @attr {string} flow - Layout direction: 'horizontal' | 'vertical' (default: 'horizontal')
 *
 * @slot - Default slot for buttons (max 3)
 *
 * @csspart group - The button group container
 */
import { LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styles } from './ndd-button-group.styles.ts';
import { template } from './ndd-button-group.template.ts';

type Size = 'sm' | 'md';
type Flow = 'horizontal' | 'vertical';

@customElement('ndd-button-group')
export class NDDButtonGroup extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: String, reflect: true })
	flow: Flow = 'vertical';

	@query('slot')
	private _slot!: HTMLSlotElement;

	handleSlotChange() {
		const assigned = this._slot
			.assignedElements({ flatten: true })
			.filter((el): el is HTMLElement => el instanceof HTMLElement);

		assigned.forEach((el, index) => {
			if (index >= 3) {
				el.setAttribute('hidden', '');
				console.warn('ndd-button-group: Only 3 buttons are allowed. Extra buttons will be hidden.');
			}

			if (this.flow === 'vertical') {
				el.setAttribute('full-width', '');
			} else {
				el.removeAttribute('full-width');
			}

			el.setAttribute('size', this.size);
		});
	}

	override updated(changedProperties: Map<string, unknown>) {
		if (changedProperties.has('flow') || changedProperties.has('size')) {
			this.handleSlotChange();
		}
	}

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-button-group': NDDButtonGroup;
	}
}
