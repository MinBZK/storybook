---
description: Maak een component pixel-perfect vergeleken met Figma design
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

### 3.5.1 Extraheer Figma style waarden

Uit de Figma MCP response, extraheer:

| Property | Figma locatie | Beschrijving |
|----------|---------------|--------------|
| **Colors** | `fills[].color` (RGBA 0-1) | Achtergrond kleuren |
| **Stroke colors** | `strokes[].color` | Border kleuren |
| **Font size** | `style.fontSize` | Font grootte in px |
| **Font weight** | `style.fontWeight` | Font weight numeriek |
| **Line height** | `style.lineHeightPx` | Line height in px |
| **Stroke weight** | `strokeWeight` | Border dikte in px |
| **Stroke align** | `strokeAlign` | `"INSIDE"`, `"OUTSIDE"`, `"CENTER"` |
| **Border radius** | `cornerRadius` | Uniform radius |
| **Border radius (asymm)** | `rectangleCornerRadii` | Array [TL, TR, BR, BL] |
| **Padding** | `paddingTop/Right/Bottom/Left` | Padding per zijde |
| **Min dimensions** | `minWidth`, `minHeight` | Minimum afmetingen |
| **Box shadow** | `effects[]` waar `type === "DROP_SHADOW"` | Shadow effect |

### 3.5.2 Color conversion utility

Converteer Figma RGBA (0-1 range) naar CSS:

```javascript
// Figma RGBA (0-1) naar CSS rgba()
function figmaToCSS(r, g, b, a) {
  return `rgba(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)}, ${a})`;
}

// Voorbeeld: Figma { r: 0.059, g: 0.090, b: 0.165, a: 1 }
// Wordt: rgba(15, 23, 42, 1) oftewel #0f172a
```

### 3.5.3 Extraheer browser computed styles

Gebruik Playwright om computed styles te extraheren:

```javascript
mcp__playwright__browser_evaluate({
  function: `() => {
    const el = document.querySelector('rr-{name}').shadowRoot.querySelector('.{main-class}');
    const styles = getComputedStyle(el);
    return {
      // Colors
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      borderColor: styles.borderColor,
      // Typography
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      lineHeight: styles.lineHeight,
      // Borders & radius
      borderWidth: styles.borderWidth,
      borderRadius: styles.borderRadius,
      // Spacing
      paddingTop: styles.paddingTop,
      paddingRight: styles.paddingRight,
      paddingBottom: styles.paddingBottom,
      paddingLeft: styles.paddingLeft,
      // Dimensions
      minHeight: styles.minHeight,
      minWidth: styles.minWidth,
      // Effects
      boxShadow: styles.boxShadow
    };
  }`
})
```

### 3.5.4 Vergelijk waarden

Vergelijk met toleranties:

| Property | Tolerantie | Vergelijkingsmethode |
|----------|------------|----------------------|
| Colors | Exact | Converteer Figma RGBA naar CSS, vergelijk strings |
| Font size | 0px | Figma px === computed px |
| Font weight | Exact | Figma value === computed value |
| Line height | 1px | Figma lineHeightPx vs computed (parse px value) |
| Border width | 0px | Figma strokeWeight === parsed border-width |
| Border radius | 1px | Figma cornerRadius vs parsed border-radius |
| Padding | 1px | Vergelijk alle 4 zijdes apart (asymmetrisch!) |
| Min dimensions | 1px | Figma minWidth/Height vs computed |
| Box shadow | Visual | Vergelijk offset, blur, spread, color |

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

### 4.6 Neem screenshot in Overlay mode

Screenshot alleen de `ftl-holster` element (de rode box), NIET fullPage:

```
mcp__playwright__browser_take_screenshot(
  filename: "{name}-overlay-cycle-{n}.png",
  element: "ftl-holster comparison container",
  ref: "{ftl-holster-ref-from-snapshot}"
)
```

**Belangrijk:** Gebruik altijd element screenshot van de `ftl-holster`, niet fullPage. Dit geeft schone screenshots zonder omringende whitespace en Storybook UI.

### 4.7 Analyseer met automated checks + visuele inspectie

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

### 4.8 Bij afwijkingen: Fix identificeren

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

### 4.9 Pas bestanden aan

**Story aanpassen (layout/varianten):**
```
Edit: src/components/{name}/rr-{name}.stories.js
```

**Component aanpassen (styling):**
```
Edit: src/components/{name}/rr-{name}.ts
```

### 4.10 Wacht op hot reload

```
mcp__playwright__browser_wait_for(time: 2)
```

