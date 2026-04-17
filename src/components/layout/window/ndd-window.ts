/**
 * Nederlandse Digitale Dienst Window Component (Lit + TypeScript)
 *
 * Een zwevend venster gebaseerd op het native <dialog>-element.
 * Kan modaal of niet-modaal worden weergegeven. Positioneerbaar via
 * CSS-waarden en optioneel versleepbaar.
 *
 * Geen eigen header — consumers gebruiken ndd-page met sticky-header
 * binnenin voor een title bar.
 *
 * @element ndd-window
 *
 * @attr {boolean} modeless         - Niet-modaal (geen backdrop of focusvergrendeling); standaard is het venster modaal
 * @attr {boolean} movable     - Verplaatsbaar via pointer (op sm uitgeschakeld). Geen keyboard-equivalent (WCAG 2.1.1 path-dependent exception).
 * @attr {string}  accessible-label - (verplicht) Toegankelijke naam (aria-label) — zet een unieke naam per venster
 * @attr {string}  top              - CSS top positie van de bovenrand (bijv. '0', '100px')
 * @attr {string}  left             - CSS left positie van de linkerrand
 * @attr {string}  right            - CSS right waarde
 * @attr {string}  bottom           - CSS bottom waarde
 * @attr {string}  width            - CSS width (standaard: var(--components-window-default-width))
 * @attr {string}  height           - CSS height (standaard: content height)
 *
 * @slot - Volledige window content (bijv. ndd-page)
 *
 * @fires open  - Wanneer het venster wordt geopend
 * @fires close - Wanneer het venster volledig is gesloten
 *
 * @method show() - Opent het venster
 * @method hide() - Sluit het venster
 */

import { LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { windowStyles } from './ndd-window.styles.ts';
import { windowTemplate } from './ndd-window.template.ts';
import { isKeyboardMode } from '../../../utilities/input-modality.js';
import { breakpoints } from '../../../assets/styles/breakpoints.ts';

@customElement('ndd-window')
export class NDDWindow extends LitElement {
	static override styles = windowStyles;

	@property({ type: Boolean, reflect: true })
	modeless = false;

	@property({ type: Boolean, reflect: true, attribute: 'movable' })
	movable = false;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = 'Venster';

	@property({ type: String, reflect: true })
	top: string | undefined;

	@property({ type: String, reflect: true })
	left: string | undefined;

	@property({ type: String, reflect: true })
	right: string | undefined;

	@property({ type: String, reflect: true })
	bottom: string | undefined;

	@property({ type: String, reflect: true })
	width: string | undefined;

	@property({ type: String, reflect: true })
	height: string | undefined;

	private _closing = false;
	private _dragging = false;
	private _dragOffsetX = 0;
	private _dragOffsetY = 0;
	private _didDrag = false;
	private _dragHandle: Element | null = null;
	private _dragPointerId = -1;
	private _hasWarnedLabel = false;

	private get _dialog(): HTMLDialogElement | null {
		return this.shadowRoot?.querySelector('dialog') ?? null;
	}

	private get _isMovable(): boolean {
		if (!this.movable) return false;
		// Disable dragging on small viewports
		return window.matchMedia(`(min-width: ${breakpoints.mdMin})`).matches;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('dismiss', this._handleDismiss);
		this._detectDragHandle();
		window.addEventListener('resize', this._handleResize);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('dismiss', this._handleDismiss);
		this._removeDragListeners();
		window.removeEventListener('resize', this._handleResize);
	}

	override updated(changed: PropertyValues): void {
		this._applyPositionStyles();
		if (changed.has('movable')) {
			this._detectDragHandle();
		}
	}

	show(): void {
		const dialog = this._dialog;
		if (!dialog) return;

		if (this.accessibleLabel === 'Venster' && !this._hasWarnedLabel) {
			this._hasWarnedLabel = true;
			console.warn('<ndd-window>: No accessible-label provided. Screen readers will announce this window as "Venster". Set accessible-label to a unique, descriptive name.');
		}

		if (this.modeless) {
			dialog.show();
		} else {
			dialog.showModal();
		}
		this._applyPositionStyles();
		this._manageFocus();
		this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
	}

	hide(): void {
		const dialog = this._dialog;
		if (!dialog || !dialog.open || this._closing) return;

		this._closing = true;
		this._didDrag = false;
		this._removeDragListeners();
		dialog.close();
		this._closing = false;
		this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
	}

	private _manageFocus(): void {
		if (this.querySelector('[autofocus]')) return;

		const dialog = this._dialog;
		if (!dialog) return;
		dialog.classList.toggle('is-keyboard-focus', isKeyboardMode());
		dialog.focus();
	}

	private _applyPositionStyles(): void {
		const dialog = this._dialog;
		if (!dialog) return;

		// On small viewports: clear position styles, keep width/height
		const isSmall = window.matchMedia(`(max-width: ${breakpoints.smMax})`).matches;
		if (isSmall) {
			dialog.style.top = '';
			dialog.style.bottom = '';
			dialog.style.left = '';
			dialog.style.right = '';
			dialog.style.margin = '';
			dialog.style.transform = '';
			dialog.style.width = this.width ?? '';
			dialog.style.height = this.height ?? '';
			return;
		}

		const hasPosition = this.top !== undefined || this.left !== undefined || this.right !== undefined || this.bottom !== undefined;

		// Set explicit 'auto' on opposing axis when only one side is set,
		// to override the UA stylesheet defaults on <dialog>
		dialog.style.top = this.top ?? (this.bottom !== undefined ? 'auto' : '');
		dialog.style.bottom = this.bottom ?? (this.top !== undefined ? 'auto' : '');
		dialog.style.left = this.left ?? (this.right !== undefined ? 'auto' : '');
		dialog.style.right = this.right ?? (this.left !== undefined ? 'auto' : '');
		dialog.style.width = this.width ?? '';
		dialog.style.height = this.height ?? '';

		// Reset margin when custom position is set; keep margin: auto for centering
		dialog.style.margin = hasPosition ? '0' : '';
	}

	_handleDialogClick = (e: MouseEvent): void => {
		// Suppress click after a drag gesture
		if (this._didDrag) {
			this._didDrag = false;
			return;
		}
		if (this.modeless) return;

		// Detect backdrop click: check if click landed outside the dialog rect
		const dialog = this._dialog;
		if (!dialog) return;
		const rect = dialog.getBoundingClientRect();
		const outside = e.clientX < rect.left || e.clientX > rect.right
			|| e.clientY < rect.top || e.clientY > rect.bottom;
		if (outside) {
			this.hide();
		}
	};

	_handleCancel = (e: Event): void => {
		// Intercept Escape key — close via hide() for consistent behavior
		e.preventDefault();
		this.hide();
	};

	_handlePointerDown = (e: PointerEvent): void => {
		if (!this._isMovable) return;
		if (this._dragging || this._dragHandle) return;

		// Don't initiate drag from interactive elements (buttons, links, inputs)
		const target = e.composedPath()[0] as Element;
		if (target?.closest('button, a, input, select, textarea, [role="button"]')) return;

		// Ignore pointerdown on backdrop (outside dialog rect)
		const dialog = this._dialog;
		if (dialog) {
			const rect = dialog.getBoundingClientRect();
			const onBackdrop = e.clientX < rect.left || e.clientX > rect.right
				|| e.clientY < rect.top || e.clientY > rect.bottom;
			if (onBackdrop) return;
		}

		// Check if pointer is on a drag handle or the dialog itself
		const handle = this._findDragHandle(e);
		if (!handle) return;

		this._dragHandle = handle;
		this._dragPointerId = e.pointerId;

		// Don't capture yet — wait for first pointermove so clicks pass through
		handle.addEventListener('pointermove', this._handlePointerMove as EventListener);
		handle.addEventListener('pointerup', this._handlePointerUp as EventListener);
		handle.addEventListener('pointercancel', this._handlePointerUp as EventListener);
	};

	private _findDragHandle(e: PointerEvent): Element | null {
		// Look for an element with [window-drag-handle] attribute in light DOM
		const handle = this.querySelector('[window-drag-handle]');
		if (handle) {
			// Check if the event originated within the drag handle
			const path = e.composedPath();
			if (path.includes(handle)) return handle;
			return null;
		}
		// No designated handle: the whole dialog is the drag target
		return this._dialog;
	}

	private _handlePointerMove = (e: PointerEvent): void => {
		// Start capture on first movement so clicks still pass through
		if (!this._dragging && this._dragHandle) {
			this._dragging = true;
			e.preventDefault(); // Prevent touch scroll during drag
			try { this._dragHandle.setPointerCapture(this._dragPointerId); } catch { /* pointer already released */ }
			if (this._dragHandle instanceof HTMLElement) {
				this._dragHandle.style.cursor = 'grabbing';
			}

			// Record offset from pointer to top-left corner of the dialog
			const dialog = this._dialog;
			if (dialog) {
				const rect = dialog.getBoundingClientRect();
				this._dragOffsetX = e.clientX - rect.left;
				this._dragOffsetY = e.clientY - rect.top;
			}
		}
		this._didDrag = true;

		// Clamp so at least 44×44px of the grab target stays in the viewport
		const newLeft = e.clientX - this._dragOffsetX;
		const newTop = e.clientY - this._dragOffsetY;
		const clamped = this._clampPosition(newLeft, newTop);
		this.left = `${clamped.left}px`;
		this.top = `${clamped.top}px`;
		this.right = undefined;
		this.bottom = undefined;
	};

	private _handlePointerUp = (e: PointerEvent): void => {
		const handle = this._dragHandle;
		this._dragging = false;
		this._dragHandle = null;
		if (handle) {
			try { handle.releasePointerCapture(e.pointerId); } catch { /* not captured */ }
			if (handle instanceof HTMLElement) {
				handle.style.cursor = this._isMovable ? 'grab' : '';
			}
			handle.removeEventListener('pointermove', this._handlePointerMove as EventListener);
			handle.removeEventListener('pointerup', this._handlePointerUp as EventListener);
			handle.removeEventListener('pointercancel', this._handlePointerUp as EventListener);
		}
	};

	private _removeDragListeners(): void {
		this._dragging = false;
		if (this._dragHandle) {
			if (this._dragHandle instanceof HTMLElement) {
				this._dragHandle.style.cursor = this._isMovable ? 'grab' : '';
			}
			this._dragHandle.removeEventListener('pointermove', this._handlePointerMove as EventListener);
			this._dragHandle.removeEventListener('pointerup', this._handlePointerUp as EventListener);
			this._dragHandle.removeEventListener('pointercancel', this._handlePointerUp as EventListener);
			this._dragHandle = null;
		}
	}

	_detectDragHandle = (): void => {
		const handle = this.querySelector('[window-drag-handle]') as HTMLElement | null;
		this.toggleAttribute('has-drag-handle', handle !== null);

		// Set cursor directly on the handle element since ::slotted
		// cannot reach nested elements (e.g. title bar inside page)
		if (handle) {
			handle.style.cursor = this._isMovable ? 'grab' : '';
		}
	};

	private _handleResize = (): void => {
		this._applyPositionStyles();
		this._clampToViewport();
		this._detectDragHandle();
	};

	private _clampToViewport(): void {
		// After resize, ensure the grab target stays reachable
		if (this.left === undefined || this.top === undefined) return;
		const dialog = this._dialog;
		if (!dialog || !dialog.open) return;

		const dialogRect = dialog.getBoundingClientRect();
		const clamped = this._clampPosition(dialogRect.left, dialogRect.top);

		if (clamped.left !== dialogRect.left || clamped.top !== dialogRect.top) {
			this.left = `${clamped.left}px`;
			this.top = `${clamped.top}px`;
		}
	}

	private _clampPosition(dialogLeft: number, dialogTop: number): { left: number; top: number } {
		const minVisible = 44;
		const dialog = this._dialog;
		const dialogRect = dialog?.getBoundingClientRect();

		// Determine the grab region: drag handle if present, otherwise whole window
		const handle = this._dragHandle ?? this.querySelector('[window-drag-handle]');
		const handleRect = handle?.getBoundingClientRect();

		// Offset of grab region within the dialog
		const grabOffsetX = handleRect && dialogRect ? handleRect.left - dialogRect.left : 0;
		const grabOffsetY = handleRect && dialogRect ? handleRect.top - dialogRect.top : 0;
		const grabWidth = handleRect?.width ?? dialogRect?.width ?? 0;

		// Ensure at least minVisible px of the grab region stays in viewport
		// Left: grabRegion right edge must be at least minVisible into viewport
		const minLeft = -(grabOffsetX + grabWidth - minVisible);
		// Right: grabRegion left edge must be at least minVisible from right edge
		const maxLeft = window.innerWidth - grabOffsetX - minVisible;
		// Top: don't allow grab region above viewport
		const minTop = -grabOffsetY;
		// Bottom: grab region top must be at least minVisible from bottom
		const maxTop = window.innerHeight - grabOffsetY - minVisible;

		return {
			left: Math.max(minLeft, Math.min(dialogLeft, maxLeft)),
			top: Math.max(minTop, Math.min(dialogTop, maxTop)),
		};
	}

	private _handleDismiss = (): void => {
		this.hide();
	};

	override render() {
		return windowTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-window': NDDWindow;
	}
}
