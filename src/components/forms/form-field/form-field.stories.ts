import { html } from 'lit';
import './form-field.js';
import '../../inputs/text-field/text-field.js';

/**
 * `nldd-form-field` is een lay-outwrapper voor formulierinvoer.
 *
 * ### Labelkoppeling
 * Omdat het native `for`-attribuut de shadow DOM niet kan oversteken, koppelt
 * `nldd-form-field` het label aan de invoer via twee mechanismen:
 * - Een `@click`-handler op het label focust de invoer programmatisch.
 * - Het `accessible-label`-attribuut wordt automatisch ingesteld op het gesloten
 *   invoerelement (`nldd-text-field`, `nldd-password-field`), dat dit doorgeeft aan
 *   het interne `<input aria-label>`. Bij een native `<input>` wordt `aria-label`
 *   direct op het element gezet.
 *
 * Geen handmatige koppeling nodig.
 *
 * ```html
 * <!-- Automatisch -->
 * <nldd-form-field label="Naam">
 *   <nldd-text-field></nldd-text-field>
 * </nldd-form-field>
 *
 * <!-- Door consument opgegeven -->
 * <nldd-form-field label="Naam">
 *   <nldd-text-field input-id="naam-invoer"></nldd-text-field>
 * </nldd-form-field>
 * ```
 *
 * ### Slots
 * - Standaard slot: het geslote invoerelement. Stel `invalid` en `error-message="id1 id2"`
 *   in op de invoer om foutmeldingen automatisch te koppelen.
 * - `nldd-form-field-help-text`: plaatsen naast de invoer — het component
 *   wijst zichzelf automatisch toe aan het help-slot.
 * - `nldd-form-field-error-text`: plaatsen naast de invoer — het component
 *   wijst zichzelf automatisch toe aan het fout-slot.
 *
 * ### Foutmeldingen
 * Voeg zoveel `nldd-form-field-error-text`-elementen toe als nodig. Het formulierveld
 * observeert de invoer en toont alleen de elementen waarnaar `error-message` verwijst.
 *
 * ```html
 * <nldd-form-field label="Wachtwoord">
 *   <nldd-form-field-help-text>
 *     Minimaal 8 tekens. <a href="/help">Meer informatie</a>.
 *   </nldd-form-field-help-text>
 *   <nldd-text-field invalid error-message="error-verplicht error-lengte"></nldd-text-field>
 *   <nldd-form-field-error-text id="error-verplicht">Dit veld is verplicht.</nldd-form-field-error-text>
 *   <nldd-form-field-error-text id="error-lengte">Minimaal 8 tekens vereist.</nldd-form-field-error-text>
 * </nldd-form-field>
 * ```
 */
export default {
	title: 'Components/Forms/Form Field',
	component: 'nldd-form-field',
	tags: ['autodocs'],
	argTypes: {
		labelAlignment: {
			control: 'select',
			options: ['top', 'right', 'left'],
			table: { order: 1, defaultValue: { summary: 'top' } },
		},
		label: {
			control: 'text',
			table: { order: 2 },
		},
		supportingLabel: {
			control: 'text',
			table: { order: 3 },
		},
		optional: {
			control: 'boolean',
			table: { order: 4, defaultValue: { summary: 'false' } },
		},
	},
	args: {
		labelAlignment: 'top',
		label: 'Label',
		supportingLabel: '',
		optional: false,
	},
};

const Template = ({ labelAlignment, label, supportingLabel, optional }: Record<string, any>) => html`
	<nldd-form-field
		label-alignment=${labelAlignment}
		label=${label}
		supporting-label=${supportingLabel}
		?optional=${optional}
	>
		<nldd-text-field></nldd-text-field>
	</nldd-form-field>
`;

export const Default = {
	render: Template,
};

export const WithSupportingLabel = () => html`
	<nldd-form-field label="Geboortedatum" supporting-label="DD-MM-JJJJ">
		<nldd-text-field></nldd-text-field>
	</nldd-form-field>
`;

export const WithHelpText = () => html`
	<nldd-form-field label="E-mailadres">
		<nldd-form-field-help-text>
			Wij delen uw e-mailadres nooit. <a href="/privacy">Privacybeleid</a>.
		</nldd-form-field-help-text>
		<nldd-text-field type="email"></nldd-text-field>
	</nldd-form-field>
`;

