import { html } from 'lit';
import './icon-cell.js';
import '../../../content/icon/icon.js';
import { ICONS } from '../../../content/icon/icon.js';

export default {
	title: 'Components/Lists & Menus/Cells/Icon Cell',
	component: 'nldd-icon-cell',
	tags: ['autodocs'],
	argTypes: {
		verticalAlignment: {
			name: 'vertical-alignment',
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
		color: {
			control: 'select',
			options: ['default', 'secondary', 'accent', 'success', 'warning', 'critical'],
			description: 'Color variant of the icon',
			table: { defaultValue: { summary: 'default' } },
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
		color: 'default',
		icon: 'icon-placeholder',
	},
	render: (args: Record<string, any>) => html`
		<nldd-icon-cell
			vertical-alignment=${args.verticalAlignment}
			size=${args.size}
			color=${args.color}
			icon=${args.icon}
		></nldd-icon-cell>
	`,
};

export const Colors = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-icon-cell size="24" icon="icon-placeholder"></nldd-icon-cell>
			<nldd-icon-cell color="secondary" size="24" icon="icon-placeholder"></nldd-icon-cell>
			<nldd-icon-cell color="accent" size="24" icon="icon-placeholder"></nldd-icon-cell>
			<nldd-icon-cell color="success" size="24" icon="icon-placeholder"></nldd-icon-cell>
			<nldd-icon-cell color="warning" size="24" icon="icon-placeholder"></nldd-icon-cell>
			<nldd-icon-cell color="critical" size="24" icon="icon-placeholder"></nldd-icon-cell>
		</div>
	`,
	parameters: {
		docs: {
			description: { story: 'Default · secondary · accent · success · warning · critical.' },
		},
	},
};

export const AllSizes = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-icon-cell size="16" icon="icon-placeholder"></nldd-icon-cell>
			<nldd-icon-cell size="20" icon="icon-placeholder"></nldd-icon-cell>
			<nldd-icon-cell size="24" icon="icon-placeholder"></nldd-icon-cell>
			<nldd-icon-cell size="32" icon="icon-placeholder"></nldd-icon-cell>
		</div>
	`,
};

export const VerticalTop = {
	render: () => html`
		<nldd-icon-cell vertical-alignment="top" size="24" icon="icon-placeholder" style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);"></nldd-icon-cell>
	`,
};

export const CustomSlotContent = {
	render: () => html`
		<nldd-icon-cell size="24">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
				<circle cx="12" cy="12" r="10"></circle>
			</svg>
		</nldd-icon-cell>
	`,
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'When `icon` is not set, the default slot renders consumer content — useful for custom SVGs or icons from another library.' } },
	},
};
