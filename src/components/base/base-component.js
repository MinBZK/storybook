/**
 * Base class for all RegelRecht Web Components
 * Provides common functionality for token-based styling
 */

// Shared stylesheet cache for performance
const stylesheetCache = new Map();

// Token CSS content cache
let tokensCSSContent = null;

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
    const styles = this._getStyles();
    if (!styles) return null;

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
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

  /**
   * Must be implemented by subclasses
   */
  render() {
    throw new Error('render() must be implemented by subclass');
  }
}
