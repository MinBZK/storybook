/**
 * NLDD Design System Hero Component (Lit + TypeScript)
 *
 * Een paginakop volgens de rijkshuisstijl-vormtaal: een mediavlak met exact
 * één afgeronde hoek (radius afgeleid van de lintbreedte) en een tekstpaneel
 * (de main) dat op zes posities kan staan. De radius is van het component en
 * niet instelbaar: 1,5X lintbreedte op smalle containers, 2X op md/lg.
 *
 * De media-hoek volgt automatisch uit `main-position` (zie de tabel in de
 * stories) en is per geval te overschrijven met `media-corner-position`. Het paneel
 * krijgt zijn eigen afgeronde hoek — op halve maat, zodat de tekst niet
 * tegen de rand komt — op de hoek die diagonaal het mediavlak in wijst.
 * Beslaat het paneel een volledige rand (`left`/`right`, `main-width="full"`
 * of de gestapelde mobiele weergave), dan is het hoekloos. Bij
 * `main-width="full"` staat het mediavlak als losse strook boven of onder het
 * paneel — niet erachter — en schuift de media-hoek mee naar de buitenrand van
 * die strook (weg van het paneel), zodat hij zichtbaar blijft. Op mobiel zit de
 * media-hoek altijd aan de bovenkant (een onderhoek klapt naar zijn
 * bovenhoek) en is hij een halve stap groter (1,5X). Zonder media vult de
 * main het volledige vlak; met `main-background="base"` krijgt het vlak dan
 * een rand op de zijden die de afgeronde hoek raken, zoals blockquote.
 *
 * Met `main-background` krijgt het paneel een vlakkleur uit de
 * filled-categories; die leveren een pure witte of zwarte contentkleur mee,
 * zodat componenten met `color="inherit"` (title, rich-text) gegarandeerd
 * contrast houden.
 *
 * Per de rijkshuisstijl wordt de radius nooit geanimeerd.
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
 * @attr {'auto'|'top-left'|'top-right'|'bottom-left'|'bottom-right'} media-corner-position -
 *   Afgeronde hoek van het mediavlak; 'auto' (default) volgt main-position
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
import { heroStyles } from './hero.styles.js';
import { heroTemplate } from './hero.template.js';

export type HeroMainPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right';
export type HeroCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type HeroMainWidth = '1/2' | '2/3' | '3/4' | 'full';
export type HeroMainBackground =
	| 'base' | 'accent'
	| 'lintblauw' | 'donkerblauw' | 'hemelblauw' | 'lichtblauw'
	| 'paars' | 'violet'
	| 'robijnrood' | 'roze' | 'rood' | 'oranje'
	| 'donkergeel' | 'geel'
	| 'donkerbruin' | 'bruin'
	| 'donkergroen' | 'groen' | 'mosgroen' | 'mintgroen';

/* The media corner per panel position — a curated lookup straight from the
 * rijkshuisstijl examples, not a formula. */
const AUTO_CORNER: Record<HeroMainPosition, HeroCorner> = {
	'bottom-left': 'top-right',
	'bottom-right': 'bottom-left',
	'top-left': 'top-right',
	'top-right': 'top-left',
	'left': 'top-right',
	'right': 'top-left',
};

/* The panel's own single corner: the one pointing diagonally into the media. */
const MAIN_CORNER: Record<HeroMainPosition, HeroCorner | null> = {
	'bottom-left': 'top-right',
	'bottom-right': 'top-left',
	'top-left': 'bottom-right',
	'top-right': 'bottom-left',
	'left': null,
	'right': null,
};

@customElement('nldd-hero')
export class NLDDHero extends PageSectionMixin(LitElement) {
	static override styles = heroStyles;

	@property({ type: String, reflect: true, attribute: 'main-position' })
	mainPosition: HeroMainPosition = 'bottom-left';

	@property({ type: String, reflect: true, attribute: 'main-width' })
	mainWidth: HeroMainWidth = '1/2';

	@property({ type: String, reflect: true, attribute: 'main-background' })
	mainBackground: HeroMainBackground = 'accent';

	@property({ type: String, reflect: true, attribute: 'media-corner-position' })
	mediaCornerPosition: 'auto' | HeroCorner = 'auto';

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
		// Resolve the corner logic once per update and expose it as host data
		// attributes the stylesheet keys off — keeps the per-corner CSS flat.
		// mainPosition is typed, but HTML attributes are not — fall back to the
		// default for an unknown or empty value (the design-system convention).
		const position = AUTO_CORNER[this.mainPosition] ? this.mainPosition : 'bottom-left';
		const edge = position === 'left' || position === 'right';
		let mediaCorner: HeroCorner = this.mediaCornerPosition !== 'auto'
			? this.mediaCornerPosition
			: AUTO_CORNER[position];
		// At main-width="full" the media stacks above or below the full-width
		// panel instead of sitting behind it, so its rounded corner must land on
		// the strip's outer edge to stay visible: a bottom panel puts the media
		// (and its corner) on top, a top panel puts it below. Keep the horizontal
		// side, force the vertical side away from the panel — even when the corner
		// was set explicitly, mirroring the mobile rule. The full-height left/right
		// panels ignore main-width="full", so they keep their curated corner.
		if (this.mainWidth === 'full' && this._hasMedia && !edge) {
			const panelAtTop = position === 'top-left' || position === 'top-right';
			const side = mediaCorner.endsWith('left') ? 'left' : 'right';
			mediaCorner = `${panelAtTop ? 'bottom' : 'top'}-${side}`;
		}
		this.setAttribute('data-media-corner', mediaCorner);
		const mainCorner = (!this._hasMedia || edge || this.mainWidth === 'full')
			? null
			: MAIN_CORNER[position];
		this.setAttribute('data-main-corner', mainCorner ?? 'none');
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
