import { html, nothing } from 'lit';
import type { NLDDProgress } from './progress.js';

export function progressTemplate(component: NLDDProgress) {
	// Render nothing while the delay window is open so the indicator doesn't
	// even flash for sub-second loads, or once `complete` is set so the
	// element stays mounted but ARIA / visuals reflect the finished state.
	if (!component._visible || component.complete) return nothing;
	// `text` attribute overrides the translated default. To suppress the
	// label entirely use the `no-label` boolean attribute — passing
	// text="" leaves the translated fallback in place by design.
	const text = component.noLabel
		? ''
		: (component.text || component._t('components.progress.loading-text'));
	return html`
		<div class="progress__indicator">
			<slot>
				<nldd-progress-circle
					size="28"
					indeterminate
					.text=${text}
				></nldd-progress-circle>
			</slot>
		</div>
	`;
}
