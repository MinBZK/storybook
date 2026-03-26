import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './rr-container.ts';
import '../../content/rich-text/rr-rich-text.ts';

/**
 * Use a container to add padding to content.
 * Padding can be set for all sides, per axis (inline/block),
 * or per individual side (top, right, bottom, left).
 * More specific settings take precedence: sides > axis > all sides.
 *
 * Responsive padding is supported via viewport breakpoints (sm-, md-, lg-)
 * and container queries (layout-area-sm-, layout-area-md-, layout-area-lg-).
 * Cascade order: base → viewport breakpoints → container queries.
 *
 * ## Gebruik
 * ```html
 * <rr-container padding="16" sm-padding="24" md-padding="32">
 *   <rr-rich-text><p>Content with responsive padding.</p></rr-rich-text>
 * </rr-container>
 * ```
 */
export default {
	title: 'Components/Layout/Container',
	component: 'rr-container',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/container/rr-container.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		padding: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for all sides' },
		paddingInline: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left and right' },
		paddingBlock: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top and bottom' },
		paddingTop: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top' },
		paddingRight: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for right' },
		paddingBottom: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for bottom' },
		paddingLeft: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left' },
		smPadding: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for all sides at sm viewport' },
		smPaddingInline: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left and right at sm viewport' },
		smPaddingBlock: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top and bottom at sm viewport' },
		smPaddingTop: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top at sm viewport' },
		smPaddingRight: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for right at sm viewport' },
		smPaddingBottom: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for bottom at sm viewport' },
		smPaddingLeft: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left at sm viewport' },
		mdPadding: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for all sides at md viewport' },
		mdPaddingInline: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left and right at md viewport' },
		mdPaddingBlock: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top and bottom at md viewport' },
		mdPaddingTop: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top at md viewport' },
		mdPaddingRight: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for right at md viewport' },
		mdPaddingBottom: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for bottom at md viewport' },
		mdPaddingLeft: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left at md viewport' },
		lgPadding: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for all sides at lg viewport' },
		lgPaddingInline: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left and right at lg viewport' },
		lgPaddingBlock: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top and bottom at lg viewport' },
		lgPaddingTop: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top at lg viewport' },
		lgPaddingRight: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for right at lg viewport' },
		lgPaddingBottom: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for bottom at lg viewport' },
		lgPaddingLeft: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left at lg viewport' },
		layoutAreaSmPadding: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for all sides at sm container size' },
		layoutAreaSmPaddingInline: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left and right at sm container size' },
		layoutAreaSmPaddingBlock: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top and bottom at sm container size' },
		layoutAreaSmPaddingTop: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top at sm container size' },
		layoutAreaSmPaddingRight: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for right at sm container size' },
		layoutAreaSmPaddingBottom: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for bottom at sm container size' },
		layoutAreaSmPaddingLeft: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left at sm container size' },
		layoutAreaMdPadding: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for all sides at md container size' },
		layoutAreaMdPaddingInline: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left and right at md container size' },
		layoutAreaMdPaddingBlock: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top and bottom at md container size' },
		layoutAreaMdPaddingTop: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top at md container size' },
		layoutAreaMdPaddingRight: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for right at md container size' },
		layoutAreaMdPaddingBottom: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for bottom at md container size' },
		layoutAreaMdPaddingLeft: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left at md container size' },
		layoutAreaLgPadding: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for all sides at lg container size' },
		layoutAreaLgPaddingInline: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left and right at lg container size' },
		layoutAreaLgPaddingBlock: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top and bottom at lg container size' },
		layoutAreaLgPaddingTop: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for top at lg container size' },
		layoutAreaLgPaddingRight: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for right at lg container size' },
		layoutAreaLgPaddingBottom: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for bottom at lg container size' },
		layoutAreaLgPaddingLeft: { control: 'select', options: ['0', '2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'], description: 'Padding for left at lg container size' },
	},
};

