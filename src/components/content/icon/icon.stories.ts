import { html, nothing } from 'lit';
import { ICONS, aliases } from './icon.js';
import '../../inputs/search-field/search-field.js';

const aliasSet = new Set(Object.keys(aliases));
const iconNames = ICONS.filter(name => !aliasSet.has(name));
const allIconNames = ICONS;

const SIZE_OPTIONS = ['(inherit)', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'];

const FUNCTIONAL_COLORS = ['primary-content', 'secondary-content', 'accent', 'critical', 'warning', 'success'] as const;
const RIJKSKLEUREN = [
	'lintblauw', 'donkerblauw', 'hemelblauw', 'lichtblauw',
	'paars', 'violet', 'robijnrood', 'roze',
	'rood', 'oranje', 'donkergeel', 'geel',
	'donkerbruin', 'bruin', 'donkergroen', 'groen', 'mosgroen', 'mintgroen',
] as const;

const COLOR_OPTIONS = ['(inherit)', ...FUNCTIONAL_COLORS, ...RIJKSKLEUREN];

export default {
	title: 'Components/Content/Icon',
	component: 'nldd-icon',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/icon/icon.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'stable' },
		docs: {
			description: {
				component: 'A flexible icon component. By default fills its parent and inherits color. Set `size` for a fixed spacer-aligned dimension; set `color` for a functional semantic or a rijkskleur. For one-off arbitrary colors, use `style="color: …"` on the host.',
			},
		},
	},
	argTypes: {
		name: {
			control: 'select',
			options: allIconNames,
			description: 'Naam van het icoon (inclusief aliassen).',
			table: { defaultValue: { summary: 'circle-dashed' } },
		},
		size: {
			control: 'select',
			options: SIZE_OPTIONS,
			mapping: { '(inherit)': '' },
			description: 'Vaste maat (spacer-aligned). `(inherit)` = vult parent.',
			table: { defaultValue: { summary: '(inherit)' } },
		},
		color: {
			control: 'select',
			options: COLOR_OPTIONS,
			mapping: { '(inherit)': '' },
			description: 'Functionele semantic of rijkskleur. `(inherit)` = erft `color` van parent. Voor een arbitraire kleur: gebruik `style="color: …"` op de host.',
			table: { defaultValue: { summary: '(inherit)' } },
		},
	},
	args: {
		name: 'heart',
		size: '24',
		color: '(inherit)',
	},
};

const Template = ({ name, size, color }: Record<string, string>) => html`
	<nldd-icon
		name=${name}
		size=${size || nothing}
		color=${color || nothing}
	></nldd-icon>
`;

export const Standaard = {
	render: Template,
};

export const InheritFromParent = {
	render: () => html`
		<div style="width: 64px; height: 64px; color: #d52b1e;">
			<nldd-icon name="heart"></nldd-icon>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Zonder `size` of `color` vult het icoon de parent en erft de kleur. Hier zit het in een 64×64 container met inline `color: #d52b1e`.',
			},
		},
	},
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; gap: 24px; align-items: end;">
			${SIZE_OPTIONS.filter(s => s !== '(inherit)').map(size => html`
				<div style="text-align: center;">
					<nldd-icon name="heart" size=${size}></nldd-icon>
					<div style="font: var(--primitives-font-body-sm-regular-tight); margin-top: 8px;">${size}px</div>
				</div>
			`)}
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const FunctionalColors = {
	render: () => html`
		<div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
			${FUNCTIONAL_COLORS.map(color => html`
				<div style="text-align: center;">
					<nldd-icon name="heart" size="40" color=${color}></nldd-icon>
					<div style="font: var(--primitives-font-body-sm-regular-tight); margin-top: 8px;">${color}</div>
				</div>
			`)}
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const Rijkskleuren = {
	render: () => html`
		<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 16px;">
			${RIJKSKLEUREN.map(color => html`
				<div style="text-align: center;">
					<nldd-icon name="heart" size="40" color=${color}></nldd-icon>
					<div style="font: var(--primitives-font-body-sm-regular-tight); margin-top: 8px;">${color}</div>
				</div>
			`)}
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const ArbitraryColorViaStyle = {
	render: () => html`
		<div style="display: flex; gap: 24px; align-items: center;">
			${['#ef4444', '#f97316', '#22c55e', '#3b82f6', '#8b5cf6'].map(color => html`
				<nldd-icon name="heart" size="40" style=${`color: ${color}`}></nldd-icon>
			`)}
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Voor kleuren buiten de design-system set: zet `style="color: …"` op de host. Het inherited `color` stuurt nog steeds de SVG fill/stroke aan.',
			},
		},
	},
};

export const IconGallery = {
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Alle beschikbare icoonnamen, inclusief aliassen. Gebruik het zoekveld om te filteren op naam of alias.',
			},
		},
	},
	render: () => {
		const handleSearch = (e: CustomEvent<{ value: string }>) => {
			const query = e.detail.value.toLowerCase().trim();
			const wrapper = (e.target as HTMLElement).closest('[data-gallery]');
			wrapper?.querySelectorAll<HTMLElement>('[data-search-tokens]').forEach(tile => {
				const match = !query || tile.dataset.searchTokens!.includes(query);
				tile.style.display = match ? '' : 'none';
			});
		};
		return html`
			<div data-gallery style="padding: 16px;">
				<nldd-search-field
					width="full"
					placeholder="Icoon op naam of alias zoeken"
					accessible-label="Icoon op naam of alias zoeken"
					no-spellcheck
					style="margin-bottom: 16px;"
					@input=${handleSearch}
				></nldd-search-field>
				<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px;">
					${iconNames.map(iconName => {
						const iconAliases = Object.entries(aliases)
							.filter(([, target]) => target === iconName)
							.map(([alias]) => alias);
						const searchTokens = [iconName, ...iconAliases].join(' ').toLowerCase();
						return html`
							<div data-search-tokens=${searchTokens} style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 16px 8px 8px; border: 1px solid var(--semantics-dividers-color); border-radius: 8px;">
								<nldd-icon name=${iconName} size="32"></nldd-icon>
								<div style="font: var(--primitives-font-body-xs-regular-tight); margin-top: 12px;">${iconName}</div>
								${iconAliases.length > 0 ? html`
									<div style="font: var(--primitives-font-body-xxs-regular-tight); color: var(--semantics-content-secondary-color);">
										${iconAliases.join(', ')}
									</div>
								` : ''}
							</div>
						`;
					})}
				</div>
			</div>
		`;
	},
};
