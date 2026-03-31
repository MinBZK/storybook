import { html, nothing } from 'lit';
import './rr-tab-bar.ts';
import './../../content/icon/rr-icon.ts';

export default {
	title: 'Components/Navigation/Tab Bar',
	component: 'rr-tab-bar',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/navigation/tab-bar/rr-tab-bar.ts',
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
	<rr-tab-bar-item
		selected
		text="Home"
	>
		<rr-icon slot="icon" name="home"></rr-icon>
	</rr-tab-bar-item>
	<rr-tab-bar-item text="Profiel">
		<rr-icon slot="icon" name="profile"></rr-icon>
	</rr-tab-bar-item>
	<rr-tab-bar-item text="Zoeken">
		<rr-icon slot="icon" name="search"></rr-icon>
	</rr-tab-bar-item>
`;

const Template = ({ variant, compact, responsive, fullWidth }) => html`
	<div style="container-type: inline-size; container-name: layout-area;">
		<rr-tab-bar
			variant=${variant || nothing}
			?compact=${compact}
			?responsive=${responsive}
			?full-width=${fullWidth}
		>
			${tabBarItems}
		</rr-tab-bar>
	</div>
`;

export const Standaard = Template.bind({});

export const MetTekstVariant = () => html`
	<rr-tab-bar variant="text">
		${tabBarItems}
	</rr-tab-bar>
`;
MetTekstVariant.parameters = { controls: { disable: true } };

export const MetIconenVariant = () => html`
	<rr-tab-bar variant="icon">
		${tabBarItems}
	</rr-tab-bar>
`;
MetIconenVariant.parameters = { controls: { disable: true } };


export const Compact = () => html`
	<rr-tab-bar compact>
		${tabBarItems}
	</rr-tab-bar>
`;
Compact.parameters = { controls: { disable: true } };

export const Responsief = () => html`
	<div style="display: flex; flex-direction: column; gap: 2rem;">
		<div>
			<p style="margin: 0 0 0.5rem 0; font-size: 12px; color: #666;">Breed (regular weergave)</p>
			<div style="container-type: inline-size; container-name: layout-area; width: 680px;">
				<rr-tab-bar responsive full-width>
					${tabBarItems}
				</rr-tab-bar>
			</div>
		</div>
		<div>
			<p style="margin: 0 0 0.5rem 0; font-size: 12px; color: #666;">Smal onder 480px (compact weergave)</p>
			<div style="container-type: inline-size; container-name: layout-area; width: 320px;">
				<rr-tab-bar responsive full-width>
					${tabBarItems}
				</rr-tab-bar>
			</div>
		</div>
	</div>
`;
Responsief.parameters = { controls: { disable: true } };

export const VolleBreedte = () => html`
	<div style="container-type: inline-size; container-name: layout-area;">
		<rr-tab-bar full-width>
			${tabBarItems}
		</rr-tab-bar>
	</div>
`;
VolleBreedte.parameters = { controls: { disable: true } };

export const Gemengd = () => html`
	<rr-tab-bar>
		<rr-tab-bar-item
			selected
			variant="text"
			text="Home"
		>
			<rr-icon slot="icon" name="home"></rr-icon>
		</rr-tab-bar-item>
		<rr-tab-bar-item
			variant="text"
			text="Profiel"
		>
			<rr-icon slot="icon" name="profile"></rr-icon>
		</rr-tab-bar-item>
		<rr-tab-bar-item
			variant="icon"
			text="Zoeken"
		>
			<rr-icon slot="icon" name="search"></rr-icon>
		</rr-tab-bar-item>
	</rr-tab-bar>
`;
Gemengd.parameters = { controls: { disable: true } };

export const Navigatie = () => html`
	<rr-tab-bar navigation accessible-label="Hoofdnavigatie">
		<rr-tab-bar-item
			selected
			text="Home"
			href="/home"
		>
			<rr-icon slot="icon" name="home"></rr-icon>
		</rr-tab-bar-item>
		<rr-tab-bar-item
			text="Profiel"
			href="/profiel"
		>
			<rr-icon slot="icon" name="profile"></rr-icon>
		</rr-tab-bar-item>
		<rr-tab-bar-item
			text="Zoeken"
			href="/zoeken"
		>
			<rr-icon slot="icon" name="search"></rr-icon>
		</rr-tab-bar-item>
	</rr-tab-bar>
`;
Navigatie.parameters = { controls: { disable: true } };
