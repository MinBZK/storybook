import { html, nothing, TemplateResult } from 'lit';
import type { NDDToken } from './ndd-token.js';

export function tokenTemplate(component: NDDToken): TemplateResult {
	if (component.control === 'menu') {
		return html`
			<button
				class="token"
				type="button"
				?disabled=${component.disabled}
				aria-expanded=${component.open}
				aria-controls=${component.controls || nothing}
				@click=${component._handleMenuClick}
			>
				<span class="token__text"><slot></slot></span>
				<ndd-icon class="token__icon" name="chevron-down-small"></ndd-icon>
			</button>
		`;
	}

	return html`
		<div class="token">
			<span class="token__text"><slot></slot></span>
			${component.control === 'dismiss' ? html`
				<div class="token__dismiss-action">
					<ndd-icon-button
						size="sm"
						variant="neutral-tinted"
						icon="dismiss-small"
						text=${component.dismissLabel}
						accessible-label=${component.dismissLabel}
						?disabled=${component.disabled}
						@click=${component._handleDismiss}
					></ndd-icon-button>
				</div>
			` : nothing}
		</div>
	`;
}
