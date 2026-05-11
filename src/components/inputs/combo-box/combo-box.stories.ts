import { html } from 'lit';
import './combo-box.js';

/**
 * De Combo Box component is een tekstveld met autocomplete/dropdown functionaliteit.
 * Voeg een `nldd-menu` met `nldd-menu-item` elementen toe als child.
 */
export default {
	title: 'Components/Inputs/Combo Box',
	component: 'nldd-combo-box',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/combo-box/combo-box.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Grootte van het veld',
			table: { defaultValue: { summary: 'md' } },
		},
		width: {
			control: 'text',
			description: 'Optionele vaste breedte (any CSS length, bv. "240px"). Leeg = stretch.',
			table: { defaultValue: { summary: '' } },
		},
		name: {
			control: 'text',
			description: 'Naam voor formulierverwerking',
		},
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
		autocomplete: {
			control: 'text',
			description: 'Browser autofill hint. Default "off" om conflict met dropdown te voorkomen. Set bv. "country" of "organization" om autofill toe te staan.',
			table: { defaultValue: { summary: 'off' } },
		},
		valid: {
			control: 'boolean',
			description: 'Markeert het veld als geldig',
			table: { defaultValue: { summary: false } },
		},
		invalid: {
			control: 'boolean',
			description: 'Markeert het veld als ongeldig',
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		size: 'md',
		width: '',
		name: '',
		value: '',
		placeholder: 'Zoek een land',
		autocomplete: 'off',
		valid: false,
		invalid: false,
		disabled: false,
	},
};

const Template = (args: Record<string, any>) => html`
	<nldd-combo-box
		placeholder=${args.placeholder}
		size=${args.size}
		?valid=${args.valid}
		?invalid=${args.invalid}
		?disabled=${args.disabled}
		name=${args.name}
		autocomplete=${args.autocomplete}
		width=${args.width}
	>
		<nldd-menu empty-text="Geen resultaten">
			<nldd-menu-item text="Nederland" value="nl"></nldd-menu-item>
			<nldd-menu-item text="België" value="be"></nldd-menu-item>
			<nldd-menu-item text="Duitsland" value="de"></nldd-menu-item>
			<nldd-menu-item text="Frankrijk" value="fr"></nldd-menu-item>
			<nldd-menu-item text="Verenigd Koninkrijk" value="uk"></nldd-menu-item>
		</nldd-menu>
	</nldd-combo-box>
`;

export const Standaard = {
	render: Template,
	args: {},
};

export const VoorafIngevuld = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 16px;">
		<div>
			<p style="margin: 0 0 4px; font-size: 12px; color: var(--semantics-content-secondary-color);">
				Auto-derive — alleen <code>value="nl"</code> gezet, de combo-box leest <code>text="Nederland"</code> van het matching menu-item.
			</p>
			<nldd-combo-box value="nl" accessible-label="Land" placeholder="Kies een land">
				<nldd-menu empty-text="Geen resultaten">
					<nldd-menu-item text="Nederland" value="nl"></nldd-menu-item>
					<nldd-menu-item text="België" value="be"></nldd-menu-item>
					<nldd-menu-item text="Duitsland" value="de"></nldd-menu-item>
				</nldd-menu>
			</nldd-combo-box>
		</div>
		<div>
			<p style="margin: 0 0 4px; font-size: 12px; color: var(--semantics-content-secondary-color);">
				Expliciet — <code>value</code> én <code>text</code> beide gezet (consumer bepaalt het label, bv. een custom format zoals <code>"Nederland (NL)"</code>).
			</p>
			<nldd-combo-box value="nl" text="Nederland (NL)" accessible-label="Land" placeholder="Kies een land">
				<nldd-menu empty-text="Geen resultaten">
					<nldd-menu-item text="Nederland" value="nl"></nldd-menu-item>
					<nldd-menu-item text="België" value="be"></nldd-menu-item>
				</nldd-menu>
			</nldd-combo-box>
		</div>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: `
Voor het bewerken van een bestaand record: zet \`value\` op het opgeslagen form-id en de input wordt automatisch gevuld met het label van het matching \`<nldd-menu-item>\`.

Voor een aangepast label-format (bijv. \`"Nederland (NL)"\` in plaats van \`"Nederland"\`) zet je \`text\` expliciet — de auto-derive slaat 'm dan over.
				`.trim(),
			},
		},
	},
};

