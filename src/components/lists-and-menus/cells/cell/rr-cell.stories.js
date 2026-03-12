import { html } from 'lit';
import './rr-cell.ts';
import '../../../actions/button/rr-button.ts';

export default {
	title: 'Components/Lists & Menus/Cells/Cell',
	component: 'rr-cell',
	tags: ['autodocs'],
	argTypes: {
		verticalAlignment: {
			control: 'select',
			options: ['center', 'top', 'bottom'],
			description: 'Vertical alignment of slotted content',
			table: { defaultValue: { summary: 'center' } },
		},
		width: {
			control: 'text',
			description: "Width of the cell: 'stretch', 'fit-content', or a number (pixels)",
			table: { defaultValue: { summary: 'fit-content' } },
		},
		minWidth: {
			control: 'number',
			description: 'Minimum width in pixels',
		},
		maxWidth: {
			control: 'number',
			description: 'Maximum width in pixels',
		},
	},
};

export const Default = {
	args: {
		width: 'fit-content',
		verticalAlignment: 'center',
	},
	render: (args) => html`
		<rr-cell
			width=${args.width}
			vertical-alignment=${args.verticalAlignment}
			style="height: 80px; border: 1px dashed #ccc;"
		>
			<rr-button variant="neutral-tinted">Button</rr-button>
		</rr-cell>
	`,
};

export const WidthStretch = {
	render: () => html`
		<rr-cell width="stretch" style="height: 80px; border: 1px dashed #ccc;">
			<rr-button variant="neutral-tinted" width="stretch">Stretched button</rr-button>
		</rr-cell>
	`,
};

export const WidthFitContent = {
	render: () => html`
		<rr-cell width="fit-content" style="height: 80px; border: 1px dashed #ccc;">
			<rr-button variant="neutral-tinted">Fit content</rr-button>
		</rr-cell>
	`,
};

export const WidthFixed = {
	render: () => html`
		<rr-cell width=${120} style="height: 80px; border: 1px dashed #ccc;">
			<rr-button variant="neutral-tinted" width="stretch">120px fixed</rr-button>
		</rr-cell>
	`,
};

export const WithMinAndMaxWidth = {
	render: () => html`
		<rr-cell width="stretch" min-width=${80} max-width=${200} style="height: 80px; border: 1px dashed #ccc;">
			<rr-button variant="neutral-tinted" width="stretch">Min 80 / Max 200</rr-button>
		</rr-cell>
	`,
};

export const VerticalAlignmentCenter = {
	render: () => html`
		<rr-cell vertical-alignment="center" style="height: 100px; border: 1px dashed #ccc;">
			<rr-button variant="neutral-tinted">Center</rr-button>
		</rr-cell>
	`,
};

export const VerticalAlignmentTop = {
	render: () => html`
		<rr-cell vertical-alignment="top" style="height: 100px; border: 1px dashed #ccc;">
			<rr-button variant="neutral-tinted">Top</rr-button>
		</rr-cell>
	`,
};

export const VerticalAlignmentBottom = {
	render: () => html`
		<rr-cell vertical-alignment="bottom" style="height: 100px; border: 1px dashed #ccc;">
			<rr-button variant="neutral-tinted">Bottom</rr-button>
		</rr-cell>
	`,
};

export const InListItem = {
	render: () => html`
		<rr-list variant="box" style="width: 300px;">
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Item with button</p>
				</rr-text-cell>
				<rr-cell slot="end">
					<rr-button variant="neutral-tinted" size="sm">Action</rr-button>
				</rr-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Item with fixed width cell</p>
				</rr-text-cell>
				<rr-cell slot="end" width=${80}>
					<rr-button variant="neutral-tinted" size="sm" width="stretch">80px</rr-button>
				</rr-cell>
			</rr-list-item>
		</rr-list>
	`,
};
