import { html, nothing } from 'lit';
import './top-navigation-bar.js';

export default {
	title: 'Components/Navigation/Top Navigation Bar',
	component: 'nldd-top-navigation-bar',
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
		logoHref: '',
		siteHref: '',
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
		logoHref: { name: 'logo-href', control: 'text', description: 'URL voor logo en woordmerk', table: { defaultValue: { summary: '' } } },
		siteHref: { name: 'site-href', control: 'text', description: 'URL voor de site-titel', table: { defaultValue: { summary: '' } } },
		backHref: { name: 'back-href', control: 'text', description: 'URL van de terugknop', table: { defaultValue: { summary: '' } } },
		backText: { name: 'back-text', control: 'text', description: 'Tekst van de terugknop (standaard: "Terug")', table: { defaultValue: { summary: '' } } },
	},
};

// ## Layout area wrapper (simulates nldd-page container)

const layoutArea = 'container-type: inline-size; container-name: layout-area; background-color: var(--semantics-surfaces-background-color);';

// ## Template

const Template = ({
	websiteTitle,
	noLogo,
	logoTitle,
	logoSubtitle,
	logoSupportingText1,
	logoSupportingText2,
	logoHref,
	siteHref,
	backHref,
	backText,
}: Record<string, unknown>) => html`
	<div style=${layoutArea}>
		<nldd-top-navigation-bar
			website-title=${websiteTitle || nothing}
			?no-logo=${noLogo}
			logo-title=${logoTitle || nothing}
			logo-subtitle=${logoSubtitle || nothing}
			logo-supporting-text-1=${logoSupportingText1 || nothing}
			logo-supporting-text-2=${logoSupportingText2 || nothing}
			logo-href=${logoHref || nothing}
			site-href=${siteHref || nothing}
			back-href=${backHref || nothing}
			back-text=${backText || nothing}
		>
			<nldd-menu-bar-item slot="global" text="Home" current></nldd-menu-bar-item>
			<nldd-menu-bar-item slot="global" text="Aanvragen & activeren"></nldd-menu-bar-item>
			<nldd-menu-bar-item slot="global" text="Manieren van inloggen"></nldd-menu-bar-item>
			<nldd-menu-bar-item slot="global" text="Veiligheid"></nldd-menu-bar-item>
			<nldd-menu-bar-item slot="global" text="Hulp"></nldd-menu-bar-item>
			<nldd-menu-bar-item slot="utility" text="NL" expandable content-priority="icon">
				<nldd-menu-item text="Nederlands" type="radio" selected></nldd-menu-item>
				<nldd-menu-item text="English" type="radio"></nldd-menu-item>
				<nldd-menu-item text="Papiamentu" type="radio"></nldd-menu-item>
			</nldd-menu-bar-item>
			<nldd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
			<nldd-menu-bar-item slot="utility" text="Mijn DigID" icon="person" expandable content-priority="text">
				<nldd-menu-item text="Mijn gegevens"></nldd-menu-item>
				<nldd-menu-item text="Instellingen"></nldd-menu-item>
				<nldd-menu-divider></nldd-menu-divider>
				<nldd-menu-item text="Uitloggen"></nldd-menu-item>
			</nldd-menu-bar-item>
		</nldd-top-navigation-bar>
	</div>
`;

export const Default = {
	render: Template,
};

export const WithLogoWordmark = {
	render: Template,
	args: {
		logoTitle: 'DigID',
		logoHref: '/',
		siteHref: '/',
	},
};

export const WithBackButton = {
	render: Template,
	args: {
		backHref: '/',
		backText: 'Terug naar overzicht',
	},
};

