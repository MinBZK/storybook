import { describe, it, expect } from 'vitest';
import { resolveDateBound } from './resolve-date-bound.js';

/** Local-time constructor, matching how resolveDateBound reads "today". */
function on(year: number, month: number, day: number): Date {
	return new Date(year, month - 1, day);
}

describe('resolveDateBound', () => {
	it('geeft geen grens voor een lege waarde', () => {
		expect(resolveDateBound('')).toBe('');
		expect(resolveDateBound('   ')).toBe('');
	});

	it('laat een ISO-datum ongemoeid', () => {
		expect(resolveDateBound('2026-12-31')).toBe('2026-12-31');
	});

	// A broken attribute must not block a form, so it counts as no bound at all.
	it.each([
		['2026-02-31'],
		['2026-13-01'],
		['31-12-2026'],
		['volgende week'],
		['today-1'],
		['today-1x'],
		['today - 1y'],
		['TODAY'],
		['today-18Y'],
	])('negeert de onleesbare grens %s', (raw) => {
		expect(resolveDateBound(raw, on(2026, 7, 19))).toBe('');
	});

	it('lost today op naar de lokale kalenderdag', () => {
		expect(resolveDateBound('today', on(2026, 7, 19))).toBe('2026-07-19');
	});

	it.each([
		['today+1d', on(2026, 7, 19), '2026-07-20'],
		['today-1d', on(2026, 7, 19), '2026-07-18'],
		['today+1w', on(2026, 7, 19), '2026-07-26'],
		['today-2w', on(2026, 7, 19), '2026-07-05'],
		['today+1m', on(2026, 7, 19), '2026-08-19'],
		['today-1y', on(2026, 7, 19), '2025-07-19'],
		['today+1y', on(2026, 7, 19), '2027-07-19'],
	])('rekent %s uit', (raw, today, expected) => {
		expect(resolveDateBound(raw, today)).toBe(expected);
	});

	it('rekent over een jaargrens heen', () => {
		expect(resolveDateBound('today+1d', on(2026, 12, 31))).toBe('2027-01-01');
		expect(resolveDateBound('today-1d', on(2026, 1, 1))).toBe('2025-12-31');
		expect(resolveDateBound('today+6m', on(2026, 10, 15))).toBe('2027-04-15');
		expect(resolveDateBound('today-10m', on(2026, 3, 15))).toBe('2025-05-15');
	});

	// Without clamping, 31 March minus one month silently yields 3 March.
	it('klemt naar het maandeinde in plaats van over te lopen', () => {
		expect(resolveDateBound('today-1m', on(2026, 3, 31))).toBe('2026-02-28');
		expect(resolveDateBound('today+1m', on(2026, 1, 31))).toBe('2026-02-28');
		expect(resolveDateBound('today+1m', on(2026, 8, 31))).toBe('2026-09-30');
	});

	it('klemt 29 februari naar 28 februari in een niet-schrikkeljaar', () => {
		expect(resolveDateBound('today-1y', on(2028, 2, 29))).toBe('2027-02-28');
		expect(resolveDateBound('today-18y', on(2028, 2, 29))).toBe('2010-02-28');
	});

	it('houdt 29 februari heel wanneer het doeljaar een schrikkeljaar is', () => {
		expect(resolveDateBound('today-4y', on(2028, 2, 29))).toBe('2024-02-29');
	});

	// The age check the relative form exists for.
	it('geeft voor today-18y de dag waarop iemand precies 18 wordt', () => {
		expect(resolveDateBound('today-18y', on(2026, 7, 19))).toBe('2008-07-19');
	});
});
