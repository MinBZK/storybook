import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { radioPositions, type RadioPosition } from './radio-position.js';

/**
 * Groups a radio with the ones that share its name, the way the browser does.
 *
 * The platform groups native radios by name, within one tree and one form, and
 * every radio of ours renders in a shadow root of its own. Left to the browser
 * each of them is a group of one: checking one leaves the others checked, Tab
 * stops at every option, and none of them knows its place in the set.
 *
 * A group component around the radios (nldd-radio-button-group) hands its
 * members their position and wins where it is there. This is for the radios
 * that stand on their own, in a `<fieldset role="radiogroup">` or a layout of
 * the consumer's own.
 */

/** What a radio has to offer to be grouped with the others of its name. */
export interface GroupedRadio extends HTMLElement {
	name: string;
	checked: boolean;
	disabled: boolean;
	readonly internals: ElementInternals;
	commitFormValue(): void;
	/** Checks this radio, the way a click does. */
	select(): void;
}

type RadioHost = GroupedRadio & ReactiveControllerHost;

/** What the browser groups radios by: a name, within one tree and one form. */
interface RadioGroupKey {
	root: Node;
	name: string;
	form: HTMLFormElement | null;
}

/**
 * Both tags in one list, because the platform groups on the name and not on the
 * element. A button and a field that share a name are one group to the browser,
 * and two lists would have them counting different sets.
 */
const RADIO_TAGS = 'nldd-radio-button, nldd-radio-button-field';

const ARROW_STEPS: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

/** The controller of each radio, so a recount can reach its siblings. */
const groupings = new WeakMap<Element, RadioGrouping>();

/** A radio that draws the shape for something else owns no state of its own. */
function isMember(radio: Element): boolean {
	return !(radio as Element & { decorative?: boolean }).decorative;
}

export class RadioGrouping implements ReactiveController {

	/** Its place among the radios that share its name, or null when it has none. */
	position: RadioPosition | null = null;

	/**
	 * Whether anything in the group is checked, which is what `required` asks of
	 * a radio: one of these, not this one. A radio without a group answers for
	 * itself, because it is the whole group.
	 */
	answered = false;

	/** Where it was grouped last, so the radios it leaves behind hear of it. */
	private _groupedIn: RadioGroupKey | null = null;

	constructor(private host: RadioHost) {
		groupings.set(host, this);
		host.addController(this);
	}

	hostConnected(): void {
		// A tick later, once the radios parsed after this one are there too.
		queueMicrotask(() => this.regroup());
	}

	hostDisconnected(): void {
		this.regroup();
	}

	/** Reads which group this radio is in now, and recounts the one it left. */
	regroup(): void {
		const was = this._groupedIn;
		const now = this._key();
		this._groupedIn = now;
		const moved = !now || !was || was.root !== now.root || was.name !== now.name || was.form !== now.form;
		if (was && moved) RadioGrouping._recount(was);
		if (now) RadioGrouping._recount(now);
		else this._apply(null, this.host.checked);
	}

	/** Counts the group again, after this radio was checked or disabled. */
	refresh(): void {
		if (this._groupedIn) RadioGrouping._recount(this._groupedIn);
		else this._apply(null, this.host.checked);
	}

	/** Unchecks the others, as checking a native radio does. */
	uncheckOthers(): void {
		const key = this._key();
		if (!key) return;
		for (const radio of RadioGrouping._radiosIn(key)) {
			if (radio === this.host || !radio.checked) continue;
			radio.checked = false;
			// Synchronously: a change listener that reads the form should not find
			// two values under one name.
			radio.commitFormValue();
		}
	}

	/**
	 * Moves to the next radio of the group and checks it, as the arrow keys do
	 * for native radios. Disabled options are stepped over, and the ends wrap.
	 *
	 * @returns whether the key was handled.
	 */
	moveWithArrow(e: KeyboardEvent): boolean {
		const step = ARROW_STEPS[e.key];
		const key = step ? this._key() : null;
		if (!key || !this.position) return false;
		const radios = RadioGrouping._radiosIn(key).filter((radio) => !radio.disabled);
		const at = radios.indexOf(this.host);
		if (at === -1) return false;
		e.preventDefault();
		const next = radios[(at + step + radios.length) % radios.length];
		next.focus();
		next.select();
		return true;
	}

	private _key(): RadioGroupKey | null {
		if (!this.host.isConnected || !isMember(this.host) || !this.host.name) return null;
		return { root: this.host.getRootNode(), name: this.host.name, form: this.host.internals.form };
	}

	private _apply(position: RadioPosition | null, answered: boolean): void {
		if (this.position === position && this.answered === answered) return;
		this.position = position;
		this.answered = answered;
		this.host.requestUpdate();
	}

	private static _radiosIn({ root, name, form }: RadioGroupKey): GroupedRadio[] {
		const radios = (root as ParentNode).querySelectorAll?.(RADIO_TAGS) ?? [];
		return Array.from(radios).filter((radio): radio is GroupedRadio =>
			groupings.has(radio)
			&& radio.isConnected
			&& (radio as GroupedRadio).name === name
			&& isMember(radio)
			&& (radio as GroupedRadio).internals.form === form);
	}

	/** A radio on its own keeps the place the browser gives it: none. */
	private static _recount(key: RadioGroupKey): void {
		const radios = RadioGrouping._radiosIn(key);
		const positions = radios.length > 1
			? radioPositions(radios, (radio) => radio.checked, (radio) => radio.disabled)
			: [];
		const answered = radios.some((radio) => radio.checked);
		radios.forEach((radio, index) => {
			groupings.get(radio)?._apply(positions[index] ?? null, answered);
		});
	}
}
