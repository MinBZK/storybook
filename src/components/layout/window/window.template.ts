/* eslint-disable lit-a11y/click-events-have-key-events -- native dialog handles keyboard via @cancel */
import { html, nothing, TemplateResult } from 'lit';
import type { NLDDWindow } from './window.js';

export function windowTemplate(component: NLDDWindow): TemplateResult {
	return html`
		<dialog class="window"
			aria-label=${component._resolvedAccessibleLabel}
			aria-modal=${component.modeless ? nothing : 'true'}
			@click=${component._handleDialogClick}
			@cancel=${component._handleCancel}
		>
			<div class="window__body">
				<slot></slot>
			</div>
		</dialog>
	`;
}
