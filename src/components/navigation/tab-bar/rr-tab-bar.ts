/**
 * RegelRecht Tab Bar Component (Lit + TypeScript)
 *
 * A horizontal navigation bar with mutually exclusive tabs.
 * Exports both RRTabBar and RRTabBarItem.
 *
 * @element rr-tab-bar
 * @attr {boolean} compact           - Shows items in compact layout: icon stacked above text
 * @attr {boolean} responsive        - Switches automatically to compact below 480px container width
 * @attr {boolean} disabled          - Disables all items
 * @attr {string}  accessible-label  - Accessible name for the navigation landmark; defaults to 'Tabs'
 *
 * @slot - rr-tab-bar-item elements
 *
 * @fires tabchange - Fired when a tab is selected; detail: { item: RRTabBarItem }
 *
 * ---
 *
 * @element rr-tab-bar-item
 * @attr {boolean} selected  - Selected state (managed by rr-tab-bar)
 * @attr {boolean} disabled  - Disabled state
 * @attr {string}  text      - Tab text; also used as accessible name for icon-only items
 * @attr {string}  href      - Optional link URL; renders an anchor instead of a button
 *
 * @slot icon - Icon content
 *
 * @fires select - Fired when the item is activated; detail: { item: RRTabBarItem }
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tabBarStyles, tabBarItemStyles } from './rr-tab-bar.styles.ts';
import { tabBarTemplate, tabBarItemTemplate } from './rr-tab-bar.template.ts';


// # rr-tab-bar-item

@customElement('rr-tab-bar-item')
export class RRTabBarItem extends LitElement {
	static override styles = tabBarItemStyles;

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	href = '';

	/** Set by rr-tab-bar. Not part of the public API. */
	@property({ type: Boolean, reflect: true })
	compact = false;

	/** Set by rr-tab-bar. Not part of the public API. */
	@property({ type: Boolean, reflect: true })
	responsive = false;

	/** Set by rr-tab-bar. Not part of the public API. */
	@state()
	_groupVariant: 'icon-and-text' | 'text' | 'icon' | '' = '';

	// Author-set variant captured once in connectedCallback.
	// Not a Lit property to avoid a feedback loop with the setAttribute
	// call in updated() which writes the resolved value to the same attribute.
	private _authorVariant: 'icon-and-text' | 'text' | 'icon' | '' = '';

	@property({ type: String })
	text = '';

	get _effectiveVariant(): 'icon-and-text' | 'text' | 'icon' | 'compact' {
		if (this.compact) return 'compact';
		if (this._authorVariant) return this._authorVariant;
		if (this._groupVariant) return this._groupVariant;
		if (this.text && this._hasIcon) return 'icon-and-text';
		if (this.text) return 'text';
		return 'icon';
	}

	@state()
	_hasIcon = false;

	/** Set by rr-tab-bar. Marks this item as the keyboard entry point when no tab is selected. */
	@state()
	_isFallbackFocusable = false;

	override connectedCallback(): void {
		super.connectedCallback();
		this.setAttribute('role', 'none');
		// Capture author intent before updated() overwrites the attribute with the resolved value
		const attr = this.getAttribute('variant');
		if (attr === 'text' || attr === 'icon' || attr === 'icon-and-text') {
			this._authorVariant = attr;
		}
	}

	override updated(): void {
		this.setAttribute('variant', this._effectiveVariant);
		import.meta.env?.DEV && this._effectiveVariant === 'icon' && !this.text &&
			console.warn('<rr-tab-bar-item>: Icon-only item has no text attribute. Add a text attribute to provide an accessible name for screen readers.');
	}

	override focus(options?: FocusOptions): void {
		this.shadowRoot?.querySelector<HTMLElement>('[role="tab"]')?.focus(options);
	}

	_onIconSlotChange(e: Event): void {
		const slot = e.target as HTMLSlotElement;
		this._hasIcon = slot.assignedElements({ flatten: true }).length > 0;
	}

	_sanitizeUrl(url: string): string | null {
		if (!url) return null;
		const trimmed = url.trim().toLowerCase();
		if (
			trimmed.startsWith('javascript:') ||
			trimmed.startsWith('data:') ||
			trimmed.startsWith('vbscript:')
		) return null;
		return url;
	}

	_handleClick(event: Event): void {
		if (this.disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		if (!this._sanitizeUrl(this.href)) {
			event.preventDefault();
		}
		this.dispatchEvent(new CustomEvent('select', {
			bubbles: true,
			composed: true,
			detail: { item: this },
		}));
	}

	override render() {
		return tabBarItemTemplate(this);
	}
}


