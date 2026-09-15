/* eslint-disable lit-a11y/click-events-have-key-events -- native dialog handles keyboard via @cancel */
import { html, TemplateResult } from 'lit';
import type { NLDDWindow } from './window.js';

export function windowTemplate(component: NLDDWindow): TemplateResult {
	return html`
		<dialog class="window"
			aria-label=${component._resolvedAccessibleLabel}
			aria-modal="true"
			@pointerdown=${component._handleDialogPointerDown}
			@click=${component._handleDialogClick}
			@cancel=${component._handleCancel}
			@close=${component._handleDialogClose}
		>
			<div class="window__body">
				<slot></slot>
			</div>
			<!-- Where the notification region lands while this is the topmost open
			     overlay. Inside the dialog, so it escapes the inertness, and beside
			     the content rather than in it. Plumbing, not consumer API. -->
			<slot name="overlay-layer"></slot>
		</dialog>
	`;
}
