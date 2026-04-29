import { html } from 'lit';
import './password-field.js';

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
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Size variant',
			table: { defaultValue: { summary: 'md' } },
		},
		name: {
			control: 'text',
			description: 'Form field name',
		},
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
		showText: {
			name: 'show-text',
			control: 'text',
			description: 'Zichtbare knoptekst wanneer gemaskeerd',
			table: { defaultValue: { summary: 'Toon' } },
		},
		hideText: {
			name: 'hide-text',
			control: 'text',
			description: 'Zichtbare knoptekst wanneer zichtbaar',
			table: { defaultValue: { summary: 'Verberg' } },
		},
		showAccessibleLabel: {
			name: 'show-accessible-label',
			control: 'text',
			description: 'aria-label for toggle button when masked',
			table: { defaultValue: { summary: 'Toon wachtwoord' } },
		},
		hideAccessibleLabel: {
			name: 'hide-accessible-label',
			control: 'text',
			description: 'aria-label for toggle button when unmasked',
			table: { defaultValue: { summary: 'Verberg wachtwoord' } },
		},
		autocomplete: {
			control: 'select',
			options: ['', 'off', 'current-password', 'new-password'],
			description: 'Browser autofill hint (HTML autocomplete attribute)',
			table: { defaultValue: { summary: '' } },
		},
		masked: {
			control: 'boolean',
			description: 'Whether the password is masked',
			table: { defaultValue: { summary: true } },
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
		width: {
			control: 'text',
			description: 'Optional fixed width (any CSS length, bv. "240px"). Leeg = stretch.',
			table: { defaultValue: { summary: '' } },
		},
	},
	args: {
		size: 'md',
		name: 'password',
		value: '',
		placeholder: 'Password field',
		showText: 'Toon',
		hideText: 'Verberg',
		showAccessibleLabel: 'Toon wachtwoord',
		hideAccessibleLabel: 'Verberg wachtwoord',
		autocomplete: '',
		masked: true,
		valid: false,
		invalid: false,
		disabled: false,
		width: '',
	},
};

const Template = ({ size, name, value, placeholder, showText, hideText, showAccessibleLabel, hideAccessibleLabel, autocomplete, masked, valid, invalid, disabled, width }: Record<string, any>) => html`
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
		autocomplete=${autocomplete}
		width=${width}
	></nldd-password-field>
`;

export const Default = {
	render: Template,
};

export const Unmasked = {
	render: Template,
	args: {
		value: 'visible-password',
		masked: false,
	},
};

export const Valid = {
	render: Template,
	args: {
		value: 'strong-password-123',
		valid: true,
	},
};

export const Invalid = {
	render: Template,
	args: {
		value: '123',
		invalid: true,
	},
};

export const Disabled = {
	render: Template,
	args: {
		value: 'disabled-password',
		disabled: true,
	},
};

export const AllStates = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<nldd-password-field placeholder="Neutral"></nldd-password-field>
		<nldd-password-field .value=${"strong-password"} valid></nldd-password-field>
		<nldd-password-field .value=${"123"} invalid></nldd-password-field>
		<nldd-password-field .value=${"disabled"} disabled></nldd-password-field>
		<nldd-password-field .value=${"unmasked"} .masked=${false}></nldd-password-field>
	</div>
`,
	parameters: { controls: { disable: true } },
};

export const Sizes = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<nldd-password-field placeholder="Medium (md)"></nldd-password-field>
		<nldd-password-field placeholder="Small (sm)" size="sm"></nldd-password-field>
	</div>
`,
	parameters: { controls: { disable: true } },
};
