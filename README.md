# RegelRecht Design System

Design tokens en Web Components voor Nederlandse Overheid webapplicaties.

## Architectuur

```
Figma (single source of truth)
    ↓
variables2json plugin
    ↓
tokens/rr-tokens.json
    ↓
Style Dictionary (custom parser)
    ↓
dist/css/tokens.css
    ↓
Web Components
```

## Quickstart

```bash
# Dependencies installeren
npm install

# Tokens bouwen
npm run build:tokens

# Development server starten
npm run serve

# Open http://localhost:3000 voor de styleguide
```

## Gebruik

### 1. Laad de tokens CSS

```html
<link rel="stylesheet" href="dist/css/tokens.css">
```

### 2. Importeer componenten

```html
<script type="module">
  import './src/components/button/rr-button.js';
</script>
```

### 3. Gebruik componenten

```html
<rr-button variant="accent-filled">Primary Action</rr-button>
<rr-button variant="accent-outlined">Secondary Action</rr-button>
<rr-button variant="neutral-tinted" size="s">Small Button</rr-button>
```

## Componenten

### rr-button

| Attribuut | Type | Default | Beschrijving |
|-----------|------|---------|--------------|
| `variant` | string | `accent-filled` | `accent-filled`, `accent-outlined`, `accent-tinted`, `neutral-tinted`, `accent-transparent` |
| `size` | string | `m` | `xs`, `s`, `m` |
| `disabled` | boolean | `false` | Disabled state |
| `type` | string | `button` | `button`, `submit`, `reset` |

## Token Structuur

Tokens zijn georganiseerd in drie lagen:

- **Primitives** - Basis waarden (kleuren, spacing, typography)
- **Semantics** - Betekenisvolle tokens (buttons, controls, views)
- **Components** - Component-specifieke tokens

```css
/* Primitives */
--primitives-color-accent-100: #154273;
--primitives-space-16: 16px;

/* Semantics */
--semantics-buttons-accent-filled-background-color: #154273;
--semantics-controls-m-min-size: 44px;

/* Components */
--components-button-m-font: 600 18px/1.125 RijksSansVF, system-ui;
```

## Development

### Tokens updaten

1. Exporteer tokens uit Figma met de variables2json plugin
2. Plaats het bestand als `tokens/rr-tokens.json`
3. Run `npm run build:tokens`

### Nieuwe component maken

1. Maak een directory in `src/components/{component-name}/`
2. Maak `rr-{component-name}.js` met de component class
3. Extend `RRBaseComponent` voor gedeelde functionaliteit
4. Registreer met `customElements.define()`

Zie `CLAUDE.md` voor conventies en richtlijnen.

## Licentie

EUPL-1.2
