/** Index volgt Date#getUTCDay: 0 is zondag. */
export const WEEKDAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

/** Index volgt Date#getUTCMonth: 0 is januari. */
export const MONTH_KEYS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] as const;

export const nlddDatePickerTranslations = {
	// Verplaatsen de weergave; ze kiezen geen datum.
	'components.date-picker.view-previous-month-action': 'Vorige maand',
	'components.date-picker.view-next-month-action': 'Volgende maand',
	'components.date-picker.view-today-action': 'Vandaag',
	'components.date-picker.choose-year-action': 'Kies een jaar',

	// Twee vormen, want de maandnaam staat zowel midden in een datumlabel
	// ("maandag 29 juni 2026") als los in de kop erboven. Welke vorm waar hoort is
	// per taal anders, dus dat hoort de vertaler te bepalen en niet de opmaak.
	'components.date-picker.january-lowercase': 'januari',
	'components.date-picker.january-capitalize': 'Januari',
	'components.date-picker.february-lowercase': 'februari',
	'components.date-picker.february-capitalize': 'Februari',
	'components.date-picker.march-lowercase': 'maart',
	'components.date-picker.march-capitalize': 'Maart',
	'components.date-picker.april-lowercase': 'april',
	'components.date-picker.april-capitalize': 'April',
	'components.date-picker.may-lowercase': 'mei',
	'components.date-picker.may-capitalize': 'Mei',
	'components.date-picker.june-lowercase': 'juni',
	'components.date-picker.june-capitalize': 'Juni',
	'components.date-picker.july-lowercase': 'juli',
	'components.date-picker.july-capitalize': 'Juli',
	'components.date-picker.august-lowercase': 'augustus',
	'components.date-picker.august-capitalize': 'Augustus',
	'components.date-picker.september-lowercase': 'september',
	'components.date-picker.september-capitalize': 'September',
	'components.date-picker.october-lowercase': 'oktober',
	'components.date-picker.october-capitalize': 'Oktober',
	'components.date-picker.november-lowercase': 'november',
	'components.date-picker.november-capitalize': 'November',
	'components.date-picker.december-lowercase': 'december',
	'components.date-picker.december-capitalize': 'December',

	'components.date-picker.sunday-lowercase': 'zondag',
	'components.date-picker.monday-lowercase': 'maandag',
	'components.date-picker.tuesday-lowercase': 'dinsdag',
	'components.date-picker.wednesday-lowercase': 'woensdag',
	'components.date-picker.thursday-lowercase': 'donderdag',
	'components.date-picker.friday-lowercase': 'vrijdag',
	'components.date-picker.saturday-lowercase': 'zaterdag',

	'components.date-picker.sunday-short-lowercase': 'zo',
	'components.date-picker.monday-short-lowercase': 'ma',
	'components.date-picker.tuesday-short-lowercase': 'di',
	'components.date-picker.wednesday-short-lowercase': 'wo',
	'components.date-picker.thursday-short-lowercase': 'do',
	'components.date-picker.friday-short-lowercase': 'vr',
	'components.date-picker.saturday-short-lowercase': 'za',

	// De korte vorm staat in de kolomkop, de volledige gaat als abbr mee voor
	// schermlezers.
	'components.date-picker.week-number-column-label': 'Weeknummer',
	'components.date-picker.week-number-column-short-label': 'wk',
	'components.date-picker.week-number-label': 'Week {week}',

	// De volledige toegankelijke naam van een cel; '31' alleen zegt een
	// schermlezergebruiker niets over maand of weekdag. De weekdag komt als
	// placeholder binnen, dus deze regel kan de hoofdletter niet zelf dragen.
	'components.date-picker.date-label': '{weekday} {day} {month} {year}',

	// Aanvullingen die achter een komma aan dat label worden geplakt ("... 2026,
	// vandaag, in de periode"). Ze staan nooit op zichzelf, dus altijd klein.
	'components.date-picker.today-lowercase': 'vandaag',
	'components.date-picker.unavailable-lowercase-label': 'niet beschikbaar',
	// Zolang alleen de eerste datum vaststaat is nog niet te zeggen of het het
	// begin of het einde wordt, dus zegt het label alleen dat er een keuze ligt.
	'components.date-picker.range-anchor-lowercase-label': 'gekozen, periode nog niet compleet',
	'components.date-picker.range-start-lowercase-label': 'begin van de periode',
	'components.date-picker.range-end-lowercase-label': 'einde van de periode',
	'components.date-picker.in-range-lowercase-label': 'in de periode',

	// Zinnen in de live region, zoals components.list.drag-grabbed-text. Ze
	// beginnen met een woord in plaats van met {date}, want die placeholder lost op
	// naar een kleine letter ("maandag 20 juli 2026") en dan is het geen zin.
	'components.date-picker.date-selected-text': 'Geselecteerd: {date}.',
	// Niet "begindatum": een tweede keuze vóór deze datum maakt de periode
	// terugwaarts, waardoor dit juist de einddatum wordt.
	'components.date-picker.range-anchor-text': 'Geselecteerd: {date}. Kies nu een tweede datum, eerder of later.',
	'components.date-picker.range-selected-text': 'Geselecteerd: {start} tot en met {end}.',
	'components.date-picker.range-blocked-text': 'Die periode bevat een datum die niet beschikbaar is. Kies een andere.',
};

export type NLDDDatePickerTranslations = typeof nlddDatePickerTranslations;
