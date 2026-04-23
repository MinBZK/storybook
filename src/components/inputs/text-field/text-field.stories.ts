import { action } from 'storybook/actions';
import { html } from 'lit';
import './text-field.js';

/**
 * `nldd-text-field` is a single-line text input.
 *
 * ### Validation
 * Set `valid` or `invalid` boolean attributes to show the corresponding
 * validation icon and border color.
 *
 * ```html
 * <nldd-text-field valid></nldd-text-field>
 * <nldd-text-field invalid></nldd-text-field>
 * ```
 *
 * ### Size
 * Use `size="sm"` for a smaller variant. The parent `nldd-form-field` sets
 * this automatically via its own `size` attribute.
 *
 * ```html
 * <nldd-text-field size="sm"></nldd-text-field>
 * ```
 */
export default {
	title: 'Components/Inputs/Text Field',
	component: 'nldd-text-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/text-field/text-field.ts',
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
			options: ['sm', 'md'],
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

const Template = ({ value, placeholder, size, valid, invalid, disabled, type, name, readonly, required }: Record<string, any>) => html`
	<nldd-text-field
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
	></nldd-text-field>
`;

export const Default = {
	render: Template,
};

export const AllStates = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<nldd-text-field placeholder="Neutral"></nldd-text-field>
		<nldd-text-field .value=${'Valid input'} valid></nldd-text-field>
		<nldd-text-field .value=${'Invalid input'} invalid></nldd-text-field>
		<nldd-text-field .value=${'Disabled'} disabled></nldd-text-field>
		<nldd-text-field .value=${'Readonly'} readonly></nldd-text-field>
	</div>
`,
	parameters: { controls: { disable: true } },
};

export const Sizes = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<nldd-text-field placeholder="Medium (md)"></nldd-text-field>
		<nldd-text-field placeholder="Small (sm)" size="sm"></nldd-text-field>
	</div>
`,
	parameters: { controls: { disable: true } },
};

export const InteractiveExample = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<nldd-text-field
			name="name"
			placeholder="Full name"
			@input=${action('input')}
			@change=${action('change')}
		></nldd-text-field>
		<nldd-text-field
			name="email"
			type="email"
			placeholder="your@email.com"
			@input=${action('input')}
			@change=${action('change')}
		></nldd-text-field>
		<nldd-text-field
			name="phone"
			type="tel"
			placeholder="+31 6 12345678"
			@input=${action('input')}
			@change=${action('change')}
		></nldd-text-field>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Open the browser console to see `input` and `change` events.',
			},
	},
},
};
