import { html } from 'lit';
import './title-cell.js';

export default {
	title: 'Components/Lists & Menus/Cells/Title Cell',
	component: 'nldd-title-cell',
	tags: ['autodocs'],
	argTypes: {
		headingLevel: {
			control: 'select',
			options: [undefined, 1, 2, 3, 4, 5, 6],
			name: 'heading-level',
			description: 'Heading level (1–6). When not set, renders a &lt;p&gt;.',
			table: { defaultValue: { summary: '-' } },
		},
		text: {
			control: 'text',
			description: 'Title text content',
		},
		overline: {
			control: 'text',
			description: 'Optional overline text',
		},
		supportingText: {
			control: 'text',
			name: 'supporting-text',
			description: 'Optional supporting text below the title',
		},
		size: {
			control: 'select',
			options: [1, 2, 3, 4, 5, 6],
			description: 'Visual size of the title',
			table: { defaultValue: { summary: '5' } },
		},
		color: {
			control: 'select',
			options: ['default', 'inherit'],
			description: 'Text color variant',
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
			description: "Maximum width as CSS length (e.g. '300px', '20rem')",
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
		size: 5,
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
		<nldd-title-cell
			size=${args.size}
			color=${args.color}
			width=${args.width}
			horizontal-alignment=${args.horizontalAlignment}
			vertical-alignment=${args.verticalAlignment}
			?selected=${args.selected}
			text="Title cell"
		/>
	`,
};

export const WithOverline = {
	render: () => html`
		<nldd-title-cell overline="Overline" text="Title cell" />
	`,
};

export const WithSupportingText = {
	render: () => html`
		<nldd-title-cell text="Title cell" supporting-text="Subtitle" />
	`,
};

export const WithOverlineAndSupportingText = {
	render: () => html`
		<nldd-title-cell overline="Overline" text="Title cell" supporting-text="Subtitle" />
	`,
};

export const AllSizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			${[1, 2, 3, 4, 5, 6].map(s => html`
				<nldd-title-cell size=${s} text="Title cell (size ${s})" />
			`)}
		</div>
	`,
};

export const Selected = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<nldd-title-cell overline="Overline" text="Title cell" supporting-text="Subtitle" />
			<nldd-title-cell selected overline="Overline" text="Title cell (selected)" supporting-text="Subtitle" />
		</div>
	`,
};

export const HorizontalAlignment = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<nldd-title-cell horizontal-alignment="left" style="border: 1px dashed var(--primitives-color-neutral-150);" overline="Overline" text="Title cell (left)" supporting-text="Subtitle" />
			<nldd-title-cell horizontal-alignment="right" style="border: 1px dashed var(--primitives-color-neutral-150);" overline="Overline" text="Title cell (right)" supporting-text="Subtitle" />
		</div>
	`,
};

export const VerticalAlignment = {
	render: () => html`
		<div style="display: flex; gap: 8px; height: 80px;">
			<nldd-title-cell vertical-alignment="center" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Center" />
			<nldd-title-cell vertical-alignment="top" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Top" />
			<nldd-title-cell vertical-alignment="bottom" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Bottom" />
		</div>
	`,
};

export const QuerySearchHighlight = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">predictive (default) — bolds the non-matched remainder.</p>
				<nldd-title-cell text="Aardappelen" query="aa" />
			</div>
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">match — bolds the matched query.</p>
				<nldd-title-cell text="Aardappel knolgewas" query="aar" query-mark-mode="match" />
			</div>
			<div>
				<p style="margin: 0 0 4px; font-size: 12px; color: var(--primitives-color-neutral-500);">Applies across text, overline and supporting-text.</p>
				<nldd-title-cell overline="Groente" text="Aardappelen" supporting-text="Ook: pieper, knol" query="ap" />
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
