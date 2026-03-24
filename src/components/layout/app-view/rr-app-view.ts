/**
 * RegelRecht App View Component (Lit + TypeScript)
 *
 * De root shell van een RegelRecht applicatie. Bevat altijd een
 * split view of een rr-page als directe inhoud.
 *
 * @element rr-app-view
 *
 * @slot - Standaard slot voor de inhoud van de applicatie
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { appViewStyles } from './rr-app-view.styles.ts';
import { appViewTemplate } from './rr-app-view.template.ts';

@customElement('rr-app-view')
export class RRAppView extends LitElement {
	static override styles = appViewStyles;

	override render() {
		return appViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-app-view': RRAppView;
	}
}
