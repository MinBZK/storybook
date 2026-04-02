---
name: component
description: Implementeer een Lit + TypeScript web component
user-invocable: true
argument-hint: <component-naam>
---

Implementeer een web component: $ARGUMENTS

## Tech Stack

| Aspect | Technologie |
|--------|-------------|
| **Framework** | [Lit](https://lit.dev/) (LitElement) |
| **Taal** | TypeScript (`.ts`) |
| **Component bestand** | `src/components/{name}/rr-{name}.ts` |
| **Stories bestand** | `src/components/{name}/rr-{name}.stories.js` |
| **Referentie** | `src/components/inputs/toggle-button/rr-toggle-button.ts` |

**BELANGRIJK:** Componenten worden ALTIJD geschreven in Lit + TypeScript. Gebruik de toggle-button als referentie implementatie.

---

## WORKFLOW

### Stap 1: Input Parsing

**Bepaal component naam:**
1. Als gebruiker naam opgaf → gebruik die
2. Converteer naar kebab-case: "Toggle Button" → "toggle-button"
3. Voeg `rr-` prefix toe: → "rr-toggle-button"

### Stap 2: Bestaand Component Check

Lees `docs/component-map.json` en check of component al bestaat.

| Situatie | Mode |
|----------|------|
| Component bestaat niet | **CREATE** - nieuwe bestanden aanmaken |
| Component bestaat al | **UPDATE** - bestaande bestanden bijwerken |

### Stap 3: Tokens Identificeren

**Token hiërarchie (voorkeursvolgorde):**
1. `--components-{name}-*` (component-specifiek)
2. `--semantics-*` (betekenisvol)
3. `--primitives-*` (alleen als backup)

**Zoek tokens in `src/assets/styles/settings.css`:**
```bash
grep -i "{component-naam}" src/assets/styles/settings.css
grep -i "controls.*min-size" src/assets/styles/settings.css
```

**Controleer ook bestaande componenten voor patronen:**
- `src/components/inputs/toggle-button/rr-toggle-button.ts` (referentie implementatie)

### Spacer Component Gebruik

**Gebruik `<rr-spacer>` voor spacing in componenten waar spacer elementen nodig zijn.**

```html
<!-- Vaste spacing -->
<rr-spacer size="32"></rr-spacer>

<!-- Flexibele spacing (vult beschikbare ruimte) -->
<rr-spacer size="flexible"></rr-spacer>

<!-- Container-responsive spacing -->
<rr-spacer size="m" container="l"></rr-spacer>
```

**Beschikbare sizes:** 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 44, 48, 64, 80, 96, m, flexible

### Stap 4: Component Genereren/Updaten

**Bestanden:**
- Component: `src/components/{name}/rr-{name}.ts` (TypeScript)
- Stories: `src/components/{name}/rr-{name}.stories.js` (JavaScript)

---

## COMPONENT TEMPLATE (Lit + TypeScript)

**Locatie:** `src/components/{name}/rr-{name}.ts`

```typescript
/**
 * RegelRecht {DisplayName} Component (Lit + TypeScript)
 *
 * @element rr-{name}
 * @attr {string} size - Component size: 'xs' | 'sm' | 'md' (default: 'md')
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

type Size = 'xs' | 'sm' | 'md';

@customElement('rr-{name}')
export class RR{PascalName} extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-body);
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

    /* Size variants - ZOEK TOKENS OP in src/assets/styles/settings.css */
    :host([size="xs"]) .{name} {
      min-height: var(--semantics-controls-xs-min-size);
      border-radius: var(--semantics-controls-xs-corner-radius);
      /* padding en font: haal uit design tokens */
    }

    :host([size="sm"]) .{name} {
      min-height: var(--semantics-controls-sm-min-size);
      border-radius: var(--semantics-controls-sm-corner-radius);
    }

    :host([size="md"]) .{name},
    :host(:not([size])) .{name} {
      min-height: var(--semantics-controls-md-min-size);
      border-radius: var(--semantics-controls-md-corner-radius);
    }

    /* Focus state */
    .{name}:focus-visible {
      outline: var(--semantics-focus-ring-thickness) solid var(--semantics-focus-ring-color);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) .{name} {
      opacity: var(--primitives-opacity-disabled);
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
  size: Size = 'md';

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
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: { size: 'md', disabled: false },
  render: (args) => html`<rr-{name} size=${args.size} ?disabled=${args.disabled}>Label</rr-{name}>`,
};
```

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

**Zoek ALTIJD actuele token waarden op in `src/assets/styles/settings.css`:**

```bash
grep -i "{component-naam}" src/assets/styles/settings.css
grep -i "controls.*min-size\|controls.*corner-radius" src/assets/styles/settings.css
grep -i "focus-ring" src/assets/styles/settings.css
grep -i "primitives-space" src/assets/styles/settings.css
grep -i "opacity" src/assets/styles/settings.css
```

**LET OP:** Opacity tokens zijn decimale fracties (0-1). Gebruik: `var(--token)`

---

## FORMATTING REGELS

Er is geen automatische formatter. Volg deze regels handmatig.

### Algemeen
- Gebruik **tabs** voor indentatie
- Enkele aanhalingstekens voor strings
- Puntkomma's aan einde van statements
- Trailing comma's in objecten en arrays

### HTML
- Gebruik HTML, niet XHTML: `>` niet `/>` voor void elements:
```html
<!-- GOED -->
<input class="checkbox__input" type="checkbox">
<hr class="divider">

<!-- FOUT — geen XHTML self-closing -->
<input class="checkbox__input" type="checkbox" />
<hr class="divider" />
```

### CSS (`.styles.ts` en `.css`)
- Property waarden altijd op **één regel**, ook als ze lang zijn
- Sorteer rules per element; houd alle gedrag voor een element bij elkaar
- Gebruik **CSS nesting** voor `@container` en `@media` varianten — nest ze in de element rule block
- Declareer CSS variable defaults in `:host`, nooit als fallback: `var(--_foo)` niet `var(--_foo, 100)`
- Gebruik **nooit** flex shorthand (`flex: 1`), schrijf altijd de losse properties
- Level 1 headings (`/* # Section */`): 2 lege regels ervoor, 1 erna
- Level 2 headings (`/* ## Subsection */`): 1 lege regel ervoor en erna
- BEM voor blocks/elements; gebruik state classes (`.is-dragging`) niet BEM modifiers voor state

```css
/* GOED */
outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);

/* FOUT — niet afbreken */
outline: var(--semantics-focus-ring-edge-thickness) double
	var(--semantics-focus-ring-edge-color);
```

```css
/* GOED — CSS nesting */
.button {
	display: inline-flex;
	min-height: var(--_min-height);

	@container (min-width: 641px) {
		padding: var(--_md-padding);
	}
}

/* FOUT — niet nesten */
.button {
	display: inline-flex;
}
@container (min-width: 641px) {
	.button {
		padding: var(--_md-padding);
	}
}
```

```css
/* GOED — defaults in :host */
:host {
	--_min-height: var(--semantics-controls-md-min-size);
}
.button {
	min-height: var(--_min-height);
}

/* FOUT — fallback in var() */
.button {
	min-height: var(--_min-height, 44px);
}
```

```css
/* GOED — state class */
.list-item.is-dragging { opacity: 0.5; }

/* FOUT — BEM modifier voor state */
.list-item--dragging { opacity: 0.5; }
```

```css
/* GOED — geen flex shorthand */
flex-grow: 1;
flex-shrink: 0;

/* FOUT */
flex: 1 0 auto;
```

### Templates (`.template.ts`)
- `class` attribuut op **dezelfde regel** als het element
- Elementen met één attribuut (naast `class`) blijven op één regel
- `<slot>` elementen zijn altijd compact
- Alle overige attributen op **eigen regels**:
```html
<!-- GOED — meerdere attributen -->
<input class="checkbox__input"
	type="checkbox"
	.checked=${component.checked}
	?disabled=${component.disabled}
	@change=${component._handleChange}
>

<!-- GOED — één attribuut naast class, past op één regel -->
<div class="checkbox__box" aria-hidden="true">

<!-- GOED — slot is altijd compact -->
<slot></slot>
<slot name="header"></slot>

<!-- GOED — kort element -->
<ndd-icon class="checkbox__icon" name="check-mark-small"></ndd-icon>

<!-- FOUT — class op aparte regel -->
<input
	class="checkbox__input"
	type="checkbox"
>
```

### Stories (`.stories.ts` en `.stories.js`)
- Alle attributen van een element op **één regel**:
```html
<!-- GOED -->
<ndd-button variant="primary" size="md" text="Opslaan" ?disabled=${args.disabled}></ndd-button>

<!-- FOUT — niet opsplitsen in stories -->
<ndd-button
	variant="primary"
	size="md"
	text="Opslaan"
></ndd-button>
```

---

## CHECKLIST

**Tokens:**
- [ ] Semantics tokens waar mogelijk
- [ ] Geen fallback waarden op design tokens (enige uitzondering: override hooks `--rr-*`)
- [ ] Opacity: `var(--token)`

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
- [ ] Component visueel gecontroleerd in Storybook
