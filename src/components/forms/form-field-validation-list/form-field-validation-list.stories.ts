import { html } from 'lit';
import './form-field-validation-list.js';
import '../form-field/form-field.js';
import '../form/form.js';
import '../form-actions/form-actions.js';
import '../../inputs/text-field/text-field.js';
import '../../inputs/password-field/password-field.js';
import '../../actions/button/button.js';

export default {
	title: 'Components/Forms/Validation List',
	component: 'nldd-form-field-validation-list',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/forms/form-field-validation-list/form-field-validation-list.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
		docs: {
			description: {
				component: `
Alles waar een waarde aan moet voldoen, in één lijst.

Een eis die je vooraf kunt noemen is een item met een regel, en die controleert
zichzelf terwijl je typt. Een eis die alleen een server kan vaststellen is een
item zonder regel, en de app noemt hem in \`unmet\` op de control.

Een item is zichtbaar als hij niet voldaan is, of als hij een \`hint\` is.
Verborgen is de standaard: een telefoonnummer hoeft z'n formaat niet uit te
leggen voordat iemand iets heeft getypt, de regels van een wachtwoord wel.

Er zijn geen vinkjes. De control toont zelf al een validatie-icoon, en dat per
regel herhalen zegt hetzelfde drie keer.
				`,
			},
		},
	},
	args: {
		hint: false,
	},
	argTypes: {
		hint: {
			control: 'boolean',
			description: 'Toon elk item voordat er een oordeel is, als de eisen van het veld. Per item te overschrijven.',
			table: { defaultValue: { summary: false } },
		},
		for: {
			control: 'text',
			description: 'Id van de control waar deze lijst over gaat. Niet nodig binnen een nldd-form-field.',
			table: { defaultValue: { summary: '(geen)' } },
		},
	},
};

/** Een wachtwoord met z'n eisen vooraf zichtbaar. Typ mee en zie ze verdwijnen. */
export const Default = ({ hint }: Record<string, unknown>) => html`
	<nldd-form-field label="Wachtwoord">
		<nldd-password-field name="pw" invalid></nldd-password-field>
		<nldd-form-field-validation-list ?hint=${hint !== false}>
			<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
			<nldd-form-field-validation-item id="capital" match="[A-Z]">Een hoofdletter</nldd-form-field-validation-item>
			<nldd-form-field-validation-item id="digit" match="[0-9]">Een cijfer</nldd-form-field-validation-item>
		</nldd-form-field-validation-list>
	</nldd-form-field>
`;

/** Zonder `hint` blijft de lijst leeg tot er iets misgaat. Zo hoort een gewoon veld het te doen. */
export const AlleenBijEenFout = () => html`
	<nldd-form-field label="Telefoonnummer">
		<nldd-text-field name="tel" invalid></nldd-text-field>
		<nldd-form-field-validation-list>
			<nldd-form-field-validation-item id="digits" match="^[0-9 +-]+$">Alleen cijfers, spaties, + en -</nldd-form-field-validation-item>
			<nldd-form-field-validation-item id="length" minlength="10">Minimaal 10 tekens</nldd-form-field-validation-item>
		</nldd-form-field-validation-list>
	</nldd-form-field>
`;

/** Een item zonder regel wacht op de app: die zet z'n id in `unmet` op de control. */
export const DoorDeAppAangestuurd = () => html`
	<nldd-form-field label="Gebruikersnaam">
		<nldd-text-field name="user" value="jansen" invalid unmet="taken"></nldd-text-field>
		<nldd-form-field-validation-list>
			<nldd-form-field-validation-item id="taken">Deze gebruikersnaam is al in gebruik</nldd-form-field-validation-item>
		</nldd-form-field-validation-list>
	</nldd-form-field>
`;

/** De twee soorten door elkaar: twee regels die zichzelf toetsen en één die van de server komt. */
export const RegelsEnServer = () => html`
	<nldd-form-field label="Wachtwoord">
		<nldd-password-field name="pw" value="geheim" invalid unmet="breach"></nldd-password-field>
		<nldd-form-field-validation-list hint>
			<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
			<nldd-form-field-validation-item id="capital" match="[A-Z]">Een hoofdletter</nldd-form-field-validation-item>
			<nldd-form-field-validation-item id="breach">Dit wachtwoord staat in een bekend datalek</nldd-form-field-validation-item>
		</nldd-form-field-validation-list>
	</nldd-form-field>
`;

/** Een hint blijft staan als het veld goed is, een gewoon item verdwijnt. */
export const AlsHetGoedIs = () => html`
	<nldd-form-field label="Wachtwoord">
		<nldd-password-field name="pw" value="Geheim123" valid></nldd-password-field>
		<nldd-form-field-validation-list hint>
			<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
			<nldd-form-field-validation-item id="capital" match="[A-Z]">Een hoofdletter</nldd-form-field-validation-item>
		</nldd-form-field-validation-list>
	</nldd-form-field>
`;

/** Buiten een veld, met `for` naar de control die je bedoelt. */
export const MetFor = () => html`
	<nldd-text-field id="los-veld" invalid accessible-label="Postcode"></nldd-text-field>
	<nldd-form-field-validation-list for="los-veld" hint>
		<nldd-form-field-validation-item id="format" match="^[0-9]{4} ?[A-Za-z]{2}$">Vier cijfers en twee letters</nldd-form-field-validation-item>
	</nldd-form-field-validation-list>
`;

/** In een formulier, naast een help-tekst die iets anders doet: die houdt je niet tegen. */
export const NaastHelpTekst = () => html`
	<nldd-form>
		<nldd-form-field label="E-mailadres">
			<nldd-text-field name="email" invalid></nldd-text-field>
			<nldd-form-field-validation-list>
				<nldd-form-field-validation-item id="at" match="@">Een apenstaartje</nldd-form-field-validation-item>
			</nldd-form-field-validation-list>
			<nldd-form-field-help-text>We sturen een bevestigingsmail naar dit adres.</nldd-form-field-help-text>
		</nldd-form-field>
		<nldd-form-actions>
			<nldd-button variant="primary" type="submit" text="Versturen"></nldd-button>
		</nldd-form-actions>
	</nldd-form>
`;
