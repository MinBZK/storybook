import { html } from 'lit';
import { ICONS } from '../../../content/icon/icon.js';
import './timeline-track-cell.js';
import '../../list/list.js';
import '../../list-item/list-item.js';
import '../spacer-cell/spacer-cell.js';
import '../text-cell/text-cell.js';
import '../title-cell/title-cell.js';

/**
 * De cel tekent het spoor van een tijdlijn of stappenlijst: een lijn met een
 * punt per rij. Hij hoort altijd in een `nldd-list-item` thuis — de rij levert
 * de blokpadding waarop de lijn zich uitlijnt (`--context-cell-padding-block`),
 * dus buiten een lijst sluiten opeenvolgende stappen niet op elkaar aan.
 */
export default {
	title: 'Components/Lists & Tables/Cells/Timeline Track Cell',
	component: 'nldd-timeline-track-cell',
	tags: ['autodocs'],

	argTypes: {
		status: {
			control: 'select',
			options: ['past', 'current', 'future', 'none'],
			description: 'Status van deze stap; none tekent alleen de lijn',
			table: { defaultValue: { summary: 'past' } },
		},
		variant: {
			control: 'select',
			options: ['dot', 'step'],
			description: 'Wat deze rij is: een dot op een tijdlijn (16px) of een step in een stappenlijst (24px), met een cijfer of icoon in de stip',
			table: { defaultValue: { summary: 'dot' } },
		},
		minor: {
			control: 'boolean',
			description: 'Deze rij hoort onder de vorige: kleinere stip, zelfde baan',
			table: { defaultValue: { summary: 'false' } },
		},
		direction: {
			control: 'select',
			options: ['down', 'up'],
			description: 'Richting waarin de tijdlijn vooruit loopt; alleen de huidige stap heeft een half spoor, dus alleen daar doet het iets',
			table: { defaultValue: { summary: 'down' } },
		},
		position: {
			control: 'select',
			options: ['first', 'between', 'last'],
			description: 'Plek in de reeks; bepaalt waar de lijn doorloopt',
			table: { defaultValue: { summary: 'between' } },
		},
		text: {
			control: 'text',
			description: 'Cijfer of korte tekst in de stip',
			table: { defaultValue: { summary: '' } },
		},
		icon: {
			control: 'select',
			options: ['', ...ICONS],
			description: 'Icoon in de stip; wint van text',
			table: { defaultValue: { summary: '' } },
		},
	},
};

