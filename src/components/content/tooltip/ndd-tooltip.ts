/**
 * Nederlandse Digitale Dienst Tooltip Component (Lit + TypeScript)
 *
 * Wrapper component dat een tooltip toont bij hover of focus op het child element.
 * Gebruikt `display: contents` zodat het de layout van het child niet beïnvloedt.
 *
 * @element ndd-tooltip
 * @attr {string} text - Tooltip tekst
 * @attr {string} placement - Positie: 'top' | 'bottom' | 'left' | 'right' (standaard: 'top')
 *
 * @slot - Het element waarop de tooltip wordt getoond
 *
 * @note Gebruikt position: fixed + floating-ui strategy: 'fixed'. Positionering kan
 * breken wanneer een voorouder-element transform, filter of will-change heeft.
 *
 * @note aria-describedby werkt alleen wanneer het trigger element in de light DOM staat.
 * Bij web components als trigger (met eigen shadow DOM) is de koppeling een bekende
 * limitatie van shadow DOM + ARIA. Voor ndd-icon-button is dit niet relevant omdat
 * aria-label al op de interne button staat.
 */

import { LitElement } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';
import { tooltipStyles } from './ndd-tooltip.styles.ts';
import { tooltipTemplate } from './ndd-tooltip.template.ts';

type Placement = 'top' | 'bottom' | 'left' | 'right';

let tooltipCounter = 0;

@customElement('ndd-tooltip')
export class NDDTooltip extends LitElement {
	static override styles = tooltipStyles;

	@property({ type: String })
	text = '';

	@property({ type: String, reflect: true })
	placement: Placement = 'top';

	@state()
	_visible = false;

	private _tooltipId = `ndd-tooltip-${++tooltipCounter}`;
	private _hideDelay = 50;
	private _hideTimeout: ReturnType<typeof setTimeout> | null = null;
	private _descriptionEl: HTMLSpanElement | null = null;
	private _boundSlotChange = () => this._syncAriaDescribedBy();

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('keydown', this._handleKeyDown);
		this.updateComplete.then(() => {
			this._syncAriaDescribedBy();
			this.shadowRoot?.querySelector('slot')?.addEventListener('slotchange', this._boundSlotChange);
		});
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('_visible')) {
			if (this._visible) {
				this._updatePosition();
			}
		}
		if (changed.has('text')) {
			this._syncAriaDescribedBy();
		}
	}

	private _syncAriaDescribedBy(): void {
		const trigger = this._getTriggerElement();
		if (!trigger) return;

		if (this.text) {
			// Create or update a hidden span in the light DOM for aria-describedby
			if (!this._descriptionEl) {
				this._descriptionEl = document.createElement('span');
				this._descriptionEl.id = this._tooltipId;
				this._descriptionEl.hidden = true;
				this.appendChild(this._descriptionEl);
			}
			this._descriptionEl.textContent = this.text;
			trigger.setAttribute('aria-describedby', this._tooltipId);
		} else {
			trigger.removeAttribute('aria-describedby');
			this._descriptionEl?.remove();
			this._descriptionEl = null;
		}
	}

	private _getTriggerElement(): Element | null {
		const slot = this.shadowRoot?.querySelector('slot');
		const assigned = slot?.assignedElements({ flatten: true });
		// Skip the hidden description span
		return assigned?.find(el => el !== this._descriptionEl) ?? null;
	}

	private _getTooltipElement(): HTMLElement | null {
		return this.shadowRoot?.querySelector('.tooltip') ?? null;
	}

	_handleTriggerEnter(): void {
		if (!this.text) return;
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
			this._hideTimeout = null;
		}
		this._visible = true;
	}

	_handleTriggerLeave(): void {
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
		}
		this._hideTimeout = setTimeout(() => {
			this._visible = false;
			this._hideTimeout = null;
		}, this._hideDelay);
	}

	_handleTooltipEnter(): void {
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
			this._hideTimeout = null;
		}
	}

	_handleTooltipLeave(): void {
		this._handleTriggerLeave();
	}

	private _handleKeyDown = (e: KeyboardEvent): void => {
		if (e.key === 'Escape' && this._visible) {
			this._visible = false;
		}
	};

	private async _updatePosition(): Promise<void> {
		const trigger = this._getTriggerElement();
		const tooltip = this._getTooltipElement();
		if (!trigger || !tooltip) return;

		const { x, y } = await computePosition(trigger, tooltip, {
			placement: this.placement,
			strategy: 'fixed',
			middleware: [
				offset(8),
				flip(),
				shift({ padding: 8 }),
			],
		});

		tooltip.style.left = `${x}px`;
		tooltip.style.top = `${y}px`;
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('keydown', this._handleKeyDown);
		this.shadowRoot?.querySelector('slot')?.removeEventListener('slotchange', this._boundSlotChange);
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
			this._hideTimeout = null;
		}
		// Clean up aria-describedby on trigger and remove light DOM description span
		const trigger = this._getTriggerElement();
		trigger?.removeAttribute('aria-describedby');
		this._descriptionEl?.remove();
		this._descriptionEl = null;
	}

	override render() {
		return tooltipTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-tooltip': NDDTooltip;
	}
}
