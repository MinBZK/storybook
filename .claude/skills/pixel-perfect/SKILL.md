---
name: pixel-perfect
description: Maak een component pixel-perfect vergeleken met Figma design
user-invocable: true
argument-hint: <component-naam>
---

Maak component **$ARGUMENTS** pixel-perfect vergeleken met het Figma design.

## WORKFLOW OVERVIEW

Dit command gebruikt een subagent architectuur met critical review:

1. **Main agent**: Initialisatie (identificeer component, start Storybook)
2. **Main agent**: Haal Figma data op en extraheer style waarden (EENMALIG)
3. **Main agent**: Spawn verificatie subagent met Figma waarden als context
4. **Subagent**: Voer verificatie cyclus uit (compare, fix, screenshot - GEEN Figma fetch)
5. **Main agent**: Critical review van subagent resultaat
6. **Bij issues**: Retry met feedback (max 3 iteraties) - Figma waarden blijven hetzelfde
7. **Rapporteer** eindresultaat

### Iteratie limieten

- Subagent: max 3 verificatie cycli per run
- Critical review retries: max 3 iteraties
- Totaal maximum: 9 verificatie cycli

### Optimalisatie: Figma data caching

Figma data wordt **één keer** opgehaald door de main agent en doorgegeven aan alle subagents. Dit voorkomt:
- Rate limit issues met Figma MCP
- Onnodige API calls
- Inconsistente data tussen iteraties

---

## STAP 1: INITIALISATIE

### 1.1 Component identificeren

Bepaal de component naam en locatie:

```
Input: "button" of "toggle-button"
Story ID: components-{name}--figma-comparison
Component: src/components/{name}/rr-{name}.ts
Stories: src/components/{name}/rr-{name}.stories.js
```

### 1.2 Verifieer dat FigmaComparison story bestaat

```bash
grep -l "FigmaComparison" src/components/{name}/rr-{name}.stories.js
```

Als niet gevonden: STOP met foutmelding "Component heeft geen FigmaComparison story"

### 1.3 Haal Figma Node ID op

Lees de stories file en extraheer de node ID uit de `ftl-holster` element:

```javascript
// Zoek: <ftl-holster node="309:3542" ...>
// Of: <ftl-holster node="20-27" ...>
```

---

## STAP 2: STORYBOOK STARTEN

### 2.1 Check of Storybook al draait

```bash
npm run sb:status
```

### 2.2 Start indien nodig

```bash
npm run sb:start
```

### 2.3 Lees poort uit registry

```bash
cat ~/.claude/storybook-instances.json
```

Vind entry waar `path` overeenkomt met huidige working directory.

### 2.4 Wacht tot Storybook ready is

```bash
npx wait-on http://localhost:{port} --timeout 60000
```

---

## STAP 3: FIGMA DATA OPHALEN

### 3.1 Gebruik Figma MCP tool

```
mcp__figma-with-token__get_figma_data(
  fileKey: "5DyHMXUNVxbgH7ZjhQxPZe",
  nodeId: "{extracted-node-id}"
)
```

### 3.2 Analyseer layout structuur

Extraheer uit de response:

| Property | Waar te vinden | Betekenis |
|----------|----------------|-----------|
| Layout mode | `globalVars.styles.layout_XXX.mode` | `"column"` of `"row"` |
| Gap | `globalVars.styles.layout_XXX.gap` | Ruimte tussen items in px |
| Padding | `globalVars.styles.layout_XXX.padding` | Container padding in px |
| Sizing | `globalVars.styles.layout_XXX.sizing` | `"hug"` of `"fixed"` |
| Dimensions | `globalVars.styles.layout_XXX.dimensions` | Breedte/hoogte bij fixed |

### 3.3 Extraheer varianten

Analyseer de children van de component set:
- Elke variant heeft properties (size, state, selected, disabled)
- Noteer de **volgorde** van varianten
- Noteer **exacte dimensies** van elke variant

### 3.4 Check voor absolute positioning

Als nodes `position: "absolute"` hebben:
- Noteer x/y coördinaten
- Gebruik absolute positioning in de story

---

## STAP 3.5: STYLE EXTRACTION (Automated Checks)

