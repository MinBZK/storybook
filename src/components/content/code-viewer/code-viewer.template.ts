import { html, nothing, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { NLDDCodeViewer } from './code-viewer.js';

export function codeViewerTemplate(component: NLDDCodeViewer): TemplateResult {
	// `language` is interpolated into a class name. Lit's tagged template
	// literal escapes attribute values, so a malicious string can't break
	// out of the attribute — but it can still produce a wonky class name.
	// We accept that since `language` is a developer-set identifier, not
	// user-supplied content.
	//
	// `unsafeHTML(_highlightedHtml)` injects the Prism output verbatim.
	// Prism escapes HTML entities in its input (`<` → `&lt;`) before
	// wrapping tokens in spans, so the only HTML in the output is the
	// span scaffolding Prism itself emits. Safe by construction.
	const scrollable = component._isScrollable;
	const copyState = component._copyState;
	const tooltipText = copyState === 'success'
		? component._t('components.code-viewer.copy-success-text')
		: copyState === 'failure'
			? component._t('components.code-viewer.copy-failure-text')
			: component._t('components.code-viewer.copy-action');
	// Reuse tooltipText for the icon-button's accessible-label so a keyboard
	// user re-focusing the button mid-feedback hears the actual state
	// ("Gekopieerd") instead of the static "Kopieer". The role="status" live
	// region still fires the initial announcement; this only changes what AT
	// reads on subsequent focus during the 1500 ms feedback window.
	const buttonLabel = tooltipText;
	// Live-region payload: announces "Gekopieerd" / "Kopiëren mislukt" so
	// screen-reader users get confirmation that the static accessible-label
	// alone can't convey. Empty when idle so re-clicks re-announce.
	const liveRegionText = copyState === 'success'
		? component._t('components.code-viewer.copy-success-text')
		: copyState === 'failure'
			? component._t('components.code-viewer.copy-failure-text')
			: '';
	return html`<pre
		class="code-viewer"
		tabindex=${ifDefined(scrollable ? '0' : undefined)}
		aria-label=${ifDefined(scrollable ? component._t('components.code-viewer.region-label') : undefined)}
	><slot @slotchange=${component._onSlotChange}></slot>${
		component.language && component._highlightedHtml
			? html`<code class="code__highlighted language-${component.language}">${unsafeHTML(component._highlightedHtml)}</code>`
			: ''
	}</pre>${component.noCopy ? nothing : html`
		<div class="code-viewer__actions">
			<div class="code-viewer__copy-button">
				<nldd-tooltip
					text=${tooltipText}
					placement="left"
					?open=${copyState !== 'idle'}
				>
					<nldd-icon-button
						icon=${copyState === 'success' ? 'check-mark' : 'copy'}
						accessible-label=${buttonLabel}
						tooltip-timing="never"
						size="md"
						@click=${component._onCopyClick}
					></nldd-icon-button>
				</nldd-tooltip>
			</div>
			<div class="code-viewer__live-region" role="status" aria-live="polite">${liveRegionText}</div>
		</div>
	`}`;
}
