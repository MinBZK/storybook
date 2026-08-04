# `nldd-time-field`, fase 1

Werkdocument voor het bouwen van het tijdveld. Fase 2 (`nldd-time-picker`) en
fase 3 (het wiel) staan hier bewust niet in; alleen wat nodig is om het veld
zelfstandig te kunnen releasen.

Leidend principe: dit is de tijd-tweeling van `nldd-date-field`. Waar een keuze
te maken valt en er geen reden is om af te wijken, doen we het zoals dat veld
het doet. Consumers hoeven dan niets nieuws te leren.

## Afbakening

In fase 1:

- een tekstveld met royaal parsen en normaliseren bij verlaten van het veld
- 24-uurs, `HH:mm`, geen seconden
- instelbare minutenstap met afronden
- `min` / `max`
- formulierdeelname, `nldd-form-field`-integratie

Buiten fase 1:

- de picker en het `picker`-slot
- am/pm (de waarde blijft 24-uurs, 12-uurs wordt later puur weergave)
- een periode (`range`); twee losse velden dekken dat voorlopig

## Waarde

`value` is `HH:mm`, 24-uurs, met voorloopnul: `09:30`, `14:05`, `00:00`.
Leeg (`''`) zodra er geen geldige tijd staat.

Anders dan bij het datumveld valt de Nederlandse notatie samen met de canonieke
vorm, dus er is geen aparte weergave-conversie nodig. Wat wél blijft is het
onderscheid tussen de ruwe tekst die iemand typt en de waarde: het veld houdt
de getypte tekst apart in state en zet `value` alleen wanneer die parseert en
binnen de grenzen valt.

Onparseerbaar of buiten de grenzen levert allebei `value = ''` op, met de ruwe
tekst zichtbaar zodat de gebruiker ziet wat er staat en het kan herstellen.
Dat is exact het gedrag van `_commit()` in `date-field.ts`.

## Attributen

| Attribuut | Type | Standaard | Beschrijving |
| --- | --- | --- | --- |
| `value` | `string` | `''` | De tijd als `HH:mm`. Leeg wanneer er geen geldige tijd staat. |
| `min` | `string` | `''` | Vroegst toegestane tijd als `HH:mm`. Dient ook als basis voor de stap. |
| `max` | `string` | `''` | Laatst toegestane tijd als `HH:mm`. |
| `step` | `number` | `1` | Minutenstap. Bepaalt welke tijden geldig zijn en waarop wordt afgerond. |
| `placeholder` | `string` | `''` | Placeholdertekst. Zet hier geen formaat in; gebruik de supporting-label van `nldd-form-field`. |
| `input-id` | `string` | `''` | Id op de interne input. Wordt automatisch gezet door `nldd-form-field`. |
| `size` | `'md' \| 'sm'` | `'md'` | Wordt automatisch gezet door `nldd-form-field`. |
| `invalid` | `boolean` | `false` | Markeert het veld als ongeldig. Het veld zet dit nooit zelf. |
| `valid` | `boolean` | `false` | Markeert het veld als geldig. |
| `disabled` | `boolean` | `false` | |
| `readonly` | `boolean` | `false` | |
| `required` | `boolean` | `false` | |
| `name` | `string` | `''` | Naam voor formulierverzending. |
| `autocomplete` | `string` | `''` | Autocomplete-hint. |
| `accessible-label` | `string` | `''` | Toegankelijk label voor de interne input. Wordt automatisch gezet door `nldd-form-field`. |
| `error-message-ids` | `string` | `''` | Ids voor `aria-describedby`. Wordt automatisch gezet door `nldd-form-field`. |
| `width` | `string` | `''` | Standaard precies breed genoeg voor een tijd; `full` vult de container, of geef een eigen CSS-lengte. |
| `translations` | `object` | | Vertalingen; niet opgegeven sleutels vallen terug op het Nederlands. |

`no-picker` staat er bewust niet bij, zie Open punten.

## Parsen

Niet maskeren tijdens typen. Per toetsaanslag herformatteren verplaatst de
caret, breekt backspace midden in de waarde en verwart screenreaders. Accepteer
wat mensen typen en normaliseer één keer, bij commit.

Scheidingstekens: `:`, `.`, `,`, `u`, `h` (hoofdletterongevoelig).

| Invoer | Waarde |
| --- | --- |
| `9` | `09:00` |
| `09` | `09:00` |
| `14` | `14:00` |
| `9:5` | `09:05` |
| `9:30` | `09:30` |
| `09:30` | `09:30` |
| `9.30` | `09:30` |
| `9,30` | `09:30` |
| `9u30` | `09:30` |
| `9u` | `09:00` |
| `930` | `09:30` |
| `0930` | `09:30` |
| `1430` | `14:30` |
| `  9:30  ` | `09:30` |

Kale cijferreeksen: 1 of 2 cijfers is een uur, 3 cijfers is `H:mm`, 4 cijfers is
`HH:mm`. Meer of minder parseert niet.

Grenzen: uur 0 tot en met 23, minuut 0 tot en met 59. `24:00` parseert niet;
met een dag zonder seconden is dat dubbelzinnig en het hoort bij de volgende
dag, die dit veld niet kent.

Alles wat hier niet in staat levert `null` op, en daarmee `value = ''`.

