import { html, nothing } from 'lit';
import './tab-bar.js';
import './../../content/icon/icon.js';

export default {
	title: 'Components/Navigation/Tab Bar',
	component: 'nldd-tab-bar',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/navigation/tab-bar/tab-bar.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'stable' },
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['', 'icon-and-text', 'text', 'icon'],
			description: 'Standaard variant voor alle items. Kan per item worden overschreven met een eigen variant attribuut. Wordt genegeerd wanneer compact actief is.',
			table: { defaultValue: { summary: '' } },
		},
		compact: {
			control: 'boolean',
			description: 'Toont items in compact weergave: icoon boven tekst gestapeld. Overschrijft variant op de parent én individuele variant attributen op items.',
			table: { defaultValue: { summary: false } },
		},
		responsive: {
			control: 'boolean',
			description: 'Schakelt automatisch over naar compact via de layout-area container query (onder 480px)',
			table: { defaultValue: { summary: false } },
		},
		fullWidth: {
			control: 'boolean',
			name: 'full-width',
			description: 'Vult de volledige breedte van de container; items blijven gecentreerd',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		variant: '',
		compact: false,
		responsive: false,
		fullWidth: false,
	},
};

// Every item always has both icon and text for accessible, complete markup.
// variant on the item forces a specific visual presentation.
const tabBarItems = html`
	<nldd-tab-bar-item selected text="Home" icon="home"></nldd-tab-bar-item>
	<nldd-tab-bar-item text="Profiel" icon="profile"></nldd-tab-bar-item>
	<nldd-tab-bar-item text="Zoeken" icon="search"></nldd-tab-bar-item>
`;

const Template = ({ variant, compact, responsive, fullWidth }: Record<string, any>) => html`
	<nldd-tab-bar
		variant=${variant || nothing}
		?compact=${compact}
		?responsive=${responsive}
		?full-width=${fullWidth}
	>
		${tabBarItems}
	</nldd-tab-bar>
`;

export const Standaard = {
	render: Template,
};

export const MetTekstVariant = {
	render: () => html`
	<nldd-tab-bar variant="text">
		${tabBarItems}
	</nldd-tab-bar>
`,
	parameters: { controls: { disable: true } },
};

export const MetIconenVariant = {
	render: () => html`
	<nldd-tab-bar variant="icon">
		${tabBarItems}
	</nldd-tab-bar>
`,
	parameters: { controls: { disable: true } },
};


export const Compact = {
	render: () => html`
	<nldd-tab-bar compact>
		${tabBarItems}
	</nldd-tab-bar>
`,
	parameters: { controls: { disable: true } },
};

export const Responsief = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 2rem;">
		<div>
			<small>Breed (regular weergave)</small>
			<div style="container-type: inline-size; container-name: layout-area; width: 680px;">
				<nldd-tab-bar responsive full-width>
					${tabBarItems}
				</nldd-tab-bar>
			</div>
		</div>
		<div>
			<small>Smal onder 480px (compact weergave)</small>
			<div style="container-type: inline-size; container-name: layout-area; width: 320px;">
				<nldd-tab-bar responsive full-width>
					${tabBarItems}
				</nldd-tab-bar>
			</div>
		</div>
	</div>
`,
	parameters: { controls: { disable: true } },
};

export const VolleBreedte = {
	render: () => html`
	<div style="container-type: inline-size; container-name: layout-area;">
		<nldd-tab-bar full-width>
			${tabBarItems}
		</nldd-tab-bar>
	</div>
`,
	parameters: { controls: { disable: true } },
};

export const Gemengd = {
	render: () => html`
	<nldd-tab-bar>
		<nldd-tab-bar-item
			selected
			variant="text"
			text="Home"
			icon="home"
		></nldd-tab-bar-item>
		<nldd-tab-bar-item
			variant="text"
			text="Profiel"
			icon="profile"
		></nldd-tab-bar-item>
		<nldd-tab-bar-item
			variant="icon"
			text="Zoeken"
			icon="search"
		></nldd-tab-bar-item>
	</nldd-tab-bar>
`,
	parameters: { controls: { disable: true } },
};

export const Navigatie = {
	render: () => html`
	<nldd-tab-bar navigation accessible-label="Hoofdnavigatie">
		<nldd-tab-bar-item
			selected
			text="Home"
			icon="home"
			href="/home"
		></nldd-tab-bar-item>
		<nldd-tab-bar-item
			text="Profiel"
			icon="profile"
			href="/profiel"
		></nldd-tab-bar-item>
		<nldd-tab-bar-item
			text="Zoeken"
			icon="search"
			href="/zoeken"
		></nldd-tab-bar-item>
	</nldd-tab-bar>
`,
	parameters: { controls: { disable: true } },
};
