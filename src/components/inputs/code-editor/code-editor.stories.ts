import { html, nothing } from 'lit';
import './code-editor.ts';

export default {
	title: 'Components/Inputs/Code Editor',
	component: 'nldd-code-editor',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/code-editor/code-editor.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'stable' },
	},
	args: {
		value: '',
		placeholder: '',
		rows: 6,
		resize: 'vertical',
		wrap: false,
		disabled: false,
		readonly: false,
		accessibleLabel: 'Code',
	},
	argTypes: {
		value: {
			control: 'text',
			description: 'De inhoud van het veld',
			table: { defaultValue: { summary: '' } },
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder tekst',
			table: { defaultValue: { summary: '' } },
		},
		rows: {
			control: 'number',
			description: 'Initiële zichtbare regels',
			table: { defaultValue: { summary: 6 } },
		},
		resize: {
			control: 'select',
			options: ['none', 'vertical', 'auto'],
			description: 'Resize-gedrag van de textarea',
			table: { defaultValue: { summary: 'vertical' } },
		},
		wrap: {
			control: 'boolean',
			description: 'Wrap lange regels in plaats van horizontaal scrollen',
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde staat',
			table: { defaultValue: { summary: false } },
		},
		readonly: {
			control: 'boolean',
			description: 'Alleen-lezen staat',
			table: { defaultValue: { summary: false } },
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijk label',
			table: { defaultValue: { summary: 'Code' } },
		},
	},
};

const Template = ({
	value,
	placeholder,
	rows,
	resize,
	wrap,
	disabled,
	readonly,
	accessibleLabel,
}: Record<string, unknown>) => html`
	<nldd-code-editor
		.value=${value || ''}
		placeholder=${placeholder || nothing}
		rows=${rows as number}
		resize=${resize as string}
		?wrap=${wrap}
		?disabled=${disabled}
		?readonly=${readonly}
		accessible-label=${accessibleLabel || nothing}
	></nldd-code-editor>
`;

export const Default = Template.bind({});

export const WithYaml = Template.bind({});
WithYaml.args = {
	value: `# wet_op_de_zorgtoeslag — artikel 2
$id: zorgtoeslagwet
articles:
  - number: '2'
    title: 'Recht op zorgtoeslag'
    is_active: true
    threshold: 32502`,
	rows: 8,
};

export const Wrap = Template.bind({});
Wrap.args = {
	value: 'function deeplyNestedFunctionWithAVeryLongNameThatExceedsTheTypicalContainerWidth(parameterOne, parameterTwo, parameterThree) { return parameterOne + parameterTwo + parameterThree; }',
	wrap: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	value: '{ "lawId": "zorgtoeslagwet", "active": true }',
	readonly: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	value: '# disabled\nfoo: bar',
	disabled: true,
};