> **Zie:** [style-extraction.md](./style-extraction.md) voor de volledige referentie over:
> - Figma style waarden extractie
> - Color conversion utility (RGBA 0-1 → CSS)
> - Browser computed styles extractie met Playwright
> - Vergelijkingstoleranties per property

---

## STAP 4: VERIFICATIE CYCLUS (max 3 iteraties per subagent)

### Voor elke iteratie:

### 4.1 Lees huidige FigmaComparison story

```
Read: src/components/{name}/rr-{name}.stories.js
```

Extraheer de huidige HTML structuur uit de FigmaComparison functie.

### 4.2 Open story in Playwright

```
mcp__playwright__browser_navigate(
  url: "http://localhost:{port}/iframe.html?viewMode=story&id=components-{name}--figma-comparison"
)
```

### 4.3 Wacht op ftl-holster laden

```
mcp__playwright__browser_wait_for(time: 3)
```

### 4.4 Neem snapshot

```
mcp__playwright__browser_snapshot()
```

Verifieer dat `ftl-holster` aanwezig is met mode buttons.

### 4.5 Activeer Overlay mode

Klik op "Overlay" button (betrouwbaarder dan keyboard shortcut):

```
mcp__playwright__browser_click(
  element: "Overlay button",
  ref: "{ref-from-snapshot}"
)
```

### 4.6 Zet overlay opacity op 50%

**BELANGRIJK:** Overlay screenshots moeten ALTIJD op 50% opacity genomen worden voor een half-half vergelijking.

1. Neem een nieuwe snapshot om de opacity slider ref te vinden
2. De slider is een `<input type="range">` element in de ftl-holster controls
3. Zet de slider op 50%:

```
mcp__playwright__browser_evaluate(
  function: "(slider) => { slider.value = 50; slider.dispatchEvent(new Event('input', { bubbles: true })); }",
  ref: "{slider-ref}",
  element: "Opacity slider"
)
```

4. Wacht kort op de opacity change:

```
mcp__playwright__browser_wait_for(time: 0.5)
```

**Waarom 50% opacity?** Bij 50% opacity zie je een half-half blend van Code en Figma. Dit maakt het makkelijker om:
- Afwijkingen te spotten (ze "shimmeren" niet door extreme transparantie)
- Beide layers duidelijk te zien
- Subtiele kleur- en positieverschillen te detecteren

### 4.7 Neem screenshot in Overlay mode

Screenshot alleen de `ftl-holster` element (de rode box), NIET fullPage:

```
mcp__playwright__browser_take_screenshot(
  filename: "{name}-overlay-cycle-{n}.png",
  element: "ftl-holster comparison container",
  ref: "{ftl-holster-ref-from-snapshot}"
)
```

**Belangrijk:** Gebruik altijd element screenshot van de `ftl-holster`, niet fullPage. Dit geeft schone screenshots zonder omringende whitespace en Storybook UI.

### 4.8 Analyseer met automated checks + visuele inspectie

Voer zowel **automated vergelijkingen** als **visuele controles** uit:

| Check | Automated vergelijking | Visuele controle |
|-------|------------------------|------------------|
| **Colors** | Vergelijk Figma fill/stroke vs computed background/border/color | Check overlay voor color bleeding |
| **Font sizes** | Vergelijk Figma fontSize vs computed font-size | Check text alignment in overlay |
| **Font weight** | Vergelijk Figma fontWeight vs computed font-weight | Check text boldness |
| **Line height** | Vergelijk Figma lineHeightPx vs computed line-height | Check vertical text alignment |
| **Line thickness** | Vergelijk Figma strokeWeight vs computed border-width | Check border crispness in overlay |
| **Border radius** | Vergelijk Figma cornerRadius vs computed border-radius | Check corner smoothness |
| **Padding** | Vergelijk alle 4 Figma padding values vs computed padding | Check content positioning |
| **Min dimensions** | Vergelijk Figma minWidth/Height vs computed min-width/height | Check sizing constraints |
| **Box shadows** | Vergelijk Figma DROP_SHADOW effect vs computed box-shadow | Check shadow visibility/blur |
| **Positionering** | n/a | Zijn componenten op dezelfde plek als Figma? |
| **Varianten** | n/a | Staan alle Figma varianten erin? Geen extra? |
| **Sizing** | n/a | Klopt de grootte van elk component? |
| **Spacing/Gap** | n/a | Klopt gap tussen elementen? |

