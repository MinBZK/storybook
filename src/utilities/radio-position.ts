/**
 * Where a radio sits in its group, for a component that renders its native
 * radio in a shadow root of its own.
 *
 * The browser groups radios by name within one tree scope. One input per
 * shadow root makes every radio a group of one: a screen reader announces
 * "1 of 1" for each, and each is a stop of its own for Tab. Whatever holds the
 * group knows better, so it hands every radio its place, and the radio puts
 * that on its input.
 */
export interface RadioPosition {
	posInSet: number;
	setSize: number;
	/** The group's one stop for Tab: the checked radio, or the first enabled
	 *  one when none is checked, which is where the browser would land too. */
	tabbable: boolean;
}

/** A position for every radio of a group, in the order given. */
export function radioPositions<T>(
	radios: readonly T[],
	isChecked: (radio: T) => boolean,
	isDisabled: (radio: T) => boolean,
): RadioPosition[] {
	const enabled = radios.filter((radio) => !isDisabled(radio));
	const stop = enabled.find(isChecked) ?? enabled[0];
	return radios.map((radio, index) => ({
		posInSet: index + 1,
		setSize: radios.length,
		tabbable: radio === stop,
	}));
}
