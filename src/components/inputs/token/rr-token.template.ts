import { html, nothing, TemplateResult } from 'lit';
import type { RRToken } from './rr-token.js';


export function tokenTemplate(component: RRToken): TemplateResult {
	if (component.control === 'menu') {
		return html`
			<button
				class="token"
				type="button"
				?disabled=${component.disabled}
				aria-expanded=${component.open}
				@click=${component._handleMenuClick}
			>
				<span class="token__text"><slot></slot></span>
				<rr-icon class="token__icon" name="chevron-down-small"></rr-icon>
			</button>
		`;
	}

	return html`
		<div class="token">
			<span class="token__text"><slot></slot></span>
			${component.control === 'dismiss' ? html`
				<div class="token__dismiss-action">
					<rr-icon-button
						size="sm"
						variant="neutral-tinted"
						accessible-label=${component.dismissLabel}
						?disabled=${component.disabled}
						@click=${component._handleDismiss}
					>
						<rr-icon name="dismiss-small"></rr-icon>
						${component.dismissLabel}
					</rr-icon-button>
				</div>
			` : nothing}
		</div>
	`;
}
