import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './container.js';
import '../../content/rich-text/rich-text.js';
import '../../content/tag/tag.js';

const SIZES = ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'];

/**
 * Container is een eenvoudige layout-primitive: flex met richting, gap,
 * uitlijning en padding. Padding kan per zijde, per as (inline/block) of
 * voor alle zijden tegelijk. Specifiekere instellingen winnen: zijde > as > alle.
 *
 * Responsive padding en gap hebben `sm-` / `md-` / `lg-` varianten. Elke variant
 * werkt binnen een `layout-container` als container query, en valt buiten
 * een layout-container terug op een viewport media query.
 *
 * ## Gebruik
 * ```html
 * <nldd-container direction="row" gap="12" padding="16" sm-padding="8">
 *   <nldd-rich-text><p>Eerste item</p></nldd-rich-text>
 *   <nldd-rich-text><p>Tweede item</p></nldd-rich-text>
 * </nldd-container>
 * ```
 */
export default {
	title: 'Components/Layout/Container',
	component: 'nldd-container',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/container/container.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		direction: { control: 'select', options: ['column', 'row'], description: 'Flex-richting' },
		wrap: { control: 'boolean', description: 'Kinderen wrappen naar nieuwe regel' },
		gap: { control: 'select', options: SIZES, description: 'Gap tussen kinderen' },
		smGap: { name: 'sm-gap', control: 'select', options: SIZES, description: 'Gap bij sm' },
		mdGap: { name: 'md-gap', control: 'select', options: SIZES, description: 'Gap bij md' },
		lgGap: { name: 'lg-gap', control: 'select', options: SIZES, description: 'Gap bij lg' },
		horizontalAlignment: { name: 'horizontal-alignment', control: 'select', options: [undefined, 'left', 'center', 'right'], description: 'Horizontale uitlijning' },
		verticalAlignment: { name: 'vertical-alignment', control: 'select', options: [undefined, 'top', 'center', 'bottom'], description: 'Verticale uitlijning' },
		padding: { control: 'select', options: SIZES, description: 'Padding voor alle zijden' },
		paddingInline: { name: 'padding-inline', control: 'select', options: SIZES, description: 'Padding links en rechts' },
		paddingBlock: { name: 'padding-block', control: 'select', options: SIZES, description: 'Padding boven en onder' },
		paddingTop: { name: 'padding-top', control: 'select', options: SIZES, description: 'Padding boven' },
		paddingRight: { name: 'padding-right', control: 'select', options: SIZES, description: 'Padding rechts' },
		paddingBottom: { name: 'padding-bottom', control: 'select', options: SIZES, description: 'Padding onder' },
		paddingLeft: { name: 'padding-left', control: 'select', options: SIZES, description: 'Padding links' },
		smPadding: { name: 'sm-padding', control: 'select', options: SIZES, description: 'Padding bij sm' },
		mdPadding: { name: 'md-padding', control: 'select', options: SIZES, description: 'Padding bij md' },
		lgPadding: { name: 'lg-padding', control: 'select', options: SIZES, description: 'Padding bij lg' },
	},
};

export const Standaard = {
	args: {
		padding: '16',
	},
	render: (args: Record<string, any>) => html`
		<nldd-container
			direction=${ifDefined(args.direction)}
			?wrap=${args.wrap}
			gap=${ifDefined(args.gap)}
			sm-gap=${ifDefined(args.smGap)}
			md-gap=${ifDefined(args.mdGap)}
			lg-gap=${ifDefined(args.lgGap)}
			horizontal-alignment=${ifDefined(args.horizontalAlignment)}
			vertical-alignment=${ifDefined(args.verticalAlignment)}
			padding=${ifDefined(args.padding)}
			padding-inline=${ifDefined(args.paddingInline)}
			padding-block=${ifDefined(args.paddingBlock)}
			padding-top=${ifDefined(args.paddingTop)}
			padding-right=${ifDefined(args.paddingRight)}
			padding-bottom=${ifDefined(args.paddingBottom)}
			padding-left=${ifDefined(args.paddingLeft)}
			sm-padding=${ifDefined(args.smPadding)}
			md-padding=${ifDefined(args.mdPadding)}
			lg-padding=${ifDefined(args.lgPadding)}
			style="outline: 1px dashed var(--color-neutral-400);"
		>
			<nldd-rich-text><p>Inhoud van de container.</p></nldd-rich-text>
		</nldd-container>
	`,
};

export const PaddingAlleZijden = {
	render: () => html`
		<nldd-container padding="24" style="outline: 1px dashed var(--color-neutral-400);">
			<nldd-rich-text><p>Padding aan alle zijden.</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Padding — alle zijden',
};

export const PaddingInline = {
	render: () => html`
		<nldd-container padding-inline="32" style="outline: 1px dashed var(--color-neutral-400);">
			<nldd-rich-text><p>Padding links en rechts.</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Padding — inline (links/rechts)',
};

export const PaddingIndividueel = {
	render: () => html`
		<nldd-container
			padding-top="8"
			padding-right="32"
			padding-bottom="16"
			padding-left="64"
			style="outline: 1px dashed var(--color-neutral-400);"
		>
			<nldd-rich-text><p>Individuele padding: top=8 right=32 bottom=16 left=64.</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Padding — individuele zijden',
};

export const PaddingResponsief = {
	render: () => html`
		<nldd-container
			padding="8"
			sm-padding="16"
			md-padding="24"
			lg-padding="32"
			style="outline: 1px dashed var(--color-neutral-400);"
		>
			<nldd-rich-text><p>Padding: 8 (default) → 16 (sm) → 24 (md) → 32 (lg).</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Padding — responsief',
};

export const Row = {
	render: () => html`
		<nldd-container direction="row" gap="12" padding="16" style="outline: 1px dashed var(--color-neutral-400);">
			<nldd-rich-text><p>Eerste</p></nldd-rich-text>
			<nldd-rich-text><p>Tweede</p></nldd-rich-text>
			<nldd-rich-text><p>Derde</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Direction — row',
};

export const Column = {
	render: () => html`
		<nldd-container direction="column" gap="12" padding="16" style="outline: 1px dashed var(--color-neutral-400);">
			<nldd-rich-text><p>Eerste</p></nldd-rich-text>
			<nldd-rich-text><p>Tweede</p></nldd-rich-text>
			<nldd-rich-text><p>Derde</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Direction — column',
};

export const Wrap = {
	render: () => html`
		<nldd-container direction="row" wrap gap="12" padding="16" style="outline: 1px dashed var(--color-neutral-400); max-width: 320px;">
			<nldd-tag>Item één</nldd-tag>
			<nldd-tag>Item twee</nldd-tag>
			<nldd-tag>Item drie</nldd-tag>
			<nldd-tag>Item vier</nldd-tag>
			<nldd-tag>Item vijf</nldd-tag>
		</nldd-container>
	`,
	storyName: 'Wrap',
};

export const Alignment = {
	render: () => html`
		<nldd-container
			direction="row"
			gap="12"
			padding="16"
			horizontal-alignment="center"
			vertical-alignment="center"
			style="outline: 1px dashed var(--color-neutral-400); min-height: 200px;"
		>
			<nldd-rich-text><p>Gecentreerd</p></nldd-rich-text>
			<nldd-rich-text><p>Op beide assen</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Alignment — center op beide assen',
};

export const GeenPadding = {
	render: () => html`
		<nldd-container padding="0" style="outline: 1px dashed var(--color-neutral-400);">
			<nldd-rich-text><p>Geen padding.</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Geen padding',
};