### 4.11 Herhaal vanaf stap 4.2

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
6. Bij afwijkingen: **consulteer KNOWN ISSUES DATABASE** in dit command voor bekende fixes
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

1. Voeg het issue toe aan de `## KNOWN ISSUES DATABASE` sectie in dit bestand
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

> **Zelflerende sectie**: Wanneer je tijdens verificatie een nieuw issue ontdekt dat hier niet staat, voeg het toe aan deze database met dezelfde structuur. Dit helpt toekomstige verificaties.

### Issue: Asymmetrische padding

**Symptoom:** Component padding lijkt correct maar overlay toont verticale offset
**Root cause:** Figma gebruikt verschillende top/bottom padding (bijv. 8/6px), CSS gebruikt symmetrisch
**Diagnostiek:**
```javascript
// Check Figma data voor:
paddingTop !== paddingBottom  // Als true: asymmetrisch!
```
**Fix:**
```css
/* FOUT */
padding: 8px;
/* GOED */
padding: 8px 8px 6px 8px; /* top right bottom left */
```
**Preventie:** Check ALTIJD alle 4 padding waarden apart in Figma Properties panel

---

### Issue: Font weight mismatch met variable font

**Symptoom:** Tekst lijkt te bold of te light ondanks correcte font-weight waarde
**Root cause:** RijksSansVF variable font gebruikt `font-variation-settings` voor weight, niet standaard `font-weight`
**Diagnostiek:**
```javascript
// Computed style toont font-weight: 400
// Maar visueel is het anders door font-variation-settings
getComputedStyle(el).fontVariationSettings // Check deze waarde
```
**Fix:**
```css
/* Gebruik font shorthand met token die variation settings bevat */
font: var(--components-button-m-font);
/* OF expliciet */
font-variation-settings: 'wght' 600;
```
**Preventie:** Gebruik altijd component font tokens, nooit losse font-weight

---

### Issue: Border meegeteld in dimensies

**Symptoom:** Component is 2px te groot (of te klein)
**Root cause:** `box-sizing: content-box` vs `border-box` verschil, of border in Figma is INSIDE vs OUTSIDE
**Diagnostiek:**
```javascript
// Check Figma strokeAlign:
strokeAlign: "INSIDE"  // Border BINNEN de dimensies
strokeAlign: "OUTSIDE" // Border BUITEN de dimensies
strokeAlign: "CENTER"  // Border gecentreerd op edge
```
**Fix:**
```css
/* Voor INSIDE stroke (meest voorkomend) */
box-sizing: border-box;

/* Voor OUTSIDE stroke */
box-sizing: content-box;
/* OF compenseer met negatieve margin */
```
**Preventie:** Check strokeAlign in Figma data voordat je dimensies vergelijkt

---

### Issue: Opacity token als percentage

**Symptoom:** Disabled state is volledig transparant of niet transparant genoeg
**Root cause:** `--primitives-opacity-disabled` is een percentage (38), niet een decimaal (0.38)
**Diagnostiek:**
```css
/* FOUT - resulteert in opacity: 38 (invalid) */
opacity: var(--primitives-opacity-disabled);
```
**Fix:**
```css
/* GOED */
opacity: calc(var(--primitives-opacity-disabled, 38) / 100);
```
**Preventie:** Opacity tokens ALTIJD delen door 100

---

### Issue: Focus ring verschil

**Symptoom:** Focus ring heeft andere offset of dikte dan Figma
**Root cause:** Figma gebruikt stroke effect, CSS kan outline of box-shadow gebruiken
**Diagnostiek:**
```javascript
// Figma focus ring is vaak een stroke met offset
// Check effects array voor DROP_SHADOW of stroke op focus state
```
**Fix:**
```css
/* Met outline (scherp) */
outline: var(--semantics-focus-ring-thickness) solid var(--semantics-focus-ring-color);
outline-offset: 2px;

/* Met box-shadow (kan blur hebben) */
box-shadow: 0 0 0 2px var(--semantics-focus-ring-color);
```
**Preventie:** Check of Figma stroke of effect gebruikt voor focus indicator

---

### Issue: Gap in nested flex containers

**Symptoom:** Spacing tussen items klopt niet, maar gap waarde lijkt correct
**Root cause:** Figma auto-layout gap vs CSS gap werkt anders bij nested containers
**Diagnostiek:**
```javascript
// Check of parent EN child beide gap hebben
// Figma kan "space between" gebruiken i.p.v. vaste gap
```
**Fix:**
```css
/* Check of het gap of justify-content moet zijn */
justify-content: space-between; /* i.p.v. gap */

/* Of nested containers met eigen gap */
.parent { gap: 12px; }
.child { gap: 4px; }
```
**Preventie:** Analyseer volledige layout hierarchy in Figma

