import { action } from 'storybook/actions';
import { html } from 'lit';
import './ndd-text-field.ts';

/**
 * `ndd-text-field` is a single-line text input.
 *
 * ### Validation
 * Set `valid` or `invalid` boolean attributes to show the corresponding
 * validation icon and border color.
 *
 * ```html
 * <ndd-text-field valid></ndd-text-field>
 * <ndd-text-field invalid></ndd-text-field>
 * ```
 *
 * ### Size
 * Use `size="sm"` for a smaller variant. The parent `ndd-form-field` sets
 * this automatically via its own `size` attribute.
 *
 * ```html
 * <ndd-text-field size="sm"></ndd-text-field>
 * ```
 */
export default {
	title: 'Components/Inputs/Text Field',
	component: 'ndd-text-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/text-field/ndd-text-field.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		value: {
			control: 'text',
			description: 'Input value',
			table: { defaultValue: { summary: '' } },
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text',
			table: { defaultValue: { summary: '' } },
		},
		size: {
			control: 'select',
			options: ['md', 'sm'],
			description: 'Size variant',
			table: { defaultValue: { summary: 'md' } },
		},
		valid: {
			control: 'boolean',
			description: 'Valid state',
			table: { defaultValue: { summary: false } },
		},
		invalid: {
			control: 'boolean',
			description: 'Invalid state',
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
			table: { defaultValue: { summary: false } },
		},
		type: {
			control: 'select',
			options: ['text', 'email', 'tel', 'url'],
			description: 'Input type',
			table: { defaultValue: { summary: 'text' } },
		},
		name: {
			control: 'text',
			description: 'Input name for form submission',
		},
		readonly: {
			control: 'boolean',
			description: 'Readonly state',
			table: { defaultValue: { summary: false } },
		},
		required: {
			control: 'boolean',
			description: 'Required state',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		value: '',
		placeholder: 'Text field',
		size: 'md',
		valid: false,
		invalid: false,
		disabled: false,
		type: 'text',
		name: '',
		readonly: false,
		required: false,
	},
};

const Template = ({ value, placeholder, size, valid, invalid, disabled, type, name, readonly, required }) => html`
	<ndd-text-field
		.value=${value}
		.placeholder=${placeholder}
		size=${size}
		?valid=${valid}
		?invalid=${invalid}
		?disabled=${disabled}
		type=${type}
		name=${name}
		?readonly=${readonly}
		?required=${required}
	></ndd-text-field>
`;

export const Default = Template.bind({});

export const AllStates = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<ndd-text-field placeholder="Neutral"></ndd-text-field>
		<ndd-text-field .value=${'Valid input'} valid></ndd-text-field>
		<ndd-text-field .value=${'Invalid input'} invalid></ndd-text-field>
		<ndd-text-field .value=${'Disabled'} disabled></ndd-text-field>
		<ndd-text-field .value=${'Readonly'} readonly></ndd-text-field>
	</div>
`;
AllStates.parameters = { controls: { disable: true } };

export const Sizes = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<ndd-text-field placeholder="Medium (md)"></ndd-text-field>
		<ndd-text-field placeholder="Small (sm)" size="sm"></ndd-text-field>
	</div>
`;
Sizes.parameters = { controls: { disable: true } };

export const InteractiveExample = () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<ndd-text-field
			name="name"
			placeholder="Full name"
			@input=${action('input')}
			@change=${action('change')}
		></ndd-text-field>
		<ndd-text-field
			name="email"
			type="email"
			placeholder="your@email.com"
			@input=${action('input')}
			@change=${action('change')}
		></ndd-text-field>
		<ndd-text-field
			name="phone"
			type="tel"
			placeholder="+31 6 12345678"
			@input=${action('input')}
			@change=${action('change')}
		></ndd-text-field>
	</div>
`;
InteractiveExample.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Open the browser console to see `input` and `change` events.',
		},
	},
};
