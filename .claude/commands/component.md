---
description: Implementeer een Lit + TypeScript web component vanuit Figma design
argument-hint: <figma-node-id> [component-naam]
---

Implementeer een web component voor Figma node: $ARGUMENTS

## Tech Stack

| Aspect | Technologie |
|--------|-------------|
| **Framework** | [Lit](https://lit.dev/) (LitElement) |
| **Taal** | TypeScript (`.ts`) |
| **Component bestand** | `src/components/{name}/rr-{name}.ts` |
| **Stories bestand** | `src/components/{name}/rr-{name}.stories.js` |
| **Referentie** | `src/components/toggle-button/rr-toggle-button.ts` |

**BELANGRIJK:** Componenten worden ALTIJD geschreven in Lit + TypeScript. Gebruik de toggle-button als referentie implementatie.

---

## WORKFLOW

### Stap 1: Input Parsing

**Extraheer node ID:**
```javascript
// Uit URL: ...node-id=309-3542 of ...node-id=309:3542
// Direct: 309:3542 of 309-3542
// Normaliseer naar: 309:3542 (met dubbele punt)
```

**Bepaal component naam:**
1. Als gebruiker naam opgaf (tweede argument) → gebruik die
2. Anders → haal uit Figma node `name` property
3. Converteer naar kebab-case: "Toggle Button" → "toggle-button"
4. Voeg `rr-` prefix toe: → "rr-toggle-button"

### Stap 2: Bestaand Component Check

Lees `docs/component-map.json` en check of nodeId al bestaat:

```javascript
const existing = componentMap.components.find(c =>
  c.figma?.nodeId?.replace(':', '-') === normalizedNodeId
);
```

| Situatie | Mode |
|----------|------|
| Component bestaat niet | **CREATE** - nieuwe bestanden aanmaken |
| Component bestaat al | **UPDATE** - bestaande bestanden bijwerken |

### Stap 3: Figma Data Ophalen

Gebruik de Figma MCP tool:
```
mcp__figma-with-token__get_figma_data(fileKey: "5DyHMXUNVxbgH7ZjhQxPZe", nodeId: "<node-id>")
```

**Analyseer:**
- Sizes (xs, s, m)
- States (default, hover, active, focus, disabled)
- Padding (LET OP: kan asymmetrisch zijn!)
- Typography
- Colors
- Border radius
- Shadows

### Stap 4: Tokens Identificeren

**Token hiërarchie (voorkeursvolgorde):**
1. `--components-{name}-*` (component-specifiek)
2. `--semantics-*` (betekenisvol)
3. `--primitives-*` (alleen als backup)

**Zoek tokens in `dist/css/tokens.css`:**
```bash
grep -i "{component-naam}" dist/css/tokens.css
grep -i "controls.*min-size" dist/css/tokens.css
```

**Controleer ook bestaande componenten voor patronen:**
- `src/components/toggle-button/rr-toggle-button.ts` (referentie implementatie)

### Stap 5: Component Genereren/Updaten

**Bestanden:**
- Component: `src/components/{name}/rr-{name}.ts` (TypeScript)
- Stories: `src/components/{name}/rr-{name}.stories.js` (JavaScript)

### Stap 6: Pixel-Perfect Maken

**Na het genereren van het component, voer `/pixel-perfect {name}` uit.**

Dit command doet automatisch:
1. Start Storybook
2. Opent FigmaComparison story met Playwright
3. Haalt Figma layout data op (grid/flex/absolute positioning)
4. Vergelijkt varianten, positionering en styling
5. Past component en/of story aan bij afwijkingen
6. Herhaalt tot pixel-perfect (max 8 iteraties)

---

## COMPONENT TEMPLATE (Lit + TypeScript)

**Locatie:** `src/components/{name}/rr-{name}.ts`

```typescript
/**
 * RegelRecht {DisplayName} Component (Lit + TypeScript)
 *
 * @element rr-{name}
 * @attr {string} size - Component size: 'xs' | 's' | 'm' (default: 'm')
 * @attr {boolean} disabled - Disabled state
 *
 * @slot - Default slot for content
 *
 * @fires {event-name} - Description of event (detail: { ... })
 *
 * @csspart {part-name} - Description of CSS part
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'xs' | 's' | 'm';

@customElement('rr-{name}')
export class RR{PascalName} extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .{name} {
      /* Reset */
      appearance: none;
      border: none;
      margin: 0;
      padding: 0;
      background: none;
      font: inherit;
      cursor: pointer;

      /* Layout */
      display: inline-flex;
      align-items: center;
      justify-content: center;

      /* Animation */
      transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;
    }

    .{name}:active:not(:disabled) {
      transform: scale(0.98);
    }

    /* Size variants - ZOEK TOKENS OP in dist/css/tokens.css */
    :host([size="xs"]) .{name} {
      min-height: var(--semantics-controls-xs-min-size);
      border-radius: var(--semantics-controls-xs-corner-radius);
      /* padding en font: haal uit Figma */
    }

    :host([size="s"]) .{name} {
      min-height: var(--semantics-controls-s-min-size);
      border-radius: var(--semantics-controls-s-corner-radius);
    }

    :host([size="m"]) .{name},
    :host(:not([size])) .{name} {
      min-height: var(--semantics-controls-m-min-size);
      border-radius: var(--semantics-controls-m-corner-radius);
    }

    /* Focus state */
    .{name}:focus-visible {
      outline: var(--semantics-focus-ring-thickness) solid var(--semantics-focus-ring-color);
      outline-offset: 2px;
    }

    /* Disabled state - opacity is PERCENTAGE */
    :host([disabled]) .{name} {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .{name} {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .{name}:focus-visible {
        outline: 2px solid CanvasText !important;
        outline-offset: 2px !important;
      }
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'm';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  override render() {
    return html`
      <button
        class="{name}"
        part="{name}"
        type="button"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled}
        tabindex=${this.disabled ? -1 : 0}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-{name}': RR{PascalName};
  }
}
```

---

## STORY TEMPLATE

**Locatie:** `src/components/{name}/rr-{name}.stories.js`

```javascript
import { html } from 'lit';
import './rr-{name}.js';

