import { action } from 'storybook/actions';
import { html, nothing } from 'lit';
import './date-picker.js';

/**
 * `nldd-date-picker` is de kalender waarin een datum of een periode wordt
 * gekozen. Het component staat op zichzelf: gebruik het inline op een pagina of
 * in een filterpaneel, of laat `nldd-date-field` het in een popover tonen.
 *
 * ### Waarden
 * Alles is ISO (`jjjj-mm-dd`). Zonder `range` staat de keuze in `value`; met
 * `range` in `start` en `end`.
 *
 * ```html
 * <nldd-date-picker value="2026-07-15"></nldd-date-picker>
 * <nldd-date-picker range start="2026-07-01" end="2026-07-14"></nldd-date-picker>
 * ```
 *
 * ### Periode kiezen
 * Een periode kiest de gebruiker in twee stappen. Na de eerste datum meldt de
 * kalender dat er nog een einddatum volgt. Een tweede datum vóór de eerste maakt
 * de periode gewoon achterstevoren af; de kalender tekent die band tijdens het
 * aanwijzen al zo, dus opnieuw beginnen zou het enige zijn dat afwijkt van wat je
 * ziet. Opnieuw beginnen kan nog steeds: de eerste klik ná een afgeronde periode
 * start een nieuwe.
 *
 * Slepen kan ook, en werkt hetzelfde. Alleen met muis of pen: op touch is een
 * horizontale veeg over een kalender niet te onderscheiden van scrollen, en dan
 * zou je vast komen te zitten in een sheet die niet meer beweegt. Twee keer
 * tikken werkt overal.
 *
 * ### Breedte
 * Standaard is de kalender zo breed als zijn rooster. Geef de host een breedte en
 * alles rekt mee: de kolommen verdelen de ruimte gelijk en elke dag blijft
 * gecentreerd onder zijn kolomkop.
 *
 * ### Grenzen
 * `min` en `max` nemen een ISO-datum, of `today` met een optionele verschuiving
 * (`d`, `w`, `m`, `y`). Een absolute grens veroudert: `max="2026-07-19"` laat een
 * dag later de toekomst toe.
 *
 * ```html
 * <nldd-date-picker max="today"></nldd-date-picker>
 * <nldd-date-picker max="today-18y"></nldd-date-picker>
 * <nldd-date-picker min="today" max="today+1y"></nldd-date-picker>
 * ```
 *
 * Bij het rekenen wordt naar het maandeinde geklemd: 31 maart min een maand is
 * 28 februari, niet 3 maart.
 *
 * ### Losse datums blokkeren
 * `isDateUnavailable` is een property (geen attribuut) waarmee losse datums
 * onkiesbaar worden, bijvoorbeeld weekenden of feestdagen. Zulke dagen blijven
 * met het toetsenbord bereikbaar; anders slaat een pijltjestoets een geblokkeerde
 * reeks stilzwijgend over en lijkt de kalender kapot.
 *
 * ### Dagen buiten de maand
 * De dagen van de vorige en volgende maand staan er gedempt bij en zijn gewoon
 * te kiezen; de kalender springt dan naar die maand. Elk cellabel noemt de
 * volledige datum, dus een 1e van de volgende maand is niet te verwarren met die
 * van deze. Er staan altijd zes weken, zodat de kalender niet verspringt bij het
 * bladeren.
 *
 * ### Weeknummers
 * `week-numbers` zet een kolom met ISO-weeknummers links. Die nummers worden van
 * de donderdag in de rij afgeleid, zoals de ISO-norm voorschrijft, dus ze
 * kloppen ook wanneer de week op zondag begint.
 *
 * ### Navigeren
 * De maandtitel staat links, de paginering rechts. Daartussen zit "Vandaag", dat
 * terugspringt naar de huidige maand zonder iets te kiezen: wie heeft rondgekeken
 * wil een weg terug, geen datum die hij niet heeft aangewezen.
 *
 * Die knop verdwijnt vanzelf zodra vandaag buiten `min` en `max` valt. Daar zou
 * hij namelijk liegen: bij `max="today-18y"` zou "Vandaag" je achttien jaar terug
 * zetten. Een aparte schakelaar is er daarom niet.
 *
 * De titel is zelf de knop naar een jaarmenu. Dat is bewust de hele titel en niet
 * alleen het jaartal: een klikbaar "2026" naast een dood "juli" nodigt uit tot
 * klikken waar niets gebeurt. Het menu opent op het jaar dat in beeld staat en
 * wordt begrensd door `min` en `max`. Per jaar bladeren met pijlknoppen is er
 * niet meer; voor een geboortedatum waren dat tientallen klikken. Met het
 * toetsenbord blijft `Shift+PageUp` en `Shift+PageDown` per jaar springen.
 *
 * ### Toetsenbord
 * Pijltjes verplaatsen per dag en per week, `Home` en `End` naar de weekgrenzen,
 * `PageUp` en `PageDown` per maand en met `Shift` per jaar. `Enter` en spatie
 * kiezen. De maandtitel is een live region, zodat een schermlezer bij het bladeren
 * hoort in welke maand de focus staat.
 */
