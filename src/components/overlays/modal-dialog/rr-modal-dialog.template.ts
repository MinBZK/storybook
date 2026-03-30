import { html, nothing } from 'lit';
import type { RRModalDialog } from './rr-modal-dialog.ts';

export function modalDialogTemplate(component: RRModalDialog) {
	return html`
		<dialog class="modal-dialog"
			@click=${component._handleBackdropClick}
			@cancel=${component._handleCancel}
		>
			<rr-dialog
				variant=${component.variant || nothing}
				icon-name=${component.iconName || nothing}
				text=${component.text || nothing}
				supporting-text=${component.supportingText || nothing}
			>
				<slot></slot>
				<slot slot="actions" name="actions"></slot>
			</rr-dialog>
		</dialog>
	`;
}
