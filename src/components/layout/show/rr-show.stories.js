import { html } from 'lit';
import './rr-show.ts';
import '../../content/rich-text/rr-rich-text.ts';

/**
 * Gebruik een show-component om inhoud alleen te tonen binnen een bepaald breekpuntbereik.
 * Gebruik `above`, `below` of `only` om het bereik in te stellen.
 * Gebruik `query="container"` om container queries te gebruiken in plaats van viewport queries.
 *
 * | Attribuut | Waarde | Zichtbaar op |
 * |-----------|--------|--------------|
 * | — | — | Altijd |
 * | above | sm | sm en groter |
 * | above | md | md en groter |
 * | above | lg | Alleen lg |
 * | below | sm | Alleen sm |
 * | below | md | sm en md |
 * | below | lg | sm, md en lg |
 * | only | sm | Alleen sm |
 * | only | md | Alleen md |
 * | only | lg | Alleen lg |
 *
 * ## Gebruik
 * ```html
 * <rr-show above="md">
 *   <rr-rich-text><p>Alleen zichtbaar op md en groter.</p></rr-rich-text>
 * </rr-show>
 * ```
 */
export default {
	title: 'Components/Layout/Show',
	component: 'rr-show',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/show/rr-show.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		query: {
			control: 'select',
			options: ['viewport', 'container'],
			description: 'Type query: viewport (standaard) of container',
		},
		above: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Toon vanaf dit breekpunt en groter',
		},
		below: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Toon tot en met dit breekpunt',
		},
		only: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Toon alleen op dit breekpunt',
		},
	},
};

export const Standaard = {
	args: {
		above: 'md',
		query: 'viewport',
	},
	render: (args) => html`
		<rr-show query=${args.query} above=${args.above} below=${args.below} only=${args.only}>
			<rr-rich-text><p>Verklein of vergroot het venster om het effect te zien.</p></rr-rich-text>
		</rr-show>
	`,
};

export const AboveMd = () => html`
	<rr-show above="md">
		<rr-rich-text><p>Zichtbaar op <strong>md en groter</strong>.</p></rr-rich-text>
	</rr-show>
`;
AboveMd.storyName = 'Above md';

export const BelowMd = () => html`
	<rr-show below="md">
		<rr-rich-text><p>Zichtbaar op <strong>sm en md</strong>.</p></rr-rich-text>
	</rr-show>
`;
BelowMd.storyName = 'Below md';

export const OnlySm = () => html`
	<rr-show only="sm">
		<rr-rich-text><p>Alleen zichtbaar op <strong>sm</strong>.</p></rr-rich-text>
	</rr-show>
`;
OnlySm.storyName = 'Only sm';

export const OnlyMd = () => html`
	<rr-show only="md">
		<rr-rich-text><p>Alleen zichtbaar op <strong>md</strong>.</p></rr-rich-text>
	</rr-show>
`;
OnlyMd.storyName = 'Only md';

export const OnlyLg = () => html`
	<rr-show only="lg">
		<rr-rich-text><p>Alleen zichtbaar op <strong>lg</strong>.</p></rr-rich-text>
	</rr-show>
`;
OnlyLg.storyName = 'Only lg';

export const MeerdereZones = () => html`
	<rr-show only="sm">
		<rr-rich-text><p>Alleen op <strong>sm</strong>.</p></rr-rich-text>
	</rr-show>
	<rr-show only="md">
		<rr-rich-text><p>Alleen op <strong>md</strong>.</p></rr-rich-text>
	</rr-show>
	<rr-show only="lg">
		<rr-rich-text><p>Alleen op <strong>lg</strong>.</p></rr-rich-text>
	</rr-show>
`;
MeerdereZones.storyName = 'Meerdere zones naast elkaar';

export const ContainerQuery = () => html`
	<div style="container-type: inline-size; width: 400px; resize: horizontal; overflow: auto; border: 1px dashed var(--color-neutral-400); padding: 8px;">
		<rr-show only="sm" query="container">
			<rr-rich-text><p>Alleen zichtbaar wanneer de container <strong>sm</strong> breed is.</p></rr-rich-text>
		</rr-show>
		<rr-show only="md" query="container">
			<rr-rich-text><p>Alleen zichtbaar wanneer de container <strong>md</strong> breed is.</p></rr-rich-text>
		</rr-show>
		<rr-show only="lg" query="container">
			<rr-rich-text><p>Alleen zichtbaar wanneer de container <strong>lg</strong> breed is.</p></rr-rich-text>
		</rr-show>
	</div>
	<rr-rich-text><p><em>Sleep de rechterhoek om de container te vergroten of verkleinen.</em></p></rr-rich-text>
`;
ContainerQuery.storyName = 'Container queries';
