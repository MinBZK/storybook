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

// Track the active app-view that owns the body-background style. Multiple
// instances can briefly coexist (tabs, modals, tests). Only the most recently
// connected app-view writes the background; on disconnect we only clear the
// style if we were the owner — otherwise the surviving instance keeps theirs.
let _bodyBackgroundOwner: NLDDAppView | null = null;

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
		// Defensive: clear the stored owner not just when it's `this`, but also
		// when the recorded owner is itself no longer in the DOM (e.g. removed
		// without going through disconnect, or test isolation gap). Without
		// this, a stale reference would survive across instances and the body
		// background would never be released.
		if (_bodyBackgroundOwner === this || (_bodyBackgroundOwner && !_bodyBackgroundOwner.isConnected)) {
			document.body.style.removeProperty('background-color');
			_bodyBackgroundOwner = null;
		}
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('background')) this._applyBodyBackground();
	}

	private _applyBodyBackground(): void {
		const token = this.background === 'tinted'
			? '--semantics-surfaces-tinted-background-color'
			: '--semantics-surfaces-background-color';
		document.body.style.backgroundColor = `var(${token})`;
		_bodyBackgroundOwner = this;
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
