/**
 * Nederlandse Digitale Dienst App View Component (Lit + TypeScript)
 *
 * The required root shell of a Nederlandse Digitale Dienst application. Always contains
 * a split view or an ndd-page as direct content.
 *
 * ## Background color
 * Set background="tinted" to give the whole application a tinted background.
 * All descendants read --context-parent-background-color via --_background-color automatically.
 * Individual components can override locally with their own background attribute.
 *
 * @element ndd-app-view
 *
 * @attr {'default'|'tinted'} background - Background color (cascades to descendants)
 *
 * @slot - Default slot for the application content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { appViewStyles } from './ndd-app-view.styles.ts';
import { appViewTemplate } from './ndd-app-view.template.ts';

@customElement('ndd-app-view')
export class NDDAppView extends LitElement {
	static override styles = appViewStyles;

	@property({ type: String, reflect: true })
	background: 'default' | 'tinted' = 'default';

	override render() {
		return appViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-app-view': NDDAppView;
	}
}