// # rr-tab-bar

@customElement('rr-tab-bar')
export class RRTabBar extends LitElement {
	static override styles = tabBarStyles;

	@property({ type: Boolean, reflect: true })
	compact = false;

	@property({ type: Boolean, reflect: true })
	responsive = false;

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, reflect: true })
	variant: 'icon-and-text' | 'text' | 'icon' | '' = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	// Tracks whether the author provided an explicit accessible label
	private _hasCustomLabel = false;

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('select', this._handleItemSelect as EventListener);
		this.addEventListener('keydown', this._handleKeyDown);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('select', this._handleItemSelect as EventListener);
		this.removeEventListener('keydown', this._handleKeyDown);
	}

	override firstUpdated(): void {
		this._hasCustomLabel = Boolean(this.accessibleLabel);
		if (!this._hasCustomLabel) {
			import.meta.env?.DEV && console.warn('<rr-tab-bar>: No accessible-label provided. Add an accessible-label attribute for a meaningful navigation landmark name. Falling back to "Tabs".');
		}
		this._syncItems();
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (
			changedProperties.has('compact') ||
			changedProperties.has('responsive') ||
			changedProperties.has('disabled') ||
			changedProperties.has('variant')
		) {
			this._syncItems();
		}
	}

	private _getItems(): RRTabBarItem[] {
		const slot = this.shadowRoot?.querySelector('slot');
		if (!slot) return [];
		return slot
			.assignedElements()
			.filter((el): el is RRTabBarItem =>
				el.tagName.toLowerCase() === 'rr-tab-bar-item'
			);
	}

	private _syncItems(): void {
		const items = this._getItems();

		if (this.disabled) {
			items.forEach(item => {
				if (!item.hasAttribute('disabled')) {
					item.setAttribute('group-disabled', '');
					item.disabled = true;
				}
			});
		} else {
			items.forEach(item => {
				if (item.hasAttribute('group-disabled')) {
					item.removeAttribute('group-disabled');
					item.disabled = false;
				}
			});
		}

		items.forEach(item => {
			item.compact = this.compact;
			item.responsive = this.responsive;
			item._groupVariant = this.variant;
		});

		// Ensure keyboard entry point: if no item is selected, mark the first
		// enabled item as the fallback so the tablist is always reachable by Tab.
		const hasSelected = items.some(item => item.selected);
		const firstEnabled = items.find(item => !item.disabled) ?? null;
		items.forEach(item => {
			item._isFallbackFocusable = !hasSelected && item === firstEnabled;
		});
	}

	_onSlotChange(): void {
		this._syncItems();
	}

	private _handleItemSelect = (event: CustomEvent): void => {
		event.stopPropagation();
		const items = this._getItems();
		items.forEach(item => {
			item.selected = item === event.detail.item;
		});
		this._syncItems();
		this.dispatchEvent(new CustomEvent('tabchange', {
			bubbles: true,
			composed: true,
			detail: event.detail,
		}));
	};

	private _handleKeyDown = (event: KeyboardEvent): void => {
		const items = this._getItems().filter(item => !item.disabled);
		if (items.length === 0) return;

		const currentIndex = items.findIndex(
			item => item === event.target || item.contains(event.target as Node)
		);
		let newIndex = -1;

		switch (event.key) {
			case 'ArrowLeft':
				event.preventDefault();
				newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
				break;
			case 'ArrowRight':
				event.preventDefault();
				newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
				break;
			case 'Home':
				event.preventDefault();
				newIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				newIndex = items.length - 1;
				break;
			default:
				return;
		}

		if (newIndex >= 0 && newIndex < items.length) {
			items[newIndex].focus();
			// Auto-activate: select the focused tab
			items.forEach(item => { item.selected = item === items[newIndex]; });
			this.dispatchEvent(new CustomEvent('tabchange', {
				bubbles: true,
				composed: true,
				detail: { item: items[newIndex] },
			}));
		}
	};

	override render() {
		return tabBarTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-tab-bar': RRTabBar;
		'rr-tab-bar-item': RRTabBarItem;
	}
}
