/**
 * Nederlandse Digitale Dienst Title Bar Component (Lit + TypeScript)
 *
 * A title bar with an optional overline, title, and subtitle on the left, and a
 * slot at the end of the title line on the right.
 *
 * @element nldd-title
 *
 * @attr {number} size - Visual size of the title: 1–6 (default: 3)
 * @attr {string} color - 'inherit' lets the title take the text color of the
 *   ondergrond volgen (voor gekleurde vlakken zoals de filled-categories);
 *   overline en subtitle krijgen dezelfde kleur op verlaagde dekking.
 *   Leeg = standaard contentkleuren.
 *
 * @slot overline - Optional overline above the title
 * @slot - Title text (use h1–h6 for semantics)
 * @slot subtitle - Optional subtitle below the title
 * @slot end - Whatever belongs at the end of the title line: a button, a menu, a status badge, a version. Named for the position, not for a kind of content, because anything can sit there.
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
