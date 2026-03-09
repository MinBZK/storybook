/**
 * RegelRecht Button Component (Lit + TypeScript)
 *
 * @element rr-button
 * @attr {string} variant - Button variant: 'primary' | 'secondary' | 'destructive' | 'accent-filled' | 'accent-outlined' | 'accent-transparent' | 'neutral-tinted' | 'neutral-transparent' | 'danger-tinted'
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset'
 * @attr {boolean} is-expandable - Whether the button has a icon to indicate it opens a menu or popover
 * @attr {boolean} full-width - Whether the button stretches to fill its container width
 * @attr {string} accessible-label - Accessible label for the button, overrides slot content for screen readers
 *
 * @slot - Slot for button title
 * @slot (auto) - Place an rr-icon before or after the title to auto-detect position
 *
 * @fires click - When button is clicked (not fired when disabled)
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './rr-button.styles.ts';
import { template } from './rr-button.template.ts';
import './../../content/icon/rr-icon.ts';

type Variant =
	| 'primary'
	| 'secondary'
	| 'destructive'
	| 'accent-filled'
	| 'accent-outlined'
	| 'accent-transparent'
	| 'neutral-tinted'
	| 'neutral-transparent'
	| 'danger-tinted';
type Size = 'xs' | 'sm' | 'md';
type ButtonType = 'button' | 'submit' | 'reset';

interface IconState {
	name: string;
	attributes: Record<string, string>;
}

@customElement('rr-button')
export class RRButton extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	variant: Variant = 'neutral-tinted';

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false;

	@property({ type: Boolean, reflect: true, attribute: 'is-expandable' })
	isExpandable = false;

	@property({ type: String, reflect: true })
	type: ButtonType = 'button';

	@property({ type: String, reflect: true, attribute: 'popovertarget' })
	popovertarget = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Accessible label forwarded to the inner <button>. Use when visible text alone lacks context. */
	@property({ type: String, attribute: 'accessible-label', reflect: true })
	ariaLabel = '';

	@state()
	_iconStart: IconState | null = null;

	@state()
	_iconEnd: IconState | null = null;

	private _observer: MutationObserver | null = null;

	override connectedCallback(): void {
		super.connectedCallback();
		this._observer = new MutationObserver(() => this._detectIconPosition());
		this._observer.observe(this, { childList: true, subtree: true, attributes: true });
		this.updateComplete.then(() => this._detectIconPosition());
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
	}

	private _extractAttributes(el: Element): Record<string, string> {
		const attrs: Record<string, string> = {};
		for (const attr of Array.from(el.attributes)) {
			if (attr.name !== 'slot') {
				attrs[attr.name] = attr.value;
			}
		}
		return attrs;
	}

	private _getEffectiveNodes(): Node[] {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		if (!slot) {
			return Array.from(this.childNodes);
		}
		return slot.assignedNodes({ flatten: true });
	}

	private _detectIconPosition(): void {
		const effectiveNodes = this._getEffectiveNodes();

		const icons = effectiveNodes.filter(
			(n): n is Element =>
				n.nodeType === Node.ELEMENT_NODE &&
				(n as Element).tagName.toLowerCase() === 'rr-icon'
		);

		if (icons.length === 0) {
			this._iconStart = null;
			this._iconEnd = null;
			return;
		}

		if (icons.length > 2) {
			console.warn('<rr-button>: Too many rr-icon elements provided. Maximum is one before and one after the title. Extra icons will be ignored.');
			icons.splice(2);
		}

		const significantNodes = effectiveNodes.filter(
			n =>
				n.nodeType === Node.ELEMENT_NODE ||
				(n.nodeType === Node.TEXT_NODE && n.textContent?.trim() !== '')
		);

		if (icons.length === 2) {
			const first = significantNodes[0];
			const last = significantNodes[significantNodes.length - 1];
			const firstIsIcon = (first as Element)?.tagName?.toLowerCase() === 'rr-icon';
			const lastIsIcon = (last as Element)?.tagName?.toLowerCase() === 'rr-icon';

			if (!firstIsIcon || !lastIsIcon) {
				console.warn('<rr-button>: Two rr-icon elements detected but they are not surrounding the title. Expected pattern: <rr-icon> title <rr-icon>. Falling back to using the first icon as a start icon.');
				this._iconStart = {
					name: icons[0].getAttribute('name') ?? '',
					attributes: this._extractAttributes(icons[0]),
				};
				this._iconEnd = null;
				return;
			}

			this._iconStart = {
				name: icons[0].getAttribute('name') ?? '',
				attributes: this._extractAttributes(icons[0]),
			};
			this._iconEnd = {
				name: icons[1].getAttribute('name') ?? '',
				attributes: this._extractAttributes(icons[1]),
			};
			return;
		}

		const icon = icons[0];
		const isFirst = significantNodes[0] === icon;
		const iconState: IconState = {
			name: icon.getAttribute('name') ?? '',
			attributes: this._extractAttributes(icon),
		};

		if (isFirst) {
			this._iconStart = iconState;
			this._iconEnd = null;
		} else {
			this._iconStart = null;
			this._iconEnd = iconState;
		}
	}

	private _handleClick(e: MouseEvent): void {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
	}

	override render() {
		return template.call(this, {
			handleClick: this._handleClick.bind(this),
			detectIconPosition: this._detectIconPosition.bind(this),
		});
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-button': RRButton;
	}
}
