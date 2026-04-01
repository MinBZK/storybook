import { LitElement } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { styles, menuBarItemStyles } from './ndd-menu-bar.styles.js';
import { template, menuBarItemTemplate } from './ndd-menu-bar.template.js';

// # ndd-menu-bar-item

export class NDDMenuBarItem extends LitElement {
	static override styles = menuBarItemStyles;

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: String })
	href = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	override connectedCallback(): void {
		super.connectedCallback();
		this.setAttribute('role', 'none');
		this.addEventListener('click', this._handleClick);
		this.addEventListener('keydown', this._handleKeyDown);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('click', this._handleClick);
		this.removeEventListener('keydown', this._handleKeyDown);
	}

	_sanitizeUrl(url: string | null): string | null {
		if (!url) return null;
		const trimmed = url.trim().toLowerCase();
		if (
			trimmed.startsWith('javascript:') ||
			trimmed.startsWith('data:') ||
			trimmed.startsWith('vbscript:')
		) {
			return null;
		}
		return url;
	}

	private _handleClick = (event: Event): void => {
		if (this.disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		if (!this.href) {
			event.preventDefault();
			this.selected = true;
			this.dispatchEvent(new CustomEvent('select', {
				bubbles: true,
				composed: true,
				detail: { item: this },
			}));
		}
	};

	private _handleKeyDown = (event: KeyboardEvent): void => {
		if (this.disabled) return;
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			this._handleClick(event);
		}
	};

	override render() {
		return menuBarItemTemplate.call(this);
	}
}

if (!customElements.get('ndd-menu-bar-item')) {
	customElements.define('ndd-menu-bar-item', NDDMenuBarItem);
}

// # ndd-menu-bar

type Size = 's' | 'm' | 'l';

