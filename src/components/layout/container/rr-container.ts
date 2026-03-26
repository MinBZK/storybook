/**
 * RegelRecht Container Component (Lit + TypeScript)
 *
 * A generic container with configurable padding.
 * Padding can be set for all sides, per axis (inline/block),
 * or per individual side (top, right, bottom, left).
 * More specific settings take precedence: sides > axis > all sides.
 *
 * Responsive padding is supported via viewport breakpoints (sm-, md-, lg-)
 * and container queries (layout-area-sm-, layout-area-md-, layout-area-lg-).
 * Cascade order: base → viewport breakpoints → container queries.
 *
 * @element rr-container
 *
 * @attr {string} padding              - Padding for all sides
 * @attr {string} padding-inline       - Padding for left and right
 * @attr {string} padding-block        - Padding for top and bottom
 * @attr {string} padding-top          - Padding for top
 * @attr {string} padding-right        - Padding for right
 * @attr {string} padding-bottom       - Padding for bottom
 * @attr {string} padding-left         - Padding for left
 * @attr {string} sm-padding           - Padding for all sides at sm viewport breakpoint
 * @attr {string} md-padding           - Padding for all sides at md viewport breakpoint
 * @attr {string} lg-padding           - Padding for all sides at lg viewport breakpoint
 * @attr {string} layout-area-sm-padding - Padding for all sides at sm container size
 * @attr {string} layout-area-md-padding - Padding for all sides at md container size
 * @attr {string} layout-area-lg-padding - Padding for all sides at lg container size
 * (and equivalents for all padding directions)
 *
 * @slot - Container content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { containerStyles } from './rr-container.styles.ts';
import { containerTemplate } from './rr-container.template.ts';

type PaddingSize =
	| '0'
	| '2'
	| '4'
	| '6'
	| '8'
	| '10'
	| '12'
	| '16'
	| '20'
	| '24'
	| '28'
	| '32'
	| '40'
	| '44'
	| '48'
	| '56'
	| '64'
	| '80'
	| '96';

@customElement('rr-container')
export class RRContainer extends LitElement {
	static override styles = containerStyles;


	@property({ type: String, reflect: true })
	padding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	paddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	paddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	paddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	paddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	paddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	paddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	smPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	smPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	smPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	smPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	smPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	smPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	smPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	mdPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	mdPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	mdPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	mdPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	mdPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	mdPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	mdPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	lgPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	lgPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	lgPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	lgPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	lgPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	lgPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	lgPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaSmPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaSmPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaSmPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaSmPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaSmPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaSmPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaSmPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaMdPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaMdPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaMdPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaMdPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaMdPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaMdPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaMdPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaLgPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaLgPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaLgPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaLgPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaLgPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaLgPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	layoutAreaLgPaddingLeft: PaddingSize | undefined = undefined;

	override render() {
		return containerTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-container': RRContainer;
	}
}
