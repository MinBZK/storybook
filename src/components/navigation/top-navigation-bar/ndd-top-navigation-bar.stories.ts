import { html, nothing } from 'lit';
import './ndd-top-navigation-bar.ts';

export default {
	title: 'Components/Navigation/Top Navigation Bar',
	component: 'ndd-top-navigation-bar',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		websiteTitle: 'DigID',
		noLogo: false,
		logoTitle: '',
		logoSubtitle: '',
		logoSupportingText1: '',
		logoSupportingText2: '',
		backHref: '',
		backText: '',
	},
	argTypes: {
		websiteTitle: { name: 'website-title', control: 'text', description: 'Naam van de website of applicatie' },
		noLogo: { name: 'no-logo', control: 'boolean', description: 'Verberg het logo', table: { defaultValue: { summary: false } } },
		logoTitle: { name: 'logo-title', control: 'text', description: 'Woordmerk titel (toont woordmerk naast logo)', table: { defaultValue: { summary: '' } } },
		logoSubtitle: { name: 'logo-subtitle', control: 'text', description: 'Woordmerk subtitel', table: { defaultValue: { summary: '' } } },
		logoSupportingText1: { name: 'logo-supporting-text-1', control: 'text', description: 'Woordmerk ondersteunende tekst regel 1', table: { defaultValue: { summary: '' } } },
		logoSupportingText2: { name: 'logo-supporting-text-2', control: 'text', description: 'Woordmerk ondersteunende tekst regel 2', table: { defaultValue: { summary: '' } } },
		backHref: { name: 'back-href', control: 'text', description: 'URL van de terugknop', table: { defaultValue: { summary: '' } } },
		backText: { name: 'back-text', control: 'text', description: 'Tekst van de terugknop (standaard: "Terug")', table: { defaultValue: { summary: '' } } },
	},
};

// ## Layout area wrapper (simulates ndd-page container)

const layoutArea = 'container-type: inline-size; container-name: layout-area; background-color: var(--semantics-surfaces-background-color);';

// ## Template

const Template = ({
	websiteTitle,
	noLogo,
	logoTitle,
	logoSubtitle,
	logoSupportingText1,
	logoSupportingText2,
	backHref,
	backText,
}: Record<string, unknown>) => html`
	<div style=${layoutArea}>
		<ndd-top-navigation-bar
			website-title=${websiteTitle || nothing}
			?no-logo=${noLogo}
			logo-title=${logoTitle || nothing}
			logo-subtitle=${logoSubtitle || nothing}
			logo-supporting-text-1=${logoSupportingText1 || nothing}
			logo-supporting-text-2=${logoSupportingText2 || nothing}
			back-href=${backHref || nothing}
			back-text=${backText || nothing}
		>
			<ndd-menu-bar-item slot="global" text="Home" current></ndd-menu-bar-item>
			<ndd-menu-bar-item slot="global" text="Aanvragen & activeren"></ndd-menu-bar-item>
			<ndd-menu-bar-item slot="global" text="Manieren van inloggen"></ndd-menu-bar-item>
			<ndd-menu-bar-item slot="global" text="Veiligheid"></ndd-menu-bar-item>
			<ndd-menu-bar-item slot="global" text="Hulp"></ndd-menu-bar-item>
			<ndd-menu-bar-item slot="utility" text="NL" expandable content-priority="icon">
				<ndd-menu-item text="Nederlands" type="radio" selected></ndd-menu-item>
				<ndd-menu-item text="English" type="radio"></ndd-menu-item>
				<ndd-menu-item text="Papiamentu" type="radio"></ndd-menu-item>
			</ndd-menu-bar-item>
			<ndd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>
			<ndd-menu-bar-item slot="utility" text="Mijn DigID" icon="person" expandable content-priority="text">
				<ndd-menu-item text="Mijn gegevens"></ndd-menu-item>
				<ndd-menu-item text="Instellingen"></ndd-menu-item>
				<ndd-menu-divider></ndd-menu-divider>
				<ndd-menu-item text="Uitloggen"></ndd-menu-item>
			</ndd-menu-bar-item>
		</ndd-top-navigation-bar>
	</div>
`;

export const Default = Template.bind({});

export const WithLogoWordmark = Template.bind({});
WithLogoWordmark.args = {
	logoTitle: 'DigID',
};

export const WithBackButton = Template.bind({});
WithBackButton.args = {
	backHref: '/',
	backText: 'Terug naar overzicht',
};

