import { html } from 'lit';
import './form-field-validation-list.js';
import '../form-field/form-field.js';
import '../form/form.js';
import '../form-actions/form-actions.js';
import '../../inputs/text-field/text-field.js';
import '../../inputs/password-field/password-field.js';
import '../../actions/button/button.js';

export default {
	title: 'Components/Forms/Form Field Validation List',
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

/**
 * Een afgekeurd wachtwoord: wat er nog niet klopt staat eronder. Typ mee en zie
 * de regels uitgaan zodra je ze haalt.
 *
 * Zet `hint` aan en ze staan er ook voordat er een oordeel is, als de eisen van
 * het veld. Verborgen is de standaard.
 */
export const Default = ({ hint }: Record<string, unknown>) => html`
	<nldd-form-field label="Wachtwoord">
		<nldd-password-field name="pw" invalid></nldd-password-field>
		<nldd-form-field-validation-list ?hint=${hint}>
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

/**
 * `required` is de enige regel die een lege waarde niet haalt. Op een leeg veld
 * zie je dus die ene regel, en niet meteen alle andere.
 */
export const VerplichtVeld = () => html`
	<nldd-form-field label="Wachtwoord">
		<nldd-password-field name="pw" invalid></nldd-password-field>
		<nldd-form-field-validation-list>
			<nldd-form-field-validation-item id="leeg" required>Vul een wachtwoord in</nldd-form-field-validation-item>
			<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
			<nldd-form-field-validation-item id="capital" match="[A-Z]">Een hoofdletter</nldd-form-field-validation-item>
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

/**
 * Buiten een `nldd-form-field`, met `for` naar de control die je bedoelt.
 *
 * Dat is waar `for` voor is: het veld eromheen ontbreekt, dus er is niemand die
 * de lijst z'n control aanreikt. Het formulier eromheen is er wel, en die doet
 * z'n gewone werk: verstuur met een lege waarde en de regel verschijnt, typ een
 * hoofdletter en hij verdwijnt samen met de rand van het veld.
 */
export const MetFor = () => html`
	<nldd-form>
		<nldd-text-field id="los-veld" name="code" accessible-label="Code"></nldd-text-field>
		<nldd-form-field-validation-list for="los-veld">
			<nldd-form-field-validation-item id="capital" match="[A-Z]">Een hoofdletter</nldd-form-field-validation-item>
		</nldd-form-field-validation-list>
		<nldd-form-actions>
			<nldd-button variant="primary" type="submit" text="Versturen"></nldd-button>
		</nldd-form-actions>
	</nldd-form>
`;

/**
 * In een formulier, naast een help-tekst die iets anders doet: die houdt je niet
 * tegen en blijft dus staan.
 *
 * Verstuur met een leeg veld en de regel verschijnt. Typ een apenstaartje en hij
 * gaat uit, wis het weer en hij komt terug, want het formulier weigert dat
 * opnieuw.
 */
export const NaastHelpTekst = () => html`
	<nldd-form>
		<nldd-form-field label="E-mailadres">
			<nldd-text-field name="email"></nldd-text-field>
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

/**
 * Een verankerd patroon, voor een waarde die precies een vorm moet hebben. De
 * `^` en `$` doen hier het werk: zonder die twee zou `match` "bevat" betekenen.
 *
 * Verstuur het formulier met een lege of foute postcode en de regel verschijnt.
 * Typ `1234AB` en hij verdwijnt, samen met de rand van het veld.
 */
export const VerankerdPatroon = () => html`
	<nldd-form>
		<nldd-form-field label="Postcode">
			<nldd-text-field name="postcode" width="160px"></nldd-text-field>
			<nldd-form-field-validation-list>
				<nldd-form-field-validation-item id="format" match="^[0-9]{4} ?[A-Za-z]{2}$">Vier cijfers en dan twee letters, zoals 1234 AB</nldd-form-field-validation-item>
			</nldd-form-field-validation-list>
		</nldd-form-field>
		<nldd-form-actions>
			<nldd-button variant="primary" type="submit" text="Versturen"></nldd-button>
		</nldd-form-actions>
	</nldd-form>
`;
