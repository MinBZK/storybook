// icon.stories.js
import { ICONS, aliases } from './ndd-icon.ts';

const aliasSet = new Set(Object.keys(aliases));
const iconNames = ICONS.filter(name => !aliasSet.has(name));
const allIconNames = ICONS;

export default {
	title: 'Components/Content/Icon',
	component: 'ndd-icon',
	tags: ['autodocs'],
	argTypes: {
	name: {
		control: 'select',
		options: allIconNames,
		description: 'Select an icon from the library',
		table: {
		type: { summary: 'string' },
		defaultValue: { summary: 'circle-dashed' },
		},
	},
	containerSize: {
		control: { type: 'range', min: 16, max: 128, step: 8 },
		description: 'Size of the container (icon will fill it)',
		table: {
		type: { summary: 'number' },
		defaultValue: { summary: 32 },
		},
	},
	containerColor: {
		control: 'color',
		description: 'Color of the container (icon will inherit it)',
		table: {
		type: { summary: 'string' },
		defaultValue: { summary: '#000000' },
		},
	},
	},
	parameters: {
	docs: {
		description: {
		component: 'A flexible icon component that displays SVG icons from a predefined library. The icon always fills its parent container (square aspect ratio) and inherits color from parent. Aliases can be used as alternative names for icons.',
		},
	},
	},
	render: ({ name, containerSize, containerColor }) => `
	<div style="width: ${containerSize}px; height: ${containerSize}px; color: ${containerColor};">
		<ndd-icon name="${name}"></ndd-icon>
	</div>
	`,
};

export const Default = {
	args: {
	name: 'circle-dashed',
	containerSize: 32,
	containerColor: '#000000',
	},
	parameters: {
	docs: {
		description: {
		story: 'The default icon configuration. Parent container controls size and color.',
		},
	},
	},
};

export const IconGallery = {
	parameters: {
	docs: {
		description: {
		story: 'A gallery view showing all available icons in the library, including aliases.',
		},
	},
	},
	render: () => `
	<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; padding: 16px;">
		${iconNames.map(iconName => {
		const iconAliases = Object.entries(aliases)
			.filter(([_, target]) => target === iconName)
			.map(([alias]) => alias);
		return `
			<div style="text-align: center; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; background: white;">
			<div style="width: 48px; height: 48px; margin: 0 auto; color: #333;">
				<ndd-icon name="${iconName}"></ndd-icon>
			</div>
			<div style="font-size: 12px; margin-top: 8px; color: #333; font-weight: 500;">${iconName}</div>
			${iconAliases.length > 0 ? `
				<div style="font-size: 10px; color: #999; margin-top: 4px; font-style: italic;">
				${iconAliases.join(', ')}
				</div>
			` : ''}
			</div>
		`;
		}).join('')}
	</div>
	`,
};

export const Sizes = {
	parameters: {
	docs: {
		description: {
		story: 'Icons can be displayed in different sizes by changing the parent container size.',
		},
	},
	},
	render: () => `
	<div style="display: flex; gap: 24px; align-items: center; padding: 16px;">
		${[16, 24, 32, 48, 64].map(size => `
		<div style="text-align: center;">
			<div style="width: ${size}px; height: ${size}px; color: #ef4444;">
			<ndd-icon name="heart"></ndd-icon>
			</div>
			<div style="font-size: 10px; margin-top: 4px;">${size}px</div>
		</div>
		`).join('')}
	</div>
	`,
};

export const Colors = {
	parameters: {
	docs: {
		description: {
		story: 'Icons can be displayed in different colors by changing the parent container color.',
		},
	},
	},
	render: () => `
	<div style="display: flex; gap: 24px; align-items: center; padding: 16px;">
		${['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'].map(color => `
		<div style="width: 48px; height: 48px; color: ${color};">
			<ndd-icon name="heart"></ndd-icon>
		</div>
		`).join('')}
	</div>
	`,
};