export const Optional = () => html`
	<nldd-form-field label="Telefoonnummer" optional supporting-label="Alleen gebruikt voor tweestapsverificatie.">
		<nldd-text-field type="tel"></nldd-text-field>
	</nldd-form-field>
`;

export const Invalid = () => html`
	<nldd-form-field label="E-mailadres">
		<nldd-text-field invalid error-message="error-email"></nldd-text-field>
		<nldd-form-field-error-text id="error-email">Voer een geldig e-mailadres in.</nldd-form-field-error-text>
	</nldd-form-field>
`;

export const MultipleErrors = () => html`
	<nldd-form-field label="Wachtwoord">
		<nldd-form-field-help-text>
			Minimaal 8 tekens. <a href="/help">Vereisten</a>.
		</nldd-form-field-help-text>
		<nldd-text-field invalid error-message="error-verplicht error-lengte"></nldd-text-field>
		<nldd-form-field-error-text id="error-verplicht">Dit veld is verplicht.</nldd-form-field-error-text>
		<nldd-form-field-error-text id="error-lengte">Minimaal 8 tekens vereist.</nldd-form-field-error-text>
	</nldd-form-field>
`;

export const LabelAlignmentRight = () => html`
	<nldd-form-field label="Volledige naam" label-alignment="right" supporting-label="Zoals vermeld in uw paspoort.">
		<nldd-text-field></nldd-text-field>
	</nldd-form-field>
`;

export const LabelAlignmentLeft = () => html`
	<nldd-form-field label="Volledige naam" label-alignment="left" supporting-label="Zoals vermeld in uw paspoort.">
		<nldd-text-field></nldd-text-field>
	</nldd-form-field>
`;

export const CompleteFormTop = () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<nldd-form-field label="Volledige naam">
			<nldd-text-field input-id="top-volledige-naam"></nldd-text-field>
		</nldd-form-field>
		<nldd-form-field label="E-mailadres" supporting-label="We sturen een bevestigingsmail.">
			<nldd-text-field type="email" input-id="top-email"></nldd-text-field>
		</nldd-form-field>
		<nldd-form-field label="Telefoonnummer" optional supporting-label="Alleen gebruikt voor tweestapsverificatie.">
			<nldd-text-field
				type="tel"
				input-id="top-telefoon"
				invalid
				error-message="error-telefoon"
			></nldd-text-field>
			<nldd-form-field-error-text id="error-telefoon">Voer een geldig telefoonnummer in.</nldd-form-field-error-text>
		</nldd-form-field>
		<nldd-form-field label="Opmerkingen" optional supporting-label="Eventuele aanvullende opmerkingen.">
			<nldd-text-field input-id="top-opmerkingen"></nldd-text-field>
		</nldd-form-field>
	</div>
`;

export const CompleteFormRight = () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem; container-type: inline-size;">
		<nldd-form-field label="Volledige naam" label-alignment="right" supporting-label="Zoals vermeld in uw paspoort.">
			<nldd-text-field input-id="rechts-volledige-naam"></nldd-text-field>
		</nldd-form-field>
		<nldd-form-field label="E-mailadres" label-alignment="right" supporting-label="We sturen een bevestigingsmail.">
			<nldd-text-field type="email" input-id="rechts-email"></nldd-text-field>
		</nldd-form-field>
		<nldd-form-field label="Telefoonnummer" label-alignment="right" optional>
			<nldd-text-field
				type="tel"
				input-id="rechts-telefoon"
				invalid
				error-message="error-telefoon-rechts"
			></nldd-text-field>
			<nldd-form-field-error-text id="error-telefoon-rechts">Voer een geldig telefoonnummer in.</nldd-form-field-error-text>
		</nldd-form-field>
		<nldd-form-field label="Opmerkingen" label-alignment="right" optional supporting-label="Eventuele aanvullende opmerkingen.">
			<nldd-text-field input-id="rechts-opmerkingen"></nldd-text-field>
		</nldd-form-field>
	</div>
`;
