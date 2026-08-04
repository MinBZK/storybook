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
	return html`
		<div class="time-picker__column"
			role="listbox"
			aria-label=${label}
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
						role="option"
						aria-selected=${isSelected ? 'true' : 'false'}
						tabindex=${isTabStop ? 0 : -1}
						@click=${() => component._select(column, number)}
					>
						${pad(number)}
					</button>
				`;
			})}
		</div>
	`;
}

export function timePickerTemplate(component: NLDDTimePicker): TemplateResult {
	return html`
		<div class="time-picker"
			role="group"
			aria-label=${component._label}
		>
			${component.variant === 'wheel' ? html`
				<div class="time-picker__band"
					aria-hidden="true"
				>
					<span class="time-picker__band-value">
						${component._bandHour === null ? '' : pad(component._bandHour)}
					</span>
					<span class="time-picker__band-separator">
						:
					</span>
					<span class="time-picker__band-value">
						${component._bandMinute === null ? '' : pad(component._bandMinute)}
					</span>
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
