import { html } from 'lit';
import './ndd-skip-link.ts';
import '../top-navigation-bar/ndd-top-navigation-bar.ts';

/**
 * Skip-link component voor keyboard-navigatie.
 * Verbergt een link totdat de gebruiker er met Tab naartoe navigeert.
 * Klik of Enter om de gewrapte content over te slaan.
 */
export default {
	title: 'Components/Navigation/Skip Link',
	component: 'ndd-skip-link',
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
			<p style="padding: 16px; font-family: system-ui;">Druk op Tab om de skip-link te zien.</p>
			<ndd-skip-link>
				<ndd-top-navigation-bar website-title="DigID">
					<ndd-menu-bar-item slot="global" text="Home" current></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Contact"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier"></ndd-menu-bar-item>
				</ndd-top-navigation-bar>
			</ndd-skip-link>
			<main style="padding: 16px; font-family: system-ui;">
				<h1>Hoofdinhoud</h1>
				<p>Na het klikken op de skip-link springt de focus hierheen.</p>
				<a href="#">Eerste link in hoofdinhoud</a>
			</main>
		</div>
	`,
};

export const MetTekst = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-skip-link text="Ga naar hoofdinhoud">
				<ndd-top-navigation-bar website-title="Rijksoverheid">
					<ndd-menu-bar-item slot="global" text="Home" current></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Onderwerpen"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier"></ndd-menu-bar-item>
				</ndd-top-navigation-bar>
			</ndd-skip-link>
			<main style="padding: 16px; font-family: system-ui;">
				<h1>Hoofdinhoud</h1>
				<a href="#">Link in de content</a>
			</main>
		</div>
	`,
};

export const MetHref = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-skip-link text="Ga naar formulier" href="#contact-form"></ndd-skip-link>
			<div style="padding: 32px; font-family: system-ui;">
				<p>Content bovenaan de pagina...</p>
			</div>
			<form id="contact-form"
				tabindex="-1"
				style="padding: 16px; border: 1px solid var(--semantics-dividers-color, #ccc); font-family: system-ui;"
			>
				<h2>Contactformulier</h2>
				<label>Naam: <input type="text"></label>
			</form>
		</div>
	`,
};
