import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './container.js';
import '../../content/rich-text/rich-text.js';
import '../../content/tag/tag.js';

const SIZES = ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'];

const sizeControl = (description: string) => ({
	control: 'select',
	options: SIZES,
	description,
});

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
		gap: sizeControl('Gap tussen kinderen'),
		smGap: { name: 'sm-gap', ...sizeControl('Gap bij sm') },
		mdGap: { name: 'md-gap', ...sizeControl('Gap bij md') },
		lgGap: { name: 'lg-gap', ...sizeControl('Gap bij lg') },
		horizontalAlignment: { name: 'horizontal-alignment', control: 'select', options: [undefined, 'left', 'center', 'right'], description: 'Horizontale uitlijning' },
		verticalAlignment: { name: 'vertical-alignment', control: 'select', options: [undefined, 'top', 'center', 'bottom'], description: 'Verticale uitlijning' },

		padding: sizeControl('Padding voor alle zijden'),
		paddingInline: { name: 'padding-inline', ...sizeControl('Padding links en rechts') },
		paddingBlock: { name: 'padding-block', ...sizeControl('Padding boven en onder') },
		paddingTop: { name: 'padding-top', ...sizeControl('Padding boven') },
		paddingRight: { name: 'padding-right', ...sizeControl('Padding rechts') },
		paddingBottom: { name: 'padding-bottom', ...sizeControl('Padding onder') },
		paddingLeft: { name: 'padding-left', ...sizeControl('Padding links') },

		smPadding: { name: 'sm-padding', ...sizeControl('Padding bij sm') },
		smPaddingInline: { name: 'sm-padding-inline', ...sizeControl('Padding inline bij sm') },
		smPaddingBlock: { name: 'sm-padding-block', ...sizeControl('Padding block bij sm') },
		smPaddingTop: { name: 'sm-padding-top', ...sizeControl('Padding top bij sm') },
		smPaddingRight: { name: 'sm-padding-right', ...sizeControl('Padding right bij sm') },
		smPaddingBottom: { name: 'sm-padding-bottom', ...sizeControl('Padding bottom bij sm') },
		smPaddingLeft: { name: 'sm-padding-left', ...sizeControl('Padding left bij sm') },

		mdPadding: { name: 'md-padding', ...sizeControl('Padding bij md') },
		mdPaddingInline: { name: 'md-padding-inline', ...sizeControl('Padding inline bij md') },
		mdPaddingBlock: { name: 'md-padding-block', ...sizeControl('Padding block bij md') },
		mdPaddingTop: { name: 'md-padding-top', ...sizeControl('Padding top bij md') },
		mdPaddingRight: { name: 'md-padding-right', ...sizeControl('Padding right bij md') },
		mdPaddingBottom: { name: 'md-padding-bottom', ...sizeControl('Padding bottom bij md') },
		mdPaddingLeft: { name: 'md-padding-left', ...sizeControl('Padding left bij md') },

		lgPadding: { name: 'lg-padding', ...sizeControl('Padding bij lg') },
		lgPaddingInline: { name: 'lg-padding-inline', ...sizeControl('Padding inline bij lg') },
		lgPaddingBlock: { name: 'lg-padding-block', ...sizeControl('Padding block bij lg') },
		lgPaddingTop: { name: 'lg-padding-top', ...sizeControl('Padding top bij lg') },
		lgPaddingRight: { name: 'lg-padding-right', ...sizeControl('Padding right bij lg') },
		lgPaddingBottom: { name: 'lg-padding-bottom', ...sizeControl('Padding bottom bij lg') },
		lgPaddingLeft: { name: 'lg-padding-left', ...sizeControl('Padding left bij lg') },
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
			sm-padding-inline=${ifDefined(args.smPaddingInline)}
			sm-padding-block=${ifDefined(args.smPaddingBlock)}
			sm-padding-top=${ifDefined(args.smPaddingTop)}
			sm-padding-right=${ifDefined(args.smPaddingRight)}
			sm-padding-bottom=${ifDefined(args.smPaddingBottom)}
			sm-padding-left=${ifDefined(args.smPaddingLeft)}
			md-padding=${ifDefined(args.mdPadding)}
			md-padding-inline=${ifDefined(args.mdPaddingInline)}
			md-padding-block=${ifDefined(args.mdPaddingBlock)}
			md-padding-top=${ifDefined(args.mdPaddingTop)}
			md-padding-right=${ifDefined(args.mdPaddingRight)}
			md-padding-bottom=${ifDefined(args.mdPaddingBottom)}
			md-padding-left=${ifDefined(args.mdPaddingLeft)}
			lg-padding=${ifDefined(args.lgPadding)}
			lg-padding-inline=${ifDefined(args.lgPaddingInline)}
			lg-padding-block=${ifDefined(args.lgPaddingBlock)}
			lg-padding-top=${ifDefined(args.lgPaddingTop)}
			lg-padding-right=${ifDefined(args.lgPaddingRight)}
			lg-padding-bottom=${ifDefined(args.lgPaddingBottom)}
			lg-padding-left=${ifDefined(args.lgPaddingLeft)}
			style="outline: 1px dashed var(--primitives-color-neutral-150);"
		>
			<nldd-rich-text><p>Inhoud van de container.</p></nldd-rich-text>
		</nldd-container>
	`,
};

export const PaddingAlleZijden = {
	render: () => html`
		<nldd-container padding="24" style="outline: 1px dashed var(--primitives-color-neutral-150);">
			<nldd-rich-text><p>Padding aan alle zijden.</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Padding — alle zijden',
};

export const PaddingInline = {
	render: () => html`
		<nldd-container padding-inline="32" style="outline: 1px dashed var(--primitives-color-neutral-150);">
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
			style="outline: 1px dashed var(--primitives-color-neutral-150);"
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
			style="outline: 1px dashed var(--primitives-color-neutral-150);"
		>
			<nldd-rich-text><p>Padding: 8 (default) → 16 (sm) → 24 (md) → 32 (lg).</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Padding — responsief',
};

export const Row = {
	render: () => html`
		<nldd-container direction="row" gap="12" padding="16" style="outline: 1px dashed var(--primitives-color-neutral-150);">
			<nldd-rich-text><p>Eerste</p></nldd-rich-text>
			<nldd-rich-text><p>Tweede</p></nldd-rich-text>
			<nldd-rich-text><p>Derde</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Direction — row',
};

export const Column = {
	render: () => html`
		<nldd-container direction="column" gap="12" padding="16" style="outline: 1px dashed var(--primitives-color-neutral-150);">
			<nldd-rich-text><p>Eerste</p></nldd-rich-text>
			<nldd-rich-text><p>Tweede</p></nldd-rich-text>
			<nldd-rich-text><p>Derde</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Direction — column',
};

export const Wrap = {
	render: () => html`
		<nldd-container direction="row" wrap gap="12" padding="16" style="outline: 1px dashed var(--primitives-color-neutral-150); max-width: 320px;">
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
			style="outline: 1px dashed var(--primitives-color-neutral-150); min-height: 200px;"
		>
			<nldd-rich-text><p>Gecentreerd</p></nldd-rich-text>
			<nldd-rich-text><p>Op beide assen</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Alignment — center op beide assen',
};

export const GeenPadding = {
	render: () => html`
		<nldd-container padding="0" style="outline: 1px dashed var(--primitives-color-neutral-150);">
			<nldd-rich-text><p>Geen padding.</p></nldd-rich-text>
		</nldd-container>
	`,
	storyName: 'Geen padding',
};
