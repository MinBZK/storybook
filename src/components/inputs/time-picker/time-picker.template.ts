import { html, nothing, TemplateResult } from 'lit';
import type { NLDDTimePicker } from './time-picker.js';

function pad(number: number): string {
	return String(number).padStart(2, '0');
}

/**
 * Eén kolom als listbox. De roving tabindex zit op de opties: alleen de gekozen
 * optie is bereikbaar met Tab (of de eerste zolang er niets gekozen is), zodat
 * Tab naar de volgende kolom springt in plaats van door 24 uren te lopen.
 */
function renderColumn(
	component: NLDDTimePicker,
	column: 'hours' | 'minutes',
	numbers: number[],
	selected: number | null,
	label: string,
): TemplateResult {
	const wheel = component.variant === 'wheel';
	return html`
		<div class="time-picker__column"
			role=${wheel ? 'presentation' : 'listbox'}
			aria-label=${wheel ? nothing : label}
			aria-hidden=${wheel ? 'true' : nothing}
			data-column=${column}
			@keydown=${(e: KeyboardEvent) => component._handleKeydown(e, column)}
			@focusin=${() => component._handleFocus(column)}
			@scroll=${(e: Event) => component._handleScroll(e, column)}
		>
			${numbers.map((number) => {
				const isSelected = number === selected;
				const isTabStop = selected === null ? number === numbers[0] : isSelected;
				return html`
					<button class="time-picker__option"
						type="button"
						role=${wheel ? 'presentation' : 'option'}
						aria-selected=${wheel ? nothing : (isSelected ? 'true' : 'false')}
						data-selected=${isSelected ? 'true' : nothing}
						tabindex=${wheel || !isTabStop ? -1 : 0}
						@click=${() => component._select(column, number)}
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
		<span class="time-picker__band-value"
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
			${component.variant === 'wheel' ? html`
				<div class="time-picker__band">
					${renderBandValue(component, 'hours', component._bandHour, component._t('components.time-picker.hours-label'))}
					<span class="time-picker__band-separator"
						aria-hidden="true"
					>
						:
					</span>
					${renderBandValue(component, 'minutes', component._bandMinute, component._t('components.time-picker.minutes-label'))}
				</div>
			` : nothing}
			${renderColumn(
				component,
				'hours',
				component._hours,
				component._selectedHour,
				component._t('components.time-picker.hours-label'),
			)}
			<span class="time-picker__separator"
				aria-hidden="true"
			>
				:
			</span>
			${renderColumn(
				component,
				'minutes',
				component._minutes,
				component._selectedMinute,
				component._t('components.time-picker.minutes-label'),
			)}
		</div>
	`;
}
