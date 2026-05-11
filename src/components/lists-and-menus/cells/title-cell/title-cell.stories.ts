import { html, nothing } from 'lit';
import './title-cell.js';
import '../../../content/tag/tag.js';

export default {
	title: 'Components/Lists & Menus/Cells/Title Cell',
	component: 'nldd-title-cell',
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: [1, 2, 3, 4, 5, 6],
			description: 'Visual size of the title',
			table: { defaultValue: { summary: '5' } },
		},
		color: {
			control: 'select',
			options: ['default', 'secondary', 'accent', 'success', 'warning', 'critical'],
			description: 'Text color variant. `secondary` demotes the title; `accent`, `success`, `warning` and `critical` tint all three regions.',
			table: { defaultValue: { summary: 'default' } },
		},
		width: {
			control: 'text',
			description: "'stretch', 'fit-content', or a CSS length (e.g. '200px', '20rem')",
			table: { defaultValue: { summary: 'stretch' } },
		},
		minWidth: {
			name: 'min-width',
			control: 'text',
			description: "Minimum width as CSS length (e.g. '80px', '5rem')",
		},
		maxWidth: {
			name: 'max-width',
			control: 'text',
			description: "Maximum width as CSS length (e.g. '300px', '20rem')",
		},
		minHeight: {
			name: 'min-height',
			control: 'text',
			description: "Minimum height as CSS length (e.g. '44px', '3rem')",
		},
		horizontalAlignment: {
			name: 'horizontal-alignment',
			control: 'select',
			options: ['left', 'right'],
			description: 'Horizontal alignment of the text',
			table: { defaultValue: { summary: 'left' } },
		},
		verticalAlignment: {
			name: 'vertical-alignment',
			control: 'select',
			options: ['center', 'top', 'bottom'],
			description: 'Vertical alignment of the cell',
			table: { defaultValue: { summary: 'center' } },
		},
		text: {
			control: 'text',
			description: 'Title text content. Supports **bold** markers. Falls back to default slot when empty.',
		},
		supportingText: {
			control: 'text',
			name: 'supporting-text',
			description: 'Optional supporting text below the title. Supports **bold** markers. Falls back to `supporting-text` slot when empty.',
		},
		overline: {
			control: 'text',
			description: 'Optional overline text above the title. Supports **bold** markers. Falls back to `overline` slot when empty.',
		},
		headingLevel: {
			control: 'select',
			options: [undefined, 1, 2, 3, 4, 5, 6],
			name: 'heading-level',
			description: 'Heading level (1–6). When not set, renders a &lt;p&gt;.',
			table: { defaultValue: { summary: '-' } },
		},
	},
};

export const Default = {
	args: {
		size: 5,
		color: 'default',
		width: 'stretch',
		minWidth: '',
		maxWidth: '',
		minHeight: '',
		horizontalAlignment: 'left',
		verticalAlignment: 'center',
		text: 'Title cell',
		supportingText: '',
		overline: '',
	},
	render: (args: Record<string, any>) => html`
		<nldd-title-cell
			size=${args.size}
			color=${args.color}
			width=${args.width}
			horizontal-alignment=${args.horizontalAlignment}
			vertical-alignment=${args.verticalAlignment}
			text=${args.text}
			supporting-text=${args.supportingText}
			overline=${args.overline}
			heading-level=${args.headingLevel ?? nothing}
		></nldd-title-cell>
	`,
};

export const Secondary = {
	render: () => html`
		<nldd-title-cell color="secondary" overline="Overline" text="Title cell (secondary)" supporting-text="Subtitle"></nldd-title-cell>
	`,
	parameters: {
		docs: {
			description: {
				story: 'The secondary variant demotes the title to match the muted overline/supporting-text — useful for de-emphasized rows.',
			},
		},
	},
};

export const Accent = {
	render: () => html`
		<nldd-title-cell color="accent" overline="Overline" text="Title cell (accent)" supporting-text="Subtitle"></nldd-title-cell>
	`,
	parameters: {
		docs: {
			description: {
				story: 'The accent variant tints all three text fields (overline, title, supporting-text) so the cell reads as a coherent highlight.',
			},
		},
	},
};

