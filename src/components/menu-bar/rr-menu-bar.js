/**
 * RegelRecht Menu Bar Component
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

import { RRBaseComponent } from '../base/base-component.js';
import './rr-menu-item.js';

export class RRMenuBar extends RRBaseComponent {
  static componentName = 'rr-menu-bar';

  static get observedAttributes() {
    return [...super.observedAttributes, 'size', 'has-overflow-menu', 'overflow-label'];
  }

  constructor() {
    super();
    this._onItemSelect = this._onItemSelect.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._handleOverflow = this._handleOverflow.bind(this);
    this._toggleOverflowMenu = this._toggleOverflowMenu.bind(this);
    this._closeOverflowMenu = this._closeOverflowMenu.bind(this);
    this._resizeObserver = null;
    this._overflowMenuOpen = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('select', this._onItemSelect);
    this.addEventListener('keydown', this._onKeyDown);

    // Set ARIA role
    this.setAttribute('role', 'menubar');

    // Setup overflow detection if enabled
    if (this.hasOverflowMenu) {
      this._setupOverflowDetection();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('select', this._onItemSelect);
    this.removeEventListener('keydown', this._onKeyDown);
    this._cleanupOverflowDetection();
  }

  _onItemSelect(event) {
    // Deselect all items except the selected one
    const items = this.querySelectorAll('rr-menu-item');
    items.forEach(item => {
      if (item !== event.detail.item) {
        item.selected = false;
      }
    });

    // Dispatch event to parent
    this.dispatchEvent(new CustomEvent('itemselect', {
      bubbles: true,
      composed: true,
      detail: event.detail
    }));
  }

  _onKeyDown(event) {
    const items = Array.from(this.querySelectorAll('rr-menu-item:not([disabled])'));
    if (items.length === 0) return;

    const currentIndex = items.findIndex(item => item === event.target || item.contains(event.target));
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
    }
  }

  get size() {
    return this.getAttribute('size') || 'm';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get hasOverflowMenu() {
    return this.getBooleanAttribute('has-overflow-menu');
  }

  get overflowLabel() {
    return this.getAttribute('overflow-label') || 'Meer';
  }

  _setupOverflowDetection() {
    // Clean up any existing observers first
    this._cleanupOverflowDetection();

    // Wait for render to complete
    requestAnimationFrame(() => {
      // Observe the host element itself for size changes
      this._resizeObserver = new ResizeObserver(() => {
        this._handleOverflow();
      });
      this._resizeObserver.observe(this);

      // Also observe slot changes
      const slot = this.shadowRoot?.querySelector('slot:not([name])');
      if (slot) {
        slot.addEventListener('slotchange', this._handleOverflow);
        this._slotElement = slot; // Store reference for cleanup
      }

      // Initial check
      this._handleOverflow();

      // Close menu when clicking outside
      document.addEventListener('click', this._closeOverflowMenu);
    });
  }

  _cleanupOverflowDetection() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._slotElement) {
      this._slotElement.removeEventListener('slotchange', this._handleOverflow);
      this._slotElement = null;
    }
    document.removeEventListener('click', this._closeOverflowMenu);
  }

  _handleOverflow() {
    if (!this.hasOverflowMenu) return;

    const menuContainer = this.shadowRoot?.querySelector('.menu');
    const overflowWrapper = this.shadowRoot?.querySelector('.overflow-wrapper');
    const overflowButton = this.shadowRoot?.querySelector('.overflow-button');
    const overflowDropdown = this.shadowRoot?.querySelector('.overflow-dropdown');
    if (!menuContainer || !overflowWrapper || !overflowButton || !overflowDropdown) return;

    // Get all slotted menu items using assignedElements with flatten
    const slot = this.shadowRoot?.querySelector('slot:not([name])');
    const slottedElements = slot?.assignedElements({ flatten: true }) || [];
    const items = slottedElements.filter(el => el.tagName === 'RR-MENU-ITEM');
    if (items.length === 0) return;

    // Reset all items to visible first
    items.forEach(item => {
      item.style.display = '';
      item.style.visibility = 'visible';
      item.removeAttribute('data-overflow');
    });

    // Show overflow button to reserve its space
    overflowButton.style.display = 'flex';
    overflowDropdown.innerHTML = '';

    // Get the available width for menu items (use host element width)
    const containerWidth = this.clientWidth;
    const overflowButtonWidth = overflowWrapper.offsetWidth;

    // Calculate which items fit
    let usedWidth = 0;
    let overflowStartIndex = -1;

    for (let i = 0; i < items.length; i++) {
      const itemWidth = items[i].offsetWidth;
      // Always reserve space for overflow button when checking
      const availableWidth = containerWidth - overflowButtonWidth;

      if (usedWidth + itemWidth > availableWidth && overflowStartIndex < 0) {
        overflowStartIndex = i;
        break;
      }
      usedWidth += itemWidth;
    }

    // If we have overflow items
    if (overflowStartIndex >= 0 && overflowStartIndex < items.length) {
      overflowButton.style.display = 'flex';

      // Hide overflow items and add them to dropdown
      for (let i = overflowStartIndex; i < items.length; i++) {
        items[i].style.display = 'none';
        items[i].setAttribute('data-overflow', 'true');

        // Create dropdown item
        const dropdownItem = document.createElement('button');
        dropdownItem.className = 'overflow-item';
        dropdownItem.textContent = items[i].textContent;
        dropdownItem.addEventListener('click', (e) => {
          e.stopPropagation();
          items[i].click();
          this._closeOverflowMenu();
        });
        overflowDropdown.appendChild(dropdownItem);
      }
    } else {
      // All items fit, hide the overflow button
      overflowButton.style.display = 'none';
    }
  }

  _toggleOverflowMenu(e) {
    e.stopPropagation();
    this._overflowMenuOpen = !this._overflowMenuOpen;
    const dropdown = this.shadowRoot?.querySelector('.overflow-dropdown');
    const button = this.shadowRoot?.querySelector('.overflow-button');
    if (dropdown && button) {
      dropdown.classList.toggle('open', this._overflowMenuOpen);
      button.setAttribute('aria-expanded', String(this._overflowMenuOpen));

      // Position dropdown below button when opening
      if (this._overflowMenuOpen) {
        const rect = button.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom + 4}px`;
        dropdown.style.right = `${window.innerWidth - rect.right}px`;
      }
    }
  }

  _closeOverflowMenu(e) {
    if (e && this.shadowRoot?.contains(e.target)) return;
    this._overflowMenuOpen = false;
    const dropdown = this.shadowRoot?.querySelector('.overflow-dropdown');
    const button = this.shadowRoot?.querySelector('.overflow-button');
    if (dropdown && button) {
      dropdown.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    }
  }

  _getStyles() {
    return `
      :host {
        display: block;
        font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
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
      :host([size="s"]) .title {
        font: var(--components-menu-bar-title-item-s-font, 600 18px/1.125 RijksSansVF, system-ui);
      }

      :host([size="m"]) .title,
      :host(:not([size])) .title {
        font: var(--components-menu-bar-title-item-m-font, 600 20px/1.125 RijksSansVF, system-ui);
      }

      :host([size="l"]) .title {
        font: var(--components-menu-bar-title-item-l-font, 600 23px/1.125 RijksSansVF, system-ui);
      }

      .menu {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        gap: 0;
        /* Bottom border per Figma default-global-menu-bar */
        border-bottom: var(--_menu-bar-border, var(--semantics-divider-thickness, 2px) solid var(--semantics-divider-color, #e2e8f0));
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
        font: var(--components-menu-bar-menu-item-font, 600 18px/1.125 RijksSansVF, system-ui);
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

      .overflow-button[aria-expanded="true"] .overflow-icon {
        transform: rotate(180deg);
      }

      /* Overflow dropdown */
      .overflow-dropdown {
        display: none;
        position: fixed;
        min-width: 200px;
        background: var(--primitives-color-neutral-0, #ffffff);
        border: 1px solid var(--semantics-divider-color, #e2e8f0);
        border-radius: var(--semantics-controls-m-corner-radius, 7px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 1000;
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
        font: var(--components-menu-bar-menu-item-font, 600 18px/1.125 RijksSansVF, system-ui);
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
    `;
  }

  render() {
    // Chevron down icon for overflow button
    const chevronIcon = `<svg class="overflow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;

    this.shadowRoot.innerHTML = `
      <div class="container" part="container">
        <slot name="title"></slot>
        <nav class="menu" part="menu" role="none">
          <slot></slot>
          ${this.hasOverflowMenu ? `
            <div class="overflow-wrapper">
              <button
                class="overflow-button"
                part="overflow-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                ${this.overflowLabel}
                ${chevronIcon}
              </button>
              <div class="overflow-dropdown" part="overflow-menu" role="menu">
              </div>
            </div>
          ` : ''}
        </nav>
      </div>
    `;

    // Setup overflow button click handler
    if (this.hasOverflowMenu) {
      const overflowButton = this.shadowRoot.querySelector('.overflow-button');
      if (overflowButton) {
        overflowButton.addEventListener('click', this._toggleOverflowMenu);
      }
      // Re-setup overflow detection after render
      this._setupOverflowDetection();
    }
  }
}

customElements.define('rr-menu-bar', RRMenuBar);
