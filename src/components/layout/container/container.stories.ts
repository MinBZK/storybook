import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './container.js';
import '../../content/rich-text/rich-text.js';

/**
 * Gebruik een container om padding aan inhoud toe te voegen.
 * Padding kan worden ingesteld voor alle zijden, per as (inline/block),
 * of per individuele zijde (boven, rechts, onder, links).
 * Specifiekere instellingen hebben voorrang: zijden > as > alle zijden.
 *
 * Responsieve padding wordt ondersteund via viewport-breekpunten (sm-, md-, lg-)
 * en container queries (layout-container-sm-, layout-container-md-, layout-container-lg-).
 * Cascade-volgorde: basis → viewport-breekpunten → container queries.
 *
 * ## Gebruik
 * ```html
 * <nldd-container padding="16" sm-padding="24" md-padding="32">
 *   <nldd-rich-text><p>Inhoud met responsieve padding.</p></nldd-rich-text>
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
		padding: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor alle zijden' },
		paddingInline: { name: 'padding-inline', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor links en rechts' },
		paddingBlock: { name: 'padding-block', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor boven en onder' },
		paddingTop: { name: 'padding-top', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding boven' },
		paddingRight: { name: 'padding-right', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding rechts' },
		paddingBottom: { name: 'padding-bottom', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding onder' },
		paddingLeft: { name: 'padding-left', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding links' },
		smPadding: { name: 'sm-padding', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor alle zijden bij sm-viewport' },
		smPaddingInline: { name: 'sm-padding-inline', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor links en rechts bij sm-viewport' },
		smPaddingBlock: { name: 'sm-padding-block', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor boven en onder bij sm-viewport' },
		smPaddingTop: { name: 'sm-padding-top', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding boven bij sm-viewport' },
		smPaddingRight: { name: 'sm-padding-right', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding rechts bij sm-viewport' },
		smPaddingBottom: { name: 'sm-padding-bottom', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding onder bij sm-viewport' },
		smPaddingLeft: { name: 'sm-padding-left', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding links bij sm-viewport' },
		mdPadding: { name: 'md-padding', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor alle zijden bij md-viewport' },
		mdPaddingInline: { name: 'md-padding-inline', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor links en rechts bij md-viewport' },
		mdPaddingBlock: { name: 'md-padding-block', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor boven en onder bij md-viewport' },
		mdPaddingTop: { name: 'md-padding-top', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding boven bij md-viewport' },
		mdPaddingRight: { name: 'md-padding-right', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding rechts bij md-viewport' },
		mdPaddingBottom: { name: 'md-padding-bottom', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding onder bij md-viewport' },
		mdPaddingLeft: { name: 'md-padding-left', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding links bij md-viewport' },
		lgPadding: { name: 'lg-padding', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor alle zijden bij lg-viewport' },
		lgPaddingInline: { name: 'lg-padding-inline', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor links en rechts bij lg-viewport' },
		lgPaddingBlock: { name: 'lg-padding-block', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor boven en onder bij lg-viewport' },
		lgPaddingTop: { name: 'lg-padding-top', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding boven bij lg-viewport' },
		lgPaddingRight: { name: 'lg-padding-right', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding rechts bij lg-viewport' },
		lgPaddingBottom: { name: 'lg-padding-bottom', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding onder bij lg-viewport' },
		lgPaddingLeft: { name: 'lg-padding-left', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding links bij lg-viewport' },
		layoutAreaSmPadding: { name: 'layout-container-sm-padding', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor alle zijden bij sm container-grootte' },
		layoutAreaSmPaddingInline: { name: 'layout-container-sm-padding-inline', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor links en rechts bij sm container-grootte' },
		layoutAreaSmPaddingBlock: { name: 'layout-container-sm-padding-block', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor boven en onder bij sm container-grootte' },
		layoutAreaSmPaddingTop: { name: 'layout-container-sm-padding-top', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding boven bij sm container-grootte' },
		layoutAreaSmPaddingRight: { name: 'layout-container-sm-padding-right', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding rechts bij sm container-grootte' },
		layoutAreaSmPaddingBottom: { name: 'layout-container-sm-padding-bottom', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding onder bij sm container-grootte' },
		layoutAreaSmPaddingLeft: { name: 'layout-container-sm-padding-left', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding links bij sm container-grootte' },
		layoutAreaMdPadding: { name: 'layout-container-md-padding', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor alle zijden bij md container-grootte' },
		layoutAreaMdPaddingInline: { name: 'layout-container-md-padding-inline', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor links en rechts bij md container-grootte' },
		layoutAreaMdPaddingBlock: { name: 'layout-container-md-padding-block', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor boven en onder bij md container-grootte' },
		layoutAreaMdPaddingTop: { name: 'layout-container-md-padding-top', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding boven bij md container-grootte' },
		layoutAreaMdPaddingRight: { name: 'layout-container-md-padding-right', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding rechts bij md container-grootte' },
		layoutAreaMdPaddingBottom: { name: 'layout-container-md-padding-bottom', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding onder bij md container-grootte' },
		layoutAreaMdPaddingLeft: { name: 'layout-container-md-padding-left', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding links bij md container-grootte' },
		layoutAreaLgPadding: { name: 'layout-container-lg-padding', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor alle zijden bij lg container-grootte' },
		layoutAreaLgPaddingInline: { name: 'layout-container-lg-padding-inline', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor links en rechts bij lg container-grootte' },
		layoutAreaLgPaddingBlock: { name: 'layout-container-lg-padding-block', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding voor boven en onder bij lg container-grootte' },
		layoutAreaLgPaddingTop: { name: 'layout-container-lg-padding-top', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding boven bij lg container-grootte' },
		layoutAreaLgPaddingRight: { name: 'layout-container-lg-padding-right', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding rechts bij lg container-grootte' },
		layoutAreaLgPaddingBottom: { name: 'layout-container-lg-padding-bottom', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding onder bij lg container-grootte' },
		layoutAreaLgPaddingLeft: { name: 'layout-container-lg-padding-left', control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding links bij lg container-grootte' },
	},
};

export const Standaard = {
	args: {
		padding: '16',
	},
	render: (args: Record<string, any>) => html`
		<nldd-container
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
			layout-container-sm-padding=${ifDefined(args.layoutAreaSmPadding)}
			layout-container-sm-padding-inline=${ifDefined(args.layoutAreaSmPaddingInline)}
			layout-container-sm-padding-block=${ifDefined(args.layoutAreaSmPaddingBlock)}
			layout-container-sm-padding-top=${ifDefined(args.layoutAreaSmPaddingTop)}
			layout-container-sm-padding-right=${ifDefined(args.layoutAreaSmPaddingRight)}
			layout-container-sm-padding-bottom=${ifDefined(args.layoutAreaSmPaddingBottom)}
			layout-container-sm-padding-left=${ifDefined(args.layoutAreaSmPaddingLeft)}
			layout-container-md-padding=${ifDefined(args.layoutAreaMdPadding)}
			layout-container-md-padding-inline=${ifDefined(args.layoutAreaMdPaddingInline)}
			layout-container-md-padding-block=${ifDefined(args.layoutAreaMdPaddingBlock)}
			layout-container-md-padding-top=${ifDefined(args.layoutAreaMdPaddingTop)}
			layout-container-md-padding-right=${ifDefined(args.layoutAreaMdPaddingRight)}
			layout-container-md-padding-bottom=${ifDefined(args.layoutAreaMdPaddingBottom)}
			layout-container-md-padding-left=${ifDefined(args.layoutAreaMdPaddingLeft)}
			layout-container-lg-padding=${ifDefined(args.layoutAreaLgPadding)}
			layout-container-lg-padding-inline=${ifDefined(args.layoutAreaLgPaddingInline)}
			layout-container-lg-padding-block=${ifDefined(args.layoutAreaLgPaddingBlock)}
			layout-container-lg-padding-top=${ifDefined(args.layoutAreaLgPaddingTop)}
			layout-container-lg-padding-right=${ifDefined(args.layoutAreaLgPaddingRight)}
			layout-container-lg-padding-bottom=${ifDefined(args.layoutAreaLgPaddingBottom)}
			layout-container-lg-padding-left=${ifDefined(args.layoutAreaLgPaddingLeft)}
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

export const PaddingBlock = {
	render: () => html`
	<nldd-container padding-block="32" style="outline: 1px dashed var(--color-neutral-400);">
		<nldd-rich-text><p>Padding boven en onder.</p></nldd-rich-text>
	</nldd-container>
`,
	storyName: 'Padding — block (boven/onder)',
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
		<nldd-rich-text><p>Responsieve viewport-padding: 8 → 16 → 24 → 32.</p></nldd-rich-text>
	</nldd-container>
`,
	storyName: 'Padding — responsieve viewport',
};

export const PaddingContainerQuery = {
	render: () => html`
	<nldd-container
		padding="8"
		layout-container-sm-padding="16"
		layout-container-md-padding="24"
		layout-container-lg-padding="32"
		style="outline: 1px dashed var(--color-neutral-400);"
	>
		<nldd-rich-text><p>Responsieve container-padding: 8 → 16 → 24 → 32 op basis van de layout-container container-grootte.</p></nldd-rich-text>
	</nldd-container>
`,
	storyName: 'Padding — responsieve container query',
};

export const GeenPadding = {
	render: () => html`
	<nldd-container padding="0" style="outline: 1px dashed var(--color-neutral-400);">
		<nldd-rich-text><p>Geen padding.</p></nldd-rich-text>
	</nldd-container>
`,
	storyName: 'Geen padding',
};
