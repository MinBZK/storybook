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
		variant: {
			control: 'select',
			options: ['simple', 'box'],
			description: '`box` (default) = framed card met afgeronde hoeken + border ring. `simple` = geen chrome (geen kader, padding of border) — voor inbedding in een eigen wrapper.',
			table: { defaultValue: { summary: 'box' } },
		},
		background: {
			control: 'select',
			options: ['tinted', 'base'],
			description: 'Achtergrondkleur van de container. `base` op een al getinte parent (border ring krijgt +2 stappen voor extra contrast). Alleen van toepassing bij `variant="box"`.',
			table: { defaultValue: { summary: 'tinted' } },
			if: { arg: 'variant', eq: 'box' },
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
		variant: 'box',
		background: 'tinted',
		content: DEFAULT_CONTENT,
		language: '',
		copy: true,
		wrap: false,
	},
};

const Template = (args: Record<string, any>) => html`
	<nldd-code-viewer
		variant=${args.variant}
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

export const Simple = {
	render: Template,
	args: {
		variant: 'simple',
	},
	parameters: {
		docs: {
			description: {
				story: '`variant="simple"` haalt het frame weg (geen corners, padding, fill of border). Gebruik wanneer de code-viewer binnen een eigen wrapper zit die de surface en padding levert.',
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
				story: '`background="base"` voor een code-viewer op een getinte parent. De code-viewer tekent zich af met de basis-surface in plaats van te versmelten met de getinte achtergrond; de border ring krijgt automatisch +2 stappen voor extra contrast.',
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
