/**
 * Nederlandse Digitale Dienst Link Component (Lit + TypeScript)
 *
 * Hyperlink component met twee modi:
 *
 * 1. **Standalone (sized)** — set `size="xs"|"sm"|"md"|"lg"` voor menu's,
 *    actiegebieden of overzichten. Vaste tekstgrootte, `display: inline-flex`
 *    met `gap` voor icon-spacing.
 *
 * 2. **Inline (inherit)** — laat `size` weg of zet expliciet `size="inherit"`.
 *    De link erft `font-size`, `line-height` en `font-family` van zijn
 *    omgeving. Tekst wraps natuurlijk over regels (`display: inline`). Icons
 *    werken ook hier; de natuurlijke whitespace tussen icon en tekst zorgt
 *    voor de spacing.
 *
 * Voor links in CMS/markdown-output (waar de `<a>` als HTML binnenkomt) blijft
 * `<nldd-rich-text>` met raw `<a>` de aangewezen route.
 *
 * @element nldd-link
 * @attr {string} href - Link doel
 * @attr {string} target - Link target (bijv. '_blank'); stelt rel automatisch bij. Bij '_blank' voegt de link een visueel verborgen "Opent in nieuw tabblad"-melding toe voor screenreaders (WCAG 2.1 SC 3.2.2).
 * @attr {string} rel - Link rel attribuut; standaard 'noopener noreferrer' bij target='_blank'
 * @attr {string} size - Tekstgrootte: 'xs' | 'sm' | 'md' | 'lg' | 'inherit'. Leeg = inherit.
 * @attr {string} text - Link tekst (alternatief voor default slot)
 * @attr {string} start-icon - Icoon voor de tekst
 * @attr {string} end-icon - Icoon na de tekst
 * @attr {string} accessible-label - Toegankelijk label voor screen readers
 * @attr {boolean} disabled - Uitgeschakelde staat
 * @attr {object} translations - Overschrijf vertaalsleutels (bijv. de "Opent in nieuw tabblad"-melding); niet-gezette sleutels vallen terug op Nederlands.
 *
 * @slot - Link tekst (alternatief voor text attribuut)
 * @slot start-icon - Custom icoon voor de tekst
 * @slot end-icon - Custom icoon na de tekst
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { linkStyles } from './link.styles.js';
import { template } from './link.template.js';
import { withTranslations } from '../../../utilities/with-translations.js';
import { nlddLinkTranslations } from './link.i18n.js';
import './../../content/icon/icon.js';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'inherit';

@customElement('nldd-link')
export class NLDDLink extends withTranslations(LitElement, nlddLinkTranslations) {
	static override styles = linkStyles;

	@property({ type: String, reflect: true })
	href: string | undefined = undefined;

	@property({ type: String })
	target: string | undefined = undefined;

	@property({ type: String })
	rel: string | undefined = undefined;

	@property({ type: String, reflect: true })
	size?: Size;

	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	text = '';

	@property({ type: String, attribute: 'start-icon' })
	startIcon = '';

	@property({ type: String, attribute: 'end-icon' })
	endIcon = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	private _handleClick(e: MouseEvent): void {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	/** @internal */
	_resolvedRel(): string {
		const base = this.rel ?? '';
		if (this.target !== '_blank') return base;
		const parts = new Set(base.split(/\s+/).filter(Boolean));
		parts.add('noopener');
		parts.add('noreferrer');
		return [...parts].join(' ');
	}

	override render() {
		return template.call(this, {
			handleClick: this._handleClick.bind(this),
		});
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-link': NLDDLink;
	}
}