export const Standaard = {
	args: {
		padding: '16',
	},
	render: (args) => html`
		<rr-container
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
			layout-area-sm-padding=${ifDefined(args.layoutAreaSmPadding)}
			layout-area-sm-padding-inline=${ifDefined(args.layoutAreaSmPaddingInline)}
			layout-area-sm-padding-block=${ifDefined(args.layoutAreaSmPaddingBlock)}
			layout-area-sm-padding-top=${ifDefined(args.layoutAreaSmPaddingTop)}
			layout-area-sm-padding-right=${ifDefined(args.layoutAreaSmPaddingRight)}
			layout-area-sm-padding-bottom=${ifDefined(args.layoutAreaSmPaddingBottom)}
			layout-area-sm-padding-left=${ifDefined(args.layoutAreaSmPaddingLeft)}
			layout-area-md-padding=${ifDefined(args.layoutAreaMdPadding)}
			layout-area-md-padding-inline=${ifDefined(args.layoutAreaMdPaddingInline)}
			layout-area-md-padding-block=${ifDefined(args.layoutAreaMdPaddingBlock)}
			layout-area-md-padding-top=${ifDefined(args.layoutAreaMdPaddingTop)}
			layout-area-md-padding-right=${ifDefined(args.layoutAreaMdPaddingRight)}
			layout-area-md-padding-bottom=${ifDefined(args.layoutAreaMdPaddingBottom)}
			layout-area-md-padding-left=${ifDefined(args.layoutAreaMdPaddingLeft)}
			layout-area-lg-padding=${ifDefined(args.layoutAreaLgPadding)}
			layout-area-lg-padding-inline=${ifDefined(args.layoutAreaLgPaddingInline)}
			layout-area-lg-padding-block=${ifDefined(args.layoutAreaLgPaddingBlock)}
			layout-area-lg-padding-top=${ifDefined(args.layoutAreaLgPaddingTop)}
			layout-area-lg-padding-right=${ifDefined(args.layoutAreaLgPaddingRight)}
			layout-area-lg-padding-bottom=${ifDefined(args.layoutAreaLgPaddingBottom)}
			layout-area-lg-padding-left=${ifDefined(args.layoutAreaLgPaddingLeft)}
			style="outline: 1px dashed var(--color-neutral-400);"
		>
			<rr-rich-text><p>Container content.</p></rr-rich-text>
		</rr-container>
	`,
};

export const PaddingAlleZijden = () => html`
	<rr-container padding="24" style="outline: 1px dashed var(--color-neutral-400);">
		<rr-rich-text><p>Padding aan alle zijden.</p></rr-rich-text>
	</rr-container>
`;
PaddingAlleZijden.storyName = 'Padding — alle zijden';

export const PaddingInline = () => html`
	<rr-container padding-inline="32" style="outline: 1px dashed var(--color-neutral-400);">
		<rr-rich-text><p>Padding links en rechts.</p></rr-rich-text>
	</rr-container>
`;
PaddingInline.storyName = 'Padding — inline (links/rechts)';

export const PaddingBlock = () => html`
	<rr-container padding-block="32" style="outline: 1px dashed var(--color-neutral-400);">
		<rr-rich-text><p>Padding boven en onder.</p></rr-rich-text>
	</rr-container>
`;
PaddingBlock.storyName = 'Padding — block (boven/onder)';

export const PaddingIndividueel = () => html`
	<rr-container
		padding-top="8"
		padding-right="32"
		padding-bottom="16"
		padding-left="64"
		style="outline: 1px dashed var(--color-neutral-400);"
	>
		<rr-rich-text><p>Individuele padding: top=8 right=32 bottom=16 left=64.</p></rr-rich-text>
	</rr-container>
`;
PaddingIndividueel.storyName = 'Padding — individuele zijden';

export const PaddingResponsief = () => html`
	<rr-container
		padding="8"
		sm-padding="16"
		md-padding="24"
		lg-padding="32"
		style="outline: 1px dashed var(--color-neutral-400);"
	>
		<rr-rich-text><p>Responsive viewport padding: 8 → 16 → 24 → 32.</p></rr-rich-text>
	</rr-container>
`;
PaddingResponsief.storyName = 'Padding — responsive viewport';

export const PaddingContainerQuery = () => html`
	<rr-container
		padding="8"
		layout-area-sm-padding="16"
		layout-area-md-padding="24"
		layout-area-lg-padding="32"
		style="outline: 1px dashed var(--color-neutral-400);"
	>
		<rr-rich-text><p>Responsive container padding: 8 → 16 → 24 → 32 based on layout-area container size.</p></rr-rich-text>
	</rr-container>
`;
PaddingContainerQuery.storyName = 'Padding — responsive container query';

export const GeenPadding = () => html`
	<rr-container padding="0" style="outline: 1px dashed var(--color-neutral-400);">
		<rr-rich-text><p>Geen padding.</p></rr-rich-text>
	</rr-container>
`;
GeenPadding.storyName = 'Geen padding';
