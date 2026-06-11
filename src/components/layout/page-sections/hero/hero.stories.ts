import { html } from 'lit';
import './hero.js';
import '../../../content/title/title.js';
import '../../../content/rich-text/rich-text.js';
import '../../../actions/button/button.js';
import '../../spacer/spacer.js';

const MEDIA = 'sample-images/butterfly-1200.jpg';

/**
 * Een paginakop volgens de rijkshuisstijl-vormtaal: een mediavlak met exact
 * één afgeronde hoek (1,5X lintbreedte op smalle containers, 2X op md/lg) en
 * een tekstpaneel op zes mogelijke posities. De media-hoek volgt automatisch
 * uit `main-position`:
 *
 * | `main-position` | media-hoek | panelhoek |
 * | --- | --- | --- |
 * | bottom-left (default) | rechtsboven | rechtsboven |
 * | bottom-right | linksonder | linksboven |
 * | top-left | rechtsboven | rechtsonder |
 * | top-right | linksboven | linksonder |
 * | left / right (volle hoogte) | rechtsboven / linksboven | geen |
 *
 * Met `media-corner` is de media-hoek per geval te overschrijven. Het paneel
 * krijgt zijn hoek op halve maat zodat de tekst niet tegen de rand komt;
 * beslaat het een volledige rand (`left`/`right`, `main-width="full"` of de
 * gestapelde mobiele weergave), dan is het hoekloos. Op mobiel zit de
 * media-hoek altijd aan de bovenkant en is hij een halve stap groter (1,5X).
 * Zonder media vult de main het volledige vlak. `main-background` is
 * standaard `accent`; met `base` krijgt het vlak zonder media een rand op de
 * hoekzijden, zoals blockquote. Zet binnenin `color="inherit"` op title en
 * rich-text voor gegarandeerd contrast op de filled-kleuren.
 */
export default {
	title: 'Components/Layout/Page Sections/Hero',
	component: 'nldd-hero',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/page-sections/hero/hero.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	args: {
		mainPosition: 'bottom-left',
		mainWidth: '1/2',
		mainBackground: 'accent',
		mediaCorner: 'auto',
	},
	argTypes: {
		mainPosition: {
			name: 'main-position',
			control: 'select',
			options: ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'left', 'right'],
			description: 'Positie van het tekstpaneel',
			table: { defaultValue: { summary: 'bottom-left' } },
		},
		mainWidth: {
			name: 'main-width',
			control: 'select',
			options: ['1/2', '2/3', '3/4', 'full'],
			description: 'Breedte van het paneel; full maakt een volle strook (genegeerd bij left/right)',
			table: { defaultValue: { summary: '1/2' } },
		},
		mainBackground: {
			name: 'main-background',
			control: 'select',
			options: ['base', 'accent', 'lintblauw', 'donkerblauw', 'hemelblauw', 'lichtblauw', 'paars', 'violet', 'robijnrood', 'roze', 'rood', 'oranje', 'donkergeel'],
			description: 'Vlakkleur van het paneel: base of een filled-category',
			table: { defaultValue: { summary: 'accent' } },
		},
		mediaCorner: {
			name: 'media-corner',
			control: 'select',
			options: ['auto', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
			description: 'Afgeronde hoek van het mediavlak; auto volgt main-position',
			table: { defaultValue: { summary: 'auto' } },
		},
	},
};

const Template = (args: Record<string, any>) => html`
	<nldd-hero
		main-position=${args.mainPosition}
		main-width=${args.mainWidth}
		main-background=${args.mainBackground}
		media-corner=${args.mediaCorner}
	>
		<img slot="media"
			src=${MEDIA}
			alt=""
		>
		<nldd-title color="inherit"
			size="2"
		>
			<h1>Regels die voor je werken</h1>
		</nldd-title>
		<nldd-spacer size="8"></nldd-spacer>
		<nldd-rich-text color="inherit">
			<p>De Nederlandse Digitale Dienst maakt regels begrijpelijk en uitvoerbaar.</p>
		</nldd-rich-text>
		<nldd-spacer size="16"></nldd-spacer>
		<div style="display: flex; gap: 8px;">
			<nldd-button variant="inherit-filled"
				text="Bekijk de regels"
			></nldd-button>
			<nldd-button variant="inherit-tinted"
				text="Meer informatie"
			></nldd-button>
		</div>
	</nldd-hero>
`;

export const Standaard = {
	render: Template,
};

export const AllePosities = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 24px;">
			${['bottom-left', 'bottom-right', 'top-left', 'top-right', 'left', 'right'].map((position) => html`
				<nldd-hero main-position=${position}
					main-background="donkerblauw"
				>
					<img slot="media"
						src=${MEDIA}
						alt=""
					>
					<nldd-title color="inherit"
						size="4"
					>
						<h2>main-position="${position}"</h2>
					</nldd-title>
				</nldd-hero>
			`)}
		</div>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * `main-width="full"` maakt een volle boven- of onderstrook; het paneel is
 * dan hoekloos en de hoekkeuze van het mediavlak blijft uit `main-position`
 * volgen (bottom-left + full geeft dus een andere media-hoek dan
 * bottom-right + full).
 */
export const VolleStrook = {
	render: () => html`
		<nldd-hero main-position="bottom-left"
			main-width="full"
			main-background="lintblauw"
		>
			<img slot="media"
				src=${MEDIA}
				alt=""
			>
			<nldd-title color="inherit"
				size="3"
			>
				<h1>Volle onderstrook</h1>
				<p slot="subtitle">main-width="full" — het paneel is hoekloos</p>
			</nldd-title>
		</nldd-hero>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * Zonder media vult de main het volledige vlak; de afgeronde hoek zit dan op
 * het vlak zelf en volgt nog steeds `main-position` of `media-corner`. Met
 * `main-background="base"` krijgt het vlak een rand op de zijden die de
 * hoek raken, zoals blockquote — anders zou de vorm onzichtbaar zijn.
 */
export const ZonderMedia = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 24px;">
			<nldd-hero main-background="hemelblauw">
				<nldd-title color="inherit"
					size="2"
				>
					<h1>Kleurvlak zonder fotografie</h1>
					<p slot="subtitle">De main beslaat de volledige hero</p>
				</nldd-title>
			</nldd-hero>
			<nldd-hero main-background="base">
				<nldd-title size="2">
					<h1>Base zonder media</h1>
					<p slot="subtitle">Rand op de hoekzijden, zoals blockquote</p>
				</nldd-title>
			</nldd-hero>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * Rijkere invulling: rich-text met `color="inherit"` en een knop in het
 * paneel, op een middenton-vlakkleur met pure zwarte contentkleur.
 */
export const MetRichText = {
	render: () => html`
		<nldd-hero main-position="left"
			main-background="oranje"
		>
			<img slot="media"
				src=${MEDIA}
				alt=""
			>
			<nldd-title color="inherit"
				size="3"
			>
				<h1>Volle hoogte links</h1>
			</nldd-title>
			<nldd-spacer size="8"></nldd-spacer>
			<nldd-rich-text color="inherit">
				<p>Het paneel beslaat de volle hoogte en is hoekloos; de media-hoek zit rechtsboven. Ook <a href="#">links</a> erven de contentkleur.</p>
			</nldd-rich-text>
		</nldd-hero>
	`,
	parameters: { controls: { disable: true } },
};
