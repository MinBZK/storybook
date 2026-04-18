import { html } from 'lit';
import './segmented-control.ts';
import './../../content/icon/icon.ts';

/**
 * De Segmented Control component is een horizontale groep van wederzijds exclusieve (radio)
 * of meervoudig selecteerbare (checkbox) opties.
 */
export default {
	title: 'Components/Inputs/Segmented Control',
	component: 'nldd-segmented-control',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/segmented-control/segmented-control.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		value: {
			control: 'text',
			description: 'Geselecteerde waarde (radio) of spatie-gescheiden waarden (checkbox)',
		},
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Grootte van de control',
			table: { defaultValue: { summary: 'md' } },
		},
		type: {
			control: 'select',
			options: ['radio', 'checkbox'],
			description: 'Type selectie: radio (enkelvoudig) of checkbox (meervoudig)',
			table: { defaultValue: { summary: 'radio' } },
		},
		variant: {
			control: 'select',
			options: ['text', 'icon'],
			name: 'variant',
			description: 'Inhoudstype van alle items: tekst of icoon. Combineren is niet ondersteund.',
			table: { defaultValue: { summary: 'text' } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
		fullWidth: {
			control: 'boolean',
			name: 'full-width',
			description: 'Vult de volledige breedte van de container',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		value: 'vet',
		size: 'md',
		type: 'radio',
		variant: 'text',
		disabled: false,
		fullWidth: false,
	},
};

const Template = ({ value, size, type, variant, disabled, fullWidth }) => html`
	<nldd-segmented-control
		value=${value}
		size=${size}
		type=${type}
		variant=${variant}
		?disabled=${disabled}
		?full-width=${fullWidth}
	>
		<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
		<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
		<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
	</nldd-segmented-control>
`;

export const Standaard = Template.bind({});
Standaard.args = { value: 'vet' };

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem;">
		<nldd-segmented-control value="vet" size="md">
			<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
		</nldd-segmented-control>
		<nldd-segmented-control value="vet" size="sm">
			<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
		</nldd-segmented-control>
		<nldd-segmented-control .values=${["vet", "cursief"]} type="checkbox" size="md">
			<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
		</nldd-segmented-control>
		<nldd-segmented-control value="vet" disabled size="md">
			<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
		</nldd-segmented-control>
		<nldd-segmented-control value="vet" variant="icon" size="md">
			<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
		</nldd-segmented-control>
		<nldd-segmented-control value="vet" variant="icon" size="sm">
			<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
			<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
		</nldd-segmented-control>
		<div style="width: 400px; display: flex; flex-direction: column; gap: 1rem;">
			<nldd-segmented-control value="vet" full-width size="md">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
			<nldd-segmented-control value="vet" full-width size="sm">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
			<nldd-segmented-control .values=${["vet", "cursief"]} type="checkbox" full-width size="md">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
			<nldd-segmented-control value="vet" disabled full-width size="md">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
			<nldd-segmented-control value="vet" variant="icon" full-width size="md">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
			<nldd-segmented-control value="vet" variant="icon" full-width size="sm">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
		</div>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
