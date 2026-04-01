/**
 * RegelRecht Dialog Component (Lit + TypeScript)
 *
 * An inline status component for empty state, confirmations and feedback.
 * Fills the container and has no minimum width.
 *
 * @element rr-dialog
 *
 * @attr {'alert'} variant       - Semantic variant; 'alert' forces icon-name="alert" and colors the icon
 * @attr {string}  icon-name     - Name of the rr-icon icon above the text; absent when not set. Ignored when variant is set.
 * @attr {string}  text          - Main text (heading or paragraph, depending on heading-level)
 * @attr {string}  supporting-text - Supporting text below the heading
 * @attr {1|2|3|4|5|6} heading-level - Renders text as h1–h6; absent renders a p
 *
 * @slot         - Optional custom content between text and actions
 * @slot actions - rr-button elements, wrapped in rr-button-group (max 3)
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dialogStyles } from './rr-dialog.styles.ts';
import { dialogTemplate } from './rr-dialog.template.ts';
import '../../content/icon/rr-icon.ts';
import '../../actions/button-group/rr-button-group.ts';

export type DialogVariant = 'alert';

@customElement('rr-dialog')
export class RRDialog extends LitElement {
	static override styles = dialogStyles;

	@property({ type: String, reflect: true })
	variant: DialogVariant | '' = '';

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
		return dialogTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-dialog': RRDialog;
	}
}
