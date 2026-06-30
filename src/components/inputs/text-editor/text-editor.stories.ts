import { html, nothing } from 'lit';
import './text-editor.js';
import '../../actions/toolbar/toolbar.js';
import '../../inputs/segmented-control/segmented-control.js';
import '../../inputs/toggle-button/toggle-button.js';
import '../../actions/button/button.js';
import '../../actions/button-bar/button-bar.js';
import '../../actions/icon-button/icon-button.js';
import '../../actions/menu/menu.js';

const SAMPLE = `# Zorgtoeslag

Een **vetgedrukte** en *cursieve* zin met \`inline code\` en een [link](https://www.rijksoverheid.nl).

> Een blockquote met toelichting.

- Eerste punt
- Tweede punt

## Subkop

Tekst met ~~doorhaling~~ (GFM).`;

/* Shared toolbar demo. The editor is headless: this builds a real toolbar from
 * DS components and wires it both ways — the controls drive the editor's command
 * API, and the editor's nldd-text-editor-state event drives the controls. Used
 * by the WithToolbar and Mixed stories (pass the editor template in). */
const editorOf = (el: Element): any => el.closest('.demo-editor')?.querySelector('nldd-text-editor');
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
const HEADING_LABELS = ['Paragraaf', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'];
const onHeadingSelect = (event: Event) => {
	const item = event.target as HTMLElement;
	if (item?.tagName !== 'NLDD-MENU-ITEM') return;
	editorOf(event.currentTarget as Element)?.setHeading(Number(item.getAttribute('value') ?? 0));
};
const onLink = (event: Event) => editorOf(event.currentTarget as Element)?.toggleLink();
const onCodeBlock = (event: Event) => editorOf(event.currentTarget as Element)?.toggleCodeBlock();
const onIndent = (event: Event) => editorOf(event.currentTarget as Element)?.indent();
const onOutdent = (event: Event) => editorOf(event.currentTarget as Element)?.outdent();
const onToolbarState = (event: CustomEvent) => {
	const active = event.detail.active;
	const root = event.currentTarget as Element;
	// Multi-select segmented controls reflect via .values; single toggle buttons via .selected.
	const reflect = (group: string, keys: string[]) => {
		const el: any = root.querySelector(`[data-group="${group}"]`);
		if (el) el.values = keys.filter((key) => active[key]);
	};
	const reflectToggle = (group: string, key: string) => {
		const el: any = root.querySelector(`[data-group="${group}"]`);
		if (el) el.selected = Boolean(active[key]);
	};
	reflect('inline', ['bold', 'italic']);
	reflectToggle('code', 'inlineCode');
	reflectToggle('codeBlock', 'codeBlock');
	reflectToggle('link', 'link');
	reflectToggle('quote', 'quote');
	const list: any = root.querySelector('[data-group="list"]');
	if (list) list.value = active.orderedList ? 'numbered' : active.bulletList ? 'bullet' : 'none';
	// Indent only nests list items, so disable it outside a list (a plain paragraph
	// indented 4 spaces would become a code block).
	const indentBar: any = root.querySelector('[data-group="indent"]');
	if (indentBar) indentBar.disabled = !(active.bulletList || active.orderedList);
	const headingButton: any = root.querySelector('[data-group="heading"]');
	if (headingButton) headingButton.text = HEADING_LABELS[active.heading] ?? 'Paragraaf';
	root.querySelectorAll('#heading-menu nldd-menu-item').forEach((item) => {
		(item as any).selected = Number(item.getAttribute('value')) === active.heading;
	});
};
function toolbarEditor(editor: unknown) {
	return html`
		<div class="demo-editor" @nldd-text-editor-state=${onToolbarState}>
			<nldd-toolbar size="md" style="margin-bottom: 16px;">
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
					<nldd-toggle-button
						data-group="code"
						variant="icon"
						icon="code"
						accessible-label="Code"
						@change=${(event: CustomEvent) => editorOf(event.currentTarget as Element)?.runCommand('inlineCode')}
					></nldd-toggle-button>
				</nldd-toolbar-item>
				<nldd-toolbar-item slot="start" label="Link">
					<nldd-toggle-button
						data-group="link"
						variant="icon"
						icon="link"
						accessible-label="Link"
						@change=${onLink}
					></nldd-toggle-button>
				</nldd-toolbar-item>
				<nldd-toolbar-item slot="start" label="Citaat">
					<nldd-toggle-button
						data-group="quote"
						variant="icon"
						icon="text-quote"
						accessible-label="Citaat"
						@change=${(event: CustomEvent) => editorOf(event.currentTarget as Element)?.runCommand('quote')}
					></nldd-toggle-button>
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
				<nldd-toolbar-item slot="start" label="Inspringen">
					<nldd-button-bar data-group="indent">
						<nldd-icon-button icon="indent-increase" text="Meer inspringen" @click=${onIndent}></nldd-icon-button>
						<nldd-button-bar-divider></nldd-button-bar-divider>
						<nldd-icon-button icon="indent-decrease" text="Minder inspringen" @click=${onOutdent}></nldd-icon-button>
					</nldd-button-bar>
				</nldd-toolbar-item>
				<nldd-toolbar-item slot="start" label="Codeblok">
					<nldd-toggle-button
						data-group="codeBlock"
						variant="icon"
						icon="code-block"
						accessible-label="Codeblok"
						@change=${onCodeBlock}
					></nldd-toggle-button>
				</nldd-toolbar-item>
				<nldd-toolbar-item slot="start" label="Tekststijl">
					<nldd-button id="heading-button" data-group="heading" expandable text="Paragraaf"></nldd-button>
					<nldd-menu id="heading-menu" anchor="heading-button" @select=${onHeadingSelect}>
						<nldd-menu-item type="radio" value="0" text="Paragraaf" selected></nldd-menu-item>
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
			${editor}
		</div>
	`;
}

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

export const Mentions = {
	render: () => {
		const users = [
			{ id: '1', label: 'Anouk de Vries', detail: 'Beleid' },
			{ id: '2', label: 'Bram Jansen', detail: 'Communicatie' },
			{ id: '3', label: 'Chen Wei', detail: 'Data' },
			{ id: '4', label: 'Dewi Pratama', detail: 'Juridisch' },
			{ id: '5', label: 'Emma Bakker', detail: 'Beleid' },
		];
		const source = (query: string) =>
			users.filter((user) => user.label.toLowerCase().includes(query.toLowerCase()));
		const sample = 'Bespreek dit met [@Anouk de Vries](user:1) en [@Bram Jansen](user:2).\n\nTyp `@` om iemand te noemen.';
		return html`
			<nldd-text-editor
				variant="box"
				rows="8"
				accessible-label="Tekst"
				.value=${sample}
				.mentionSource=${source}
				@nldd-text-editor-mention=${(event: CustomEvent) => console.info('mention:', event.detail)}
			></nldd-text-editor>
		`;
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Typ `@` voor een typeahead. De editor kent zelf geen gebruikers: de consumer levert kandidaten via de `mentionSource`-property (aangeroepen met de tekst na `@`). Een keuze voegt een markdown-token `[@Naam](user:id)` in (als token gerenderd, degradeert tot een gewone link) en vuurt `nldd-text-editor-mention` met id + range.',
			},
		},
	},
};

