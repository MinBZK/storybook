/**
 * Nederlandse Digitale Dienst Activity Indicator Component (Lit + TypeScript)
 *
 * Layout placeholder that fills its parent and centres an indeterminate
 * activity indicator. By default the indicator is held back for 1000ms so
 * brief loading states don't flash; once the delay passes it fades in. Set
 * `timing="instant"` to skip the delay (the fade-in still plays) — this is
 * what embedding components such as `nldd-button` use for their loading state.
 *
 * The default indicator is a simple icon-sized circle drawn in `currentColor`,
 * with an optional label below (hidden unless `show-text` is set). Drop a
 * `<nldd-progress-circle>`, `<nldd-progress-bar>` or any element in the slot
 * to override it.
 *
 * Reconnect behaviour: every `connectedCallback` resets the timer and hides
 * the indicator again. If a consumer toggles the element via a conditional
 * render (remove + re-insert) the indicator disappears and re-fades after
 * another delay. Keep the element mounted and toggle visibility / `hidden`
 * instead if you want the timer to run only once.
 *
 * Accessibility: while connected and not `complete` the host carries
 * `role="status"`, `aria-busy="true"` and an `aria-label` (the `text`, or the
 * translated "Laden" fallback). The label feeds the accessible name even when
 * it is visually hidden (`show-text` off, the default), so assistive tech
 * announces the loading state. Set `complete` (or unmount) to clear it.
 *
 * @element nldd-activity-indicator
 *
 * @attr {string} size - Circle diameter on the icon scale: 16,20,24,28,32,40,44,48,56,64,80,96 (default '32')
 * @attr {boolean} show-text - Show the label under the indicator (default false; the label still feeds the accessible name)
 * @attr {string} text - Label text. Falls back to the translated "Laden" when unset.
 * @attr {'default'|'instant'} timing - 'default' waits 1000ms before showing (anti-flash); 'instant' shows immediately (the fade-in still plays). Default 'default'.
 * @attr {boolean} complete - Mark the loader as finished while keeping the element mounted; clears aria-busy and hides the indicator.
 * @attr {object} translations - Override translation keys; unset keys fall back to Dutch
 *
 * @slot - Optional custom indicator; overrides the default circle. Consumers
 *   replacing the slot supply their own indicator semantics on the custom
 *   element; the host's role/aria-busy still mark the region as loading.
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { activityIndicatorStyles } from './activity-indicator.styles.js';
import { activityIndicatorTemplate } from './activity-indicator.template.js';
import { nlddActivityIndicatorTranslations } from './activity-indicator.i18n.js';
import type { NLDDActivityIndicatorTranslations } from './activity-indicator.i18n.js';

/** Delay before the indicator fades in. Brief loading states finish within
 *  this window and the indicator is never shown — avoids a jarring flash. */
const DELAY_MS = 1000;

export type ActivityIndicatorSize =
	'16' | '20' | '24' | '28' | '32' | '40' | '44' | '48' | '56' | '64' | '80' | '96';
export type ActivityIndicatorTiming = 'default' | 'instant';

@customElement('nldd-activity-indicator')
export class NLDDActivityIndicator extends LitElement {
	static override styles = activityIndicatorStyles;

	@property({ type: String, reflect: true })
	size: ActivityIndicatorSize = '32';

	/** Show the label under the indicator. The label always feeds the
	 *  accessible name (aria-label); this only controls visibility. */
	@property({ type: Boolean, reflect: true, attribute: 'show-text' })
	showText = false;

	@property({ type: String, reflect: true })
	text = '';

	/** 'default' waits {@link DELAY_MS} before showing; 'instant' shows
	 *  immediately. The fade-in plays either way. */
	@property({ type: String, reflect: true })
	timing: ActivityIndicatorTiming = 'default';

	/** Mark the loader as finished while keeping the element mounted.
	 *  Clears aria-busy and hides the indicator. Default false. */
	@property({ type: Boolean, reflect: true })
	complete = false;

	@property({ type: Object })
	translations: Partial<NLDDActivityIndicatorTranslations> = {};

	@state()
	_visible = false;

	private _delayTimeout?: ReturnType<typeof setTimeout>;

	public _t(key: keyof NLDDActivityIndicatorTranslations): string {
		return this.translations[key] ?? nlddActivityIndicatorTranslations[key];
	}

	/** Accessible name announced while loading. */
	public get _accessibleName(): string {
		return this.text || this._t('components.activity-indicator.loading-text');
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this._syncAria();
		// timing="instant" skips the anti-flash delay. The fade-in still plays:
		// it lives on the indicator wrapper, not on this timer.
		this._visible = this.timing === 'instant';
		if (!this._visible && !this.complete) {
			this._delayTimeout = setTimeout(() => {
				this._visible = true;
				this._delayTimeout = undefined;
			}, DELAY_MS);
		}
	}

	override willUpdate(changed: Map<string, unknown>): void {
		// aria-label tracks the resolved text; role/aria-busy track `complete`.
		if (changed.has('complete') || changed.has('text') || changed.has('translations')) {
			this._syncAria();
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this._delayTimeout) {
			clearTimeout(this._delayTimeout);
			this._delayTimeout = undefined;
		}
	}

	/** role="status" + aria-busy + aria-label while loading; cleared when complete. */
	private _syncAria(): void {
		if (this.complete) {
			this.removeAttribute('role');
			this.removeAttribute('aria-busy');
			this.removeAttribute('aria-label');
		} else {
			this.setAttribute('role', 'status');
			this.setAttribute('aria-busy', 'true');
			this.setAttribute('aria-label', this._accessibleName);
		}
	}

	override render() {
		return activityIndicatorTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-activity-indicator': NLDDActivityIndicator;
	}
}
