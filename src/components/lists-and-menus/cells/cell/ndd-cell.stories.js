import { html } from 'lit';
import './ndd-cell.ts';
import '../../../actions/button/ndd-button.ts';

export default {
	title: 'Components/Lists & Menus/Cells/Cell',
	component: 'ndd-cell',
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
		<ndd-cell
			width=${args.width}
			vertical-alignment=${args.verticalAlignment}
			style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);"
		>
			<ndd-button variant="neutral-tinted" text="Button"></ndd-button>
		</ndd-cell>
	`,
};

export const WidthStretch = {
	render: () => html`
		<ndd-cell
			width="stretch"
			style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);"
		>
			<ndd-button variant="neutral-tinted" width="stretch" text="Stretched button"></ndd-button>
		</ndd-cell>
	`,
};

export const WidthFitContent = {
	render: () => html`
		<ndd-cell
			width="fit-content"
			style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);"
		>
			<ndd-button variant="neutral-tinted" text="Fit content"></ndd-button>
		</ndd-cell>
	`,
};

export const WidthFixed = {
	render: () => html`
		<ndd-cell
			width=${120}
			style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);"
		>
			<ndd-button variant="neutral-tinted" width="stretch" text="120px fixed"></ndd-button>
		</ndd-cell>
	`,
};

export const WithMinAndMaxWidth = {
	render: () => html`
		<ndd-cell
			width="stretch"
			min-width=${80}
			max-width=${200}
			style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);"
		>
			<ndd-button variant="neutral-tinted" width="stretch" text="Min 80 / Max 200"></ndd-button>
		</ndd-cell>
	`,
};

export const WithMinHeight = {
	render: () => html`
		<div style="display: flex; gap: 8px; align-items: flex-start;">
			<ndd-cell
				vertical-alignment="top"
				min-height=${44}
				style="border: 1px dashed var(--primitives-color-neutral-150);"
			>
				<ndd-button variant="neutral-tinted" text="Min height 44px"></ndd-button>
			</ndd-cell>
		</div>
	`,
};

export const VerticalAlignment = {
	render: () => html`
		<div style="display: flex; gap: 8px; height: 100px;">
			<ndd-cell
				vertical-alignment="center"
				style="border: 1px dashed var(--primitives-color-neutral-150);"
			>
				<ndd-button variant="neutral-tinted" text="Center"></ndd-button>
			</ndd-cell>
			<ndd-cell
				vertical-alignment="top"
				style="border: 1px dashed var(--primitives-color-neutral-150);"
			>
				<ndd-button variant="neutral-tinted" text="Top"></ndd-button>
			</ndd-cell>
			<ndd-cell
				vertical-alignment="bottom"
				style="border: 1px dashed var(--primitives-color-neutral-150);"
			>
				<ndd-button variant="neutral-tinted" text="Bottom"></ndd-button>
			</ndd-cell>
		</div>
	`,
};
