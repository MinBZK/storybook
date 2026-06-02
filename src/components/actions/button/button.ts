/**
 * Nederlandse Digitale Dienst Button Component (Lit + TypeScript)
 *
 * @element nldd-button
 * @attr {string} variant - Button variant: 'primary' | 'secondary' | 'destructive' | 'accent-filled' | 'accent-transparent' | 'neutral-tinted' | 'neutral-transparent' | 'critical-tinted' | 'critical-transparent'
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset' (ignored when href is set)
 * @attr {boolean} expandable - Whether the button has a icon to indicate it opens a menu or popover
 * @attr {boolean} expanded - Whether the popover/menu controlled by this button is currently open. Forwarded as aria-expanded on the inner button; toggles the is-expanded visual state.
 * @attr {string}  popup-type - Type of popup container this button opens: 'menu' | 'listbox' | 'dialog' | 'tree' | 'grid'. Sets aria-haspopup on the inner button and forces aria-expanded to always be present (true/false) so screen readers know the popup state.
 * @attr {string} width - Width mode: 'full' (stretches to container) or any CSS length (e.g. '240px')
 * @attr {string} text - Button text
 * @attr {boolean} single-line - When true, truncates overflowing text with an ellipsis instead of letting it wrap. Requires the button (or an ancestor) to constrain the width.
 * @attr {string} start-icon - Icon name for the start icon (before text)
 * @attr {string} end-icon - Icon name for the end icon (after text)
 * @attr {string} accessible-label - Accessible label for the button, overrides text for screen readers
 * @attr {string} href - When set, renders an <a> element instead of <button>
 * @attr {string} target - Link target (e.g. '_blank'); only used when href is set
 * @attr {string} rel - Link rel attribute; defaults to 'noopener noreferrer' when target is '_blank'
 *
 * @slot text - Slot for custom button content (e.g. text with inline markup). Used when the text attribute is empty or not set (an empty string counts as "not set", since the attribute and the unset property are indistinguishable). Provide accessible-label when the slotted content isn't plain text.
 * @slot start-icon - Slot for a custom start icon (e.g. custom SVG). Only used when start-icon attribute is not set.
 * @slot end-icon - Slot for a custom end icon (e.g. custom SVG). Only used when end-icon attribute is not set.
 *
 * @fires click - When button is clicked (not fired when disabled)
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonStyles } from './button.styles.js';
import { template } from './button.template.js';
import './../../content/icon/icon.js';
import './../../status-and-feedback/activity-indicator/activity-indicator.js';

type Variant =
	| 'primary'
	| 'secondary'
	| 'destructive'
	| 'accent-filled'
	| 'accent-transparent'
	| 'neutral-tinted'
	| 'neutral-transparent'
	| 'critical-tinted'
	| 'critical-transparent';
type Size = 'xs' | 'sm' | 'md';
type ButtonType = 'button' | 'submit' | 'reset';
type PopupType = 'menu' | 'listbox' | 'dialog' | 'tree' | 'grid';

@customElement('nldd-button')
export class NLDDButton extends LitElement {
	static override styles = buttonStyles;

	// Form-associated so a type="submit"/"reset" button can drive its form.
	// The inner <button> lives in the shadow root and has no form owner across
	// the shadow boundary, so the host element must carry the association.
	static formAssociated = true;
	private _internals = this.attachInternals();

	@property({ type: String, reflect: true })
	variant: Variant = 'neutral-tinted';

	@property({ type: String, reflect: true })
	size: Size = 'md';

	/** Width mode: 'full' (stretch to container) or any CSS length. */
	@property({ type: String, reflect: true })
	width = '';

	@property({ type: Boolean, reflect: true, attribute: 'expandable' })
	expandable = false;

	@property({ type: Boolean, reflect: true })
	expanded = false;

	/**
	 * Type of popup container this button opens. Sets `aria-haspopup` on the
	 * inner button and forces `aria-expanded` to always be present (true/false)
	 * so screen readers can announce both the popup type and its current state.
	 */
	@property({ type: String, reflect: true, attribute: 'popup-type' })
	popupType?: PopupType;

	@property({ type: String, reflect: true })
	type: ButtonType = 'button';

	@property({ type: String })
	popovertarget: string | undefined = undefined;

	/**
	 * Direct element reference to the popover this button invokes — IDL-only
	 * counterpart to `popovertarget` that works across shadow boundaries.
	 * Use this when the popover lives in a different tree (e.g. an
	 * `nldd-menu` reparented to `<body>`) so the browser still recognises
	 * this button as the popover's invoker and excludes it from the popover
	 * light-dismiss algorithm. Set programmatically; not reflected to an
	 * HTML attribute (the attribute form is `popovertarget`, ID-based).
	 */
	@property({ attribute: false })
	popoverTargetElement: Element | null = null;

	/**
	 * Action the browser performs when the button is clicked, mirroring the
	 * standard `popovertargetaction` attribute. Defaults to `'toggle'`. Use
	 * `'show'` when a separate handler owns the close path (e.g. the
	 * consumer toggles the popover programmatically) so the browser's
	 * default action doesn't double-fire.
	 */
	@property({ attribute: false })
	popoverTargetAction: 'toggle' | 'show' | 'hide' = 'toggle';

	/**
	 * Loading state. Shows an activity indicator centred over the (visually
	 * hidden) content, marks the inner control `aria-busy="true"` and blocks
	 * activation — without dropping the control from the tab order (unlike
	 * `disabled`). The content stays laid out so the button keeps its width.
	 *
	 * Activation is blocked by stopping the click (as `disabled` does), so a
	 * `click` listener delegated on an ancestor receives nothing while loading.
	 */
	@property({ type: Boolean, reflect: true })
	loading = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Button text. */
	@property({ type: String })
	text = '';

	@property({ type: Boolean, reflect: true, attribute: 'single-line' })
	singleLine = false;

	/** Icon name for the start icon (before text). When not set, the start-icon slot is used. */
	@property({ type: String, attribute: 'start-icon' })
	startIcon = '';

	/** Icon name for the end icon (after text). When not set, the end-icon slot is used. */
	@property({ type: String, attribute: 'end-icon' })
	endIcon = '';

	/** Accessible label forwarded to the inner <button> or <a>. Use when visible text alone lacks context. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	/** When set, renders an <a> element instead of <button>. */
	@property({ type: String, reflect: true })
	href: string | undefined = undefined;

	/** Link target (e.g. '_blank'). Only used when href is set. */
	@property({ type: String })
	target: string | undefined = undefined;

	/**
	 * Link rel attribute. Only used when href is set.
	 * Defaults to 'noopener noreferrer' when target is '_blank' and rel is not explicitly set.
	 */
	@property({ type: String })
	rel: string | undefined = undefined;

	private _warnedA11y = false;

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('width')) {
			const w = this.width;
			// 'full' switches host to block + 100% via CSS attribute selector.
			// A valid CSS length is applied as inline style.width on the host.
			// In either case the inner button stretches via --_width, so
			// a custom width on the host translates to a wide button instead of
			// leaving the inner shrink-to-fit. Invalid values do nothing.
			const isFull = w === 'full';
			const isValidLength = !!w && !isFull && CSS.supports('width', w);
			this.style.width = isValidLength ? w : '';
			if (isFull || isValidLength) {
				this.style.setProperty('--_width', '100%');
			} else {
				this.style.removeProperty('--_width');
			}
		}
		const isEmpty = !this.text && !this.accessibleLabel;
		if (import.meta.env?.DEV && isEmpty && !this._warnedA11y) {
			this._warnedA11y = true;
			console.warn('<nldd-button>: button has no text or accessible-label. This produces an inaccessible button (WCAG SC 4.1.2).');
		} else if (!isEmpty) {
			this._warnedA11y = false;
		}
	}

	private _handleClick(e: MouseEvent): void {
		if (this.disabled || this.loading) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		// A link button has no form behaviour. Otherwise drive the associated
		// form ourselves: the shadow <button type="submit"|"reset"> can't reach
		// the light-DOM form across the shadow boundary. requestSubmit() runs
		// constraint validation and fires a cancelable submit event, matching a
		// native submit button.
		//
		// Limitation: we call requestSubmit() without a submitter, so
		// SubmitEvent.submitter is null. A form handler that branches on
		// event.submitter to tell multiple submit buttons apart won't see this
		// element. There is no fix via requestSubmit(submitter): the inner shadow
		// <button> is not a form descendant (throws NotFoundError) and this host
		// is not a "submit button" per spec (throws TypeError) — both verified.
		// Consumers that need to distinguish submitters should use a hidden field
		// or separate forms.
		if (this.href) return;
		if (this.type === 'submit') this._internals.form?.requestSubmit();
		else if (this.type === 'reset') this._internals.form?.reset();
	}

	/** Resolves the effective rel value for link rendering. */
	_resolvedRel(): string {
		if (this.rel) return this.rel;
		if (this.target === '_blank') return 'noopener noreferrer';
		return '';
	}

	/**
	 * Delegates focus to the inner `<button>` (or `<a>` when `href` is set), so
	 * consumers can call `buttonEl.focus()` without reaching into shadow DOM.
	 */
	override focus(options?: FocusOptions): void {
		this.shadowRoot?.querySelector<HTMLElement>('.button')?.focus(options);
	}

	override render() {
		return template.call(this, {
			handleClick: this._handleClick.bind(this),
		});
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-button': NLDDButton;
	}
}
