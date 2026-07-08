/**
 * NLDD Design System Hero Component (Lit + TypeScript)
 *
 * Een paginakop met een mediavlak en een tekstpaneel (de main) dat op zes
 * posities kan staan. Alle vlakken zijn rechthoekig.
 *
 * Bij `main-width="full"` staat het mediavlak als losse strook boven of onder
 * het paneel, niet erachter. Op mobiel stapelt de media altijd boven het
 * volle-breedte paneel. Zonder media vult de main het volledige vlak; met
 * `main-background="base"` krijgt dat vlak een rand zodat het zichtbaar blijft
 * op de base-surface.
 *
 * Met `main-background` krijgt het paneel een vlakkleur uit de
 * filled-categories; die leveren een pure witte of zwarte contentkleur mee,
 * zodat componenten met `color="inherit"` (title, rich-text) gegarandeerd
 * contrast houden.
 *
 * @element nldd-hero
 *
 * @attr {'top-left'|'top-right'|'bottom-left'|'bottom-right'|'left'|'right'} main-position -
 *   Positie van het tekstpaneel (default: 'bottom-left'); 'left'/'right' beslaan de volle hoogte
 * @attr {'1/2'|'2/3'|'3/4'|'full'} main-width - Breedte van het paneel (default: '1/2');
 *   'full' maakt een volle boven- of onderstrook en wordt bij 'left'/'right' genegeerd
 * @attr {string} main-background - Vlakkleur van het paneel: 'base' (de base surface)
 *   of een categoriekleur — 'accent' (default) of een rijkskleur zoals
 *   'lintblauw'|'donkerblauw'|'oranje'
 * @attr {string} media-aspect-ratio - Aspect ratio van het mediavlak (CSS-vorm, '16/9' of '16:9');
 *   default '21/9'. Bepaalt op md/lg de hoogte van de hero, op sm de hoogte van het mediavlak
 * @attr {string} media-src - Bron van het mediavlak (alternatief voor de media-slot);
 *   genegeerd zodra de media-slot gevuld is
 * @attr {string} media-srcset - Responsive source set voor media-src
 * @attr {string} media-sizes - Source sizes-hint voor media-src
 * @attr {string} media-alt - Alt-tekst voor media-src; leeg = decoratief
 * @attr {'inherit'|'base'|'tinted'} background - Surface achter de hero (sectie-API)
 * @attr {'inherit'|'light'|'dark'|'inverted'} scheme - Kleurschema (sectie-API)
 * @attr {string} width - Body max-width; 'full' verwijdert de begrenzing (sectie-API)
 * @attr {string} height - Minimale hoogte van de sectie (sectie-API)
 * @attr {string} padding-block - Blokpadding-override, ook per rand en responsief (sectie-API)
 *
 * @slot media - Afbeelding of illustratie (img of nldd-image); vult het vlak en wordt geclipt.
 *   Heeft voorrang op de media-src-attributen. Zet `alt=""` wanneer de afbeelding decoratief is;
 *   geef anders een beschrijvende alt-tekst op.
 * @slot - Inhoud van het tekstpaneel (bijv. nldd-title en nldd-rich-text met color="inherit")
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PageSectionMixin } from '../../../../utilities/page-section-mixin.js';
import { reflectNonDefault } from '../../../../utilities/reflect-non-default.js';
import { heroStyles } from './hero.styles.js';
import { heroTemplate } from './hero.template.js';

export type HeroMainPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right';
export type HeroMainWidth = '1/2' | '2/3' | '3/4' | 'full';
export type HeroMainBackground =
	| 'base' | 'accent'
	| 'lintblauw' | 'donkerblauw' | 'hemelblauw' | 'lichtblauw'
	| 'paars' | 'violet'
	| 'robijnrood' | 'roze' | 'rood' | 'oranje'
	| 'donkergeel' | 'geel'
	| 'donkerbruin' | 'bruin'
	| 'donkergroen' | 'groen' | 'mosgroen' | 'mintgroen';

@customElement('nldd-hero')
export class NLDDHero extends PageSectionMixin(LitElement) {
	static override styles = heroStyles;

	@property({ reflect: true, attribute: 'main-position', converter: reflectNonDefault<HeroMainPosition>('bottom-left') })
	mainPosition: HeroMainPosition = 'bottom-left';

	@property({ reflect: true, attribute: 'main-width', converter: reflectNonDefault<HeroMainWidth>('1/2') })
	mainWidth: HeroMainWidth = '1/2';

	@property({ reflect: true, attribute: 'main-background', converter: reflectNonDefault<HeroMainBackground>('accent') })
	mainBackground: HeroMainBackground = 'accent';

	/** Media aspect-ratio in CSS form ('16/9' or '16:9'); default '21/9'. Drives
	 *  the hero height on md/lg and the media strip height on sm. */
	@property({ type: String, reflect: true, attribute: 'media-aspect-ratio' })
	mediaAspectRatio = '';

	/** Width mode: 'full' (removes body max-width) or any CSS length. */
	@property({ type: String, reflect: true })
	width = '';

	/** Hybrid media source: media-src renders an internal <img>, but a slotted
	 *  media element wins (mirrors nldd-image / nldd-byline). srcset/sizes/alt
	 *  feed that internal img. */
	@property({ type: String, attribute: 'media-src' })
	mediaSrc = '';

	@property({ type: String, attribute: 'media-srcset' })
	mediaSrcset = '';

	@property({ type: String, attribute: 'media-sizes' })
	mediaSizes = '';

	@property({ type: String, attribute: 'media-alt' })
	mediaAlt = '';

	@state()
	_slotHasMedia = false;

	/** Media is present when the slot has content or media-src is set. */
	get _hasMedia(): boolean {
		return this.mediaSrc !== '' || this._slotHasMedia;
	}

	override willUpdate(changed: PropertyValues): void {
		super.willUpdate(changed);
		// The stylesheet only keys off whether media is present.
		this.toggleAttribute('data-has-media', this._hasMedia);
	}

	override updated(changed: PropertyValues): void {
		super.updated(changed);
		if (changed.has('width')) {
			// Same contract as the other page sections: the keyword 'full' is
			// handled by CSS; CSS lengths feed --_max-width inline.
			const w = this.width;
			if (w && w !== 'full' && CSS.supports('max-width', w)) {
				this.style.setProperty('--_max-width', w);
			} else {
				this.style.removeProperty('--_max-width');
			}
		}
		if (changed.has('mediaAspectRatio')) {
			// Accept '16:9' as well as '16/9' (like nldd-image). Clearing the
			// attribute makes Lit set the property to null, so guard with ?? '';
			// the empty value falls back to the stylesheet's --_media-aspect-ratio.
			const ratio = (this.mediaAspectRatio ?? '').replace(':', '/').trim();
			if (ratio && CSS.supports('aspect-ratio', ratio)) {
				this.style.setProperty('--_media-aspect-ratio', ratio);
			} else {
				this.style.removeProperty('--_media-aspect-ratio');
			}
		}
	}

	/** @internal Tracks the media slot so the no-media mode can collapse it. */
	_onMediaSlotChange(e: Event): void {
		const slot = e.target as HTMLSlotElement;
		this._slotHasMedia = slot.assignedElements().length > 0;
	}

	override render() {
		return heroTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-hero': NLDDHero;
	}
}
