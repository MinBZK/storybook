import { html } from 'lit';
import './description-cell.js';
import '../../../content/rich-text/rich-text.js';

export default {
	title: 'Components/Lists & Menus/Cells/Description Cell',
	component: 'nldd-description-cell',
	tags: ['autodocs'],
	argTypes: {
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
		verticalAlignment: {
			name: 'vertical-alignment',
			control: 'select',
			options: ['center', 'top', 'bottom'],
			description: 'Vertical alignment of the cell',
			table: { defaultValue: { summary: 'center' } },
		},
	},
};

export const Default = {
	args: {
		verticalAlignment: 'center',
		width: 'stretch',
		minWidth: '',
		maxWidth: '',
		minHeight: '',
	},
	render: (args: Record<string, any>) => html`
		<nldd-description-cell
			width=${args.width}
			vertical-alignment=${args.verticalAlignment}
		>
			<p slot="title">Term</p>
			<p slot="description">Description text</p>
		</nldd-description-cell>
	`,
};

export const WithRichText = {
	render: () => html`
		<nldd-description-cell>
			<p slot="title">Term</p>
			<nldd-rich-text slot="description">
				<p>This description contains <strong>formatted text</strong> and <a href="#">a link</a>.</p>
			</nldd-rich-text>
		</nldd-description-cell>
	`,
};

export const VerticalAlignment = {
	render: () => html`
		<div style="display: flex; gap: 8px; height: 80px;">
			<nldd-description-cell vertical-alignment="center" style="border: 1px dashed var(--primitives-color-neutral-150);">
				<p slot="title">Term</p>
				<p slot="description">Center</p>
			</nldd-description-cell>
			<nldd-description-cell vertical-alignment="top" style="border: 1px dashed var(--primitives-color-neutral-150);">
				<p slot="title">Term</p>
				<p slot="description">Top</p>
			</nldd-description-cell>
			<nldd-description-cell vertical-alignment="bottom" style="border: 1px dashed var(--primitives-color-neutral-150);">
				<p slot="title">Term</p>
				<p slot="description">Bottom</p>
			</nldd-description-cell>
		</div>
	`,
};
