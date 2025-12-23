/**
 * Base class for all RegelRecht Web Components
 * Provides common functionality for token-based styling
 */

// Shared stylesheet cache for performance
const stylesheetCache = new Map();

// Token CSS content cache
let tokensCSSContent = null;

/**
 * Shared Accessibility CSS - inherited by ALL components
 * Following WCAG 2.2 and Dutch DigiToegankelijk requirements
 *
 * This ensures consistent accessibility patterns across the design system:
 * - Visually-hidden content for screen readers
 * - Reduced motion support for vestibular disorders
 * - High contrast mode (Windows) support
 * - Consistent focus indicators
 */
const ACCESSIBILITY_CSS = `
  /* ==========================================================================
   * VISUALLY HIDDEN - Hides content visually while keeping it accessible
   * Use for: screen reader only text, hidden labels on mobile
   * WCAG 1.3.1 Info and Relationships
   * ========================================================================== */
  .visually-hidden,
  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  /* Allow visually-hidden elements to become visible on focus (for skip links) */
  .visually-hidden-focusable:focus,
  .visually-hidden-focusable:active {
    position: static !important;
    width: auto !important;
    height: auto !important;
    padding: inherit !important;
    margin: inherit !important;
    overflow: visible !important;
    clip: auto !important;
    white-space: normal !important;
  }

  /* ==========================================================================
   * REDUCED MOTION - Respects user preference for reduced motion
   * WCAG 2.3.3 Animation from Interactions (Level AAA - best practice)
   * ========================================================================== */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* ==========================================================================
   * HIGH CONTRAST MODE - Windows High Contrast / Forced Colors
   * Ensures components remain usable in high contrast mode
   * ========================================================================== */
  @media (forced-colors: active) {
    /* Ensure focus rings are visible in high contrast */
    :focus-visible {
      outline: 2px solid CanvasText !important;
      outline-offset: 2px !important;
    }

    /* Ensure borders are visible for form controls */
    [role="checkbox"],
    [role="radio"],
    [role="switch"] {
      border: 2px solid CanvasText !important;
    }

    /* Selected states use system highlight colors */
    [aria-checked="true"],
    [aria-selected="true"],
    [aria-pressed="true"] {
      forced-color-adjust: none;
      background-color: Highlight !important;
      color: HighlightText !important;
    }

    /* Disabled states use system gray */
    [aria-disabled="true"],
    :disabled {
      opacity: 0.5 !important;
      border-color: GrayText !important;
    }
  }

  /* ==========================================================================
   * FOCUS MANAGEMENT - Consistent focus indicators
   * WCAG 2.4.7 Focus Visible
   * ========================================================================== */
  :focus:not(:focus-visible) {
    outline: none;
  }

  :focus-visible {
    outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
    outline-offset: 2px;
  }
`;

/**
 * Load tokens CSS content once and cache it
 */
async function loadTokensCSS() {
  if (tokensCSSContent !== null) {
    return tokensCSSContent;
  }

  try {
    // Try to fetch from dist folder (development)
    const response = await fetch('/dist/css/tokens.css');
    if (response.ok) {
      tokensCSSContent = await response.text();
      return tokensCSSContent;
    }
  } catch (e) {
    // Fallback: tokens might be inlined or loaded differently
    console.warn('Could not load tokens.css from /dist/css/', e);
  }

  // Return empty string if loading fails
  tokensCSSContent = '';
  return tokensCSSContent;
}

