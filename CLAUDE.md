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

| Component          | Node ID   | Page                 | Status      |
| ------------------ | --------- | -------------------- | ----------- |
| Button             | 20:27     | Lists                | Implemented |
| Checkbox           | 236:41408 | Lists                | Implemented |
| Radio Button       | 236:41398 | Lists                | Implemented |
| Switch             | 236:41353 | Lists                | Implemented |
| Icon Button        | 240:1391  | Lists                | Implemented |
| Toggle Button      | 309:3542  | Inputs and Selectors | Implemented |
| Box                | -         | (utility component)  | Implemented |
| Menu Bar           | 48:2135   | Bars                 | Implemented |
| Menu Item          | 48:2135   | Bars                 | Implemented |
| Top Navigation Bar | 48:2135   | Bars                 | Implemented |
| Nav Logo           | 48:2135   | Bars                 | Implemented |
| Utility Menu Bar   | 48:2135   | Bars                 | Implemented |
| Back Button        | 48:2135   | Bars                 | Implemented |

**Note:** Box is a utility component without dedicated Figma frame - styling via design tokens.

### Button Component Specs (Reference)

De button component heeft de volgende Figma properties:

| Property          | Type    | Values                                                                            |
| ----------------- | ------- | --------------------------------------------------------------------------------- |
| style             | enum    | accent-filled, accent-outlined, accent-tinted, neutral-tinted, accent-transparent |
| size              | enum    | xs, s, m                                                                          |
| is-disabled       | boolean | true/false                                                                        |
| has-leading-icon  | boolean | true/false                                                                        |
| has-trailing-icon | boolean | true/false                                                                        |
| has-menu          | boolean | true/false (toont dropdown chevron)                                               |

**Size Specifications:**

