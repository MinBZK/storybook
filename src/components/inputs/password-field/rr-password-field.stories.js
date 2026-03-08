import { html } from 'lit';
import './rr-password-field.ts';

/**
 * De Password Field component voor wachtwoordinvoer met zichtbaarheidstoggle.
 *
 * ## Gebruik
 * ```html
 * <rr-password-field placeholder="Password field"></rr-password-field>
 * ```
 */
export default {
	title: 'Components/Inputs/Password Field',
	component: 'rr-password-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/password-field/rr-password-field.ts',
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
			table: { defaultValue: { summary: 'Password field' } },
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
		masked: {
			control: 'boolean',
			description: 'Whether the password is masked',
			table: { defaultValue: { summary: false } },
		},
		name: {
			control: 'text',
			description: 'Form field name',
		},
	},
	args: {
		value: '',
		placeholder: 'Password field',
		size: 'md',
		valid: false,
		invalid: false,
		disabled: false,
		masked: false,
		name: 'password',
	},
};

const Template = ({ value, placeholder, size, valid, invalid, disabled, masked, name }) => html`
	<rr-password-field
		value=${value}
		placeholder=${placeholder}
		size=${size}
		?valid=${valid}
		?invalid=${invalid}
		?disabled=${disabled}
		?masked=${masked}
		name=${name}
	></rr-password-field>
`;

export const Default = Template.bind({});

export const Unmasked = Template.bind({});
Unmasked.args = {
	value: 'visible-password',
	masked: false,
};

export const Valid = Template.bind({});
Valid.args = {
	value: 'strong-password-123',
	valid: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
	value: '123',
	invalid: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	value: 'disabled-password',
	disabled: true,
};

export const AllStates = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<rr-password-field placeholder="Neutral"></rr-password-field>
		<rr-password-field value="strong-password" valid></rr-password-field>
		<rr-password-field value="123" invalid></rr-password-field>
		<rr-password-field value="disabled" disabled></rr-password-field>
		<rr-password-field value="unmasked" .masked=${false}></rr-password-field>
	</div>
`;
AllStates.parameters = { controls: { disable: true } };

export const Sizes = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<rr-password-field placeholder="Medium (md)"></rr-password-field>
		<rr-password-field placeholder="Small (sm)" size="sm"></rr-password-field>
	</div>
`;
Sizes.parameters = { controls: { disable: true } };
