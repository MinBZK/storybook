import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { NLDDActivityIndicator } from './activity-indicator.js';

export function activityIndicatorTemplate(component: NLDDActivityIndicator) {
	// Render nothing while the delay window is open so the indicator doesn't
	// even flash for sub-second loads, or once `complete` is set so the
	// element stays mounted but ARIA / visuals reflect the finished state.
	if (!component._visible || component.complete) return nothing;
	// The label always renders so it is the announced content of the
	// role="status" host; show-text only controls whether it is visible.
	const text = component._accessibleName;
	return html`
		${component.backdrop ? html`<div class="activity-indicator__backdrop" aria-hidden="true"></div>` : nothing}
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
				<span class=${classMap({
				'activity-indicator__text': true,
				'activity-indicator__text--visually-hidden': !component.showText,
			})}>${text}</span>
			</slot>
		</div>
	`;
}
