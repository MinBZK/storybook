/**
 * RegelRecht Modal Dialog Component (Lit + TypeScript)
 *
 * Een modaal venster met overlay backdrop, gebaseerd op het native <dialog>-element.
 * Rendert intern een <rr-dialog> voor de visuele structuur.
 *
 * @element rr-modal-dialog
 *
 * @attr {'alert'} variant          - Doorgegeven aan rr-dialog; 'alert' dwingt icoon en kleur af
 * @attr {string}  icon-name        - Doorgegeven aan rr-dialog; afwezig wanneer niet ingesteld
 * @attr {string}  text             - Doorgegeven aan rr-dialog; hoofdtekst
 * @attr {string}  supporting-text  - Doorgegeven aan rr-dialog; ondersteunende tekst
 *
 * @slot         - Optionele aangepaste inhoud, doorgegeven aan rr-dialog
 * @slot actions - rr-button elementen, doorgegeven aan rr-dialog
 *
 * @fires open  - Wanneer het venster wordt geopend
 * @fires close - Wanneer het venster volledig is gesloten
 *
 * @method show() - Opent het modale venster
 * @method hide() - Sluit het modale venster met sluitanimatie
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { modalDialogStyles } from './rr-modal-dialog.styles.ts';
import { modalDialogTemplate } from './rr-modal-dialog.template.ts';
import type { DialogVariant } from '../../status-and-feedback/dialog/rr-dialog.ts';
import '../../status-and-feedback/dialog/rr-dialog.ts';

@customElement('rr-modal-dialog')
export class RRModalDialog extends LitElement {
	static override styles = modalDialogStyles;

	@property({ type: String, reflect: true })
	variant: DialogVariant | '' = '';

	@property({ type: String, reflect: true, attribute: 'icon-name' })
	iconName = '';

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: String, reflect: true, attribute: 'supporting-text' })
	supportingText = '';

	private _closing = false;

	private get _dialog(): HTMLDialogElement | null {
		return this.shadowRoot?.querySelector('dialog') ?? null;
	}

	show(): void {
		const dialog = this._dialog;
		if (!dialog || dialog.open) return;
		dialog.showModal();
		this._manageFocus();
		this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
	}

	private _manageFocus(): void {
		// 1. autofocus element present — let the browser handle it natively
		if (this.querySelector('[autofocus]')) return;

		// 2. Focus the dialog__text heading inside rr-dialog's shadow DOM
		const inner = this.shadowRoot?.querySelector('rr-dialog');
		const heading = inner?.shadowRoot?.querySelector<HTMLElement>('.dialog__text') ?? null;

		if (heading) {
			const hadTabindex = heading.hasAttribute('tabindex');
			if (!hadTabindex) heading.setAttribute('tabindex', '-1');
			heading.focus();
			if (!hadTabindex) {
				heading.addEventListener('blur', () => {
					heading.removeAttribute('tabindex');
				}, { once: true });
			}
			return;
		}

		// 3. Fallback — focus the native dialog itself
		this._dialog?.focus();
	}

	hide(): void {
		const dialog = this._dialog;
		if (!dialog || !dialog.open || this._closing) return;

		this._closing = true;
		dialog.classList.add('is-closing');
		dialog.addEventListener('animationend', () => {
			dialog.classList.remove('is-closing');
			this._closing = false;
			dialog.close();
			this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
		}, { once: true });

		requestAnimationFrame(() => {
			if (this._closing && getComputedStyle(dialog).animationName === 'none') {
				dialog.classList.remove('is-closing');
				this._closing = false;
				dialog.close();
				this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
			}
		});
	}

	_handleBackdropClick(e: MouseEvent): void {
		if (e.target === this._dialog) this.hide();
	}

	_handleCancel(e: Event): void {
		e.preventDefault();
		this.hide();
	}

	override render() {
		return modalDialogTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-modal-dialog': RRModalDialog;
	}
}
