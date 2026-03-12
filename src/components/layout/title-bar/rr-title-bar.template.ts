import { html, TemplateResult } from 'lit';

export function titleBarTemplate(): TemplateResult {
	return html`
		<div class="title-bar">
			<div class="title-bar__title-group">
				<slot name="overline"></slot>
				<slot></slot>
				<slot name="subtitle"></slot>
			</div>
			<div class="title-bar__actions">
				<slot name="actions"></slot>
			</div>
		</div>
	`;
}
