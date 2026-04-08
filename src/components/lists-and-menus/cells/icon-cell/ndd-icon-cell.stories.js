import { html } from 'lit';
import './ndd-icon-cell.ts';
import { ICONS } from '../../../content/icon/ndd-icon.ts';

export default {
	title: 'Components/Lists & Menus/Cells/Icon Cell',
	component: 'ndd-icon-cell',
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
		<ndd-icon-cell
			vertical-alignment=${args.verticalAlignment}
			size=${args.size}
			?selected=${args.selected}
		>
			<ndd-icon name=${args.icon}></ndd-icon>
		</ndd-icon-cell>
	`,
};

export const AllSizes = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<ndd-icon-cell size="16">
				<ndd-icon name="icon-placeholder"></ndd-icon>
			</ndd-icon-cell>
			<ndd-icon-cell size="20">
				<ndd-icon name="icon-placeholder"></ndd-icon>
			</ndd-icon-cell>
			<ndd-icon-cell size="24">
				<ndd-icon name="icon-placeholder"></ndd-icon>
			</ndd-icon-cell>
			<ndd-icon-cell size="32">
				<ndd-icon name="icon-placeholder"></ndd-icon>
			</ndd-icon-cell>
		</div>
	`,
};

export const Selected = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<ndd-icon-cell size="24">
				<ndd-icon name="icon-placeholder"></ndd-icon>
			</ndd-icon-cell>
			<ndd-icon-cell size="24" selected>
				<ndd-icon name="icon-placeholder"></ndd-icon>
			</ndd-icon-cell>
		</div>
	`,
};

export const VerticalTop = {
	render: () => html`
		<ndd-icon-cell vertical-alignment="top" size="24" style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);">
			<ndd-icon name="icon-placeholder"></ndd-icon>
		</ndd-icon-cell>
	`,
};
