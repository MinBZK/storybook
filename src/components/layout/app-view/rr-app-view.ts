/**
 * RegelRecht App View Component (Lit + TypeScript)
 *
 * De root shell van een RegelRecht applicatie. Bevat altijd een
 * split view of een rr-page als directe inhoud.
 *
 * ## Background color
 * Set background="tinted" to give the whole application a tinted background.
 * All descendants read --context-background-color via --_background-color automatically.
 * Individual components can override locally with their own background attribute.
 *
 * @element rr-app-view
 *
 * @attr {'default'|'tinted'} background - Background color (cascades to descendants)
 *
 * @slot - Standaard slot voor de inhoud van de applicatie
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { appViewStyles } from './rr-app-view.styles.ts';
import { appViewTemplate } from './rr-app-view.template.ts';

@customElement('rr-app-view')
export class RRAppView extends LitElement {
	static override styles = appViewStyles;

	@property({ type: String, reflect: true })
	background: 'default' | 'tinted' = 'default';

	override render() {
		return appViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-app-view': RRAppView;
	}
}
