# RegelRecht Design System

Design tokens en Web Components voor RegelRecht.

## Installation

### Via npm (GitHub Packages)

1. Add `.npmrc` to your project for GitHub Packages authentication:

```
@minbzk:registry=https://npm.pkg.github.com
```

2. Authenticate with GitHub Packages (one-time setup):

```bash
npm login --registry=https://npm.pkg.github.com
# Use your GitHub username and a personal access token with `read:packages` scope
```

3. Install the package:

```bash
npm install @minbzk/storybook
```

### Usage

**Important:** You must import the CSS tokens for proper styling.

```javascript
// Import CSS tokens (required for styling)
import '@minbzk/storybook/css';

// Import all components
import '@minbzk/storybook';

// Or import specific components
import { RRButton, RRCheckbox, RRSwitch } from '@minbzk/storybook';
```

```html
<!-- Use in HTML -->
<rr-button variant="accent-filled">Click me</rr-button>
<rr-checkbox label="Accept terms"></rr-checkbox>
<rr-switch label="Enable notifications"></rr-switch>
```

## Storybook

View the live component documentation: **https://minbzk.github.io/storybook/**

## Architectuur

```
src/assets/styles/settings.css (CSS custom properties)
	↓
dist/css/tokens.css
	↓
Web Components (Lit)
```

## Quickstart

```bash
# Dependencies installeren
npm install

# Tokens bouwen
npm run build:tokens

# Storybook starten
npm run storybook

# Open http://localhost:6006 voor de component documentatie
```

## Gebruik

### 1. Laad de tokens CSS

```html
<link rel="stylesheet" href="dist/css/tokens.css" />
```

### 2. Importeer componenten

```html
<script type="module">
  import './src/components/actions/button/rr-button.ts';
</script>
```

### 3. Gebruik componenten

```html
<rr-button variant="primary">Primary Action</rr-button>
<rr-button variant="secondary">Secondary Action</rr-button>
<rr-button size="sm">Small Button</rr-button>
```

## Componenten

### rr-button

| Attribuut       | Type    | Default          | Beschrijving                                                                                                                                              |
| --------------- | ------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`       | string  | `neutral-tinted` | `primary`, `secondary`, `destructive`, `accent-filled`, `accent-outlined`, `accent-transparent`, `neutral-tinted`, `neutral-transparent`, `danger-tinted` |
| `size`          | string  | `md`             | `xs`, `sm`, `md`                                                                                                                                          |
| `disabled`      | boolean | `false`          | Disabled state                                                                                                                                            |
| `type`          | string  | `button`         | `button`, `submit`, `reset`                                                                                                                               |
| `full-width`    | boolean | `false`          | Stretches button to fill container width                                                                                                                  |
| `is-expandable` | boolean | `false`          | Adds an icon indicating the button opens a menu or popover                                                                                                |
| `popovertarget` | string  | `''`             | ID of the popover element to target                                                                                                                       |

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
--semantics-controls-md-min-size: 44px;

/* Components */
--components-button-md-font: 600 18px/1.125 RijksSansVF, system-ui;
```

## Development

### Tokens updaten

1. Bewerk `src/assets/styles/settings.css`
2. Run `npm run build:tokens`

### Nieuwe component maken

1. Maak een directory in `src/components/{category}/{component-name}/`
2. Maak de volgende bestanden aan:
   - `rr-{component-name}.ts` — component class (extends `LitElement`)
   - `rr-{component-name}.styles.ts` — component styles
   - `rr-{component-name}.template.ts` — render template
   - `rr-{component-name}.stories.ts` — Storybook stories
   - `rr-{component-name}.test.ts` — unit tests
3. Exporteer de component class in `src/index.ts`

Zie `CLAUDE.md` voor conventies en richtlijnen.

## Licentie

EUPL-1.2
