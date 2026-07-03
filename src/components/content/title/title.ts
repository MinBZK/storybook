/**
 * Nederlandse Digitale Dienst Title Bar Component (Lit + TypeScript)
 *
 * A title bar with an optional overline, title, and subtitle on the left,
 * and a slot for actions on the right.
 *
 * @element nldd-title
 *
 * @attr {number} size - Visual size of the title: 1–6 (default: 3)
 * @attr {string} color - 'inherit' laat de titel de tekstkleur van de
 *   ondergrond volgen (voor gekleurde vlakken zoals de filled-categories);
 *   overline en subtitle krijgen dezelfde kleur op verlaagde dekking.
 *   Leeg = standaard contentkleuren.
 *
 * @slot overline - Optional overline above the title
 * @slot - Title text (use h1–h6 for semantics)
 * @slot subtitle - Optional subtitle below the title
 * @slot actions - Actions to the right of the title (buttons, menus, etc.)
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { titleStyles } from './title.styles.js';
import { titleTemplate } from './title.template.js';

type Size = 1 | 2 | 3 | 4 | 5 | 6;
type TitleColor = '' | 'inherit';

@customElement('nldd-title')
export class NLDDTitle extends LitElement {
	static override styles = titleStyles;

	@property({ type: Number, reflect: true })
	size: Size = 3;

	@property({ reflect: true, converter: reflectNonDefault<TitleColor>('') })
	color: TitleColor = '';

	override render() {
		return titleTemplate();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-title': NLDDTitle;
	}
}