---

### Issue: Line-height px vs unitless

**Symptoom:** Tekst verticaal verkeerd gepositioneerd
**Root cause:** Figma geeft `lineHeightPx`, CSS kan unitless of % gebruiken
**Diagnostiek:**
```javascript
// Figma: lineHeightPx: 20
// CSS computed: line-height: 1.5 (unitless) of 150%
// Deze zijn NIET hetzelfde bij alle font sizes
```
**Fix:**
```css
/* Gebruik altijd px voor exacte match */
line-height: 20px;

/* OF via font token die line-height bevat */
font: var(--components-button-m-font);
```
**Preventie:** Vergelijk line-height altijd in px, converteer indien nodig

---

### Issue: Icon sizing in button

**Symptoom:** Icon te groot/klein of verkeerd gepositioneerd t.o.v. tekst
**Root cause:** Icon heeft eigen sizing die niet matcht met button context
**Diagnostiek:**
```javascript
// Check icon dimensions in Figma vs rendered
// Check of icon SVG viewBox klopt
```
**Fix:**
```css
.button__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0; /* Voorkom dat icon krimpt */
}

/* Verticale alignment */
.button {
  align-items: center;
}
```
**Preventie:** Icons altijd expliciete dimensies geven, niet afhankelijk van content

---

### Issue: Text baseline alignment

**Symptoom:** Tekst lijkt 1-2px te hoog of te laag
**Root cause:** Font metrics verschillen, vooral bij custom fonts
**Diagnostiek:**
```javascript
// Vergelijk visuele baseline in overlay
// RijksSansVF kan andere metrics hebben dan Figma verwacht
```
**Fix:**
```css
/* Micro-adjustment indien nodig */
.button__label {
  position: relative;
  top: 1px; /* Of gebruik transform */
}

/* Of via line-height tweaking */
line-height: 1; /* Reset, dan fine-tune */
```
**Preventie:** Accepteer kleine baseline verschillen (±1px) als font metrics issue

---

## COMMON FIXES (Quick Reference)

### Padding klopt niet

1. Check Figma padding (kan asymmetrisch zijn!)
2. Pas aan in component CSS:
   ```css
   padding: {top}px {right}px {bottom}px {left}px;
   ```

### Gap klopt niet

1. Check Figma gap waarde
2. Pas aan in story container:
   ```css
   gap: {gap}px;
   ```

### Breedte/hoogte klopt niet

1. Check Figma sizing mode (hug vs fixed)
2. Bij fixed: voeg expliciete dimensies toe
3. Bij hug: verwijder vaste dimensies

### Font klopt niet

1. Check component-specifieke font token:
   ```css
   font: var(--components-{name}-{size}-font);
   ```

### Border radius klopt niet

1. Check semantics token:
   ```css
   border-radius: var(--semantics-controls-{size}-corner-radius);
   ```

### Color klopt niet

1. Converteer Figma RGBA naar hex/rgb
2. Zoek matching token in `dist/css/tokens.css`
3. Update component met correcte token

---

## NIEUWE ISSUES TOEVOEGEN

Wanneer je tijdens verificatie een probleem tegenkomt dat **niet** in de Known Issues Database staat:

### 1. Documenteer het issue

Voeg toe aan de database met dit format:

```markdown
### Issue: [Korte beschrijving]

**Symptoom:** [Wat zie je in de overlay/vergelijking?]
**Root cause:** [Waarom gebeurt dit?]
**Diagnostiek:**
\`\`\`javascript
// Code om het issue te identificeren
\`\`\`
**Fix:**
\`\`\`css
/* Oplossing */
\`\`\`
**Preventie:** [Hoe dit te voorkomen in de toekomst]
```

### 2. Locatie

Voeg het issue toe aan `/.claude/commands/pixel-perfect.md` in de sectie `## KNOWN ISSUES DATABASE`, gesorteerd op frequentie (meest voorkomende bovenaan).

### 3. Wanneer toevoegen

- Issue kwam meerdere keren voor tijdens verificatie
- Issue kostte significant tijd om te diagnosticeren
- Issue heeft een niet-voor-de-hand-liggende root cause
- Fix is niet intuïtief

### 4. Niet toevoegen

- Eenmalige typo's of simpele vergissingen
- Issues specifiek voor één component (documenteer in component file)
- Issues die al gedekt zijn door bestaande entries

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
