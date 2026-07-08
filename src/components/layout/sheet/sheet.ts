/**
 * Nederlandse Digitale Dienst Sheet Component (Lit + TypeScript)
 *
 * An overlay component that slides in from the side or bottom of the screen.
 * Based on the native <dialog> element for built-in accessibility,
 * focus management, and Escape key support.
 *
 * On small (sm) viewports the sheet always renders as a bottom sheet,
 * regardless of the configured placement.
 *
 * @element nldd-sheet
 *
 * @attr {string}  placement        - Sheet position: 'left' | 'right' | 'bottom' (default: 'right')
 * @attr {string}  height           - Custom height for bottom sheets (and for any sheet on sm
 *                                    viewports, where all placements collapse to bottom). Accepts:
 *                                    `'full'` (default — viewport minus top-inset, identical to
 *                                    omitting the attribute), `'fit-content'` (collapse to content
 *                                    size), or any CSS length/percentage (e.g. `'50dvh'`, `'480px'`,
 *                                    `'50%'`). Always clamped to `100dvh - top-inset` so the sheet
 *                                    can't extend past the dismiss-tap area. No effect on side
 *                                    sheets at md+.
 * @attr {boolean} modeless         - Non-modal (no backdrop or focus lock); the sheet is modal by default
 * @attr {string}  accessible-label - Accessible name for the dialog, forwarded as aria-label (default: 'Venster')
 * @attr {string}  width            - Custom width for side sheets (left/right) as a CSS length
 *                                    (e.g. '480px', '32rem'). Applied from the md breakpoint up;
 *                                    ignored on sm (bottom sheet) and for `placement="bottom"`.
 *                                    Clamped to `100vw - 2 * inset` so the sheet always fits.
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
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { sheetStyles } from './sheet.styles.js';
import { sheetTemplate } from './sheet.template.js';
import { isPointerMode } from '../../../utilities/input-modality.js';
import { isDismissFromTitleBar } from '../../../utilities/dismiss-from-title-bar.js';

type Placement = 'left' | 'right' | 'bottom';

@customElement('nldd-sheet')
export class NLDDSheet extends LitElement {
	static override styles = sheetStyles;

	@property({ reflect: true, converter: reflectNonDefault<Placement>('right') })
	placement: Placement = 'right';

	/**
	 * Custom height for bottom sheets (and for any sheet on sm viewports
	 * where all placements collapse to bottom). Defaults to full-height
	 * — `'fit-content'` opts back into the content-sized layout, any CSS
	 * length/percentage sets a specific size. Clamped to `100dvh - top-
	 * inset` via `max-height` so the dismiss-tap area always remains.
	 */
	@property({ type: String, reflect: true })
	height = '';

	@property({ type: Boolean, reflect: true })
	modeless = false;

	/** Accessible name for the dialog — forwarded as aria-label to the dialog element. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = 'Venster';

	/**
	 * Custom width for side sheets (left/right) from the md breakpoint up.
	 * CSS length (e.g. '480px', '32rem'). Ignored on sm viewports (bottom-sheet
	 * fallback) and for `placement="bottom"`. Clamped to `100vw - 2 * inset`.
	 */
	@property({ type: String, reflect: true })
	width = '';

	override updated(changed: Map<string, unknown>) {
		if (changed.has('width')) {
			if (this.width) {
				this.style.setProperty('--_width', this.width);
			} else {
				this.style.removeProperty('--_width');
			}
		}
		if (changed.has('height')) {
			const h = this.height;
			// `'full'` is an explicit alias for the default (no var → CSS
			// fallback to `calc(100dvh - top-inset)`). Anything else flows
			// through CSS.supports so typos and bogus values silently fall
			// back to the default rather than producing a broken layout.
			if (h && h !== 'full' && CSS.supports('height', h)) {
				this.style.setProperty('--_height', h);
			} else {
				// One warning per instance for the element's lifetime (matches
				// _hasWarnedLabel): a later distinct invalid value won't warn
				// again. Acceptable for a dev-only nudge — not worth tracking
				// per-value state to re-warn.
				if (import.meta.env?.DEV && h && h !== 'full' && !this._hasWarnedHeight) {
					this._hasWarnedHeight = true;
					console.warn(`<nldd-sheet>: Invalid height value "${h}". Falling back to full height. Use 'full', 'fit-content', or a valid CSS length (e.g. '50dvh', '480px').`);
				}
				this.style.removeProperty('--_height');
			}
		}
	}

	private _hasWarnedLabel = false;
	private _hasWarnedHeight = false;

	private _closing = false;

	private get _dialog(): HTMLDialogElement | null {
		return this.shadowRoot?.querySelector('dialog') ?? null;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.style.containerType = 'inline-size';
		this.style.containerName = 'layout-container';
		// Listen for dismiss events bubbling up from nldd-top-title-bar
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
		if (import.meta.env?.DEV && this.accessibleLabel === 'Venster' && !this._hasWarnedLabel) {
			this._hasWarnedLabel = true;
			console.warn('<nldd-sheet>: No accessible-label provided. Screen readers will announce this dialog as "Venster". Set accessible-label to a descriptive name matching the dialog title.');
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

		// 2. Focus the dialog — show focus ring only when opened via keyboard
		const dialog = this._dialog;
		if (!dialog) return;
		dialog.classList.toggle('is-pointer-focus', isPointerMode());
		dialog.focus();
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

	private _handleDismiss = (e: Event): void => {
		// Only our own top-title-bar's dismiss button closes the sheet. Other
		// components fire `dismiss` for their own element (nldd-token's remove,
		// nldd-banner, nldd-document-tab-bar); inside a sheet those must not close it.
		if (isDismissFromTitleBar(e)) this.hide();
	};

	override render() {
		return sheetTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-sheet': NLDDSheet;
	}
}
