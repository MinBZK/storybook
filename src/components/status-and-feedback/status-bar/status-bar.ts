/**
 * NLDD Design System Status Bar Component (Lit + TypeScript)
 *
 * Een smalle, paginabrede statusbalk (24px) met een diepe achtergrondkleur
 * per variant. Gebruik voor persistente systeemtoestand: een storing, gepland
 * onderhoud, een conceptweergave of een lopende opname. De balk toont bewust
 * geen icoon en ondersteunt alleen tekst — de tekst zelf moet de status
 * benoemen ("Storing: …", "Gepland onderhoud …"), zodat de betekenis niet
 * alleen uit kleur volgt (WCAG 1.4.1).
 *
 * Houd de tekst kort: de balk toont één regel en kapt af met ellipsis, zeker
 * op smallere schermen. Bij een lang bericht met veel informatie hoort alleen
 * de kern in de balk; verwijs voor de rest naar een losse pagina of sheet
 * (bijvoorbeeld via `href` of `button`) waar de gebruiker verder kan lezen.
 *
 * De hele balk kan klikbaar zijn: zet `href` (rendert een `<a>`) of `button`
 * (rendert een `<button>`; luister naar het native `click` event). Zonder
 * beide is de balk statisch. Bij interactie verschijnt een chevron als
 * affordance. Maximaal één actie per balk; meerdere acties of links in
 * lopende tekst horen in nldd-banner.
 *
 * ## ARIA
 * role en aria-live worden automatisch gezet op basis van de variant:
 * - critical → role="alert" (impliceert aria-live="assertive"; onderbreekt de screen reader)
 * - overige  → role="status" aria-live="polite"
 * Niet overschrijfbaar — is een rustiger component nodig, kies dan een ander.
 * Gebruik `critical` alleen voor een echte noodsituatie: role="alert" onderbreekt
 * de screen reader bij élke wijziging van de inhoud, dus plaats er geen tekst in
 * die regelmatig verandert (zoals een aftellende timer).
 *
 * @element nldd-status-bar
 *
 * @attr {'neutral'|'accent'|'success'|'warning'|'critical'} variant - Kleur van de balk (standaard: 'neutral')
 * @attr {string} text - De statustekst (één regel; afgekapt met ellipsis)
 * @attr {string} href - Maakt de hele balk een link (rendert een <a>)
 * @attr {string} target - Link target (bijv. '_blank'); alleen gebruikt bij href
 * @attr {string} rel - Link rel; standaard 'noopener noreferrer' bij target='_blank'
 * @attr {boolean} button - Maakt de hele balk een button; genegeerd als href is gezet
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { statusBarStyles } from './status-bar.styles.js';
import { statusBarTemplate } from './status-bar.template.js';
import '../../content/icon/icon.js';

export type StatusBarVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'critical';

@customElement('nldd-status-bar')
export class NLDDStatusBar extends LitElement {
	static override styles = statusBarStyles;

	@property({ reflect: true, converter: reflectNonDefault<StatusBarVariant>('neutral') })
	variant: StatusBarVariant = 'neutral';

	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	text = '';

	@property({ type: String })
	href = '';

	/** Link target (e.g. '_blank'). Only used when href is set. */
	@property({ type: String })
	target = '';

	/** Link rel attribute. Only used when href is set. */
	@property({ type: String })
	rel = '';

	@property({ type: Boolean, reflect: true })
	button = false;

	override connectedCallback(): void {
		super.connectedCallback();
		// Set role + aria-live here, NOT in the constructor: the custom-element
		// spec forbids a constructor from adding attributes to its element, so
		// document.createElement (the path Vue, React and other createElement-based
		// frameworks use) would throw NotSupportedError and the element would never
		// upgrade. connectedCallback runs at insertion, before the first render, so
		// the live-region role is present from the start; updated() keeps it in sync
		// on later variant changes.
		this._applyAriaForVariant(this.variant);
	}

	/** @internal Auto-secure rel for new-tab links unless the consumer set one. */
	_resolvedRel(): string {
		if (this.rel) return this.rel;
		return this.target === '_blank' ? 'noopener noreferrer' : '';
	}

	override updated(changed: Map<string, unknown>): void {
		if (changed.has('variant')) this._applyAriaForVariant(this.variant);
	}

	private _applyAriaForVariant(variant: StatusBarVariant): void {
		// role + aria-live are component-owned and tied to the variant for correct
		// announcement (critical = assertive alert, else polite status). They are
		// (re)applied unconditionally on every connect/variant change, NOT guarded
		// behind "consumer hasn't set role" — deliberately, since the docs state they
		// are not consumer-overridable: a wrong role here (e.g. presentation on a
		// critical alert) would silently break the a11y contract.
		if (variant === 'critical') {
			this.setAttribute('role', 'alert');
			this.removeAttribute('aria-live');
		} else {
			this.setAttribute('role', 'status');
			this.setAttribute('aria-live', 'polite');
		}
		// The bar is announced as one unit; without aria-atomic some screen
		// readers announce only the changed subtree on text updates.
		this.setAttribute('aria-atomic', 'true');
	}

	override render() {
		return statusBarTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-status-bar': NLDDStatusBar;
	}
}