## Afronden op de stap

Alleen actief wanneer `step > 1`. Bij de standaardstap van 1 minuut valt er
niets af te ronden.

1. **Basis.** De stap wordt geteld vanaf `min`, en vanaf `00:00` wanneer er
   geen `min` is. Zo kan een reeks die op `:07` begint ook met stap 15.
   Ontleend aan `<input type="time">`, dat `min` op dezelfde manier gebruikt.
2. **Moment.** Bij commit (`change`), niet bij `input`. Anders springt `09:1`
   naar `09:00` voordat iemand de `5` heeft kunnen intikken.
3. **Richting.** Naar de dichtstbijzijnde geldige waarde. Ligt de invoer er
   precies tussenin, dan naar boven.
4. **Dagrand.** Nooit doorrollen. Zou afronden naar boven voorbij `23:59` gaan,
   dan naar beneden. Doorrollen naar `00:00` verschuift stilzwijgend de dag, en
   een consument die dit veld naast een datumveld zet heeft dan een fout die
   niemand ziet aankomen.
5. **Volgorde.** Eerst parsen, dan afronden, dan de grenzen toetsen. De
   geklemde waarde moet zelf ook op de stap vallen.

De afgeronde waarde staat na commit in het veld. Stilzwijgend iets anders
opslaan dan wat er stond is precies de verrassing waar later klachten over
komen.

## Events

| Event | Wanneer | Detail |
| --- | --- | --- |
| `input` | Bij elke wijziging | `{ value }` met `HH:mm`, of `''` |
| `change` | Wanneer de waarde is vastgelegd | `{ value }` met `HH:mm`, of `''` |

Beide handlers roepen `e.stopPropagation()` aan op het native event voordat ze
hun eigen `CustomEvent` vuren. Zonder dat ontsnapt het native event uit de
shadow root en krijgt een consument twee events per toetsaanslag, waarvan er
één `detail` als het getal `0` draagt. Zie de fix in `nldd-search-field`.

## Formulier

Via de `FormAssociated`-mixin uit `src/utilities/form-associated-mixin.ts`,
zoals `nldd-date-field`:

- `formValue()` levert `value`
- `commitFormValue()` bij elke emit
- `formResetCallback()` zet terug naar de waarde bij het eerste renderen
- `formStateRestoreCallback()` herstelt een string

## Toegankelijkheid

- `delegatesFocus: true` op de shadow root
- `accessible-label` naar de interne input; zonder label en zonder
  `nldd-form-field` valt het terug op de i18n-default
- `error-message-ids` naar `aria-describedby`
- `inputmode="numeric"` zodat mobiel een cijfertoetsenbord opent. Kale
  cijferreeksen parseren, dus je hebt geen dubbele punt nodig om iets in te
  voeren.
- Het veld reflecteert alleen `invalid` / `valid` en zet die nooit zelf.
  Foutmeldingen horen bij `nldd-form-field`.

## Vertalingen

Alleen wat fase 1 nodig heeft:

```ts
export const nlddTimeFieldTranslations = {
	// Terugval-naam als een consument geen accessible-label geeft en het veld
	// niet in een nldd-form-field staat.
	'components.time-field.default-label': 'Tijd',
};
```

De sleutel voor de picker-knop komt in fase 2 erbij.

## Tests

**Parsen** (pure functie, zonder DOM): elke regel uit de parse-tabel, plus
afwijzingen: `''`, `abc`, `25:00`, `9:60`, `12345`, `9:`, `:30`.

**Afronden**: stap 15 met `09:07` naar `09:00` en `09:08` naar `09:15`; de
gelijkstand `09:05` bij stap 10 naar boven; stap 15 met `min="09:07"` levert
`09:07`, `09:22`, `09:37`; `23:53` bij stap 15 blijft `23:45` en rolt niet door;
stap 1 rondt niets af.

**Grenzen**: buiten `min`/`max` levert `value = ''` met de tekst blijvend in
beeld; precies op `min` en op `max` is geldig.

**Events**: precies één `input` per toetsaanslag en één `change` per commit, met
`detail.value` als string; het native event bereikt de host niet.

**Normaliseren**: `9u30` staat na blur als `09:30` in het veld;
onparseerbare tekst blijft ongewijzigd staan.

**Formulier**: verzending draagt `name=value`; reset zet terug; restore herstelt.

**Toegankelijkheid**: label komt op de input, `aria-describedby` volgt
`error-message-ids`, en zonder label pakt hij de i18n-default.

**Smoke**: rendert en heeft een shadowRoot.

## Open punten

**De picker-knop bij fase 2.** `nldd-date-field` toont de kalenderknop
standaard en `no-picker` verbergt hem. Als fase 1 zonder knop uitkomt en fase 2
er standaard een toevoegt, krijgt elk bestaand gebruik er ineens een knop bij.
Twee uitwegen: fase 1 en 2 samen releasen, of fase 1 nu al `no-picker`
laten kennen zodat de default vaststaat. Ik neig naar het eerste, want een
attribuut dat niets doet is ook verwarrend.

**Stap en pijltjestoetsen.** Ligt voor de hand dat pijl omhoog en omlaag straks
met `step` verspringen. Hoort bij de picker, maar het is goed om te weten dat
`step` dan een tweede betekenis krijgt.
