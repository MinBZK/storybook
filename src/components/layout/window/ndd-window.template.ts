import { html, TemplateResult } from 'lit';
import type { NDDWindow } from './ndd-window.js';

export function windowTemplate(component: NDDWindow): TemplateResult {
	return html`
		<dialog class="window"
			aria-label=${component.accessibleLabel}
			@click=${component._handleDialogClick}
			@cancel=${component._handleCancel}
			@pointerdown=${component._handlePointerDown}
		>
			<div class="window__body">
				<slot @slotchange=${component._detectDragHandle}></slot>
			</div>
		</dialog>
	`;
}