export class RRBaseComponent extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'variant', 'disabled'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._initialized = false;
  }

  async connectedCallback() {
    if (!this._initialized) {
      await this._initialize();
      this._initialized = true;
    }
    this.render();
  }

  disconnectedCallback() {
    // Cleanup if needed
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this._initialized) {
      this.render();
    }
  }

  async _initialize() {
    // Load and adopt stylesheets
    const styles = await this._loadStyles();

    if ('adoptedStyleSheets' in this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = styles;
    } else {
      // Fallback for browsers without adoptedStyleSheets
      const styleEl = document.createElement('style');
      for (const sheet of styles) {
        if (sheet.cssRules) {
          for (const rule of sheet.cssRules) {
            styleEl.textContent += rule.cssText + '\n';
          }
        }
      }
      this.shadowRoot.prepend(styleEl);
    }
  }

  async _loadStyles() {
    const componentName = this.constructor.componentName || this.tagName.toLowerCase();
    const cacheKey = componentName;

    if (stylesheetCache.has(cacheKey)) {
      return stylesheetCache.get(cacheKey);
    }

    // Get base tokens stylesheet
    const tokensSheet = await this._getTokensStylesheet();

    // Get component-specific stylesheet
    const componentSheet = await this._getComponentStylesheet();

    const sheets = [tokensSheet, componentSheet].filter(Boolean);
    stylesheetCache.set(cacheKey, sheets);

    return sheets;
  }

  async _getTokensStylesheet() {
    // Load tokens CSS - cached globally
    if (!stylesheetCache.has('__tokens__')) {
      const sheet = new CSSStyleSheet();
      const css = await loadTokensCSS();
      if (css) {
        sheet.replaceSync(css);
      }
      stylesheetCache.set('__tokens__', sheet);
    }
    return stylesheetCache.get('__tokens__');
  }

  async _getComponentStylesheet() {
    // Override in subclasses to provide component-specific styles
    const componentStyles = this._getStyles();

    // Combine shared accessibility CSS with component-specific CSS
    // This ensures all components inherit a11y utilities (visually-hidden, reduced-motion, etc.)
    const fullCSS = ACCESSIBILITY_CSS + '\n' + (componentStyles || '');

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(fullCSS);
    return sheet;
  }

  /**
   * Override in subclasses to return component CSS
   * @returns {string} CSS string for the component
   */
  _getStyles() {
    return '';
  }

  /**
   * Utility method to get token value
   * @param {string} tokenPath - Token path like 'primitives/color/accent/100'
   * @returns {string} The CSS variable value
   */
  getToken(tokenPath) {
    const cssVarName = `--${tokenPath.replace(/\//g, '-')}`;
    return getComputedStyle(this).getPropertyValue(cssVarName).trim();
  }

  /**
   * Utility for boolean attributes
   * @param {string} name - Attribute name
   * @returns {boolean}
   */
  getBooleanAttribute(name) {
    return this.hasAttribute(name) && this.getAttribute(name) !== 'false';
  }

  // ===========================================================================
  // ACCESSIBILITY HELPER METHODS
  // These methods provide consistent ARIA attribute management across all components
  // ===========================================================================

  /**
   * Sets multiple ARIA attributes at once
   * @param {Object} attrs - Object of {attributeName: value} (without 'aria-' prefix)
   * @example this.setAriaAttributes({ checked: true, disabled: false })
   */
  setAriaAttributes(attrs) {
    for (const [name, value] of Object.entries(attrs)) {
      if (value === null || value === undefined) {
        this.removeAttribute(`aria-${name}`);
      } else {
        this.setAttribute(`aria-${name}`, String(value));
      }
    }
  }

  /**
   * Updates ARIA state attributes for interactive elements
   * Handles common states: checked, disabled, expanded, pressed, selected
   * @param {Object} state - State object with boolean/string values
   * @example this.updateAriaState({ checked: true, disabled: false })
   */
  updateAriaState(state) {
    const attrs = {};
    if ('checked' in state) attrs.checked = state.checked;
    if ('disabled' in state) attrs.disabled = state.disabled;
    if ('expanded' in state) attrs.expanded = state.expanded;
    if ('pressed' in state) attrs.pressed = state.pressed;
    if ('selected' in state) attrs.selected = state.selected;
    if ('hidden' in state) attrs.hidden = state.hidden;
    this.setAriaAttributes(attrs);
  }

  /**
   * Generates a unique ID for ARIA relationships (aria-controls, aria-labelledby, etc.)
   * @param {string} prefix - Prefix for the ID (default: 'rr')
   * @returns {string} Unique ID like 'rr-abc123def'
   */
  generateId(prefix = 'rr') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Announces a message to screen readers via a live region
   * @param {string} message - Message to announce
   * @param {string} priority - 'polite' or 'assertive' (default: 'polite')
   */
  announceToScreenReader(message, priority = 'polite') {
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'visually-hidden';
    announcer.textContent = message;

    document.body.appendChild(announcer);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  /**
   * Must be implemented by subclasses
   */
  render() {
    throw new Error('render() must be implemented by subclass');
  }
}
