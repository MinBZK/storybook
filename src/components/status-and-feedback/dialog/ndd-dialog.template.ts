/* eslint-disable lit-a11y/click-events-have-key-events -- native dialog handles keyboard via @cancel */
import { html, nothing } from 'lit';
import type { NDDDialog } from './ndd-dialog.ts';

export function dialogTemplate(component: NDDDialog) {
	return html`
		<dialog class="dialog"
			role=${component.variant === 'alert' ? 'alertdialog' : nothing}
			@click=${component._handleBackdropClick}
			@cancel=${component._handleCancel}
		>
			<ndd-inline-dialog
				variant=${component.variant || nothing}
				icon-name=${component.iconName || nothing}
				text=${component.text || nothing}
				supporting-text=${component.supportingText || nothing}
				heading-level="2"
			>
				<slot></slot>
				<slot slot="actions" name="actions"></slot>
			</ndd-inline-dialog>
		</dialog>
	`;
}
