import { html } from 'lit';
import './rr-top-title-bar.ts';
import '../../actions/button/rr-button.ts';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';
import '../../layout/page/rr-page.ts';
import '../../layout/title-bar/rr-title-bar.ts';

/**
 * De Top Title Bar is de werkbalk van een pagina of container.
 * Hij toont een titel en optionele navigatie- en actieknoppen.
 * De component is standaard compact: de titel staat in de werkbalk.
 *
 * ## Gebruik
 * ```html
 * <rr-top-title-bar title="Paginatitel"></rr-top-title-bar>
 * ```
 *
 * ## Titel verbergen bij scrollen
 * Stel `title-anchor` in op het id van een titelelement in de pagina-inhoud.
 * Zolang dat element zichtbaar is verdwijnt de werkbalktitel; zodra het buiten
 * beeld scrolt keert hij terug.
 *
 * ## Terugknop
 * Stel `back-label` in om de terugknop te tonen. Als de werkbalktitel zichtbaar
 * is (compact) wordt de terugknop als icoonknop getoond. Als de paginatitel
 * zichtbaar is wordt de terugknop als tekstknop met label getoond.
 *
 * ## Sluitknop
 * Stel `dismiss-label` in op 'Sluit', 'Annuleer' of 'Klaar'.
 */
export default {
	title: 'Components/Navigation/Top Title Bar',
	component: 'rr-top-title-bar',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/navigation/top-title-bar/rr-top-title-bar.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		title: {
			control: 'text',
			description: 'Titel weergegeven in de werkbalk',
		},
		subtitle: {
			control: 'text',
			description: 'Optionele subtitel in de werkbalk',
		},
		backLabel: {
			control: 'text',
			name: 'back-label',
			description: 'Label voor de terugknop; weglaten verbergt de knop',
			table: { defaultValue: { summary: '' } },
		},
		backHref: {
			control: 'text',
			name: 'back-href',
			description: 'Wanneer ingesteld, rendert de terugknop als ankerlink',
			table: { defaultValue: { summary: '' } },
		},
		dismissLabel: {
			control: 'text',
			name: 'dismiss-label',
			description: "Label voor de sluitknop: 'Sluit', 'Annuleer' of 'Klaar'",
			table: { defaultValue: { summary: '' } },
		},
		titleAnchor: {
			control: 'text',
			name: 'title-anchor',
			description: 'ID van het titelelement in de pagina-inhoud',
			table: { defaultValue: { summary: '' } },
		},
	},
	args: {
		title: 'Paginatitel',
		subtitle: '',
		backLabel: '',
		backHref: '',
		dismissLabel: '',
		titleAnchor: '',
	},
};

const Template = (args) => html`
	<rr-page tinted style="height: 120px;">
		<rr-top-title-bar
			slot="header"
			title=${args.title}
			subtitle=${args.subtitle}
			back-label=${args.backLabel}
			back-href=${args.backHref}
			dismiss-label=${args.dismissLabel}
			title-anchor=${args.titleAnchor}
			@back=${() => console.log('back')}
			@dismiss=${() => console.log('dismiss')}
		></rr-top-title-bar>
	</rr-page>
`;

export const Standaard = Template.bind({});
Standaard.args = {
	title: 'Paginatitel',
};

export const MetTerugknop = Template.bind({});
MetTerugknop.args = {
	title: 'Detailpagina',
	backLabel: 'Overzicht',
};
MetTerugknop.parameters = {
	docs: {
		description: {
			story: 'In de compacte toestand (standaard) wordt de terugknop als icoonknop weergegeven.',
		},
	},
};

export const MetSluitknop = Template.bind({});
MetSluitknop.args = {
	title: 'Formulier',
	dismissLabel: 'Sluit',
};

export const MetBeideKnoppen = Template.bind({});
MetBeideKnoppen.args = {
	title: 'Detailpagina',
	backLabel: 'Overzicht',
	dismissLabel: 'Annuleer',
};

export const MetSubtitel = Template.bind({});
MetSubtitel.args = {
	title: 'Paginatitel',
	subtitle: 'Aanvullende informatie',
	backLabel: 'Overzicht',
	dismissLabel: 'Sluit',
};

export const MetWerkbalkActies = () => html`
	<rr-page tinted style="height: 120px;">
		<rr-top-title-bar
			slot="header"
			title="Document"
			back-label="Overzicht"
			dismiss-label="Sluit"
		>
			<rr-icon-button slot="toolbar" variant="accent-transparent">
				<rr-icon name="share"></rr-icon>
				Delen
			</rr-icon-button>
			<rr-icon-button slot="toolbar" variant="accent-transparent">
				<rr-icon name="edit"></rr-icon>
				Bewerken
			</rr-icon-button>
		</rr-top-title-bar>
	</rr-page>
`;
MetWerkbalkActies.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Extra knoppen links van de sluitknop via de <code>toolbar</code>-slot.',
		},
	},
};

export const MetTitelAnker = () => html`
	<rr-page tinted sticky-header style="height: 400px;">
		<rr-top-title-bar
			slot="header"
			title="Paginatitel"
			back-label="Overzicht"
			dismiss-label="Sluit"
			title-anchor="page-title-bar"
			@back=${() => console.log('back')}
			@dismiss=${() => console.log('dismiss')}
		></rr-top-title-bar>
		<div style="padding: 16px;">
			<rr-title-bar id="page-title-bar" size="2">
				<h1>Paginatitel</h1>
				<p slot="subtitle">Scroll omlaag om te zien hoe de werkbalktitel verschijnt en de terugknop omschakelt.</p>
			</rr-title-bar>
			<div style="height: 600px;"></div>
		</div>
	</rr-page>
`;
MetTitelAnker.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Stel <code>title-anchor</code> in op het id van de paginatitel. Zolang de titel zichtbaar is verdwijnt de werkbalktitel en wordt de terugknop als tekstknop getoond. Zodra de titel buiten beeld scrolt keert de werkbalktitel terug en schakelt de terugknop over naar een icoonknop.',
		},
	},
};
