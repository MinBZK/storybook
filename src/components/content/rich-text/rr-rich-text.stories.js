import { html } from 'lit';
import './rr-rich-text.ts';

export default {
	title: 'Components/Content/Rich Text',
	component: 'rr-rich-text',
	tags: ['autodocs'],
};

export const Default = () => html`
	<rr-rich-text>
		<h3>Artikel 1. Algemene begrippen</h3>
		<p>In deze wet en de daarop berustende bepalingen wordt verstaan onder:</p>
		<ul>
			<li><strong>alleenstaande:</strong> de verzekerde die geen partner heeft;</li>
			<li><strong>partner:</strong> de persoon die met de verzekerde een gezamenlijke huishouding voert;</li>
			<li><strong>berekeningsjaar:</strong> het kalenderjaar waarover de zorgtoeslag wordt berekend;</li>
		</ul>
	</rr-rich-text>
`;

export const Headings = () => html`
	<rr-rich-text>
		<h1>Heading 1 — Wet op de zorgtoeslag</h1>
		<h2>Heading 2 — Hoofdstuk 1</h2>
		<h3>Heading 3 — Artikel 1</h3>
		<h4>Heading 4 — Lid 1</h4>
		<h5>Heading 5 — Onderdeel a</h5>
		<h6>Heading 6 — Subonderdeel i</h6>
	</rr-rich-text>
`;

export const Paragraph = () => html`
	<rr-rich-text>
		<h3>Artikel 2. Zorgtoeslag</h3>
		<p>De verzekerde die op de eerste dag van het berekeningsjaar de leeftijd van achttien jaar heeft bereikt, heeft aanspraak op een zorgtoeslag.</p>
		<p>De zorgtoeslag wordt berekend op basis van het toetsingsinkomen van de verzekerde en, indien van toepassing, diens partner.</p>
		<p>Bij algemene maatregel van bestuur worden regels gesteld omtrent de wijze waarop de zorgtoeslag wordt berekend.</p>
	</rr-rich-text>
`;

export const Lists = () => html`
	<rr-rich-text>
		<h3>Ongeordende lijst</h3>
		<p>De volgende documenten zijn vereist:</p>
		<ul>
			<li>Geldig identiteitsbewijs</li>
			<li>Bewijs van inschrijving bij de gemeente</li>
			<li>Recent loonstrookje of jaaropgave</li>
			<li>Bankafschrift van de afgelopen drie maanden</li>
		</ul>
		<h3>Geordende lijst</h3>
		<p>De aanvraag verloopt in de volgende stappen:</p>
		<ol>
			<li>Maak een DigiD aan op digid.nl</li>
			<li>Log in op de website van de Belastingdienst</li>
			<li>Vul het aanvraagformulier volledig in</li>
			<li>Voeg de vereiste documenten toe</li>
			<li>Dien de aanvraag in en bewaar de bevestiging</li>
		</ol>
		<h3>Geneste lijst</h3>
		<ul>
			<li>Hoofdcategorie A
				<ul>
					<li>Subcategorie A1</li>
					<li>Subcategorie A2</li>
				</ul>
			</li>
			<li>Hoofdcategorie B
				<ul>
					<li>Subcategorie B1</li>
					<li>Subcategorie B2</li>
				</ul>
			</li>
		</ul>
	</rr-rich-text>
`;

export const InlineElements = () => html`
	<rr-rich-text>
		<h3>Inline elementen</h3>
		<p>Dit is een paragraaf met <strong>vetgedrukte tekst</strong> en <em>schuingedrukte tekst</em>.</p>
		<p>Hier staat een <a href="#">hyperlink naar een pagina</a> in de tekst.</p>
		<p>Dit is een stukje <code>inline code</code> in een paragraaf.</p>
		<p>Dit is <mark>gemarkeerde tekst</mark> die extra aandacht verdient.</p>
		<p>Combinaties zijn ook mogelijk: <strong>vet en <em>vet schuins</em></strong> of een <a href="#"><strong>vetgedrukte link</strong></a>.</p>
	</rr-rich-text>
`;

export const Blockquote = () => html`
	<rr-rich-text>
		<h3>Artikel 3. Citaat</h3>
		<p>In de memorie van toelichting staat het volgende vermeld:</p>
		<blockquote>
			De zorgtoeslag is bedoeld als tegemoetkoming in de kosten van de zorgverzekering voor mensen met een laag inkomen. Het doel is om de toegankelijkheid van de zorg voor iedereen te waarborgen, ongeacht de financiële situatie van de verzekerde.
		</blockquote>
		<p>Dit citaat vormt de basis voor de interpretatie van artikel 2.</p>
	</rr-rich-text>
`;

export const Figure = () => html`
	<rr-rich-text>
		<h3>Artikel 4. Toelichting met afbeelding</h3>
		<p>Onderstaande afbeelding toont de verdeling van de zorgtoeslag over de verschillende inkomensgroepen.</p>
		<figure>
			<img src="https://placehold.co/800x400" alt="Verdeling zorgtoeslag per inkomensgroep" />
			<figcaption>Figuur 1 — Verdeling van de zorgtoeslag per inkomensgroep (2024)</figcaption>
		</figure>
		<p>Uit de afbeelding blijkt dat de laagste inkomensgroepen de hoogste toeslag ontvangen.</p>
	</rr-rich-text>
`;

