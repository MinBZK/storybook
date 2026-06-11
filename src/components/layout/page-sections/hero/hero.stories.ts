import { html, nothing } from 'lit';
import './hero.js';
import '../../../content/title/title.js';
import '../../../content/rich-text/rich-text.js';
import '../../../actions/button/button.js';

const MEDIA = 'sample-images/butterfly-1200.jpg';

/**
 * Een paginakop volgens de rijkshuisstijl-vormtaal: een mediavlak met exact
 * één afgeronde hoek (1X lintbreedte op smalle containers, 2X op md/lg) en
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
 * Met `corner` is de media-hoek per geval te overschrijven. Beslaat het
 * paneel een volledige rand (`left`/`right`, `main-width="full"` of de
 * gestapelde mobiele weergave), dan is het paneel hoekloos. Zonder media
 * vult de main het volledige vlak. Gebruik `main-background` voor een
 * vlakkleur uit de filled-categories en zet binnenin `color="inherit"` op
 * title en rich-text voor gegarandeerd contrast.
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
		mainBackground: 'donkerblauw',
		corner: 'auto',
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
			options: ['(geen)', 'neutral', 'accent', 'success', 'warning', 'critical', 'coolgray', 'lintblauw', 'donkerblauw', 'hemelblauw', 'lichtblauw', 'paars', 'violet', 'robijnrood', 'roze', 'rood', 'oranje', 'donkergeel'],
			mapping: { '(geen)': '' },
			description: 'Vlakkleur van het paneel uit de filled-categories',
			table: { defaultValue: { summary: '(geen)' } },
		},
		corner: {
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
		main-background=${args.mainBackground || nothing}
		corner=${args.corner}
	>
		<img slot="media"
			src=${MEDIA}
			alt=""
		>
		<nldd-title color="inherit"
			size="2"
		>
			<h1>Regels die voor je werken</h1>
			<p slot="subtitle">De Nederlandse Digitale Dienst</p>
		</nldd-title>
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
 * Zonder media vult de main het volledige vlak; de enige afgeronde hoek zit
 * dan op het paneel zelf en volgt nog steeds `main-position` of `corner`.
 */
export const ZonderMedia = {
	render: () => html`
		<nldd-hero main-background="hemelblauw">
			<nldd-title color="inherit"
				size="2"
			>
				<h1>Kleurvlak zonder fotografie</h1>
				<p slot="subtitle">De main beslaat de volledige hero</p>
			</nldd-title>
		</nldd-hero>
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
			<nldd-rich-text color="inherit">
				<p>Het paneel beslaat de volle hoogte en is hoekloos; de media-hoek zit rechtsboven. Ook <a href="#">links</a> erven de contentkleur.</p>
			</nldd-rich-text>
		</nldd-hero>
	`,
	parameters: { controls: { disable: true } },
};
