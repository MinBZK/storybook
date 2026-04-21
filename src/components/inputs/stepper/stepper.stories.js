import { html } from 'lit';
import './stepper.js';

/**
 * De Stepper component is een numerieke control met increment en decrement knoppen.
 */
export default {
	title: 'Components/Inputs/Stepper',
	component: 'nldd-stepper',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/stepper/stepper.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		value: {
			control: { type: 'number' },
			description: 'Huidige waarde',
			table: { defaultValue: { summary: 0 } },
		},
		min: {
			control: { type: 'number' },
			description: 'Minimale waarde',
			table: { defaultValue: { summary: 0 } },
		},
		max: {
			control: { type: 'number' },
			description: 'Maximale waarde',
			table: { defaultValue: { summary: 'Infinity' } },
		},
		step: {
			control: { type: 'number' },
			description: 'Stapgrootte',
			table: { defaultValue: { summary: 1 } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Grootte van de stepper',
			table: { defaultValue: { summary: 'md' } },
		},
	},
	args: {
		value: 5,
		min: 0,
		max: 10,
		step: 1,
		disabled: false,
		size: 'md',
	},
};

const Template = ({ value, min, max, step, disabled, size }) => html`
	<div style="display: flex; gap: 1rem; align-items: center;">
		<span style="font: var(--primitives-font-body-md-regular-snug); min-width: 2ch;"
			.textContent=${String(value)}
		></span>
		<nldd-stepper
			value=${value}
			min=${min}
			max=${max}
			step=${step}
			?disabled=${disabled}
			size=${size}
			@change=${(e) => {
				const display = e.target.previousElementSibling;
				if (display) display.textContent = e.detail.value;
			}}
		></nldd-stepper>
	</div>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<div style="display: flex; gap: 1rem; align-items: center;">
			<span style="font: var(--primitives-font-body-md-regular-snug); min-width: 2ch;">5</span>
			<nldd-stepper value="5" min="0" max="10" size="md"
				@change=${(e) => { e.target.previousElementSibling.textContent = e.detail.value; }}
			></nldd-stepper>
		</div>
		<div style="display: flex; gap: 1rem; align-items: center;">
			<span style="font: var(--primitives-font-body-md-regular-snug); min-width: 2ch;">5</span>
			<nldd-stepper value="5" min="0" max="10" size="sm"
				@change=${(e) => { e.target.previousElementSibling.textContent = e.detail.value; }}
			></nldd-stepper>
		</div>
		<div style="display: flex; gap: 1rem; align-items: center;">
			<span style="font: var(--primitives-font-body-md-regular-snug); min-width: 2ch;">5</span>
			<nldd-stepper value="5" min="0" max="10" size="xs"
				@change=${(e) => { e.target.previousElementSibling.textContent = e.detail.value; }}
			></nldd-stepper>
		</div>
		<div style="display: flex; gap: 1rem; align-items: center;">
			<span style="font: var(--primitives-font-body-md-regular-snug); min-width: 2ch;">0</span>
			<nldd-stepper value="0" min="0" max="10" size="md"
				@change=${(e) => { e.target.previousElementSibling.textContent = e.detail.value; }}
			></nldd-stepper>
		</div>
		<div style="display: flex; gap: 1rem; align-items: center;">
			<span style="font: var(--primitives-font-body-md-regular-snug); min-width: 2ch;">10</span>
			<nldd-stepper value="10" min="0" max="10" size="md"
				@change=${(e) => { e.target.previousElementSibling.textContent = e.detail.value; }}
			></nldd-stepper>
		</div>
		<div style="display: flex; gap: 1rem; align-items: center;">
			<span style="font: var(--primitives-font-body-md-regular-snug); min-width: 2ch;">5</span>
			<nldd-stepper value="5" min="0" max="10" size="md" disabled></nldd-stepper>
		</div>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