export const Default = {
	args: {
		status: 'current',
		variant: 'step',
		minor: false,
		direction: 'down',
		position: 'between',
		text: '2',
		icon: '',
	},
	render: (args: Record<string, any>) => html`
		<nldd-list no-dividers accessible-label="Tijdlijn" style="max-width: 420px;">
			<nldd-list-item>
			<nldd-timeline-track-cell
				status=${args.status}
				variant=${args.variant}
				?minor=${args.minor}
				direction=${args.direction}
				position=${args.position}
				text=${args.text}
				icon=${args.icon}
			></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Aanvraag ingediend" supporting-text="3 maart 2026"></nldd-title-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

/**
 * Een tijdlijn van gebeurtenissen. Het spoor draagt de voortgang: accent tot en
 * met de stap waar je bent, daarna de rustige spoorkleur. Die overgang markeert
 * waar je staat, dus de stip zelf heeft geen extra ring nodig.
 */
export const Tijdlijn = {
	render: () => html`
		<nldd-list no-dividers accessible-label="Verloop aanvraag" style="max-width: 420px;">
			<nldd-list-item>
			<nldd-timeline-track-cell status="past" position="first"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Aanvraag ingediend" supporting-text="3 maart"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="past"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="In behandeling genomen" supporting-text="5 maart"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="current"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Beoordeling" supporting-text="Nu bezig"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="future" position="last"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Besluit" supporting-text="Verwacht 20 maart"></nldd-title-cell>
			</nldd-list-item>
		</nldd-list>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * `variant="step"` maakt de stip 24px, groot genoeg voor een cijfer of icoon.
 * Elke rij in de lijst krijgt dezelfde stip: de maat hoort bij de variant, niet
 * bij wat er toevallig in staat, anders verspringt het spoor per rij.
 *
 * Dit is de verticale tegenhanger van `nldd-step-indicator`. De semantiek hoort
 * bij de consument: `aria-current="step"` op de rij van de huidige stap, en de
 * status als tekst in de rij — kleur en vinkje alleen dragen hem niet.
 */
export const Stappenlijst = {
	render: () => html`
		<nldd-list no-dividers accessible-label="Voortgang aanvraag" style="max-width: 420px;">
			<nldd-list-item>
			<nldd-timeline-track-cell status="past" variant="step" position="first" icon="check-mark"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Gegevens" supporting-text="Afgerond"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item aria-current="step">
			<nldd-timeline-track-cell status="current" variant="step" text="2"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Controle" supporting-text="Huidige stap"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="future" variant="step" position="last" text="3"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Bevestigen" supporting-text="Nog te doen"></nldd-title-cell>
			</nldd-list-item>
		</nldd-list>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * `minor` zet een rij onder de vorige: dezelfde baan, een kleinere stip (12px bij
 * een step, 10px bij een dot). Inspringen zou het spoor breken, en juist dat spoor
 * verbindt de rijen — de hiërarchie komt van de stipmaat en van gewone tekst in
 * plaats van een titel.
 */
export const Substappen = {
	render: () => html`
		<nldd-list no-dividers accessible-label="Voortgang aanvraag" style="max-width: 420px;">
			<nldd-list-item>
			<nldd-timeline-track-cell status="past" variant="step" position="first" icon="check-mark"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Gegevens" supporting-text="Afgerond"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="past" variant="step" minor></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-text-cell text="Contactgegevens"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="past" variant="step" minor></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-text-cell text="Bankrekening"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item aria-current="step">
			<nldd-timeline-track-cell status="current" variant="step" text="2"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Controle" supporting-text="Huidige stap"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="future" variant="step" position="last" text="3"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Bevestigen" supporting-text="Nog te doen"></nldd-title-cell>
			</nldd-list-item>
		</nldd-list>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * De standaard: een kaal spoor van gebeurtenissen, stippen van 16px. Een `minor`
 * is hier 10px, voor een gebeurtenis die bij de vorige hoort.
 */
export const Tussenstappen = {
	render: () => html`
		<nldd-list no-dividers accessible-label="Verloop aanvraag" style="max-width: 420px;">
			<nldd-list-item>
			<nldd-timeline-track-cell status="past" position="first"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-text-cell text="Aanvraag ingediend" supporting-text="3 maart"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="past" minor></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-text-cell text="Ontvangstbevestiging verstuurd"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="current"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-text-cell text="Beoordeling" supporting-text="Nu bezig"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="future" position="last"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-text-cell text="Besluit" supporting-text="Verwacht 20 maart"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * `status="none"` tekent alleen de lijn, voor een rij zonder eigen punt op de
 * tijdlijn (een tussenkop, een groep). De lijn blijft daar accent: hij verbindt,
 * hij vertelt geen voortgang.
 */
export const ZonderStip = {
	render: () => html`
		<nldd-list no-dividers accessible-label="Tijdlijn met tussenkop" style="max-width: 420px;">
			<nldd-list-item>
			<nldd-timeline-track-cell status="past" position="first"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Aanvraag ingediend" supporting-text="3 maart"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="none"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Maart"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="past" position="last"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="In behandeling genomen" supporting-text="5 maart"></nldd-title-cell>
			</nldd-list-item>
		</nldd-list>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * Met scheidingslijnen: die kruisen het spoor, want de rijen sluiten op elkaar
 * aan. Dat kan kloppen wanneer elke rij op zichzelf staat (een logboek dat je
 * per regel leest), maar voor een doorlopende tijdlijn leest `no-dividers`
 * rustiger — daar hoort de lijn zelf het verband te leggen.
 */
export const MetDividers = {
	render: () => html`
		<nldd-list accessible-label="Verloop aanvraag" style="max-width: 420px;">
			<nldd-list-item>
			<nldd-timeline-track-cell status="past" position="first"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Aanvraag ingediend" supporting-text="3 maart"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="current"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Beoordeling" supporting-text="Nu bezig"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="future" position="last"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Besluit" supporting-text="Verwacht 20 maart"></nldd-title-cell>
			</nldd-list-item>
		</nldd-list>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * Een tijdlijn met het nieuwste bovenaan. De cel weet alleen wat hij zelf is,
 * niet welke buur eerder kwam, dus die richting geef je mee met `direction="up"`:
 * dan ligt het afgelegde deel van het spoor onder de stip in plaats van erboven.
 *
 * Alleen de huidige stap heeft een half spoor, dus alleen daar doet `direction`
 * iets — een afgeronde stap is helemaal accent en een toekomstige helemaal
 * rustig, ongeacht de richting. Meegeven op elke rij mag, maar hoeft niet.
 */
export const NieuwsteBovenaan = {
	render: () => html`
		<nldd-list no-dividers accessible-label="Verloop aanvraag" style="max-width: 420px;">
			<nldd-list-item>
			<nldd-timeline-track-cell status="future" position="first"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Besluit" supporting-text="Verwacht 20 maart"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="current" direction="up"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Beoordeling" supporting-text="Nu bezig"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="past"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="In behandeling genomen" supporting-text="5 maart"></nldd-title-cell>
			</nldd-list-item>
			<nldd-list-item>
			<nldd-timeline-track-cell status="past" position="last"></nldd-timeline-track-cell>
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
			<nldd-title-cell text="Aanvraag ingediend" supporting-text="3 maart"></nldd-title-cell>
			</nldd-list-item>
		</nldd-list>
	`,
	parameters: { controls: { disable: true } },
};
