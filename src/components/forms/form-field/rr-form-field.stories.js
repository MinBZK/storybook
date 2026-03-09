import { html } from 'lit';
import './rr-form-field.ts';
import '../../inputs/text-field/rr-text-field.ts';

/**
 * `rr-form-field` is een lay-outwrapper voor formulierinvoer.
 *
 * ### Labelkoppeling
 * Het formulierveld genereert automatisch een id voor de native input binnen
 * het geslote invoerelement en stelt het `for`-attribuut van het label hierop in —
 * klikken op het label focust de invoer. Geen handmatige koppeling nodig.
 *
 * Gebruik `input-id` op het geslote invoerelement voor een stabiel, voorspelbaar id.
 *
 * ```html
 * <!-- Automatisch -->
 * <rr-form-field label="Naam">
 *   <rr-text-field></rr-text-field>
 * </rr-form-field>
 *
 * <!-- Door consument opgegeven -->
 * <rr-form-field label="Naam">
 *   <rr-text-field input-id="naam-invoer"></rr-text-field>
 * </rr-form-field>
 * ```
 *
 * ### Slots
 * - Standaard slot: het geslote invoerelement. Stel `invalid` en `error-message="id1 id2"`
 *   in op de invoer om foutmeldingen automatisch te koppelen.
 * - `rr-form-field-help-text`: plaatsen naast de invoer — het component
 *   wijst zichzelf automatisch toe aan het help-slot.
 * - `rr-form-field-error-text`: plaatsen naast de invoer — het component
 *   wijst zichzelf automatisch toe aan het fout-slot.
 *
 * ### Foutmeldingen
 * Voeg zoveel `rr-form-field-error-text`-elementen toe als nodig. Het formulierveld
 * observeert de invoer en toont alleen de elementen waarnaar `error-message` verwijst.
 *
 * ```html
 * <rr-form-field label="Wachtwoord">
 *   <rr-form-field-help-text>
 *     Minimaal 8 tekens. <a href="/help">Meer informatie</a>.
 *   </rr-form-field-help-text>
 *   <rr-text-field invalid error-message="err-verplicht err-lengte"></rr-text-field>
 *   <rr-form-field-error-text id="err-verplicht">Dit veld is verplicht.</rr-form-field-error-text>
 *   <rr-form-field-error-text id="err-lengte">Minimaal 8 tekens vereist.</rr-form-field-error-text>
 * </rr-form-field>
 * ```
 */
export default {
	title: 'Components/Forms/Form Field',
	component: 'rr-form-field',
	tags: ['autodocs'],
	argTypes: {
		labelAlignment: {
			control: 'select',
			options: ['top', 'right', 'left'],
			table: { order: 1 },
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
			table: { order: 4 },
		},
	},
	args: {
		labelAlignment: 'top',
		label: 'Label',
		supportingLabel: '',
		optional: false,
	},
};

const Template = ({ labelAlignment, label, supportingLabel, optional }) => html`
	<rr-form-field
		label-alignment=${labelAlignment}
		label=${label}
		supporting-label=${supportingLabel}
		?optional=${optional}
	>
		<rr-text-field></rr-text-field>
	</rr-form-field>
`;

export const Default = Template.bind({});

export const WithSupportingLabel = () => html`
	<rr-form-field label="Geboortedatum" supporting-label="DD-MM-JJJJ">
		<rr-text-field></rr-text-field>
	</rr-form-field>
`;

export const WithHelpText = () => html`
	<rr-form-field label="E-mailadres">
		<rr-form-field-help-text>
			Wij delen uw e-mailadres nooit. <a href="/privacy">Privacybeleid</a>.
		</rr-form-field-help-text>
		<rr-text-field type="email"></rr-text-field>
	</rr-form-field>
`;

export const Optional = () => html`
	<rr-form-field label="Telefoonnummer" optional supporting-label="Alleen gebruikt voor tweestapsverificatie.">
		<rr-text-field type="tel"></rr-text-field>
	</rr-form-field>
`;

export const Invalid = () => html`
	<rr-form-field label="E-mailadres">
		<rr-text-field invalid error-message="err-email"></rr-text-field>
		<rr-form-field-error-text id="err-email">Voer een geldig e-mailadres in.</rr-form-field-error-text>
	</rr-form-field>
`;

export const MultipleErrors = () => html`
	<rr-form-field label="Wachtwoord">
		<rr-form-field-help-text>
			Minimaal 8 tekens. <a href="/help">Vereisten</a>.
		</rr-form-field-help-text>
		<rr-text-field invalid error-message="err-verplicht err-lengte"></rr-text-field>
		<rr-form-field-error-text id="err-verplicht">Dit veld is verplicht.</rr-form-field-error-text>
		<rr-form-field-error-text id="err-lengte">Minimaal 8 tekens vereist.</rr-form-field-error-text>
	</rr-form-field>
`;

export const LabelAlignmentRight = () => html`
	<rr-form-field label="Volledige naam" label-alignment="right" supporting-label="Zoals vermeld in uw paspoort.">
		<rr-text-field></rr-text-field>
	</rr-form-field>
`;

export const LabelAlignmentLeft = () => html`
	<rr-form-field label="Volledige naam" label-alignment="left" supporting-label="Zoals vermeld in uw paspoort.">
		<rr-text-field></rr-text-field>
	</rr-form-field>
`;

export const CompleteFormTop = () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<rr-form-field label="Volledige naam">
			<rr-text-field input-id="top-volledige-naam"></rr-text-field>
		</rr-form-field>
		<rr-form-field label="E-mailadres" supporting-label="We sturen een bevestigingsmail.">
			<rr-text-field type="email" input-id="top-email"></rr-text-field>
		</rr-form-field>
		<rr-form-field label="Telefoonnummer" optional supporting-label="Alleen gebruikt voor tweestapsverificatie.">
			<rr-text-field
				type="tel"
				input-id="top-telefoon"
				invalid
				error-message="err-telefoon"
			></rr-text-field>
			<rr-form-field-error-text id="err-telefoon">Voer een geldig telefoonnummer in.</rr-form-field-error-text>
		</rr-form-field>
		<rr-form-field label="Opmerkingen" optional supporting-label="Eventuele aanvullende opmerkingen.">
			<rr-text-field input-id="top-opmerkingen"></rr-text-field>
		</rr-form-field>
	</div>
`;

export const CompleteFormRight = () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem; container-type: inline-size;">
		<rr-form-field label="Volledige naam" label-alignment="right" supporting-label="Zoals vermeld in uw paspoort.">
			<rr-text-field input-id="rechts-volledige-naam"></rr-text-field>
		</rr-form-field>
		<rr-form-field label="E-mailadres" label-alignment="right" supporting-label="We sturen een bevestigingsmail.">
			<rr-text-field type="email" input-id="rechts-email"></rr-text-field>
		</rr-form-field>
		<rr-form-field label="Telefoonnummer" label-alignment="right" optional>
			<rr-text-field
				type="tel"
				input-id="rechts-telefoon"
				invalid
				error-message="err-telefoon-rechts"
			></rr-text-field>
			<rr-form-field-error-text id="err-telefoon-rechts">Voer een geldig telefoonnummer in.</rr-form-field-error-text>
		</rr-form-field>
		<rr-form-field label="Opmerkingen" label-alignment="right" optional supporting-label="Eventuele aanvullende opmerkingen.">
			<rr-text-field input-id="rechts-opmerkingen"></rr-text-field>
		</rr-form-field>
	</div>
`;
