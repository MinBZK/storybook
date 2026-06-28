import { html, nothing } from 'lit';
import './text-editor.js';
import '../../actions/toolbar/toolbar.js';
import '../../inputs/segmented-control/segmented-control.js';

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
		// The editor is headless. This demo builds a real toolbar from DS
		// components (nldd-toolbar + icon nldd-segmented-control) and wires it both
		// ways: the controls drive the editor via runCommand(), and the editor's
		// nldd-text-editor-state event drives the controls' active state. No
		// preventDefault is needed — the commands restore focus to the editor.
		const INLINE = ['bold', 'italic', 'inlineCode'];
		const BLOCK = ['quote', 'bulletList'];
		const editorOf = (el: Element): any => el.closest('.demo-editor')?.querySelector('nldd-text-editor');
		const reconcile = (el: Element, keys: string[], values: string[]) => {
			const editor = editorOf(el);
			if (!editor) return;
			const active = editor.getState().active;
			const desired = new Set(values);
			keys.forEach((key) => { if (desired.has(key) !== Boolean(active[key])) editor.runCommand(key); });
		};
		const onState = (event: CustomEvent) => {
			const active = event.detail.active;
			const root = event.currentTarget as Element;
			const inline: any = root.querySelector('[data-group="inline"]');
			const block: any = root.querySelector('[data-group="block"]');
			if (inline) inline.values = INLINE.filter((key) => active[key]);
			if (block) block.values = BLOCK.filter((key) => active[key]);
		};
		return html`
			<div class="demo-editor" @nldd-text-editor-state=${onState}>
				<nldd-toolbar size="md" style="margin-bottom: 8px;">
					<nldd-toolbar-item slot="start" label="Tekststijl">
						<nldd-segmented-control
							data-group="inline"
							type="checkbox"
							variant="icon"
							accessible-label="Tekststijl"
							@change=${(event: CustomEvent) => reconcile(event.currentTarget as Element, INLINE, event.detail.values)}
						>
							<nldd-segmented-control-item value="bold" text="Vet" icon="bold"></nldd-segmented-control-item>
							<nldd-segmented-control-item value="italic" text="Cursief" icon="italic"></nldd-segmented-control-item>
							<nldd-segmented-control-item value="inlineCode" text="Code" icon="stack-code"></nldd-segmented-control-item>
						</nldd-segmented-control>
					</nldd-toolbar-item>
					<nldd-toolbar-item slot="start" label="Blok">
						<nldd-segmented-control
							data-group="block"
							type="checkbox"
							variant="icon"
							accessible-label="Blok"
							@change=${(event: CustomEvent) => reconcile(event.currentTarget as Element, BLOCK, event.detail.values)}
						>
							<nldd-segmented-control-item value="quote" text="Citaat" icon="text-quote"></nldd-segmented-control-item>
							<nldd-segmented-control-item value="bulletList" text="Lijst" icon="bullet-list"></nldd-segmented-control-item>
						</nldd-segmented-control>
					</nldd-toolbar-item>
				</nldd-toolbar>
				<nldd-text-editor variant="box" rows="10" .value=${SAMPLE} accessible-label="Tekst"></nldd-text-editor>
			</div>
		`;
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'De editor is headless. Deze toolbar is opgebouwd uit DS-componenten (`nldd-toolbar` met icon-`nldd-segmented-control`) en is tweerichtings gekoppeld: de controls sturen de editor via `runCommand()`, en het `nldd-text-editor-state`-event zet de actieve (ingedrukte) staat van de controls. Quote en code gebruiken hun eigen iconen (`text-quote`, `stack-code`). Sneltoetsen Cmd/Ctrl+B/I/E/K werken ook.',
			},
		},
	},
};
