# RegelRecht Design System

Vanilla Web Components for Dutch Government (Rijksoverheid) apps. Single source of truth: **Storybook**.

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
| Component maken/updaten | `/component <naam>` | Genereert Lit+TS component |
| Storybook beheren | `/storybook-manager` | Start/stop/status van Storybook instances |

**Typische flow voor nieuwe feature:**
```
/worktree feat/my-component
/component my-component
```

## Gotchas

**Asymmetric Padding:** Components may use different top/bottom padding. Check design specs for each value:
```css
/* Button S-size: top=8, right=8, bottom=6, left=8 */
padding: 8px 8px 6px 8px;  /* NOT symmetric! */
```

**Disabled Opacity:** Always use `var(--primitives-opacity-disabled)` - the token is a percentage.

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

## Components Maken/Updaten

Gebruik `/component <naam>` voor het maken of updaten van componenten. Dit command:
- Genereert Lit + TypeScript component
- Maakt Storybook stories

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
| `feat:` | Patch (0.5.0 → 0.5.1) |
| `fix:`, `perf:` | Patch (0.5.0 → 0.5.1) |
| `feat!:` or `BREAKING CHANGE:` | Patch (0.5.0 → 0.5.1) |
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

## CSS Variable Validation

Design tokens worden gevalideerd tijdens de build (`npm run validate:tokens`):

**Token categorieën:**
- `--rr-*` - Override hooks voor consumers (niet gevalideerd, niet in tokens.css)
- `--_*` - Interne variabelen (gevalideerd binnen hetzelfde bestand)
- `--primitives-*`, `--semantics-*`, `--components-*` - Design tokens (gevalideerd tegen tokens.css)

**Stricte aanpak - GEEN fallbacks:**
```css
/* FOUT */
min-height: var(--semantics-controls-m-min-size, 44px);

/* GOED */
min-height: var(--semantics-controls-m-min-size);
```

**Uitzonderingen (behoud fallbacks):**
- Override hooks: `var(--rr-button-background-color, var(--_bg-color))`
- Font-family: `var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif)`

CI faalt als tokens ontbreken. Dit dwingt af dat alle tokens gedefinieerd zijn in `dist/css/tokens.css`.

## Rules

1. Extend `LitElement` (nieuw) of `RRBaseComponent` (legacy)
2. Use Shadow DOM
3. Only design tokens - never hardcode
4. DigiToegankelijk (WCAG 2.1 AA) compliant
5. RijksSansVF font with system-ui fallback
6. BEM naamgeving voor alle class namen
