/**
 * RegelRecht Tab Bar Component (Lit + TypeScript)
 *
 * Een horizontale navigatiebalk met wederzijds exclusieve tabbladen.
 * Exporteert zowel RRTabBar als RRTabBarItem.
 *
 * @element rr-tab-bar
 * @attr {boolean} compact           - Toont items in compact weergave: icoon boven tekst gestapeld
 * @attr {boolean} navigation        - Renders a nav landmark instead of tablist; use for href-based items that navigate between routes
 * @attr {boolean} responsive        - Schakelt automatisch over naar compact onder 480px containerbreedte
 * @attr {string}  accessible-label  - Toegankelijke naam voor de navigatieregio; standaard 'Tabs'
 *
 * @slot - rr-tab-bar-item elementen
 *
 * @fires tabchange - Wanneer een tab wordt geselecteerd; detail: { item: RRTabBarItem }
 *
 * ---
 *
 * @element rr-tab-bar-item
 * @attr {boolean} selected  - Geselecteerde toestand (beheerd door rr-tab-bar)
 * @attr {string}  text      - Tekst van het tabblad; ook gebruikt als toegankelijke naam voor icoon-only items
 * @attr {string}  href      - Optionele link-URL; rendert een anker in plaats van een knop
 *
 * @slot icon - Icooninhoud
 *
 * @fires select - Wanneer het item wordt geactiveerd; detail: { item: RRTabBarItem }
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

	@property({ type: String })
	href = '';

	/** Set by rr-tab-bar. Not part of the public API. */
	@property({ type: Boolean, reflect: true })
	compact = false;

	/** Set by rr-tab-bar. Not part of the public API. */
	@property({ type: Boolean, reflect: true })
	responsive = false;

	/** Set by rr-tab-bar. Not part of the public API. */
	@property({ type: String })
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

	/** Set by rr-tab-bar. Not part of the public API. */
	@state()
	_navigation = false;

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

	@property({ type: String, reflect: true })
	variant: 'icon-and-text' | 'text' | 'icon' | '' = '';

	@property({ type: Boolean, reflect: true })
	navigation = false;

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
		import.meta.env?.DEV && !this._hasCustomLabel &&
			console.warn('<rr-tab-bar>: No accessible-label provided. Add an accessible-label attribute for a meaningful navigation landmark name. Falling back to "Tabs".');
		this._syncItems();
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (
			changedProperties.has('compact') ||
			changedProperties.has('responsive') ||
			changedProperties.has('variant') ||
			changedProperties.has('navigation')
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

		items.forEach(item => {
			item.compact = this.compact;
			item.responsive = this.responsive;
			item._groupVariant = this.variant;
			item._navigation = this.navigation;
		});

		// Ensure keyboard entry point
		const hasSelected = items.some(item => item.selected);
		const firstItem = items[0] ?? null;
		items.forEach(item => {
			item._isFallbackFocusable = !hasSelected && item === firstItem;
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
		this.dispatchEvent(new CustomEvent('tabchange', {
			bubbles: true,
			composed: true,
			detail: event.detail,
		}));
	};

	private _handleKeyDown = (event: KeyboardEvent): void => {
		const items = this._getItems();
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
			// Auto-activate only for content-switching tabs, not navigation tabs
			if (!this.navigation) {
				items.forEach(item => { item.selected = item === items[newIndex]; });
				this.dispatchEvent(new CustomEvent('tabchange', {
					bubbles: true,
					composed: true,
					detail: { item: items[newIndex] },
				}));
			}
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
