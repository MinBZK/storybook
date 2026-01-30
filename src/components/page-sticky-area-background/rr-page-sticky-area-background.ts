/**
 * RegelRecht Page Sticky Area Background Component (Lit + TypeScript)
 *
 * A gradient background for sticky headers/footers that fades content smoothly.
 * The gradient extends beyond the component boundary to create a smooth fade effect.
 *
 * @element rr-page-sticky-area-background
 * @attr {string} position - Position of the sticky area: 'top' | 'bottom'
 * @attr {boolean} tinted - Whether to use tinted (gray) background instead of white
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Position = 'top' | 'bottom';

@customElement('rr-page-sticky-area-background')
export class RRPageStickyAreaBackground extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: var(--components-page-sticky-area-height, 80px);
      overflow: visible;
    }

    :host([hidden]) {
      display: none;
    }

    .sticky-area {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      position: relative;
    }

    /* For top position: filled at top, spacer, then gradient extending down */
    :host([position='top']) .sticky-area,
    :host(:not([position])) .sticky-area {
      flex-direction: column;
    }

    /* For bottom position: gradient extending up, spacer, then filled at bottom */
    :host([position='bottom']) .sticky-area {
      flex-direction: column-reverse;
    }

    .filled {
      flex: 1;
      min-height: 0;
    }

    .gradient-spacer {
      height: 28px;
      flex-shrink: 0;
    }

    .gradient {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 44px;
      pointer-events: none;
    }

    /* Top position - gradient extends below component */
    :host([position='top']) .gradient,
    :host(:not([position])) .gradient {
      bottom: -16px;
    }

    /* Bottom position - gradient extends above component */
    :host([position='bottom']) .gradient {
      top: -16px;
    }

    /* White background (default) - filled area */
    :host(:not([tinted])) .filled,
    :host([tinted='false']) .filled {
      background-color: rgba(255, 255, 255, 0.9);
    }

    /* White gradient - top position (fades from solid to transparent going down) */
    :host([position='top']:not([tinted])) .gradient,
    :host([position='top'][tinted='false']) .gradient,
    :host(:not([position]):not([tinted])) .gradient,
    :host(:not([position])[tinted='false']) .gradient {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(255, 255, 255, 0.5) 70%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    /* White gradient - bottom position (fades from transparent to solid going down) */
    :host([position='bottom']:not([tinted])) .gradient,
    :host([position='bottom'][tinted='false']) .gradient {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.5) 30%,
        rgba(255, 255, 255, 0.9) 100%
      );
    }

    /* Tinted background (gray) - filled area */
    :host([tinted]) .filled,
    :host([tinted='true']) .filled {
      background-color: rgba(245, 246, 249, 0.9);
    }

    /* Tinted gradient - top position */
    :host([position='top'][tinted]) .gradient,
    :host([position='top'][tinted='true']) .gradient,
    :host(:not([position])[tinted]) .gradient,
    :host(:not([position])[tinted='true']) .gradient {
      background: linear-gradient(
        180deg,
        rgba(245, 246, 249, 0.9) 0%,
        rgba(245, 246, 249, 0.5) 70%,
        rgba(245, 246, 249, 0) 100%
      );
    }

    /* Tinted gradient - bottom position */
    :host([position='bottom'][tinted]) .gradient,
    :host([position='bottom'][tinted='true']) .gradient {
      background: linear-gradient(
        180deg,
        rgba(245, 246, 249, 0) 0%,
        rgba(245, 246, 249, 0.5) 30%,
        rgba(245, 246, 249, 0.9) 100%
      );
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .filled {
        background-color: Canvas;
      }

      :host([position='top']) .gradient,
      :host(:not([position])) .gradient {
        background: linear-gradient(180deg, Canvas 0%, transparent 100%);
      }

      :host([position='bottom']) .gradient {
        background: linear-gradient(180deg, transparent 0%, Canvas 100%);
      }
    }
  `;

  @property({ type: String, reflect: true })
  position: Position = 'top';

  @property({ type: Boolean, reflect: true })
  tinted = false;

  override render() {
    return html`
      <div class="sticky-area">
        <div class="filled"></div>
        <div class="gradient-spacer"></div>
        <div class="gradient"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-page-sticky-area-background': RRPageStickyAreaBackground;
  }
}
