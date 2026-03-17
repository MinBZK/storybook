import { html } from 'lit';
import './rr-combo-box-field.ts';

/**
 * De Combo Box Field component is een tekstveld met autocomplete/dropdown functionaliteit.
 * Voeg een `rr-menu` met `rr-menu-item` elementen toe als child.
 */
export default {
	title: 'Components/Inputs/Combo Box Field',
	component: 'rr-combo-box-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/combo-box-field/rr-combo-box-field.ts',
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
	<rr-combo-box-field
		placeholder=${args.placeholder}
		?disabled=${args.disabled}
		name=${args.name}
	>
		<rr-menu empty-text="Geen resultaten">
			<rr-menu-item text="Nederland" value="nl"></rr-menu-item>
			<rr-menu-item text="België" value="be"></rr-menu-item>
			<rr-menu-item text="Duitsland" value="de"></rr-menu-item>
			<rr-menu-item text="Frankrijk" value="fr"></rr-menu-item>
			<rr-menu-item text="Verenigd Koninkrijk" value="uk"></rr-menu-item>
		</rr-menu>
	</rr-combo-box-field>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const MetZoektermen = () => html`
	<rr-combo-box-field placeholder="Zoek een land (probeer 'dutch' of 'holland')">
		<rr-menu empty-text="Geen resultaten">
			<rr-menu-item text="Nederland" value="nl" search="dutch holland"></rr-menu-item>
			<rr-menu-item text="België" value="be" search="belgique belgie"></rr-menu-item>
			<rr-menu-item text="Duitsland" value="de" search="germany deutschland"></rr-menu-item>
			<rr-menu-item text="Frankrijk" value="fr" search="france frankrijk"></rr-menu-item>
		</rr-menu>
	</rr-combo-box-field>
`;
MetZoektermen.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Gebruik het <code>search</code> attribuut op <code>rr-menu-item</code> voor alternatieve zoektermen.',
		},
	},
};

export const AlleLanden = () => html`
	<rr-combo-box-field placeholder="Zoek een land">
		<rr-menu empty-text="Geen resultaten">
			<rr-menu-item text="Afghanistan" value="af"></rr-menu-item>
			<rr-menu-item text="Albanië" value="al"></rr-menu-item>
			<rr-menu-item text="Algerije" value="dz"></rr-menu-item>
			<rr-menu-item text="Argentinië" value="ar"></rr-menu-item>
			<rr-menu-item text="Australië" value="au"></rr-menu-item>
			<rr-menu-item text="België" value="be"></rr-menu-item>
			<rr-menu-item text="Brazilië" value="br"></rr-menu-item>
			<rr-menu-item text="Canada" value="ca"></rr-menu-item>
			<rr-menu-item text="China" value="cn"></rr-menu-item>
			<rr-menu-item text="Denemarken" value="dk"></rr-menu-item>
			<rr-menu-item text="Duitsland" value="de" search="germany deutschland"></rr-menu-item>
			<rr-menu-item text="Egypte" value="eg"></rr-menu-item>
			<rr-menu-item text="Finland" value="fi"></rr-menu-item>
			<rr-menu-item text="Frankrijk" value="fr" search="france frankrijk"></rr-menu-item>
			<rr-menu-item text="Griekenland" value="gr"></rr-menu-item>
			<rr-menu-item text="India" value="in"></rr-menu-item>
			<rr-menu-item text="Indonesië" value="id"></rr-menu-item>
			<rr-menu-item text="Ierland" value="ie"></rr-menu-item>
			<rr-menu-item text="Israël" value="il"></rr-menu-item>
			<rr-menu-item text="Italië" value="it"></rr-menu-item>
			<rr-menu-item text="Japan" value="jp"></rr-menu-item>
			<rr-menu-item text="Jordanië" value="jo"></rr-menu-item>
			<rr-menu-item text="Kenia" value="ke"></rr-menu-item>
			<rr-menu-item text="Marokko" value="ma"></rr-menu-item>
			<rr-menu-item text="Mexico" value="mx"></rr-menu-item>
			<rr-menu-item text="Nederland" value="nl" search="dutch holland"></rr-menu-item>
			<rr-menu-item text="Nieuw-Zeeland" value="nz"></rr-menu-item>
			<rr-menu-item text="Nigeria" value="ng"></rr-menu-item>
			<rr-menu-item text="Noorwegen" value="no"></rr-menu-item>
			<rr-menu-item text="Oekraïne" value="ua"></rr-menu-item>
			<rr-menu-item text="Oostenrijk" value="at"></rr-menu-item>
			<rr-menu-item text="Pakistan" value="pk"></rr-menu-item>
			<rr-menu-item text="Polen" value="pl"></rr-menu-item>
			<rr-menu-item text="Portugal" value="pt"></rr-menu-item>
			<rr-menu-item text="Roemenië" value="ro"></rr-menu-item>
			<rr-menu-item text="Rusland" value="ru"></rr-menu-item>
			<rr-menu-item text="Saoedi-Arabië" value="sa"></rr-menu-item>
			<rr-menu-item text="Spanje" value="es" search="spain espana"></rr-menu-item>
			<rr-menu-item text="Suriname" value="sr"></rr-menu-item>
			<rr-menu-item text="Tsjechië" value="cz"></rr-menu-item>
			<rr-menu-item text="Turkije" value="tr"></rr-menu-item>
			<rr-menu-item text="Venezuela" value="ve"></rr-menu-item>
			<rr-menu-item text="Verenigd Koninkrijk" value="gb" search="england uk britain"></rr-menu-item>
			<rr-menu-item text="Verenigde Staten" value="us" search="usa america"></rr-menu-item>
			<rr-menu-item text="Vietnam" value="vn"></rr-menu-item>
			<rr-menu-item text="Zuid-Afrika" value="za"></rr-menu-item>
			<rr-menu-item text="Zweden" value="se"></rr-menu-item>
			<rr-menu-item text="Zwitserland" value="ch"></rr-menu-item>
		</rr-menu>
	</rr-combo-box-field>
`;
AlleLanden.parameters = { controls: { disable: true } };

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<rr-combo-box-field placeholder="Zoek een land">
			<rr-menu empty-text="Geen resultaten">
				<rr-menu-item text="Nederland" value="nl"></rr-menu-item>
				<rr-menu-item text="België" value="be"></rr-menu-item>
				<rr-menu-item text="Duitsland" value="de"></rr-menu-item>
			</rr-menu>
		</rr-combo-box-field>
		<rr-combo-box-field placeholder="Zoek een land" disabled>
			<rr-menu empty-text="Geen resultaten">
				<rr-menu-item text="Nederland" value="nl"></rr-menu-item>
				<rr-menu-item text="België" value="be"></rr-menu-item>
			</rr-menu>
		</rr-combo-box-field>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
