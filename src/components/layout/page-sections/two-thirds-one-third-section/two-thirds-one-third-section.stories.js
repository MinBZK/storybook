import { html } from 'lit';
import './ndd-two-thirds-one-third-section.ts';
import '../../../content/rich-text/ndd-rich-text.ts';

/**
 * Gebruik een two-thirds one-third section wanneer de hoofdinhoud de meeste
 * aandacht verdient en de zijkolom ondersteunend is, zoals een artikel met
 * een gerelateerde-inhoudpaneel of een formulier met uitleg rechts.
 * De kolommen wrappen automatisch wanneer de beschikbare breedte kleiner
 * wordt dan 280px per kolom.
 *
 * ## Gebruik
 * ```html
 * <ndd-two-thirds-one-third-section>
 *   <ndd-rich-text slot="header"><h2>Sectietitel</h2></ndd-rich-text>
 *   <ndd-rich-text><p>Hoofdinhoud.</p></ndd-rich-text>
 *   <ndd-rich-text slot="right"><p>Zijkolom.</p></ndd-rich-text>
 * </ndd-two-thirds-one-third-section>
 * ```
 */
export default {
	title: 'Components/Layout/Page Sections/Two Thirds One Third Section',
	component: 'ndd-two-thirds-one-third-section',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/page-sections/two-thirds-one-third-section/ndd-two-thirds-one-third-section.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
};

export const Standaard = () => html`
	<ndd-two-thirds-one-third-section>
		<ndd-rich-text slot="header">
			<h2>Sectietitel</h2>
		</ndd-rich-text>
		<ndd-rich-text>
			<h3>Hoofdinhoud</h3>
			<p>Dit is de hoofdinhoud van de sectie. Deze kolom neemt twee derde van de breedte in.</p>
			<p>De kolommen wrappen automatisch wanneer de beschikbare breedte te klein wordt.</p>
		</ndd-rich-text>
		<ndd-rich-text slot="right">
			<h3>Zijkolom</h3>
			<p>Gebruik de zijkolom voor gerelateerde informatie, uitleg of aanvullende acties.</p>
		</ndd-rich-text>
		<ndd-rich-text slot="footer">
			<p>Voetnoot of aanvullende informatie.</p>
		</ndd-rich-text>
	</ndd-two-thirds-one-third-section>
`;

export const ZonderHeaderEnFooter = () => html`
	<ndd-two-thirds-one-third-section>
		<ndd-rich-text>
			<h3>Hoofdinhoud</h3>
			<p>De hoofdinhoud van de sectie zonder header en footer.</p>
		</ndd-rich-text>
		<ndd-rich-text slot="right">
			<h3>Zijkolom</h3>
			<p>Aanvullende informatie.</p>
		</ndd-rich-text>
	</ndd-two-thirds-one-third-section>
`;
ZonderHeaderEnFooter.parameters = { controls: { disable: true } };
