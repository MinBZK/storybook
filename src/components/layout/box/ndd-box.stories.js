import { html } from 'lit';
import './ndd-box.ts';
import '../../content/rich-text/ndd-rich-text.ts';

/**
 * Gebruik een box om gerelateerde componenten visueel te groeperen in een afgebakend gebied.
 * Een box trekt de aandacht naar inhoud of acties die bij elkaar horen,
 * zodat gebruikers hun samenhang in één oogopslag begrijpen.
 *
 * ## Gebruik
 * ```html
 * <ndd-box>
 *   <ndd-rich-text>
 *     <p>Inhoud van de box.</p>
 *   </ndd-rich-text>
 * </ndd-box>
 * ```
 */
export default {
	title: 'Components/Layout/Box',
	component: 'ndd-box',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/box/ndd-box.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
};

export const Standaard = () => html`
	<ndd-box>
		<ndd-rich-text>
			<h3>Wanneer gebruik je een box?</h3>
			<p>
				Een box groepeert gerelateerde componenten visueel in een afgebakend gebied.
				Gebruik een box wanneer een set van inhoud of acties bij elkaar hoort en
				duidelijk onderscheiden moet worden van de rest van de pagina.
			</p>
			<p>
				De box past zich aan aan de breedte van zijn container en heeft geen vaste hoogte.
				De achtergrondkleur, padding en afronding komen uit de CSS variabelen.
			</p>
			<h4>Richtlijnen</h4>
			<ul>
				<li>Gebruik een box voor het groeperen van formuliervelden, acties of informatieve inhoud.</li>
				<li>Plaats niet te veel verschillende soorten inhoud in één box.</li>
				<li>Gebruik geen geneste boxes.</li>
			</ul>
		</ndd-rich-text>
	</ndd-box>
`;