export const MetZoektermen = {
	render: () => html`
	<nldd-combo-box placeholder="Zoek een land (probeer 'dutch' of 'holland')">
		<nldd-menu empty-text="Geen resultaten">
			<nldd-menu-item text="Nederland" value="nl" aliases="dutch holland"></nldd-menu-item>
			<nldd-menu-item text="België" value="be" aliases="belgique belgie"></nldd-menu-item>
			<nldd-menu-item text="Duitsland" value="de" aliases="germany deutschland"></nldd-menu-item>
			<nldd-menu-item text="Frankrijk" value="fr" aliases="france frankrijk"></nldd-menu-item>
		</nldd-menu>
	</nldd-combo-box>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Gebruik het <code>aliases</code> attribuut op <code>nldd-menu-item</code> voor alternatieve zoektermen.',
			},
	},
},
};

export const AlleLanden = {
	render: () => html`
	<nldd-combo-box placeholder="Zoek een land">
		<nldd-menu empty-text="Geen resultaten">
			<nldd-menu-item text="Afghanistan" value="af"></nldd-menu-item>
			<nldd-menu-item text="Albanië" value="al"></nldd-menu-item>
			<nldd-menu-item text="Algerije" value="dz"></nldd-menu-item>
			<nldd-menu-item text="Argentinië" value="ar"></nldd-menu-item>
			<nldd-menu-item text="Australië" value="au"></nldd-menu-item>
			<nldd-menu-item text="België" value="be"></nldd-menu-item>
			<nldd-menu-item text="Brazilië" value="br"></nldd-menu-item>
			<nldd-menu-item text="Canada" value="ca"></nldd-menu-item>
			<nldd-menu-item text="China" value="cn"></nldd-menu-item>
			<nldd-menu-item text="Denemarken" value="dk"></nldd-menu-item>
			<nldd-menu-item text="Duitsland" value="de" aliases="germany deutschland"></nldd-menu-item>
			<nldd-menu-item text="Egypte" value="eg"></nldd-menu-item>
			<nldd-menu-item text="Finland" value="fi"></nldd-menu-item>
			<nldd-menu-item text="Frankrijk" value="fr" aliases="france frankrijk"></nldd-menu-item>
			<nldd-menu-item text="Griekenland" value="gr"></nldd-menu-item>
			<nldd-menu-item text="India" value="in"></nldd-menu-item>
			<nldd-menu-item text="Indonesië" value="id"></nldd-menu-item>
			<nldd-menu-item text="Ierland" value="ie"></nldd-menu-item>
			<nldd-menu-item text="Israël" value="il"></nldd-menu-item>
			<nldd-menu-item text="Italië" value="it"></nldd-menu-item>
			<nldd-menu-item text="Japan" value="jp"></nldd-menu-item>
			<nldd-menu-item text="Jordanië" value="jo"></nldd-menu-item>
			<nldd-menu-item text="Kenia" value="ke"></nldd-menu-item>
			<nldd-menu-item text="Marokko" value="ma"></nldd-menu-item>
			<nldd-menu-item text="Mexico" value="mx"></nldd-menu-item>
			<nldd-menu-item text="Nederland" value="nl" aliases="dutch holland"></nldd-menu-item>
			<nldd-menu-item text="Nieuw-Zeeland" value="nz"></nldd-menu-item>
			<nldd-menu-item text="Nigeria" value="ng"></nldd-menu-item>
			<nldd-menu-item text="Noorwegen" value="no"></nldd-menu-item>
			<nldd-menu-item text="Oekraïne" value="ua"></nldd-menu-item>
			<nldd-menu-item text="Oostenrijk" value="at"></nldd-menu-item>
			<nldd-menu-item text="Pakistan" value="pk"></nldd-menu-item>
			<nldd-menu-item text="Polen" value="pl"></nldd-menu-item>
			<nldd-menu-item text="Portugal" value="pt"></nldd-menu-item>
			<nldd-menu-item text="Roemenië" value="ro"></nldd-menu-item>
			<nldd-menu-item text="Rusland" value="ru"></nldd-menu-item>
			<nldd-menu-item text="Saoedi-Arabië" value="sa"></nldd-menu-item>
			<nldd-menu-item text="Spanje" value="es" aliases="spain espana"></nldd-menu-item>
			<nldd-menu-item text="Suriname" value="sr"></nldd-menu-item>
			<nldd-menu-item text="Tsjechië" value="cz"></nldd-menu-item>
			<nldd-menu-item text="Turkije" value="tr"></nldd-menu-item>
			<nldd-menu-item text="Venezuela" value="ve"></nldd-menu-item>
			<nldd-menu-item text="Verenigd Koninkrijk" value="gb" aliases="england uk britain"></nldd-menu-item>
			<nldd-menu-item text="Verenigde Staten" value="us" aliases="usa america"></nldd-menu-item>
			<nldd-menu-item text="Vietnam" value="vn"></nldd-menu-item>
			<nldd-menu-item text="Zuid-Afrika" value="za"></nldd-menu-item>
			<nldd-menu-item text="Zweden" value="se"></nldd-menu-item>
			<nldd-menu-item text="Zwitserland" value="ch"></nldd-menu-item>
		</nldd-menu>
	</nldd-combo-box>
`,
	parameters: { controls: { disable: true } },
};

export const AlleToestanden = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<nldd-combo-box placeholder="Zoek een land" size="sm">
			<nldd-menu empty-text="Geen resultaten">
				<nldd-menu-item text="Nederland" value="nl"></nldd-menu-item>
				<nldd-menu-item text="België" value="be"></nldd-menu-item>
				<nldd-menu-item text="Duitsland" value="de"></nldd-menu-item>
			</nldd-menu>
		</nldd-combo-box>
		<nldd-combo-box placeholder="Zoek een land" size="md">
			<nldd-menu empty-text="Geen resultaten">
				<nldd-menu-item text="Nederland" value="nl"></nldd-menu-item>
				<nldd-menu-item text="België" value="be"></nldd-menu-item>
				<nldd-menu-item text="Duitsland" value="de"></nldd-menu-item>
			</nldd-menu>
		</nldd-combo-box>
		<nldd-combo-box placeholder="Zoek een land" valid>
			<nldd-menu empty-text="Geen resultaten">
				<nldd-menu-item text="Nederland" value="nl"></nldd-menu-item>
				<nldd-menu-item text="België" value="be"></nldd-menu-item>
			</nldd-menu>
		</nldd-combo-box>
		<nldd-combo-box placeholder="Zoek een land" invalid>
			<nldd-menu empty-text="Geen resultaten">
				<nldd-menu-item text="Nederland" value="nl"></nldd-menu-item>
				<nldd-menu-item text="België" value="be"></nldd-menu-item>
			</nldd-menu>
		</nldd-combo-box>
		<nldd-combo-box placeholder="Zoek een land" disabled>
			<nldd-menu empty-text="Geen resultaten">
				<nldd-menu-item text="Nederland" value="nl"></nldd-menu-item>
				<nldd-menu-item text="België" value="be"></nldd-menu-item>
			</nldd-menu>
		</nldd-combo-box>
	</div>
`,
	parameters: { controls: { disable: true } },
};
