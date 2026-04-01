/**
 * Nederlandse Digitale Dienst Title Bar Component (Lit + TypeScript)
 *
 * A title bar with an optional overline, title, and subtitle on the left,
 * and a slot for actions on the right.
 *
 * @element ndd-title-bar
 *
 * @attr {number} size - Visual size of the title: 1–6 (default: 3)
 *
 * @slot overline - Optional overline above the title
 * @slot - Title text (use h1–h6 for semantics)
 * @slot subtitle - Optional subtitle below the title
 * @slot actions - Actions to the right of the title (buttons, menus, etc.)
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { titleBarStyles } from './ndd-title-bar.styles.ts';
import { titleBarTemplate } from './ndd-title-bar.template.ts';

type Size = 1 | 2 | 3 | 4 | 5 | 6;

@customElement('ndd-title-bar')
export class NDDTitleBar extends LitElement {
	static override styles = titleBarStyles;

	@property({ type: Number, reflect: true })
	size: Size = 3;

	override render() {
		return titleBarTemplate();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-title-bar': NDDTitleBar;
	}
}
