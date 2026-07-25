/**
 * Resolves the `min` / `max` bound of a date component to an ISO date.
 *
 * Bounds accept a literal ISO date (`2026-12-31`) or a relative expression
 * anchored on today (`today`, `today-18y`, `today+1m`). The relative form exists
 * because an absolute bound goes stale: a birthdate field written as
 * `max="2026-07-19"` starts accepting tomorrow's date the day after it ships.
 *
 * Units are `d` (days), `w` (weeks), `m` (months) and `y` (years).
 *
 * "Today" is the local calendar day, so the bound matches the date on the user's
 * own clock. Pass `today` explicitly to make callers and tests deterministic.
 *
 * An unreadable expression resolves to no bound rather than to an impossible
 * one - a typo in an attribute should not silently reject every date.
 */

/** Guards against month/day overflow: new Date(2026, 1, 31) silently becomes March 3. */
export function isRealDate(year: number, month: number, day: number): boolean {
	if (month < 1 || month > 12 || day < 1) return false;
	const date = new Date(Date.UTC(year, month - 1, day));
	return date.getUTCFullYear() === year
		&& date.getUTCMonth() === month - 1
		&& date.getUTCDate() === day;
}

export function toIso(year: number, month: number, day: number): string | null {
	if (!isRealDate(year, month, day)) return null;
	return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/** Day 0 of the next month is the last day of this one. */
function lastDayOfMonth(year: number, month: number): number {
	return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;
const RELATIVE = /^today(?:([+-])(\d+)([dwmy]))?$/;

export function resolveDateBound(raw: string, today: Date = new Date()): string {
	const trimmed = raw.trim();
	if (trimmed === '') return '';

	const iso = ISO.exec(trimmed);
	if (iso) {
		return isRealDate(Number(iso[1]), Number(iso[2]), Number(iso[3])) ? trimmed : '';
	}

	const relative = RELATIVE.exec(trimmed);
	if (!relative) return '';

	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();

	if (relative[1]) {
		const amount = Number(relative[2]) * (relative[1] === '-' ? -1 : 1);
		const unit = relative[3];

		if (unit === 'd' || unit === 'w') {
			// Counted in UTC so a DST transition cannot swallow or repeat a day.
			const shifted = new Date(Date.UTC(year, month - 1, day + amount * (unit === 'w' ? 7 : 1)));
			year = shifted.getUTCFullYear();
			month = shifted.getUTCMonth() + 1;
			day = shifted.getUTCDate();
		} else {
			const months = amount * (unit === 'y' ? 12 : 1);
			const total = year * 12 + (month - 1) + months;
			year = Math.floor(total / 12);
			month = ((total % 12) + 12) % 12 + 1;
			// Clamp instead of overflowing: 31 March minus a month is the end of
			// February, not 3 March. For an age check (`today-18y` on 29 February)
			// this admits a leap-day birthday one day early, which is the forgiving
			// direction - the alternative wrongly turns someone away.
			day = Math.min(day, lastDayOfMonth(year, month));
		}
	}

	return toIso(year, month, day) ?? '';
}
