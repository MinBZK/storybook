/**
 * Nederlandse Digitale Dienst Modal Dialog Component (Lit + TypeScript)
 *
 * A modal window with overlay backdrop, based on the native <dialog> element.
 * Internally renders an <ndd-dialog> for the visual structure.
 *
 * @element ndd-modal-dialog
 *
 * @attr {'alert'} variant          - Forwarded to ndd-dialog; 'alert' forces icon and color
 * @attr {string}  icon-name        - Forwarded to ndd-dialog; absent when not set
 * @attr {string}  text             - Forwarded to ndd-dialog; main text
 * @attr {string}  supporting-text  - Forwarded to ndd-dialog; supporting text
 *
 * @slot         - Optional custom content, forwarded to ndd-dialog
 * @slot actions - ndd-button elements, forwarded to ndd-dialog
 *
 * @fires open  - When the dialog is opened
 * @fires close - When the dialog is fully closed
 *
 * @method show() - Opens the modal dialog
 * @method hide() - Closes the modal dialog with a closing animation
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { modalDialogStyles } from './ndd-modal-dialog.styles.ts';
import { modalDialogTemplate } from './ndd-modal-dialog.template.ts';
import type { DialogVariant } from '../../status-and-feedback/dialog/ndd-dialog.ts';
import '../../status-and-feedback/dialog/ndd-dialog.ts';

@customElement('ndd-modal-dialog')
export class NDDModalDialog extends LitElement {
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

		// 2. Focus the dialog__text heading inside ndd-dialog's shadow DOM
		const inner = this.shadowRoot?.querySelector('ndd-dialog');
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
		'ndd-modal-dialog': NDDModalDialog;
	}
}
