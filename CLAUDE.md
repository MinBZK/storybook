# Nederlandse Digitale Dienst Design System

Vanilla Web Components for Dutch Government (Rijksoverheid) apps. Single source of truth: **Storybook**.

## Quick Reference

```bash
npm run storybook        # Dev server at localhost:6006
npm run build:styles     # Copy CSS + fonts to dist
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
/* Button sm-size: top=8, right=8, bottom=6, left=8 */
padding: 8px 8px 6px 8px;  /* NOT symmetric! */
```

**Disabled Opacity:** Always use `var(--primitives-opacity-disabled)` - the token is a decimal fraction (0.38).

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
src/components/{category}/{name}/
  ndd-{name}.ts           # Lit + TypeScript component
  ndd-{name}.styles.ts    # Component styles
  ndd-{name}.template.ts  # Render template
  ndd-{name}.stories.ts   # Storybook stories
  ndd-{name}.test.ts      # Unit tests
```

## Components Maken/Updaten

Gebruik `/component <naam>` voor het maken of updaten van componenten. Dit command:
- Genereert Lit + TypeScript component
- Maakt Storybook stories

## Button Sizes

| Size | Min Height | Padding | Gap | Border-radius |
|------|------------|---------|-----|---------------|
| xs | 24px | 4px 6px | 2px | 4px |
| sm | 32px | 6px 8px | 2px | 6px |
| md | 44px | 12px | 4px | 8px |

## Key Tokens

```css
/* Controls */
--semantics-controls-xs-min-size: 24px
--semantics-controls-sm-min-size: 32px
--semantics-controls-md-min-size: 44px
--semantics-controls-{xs|sm|md}-corner-radius

/* Focus */
--semantics-focus-ring-center-thickness: 2px
--semantics-focus-ring-center-color: #0f172a
--semantics-focus-ring-edge-thickness: 2px
--semantics-focus-ring-edge-color: #ffffff

/* Buttons */
--semantics-buttons-accent-filled-background-color
--semantics-buttons-accent-filled-color

/* Components */
--semantics-buttons-{xs|sm|md}-font
--components-checkbox-*
--components-radio-button-*
--components-switch-*
--components-toggle-button-*
--components-menu-bar-*
```

## Component Testing

Elk component MOET minimaal een **smoke test** hebben. Run tests met `npm test`.

**Minimale vereisten:**
1. **Smoke test** (verplicht): rendert zonder errors, heeft een shadowRoot
2. **Logic tests** (verplicht bij complexe logica): test MutationObservers, slot management, attribuut propagatie, event handlers, state transitions

**Test bestand:** `src/components/{category}/{name}/ndd-{name}.test.ts`

**Smoke test patroon:**
```typescript
import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-{name}.ts';

describe('ndd-{name}', () => {
  let el: HTMLElement;

  afterEach(() => {
	if (el) cleanup(el);
  });

  it('renders without error', async () => {
	el = await fixture('<ndd-{name}></ndd-{name}>');
	await waitForUpdate(el);

	expect(el.shadowRoot).not.toBeNull();
  });
});
```

**Test helpers** (`src/test-utils.ts`):
- `fixture<T>(html)` — maakt DOM element, wacht op Lit updateComplete
- `cleanup(el)` — verwijdert fixture wrapper uit DOM (gebruik in afterEach)
- `waitForUpdate(el)` — wacht op MutationObserver + Lit re-render cycle

## Code Quality

- Pre-commit hooks: ESLint, commitlint
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
| Unrecognized (no conventional prefix) | Patch (treated as feat) |

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
<button class="button button--sm">

<!-- Element binnen block -->
<button class="button">
  <span class="button__icon"></span>
  <span class="button__label">Tekst</span>
</button>

<!-- Element met modifier -->
<span class="button__icon button__icon--large"></span>
```

**Regels:**
- Block: `ndd-{naam}` of simpelweg de component naam
- Element: dubbele underscore `__`
- Modifier: dubbele hyphen `--`
- Geen nesting van blocks binnen element namen (niet: `block__element__subelement`)
- Modifiers zijn altijd aanvullend, nooit vervanging van base class

## CSS Variable Validation

CSS variabelen worden gevalideerd tijdens de build (`npm run validate:styles`):

**Token categorieën:**
- `--context-*` - Context hooks voor consumers (niet gevalideerd, niet in settings.css)
- `--_*` - Interne variabelen (gevalideerd binnen hetzelfde bestand)
- `--primitives-*`, `--semantics-*`, `--components-*` - CSS variabelen (gevalideerd tegen settings.css)

**Stricte aanpak - GEEN fallbacks:**
```css
/* FOUT */
min-height: var(--semantics-controls-md-min-size, 44px);

/* GOED */
min-height: var(--semantics-controls-md-min-size);
```

**Uitzonderingen (behoud fallbacks):**
- Override hooks: `var(--ndd-button-background-color, var(--_bg-color))`
- Font-family: `var(--ndd-font-family-sans, 'RijksSansVF', system-ui, sans-serif)`

CI faalt als tokens ontbreken. Dit dwingt af dat alle tokens gedefinieerd zijn in `src/assets/styles/settings.css`.

## Formatting

Geen automatische formatter. Handmatige regels:

- **Tabs** voor indentatie, enkele aanhalingstekens, puntkomma's
- **HTML:** gebruik `>` niet `/>` (HTML, geen XHTML)
- **CSS:** property waarden altijd op één regel, CSS nesting voor @container/@media, defaults in `:host` niet als fallback, geen flex shorthand, state classes (`.is-dragging`) ipv BEM modifiers
- **CSS headings:** Level 1 (`/* # */`): 2 lege regels ervoor, 1 erna. Level 2 (`/* ## */`): 1 lege regel ervoor en erna
- **Templates:** `class` op dezelfde regel als element, elementen met 1 attribuut op één regel, `<slot>` altijd compact, overige attributen op eigen regels, nooit een class op een child component (gebruik een wrapper element)
- **Stories:** alle attributen van een element op één regel

Zie `/component` skill voor volledige formatting voorbeelden.

## Rules

1. Extend `LitElement`
2. Use Shadow DOM
3. Only CSS variabelen - never hardcode
4. DigiToegankelijk (WCAG 2.1 AA) compliant
5. RijksSansVF font with system-ui fallback
6. BEM naamgeving voor alle class namen
