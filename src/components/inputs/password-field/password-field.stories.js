import { html } from 'lit';
import './password-field.ts';

/**
 * De Password Field component voor wachtwoordinvoer met zichtbaarheidstoggle.
 *
 * ## Gebruik
 * ```html
 * <nldd-password-field placeholder="Password field"></nldd-password-field>
 * ```
 */
export default {
	title: 'Components/Inputs/Password Field',
	component: 'nldd-password-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/password-field/password-field.ts',
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
			table: { defaultValue: { summary: true } },
		},
		showText: {
			control: 'text',
			name: 'show-text',
			description: 'Zichtbare knoptekst wanneer gemaskeerd',
			table: { defaultValue: { summary: 'Toon' } },
		},
		hideText: {
			control: 'text',
			name: 'hide-text',
			description: 'Zichtbare knoptekst wanneer zichtbaar',
			table: { defaultValue: { summary: 'Verberg' } },
		},
		showAccessibleLabel: {
			control: 'text',
			name: 'show-accessible-label',
			description: 'aria-label for toggle button when masked',
			table: { defaultValue: { summary: 'Toon wachtwoord' } },
		},
		hideAccessibleLabel: {
			control: 'text',
			name: 'hide-accessible-label',
			description: 'aria-label for toggle button when unmasked',
			table: { defaultValue: { summary: 'Verberg wachtwoord' } },
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
		masked: true,
		showText: 'Toon',
		hideText: 'Verberg',
		showAccessibleLabel: 'Toon wachtwoord',
		hideAccessibleLabel: 'Verberg wachtwoord',
		name: 'password',
	},
};

const Template = ({ value, placeholder, size, valid, invalid, disabled, masked, showText, hideText, showAccessibleLabel, hideAccessibleLabel, name }) => html`
	<nldd-password-field
		.value=${value}
		.placeholder=${placeholder}
		size=${size}
		?valid=${valid}
		?invalid=${invalid}
		?disabled=${disabled}
		.masked=${masked}
		show-text=${showText}
		hide-text=${hideText}
		show-accessible-label=${showAccessibleLabel}
		hide-accessible-label=${hideAccessibleLabel}
		name=${name}
	></nldd-password-field>
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
		<nldd-password-field placeholder="Neutral"></nldd-password-field>
		<nldd-password-field .value=${"strong-password"} valid></nldd-password-field>
		<nldd-password-field .value=${"123"} invalid></nldd-password-field>
		<nldd-password-field .value=${"disabled"} disabled></nldd-password-field>
		<nldd-password-field .value=${"unmasked"} .masked=${false}></nldd-password-field>
	</div>
`;
AllStates.parameters = { controls: { disable: true } };

export const Sizes = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<nldd-password-field placeholder="Medium (md)"></nldd-password-field>
		<nldd-password-field placeholder="Small (sm)" size="sm"></nldd-password-field>
	</div>
`;
Sizes.parameters = { controls: { disable: true } };
