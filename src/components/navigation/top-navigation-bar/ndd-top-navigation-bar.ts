import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styles } from './ndd-top-navigation-bar.styles.js';
import { template } from './ndd-top-navigation-bar.template.js';
import { nddTopNavigationBarTranslations } from './ndd-top-navigation-bar.i18n.js';
import type { NDDTopNavigationBarTranslations } from './ndd-top-navigation-bar.i18n.js';
import '../menu-bar-item/ndd-menu-bar-item.js';
import { NDDMenuBarItem } from '../menu-bar-item/ndd-menu-bar-item.js';
import '../menu-bar/ndd-menu-bar.js';
import '../../content/icon/ndd-icon.js';
import { breakpoints } from '../../../assets/styles/breakpoints.js';
import { sanitizeUrl } from '../../../utilities/sanitize-url.js';

/** Minimal typed interface for ndd-sheet API. */
interface Sheet extends HTMLElement {
	show(): void;
	hide(): void;
}

// # ndd-top-navigation-bar

@customElement('ndd-top-navigation-bar')
export class NDDTopNavigationBar extends LitElement {
	static override styles = styles;

	// ## Main properties

	@property({ type: String, attribute: 'website-title' })
	websiteTitle = '';

	@property({ type: Boolean, attribute: 'no-logo', reflect: true })
	noLogo = false;

	// ## Logo properties

	@property({ type: String, attribute: 'logo-title' })
	logoTitle = '';

	@property({ type: String, attribute: 'logo-subtitle' })
	logoSubtitle = '';

	@property({ type: String, attribute: 'logo-supporting-text-1' })
	logoSupportingText1 = '';

	@property({ type: String, attribute: 'logo-supporting-text-2' })
	logoSupportingText2 = '';

	// ## Back button properties

	@property({ type: String, attribute: 'back-href' })
	backHref = '';

	@property({ type: String, attribute: 'back-text' })
	backText = '';

	@property({ type: Object })
	translations: Partial<NDDTopNavigationBarTranslations> = {};

	// ## Internal state

	@query('.top-navigation-bar__menu-button')
	private _menuButton!: HTMLElement;

	@query('slot[name="global"]')
	private _globalSlot!: HTMLSlotElement;

	@query('slot[name="utility"]')
	private _utilitySlot!: HTMLSlotElement;

	private _globalMenuSheet: Sheet | null = null;
	private _globalMenuSheetList: HTMLElement | null = null;

	private _resizeObserver: ResizeObserver | null = null;
	private _compactRAF: number | null = null;
	private _setupRAF: number | null = null;

	// ## i18n

	private _mergedTranslations = { ...nddTopNavigationBarTranslations };

	/** @internal Used by template */
	_t(key: keyof NDDTopNavigationBarTranslations): string {
		return this._mergedTranslations[key] ?? key;
	}

	override willUpdate(changed: PropertyValues): void {
		if (changed.has('translations')) {
			this._mergedTranslations = { ...nddTopNavigationBarTranslations, ...this.translations };
			// Update sheet labels if already created
			this._globalMenuSheet?.setAttribute('accessible-label', this._t('components.top-navigation-bar.menu-action'));
			this._globalMenuSheet?.querySelector('ndd-top-title-bar')?.setAttribute('text', this._menuText);
			this._globalMenuSheet?.querySelector('ndd-top-title-bar')?.setAttribute('dismiss-text', this._t('components.top-navigation-bar.menu-sheet-dismiss-action'));
		}
	}

	// ## Computed properties

	/** @internal Used by template */
	get _hasBackButton(): boolean {
		return Boolean(this.backHref || this.backText);
	}

	/** @internal Used by template */
	get _backText(): string {
		return this.backText || this._t('components.top-navigation-bar.back-action');
	}

	/** @internal Used by template */
	get _menuText(): string {
		return this._t('components.top-navigation-bar.menu-action');
	}

