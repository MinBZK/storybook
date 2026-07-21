import { html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { NLDDDatePicker } from './date-picker.js';
import { WEEKDAY_KEYS } from './date-picker.i18n.js';
import type { NLDDDatePickerTranslations } from './date-picker.i18n.js';
import './../../actions/icon-button/icon-button.js';
import './../../actions/button/button.js';
import './../../actions/button-bar/button-bar.js';
import './../../actions/menu/menu.js';

const TITLE_ID = 'date-picker-title';

/**
 * The month heading is a live region: without it a keyboard user paging through
 * months hears only day numbers change and never learns which month they are in.
 */
function renderHeader(component: NLDDDatePicker): TemplateResult {
	return html`
		<div class="date-picker__header">
			<h2 class="date-picker__title"
				id=${TITLE_ID}
				aria-live="polite"
			>
				<button class="date-picker__title-button"
					type="button"
					aria-haspopup="menu"
					aria-expanded=${component._yearMenuOpen ? 'true' : 'false'}
				>
					${component._title}
					<span class="date-picker__title-chevron">
						<nldd-icon
							name="chevron-down-small"
							aria-hidden="true"
						></nldd-icon>
					</span>
				</button>
			</h2>
			<nldd-menu
				accessible-label=${component._t('components.date-picker.choose-year-action')}
				max-items="8"
				width="136px"
				@toggle=${component._handleYearMenuToggle}
			>
				${component._years.map((year) => html`
					<nldd-menu-item
						type="radio"
						text=${String(year)}
						?selected=${year === component._viewYear}
						@click=${() => component._handleYearSelect(year)}
					></nldd-menu-item>
				`)}
			</nldd-menu>
			${component._stacked ? nothing : html`
				<div class="date-picker__pagination">
					${renderPagination(component, 'sm', 'neutral-base', true)}
				</div>
			`}
		</div>
	`;
}

/**
 * The month arrows, with "Vandaag" between them when the wide layout keeps all
 * three in one bar. Stacked moves that button to the opposite corner, so whether
 * it belongs here is passed in rather than assumed.
 */
function renderPagination(component: NLDDDatePicker, size: string, variant: string, withToday: boolean): TemplateResult {
	return html`
		<nldd-button-bar
			size=${size}
			variant=${variant}
		>
			<nldd-icon-button
				icon="chevron-left"
				text=${component._t('components.date-picker.view-previous-month-action')}
				tooltip-timing="never"
				@click=${() => component._shiftView(-1)}
			></nldd-icon-button>
			${withToday && component._todayReachable ? html`
				<nldd-button-bar-divider></nldd-button-bar-divider>
				<nldd-button
					text=${component._t('components.date-picker.view-today-action')}
					@click=${component._handleToday}
				></nldd-button>
			` : nothing}
			<nldd-button-bar-divider></nldd-button-bar-divider>
			<nldd-icon-button
				icon="chevron-right"
				text=${component._t('components.date-picker.view-next-month-action')}
				tooltip-timing="never"
				@click=${() => component._shiftView(1)}
			></nldd-icon-button>
		</nldd-button-bar>
	`;
}

/** Stacked only: "Vandaag" bottom-left, the month arrows bottom-right. */
function renderFooter(component: NLDDDatePicker): TemplateResult {
	return html`
		<div class="date-picker__footer">
			<div class="date-picker__footer-today">
				${component._todayReachable ? html`
					<nldd-button
						size="md"
						variant="neutral-tinted"
						text=${component._t('components.date-picker.view-today-action')}
						@click=${component._handleToday}
					></nldd-button>
				` : nothing}
			</div>
			${renderPagination(component, 'md', 'neutral-tinted', false)}
		</div>
	`;
}

/** `abbr` carries the full weekday so a screen reader is not left with "ma". */
function renderColumnHeaders(component: NLDDDatePicker): TemplateResult {
	return html`
		<tr>
			${component.weekNumbers ? html`
				<th class="date-picker__week-header-cell"
					scope="col"
					abbr=${component._t('components.date-picker.week-number-column-label')}
				>
					${component._t('components.date-picker.week-number-column-short-label')}
				</th>
			` : nothing}
			${component._weekdays.map((day) => html`
				<th class="date-picker__weekday-header-cell"
					scope="col"
					abbr=${component._t(`components.date-picker.${WEEKDAY_KEYS[day]}-lowercase` as keyof NLDDDatePickerTranslations)}
				>
					${component._t(`components.date-picker.${WEEKDAY_KEYS[day]}-short-lowercase` as keyof NLDDDatePickerTranslations)}
				</th>
			`)}
		</tr>
	`;
}

/**
 * Unavailable days are aria-disabled rather than disabled: the roving tabindex
 * has to be able to land on them, otherwise arrowing across a blocked stretch
 * silently skips days and the calendar feels broken.
 */
function renderDay(component: NLDDDatePicker, iso: string): TemplateResult {
	const unavailable = component._isUnavailable(iso);
	const selected = component._isSelected(iso);
	const band = component._bandFor(iso);
	return html`
		<td class="date-picker__day-cell"
			aria-selected=${selected ? 'true' : nothing}
		>
			<button class=${classMap({
				'date-picker__day': true,
				'is-selected': selected,
				'is-in-range': component._isInRange(iso),
				'is-today': component._isToday(iso),
				'is-outside-month': component._isOutsideMonth(iso),
				'is-unavailable': unavailable,
			})}
				type="button"
				data-date=${iso}
				tabindex=${iso === component._focused ? '0' : '-1'}
				aria-label=${component._dayLabel(iso)}
				aria-disabled=${unavailable ? 'true' : nothing}
				aria-current=${component._isToday(iso) ? 'date' : nothing}
				@click=${() => component._handleDayClick(iso)}
				@pointerdown=${(e: PointerEvent) => component._handleDayPointerDown(iso, e)}
				@mouseenter=${() => component._handleDayHover(iso)}
			>
				${band === 'none' ? nothing : html`<span class=${classMap({
					'date-picker__day-range-indicator': true,
					'is-start': band === 'start',
					'is-end': band === 'end',
				})}></span>`}
				<span class="date-picker__day-indicator"></span>
				<span class="date-picker__day-number">
					${Number(iso.slice(8, 10))}
				</span>
			</button>
		</td>
	`;
}

export function datePickerTemplate(component: NLDDDatePicker): TemplateResult {
	return html`
		<div class="date-picker">
			${renderHeader(component)}
			<table class="date-picker__calendar"
				role="grid"
				aria-label=${component.accessibleLabel || nothing}
				aria-labelledby=${component.accessibleLabel ? nothing : TITLE_ID}
				@keydown=${component._handleKeydown}
				@focusin=${component._handleDayFocusIn}
				@focusout=${component._handleDayFocusOut}
				@pointermove=${component._handleGridPointerMove}
				@mouseleave=${component._handleGridLeave}
			>
				<thead>
					${renderColumnHeaders(component)}
				</thead>
				<tbody>
					${component._weeks.map((week) => html`
						<tr>
							${component.weekNumbers ? html`
								<th class="date-picker__week-cell"
									scope="row"
									aria-label=${component._t('components.date-picker.week-number-label', { week: component._weekNumber(week) })}
								>
									${component._weekNumber(week)}
								</th>
							` : nothing}
							${week.map((iso) => renderDay(component, iso))}
						</tr>
					`)}
				</tbody>
			</table>
			${component._stacked ? renderFooter(component) : nothing}
			<div class="date-picker__announcer"
				role="status"
				aria-live="polite"
			>
				${component._announcement}
			</div>
		</div>
	`;
}
