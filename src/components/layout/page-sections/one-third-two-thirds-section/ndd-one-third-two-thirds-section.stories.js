import { html } from 'lit';
import './ndd-one-third-two-thirds-section.ts';
import '../../../content/rich-text/ndd-rich-text.ts';

/**
 * Gebruik een one-third two-thirds section voor inhoud waarbij een smalle
 * zijkolom (1/3) naast een brede hoofdinhoud (2/3) staat, zoals een
 * navigatiemenu naast een formulier of een inhoudsopgave naast een artikel.
 * De kolommen wrappen automatisch wanneer de beschikbare breedte kleiner
 * wordt dan 280px per kolom.
 *
 * ## Gebruik
 * ```html
 * <ndd-one-third-two-thirds-section>
 *   <ndd-rich-text slot="header"><h2>Sectietitel</h2></ndd-rich-text>
 *   <ndd-rich-text slot="aside"><p>Zijkolom.</p></ndd-rich-text>
 *   <ndd-rich-text><p>Hoofdinhoud.</p></ndd-rich-text>
 * </ndd-one-third-two-thirds-section>
 * ```
 */
export default {
	title: 'Components/Layout/Page Sections/One Third Two Thirds Section',
	component: 'ndd-one-third-two-thirds-section',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/page-sections/one-third-two-thirds-section/ndd-one-third-two-thirds-section.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
};

export const Standaard = () => html`
	<ndd-one-third-two-thirds-section>
		<ndd-rich-text slot="header">
			<h2>Sectietitel</h2>
		</ndd-rich-text>
		<ndd-rich-text slot="left">
			<h3>Zijkolom</h3>
			<p>Gebruik de zijkolom voor navigatie, filters of aanvullende informatie.</p>
		</ndd-rich-text>
		<ndd-rich-text>
			<h3>Hoofdinhoud</h3>
			<p>Dit is de hoofdinhoud van de sectie. Deze kolom neemt twee derde van de breedte in.</p>
			<p>De kolommen wrappen automatisch wanneer de beschikbare breedte te klein wordt.</p>
		</ndd-rich-text>
		<ndd-rich-text slot="footer">
			<p>Voetnoot of aanvullende informatie.</p>
		</ndd-rich-text>
	</ndd-one-third-two-thirds-section>
`;

export const ZonderHeaderEnFooter = () => html`
	<ndd-one-third-two-thirds-section>
		<ndd-rich-text slot="left">
			<h3>Zijkolom</h3>
			<p>Aanvullende informatie.</p>
		</ndd-rich-text>
		<ndd-rich-text>
			<h3>Hoofdinhoud</h3>
			<p>De hoofdinhoud van de sectie zonder header en footer.</p>
		</ndd-rich-text>
	</ndd-one-third-two-thirds-section>
`;
ZonderHeaderEnFooter.parameters = { controls: { disable: true } };
