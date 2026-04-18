import { html } from 'lit';
import './ndd-one-half-one-half-section.ts';
import '../../../content/rich-text/ndd-rich-text.ts';

/**
 * Gebruik een one-half one-half section voor twee gelijkwaardige kolommen,
 * zoals een vergelijking van twee opties, twee formulierblokken naast elkaar
 * of twee inhoudspanelen van gelijk belang.
 * De kolommen wrappen automatisch wanneer de beschikbare breedte kleiner
 * wordt dan 280px per kolom.
 *
 * ## Gebruik
 * ```html
 * <ndd-one-half-one-half-section>
 *   <ndd-rich-text slot="header"><h2>Sectietitel</h2></ndd-rich-text>
 *   <ndd-rich-text<p>Linkerkolom.</p></ndd-rich-text>
 *   <ndd-rich-text slot="right"><p>Rechterkolom.</p></ndd-rich-text>
 * </ndd-one-half-one-half-section>
 * ```
 */
export default {
	title: 'Components/Layout/Page Sections/One Half One Half Section',
	component: 'ndd-one-half-one-half-section',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/page-sections/one-half-one-half-section/ndd-one-half-one-half-section.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
};

export const Standaard = () => html`
	<ndd-one-half-one-half-section>
		<ndd-rich-text slot="header">
			<h2>Sectietitel</h2>
		</ndd-rich-text>
		<ndd-rich-text>
			<h3>Linkerkolom</h3>
			<p>Dit is de linkerkolom. Beide kolommen nemen de helft van de beschikbare breedte in.</p>
			<p>De kolommen wrappen automatisch wanneer de beschikbare breedte te klein wordt.</p>
		</ndd-rich-text>
		<ndd-rich-text slot="right">
			<h3>Rechterkolom</h3>
			<p>Dit is de rechterkolom. Gebruik beide kolommen voor gelijkwaardige inhoud.</p>
		</ndd-rich-text>
		<ndd-rich-text slot="footer">
			<p>Voetnoot of aanvullende informatie.</p>
		</ndd-rich-text>
	</ndd-one-half-one-half-section>
`;

export const ZonderHeaderEnFooter = () => html`
	<ndd-one-half-one-half-section>
		<ndd-rich-text>
			<h3>Linkerkolom</h3>
			<p>De linkerkolom zonder header en footer.</p>
		</ndd-rich-text>
		<ndd-rich-text slot="right">
			<h3>Rechterkolom</h3>
			<p>De rechterkolom zonder header en footer.</p>
		</ndd-rich-text>
	</ndd-one-half-one-half-section>
`;
ZonderHeaderEnFooter.parameters = { controls: { disable: true } };
