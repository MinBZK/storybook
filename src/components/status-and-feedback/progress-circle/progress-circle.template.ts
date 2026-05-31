import { html, svg, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { NLDDProgressCircle } from './progress-circle.js';

// SVG geometry: viewBox 100×100, ring centred. The stroke would extend
// half-width past the path on each side; at small sizes that half-stroke is
// large in user units (size 16, stroke 2px → 12.5u, half = 6.25u) and could
// clip outside the viewBox. So radius shrinks with size so that the stroke's
// outer edge aligns with the viewBox edge (50u from centre).
//
// Stroke width scales with circle size for visual harmony — thin strokes look
// out of place on a huge ring and thick strokes overpower a tiny ring. Must
// stay in sync with the per-size --_stroke-width rules in the stylesheet.
export function getStrokeWidthPx(sizeInPixels: number): number {
	if (sizeInPixels <= 20) return 3;
	if (sizeInPixels <= 40) return 4;
	if (sizeInPixels <= 48) return 5;
	return 6;
}

export function getRadius(sizeInPixels: number): number {
	const strokeWidthUserUnits = getStrokeWidthPx(sizeInPixels) * 100 / sizeInPixels;
	return 50 - strokeWidthUserUnits / 2;
}

export function getCircumference(sizeInPixels: number): number {
	return 2 * Math.PI * getRadius(sizeInPixels);
}

/**
 * Lit template — renders the full SVG structure including one `<circle>` per
 * segment and (when needed) an indeterminate indicator. The dynamic per-render
 * attributes (stroke-dasharray, stroke-dashoffset, data-shrink, data-fade) are
 * NOT set here — they're applied by the component's _syncDynamicAttributes()
 * in the updated() lifecycle. Keeping them out of the Lit binding avoids the
 * SVG attribute removal quirks that bit us earlier.
 */
export function progressCircleTemplate(component: NLDDProgressCircle, onSlotChange: () => void) {
	const tooltipText = component._tooltipText;
	const ariaText = component._ariaValueText;
	// Round so aria-valuenow doesn't produce floats (some screenreaders
	// read them out literally — "49 point 999 percent").
	const ariaValueNow = component.indeterminate ? undefined : Math.round(component._totalValue);
	const isExiting = component._indeterminateExiting;
	const isIndeterminate = (component.indeterminate || isExiting) && !component._hasSegments;
	const showArcs = !component.indeterminate || component._indeterminateEntering;
	const arcs = showArcs ? component._buildArcs() : [];
	const sizeInPixels = Number(component.size) || 28;
	const radius = getRadius(sizeInPixels);
	const circumference = getCircumference(sizeInPixels);
	// Accessible name: use aria-label with the visible label text or a
	// translated fallback. aria-labelledby would be cleaner but VoiceOver on
	// Safari can't resolve IDREFs scoped to a shadow root, so we duplicate
	// the string into aria-label for cross-browser screen-reader support.
	const ariaLabel = component.text || component._t('components.progress-circle.label-text');
	const circle = html`
		<div class="progress-circle__circle"
			role="progressbar"
			aria-label=${ariaLabel}
			aria-valuemin="0"
			aria-valuemax=${component.max}
			aria-valuenow=${ifDefined(ariaValueNow)}
			aria-valuetext=${ariaText}
		>
			<svg class="progress-circle__svg"
				viewBox="0 0 100 100"
				aria-hidden="true"
			>
				<circle class="progress-circle__track"
					cx="50"
					cy="50"
					r=${radius}
					fill="none"
				></circle>
				${arcs.map(arc => svg`
					<circle class="progress-circle__segment progress-circle__segment--${arc.color}"
						cx="50"
						cy="50"
						r=${radius}
						fill="none"
						stroke-dasharray="${arc.length} ${circumference}"
						stroke-dashoffset=${-arc.offset}
					></circle>
				`)}
				${isIndeterminate ? svg`
					<circle class="progress-circle__indeterminate-indicator"
						cx="50"
						cy="50"
						r=${radius}
						fill="none"
						pathLength="100"
						stroke-linecap="round"
					></circle>
				` : nothing}
			</svg>
		</div>
	`;
	// Skip the tooltip wrapper entirely when there's no tooltip text (e.g.
	// value-display is not "tooltip") so consumers don't get an inert tooltip.
	const wrappedCircle = tooltipText
		? html`
			<nldd-tooltip
				text=${tooltipText}
				placement="top"
				timing="instant"
			>${circle}</nldd-tooltip>
		`
		: circle;
	return html`
		${wrappedCircle}
		<slot @slotchange=${onSlotChange}></slot>
		${component.text || (component.valueDisplay === 'inline' && component._displayValue) ? html`
			<div class="progress-circle__caption">
				${component.text ? html`<span class="progress-circle__text">${component.text}</span>` : nothing}
				${component.valueDisplay === 'inline' && component._displayValue ? html`<span class="progress-circle__supporting-text">${component._displayValue}</span>` : nothing}
			</div>
		` : nothing}
	`;
}
