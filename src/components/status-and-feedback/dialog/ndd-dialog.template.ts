import { html, nothing } from 'lit';
import type { NDDDialog } from './ndd-dialog.ts';

export function dialogTemplate(component: NDDDialog) {
	return html`
		<div class="dialog__body">
			${component._resolvedIconName ? html`
				<div class="dialog__icon">
					<ndd-icon name=${component._resolvedIconName}></ndd-icon>
				</div>
			` : nothing}
			${component.text ? html`
				${component.headingLevel === 1 ? html`<h1 class="dialog__text">${component.text}</h1>`
				: component.headingLevel === 2 ? html`<h2 class="dialog__text">${component.text}</h2>`
				: component.headingLevel === 3 ? html`<h3 class="dialog__text">${component.text}</h3>`
				: component.headingLevel === 4 ? html`<h4 class="dialog__text">${component.text}</h4>`
				: component.headingLevel === 5 ? html`<h5 class="dialog__text">${component.text}</h5>`
				: component.headingLevel === 6 ? html`<h6 class="dialog__text">${component.text}</h6>`
				: html`<p class="dialog__text">${component.text}</p>`}
			` : nothing}
			${component.supportingText ? html`
				<p class="dialog__supporting-text">${component.supportingText}</p>
			` : nothing}
			<div class="dialog__content">
				<slot></slot>
			</div>
			<div class="dialog__actions">
				<ndd-button-group flow="vertical">
					<slot name="actions"></slot>
				</ndd-button-group>
			</div>
		</div>
	`;
}
