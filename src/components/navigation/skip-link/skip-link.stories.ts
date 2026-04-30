import { html } from 'lit';
import './skip-link.js';
import '../top-navigation-bar/top-navigation-bar.js';
import '../../content/rich-text/rich-text.js';

/**
 * Skip-link component voor keyboard-navigatie.
 * Verbergt een link totdat de gebruiker er met Tab naartoe navigeert.
 * Klik of Enter om de gewrapte content over te slaan.
 */
export default {
	title: 'Components/Navigation/Skip Link',
	component: 'nldd-skip-link',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		text: '',
		href: '',
	},
	argTypes: {
		text: { control: 'text', description: 'Tekst van de skip-link (default: "Sla over")' },
		href: { control: 'text', description: 'Optioneel extern doel-ID' },
	},
};

const layoutArea = 'container-type: inline-size; container-name: layout-area; background-color: var(--semantics-surfaces-background-color);';

export const Default = {
	render: () => html`
		<div style=${layoutArea}>
			<nldd-rich-text style="padding: 16px;">
				<p>Druk op Tab om de skip-link te zien.</p>
			</nldd-rich-text>
			<nldd-skip-link>
				<nldd-top-navigation-bar website-title="DigID">
					<nldd-menu-bar-item slot="global" text="Home" current></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Contact"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier"></nldd-menu-bar-item>
				</nldd-top-navigation-bar>
			</nldd-skip-link>
			<main>
				<nldd-rich-text style="padding: 16px;">
					<h1>Hoofdinhoud</h1>
					<p>Na het klikken op de skip-link springt de focus hierheen.</p>
					<a href="#">Eerste link in hoofdinhoud</a>
				</nldd-rich-text>
			</main>
		</div>
	`,
};

export const MetTekst = {
	render: () => html`
		<div style=${layoutArea}>
			<nldd-skip-link text="Ga naar hoofdinhoud">
				<nldd-top-navigation-bar website-title="Rijksoverheid">
					<nldd-menu-bar-item slot="global" text="Home" current></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Onderwerpen"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier"></nldd-menu-bar-item>
				</nldd-top-navigation-bar>
			</nldd-skip-link>
			<main>
				<nldd-rich-text style="padding: 16px;">
					<h1>Hoofdinhoud</h1>
					<a href="#">Link in de content</a>
				</nldd-rich-text>
			</main>
		</div>
	`,
};

export const MetHref = {
	render: () => html`
		<div style=${layoutArea}>
			<nldd-skip-link text="Ga naar formulier" href="#contact-form"></nldd-skip-link>
			<nldd-rich-text style="padding: 32px;">
				<p>Content bovenaan de pagina...</p>
			</nldd-rich-text>
			<form id="contact-form"
				tabindex="-1"
				style="padding: 16px; border: 1px solid var(--semantics-dividers-color);"
			>
				<nldd-rich-text>
					<h2>Contactformulier</h2>
					<label>Naam: <input type="text"></label>
				</nldd-rich-text>
			</form>
		</div>
	`,
};
