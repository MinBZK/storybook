import { html, nothing } from 'lit';
import './top-navigation-bar.js';
import '../menu-bar/menu-bar.js';
import '../menu-bar-item/menu-bar-item.js';

export default {
	title: 'Components/Navigation/Top Navigation Bar',
	component: 'nldd-top-navigation-bar',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		noLogo: false,
		width: '',
		logoTitle: '',
		logoSubtitle: '',
		logoSupportingText1: '',
		logoSupportingText2: '',
		logoHref: '',
		websiteTitle: 'Ontwerpsysteem',
		websiteHref: '',
		backText: '',
		backHref: '',
	},
	argTypes: {
		noLogo: { name: 'no-logo', control: 'boolean', description: 'Verberg het logo', table: { defaultValue: { summary: false } } },
		width: { name: 'width', control: 'text', description: 'Begrenst de bar-content tot een max-width zodat-ie uitlijnt met page-sections; "full" = volle breedte, of een CSS-lengte.', table: { defaultValue: { summary: '' } } },
		logoTitle: { name: 'logo-title', control: 'text', description: 'Woordmerk titel (toont woordmerk naast logo)', table: { defaultValue: { summary: '' } } },
		logoSubtitle: { name: 'logo-subtitle', control: 'text', description: 'Woordmerk subtitel', table: { defaultValue: { summary: '' } } },
		logoSupportingText1: { name: 'logo-supporting-text-1', control: 'text', description: 'Woordmerk ondersteunende tekst regel 1', table: { defaultValue: { summary: '' } } },
		logoSupportingText2: { name: 'logo-supporting-text-2', control: 'text', description: 'Woordmerk ondersteunende tekst regel 2', table: { defaultValue: { summary: '' } } },
		logoHref: { name: 'logo-href', control: 'text', description: 'URL voor logo en woordmerk', table: { defaultValue: { summary: '' } } },
		websiteTitle: { name: 'website-title', control: 'text', description: 'Naam van de website of applicatie' },
		websiteHref: { name: 'website-href', control: 'text', description: 'URL voor de website-titel', table: { defaultValue: { summary: '' } } },
		backText: { name: 'back-text', control: 'text', description: 'Tekst van de terugknop (standaard: "Terug")', table: { defaultValue: { summary: '' } } },
		backHref: { name: 'back-href', control: 'text', description: 'URL van de terugknop', table: { defaultValue: { summary: '' } } },
	},
};

// ## Background wrapper (top-navigation-bar uses its own container query, no layout-container needed)

const layoutArea = 'background-color: var(--semantics-surfaces-base-background-color);';

// ## Template

const Template = ({
	noLogo,
	width,
	logoTitle,
	logoSubtitle,
	logoSupportingText1,
	logoSupportingText2,
	logoHref,
	websiteTitle,
	websiteHref,
	backText,
	backHref,
}: Record<string, unknown>) => html`
	<div style=${layoutArea}>
		<nldd-top-navigation-bar
			?no-logo=${noLogo}
			width=${width || nothing}
			logo-title=${logoTitle || nothing}
			logo-subtitle=${logoSubtitle || nothing}
			logo-supporting-text-1=${logoSupportingText1 || nothing}
			logo-supporting-text-2=${logoSupportingText2 || nothing}
			logo-href=${logoHref || nothing}
			website-title=${websiteTitle || nothing}
			website-href=${websiteHref || nothing}
			back-text=${backText || nothing}
			back-href=${backHref || nothing}
		>
			<nldd-menu-bar slot="global">
				<nldd-menu-bar-item text="Home" current></nldd-menu-bar-item>
				<nldd-menu-bar-item text="Componenten"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="Ontwerprichtlijnen"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="Aan de slag"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="Over ons"></nldd-menu-bar-item>
			</nldd-menu-bar>
			<nldd-menu-bar slot="utility">
				<nldd-menu-bar-item text="NL" expandable content-priority="icon">
					<nldd-menu>
						<nldd-menu-item text="Nederlands" type="radio" selected></nldd-menu-item>
						<nldd-menu-item text="English" type="radio"></nldd-menu-item>
						<nldd-menu-item text="Papiamentu" type="radio"></nldd-menu-item>
					</nldd-menu>
				</nldd-menu-bar-item>
				<nldd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="Mijn account" icon="person" expandable content-priority="text">
					<nldd-menu>
						<nldd-menu-item text="Mijn gegevens"></nldd-menu-item>
						<nldd-menu-item text="Instellingen"></nldd-menu-item>
						<nldd-menu-divider></nldd-menu-divider>
						<nldd-menu-item text="Uitloggen"></nldd-menu-item>
					</nldd-menu>
				</nldd-menu-bar-item>
			</nldd-menu-bar>
		</nldd-top-navigation-bar>
	</div>
`;

export const Default = {
	render: Template,
};

