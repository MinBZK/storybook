import { html } from 'lit';
import './ndd-combo-box.ts';

/**
 * De Combo Box component is een tekstveld met autocomplete/dropdown functionaliteit.
 * Voeg een `ndd-menu` met `ndd-menu-item` elementen toe als child.
 */
export default {
	title: 'Components/Inputs/Combo Box',
	component: 'ndd-combo-box',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/combo-box/ndd-combo-box.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		value: {
			control: 'text',
			description: 'Geselecteerde waarde (voor formulierverwerking)',
			table: { defaultValue: { summary: '' } },
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder tekst',
			table: { defaultValue: { summary: '' } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
		name: {
			control: 'text',
			description: 'Naam voor formulierverwerking',
		},
	},
	args: {
		value: '',
		placeholder: 'Zoek een land',
		disabled: false,
		name: '',
	},
};

const Template = (args) => html`
	<ndd-combo-box
		placeholder=${args.placeholder}
		?disabled=${args.disabled}
		name=${args.name}
	>
		<ndd-menu empty-text="Geen resultaten">
			<ndd-menu-item text="Nederland" value="nl"></ndd-menu-item>
			<ndd-menu-item text="België" value="be"></ndd-menu-item>
			<ndd-menu-item text="Duitsland" value="de"></ndd-menu-item>
			<ndd-menu-item text="Frankrijk" value="fr"></ndd-menu-item>
			<ndd-menu-item text="Verenigd Koninkrijk" value="uk"></ndd-menu-item>
		</ndd-menu>
	</ndd-combo-box>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const MetZoektermen = () => html`
	<ndd-combo-box placeholder="Zoek een land (probeer 'dutch' of 'holland')">
		<ndd-menu empty-text="Geen resultaten">
			<ndd-menu-item text="Nederland" value="nl" search="dutch holland"></ndd-menu-item>
			<ndd-menu-item text="België" value="be" search="belgique belgie"></ndd-menu-item>
			<ndd-menu-item text="Duitsland" value="de" search="germany deutschland"></ndd-menu-item>
			<ndd-menu-item text="Frankrijk" value="fr" search="france frankrijk"></ndd-menu-item>
		</ndd-menu>
	</ndd-combo-box>
`;
MetZoektermen.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Gebruik het <code>search</code> attribuut op <code>ndd-menu-item</code> voor alternatieve zoektermen.',
		},
	},
};

export const AlleLanden = () => html`
	<ndd-combo-box placeholder="Zoek een land">
		<ndd-menu empty-text="Geen resultaten">
			<ndd-menu-item text="Afghanistan" value="af"></ndd-menu-item>
			<ndd-menu-item text="Albanië" value="al"></ndd-menu-item>
			<ndd-menu-item text="Algerije" value="dz"></ndd-menu-item>
			<ndd-menu-item text="Argentinië" value="ar"></ndd-menu-item>
			<ndd-menu-item text="Australië" value="au"></ndd-menu-item>
			<ndd-menu-item text="België" value="be"></ndd-menu-item>
			<ndd-menu-item text="Brazilië" value="br"></ndd-menu-item>
			<ndd-menu-item text="Canada" value="ca"></ndd-menu-item>
			<ndd-menu-item text="China" value="cn"></ndd-menu-item>
			<ndd-menu-item text="Denemarken" value="dk"></ndd-menu-item>
			<ndd-menu-item text="Duitsland" value="de" search="germany deutschland"></ndd-menu-item>
			<ndd-menu-item text="Egypte" value="eg"></ndd-menu-item>
			<ndd-menu-item text="Finland" value="fi"></ndd-menu-item>
			<ndd-menu-item text="Frankrijk" value="fr" search="france frankrijk"></ndd-menu-item>
			<ndd-menu-item text="Griekenland" value="gr"></ndd-menu-item>
			<ndd-menu-item text="India" value="in"></ndd-menu-item>
			<ndd-menu-item text="Indonesië" value="id"></ndd-menu-item>
			<ndd-menu-item text="Ierland" value="ie"></ndd-menu-item>
			<ndd-menu-item text="Israël" value="il"></ndd-menu-item>
			<ndd-menu-item text="Italië" value="it"></ndd-menu-item>
			<ndd-menu-item text="Japan" value="jp"></ndd-menu-item>
			<ndd-menu-item text="Jordanië" value="jo"></ndd-menu-item>
			<ndd-menu-item text="Kenia" value="ke"></ndd-menu-item>
			<ndd-menu-item text="Marokko" value="ma"></ndd-menu-item>
			<ndd-menu-item text="Mexico" value="mx"></ndd-menu-item>
			<ndd-menu-item text="Nederland" value="nl" search="dutch holland"></ndd-menu-item>
			<ndd-menu-item text="Nieuw-Zeeland" value="nz"></ndd-menu-item>
			<ndd-menu-item text="Nigeria" value="ng"></ndd-menu-item>
			<ndd-menu-item text="Noorwegen" value="no"></ndd-menu-item>
			<ndd-menu-item text="Oekraïne" value="ua"></ndd-menu-item>
			<ndd-menu-item text="Oostenrijk" value="at"></ndd-menu-item>
			<ndd-menu-item text="Pakistan" value="pk"></ndd-menu-item>
			<ndd-menu-item text="Polen" value="pl"></ndd-menu-item>
			<ndd-menu-item text="Portugal" value="pt"></ndd-menu-item>
			<ndd-menu-item text="Roemenië" value="ro"></ndd-menu-item>
			<ndd-menu-item text="Rusland" value="ru"></ndd-menu-item>
			<ndd-menu-item text="Saoedi-Arabië" value="sa"></ndd-menu-item>
			<ndd-menu-item text="Spanje" value="es" search="spain espana"></ndd-menu-item>
			<ndd-menu-item text="Suriname" value="sr"></ndd-menu-item>
			<ndd-menu-item text="Tsjechië" value="cz"></ndd-menu-item>
			<ndd-menu-item text="Turkije" value="tr"></ndd-menu-item>
			<ndd-menu-item text="Venezuela" value="ve"></ndd-menu-item>
			<ndd-menu-item text="Verenigd Koninkrijk" value="gb" search="england uk britain"></ndd-menu-item>
			<ndd-menu-item text="Verenigde Staten" value="us" search="usa america"></ndd-menu-item>
			<ndd-menu-item text="Vietnam" value="vn"></ndd-menu-item>
			<ndd-menu-item text="Zuid-Afrika" value="za"></ndd-menu-item>
			<ndd-menu-item text="Zweden" value="se"></ndd-menu-item>
			<ndd-menu-item text="Zwitserland" value="ch"></ndd-menu-item>
		</ndd-menu>
	</ndd-combo-box>
`;
AlleLanden.parameters = { controls: { disable: true } };

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<ndd-combo-box placeholder="Zoek een land">
			<ndd-menu empty-text="Geen resultaten">
				<ndd-menu-item text="Nederland" value="nl"></ndd-menu-item>
				<ndd-menu-item text="België" value="be"></ndd-menu-item>
				<ndd-menu-item text="Duitsland" value="de"></ndd-menu-item>
			</ndd-menu>
		</ndd-combo-box>
		<ndd-combo-box placeholder="Zoek een land" disabled>
			<ndd-menu empty-text="Geen resultaten">
				<ndd-menu-item text="Nederland" value="nl"></ndd-menu-item>
				<ndd-menu-item text="België" value="be"></ndd-menu-item>
			</ndd-menu>
		</ndd-combo-box>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
