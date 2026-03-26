/**
 * RegelRecht Sheet Component (Lit + TypeScript)
 *
 * Een overlay-component die vanuit de zijkant of onderkant van het scherm inschuift.
 * Gebaseerd op het native <dialog>-element voor ingebouwde toegankelijkheid,
 * focusbeheer en Escape-toetsondersteuning.
 *
 * Op een sm-viewport wordt de sheet altijd als een bottom sheet weergegeven,
 * ongeacht de ingestelde placement.
 *
 * @element rr-sheet
 *
 * @attr {string}  placement - Positie van de sheet: 'left' | 'right' | 'bottom' (standaard: 'right')
 * @attr {boolean} modeless  - Niet-modaal (geen backdrop of focusvergrendeling); standaard is de sheet modaal
 *
 * @slot - Inhoud van de sheet
 *
 * @fires open  - Wanneer de sheet volledig geopend is
 * @fires close - Wanneer de sheet volledig gesloten is
 *
 * @method show() - Opent de sheet
 * @method hide() - Sluit de sheet met een sluitanimatie
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-sheet.styles.ts';
import { template } from './rr-sheet.template.ts';

type Placement = 'left' | 'right' | 'bottom';

@customElement('rr-sheet')
export class RRSheet extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	placement: Placement = 'right';

	@property({ type: Boolean, reflect: true })
	modeless = false;

	private get _dialog(): HTMLDialogElement | null {
		return this.shadowRoot?.querySelector('dialog') ?? null;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		// Listen for dismiss events bubbling up from rr-top-title-bar
		this.addEventListener('dismiss', this._handleDismiss);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('dismiss', this._handleDismiss);
	}

	show(): void {
		const dialog = this._dialog;
		if (!dialog) return;
		if (this.modeless) {
			dialog.show();
		} else {
			dialog.showModal();
		}
		this._manageFocus();
		this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
	}

	private _manageFocus(): void {
		// 1. autofocus element present — let the browser handle it natively
		if (this.querySelector('[autofocus]')) return;

		// 2. Focus the first heading — check shadow roots of known components first,
		// then fall back to light DOM headings
		const heading = (
			this.querySelector('rr-top-title-bar')?.shadowRoot?.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement | null
		) ?? (
			this.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement | null
		);

		if (heading) {
			heading.setAttribute('tabindex', '-1');
			heading.focus();
			// Remove tabindex on blur so heading stays out of tab order
			heading.addEventListener('blur', () => {
				heading.removeAttribute('tabindex');
			}, { once: true });
			return;
		}

		// 3. Fallback — focus the dialog itself
		this._dialog?.focus();
	}

	hide(): void {
		const dialog = this._dialog;
		if (!dialog || !dialog.open) return;

		dialog.classList.add('is-closing');
		dialog.addEventListener('animationend', () => {
			dialog.classList.remove('is-closing');
			dialog.close();
			this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
		}, { once: true });

		// Fallback for prefers-reduced-motion (no animation fires)
		// Use requestAnimationFrame to let CSS skip the animation first
		requestAnimationFrame(() => {
			if (dialog.classList.contains('is-closing') && getComputedStyle(dialog).animationName === 'none') {
				dialog.classList.remove('is-closing');
				dialog.close();
				this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
			}
		});
	}

	_handleDialogClick(e: MouseEvent): void {
		if (this.modeless) return;
		if (e.target === this._dialog) {
			this.hide();
		}
	}

	_handleCancel(e: Event): void {
		// Intercept Escape key default close — run hide animation instead
		e.preventDefault();
		this.hide();
	}

	private _handleDismiss = (): void => {
		this.hide();
	};

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-sheet': RRSheet;
	}
}
