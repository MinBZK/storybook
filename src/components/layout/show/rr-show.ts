/**
 * RegelRecht Show Component (Lit + TypeScript)
 *
 * Een container die inhoud alleen toont binnen een bepaald breekpuntbereik.
 * Gebruik `above`, `below` of `only` om het zichtbaarheidsbereik in te stellen.
 * Gebruik `query` om te kiezen tussen viewport en container queries.
 * Zonder attributen is de inhoud altijd zichtbaar.
 *
 * @element rr-show
 *
 * @attr {string} above - Toon vanaf dit breekpunt en groter: 'sm' | 'md' | 'lg'
 * @attr {string} below - Toon tot en met dit breekpunt: 'sm' | 'md' | 'lg'
 * @attr {string} only - Toon alleen op dit breekpunt: 'sm' | 'md' | 'lg'
 * @attr {string} query - Type query: 'viewport' | 'container' (standaard: 'viewport')
 *
 * @slot - Inhoud die conditioneel wordt getoond
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { showStyles } from './rr-show.styles.ts';
import { showTemplate } from './rr-show.template.ts';

type Breakpoint = 'sm' | 'md' | 'lg';
type Query = 'viewport' | 'container';

@customElement('rr-show')
export class RRShow extends LitElement {
	static override styles = showStyles;

	@property({ type: String, reflect: true })
	above: Breakpoint | undefined = undefined;

	@property({ type: String, reflect: true })
	below: Breakpoint | undefined = undefined;

	@property({ type: String, reflect: true })
	only: Breakpoint | undefined = undefined;

	@property({ type: String, reflect: true })
	query: Query = 'viewport';

	override render() {
		return showTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-show': RRShow;
	}
}
