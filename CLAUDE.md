# RegelRecht Design System

Vanilla Web Components for Dutch Government (Rijksoverheid) apps. Single source of truth: **Figma** (`5DyHMXUNVxbgH7ZjhQxPZe`).

## Quick Reference

```bash
npm run storybook        # Dev server at localhost:6006
npm run build:tokens     # Rebuild design tokens
npm run build            # Full build
```

## Gotchas

**Asymmetric Padding:** Figma uses different top/bottom padding. Check Properties panel for each value:
```css
/* Button S-size: top=8, right=8, bottom=6, left=8 */
padding: 8px 8px 6px 8px;  /* NOT symmetric! */
```

**Figma MCP Rate Limits:** Wait 60-120s on error. Workaround: open Figma in browser, click component, read Properties panel directly.

**Disabled Opacity:** Always use `calc(var(--primitives-opacity-disabled, 38) / 100)` - the token is a percentage.

## Token Hierarchy

```
Primitives (--primitives-*)  →  base values (colors, space)
Semantics (--semantics-*)    →  meaningful (buttons, controls)
Components (--components-*)  →  component-specific
```

Always prefer semantic tokens. Only use primitives when no semantic exists.

## Component Structure

```
src/components/{name}/
  rr-{name}.js           # Component class extending RRBaseComponent
  rr-{name}.stories.js   # Storybook stories
```

## FigmaComparison Stories

Each component has a `FigmaComparison` story using `ftl-holster` for pixel comparison:

```javascript
import { FIGMA_TOKEN, FIGMA_FILE_ID } from '../../stories/figma-config.js';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <ftl-holster node="NODE-ID" style="display: inline-block;">
      <!-- Component grid matching Figma layout exactly -->
    </ftl-holster>
  </ftl-belt>
`;
```

**Usage:** In Storybook, use Toggle/Overlay/Side-by-Side modes to compare code vs Figma.

## Figma Node IDs

| Component | Node ID | Status |
|-----------|---------|--------|
| Button | 20:27 | Implemented |
| Checkbox | 236:41408 | Implemented |
| Radio | 236:41398 | Implemented |
| Switch | 236:41353 | Implemented |
| Toggle Button | 309:3542 | Implemented |
| Icon Button | 240:1391 | Implemented |
| Menu Bar / Top Nav | 48:2135 | Implemented |

See `docs/component-map.json` for full details.

## Components Maken/Updaten

Gebruik `/component <figma-node-id>` voor het maken of updaten van componenten. Dit command:
- Haalt Figma specs op
- Genereert Lit + TypeScript component
- Maakt FigmaComparison story
- Voert `/pixel-perfect` uit voor visuele verificatie

## Button Sizes

| Size | Min Height | Padding | Gap | Border-radius |
|------|------------|---------|-----|---------------|
| xs | 24px | 4px 6px | 2px | 4px |
| s | 32px | 6px 8px | 2px | 6px |
| m | 44px | 12px | 4px | 8px |

## Key Tokens

```css
/* Controls */
--semantics-controls-xs-min-size: 24px
--semantics-controls-s-min-size: 32px
--semantics-controls-m-min-size: 44px
--semantics-controls-{xs|s|m}-corner-radius

/* Focus */
--semantics-focus-ring-thickness: 2px
--semantics-focus-ring-color: #0f172a

/* Buttons */
--semantics-buttons-accent-filled-background-color
--semantics-buttons-accent-filled-color

/* Components */
--components-button-{xs|s|m}-font
--components-checkbox-*
--components-radio-button-*
--components-switch-*
--components-toggle-button-*
--components-menu-bar-*
```

## Code Quality

- Pre-commit hooks: ESLint, Prettier, commitlint
- Conventional commits: `feat(button): add variant`, `fix(checkbox): focus ring`
- No hardcoded values, no !important, no frameworks

## Package Versioning

**Bump the version in `package.json` when:**
- Adding or modifying a component (`.js`, `.ts` in `src/components/`)
- Changing design tokens that affect output
- Updating dependencies that affect the bundle

**Do NOT bump version for:**
- Documentation changes only
- Storybook-only changes
- Test file changes
- Development tooling changes

**How to bump:** Edit `"version"` in `package.json`. Use semantic versioning.

## BEM Naamgeving

Gebruik BEM (Block Element Modifier) voor alle class namen in HTML/CSS:

```
.block                    /* Standalone component */
.block__element           /* Onderdeel van block */
.block--modifier          /* Variant of state van block */
.block__element--modifier /* Variant van element */
```

**Voorbeelden:**

```html
<!-- Block -->
<button class="button">

<!-- Block met modifier -->
<button class="button button--primary">
<button class="button button--disabled">

<!-- Element binnen block -->
<button class="button">
  <span class="button__icon"></span>
  <span class="button__label">Tekst</span>
</button>

<!-- Element met modifier -->
<span class="button__icon button__icon--large"></span>
```

**Regels:**
- Block: `rr-{naam}` of simpelweg de component naam
- Element: dubbele underscore `__`
- Modifier: dubbele hyphen `--`
- Geen nesting van blocks binnen element namen (niet: `block__element__subelement`)
- Modifiers zijn altijd aanvullend, nooit vervanging van base class

## Fallback Consistency Rule

Bij wijzigingen aan design tokens:
- Update altijd de corresponderende fallback waarden in component styles
- Fallbacks moeten overeenkomen met de token waarden
- Zoek naar `var(--token-name, fallback)` patronen in `src/components/`

## Rules

1. Extend `RRBaseComponent`
2. Use Shadow DOM
3. Only design tokens - never hardcode
4. DigiToegankelijk (WCAG 2.1 AA) compliant
5. RijksSansVF font with system-ui fallback
6. BEM naamgeving voor alle class namen
7. **Na elke component wijziging: `/pixel-perfect {name}`** - verifieer visuele correctheid tegen Figma
