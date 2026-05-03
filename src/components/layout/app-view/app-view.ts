/**
 * Nederlandse Digitale Dienst App View Component (Lit + TypeScript)
 *
 * The required root shell of a Nederlandse Digitale Dienst application. Always contains
 * a split view or an nldd-page as direct content.
 *
 * ## Background color
 * Set background="tinted" to give the whole application a tinted background.
 * All descendants read --context-parent-background-color via --_background-color automatically.
 * Individual components can override locally with their own background attribute.
 *
 * The same background color is forced on `document.body` so that browser-
 * chrome surfaces (iOS overscroll bounce, status bar, page-margin areas)
 * blend with the app instead of revealing the user-agent's default white.
 * Cleared when the app-view disconnects.
 *
 * @element nldd-app-view
 *
 * @attr {'default'|'tinted'} background - Background color (cascades to descendants)
 *
 * @slot - Default slot for the application content
 */
import { LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { appViewStyles } from './app-view.styles.js';
import { appViewTemplate } from './app-view.template.js';

@customElement('nldd-app-view')
export class NLDDAppView extends LitElement {
	static override styles = appViewStyles;

	@property({ type: String, reflect: true })
	background: 'default' | 'tinted' = 'default';

	override connectedCallback(): void {
		super.connectedCallback();
		this._applyBodyBackground();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		document.body.style.removeProperty('background-color');
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('background')) this._applyBodyBackground();
	}

	private _applyBodyBackground(): void {
		const token = this.background === 'tinted'
			? '--semantics-surfaces-tinted-background-color'
			: '--semantics-surfaces-background-color';
		document.body.style.backgroundColor = `var(${token})`;
	}

	override render() {
		return appViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-app-view': NLDDAppView;
	}
}
