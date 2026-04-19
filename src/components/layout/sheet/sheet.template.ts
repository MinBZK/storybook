/* eslint-disable lit-a11y/click-events-have-key-events -- native dialog handles keyboard via @cancel */
import { html, nothing } from 'lit';
import type { NLDDSheet } from './sheet.js';

export function sheetTemplate(component: NLDDSheet) {
	return html`
		<dialog class="sheet"
			aria-label=${component.accessibleLabel}
			aria-modal=${component.modeless ? nothing : 'true'}
			@click=${component._handleDialogClick}
			@cancel=${component._handleCancel}
		>
			<div class="sheet__body">
				<slot></slot>
			</div>
		</dialog>
	`;
}
