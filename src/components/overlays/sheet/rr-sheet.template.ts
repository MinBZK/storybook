import { html, nothing } from 'lit';
import type { RRSheet } from './rr-sheet.ts';

export function sheetTemplate(component: RRSheet) {
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
