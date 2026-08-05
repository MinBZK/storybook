import { property } from 'lit/decorators.js';
import { LitElement, type PropertyValues } from 'lit';
import { breakpoints } from '../assets/styles/breakpoints.js';

type Constructor<T = LitElement> = new (...args: any[]) => T;

// Resolve a hide-below/hide-above value to a container-query threshold. A named
// breakpoint (sm/md/lg) maps to the standard boundary; the open edges (below
// sm, above lg) are no-ops (null); any other value passes through as a length.
function resolveHideBelow(value: string): string | null {
	if (value === 'md') return breakpoints.smMax; // hidden in sm
	if (value === 'lg') return breakpoints.mdMax;  // hidden in sm + md
	if (value === 'sm') return null;               // nothing below sm
	return value;
}
function resolveHideAbove(value: string): string | null {
	if (value === 'sm') return breakpoints.mdMin;  // hidden in md + lg
	if (value === 'md') return breakpoints.lgMin;  // hidden in lg
	if (value === 'lg') return null;               // nothing above lg
	return value;
}

/**
 * The open edges resolve to null, so the attribute is written but nothing ever
 * hides. That reads like a working value, and the name invites it: `hide-below`
 * names the breakpoint you hide BELOW, so "hide it at sm" comes out as
 * `hide-below="md"` and `hide-below="sm"` does nothing at all. Say so once,
 * rather than let it look applied.
 */
function warnNoOp(
	host: LitElement,
	attribute: string,
	value: string | undefined,
	resolved: string | null,
	openEdge: string,
	edgeLabel: string,
): void {
	if (value !== openEdge || resolved !== null) return;
	console.warn(
		`[${host.localName}] ${attribute}="${openEdge}" never hides anything: there is no `
		+ `breakpoint ${edgeLabel}. The value names the breakpoint you hide below, so the `
		+ `smallest one that hides is "${attribute === 'hide-below' ? 'md' : 'md'}". `
		+ 'Leave the attribute off if you meant "always visible".',
	);
}

/**
 * Adds `hide-below` and `hide-above` attributes that toggle visibility based
 * on the inline-size of an ancestor CSS container.
 *
 * Without a `containerName` argument the generated rule is an anonymous
 * `@container (…)` query — it matches the nearest ancestor that declares
 * `container-type: inline-size`. Pass a name to target a specific container
 * (e.g. `'cells-container'` for cells inside `nldd-list`, which sets that
 * name inline on its host as a Safari shadow-DOM workaround).
 *
 * Values are either a named breakpoint — `sm` / `md` / `lg` — or a CSS length
 * (e.g. '320px', '20rem'). Named values resolve to the standard breakpoint
 * thresholds: `hide-below` uses the breakpoint's lower bound (e.g.
 * `hide-below="lg"` hides in sm+md and shows in lg), `hide-above` its upper
 * bound; the open edges (below sm, above lg) are no-ops. Container queries can't
 * read CSS variables in their conditions, so the query rule is generated at
 * runtime and injected as a <style> element in the component's shadow root,
 * wrapped in `:host { @container <name>? (…) { display: none !important; } }`
 * (nested form — the flattened `@container { :host { … } }` is unreliable in
 * Safari).
 *
 * @mixin VisibilityMixin
 *
 * @attr {string} hide-below - Hides the element below this breakpoint: `sm` | `md` | `lg`, or a CSS length. The value names the breakpoint you hide BELOW, so `hide-below="md"` is hidden in sm and visible from md up. `sm` is the open edge and never hides (DEV-warns).
 * @attr {string} hide-above - Hides the element above this breakpoint: `sm` | `md` | `lg`, or a CSS length. `hide-above="sm"` is hidden in md and lg. `lg` is the open edge and never hides (DEV-warns).
 *
 * @example
 * ```ts
 * // Cell inside nldd-list — target the named cells-container
 * class NLDDTextCell extends VisibilityMixin(LitElement, 'cells-container') { … }
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
			const below = this.hideBelow ? resolveHideBelow(this.hideBelow) : null;
			warnNoOp(this, 'hide-below', this.hideBelow, below, 'sm', 'below sm');
			if (below) {
				rules.push(
					`:host { @container ${containerPrefix}(max-width: ${below}) { display: none !important; } }`,
				);
			}
			const above = this.hideAbove ? resolveHideAbove(this.hideAbove) : null;
			warnNoOp(this, 'hide-above', this.hideAbove, above, 'lg', 'above lg');
			if (above) {
				rules.push(
					`:host { @container ${containerPrefix}(min-width: ${above}) { display: none !important; } }`,
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
