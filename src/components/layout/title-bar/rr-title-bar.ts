/**
 * RegelRecht Title Bar Component (Lit + TypeScript)
 *
 * Een titelbalk met een optionele overline, titel en ondertitel links,
 * en een slot voor acties rechts. Het koptekstniveau is semantisch
 * instelbaar onafhankelijk van de visuele grootte.
 *
 * @element rr-title-bar
 *
 * @attr {number} level - Koptekstniveau voor semantiek: 1–6 (standaard: 1)
 * @attr {number} size - Visuele grootte van de titel: 1–6 (standaard: 3)
 * @attr {string} overline - Optionele overline boven de titel
 * @attr {string} subtitle - Optionele ondertitel onder de titel
 *
 * @slot - Titeltekst
 * @slot actions - Acties rechts van de titel (knoppen, menu's, etc.)
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { titleBarStyles } from './rr-title-bar.styles.ts';
import { titleBarTemplate } from './rr-title-bar.template.ts';

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type Size = 1 | 2 | 3 | 4 | 5 | 6;

@customElement('rr-title-bar')
export class RRTitleBar extends LitElement {
	static override styles = titleBarStyles;

	@property({ type: Number, reflect: true })
	level: Level = 1;

	@property({ type: Number, reflect: true })
	size: Size = 3;

	@property({ type: String, reflect: true })
	overline = '';

	@property({ type: String, reflect: true })
	subtitle = '';

	override render() {
		return titleBarTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-title-bar': RRTitleBar;
	}
}
