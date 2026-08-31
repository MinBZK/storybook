import { html, nothing } from 'lit';
import { ICONS, aliases } from './icon.js';
import { NEW_ICONS, UPDATED_ICONS } from './icon-gallery-status.js';
import '../../inputs/search-field/search-field.js';
import '../../inputs/segmented-control/segmented-control.js';
import '../../layout/card/card.js';
import '../../layout/collection/collection.js';
import '../../layout/container/container.js';
import '../../layout/spacer/spacer.js';
import '../tag/tag.js';

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
				component: 'A flexible icon component. By default fills its parent and inherits color. Set `size` for a fixed spacer-aligned dimension; set `color` for a functional semantic or a rijkskleur. For a color the design system cannot know, set `custom-color` to any CSS color value.',
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
			description: 'Functionele semantic of rijkskleur. `(inherit)` = erft `color` van parent.',
			table: { defaultValue: { summary: '(inherit)' } },
		},
		box: {
			control: 'boolean',
			description: 'Teken het icoon op een gevuld vlak. `color` en `custom-color` kleuren dan het vlak en het glyph krijgt de contrasterende kleur; `size` meet het vlak.',
			table: { defaultValue: { summary: false } },
		},
		customColor: {
			name: 'custom-color',
			control: 'color',
			description: 'Een eigen kleur, als CSS-kleurwaarde. Voor een kleur die het design system niet kan kennen. Wint van `color`.',
			table: { defaultValue: { summary: '(geen)' } },
		},
	},
	args: {
		name: 'heart',
		size: '24',
		box: false,
		color: '(inherit)',
		customColor: '',
	},
};

const Template = ({ name, size, box, color, customColor }: Record<string, any>) => html`
	<nldd-icon
		name=${name}
		size=${size || nothing}
		?box=${box}
		color=${color || nothing}
		custom-color=${customColor || nothing}
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

export const OwnColor = {
	render: () => html`
		<div style="display: flex; gap: 24px; align-items: center;">
			${['#ef4444', '#f97316', '#22c55e', '#3b82f6', '#8b5cf6'].map(color => html`
				<nldd-icon name="circle-filled" size="40" custom-color=${color}></nldd-icon>
			`)}
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Voor een kleur die het design system niet kan kennen: de mantel van een kabel, een kleur die iemand zelf koos. `custom-color` neemt elke CSS-kleurwaarde en wint van `color`.',
			},
		},
	},
};

export const Box = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-icon name="terminal" size="40" box color="accent"></nldd-icon>
			<nldd-icon name="shield-check-mark" size="40" box color="success"></nldd-icon>
			<nldd-icon name="cloud" size="40" box color="critical"></nldd-icon>
			<nldd-icon name="puzzle-piece" size="40" box custom-color="#a90061"></nldd-icon>
			<nldd-icon name="tulip" size="40" box custom-color="#f5c400"></nldd-icon>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Met `box` staat het icoon op een gevuld vlak. De kleurvraag draait daarmee om: `color` en `custom-color` kleuren het vlak, en het glyph krijgt de kleur die daarop leesbaar is, wit of zwart, gekozen op luminantie. Dat paar is precies wat je zelf niet wilt kiezen. `size` meet dan het vlak: het glyph is vier vijfde daarvan, de hoekradius een vijfde. De laatste twee tonen dat de flip ook werkt bij een kleur die het systeem niet kent.',
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
		const applyFilters = (wrapper: HTMLElement) => {
			const query = (wrapper.dataset.query ?? '').toLowerCase().trim();
			const status = wrapper.dataset.statusFilter ?? 'all';
			wrapper.querySelectorAll<HTMLElement>('[data-search-tokens]').forEach(tile => {
				const matchesQuery = !query || tile.dataset.searchTokens!.includes(query);
				const matchesStatus = status === 'all' || tile.dataset.status === status;
				tile.style.display = matchesQuery && matchesStatus ? '' : 'none';
			});
		};
		const handleSearch = (e: CustomEvent<{ value: string }>) => {
			// The native input event bubbles out of the shadow root too (composed,
			// detail = 0); only the component's own CustomEvent carries detail.value.
			if (typeof e.detail?.value !== 'string') return;
			const wrapper = (e.target as HTMLElement).closest<HTMLElement>('[data-gallery]')!;
			wrapper.dataset.query = e.detail.value;
			applyFilters(wrapper);
		};
		const handleStatusFilter = (e: CustomEvent<{ value: string }>) => {
			const wrapper = (e.target as HTMLElement).closest<HTMLElement>('[data-gallery]')!;
			wrapper.dataset.statusFilter = e.detail.value;
			applyFilters(wrapper);
		};
		return html`
			<nldd-container data-gallery gap="16" padding="16">
				<nldd-container layout="row" gap="12" vertical-alignment="center">
					<nldd-search-field
						width="full"
						placeholder="Icoon op naam of alias zoeken"
						accessible-label="Icoon op naam of alias zoeken"
						no-spellcheck
						style="flex: 1;"
						@input=${handleSearch}
					></nldd-search-field>
					<nldd-segmented-control
						value="all"
						width="fit-content"
						accessible-label="Filter op status"
						@change=${handleStatusFilter}
					>
						<nldd-segmented-control-item value="all" text="Alles"></nldd-segmented-control-item>
						<nldd-segmented-control-item value="new" text="Nieuw"></nldd-segmented-control-item>
						<nldd-segmented-control-item value="updated" text="Bijgewerkt"></nldd-segmented-control-item>
					</nldd-segmented-control>
				</nldd-container>
				<nldd-collection item-width="180px" max-items="999" gap="16px">
					${iconNames.map(iconName => {
						const iconAliases = Object.entries(aliases)
							.filter(([, target]) => target === iconName)
							.map(([alias]) => alias);
						const searchTokens = [iconName, ...iconAliases].join(' ').toLowerCase();
						const status = NEW_ICONS.has(iconName) ? 'new' : UPDATED_ICONS.has(iconName) ? 'updated' : undefined;
						const statusTag = status === 'new'
							? html`<nldd-tag size="sm" color="accent" text="Nieuw" style="position: absolute; top: 8px; right: 8px;"></nldd-tag>`
							: status === 'updated'
								? html`<nldd-tag size="sm" text="Bijgewerkt" style="position: absolute; top: 8px; right: 8px;"></nldd-tag>`
								: '';
						return html`
							<nldd-card data-search-tokens=${searchTokens} data-status=${status ?? nothing} style="position: relative;">
								${statusTag}
								<nldd-container padding="16" horizontal-alignment="center" style="text-align: center;">
									<nldd-icon name=${iconName} size="32"></nldd-icon>
									<nldd-spacer size="12" direction="vertical"></nldd-spacer>
									<div style="font: var(--primitives-font-body-xs-regular-tight);">${iconName}</div>
									${iconAliases.length > 0 ? html`
										<div style="font: var(--primitives-font-body-xxs-regular-tight); color: var(--semantics-content-secondary-color);">
											${iconAliases.join(', ')}
										</div>
									` : ''}
								</nldd-container>
							</nldd-card>
						`;
					})}
				</nldd-collection>
			</nldd-container>
		`;
	},
};
