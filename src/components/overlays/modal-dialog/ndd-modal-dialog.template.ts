import { html, nothing } from 'lit';
import type { NDDModalDialog } from './ndd-modal-dialog.ts';

export function modalDialogTemplate(component: NDDModalDialog) {
	return html`
		<dialog
			class="modal-dialog"
			role=${component.variant === 'alert' ? 'alertdialog' : nothing}
			@click=${component._handleBackdropClick}
			@cancel=${component._handleCancel}
		>
			<ndd-dialog
				variant=${component.variant || nothing}
				icon-name=${component.iconName || nothing}
				text=${component.text || nothing}
				supporting-text=${component.supportingText || nothing}
				heading-level="2"
			>
				<slot></slot>
				<slot slot="actions" name="actions"></slot>
			</ndd-dialog>
		</dialog>
	`;
}
