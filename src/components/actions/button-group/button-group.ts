/**
 * Nederlandse Digitale Dienst Button Group Component (Lit + TypeScript)
 *
 * A container for grouping related buttons together, either horizontally or vertically.
 *
 * @element nldd-button-group
 * @attr {string} size - Button group size: 'sm' | 'md' (default: 'md')
 * @attr {string} orientation - Layout direction: 'horizontal' | 'vertical' (default: 'vertical')
 *
 * @slot - Default slot for buttons (max 3)
 *
 * @csspart group - The button group container
 */
import { LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { buttonGroupStyles } from './button-group.styles.js';
import { template } from './button-group.template.js';

type Size = 'sm' | 'md';
type Orientation = 'horizontal' | 'vertical';

@customElement('nldd-button-group')
export class NLDDButtonGroup extends LitElement {
	static override styles = buttonGroupStyles;

	@property({ reflect: true, converter: reflectNonDefault<Size>('md') })
	size: Size = 'md';

	@property({ reflect: true, converter: reflectNonDefault<Orientation>('vertical') })
	orientation: Orientation = 'vertical';

	@query('slot')
	private _slot!: HTMLSlotElement;

	handleSlotChange() {
		const assigned = this._slot
			.assignedElements({ flatten: true })
			.filter((el): el is HTMLElement => el instanceof HTMLElement);

		assigned.forEach((el, index) => {
			if (index >= 3) {
				el.setAttribute('hidden', '');
				if (import.meta.env?.DEV) console.warn('nldd-button-group: Only 3 buttons are allowed. Extra buttons will be hidden.');
			}

			if (this.orientation === 'vertical') {
				el.setAttribute('width', 'full');
			} else {
				el.removeAttribute('width');
			}

			el.setAttribute('size', this.size);
		});
	}

	override updated(changedProperties: Map<string, unknown>) {
		if (changedProperties.has('orientation') || changedProperties.has('size')) {
			this.handleSlotChange();
		}
	}

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-button-group': NLDDButtonGroup;
	}
}
