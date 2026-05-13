import { html, nothing } from 'lit';
import './text-cell.js';
import '../../../content/tag/tag.js';

export default {
	title: 'Components/Lists & Menus/Cells/Text Cell',
	component: 'nldd-text-cell',
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Text cell size',
			table: { defaultValue: { summary: 'md' } },
		},
		color: {
			control: 'select',
			options: ['default', 'secondary', 'accent', 'success', 'warning', 'critical'],
			description: 'Color variant. `accent`, `success`, `warning` and `critical` apply to all three text fields so the cell reads as a coherent state.',
			table: { defaultValue: { summary: 'default' } },
		},
		width: {
			control: 'text',
			description: "'full', 'fit-content', or a CSS length (e.g. '200px', '20rem')",
			table: { defaultValue: { summary: 'full' } },
		},
		minWidth: {
			name: 'min-width',
			control: 'text',
			description: "Minimum width as CSS length (e.g. '80px', '5rem')",
		},
		maxWidth: {
			name: 'max-width',
			control: 'text',
			description: "Maximum width as CSS length (e.g. '200px', '20rem')",
		},
		minHeight: {
			name: 'min-height',
			control: 'text',
			description: "Minimum height as CSS length (e.g. '44px', '3rem')",
		},
		horizontalAlignment: {
			name: 'horizontal-alignment',
			control: 'select',
			options: ['left', 'center', 'right'],
			description: 'Horizontal alignment of the text',
			table: { defaultValue: { summary: 'left' } },
		},
		verticalAlignment: {
			name: 'vertical-alignment',
			control: 'select',
			options: ['top', 'center', 'bottom'],
			description: 'Vertical alignment of the cell',
			table: { defaultValue: { summary: 'center' } },
		},
		text: {
			control: 'text',
			description: 'Main text content. Supports **bold** markers. Falls back to default slot when empty.',
		},
		supportingText: {
			name: 'supporting-text',
			control: 'text',
			description: 'Optional supporting text. Supports **bold** markers. Falls back to `supporting-text` slot when empty.',
		},
		overline: {
			control: 'text',
			description: 'Optional overline text. Supports **bold** markers. Falls back to `overline` slot when empty.',
		},
	},
};

export const Default = {
	args: {
		size: 'md',
		color: 'default',
		width: '',
		minWidth: '',
		maxWidth: '',
		minHeight: '',
		horizontalAlignment: 'left',
		verticalAlignment: 'center',
		text: 'Text cell',
		supportingText: '',
		overline: '',
	},
	render: (args: Record<string, any>) => html`
		<nldd-text-cell
			size=${args.size}
			color=${args.color}
			width=${args.width || nothing}
			horizontal-alignment=${args.horizontalAlignment}
			vertical-alignment=${args.verticalAlignment}
			text=${args.text}
			supporting-text=${args.supportingText}
			overline=${args.overline}
		></nldd-text-cell>
	`,
};

export const WithOverline = {
	render: () => html`
		<nldd-text-cell overline="Overline" text="Text cell"></nldd-text-cell>
	`,
};

export const WithSupportingText = {
	render: () => html`
		<nldd-text-cell text="Text cell" supporting-text="Supporting text"></nldd-text-cell>
	`,
};

export const WithOverlineAndSupportingText = {
	render: () => html`
		<nldd-text-cell overline="Overline" text="Text cell" supporting-text="Supporting text"></nldd-text-cell>
	`,
};

export const Secondary = {
	render: () => html`
		<nldd-text-cell color="secondary" text="Text cell (secondary)"></nldd-text-cell>
	`,
};

export const Accent = {
	render: () => html`
		<nldd-text-cell color="accent" overline="Overline" text="Text cell (accent)" supporting-text="Supporting text"></nldd-text-cell>
	`,
	parameters: {
		docs: {
			description: {
				story: 'The accent variant tints all three text fields (overline, main text, supporting-text) so the cell reads as a coherent highlight.',
			},
		},
	},
};

