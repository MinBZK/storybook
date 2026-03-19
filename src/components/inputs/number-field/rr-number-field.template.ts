import { html, nothing, TemplateResult } from 'lit';
import type { RRNumberField } from './rr-number-field.js';
import './../../actions/icon-button/rr-icon-button.ts';
import './../../content/icon/rr-icon.ts';

export function numberFieldTemplate(component: RRNumberField): TemplateResult {
	const canDecrease = component.value > component.min;
	const canIncrease = component.value < component.max;

	return html`
		<div class="number-field"
			role="group"
			aria-label=${component._t('components.number-field.to-adjust-value-action')}
		>
			${!component.hideSpinButtons ? html`
				<div class="number-field__decrement-control"
					@click=${component._handleDecrease}
				>
					<rr-icon-button
						variant="neutral-tinted"
						size="sm"
						?disabled=${component.disabled || !canDecrease}
					>
						<rr-icon name="minus"></rr-icon>
						${component._t('components.number-field.decrement-action')}
					</rr-icon-button>
				</div>
			` : nothing}
			<input class="number-field__input"
				type="number"
				.value=${String(component.value)}
				min=${component.min}
				max=${component.max}
				step=${component.step}
				?disabled=${component.disabled}
				name=${component.name || nothing}
				@input=${component._handleInput}
			>
			${!component.hideSpinButtons ? html`
				<div class="number-field__increment-control"
					@click=${component._handleIncrease}
				>
					<rr-icon-button
						variant="neutral-tinted"
						size="sm"
						?disabled=${component.disabled || !canIncrease}
					>
						<rr-icon name="plus"></rr-icon>
						${component._t('components.number-field.increment-action')}
					</rr-icon-button>
				</div>
			` : nothing}
		</div>
	`;
}
