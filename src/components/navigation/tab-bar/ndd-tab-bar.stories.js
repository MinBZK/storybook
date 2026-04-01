import { html, nothing } from 'lit';
import './ndd-tab-bar.ts';
import './../../content/icon/ndd-icon.ts';

export default {
	title: 'Components/Navigation/Tab Bar',
	component: 'ndd-tab-bar',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/navigation/tab-bar/ndd-tab-bar.ts',
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
	<ndd-tab-bar-item
		selected
		text="Home"
	>
		<ndd-icon slot="icon" name="home"></ndd-icon>
	</ndd-tab-bar-item>
	<ndd-tab-bar-item text="Profiel">
		<ndd-icon slot="icon" name="profile"></ndd-icon>
	</ndd-tab-bar-item>
	<ndd-tab-bar-item text="Zoeken">
		<ndd-icon slot="icon" name="search"></ndd-icon>
	</ndd-tab-bar-item>
`;

const Template = ({ variant, compact, responsive, fullWidth }) => html`
	<div style="container-type: inline-size; container-name: layout-area;">
		<ndd-tab-bar
			variant=${variant || nothing}
			?compact=${compact}
			?responsive=${responsive}
			?full-width=${fullWidth}
		>
			${tabBarItems}
		</ndd-tab-bar>
	</div>
`;

export const Standaard = Template.bind({});

export const MetTekstVariant = () => html`
	<ndd-tab-bar variant="text">
		${tabBarItems}
	</ndd-tab-bar>
`;
MetTekstVariant.parameters = { controls: { disable: true } };

export const MetIconenVariant = () => html`
	<ndd-tab-bar variant="icon">
		${tabBarItems}
	</ndd-tab-bar>
`;
MetIconenVariant.parameters = { controls: { disable: true } };


export const Compact = () => html`
	<ndd-tab-bar compact>
		${tabBarItems}
	</ndd-tab-bar>
`;
Compact.parameters = { controls: { disable: true } };

export const Responsief = () => html`
	<div style="display: flex; flex-direction: column; gap: 2rem;">
		<div>
			<small>Breed (regular weergave)</small>
			<div style="container-type: inline-size; container-name: layout-area; width: 680px;">
				<ndd-tab-bar responsive full-width>
					${tabBarItems}
				</ndd-tab-bar>
			</div>
		</div>
		<div>
			<small>Smal onder 480px (compact weergave)</small>
			<div style="container-type: inline-size; container-name: layout-area; width: 320px;">
				<ndd-tab-bar responsive full-width>
					${tabBarItems}
				</ndd-tab-bar>
			</div>
		</div>
	</div>
`;
Responsief.parameters = { controls: { disable: true } };

export const VolleBreedte = () => html`
	<div style="container-type: inline-size; container-name: layout-area;">
		<ndd-tab-bar full-width>
			${tabBarItems}
		</ndd-tab-bar>
	</div>
`;
VolleBreedte.parameters = { controls: { disable: true } };

export const Gemengd = () => html`
	<ndd-tab-bar>
		<ndd-tab-bar-item
			selected
			variant="text"
			text="Home"
		>
			<ndd-icon slot="icon" name="home"></ndd-icon>
		</ndd-tab-bar-item>
		<ndd-tab-bar-item
			variant="text"
			text="Profiel"
		>
			<ndd-icon slot="icon" name="profile"></ndd-icon>
		</ndd-tab-bar-item>
		<ndd-tab-bar-item
			variant="icon"
			text="Zoeken"
		>
			<ndd-icon slot="icon" name="search"></ndd-icon>
		</ndd-tab-bar-item>
	</ndd-tab-bar>
`;
Gemengd.parameters = { controls: { disable: true } };

export const Navigatie = () => html`
	<ndd-tab-bar navigation accessible-label="Hoofdnavigatie">
		<ndd-tab-bar-item
			selected
			text="Home"
			href="/home"
		>
			<ndd-icon slot="icon" name="home"></ndd-icon>
		</ndd-tab-bar-item>
		<ndd-tab-bar-item
			text="Profiel"
			href="/profiel"
		>
			<ndd-icon slot="icon" name="profile"></ndd-icon>
		</ndd-tab-bar-item>
		<ndd-tab-bar-item
			text="Zoeken"
			href="/zoeken"
		>
			<ndd-icon slot="icon" name="search"></ndd-icon>
		</ndd-tab-bar-item>
	</ndd-tab-bar>
`;
Navigatie.parameters = { controls: { disable: true } };
