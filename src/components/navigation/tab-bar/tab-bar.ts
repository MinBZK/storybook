/**
 * Nederlandse Digitale Dienst Tab Bar Component (Lit + TypeScript)
 *
 * A horizontal navigation bar with mutually exclusive tabs.
 * Exports both NLDDTabBar and NLDDTabBarItem.
 *
 * @element nldd-tab-bar
 * @attr {string}  variant           - Visual mode: 'icon-and-text' | 'text' | 'icon'. When unset, the variant is inferred from each item's content. Drives the layout at every size.
 * @attr {string}  size              - Size: 'md' | 'lg' (default: 'md'). 'lg' enlarges the touch target; the per-variant layout is preserved (icon-and-text stacks the icon over the text, text renders large text, icon renders a larger icon-only control).
 * @attr {boolean} navigation        - Renders a nav landmark instead of tablist; use for href-based items that navigate between routes
 * @attr {boolean} centered          - Centers the tabs in the container (host fills the row, tabs group in the middle)
 * @attr {string}  accessible-label  - Accessible name for the navigation region; defaults to 'Tabs'
 *
 * @slot - nldd-tab-bar-item elements
 *
 * @fires tabchange - When a tab is selected; detail: { item: NLDDTabBarItem }
 *
 * ---
 *
 * @element nldd-tab-bar-item
 * @attr {boolean} selected  - Selected state (managed by nldd-tab-bar)
 * @attr {string}  text      - Tab text; also used as accessible name for icon-only items
 * @attr {string}  href      - Optional link URL; renders an anchor instead of a button
 *
 * @slot icon - Icon content
 *
 * @fires select - When the item is activated; detail: { item: NLDDTabBarItem }
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { tabBarStyles, tabBarItemStyles } from './tab-bar.styles.js';
import { tabBarTemplate, tabBarItemTemplate } from './tab-bar.template.js';
import { sanitizeUrl } from '../../../utilities/sanitize-url.js';


// # nldd-tab-bar-item

@customElement('nldd-tab-bar-item')
export class NLDDTabBarItem extends LitElement {
	static override styles = tabBarItemStyles;

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: String })
	href = '';

	/** Set by nldd-tab-bar. Not part of the public API. */
	@property({ type: String })
	_groupVariant: 'icon-and-text' | 'text' | 'icon' | '' = '';

	// Author-set variant captured once in connectedCallback.
	// Not a Lit property to avoid a feedback loop with the setAttribute
	// call in updated() which writes the resolved value to the same attribute.
	private _authorVariant: 'icon-and-text' | 'text' | 'icon' | '' = '';

	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	text = '';

	/** Icon name for nldd-icon. The icon and icon-and-text variants show a
	 *  placeholder icon when no icon (attribute or slot) is provided. */
	@property({ type: String, reflect: true })
	icon = '';

	/** Set by nldd-tab-bar. Sizes the variant-driven layout: 'md' (default) or 'lg' (larger touch target). */
	@property({ reflect: true, converter: reflectNonDefault<'md' | 'lg'>('md') })
	size: 'md' | 'lg' = 'md';

	get _effectiveVariant(): 'icon-and-text' | 'text' | 'icon' {
		if (this._authorVariant) return this._authorVariant;
		if (this._groupVariant) return this._groupVariant;
		const hasIcon = Boolean(this.icon) || this._hasIconSlot;
		if (this.text && hasIcon) return 'icon-and-text';
		if (this.text) return 'text';
		return 'icon';
	}

	@state()
	_hasIconSlot = false;

	/** Set by nldd-tab-bar. Not part of the public API. */
	@state()
	_navigation = false;

	/** Set by nldd-tab-bar. Marks this item as the keyboard entry point when no tab is selected. */
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
		this.shadowRoot?.querySelector<HTMLElement>('.tab-bar__item')?.focus(options);
	}

	_onIconSlotChange(e: Event): void {
		const slot = e.target as HTMLSlotElement;
		this._hasIconSlot = slot.assignedElements({ flatten: true }).length > 0;
	}

	_handleClick(event: Event): void {
		if (!sanitizeUrl(this.href)) {
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


// # nldd-tab-bar

@customElement('nldd-tab-bar')
export class NLDDTabBar extends LitElement {
	static override styles = tabBarStyles;

	/** Centers the tabs in the container (host fills the row, tabs group in the middle). */
	@property({ type: Boolean, reflect: true })
	centered = false;

	@property({ type: String, reflect: true })
	variant: 'icon-and-text' | 'text' | 'icon' | '' = '';

	/** Size: 'md' (default) or 'lg'. 'lg' enlarges the touch target while keeping the per-variant layout. */
	@property({ reflect: true, converter: reflectNonDefault<'md' | 'lg'>('md') })
	size: 'md' | 'lg' = 'md';

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
			console.warn('<nldd-tab-bar>: No accessible-label provided. Add an accessible-label attribute for a meaningful navigation landmark name. Falling back to "Tabs".');
		this._syncItems();
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (
			changedProperties.has('variant') ||
			changedProperties.has('size') ||
			changedProperties.has('navigation')
		) {
			this._syncItems();
		}
	}

	private _getItems(): NLDDTabBarItem[] {
		const slot = this.shadowRoot?.querySelector('slot');
		if (!slot) return [];
		return slot
			.assignedElements()
			.filter((el): el is NLDDTabBarItem =>
				el.tagName.toLowerCase() === 'nldd-tab-bar-item'
			);
	}

	private _syncItems(): void {
		const items = this._getItems();

		items.forEach(item => {
			item._groupVariant = this.variant;
			item.size = this.size;
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
		// Navigation tabs are controlled by the consumer (selection follows the
		// route), so don't self-select on click — matching the keyboard path, which
		// already skips auto-activation for navigation tabs. A click that doesn't
		// actually navigate (e.g. blocked by a guard) must not leave the tab
		// looking selected. Content-switching tabs still self-manage.
		if (!this.navigation) {
			const items = this._getItems();
			items.forEach(item => {
				item.selected = item === event.detail.item;
			});
		}
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
		'nldd-tab-bar': NLDDTabBar;
		'nldd-tab-bar-item': NLDDTabBarItem;
	}
}
