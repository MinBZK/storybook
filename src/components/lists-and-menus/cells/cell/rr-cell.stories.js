import { html } from 'lit';
import './rr-cell.ts';
import '../../../actions/button/rr-button.ts';

export default {
	title: 'Components/Lists & Menus/Cells/Cell',
	component: 'rr-cell',
	tags: ['autodocs'],
	argTypes: {
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
		minHeight: {
			control: 'number',
			description: 'Minimum height in pixels',
		},
		verticalAlignment: {
			control: 'select',
			options: ['center', 'top', 'bottom'],
			description: 'Vertical alignment of slotted content',
			table: { defaultValue: { summary: 'center' } },
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
			style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);"
		>
			<rr-button variant="neutral-tinted" text="Button"></rr-button>
		</rr-cell>
	`,
};

export const WidthStretch = {
	render: () => html`
		<rr-cell width="stretch" style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);">
			<rr-button variant="neutral-tinted" width="stretch" text="Stretched button"></rr-button>
		</rr-cell>
	`,
};

export const WidthFitContent = {
	render: () => html`
		<rr-cell width="fit-content" style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);">
			<rr-button variant="neutral-tinted" text="Fit content"></rr-button>
		</rr-cell>
	`,
};

export const WidthFixed = {
	render: () => html`
		<rr-cell width=${120} style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);">
			<rr-button variant="neutral-tinted" width="stretch" text="120px fixed"></rr-button>
		</rr-cell>
	`,
};

export const WithMinAndMaxWidth = {
	render: () => html`
		<rr-cell width="stretch" min-width=${80} max-width=${200} style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);">
			<rr-button variant="neutral-tinted" width="stretch" text="Min 80 / Max 200"></rr-button>
		</rr-cell>
	`,
};

export const WithMinHeight = {
	render: () => html`
		<div style="display: flex; gap: 8px; align-items: flex-start;">
			<rr-cell vertical-alignment="top" min-height=${44} style="border: 1px dashed var(--primitives-color-neutral-150);">
				<rr-button variant="neutral-tinted" text="Min height 44px"></rr-button>
			</rr-cell>
		</div>
	`,
};

export const VerticalAlignment = {
	render: () => html`
		<div style="display: flex; gap: 8px; height: 100px;">
			<rr-cell vertical-alignment="center" style="border: 1px dashed var(--primitives-color-neutral-150);">
				<rr-button variant="neutral-tinted" text="Center"></rr-button>
			</rr-cell>
			<rr-cell vertical-alignment="top" style="border: 1px dashed var(--primitives-color-neutral-150);">
				<rr-button variant="neutral-tinted" text="Top"></rr-button>
			</rr-cell>
			<rr-cell vertical-alignment="bottom" style="border: 1px dashed var(--primitives-color-neutral-150);">
				<rr-button variant="neutral-tinted" text="Bottom"></rr-button>
			</rr-cell>
		</div>
	`,
};
