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
	| 'none'
	| 'md'
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


	@property({ type: String, reflect: true, attribute: 'padding' })
	padding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-inline' })
	paddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-block' })
	paddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-top' })
	paddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-right' })
	paddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-bottom' })
	paddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-left' })
	paddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding' })
	smPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-inline' })
	smPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-block' })
	smPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-top' })
	smPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-right' })
	smPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-bottom' })
	smPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-left' })
	smPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding' })
	mdPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-inline' })
	mdPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-block' })
	mdPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-top' })
	mdPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-right' })
	mdPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-bottom' })
	mdPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-left' })
	mdPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding' })
	lgPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-inline' })
	lgPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-block' })
	lgPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-top' })
	lgPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-right' })
	lgPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-bottom' })
	lgPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-left' })
	lgPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-sm-padding' })
	layoutAreaSmPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-sm-padding-inline' })
	layoutAreaSmPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-sm-padding-block' })
	layoutAreaSmPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-sm-padding-top' })
	layoutAreaSmPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-sm-padding-right' })
	layoutAreaSmPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-sm-padding-bottom' })
	layoutAreaSmPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-sm-padding-left' })
	layoutAreaSmPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-md-padding' })
	layoutAreaMdPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-md-padding-inline' })
	layoutAreaMdPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-md-padding-block' })
	layoutAreaMdPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-md-padding-top' })
	layoutAreaMdPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-md-padding-right' })
	layoutAreaMdPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-md-padding-bottom' })
	layoutAreaMdPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-md-padding-left' })
	layoutAreaMdPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-lg-padding' })
	layoutAreaLgPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-lg-padding-inline' })
	layoutAreaLgPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-lg-padding-block' })
	layoutAreaLgPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-lg-padding-top' })
	layoutAreaLgPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-lg-padding-right' })
	layoutAreaLgPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-lg-padding-bottom' })
	layoutAreaLgPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'layout-area-lg-padding-left' })
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
