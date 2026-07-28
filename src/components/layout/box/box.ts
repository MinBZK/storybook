/**
 * Nederlandse Digitale Dienst Box Component (Lit + TypeScript)
 *
 * Use a box to visually group related components in a distinct, contained region.
 * Boxes draw attention to a set of controls or content that belong together,
 * helping users understand their relationship at a glance.
 *
 * @element nldd-box
 * @attr {'tinted'|'base'} background - Surface fill.
 *   - `tinted` (default): for a box on a plain page bg.
 *   - `base`: for a box sitting on an already-tinted parent (the border
 *   ring gets +2 palette steps so it still reads against a card-on-card).
 * @slot - Place components inside the box
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { boxStyles } from './box.styles.js';
import { boxTemplate } from './box.template.js';

export type BoxBackground = 'tinted' | 'base';

@customElement('nldd-box')
export class NLDDBox extends LitElement {
	static override styles = boxStyles;

	@property({ reflect: true, converter: reflectNonDefault<BoxBackground>('tinted') })
	background: BoxBackground = 'tinted';

	override render() {
		return boxTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-box': NLDDBox;
	}
}
