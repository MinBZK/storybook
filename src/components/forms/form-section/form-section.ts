/**
 * Nederlandse Digitale Dienst Form Section Component
 *
 * Plain custom element (extends HTMLElement, no Lit) — light-DOM render
 * lost een NVDA + Firefox a11y-bug op waar shadow-DOM <fieldset> + <legend>
 * niet betrouwbaar als group-label aangekondigd worden voor slotted
 * controls. Native fieldset/legend in light DOM werkt correct over alle
 * AT/browser-combinaties.
 *
 * **Differs from shadow components:**
 * - Geen shadowRoot — alle children leven in light DOM (binnen het
 *   gerenderde <fieldset>).
 * - Geen Lit — pure HTMLElement met handmatige DOM-mutation.
 * - **Vereist global stylesheet import** — `dist/css/form-section.css`
 *   (of `global.css`). Form-section heeft geen shadow stylesheet.
 *
 * Renders to:
 *
 *     <nldd-form-section>
 *         <fieldset class="form-section">
 *             <legend class="form-section__header">
 *                 <span class="form-section__title">Title</span>
 *                 <span class="form-section__subtitle">Subtitle</span>
 *             </legend>
 *             <div class="form-section__main">
 *                 [user's children]
 *             </div>
 *         </fieldset>
 *     </nldd-form-section>
 *
 * **Accessibility note**: de title rendert als `<legend>`. Dat is
 * semantisch een **groep-label**, geen heading. Screenreaders
 * kondigen 't aan wanneer de gebruiker in de fieldset komt, maar
 * gebruikers die met de H-toets door headings springen slaan 'm
 * over. Visueel lijkt 't op een heading; gebruik dit component dus
 * voor *form-grouping*, niet als pagina-structuur. Voor echte
 * page-headings: gebruik een apart heading-element boven het form.
 *
 * **Supporting-text lengte**: de subtitle staat als `<span>` binnen
 * de `<legend>` zodat SR 'm meeleest als group label. Bijwerking: bij
 * elke field-entry binnen de sectie wordt de hele legend (titel +
 * subtitel) opnieuw uitgesproken. Houd `supporting-text` daarom kort
 * (richtlijn: ≤ ~80 tekens) en gebruik 'm voor groep-introductie
 * ("Vul je adresgegevens in"), niet voor uitgebreide instructies.
 * Voor langere uitleg op een specifiek veld: gebruik
 * `nldd-form-field-help-text` op dat veld.
 *
 *     <nldd-form>
 *         <nldd-form-section text="Persoonsgegevens" supporting-text="Vul je gegevens in.">
 *             <nldd-form-field label="Voornaam">...</nldd-form-field>
 *             <nldd-form-field label="Achternaam">...</nldd-form-field>
 *         </nldd-form-section>
 *
 *         <nldd-form-section text="Adres">
 *             <nldd-form-field label="Straat">...</nldd-form-field>
 *         </nldd-form-section>
 *
 *         <nldd-form-actions>...</nldd-form-actions>
 *     </nldd-form>
 *
 * @element nldd-form-section
 *
 * @attr {string} text - Heading-tekst (gerenderd in `<legend>`).
 * @attr {string} supporting-text - Korte beschrijving onder de heading. Houd ≤ ~80 tekens (zie a11y-note).
 *
 * Children van de form-section worden in `.form-section__main` geplaatst.
 */

const FIELDSET_CLASS = 'form-section';
const HEADER_CLASS = 'form-section__header';
const TITLE_CLASS = 'form-section__title';
const SUBTITLE_CLASS = 'form-section__subtitle';
const MAIN_CLASS = 'form-section__main';

export class NLDDFormSection extends HTMLElement {
	static get observedAttributes(): string[] {
		return ['text', 'supporting-text'];
	}

	private _fieldset: HTMLFieldSetElement | null = null;
	private _legend: HTMLLegendElement | null = null;
	private _main: HTMLDivElement | null = null;
	private _observer: MutationObserver | null = null;
	private _hasWarnedNoLabel = false;

	get text(): string {
		return this.getAttribute('text') ?? '';
	}
	set text(value: string) {
		if (value) this.setAttribute('text', value);
		else this.removeAttribute('text');
	}

