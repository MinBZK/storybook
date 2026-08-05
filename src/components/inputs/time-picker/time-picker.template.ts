import { html, nothing, TemplateResult } from 'lit';
import type { NLDDTimePicker } from './time-picker.js';

function pad(number: number): string {
	return String(number).padStart(2, '0');
}

/**
 * One column of values. Scenery as far as the screen reader is concerned: the
 * meaning and the controls live in the band, so no roles and no tab stops here,
 * otherwise the same values appear in it twice.
 */
function renderColumn(
	component: NLDDTimePicker,
	column: 'hours' | 'minutes',
	numbers: number[],
	selected: number | null,
): TemplateResult {
	return html`
		<div class="time-picker__list"
			role="presentation"
			aria-hidden="true"
			data-column=${column}
			@keydown=${(e: KeyboardEvent) => component._handleKeydown(e, column)}
			@scroll=${(e: Event) => component._handleScroll(e, column)}
		>
			${numbers.map((number) => {
				const isSelected = number === selected;
				return html`
					<button class="time-picker__list-item"
						type="button"
						role="presentation"
						data-selected=${isSelected ? 'true' : nothing}
						tabindex="-1"
						@click=${() => component._select(column, number, true)}
					>
						${pad(number)}
					</button>
				`;
			})}
		</div>
	`;
}

/**
 * A value in the band, as a spinbutton. The band covers the columns opaquely,
 * so this is the digit you read. What lies underneath needs no styling of its
 * own, it is hidden anyway. The columns are aria-hidden, and a spinbutton is
 * exactly what a wheel is. Separate tab stops for hour and minute, so Tab
 * switches between the two and the arrows move the value.
 */
function renderBandValue(
	component: NLDDTimePicker,
	column: 'hours' | 'minutes',
	value: number | null,
	label: string,
): TemplateResult {
	const numbers = column === 'hours' ? component._hours : component._minutes;
	return html`
		<span class="time-picker__value"
			role="spinbutton"
			tabindex="0"
			aria-label=${label}
			aria-valuenow=${value ?? nothing}
			aria-valuemin=${numbers[0] ?? nothing}
			aria-valuemax=${numbers[numbers.length - 1] ?? nothing}
			aria-valuetext=${value === null ? nothing : pad(value)}
			@keydown=${(e: KeyboardEvent) => component._handleKeydown(e, column)}
		>
			${value === null ? '' : pad(value)}
		</span>
	`;
}

export function timePickerTemplate(component: NLDDTimePicker): TemplateResult {
	return html`
		<div class="time-picker"
			role="group"
			aria-label=${component._label}
		>
			<div class="time-picker__selection">
				${renderBandValue(component, 'hours', component._bandHour, component._t('components.time-picker.hours-label'))}
				<span class="time-picker__value-separator"
					aria-hidden="true"
				>
					:
				</span>
				${renderBandValue(component, 'minutes', component._bandMinute, component._t('components.time-picker.minutes-label'))}
			</div>
			${renderColumn(
				component,
				'hours',
				component._hours,
				component._selectedHour,
			)}
			<span class="time-picker__gap"
				aria-hidden="true"
			></span>
			${renderColumn(
				component,
				'minutes',
				component._minutes,
				component._selectedMinute,
			)}
		</div>
	`;
}
