import { action } from 'storybook/actions';
import { html } from 'lit';
import './ndd-top-title-bar.ts';
import '../../actions/button/ndd-button.ts';
import '../../actions/icon-button/ndd-icon-button.ts';
import '../../layout/page/ndd-page.ts';
import '../../layout/page-sections/simple-section/ndd-simple-section.ts';
import '../../content/title/ndd-title.ts';

/**
 * De Top Title Bar is de werkbalk van een pagina of container.
 * Hij toont een titel en optionele navigatie- en actieknoppen.
 *
 * ## Gebruik
 * ```html
 * <ndd-top-title-bar text="Paginatitel"></ndd-top-title-bar>
 * ```
 *
 * ## Compact stand
 * De component schakelt automatisch naar de compacte stand (`is-compact`) zodra
 * de bovenkant van het ankerelement de bovenkant van de scrollcontainer bereikt.
 * Stel `collapse-anchor` in op het id van het titelelement in de pagina-inhoud.
 *
 * ## Terugknop
 * In de standaard stand: tekstknop met `back-text`. In de compacte stand: icoonknop.
 *
 * ## Sluitknop
 * Stel `dismiss-text` in op 'Sluit', 'Annuleer' of 'Klaar'.
 */
export default {
	title: 'Components/Navigation/Top Title Bar',
	component: 'ndd-top-title-bar',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/navigation/top-title-bar/ndd-top-title-bar.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		text: {
			control: 'text',
			description: 'Tekst weergegeven in de werkbalk (compact stand)',
		},
		supportingText: {
			control: 'text',
			name: 'supporting-text',
			description: 'Optionele ondersteunende tekst in de werkbalk (compact stand)',
		},
		backText: {
			control: 'text',
			name: 'back-text',
			description: 'Tekst voor de terugknop; weglaten verbergt de knop',
			table: { defaultValue: { summary: '' } },
		},
		backHref: {
			control: 'text',
			name: 'back-href',
			description: 'Wanneer ingesteld rendert de terugknop als ankerlink',
			table: { defaultValue: { summary: '' } },
		},
		dismissText: {
			control: 'text',
			name: 'dismiss-text',
			description: "Tekst voor de sluitknop: 'Sluit', 'Annuleer' of 'Klaar'",
			table: { defaultValue: { summary: '' } },
		},
		collapseAnchor: {
			control: 'text',
			name: 'collapse-anchor',
			description: 'ID van het ankerelement in de pagina-inhoud',
			table: { defaultValue: { summary: '' } },
		},
	},
	args: {
		text: 'Paginatitel',
		supportingText: '',
		backText: '',
		backHref: '',
		dismissText: '',
		collapseAnchor: '',
	},
};

const Template = (args) => html`
	<ndd-page background="tinted" style="height: 120px;">
		<ndd-top-title-bar
			slot="header"
			text=${args.text}
			supporting-text=${args.supportingText}
			back-text=${args.backText}
			back-href=${args.backHref}
			dismiss-text=${args.dismissText}
			collapse-anchor=${args.collapseAnchor}
			@back=${action('back')}
			@dismiss=${action('dismiss')}
		></ndd-top-title-bar>
	</ndd-page>
`;

export const Standaard = Template.bind({});
Standaard.args = { text: 'Paginatitel' };

export const MetTerugknop = Template.bind({});
MetTerugknop.args = { text: 'Detailpagina', backText: 'Overzicht' };
MetTerugknop.parameters = {
	docs: {
		description: {
			story: 'In de standaard stand wordt de terugknop als tekstknop weergegeven.',
		},
	},
};

export const Compact = () => html`
	<ndd-page background="tinted" style="height: 120px;">
		<ndd-top-title-bar
			class="is-compact"
			slot="header"
			text="Detailpagina"
			back-text="Overzicht"
			dismiss-text="Sluit"
			@back=${action('back')}
			@dismiss=${action('dismiss')}
		></ndd-top-title-bar>
	</ndd-page>
`;
Compact.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Compacte stand via de <code>is-compact</code>-klasse: icoonknop, scheider en werkbalktitel.',
		},
	},
};

export const MetSluitknop = Template.bind({});
MetSluitknop.args = { text: 'Formulier', dismissText: 'Sluit' };

export const MetBeideKnoppen = Template.bind({});
MetBeideKnoppen.args = { text: 'Detailpagina', backText: 'Overzicht', dismissText: 'Annuleer' };

export const MetSubtitel = Template.bind({});
MetSubtitel.args = {
	text: 'Paginatitel',
	supportingText: 'Aanvullende informatie',
	backText: 'Overzicht',
	dismissText: 'Sluit',
};

export const MetWerkbalkActies = () => html`
	<ndd-page background="tinted" style="height: 120px;">
		<ndd-top-title-bar
			slot="header"
			text="Document"
			back-text="Overzicht"
			dismiss-text="Sluit"
		>
			<ndd-icon-button slot="toolbar" variant="accent-transparent" icon="share" text="Delen"></ndd-icon-button>
			<ndd-icon-button slot="toolbar" variant="accent-transparent" icon="edit" text="Bewerken"></ndd-icon-button>
		</ndd-top-title-bar>
	</ndd-page>
`;
MetWerkbalkActies.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Extra knoppen via de <code>toolbar</code>-slot.',
		},
	},
};

export const MetTitelAnker = () => html`
	<ndd-page background="tinted" sticky-header style="height: 400px;">
		<ndd-top-title-bar
			slot="header"
			text="Paginatitel"
			back-text="Overzicht"
			dismiss-text="Sluit"
			collapse-anchor="page-title-bar"
			@back=${action('back')}
			@dismiss=${action('dismiss')}
		></ndd-top-title-bar>
		<ndd-simple-section>
			<ndd-title id="page-title-bar" size="2">
				<h1>Paginatitel</h1>
				<p slot="subtitle">Scroll omlaag om te zien hoe de compacte stand wordt geactiveerd.</p>
			</ndd-title>
			<div style="height: 600px;"></div>
		</ndd-simple-section>
	</ndd-page>
`;
MetTitelAnker.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Automatische compacte stand via <code>collapse-anchor</code>.',
		},
	},
};

export const MetTitelAnkerZonderActies = () => html`
	<ndd-page background="tinted" sticky-header style="height: 400px;">
		<ndd-top-title-bar
			slot="header"
			text="Paginatitel"
			collapse-anchor="page-title-bar-2"
			@back=${action('back')}
			@dismiss=${action('dismiss')}
		></ndd-top-title-bar>
		<ndd-simple-section>
			<ndd-title id="page-title-bar-2" size="2">
				<h1>Paginatitel</h1>
				<p slot="subtitle">Zonder terugknop of sluitknop.</p>
			</ndd-title>
			<div style="height: 600px;"></div>
		</ndd-simple-section>
	</ndd-page>
`;
MetTitelAnkerZonderActies.parameters = {
	controls: { disable: true },
};
