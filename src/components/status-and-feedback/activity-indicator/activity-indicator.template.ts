import { html, nothing } from 'lit';
import type { NLDDActivityIndicator } from './activity-indicator.js';

export function activityIndicatorTemplate(component: NLDDActivityIndicator) {
	// Render nothing while the delay window is open so the indicator doesn't
	// even flash for sub-second loads, or once `complete` is set so the
	// element stays mounted but ARIA / visuals reflect the finished state.
	if (!component._visible || component.complete) return nothing;
	const text = component.text || component._t('components.activity-indicator.loading-text');
	return html`
		<div class="activity-indicator">
			<slot>
				<svg class="activity-indicator__circle"
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true"
					focusable="false"
				>
					<circle class="activity-indicator__track"
						cx="12"
						cy="12"
						r="9"
					></circle>
					<circle class="activity-indicator__indicator"
						cx="12"
						cy="12"
						r="9"
						pathLength="100"
					></circle>
				</svg>
				${component.showText ? html`<span class="activity-indicator__text">${text}</span>` : nothing}
			</slot>
		</div>
	`;
}
