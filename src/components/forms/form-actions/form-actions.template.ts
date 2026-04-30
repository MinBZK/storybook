import { html, TemplateResult } from 'lit';

export function formActionsTemplate(): TemplateResult {
	return html`
		<div class="form-actions">
			<div class="form-actions__main">
				<slot></slot>
			</div>
		</div>
	`;
}
