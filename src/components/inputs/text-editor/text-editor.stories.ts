import { html, nothing } from 'lit';
import './text-editor.js';
import '../../actions/toolbar/toolbar.js';
import '../../inputs/segmented-control/segmented-control.js';
import '../../actions/button/button.js';
import '../../actions/icon-button/icon-button.js';
import '../../actions/menu/menu.js';

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
		// components (nldd-toolbar + icon nldd-segmented-controls + nldd-dropdown)
		// and wires it both ways: the controls drive the editor's command API, and
		// the editor's nldd-text-editor-state event drives the controls' state. No
		// preventDefault is needed — the commands restore focus to the editor.
		const editorOf = (el: Element): any => el.closest('.demo-editor')?.querySelector('nldd-text-editor');
		// Multi-toggle (checkbox) group → toggle each key whose state differs.
		const reconcile = (el: Element, keys: string[], values: string[]) => {
			const editor = editorOf(el);
			if (!editor) return;
			const active = editor.getState().active;
			const desired = new Set(values);
			keys.forEach((key) => { if (desired.has(key) !== Boolean(active[key])) editor.runCommand(key); });
		};
		const onListChange = (event: CustomEvent) => {
			const value = event.detail.value as string;
			editorOf(event.currentTarget as Element)?.setList(value === 'numbered' ? 'ordered' : value);
		};
		const HEADING_LABELS = ['Normaal', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'];
		const onHeadingSelect = (event: Event) => {
			const item = event.target as HTMLElement;
			if (item?.tagName !== 'NLDD-MENU-ITEM') return;
			editorOf(event.currentTarget as Element)?.setHeading(Number(item.getAttribute('value') ?? 0));
		};
		const onLink = (event: Event) => editorOf(event.currentTarget as Element)?.toggleLink();
		// Editor → controls: reflect the active formats at the caret.
		const onState = (event: CustomEvent) => {
			const active = event.detail.active;
			const root = event.currentTarget as Element;
			const reflect = (group: string, keys: string[]) => {
				const el: any = root.querySelector(`[data-group="${group}"]`);
				if (el) el.values = keys.filter((key) => active[key]);
			};
			reflect('inline', ['bold', 'italic']);
			reflect('code', ['inlineCode']);
			reflect('quote', ['quote']);
			const list: any = root.querySelector('[data-group="list"]');
			if (list) list.value = active.orderedList ? 'numbered' : active.bulletList ? 'bullet' : 'none';
			const headingButton: any = root.querySelector('[data-group="heading"]');
			if (headingButton) headingButton.text = HEADING_LABELS[active.heading] ?? 'Normaal';
			root.querySelectorAll('#heading-menu nldd-menu-item').forEach((item) => {
				(item as any).selected = Number(item.getAttribute('value')) === active.heading;
			});
		};
		return html`
			<div class="demo-editor" @nldd-text-editor-state=${onState}>
				<nldd-toolbar size="md" style="margin-bottom: 8px;">
					<nldd-toolbar-item slot="start" label="Nadruk">
						<nldd-segmented-control
							data-group="inline"
							type="checkbox"
							variant="icon"
							accessible-label="Nadruk"
							@change=${(event: CustomEvent) => reconcile(event.currentTarget as Element, ['bold', 'italic'], event.detail.values)}
						>
							<nldd-segmented-control-item value="bold" text="Vet" icon="bold"></nldd-segmented-control-item>
							<nldd-segmented-control-item value="italic" text="Cursief" icon="italic"></nldd-segmented-control-item>
						</nldd-segmented-control>
					</nldd-toolbar-item>
					<nldd-toolbar-item slot="start" label="Code">
						<nldd-segmented-control
							data-group="code"
							type="checkbox"
							variant="icon"
							accessible-label="Code"
							@change=${(event: CustomEvent) => reconcile(event.currentTarget as Element, ['inlineCode'], event.detail.values)}
						>
							<nldd-segmented-control-item value="inlineCode" text="Code" icon="code"></nldd-segmented-control-item>
						</nldd-segmented-control>
					</nldd-toolbar-item>
					<nldd-toolbar-item slot="start" label="Link">
						<nldd-icon-button icon="link" text="Link" @click=${onLink}></nldd-icon-button>
					</nldd-toolbar-item>
					<nldd-toolbar-item slot="start" label="Citaat">
						<nldd-segmented-control
							data-group="quote"
							type="checkbox"
							variant="icon"
							accessible-label="Citaat"
							@change=${(event: CustomEvent) => reconcile(event.currentTarget as Element, ['quote'], event.detail.values)}
						>
							<nldd-segmented-control-item value="quote" text="Citaat" icon="text-quote"></nldd-segmented-control-item>
						</nldd-segmented-control>
					</nldd-toolbar-item>
					<nldd-toolbar-item slot="start" label="Lijst">
						<nldd-segmented-control
							data-group="list"
							type="radio"
							variant="icon"
							value="none"
							accessible-label="Lijst"
							@change=${onListChange}
						>
							<nldd-segmented-control-item value="none" text="Geen lijst" icon="minus"></nldd-segmented-control-item>
							<nldd-segmented-control-item value="bullet" text="Opsomming" icon="bullet-list"></nldd-segmented-control-item>
							<nldd-segmented-control-item value="numbered" text="Genummerd" icon="numbered-list"></nldd-segmented-control-item>
						</nldd-segmented-control>
					</nldd-toolbar-item>
					<nldd-toolbar-item slot="start" label="Tekststijl">
						<nldd-button id="heading-button" data-group="heading" expandable text="Normaal"></nldd-button>
						<nldd-menu id="heading-menu" anchor="heading-button" @select=${onHeadingSelect}>
							<nldd-menu-item type="radio" value="0" text="Normaal" selected></nldd-menu-item>
							<nldd-menu-divider></nldd-menu-divider>
							<nldd-menu-item type="radio" value="1" text="Heading 1"></nldd-menu-item>
							<nldd-menu-item type="radio" value="2" text="Heading 2"></nldd-menu-item>
							<nldd-menu-item type="radio" value="3" text="Heading 3"></nldd-menu-item>
							<nldd-menu-item type="radio" value="4" text="Heading 4"></nldd-menu-item>
							<nldd-menu-item type="radio" value="5" text="Heading 5"></nldd-menu-item>
							<nldd-menu-item type="radio" value="6" text="Heading 6"></nldd-menu-item>
						</nldd-menu>
					</nldd-toolbar-item>
				</nldd-toolbar>
				<nldd-text-editor variant="simple" rows="10" .value=${SAMPLE} accessible-label="Tekst"></nldd-text-editor>
			</div>
		`;
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'De editor is headless. Deze toolbar is opgebouwd uit DS-componenten — `nldd-toolbar` met icon-`nldd-segmented-control`s (nadruk vet/cursief, code, citaat, en een exclusieve lijst-keuze geen/opsomming/genummerd) en een uitklapbare `nldd-button` met een `nldd-menu` voor de tekststijl (Normaal/Heading 1/…). Tweerichtings gekoppeld: de controls sturen de editor (`runCommand`, `setList`, `setHeading`) en het `nldd-text-editor-state`-event zet hun actieve staat. Sneltoetsen Cmd/Ctrl+B/I/E/K werken ook.',
			},
		},
	},
};
