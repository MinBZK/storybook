import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as icons from './icon-library.js';

/**
 * A customizable icon component that renders SVG icons from a predefined library.
 * 
 * @element rr-icon
 * 
 * @attr {string} name - The name of the icon to display
 * @attr {number} size - The size of the icon in pixels
 * @attr {string} color - The color of the icon
 * 
 * @example
 * ```html
 * <rr-icon name="heart" size="32" color="#ff0000"></rr-icon>
 * ```
 */
@customElement('rr-icon')
export class RRIcon extends LitElement {
  /**
   * The name of the icon from the icon library
   * @type {string}
   */
  @property({ type: String }) name = 'home';
  
  
  static styles = css`
	:host {
		display: inline-block;
		width: 100%;
		height: 100%;
		aspect-ratio: 1 / 1;
		color: inherit;
	}
	.icon__container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	svg {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
  `;

  render() {
	const iconSvg = icons[this.name];
	
	if (!iconSvg) {
	  return html`<span>Icon not found</span>`;
	}

	return html`
	  <div class="icon__container"">
		${iconSvg}
	  </div>
	`;
  }
}