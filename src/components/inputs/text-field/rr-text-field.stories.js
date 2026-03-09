import { html } from 'lit';
import './rr-text-field.ts';

/**
 * `rr-text-field` is a single-line text input.
 *
 * ### Validation
 * Set `valid` or `invalid` boolean attributes to show the corresponding
 * validation icon and border color.
 *
 * ```html
 * <rr-text-field valid></rr-text-field>
 * <rr-text-field invalid></rr-text-field>
 * ```
 *
 * ### Size
 * Use `size="sm"` for a smaller variant. The parent `rr-form-field` sets
 * this automatically via its own `size` attribute.
 *
 * ```html
 * <rr-text-field size="sm"></rr-text-field>
 * ```
 */
export default {
	title: 'Components/Inputs/Text Field',
	component: 'rr-text-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/text-field/rr-text-field.ts',
			repository: 'https://github.com/regelrecht/design-system',
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
	<rr-text-field
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
	></rr-text-field>
`;

export const Default = Template.bind({});

export const AllStates = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<rr-text-field placeholder="Neutral"></rr-text-field>
		<rr-text-field .value=${'Valid input'} valid></rr-text-field>
		<rr-text-field .value=${'Invalid input'} invalid></rr-text-field>
		<rr-text-field .value=${'Disabled'} disabled></rr-text-field>
		<rr-text-field .value=${'Readonly'} readonly></rr-text-field>
	</div>
`;
AllStates.parameters = { controls: { disable: true } };

export const Sizes = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<rr-text-field placeholder="Medium (md)"></rr-text-field>
		<rr-text-field placeholder="Small (sm)" size="sm"></rr-text-field>
	</div>
`;
Sizes.parameters = { controls: { disable: true } };

export const InteractiveExample = () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<rr-text-field
			name="name"
			placeholder="Full name"
			@input=${(e) => console.log('Input:', e.detail.value)}
			@change=${(e) => console.log('Change:', e.detail.value)}
		></rr-text-field>
		<rr-text-field
			name="email"
			type="email"
			placeholder="your@email.com"
			@input=${(e) => console.log('Input:', e.detail.value)}
			@change=${(e) => console.log('Change:', e.detail.value)}
		></rr-text-field>
		<rr-text-field
			name="phone"
			type="tel"
			placeholder="+31 6 12345678"
			@input=${(e) => console.log('Input:', e.detail.value)}
			@change=${(e) => console.log('Change:', e.detail.value)}
		></rr-text-field>
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
