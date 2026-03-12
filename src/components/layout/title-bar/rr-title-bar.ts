/**
 * RegelRecht Title Bar Component (Lit + TypeScript)
 *
 * Een titelbalk met een optionele overline, titel en ondertitel links,
 * en een slot voor acties rechts.
 *
 * @element rr-title-bar
 *
 * @attr {number} size - Visuele grootte van de titel: 1–6 (standaard: 3)
 *
 * @slot overline - Optionele overline boven de titel
 * @slot - Titeltekst (gebruik h1–h6 voor semantiek)
 * @slot subtitle - Optionele ondertitel onder de titel
 * @slot actions - Acties rechts van de titel (knoppen, menu's, etc.)
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { titleBarStyles } from './rr-title-bar.styles.ts';
import { titleBarTemplate } from './rr-title-bar.template.ts';

type Size = 1 | 2 | 3 | 4 | 5 | 6;

@customElement('rr-title-bar')
export class RrTitleBar extends LitElement {
	static override styles = titleBarStyles;

	@property({ type: Number, reflect: true })
	size: Size = 3;

	override render() {
		return titleBarTemplate();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-title-bar': RrTitleBar;
	}
}
