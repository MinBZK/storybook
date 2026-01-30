# RegelRecht Design System

Vanilla Web Components for Dutch Government (Rijksoverheid) apps. Single source of truth: **Figma** (`5DyHMXUNVxbgH7ZjhQxPZe`).

## Quick Reference

```bash
npm run storybook        # Dev server at localhost:6006
npm run build:tokens     # Rebuild design tokens
npm run build            # Full build
```

## Development Workflow

**Gebruik ALTIJD deze skills voor de juiste workflow:**

| Taak | Skill | Beschrijving |
|------|-------|--------------|
| Nieuwe branch starten | `/worktree <branch>` | Maakt worktree + kopieert .env en .claude/ |
| Component maken/updaten | `/component <figma-node>` | Haalt Figma specs, genereert Lit+TS component |
| Pixel-perfect checken | `/pixel-perfect <name>` | Vergelijkt component met Figma design |
| PR maken met screenshots | `/figma-pr [component]` | Maakt PR met FigmaComparison screenshots |
| Storybook beheren | `/storybook-manager` | Start/stop/status van Storybook instances |

**Typische flow voor nieuwe feature:**
```
/worktree feat/my-component
/component 123:456
/pixel-perfect my-component
/figma-pr my-component
```

## Gotchas

**Asymmetric Padding:** Figma uses different top/bottom padding. Check Properties panel for each value:
```css
/* Button S-size: top=8, right=8, bottom=6, left=8 */
padding: 8px 8px 6px 8px;  /* NOT symmetric! */
```

**Figma MCP Rate Limits:** Wait 60-120s on error. Workaround: open Figma in browser, click component, read Properties panel directly.

**Disabled Opacity:** Always use `calc(var(--primitives-opacity-disabled, 38) / 100)` - the token is a percentage.

**Asymmetric Figma Layouts:** Figma uses padding + spacer elements that can create asymmetric distances (e.g., 48px left vs 40px right). Check both sides separately and use margin compensation if needed.

**Always Check Figma Gap:** Don't assume flex containers have gaps. Figma's layout panel shows gap explicitly - if not shown, gap is 0.

**Subpixel Font Drift:** Expect ~0.4px cumulative drift per text element due to font rendering differences. This is inherent and not fixable.

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
  rr-{name}.ts           # Lit + TypeScript component (nieuw)
  rr-{name}.js           # Vanilla JS component (legacy)
  rr-{name}.stories.js   # Storybook stories
```

**Let op:** We migreren naar Lit + TypeScript. Nieuwe componenten altijd in `.ts`.

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
| Spacer | 48:2234 | Implemented |

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

Versions are **automatically** bumped by semantic-release on merge to main.

| Commit Type | Version Bump |
|-------------|--------------|
| `feat:` | Minor (0.1.0 → 0.2.0) |
| `fix:`, `perf:` | Patch (0.1.0 → 0.1.1) |
| `feat!:` or `BREAKING CHANGE:` | Minor (pre-1.0) |
| `docs:`, `chore:`, `ci:`, etc. | No bump |

**Manual version bumping is not needed.** Use conventional commits and CI handles the rest.

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

1. Extend `LitElement` (nieuw) of `RRBaseComponent` (legacy)
2. Use Shadow DOM
3. Only design tokens - never hardcode
4. DigiToegankelijk (WCAG 2.1 AA) compliant
5. RijksSansVF font with system-ui fallback
6. BEM naamgeving voor alle class namen
7. **Na elke component wijziging: `/pixel-perfect {name}`** - verifieer visuele correctheid tegen Figma
