/**
 * Nederlandse Digitale Dienst Tag Component (Lit + TypeScript)
 *
 * Een compacte label voor categorieën, statussen of metadata. Niet interactief.
 * Voor interactieve chips (filter, dismiss) gebruik je <nldd-token>.
 *
 * @element nldd-tag
 * @attr {string} variant - Visuele variant: 'neutral' | 'accent' | 'success' | 'warning' | 'critical' (default: 'neutral')
 * @attr {string} size - Tag grootte: 'sm' | 'md' (default: 'md')
 * @attr {string} text - Tag tekst (alternatief voor default slot)
 * @attr {string} icon - Icoon voor de tekst
 * @attr {string} accessible-label - Toegankelijk label voor screenreaders. Gebruik dit bij icon-only tags zonder zichtbare tekst.
 *
 * @slot - Tag tekst
 * @slot icon - Custom icoon voor de tekst
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tagStyles } from './tag.styles.js';
import { template } from './tag.template.js';
import './../icon/icon.js';

type Variant = 'neutral' | 'accent' | 'success' | 'warning' | 'critical';
type Size = 'sm' | 'md';

@customElement('nldd-tag')
export class NLDDTag extends LitElement {
	static override styles = tagStyles;

	@property({ type: String, reflect: true })
	variant: Variant = 'neutral';

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: String })
	text = '';

	@property({ type: String })
	icon = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@state()
	_hasSlotText = false;

	@state()
	_hasSlotIcon = false;

	private _childObserver?: MutationObserver;

	get _hasText(): boolean {
		return !!this.text || this._hasSlotText;
	}

	get _hasIcon(): boolean {
		return !!this.icon || this._hasSlotIcon;
	}

	override connectedCallback() {
		super.connectedCallback();
		this._updateSlotState();
		this._childObserver = new MutationObserver(() => this._updateSlotState());
		// Alleen direct children volgen — _updateSlotState itereert over
		// this.childNodes, dus subtree-mutaties zijn nutteloos en kosten
		// onnodig werk bij rich slotted content. characterData zou enkel
		// zin hebben mét subtree (om text-edits in bestaande nodes te
		// catchen); zeldzaam genoeg om over te skippen, en add/remove van
		// children blijft via childList werken.
		this._childObserver.observe(this, { childList: true });
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._childObserver?.disconnect();
		this._childObserver = undefined;
	}

	private _updateSlotState() {
		let hasText = false;
		let hasIcon = false;
		for (const node of Array.from(this.childNodes)) {
			if (node.nodeType === Node.TEXT_NODE) {
				if (node.textContent?.trim()) hasText = true;
			} else if (node.nodeType === Node.ELEMENT_NODE) {
				const slotName = (node as Element).getAttribute('slot');
				if (slotName === 'icon') hasIcon = true;
				else if (!slotName) hasText = true;
			}
		}
		this._hasSlotText = hasText;
		this._hasSlotIcon = hasIcon;
	}

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-tag': NLDDTag;
	}
}
