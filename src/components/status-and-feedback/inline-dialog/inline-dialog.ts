/**
 * Nederlandse Digitale Dienst Dialog Component (Lit + TypeScript)
 *
 * An inline status component for empty state, confirmations and feedback.
 * Fills the container and has no minimum width.
 *
 * @element nldd-inline-dialog
 *
 * @attr {'alert'} variant       - Semantic variant; 'alert' forces icon-name="alert" and colors the icon
 * @attr {string}  icon-name     - Name of the nldd-icon icon above the text; absent when not set. Ignored when variant is set.
 * @attr {string}  text          - Main text (heading or paragraph, depending on heading-level)
 * @attr {string}  supporting-text - Supporting text below the heading
 * @attr {1|2|3|4|5|6} heading-level - Renders text as h1–h6; absent renders a p
 *
 * @slot         - Optional custom content between text and actions
 * @slot actions - nldd-button elements, wrapped in nldd-button-group (max 3)
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { inlineDialogStyles } from './inline-dialog.styles.js';
import { inlineDialogTemplate } from './inline-dialog.template.js';
import '../../content/icon/icon.js';
import '../../actions/button-group/button-group.js';

export type InlineDialogVariant = 'alert';

@customElement('nldd-inline-dialog')
export class NLDDInlineDialog extends LitElement {
	static override styles = inlineDialogStyles;

	@property({ type: String, reflect: true })
	variant: InlineDialogVariant | '' = '';

	@property({ type: String, reflect: true, attribute: 'icon-name' })
	iconName = '';

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: String, reflect: true, attribute: 'supporting-text' })
	supportingText = '';

	@property({ type: Number, reflect: true, attribute: 'heading-level' })
	headingLevel: 1 | 2 | 3 | 4 | 5 | 6 | null = null;

	@state()
	_hasContent = false;

	@state()
	_hasActions = false;

	get _resolvedIconName(): string {
		if (this.variant === 'alert') return 'alert';
		if (this.iconName) return this.iconName;
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
		syncContent();
		syncActions();
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