export const WithLogoWordmark = {
	render: Template,
	args: {
		logoTitle: 'Nederlandse Digitale Dienst',
		logoSubtitle: 'Ministerie van Economische Zaken en Klimaat',
		logoHref: '/',
		websiteHref: '/',
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
				<nldd-menu-bar slot="global">
					<nldd-menu-bar-item text="Home" current></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Over MOZa"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Actueel"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Onderwerpen"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Contact"></nldd-menu-bar-item>
				</nldd-menu-bar>
				<nldd-menu-bar slot="utility">
					<nldd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Bloom B.V." icon="person" expandable>
						<nldd-menu>
							<nldd-menu-item text="Bedrijfsprofiel"></nldd-menu-item>
							<nldd-menu-item text="Instellingen"></nldd-menu-item>
							<nldd-menu-divider></nldd-menu-divider>
							<nldd-menu-item text="Uitloggen"></nldd-menu-item>
						</nldd-menu>
					</nldd-menu-bar-item>
				</nldd-menu-bar>
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
				<nldd-menu-bar slot="utility">
					<nldd-menu-bar-item text="J. Jansen" icon="person" expandable>
						<nldd-menu>
							<nldd-menu-item text="Mijn profiel"></nldd-menu-item>
							<nldd-menu-divider></nldd-menu-divider>
							<nldd-menu-item text="Uitloggen"></nldd-menu-item>
						</nldd-menu>
					</nldd-menu-bar-item>
				</nldd-menu-bar>
			</nldd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const SmallViewport = {
	render: () => html`
		<div style="${layoutArea} max-width: 400px;">
			<nldd-top-navigation-bar website-title="Ontwerpsysteem">
				<nldd-menu-bar slot="global">
					<nldd-menu-bar-item text="Home" current></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Componenten"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Ontwerprichtlijnen"></nldd-menu-bar-item>
				</nldd-menu-bar>
				<nldd-menu-bar slot="utility">
					<nldd-menu-bar-item text="NL" expandable content-priority="icon">
						<nldd-menu>
							<nldd-menu-item text="Nederlands" type="radio" selected></nldd-menu-item>
							<nldd-menu-item text="English" type="radio"></nldd-menu-item>
							<nldd-menu-item text="Papiamentu" type="radio"></nldd-menu-item>
						</nldd-menu>
					</nldd-menu-bar-item>
					<nldd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Mijn account" icon="person" expandable content-priority="text">
						<nldd-menu>
							<nldd-menu-item text="Mijn gegevens"></nldd-menu-item>
							<nldd-menu-item text="Instellingen"></nldd-menu-item>
							<nldd-menu-divider></nldd-menu-divider>
							<nldd-menu-item text="Uitloggen"></nldd-menu-item>
						</nldd-menu>
					</nldd-menu-bar-item>
				</nldd-menu-bar>
			</nldd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * Een meerlaagse hoofdnavigatie: een globaal item met een geneste `<nldd-menu>`
 * wordt op mobiel een aparte laag in de menu-sheet. Open de sheet via de
 * "Menu"-knop, tik op een rij met een chevron om in te zoomen; de titelbalk
 * toont dan een terugknop naar het vorige niveau. Submenu's mogen zelf weer
 * submenu's hebben ("Wonen" hieronder), zodat je net zo diep kunt navigeren als
 * de content vraagt.
 */
export const MeerlaagsMenu = {
	render: () => html`
		<div style="${layoutArea} max-width: 400px;">
			<nldd-top-navigation-bar website-title="Ontwerpsysteem">
				<nldd-menu-bar slot="global">
					<nldd-menu-bar-item text="Home" current></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Componenten" expandable>
						<nldd-menu>
							<nldd-menu-item text="Acties"></nldd-menu-item>
							<nldd-menu-item text="Formulieren">
								<nldd-menu>
									<nldd-menu-item text="Tekstveld"></nldd-menu-item>
									<nldd-menu-item text="Keuzelijst"></nldd-menu-item>
									<nldd-menu-item text="Datumveld"></nldd-menu-item>
								</nldd-menu>
							</nldd-menu-item>
							<nldd-menu-item text="Lijsten en tabellen"></nldd-menu-item>
						</nldd-menu>
					</nldd-menu-bar-item>
					<nldd-menu-bar-item text="Aan de slag"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Over ons"></nldd-menu-bar-item>
				</nldd-menu-bar>
			</nldd-top-navigation-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const ManyGlobalItems = {
	render: () => html`
		<div style=${layoutArea}>
			<nldd-top-navigation-bar logo-title="Nederlandse Digitale Dienst" logo-subtitle="Ministerie van Economische Zaken en Klimaat">
				<nldd-menu-bar slot="global">
					<nldd-menu-bar-item text="Home" current></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Componenten"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Ontwerprichtlijnen"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Patronen"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Iconen"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Tokens"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Aan de slag"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Over ons"></nldd-menu-bar-item>
				</nldd-menu-bar>
				<nldd-menu-bar slot="utility">
					<nldd-menu-bar-item text="NL" expandable content-priority="icon">
						<nldd-menu>
							<nldd-menu-item text="Nederlands" type="radio" selected></nldd-menu-item>
							<nldd-menu-item text="English" type="radio"></nldd-menu-item>
							<nldd-menu-item text="Papiamentu" type="radio"></nldd-menu-item>
						</nldd-menu>
					</nldd-menu-bar-item>
					<nldd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Mijn account" icon="person" expandable content-priority="text">
						<nldd-menu>
							<nldd-menu-item text="Mijn gegevens"></nldd-menu-item>
							<nldd-menu-item text="Instellingen"></nldd-menu-item>
							<nldd-menu-divider></nldd-menu-divider>
							<nldd-menu-item text="Uitloggen"></nldd-menu-item>
						</nldd-menu>
					</nldd-menu-bar-item>
				</nldd-menu-bar>
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
				<nldd-top-navigation-bar website-title="Ontwerpsysteem (Full width)">
					<nldd-menu-bar slot="global">
						<nldd-menu-bar-item text="Home" current></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Componenten"></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Ontwerprichtlijnen"></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Aan de slag"></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Over ons"></nldd-menu-bar-item>
					</nldd-menu-bar>
					<nldd-menu-bar slot="utility">
						<nldd-menu-bar-item text="NL" expandable content-priority="icon">
							<nldd-menu>
								<nldd-menu-item text="Nederlands" type="radio" selected></nldd-menu-item>
								<nldd-menu-item text="English" type="radio"></nldd-menu-item>
							</nldd-menu>
						</nldd-menu-bar-item>
						<nldd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Mijn account" icon="person" expandable content-priority="text">
							<nldd-menu>
								<nldd-menu-item text="Mijn gegevens"></nldd-menu-item>
								<nldd-menu-item text="Uitloggen"></nldd-menu-item>
							</nldd-menu>
						</nldd-menu-bar-item>
					</nldd-menu-bar>
				</nldd-top-navigation-bar>
			</div>
			<div style="${layoutArea} max-width: 400px;">
				<nldd-top-navigation-bar website-title="Ontwerpsysteem (Small viewport)">
					<nldd-menu-bar slot="global">
						<nldd-menu-bar-item text="Home" current></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Componenten"></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Ontwerprichtlijnen"></nldd-menu-bar-item>
					</nldd-menu-bar>
					<nldd-menu-bar slot="utility">
						<nldd-menu-bar-item text="NL" expandable content-priority="icon">
							<nldd-menu>
								<nldd-menu-item text="Nederlands" type="radio" selected></nldd-menu-item>
								<nldd-menu-item text="English" type="radio"></nldd-menu-item>
							</nldd-menu>
						</nldd-menu-bar-item>
						<nldd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Mijn account" icon="person" expandable content-priority="text">
							<nldd-menu>
								<nldd-menu-item text="Mijn gegevens"></nldd-menu-item>
								<nldd-menu-item text="Uitloggen"></nldd-menu-item>
							</nldd-menu>
						</nldd-menu-bar-item>
					</nldd-menu-bar>
				</nldd-top-navigation-bar>
			</div>
			<div style=${layoutArea}>
				<nldd-top-navigation-bar logo-title="Mijn overheid zakelijk">
					<nldd-menu-bar slot="global">
						<nldd-menu-bar-item text="Home" current></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Over MOZa"></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Actueel"></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Onderwerpen"></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Contact"></nldd-menu-bar-item>
					</nldd-menu-bar>
					<nldd-menu-bar slot="utility">
						<nldd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>
						<nldd-menu-bar-item text="Bloom B.V." icon="person" expandable>
							<nldd-menu>
								<nldd-menu-item text="Bedrijfsprofiel"></nldd-menu-item>
								<nldd-menu-item text="Uitloggen"></nldd-menu-item>
							</nldd-menu>
						</nldd-menu-bar-item>
					</nldd-menu-bar>
				</nldd-top-navigation-bar>
			</div>
			<div style=${layoutArea}>
				<nldd-top-navigation-bar
					website-title="RegelRecht"
					back-href="/"
					back-text="Bibliotheek"
				>
					<nldd-menu-bar slot="utility">
						<nldd-menu-bar-item text="J. Jansen" icon="person" expandable>
							<nldd-menu>
								<nldd-menu-item text="Mijn profiel"></nldd-menu-item>
								<nldd-menu-item text="Uitloggen"></nldd-menu-item>
							</nldd-menu>
						</nldd-menu-bar-item>
					</nldd-menu-bar>
				</nldd-top-navigation-bar>
			</div>
		</div>
	`,
	parameters: { controls: { disable: true } },
};
