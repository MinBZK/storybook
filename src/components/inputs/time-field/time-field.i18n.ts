export const nlddTimeFieldTranslations = {
	// Terugval-naam als een consument geen accessible-label geeft en het veld niet
	// in een nldd-form-field staat: zonder dit is de invoer een naamloze control.
	'components.time-field.default-label': 'Tijd',
	// Opent de picker, dus infinitief zoals andere indirecte acties.
	'components.time-field.to-pick-time-action': 'Tijd kiezen',
	// Sluit de sheet zonder te kiezen, dus gebiedende wijs zoals andere directe acties.
	'components.time-field.cancel-action': 'Annuleer',
	// Sluit de popover met de tijd die in de band staat. Bewust niet "Opslaan":
	// het veld heeft de waarde al zodra je scrolt, hier bevestig je alleen dat je
	// klaar bent. Een consument die dit in een opslaan-flow zet, kan het
	// overschrijven.
	'components.time-field.confirm-action': 'Klaar',
};

export type NLDDTimeFieldTranslations = typeof nlddTimeFieldTranslations;