export const StatusColors = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<nldd-text-cell color="success" overline="Status" text="Goedgekeurd" supporting-text="Verwerkt op 9 mei 2026"></nldd-text-cell>
			<nldd-text-cell color="warning" overline="Status" text="Wacht op actie" supporting-text="Reactie binnen 5 werkdagen"></nldd-text-cell>
			<nldd-text-cell color="critical" overline="Status" text="Afgewezen" supporting-text="Bekijk de toelichting"></nldd-text-cell>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Status varianten tinten alle drie de tekstvelden (overline, main text, supporting-text) zodat de hele cel als de status leest. Combineer altijd met een tekstuele indicator — kleur alleen is geen toegankelijke status-aanduiding.',
			},
		},
	},
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<nldd-text-cell size="md" overline="Overline" text="Text cell (md)" supporting-text="Supporting text"></nldd-text-cell>
			<nldd-text-cell size="sm" overline="Overline" text="Text cell (sm)" supporting-text="Supporting text"></nldd-text-cell>
		</div>
	`,
};

export const Width = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px; width: 300px; border: 1px dashed var(--primitives-color-neutral-150); padding: 8px;">
			<nldd-text-cell width="full" text="Full (default)"></nldd-text-cell>
			<nldd-text-cell width="fit-content" text="Fit content"></nldd-text-cell>
			<nldd-text-cell width="120px" text="120px fixed"></nldd-text-cell>
		</div>
	`,
};

export const MinHeight = {
	render: () => html`
		<div style="display: flex; gap: 8px; align-items: flex-start;">
			<nldd-text-cell vertical-alignment="top" min-height="44px" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Min height 44px"></nldd-text-cell>
			<nldd-text-cell vertical-alignment="top" min-height="44px" style="border: 1px dashed var(--primitives-color-neutral-150);" text="With supporting text" supporting-text="Supporting text"></nldd-text-cell>
		</div>
	`,
};

export const HorizontalAlignment = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<nldd-text-cell horizontal-alignment="left" style="border: 1px dashed var(--primitives-color-neutral-150);" overline="Overline" text="Text cell (left)" supporting-text="Supporting text"></nldd-text-cell>
			<nldd-text-cell horizontal-alignment="right" style="border: 1px dashed var(--primitives-color-neutral-150);" overline="Overline" text="Text cell (right)" supporting-text="Supporting text"></nldd-text-cell>
		</div>
	`,
};

export const VerticalAlignment = {
	render: () => html`
		<div style="display: flex; gap: 8px; height: 80px;">
			<nldd-text-cell vertical-alignment="center" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Center"></nldd-text-cell>
			<nldd-text-cell vertical-alignment="top" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Top"></nldd-text-cell>
			<nldd-text-cell vertical-alignment="bottom" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Bottom"></nldd-text-cell>
		</div>
	`,
};

export const SlotInlineTag = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">Default slot — inline tag tussen tekst.</p>
				<nldd-text-cell overline="Aanvraag" supporting-text="Laatst bijgewerkt vandaag">
					Status: <nldd-tag variant="success" size="sm" text="Goedgekeurd"></nldd-tag>
				</nldd-text-cell>
			</div>
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">Overline slot — tag als label.</p>
				<nldd-text-cell text="Aardappelen kweken in de zomer" supporting-text="Tuinieren · 4 min lezen">
					<nldd-tag slot="overline" variant="accent" size="sm" text="Nieuw"></nldd-tag>
				</nldd-text-cell>
			</div>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: `
Elk tekstgebied (overline, default, supporting-text) accepteert óf een attribuut óf slotted DOM. Wanneer een slot gevuld is, vervangt het de attribuut-render voor dat gebied.

Gebruik dit voor zelfdragende custom elementen zoals \`<nldd-tag>\`, \`<nldd-icon>\` of \`<nldd-badge>\` — die hebben hun eigen shadow DOM en zien er overal goed uit. Voor rauwe inline elementen zoals \`<a>\`, \`<strong>\` of \`<code>\` styled een cell niets — gebruik daar \`<nldd-cell>\` met \`<nldd-rich-text>\` voor.

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
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">predictive (default) — bolds the non-matched remainder. Best for short labels in combobox lists.</p>
				<nldd-text-cell text="Aardappelen" query="aa"></nldd-text-cell>
			</div>
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">match — bolds the matched query. Best for long content in search results.</p>
				<nldd-text-cell text="De aardappel is een knolgewas en een belangrijk voedingsmiddel in de Nederlandse keuken." query="aardappel" query-mark-mode="match"></nldd-text-cell>
			</div>
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">Applies across text, overline and supporting-text.</p>
				<nldd-text-cell overline="Groente" text="Aardappelen" supporting-text="Ook: pieper, knol" query="ap"></nldd-text-cell>
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
