# RegelRecht Design System - Claude Code Instructies

Dit document beschrijft de conventies voor het genereren en aanpassen van Web Components in het RegelRecht design system.

## Project Context

- **Doel:** Design system voor Nederlandse Overheid (Rijksoverheid) webapplicaties
- **Technologie:** Vanilla Web Components (geen framework)
- **Tokens:** Figma design tokens getransformeerd via Style Dictionary
- **Taal:** Nederlands voor user-facing content, Engels voor code
- **Single Source of Truth:** Figma (file key: `5DyHMXUNVxbgH7ZjhQxPZe`)

## Figma Integratie

### Figma MCP Server

De Figma MCP server is geconfigureerd voor directe toegang tot designs. **BELANGRIJK:** Bij het implementeren van nieuwe components:

1. **ALTIJD eerst het Figma design ophalen** met `mcp__figma__get_screenshot` en `mcp__figma__get_design_context`
2. **Wacht bij rate limits** - wacht 60-120 seconden en probeer opnieuw
3. **Gebruik de component-map.json** om de juiste Figma node IDs te vinden

### Workflow voor nieuwe component

```
1. Zoek component in docs/component-map.json voor Figma node ID
2. Haal screenshot op: mcp__figma__get_screenshot(fileKey, nodeId)
3. Haal design context op: mcp__figma__get_design_context(fileKey, nodeId)
4. Analyseer het design: spacing, kleuren, typography, states
5. Match met beschikbare tokens uit tokens/rr-tokens.json
6. Implementeer component volgens de design specs
7. Update docs/component-map.json met implementation details
```

### Figma Node IDs (zie docs/component-map.json voor volledig overzicht)

| Component | Node ID | Status |
|-----------|---------|--------|
| Button | 20-27 | Implemented |
| Checkbox | 236:41408 | Planned |
| Radio Button | 236:41398 | Planned |
| Switch | 236:41353 | Planned |
| Icon Button | 240:1391 | Planned |

### Button Component Specs (Reference)

De button component heeft de volgende Figma properties:

| Property | Type | Values |
|----------|------|--------|
| style | enum | accent-filled, accent-outlined, accent-tinted, neutral-tinted, accent-transparent |
| size | enum | xs, s, m |
| is-disabled | boolean | true/false |
| has-leading-icon | boolean | true/false |
| has-trailing-icon | boolean | true/false |
| has-menu | boolean | true/false (toont dropdown chevron) |

**Size Specifications:**

| Size | Min Height | Font Token | Gap |
|------|------------|------------|-----|
| xs | 24px | `--components-button-xs-font` | 2px |
| s | 32px | `--components-button-s-font` | 2px |
| m | 44px | `--components-button-m-font` | 4px |

**Disabled State:** Gebruik `--primitives-opacity-disabled` (38%) voor disabled opacity.

### Rate Limits

De Figma MCP heeft rate limits. Bij een rate limit error:
- Wacht minimaal 60 seconden
- Probeer dan opnieuw
- Als het blijft falen, wacht 5 minuten

## Token Pipeline

```
Figma → variables2json plugin → tokens/rr-tokens.json → Style Dictionary → dist/css/tokens.css
```

### Token Structuur

Design tokens volgen een drie-lagen architectuur:

1. **Primitives** (`--primitives-*`): Basis waarden (colors, space, typography)
2. **Semantics** (`--semantics-*`): Betekenisvolle tokens (buttons, controls, input-fields)
3. **Components** (`--components-*`): Component-specifieke tokens

### Token Naming Conventies

```css
/* Primitives */
--primitives-color-accent-100
--primitives-space-16
--primitives-font-size-body-m

/* Semantics */
--semantics-buttons-accent-filled-background-color
--semantics-controls-m-min-size
--semantics-focus-ring-color

/* Components */
--components-button-m-font
--components-checkbox-border-color
```

## Component Structuur

### Bestandslocaties

```
src/components/
  {component-name}/
    rr-{component-name}.js      # Component class
    rr-{component-name}.test.js # Tests (optioneel)
```

### Class Structuur Template

```javascript
/**
 * RegelRecht {ComponentName} Component
 *
 * @element rr-{component-name}
 * @attr {type} attribute-name - Description
 *
 * @slot - Default slot description
 * @slot named-slot - Named slot description
 *
 * @csspart part-name - Part description
 * @cssprop --rr-{component}-property - Override description
 */

import { RRBaseComponent } from '../base/base-component.js';

export class RR{ComponentName} extends RRBaseComponent {
  static componentName = 'rr-{component-name}';

  static get observedAttributes() {
    return [...super.observedAttributes, /* component-specific attrs */];
  }

  constructor() {
    super();
  }

  // Getters/setters for attributes

  _getStyles() {
    return `/* CSS here */`;
  }

  render() {
    this.shadowRoot.innerHTML = `/* HTML here */`;
  }
}

customElements.define('rr-{component-name}', RR{ComponentName});
```

## Styling Conventies

### 1. Gebruik altijd semantic tokens waar beschikbaar

```css
/* GOED */
.button {
  background-color: var(--semantics-buttons-accent-filled-background-color);
  min-height: var(--semantics-controls-m-min-size);
}

/* FOUT - directe primitives voor semantische doeleinden */
.button {
  background-color: var(--primitives-color-accent-100);
}
```

### 2. Fallback naar primitives alleen als geen semantic token bestaat

```css
.custom-element {
  gap: var(--primitives-space-8); /* Geen semantic gap token */
}
```

### 3. Private CSS variables met underscore prefix

```css
:host([variant="primary"]) {
  --_bg-color: var(--semantics-buttons-accent-filled-background-color);
  --_text-color: var(--semantics-buttons-accent-filled-color);
}
```

## Accessibility Vereisten

1. **Focus states:** Altijd `--semantics-focus-ring-*` tokens gebruiken
2. **ARIA:** Correcte `role`, `aria-*` attributen
3. **Keyboard:** Volledig keyboard-navigeerbaar

```javascript
render() {
  return `
    <button
      role="button"
      aria-disabled="${this.disabled}"
    >
      ...
    </button>
  `;
}
```

## Varianten en Sizes

### Standaard Sizes
- `xs` - Extra small (24px min-height)
- `s` - Small (32px min-height)
- `m` - Medium (44px min-height, default)

### Variant Implementatie

```css
:host([variant="accent-filled"]) .element { ... }
:host([variant="accent-outlined"]) .element { ... }
:host([size="s"]) .element { ... }
:host([size="m"]) .element { ... }
```

## Build Commando's

```bash
# Tokens bouwen
npm run build:tokens

# Development server
npm run serve

# Volledige build
npm run build
```

## Rijksoverheid Specifiek

### Fonts
- **Body:** RijksSansVF (met system-ui fallback)

### Kleuren
- **Accent:** Lintblauw (#154273) - voor interactieve elementen
- **Danger:** Rood (#D52B1E) - voor destructieve acties
- **Success:** Groen (#39870C) - voor bevestigingen

### Toegankelijkheid
DigiToegankelijk (WCAG 2.1 AA) compliance is verplicht.

## Wat NIET te doen

1. **GEEN** inline styles in JavaScript
2. **GEEN** hardcoded kleuren of waarden
3. **GEEN** !important
4. **GEEN** external dependencies zonder toestemming
5. **GEEN** frameworks - alleen vanilla Web Components
