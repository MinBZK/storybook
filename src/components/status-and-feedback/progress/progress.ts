/**
 * Nederlandse Digitale Dienst Progress Component (Lit + TypeScript)
 *
 * Layout placeholder that fills its parent and centres an indeterminate
 * progress indicator. Holds the indicator back for 1000ms so brief loading
 * states don't flash a spinner; once the delay passes the indicator fades in.
 *
 * Default is an indeterminate `<nldd-progress-circle>` with the translated
 * "Laden" label. Drop anything in the slot (a progress-bar, a customised
 * progress-circle, etc.) to override.
 *
 * Reconnect behaviour: every `connectedCallback` resets the timer and hides
 * the indicator again. If a consumer toggles the element via a conditional
 * render (remove + re-insert) the spinner will disappear and re-fade after
 * another 1000ms. Keep the element mounted and toggle visibility / `hidden`
 * instead if you want the timer to run only once.
 *
 * Accessibility: the host element carries `aria-busy="true"` for as long as
 * it is connected and not marked `complete`, including the silent 1000 ms
 * pre-spinner window. AT users landing on the region during that window are
 * told loading is in progress, even before the visual spinner appears.
 *
 * Two patterns to signal "done":
 *   1. (Preferred.) Unmount `<nldd-progress>` entirely. aria-busy goes away
 *      with the element, and the indicator's `progressbar` role disappears
 *      from the AT tree.
 *   2. Set the boolean `complete` attribute. aria-busy is cleared and the
 *      indicator is hidden, but the element stays in the DOM. Use this when
 *      you want a CSS transition out, or when the wrapper sits in a layout
 *      slot that would collapse if unmounted.
 *
 * @element nldd-progress
 *
 * @attr {string} text - Label under the default indicator. Falls back to the
 *   translated "Laden" string when unset. Ignored when the slot is filled.
 * @attr {object} translations - Override translation keys; unset keys fall back to Dutch
 *
 * @slot - Optional custom indicator; overrides the default progress-circle.
 *   The host carries `aria-busy="true"` for AT users, but the default ARIA
 *   semantics on the visible indicator (role="progressbar", aria-valuetext)
 *   come from the built-in `<nldd-progress-circle>`. Consumers replacing the
 *   slot are responsible for supplying their own progressbar role / label
 *   on the custom indicator.
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { progressStyles } from './progress.styles.js';
import { progressTemplate } from './progress.template.js';
import { nlddProgressTranslations } from './progress.i18n.js';
import type { NLDDProgressTranslations } from './progress.i18n.js';
import '../progress-circle/progress-circle.js';

/** Delay before the indicator fades in. Brief loading states finish within
 *  this window and the spinner is never shown — avoids a jarring flash. */
const DELAY_MS = 1000;

@customElement('nldd-progress')
export class NLDDProgress extends LitElement {
	static override styles = progressStyles;

	@property({ type: String, reflect: true })
	text = '';

	/** Mark the loader as finished while keeping the element mounted.
	 *  Clears aria-busy and hides the indicator. Default false. */
	@property({ type: Boolean, reflect: true })
	complete = false;

	@property({ type: Object })
	translations: Partial<NLDDProgressTranslations> = {};

	@state()
	_visible = false;

	private _delayTimeout?: ReturnType<typeof setTimeout>;

	public _t(key: keyof NLDDProgressTranslations): string {
		return this.translations[key] ?? nlddProgressTranslations[key];
	}

	override connectedCallback(): void {
		super.connectedCallback();
		// aria-busy signals "loading in progress" to AT users immediately,
		// even during the silent 1000 ms window before the visual indicator
		// fades in. Set unless the consumer connected the element already
		// marked complete (rare but valid — e.g. server-rendered "done" state).
		if (!this.complete) this.setAttribute('aria-busy', 'true');
		this._visible = false;
		this._delayTimeout = setTimeout(() => {
			this._visible = true;
			this._delayTimeout = undefined;
		}, DELAY_MS);
	}

	override willUpdate(changed: Map<string, unknown>): void {
		if (changed.has('complete')) {
			if (this.complete) {
				this.removeAttribute('aria-busy');
			} else {
				this.setAttribute('aria-busy', 'true');
			}
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this._delayTimeout) {
			clearTimeout(this._delayTimeout);
			this._delayTimeout = undefined;
		}
	}

	override render() {
		return progressTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-progress': NLDDProgress;
	}
}