export const MijnOverheidZakelijk = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-top-navigation-bar logo-title="Mijn overheid zakelijk">
				<ndd-menu-bar-item slot="global" text="Home" current></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Over MOZa"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Actueel"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Onderwerpen"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Contact"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="utility" text="Bloom B.V." icon="person" expandable>
					<ndd-menu-item text="Bedrijfsprofiel"></ndd-menu-item>
					<ndd-menu-item text="Instellingen"></ndd-menu-item>
					<ndd-menu-divider></ndd-menu-divider>
					<ndd-menu-item text="Uitloggen"></ndd-menu-item>
				</ndd-menu-bar-item>
			</ndd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const RegelRecht = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-top-navigation-bar
				website-title="RegelRecht"
				back-href="/"
				back-text="Bibliotheek"
			>
				<ndd-menu-bar-item slot="utility" text="J. Jansen" icon="person" expandable>
					<ndd-menu-item text="Mijn profiel"></ndd-menu-item>
					<ndd-menu-divider></ndd-menu-divider>
					<ndd-menu-item text="Uitloggen"></ndd-menu-item>
				</ndd-menu-bar-item>
			</ndd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const SmallViewport = {
	render: () => html`
		<div style="${layoutArea} max-width: 400px;">
			<ndd-top-navigation-bar website-title="DigID">
				<ndd-menu-bar-item slot="global" text="Home" current></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Aanvragen & activeren"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Manieren van inloggen"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="utility" text="NL" expandable content-priority="icon">
					<ndd-menu-item text="Nederlands" type="radio" selected></ndd-menu-item>
					<ndd-menu-item text="English" type="radio"></ndd-menu-item>
					<ndd-menu-item text="Papiamentu" type="radio"></ndd-menu-item>
				</ndd-menu-bar-item>
				<ndd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="utility" text="Mijn DigID" icon="person" expandable content-priority="text">
					<ndd-menu-item text="Mijn gegevens"></ndd-menu-item>
					<ndd-menu-item text="Instellingen"></ndd-menu-item>
					<ndd-menu-divider></ndd-menu-divider>
					<ndd-menu-item text="Uitloggen"></ndd-menu-item>
				</ndd-menu-bar-item>
			</ndd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const ManyGlobalItems = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-top-navigation-bar logo-title="Rijksoverheid">
				<ndd-menu-bar-item slot="global" text="Home" current></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Onderwerpen"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Documenten en publicaties"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Ministeries"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Contact"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Actueel"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Vraag en antwoord"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Wetten en regelgeving"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="utility" text="NL" expandable content-priority="icon">
					<ndd-menu-item text="Nederlands" type="radio" selected></ndd-menu-item>
					<ndd-menu-item text="English" type="radio"></ndd-menu-item>
					<ndd-menu-item text="Papiamentu" type="radio"></ndd-menu-item>
				</ndd-menu-bar-item>
				<ndd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="utility" text="Mijn DigID" icon="person" expandable content-priority="text">
					<ndd-menu-item text="Mijn gegevens"></ndd-menu-item>
					<ndd-menu-item text="Instellingen"></ndd-menu-item>
					<ndd-menu-divider></ndd-menu-divider>
					<ndd-menu-item text="Uitloggen"></ndd-menu-item>
				</ndd-menu-bar-item>
			</ndd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const MinimalLogo = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-top-navigation-bar></ndd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const AllStates = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 32px;">
			<div style=${layoutArea}>
				<ndd-top-navigation-bar website-title="DigID (Full width)">
					<ndd-menu-bar-item slot="global" text="Home" current></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Aanvragen & activeren"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Manieren van inloggen"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Veiligheid"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Hulp"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="utility" text="NL" expandable content-priority="icon">
						<ndd-menu-item text="Nederlands" type="radio" selected></ndd-menu-item>
						<ndd-menu-item text="English" type="radio"></ndd-menu-item>
					</ndd-menu-bar-item>
					<ndd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="utility" text="Mijn DigID" icon="person" expandable content-priority="text">
						<ndd-menu-item text="Mijn gegevens"></ndd-menu-item>
						<ndd-menu-item text="Uitloggen"></ndd-menu-item>
					</ndd-menu-bar-item>
				</ndd-top-navigation-bar>
			</div>
			<div style="${layoutArea} max-width: 400px;">
				<ndd-top-navigation-bar website-title="DigID (Small viewport)">
					<ndd-menu-bar-item slot="global" text="Home" current></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Aanvragen & activeren"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Manieren van inloggen"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="utility" text="NL" expandable content-priority="icon">
						<ndd-menu-item text="Nederlands" type="radio" selected></ndd-menu-item>
						<ndd-menu-item text="English" type="radio"></ndd-menu-item>
					</ndd-menu-bar-item>
					<ndd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="utility" text="Mijn DigID" icon="person" expandable content-priority="text">
						<ndd-menu-item text="Mijn gegevens"></ndd-menu-item>
						<ndd-menu-item text="Uitloggen"></ndd-menu-item>
					</ndd-menu-bar-item>
				</ndd-top-navigation-bar>
			</div>
			<div style=${layoutArea}>
				<ndd-top-navigation-bar logo-title="Mijn overheid zakelijk">
					<ndd-menu-bar-item slot="global" text="Home" current></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Over MOZa"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Actueel"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Onderwerpen"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Contact"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="utility" text="Bloom B.V." icon="person" expandable>
						<ndd-menu-item text="Bedrijfsprofiel"></ndd-menu-item>
						<ndd-menu-item text="Uitloggen"></ndd-menu-item>
					</ndd-menu-bar-item>
				</ndd-top-navigation-bar>
			</div>
			<div style=${layoutArea}>
				<ndd-top-navigation-bar
					website-title="RegelRecht"
					back-href="/"
					back-text="Bibliotheek"
				>
					<ndd-menu-bar-item slot="utility" text="J. Jansen" icon="person" expandable>
						<ndd-menu-item text="Mijn profiel"></ndd-menu-item>
						<ndd-menu-item text="Uitloggen"></ndd-menu-item>
					</ndd-menu-bar-item>
				</ndd-top-navigation-bar>
			</div>
		</div>
	`,
	parameters: { controls: { disable: true } },
};
