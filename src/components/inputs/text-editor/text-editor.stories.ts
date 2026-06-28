import { html, nothing } from 'lit';
import './text-editor.js';

const SAMPLE = `# Zorgtoeslag

Een **vetgedrukte** en *cursieve* zin met \`inline code\` en een [link](https://www.rijksoverheid.nl).

> Een blockquote met toelichting.

- Eerste punt
- Tweede punt

## Subkop

Tekst met ~~doorhaling~~ (GFM).`;

export default {
	title: 'Components/Inputs/Text Editor',
	component: 'nldd-text-editor',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/text-editor/text-editor.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	args: {
		variant: 'box',
		font: 'sans',
		value: SAMPLE,
		placeholder: '',
		rows: 8,
		resize: 'vertical',
		wrap: true,
		readonly: false,
		disabled: false,
		accessibleLabel: 'Tekst',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['simple', 'box'],
			description: 'Visuele variant. "simple" is kaal zonder focusring; "box" voegt rand, vulling, padding, hoeken en focusring toe.',
			table: { defaultValue: { summary: 'simple' } },
		},
		font: {
			control: 'select',
			options: ['sans', 'mono'],
			description: 'Lettertype. "sans" (default) is het beste voor proza; "mono" voor een schrijf/code-gevoel.',
			table: { defaultValue: { summary: 'sans' } },
		},
		value: {
			control: 'text',
			description: 'De inhoud (markdown)',
			table: { defaultValue: { summary: '' } },
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder tekst',
			table: { defaultValue: { summary: '' } },
		},
		rows: {
			control: 'number',
			description: 'Minimale zichtbare regels (de vloer in elke resize-modus)',
			table: { defaultValue: { summary: 6 } },
		},
		resize: {
			control: 'select',
			options: ['none', 'vertical', 'auto'],
			description: 'Resize-gedrag. none = vast, vertical = slepen vanaf rows, auto = groeit mee.',
			table: { defaultValue: { summary: 'vertical' } },
		},
		wrap: {
			control: 'boolean',
			description: 'Lange regels afbreken (default aan; proza wrapt)',
			table: { defaultValue: { summary: true } },
		},
		readonly: {
			control: 'boolean',
			description: 'Alleen-lezen staat',
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
			table: { defaultValue: { summary: 'Tekst' } },
		},
	},
};

const Template = ({
	variant,
	font,
	value,
	placeholder,
	rows,
	resize,
	wrap,
	readonly,
	disabled,
	accessibleLabel,
}: Record<string, any>) => html`
	<nldd-text-editor
		variant=${variant as string}
		font=${font as string}
		.value=${value || ''}
		placeholder=${placeholder || nothing}
		rows=${rows as number}
		resize=${resize as string}
		?wrap=${wrap}
		?readonly=${readonly}
		?disabled=${disabled}
		accessible-label=${accessibleLabel || nothing}
	></nldd-text-editor>
`;

export const Default = {
	render: Template,
};

export const Sans = {
	render: () => html`
		<nldd-text-editor variant="box" font="sans" rows="10" .value=${SAMPLE} accessible-label="Tekst"></nldd-text-editor>
	`,
	parameters: { controls: { disable: true } },
};

export const Mono = {
	render: () => html`
		<nldd-text-editor variant="box" font="mono" rows="10" .value=${SAMPLE} accessible-label="Tekst"></nldd-text-editor>
	`,
	parameters: { controls: { disable: true } },
};

export const Simple = {
	render: () => html`
		<nldd-text-editor variant="simple" rows="10" .value=${SAMPLE} accessible-label="Tekst"></nldd-text-editor>
	`,
	parameters: {
		docs: {
			description: {
				story: 'Kaal, zonder kader of focusring — bedoeld om in een eigen compositie (bv. een message field) te plaatsen die de chrome en focusbehandeling levert.',
			},
		},
	},
};

export const Placeholder = {
	render: () => html`
		<nldd-text-editor variant="box" rows="6" placeholder="Schrijf hier je toelichting in markdown…" accessible-label="Tekst"></nldd-text-editor>
	`,
	parameters: { controls: { disable: true } },
};

export const WithToolbar = {
	render: () => {
		// The editor is headless: this demo toolbar lives in the consumer and
		// drives formatting via runCommand(). mousedown+preventDefault keeps the
		// selection/focus on the editor.
		const run = (name: string, payload?: unknown) => (event: Event) => {
			const toolbar = (event.currentTarget as HTMLElement).closest('.demo-editor');
			const editor = toolbar?.querySelector('nldd-text-editor') as (HTMLElement & { runCommand(n: string, p?: unknown): void }) | null;
			editor?.runCommand(name, payload);
		};
		const keepFocus = (event: Event) => event.preventDefault();
		const btn = 'border:0.5px solid var(--semantics-surfaces-tinted-border-color); background:var(--semantics-surfaces-base-background-color); border-radius:6px; padding:4px 10px; cursor:pointer;';
		return html`
			<div class="demo-editor">
				<div style="display:flex; gap:6px; margin-bottom:8px; flex-wrap:wrap;">
					<button style=${btn} @mousedown=${keepFocus} @click=${run('bold')}>Vet</button>
					<button style=${btn} @mousedown=${keepFocus} @click=${run('italic')}>Cursief</button>
					<button style=${btn} @mousedown=${keepFocus} @click=${run('inlineCode')}>Code</button>
					<button style=${btn} @mousedown=${keepFocus} @click=${run('heading', 2)}>H2</button>
					<button style=${btn} @mousedown=${keepFocus} @click=${run('bulletList')}>Lijst</button>
					<button style=${btn} @mousedown=${keepFocus} @click=${run('quote')}>Quote</button>
				</div>
				<nldd-text-editor variant="box" rows="8" .value=${SAMPLE} accessible-label="Tekst"></nldd-text-editor>
			</div>
		`;
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'De editor is headless: deze toolbar leeft bij de consumer en stuurt de editor aan via `runCommand()` (of de losse `toggleBold()`-achtige methods). `mousedown`+`preventDefault` houdt de selectie vast. Luister op `nldd-text-editor-state` om de actieve/ingedrukte staat van knoppen te tonen. Sneltoetsen Cmd/Ctrl+B/I/E/K werken ook.',
			},
		},
	},
};