export const Annotations = {
	render: () => {
		const sample =
			'De Rijksoverheid werkt aan een toegankelijk design system. Componenten zijn herbruikbaar en consistent.\n\nFeedback is welkom op elk onderdeel.';
		const at = (needle: string) => {
			const start = sample.indexOf(needle);
			return { start, end: start + needle.length, quote: needle };
		};
		const annotations = [
			{ id: 'a1', ...at('toegankelijk design system') },
			{ id: 'a2', ...at('herbruikbaar en consistent') },
			// Two annotations on the same text merge into one underline + a "2" badge.
			{ id: 'a3', ...at('Feedback') },
			{ id: 'a4', ...at('Feedback is welkom') },
		];
		return html`
			<nldd-text-editor
				variant="box"
				rows="8"
				annotatable
				accessible-label="Tekst"
				.value=${sample}
				.annotations=${annotations}
			></nldd-text-editor>
		`;
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Annotaties leven buiten de markdown (de tekst blijft schoon); de consumer levert ze via de `annotations`-property. Elke annotatie ankert op een teken-offset (met de geciteerde tekst voor her-ankeren) en rendert als een lichte tint plus een dashed underline, met een telbadge aan het einde. Eén kleur voor alle annotaties: het type komt uit de pane van de consumer, niet uit de kleur. Annotaties op dezelfde tekst mergen tot een onderstreping met een gecombineerde telling.',
			},
		},
	},
};

