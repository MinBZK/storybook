import { html, nothing } from 'lit';
import type { NDDSheet } from './ndd-sheet.ts';

export function sheetTemplate(component: NDDSheet) {
	return html`
		<dialog
			class="sheet"
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