export default {
  title: 'Components/{DisplayName}',
  component: 'rr-{name}',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id={nodeId}',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 's', 'm'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: { size: 'm', disabled: false },
  render: (args) => html`<rr-{name} size=${args.size} ?disabled=${args.disabled}>Label</rr-{name}>`,
};
```

---

## FIGMA COMPARISON STORY

**BELANGRIJK:** De FigmaComparison story moet expliciete dimensies hebben voor Side-by-Side mode.

### Stap 1: Extraheer dimensies uit Figma data

Analyseer de `globalVars.styles` sectie uit de Figma MCP response:

```javascript
// Zoek de layout style van de component set (bijv. layout_G8J7XL)
globalVars.styles.layout_XXXXX = {
  mode: "column" | "row",  // → flex-direction
  gap: 16,                 // → gap in px
  padding: 16,             // → padding in px (kan ook object zijn)
  sizing: {
    horizontal: "hug" | "fixed",
    vertical: "hug" | "fixed"
  },
  dimensions: {            // alleen bij fixed sizing
    width: 832,
    height: 316
  }
}
```

### Stap 2: Bereken totale frame dimensies

**Voor "hug" sizing (meeste component sets):**

```
Height = padding-top + Σ(child heights) + Σ(gaps) + padding-bottom
Width = padding-left + max(child widths) + padding-right
```

**Voorbeeld Toggle Button (309:3542):**
```
Layout: column, gap: 16px, padding: 16px
Children: md (44px), md selected (44px), sm (32px), sm selected (32px)
Height: 16 + 44 + 16 + 44 + 16 + 32 + 16 + 32 + 16 = 232px
Width: 16 + ~120px button + 16 = ~152px
```

**Voor "fixed" sizing:**
Gebruik de `dimensions.width` en `dimensions.height` direct.

### Stap 3: Genereer de FigmaComparison story

```javascript
// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our {name}s (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="{nodeId}" style="display: inline-block;">
        <!--
          Figma {component-name} ({nodeId}) component set:
          - Layout: {direction}, gap: {gap}px, padding: {padding}px
          - Variants: {beschrijf alle varianten met hun heights}
          - Height: {berekeningsformule} = {total}px
          - Width: {berekeningsformule} = {total}px
        -->
        <div style="width: {width}px; height: {height}px; background: #ffffff; padding: {padding}px; box-sizing: border-box; display: flex; flex-direction: {direction}; gap: {gap}px; align-items: flex-start;">
          <!-- Genereer EXACT de varianten uit Figma, in dezelfde volgorde -->
          <rr-{name} size="m">Label</rr-{name}>
          <rr-{name} size="m" selected>Label</rr-{name}>
          <rr-{name} size="s">Label</rr-{name}>
          <rr-{name} size="s" selected>Label</rr-{name}>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
```

### Checklist FigmaComparison

- [ ] **Expliciete width EN height** op de container div
- [ ] **Exact dezelfde varianten** als in Figma (aantal, volgorde, props)
- [ ] **Comment met specs** zodat dimensies later makkelijk te updaten zijn
- [ ] **flex-direction** matcht Figma layout mode (column/row)
- [ ] **gap en padding** matchen exact de Figma waarden
- [ ] **align-items: flex-start** voor "hug" width items

---

## EXPORTS UPDATEN (alleen bij CREATE mode)

**Bestand:** `src/components/index.ts`

```typescript
export { RR{PascalName} } from './{name}/rr-{name}.js';
```

---

## COMPONENT-MAP UPDATEN

**Bestand:** `docs/component-map.json`

Voeg nieuwe entry toe of update bestaande met `lastUpdated`.

---

## TOKENS OPZOEKEN

**Zoek ALTIJD actuele token waarden op in `dist/css/tokens.css`:**

```bash
grep -i "{component-naam}" dist/css/tokens.css
grep -i "controls.*min-size\|controls.*corner-radius" dist/css/tokens.css
grep -i "focus-ring" dist/css/tokens.css
grep -i "primitives-space" dist/css/tokens.css
grep -i "opacity" dist/css/tokens.css
```

**LET OP:** Opacity tokens zijn percentages (0-100). Gebruik: `calc(var(--token) / 100)`

---

## CHECKLIST

**Figma:**
- [ ] Node ID correct geparsed
- [ ] Alle sizes geanalyseerd
- [ ] Padding waarden (kan asymmetrisch zijn!)
- [ ] Alle states: default, hover, active, focus, disabled

**Tokens:**
- [ ] Semantics tokens waar mogelijk
- [ ] Alle CSS vars hebben fallback waarden
- [ ] Opacity: `calc(token / 100)`

**Accessibility:**
- [ ] ARIA attributes
- [ ] Keyboard navigation
- [ ] `@media (prefers-reduced-motion)`
- [ ] `@media (forced-colors: active)`

**Code:**
- [ ] TypeScript types correct
- [ ] `declare global` block
- [ ] Private methods met underscore

**Verificatie:**
- [ ] Storybook gestart
- [ ] FigmaComparison geopend
- [ ] Pixel-perfect OF afwijkingen gedocumenteerd

---

## FIGMA FILE INFO

- **File Key:** `5DyHMXUNVxbgH7ZjhQxPZe`
- **MCP Tool:** `mcp__figma-with-token__get_figma_data`