export const Mixed = {
	render: () => {
		const users = [
			{ id: '1', label: 'Anouk de Vries', detail: 'Beleid' },
			{ id: '2', label: 'Bram Jansen', detail: 'Communicatie' },
			{ id: '3', label: 'Chen Wei', detail: 'Data' },
			{ id: '4', label: 'Dewi Pratama', detail: 'Juridisch' },
		];
		const source = (query: string) =>
			users.filter((user) => user.label.toLowerCase().includes(query.toLowerCase()));
		const sample = [
			'# Projectupdate toegankelijkheid',
			'',
			'We verbeteren het **burgerportaal** met [@Anouk de Vries](user:1). De `WCAG 2.2`-criteria zijn leidend, zie de [WCAG-richtlijn](https://www.w3.org/TR/WCAG22/).',
			'',
			'## Actiepunten',
			'',
			'- Contrast op de knoppen verhogen',
			'- Focus-states nalopen met [@Bram Jansen](user:2)',
			'- Screenreader-tests inplannen voor de livegang',
			'',
			'> Let op: de deadline is volgende week vrijdag.',
			'',
			'Voer de toegankelijkheidscheck uit met:',
			'',
			'```bash',
			'npm run test:a11y',
			'```',
			'',
			'Noem iemand met `@` of selecteer tekst voor een annotatie.',
		].join('\n');
		const at = (needle: string) => {
			const start = sample.indexOf(needle);
			return { start, end: start + needle.length, quote: needle };
		};
		const annotations = [
			{ id: 'm1', ...at('leidend') },
			{ id: 'm2', ...at('Contrast op de knoppen verhogen') },
			{ id: 'm3', ...at('deadline is volgende week vrijdag') },
			// Overlapping pair → one block with a "2" badge.
			{ id: 'm4', ...at('Screenreader-tests') },
			{ id: 'm5', ...at('Screenreader-tests inplannen voor de livegang') },
		];
		return toolbarEditor(html`
			<nldd-text-editor
				variant="simple"
				rows="15"
				annotatable
				accessible-label="Tekst"
				.value=${sample}
				.mentionSource=${source}
				.annotations=${annotations}
				@nldd-text-editor-mention=${(event: CustomEvent) => console.info('mention:', event.detail)}
			></nldd-text-editor>
		`);
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Alles samen: een echte toolbar (DS-componenten, headless gekoppeld) boven een `simple`-editor met annotaties en @-mentions, door verschillende soorten content heen (koppen, vet, inline code, een lijst, een blockquote en links). De annotatie-overlay en de mention-tokens bestaan naast elkaar zonder elkaar in de weg te zitten; de tekst blijft schone markdown.',
			},
		},
	},
};

export const WithToolbar = {
	render: () =>
		toolbarEditor(
			html`<nldd-text-editor variant="simple" rows="10" .value=${SAMPLE} accessible-label="Tekst"></nldd-text-editor>`,
		),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'De editor is headless. Deze toolbar is opgebouwd uit DS-componenten — `nldd-toolbar` met icon-`nldd-segmented-control`s (nadruk vet/cursief, code, citaat, en een exclusieve lijst-keuze geen/opsomming/genummerd) en een uitklapbare `nldd-button` met een `nldd-menu` voor de tekststijl (Paragraaf/Heading 1/…). Tweerichtings gekoppeld: de controls sturen de editor (`runCommand`, `setList`, `setHeading`) en het `nldd-text-editor-state`-event zet hun actieve staat. Sneltoetsen Cmd/Ctrl+B/I/E/K werken ook.',
			},
		},
	},
};
