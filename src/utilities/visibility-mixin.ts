import { property } from 'lit/decorators.js';
import { LitElement, type PropertyValues } from 'lit';

/* eslint-disable @typescript-eslint/no-explicit-any -- mixin plumbing */
type Constructor<T = LitElement> = new (...args: any[]) => T;

/**
 * Adds `hide-below` and `hide-above` attributes that toggle visibility based
 * on the inline-size of an ancestor CSS container.
 *
 * Without a `containerName` argument the generated rule is an anonymous
 * `@container (…)` query — it matches the nearest ancestor that declares
 * `container-type: inline-size`. Pass a name to target a specific container
 * (e.g. `'list-container'` for cells inside `nldd-list`, which sets that
 * name inline on its host as a Safari shadow-DOM workaround).
 *
 * Values are CSS lengths (e.g. '320px', '20rem'). Container queries can't
 * read CSS variables in their conditions, so the query rule is generated at
 * runtime and injected as a <style> element in the component's shadow root,
 * wrapped in `:host { @container <name>? (…) { display: none !important; } }`
 * (nested form — the flattened `@container { :host { … } }` is unreliable in
 * Safari).
 *
 * @example
 * ```ts
 * // Cell inside nldd-list — target the named list-container
 * class NLDDTextCell extends VisibilityMixin(LitElement, 'list-container') { … }
 *
 * // Other component — fall back to the nearest unnamed container
 * class SomeComponent extends VisibilityMixin(LitElement) { … }
 * ```
 */
export function VisibilityMixin<TBase extends Constructor<LitElement>>(
	Base: TBase,
	containerName?: string,
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
			const containerPrefix = containerName ? `${containerName} ` : '';
			const rules: string[] = [];
			if (this.hideBelow) {
				rules.push(
					`:host { @container ${containerPrefix}(max-width: ${this.hideBelow}) { display: none !important; } }`,
				);
			}
			if (this.hideAbove) {
				rules.push(
					`:host { @container ${containerPrefix}(min-width: ${this.hideAbove}) { display: none !important; } }`,
				);
			}
			if (rules.length === 0) {
				this._visibilityStyle?.remove();
				this._visibilityStyle = undefined;
				return;
			}
			if (!this._visibilityStyle) {
				this._visibilityStyle = document.createElement('style');
				this.shadowRoot.appendChild(this._visibilityStyle);
			}
			this._visibilityStyle.textContent = rules.join('\n');
		}
	}
	return WithVisibility as unknown as TBase &
		Constructor<LitElement & { hideBelow?: string; hideAbove?: string }>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
