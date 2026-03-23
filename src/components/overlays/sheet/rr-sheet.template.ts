import { html } from 'lit';
import type { RRSheet } from './rr-sheet.ts';

export function template(this: RRSheet) {
	return html`
		<dialog class="sheet"
			@click=${this._handleDialogClick}
			@cancel=${this._handleCancel}
		>
			<div class="sheet__body">
				<slot></slot>
			</div>
		</dialog>
	`;
}
