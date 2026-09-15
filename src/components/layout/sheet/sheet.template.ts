/* eslint-disable lit-a11y/click-events-have-key-events -- native dialog handles keyboard via @cancel */
import { html } from 'lit';
import type { NLDDSheet } from './sheet.js';

export function sheetTemplate(component: NLDDSheet) {
	return html`
		<dialog class="sheet"
			aria-label=${component.accessibleLabel}
			aria-modal="true"
			@pointerdown=${component._handleDialogPointerDown}
			@click=${component._handleDialogClick}
			@cancel=${component._handleCancel}
			@close=${component._handleDialogClose}
		>
			<div class="sheet__body">
				<slot></slot>
			</div>
			<!-- Where the notification region lands while this is the topmost open
			     overlay. Inside the dialog, so it escapes the inertness, and beside
			     the content rather than in it. Plumbing, not consumer API. -->
			<slot name="overlay-layer"></slot>
		</dialog>
	`;
}
