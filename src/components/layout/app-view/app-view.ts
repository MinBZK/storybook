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
 * ## Overscroll
 * `overscroll-behavior: none` is set on `document.documentElement` and
 * `document.body` while the app-view is connected. Combined with the
 * `overscroll-behavior: contain` on `nldd-page`'s scroll target, this
 * prevents iOS rubber-band on the viewport when scroll gestures land
 * outside an `nldd-page` (e.g. on a top-bar). Cleared on last disconnect.
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

// Track every connected app-view as a stack — the top is the current owner
// of the body-background style. Multiple instances can briefly coexist
// (tabs, modals, tests). Stack semantics handle disconnect order correctly:
// the older instance's background is restored when the younger owner leaves.
const _connectedStack: NLDDAppView[] = [];

function _currentOwner(): NLDDAppView | null {
	// Walk from the top down, skipping any entries that are no longer
	// connected (defensive: covers test isolation gaps where an instance is
	// removed without going through disconnectedCallback).
	for (let i = _connectedStack.length - 1; i >= 0; i--) {
		if (_connectedStack[i].isConnected) return _connectedStack[i];
	}
	return null;
}

@customElement('nldd-app-view')
export class NLDDAppView extends LitElement {
	static override styles = appViewStyles;

	@property({ type: String, reflect: true })
	background: 'default' | 'tinted' = 'default';

	override connectedCallback(): void {
		super.connectedCallback();
		_connectedStack.push(this);
		this._writeBodyBackground();
		document.documentElement.style.overscrollBehavior = 'none';
		document.body.style.overscrollBehavior = 'none';
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		const idx = _connectedStack.indexOf(this);
		if (idx >= 0) _connectedStack.splice(idx, 1);
		const owner = _currentOwner();
		if (owner) {
			// Re-apply whichever instance is now on top — fixes the case where
			// a younger instance disconnects first and an older one is still
			// in the DOM but had its background overwritten. Overscroll value
			// is the same across instances, no re-apply needed.
			owner._writeBodyBackground();
		} else {
			document.body.style.removeProperty('background-color');
			document.documentElement.style.removeProperty('overscroll-behavior');
			document.body.style.removeProperty('overscroll-behavior');
		}
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('background') && _currentOwner() === this) {
			this._writeBodyBackground();
		}
	}

	private _writeBodyBackground(): void {
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
