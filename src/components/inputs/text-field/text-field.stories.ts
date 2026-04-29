import { action } from 'storybook/actions';
import { html } from 'lit';
import './text-field.js';
import '../../forms/form/form.js';
import '../../forms/form-field/form-field.js';
import '../../forms/form-actions/form-actions.js';
import '../../actions/button/button.js';
import '../../actions/button-group/button-group.js';

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
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Size variant',
			table: { defaultValue: { summary: 'md' } },
		},
		name: {
			control: 'text',
			description: 'Input name for form submission',
		},
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
		type: {
			control: 'select',
			options: ['text', 'email', 'tel', 'url'],
			description: 'Input type',
			table: { defaultValue: { summary: 'text' } },
		},
		autocomplete: {
			control: 'text',
			description: 'Browser autofill hint (HTML autocomplete attribute, bv. "name", "email", "off")',
			table: { defaultValue: { summary: '' } },
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
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		size: 'md',
		name: '',
		value: '',
		placeholder: 'Text field',
		type: 'text',
		autocomplete: '',
		valid: false,
		invalid: false,
		readonly: false,
		required: false,
		disabled: false,
	},
};

const Template = ({ size, name, value, placeholder, type, autocomplete, valid, invalid, readonly, required, disabled }: Record<string, any>) => html`
	<nldd-text-field
		.value=${value}
		.placeholder=${placeholder}
		size=${size}
		?valid=${valid}
		?invalid=${invalid}
		?disabled=${disabled}
		type=${type}
		name=${name}
		autocomplete=${autocomplete}
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
	<nldd-form label-alignment="right" novalidate>
		<nldd-form-field label="Volledige naam">
			<nldd-text-field
				name="name"
				@input=${action('input')}
				@change=${action('change')}
			></nldd-text-field>
		</nldd-form-field>
		<nldd-form-field label="E-mail">
			<nldd-text-field
				name="email"
				type="email"
				@input=${action('input')}
				@change=${action('change')}
			></nldd-text-field>
		</nldd-form-field>
		<nldd-form-field label="Telefoonnummer">
			<nldd-text-field
				name="phone"
				type="tel"
				@input=${action('input')}
				@change=${action('change')}
			></nldd-text-field>
		</nldd-form-field>
		<nldd-form-actions>
			<nldd-button-group>
				<nldd-button variant="primary" type="submit" text="Opslaan"></nldd-button>
			</nldd-button-group>
		</nldd-form-actions>
	</nldd-form>
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
