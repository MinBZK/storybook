import { html, nothing } from 'lit';
import './code-editor.js';

const SAMPLE_YAML = `# wet_op_de_zorgtoeslag — artikel 2
$id: zorgtoeslagwet
articles:
  - number: '2'
    title: 'Recht op zorgtoeslag'
    is_active: true
    threshold: 32502`;

const SAMPLE_JSON = `{
  "lawId": "zorgtoeslagwet",
  "active": true,
  "threshold": 32502
}`;

export default {
	title: 'Components/Inputs/Code Editor',
	component: 'nldd-code-editor',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/code-editor/code-editor.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	args: {
		variant: 'simple',
		language: '',
		lineNumbers: false,
		value: '',
		placeholder: '',
		rows: 6,
		resize: 'vertical',
		wrap: false,
		readonly: false,
		disabled: false,
		accessibleLabel: 'Code',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['simple', 'box'],
			description: 'Visuele variant. "simple" (default) is kaal; "box" voegt rand, vulling, padding en hoeken toe.',
			table: { defaultValue: { summary: 'simple' } },
		},
		language: {
			control: 'select',
			options: ['(geen)', 'json', 'yaml', 'javascript', 'typescript'],
			mapping: { '(geen)': '' },
			description: 'Grammatica voor syntax-highlighting (lazy geladen). Leeg = geen highlighting.',
			table: { defaultValue: { summary: '(geen)' } },
		},
		lineNumbers: {
			name: 'line-numbers',
			control: 'boolean',
			description: 'Toon een regelnummer-gutter',
			table: { defaultValue: { summary: false } },
		},
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
			description: 'Minimale zichtbare regels',
			table: { defaultValue: { summary: 6 } },
		},
		resize: {
			control: 'select',
			options: ['none', 'vertical', 'auto'],
			description: 'Resize-gedrag van de editor',
			table: { defaultValue: { summary: 'vertical' } },
		},
		wrap: {
			control: 'boolean',
			description: 'Wrap lange regels in plaats van horizontaal scrollen',
			table: { defaultValue: { summary: false } },
		},
		readonly: {
			control: 'boolean',
			description: 'Alleen-lezen staat (focusbaar en selecteerbaar, niet bewerkbaar)',
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde staat',
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
	variant,
	language,
	lineNumbers,
	value,
	placeholder,
	rows,
	resize,
	wrap,
	readonly,
	disabled,
	accessibleLabel,
}: Record<string, any>) => html`
	<nldd-code-editor
		variant=${variant as string}
		language=${language || nothing}
		?line-numbers=${lineNumbers}
		.value=${value || ''}
		placeholder=${placeholder || nothing}
		rows=${rows as number}
		resize=${resize as string}
		?wrap=${wrap}
		?readonly=${readonly}
		?disabled=${disabled}
		accessible-label=${accessibleLabel || nothing}
	></nldd-code-editor>
`;

export const Default = {
	render: Template,
};

export const Box = {
	render: () => html`
		<nldd-code-editor
			variant="box"
			language="yaml"
			rows="8"
			.value=${SAMPLE_YAML}
			accessible-label="Code"
		></nldd-code-editor>
	`,
	parameters: { controls: { disable: true } },
};

export const Highlighted = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<nldd-code-editor variant="box" language="yaml" rows="8" .value=${SAMPLE_YAML} accessible-label="YAML"></nldd-code-editor>
			<nldd-code-editor variant="box" language="json" rows="6" .value=${SAMPLE_JSON} accessible-label="JSON"></nldd-code-editor>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const LineNumbers = {
	render: () => html`
		<nldd-code-editor
			variant="box"
			language="json"
			line-numbers
			rows="6"
			.value=${SAMPLE_JSON}
			accessible-label="Code"
		></nldd-code-editor>
	`,
	parameters: { controls: { disable: true } },
};

export const Wrap = {
	render: () => html`
		<nldd-code-editor
			variant="box"
			wrap
			rows="4"
			.value=${'function deeplyNestedFunctionWithAVeryLongNameThatExceedsTheTypicalContainerWidth(parameterOne, parameterTwo, parameterThree) { return parameterOne + parameterTwo + parameterThree; }'}
			accessible-label="Code"
		></nldd-code-editor>
	`,
	parameters: { controls: { disable: true } },
};

export const ReadOnly = {
	render: () => html`
		<nldd-code-editor
			variant="box"
			language="json"
			readonly
			.value=${SAMPLE_JSON}
			accessible-label="Code"
		></nldd-code-editor>
	`,
	parameters: { controls: { disable: true } },
};

export const Disabled = {
	render: () => html`
		<nldd-code-editor
			variant="box"
			disabled
			.value=${'# disabled\nfoo: bar'}
			accessible-label="Code"
		></nldd-code-editor>
	`,
	parameters: { controls: { disable: true } },
};
