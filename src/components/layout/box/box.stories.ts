import { html } from 'lit';
import './box.js';
import '../../content/rich-text/rich-text.js';

/**
 * Gebruik een box om gerelateerde componenten visueel te groeperen in een afgebakend gebied.
 * Een box trekt de aandacht naar inhoud of acties die bij elkaar horen,
 * zodat gebruikers hun samenhang in één oogopslag begrijpen.
 *
 * ## Gebruik
 * ```html
 * <nldd-box>
 *   <nldd-rich-text>
 *     <p>Inhoud van de box.</p>
 *   </nldd-rich-text>
 * </nldd-box>
 * ```
 */
export default {
	title: 'Components/Layout/Box',
	component: 'nldd-box',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/box/box.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	args: {
		background: 'tinted',
	},
	argTypes: {
		background: {
			control: 'select',
			options: ['tinted', 'base', 'transparent'],
			description: 'Surface fill. `tinted` voor box op een plain page, `base` voor box op een al getinte parent (highlight ring krijgt +2 stappen voor extra contrast), `transparent` voor ghost outline zonder fill of ring.',
			table: { defaultValue: { summary: 'tinted' } },
		},
	},
};

export const Standaard = ({ background }: Record<string, unknown>) => html`
	<nldd-box background=${background as string}>
		<nldd-rich-text>
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
		</nldd-rich-text>
	</nldd-box>
`;

export const Backgrounds = {
	name: 'Background variants',
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 24px;">
			<nldd-box background="tinted">
				<nldd-rich-text><p>background="tinted" (default) — getint vlak op een plain pagina</p></nldd-rich-text>
			</nldd-box>
			<div style="background: var(--semantics-surfaces-tinted-background-color); padding: 24px;">
				<nldd-box background="base">
					<nldd-rich-text><p>background="base" — base-coloured box op een al getinte parent. Highlight ring is +2 stappen voor extra contrast.</p></nldd-rich-text>
				</nldd-box>
			</div>
			<nldd-box background="transparent">
				<nldd-rich-text><p>background="transparent" — ghost outline (geen fill, geen highlight ring)</p></nldd-rich-text>
			</nldd-box>
		</div>
	`,
	parameters: { controls: { disable: true } },
};
