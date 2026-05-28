import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import type { NLDDProgressBar } from './progress-bar.js';

export function progressBarTemplate(component: NLDDProgressBar, onSlotChange: () => void) {
	// Header only renders when `text` is set. The value lives next to the text
	// and shouldn't appear on its own — otherwise it'd pop in/out when toggling
	// indeterminate (since `_displayValue` is empty during indeterminate).
	const hasHeader = !!component.text;
	const isExiting = component._indeterminateExiting;
	const isEntering = component._indeterminateEntering;
	// Indicator renders during indeterminate and during an exit-fade.
	const showIndeterminateIndicator = (component.indeterminate || isExiting) && !component._hasSegments;
	// Segment renders during determinate and during an enter-shrink (otherwise
	// it can't shrink — it would unmount immediately). Its dynamic attributes
	// (width, mode, tooltip-text, grow/shrink) are applied by _syncSegments
	// so the slotted and internal paths share one code path.
	const showInternalSegment = !component._hasSegments
		&& component.value !== null && component.value > 0
		&& (!component.indeterminate || isEntering);
	// Round so aria-valuenow doesn't produce floats (some screenreaders
	// read them out literally — "49 point 999 percent").
	const ariaValueNow = component.indeterminate ? undefined : Math.round(component._totalValue);
	return html`
		${hasHeader ? html`
			<div class="progress-bar__header">
				<span class="progress-bar__text">${component.text}</span>
				<span class="progress-bar__value">${component._displayValue}</span>
			</div>
		` : nothing}
		<div class="progress-bar__track"
			role="progressbar"
			aria-valuemin="0"
			aria-valuemax=${component.max}
			aria-valuenow=${ifDefined(ariaValueNow)}
			aria-valuetext=${component._ariaValueText}
		>
			${showIndeterminateIndicator ? html`
				<div class=${classMap({
					'progress-bar__indeterminate-indicator': true,
					'is-fading-out': isExiting && !component.indeterminate,
					'is-fading-in': isEntering && component.indeterminate,
				})}></div>
			` : nothing}
			${showInternalSegment ? html`
				<nldd-progress-bar-segment class="progress-bar__internal-segment"
					.value=${component.value!}
					color=${component.color}
				></nldd-progress-bar-segment>
			` : nothing}
			<slot @slotchange=${onSlotChange}></slot>
		</div>
	`;
}