export default {
	title: 'Components/Inputs/Date Picker',
	component: 'nldd-date-picker',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/date-picker/date-picker.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	args: {
		range: false,
		firstDayOfWeek: 1,
		weekNumbers: false,
		accessibleLabel: '',
		value: '',
		start: '',
		end: '',
		min: '',
		max: '',
	},
	argTypes: {
		range: {
			control: 'boolean',
			description: 'Kies een periode in plaats van één datum',
			table: { defaultValue: { summary: false } },
		},
		firstDayOfWeek: {
			name: 'first-day-of-week',
			control: 'select',
			options: [0, 1, 2, 3, 4, 5, 6],
			description: 'Eerste dag van de week, 0 is zondag',
			table: { defaultValue: { summary: 1 } },
		},
		weekNumbers: {
			name: 'week-numbers',
			control: 'boolean',
			description: 'Toont ISO-weeknummers in een kolom links',
			table: { defaultValue: { summary: false } },
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijke naam van de kalender',
			table: { defaultValue: { summary: '(geen)' } },
		},
		value: {
			control: 'text',
			description: 'De gekozen datum als ISO (jjjj-mm-dd). Alleen zonder range.',
			table: { defaultValue: { summary: '(geen)' } },
		},
		start: {
			control: 'text',
			description: 'Begin van de periode als ISO. Alleen met range.',
			table: { defaultValue: { summary: '(geen)' } },
		},
		end: {
			control: 'text',
			description: 'Einde van de periode als ISO. Alleen met range.',
			table: { defaultValue: { summary: '(geen)' } },
		},
		min: {
			control: 'text',
			description: 'Vroegste datum: ISO, of today met een verschuiving (today-18y)',
			table: { defaultValue: { summary: '(geen)' } },
		},
		max: {
			control: 'text',
			description: 'Laatste datum: ISO, of today met een verschuiving (today+1y)',
			table: { defaultValue: { summary: '(geen)' } },
		},
	},
};

const Template = ({
	range,
	firstDayOfWeek,
	weekNumbers,
	accessibleLabel,
	value,
	start,
	end,
	min,
	max,
}: Record<string, unknown>) => html`
	<nldd-date-picker
		?range=${range}
		first-day-of-week=${firstDayOfWeek}
		?week-numbers=${weekNumbers}
		accessible-label=${accessibleLabel || nothing}
		value=${value || nothing}
		start=${start || nothing}
		end=${end || nothing}
		min=${min || nothing}
		max=${max || nothing}
		@change=${action('change')}
		@input=${action('input')}
	></nldd-date-picker>
`;

export const Default = Template.bind({});

export const Periode = () => html`
	<nldd-date-picker
		range
		accessible-label="Periode"
		@change=${action('change')}
	></nldd-date-picker>
`;

export const Geboortedatum = () => html`
	<nldd-date-picker
		accessible-label="Geboortedatum"
		max="today-18y"
		@change=${action('change')}
	></nldd-date-picker>
`;

export const AfspraakPlannen = () => html`
	<nldd-date-picker
		accessible-label="Datum van de afspraak"
		min="today"
		max="today+3m"
		@change=${action('change')}
	></nldd-date-picker>
`;

export const ZonderWeekenden = () => {
	const picker = document.createElement('nldd-date-picker');
	picker.accessibleLabel = 'Werkdag';
	// Zaterdag en zondag blijven zichtbaar en bereikbaar, maar zijn niet kiesbaar.
	picker.isDateUnavailable = (iso: string) => {
		const day = new Date(`${iso}T00:00:00Z`).getUTCDay();
		return day === 0 || day === 6;
	};
	picker.addEventListener('change', action('change'));
	return picker;
};

// Via de args en niet als vaste markup, anders doen de controls op deze story
// niets: Storybook hertekent dan dezelfde hardgecodeerde attributen.
export const MetWeeknummers = {
	render: Template,
	args: {
		range: true,
		weekNumbers: true,
		accessibleLabel: 'Verslagperiode',
	},
};

export const VolleBreedte = () => html`
	<div style="width: 480px; outline: 1px dashed currentColor;">
		<nldd-date-picker
			style="width: 100%;"
			range
			week-numbers
			accessible-label="Periode"
			@change=${action('change')}
		></nldd-date-picker>
	</div>
`;

export const ZondagEerst = () => html`
	<nldd-date-picker
		first-day-of-week="0"
		accessible-label="Datum"
		@change=${action('change')}
	></nldd-date-picker>
`;
