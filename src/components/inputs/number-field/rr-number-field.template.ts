import { html, nothing, TemplateResult } from 'lit';
import type { RRNumberField } from './rr-number-field.js';
import './../../actions/icon-button/rr-icon-button.ts';

export function numberFieldTemplate(component: RRNumberField): TemplateResult {
	const canDecrease = component.value > component.min;
	const canIncrease = component.value < component.max;

	return html`
		<div class="number-field"
			role="group"
			aria-label=${component._t('components.number-field.to-adjust-value-action')}
		>
			${!component.hideSpinButtons ? html`
				<div class="number-field__decrement-control">
					<rr-icon-button
						variant="neutral-tinted"
						size="sm"
						icon="minus"
						text=${component._t('components.number-field.decrement-action')}
						?disabled=${component.disabled || !canDecrease}
						@click=${component._handleDecrease}
					></rr-icon-button>
				</div>
			` : nothing}
			<input class="number-field__input"
				type="number"
				aria-label=${component.accessibleLabel || nothing}
				.value=${String(component.value)}
				min=${component.min}
				max=${component.max}
				step=${component.step}
				?disabled=${component.disabled}
				name=${component.name || nothing}
				@input=${component._handleInput}
			>
			${!component.hideSpinButtons ? html`
				<div class="number-field__increment-control">
					<rr-icon-button
						variant="neutral-tinted"
						size="sm"
						icon="plus"
						text=${component._t('components.number-field.increment-action')}
						?disabled=${component.disabled || !canIncrease}
						@click=${component._handleIncrease}
					></rr-icon-button>
				</div>
			` : nothing}
		</div>
	`;
}
