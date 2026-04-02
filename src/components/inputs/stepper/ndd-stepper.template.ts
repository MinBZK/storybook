import { html, nothing, TemplateResult } from 'lit';
import type { NDDStepper } from './ndd-stepper.js';
import './../../actions/icon-button/ndd-icon-button.ts';

export function stepperTemplate(component: NDDStepper): TemplateResult {
	const atMin = component.value <= component.min;
	const atMax = component.value >= component.max;

	return html`
		<div
			class="stepper"
			role="spinbutton"
			tabindex=${component.disabled ? nothing : '0'}
			aria-valuenow=${component.value}
			aria-valuemin=${isFinite(component.min) ? component.min : nothing}
			aria-valuemax=${isFinite(component.max) ? component.max : nothing}
			aria-label=${component._t('components.stepper.to-adjust-value-action')}
			aria-disabled=${component.disabled ? 'true' : nothing}
			@keydown=${component._handleKeydown}
		>
			<ndd-icon-button
				variant="neutral-tinted"
				size=${component.size}
				icon="minus"
				text=${component._t('components.stepper.decrement-action')}
				?disabled=${component.disabled || atMin}
				aria-hidden="true"
				tabindex="-1"
				@click=${component._decrement}
			></ndd-icon-button>
			<div class="stepper__divider" aria-hidden="true"></div>
			<ndd-icon-button
				variant="neutral-tinted"
				size=${component.size}
				icon="plus"
				text=${component._t('components.stepper.increment-action')}
				?disabled=${component.disabled || atMax}
				aria-hidden="true"
				tabindex="-1"
				@click=${component._increment}
			></ndd-icon-button>
		</div>
	`;
}
