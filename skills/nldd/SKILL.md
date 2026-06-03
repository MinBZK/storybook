---
name: nldd
description: "Bouw applicaties met de web components van het NLDD Design System (@nldd/design-system, Nederlandse Digitale Dienst, Rijksoverheid). Triggers: @nldd/design-system, 'nldd-' tags, vragen over layout, sheets, popovers, modals, formulieren, toegankelijkheid, CSS-tokens of upgraden van dit systeem. NIET voor het ontwikkelen van het design system zelf (daarvoor: /component, /css)."
metadata:
  type: reference
---

# NLDD Design System: voor wie ermee bouwt

Je gebruikt deze skill als je een **applicatie** bouwt bovenop
`@nldd/design-system`: de web component-bibliotheek van de Nederlandse
Digitale Dienst (Rijksoverheid). Ben je bezig met het **ontwikkelen van het
design system zelf** (nieuwe componenten, CSS-conventies), gebruik dan
`/component` en `/css`, niet deze skill.

Twee bestanden horen hierbij:

- [`reference.md`](reference.md): gegenereerde snelreferentie van elk
  `nldd-*` element met zijn attributen, slots en events.
- [`examples/`](examples/): werkende bootstrap- en patroonvoorbeelden voor
  platte HTML, Vue 3, layout-patronen en een complete content-pagina.

