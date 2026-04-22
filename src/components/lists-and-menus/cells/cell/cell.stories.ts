import { html } from 'lit';
import './cell.js';
import '../../../actions/button/button.js';

export default {
	title: 'Components/Lists & Menus/Cells/Cell',
	component: 'nldd-cell',
	tags: ['autodocs'],
	argTypes: {
		width: {
			control: 'text',
			description: "'stretch', 'fit-content', or a CSS length (e.g. '120px', '10rem')",
			table: { defaultValue: { summary: 'fit-content' } },
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
		minWidth: '',
		maxWidth: '',
		minHeight: '',
		verticalAlignment: 'center',
	},
	render: (args) => html`
		<nldd-cell
			width=${args.width}
			vertical-alignment=${args.verticalAlignment}
			style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);"
		>
			<nldd-button variant="neutral-tinted" text="Button"></nldd-button>
		</nldd-cell>
	`,
};

export const WidthStretch = {
	render: () => html`
		<nldd-cell width="stretch" style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);">
			<nldd-button variant="neutral-tinted" width="stretch" text="Stretched button"></nldd-button>
		</nldd-cell>
	`,
};

export const WidthFitContent = {
	render: () => html`
		<nldd-cell width="fit-content" style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);">
			<nldd-button variant="neutral-tinted" text="Fit content"></nldd-button>
		</nldd-cell>
	`,
};

export const WidthFixed = {
	render: () => html`
		<nldd-cell width="120px" style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);">
			<nldd-button variant="neutral-tinted" width="stretch" text="120px fixed"></nldd-button>
		</nldd-cell>
	`,
};

export const WithMinAndMaxWidth = {
	render: () => html`
		<nldd-cell width="stretch" min-width="80px" max-width="200px" style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);">
			<nldd-button variant="neutral-tinted" width="stretch" text="Min 80 / Max 200"></nldd-button>
		</nldd-cell>
	`,
};

export const WithMinHeight = {
	render: () => html`
		<div style="display: flex; gap: 8px; align-items: flex-start;">
			<nldd-cell vertical-alignment="top" min-height="44px" style="border: 1px dashed var(--primitives-color-neutral-150);">
				<nldd-button variant="neutral-tinted" text="Min height 44px"></nldd-button>
			</nldd-cell>
		</div>
	`,
};

export const VerticalAlignment = {
	render: () => html`
		<div style="display: flex; gap: 8px; height: 100px;">
			<nldd-cell vertical-alignment="center" style="border: 1px dashed var(--primitives-color-neutral-150);">
				<nldd-button variant="neutral-tinted" text="Center"></nldd-button>
			</nldd-cell>
			<nldd-cell vertical-alignment="top" style="border: 1px dashed var(--primitives-color-neutral-150);">
				<nldd-button variant="neutral-tinted" text="Top"></nldd-button>
			</nldd-cell>
			<nldd-cell vertical-alignment="bottom" style="border: 1px dashed var(--primitives-color-neutral-150);">
				<nldd-button variant="neutral-tinted" text="Bottom"></nldd-button>
			</nldd-cell>
		</div>
	`,
};