**Rapporteer afwijkingen in tabel formaat:**

```markdown
| Property | Figma waarde | Computed waarde | Status |
|----------|--------------|-----------------|--------|
| fontSize | 14px | 14px | ✅ |
| backgroundColor | rgba(15, 23, 42, 1) | rgb(15, 23, 42) | ✅ |
| paddingTop | 8px | 10px | ❌ -2px |
```

### 4.9 Bij afwijkingen: Fix identificeren

**Positionering afwijking:**
- Check of layout mode (column/row) klopt
- Check of gap waarde klopt
- Check of padding klopt
- Check of absolute positioning nodig is

**Varianten afwijking:**
- Vergelijk Figma varianten met story varianten
- Voeg ontbrekende toe, verwijder overbodige

**Styling afwijking:**
- Identificeer welke CSS property afwijkt
- Zoek correcte token in `dist/css/tokens.css`
- Pas component of story aan

### 4.10 Pas bestanden aan

**Story aanpassen (layout/varianten):**
```
Edit: src/components/{name}/rr-{name}.stories.js
```

**Component aanpassen (styling):**
```
Edit: src/components/{name}/rr-{name}.ts
```

### 4.11 Wacht op hot reload

```
mcp__playwright__browser_wait_for(time: 2)
```

### 4.12 Herhaal vanaf stap 4.2

---

## STAP 5: SUBAGENT WORKFLOW

### 5.1 Spawn verificatie subagent

Gebruik de Task tool om een subagent te spawnen. **Belangrijk:** Geef de Figma waarden mee als context - de subagent haalt GEEN Figma data op.

```javascript
Task({
  subagent_type: "general-purpose",
  description: "Pixel-perfect verificatie {name}",
  prompt: `Voer pixel-perfect verificatie uit voor component {name}.

Context:
- Storybook draait op port {port}
- Story URL: http://localhost:{port}/iframe.html?viewMode=story&id=components-{name}--figma-comparison
- Component file: src/components/{name}/rr-{name}.ts
- Stories file: src/components/{name}/rr-{name}.stories.js

## Figma referentie waarden (NIET opnieuw ophalen):

Layout:
- Mode: {layout.mode}
- Gap: {layout.gap}px
- Padding: {layout.padding}

Varianten: {variantList}

Style waarden per variant:
{voor elke variant}
### {variantName}
- backgroundColor: {figmaBackgroundColor}
- color: {figmaTextColor}
- borderColor: {figmaBorderColor}
- fontSize: {figmaFontSize}px
- fontWeight: {figmaFontWeight}
- lineHeight: {figmaLineHeight}px
- borderWidth: {figmaStrokeWeight}px
- borderRadius: {figmaBorderRadius}px
- paddingTop: {figmaPaddingTop}px
- paddingRight: {figmaPaddingRight}px
- paddingBottom: {figmaPaddingBottom}px
- paddingLeft: {figmaPaddingLeft}px
- minHeight: {figmaMinHeight}px
- minWidth: {figmaMinWidth}px
{/voor elke variant}

## Opdracht:

1. Open story in Playwright
2. Extraheer computed styles met browser_evaluate
3. Vergelijk tegen bovenstaande Figma waarden (tolerantie: exact voor colors, ±1px voor dimensions)
4. Neem overlay screenshot
5. Analyseer visueel: positionering, varianten, sizing, spacing
6. Bij afwijkingen: **consulteer [known-issues.md](./known-issues.md)** voor bekende fixes
7. Pas component/story aan indien nodig
8. Rapporteer resultaat met vergelijkingstabel

## Bij onbekende issues:

Als je een issue tegenkomt dat NIET in de Known Issues Database staat en significant was om op te lossen:
- Documenteer het in je eindrapport onder "## Nieuw ontdekt issue"
- Gebruik format: Symptoom, Root cause, Fix, Preventie
- Main agent voegt dit toe aan de database

## BELANGRIJK - Wijzigingen tracking:

Bij ELKE Edit tool call, noteer:
- Bestand + regelnummer
- Oude waarde → nieuwe waarde
- Reden (welke Figma waarde dit fixt)

