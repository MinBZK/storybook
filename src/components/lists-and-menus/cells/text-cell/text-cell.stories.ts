import { html } from 'lit';
import './text-cell.js';

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
			options: ['default', 'secondary', 'inherit'],
			description: 'Color variant of the text',
			table: { defaultValue: { summary: 'default' } },
		},
		width: {
			control: 'text',
			description: "'stretch', 'fit-content', or a CSS length (e.g. '200px', '20rem')",
			table: { defaultValue: { summary: 'stretch' } },
		},
		minWidth: {
			control: 'text',
			description: "Minimum width as CSS length (e.g. '80px', '5rem')",
		},
		maxWidth: {
			control: 'text',
			description: "Maximum width as CSS length (e.g. '200px', '20rem')",
		},
		minHeight: {
			control: 'text',
			description: "Minimum height as CSS length (e.g. '44px', '3rem')",
		},
		horizontalAlignment: {
			control: 'select',
			options: ['left', 'right'],
			description: 'Horizontal alignment of the text',
			table: { defaultValue: { summary: 'left' } },
		},
		verticalAlignment: {
			control: 'select',
			options: ['center', 'top', 'bottom'],
			description: 'Vertical alignment of the cell',
			table: { defaultValue: { summary: 'center' } },
		},
		selected: {
			control: 'boolean',
			description: 'Selected state',
			table: { defaultValue: { summary: 'false' } },
		},
	},
};

export const Default = {
	args: {
		size: 'md',
		color: 'default',
		width: 'stretch',
		minWidth: '',
		maxWidth: '',
		minHeight: '',
		horizontalAlignment: 'left',
		verticalAlignment: 'center',
		selected: false,
	},
	render: (args: Record<string, any>) => html`
		<nldd-text-cell
			size=${args.size}
			color=${args.color}
			width=${args.width}
			horizontal-alignment=${args.horizontalAlignment}
			vertical-alignment=${args.verticalAlignment}
			?selected=${args.selected}
			text="Text cell"
		/>
	`,
};

export const WithOverline = {
	render: () => html`
		<nldd-text-cell overline="Overline" text="Text cell" />
	`,
};

export const WithSupportingText = {
	render: () => html`
		<nldd-text-cell text="Text cell" supporting-text="Supporting text" />
	`,
};

export const WithOverlineAndSupportingText = {
	render: () => html`
		<nldd-text-cell overline="Overline" text="Text cell" supporting-text="Supporting text" />
	`,
};

export const Selected = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<nldd-text-cell overline="Overline" text="Text cell" supporting-text="Supporting text" />
			<nldd-text-cell selected overline="Overline" text="Text cell (selected)" supporting-text="Supporting text" />
		</div>
	`,
};

export const Secondary = {
	render: () => html`
		<nldd-text-cell color="secondary" text="Text cell (secondary)" />
	`,
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<nldd-text-cell size="md" overline="Overline" text="Text cell (md)" supporting-text="Supporting text" />
			<nldd-text-cell size="sm" overline="Overline" text="Text cell (sm)" supporting-text="Supporting text" />
		</div>
	`,
};

export const Width = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px; width: 300px; border: 1px dashed var(--primitives-color-neutral-150); padding: 8px;">
			<nldd-text-cell width="stretch" text="Stretch (default)" />
			<nldd-text-cell width="fit-content" text="Fit content" />
			<nldd-text-cell width="120px" text="120px fixed" />
		</div>
	`,
};

export const MinHeight = {
	render: () => html`
		<div style="display: flex; gap: 8px; align-items: flex-start;">
			<nldd-text-cell vertical-alignment="top" min-height="44px" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Min height 44px" />
			<nldd-text-cell vertical-alignment="top" min-height="44px" style="border: 1px dashed var(--primitives-color-neutral-150);" text="With supporting text" supporting-text="Supporting text" />
		</div>
	`,
};

export const HorizontalAlignment = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<nldd-text-cell horizontal-alignment="left" style="width: 200px; border: 1px dashed var(--primitives-color-neutral-150);" overline="Overline" text="Text cell (left)" supporting-text="Supporting text" />
			<nldd-text-cell horizontal-alignment="right" style="width: 200px; border: 1px dashed var(--primitives-color-neutral-150);" overline="Overline" text="Text cell (right)" supporting-text="Supporting text" />
		</div>
	`,
};

export const VerticalAlignment = {
	render: () => html`
		<div style="display: flex; gap: 8px; height: 80px;">
			<nldd-text-cell vertical-alignment="center" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Center" />
			<nldd-text-cell vertical-alignment="top" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Top" />
			<nldd-text-cell vertical-alignment="bottom" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Bottom" />
		</div>
	`,
};

export const QuerySearchHighlight = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">predictive (default) — bolds the non-matched remainder. Best for short labels in combobox lists.</p>
				<nldd-text-cell text="Aardappelen" query="aa" />
			</div>
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">match — bolds the matched query. Best for long content in search results.</p>
				<nldd-text-cell text="De aardappel is een knolgewas en een belangrijk voedingsmiddel in de Nederlandse keuken." query="aardappel" query-mark-mode="match" />
			</div>
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">Applies across text, overline and supporting-text.</p>
				<nldd-text-cell overline="Groente" text="Aardappelen" supporting-text="Ook: pieper, knol" query="ap" />
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
