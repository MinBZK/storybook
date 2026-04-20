import { property } from 'lit/decorators.js';
import { LitElement, type PropertyValues } from 'lit';

/* eslint-disable @typescript-eslint/no-explicit-any -- mixin plumbing */
type Constructor<T = LitElement> = new (...args: any[]) => T;

/**
 * Adds `hide-below` and `hide-above` attributes that toggle visibility based
 * on the inline-size of an ancestor CSS container.
 *
 * The ancestor (typically the component's direct parent in usage) must declare
 * `container-type: inline-size`. `containerName` is only informational — the
 * generated `@container` rule is anonymous, which resolves more reliably in
 * Safari when the querying element is slotted across shadow-DOM boundaries.
 *
 * Values are CSS lengths (e.g. '320px', '20rem'). Container queries can't read
 * CSS variables in their conditions, so the query rule is generated at runtime
 * and injected as a <style> element in the component's shadow root, wrapped in
 * `:host { @container (…) { display: none !important; } }` (nested form —
 * flattened `@container { :host { … } }` is similarly unreliable in Safari).
 *
 * @example
 * ```ts
 * class NLDDTextCell extends VisibilityMixin(LitElement, 'list-item') { ... }
 * ```
 */
export function VisibilityMixin<TBase extends Constructor<LitElement>>(
	Base: TBase,
	_containerName: string,
) {
	class WithVisibility extends Base {
		@property({ type: String, reflect: true, attribute: 'hide-below' })
		hideBelow?: string;

		@property({ type: String, reflect: true, attribute: 'hide-above' })
		hideAbove?: string;

		private _visibilityStyle?: HTMLStyleElement;

		override updated(changed: PropertyValues): void {
			super.updated(changed);
			if (changed.has('hideBelow') || changed.has('hideAbove')) {
				this._updateVisibilityStyle();
			}
		}

		private _updateVisibilityStyle(): void {
			if (!this.shadowRoot) return;
			if (!this._visibilityStyle) {
				this._visibilityStyle = document.createElement('style');
				this.shadowRoot.appendChild(this._visibilityStyle);
			}
			const rules: string[] = [];
			if (this.hideBelow) {
				rules.push(
					`:host { @container (max-width: ${this.hideBelow}) { display: none !important; } }`,
				);
			}
			if (this.hideAbove) {
				rules.push(
					`:host { @container (min-width: ${this.hideAbove}) { display: none !important; } }`,
				);
			}
			this._visibilityStyle.textContent = rules.join('\n');
		}
	}
	return WithVisibility as unknown as TBase &
		Constructor<LitElement & { hideBelow?: string; hideAbove?: string }>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