Voorbeeld:
\`src/components/button/rr-button.ts:45\`: \`padding: 8px\` → \`padding: 8px 8px 6px 8px\` (Figma paddingBottom=6px)

Rapporteer aan het eind ALLE wijzigingen, ook als er geen waren.

Max 3 verificatie cycli. Rapporteer na elke cyclus.
{previousFeedback}`
})
```

### 5.2 Critical review checklist

> **⚠️ BELANGRIJK: Wees ZEER kritisch!**
>
> Pixel-perfect verificatie is een moeilijke taak die vaak misgaat. Subagents:
> - Vergeten regelmatig properties te checken
> - Rapporteren soms "geslaagd" terwijl er afwijkingen zijn
> - Missen asymmetrische padding (top ≠ bottom)
> - Kijken niet naar alle varianten
> - Maken oppervlakkige visuele analyses
>
> **Vertrouw het resultaat NIET blindelings. Controleer ELKE claim.**

Na ontvangst van subagent resultaat, controleer **kritisch**:

**Automated checks (VERIFIEER dat deze daadwerkelijk zijn uitgevoerd):**
- [ ] Color vergelijkingen: Staat er een concrete Figma waarde EN computed waarde in de tabel?
- [ ] Font size: Is de exacte px waarde vergeleken (niet "looks correct")?
- [ ] Font weight: Is de numerieke waarde vergeleken (400, 500, 600, etc.)?
- [ ] Line height: Is de px waarde vergeleken?
- [ ] Border/stroke: Is strokeWeight vergeleken met border-width?
- [ ] Padding: Zijn ALLE 4 zijdes apart gecontroleerd? (top, right, bottom, left)
- [ ] Min-dimensions: Zijn minHeight en minWidth gecontroleerd?
- [ ] Is de vergelijkingstabel COMPLEET met concrete waarden (geen "n/a" of "correct")?

**Visuele checks (BEKIJK de screenshot zelf):**
- [ ] Tel de varianten: Matcht het aantal in de story met Figma?
- [ ] Check positionering: Staan items op dezelfde plek in overlay?
- [ ] Check sizing: Zijn er zichtbare grootteverschillen?
- [ ] Check spacing: Is de gap tussen elementen consistent?
- [ ] Check de overlay: Zijn er ENIGE zichtbare pixel differences?
- [ ] Check Edit tool calls: Zijn wijzigingen syntactisch correct toegepast?

**Wijzigingen tracking:**
- [ ] Heeft subagent een wijzigingen lijst gerapporteerd?
- [ ] Bevat elke wijziging: bestand, regelnummer, oude→nieuwe waarde?
- [ ] Is de reden voor elke wijziging vermeld (welke Figma waarde)?
- [ ] Als geen wijzigingen: is expliciet "geen wijzigingen nodig" vermeld?

**Red flags (trigger retry):**
- Subagent zegt "alles ziet er goed uit" zonder concrete vergelijkingen
- Vergelijkingstabel mist properties of heeft vage waarden
- Geen overlay screenshot genomen
- Padding alleen als "8px" vermeld i.p.v. alle 4 zijdes apart
- "Visueel correct" zonder specifieke analyse per variant

**Check voor nieuwe issues:**
- [ ] Heeft subagent een "Nieuw ontdekt issue" sectie gerapporteerd?
- [ ] Zo ja: is het issue waardevol genoeg om toe te voegen aan de database?
  - Kwam het meerdere keren voor?
  - Was het niet-triviaal om te diagnosticeren?
  - Heeft het een niet-voor-de-hand-liggende root cause?
- [ ] Zo ja: voeg toe aan Known Issues Database na succesvolle verificatie

### 5.3 Retry met feedback

Als critical review issues vindt, spawn nieuwe subagent met **specifieke, actionable feedback**.

**Feedback template:**

```markdown
## Vorige verificatie was ONVOLLEDIG

### Ontbrekende checks:
- paddingBottom: Je hebt alleen paddingTop gerapporteerd. Check ALLE 4 zijdes.
- fontWeight: Mist in vergelijkingstabel. Figma waarde is {x}, check computed.
- borderRadius: Geen concrete waarde vermeld, alleen "correct".

### Fouten in analyse:
- Je zei "visueel correct" maar de overlay toont duidelijke offset bij variant X.
- Variant "disabled" ontbreekt in je analyse maar staat wel in Figma.

