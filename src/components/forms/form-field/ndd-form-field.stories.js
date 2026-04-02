import { html } from 'lit';
import './ndd-form-field.ts';
import '../../inputs/text-field/ndd-text-field.ts';

/**
 * `ndd-form-field` is een lay-outwrapper voor formulierinvoer.
 *
 * ### Labelkoppeling
 * Omdat het native `for`-attribuut de shadow DOM niet kan oversteken, koppelt
 * `ndd-form-field` het label aan de invoer via twee mechanismen:
 * - Een `@click`-handler op het label focust de invoer programmatisch.
 * - Het `accessible-label`-attribuut wordt automatisch ingesteld op het gesloten
 *   invoerelement (`ndd-text-field`, `ndd-password-field`), dat dit doorgeeft aan
 *   het interne `<input aria-label>`. Bij een native `<input>` wordt `aria-label`
 *   direct op het element gezet.
 *
 * Geen handmatige koppeling nodig.
 *
 * ```html
 * <!-- Automatisch -->
 * <ndd-form-field label="Naam">
 *   <ndd-text-field></ndd-text-field>
 * </ndd-form-field>
 *
 * <!-- Door consument opgegeven -->
 * <ndd-form-field label="Naam">
 *   <ndd-text-field input-id="naam-invoer"></ndd-text-field>
 * </ndd-form-field>
 * ```
 *
 * ### Slots
 * - Standaard slot: het geslote invoerelement. Stel `invalid` en `error-message="id1 id2"`
 *   in op de invoer om foutmeldingen automatisch te koppelen.
 * - `ndd-form-field-help-text`: plaatsen naast de invoer — het component
 *   wijst zichzelf automatisch toe aan het help-slot.
 * - `ndd-form-field-error-text`: plaatsen naast de invoer — het component
 *   wijst zichzelf automatisch toe aan het fout-slot.
 *
 * ### Foutmeldingen
 * Voeg zoveel `ndd-form-field-error-text`-elementen toe als nodig. Het formulierveld
 * observeert de invoer en toont alleen de elementen waarnaar `error-message` verwijst.
 *
 * ```html
 * <ndd-form-field label="Wachtwoord">
 *   <ndd-form-field-help-text>
 *     Minimaal 8 tekens. <a href="/help">Meer informatie</a>.
 *   </ndd-form-field-help-text>
 *   <ndd-text-field invalid error-message="endd-verplicht endd-lengte"></ndd-text-field>
 *   <ndd-form-field-error-text id="endd-verplicht">Dit veld is verplicht.</ndd-form-field-error-text>
 *   <ndd-form-field-error-text id="endd-lengte">Minimaal 8 tekens vereist.</ndd-form-field-error-text>
 * </ndd-form-field>
 * ```
 */
export default {
	title: 'Components/Forms/Form Field',
	component: 'ndd-form-field',
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
	<ndd-form-field
		label-alignment=${labelAlignment}
		label=${label}
		supporting-label=${supportingLabel}
		?optional=${optional}
	>
		<ndd-text-field></ndd-text-field>
	</ndd-form-field>
`;

export const Default = Template.bind({});

export const WithSupportingLabel = () => html`
	<ndd-form-field label="Geboortedatum" supporting-label="DD-MM-JJJJ">
		<ndd-text-field></ndd-text-field>
	</ndd-form-field>
`;

export const WithHelpText = () => html`
	<ndd-form-field label="E-mailadres">
		<ndd-form-field-help-text>
			Wij delen uw e-mailadres nooit. <a href="/privacy">Privacybeleid</a>.
		</ndd-form-field-help-text>
		<ndd-text-field type="email"></ndd-text-field>
	</ndd-form-field>
`;

export const Optional = () => html`
	<ndd-form-field label="Telefoonnummer" optional supporting-label="Alleen gebruikt voor tweestapsverificatie.">
		<ndd-text-field type="tel"></ndd-text-field>
	</ndd-form-field>
`;

export const Invalid = () => html`
	<ndd-form-field label="E-mailadres">
		<ndd-text-field invalid error-message="endd-email"></ndd-text-field>
		<ndd-form-field-error-text id="endd-email">Voer een geldig e-mailadres in.</ndd-form-field-error-text>
	</ndd-form-field>
`;

export const MultipleErrors = () => html`
	<ndd-form-field label="Wachtwoord">
		<ndd-form-field-help-text>
			Minimaal 8 tekens. <a href="/help">Vereisten</a>.
		</ndd-form-field-help-text>
		<ndd-text-field invalid error-message="endd-verplicht endd-lengte"></ndd-text-field>
		<ndd-form-field-error-text id="endd-verplicht">Dit veld is verplicht.</ndd-form-field-error-text>
		<ndd-form-field-error-text id="endd-lengte">Minimaal 8 tekens vereist.</ndd-form-field-error-text>
	</ndd-form-field>
`;

export const LabelAlignmentRight = () => html`
	<ndd-form-field label="Volledige naam" label-alignment="right" supporting-label="Zoals vermeld in uw paspoort.">
		<ndd-text-field></ndd-text-field>
	</ndd-form-field>
`;

export const LabelAlignmentLeft = () => html`
	<ndd-form-field label="Volledige naam" label-alignment="left" supporting-label="Zoals vermeld in uw paspoort.">
		<ndd-text-field></ndd-text-field>
	</ndd-form-field>
`;

export const CompleteFormTop = () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<ndd-form-field label="Volledige naam">
			<ndd-text-field input-id="top-volledige-naam"></ndd-text-field>
		</ndd-form-field>
		<ndd-form-field label="E-mailadres" supporting-label="We sturen een bevestigingsmail.">
			<ndd-text-field type="email" input-id="top-email"></ndd-text-field>
		</ndd-form-field>
		<ndd-form-field label="Telefoonnummer" optional supporting-label="Alleen gebruikt voor tweestapsverificatie.">
			<ndd-text-field
				type="tel"
				input-id="top-telefoon"
				invalid
				error-message="endd-telefoon"
			></ndd-text-field>
			<ndd-form-field-error-text id="endd-telefoon">Voer een geldig telefoonnummer in.</ndd-form-field-error-text>
		</ndd-form-field>
		<ndd-form-field label="Opmerkingen" optional supporting-label="Eventuele aanvullende opmerkingen.">
			<ndd-text-field input-id="top-opmerkingen"></ndd-text-field>
		</ndd-form-field>
	</div>
`;

export const CompleteFormRight = () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem; container-type: inline-size;">
		<ndd-form-field label="Volledige naam" label-alignment="right" supporting-label="Zoals vermeld in uw paspoort.">
			<ndd-text-field input-id="rechts-volledige-naam"></ndd-text-field>
		</ndd-form-field>
		<ndd-form-field label="E-mailadres" label-alignment="right" supporting-label="We sturen een bevestigingsmail.">
			<ndd-text-field type="email" input-id="rechts-email"></ndd-text-field>
		</ndd-form-field>
		<ndd-form-field label="Telefoonnummer" label-alignment="right" optional>
			<ndd-text-field
				type="tel"
				input-id="rechts-telefoon"
				invalid
				error-message="endd-telefoon-rechts"
			></ndd-text-field>
			<ndd-form-field-error-text id="endd-telefoon-rechts">Voer een geldig telefoonnummer in.</ndd-form-field-error-text>
		</ndd-form-field>
		<ndd-form-field label="Opmerkingen" label-alignment="right" optional supporting-label="Eventuele aanvullende opmerkingen.">
			<ndd-text-field input-id="rechts-opmerkingen"></ndd-text-field>
		</ndd-form-field>
	</div>
`;
