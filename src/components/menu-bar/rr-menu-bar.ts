/**
 * RegelRecht Menu Bar Component (Lit + TypeScript)
 *
 * @element rr-menu-bar
 * @attr {string} size - Title size: 's' | 'm' | 'l' (only affects title slot)
 * @attr {boolean} has-overflow-menu - Enable "Meer" overflow dropdown for items that don't fit
 * @attr {string} overflow-label - Label for overflow button (default: 'Meer')
 *
 * @slot - Default slot for menu items (rr-menu-item components)
 * @slot title - Slot for optional menu bar title
 *
 * @fires itemselect - When a menu item is selected
 *
 * @csspart container - The menu bar container
 * @csspart title - The title element
 * @csspart menu - The menu items container
 * @csspart overflow-button - The "Meer" overflow button
 * @csspart overflow-menu - The overflow dropdown menu
 */

import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import './rr-menu-item.ts';

type Size = 's' | 'm' | 'l';

// Chevron down icon from the icon set
const chevronDownIcon = svg`
  <svg class="overflow-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9995 15.1715L3.4 6.59998L2 7.99998L11.9995 18L22 7.99998L20.6 6.59998L11.9995 15.1715Z"/>
  </svg>
`;

@customElement('rr-menu-bar')
export class RRMenuBar extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
      width: 100%;
      min-width: 0; /* Allow shrinking */
    }

    :host([hidden]) {
      display: none;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
      min-width: 0;
    }

    .title {
      padding: var(--primitives-space-8, 8px) var(--primitives-space-16, 16px);
      margin: 0;
    }

    /* Title size variants */
    :host([size='s']) .title {
      font: var(--components-menu-bar-title-item-s-font, 550 18px/1.125 RijksSansVF, system-ui);
    }

    :host([size='m']) .title,
    :host(:not([size])) .title {
      font: var(--components-menu-bar-title-item-m-font, 550 20px/1.125 RijksSansVF, system-ui);
    }

    :host([size='l']) .title {
      font: var(--components-menu-bar-title-item-l-font, 550 23px/1.125 RijksSansVF, system-ui);
    }

    .menu {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 0;
      /* Bottom border per Figma default-global-menu-bar */
      border-bottom: var(
        --_menu-bar-border,
        var(--semantics-divider-thickness, 2px) solid var(--semantics-divider-color, #e2e8f0)
      );
      position: relative;
      width: 100%;
      min-width: 0;
    }

    ::slotted(rr-menu-item) {
      flex: 0 0 auto;
    }

    /* Overflow "Meer" button */
    .overflow-wrapper {
      position: relative;
      flex-shrink: 0;
    }

    .overflow-button {
      display: none;
      align-items: center;
      gap: var(--primitives-space-4, 4px);
      padding: var(--primitives-space-8, 8px) var(--primitives-space-16, 16px);
      background: none;
      border: none;
      color: var(--components-menu-bar-menu-item-color, #154273);
      font: var(--components-menu-bar-menu-item-font, 550 18px/1.125 RijksSansVF, system-ui);
      cursor: pointer;
      white-space: nowrap;
    }

    .overflow-button:hover {
      background-color: var(--primitives-color-neutral-100, #f1f5f9);
    }

    .overflow-button:focus-visible {
      outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
      outline-offset: -2px;
    }

    .overflow-icon {
      width: 16px;
      height: 16px;
      transition: transform 0.2s ease;
    }

    .overflow-button[aria-expanded='true'] .overflow-icon {
      transform: rotate(180deg);
    }

    /* Overflow dropdown */
    .overflow-dropdown {
      display: none;
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 4px;
      min-width: 200px;
      background: var(--primitives-color-neutral-0, #ffffff);
      border: 1px solid var(--semantics-divider-color, #e2e8f0);
      border-radius: var(--semantics-controls-m-corner-radius, 7px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      padding: var(--primitives-space-4, 4px) 0;
    }

    .overflow-dropdown.open {
      display: block;
    }

    .overflow-item {
      display: block;
      width: 100%;
      padding: var(--primitives-space-8, 8px) var(--primitives-space-16, 16px);
      background: none;
      border: none;
      color: var(--components-menu-bar-menu-item-color, #154273);
      font: var(--components-menu-bar-menu-item-font, 550 18px/1.125 RijksSansVF, system-ui);
      text-align: left;
      cursor: pointer;
      white-space: nowrap;
    }

    .overflow-item:hover {
      background-color: var(--primitives-color-neutral-100, #f1f5f9);
    }

    .overflow-item:focus-visible {
      outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
      outline-offset: -2px;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .overflow-icon {
        transition: none;
      }
    }
  `;

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

  private _overflowMenuId = `rr-overflow-${Math.random().toString(36).substring(2, 11)}`;
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

  private _handleItemSelect = (event: CustomEvent): void => {
    // Deselect all items except the selected one
    const items = this.querySelectorAll('rr-menu-item');
    items.forEach((item) => {
      if (item !== event.detail.item) {
        (item as HTMLElement).removeAttribute('selected');
      }
    });

    // Dispatch event to parent
    this.dispatchEvent(
      new CustomEvent('itemselect', {
        bubbles: true,
        composed: true,
        detail: event.detail,
      })
    );
  };

  private _handleKeyDown = (event: KeyboardEvent): void => {
    const items = Array.from(this.querySelectorAll('rr-menu-item:not([disabled])'));
    if (items.length === 0) return;

    const currentIndex = items.findIndex(
      (item) => item === event.target || item.contains(event.target as Node)
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
    if (!this.hasOverflowMenu) return;
    if (this._isHandlingOverflow) return;

    if (this._overflowRAF) {
      cancelAnimationFrame(this._overflowRAF);
    }

    this._overflowRAF = requestAnimationFrame(() => {
      this._isHandlingOverflow = true;
      try {
        this._doHandleOverflow();
      } finally {
        requestAnimationFrame(() => {
          this._isHandlingOverflow = false;
        });
      }
    });
  };

  private _doHandleOverflow(): void {
    if (!this._menuContainer || !this._overflowWrapper || !this._overflowButton || !this._overflowDropdown)
      return;

    const slottedElements = this._defaultSlot?.assignedElements({ flatten: true }) || [];
    const items = slottedElements.filter((el) => el.tagName === 'RR-MENU-ITEM') as HTMLElement[];
    if (items.length === 0) return;

    // Reset all items to visible first
    items.forEach((item) => {
      item.style.display = '';
      item.style.visibility = 'visible';
      item.removeAttribute('data-overflow');
    });

    // Show overflow button to reserve its space
    this._overflowButton.style.display = 'flex';
    this._overflowDropdown.innerHTML = '';

    // Get the available width for menu items
    const containerWidth = this.clientWidth;
    const overflowButtonWidth = this._overflowWrapper.offsetWidth;

    // Calculate which items fit
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

    // If we have overflow items
    if (overflowStartIndex >= 0 && overflowStartIndex < items.length) {
      this._overflowButton.style.display = 'flex';
      this._overflowDropdown.setAttribute('role', 'menu');

      // Hide overflow items and add them to dropdown
      for (let i = overflowStartIndex; i < items.length; i++) {
        items[i].style.display = 'none';
        items[i].setAttribute('data-overflow', 'true');

        // Create dropdown item
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
      // All items fit, hide the overflow button
      this._overflowButton.style.display = 'none';
      this._overflowDropdown.removeAttribute('role');
      if (this._overflowMenuOpen) {
        this._overflowMenuOpen = false;
        this._overflowDropdown.classList.remove('open');
        this._overflowButton.setAttribute('aria-expanded', 'false');
      }
    }
  }

  private _toggleOverflowMenu = (e: Event): void => {
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

  private _handleOverflowButtonKeyDown = (event: KeyboardEvent): void => {
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

    const currentIndex = items.findIndex((item) => item === this.shadowRoot?.activeElement);
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
        (focusLast ? items[items.length - 1] : items[0] as HTMLElement).focus();
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
    return html`
      <div class="container" part="container">
        <slot name="title"></slot>
        <nav class="menu" part="menu" role="none">
          <slot></slot>
          ${this.hasOverflowMenu
            ? html`
                <div class="overflow-wrapper">
                  <button
                    class="overflow-button"
                    part="overflow-button"
                    aria-expanded="false"
                    aria-haspopup="menu"
                    aria-controls="${this._overflowMenuId}"
                    @click="${this._toggleOverflowMenu}"
                    @keydown="${this._handleOverflowButtonKeyDown}"
                  >
                    ${this.overflowLabel} ${chevronDownIcon}
                  </button>
                  <div
                    class="overflow-dropdown"
                    part="overflow-menu"
                    id="${this._overflowMenuId}"
                    aria-label="${this.overflowLabel}"
                  ></div>
                </div>
              `
            : ''}
        </nav>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-menu-bar': RRMenuBar;
  }
}
