/**
 * RegelRecht Box Component
 *
 * @element rr-box
 * @attr {string} padding - Override padding value (e.g., "24px", "1rem")
 * @attr {string} radius - Override border-radius value (e.g., "8px", "0.5rem")
 *
 * @slot - Default slot for box content
 *
 * @csspart container - The main container element
 *
 * @cssprop --rr-box-background-color - Override background color
 * @cssprop --rr-box-corner-radius - Override border radius
 * @cssprop --rr-box-padding - Override padding
 */

import { RRBaseComponent } from '../base/base-component.js';

export class RRBox extends RRBaseComponent {
  static componentName = 'rr-box';

  static get observedAttributes() {
    return [...super.observedAttributes, 'padding', 'radius'];
  }

  constructor() {
    super();
  }

  get padding() {
    return this.getAttribute('padding') || null;
  }

  set padding(value) {
    if (value) {
      this.setAttribute('padding', value);
    } else {
      this.removeAttribute('padding');
    }
  }

  get radius() {
    return this.getAttribute('radius') || null;
  }

  set radius(value) {
    if (value) {
      this.setAttribute('radius', value);
    } else {
      this.removeAttribute('radius');
    }
  }

  _getStyles() {
    return `
      :host {
        display: block;
        font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
      }

      :host([hidden]) {
        display: none;
      }

      .container {
        /* Use component tokens with custom property overrides */
        background-color: var(--rr-box-background-color, var(--components-box-background-color, #f1f5f9));
        border-radius: var(--rr-box-corner-radius, var(--_border-radius, var(--components-box-corner-radius, 11px)));
        padding: var(--rr-box-padding, var(--_padding, var(--components-box-padding, 16px)));

        /* Allow content to flow naturally */
        box-sizing: border-box;
      }

      /* Note: Custom padding/radius overrides are applied via inline styles in render()
         CSS attr() does not work in custom properties in current browsers */
    `;
  }

  render() {
    // Apply custom values if attributes are set
    const customStyles = [];
    if (this.padding) {
      customStyles.push(`--_padding: ${this.padding}`);
    }
    if (this.radius) {
      customStyles.push(`--_border-radius: ${this.radius}`);
    }
    const styleAttr = customStyles.length > 0 ? ` style="${customStyles.join('; ')}"` : '';

    this.shadowRoot.innerHTML = `
      <div class="container" part="container"${styleAttr}>
        <slot></slot>
      </div>
    `;
  }
}

// Register the element
customElements.define('rr-box', RRBox);