export const MijnOverheidZakelijk = {
	render: () => html`
		<div style=${layoutArea}>
			<nldd-top-navigation-bar logo-title="Mijn overheid zakelijk">
				<nldd-menu-bar-item slot="global" text="Home" current></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Over MOZa"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Actueel"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Onderwerpen"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Contact"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="utility" text="Bloom B.V." icon="person" expandable>
					<nldd-menu-item text="Bedrijfsprofiel"></nldd-menu-item>
					<nldd-menu-item text="Instellingen"></nldd-menu-item>
					<nldd-menu-divider></nldd-menu-divider>
					<nldd-menu-item text="Uitloggen"></nldd-menu-item>
				</nldd-menu-bar-item>
			</nldd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const RegelRecht = {
	render: () => html`
		<div style=${layoutArea}>
			<nldd-top-navigation-bar
				website-title="RegelRecht"
				back-href="/"
				back-text="Bibliotheek"
			>
				<nldd-menu-bar-item slot="utility" text="J. Jansen" icon="person" expandable>
					<nldd-menu-item text="Mijn profiel"></nldd-menu-item>
					<nldd-menu-divider></nldd-menu-divider>
					<nldd-menu-item text="Uitloggen"></nldd-menu-item>
				</nldd-menu-bar-item>
			</nldd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const SmallViewport = {
	render: () => html`
		<div style="${layoutArea} max-width: 400px;">
			<nldd-top-navigation-bar website-title="DigID">
				<nldd-menu-bar-item slot="global" text="Home" current></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Aanvragen & activeren"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Manieren van inloggen"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="utility" text="NL" expandable content-priority="icon">
					<nldd-menu-item text="Nederlands" type="radio" selected></nldd-menu-item>
					<nldd-menu-item text="English" type="radio"></nldd-menu-item>
					<nldd-menu-item text="Papiamentu" type="radio"></nldd-menu-item>
				</nldd-menu-bar-item>
				<nldd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="utility" text="Mijn DigID" icon="person" expandable content-priority="text">
					<nldd-menu-item text="Mijn gegevens"></nldd-menu-item>
					<nldd-menu-item text="Instellingen"></nldd-menu-item>
					<nldd-menu-divider></nldd-menu-divider>
					<nldd-menu-item text="Uitloggen"></nldd-menu-item>
				</nldd-menu-bar-item>
			</nldd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const ManyGlobalItems = {
	render: () => html`
		<div style=${layoutArea}>
			<nldd-top-navigation-bar logo-title="Rijksoverheid">
				<nldd-menu-bar-item slot="global" text="Home" current></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Onderwerpen"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Documenten en publicaties"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Ministeries"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Contact"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Actueel"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Vraag en antwoord"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="global" text="Wetten en regelgeving"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="utility" text="NL" expandable content-priority="icon">
					<nldd-menu-item text="Nederlands" type="radio" selected></nldd-menu-item>
					<nldd-menu-item text="English" type="radio"></nldd-menu-item>
					<nldd-menu-item text="Papiamentu" type="radio"></nldd-menu-item>
				</nldd-menu-bar-item>
				<nldd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
				<nldd-menu-bar-item slot="utility" text="Mijn DigID" icon="person" expandable content-priority="text">
					<nldd-menu-item text="Mijn gegevens"></nldd-menu-item>
					<nldd-menu-item text="Instellingen"></nldd-menu-item>
					<nldd-menu-divider></nldd-menu-divider>
					<nldd-menu-item text="Uitloggen"></nldd-menu-item>
				</nldd-menu-bar-item>
			</nldd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const MinimalLogo = {
	render: () => html`
		<div style=${layoutArea}>
			<nldd-top-navigation-bar></nldd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const AllStates = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 32px;">
			<div style=${layoutArea}>
				<nldd-top-navigation-bar website-title="DigID (Full width)">
					<nldd-menu-bar-item slot="global" text="Home" current></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Aanvragen & activeren"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Manieren van inloggen"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Veiligheid"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Hulp"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="utility" text="NL" expandable content-priority="icon">
						<nldd-menu-item text="Nederlands" type="radio" selected></nldd-menu-item>
						<nldd-menu-item text="English" type="radio"></nldd-menu-item>
					</nldd-menu-bar-item>
					<nldd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="utility" text="Mijn DigID" icon="person" expandable content-priority="text">
						<nldd-menu-item text="Mijn gegevens"></nldd-menu-item>
						<nldd-menu-item text="Uitloggen"></nldd-menu-item>
					</nldd-menu-bar-item>
				</nldd-top-navigation-bar>
			</div>
			<div style="${layoutArea} max-width: 400px;">
				<nldd-top-navigation-bar website-title="DigID (Small viewport)">
					<nldd-menu-bar-item slot="global" text="Home" current></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Aanvragen & activeren"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Manieren van inloggen"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="utility" text="NL" expandable content-priority="icon">
						<nldd-menu-item text="Nederlands" type="radio" selected></nldd-menu-item>
						<nldd-menu-item text="English" type="radio"></nldd-menu-item>
					</nldd-menu-bar-item>
					<nldd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="utility" text="Mijn DigID" icon="person" expandable content-priority="text">
						<nldd-menu-item text="Mijn gegevens"></nldd-menu-item>
						<nldd-menu-item text="Uitloggen"></nldd-menu-item>
					</nldd-menu-bar-item>
				</nldd-top-navigation-bar>
			</div>
			<div style=${layoutArea}>
				<nldd-top-navigation-bar logo-title="Mijn overheid zakelijk">
					<nldd-menu-bar-item slot="global" text="Home" current></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Over MOZa"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Actueel"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Onderwerpen"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="global" text="Contact"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
					<nldd-menu-bar-item slot="utility" text="Bloom B.V." icon="person" expandable>
						<nldd-menu-item text="Bedrijfsprofiel"></nldd-menu-item>
						<nldd-menu-item text="Uitloggen"></nldd-menu-item>
					</nldd-menu-bar-item>
				</nldd-top-navigation-bar>
			</div>
			<div style=${layoutArea}>
				<nldd-top-navigation-bar
					website-title="RegelRecht"
					back-href="/"
					back-text="Bibliotheek"
				>
					<nldd-menu-bar-item slot="utility" text="J. Jansen" icon="person" expandable>
						<nldd-menu-item text="Mijn profiel"></nldd-menu-item>
						<nldd-menu-item text="Uitloggen"></nldd-menu-item>
					</nldd-menu-bar-item>
				</nldd-top-navigation-bar>
			</div>
		</div>
	`,
	parameters: { controls: { disable: true } },
};