### Concrete opdracht voor deze iteratie:
1. Extraheer computed styles voor ELKE variant apart
2. Vul vergelijkingstabel met CONCRETE px/color waarden
3. Vergelijk padding per zijde: top={x}px, right={y}px, bottom={z}px, left={w}px
4. Neem nieuwe overlay screenshot NA eventuele fixes
```

**Wees specifiek:** Noem exacte property namen, verwachte waarden, en welke variant het betreft. Vage feedback zoals "check beter" helpt niet.

### 5.4 Max retries

- Maximum 3 retry iteraties met feedback
- Als na 3 retries nog steeds issues: rapporteer en vraag om menselijke review

---

## STAP 6: RESULTAAT

### Wijzigingen tracking

Houd tijdens de uitvoering een lijst bij van alle aanpassingen:

```markdown
## Wijzigingen gemaakt:

### Component (src/components/{name}/rr-{name}.ts)
1. **Regel 45**: `padding: 8px` → `padding: 8px 8px 6px 8px` (asymmetrische padding)
2. **Regel 52**: `border-radius: 8px` → `border-radius: 6px` (was incorrect)
3. **Regel 67**: Toegevoegd `min-height: 32px`

### Stories (src/components/{name}/rr-{name}.stories.js)
1. **Regel 120**: `gap: 8px` → `gap: 12px` (matcht nu Figma layout)
2. **Regel 135**: Variant "disabled" toegevoegd aan grid

### Geen wijzigingen nodig
(Als alles al correct was)
```

**Instructie aan subagent:** Na elke Edit tool call, noteer:
- Bestandsnaam en regelnummer
- Oude waarde → nieuwe waarde
- Reden voor wijziging

### Bij succes (pixel-perfect):

```
✅ Component {name} is pixel-perfect!

Iteraties nodig: {n}

## Automated checks: allemaal geslaagd
| Property | Figma | Computed | Status |
|----------|-------|----------|--------|
| fontSize | 14px | 14px | ✅ |
| paddingTop | 8px | 8px | ✅ |
| paddingBottom | 6px | 6px | ✅ |
| ... | ... | ... | ✅ |

## Visuele checks: allemaal geslaagd
- ✅ Alle varianten aanwezig (5/5)
- ✅ Positionering correct
- ✅ Sizing correct
- ✅ Spacing correct
- ✅ Overlay screenshot schoon

## Wijzigingen gemaakt:

### src/components/{name}/rr-{name}.ts
- Regel 45: `padding: 8px` → `padding: 8px 8px 6px 8px`
- Regel 52: `border-radius: 8px` → `border-radius: 6px`

### src/components/{name}/rr-{name}.stories.js
- Regel 120: `gap: 8px` → `gap: 12px`
```

### Bij succes zonder wijzigingen:

```
✅ Component {name} is pixel-perfect!

Iteraties nodig: 1

## Automated checks: allemaal geslaagd
[tabel]

## Visuele checks: allemaal geslaagd
[lijst]

## Wijzigingen gemaakt:
Geen - component was al pixel-perfect.
```

### Bij falen (max iteraties bereikt):

```
❌ Component {name} is NIET pixel-perfect na {n} iteraties.

## Resterende afwijkingen (automated):
| Property | Figma | Computed | Verschil |
|----------|-------|----------|----------|
| paddingTop | 8px | 10px | -2px |
| ... | ... | ... | ... |

## Resterende afwijkingen (visueel):
- ❌ Gap tussen rijen wijkt af
- ❌ Variant "disabled" ontbreekt

## Wijzigingen gemaakt (maar onvoldoende):

### src/components/{name}/rr-{name}.ts
- Regel 45: `padding: 8px` → `padding: 8px 8px 6px 8px`

## Suggesties:
- paddingTop token mogelijk incorrect in design tokens
- Gap waarde niet beschikbaar als token, hardcode overwegen
```

### Database update (indien nieuwe issues ontdekt):

Als de subagent een "Nieuw ontdekt issue" heeft gerapporteerd dat waardevol is:

1. Voeg het issue toe aan [known-issues.md](./known-issues.md)
2. Gebruik het standaard format (Symptoom, Root cause, Diagnostiek, Fix, Preventie)
3. Plaats het op de juiste plek (sorteer op frequentie/relevantie)
4. Bevestig de toevoeging in het eindrapport:

```
## Database bijgewerkt:
- Nieuw issue toegevoegd: "[Issue naam]"
- Reden: [Waarom dit waardevol is voor toekomstige verificaties]
```

---

## LAYOUT MATCHING RULES

### Figma gebruikt GRID layout:

Genereer HTML met CSS Grid:

```html
<div style="
  display: grid;
  grid-template-columns: repeat({cols}, auto);
  gap: {gap}px;
  padding: {padding}px;
