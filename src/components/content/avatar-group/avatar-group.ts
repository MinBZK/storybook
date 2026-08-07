/**
 * NLDD Design System Avatar Group Component (Lit + TypeScript)
 *
 * Toont meerdere avatars als één groep: ze overlappen elkaar en elke avatar
 * krijgt een ring in de vlakkleur, zodat ze bij overlap gescheiden blijven.
 * De ring gebruikt dezelfde mechaniek als de badge, dus op een gekleurde
 * ondergrond geef je de kleur mee via `--context-parent-background-color`.
 *
 * Slot `nldd-avatar`-elementen, geen kale `img`. Een avatar weet al hoe hij
 * met een dode afbeelding omgaat, wanneer hij op initialen terugvalt en hoe
 * hij zijn naam als tooltip toont; een losse afbeelding zou dat allemaal
 * moeten namaken en kan het laatste niet. Zet `decorative` wanneer de namen
 * al als tekst naast de groep staan; geef anders elke avatar een naam, want
 * de groep zelf beschrijft niemand.
 *
 * De maat geldt voor de hele groep: de avatars krijgen hem opgelegd, ook een
 * geslotte `img`. Zo blijft de rij op één lijn, ongeacht wat een consument
 * meegeeft.
 *
 * @element nldd-avatar-group
 *
 * @attr {string} size - Diameter van elke avatar in px (spacer-uitgelijnd: 16, 20, 24, 28, 32, 40, 44, 48, 56, 64, 80, 96); standaard 40
 * @attr {number} max - Toont hoogstens zoveel avatars; de rest gaat achter een knop met "+N" die ze bij een klik als lijst met namen toont
 * @attr {string} accessible-label - Beschrijft de groep als geheel (bijv. "Redactie"); zonder label is de groep zelf geen landmark en spreken de avatars voor zich
 *
 * @slot - Eén of meer `nldd-avatar`-elementen
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { avatarGroupStyles } from './avatar-group.styles.js';
import { avatarGroupTemplate } from './avatar-group.template.js';
import '../avatar/avatar.js';
import '../../layout/popover/popover.js';
import '../../layout/container/container.js';
import '../../lists-and-tables/list/list.js';
import '../../lists-and-tables/list-item/list-item.js';
import '../../lists-and-tables/cells/cell/cell.js';
import '../../lists-and-tables/cells/text-cell/text-cell.js';
import '../../lists-and-tables/cells/spacer-cell/spacer-cell.js';
import { withTranslations } from '../../../utilities/with-translations.js';
import { nlddAvatarGroupTranslations } from './avatar-group.i18n.js';

@customElement('nldd-avatar-group')
export class NLDDAvatarGroup extends withTranslations(LitElement, nlddAvatarGroupTranslations) {
	static override styles = avatarGroupStyles;

	@property({ type: String, reflect: true })
	size = '40';

	@property({ type: Number, reflect: true })
	max: number | undefined = undefined;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	/** The avatars past `max`, each as a copy plus the name it carries. Copies,
	 *  because the originals are the consumer's light DOM and are already
	 *  assigned to the slot: a node can only be in one place. */
	@state()
	_overflow: { avatar: Element; name: string }[] = [];

	/** How many avatars are slotted. Kept in state so the generated rules can be
	 *  written after every render: slotchange can beat the first render, and
	 *  then the style element they go in does not exist yet. */
	@state()
	_total = 0;

	/** The trigger and its popover have to agree on an id, and two groups on a
	 *  page must not open each other's list. */
	private readonly _id = Math.random().toString(36).slice(2, 9);

	get _popoverId(): string {
		return `avatar-group-overflow-${this._id}`;
	}

	get _triggerId(): string {
		return `avatar-group-trigger-${this._id}`;
	}

	/** Not guaranteed: a decorative avatar beside a name in the text carries
	 *  none, and then the row simply has no name to show. */
	private _nameOf(el: Element): string {
		return el.getAttribute('name') || '';
	}

	_onSlotChange = (e: Event): void => {
		const assigned = (e.target as HTMLSlotElement).assignedElements();
		if (import.meta.env?.DEV) {
			const strays = assigned.filter(el => el.localName !== 'nldd-avatar');
			if (strays.length > 0) {
				// eslint-disable-next-line no-console
				console.warn(
					`[nldd-avatar-group] slot an nldd-avatar rather than <${strays[0].localName}>: `
					+ 'the group sizes, stacks and rings its avatars, and only an nldd-avatar '
					+ 'carries the name that the tooltip and the overflow list read.',
				);
			}
		}
		const { max } = this;
		const hidden = typeof max === 'number' && max > 0 && assigned.length > max
			? assigned.slice(max)
			: [];
		this._overflow = hidden.map(node => {
			const avatar = node.cloneNode(true) as Element;
			// The copy is a picture beside its own name, so it says nothing on
			// its own; the row's text is the accessible content. It also gets a
			// row-sized diameter: outside the group nothing constrains it, and
			// an avatar without a size fills its container, which in a cell is
			// nothing at all. Big enough to read the initials, small enough to
			// keep the row a row.
			avatar.setAttribute('decorative', '');
			avatar.setAttribute('tooltip-timing', 'never');
			avatar.setAttribute('size', '32');
			avatar.removeAttribute('slot');
			return { avatar, name: this._nameOf(node) };
		});
		this._total = assigned.length;
	};

	/** Two things ::slotted() cannot express without knowing the count: hiding
	 *  everything past `max`, and stacking the row so the first avatar lies on
	 *  top of the second and so on down to the overflow button. Generated as a
	 *  rule rather than as attributes, because the avatars are the consumer's
	 *  light DOM and nth-child() cannot read a custom property. */
	private _syncGeneratedRules(): void {
		const sheet = this.shadowRoot?.querySelector('#generated-rules');
		if (!sheet) return;
		const total = this._total;
		const hide = this._overflow.length > 0 && typeof this.max === 'number'
			? `.avatar-group ::slotted(:nth-child(n + ${this.max + 1})) { display: none; }`
			: '';
		// Descending, so the leftmost avatar is the whole one and each next is
		// tucked under it — the row reads as a stack you look at from the left,
		// and the overflow button ends up at the bottom of it.
		const stack = Array.from({ length: total }, (_, i) =>
			`.avatar-group ::slotted(:nth-child(${i + 1})) { z-index: ${total - i}; }`).join('\n');
		sheet.textContent = `${hide}\n${stack}`;
	}

	/** The popover resolves its anchor by id against the document, and an id in
	 *  a shadow root is not there. Hand it the element instead. */
	override updated(): void {
		this._syncGeneratedRules();

		const popover = this.shadowRoot?.querySelector('nldd-popover') as
			(HTMLElement & { anchorElement: Element | null }) | null;
		const trigger = this.shadowRoot?.querySelector('.avatar-group__overflow') ?? null;
		if (popover && popover.anchorElement !== trigger) popover.anchorElement = trigger;
	}

	override render() {
		return avatarGroupTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-avatar-group': NLDDAvatarGroup;
	}
}