export const StatusColors = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<nldd-title-cell color="success" overline="Status" text="Goedgekeurd" supporting-text="Verwerkt op 9 mei 2026"></nldd-title-cell>
			<nldd-title-cell color="warning" overline="Status" text="Wacht op actie" supporting-text="Reactie binnen 5 werkdagen"></nldd-title-cell>
			<nldd-title-cell color="critical" overline="Status" text="Afgewezen" supporting-text="Bekijk de toelichting"></nldd-title-cell>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Status varianten tinten alle drie de tekstvelden zodat de hele titel-cel als de status leest. Combineer altijd met een tekstuele indicator — kleur alleen is geen toegankelijke status-aanduiding.',
			},
		},
	},
};

export const WithOverline = {
	render: () => html`
		<nldd-title-cell overline="Overline" text="Title cell"></nldd-title-cell>
	`,
};

export const WithSupportingText = {
	render: () => html`
		<nldd-title-cell text="Title cell" supporting-text="Subtitle"></nldd-title-cell>
	`,
};

export const WithOverlineAndSupportingText = {
	render: () => html`
		<nldd-title-cell overline="Overline" text="Title cell" supporting-text="Subtitle"></nldd-title-cell>
	`,
};

export const AllSizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			${[1, 2, 3, 4, 5, 6].map(s => html`
				<nldd-title-cell size=${s} text="Title cell (size ${s})"></nldd-title-cell>
			`)}
		</div>
	`,
};

export const HorizontalAlignment = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<nldd-title-cell horizontal-alignment="left" style="border: 1px dashed var(--primitives-color-neutral-150);" overline="Overline" text="Title cell (left)" supporting-text="Subtitle"></nldd-title-cell>
			<nldd-title-cell horizontal-alignment="right" style="border: 1px dashed var(--primitives-color-neutral-150);" overline="Overline" text="Title cell (right)" supporting-text="Subtitle"></nldd-title-cell>
		</div>
	`,
};

export const VerticalAlignment = {
	render: () => html`
		<div style="display: flex; gap: 8px; height: 80px;">
			<nldd-title-cell vertical-alignment="center" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Center"></nldd-title-cell>
			<nldd-title-cell vertical-alignment="top" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Top"></nldd-title-cell>
			<nldd-title-cell vertical-alignment="bottom" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Bottom"></nldd-title-cell>
		</div>
	`,
};

export const SlotInlineTag = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">Overline slot — tag als statuslabel boven de titel.</p>
				<nldd-title-cell text="Aanvraag huurtoeslag" supporting-text="Ingediend op 9 mei 2026">
					<nldd-tag slot="overline" variant="success" size="sm" text="Goedgekeurd"></nldd-tag>
				</nldd-title-cell>
			</div>
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">Default slot — inline tag binnen de titel.</p>
				<nldd-title-cell overline="Sectie" supporting-text="3 items">
					Aardappelen <nldd-tag variant="accent" size="sm" text="Nieuw"></nldd-tag>
				</nldd-title-cell>
			</div>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: `
Elk tekstgebied (overline, default, supporting-text) accepteert óf een attribuut óf slotted DOM. Wanneer een slot gevuld is, vervangt het de attribuut-render voor dat gebied.

Gebruik dit voor zelfdragende custom elementen zoals \`<nldd-tag>\`, \`<nldd-icon>\` of \`<nldd-badge>\` — die hebben hun eigen shadow DOM en zien er overal goed uit. Voor rauwe inline elementen zoals \`<a>\`, \`<strong>\` of \`<code>\` styled een title-cell niets — gebruik \`<nldd-cell>\` met \`<nldd-rich-text>\` voor rijke content.

\`query\` highlighting en \`**bold**\` parsing zijn alleen actief op de attribuut-route — slotted content wordt as-is getoond.
				`.trim(),
			},
		},
	},
};

export const QuerySearchHighlight = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">predictive (default) — bolds the non-matched remainder.</p>
				<nldd-title-cell text="Aardappelen" query="aa"></nldd-title-cell>
			</div>
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">match — bolds the matched query.</p>
				<nldd-title-cell text="Aardappel knolgewas" query="aar" query-mark-mode="match"></nldd-title-cell>
			</div>
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">Applies across text, overline and supporting-text.</p>
				<nldd-title-cell overline="Groente" text="Aardappelen" supporting-text="Ook: pieper, knol" query="ap"></nldd-title-cell>
			</div>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: `
Set \`query\` to a substring and the cell automatically bolds the match across \`text\`, \`overline\` and \`supporting-text\`. Use \`query-mark-mode\` to pick the strategy:

- \`'predictive'\` (default): bolds the non-matched remainder — the ARIA APG combobox pattern.
- \`'match'\`: bolds the matched query — useful for highlighting search terms in longer text.
				`.trim(),
			},
		},
	},
};
