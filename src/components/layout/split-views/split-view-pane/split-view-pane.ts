/**
 * Nederlandse Digitale Dienst Split View Pane Component (Lit + TypeScript)
 *
 * A simple pane container for use inside split views.
 * The split view automatically sets context: whether a back button should be shown.
 *
 * The consumer sets `has-content` to indicate the pane has content.
 * The consumer sets `back-text` on the `nldd-top-title-bar` inside the pane.
 * The split view sets `hide-back` when the back button is not applicable.
 * The pane automatically hides the back button via CSS when `hide-back` is active.
 *
 * ## Background color
 * The pane sets `--context-parent-background-color` which cascades down to all descendants.
 * Set `background="tinted"` on a pane to give it a tinted background independently of sibling panes.
 * Descendants such as `nldd-page` read `--context-parent-background-color` automatically.
 *
 * @element nldd-split-view-pane
 *
 * @attr {boolean} has-content - The pane has content (default: false)
 * @attr {boolean} hide-back   - Hide the back button (set automatically by the split view)
 * @attr {'inherit'|'default'|'tinted'} background      - Use a tinted background color (cascades to descendants)
 *
 * @slot - Pane content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { splitViewPaneStyles } from './split-view-pane.styles.js';
import { splitViewPaneTemplate } from './split-view-pane.template.js';

@customElement('nldd-split-view-pane')
export class NLDDSplitViewPane extends LitElement {
	static override styles = splitViewPaneStyles;

	@property({ type: Boolean, reflect: true, attribute: 'has-content' })
	hasContent = false;

	@property({ type: Boolean, reflect: true, attribute: 'hide-back' })
	hideBack = false;

	@property({ type: String, reflect: true })
	background: 'inherit' | 'default' | 'tinted' = 'inherit';

	override connectedCallback() {
		super.connectedCallback();
		this.style.containerType = 'inline-size';
		this.style.containerName = 'layout-area';
	}

	override render() {
		return splitViewPaneTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-split-view-pane': NLDDSplitViewPane;
	}
}
