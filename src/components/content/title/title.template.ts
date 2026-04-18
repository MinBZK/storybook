import { html, TemplateResult } from 'lit';

export function titleTemplate(): TemplateResult {
	return html`
		<div class="title">
			<div class="title__title-group">
				<slot name="overline"></slot>
				<slot></slot>
				<slot name="subtitle"></slot>
			</div>
			<div class="title__actions">
				<slot name="actions"></slot>
			</div>
		</div>
	`;
}