export const Table = () => html`
	<rr-rich-text>
		<h3>Artikel 5. Overzicht toeslagbedragen</h3>
		<p>De maximale zorgtoeslag per jaar is afhankelijk van de huishoudsamenstelling:</p>
		<table>
			<tr>
				<th>Huishoudtype</th>
				<th>Maximale toeslag</th>
				<th>Inkomensgrens</th>
			</tr>
			<tr>
				<td>Alleenstaande</td>
				<td>€ 1.234</td>
				<td>€ 38.520</td>
			</tr>
			<tr>
				<td>Toeslagpartners</td>
				<td>€ 2.368</td>
				<td>€ 48.224</td>
			</tr>
			<tr>
				<td>Alleenstaande ouder</td>
				<td>€ 1.234</td>
				<td>€ 38.520</td>
			</tr>
		</table>
	</rr-rich-text>
`;

export const Divider = () => html`
	<rr-rich-text>
		<h3>Artikel 6. Eerste onderdeel</h3>
		<p>De verzekerde heeft recht op zorgtoeslag indien het toetsingsinkomen niet hoger is dan de vastgestelde inkomensgrens.</p>
		<hr>
		<h3>Artikel 7. Tweede onderdeel</h3>
		<p>De zorgtoeslag wordt maandelijks als voorschot uitbetaald op basis van het geschatte jaarinkomen.</p>
	</rr-rich-text>
`;

export const FullArticle = () => html`
	<rr-rich-text>
		<h1>Wet op de zorgtoeslag</h1>
		<h2>Hoofdstuk 1. Algemene bepalingen</h2>
		<h3>Artikel 1. Begrippen</h3>
		<p>In deze wet en de daarop berustende bepalingen wordt verstaan onder:</p>
		<ul>
			<li><strong>alleenstaande:</strong> de verzekerde die geen partner heeft;</li>
			<li><strong>partner:</strong> de persoon die met de verzekerde een gezamenlijke huishouding voert;</li>
			<li><strong>berekeningsjaar:</strong> het kalenderjaar waarover de zorgtoeslag wordt berekend;</li>
			<li><strong>toetsingsinkomen:</strong> het inkomen als bedoeld in artikel 8;</li>
		</ul>
		<h3>Artikel 2. Aanspraak op zorgtoeslag</h3>
		<p>De verzekerde die op de eerste dag van het berekeningsjaar de leeftijd van achttien jaar heeft bereikt, heeft aanspraak op een zorgtoeslag indien:</p>
		<ol>
			<li>hij op die datum in Nederland woont;</li>
			<li>hij verzekerd is op grond van de Zorgverzekeringswet;</li>
			<li>zijn toetsingsinkomen de inkomensgrens niet overschrijdt.</li>
		</ol>
		<blockquote>
			De zorgtoeslag is bedoeld als tegemoetkoming in de kosten van de zorgverzekering voor mensen met een laag inkomen.
		</blockquote>
		<h2>Hoofdstuk 2. Berekening</h2>
		<h3>Artikel 3. Toeslagbedragen</h3>
		<p>De maximale zorgtoeslag per jaar is als volgt:</p>
		<table>
			<tr>
				<th>Huishoudtype</th>
				<th>Maximale toeslag</th>
				<th>Inkomensgrens</th>
			</tr>
			<tr>
				<td>Alleenstaande</td>
				<td>€ 1.234</td>
				<td>€ 38.520</td>
			</tr>
			<tr>
				<td>Toeslagpartners</td>
				<td>€ 2.368</td>
				<td>€ 48.224</td>
			</tr>
		</table>
		<h3>Artikel 4. Meer informatie</h3>
		<p>Voor meer informatie verwijzen wij naar de <a href="#">website van de Belastingdienst</a> of het <a href="#">Besluit zorgtoeslag</a>.</p>
		<figure>
			<img src="https://placehold.co/800x400" alt="Overzicht zorgtoeslag" />
			<figcaption>Figuur 1 — Schematisch overzicht van de zorgtoeslag berekening</figcaption>
		</figure>
	</rr-rich-text>
`;

export const AllSizes = () => html`
	<div style="display: flex; flex-direction: column; gap: 2rem;">
		<div>
			<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">sm (&lt; 641px) — constrained to 393px</p>
			<div style="width: 393px; border: 1px dashed #cbd5e1; padding: 16px;">
				<rr-rich-text>
					<h3>Artikel 1. Algemene begrippen</h3>
					<p>In deze wet wordt verstaan onder:</p>
					<ul>
						<li><strong>alleenstaande:</strong> de verzekerde die geen partner heeft;</li>
						<li><strong>partner:</strong> de persoon die met de verzekerde een gezamenlijke huishouding voert;</li>
					</ul>
				</rr-rich-text>
			</div>
		</div>
		<div>
			<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">md (≥ 641px) — constrained to 834px</p>
			<div style="width: 834px; border: 1px dashed #cbd5e1; padding: 16px;">
				<rr-rich-text>
					<h3>Artikel 1. Algemene begrippen</h3>
					<p>In deze wet wordt verstaan onder:</p>
					<ul>
						<li><strong>alleenstaande:</strong> de verzekerde die geen partner heeft;</li>
						<li><strong>partner:</strong> de persoon die met de verzekerde een gezamenlijke huishouding voert;</li>
					</ul>
				</rr-rich-text>
			</div>
		</div>
		<div>
			<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">lg (≥ 1008px) — constrained to 1200px</p>
			<div style="width: 1200px; border: 1px dashed #cbd5e1; padding: 16px;">
				<rr-rich-text>
					<h3>Artikel 1. Algemene begrippen</h3>
					<p>In deze wet wordt verstaan onder:</p>
					<ul>
						<li><strong>alleenstaande:</strong> de verzekerde die geen partner heeft;</li>
						<li><strong>partner:</strong> de persoon die met de verzekerde een gezamenlijke huishouding voert;</li>
					</ul>
				</rr-rich-text>
			</div>
		</div>
	</div>
`;
AllSizes.storyName = 'All Sizes (Container Query)';
