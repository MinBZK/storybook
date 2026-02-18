// icon.stories.js
import './icon.ts';
import * as icons from './icon-library.js';

// Auto-generate ALIASES by detecting which exports reference the same SVG
// This way you only need to add: export const home = house;
// No need to manually maintain an ALIASES object

const svgToNames = new Map();
const aliasToOriginal = new Map();

// First pass: map each unique SVG to the first name we encounter (will be the original)
Object.keys(icons).forEach(name => {
	const icon = icons[name];
	// Skip non-icon exports
	if (!icon || typeof icon !== 'object' || !icon.strings) {
		return;
	}
	
	const svgString = icon.strings.join('');
	
	if (!svgToNames.has(svgString)) {
		// This is the first (original) name for this SVG
		svgToNames.set(svgString, { original: name, aliases: [] });
	} else {
		// This is an alias
		const entry = svgToNames.get(svgString);
		entry.aliases.push(name);
		aliasToOriginal.set(name, entry.original);
	}
});

// Build the final mapping
const iconMapping = {};
svgToNames.forEach(({ original, aliases }) => {
	iconMapping[original] = { aliases };
});

const iconNames = Object.keys(iconMapping);

export default {
	title: 'Components/Content/Icon',
	component: 'rr-icon',
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'select',
			options: iconNames,
			description: 'Select an icon from the library',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'circleDashed' },
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
				component: 'A flexible icon component that displays SVG icons from a predefined library. The icon always fills its parent container (square aspect ratio) and inherits color from parent.',
			},
		},
	},
	render: ({ name, containerSize, containerColor }) => `
		<div style="width: ${containerSize}px; height: ${containerSize}px; color: ${containerColor};">
			<rr-icon name="${name}"></rr-icon>
		</div>
	`,
};

export const Default = {
	args: {
		name: 'circleDashed',
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
				story: 'A gallery view showing all available icons in the library with their aliases.',
			},
		},
	},
	render: () => `
		<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; padding: 16px;">
			${iconNames.map(iconName => {
				const aliases = iconMapping[iconName]?.aliases || [];
				const aliasText = aliases.length > 0 ? ` (${aliases.join(', ')})` : '';
				
				return `
					<div style="text-align: center; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; background: white;">
						<div style="width: 48px; height: 48px; margin: 0 auto; color: #333;">
							<rr-icon name="${iconName}"></rr-icon>
						</div>
						<div style="font-size: 12px; margin-top: 8px; color: #333; font-weight: 500;">${iconName}</div>
						${aliases.length > 0 ? `
							<div style="font-size: 10px; color: #999; margin-top: 4px; font-style: italic;">
								${aliasText}
							</div>
						` : ''}
					</div>
				`;
			}).join('')}
		</div>
	`,
};

export const WithAliases = {
	parameters: {
		docs: {
			description: {
				story: 'Examples showing that aliases work the same as original names.',
			},
		},
	},
	render: () => `
		<div style="display: flex; gap: 32px; align-items: center; padding: 16px;">
			<div style="text-align: center;">
				<div style="width: 48px; height: 48px; color: #2563eb;">
					<rr-icon name="house"></rr-icon>
				</div>
				<div style="font-size: 12px; margin-top: 8px;">house</div>
			</div>
			<div style="text-align: center;">
				<div style="width: 48px; height: 48px; color: #2563eb;">
					<rr-icon name="home"></rr-icon>
				</div>
				<div style="font-size: 12px; margin-top: 8px;">home (alias)</div>
			</div>
			<div style="text-align: center;">
				<div style="width: 48px; height: 48px; color: #16a34a;">
					<rr-icon name="person"></rr-icon>
				</div>
				<div style="font-size: 12px; margin-top: 8px;">person</div>
			</div>
			<div style="text-align: center;">
				<div style="width: 48px; height: 48px; color: #16a34a;">
					<rr-icon name="user"></rr-icon>
				</div>
				<div style="font-size: 12px; margin-top: 8px;">user (alias)</div>
			</div>
			<div style="text-align: center;">
				<div style="width: 48px; height: 48px; color: #dc2626;">
					<rr-icon name="magnifier"></rr-icon>
				</div>
				<div style="font-size: 12px; margin-top: 8px;">magnifier</div>
			</div>
			<div style="text-align: center;">
				<div style="width: 48px; height: 48px; color: #dc2626;">
					<rr-icon name="search"></rr-icon>
				</div>
				<div style="font-size: 12px; margin-top: 8px;">search (alias)</div>
			</div>
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
			<div style="text-align: center;">
				<div style="width: 16px; height: 16px; color: #ef4444;">
					<rr-icon name="heart"></rr-icon>
				</div>
				<div style="font-size: 10px; margin-top: 4px;">16px</div>
			</div>
			<div style="text-align: center;">
				<div style="width: 24px; height: 24px; color: #ef4444;">
					<rr-icon name="heart"></rr-icon>
				</div>
				<div style="font-size: 10px; margin-top: 4px;">24px</div>
			</div>
			<div style="text-align: center;">
				<div style="width: 32px; height: 32px; color: #ef4444;">
					<rr-icon name="heart"></rr-icon>
				</div>
				<div style="font-size: 10px; margin-top: 4px;">32px</div>
			</div>
			<div style="text-align: center;">
				<div style="width: 48px; height: 48px; color: #ef4444;">
					<rr-icon name="heart"></rr-icon>
				</div>
				<div style="font-size: 10px; margin-top: 4px;">48px</div>
			</div>
			<div style="text-align: center;">
				<div style="width: 64px; height: 64px; color: #ef4444;">
					<rr-icon name="heart"></rr-icon>
				</div>
				<div style="font-size: 10px; margin-top: 4px;">64px</div>
			</div>
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
			<div style="width: 48px; height: 48px; color: #ef4444;">
				<rr-icon name="heart"></rr-icon>
			</div>
			<div style="width: 48px; height: 48px; color: #f97316;">
				<rr-icon name="heart"></rr-icon>
			</div>
			<div style="width: 48px; height: 48px; color: #eab308;">
				<rr-icon name="heart"></rr-icon>
			</div>
			<div style="width: 48px; height: 48px; color: #22c55e;">
				<rr-icon name="heart"></rr-icon>
			</div>
			<div style="width: 48px; height: 48px; color: #3b82f6;">
				<rr-icon name="heart"></rr-icon>
			</div>
			<div style="width: 48px; height: 48px; color: #8b5cf6;">
				<rr-icon name="heart"></rr-icon>
			</div>
			<div style="width: 48px; height: 48px; color: #ec4899;">
				<rr-icon name="heart"></rr-icon>
			</div>
		</div>
	`,
};
