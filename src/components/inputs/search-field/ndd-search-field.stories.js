import { html } from 'lit';
import './ndd-search-field.ts';

/**
 * De Search Field component is een zoekveld met zoekicoon, een optionele dismiss knop
 * en een optionele zoekknop.
 */
export default {
	title: 'Components/Inputs/Search Field',
	component: 'ndd-search-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/search-field/ndd-search-field.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		value: {
			control: 'text',
			description: 'Huidige zoekwaarde',
			table: { defaultValue: { summary: '' } },
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder tekst',
			table: { defaultValue: { summary: 'Zoeken' } },
		},
		accessibleLabel: {
			control: 'text',
			name: 'accessible-label',
			description:
				'Toegankelijkheidslabel voor de input. Valt automatisch terug op de placeholder als niet ingevuld.',
		},
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Grootte van het veld',
			table: { defaultValue: { summary: 'md' } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
		hasSearchButton: {
			control: 'boolean',
			name: 'has-search-button',
			description: 'Toont een zoekknop aan de rechterkant',
			table: { defaultValue: { summary: false } },
		},
		name: {
			control: 'text',
			description: 'Naam voor formulierverwerking',
		},
	},
	args: {
		value: '',
		placeholder: 'Zoeken',
		accessibleLabel: '',
		size: 'md',
		disabled: false,
		hasSearchButton: false,
		name: '',
	},
};

const Template = ({
	value,
	placeholder,
	accessibleLabel,
	size,
	disabled,
	hasSearchButton,
	name,
}) => html`
	<ndd-search-field
		value=${value}
		placeholder=${placeholder}
		accessible-label=${accessibleLabel}
		size=${size}
		?disabled=${disabled}
		?has-search-button=${hasSearchButton}
		name=${name}
	></ndd-search-field>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const MetZoekKnop = Template.bind({});
MetZoekKnop.args = { hasSearchButton: true };

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<ndd-search-field size="md" placeholder="Zoeken"></ndd-search-field>
		<ndd-search-field size="md" placeholder="Zoeken" value="Zoekterm"></ndd-search-field>
		<ndd-search-field size="md" placeholder="Zoeken" has-search-button></ndd-search-field>
		<ndd-search-field
			size="md"
			placeholder="Zoeken"
			value="Zoekterm"
			has-search-button
		></ndd-search-field>
		<ndd-search-field size="sm" placeholder="Zoeken"></ndd-search-field>
		<ndd-search-field size="sm" placeholder="Zoeken" value="Zoekterm"></ndd-search-field>
		<ndd-search-field size="sm" placeholder="Zoeken" has-search-button></ndd-search-field>
		<ndd-search-field
			size="sm"
			placeholder="Zoeken"
			value="Zoekterm"
			has-search-button
		></ndd-search-field>
		<ndd-search-field size="md" placeholder="Zoeken" disabled></ndd-search-field>
		<ndd-search-field size="md" placeholder="Zoeken" value="Zoekterm" disabled></ndd-search-field>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
