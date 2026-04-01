import { html } from 'lit';
import './rr-text-cell.ts';

export default {
	title: 'Components/Lists & Menus/Cells/Text Cell',
	component: 'rr-text-cell',
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['md', 'sm'],
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
			description: "Width of the cell: 'stretch', 'fit-content', or a number (pixels)",
			table: { defaultValue: { summary: 'stretch' } },
		},
		minWidth: {
			control: 'number',
			description: 'Minimum width in pixels',
		},
		maxWidth: {
			control: 'number',
			description: 'Maximum width in pixels',
		},
		minHeight: {
			control: 'number',
			description: 'Minimum height in pixels',
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
		horizontalAlignment: 'left',
		verticalAlignment: 'center',
		selected: false,
	},
	render: (args) => html`
		<rr-text-cell
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
		<rr-text-cell overline="Overline" text="Text cell" />
	`,
};

export const WithSupportingText = {
	render: () => html`
		<rr-text-cell text="Text cell" supporting-text="Supporting text" />
	`,
};

export const WithOverlineAndSupportingText = {
	render: () => html`
		<rr-text-cell overline="Overline" text="Text cell" supporting-text="Supporting text" />
	`,
};

export const Selected = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<rr-text-cell overline="Overline" text="Text cell" supporting-text="Supporting text" />
			<rr-text-cell selected overline="Overline" text="Text cell (selected)" supporting-text="Supporting text" />
		</div>
	`,
};

export const Secondary = {
	render: () => html`
		<rr-text-cell color="secondary" text="Text cell (secondary)" />
	`,
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<rr-text-cell size="md" overline="Overline" text="Text cell (md)" supporting-text="Supporting text" />
			<rr-text-cell size="sm" overline="Overline" text="Text cell (sm)" supporting-text="Supporting text" />
		</div>
	`,
};

export const Width = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px; width: 300px; border: 1px dashed var(--primitives-color-neutral-150); padding: 8px;">
			<rr-text-cell width="stretch" text="Stretch (default)" />
			<rr-text-cell width="fit-content" text="Fit content" />
			<rr-text-cell width=${120} text="120px fixed" />
		</div>
	`,
};

export const MinHeight = {
	render: () => html`
		<div style="display: flex; gap: 8px; align-items: flex-start;">
			<rr-text-cell vertical-alignment="top" min-height=${44} style="border: 1px dashed var(--primitives-color-neutral-150);" text="Min height 44px" />
			<rr-text-cell vertical-alignment="top" min-height=${44} style="border: 1px dashed var(--primitives-color-neutral-150);" text="With supporting text" supporting-text="Supporting text" />
		</div>
	`,
};

export const HorizontalAlignment = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<rr-text-cell horizontal-alignment="left" style="width: 200px; border: 1px dashed var(--primitives-color-neutral-150);" overline="Overline" text="Text cell (left)" supporting-text="Supporting text" />
			<rr-text-cell horizontal-alignment="right" style="width: 200px; border: 1px dashed var(--primitives-color-neutral-150);" overline="Overline" text="Text cell (right)" supporting-text="Supporting text" />
		</div>
	`,
};

export const VerticalAlignment = {
	render: () => html`
		<div style="display: flex; gap: 8px; height: 80px;">
			<rr-text-cell vertical-alignment="center" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Center" />
			<rr-text-cell vertical-alignment="top" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Top" />
			<rr-text-cell vertical-alignment="bottom" style="border: 1px dashed var(--primitives-color-neutral-150);" text="Bottom" />
		</div>
	`,
};
