import { html } from 'lit';
import './ndd-top-navigation-bar.ts';

export default {
	title: 'Components/Navigation/Top Navigation Bar',
	component: 'ndd-top-navigation-bar',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		'website-title': {
			control: 'text',
			description: 'Website/application name shown in navigation bar',
			table: { category: 'Main' },
		},
		'no-logo': {
			control: 'boolean',
			description: 'Hide the Rijksoverheid coat of arms logo',
			table: { category: 'Main' },
		},
		'no-title': {
			control: 'boolean',
			description: 'Hide the title text',
			table: { category: 'Main' },
		},
		'has-back-button': {
			control: 'boolean',
			description: 'Show back navigation button',
			table: { category: 'Main' },
		},
		'logo-has-wordmark': {
			control: 'boolean',
			description: 'Show wordmark text beside the logo',
			table: { category: 'Logo' },
		},
		'logo-title': {
			control: 'text',
			description: 'Logo wordmark title',
			table: { category: 'Logo' },
		},
		'logo-subtitle': {
			control: 'text',
			description: 'Logo wordmark subtitle',
			table: { category: 'Logo' },
		},
		'logo-supporting-text-1': {
			control: 'text',
			description: 'Logo supporting text line 1',
			table: { category: 'Logo' },
		},
		'logo-supporting-text-2': {
			control: 'text',
			description: 'Logo supporting text line 2',
			table: { category: 'Logo' },
		},
		'back-href': {
			control: 'text',
			description: 'Back button link destination',
			table: { category: 'Back Button' },
		},
		'back-text': {
			control: 'text',
			description: 'Back button text (default: "Terug")',
			table: { category: 'Back Button' },
		},
	},
};

// ## Layout area wrapper (simulates ndd-page container)

const layoutArea = 'container-type: inline-size; container-name: layout-area;';

// ## Default utility items (reusable pattern for stories)

const defaultUtilityItems = html`
	<ndd-menu-bar-item slot="utility" text="NL" expandable sm-icon-only></ndd-menu-bar-item>
	<ndd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier" sm-icon-only></ndd-menu-bar-item>
	<ndd-menu-bar-item slot="utility" text="Mijn DigID" icon="person" expandable sm-text-only></ndd-menu-bar-item>
`;

export const Default = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-top-navigation-bar website-title="DigID">
				<ndd-menu-bar-item slot="global" text="Home" selected></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Aanvragen & activeren"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Manieren van inloggen"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Veiligheid"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Hulp"></ndd-menu-bar-item>
				${defaultUtilityItems}
			</ndd-top-navigation-bar>
		</div>
	`,
};

export const WithLogoWordmark = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-top-navigation-bar
				website-title="DigID"
				logo-has-wordmark
				logo-title="DigID"
			>
				<ndd-menu-bar-item slot="global" text="Home" selected></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Aanvragen & activeren"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Manieren van inloggen"></ndd-menu-bar-item>
				${defaultUtilityItems}
			</ndd-top-navigation-bar>
		</div>
	`,
};

export const MijnOverheidZakelijk = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-top-navigation-bar website-title="Mijn overheid zakelijk">
				<ndd-menu-bar-item slot="utility" text="Bloom B.V." icon="person" expandable></ndd-menu-bar-item>
			</ndd-top-navigation-bar>
		</div>
	`,
};

export const RegelRecht = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-top-navigation-bar
				website-title="RegelRecht"
				has-back-button
				back-href="/"
				back-text="Bibliotheek"
				no-logo
			>
				<ndd-menu-bar-item slot="utility" text="J. Jansen" icon="person" expandable></ndd-menu-bar-item>
			</ndd-top-navigation-bar>
		</div>
	`,
};

export const SmallViewport = {
	render: () => html`
		<div style="${layoutArea} max-width: 400px;">
			<ndd-top-navigation-bar website-title="DigID">
				<ndd-menu-bar-item slot="global" text="Home" selected></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Aanvragen & activeren"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Manieren van inloggen"></ndd-menu-bar-item>
				${defaultUtilityItems}
			</ndd-top-navigation-bar>
		</div>
	`,
};

export const ManyGlobalItems = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-top-navigation-bar website-title="Rijksoverheid">
				<ndd-menu-bar-item slot="global" text="Home" selected></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Onderwerpen"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Documenten en publicaties"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Ministeries"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Contact"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Actueel"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Vraag en antwoord"></ndd-menu-bar-item>
				<ndd-menu-bar-item slot="global" text="Wetten en regelgeving"></ndd-menu-bar-item>
				${defaultUtilityItems}
			</ndd-top-navigation-bar>
		</div>
	`,
};

export const MinimalLogo = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-top-navigation-bar no-title></ndd-top-navigation-bar>
		</div>
	`,
};

export const AllStates = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 32px;">
			<div style=${layoutArea}>
				<h3 style="margin: 0 0 8px; font-family: system-ui;">DigID (Full width)</h3>
				<ndd-top-navigation-bar website-title="DigID">
					<ndd-menu-bar-item slot="global" text="Home" selected></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Aanvragen & activeren"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Manieren van inloggen"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Veiligheid"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Hulp"></ndd-menu-bar-item>
					${defaultUtilityItems}
				</ndd-top-navigation-bar>
			</div>
			<div style="${layoutArea} max-width: 400px;">
				<h3 style="margin: 0 0 8px; font-family: system-ui;">DigID (Small viewport)</h3>
				<ndd-top-navigation-bar website-title="DigID">
					<ndd-menu-bar-item slot="global" text="Home" selected></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Aanvragen & activeren"></ndd-menu-bar-item>
					<ndd-menu-bar-item slot="global" text="Manieren van inloggen"></ndd-menu-bar-item>
					${defaultUtilityItems}
				</ndd-top-navigation-bar>
			</div>
			<div style=${layoutArea}>
				<h3 style="margin: 0 0 8px; font-family: system-ui;">Mijn overheid zakelijk</h3>
				<ndd-top-navigation-bar website-title="Mijn overheid zakelijk">
					<ndd-menu-bar-item slot="utility" text="Bloom B.V." icon="person" expandable></ndd-menu-bar-item>
				</ndd-top-navigation-bar>
			</div>
			<div style=${layoutArea}>
				<h3 style="margin: 0 0 8px; font-family: system-ui;">RegelRecht</h3>
				<ndd-top-navigation-bar
					website-title="RegelRecht"
					has-back-button
					back-href="/"
					back-text="Bibliotheek"
					no-logo
				>
					<ndd-menu-bar-item slot="utility" text="J. Jansen" icon="person" expandable></ndd-menu-bar-item>
				</ndd-top-navigation-bar>
			</div>
		</div>
	`,
	parameters: { controls: { disable: true } },
};
