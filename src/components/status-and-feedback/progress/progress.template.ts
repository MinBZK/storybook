import { html, nothing } from 'lit';
import type { NLDDProgress } from './progress.js';

export function progressTemplate(component: NLDDProgress) {
	// Render nothing while the delay window is open so the indicator doesn't
	// even flash for sub-second loads.
	if (!component._visible) return nothing;
	// `text` attribute overrides the translated default. Empty string keeps
	// the default — pass `text=" "` (a space) if you genuinely want no label.
	const text = component.text || component._t('components.progress.loading-text');
	return html`
		<div class="progress__indicator">
			<slot>
				<nldd-progress-circle
					size="28"
					indeterminate
					text=${text}
				></nldd-progress-circle>
			</slot>
		</div>
	`;
}
