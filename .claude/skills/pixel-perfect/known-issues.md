# Known Issues Database

> **Zelflerende sectie**: Wanneer je tijdens verificatie een nieuw issue ontdekt dat hier niet staat, voeg het toe aan deze database met dezelfde structuur. Dit helpt toekomstige verificaties.

---

## Issue: Asymmetrische padding

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

## Issue: Font weight mismatch met variable font

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

## Issue: Border meegeteld in dimensies

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

## Issue: Opacity token als percentage

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

## Issue: Focus ring verschil

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

## Issue: Gap in nested flex containers

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

## Issue: Line-height px vs unitless

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

## Issue: Icon sizing in button

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

## Issue: Text baseline alignment

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

## Issue: Figma spacer pattern vs CSS padding

**Symptoom:** Elementen in nav-bar zijn horizontaal verschoven t.o.v. Figma (bijv. 8px te ver naar rechts)
**Root cause:** Figma gebruikt vaak interne spacer elementen (bijv. 32px brede spacers) naast container padding, terwijl CSS alleen padding gebruikt
**Diagnostiek:**
```javascript
// Check Figma structuur voor spacer children:
// Container: padding=8px + spacer child width=32px = 40px totale offset
// CSS: padding=48px (direct op container)
// Verschil: 48px - 40px = 8px offset
```
**Fix:**
```css
/* Compenseer met negatieve margin op specifieke elementen */
.nav-right {
  margin-right: -8px; /* 48px padding - 40px Figma offset */
}

/* NIET: verander globale padding, dit breekt andere elementen */
```
**Preventie:** Analyseer Figma's interne structuur inclusief spacer elementen voordat je padding aanpast. Gebruik negatieve margins voor compensatie in plaats van globale padding wijzigingen.

---

## Issue: Title margin vs padding voor spacing

**Symptoom:** Titel tekst is verkeerd uitgelijnd t.o.v. aangrenzende elementen
**Root cause:** CSS margin-right op titel creëert extra ruimte bovenop de padding van het aangrenzende element, terwijl Figma's title-item interne padding gebruikt
**Diagnostiek:**
```javascript
// Figma title-item heeft padding: 0px 8px (interne spacing)
// CSS met margin-right: 16px creëert 16px + adjacent padding
// Dit resulteert in te veel ruimte
```
**Fix:**
```css
/* FOUT - margin stapelt op adjacent element's padding */
.nav-title {
  margin-right: 16px;
}

/* GOED - padding matcht Figma's interne structuur */
.nav-title {
  padding-right: 8px; /* Matcht Figma title-item padding */
}
```
**Preventie:** Check of Figma padding of margin gebruikt voor spacing. Gebruik padding voor interne spacing binnen een element.

---

## Issue: Meerdere alignment changes tegelijk

**Symptoom:** Na meerdere CSS wijzigingen is de layout erger dan voorheen
**Root cause:** Alignment issues hebben vaak onderlinge afhankelijkheden; meerdere fixes tegelijk maakt het moeilijk te zien welke werkt
**Diagnostiek:**
```
# Voorbeeld van verkeerde aanpak:
1. Wijzig nav-bar padding 48px → 40px
2. Wijzig title margin 16px → 8px
3. Screenshot → layout is erger dan voorheen
# Welke wijziging is fout? Onduidelijk!
```
**Fix:**
```
# Correcte aanpak: incrementeel testen
1. Wijzig ALLEEN titel spacing
2. Screenshot + vergelijk → beter of slechter?
3. Als beter: houd wijziging, ga naar volgende
4. Als slechter: revert, probeer alternatief
5. Herhaal voor elk element apart
```
**Preventie:** Test alignment wijzigingen ALTIJD één voor één. Neem een screenshot na elke individuele wijziging om het effect te isoleren.

---

# Common Fixes (Quick Reference)

## Spacing met spacer component

Gebruik `<rr-spacer>` voor spacing waar Figma spacer elementen gebruikt:

```html
<!-- Vaste spacing (NxN vierkant) -->
<rr-spacer size="32"></rr-spacer>

<!-- Flexibele spacing (vult beschikbare ruimte) -->
<rr-spacer size="flexible"></rr-spacer>

<!-- Container-responsive spacing -->
<rr-spacer size="m" container="l"></rr-spacer>

<!-- Alleen horizontaal of verticaal -->
<rr-spacer size="16" direction="horizontal"></rr-spacer>
<rr-spacer size="16" direction="vertical"></rr-spacer>
```

**Beschikbare sizes:** 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 44, 48, 64, 80, 96, m, flexible

**Container-responsive 'm' size:**
- container="s" → 16x16px
- container="m" of "l" → 24x24px

---

## Padding klopt niet

1. Check Figma padding (kan asymmetrisch zijn!)
2. Pas aan in component CSS:
   ```css
   padding: {top}px {right}px {bottom}px {left}px;
   ```

## Gap klopt niet

1. Check Figma gap waarde
2. Pas aan in story container:
   ```css
   gap: {gap}px;
   ```

## Breedte/hoogte klopt niet

1. Check Figma sizing mode (hug vs fixed)
2. Bij fixed: voeg expliciete dimensies toe
3. Bij hug: verwijder vaste dimensies

## Font klopt niet

1. Check component-specifieke font token:
   ```css
   font: var(--components-{name}-{size}-font);
   ```

## Border radius klopt niet

1. Check semantics token:
   ```css
   border-radius: var(--semantics-controls-{size}-corner-radius);
   ```

## Color klopt niet

1. Converteer Figma RGBA naar hex/rgb
2. Zoek matching token in `dist/css/tokens.css`
3. Update component met correcte token

---

# Nieuwe Issues Toevoegen

Wanneer je tijdens verificatie een probleem tegenkomt dat **niet** in deze database staat:

## 1. Documenteer het issue

Voeg toe aan deze database met dit format:

```markdown
## Issue: [Korte beschrijving]

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

## 2. Locatie

Voeg het issue toe aan `/.claude/skills/pixel-perfect/known-issues.md`, gesorteerd op frequentie (meest voorkomende bovenaan).

## 3. Wanneer toevoegen

- Issue kwam meerdere keren voor tijdens verificatie
- Issue kostte significant tijd om te diagnosticeren
- Issue heeft een niet-voor-de-hand-liggende root cause
- Fix is niet intuïtief

## 4. Niet toevoegen

- Eenmalige typo's of simpele vergissingen
- Issues specifiek voor één component (documenteer in component file)
- Issues die al gedekt zijn door bestaande entries
