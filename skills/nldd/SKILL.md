---
name: nldd
description: "Bouw applicaties met het NLDD Design System (@nldd/design-system). Gebruik deze skill wanneer je een app maakt die de web components van de Nederlandse Digitale Dienst gebruikt: triggers zijn '@nldd/design-system', 'nldd-' tags, 'design system', 'web component', 'Rijksoverheid UI', 'overheidsinterface bouwen', 'nldd component gebruiken', plus vragen over layout, sheets, popovers, modals, toegankelijkheid en CSS-tokens van dit systeem. NIET voor het ontwikkelen van het design system zelf (daarvoor: /component, /css)."
metadata:
  type: reference
  audience: consumers
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
  platte HTML en Vue 3.

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

Wil je alleen laden wat je gebruikt, importeer dan per component via de
subpath-export:

```js
import '@nldd/design-system/button';
import '@nldd/design-system/text-field';
import '@nldd/design-system/styles';
```

Frameworks die JSX of templates compileren, moeten weten dat `nldd-*` tags
custom elements zijn. In Vue 3 (Vite):

```js
// vite.config.js
vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('nldd-'),
    },
  },
})
```

Zie [`examples/bootstrap-html.md`](examples/bootstrap-html.md) en
[`examples/bootstrap-vue.md`](examples/bootstrap-vue.md) voor complete setups.

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

## Gebruikspatronen

Elk patroon heeft een reden. De voorbeelden zijn gedestilleerd uit
[regelrecht](https://github.com/MinBZK/regelrecht), de productie-app die dit
systeem het meest volwassen gebruikt.

### Layout componeren

De compositie loopt van buiten naar binnen: `nldd-app-view` (app-shell, zet de
kleurschema-context) → een split view → `nldd-split-view-pane` per paneel →
`nldd-page` / `nldd-container` voor de inhoud.

```html
<nldd-app-view>
  <nldd-side-by-side-split-view panes="2">
    <div slot="pane-1"><!-- hoofdinhoud, hoogste prioriteit --></div>
    <div slot="pane-2"><!-- inspector, verdwijnt eerst op smal scherm --></div>
  </nldd-side-by-side-split-view>
</nldd-app-view>
```

*Waarom:* `nldd-app-view` regelt de globale context (kleurschema, fonts). De
split view regelt de responsive auto-hide. Zet de prioriteit goed door de
volgorde van de panelen.

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

## Bron van waarheid

1. **[Storybook](https://minbzk.github.io/storybook/)**: levende voorbeelden en
   controls per component.
2. **`.d.ts` types in het pakket**: de exacte, actuele API.
3. **[`reference.md`](reference.md)**: offline snelreferentie van alle elementen.

> Voor onderhouders: `reference.md` is gegenereerd uit de JSDoc van de
> componenten. Na een API-wijziging draai je `npm run generate:component-reference`
> en commit je het resultaat.
