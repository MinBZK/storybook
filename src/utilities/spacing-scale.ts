/**
 * The spacing scale, for the attributes that take a step of it.
 *
 * Gaps and padding are rhythm: the point of a scale is that the space between
 * things is the same handful of numbers everywhere, so a value off it is not a
 * finer choice but a break in the pattern. These attributes therefore take a
 * step and not a length, and the resolver below is the one place that turns a
 * step into its token.
 *
 * It also draws the line where the old failure was. `gap="16"` in a component
 * that expected a CSS length wrote `--_gap: 16`, which is not a length: the
 * whole declaration fell away and the gap became zero, with nothing said. A
 * value this resolver cannot place is named out loud in dev instead.
 */

/** Every step there is. `'0'` is a value, not the absence of one. */
export const SPACING_SCALE = [
	'0', '2', '4', '6', '8', '10', '12', '16', '20', '24',
	'28', '32', '40', '44', '48', '56', '64', '80', '96',
] as const;

export type SpacingSize = (typeof SPACING_SCALE)[number];

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
 * A step of the scale as the token it stands for.
 *
 * Returns null when there is nothing to set, so a caller can remove the
 * property rather than write an empty one. `element` and `attribute` are only
 * there to name the offender in a dev warning.
 *
 * A length still passes through, because one component used to take them and
 * silently dropping those on the floor would be worse than the warning. It is
 * on its way out.
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
	if (import.meta.env?.DEV) {
		if (looksLikeLength(step)) {
			warnOnce(
				element,
				attribute,
				`${attribute}="${step}" is a CSS length. This attribute takes a step of the spacing scale (${SPACING_SCALE.join(', ')}) and lengths are going away; the nearest step keeps the rhythm of the rest of the page.`,
			);
		} else {
			warnOnce(
				element,
				attribute,
				`${attribute}="${step}" is not a step of the spacing scale (${SPACING_SCALE.join(', ')}), so it resolves to nothing and the space collapses. Pick a step.`,
			);
		}
	}
	// A length is passed on unchanged; a bare number that is no step is not,
	// because writing it would be the silent zero this exists to prevent.
	return looksLikeLength(step) ? step : null;
}
