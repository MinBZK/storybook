import { html } from 'lit';
import './ndd-description-cell.ts';
import '../../../content/rich-text/ndd-rich-text.ts';

export default {
	title: 'Components/Lists & Menus/Cells/Description Cell',
	component: 'ndd-description-cell',
	tags: ['autodocs'],
	argTypes: {
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
		selected: false,
		verticalAlignment: 'center',
		width: 'stretch',
	},
	render: (args) => html`
		<ndd-description-cell
			width=${args.width}
			vertical-alignment=${args.verticalAlignment}
			?selected=${args.selected}
		>
			<p slot="title">Term</p>
			<p slot="description">Description text</p>
		</ndd-description-cell>
	`,
};

export const Selected = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<ndd-description-cell>
				<p slot="title">Term</p>
				<p slot="description">Description text</p>
			</ndd-description-cell>
			<ndd-description-cell selected>
				<p slot="title">Term</p>
				<p slot="description">Description text (selected)</p>
			</ndd-description-cell>
		</div>
	`,
};

export const WithRichText = {
	render: () => html`
		<ndd-description-cell>
			<p slot="title">Term</p>
			<ndd-rich-text slot="description">
				<p>This description contains <strong>formatted text</strong> and <a href="#">a link</a>.</p>
			</ndd-rich-text>
		</ndd-description-cell>
	`,
};

export const VerticalAlignment = {
	render: () => html`
		<div style="display: flex; gap: 8px; height: 80px;">
			<ndd-description-cell
				vertical-alignment="center"
				style="border: 1px dashed var(--primitives-color-neutral-150);"
			>
				<p slot="title">Term</p>
				<p slot="description">Center</p>
			</ndd-description-cell>
			<ndd-description-cell
				vertical-alignment="top"
				style="border: 1px dashed var(--primitives-color-neutral-150);"
			>
				<p slot="title">Term</p>
				<p slot="description">Top</p>
			</ndd-description-cell>
			<ndd-description-cell
				vertical-alignment="bottom"
				style="border: 1px dashed var(--primitives-color-neutral-150);"
			>
				<p slot="title">Term</p>
				<p slot="description">Bottom</p>
			</ndd-description-cell>
		</div>
	`,
};
