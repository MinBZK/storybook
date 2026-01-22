---
description: Maak een component pixel-perfect vergeleken met Figma design
argument-hint: <component-naam>
---

Maak component **$ARGUMENTS** pixel-perfect vergeleken met het Figma design.

## OVERZICHT

Dit command voert een iteratieve verificatie/correctie cyclus uit:

1. Start Storybook (als niet draait)
2. Open FigmaComparison story met Playwright
3. Haal Figma layout data op
4. Vergelijk positionering, varianten, en pixel-perfectheid
5. Pas aan indien nodig
6. Herhaal tot perfect of max 8 cycli bereikt

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
cat ~/.storybook-instances.json
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

## STAP 4: VERIFICATIE CYCLUS (max 8 iteraties)

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

```
mcp__playwright__browser_take_screenshot(
  filename: "{name}-overlay-cycle-{n}.png",
  fullPage: true
)
```

### 4.7 Analyseer screenshot

Bekijk de overlay screenshot en identificeer afwijkingen:

| Check | Wat te zoeken |
|-------|---------------|
| **Positionering** | Zijn componenten op dezelfde plek als Figma? |
| **Varianten** | Staan alle Figma varianten erin? Geen extra? |
| **Sizing** | Klopt de grootte van elk component? |
| **Spacing** | Klopt gap en padding? |
| **Colors** | Komen kleuren overeen? |
| **Typography** | Klopt font-size, weight, line-height? |
| **Border radius** | Komen hoeken overeen? |

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

## STAP 5: RESULTAAT

### Bij succes (pixel-perfect):

```
✅ Component {name} is pixel-perfect!

Iteraties nodig: {n}
Aanpassingen gemaakt:
- {lijst van wijzigingen}
```

### Bij falen (max iteraties bereikt):

```
❌ Component {name} is NIET pixel-perfect na 8 iteraties.

Resterende afwijkingen:
- {lijst van afwijkingen}

Suggesties:
- {mogelijke oorzaken en oplossingen}
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

## COMMON FIXES

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

---

## FOUTAFHANDELING

| Error | Oplossing |
|-------|-----------|
| FigmaComparison niet gevonden | Maak eerst story aan met `/component` |
| Storybook start niet | Check `npm run sb:status`, mogelijk port conflict |
| ftl-holster laadt niet | Check `STORYBOOK_FIGMA_TOKEN` in `.env` |
| Figma MCP rate limit | Wacht 60-120 seconden |
| Playwright crash | Sluit browser: `mcp__playwright__browser_close()` |

---

## CHECKLIST PIXEL-PERFECT

- [ ] Layout mode matcht Figma (column/row/grid/absolute)
- [ ] Gap matcht Figma exact
- [ ] Padding matcht Figma exact (ook asymmetrisch!)
- [ ] Alle Figma varianten aanwezig
- [ ] Geen extra varianten toegevoegd
- [ ] Volgorde varianten matcht Figma
- [ ] Container dimensies matchen Figma
- [ ] Component sizing klopt per variant
- [ ] Kleuren komen overeen
- [ ] Typography komt overeen
- [ ] Border radius komt overeen
- [ ] Geen zichtbare pixel differences in overlay mode
