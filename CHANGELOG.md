# Changelog

All notable changes to the NLDD design system are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Versions are bumped automatically by semantic-release on merge to main —
the type of conventional-commit determines the release. Conventional types
`chore`, `docs`, `ci`, `style`, `test`, `build` are intentionally omitted
here; consult the commit history if you need that level of detail.

### Highlights

- **Five new components**: `nldd-banner`, `nldd-progress-bar`, `nldd-progress-circle`, `nldd-progress`, and `nldd-image`. Between them they cover status messaging, loading-state visualisation (single-value, multi-segment, distribution, indeterminate), and design-token-aware image presentation. The progress bar and circle share an API so swapping the shape is a one-attribute change; `nldd-progress` is a layout wrapper that delays the indicator by 1000 ms so quick loads don't flash a spinner.
- **Multi-color CSS-only LQIP placeholder** on `nldd-image`. Extends Lean Rada's CSS-only LQIP technique ([leanrada.com](https://leanrada.com/notes/css-only-lqip/)) with one quantised Oklab colour per cell instead of greyscale-only cells, so photos with distinct hues (sky + foliage + warm subject) render as a multi-colour placeholder rather than collapsing to a single dominant tint. No JS decoder, no blend modes — seven inline CSS variables drive seven background layers natively. A bundled `<nldd-lqip-encoder>` Storybook tool generates the `lqip` attribute string client-side.
- **Unified framed-surface pattern** across `nldd-box`, `nldd-banner`, `nldd-list`, and `nldd-code-viewer`. They all share the same 1px inset box-shadow border ring (paints inside the radius, takes no layout space) backed by new `--semantics-surfaces-border-color` / `--semantics-surfaces-tinted-border-color` tokens. The first three also share a `variant: 'simple' | 'box'` + `background: 'tinted' | 'base'` shape so the chrome controls read the same regardless of which component a consumer reaches for. Each ships with a `@media (forced-colors: active)` fallback to a real `border: 1px solid CanvasText` so Windows High Contrast users still see the frame.
- **Copy-to-clipboard on `nldd-code-viewer`**: a top-right button copies the rendered code with a one-shot "Copied" confirmation. Combined with the new `variant` + `background` attributes, snippets now look and behave like proper code blocks out of the box.
- **Six new icons**: `bell`, `bookmark`, `flag`, `star`, `tag`, and `photo-slash` (with a `broken-image` alias used by `nldd-image`'s error fallback). The icon gallery story also gains a search filter for easier discovery.

### Added

- `nldd-banner`: status/feedback component with semantic variants (info / success / warning / critical), filled default icons, optional dismiss button, and primary/secondary actions.
- `nldd-progress-bar` + `nldd-progress-bar-segment`: single `value` or multi-segment use, `progress` and `distribution` modes, 24 colour variants (semantic + Rijkskleuren), indeterminate animation that cross-fades into and out of the determinate state, translatable copy.
- `nldd-progress-circle` + `nldd-progress-circle-segment`: circular sibling with the same API as the bar. Radius scales per size so the stroke (2–6 px on size 16–96) always stays inside the viewBox; the track colour aliases the bar's so the two stay in lockstep.
- `nldd-progress`: layout placeholder that fills its parent and centres an indeterminate circle after a 1000 ms grace period. Caption defaults to a translated "Laden"; override the indicator via the default slot.
- `nldd-image`: styled `<img>` wrapper with `shape` (square / rounded / circle), `aspect-ratio` for CLS-free layout reservation, `object-fit`, `object-position`, `caption` + `credit`, a `width` attribute (`'full'` or numeric), `decorative`, and `srcset` / `sizes`. Renders `<figure>` + `<figcaption>` only when a caption or credit is present; consumer-supplied `<img>` / `<picture>` in the default slot override the internal one. Error fallback overlays a small neutral card with the new `broken-image` icon and the alt text.
- **CSS-only multi-color LQIP** for `nldd-image`. Extends Lean Rada's CSS-only LQIP technique ([leanrada.com](https://leanrada.com/notes/css-only-lqip/)) with per-cell colour: the `lqip` attribute takes a CSV string `"base,c1,c2,c3,c4,c5,c6"` of seven 0-255 bytes, each packing an 8-bit Oklab triplet (2 bits L + 3 bits a + 3 bits b). The decoder renders six per-cell radial-gradients with smooth alpha falloff over the base colour — no blend modes, no JS, native browser rendering. Cross-fades into the image on `load`, hides under `prefers-reduced-motion`, and the gradient is suppressed in the error state so the fallback card sits on a neutral background.
- `<nldd-lqip-encoder>` element + "LQIP encoder tool" Storybook page so consumers can generate the LQIP string in-browser. Encoder picks the base colour from the dominant Oklab bucket (histogram) and quantises every cell via brute-force `findOklabBits()` for accuracy near quantisation boundaries; the tool renders the produced placeholder side-by-side with the source for visual verification.
- `nldd-code-viewer`: `variant` (`'simple' | 'box'`) and `background` (`'tinted' | 'base'`) attributes for shell-style framing, plus a copy-to-clipboard button. With `variant="simple"` + the copy button, the action pins flush to the host's top-right corner and the snippet keeps a minimum height of the button so the layout never clips it.
- `nldd-box`: `background` attribute (`'tinted'` default for a box on a plain page, `'base'` for a box on an already-tinted parent — the border ring picks the +2-step semantic so the frame still reads card-on-card).
- New surface tokens: `--semantics-surfaces-border-color` / `--semantics-surfaces-tinted-border-color` (+ matching `--components-box-*-border-color` pair). Used as a 1px inset ring across `nldd-box`, `nldd-banner`, `nldd-list`, and `nldd-code-viewer`.
- `nldd-progress`: `complete` boolean attribute clears `aria-busy` and hides the indicator while keeping the element mounted (for consumers who can't unmount). `no-label` boolean attribute suppresses the visible "Laden" caption when the surrounding UI already conveys loading.
- `nldd-collection`: arrow-key navigation when horizontal-scroll regions overflow, with a keyboard focus state on the scroll container.
- `nldd-tooltip`: `open` attribute for forced visibility.
- Generic horizontal-scroll regions (e.g. inside `nldd-code-viewer` and overflowing tables in `nldd-rich-text`) become keyboard-focusable when their content overflows.
- Icons: bell, bookmark, flag, star, tag, photo-slash (with `broken-image` alias).
- Icon gallery story: search filter.

### Changed

- `nldd-toggle-button`: variant styling is now driven from the rendered content (icon-and-text / icon-only / text-only) — the manual `variant` attribute is no longer needed.
- `nldd-collection`: focus ring renders as a shadow-DOM `::after` so it can sit above slotted cards.
- `nldd-banner` (post-initial iterations): filled default icons, lighter border + background, dismiss button alignment + spacing polished, accent variant dropped (use `nldd-inline-dialog` for accent emphasis), stories rebuilt around the new actions pattern. The edge changed from a real `border` to an inset box-shadow so child content keeps its exact position regardless of the edge weight, with a `forced-colors` fallback restoring a real border.
- `nldd-tag` and `nldd-badge` stories: `Variants` + `Rijkskleuren` merged into a single `Colors` story per component; tag colour labels switched from concept-style strings (concept / nieuw / gepubliceerd / let op / afgewezen) to the semantic colour names.
- Interactive controls (16 components) now have `user-select: none` on hit targets so double-tapping or shift-clicking doesn't accidentally select label text.

### Breaking

- `nldd-list`: `variant="box-on-tinted"` is removed. Use `<nldd-list variant="box" background="base">` instead. The `background` axis is also narrowed to `'tinted' | 'base'` (the old `'transparent'` value is removed — `variant="simple"` is the no-chrome case and `background` no longer applies when variant is `'simple'`).
- `nldd-code-viewer`: `no-box` boolean is removed. Use `variant="simple"` instead. `background="inherit"` is removed. The remaining `background` values are `'tinted'` (default) and `'base'`.
- Tokens renamed for the new inset-border pattern (same values, new names; rename overrides in custom themes):
  - `--semantics-surfaces-highlight-color` → `--semantics-surfaces-border-color`
  - `--semantics-surfaces-tinted-highlight-color` → `--semantics-surfaces-tinted-border-color`
  - `--components-box-highlight-color` → `--components-box-border-color`
  - `--components-box-on-tinted-background-color` → `--components-box-base-background-color`
  - `--components-box-on-tinted-background-color`'s sibling highlight token is also renamed to `--components-box-base-border-color`.
- `nldd-progress`: the `text=" "` (space-as-sentinel) trick for suppressing the loading label is gone — use the new `no-label` boolean attribute.

### Fixed

- `text-field`, `password-field`, `search-field`, `combo-box`, `multi-line-text-field`: autofill text colour pinned to the content-color token via `-webkit-text-fill-color` so dark-mode autofill no longer paints dark browser-default text on the dark-amber autofill background.
- `nldd-collection`: initial left-arrow disabled state on first render.
- `nldd-top-navigation-bar`: website-title gets vertical breathing room at sm so it no longer kisses the top edge.
- Tokens: light-mode `--semantics-content-color` and link colours bumped so the new page-footer meets WCAG contrast.

## <small>0.8.50 (2026-05-28)</small>

* fix: deblokkeer pre-commit hooks (#116) ([50269f0](https://github.com/MinBZK/storybook/commit/50269f0)), closes [#116](https://github.com/MinBZK/storybook/issues/116)

## <small>0.8.49 (2026-05-26)</small>

* feat!: container order API, breadcrumbs centering fix, CHANGELOG workflow ([c1e0ad8](https://github.com/MinBZK/storybook/commit/c1e0ad8))

### Highlights

- `nldd-container`: per-child ordering replaces the boolean reverse family. Each slotted child can declare `order` / `sm-order` / `md-order` / `lg-order` (any integer, including negative) and the container observes slot + attribute mutations to bridge those to `--_slot-{attr}` inline custom properties on the child; the container's shadow CSS reads them via `::slotted(*)` inside `@container` queries with a `sm/md/lg-order → order → 0` fallback cascade. No `ResizeObserver`, no enumerated value rules — and `layout="grid"` now keeps its 2D grid track when items reorder (the previous grid→flex fallback for `reverse` is gone).
- `nldd-breadcrumbs`: `.breadcrumbs` switched from `display: block` to `display: flex` so the `inline-flex` `__level-up` link no longer sits on a baseline line-box, fixing the vertical alignment of the chevron + label at sm.
- `nldd-container` stories: control + story ordering aligned with the canonical skill groups (visueel dominant → space → alignment); optional selects use the `'(geen)'` + `mapping` pattern; booleans default to `false` so the toggle is interactive immediately (no intermediate "Set boolean" step); the defaults column is populated across all controls.
- CHANGELOG workflow: section conventions moved to `CONTRIBUTING.md`; the `## Unreleased` header is dropped — hand-written `### Highlights` / `### Breaking Changes` now sit directly above the current top version and nest naturally under the new version block that semantic-release prepends on release.

### Breaking Changes

- `nldd-container`: `reverse`, `sm-reverse`, `md-reverse`, `lg-reverse` boolean attributes are **removed**. Use per-child `order` / `sm-order` / `md-order` / `lg-order` on the slotted items instead.

  Migration — full reverse of two children:

  ```html
  <!-- before -->
  <nldd-container layout="row" reverse>
    <a>First</a>
    <b>Second</b>
  </nldd-container>

  <!-- after — either flip the DOM order, or set explicit per-child order -->
  <nldd-container layout="row">
    <a order="2">First</a>
    <b order="1">Second</b>
  </nldd-container>
  ```

  Migration — responsive flip (was `md-reverse lg-reverse` on a two-child container):

  ```html
  <!-- before -->
  <nldd-container md-reverse lg-reverse>
    <figure>…</figure>
    <p>…</p>
  </nldd-container>

  <!-- after — the second child moves before the first at md+ -->
  <nldd-container>
    <figure>…</figure>
    <p md-order="-1" lg-order="-1">…</p>
  </nldd-container>
  ```

  `layout="grid"` + reorder no longer falls back to flex — the grid track stays aligned on every breakpoint. `layout="columns"` reorder is still a no-op (CSS multicol has no per-item ordering hook).

## <small>0.8.48 (2026-05-25)</small>

* fix: padding new page-footer ([fbbdf2c](https://github.com/MinBZK/storybook/commit/fbbdf2c))

## <small>0.8.47 (2026-05-25)</small>

* feat!: page-footer, breadcrumbs, container layout API, window scheme ([f96ebf1](https://github.com/MinBZK/storybook/commit/f96ebf1)), closes [#154273](https://github.com/MinBZK/storybook/issues/154273)

### Highlights

- New `nldd-page-footer` family (page-footer + legal-bar + legal-bar-item, the latter two internal sub-components) with breadcrumbs / main / legal-bar slots, automatic dividers between non-empty rows, and a hard-coded Rijksoverheid lintje (#154273) that bleeds through the bottom padding to touch the viewport edge. Width matches the top-nav logo width responsively; height is half the width. `single-slot` attribute reflects when only one row is visible so the lintje sits symmetric within that single block.
- New `nldd-breadcrumbs` + `nldd-breadcrumbs-item` (the item is an internal sub-component): chevron-right separator, container-query-driven "‹ {parent}" fallback on sm viewports.
- New `PageSectionMixin` gives all five page-section components a shared surface API: `background` (`inherit`/`base`/`tinted`), `scheme` (`inherit`/`light`/`dark`/`inverted`), responsive block-padding (12 attrs) and `height`. Each section is its own container-query scope, so its responsive rules resolve against its own width — no outer layout-container required.
- `nldd-container` got a `layout` attribute that covers the common composition patterns: `stack` (default — block items, vertical flow), `row` (flex row, no wrap), `wrap` (flex row, wraps to new lines), `grid` (CSS grid, auto-fit columns at min 280px) and `columns` (CSS multicol, items flow vertically and break to the next column at min 280px width, never split across columns). `gap` keeps working across every mode, and `horizontal-alignment` / `vertical-alignment` map to the right axis property per layout (justify-content / justify-items / align-items). A `reverse` boolean inverts item order for stack / row / wrap natively, and for grid by falling back to flex with `wrap-reverse` (real 2D reversal at the cost of grid-track alignment on the last row); `sm-reverse` / `md-reverse` / `lg-reverse` scope the reversal to a single breakpoint. A `column-count` attribute (1-8, plus `sm-column-count` / `md-column-count` / `lg-column-count`) forces an exact column count and overrides auto-fit — the per-viewport variants resolve against this container's OWN inline-size via a self-aware `@container` query, so a footer grid wraps based on the footer's actual width rather than the viewport (allowing for clean step patterns like 4 → 2 → 1 without an intermediate 3-column phase). Internally the host now wraps the layout in a `.container` div so the host can carry `container-type: inline-size` without violating the "an element can't query itself" rule of container queries.
- Timeline-track-cell split into `*.styles.ts` + `*.template.ts` like other cell components. Own component-color tokens (`--components-timeline-track-cell-color` / `-future-background-color`). Cell stretches to its row by default so the line spans the full main-area height.
- Window keeps its position on sm viewports — previously top/right/bottom/left/centered were cleared on sm and the dialog centered. New `scheme` attribute ('inherit' | 'light' | 'dark') applies color-scheme to host + inner dialog so surfaces inside adapt.

### Breaking Changes

- `background="default"` is now `background="base"` on `nldd-app-view`, `nldd-page` and the five split-view components (`nldd-split-view-pane`, `bar`, `navigation`, `side-by-side`, `stacked`). Same paint behaviour, just a clearer name that matches the new `PageSectionMixin` vocabulary. Migration: search/replace `background="default"` → `background="base"` on these elements.
- `<nldd-menu-bar-item expandable>` items must now be wrapped in an explicit `<nldd-menu>`. Previously menu-bar-item auto-created a body-attached menu and cloned the slotted items into it (which dropped JS event listeners). Migration:

  ```html
  <!-- before -->
  <nldd-menu-bar-item text="Account" expandable>
    <nldd-menu-item ...></nldd-menu-item>
    <nldd-menu-divider></nldd-menu-divider>
    <nldd-menu-item ...></nldd-menu-item>
  </nldd-menu-bar-item>

  <!-- after -->
  <nldd-menu-bar-item text="Account" expandable>
    <nldd-menu>
      <nldd-menu-item ...></nldd-menu-item>
      <nldd-menu-divider></nldd-menu-divider>
      <nldd-menu-item ...></nldd-menu-item>
    </nldd-menu>
  </nldd-menu-bar-item>
  ```

  All `<nldd-menu>` attributes (accessible-label, translations, variant, filterFn) are now reachable. Event listeners on items work directly — no more cloneNode.
- `<nldd-code>` → `<nldd-code-viewer>` (disambiguates from the unrelated `<nldd-code-editor>` input component). Class `NLDDCode` → `NLDDCodeViewer`; all 26 `--components-code-*` token-color custom properties → `--components-code-viewer-*`. Migration: search/replace `nldd-code` → `nldd-code-viewer` (skip `nldd-code-editor` matches), `NLDDCode` → `NLDDCodeViewer`, `--components-code-` → `--components-code-viewer-`.
- `nldd-container`: `direction` and `wrap` are replaced by a single `layout` attribute. Migration: `direction="row"` → `layout="row"`, `direction="row" wrap` → `layout="wrap"`, default (or `direction="column"`) → omit / `layout="stack"`. The case `direction="column" wrap` had no working semantics and is dropped. New values `layout="grid"` and `layout="columns"` are net additions.

## <small>0.8.46 (2026-05-21)</small>

### Highlights

- Buttons doen nu echt mee in formulieren: `nldd-button` en `nldd-icon-button`
  zijn form-associated, dus `type="submit"` en `type="reset"` werken nu ook
  binnen een `<form>` (voorheen deed een klik niets over de shadow-grens).
- Consistente "pressed" (active) feedback op alle neutral-tinted controls.

* feat(actions): form-associated buttons, text slot, and consistent active states ([a99a1c5](https://github.com/MinBZK/storybook/commit/a99a1c5))

## <small>0.8.45 (2026-05-21)</small>

### Highlights

Grote housekeeping-batch met een paar zichtbare features bovenop een grondige CSS-architectuur opschoning:

- **Menu uitbreidingen**: destructive variant (rode tekst + highlight, voor "Verwijder"-type acties), klik-en-sleep selectie, automatische groep-dividers, uitlijning van items met gemengde icon/check states.
- **Container layout primitive** herwerkt: nieuwe `direction` / `gap` / `horizontal-alignment` / `vertical-alignment` API, slimmer responsive padding model.
- **Internal "default-unconditional + local-var" CSS pattern** uitgerold over alle componenten — onbekende attribuutwaardes vallen nu netjes terug op de gedocumenteerde default i.p.v. "unstyled" te renderen.
- **Gestandaardiseerd variant-systeem** voor `tag`, `toggle-button` en `tab-bar` — allemaal `variant="text|icon|icon-and-text"` met auto-detect en gedeelde icon-placeholder fallback.
- **Nieuwe standalone icon API** — `<nldd-icon>` krijgt `size` en `color` attributen (functionele semantics + 18 Rijkskleuren). Voorheen alleen via de parent-container.
- **Zeven nieuwe iconen**: `clipboard`, `clipboard-rectangle`, `scissor`, `square-arrow-right-inward`, `message-rectangle-text`, `globe` (+ aliassen `paste` / `cut` / `login` / `annotation` / `comment` / `languages`).
- **Top-navigation-bar accepteert consumer-supplied `<nldd-menu-bar>`** in plaats van losse `menu-bar-item`s.
- **`<nldd-code>` houdt kleuren correct na light/dark-wissel** tijdens horizontaal scrollen — voorheen bleef weggescrollde inhoud in het oude kleurenschema hangen.
- **Changelog infrastructure**: `CHANGELOG.md` in repo + Storybook docs-page + auto-generatie via semantic-release.

### Breaking Changes

Bijna alle breaking changes zijn "onbekende/lege attribuutwaardes → fallback op default" (waar voorheen ongedefineerd gedrag was). Echte API-veranderingen:

- **`<nldd-icon name="square-and-arrow-right">` → `name="square-arrow-right"`** (rename; `logout` / `exit` aliassen blijven).
- **`<nldd-tab-bar compact>` → `variant="compact"`** (idem `<nldd-tab-bar-item>`); `responsive` boolean verwijderd.
- **`<nldd-top-navigation-bar>`** met losse `<nldd-menu-bar-item slot="global">` → wrap in `<nldd-menu-bar slot="global">`.
- **`<nldd-tag>` / `<nldd-toggle-button>`** variant-namen → `'text' | 'icon' | 'icon-and-text'`, auto-detect bij geen variant.
- **Container** (`<nldd-layout-container>`): `layout-container-{sm,md,lg}-padding*` → `sm-/md-/lg-padding*`; nieuwe `direction` / `wrap` / `gap` / `horizontal-alignment` / `vertical-alignment`.
- **Form controls** stretchen nu by default tot 100% van hun container; wrapper of `style="width: …"` voor oude shrink-to-content.
- **`<nldd-toggle-button>`** reflecteert geen `[icon-only]` meer — gebruik `[variant="icon"]`.
- **Title, button, segmented-control, switch, stepper, dropdown, combo-box, text/multi-line/search/password/number-field, split-view-divider, button-group, cells** — onbekende/lege `size`/`variant`/`orientation` → gedocumenteerde default (`md`/`text`/`vertical`) i.p.v. unstyled.

### Added

- `<nldd-icon>` `size` (spacer-aligned 16–96) en `color` (functioneel of Rijkskleur).
- Zeven nieuwe iconen + aliassen (zie Highlights).
- `<nldd-menu-item destructive>` variant.
- `<nldd-menu-group>` auto bottom-divider (parent-aware).
- Menu klik-en-sleep selectie.
- `no-spellcheck` op text-field / multi-line-text-field / search-field / combo-box.
- `<nldd-dropdown>` hover/active/expanded states + transitions.
- Container layout primitive (direction/wrap/gap/alignment).
- `variant="icon-and-text"` op tag / toggle-button / tab-bar-item; `icon-placeholder` fallback bij `variant="icon"` zonder icoon.
- `<nldd-top-navigation-bar>` consumer-supplied `<nldd-menu-bar>`.
- `CHANGELOG.md` + Storybook docs-page.

### Changed

- Globale "default-unconditional + local-var + concentric BEM order" refactor over alle categorieën.
- `<nldd-blockquote>` attribution-prefix via slot `::before`.
- Menu-item uitlijning + check-spacing.
- Popover reopen-guard gestandaardiseerd op pointerdown-flag (popover, menu, menu-bar, menu-bar-item).
- `flex: 1` shorthand → longhands.
- `--components-link-color` pinned op `lintblauw`; light-mode link-kleur feller.
- Top-navigation-bar 12px gap tussen global en utility bar.
- `<nldd-icon>` `:host` is nu `inline-flex` + `height: auto` (intrinsieke SVG-aspect) — voorkomt cross-axis stretch in flex-rijen.
- Storybook 10.3.4 → 10.4.0.

### Fixed

- `<nldd-bar-split-view>` / `<nldd-split-view-pane>` collapsten naar 0 hoogte na de `flex: 1` → longhand conversie.
- `<nldd-menu-group>` bottom divider werd niet onderdrukt wanneer een expliciete divider tussen de group en hidden items zat.
- `<nldd-icon-cell>` `::slotted` width/height var-collisie opgelost.
- `<nldd-code>` repaint na color-scheme flip (nieuwe `color-scheme-repaint` utility).
- `<nldd-page>` `isolation: isolate` — descendant z-index dekt scrollbar niet meer af.
- `<nldd-list-item>` press feedback op touch.
- `<nldd-toolbar>` pinned overflow items renderen in de popover.
- `<nldd-menu-bar>` reserveert overflow-button ruimte alleen bij overflow.
- `<nldd-top-navigation-bar>` utility-menu rechts-uitgelijnd + breathing room op max-md; consumer-set menu-bar-label wordt niet meer overschreven.
- combo-box / number-field / search-field input vult volledige wrapper hoogte.
- `<nldd-password-field>` placeholder gebruikt text-font.
- `<nldd-title>` sized variants honoreren layout-container size op smMax.
- `<nldd-document-tab-bar>` dismiss-button hover/active in dark mode.
- `<nldd-collection>` load-more button stretcht via `button[width="full"]`.

* feat!: bugs and housekeeping — menu, container, variant API, icon API, CSS refactor pass ([d53da4d](https://github.com/MinBZK/storybook/commit/d53da4d))

## <small>0.8.44 (2026-05-16)</small>

### Highlights

Substantial branch: several components reworked, **7 breaking changes**, plus accessibility improvements, bug fixes and new icons. 90 commits. Read the breaking changes before upgrading.

### Breaking Changes

- **menu**: drill-in chain reworked — opener no longer toggles its submenu; anchor state is synced. Open/close behaviour changes; review any code reaching into menu internals.
- **rich-text**: rebuilt on CSS grid with named columns + new `centered` mode; blockquotes/tables now bleed wider. Check custom rich-text styling.
- **sheet**: `full-height` boolean removed → `height` attribute (`full` default | `fit-content` | CSS length); `width` for side sheets.
- **icon-button**: `hide-tooltip` removed → `tooltip-timing` (`default` | `instant` | `never`).
- **split-button**: `start-icon` → `icon`; popup-button container restructured.
- **password-field**: toggle-button attributes prefixed `button-`.
- **styles**: `is-open` CSS variables renamed to `is-expanded`.
- **link**: moved from `actions` to `navigation` — update the import path / export subpath (`navigation/link`).

### Menu (drill-in rework)

- Root-owned registry drives chain collapse instead of walking stale parent links: fixes anchor-click not closing after multiple navigations and bounce-back to root.
- Re-resolve drill-in side per reposition (no frozen/mid-chain flip).
- No sticky highlight / press-flash on touch; don't collapse on a touch-scroll started outside; reposition after scroll/resize.
- Remove orphaned drill-in submenu when the parent disconnects; close on window resize.
- Seed `aria-haspopup` for empty `popup-type`; subpixel-safe px custom-prop parsing; safe-triangle stall-dismissal 750ms → 500ms.
- **A11y: polite `role="status"` live region announces drill-in view changes (WCAG 4.1.3)** — entered submenu on drill-in, destination on back / ArrowLeft / Esc; cascade & collapse-all stay silent.

### Added

- **button**: forwards `popoverTargetElement` (IDL) across the shadow boundary — drive popovers in another shadow root.
- **menu-bar**: overflowed expandable items render as nested submenus in the overflow menu.
- **keyboard-shortcut**: per-OS overrides (`mac-keys` / `windows-keys` / `linux-keys`) + automatic OS detection.
- New icons: books-vertical, clock, clock-arrow-clockwise, eyeglasses, starburst-filled, square-on-square (+ aliases incl. `copy`).

### Changed

- **`accessible-label` exposed as a Storybook control** on 17 components that supported the attribute but lacked the control.
- WCAG target-size + simplified styling for tab-bar / segmented-control / pagination.
- Drop non-functional `aria-controls` on the overflow button; sheet warns once in DEV on missing label / invalid height.
- Refreshed u-turn arrows, puzzle-piece, books-vertical, eyeglasses, starburst-filled.
- Concentric CSS property-ordering convention documented + applied; removed unused `--primitives-space-22`; tighter button gaps.

### Fixed

- dropdown focus-state inverted to failure-safe; pagination prev/next above divider, no mouse focus ring on select.
- segmented-control icon-only items fill custom width; inputs custom width capped at container (`max-width: 100%`).
- full-bleed-section body horizontally centered (matches simple-section); touch uses `pointerdown` not `mousedown`.
- OS detection refined: Android → other, UACH `iOS` → mac, ChromeOS classified correctly (more accurate `keyboard-shortcut`).

* feat!: component reworks, breaking changes, fixes & new icons ([149f5aa](https://github.com/MinBZK/storybook/commit/149f5aa))

## <small>0.8.43 (2026-05-13)</small>

### Highlights

Brede design-system polish over componenten, tokens en a11y. Bevat meerdere breaking changes — markered met `!` per commit.

- **A11y fixes (review)** — Buttons en icon-buttons die een menu/popover openen krijgen nu correct `aria-expanded` (was: weggelaten bij `open=false`, WCAG 4.1.2 violation). Nieuwe `popup-type` attribute (`'menu' | 'listbox' | 'dialog' | 'tree' | 'grid'`) forwardt naar `aria-haspopup`. Split-button + combo-box gemigreerd naar de nieuwe API.
- **Trigger API consolidation (BREAKING)** — `open` boolean → `expanded` op `nldd-button`, `nldd-icon-button`, `nldd-token`, `nldd-menu-bar-item`. `expanded` mapt 1-op-1 op `aria-expanded`, geen botsing met HTML-native `<dialog open>` / `<details open>` (container-semantiek), en vormt een natuurlijk paar met `expandable`. Token's `toggle` event detail key ook hernoemd (`{ open }` → `{ expanded }`).
- **Tooltip API consolidation (BREAKING)** — `disabled` + `instant` booleans → één `timing` enum (`'instant' | 'default' | 'never'`). Eén concept, mutually exclusive waarden.
- **Tag/badge API consolidation (BREAKING)** — `variant` → `color` op tag en badge (pure kleurvarianten, geen style-dimensie zoals filled/outlined).
- **Token housekeeping** — nieuwe `--semantics-buttons-{size}-icon-size` + `-icon-only-icon-size` voor consistent icon-sizing in de button-familie. Ongebruikte `--primitives-breakpoint-*` vars verwijderd. Box-shadow en backdrop hebben nu één bron van waarheid (`color-scheme` CSS property) ipv een dubbele detectie via `prefers-color-scheme` media query + `data-scheme` attribuut.
- **Rename `layout-area` → `layout-container`** in container queries en CSS class — consistenter met de responsive-css conventie.
- **Rename `toolbar-title-group` → `toolbar-title`** (+ `subtext` → `supporting-text`).
- **Nieuwe features** — 19 rijkskleur-varianten op tag. `single-line` attribuut op button met ellipsis-vriendelijke layout. Responsive cells via named `list-container` (`hide-below`/`hide-above` via `VisibilityMixin`). Scoped `html, body` reset voor `<nldd-app-view>` shells (via `:has()`, in `@layer reset`). `tooltip.timing="instant"` voor directe hover-show.
- **Storybook DX** — alle stories naar NL. Optionele select-controls gebruiken het `'(geen)'` label-mapping patroon zodat de placeholder verdwijnt en de "geen waarde"-state een echte optie wordt.
- **Tests** — smoke coverage voor button/icon-button aria-expanded combinaties, popup-type forwarding, single-line, width-API en variants.

### Breaking Changes

Migration guide:

```diff
- <nldd-button open>Acties</nldd-button>
+ <nldd-button expanded>Acties</nldd-button>

- <nldd-icon-button expandable aria-haspopup="menu">…</nldd-icon-button>
+ <nldd-icon-button expandable popup-type="menu">…</nldd-icon-button>

- <nldd-tooltip disabled>…</nldd-tooltip>
+ <nldd-tooltip timing="never">…</nldd-tooltip>

- <nldd-tooltip instant>…</nldd-tooltip>
+ <nldd-tooltip timing="instant">…</nldd-tooltip>

- <nldd-tag variant="success">Live</nldd-tag>
+ <nldd-tag color="success">Live</nldd-tag>

- <nldd-toolbar-title-group text="…" subtext="…">
+ <nldd-toolbar-title text="…" supporting-text="…">

  // token toggle event
- token.addEventListener('toggle', e => { e.detail.open })
+ token.addEventListener('toggle', e => { e.detail.expanded })
```

* feat!: bugs and housekeeping — tokens, refactors, A11y fixes ([d54ed9e](https://github.com/MinBZK/storybook/commit/d54ed9e))
