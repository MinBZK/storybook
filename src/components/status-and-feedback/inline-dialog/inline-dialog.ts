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
import { customElement, property } from 'lit/decorators.js';
import { inlineDialogStyles } from './inline-dialog.styles.ts';
import { inlineDialogTemplate } from './inline-dialog.template.ts';
import '../../content/icon/icon.ts';
import '../../actions/button-group/button-group.ts';

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

	get _resolvedIconName(): string {
		if (this.variant === 'alert') return 'alert';
		if (this.iconName) return this.iconName;
		return '';
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
