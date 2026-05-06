import { action } from 'storybook/actions';
import { html } from 'lit';
import './multi-line-text-field.js';
import '../../forms/form/form.js';
import '../../forms/form-field/form-field.js';
import '../../forms/form-actions/form-actions.js';
import '../../actions/button/button.js';
import '../../actions/button-group/button-group.js';

/**
 * `nldd-multi-line-text-field` is een meerregelig tekstveld op basis van
 * het native `<textarea>` element. Voor enkele regels: zie `nldd-text-field`.
 *
 * ### Validatie
 * Zet `valid` of `invalid` om het bijbehorende validatie-icoon en de
 * randkleur te tonen.
 *
 * ```html
 * <nldd-multi-line-text-field valid></nldd-multi-line-text-field>
 * <nldd-multi-line-text-field invalid></nldd-multi-line-text-field>
 * ```
 *
 * ### Hoogte en resize
 * Met `rows` zet je de initiële (en minimum) hoogte in regels. Het
 * `resize` attribuut bepaalt hoe het veld kan groeien:
 *
 * - `vertical` (default): gebruiker mag verticaal slepen
 * - `auto`: groeit automatisch mee met de inhoud (`field-sizing: content`)
 * - `none`: vaste hoogte, geen handle
 *
 * ```html
 * <nldd-multi-line-text-field resize="vertical"></nldd-multi-line-text-field>
 * <nldd-multi-line-text-field resize="auto"></nldd-multi-line-text-field>
 * <nldd-multi-line-text-field resize="none"></nldd-multi-line-text-field>
 * ```
 *
 * ### Size
 * Gebruik `size="sm"` voor de compacte variant. Wordt automatisch gezet
 * door `nldd-form-field` via diens `size` attribuut.
 */
export default {
	title: 'Components/Inputs/Multi-line Text Field',
	component: 'nldd-multi-line-text-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/multi-line-text-field/multi-line-text-field.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	args: {
		size: 'md',
		resize: 'vertical',
		rows: 3,
		width: '',
		placeholder: 'Schrijf hier je toelichting',
		valid: false,
		invalid: false,
		readonly: false,
		disabled: false,
		name: '',
		value: '',
		required: false,
		autocomplete: '',
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Size variant',
			table: { defaultValue: { summary: 'md' } },
		},
		resize: {
			control: 'select',
			options: ['none', 'vertical', 'auto'],
			description: 'Resize gedrag. "auto" laat het veld meegroeien met de inhoud.',
			table: { defaultValue: { summary: 'vertical' } },
		},
		rows: {
			control: 'number',
			description: 'Initiële hoogte in regels (minimum)',
			table: { defaultValue: { summary: '3' } },
		},
		width: {
			control: 'text',
			description: 'Optional fixed width (any CSS length, bv. "240px"). Leeg = stretch.',
			table: { defaultValue: { summary: '' } },
		},
		placeholder: {
			control: 'text',
			description: 'Placeholdertekst',
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
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
			table: { defaultValue: { summary: false } },
		},
		name: {
			control: 'text',
			description: 'Name voor form submission',
			table: { defaultValue: { summary: '' } },
		},
		value: {
			control: 'text',
			description: 'Veldwaarde',
			table: { defaultValue: { summary: '' } },
		},
		required: {
			control: 'boolean',
			description: 'Required state',
			table: { defaultValue: { summary: false } },
		},
		autocomplete: {
			control: 'text',
			description: 'Browser autofill hint (HTML autocomplete attribute, bv. "off")',
			table: { defaultValue: { summary: '' } },
		},
	},
};

const Template = ({ size, resize, rows, width, placeholder, valid, invalid, readonly, disabled, name, value, required, autocomplete }: Record<string, any>) => html`
	<nldd-multi-line-text-field
		size=${size}
		resize=${resize}
		rows=${rows}
		width=${width}
		.placeholder=${placeholder}
		?valid=${valid}
		?invalid=${invalid}
		?readonly=${readonly}
		?disabled=${disabled}
		name=${name}
		.value=${value}
		?required=${required}
		autocomplete=${autocomplete}
	></nldd-multi-line-text-field>
`;

export const Default = {
	render: Template,
};

export const AllStates = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<nldd-multi-line-text-field placeholder="Neutral"></nldd-multi-line-text-field>
			<nldd-multi-line-text-field .value=${'Geldige inhoud op meerdere\nregels'} valid></nldd-multi-line-text-field>
			<nldd-multi-line-text-field .value=${'Ongeldige inhoud op meerdere\nregels'} invalid></nldd-multi-line-text-field>
			<nldd-multi-line-text-field .value=${'Disabled'} disabled></nldd-multi-line-text-field>
			<nldd-multi-line-text-field .value=${'Readonly inhoud die niet bewerkt mag worden.'} readonly></nldd-multi-line-text-field>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<nldd-multi-line-text-field placeholder="Medium (md)"></nldd-multi-line-text-field>
			<nldd-multi-line-text-field placeholder="Small (sm)" size="sm"></nldd-multi-line-text-field>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const AutoResize = {
	render: () => html`
		<nldd-multi-line-text-field
			placeholder="Typ hier — het veld groeit mee met de inhoud"
			resize="auto"
			rows="2"
		></nldd-multi-line-text-field>
	`,
	parameters: { controls: { disable: true } },
};

export const InteractiveExample = {
	render: () => html`
		<nldd-form label-alignment="right" novalidate>
			<nldd-form-field label="Toelichting">
				<nldd-multi-line-text-field
					name="notes"
					rows="4"
					@input=${action('input')}
					@change=${action('change')}
				></nldd-multi-line-text-field>
			</nldd-form-field>
			<nldd-form-field label="Aanvullende opmerkingen">
				<nldd-multi-line-text-field
					name="comments"
					resize="auto"
					rows="2"
					@input=${action('input')}
					@change=${action('change')}
				></nldd-multi-line-text-field>
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
				story: 'Open de browserconsole om `input` en `change` events te zien.',
			},
		},
	},
};
