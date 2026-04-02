import { html } from 'lit';
import './ndd-switch.ts';

/**
 * De Switch component is een toggle control voor aan/uit instellingen.
 */
export default {
	title: 'Components/Inputs/Switch',
	component: 'ndd-switch',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/switch/ndd-switch.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		checked: {
			control: 'boolean',
			description: 'Aangevinkte toestand',
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
		size: {
			control: 'select',
			options: ['xs', 'sm'],
			description: 'Grootte van de switch',
			table: { defaultValue: { summary: 'sm' } },
		},
	},
	args: {
		checked: false,
		disabled: false,
		size: 'sm',
	},
};

const Template = ({ checked, disabled, size }) => html`
	<ndd-switch
		?checked=${checked}
		?disabled=${disabled}
		size=${size}
		accessible-label="Switch"
	></ndd-switch>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<div style="display: flex; gap: 2rem; align-items: center;">
			<ndd-switch accessible-label="Niet aan" size="sm"></ndd-switch>
			<ndd-switch accessible-label="Aan" size="sm" checked></ndd-switch>
			<ndd-switch accessible-label="Uitgeschakeld" size="sm" disabled></ndd-switch>
			<ndd-switch accessible-label="Aan en uitgeschakeld" size="sm" checked disabled></ndd-switch>
		</div>
		<div style="display: flex; gap: 2rem; align-items: center;">
			<ndd-switch accessible-label="Niet aan klein" size="xs"></ndd-switch>
			<ndd-switch accessible-label="Aan klein" size="xs" checked></ndd-switch>
			<ndd-switch accessible-label="Uitgeschakeld klein" size="xs" disabled></ndd-switch>
			<ndd-switch
				accessible-label="Aan en uitgeschakeld klein"
				size="xs"
				checked
				disabled
			></ndd-switch>
		</div>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
