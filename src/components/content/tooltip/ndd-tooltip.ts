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
 */

import { LitElement } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';
import { tooltipStyles } from './ndd-tooltip.styles.ts';
import { tooltipTemplate } from './ndd-tooltip.template.ts';

type Placement = 'top' | 'bottom' | 'left' | 'right';

@customElement('ndd-tooltip')
export class NDDTooltip extends LitElement {
	static override styles = tooltipStyles;

	@property({ type: String })
	text = '';

	@property({ type: String, reflect: true })
	placement: Placement = 'top';

	@state()
	_visible = false;

	private _hideDelay = 50;
	private _hideTimeout: ReturnType<typeof setTimeout> | null = null;
	private _boundHandleKeyDown = this._handleKeyDown.bind(this);

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('keydown', this._boundHandleKeyDown);
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('_visible') && this._visible) {
			this._updatePosition();
		}
	}

	private _getTriggerElement(): Element | null {
		const slot = this.shadowRoot?.querySelector('slot');
		const assigned = slot?.assignedElements({ flatten: true });
		return assigned?.[0] ?? null;
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

	private _handleKeyDown(e: KeyboardEvent): void {
		if (e.key === 'Escape' && this._visible) {
			this._visible = false;
			e.stopPropagation();
		}
	}

	private async _updatePosition(): Promise<void> {
		const trigger = this._getTriggerElement();
		const tooltip = this._getTooltipElement();
		if (!trigger || !tooltip) return;

		const { x, y } = await computePosition(trigger, tooltip, {
			placement: this.placement,
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
		this.removeEventListener('keydown', this._boundHandleKeyDown);
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
			this._hideTimeout = null;
		}
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
