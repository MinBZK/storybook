export const nlddTimeFieldTranslations = {
	// Terugval-naam als een consument geen accessible-label geeft en het veld niet
	// in een nldd-form-field staat: zonder dit is de invoer een naamloze control.
	'components.time-field.default-label': 'Tijd',
	// Opent de picker, dus infinitief zoals andere indirecte acties.
	'components.time-field.to-pick-time-action': 'Tijd kiezen',
	// Sluit de sheet zonder te kiezen, dus gebiedende wijs zoals andere directe acties.
	'components.time-field.cancel-action': 'Annuleer',
};

export type NLDDTimeFieldTranslations = typeof nlddTimeFieldTranslations;
