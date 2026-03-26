/**
 * RegelRecht Sheet Component (Lit + TypeScript)
 *
 * An overlay component that slides in from the side or bottom of the screen.
 * Based on the native <dialog> element for built-in accessibility,
 * focus management, and Escape key support.
 *
 * On small (sm) viewports the sheet always renders as a bottom sheet,
 * regardless of the configured placement.
 *
 * @element rr-sheet
 *
 * @attr {string}  placement        - Sheet position: 'left' | 'right' | 'bottom' (default: 'right')
 * @attr {boolean} modeless         - Non-modal (no backdrop or focus lock); the sheet is modal by default
 * @attr {string}  accessible-label - Accessible name for the dialog, forwarded as aria-label (default: 'Dialoogvenster')
 *
 * @slot - Sheet content
 *
 * @fires open  - Fired when the sheet is opened
 * @fires close - Fired when the sheet is fully closed
 *
 * @method show() - Opens the sheet
 * @method hide() - Closes the sheet with a closing animation
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sheetStyles } from './rr-sheet.styles.ts';
import { sheetTemplate } from './rr-sheet.template.ts';

type Placement = 'left' | 'right' | 'bottom';

@customElement('rr-sheet')
export class RRSheet extends LitElement {
	static override styles = sheetStyles;

	@property({ type: String, reflect: true })
	placement: Placement = 'right';

	@property({ type: Boolean, reflect: true })
	modeless = false;

	/** Accessible name for the dialog — forwarded as aria-label to the dialog element. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = 'Dialoogvenster';

	private _hasWarnedLabel = false;

	private _closing = false;

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

		// Warn once per instance when the consumer has not provided a meaningful accessible label
		if (this.accessibleLabel === 'Dialoogvenster' && !this._hasWarnedLabel) {
			this._hasWarnedLabel = true;
			console.warn('<rr-sheet>: No accessible-label provided. Screen readers will announce this dialog as "Dialoogvenster". Set accessible-label to a descriptive name matching the dialog title.');
		}

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
			// Only add tabindex if the consumer hasn't already set one
			const hadTabindex = heading.hasAttribute('tabindex');
			if (!hadTabindex) heading.setAttribute('tabindex', '-1');
			heading.focus();
			// Only remove tabindex on blur if we added it ourselves
			if (!hadTabindex) {
				heading.addEventListener('blur', () => {
					heading.removeAttribute('tabindex');
				}, { once: true });
			}
			return;
		}

		// 3. Fallback — focus the dialog itself
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

		// Fallback for prefers-reduced-motion (no animation fires)
		// Use requestAnimationFrame to let CSS skip the animation first
		requestAnimationFrame(() => {
			if (this._closing && getComputedStyle(dialog).animationName === 'none') {
				dialog.classList.remove('is-closing');
				this._closing = false;
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
		return sheetTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-sheet': RRSheet;
	}
}