export class NDDMenuBar extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	size: Size = 'm';

	@property({ type: Boolean, reflect: true, attribute: 'has-overflow-menu' })
	hasOverflowMenu = false;

	@property({ type: String, attribute: 'overflow-label' })
	overflowLabel = 'Meer';

	@state()
	private _overflowMenuOpen = false;

	@query('.menu')
	private _menuContainer!: HTMLElement;

	@query('.overflow-wrapper')
	private _overflowWrapper!: HTMLElement;

	@query('.overflow-button')
	private _overflowButton!: HTMLButtonElement;

	@query('.overflow-dropdown')
	private _overflowDropdown!: HTMLElement;

	@query('slot:not([name])')
	private _defaultSlot!: HTMLSlotElement;

	_overflowMenuId = `ndd-overflow-${Math.random().toString(36).substring(2, 11)}`;
	private _resizeObserver: ResizeObserver | null = null;
	private _isHandlingOverflow = false;
	private _overflowRAF: number | null = null;
	private _documentListenerAttached = false;

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('select', this._handleItemSelect);
		this.addEventListener('keydown', this._handleKeyDown);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('select', this._handleItemSelect);
		this.removeEventListener('keydown', this._handleKeyDown);
		this._cleanupOverflowDetection();
	}

	override firstUpdated(): void {
		if (this.hasOverflowMenu) {
			this._setupOverflowDetection();
		}
	}

	private _handleItemSelect = (event: Event): void => {
		const detail = (event as CustomEvent).detail;
		const items = this.querySelectorAll('ndd-menu-bar-item');
		items.forEach(item => {
			if (item !== detail.item) {
				(item as HTMLElement).removeAttribute('selected');
			}
		});
		this.dispatchEvent(new CustomEvent('itemselect', {
			bubbles: true,
			composed: true,
			detail,
		}));
	};

	private _handleKeyDown = (event: KeyboardEvent): void => {
		const items = Array.from(this.querySelectorAll('ndd-menu-bar-item:not([disabled])'));
		if (items.length === 0) return;

		const currentIndex = items.findIndex(item =>
			item === event.target || item.contains(event.target as Node)
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

		if (newIndex >= 0) {
			(items[newIndex] as HTMLElement).focus();
		}
	};

	private _setupOverflowDetection(): void {
		this._cleanupOverflowDetection();
		requestAnimationFrame(() => {
			this._resizeObserver = new ResizeObserver(() => {
				this._handleOverflow();
			});
			this._resizeObserver.observe(this);
			if (this._defaultSlot) {
				this._defaultSlot.addEventListener('slotchange', this._handleOverflow);
			}
			this._handleOverflow();
			if (!this._documentListenerAttached) {
				document.addEventListener('click', this._closeOverflowMenu);
				this._documentListenerAttached = true;
			}
		});
	}

	private _cleanupOverflowDetection(): void {
		if (this._overflowRAF) {
			cancelAnimationFrame(this._overflowRAF);
			this._overflowRAF = null;
		}
		if (this._resizeObserver) {
			this._resizeObserver.disconnect();
			this._resizeObserver = null;
		}
		if (this._defaultSlot) {
			this._defaultSlot.removeEventListener('slotchange', this._handleOverflow);
		}
		if (this._documentListenerAttached) {
			document.removeEventListener('click', this._closeOverflowMenu);
			this._documentListenerAttached = false;
		}
	}

	private _handleOverflow = (): void => {
		if (!this.hasOverflowMenu || this._isHandlingOverflow) return;
		if (this._overflowRAF) cancelAnimationFrame(this._overflowRAF);
		this._overflowRAF = requestAnimationFrame(() => {
			this._isHandlingOverflow = true;
			try {
				this._doHandleOverflow();
			} finally {
				requestAnimationFrame(() => { this._isHandlingOverflow = false; });
			}
		});
	};

	private _doHandleOverflow(): void {
		if (!this._menuContainer || !this._overflowWrapper || !this._overflowButton || !this._overflowDropdown) return;

		const slottedElements = this._defaultSlot?.assignedElements({ flatten: true }) ?? [];
		const items = slottedElements.filter(el => el.tagName === 'NDD-MENU-BAR-ITEM') as HTMLElement[];
		if (items.length === 0) return;

		items.forEach(item => {
			item.style.display = '';
			item.style.visibility = 'visible';
			item.removeAttribute('data-overflow');
		});

		this._overflowButton.style.display = 'flex';
		this._overflowDropdown.innerHTML = '';

		const containerWidth = this.clientWidth;
		const overflowButtonWidth = this._overflowWrapper.offsetWidth;

		let usedWidth = 0;
		let overflowStartIndex = -1;

		for (let i = 0; i < items.length; i++) {
			const itemWidth = items[i].offsetWidth;
			const availableWidth = containerWidth - overflowButtonWidth;
			if (usedWidth + itemWidth > availableWidth && overflowStartIndex < 0) {
				overflowStartIndex = i;
				break;
			}
			usedWidth += itemWidth;
		}

		if (overflowStartIndex >= 0) {
			this._overflowButton.style.display = 'flex';
			this._overflowDropdown.setAttribute('role', 'menu');

			for (let i = overflowStartIndex; i < items.length; i++) {
				items[i].style.display = 'none';
				items[i].setAttribute('data-overflow', 'true');

				const dropdownItem = document.createElement('button');
				dropdownItem.className = 'overflow-item';
				dropdownItem.setAttribute('role', 'menuitem');
				dropdownItem.setAttribute('tabindex', '-1');
				dropdownItem.textContent = items[i].textContent;
				dropdownItem.addEventListener('click', (e) => {
					e.stopPropagation();
					items[i].click();
					this._closeOverflowMenu();
				});
				dropdownItem.addEventListener('keydown', this._handleOverflowKeyDown);
				this._overflowDropdown.appendChild(dropdownItem);
			}
		} else {
			this._overflowButton.style.display = 'none';
			this._overflowDropdown.removeAttribute('role');
			if (this._overflowMenuOpen) {
				this._overflowMenuOpen = false;
				this._overflowDropdown.classList.remove('open');
				this._overflowButton.setAttribute('aria-expanded', 'false');
			}
		}
	}

	_toggleOverflowMenu = (e: Event): void => {
		e.stopPropagation();
		this._overflowMenuOpen = !this._overflowMenuOpen;
		if (this._overflowDropdown && this._overflowButton) {
			this._overflowDropdown.classList.toggle('open', this._overflowMenuOpen);
			this._overflowButton.setAttribute('aria-expanded', String(this._overflowMenuOpen));
		}
	};

	private _closeOverflowMenu = (e?: Event): void => {
		if (e && this.shadowRoot?.contains(e.target as Node)) return;
		this._overflowMenuOpen = false;
		if (this._overflowDropdown && this._overflowButton) {
			this._overflowDropdown.classList.remove('open');
			this._overflowButton.setAttribute('aria-expanded', 'false');
		}
	};

	_handleOverflowButtonKeyDown = (event: KeyboardEvent): void => {
		switch (event.key) {
			case 'Enter':
			case ' ':
			case 'ArrowDown':
				event.preventDefault();
				this._openOverflowMenuWithFocus();
				break;
			case 'ArrowUp':
				event.preventDefault();
				this._openOverflowMenuWithFocus(true);
				break;
			case 'Escape':
				if (this._overflowMenuOpen) {
					event.preventDefault();
					this._closeOverflowMenuAndFocusButton();
				}
				break;
		}
	};

	private _handleOverflowKeyDown = (event: KeyboardEvent): void => {
		if (!this._overflowDropdown) return;
		const items = Array.from(this._overflowDropdown.querySelectorAll('.overflow-item'));
		if (items.length === 0) return;

		const currentIndex = items.findIndex(item => item === this.shadowRoot?.activeElement);
		let newIndex = -1;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
				break;
			case 'ArrowUp':
				event.preventDefault();
				newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
				break;
			case 'Home':
				event.preventDefault();
				newIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				newIndex = items.length - 1;
				break;
			case 'Escape':
				event.preventDefault();
				this._closeOverflowMenuAndFocusButton();
				return;
			case 'Tab':
				this._closeOverflowMenu();
				return;
		}

		if (newIndex >= 0) {
			(items[newIndex] as HTMLElement).focus();
		}
	};

	private _openOverflowMenuWithFocus(focusLast = false): void {
		if (!this._overflowDropdown || !this._overflowButton) return;
		if (!this._overflowMenuOpen) {
			this._overflowMenuOpen = true;
			this._overflowDropdown.classList.add('open');
			this._overflowButton.setAttribute('aria-expanded', 'true');
		}
		requestAnimationFrame(() => {
			const items = this._overflowDropdown.querySelectorAll('.overflow-item');
			if (items.length > 0) {
				(focusLast ? items[items.length - 1] as HTMLElement : items[0] as HTMLElement).focus();
			}
		});
	}

	private _closeOverflowMenuAndFocusButton(): void {
		this._overflowMenuOpen = false;
		if (this._overflowDropdown && this._overflowButton) {
			this._overflowDropdown.classList.remove('open');
			this._overflowButton.setAttribute('aria-expanded', 'false');
			this._overflowButton.focus();
		}
	}

	override render() {
		return template.call(this);
	}
}

if (!customElements.get('ndd-menu-bar')) {
	customElements.define('ndd-menu-bar', NDDMenuBar);
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-menu-bar': NDDMenuBar;
		'ndd-menu-bar-item': NDDMenuBarItem;
	}
}
