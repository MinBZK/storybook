import { html, nothing } from 'lit';
import './code-viewer.ts';

const LANGUAGE_OPTIONS = [
	'(geen)',
	'yaml',
	'json',
	'javascript',
	'typescript',
	'css',
	'html',
	'xml',
	'bash',
	'markdown',
	'rust',
	'gherkin',
	'toml',
	'sql',
	'python',
];

const DEFAULT_CONTENT = `const greet = (name) => \`Hallo, \${name}!\`;
console.log(greet('wereld'));`;

export default {
	title: 'Components/Content/Code Viewer',
	component: 'nldd-code-viewer',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/code-viewer/code-viewer.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	argTypes: {
		box: {
			control: 'boolean',
			description: 'Container tonen (afgeronde hoeken, padding, achtergrond, border ring). Uit voor inbedding in een eigen wrapper.',
			table: { defaultValue: { summary: true } },
		},
		background: {
			control: 'select',
			options: ['tinted', 'base', 'transparent'],
			description: 'Achtergrondkleur van de container. `base` op een getinte parent, `transparent` geen fill en geen border ring (de omliggende context bakent de snippet af).',
			table: { defaultValue: { summary: 'tinted' } },
			if: { arg: 'box' },
		},
		content: {
			control: 'text',
			description: 'Code-inhoud (slot)',
		},
		language: {
			control: 'select',
			options: LANGUAGE_OPTIONS,
			mapping: { '(geen)': '' },
			description: 'Grammar voor syntax-highlighting. Bij "(geen)" wordt de inhoud raw gerenderd.',
			table: { defaultValue: { summary: '(geen)' } },
		},
		copy: {
			control: 'boolean',
			description: 'Toon de kopieerknop rechtsboven. Klik kopieert de raw slot-tekst naar het klembord.',
			table: { defaultValue: { summary: true } },
		},
		wrap: {
			control: 'boolean',
			description: 'Lange regels afbreken in plaats van horizontaal scrollen',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		box: true,
		background: 'tinted',
		content: DEFAULT_CONTENT,
		language: '',
		copy: true,
		wrap: false,
	},
};

const Template = (args: Record<string, any>) => html`
	<nldd-code-viewer
		?no-box=${!args.box}
		background=${args.background}
		language=${args.language || nothing}
		?no-copy=${!args.copy}
		?wrap=${args.wrap}
	>${args.content}</nldd-code-viewer>
`;

export const Default = {
	render: Template,
};

export const Trace = {
	render: Template,
	args: {
		content: `[engine] resolved input: bsn=999993653
[engine] action 'heeft_recht_op_zorgtoeslag' = true
[engine] action 'hoogte_zorgtoeslag' = 12345 (cents)
[engine] elapsed 4ms`,
	},
};

export const LongLines = {
	render: Template,
	args: {
		content: `function deeplyNestedFunctionWithAVeryLongNameThatExceedsTheTypicalContainerWidth(parameterOne, parameterTwo, parameterThree) {
  return parameterOne + parameterTwo + parameterThree;
}`,
	},
};

export const Wrap = {
	render: Template,
	args: {
		wrap: true,
		content: `function deeplyNestedFunctionWithAVeryLongNameThatExceedsTheTypicalContainerWidth(parameterOne, parameterTwo, parameterThree) {
  return parameterOne + parameterTwo + parameterThree;
}`,
	},
};

export const HighlightYaml = {
	render: Template,
	args: {
		language: 'yaml',
		content: `# wet_op_de_zorgtoeslag — artikel 2
$id: zorgtoeslagwet
articles:
  - number: '2'
    title: 'Recht op zorgtoeslag'
    is_active: true
    threshold: 32502
    actions:
      - output: heeft_recht_op_zorgtoeslag
        operation: AND`,
	},
};

export const HighlightJson = {
	render: Template,
	args: {
		language: 'json',
		content: `{
  "lawId": "zorgtoeslagwet",
  "article": 2,
  "active": true,
  "outputs": ["heeft_recht_op_zorgtoeslag", "hoogte_zorgtoeslag"]
}`,
	},
};

export const HighlightJavaScript = {
	render: Template,
	args: {
		language: 'javascript',
		content: `// Compute eligibility
function isEligible(person, threshold = 32502) {
  if (person.income > threshold) return false;
  return person.age >= 18 && person.insured;
}`,
	},
};


/* ============================================================
   Container
   ============================================================ */

export const NoBox = {
	render: Template,
	args: {
		box: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Container weg met `no-box`. Gebruik wanneer de code-viewer binnen een eigen wrapper zit die de surface en padding levert.',
			},
		},
	},
};

export const BackgroundBase = {
	render: (args: Record<string, any>) => html`
		<div style="padding: 24px; background-color: var(--semantics-surfaces-tinted-background-color); border-radius: var(--primitives-corner-radius-lg);">
			${Template(args)}
		</div>
	`,
	args: {
		language: 'json',
		background: 'base',
		content: `{
  "lawId": "zorgtoeslagwet",
  "active": true
}`,
	},
	parameters: {
		docs: {
			description: {
				story: '`background="base"` voor een code-viewer op een getinte parent. De code-viewer tekent zich af met de basis-surface in plaats van te versmelten met de getinte achtergrond.',
			},
		},
	},
};

export const BackgroundTransparent = {
	name: 'Background: transparent',
	render: (args: Record<string, any>) => html`
		<div style="padding: 24px; background-color: var(--semantics-surfaces-tinted-background-color); border-radius: var(--primitives-corner-radius-lg);">
			${Template(args)}
		</div>
	`,
	args: {
		background: 'transparent',
		content: `const transparent = true;
// no fill, no border ring — pure code on the parent surface`,
	},
	parameters: {
		docs: {
			description: {
				story: '`background="transparent"` maakt zowel de fill als de border ring transparant. Padding en afgeronde hoeken blijven om de tekst in te kaderen, maar de snippet leunt visueel volledig op de omliggende parent.',
			},
		},
	},
};


/* ============================================================
   Copy
   ============================================================ */

export const NoCopy = {
	render: Template,
	args: {
		copy: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Met `no-copy` is de kopieerknop verborgen. De pre-rechterpadding krijgt dan ook geen extra ruimte.',
			},
		},
	},
};