De levende documentatie met visuele voorbeelden staat in
[Storybook](https://minbzk.github.io/storybook/). De exacte types staan in de
`.d.ts` bestanden van het pakket. Gebruik die twee als bron van waarheid voor
detailvragen; deze skill leert je hoe je het systeem *goed* gebruikt.

## De visie: standaarden als gedrag, niet als kennis

Het uitgangspunt van dit systeem is dat een ontwikkelaar de Rijkshuisstijl, de
toegankelijkheidseisen en het interactiegedrag van een overheidsinterface niet
uit het hoofd hoeft te kennen. Die regels zitten ingebakken in de componenten.
Wie een `nldd-button` plaatst, krijgt het juiste focusgedrag, de juiste
kleurcontrasten, de juiste ARIA en het juiste toetsenbordgedrag mee, zonder er
iets voor te doen. Toegankelijkheid en huisstijl worden zo gedrag in plaats van
kennis die in iemands hoofd moet zitten.

Dat heeft één belangrijke consequentie voor jou: **als je tegen een component
vecht, gebruik je het verkeerd.** De componenten dragen opzettelijk meningen.
Werk ermee mee.

### Inhoud eerst, chroom verdient zijn plek

Begin bij de inhoud. Navigatie, werkbalken en koppen zijn er om de inhoud te
dienen, niet andersom. Voeg ze toe wanneer ze een taak ondersteunen, niet als
standaard.

- **Vermijd sticky headers tenzij de inhoud ze nodig heeft.** Een sticky kop is
  alleen verantwoord als een sectie langer is dan het scherm en de gebruiker de
  context permanent nodig heeft. `nldd-page` ondersteunt een sticky header
  (`sticky-header`) en meet zelf de hoogte zodat de inhoud er niet onder
  schuift, maar de standaard is: geen sticky. Kies je er toch voor, verantwoord
  dan waarom.
- **Minimaliseer chroom.** Een platte pagina met inhoud is bijna altijd beter
  dan dezelfde inhoud verpakt in een modal, een sheet en een werkbalk. Voeg een
  laag pas toe als de taak erom vraagt.

### Progressieve onthulling op smalle schermen

Het systeem verbergt secundaire inhoud zelf wanneer de ruimte krap wordt. Leun
daarop in plaats van ertegen te werken.

- **Split views verbergen panelen van rechts naar links.** `nldd-side-by-side-split-view`
  en `nldd-navigation-split-view` stellen automatisch in welke panelen verborgen
  worden als ze niet meer passen. **Links = hoogste prioriteit.** Plaats het
  belangrijkste paneel (de hoofdinhoud) links, secundaire panelen (inspector,
  detail) rechts. Die verdwijnen dan eerst.
- **Verberg, vouw niet dicht in een vaste hoek.** Op smalle schermen verhuist
  secundaire inhoud naar een sheet of popover in plaats van samengeperst te
  blijven.

### Componeer, herstijl niet

Gebruik componenten zoals ze zijn en stuur ze via attributen en tokens. Reik
niet in de shadow DOM, override geen interne ARIA, plak geen klassen op
childcomponenten.

- **Stuur via attributen en CSS-tokens, niet via interne overrides.** Wil je een
  rustiger of nadrukkelijker component? Kies een ander component in plaats van
  de ARIA of de stijl van het huidige te verbouwen. De `nldd-banner` zegt het
  zelf in zijn documentatie: "if you need a quieter component, pick a different
  one rather than overriding the banner's ARIA."
- **Reik alleen in de shadow DOM als het echt moet,** en doe het dan defensief
  (zie het patroon hieronder). Het is een ontsnappingsluik, geen route.

### Leun op native HTML waar het systeem dat doet

Het systeem vervangt native elementen niet, het verpakt ze. Dat geeft je de
volledige browser-toegankelijkheid en formulierafhandeling gratis.

- **`nldd-dropdown` is een visuele schil om een native `<select>`.** Geef een
  echte `<select>` als slotted child; de browser houdt de controle over
  toetsenbord, formulierwaarde en toegankelijkheid.
- **Voor links in CMS- of markdown-output gebruik je `nldd-rich-text` met een
  rauwe `<a>`,** niet `nldd-link`. `nldd-link` is voor UI-navigatie en
  actiegebieden, niet voor lopende tekst.

## Installeren en bootstrappen

```bash
npm install @nldd/design-system
```

Importeer de componenten en de stijlen één keer, bij het opstarten van je app:

```js
import '@nldd/design-system';          // registreert alle nldd-* componenten
import '@nldd/design-system/styles';   // CSS-tokens + Rijksoverheid-fonts
```

Voor tree-shaking kun je ook per component importeren via de subpath-export
(bijv. `@nldd/design-system/button`). Frameworks die templates compileren,
moeten `nldd-*` als custom elements herkennen (in Vue: `isCustomElement`).

De complete setups, inclusief de Vue-config en het per-component importeren,
staan in [`examples/bootstrap-html.md`](examples/bootstrap-html.md) en
[`examples/bootstrap-vue.md`](examples/bootstrap-vue.md).

## De vijf CSS-lagen

Alle visuele waarden komen uit CSS-variabelen; niets is hardcoded. Dat maakt
licht/donker-thema's mogelijk via `light-dark()` en houdt je app in de
huisstijl. De variabelen zijn gelaagd:

| Laag | Prefix | Voor jou als consument |
|------|--------|------------------------|
| **Primitives** | `--primitives-*` | Basiswaarden (kleur, spacing, typografie). Gebruik voor je eigen styling *rond* de componenten. |
| **Semantics** | `--semantics-*` | Betekenisvolle rollen (knoppen, controls, oppervlakken). Bruikbaar, maar primitives volstaan meestal. |
| **Components** | `--components-*` | Component-specifiek. Zelden nodig in app-code. |
| **Context** | `--context-*` | Communicatie tussen componenten (bijv. achtergrondkleur die doorcascadeert). |
| **Lokaal** | `--_*` | **Intern aan een component. Raak deze niet aan.** |

Voor je eigen CSS (de ruimte tussen en rond componenten) gebruik je
`--primitives-*` voor spacing en kleur, en `light-dark()` voor themabewuste
waarden:

```css
.mijn-rij {
  display: flex;
  gap: var(--primitives-space-8);
  color: light-dark(
    var(--primitives-color-neutral-700),
    var(--primitives-color-neutral-300)
  );
}
```

**Licht en donker.** Het hele palet is gebouwd op `light-dark()`, dus het thema
volgt de CSS `color-scheme`. Standaard is dat de OS- of browservoorkeur. Wil je
licht of donker forceren, zet dan `color-scheme: light` (of `dark`) op een
root-element; gebruik `light-dark()` zoals hierboven voor je eigen kleuren zodat
ze meebewegen. Er is geen aparte thema-toggle-API op `nldd-app-view`.

## Gebruikspatronen

Elk patroon heeft een reden. De voorbeelden zijn gedestilleerd uit
[regelrecht](https://github.com/MinBZK/regelrecht), de productie-app die dit
systeem het meest volwassen gebruikt.

### Layout componeren

`nldd-app-view` is altijd de buitenste schil: die zet de kleurschema-context en
de fonts. Wat erbinnen komt, hangt af van wat je bouwt. Er zijn twee
compositievormen, kies bewust:

| Vorm | Wanneer | Bouwstenen |
|------|---------|------------|
| **App-shell** | Applicaties met panelen: editors, dashboards, werkomgevingen. | `nldd-app-view` → split view → `nldd-split-view-pane` → `nldd-page` |
| **Content-pagina** | Landings-, marketing- of informatiepagina's: een verticale stapel inhoud. | `nldd-app-view` → `nldd-page` → `*-section` blokken → `nldd-page-footer` |

**App-shell** loopt van buiten naar binnen via split views:

```html
<nldd-app-view>
  <nldd-side-by-side-split-view panes="2">
    <div slot="pane-1"><!-- hoofdinhoud, hoogste prioriteit --></div>
    <div slot="pane-2"><!-- inspector, verdwijnt eerst op smal scherm --></div>
  </nldd-side-by-side-split-view>
</nldd-app-view>
```

*Waarom:* de split view regelt de responsive auto-hide. Zet de prioriteit goed
door de volgorde van de panelen.

**Content-pagina** is een stapel page-sections, geen split views:

```html
<nldd-app-view>
  <nldd-page>
    <nldd-simple-section><!-- hero --></nldd-simple-section>
    <nldd-simple-section>
      <nldd-collection layout="grid"
        item-width="320px"
      >
        <nldd-card><!-- ... --></nldd-card>
      </nldd-collection>
    </nldd-simple-section>
    <nldd-page-footer><!-- ... --></nldd-page-footer>
  </nldd-page>
</nldd-app-view>
```

*Waarom:* de `*-section` componenten (`nldd-simple-section`,
`nldd-two-thirds-one-third-section`, en de andere page-sections) regelen
responsive padding en kolom-wrapping zelf via container queries. Grids van
gelijkwaardige items bouw je met `nldd-collection` + `nldd-card`, niet met eigen
CSS-grid. Het volledige patroon staat in
[`examples/content-page.md`](examples/content-page.md).

### Sheet, modal of popover: kies bewust

Dit zijn geen uitwisselbare overlays. Elk heeft een doel:

| Surface | Gebruik voor | Niet voor |
|---------|--------------|-----------|
| **`nldd-sheet`** | Secundaire inhoud die context behoudt: formulieren, bewerk-oppervlakken, detail. Schuift in vanaf de zijkant (onderkant op mobiel). | Korte bevestigingen. |
| **`nldd-modal-dialog`** | Hoogrisico-bevestigingen en kritieke meldingen ("weet je het zeker?"). Onderbreekt bewust. | Data-invoer of complexe formulieren. |
| **`nldd-popover`** | Lichte, niet-blokkerende panelen verankerd aan een trigger: filters, snelacties, zoekvelden. Sluit bij Esc en klik-buiten. | Inhoud die de hele aandacht vraagt. |

*Vuistregel:* secundaire inhoud op een smal scherm hoort in een **sheet**, niet
in een modal. Een modal onderbreekt; reserveer dat voor momenten die een
onderbreking verdienen.

### Imperatieve API spiegelen (sheets, popovers, modals)

Deze surfaces stellen `show()` en `hide()` beschikbaar als methoden. Spiegel je
toestand naar die calls in plaats van het element te mounten/unmounten, zodat de
animatie speelt. Spiegel óók de andere kant op, anders krijg je een
`hide()` → `@close` → `hide()` lus.

```js
// Vue, vereenvoudigd uit regelrecht
watch(() => props.open, async (open) => {
  if (!open) { sheetEl.value?.hide(); return; }
  await nextTick();
  sheetEl.value?.show();
}, { immediate: true });
```

*Waarom:* mount/unmount slaat de in- en uit-animatie over en verliest
DOM-toestand. De imperatieve methoden animeren wel.

Belangrijk: dit fragment toont alleen de `watch`-kant. De sheet sluit zichzelf
bij Esc of klik-buiten en vuurt dan `close`; koppel `@close` aan een
`emit('close')` die diezelfde `open`-state omlaag zet, niet aan een directe
`hide()`. Anders krijg je de `hide()` → `@close` → `hide()` lus. Het complete,
werkende component staat in [`examples/bootstrap-vue.md`](examples/bootstrap-vue.md).

### Lijstrijen componeren uit cellen

Bouw rijen op uit cellen binnen een `nldd-list-item`. Niet uit losse divs.

```html
<nldd-list variant="simple">
  <nldd-list-item size="md" type="button">
    <nldd-text-cell text="Titel" supporting-text="Ondertitel"></nldd-text-cell>
  </nldd-list-item>
</nldd-list>
```

Beschikbare cellen: `nldd-text-cell`, `nldd-icon-cell`, `nldd-title-cell`,
`nldd-description-cell`, `nldd-spacer-cell`, en meer (zie `reference.md`).

### Formulieren en validatiefouten

`nldd-form-field` koppelt label en input automatisch (geen `for`/`id`-gedoe).
Voor een foutmelding zet je twee dingen op de input zelf: `invalid` en
`error-message` met de `id`('s) van de bijbehorende
`nldd-form-field-error-text`-elementen. Die wijzen zichzelf toe aan de juiste
slot; jij stuurt alleen `invalid` aan vanuit je eigen validatielogica.

```html
<!-- zet `invalid` op de input als je validatie faalt -->
<nldd-form-field label="KvK-nummer">
  <nldd-text-field name="kvk"
    invalid
    error-message="kvk-error"
  ></nldd-text-field>
  <nldd-form-field-error-text id="kvk-error">
    Vul een geldig KvK-nummer in (8 cijfers).
  </nldd-form-field-error-text>
</nldd-form-field>
```

`invalid` is een gewone boolean-attribuut dat je dynamisch zet: in Vue
`:invalid="hasError"`, in platte JS `field.toggleAttribute('invalid', hasError)`.
Zo koppel je dezelfde vlag aan je validatie bij blur, submit of een
server-respons.

*Waarom dit patroon:* de koppeling loopt via `error-message` → `id`, niet via
shadow-DOM-trucs, zodat screenreaders de fout aan het veld koppelen. De
validatie-*regels* (wanneer is iets fout) zijn aan jou; het systeem regelt
alleen de presentatie en de toegankelijke koppeling.

### Custom events lezen via `event.detail`

Componenten leveren hun waarde in `event.detail`, niet altijd op
`event.target.value`. Lees defensief:

```js
function onInput(event) {
  const value = event.detail?.value ?? event.target?.value;
  // ...
}
```

### Defensieve shadow-DOM toegang

Moet je echt bij een native input (bijvoorbeeld om te focussen)? Zoek dan met
een fallback, zodat je code blijft werken als de interne structuur verandert:

```js
const field = root.querySelector('nldd-search-field');
const native =
  field?.shadowRoot?.querySelector('input') ?? field?.querySelector('input');
native?.focus();
```

Dit is een ontsnappingsluik. Gebruik het spaarzaam.

### Spacing: `nldd-spacer` versus `nldd-container`

- **`nldd-container`** voor padding rond een regio en de layout van zijn
  kinderen (stack, rij, grid), met responsive `sm-` / `md-` / `lg-` varianten.
- **`nldd-spacer`** voor een kale verticale of horizontale ruimte tussen
  opeenvolgende, verschillende componenten. Ook per breakpoint instelbaar.

### Breakpoints

De grenzen zijn: `sm` ≤ 640px, `md` 641–1007px, `lg` ≥ 1008px. Het pakket
exporteert deze waarden nog niet publiek, dus als je ze in JS nodig hebt
(bijvoorbeeld om een popover anders te positioneren), hardcode ze in sync met
deze bron. **Bekende beperking:** controleer bij een pakketupdate of er
inmiddels wel een export is.

## Toegankelijkheid: wat je gratis krijgt, wat jij nog moet doen

De componenten leveren correcte ARIA, focusvolgorde, een zichtbare blauwe
focusring, `forced-colors`-ondersteuning en `prefers-reduced-motion` af. De
wettelijke lat is WCAG 2.1 AA (EN 301 549, verplicht onder het Besluit digitale
toegankelijkheid overheid). Wat het systeem voor je regelt:

- Form fields koppelen label en input automatisch (geen handmatige `for`/`id`).
- Knoppen met een popup zetten zelf `aria-haspopup`; **jij houdt `expanded`
  bij** als de popup opent en sluit.
- Banners zetten zelf `role`/`aria-live` op basis van variant. Niet overschrijven.

Wat jij nog moet doen:

- Zorg voor een **skip-link** (`nldd-skip-link`, "Direct naar de inhoud") en een
  logische focusvolgorde in je eigen markup.
- Test op **toetsenbordbediening**, **200% zoom** en **400% herschaling zonder
  horizontale scroll**.
- Geef betekenisvolle `accessible-label`s waar je tekst weglaat (icon-only
  knoppen, geslotte inhoud).

## Upgraden naar een nieuwe versie

Het systeem brengt versies uit als patches (semantic-release verhoogt het
patch-nummer bij elke `feat`, `fix` of breaking change). Het versienummer alleen
zegt dus niet of een upgrade veilig is; **de changelog wel.** Gebruik
[`changelog.md`](changelog.md) als je upgradepad.

Werkwijze bij het verhogen van je `@nldd/design-system` versie:

1. **Lees elke versie tussen jouw huidige en de doelversie.** De entries staan
   nieuwste eerst, met een kop per release (versienummer + datum). Sla niets
   over: een breaking change kan in een tussenliggende patch zitten.
2. **Scan de `Breaking` / `Breaking Changes` secties eerst.** Die bevatten
   concrete migratie-instructies: een verwijderd attribuut met zijn vervanger,
   hernoemde tokens, gewijzigd gedrag. Een echt voorbeeld uit de changelog:
   `variant="box-on-tinted"` op `nldd-list` is verwijderd, met als vervanger
   `<nldd-list variant="box" background="base">`.
3. **Pas de migraties toe in je code** voordat je de nieuwe versie in gebruik
   neemt. Zoek je app door op de verwijderde attributen, tokennamen of
   componenten uit de breaking entries.
4. **Lees `Highlights`, `Added` en `Changed`** voor nieuwe componenten of
   attributen die je oudere, omslachtigere code kunnen vervangen.
5. **Verifieer tegen [`reference.md`](reference.md)** of een attribuut, slot of
   event in de doelversie bestaat zoals je verwacht. Die referentie hoort bij
   exact deze release.

Vuistregel: ga niet meer dan een handvol patches in één sprong omhoog zonder de
tussenliggende `Breaking` secties te lezen. Hernoemde CSS-tokens zijn de meest
gemiste val: je eigen thema-overrides verwijzen dan naar een naam die niet meer
bestaat, zonder foutmelding, alleen een stille terugval op de default.

## Bron van waarheid

1. **[Storybook](https://minbzk.github.io/storybook/)**: levende voorbeelden en
   controls per component.
2. **`.d.ts` types in het pakket**: de exacte, actuele API.
3. **[`reference.md`](reference.md)**: offline snelreferentie van alle elementen.
4. **[`changelog.md`](changelog.md)**: de release notes per versie. Raadpleeg
   dit als een attribuut, slot of gedrag pas vanaf een bepaalde versie bestaat,
   of om te zien wat er sinds jouw versie is veranderd.

**Iconen.** `nldd-icon name="…"` accepteert namen uit een vaste set. De
volledige lijst (iconen plus aliassen) staat onder "Iconen" in
[`reference.md`](reference.md); verzin geen naam, kies er een uit die set.

## Grenzen van deze skill

Deze skill gaat over het *gebruiken* van het design system: welke componenten,
welke patronen, welke visie. Wat erbuiten valt en je zelf invult vanuit je
applicatie- en frameworkkeuzes: state-management en validatieregels,
server-side foutafhandeling, routing, en het testen van je eigen app. Voor
SSR/hydratie geldt de algemene web-componentenpraktijk (de componenten
upgraden client-side; render geen kritieke inhoud uitsluitend in hun shadow
DOM). De componenten zelf zijn los getest binnen het design system; jouw
app-tests schrijf je met je eigen testopstelling.

> Voor onderhouders: `reference.md` en `changelog.md` zijn gegenereerd
> (uit respectievelijk de JSDoc van de componenten en de root-CHANGELOG). Draai
> `npm run generate:skill-docs` na een API-wijziging of release en commit het
> resultaat. Het zijn echte bestanden, geen symlinks: een plugin wordt naar een
> geïsoleerde cache gekopieerd waarbij symlinks buiten de plugin-map wegvallen.
