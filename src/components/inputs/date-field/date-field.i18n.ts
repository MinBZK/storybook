export const nlddDateFieldTranslations = {
	// Opent de kalender, dus infinitief zoals andere indirecte acties.
	'components.date-field.to-pick-date-action': 'Datum kiezen',
	// Terugval-naam als een consument geen accessible-label geeft en het veld niet
	// in een nldd-form-field staat: zonder dit is de invoer een naamloze control.
	'components.date-field.default-label': 'Datum',
	'components.date-field.default-range-label': 'Periode',
	// Sluit de sheet zonder te kiezen, dus gebiedende wijs zoals andere directe acties.
	'components.date-field.cancel-action': 'Annuleer',
	// Voorzetsels die de twee invoervelden van een periode introduceren, niet de
	// eindpunten zelf; het veldlabel staat ervoor ("Periode, van"). De korte vorm
	// staat zichtbaar tussen de twee datums.
	'components.date-field.range-from-lowercase': 'van',
	'components.date-field.range-to-lowercase': 'tot en met',
	'components.date-field.range-to-short-lowercase': 't/m',
};

export type NLDDDateFieldTranslations = typeof nlddDateFieldTranslations;
