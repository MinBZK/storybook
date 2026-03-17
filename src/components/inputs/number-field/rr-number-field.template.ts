import { html, TemplateResult } from 'lit';
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
			<div class="number-field__input">
				<input class="number-field__native"
					type="number"
					aria-live="polite"
					.value=${String(component.value)}
					min=${component.min}
					max=${component.max}
					step=${component.step}
					?disabled=${component.disabled}
					name=${component.name || ''}
					@input=${component._handleInput}
				>
			</div>
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
		</div>
	`;
}