	get supportingText(): string {
		return this.getAttribute('supporting-text') ?? '';
	}
	set supportingText(value: string) {
		if (value) this.setAttribute('supporting-text', value);
		else this.removeAttribute('supporting-text');
	}

	connectedCallback(): void {
		// One-time setup: build fieldset/legend/main and migrate children.
		// Subsequent connect cycles (e.g. when nldd-form moves us into its
		// inner <form>) skip this block but still re-attach the observer.
		if (!this._fieldset) this._buildStructure();
		this._renderLegend();
		this._warnIfNoLabel();

		// (Re-)attach observer on every connect to catch dynamically added
		// children (which would otherwise land outside the inner fieldset).
		if (!this._observer) {
			const main = this._main;
			this._observer = new MutationObserver(mutations => {
				for (const m of mutations) {
					if (m.target !== this) continue;
					m.addedNodes.forEach(node => {
						if (node === this._fieldset) return;
						main?.appendChild(node);
					});
				}
			});
			this._observer.observe(this, { childList: true });
		}
	}

	disconnectedCallback(): void {
		this._observer?.disconnect();
		this._observer = null;
	}

	attributeChangedCallback(name: string): void {
		if (name === 'text' || name === 'supporting-text') {
			// Pas re-renderen na _buildStructure (eerste connect).
			if (this._legend) {
				this._renderLegend();
				this._warnIfNoLabel();
			}
		}
	}

	private _warnIfNoLabel(): void {
		// Dev-only — productieconsoles van end-users blijven schoon.
		if (!import.meta.env?.DEV) return;
		if (this._hasWarnedNoLabel) return;
		if (this.text || this.supportingText) return;
		this._hasWarnedNoLabel = true;
		console.warn('<nldd-form-section>: No `text` or `supporting-text` provided. The <fieldset> has no accessible name and screen readers may announce it as just "group" (Chrome) or nothing (Firefox). Set `text` for a group label, or document this section as purely visual grouping.');
	}

	private _buildStructure(): void {
		// Save user's existing children (light-DOM at construction time).
		const initialChildren = Array.from(this.childNodes);

		// Create structure: <fieldset><legend/><div.main/></fieldset>
		const fieldset = document.createElement('fieldset');
		fieldset.className = FIELDSET_CLASS;

		const legend = document.createElement('legend');
		legend.className = HEADER_CLASS;

		const main = document.createElement('div');
		main.className = MAIN_CLASS;

		fieldset.append(legend, main);

		// Move children into main
		for (const child of initialChildren) {
			main.appendChild(child);
		}

		this.appendChild(fieldset);

		this._fieldset = fieldset;
		this._legend = legend;
		this._main = main;
	}

	private _renderLegend(): void {
		const legend = this._legend;
		if (!legend) return;

		const text = this.text;
		const supportingText = this.supportingText;
		const hasContent = !!text || !!supportingText;

		// Clear existing legend content.
		legend.textContent = '';

		if (text) {
			const titleSpan = document.createElement('span');
			titleSpan.className = TITLE_CLASS;
			titleSpan.textContent = text;
			legend.appendChild(titleSpan);
		}

		if (supportingText) {
			const subtitleSpan = document.createElement('span');
			subtitleSpan.className = SUBTITLE_CLASS;
			subtitleSpan.textContent = supportingText;
			legend.appendChild(subtitleSpan);
		}

		// Hide legend completely (incl. its space) if empty so .form-section__main
		// becomes :first-child and z'n margin-top collapseert via CSS.
		//
		// A11y-implicatie: zonder legend heeft de <fieldset> geen accessible
		// name. SR-gedrag varieert (Chrome: "group", Firefox: niets). Dat is
		// een bewuste keuze — een form-section kan ook puur als visueel-
		// grouping (divider + padding) gebruikt worden zonder heading. Wil je
		// een SR-naam zonder zichtbare title? Wrap dan het form in een
		// nldd-form-section MET text, of gebruik aria-labelledby op de
		// individuele velden.
		legend.hidden = !hasContent;
	}
}

if (!customElements.get('nldd-form-section')) {
	customElements.define('nldd-form-section', NLDDFormSection);
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-form-section': NLDDFormSection;
	}
}
