import { action } from 'storybook/actions';
import { html } from 'lit';
import './ndd-top-title-bar.ts';
import '../../actions/button/ndd-button.ts';
import '../../actions/icon-button/ndd-icon-button.ts';
import '../../layout/page/ndd-page.ts';
import '../../layout/title-bar/ndd-title-bar.ts';

/**
 * De Top Title Bar is de werkbalk van een pagina of container.
 * Hij toont een titel en optionele navigatie- en actieknoppen.
 *
 * ## Gebruik
 * ```html
 * <ndd-top-title-bar title="Paginatitel"></ndd-top-title-bar>
 * ```
 *
 * ## Compact stand
 * De component schakelt automatisch naar de compacte stand (`is-compact`) zodra
 * de bovenkant van het ankerelement de bovenkant van de scrollcontainer bereikt.
 * Stel `title-anchor` in op het id van het titelelement in de pagina-inhoud.
 *
 * ## Terugknop
 * In de standaard stand: tekstknop met `back-label`. In de compacte stand: icoonknop.
 *
 * ## Sluitknop
 * Stel `dismiss-label` in op 'Sluit', 'Annuleer' of 'Klaar'.
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
		title: {
			control: 'text',
			description: 'Titel weergegeven in de werkbalk (compact stand)',
		},
		subtitle: {
			control: 'text',
			description: 'Optionele subtitel in de werkbalk (compact stand)',
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
			description: 'Wanneer ingesteld rendert de terugknop als ankerlink',
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
			description: 'ID van het ankerelement in de pagina-inhoud',
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
	<ndd-page background="tinted" style="height: 120px;">
		<ndd-top-title-bar
			slot="header"
			title=${args.title}
			subtitle=${args.subtitle}
			back-label=${args.backLabel}
			back-href=${args.backHref}
			dismiss-label=${args.dismissLabel}
			title-anchor=${args.titleAnchor}
			@back=${action('back')}
			@dismiss=${action('dismiss')}
		></ndd-top-title-bar>
	</ndd-page>
`;

export const Standaard = Template.bind({});
Standaard.args = { title: 'Paginatitel' };

export const MetTerugknop = Template.bind({});
MetTerugknop.args = { title: 'Detailpagina', backLabel: 'Overzicht' };
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
			title="Detailpagina"
			back-label="Overzicht"
			dismiss-label="Sluit"
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
MetSluitknop.args = { title: 'Formulier', dismissLabel: 'Sluit' };

export const MetBeideKnoppen = Template.bind({});
MetBeideKnoppen.args = { title: 'Detailpagina', backLabel: 'Overzicht', dismissLabel: 'Annuleer' };

export const MetSubtitel = Template.bind({});
MetSubtitel.args = {
	title: 'Paginatitel',
	subtitle: 'Aanvullende informatie',
	backLabel: 'Overzicht',
	dismissLabel: 'Sluit',
};

export const MetWerkbalkActies = () => html`
	<ndd-page background="tinted" style="height: 120px;">
		<ndd-top-title-bar
			slot="header"
			title="Document"
			back-label="Overzicht"
			dismiss-label="Sluit"
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
			title="Paginatitel"
			back-label="Overzicht"
			dismiss-label="Sluit"
			title-anchor="page-title-bar"
			@back=${action('back')}
			@dismiss=${action('dismiss')}
		></ndd-top-title-bar>
		<div style="padding-inline: 16px;">
			<ndd-title-bar id="page-title-bar" size="2">
				<h1>Paginatitel</h1>
				<p slot="subtitle">Scroll omlaag om te zien hoe de compacte stand wordt geactiveerd.</p>
			</ndd-title-bar>
			<div style="height: 600px;"></div>
		</div>
	</ndd-page>
`;
MetTitelAnker.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Automatische compacte stand via <code>title-anchor</code>.',
		},
	},
};

export const MetTitelAnkerZonderActies = () => html`
	<ndd-page background="tinted" sticky-header style="height: 400px;">
		<ndd-top-title-bar
			slot="header"
			title="Paginatitel"
			title-anchor="page-title-bar-2"
			@back=${action('back')}
			@dismiss=${action('dismiss')}
		></ndd-top-title-bar>
		<div style="padding-inline: 16px;">
			<ndd-title-bar id="page-title-bar-2" size="2">
				<h1>Paginatitel</h1>
				<p slot="subtitle">Zonder terugknop of sluitknop.</p>
			</ndd-title-bar>
			<div style="height: 600px;"></div>
		</div>
	</ndd-page>
`;
MetTitelAnkerZonderActies.parameters = {
	controls: { disable: true },
};
