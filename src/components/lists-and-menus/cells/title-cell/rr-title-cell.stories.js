import { html } from 'lit';
import './rr-title-cell.ts';

export default {
	title: 'Components/Lists & Menus/Cells/Title Cell',
	component: 'rr-title-cell',
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
			options: ['default', 'inherit'],
			description: 'Text color variant',
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
		size: 5,
		color: 'default',
		width: 'stretch',
		horizontalAlignment: 'left',
		verticalAlignment: 'center',
		selected: false,
	},
	render: (args) => html`
		<rr-title-cell
			size=${args.size}
			color=${args.color}
			width=${args.width}
			horizontal-alignment=${args.horizontalAlignment}
			vertical-alignment=${args.verticalAlignment}
			?selected=${args.selected}
		>
			<h2>Title cell</h2>
		</rr-title-cell>
	`,
};

export const WithOverline = {
	render: () => html`
		<rr-title-cell>
			<p slot="overline">Overline</p>
			<h2>Title cell</h2>
		</rr-title-cell>
	`,
};

export const WithSubtitle = {
	render: () => html`
		<rr-title-cell>
			<h2>Title cell</h2>
			<p slot="subtitle">Subtitle</p>
		</rr-title-cell>
	`,
};

export const WithOverlineAndSubtitle = {
	render: () => html`
		<rr-title-cell>
			<p slot="overline">Overline</p>
			<h2>Title cell</h2>
			<p slot="subtitle">Subtitle</p>
		</rr-title-cell>
	`,
};

export const AllSizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			${[1, 2, 3, 4, 5, 6].map(s => html`
				<rr-title-cell size=${s}>
					<h2>Title cell (size ${s})</h2>
				</rr-title-cell>
			`)}
		</div>
	`,
};

export const Selected = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<rr-title-cell>
				<p slot="overline">Overline</p>
				<h2>Title cell</h2>
				<p slot="subtitle">Subtitle</p>
			</rr-title-cell>
			<rr-title-cell selected>
				<p slot="overline">Overline</p>
				<h2>Title cell (selected)</h2>
				<p slot="subtitle">Subtitle</p>
			</rr-title-cell>
		</div>
	`,
};

export const ColorInherit = {
	render: () => html`
		<div style="color: var(--semantics-feedback-success-color);">
			<rr-title-cell color="inherit">
				<p slot="overline">Overline</p>
				<h2>Title cell (inherit)</h2>
				<p slot="subtitle">Subtitle</p>
			</rr-title-cell>
		</div>
	`,
};

export const HorizontalAlignment = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<rr-title-cell horizontal-alignment="left" style="border: 1px dashed #ccc;">
				<p slot="overline">Overline</p>
				<h2>Title cell (left)</h2>
				<p slot="subtitle">Subtitle</p>
			</rr-title-cell>
			<rr-title-cell horizontal-alignment="right" style="border: 1px dashed #ccc;">
				<p slot="overline">Overline</p>
				<h2>Title cell (right)</h2>
				<p slot="subtitle">Subtitle</p>
			</rr-title-cell>
		</div>
	`,
};

export const VerticalAlignment = {
	render: () => html`
		<div style="display: flex; gap: 8px; height: 80px;">
			<rr-title-cell vertical-alignment="center" style="border: 1px dashed #ccc;">
				<h2>Center</h2>
			</rr-title-cell>
			<rr-title-cell vertical-alignment="top" style="border: 1px dashed #ccc;">
				<h2>Top</h2>
			</rr-title-cell>
			<rr-title-cell vertical-alignment="bottom" style="border: 1px dashed #ccc;">
				<h2>Bottom</h2>
			</rr-title-cell>
		</div>
	`,
};
