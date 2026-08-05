import { html, nothing, TemplateResult } from 'lit';
import type { NLDDTimePicker } from './time-picker.js';

function pad(number: number): string {
	return String(number).padStart(2, '0');
}

/**
 * Eén kolom met waarden. Decor voor de screenreader: de betekenis en de
 * bediening zitten in de band, dus hier geen rollen en geen tab-stops, anders
 * staan dezelfde waarden er twee keer in.
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
 * Een waarde in de band, als spinbutton. De band ligt dekkend over de kolommen,
 * dus dit is het cijfer dat je leest; wat eronder ligt hoeft niet aangepast te
 * worden, dat valt toch weg. In wiel-modus staan de kolommen op aria-hidden en
 * is een spinbutton precies wat een wiel is. Losse tab-stops voor uur en minuut,
 * zodat je met Tab tussen de twee wisselt en met de pijltjes de waarde verzet.
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
