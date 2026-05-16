import { html, nothing } from 'lit';
import './segmented-control.js';
import './../../content/icon/icon.js';

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
		variant: {
			control: 'select',
			options: ['text', 'icon'],
			name: 'variant',
			description: 'Inhoudstype van alle items: tekst of icoon. Combineren is niet ondersteund.',
			table: { defaultValue: { summary: 'text' } },
		},
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Grootte van de control',
			table: { defaultValue: { summary: 'md' } },
		},
		width: {
			control: 'text',
			description: 'Width mode: "full" (stretches to container), "fit-content" (per-item content size), or any CSS length (e.g. "240px")',
			table: { defaultValue: { summary: '' } },
		},
		value: {
			control: 'text',
			description: 'Geselecteerde waarde (radio) of spatie-gescheiden waarden (checkbox)',
		},
		type: {
			control: 'select',
			options: ['radio', 'checkbox'],
			description: 'Type selectie: radio (enkelvoudig) of checkbox (meervoudig)',
			table: { defaultValue: { summary: 'radio' } },
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijk label voor screen readers',
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		variant: 'text',
		size: 'md',
		width: '',
		value: 'vet',
		type: 'radio',
		accessibleLabel: '',
		disabled: false,
	},
};

const Template = ({ variant, size, width, value, type, accessibleLabel, disabled}: Record<string, any>) => html`
	<nldd-segmented-control
		value=${value}
		size=${size}
		type=${type}
		variant=${variant}
		?disabled=${disabled}
		width=${width || nothing}
		accessible-label=${accessibleLabel || nothing}
	>
		<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
		<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
		<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
	</nldd-segmented-control>
`;

export const Standaard = {
	render: Template,
	args: { value: 'vet' },
};

export const AlleToestanden = {
	render: () => html`
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
			<nldd-segmented-control value="vet" width="full" size="md">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
			<nldd-segmented-control value="vet" width="full" size="sm">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
			<nldd-segmented-control .values=${["vet", "cursief"]} type="checkbox" width="full" size="md">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
			<nldd-segmented-control value="vet" disabled width="full" size="md">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
			<nldd-segmented-control value="vet" variant="icon" width="full" size="md">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
			<nldd-segmented-control value="vet" variant="icon" width="full" size="sm">
				<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="onderstreept" text="Onderstreept" icon="underlined"></nldd-segmented-control-item>
			</nldd-segmented-control>
		</div>
	</div>
`,
	parameters: { controls: { disable: true } },
};