| Size | Min Height | Font Token                    | Gap |
| ---- | ---------- | ----------------------------- | --- |
| xs   | 24px       | `--components-button-xs-font` | 2px |
| s    | 32px       | `--components-button-s-font`  | 2px |
| m    | 44px       | `--components-button-m-font`  | 4px |

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
:host([variant='primary']) {
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

## Code Quality & Automation

### Pre-commit Hooks

Dit project gebruikt pre-commit voor automatische code kwaliteitscontroles. De hooks draaien automatisch bij elke commit.

```bash
# Installeer pre-commit (eenmalig)
pip install pre-commit

# Installeer hooks voor dit project
pre-commit install

# Handmatig alle hooks draaien
pre-commit run --all-files
```

### Geïnstalleerde Hooks

| Hook                     | Doel                                      |
| ------------------------ | ----------------------------------------- |
| **ESLint**               | JavaScript code kwaliteit en consistentie |
| **Prettier**             | Code formatting (JS, JSON, CSS, MD)       |
| **commitlint**           | Conventional commits format check         |
| **check-json**           | JSON syntax validatie                     |
| **check-yaml**           | YAML syntax validatie                     |
| **trailing-whitespace**  | Verwijder trailing whitespace             |
| **end-of-file-fixer**    | Zorg voor newline aan einde van bestanden |
| **check-merge-conflict** | Detecteer merge conflict markers          |

### Commit Message Conventie

Dit project volgt [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: Nieuwe feature
- `fix`: Bug fix
- `docs`: Documentatie wijzigingen
- `style`: Code formatting (geen functionele wijzigingen)
- `refactor`: Code refactoring
- `test`: Tests toevoegen/wijzigen
- `chore`: Maintenance taken
- `perf`: Performance verbeteringen
- `a11y`: Accessibility verbeteringen

**Voorbeelden:**

```bash
feat(button): add accent-transparent variant
fix(checkbox): correct focus ring color
docs: update component-map.json with Figma links
a11y(menu-bar): add keyboard navigation support
```

### ESLint Configuratie

Het project gebruikt ESLint met de volgende regels:

- ES Modules support
- Web Components best practices
- Geen console.log in productie code
- Geen unused variables

### Prettier Configuratie

Formatting regels:

- 2 spaces indentation
- Single quotes voor JavaScript
- No trailing commas
- 100 character line width
- Unix line endings

## Component Implementation Instructions (for Claude)

When implementing a new component, follow this exact workflow:

### Step 1: Get Figma Specs

1. Look up component in `docs/component-map.json` for Figma node ID
2. Use Chrome browser tools (`mcp__claude-in-chrome__*`) to navigate to Figma URL
3. Click on the component to view Properties panel on the right
4. Document ALL properties: style, size, is-disabled, is-selected, etc.
5. Click on individual instances to get Layout specs (height, padding, gap, radius)
6. Note the exact token names used (visible in Properties panel)

### Step 2: Create Component Files

Create these files following the Button pattern in `src/components/button/`:

- `src/components/{name}/rr-{name}.js` - Component class
- `src/components/{name}/rr-{name}.stories.js` - Storybook stories

### Step 3: Implementation Requirements

- Extend `RRBaseComponent` from `../base/base-component.js`
- Use ONLY tokens from `dist/css/tokens.css` - NO hardcoded values
- Match Figma properties EXACTLY as HTML attributes
- Disabled opacity: `calc(var(--primitives-opacity-disabled, 38) / 100)`
- Focus ring: `var(--semantics-focus-ring-thickness)` and `var(--semantics-focus-ring-color)`
- Size tokens: `var(--semantics-controls-{xs|s|m}-min-size)`
- Corner radius: `var(--semantics-controls-{xs|s|m}-corner-radius)`

### Step 4: Update Documentation

- Update `docs/component-map.json`: set status to "implemented", add properties
- Update Figma node ID if discovered to be different
- Add component spec table to this file (CLAUDE.md) under the Figma Node IDs section

### Step 5: Verify

- Compare Storybook output with Figma screenshot
- Ensure all variants and states match

### Available Component Tokens

```css
/* Checkbox */
--components-checkbox-border-thickness: 2px --components-checkbox-border-color: #475569
    --components-checkbox-background-color: #ffffff
    --components-checkbox-is-selected-background-color: #154273
    --components-checkbox-is-selected-icon-color: #ffffff /* Radio Button */
    --components-radio-button-border-thickness: 2px --components-radio-button-border-color: #475569
    --components-radio-button-background-color: #ffffff
    --components-radio-button-is-selected-background-color: #154273
    --components-radio-button-is-selected-inner-shape-border-thickness: 2px
    --components-radio-button-is-selected-inner-shape-border-color: #ffffff /* Switch */
    --components-switch-border-thickness: 2px --components-switch-border-color: #475569
    --components-switch-background-color: #ffffff --components-switch-thumb-border-thickness: 2px
    --components-switch-thumb-border-color: #475569
    --components-switch-thumb-background-color: #ffffff --components-switch-icon-color: #475569
    --components-switch-is-selected-background-color: #154273
    --components-switch-is-selected-thumb-background-color: #ffffff
    --components-switch-is-selected-icon-color: #154273 /* Toggle Button */
    --components-toggle-button-content-color: #0f172a
    --components-toggle-button-background-color: #e2e8f0
    --components-toggle-button-is-hovered-background-color: #cbd5e1
    --components-toggle-button-is-hovered-content-color: #0f172a
    --components-toggle-button-is-selected-background-color: #154273
    --components-toggle-button-is-selected-content-color: #ffffff /* Icon Button */
    --components-icon-button-font: 600 14px/1.125 RijksSansVF,
  system-ui /* Box */ --components-box-background-color: #f1f5f9
    --components-box-corner-radius: 11px --components-box-padding: 16px /* Menu Bar */
    --components-menu-bar-menu-item-color: #154273 --components-menu-bar-menu-item-font: 600
    18px/1.125 RijksSansVF,
  system-ui --components-menu-bar-menu-item-is-selected-indicator-color: #154273
    --components-menu-bar-menu-item-is-selected-indicator-height: 4px
    --components-menu-bar-menu-item-is-hovered-indicator-color: #e2e8f0
    --components-menu-bar-menu-item-is-hovered-indicator-height: 32px
    --components-menu-bar-title-item-s-font: 600 18px/1.125 RijksSansVF,
  system-ui --components-menu-bar-title-item-m-font: 600 20px/1.125 RijksSansVF,
  system-ui --components-menu-bar-title-item-l-font: 600 23px/1.125 RijksSansVF, system-ui;
```
