import { html } from 'lit';
import './icon-cell.ts';
import { ICONS } from '../../../content/icon/icon.ts';

export default {
	title: 'Components/Lists & Menus/Cells/Icon Cell',
	component: 'nldd-icon-cell',
	tags: ['autodocs'],
	argTypes: {
		verticalAlignment: {
			control: 'select',
			options: ['center', 'top'],
			description: 'Vertical alignment of the icon',
			table: { defaultValue: { summary: 'center' } },
		},
		size: {
			control: 'select',
			options: ['16', '20', '24', '32'],
			description: 'Icon size in pixels',
			table: { defaultValue: { summary: '24' } },
		},
		selected: {
			control: 'boolean',
			description: 'Selected state',
			table: { defaultValue: { summary: 'false' } },
		},
		icon: {
			control: 'select',
			options: ICONS,
			description: 'Icon to display',
		},
	},
};

export const Default = {
	args: {
		size: '24',
		verticalAlignment: 'center',
		selected: false,
		icon: 'icon-placeholder',
	},
	render: (args) => html`
		<nldd-icon-cell
			vertical-alignment=${args.verticalAlignment}
			size=${args.size}
			?selected=${args.selected}
		>
			<nldd-icon name=${args.icon}></nldd-icon>
		</nldd-icon-cell>
	`,
};

export const AllSizes = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-icon-cell size="16">
				<nldd-icon name="icon-placeholder"></nldd-icon>
			</nldd-icon-cell>
			<nldd-icon-cell size="20">
				<nldd-icon name="icon-placeholder"></nldd-icon>
			</nldd-icon-cell>
			<nldd-icon-cell size="24">
				<nldd-icon name="icon-placeholder"></nldd-icon>
			</nldd-icon-cell>
			<nldd-icon-cell size="32">
				<nldd-icon name="icon-placeholder"></nldd-icon>
			</nldd-icon-cell>
		</div>
	`,
};

export const Selected = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-icon-cell size="24">
				<nldd-icon name="icon-placeholder"></nldd-icon>
			</nldd-icon-cell>
			<nldd-icon-cell size="24" selected>
				<nldd-icon name="icon-placeholder"></nldd-icon>
			</nldd-icon-cell>
		</div>
	`,
};

export const VerticalTop = {
	render: () => html`
		<nldd-icon-cell vertical-alignment="top" size="24" style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);">
			<nldd-icon name="icon-placeholder"></nldd-icon>
		</nldd-icon-cell>
	`,
};