">
```

### Figma gebruikt FLEX layout (column):

```html
<div style="
  display: flex;
  flex-direction: column;
  gap: {gap}px;
  padding: {padding}px;
  align-items: flex-start;
">
```

### Figma gebruikt FLEX layout (row):

```html
<div style="
  display: flex;
  flex-direction: row;
  gap: {gap}px;
  padding: {padding}px;
  align-items: center;
">
```

### Figma gebruikt ABSOLUTE positioning:

```html
<div style="
  position: relative;
  width: {width}px;
  height: {height}px;
  background: #ffffff;
">
  <rr-{name} style="position: absolute; left: {x}px; top: {y}px;">...</rr-{name}>
  ...
</div>
```

---

## VARIANT MAPPING

### Figma variant properties → HTML attributes

| Figma Property | Component Attribute |
|----------------|---------------------|
| `size=md` / `size=lg` | `size="m"` / `size="s"` |
| `is-selected=true` | `selected` |
| `is-disabled=true` | `disabled` |
| `is-checked=true` | `checked` |
| `is-hovered=true` | Skip (hover state) |
| `is-focused=true` | Skip (focus state) |
| `variant=...` | `variant="..."` |

**LET OP:** Hover en focus states worden NIET gerenderd in de FigmaComparison story. Deze states worden alleen visueel getoond, niet als aparte componenten.

---

## KNOWN ISSUES DATABASE

> **Zie:** [known-issues.md](./known-issues.md) voor de volledige database met:
> - Bekende issues en hun fixes (asymmetrische padding, font weight, border sizing, etc.)
> - Common fixes quick reference
> - Instructies voor het toevoegen van nieuwe issues

---

## FOUTAFHANDELING

| Error | Oplossing |
|-------|-----------|
| FigmaComparison niet gevonden | Maak eerst story aan met `/component` |
| Storybook start niet | Check `npm run sb:status`, mogelijk port conflict |
| ftl-holster laadt niet | Check `STORYBOOK_FIGMA_TOKEN` in `.env` |
| Figma design laadt niet in worktree | Kopieer `.env` van main naar worktree (zie hieronder) |
| Figma MCP rate limit | Wacht 60-120 seconden |
| Playwright crash | Sluit browser: `mcp__playwright__browser_close()` |
| browser_evaluate faalt | Check shadowRoot selector, element moet in DOM zijn |

### Worktree .env probleem

Bij werken in een git worktree bevat deze standaard geen `.env` file. De Figma designs laden dan niet in Storybook. Oplossing:

```bash
# Kopieer .env van main repository naar worktree
cp /pad/naar/main/repo/.env /pad/naar/worktree/.env
```

Of relatief vanuit de worktree:
```bash
cp ../../.env .
```

---

## CHECKLIST PIXEL-PERFECT

### Automated checks (moet 100% slagen):

- [ ] Colors matchen (fill → background, stroke → border)
- [ ] Font size matcht exact
- [ ] Font weight matcht exact
- [ ] Line height matcht (±1px)
- [ ] Border/stroke width matcht exact
- [ ] Border radius matcht (±1px)
- [ ] Padding matcht alle 4 zijdes (±1px)
- [ ] Min-width/height matcht (±1px)
- [ ] Box-shadow matcht (offset, blur, spread, color)

### Visuele checks (moet 100% slagen):

- [ ] Layout mode matcht Figma (column/row/grid/absolute)
- [ ] Gap matcht Figma exact
- [ ] Padding matcht Figma exact (ook asymmetrisch!)
- [ ] Alle Figma varianten aanwezig
- [ ] Geen extra varianten toegevoegd
- [ ] Volgorde varianten matcht Figma
- [ ] Container dimensies matchen Figma
- [ ] Component sizing klopt per variant
- [ ] Kleuren komen visueel overeen
- [ ] Typography komt visueel overeen
- [ ] Border radius komt visueel overeen
- [ ] Geen zichtbare pixel differences in overlay mode
