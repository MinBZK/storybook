/**
 * Nederlandse Digitale Dienst Dialog Component (Lit + TypeScript)
 *
 * An inline status component for empty state, confirmations and feedback.
 * Fills the container and has no minimum width.
 *
 * @element nldd-inline-dialog
 *
 * @attr {'alert'|'success'} variant - Semantic variant; 'alert' or 'success' forces a matching icon and color
 * @attr {'md'|'lg'} size          - Typography size: 'md' (default) keeps body-md text + body-sm supporting; 'lg' bumps both up a step.
 * @attr {string}  icon            - Name of the nldd-icon icon above the text; absent when not set. Ignored when variant is set.
 * @attr {string}  icon-color      - 'secondary' | 'accent' | 'critical' | 'warning' | 'success'. Overrides the default and variant icon color.
 * @attr {string}  text            - Main text (heading or paragraph, depending on heading-level)
 * @attr {string}  supporting-text - Supporting text below the heading
 * @attr {1|2|3|4|5|6} heading-level - Renders text as h1–h6; absent renders a p
 *
 * @slot         - Optional custom content between text and actions
 * @slot actions - nldd-button elements, wrapped in nldd-button-group (max 3)
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { inlineDialogStyles } from './inline-dialog.styles.js';
import { inlineDialogTemplate } from './inline-dialog.template.js';
import '../../content/icon/icon.js';
import '../../actions/button-group/button-group.js';

export type InlineDialogVariant = 'alert' | 'success';
export type InlineDialogSize = 'md' | 'lg';
export type InlineDialogIconColor = 'secondary' | 'accent' | 'critical' | 'warning' | 'success';

@customElement('nldd-inline-dialog')
export class NLDDInlineDialog extends LitElement {
	static override styles = inlineDialogStyles;

	@property({ reflect: true, converter: reflectNonDefault<InlineDialogVariant | ''>('') })
	variant: InlineDialogVariant | '' = '';

	@property({ reflect: true, converter: reflectNonDefault<InlineDialogSize>('md') })
	size: InlineDialogSize = 'md';

	@property({ type: String, reflect: true })
	icon = '';

	@property({ type: String, reflect: true, attribute: 'icon-color' })
	iconColor: InlineDialogIconColor | '' = '';

	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	text = '';

	@property({ reflect: true, attribute: 'supporting-text', converter: reflectNonDefault<string>('') })
	supportingText = '';

	@property({ type: Number, reflect: true, attribute: 'heading-level' })
	headingLevel: 1 | 2 | 3 | 4 | 5 | 6 | null = null;

	@state()
	_hasContent = false;

	@state()
	_hasActions = false;

	get _resolvedIconName(): string {
		if (this.variant === 'alert') return 'alert';
		if (this.variant === 'success') return 'success';
		if (this.icon) return this.icon;
		return '';
	}

	override firstUpdated() {
		const contentSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		const actionsSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="actions"]');
		// Check assignedNodes (not assignedElements) so that plain text content
		// — e.g. `<nldd-inline-dialog>Some note</nldd-inline-dialog>` — is also
		// detected. Whitespace-only text nodes (formatting indentation) are
		// filtered out.
		const hasMeaningfulContent = (slot: HTMLSlotElement | undefined | null): boolean => {
			const nodes = slot?.assignedNodes({ flatten: true }) ?? [];
			return nodes.some(n =>
				n.nodeType === Node.ELEMENT_NODE
				|| (n.nodeType === Node.TEXT_NODE && (n.textContent?.trim() ?? '') !== ''),
			);
		};
		const syncContent = () => { this._hasContent = hasMeaningfulContent(contentSlot); };
		const syncActions = () => { this._hasActions = hasMeaningfulContent(actionsSlot); };
		contentSlot?.addEventListener('slotchange', syncContent);
		actionsSlot?.addEventListener('slotchange', syncActions);
		// Defer the initial sync out of the update lifecycle: setting reactive
		// state synchronously here re-enters the current update and triggers Lit's
		// change-in-update warning. A microtask runs after this update completes,
		// so the follow-up render (when a slot has content) is scheduled cleanly.
		// slotchange handles every later change; this covers the initial state.
		// SSR caveat (no SSR today): on hydration the first paint can land before this
		// microtask drains, briefly showing the empty-slot state. If SSR is adopted,
		// move this into willUpdate (or a second requestUpdate in firstUpdated).
		queueMicrotask(() => {
			syncContent();
			syncActions();
		});
	}

	override render() {
		return inlineDialogTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-inline-dialog': NLDDInlineDialog;
	}
}
