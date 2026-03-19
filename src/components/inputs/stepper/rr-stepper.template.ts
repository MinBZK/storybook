import { html, nothing, TemplateResult } from 'lit';
import type { RRStepper } from './rr-stepper.js';
import './../../actions/icon-button/rr-icon-button.ts';
import './../../content/icon/rr-icon.ts';

export function stepperTemplate(component: RRStepper): TemplateResult {
	const atMin = component.value <= component.min;
	const atMax = component.value >= component.max;

	return html`
		<div class="stepper"
			role="spinbutton"
			tabindex=${component.disabled ? nothing : '0'}
			aria-valuenow=${component.value}
			aria-valuemin=${isFinite(component.min) ? component.min : nothing}
			aria-valuemax=${isFinite(component.max) ? component.max : nothing}
			aria-label=${component._t('components.stepper.to-adjust-value-action')}
			aria-disabled=${component.disabled ? 'true' : nothing}
			@keydown=${component._handleKeydown}
		>
			<rr-icon-button
				variant="neutral-tinted"
				size=${component.size}
				?disabled=${component.disabled || atMin}
				aria-hidden="true"
				tabindex="-1"
				@click=${component._decrement}
			>
				<rr-icon name="minus"></rr-icon>
				${component._t('components.stepper.decrement-action')}
			</rr-icon-button>
			<div class="stepper__divider"
				aria-hidden="true"
			></div>
			<rr-icon-button
				variant="neutral-tinted"
				size=${component.size}
				?disabled=${component.disabled || atMax}
				aria-hidden="true"
				tabindex="-1"
				@click=${component._increment}
			>
				<rr-icon name="plus"></rr-icon>
				${component._t('components.stepper.increment-action')}
			</rr-icon-button>
		</div>
	`;
}