	// ## Lifecycle

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('select', this._handleItemSelect);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('select', this._handleItemSelect);
		this._cleanupCompactDetection();
		// remove() detaches the sheet from DOM; browser GC handles remaining references
		this._globalMenuSheet?.remove();
		this._globalMenuSheet = null;
		this._globalMenuSheetList = null;
	}

	override firstUpdated(): void {
		// Sync has-global-items immediately to prevent layout flash
		this._syncHasGlobalItems();
		this._setupCompactDetection();
	}

	/**
	 * Handles selection of global menu items.
	 * Sets `current` on the clicked item and removes it from siblings.
	 * Dispatches `itemselect` event so consumers can override or react.
	 * To manage state externally, listen for `itemselect` and call
	 * `event.preventDefault()` to prevent automatic current management.
	 */
	private _handleItemSelect = (event: Event): void => {
		const detail = (event as CustomEvent).detail;
		if (!detail?.item) return;
		const slottedItems = this._globalSlot?.assignedElements({ flatten: true }) ?? [];
		if (!slottedItems.includes(detail.item)) return;

		const selectEvent = new CustomEvent('itemselect', {
			bubbles: true,
			composed: true,
			cancelable: true,
			detail,
		});
		this.dispatchEvent(selectEvent);

		if (!selectEvent.defaultPrevented) {
			detail.item.current = true;
			slottedItems.forEach(item => {
				if (item !== detail.item) {
					(item as HTMLElement).removeAttribute('current');
				}
			});
		}
	};

	// ## Compact attribute propagation

	private _setupCompactDetection(): void {
		this._cleanupCompactDetection();
		this._setupRAF = requestAnimationFrame(() => {
			this._setupRAF = null;
			if (!this.isConnected) return;
			this._resizeObserver = new ResizeObserver(() => {
				this._scheduleCompactUpdate();
			});
			this._resizeObserver.observe(this);
			if (this._globalSlot) {
				this._globalSlot.addEventListener('slotchange', this._onGlobalSlotChange);
			}
			this._scheduleCompactUpdate();
		});
	}

	private _cleanupCompactDetection(): void {
		if (this._setupRAF) {
			cancelAnimationFrame(this._setupRAF);
			this._setupRAF = null;
		}
		if (this._compactRAF) {
			cancelAnimationFrame(this._compactRAF);
			this._compactRAF = null;
		}
		if (this._resizeObserver) {
			this._resizeObserver.disconnect();
			this._resizeObserver = null;
		}
		if (this._globalSlot) {
			this._globalSlot.removeEventListener('slotchange', this._onGlobalSlotChange);
		}
	}

	private _onGlobalSlotChange = (): void => {
		this._syncHasGlobalItems();
	};

	private _scheduleCompactUpdate = (): void => {
		if (this._compactRAF) cancelAnimationFrame(this._compactRAF);
		this._compactRAF = requestAnimationFrame(() => {
			this._syncCompactAttribute();
		});
	};

	/** Update has-global-items class on host based on global slot content. */
	private _syncHasGlobalItems(): void {
		const globalItems = this._globalSlot?.assignedElements({ flatten: true }) ?? [];
		const hasGlobalItems = globalItems.some(el => el.tagName === 'NDD-MENU-BAR-ITEM');
		this.classList.toggle('has-global-items', hasGlobalItems);
	}

	/** Propagate compact to menu-bars and internal items when container is sm. */
	private _syncCompactAttribute(): void {
		const isCompact = this._isSmBreakpoint();

		// Menu bars (propagate to ndd-menu-bar, which handles its slotted items)
		const menuBars = this.shadowRoot?.querySelectorAll('ndd-menu-bar') ?? [];
		for (const menuBar of menuBars) {
			menuBar.toggleAttribute('compact', isCompact);
		}

		// Internal items not inside a menu-bar (menu-button, back-button)
		const internalItems = this.shadowRoot?.querySelectorAll('ndd-menu-bar-item') ?? [];
		for (const item of internalItems) {
			item.toggleAttribute('compact', isCompact);
		}

		this._syncHasGlobalItems();
	}

	/** Check if the container is at the sm breakpoint (<= smMax). */
	private _isSmBreakpoint(): boolean {
		const container = this.shadowRoot?.querySelector('.top-navigation-bar') as HTMLElement;
		if (!container) return false;
		return container.clientWidth <= parseInt(breakpoints.smMax);
	}

	// ## Menu sheet

	private async _loadGlobalMenuSheetDependencies(): Promise<void> {
		await Promise.all([
			import('../../layout/sheet/ndd-sheet.js'),
			import('../../layout/page/ndd-page.js'),
			import('../../layout/page-sections/simple-section/ndd-simple-section.js'),
			import('../../navigation/top-title-bar/ndd-top-title-bar.js'),
			import('../../lists-and-menus/list/ndd-list.js'),
			import('../../lists-and-menus/list-item/ndd-list-item.js'),
			import('../../lists-and-menus/cells/text-cell/ndd-text-cell.js'),
		]);
	}

	private _createGlobalMenuSheet(): Sheet {
		const sheet = document.createElement('ndd-sheet') as unknown as Sheet;
		sheet.setAttribute('placement', 'left');
		sheet.setAttribute('accessible-label', this._t('components.top-navigation-bar.menu-action'));

		const page = document.createElement('ndd-page');
		page.setAttribute('sticky-header', '');

		const titleBar = document.createElement('ndd-top-title-bar');
		titleBar.setAttribute('slot', 'header');
		titleBar.setAttribute('text', this._menuText);
		titleBar.setAttribute('dismiss-text', this._t('components.top-navigation-bar.menu-sheet-dismiss-action'));
		page.appendChild(titleBar);

		const section = document.createElement('ndd-simple-section');

		this._globalMenuSheetList = document.createElement('ndd-list');
		this._globalMenuSheetList.setAttribute('variant', 'simple');
		this._globalMenuSheetList.setAttribute('no-dividers', '');
		section.appendChild(this._globalMenuSheetList);

		page.appendChild(section);
		sheet.appendChild(page);
		document.body.appendChild(sheet);
		return sheet;
	}

	private _syncGlobalMenuSheetItems(): void {
		if (!this._globalMenuSheetList) return;
		this._globalMenuSheetList.replaceChildren();

		const slottedElements = this._globalSlot?.assignedElements({ flatten: true }) ?? [];
		const items = slottedElements.filter(el => el.tagName === 'NDD-MENU-BAR-ITEM') as NDDMenuBarItem[];

		for (const item of items) {
			const listItem = document.createElement('ndd-list-item');
			const safeHref = sanitizeUrl(item.href);

			if (safeHref) {
				listItem.setAttribute('type', 'link');
				listItem.setAttribute('href', safeHref);
			} else {
				listItem.setAttribute('type', 'button');
			}
			if (item.current) listItem.setAttribute('selected', '');

			const textCell = document.createElement('ndd-text-cell');
			textCell.setAttribute('text', item.text);
			listItem.appendChild(textCell);

			listItem.addEventListener('click', () => {
				if (!safeHref) item.click();
				this._globalMenuSheet?.hide();
			});

			this._globalMenuSheetList!.appendChild(listItem);
		}
	}

	/** @internal Used by template */
	_onMenuButtonClick = async (): Promise<void> => {
		if (!this._globalMenuSheet) {
			try {
				await this._loadGlobalMenuSheetDependencies();
			} catch (error) {
				if (import.meta.env?.DEV) {
					console.error('ndd-top-navigation-bar: failed to load menu sheet dependencies', error);
				}
				return;
			}
			if (this._globalMenuSheet) return; // guard against double-click race
			this._globalMenuSheet = this._createGlobalMenuSheet();
			const menuButtonItem = this._menuButton?.querySelector('ndd-menu-bar-item');
			this._globalMenuSheet.addEventListener('open', () => {
				if (menuButtonItem) (menuButtonItem as NDDMenuBarItem).open = true;
			});
			this._globalMenuSheet.addEventListener('close', () => {
				if (menuButtonItem) (menuButtonItem as NDDMenuBarItem).open = false;
			});
		}
		this._syncGlobalMenuSheetItems();
		// Defer show() so the current click event completes before the modal backdrop appears
		requestAnimationFrame(() => {
			this._globalMenuSheet?.show();
		});
	};

	// ## Back button

	/** @internal Used by template */
	_handleBackClick = (e: Event): void => {
		if (!this.backHref) {
			e.preventDefault();
			this.dispatchEvent(
				new CustomEvent('back-click', {
					bubbles: true,
					composed: true,
				})
			);
		}
	};

	// ## Render

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-top-navigation-bar': NDDTopNavigationBar;
	}
}
