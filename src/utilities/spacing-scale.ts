/**
 * The spacing scale, for the attributes that take a step of it or a length.
 *
 * One rule, and it reads off the value itself: a bare number is a step of the
 * scale, anything carrying a unit is a length of your own. The two cannot be
 * confused, so the markup still says which you meant, and the same attribute
 * means the same thing in every component that uses this.
 *
 * The scale is the easy path because spacing is rhythm, and the length is the
 * way out for the cases a scale cannot reach: a value tied to something else,
 * a clamp(), a percentage.
 *
 * What it will not do is guess. `gap="16"` in a component that expected a
 * length used to write `--_gap: 16`, which is neither: the declaration fell
 * away and the gap became zero without a word. A bare number that is no step
 * is refused and named in dev rather than written, because writing it is that
 * same silent zero.
 */

/** Every step there is. `'0'` is a value, not the absence of one. */
export const SPACING_SCALE = [
	'0', '2', '4', '6', '8', '10', '12', '16', '20', '24',
	'28', '32', '40', '44', '48', '56', '64', '80', '96',
] as const;

export type SpacingSize = (typeof SPACING_SCALE)[number];

/** What these attributes take: a step, or a CSS length of your own. The
 *  intersection keeps the steps in autocomplete without closing the door. */
export type SpacingValue = SpacingSize | (string & {});

/** Anything that is not a bare number: a length, a percentage, a calc(). */
function looksLikeLength(value: string): boolean {
	return /[a-z%()]/i.test(value.trim());
}

const warned = new Set<string>();

function warnOnce(element: string, attribute: string, message: string): void {
	const key = `${element}.${attribute}.${message}`;
	if (warned.has(key)) return;
	warned.add(key);
	console.warn(`<${element}>: ${message}`);
}

/**
 * A step of the scale as the token it stands for, or a length as it is.
 *
 * Returns null when there is nothing to set, so a caller can remove the
 * property rather than write an empty one. `element` and `attribute` are only
 * there to name the offender in a dev warning.
 */
export function spacingToValue(
	value: string | undefined,
	element: string,
	attribute: string,
): string | null {
	if (value === undefined || value === '') return null;
	const step = String(value).trim();
	if ((SPACING_SCALE as readonly string[]).includes(step)) {
		return step === '0' ? '0' : `var(--primitives-space-${step})`;
	}
	// A length is yours to pick and passes through untouched.
	if (looksLikeLength(step)) return step;
	// A bare number that is no step is not written, because that would be the
	// silent zero this exists to prevent: there is no --primitives-space-23.
	if (import.meta.env?.DEV) {
		warnOnce(
			element,
			attribute,
			`${attribute}="${step}" is neither a step of the spacing scale (${SPACING_SCALE.join(', ')}) nor a CSS length, so it resolves to nothing and the space collapses. Pick a step, or give the number a unit.`,
		);
	}
	return null;
}
