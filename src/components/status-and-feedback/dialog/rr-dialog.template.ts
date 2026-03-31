import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { RRDialog } from './rr-dialog.ts';

export function dialogTemplate(component: RRDialog) {
	return html`
		${component._resolvedIconName ? html`
			<div class="dialog__icon">
				<rr-icon name=${component._resolvedIconName}></rr-icon>
			</div>
		` : nothing}
		${component.text ? html`
			${component.headingLevel
				? unsafeHTML(`<h${component.headingLevel} class="dialog__text">${component.text}</h${component.headingLevel}>`)
				: html`<p class="dialog__text">${component.text}</p>`}
		` : nothing}
		${component.supportingText ? html`
			<p class="dialog__supporting-text">${component.supportingText}</p>
		` : nothing}
		<div class="dialog__body">
			<slot></slot>
		</div>
		<div class="dialog__actions">
			<rr-button-group flow="vertical">
				<slot name="actions"></slot>
			</rr-button-group>
		</div>
	`;
}
