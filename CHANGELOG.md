# Changelog

All notable changes to the NLDD design system are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Versions are bumped automatically by semantic-release on merge to main —
the type of conventional-commit determines the release. Conventional types
`chore`, `docs`, `ci`, `style`, `test`, `build` are intentionally omitted
here; consult the commit history if you need that level of detail.

### Highlights

- **A filterable listbox for `nldd-list`.** New `type="listbox"` turns a list into a combobox-pattern listbox: it renders its own search input, `.list__items` becomes a `role="listbox"` of `role="option"` items, and the active option moves via `aria-activedescendant` while focus stays in the input (the highlight is gated on input focus). Filtering stays consumer-managed; `toolbar` and `search-bar-end` slots and an `accessible-label` round it out.
- **`nldd-sidebar-section` page section.** A sidebar beside the main content: a sticky, scrollable tinted box (max 320px) when the section is wide, collapsing into a left sheet (a bottom sheet on mobile) with a built-in title bar when it gets narrow. The switch follows the section's own width (a ResizeObserver), not the viewport, so it adapts to the space it sits in; `no-collapse` opts out and stacks the sidebar above the main instead. Ideal for list and overview pages with a filter sidebar, or long articles with a table of contents.
- **Configurable `nldd-hero` media.** A `media-aspect-ratio` (default 21/9) plus `media-src` / `media-srcset` / `media-sizes` / `media-alt` render the hero image internally, so a simple hero needs no slotted `<img>`; slotted media still wins when present. (The old `media-corner` attribute is renamed to `media-corner-position` — see Breaking.)
- **Definition lists in `nldd-rich-text`.** Responsive `dl` / `dt` / `dd` term-definition layout, so glossaries and key/value content render as aligned term/definition pairs that adapt to the available width.
- **`nldd-card` as a link.** `href` / `target` / `rel` turn the whole card into a clickable link via an overlay anchor; `target="_blank"` auto-resolves `rel` and announces a new-tab hint, and `accessible-label` names the link without a double announcement.

### Added

- **`nldd-list` listbox** — `type="listbox"`: a filterable combobox-pattern listbox with a built-in search field, `role="listbox"`/`role="option"` items, an active option that moves via `aria-activedescendant` (focus stays in the input), plus `toolbar` and `search-bar-end` slots and an `accessible-label`.
- **`nldd-hero` media** — `media-aspect-ratio` (default 21/9) plus `media-src` / `media-srcset` / `media-sizes` / `media-alt` render an internal `<img>`; slotted media still wins when present. (See Breaking for the `media-corner` rename.)
- **`nldd-rich-text` definition lists** — responsive `dl` / `dt` / `dd` term-definition layout.
- **`nldd-card` links** — `href` / `target` / `rel` make the whole card a clickable link via an overlay anchor; `target="_blank"` auto-resolves `rel` and announces a new-tab hint, and `accessible-label` names the link.
- **`nldd-container`** — fills the full width of a flex parent (`width: 100%` + `box-sizing: border-box`).
- **`nldd-container` lanes** — `layout="lanes"`: native CSS grid-lanes where supported, CSS multicol fallback otherwise (CSS-only, no JS). Honours `gap` on both axes and `column-count`.
- **`nldd-sidebar-section`** — a page section with a left sidebar: a sticky, scrollable tinted box (max 320px) beside the main when wide, collapsing into a left sheet (bottom on mobile) with a default title bar (the `sidebar-label` as title plus a close button, overridable via the `sheet-top-title-bar` slot) when narrow. The collapse is container-driven (the section's own width via a ResizeObserver), and `no-collapse` stacks the sidebar above the main instead. It reflects a read-only `collapsed` attribute, fires `collapse-change`, and exposes `show()` / `hide()` / `toggle()` for the sheet (the consumer owns the trigger, revealed via `[collapsed]`). Tunable via `width`, `sticky-top` / `sticky-bottom` (default 16px) and `sidebar-label`.
- **`nldd-top-navigation-bar`** — a `width` attribute caps the bar content to a max-width so it lines up with page-section content; `full` spans the full width, or a CSS length overrides the default.

### Changed

- **Link colors** (default/hover/active, light + dark) now use the `accent` palette instead of `lintblauw`.
- **`nldd-search-field`** — clicking the leading icon or the field's gutter now focuses the input (native `<label>`, no JS); an empty field no longer reserves a dead click zone on the right.
- **`nldd-navigation-split-view`** — `sidebar` is renamed to `primary-sidebar`; the old slot, attributes and sheet methods keep working as deprecated aliases.
- **`nldd-icon`** — the `privacy` alias now points at `shield-lock` (was `hand`).
- **`nldd-button`** — the space between the icons and the label is now a flex gap on the button content instead of padding on the text, so text-only buttons share the same inline edge padding as icon buttons (text buttons end up marginally tighter; the icon-to-label spacing is unchanged).
- **`nldd-collection`** — the `list` layout is renamed to `stack` to match `nldd-container`; `list` keeps working as a deprecated alias.

### Fixed

- **`nldd-list`** — switching `variant` at runtime (box to simple) no longer leaves items wrongly boxed; the list now drives `variant`/`type` onto its items instead of relying on a per-item observer.
- **`nldd-just-in-time-education`** — the callout is positioned absolutely so it scrolls natively with the page, fixing the Safari bounce.
- **`nldd-rich-text`** — table columns size to their content: the `th` min-width is unset on containers ≥ 641px (the data cells already did this), and inline code inside cells may wrap so long tokens (e.g. `type_spec.precision`) no longer force a column wide.
- **`nldd-rich-text` / `nldd-container`** — the rich-text host (and container slotted items) now use `box-sizing: border-box`, so padding or a border no longer makes the element overflow its slot or grid/column track.

### Breaking

- **`nldd-window`** — no longer draggable: drag-to-move added more complexity than a window inside a browser tab warrants. The `movable` attribute and the `window-drag-handle` hook are removed; the window stays positionable via `top`/`left`/`right`/`bottom`/`centered`. For genuine window management, open content in a new browser tab instead.
- **`nldd-breadcrumbs`** — no auto-collapse: the `no-collapse` attribute and the ellipsis expand button are removed. The trail always renders in full and wraps onto multiple lines.
- **`nldd-hero`** — the `media-corner` attribute is renamed to `media-corner-position` (freeing the `media-corner` namespace for the new media attributes).

## <small>0.8.63 (2026-06-18)</small>

* feat: just-in-time-education, list arrow-key navigation, activity-indicator overlay, plus consumer-r ([1e6bf86](https://github.com/MinBZK/storybook/commit/1e6bf86)), closes [#130](https://github.com/MinBZK/storybook/issues/130)

### Highlights

- **`nldd-just-in-time-education` coach-mark.** A new component for in-context guidance: anchored to a control with a curved dashed arrow, a dimming overlay, and three dismiss routes. Near a viewport edge it degrades gracefully — the arrow shortens first, then the card narrows (down to a usable floor), and the arrow drops once it would fall below its minimum.
- **`nldd-activity-indicator` overlay mode.** Put content in the default slot and the indicator overlays it on a small rounded panel over a frosted backdrop, making the content `inert` while loading; fades in and out via the loading state. (See Breaking.)
- **`nldd-status-bar` now mounts under Vue, React and other `createElement`-based frameworks** (reported by a consuming team). The ARIA setup moved from the constructor to `connectedCallback`: a custom-element constructor may not add attributes, so `document.createElement` previously threw `NotSupportedError` and the bar never upgraded (no shadow root, no role, height 0).
- **`nldd-inline-dialog`** no longer trips Lit's change-in-update warning on the initial slot sync (reported by a consuming team).
- **List arrow-key navigation.** Opt-in `arrow-navigation` on `nldd-list`: ArrowUp/Down move focus between the interactive items (wrapping), Home/End jump to first/last, and the list becomes a single tab stop so Tab moves past the rest. Focus only (selection stays consumer-managed). For simple lists where each item has one action; mutually exclusive with `reorderable`.

### Added

- **"Opens in new tab" announcement** on `nldd-button`, `nldd-icon-button` and `nldd-link` for `target="_blank"` links, mirroring `nldd-list-item` (WCAG 2.1 SC 3.2.2). Wording overridable via `translations`.
- **`nldd-byline` single avatar** via `avatar-src` / `avatar-srcset` attributes — no slot needed for one avatar.

### Fixed

- **`nldd-tab-bar` stays within its container** and truncates overflowing item text with an ellipsis (column-grid layout); short tabs keep their own width and icon-only items keep their fixed size. It also no longer self-selects in navigation mode.
- **`nldd-list-item` press feedback no longer flashes while scrolling on touch** — it is cleared when the touch turns into a scroll (`pointercancel`).
- **`nldd-collection`** shows its scroll controls and edge fade only when the content actually overflows.
- **`nldd-page-footer`** with no content shows only the accent line, without the grey surface.
- `width: 100%` fixes on `nldd-form-field`, `nldd-form-actions` and `nldd-document-tab-bar`.

### Breaking

- **`nldd-activity-indicator`:** a custom indicator override moved from the default slot to the new `indicator` slot, since the default slot now holds the wrapped content — `<nldd-progress-bar slot="indicator">`.
- **`nldd-list-item` translation key** `components.list-item.opens-in-new-tab-label` was renamed to `components.list-item.opens-in-new-tab-text`; update any `translations` override.

## <small>0.8.62 (2026-06-16)</small>

* fix(list): fill the width under justify-self: start parents (rich-text) (#129) ([fd11dc3](https://github.com/MinBZK/storybook/commit/fd11dc3)), closes [#129](https://github.com/MinBZK/storybook/issues/129)
* ci(release): generate the plugin version after the npm version bump (#128) ([75bc4dd](https://github.com/MinBZK/storybook/commit/75bc4dd)), closes [#128](https://github.com/MinBZK/storybook/issues/128)

## <small>0.8.61 (2026-06-16)</small>

* feat!: edge & document icons, list-item links, automatic bar-split-view dividers, and dark-mode fixe ([32e05fa](https://github.com/MinBZK/storybook/commit/32e05fa)), closes [#127](https://github.com/MinBZK/storybook/issues/127)

### Highlights

- **Edge-navigation and document icons.** New `arrow-left-to-line` / `arrow-right-to-line` and `chevron-left-to-line` / `chevron-right-to-line` glyphs for "move to edge" affordances, a `file-text-stack` document icon, and an `open-new-page` alias.
- **Automatic `nldd-bar-split-view` dividers (breaking).** Dividers now appear only where the main pane meets an adjacent bar, on every breakpoint; the consumer-managed `no-divider` attribute is removed.
- **List rows can open in a new tab.** `nldd-list-item` forwards `target` and `rel` to its anchor.
- **Dark-mode and layout polish.** Neutral tags and banners no longer blend into a tinted surface in dark mode, alongside `nldd-button` full-width / disclosure-gap and `nldd-toolbar` item-sizing fixes.

### Added

- **Icons** — `arrow-left-to-line` / `arrow-right-to-line` and `chevron-left-to-line` / `chevron-right-to-line` ("move to edge" affordances), `file-text-stack` (with `documents` aliases), and an `open-new-page` alias for `square-arrow-right-top`.
- **`nldd-list-item`** — forwards `target` and `rel` to the underlying `<a>`, so a link row can open in a new tab (`target="_blank" rel="noopener noreferrer"`). With `target="_blank"` it also injects a visually hidden "opens in new tab" announcement for assistive technology (WCAG 2.1 SC 3.2.2), overridable via the `translations` property.

### Breaking

- **`nldd-bar-split-view`** — dividers are now placed automatically wherever the main pane meets an adjacent bar (directly above and/or below it), at every breakpoint including `sm`, and never between two stacked bars on the same side. The consumer-managed `no-divider` attribute is **removed and ignored** — drop any usage. Bars on `sm` now show a divider where they meet main (previously `sm` had none).

### Fixed

- **`nldd-toolbar`** — toolbar item sizing (`width` / `min-width` / `max-width`) is now read as a DOM property as well as an attribute, so framework-set values (e.g. a Vue `width` binding) are no longer missed; real values reflect back to attributes while defaults stay unset.
- **`nldd-button`** — `full-width` no longer stretches the button vertically inside a column flex parent, and the disclosure icon (when `expandable`) no longer doubles the trailing gap.
- **`nldd-tag` / `nldd-banner`** — the neutral tinted background no longer collapses onto the tinted surface in dark mode (both resolved to the same gray, hiding the chip); it now sits a step lighter, with its border preserved.

## <small>0.8.60 (2026-06-16)</small>

* fix(plugin): laat plugin-versie de pakketversie volgen (#126) ([d90d9fd](https://github.com/MinBZK/storybook/commit/d90d9fd)), closes [#126](https://github.com/MinBZK/storybook/issues/126)
* refactor(skills): vouw ontwerprichtlijnen in de nldd-consumer-skill (#125) ([a53eaef](https://github.com/MinBZK/storybook/commit/a53eaef)), closes [#125](https://github.com/MinBZK/storybook/issues/125)

## <small>0.8.59 (2026-06-15)</small>

* feat!: richer menus, multi-level mobile nav, keyboard-shortcut variants, and a loading backdrop (#12 ([8b01ea9](https://github.com/MinBZK/storybook/commit/8b01ea9)), closes [#124](https://github.com/MinBZK/storybook/issues/124)

### Highlights

- **Richer menus.** `nldd-menu` items can now be links (`href`) and show keyboard-shortcut hints, and the menu sizes to its content up to a viewport-aware maximum.
- **Multi-level mobile navigation.** The `nldd-top-navigation-bar` mobile menu sheet now supports nested, multi-level menus with drill-down navigation and a back button per level.
- **Keyboard-shortcut variants.** `nldd-keyboard-shortcut` gained `box` and `simple` variants, `sm` / `md` / `inherit` sizes and `neutral` / `inherit` colors, so a shortcut fits both a standalone keycap and inline running text.
- **Loading backdrop.** `nldd-activity-indicator` can dim and blur the content behind it while loading (opt-in `backdrop`), and a static-skeleton-loading principle was added to the `Docs/Ontwerprichtlijnen` reference.

### Added

- **`nldd-menu`** — menu items accept an `href` (rendered as a real `<a>`, so middle-click and open-in-new-tab work) and a keyboard-shortcut hint (`shortcut`, `shortcut-mac`, `shortcut-windows`, `shortcut-linux`); the menu now sizes to its content between a minimum and `min(100vw - inset, 640px)`, with an explicit `width` to pin it.
- **`nldd-keyboard-shortcut`** — a `box` (keycap) and `simple` (plain-text) variant, `sm` / `md` / `inherit` sizes (the `inherit` size scales with the surrounding text), and `neutral` / `inherit` colors (the latter follows `currentColor`, e.g. on a colored panel).
- **`nldd-activity-indicator`** — an opt-in `backdrop` that dims and blurs the content underneath while loading: the context parent background color (fallback: base surface) at one minus the disabled opacity, plus a backdrop blur.
- **`nldd-top-navigation-bar`** — the mobile menu sheet supports multi-level (drill-down) menus, with a back button per level.

### Changed

- **`nldd-byline`** — on a small container (≤ sm), a byline with two or more avatars stacks the avatar row above the names so the text keeps the full width; single-avatar bylines stay inline.

### Breaking

- **`nldd-menu`** — the `translations` key `components.menu.back` was renamed to `components.menu.back-action` (matching the existing `components.menu.submenu-back-action`); the rendered label is unchanged. Update any `translations` override that sets the old key.

### Fixed

- **`nldd-hero`** — full-width media (`main-width="full"`) now stacks beside the text panel instead of behind it, so the media's rounded corner is no longer hidden by the panel.
- **`nldd-multi-line-text-field`** — with `resize="auto"`, the configured `rows` is honored as a minimum height, so the field no longer shrinks below it (it still grows with content).
- **`nldd-top-navigation-bar`** — menu sheet list items render as real `<button>` elements.

## <small>0.8.58 (2026-06-12)</small>

* feat!: status bar, byline, hero, on-color support, and rich-text width zones (#123) ([5932b63](https://github.com/MinBZK/storybook/commit/5932b63)), closes [#123](https://github.com/MinBZK/storybook/issues/123)

### Highlights

- **Three new components.** `nldd-status-bar` (a 24px page-level status strip with a deep background per variant, optionally a link or button), `nldd-byline` (author/editor line with overlapping avatars, a name and supporting text) and `nldd-hero` (a rijkshuisstijl page header with the shape-language rounded corner and a positionable text panel).
- **On-colored surfaces.** `color="inherit"` on `nldd-title` and `nldd-rich-text`, plus `inherit-filled` / `inherit-tinted` variants on `nldd-button` and `nldd-icon-button`, let text and controls take their color from a colored panel (the hero, a filled category) with guaranteed contrast.
- **Rich-text width zones.** Tables, code blocks and components now span wider than the reading column by default, with a `data-width` per-child override. *(Breaking.)*
- **Breadcrumbs collapse** deep trails behind an ellipsis by default. *(Breaking.)*
- **`coolgray` removed** as a category/color value, and **`nldd-list-item`** now opts into its button mode with a boolean `button` attribute. *(Breaking.)*
- **Category color styles.** Every category color now comes in three styles — `filled` (saturated), `tinted` (a soft tint with colored text and a same-hue outline) and `reference` (the true rijkshuisstijl brand color) — addressed as `--semantics-categories-{color}-{style}-*`. `nldd-tag` and `nldd-banner` adopt `tinted`; the hero paints its panel with `reference`. *(Breaking.)*
- **Design-guidelines reference.** A new `Docs/Ontwerprichtlijnen` Storybook page gathers the design system's interface principles — input and forms, navigation, feedback, microcopy, visual hierarchy and process — as one reference for design and review.

### Added

- **`nldd-status-bar`** (status & feedback) — a 24px-high, full-width status strip with a deep background per variant (`neutral`, `accent`, `success`, `warning`, `critical`). Text-only; set `href` to make the whole strip a link or `button` to make it a button, otherwise it is static. `role` / `aria-live` follow the variant.
- **`nldd-byline`** (content) — a byline with an optional `avatars` slot (overlapping, ring-separated images), a name line and supporting text. The name and supporting text accept rich content via slots (e.g. a `<time>` element or a link).
- **`nldd-hero`** (layout / page sections) — a rijkshuisstijl page header: a media surface with exactly one rounded corner (radius derived from the logo ribbon width) and a text panel placeable on six positions (`main-position`) at `1/2`, `2/3`, `3/4` or `full` width (`main-width`). `main-background` paints the panel with the reference (true brand) category color, identical in light and dark mode; without media the panel fills the hero.
- **`color="inherit"`** on `nldd-title` and `nldd-rich-text` — all text follows the surface color (`currentColor`) for use on colored panels; links keep their underline, secondary text takes a reduced-opacity tier.
- **`inherit-filled` and `inherit-tinted` button variants** on `nldd-button` and `nldd-icon-button` — derive their colors from `currentColor` for colored surfaces. `inherit-filled` uses the surface color as its label via `--context-parent-background-color`, with a white/black contrast flip as fallback. Both support the `expanded` state, and their supporting text takes the full label color (not a faded tier) so it keeps the same guaranteed contrast.
- **Brand ribbon tokens** — `--semantics-brand-ribbon-{sm,md,lg}-width`, the rijkslogo ribbon width that also drives the hero corner radius.
- **On-color tokens** — `--semantics-content-secondary-opacity` (secondary-text opacity tier) and `--semantics-content-contrast-color` (the white/black-against-`currentColor` flip).
- **`nldd-blockquote`** accepts an `nldd-byline` as its `attribution` (the leading em-dash is dropped for a byline).
- **Rich-text images** get the controls medium corner radius.
- **Category `tinted` and `reference` color styles** — alongside `filled`, each category color exposes a `tinted` style (a soft tint with a same-hue outline and colored text, ~525 steps deeper for AA contrast) and a `reference` style (the true rijkshuisstijl brand color, identical in light and dark mode via a mirrored step). Each style provides `background`, `highlight-border`, `primary-content` and `secondary-content` colors.

### Breaking

- **`nldd-list-item` interactive mode** — `type="button"` is replaced by the boolean `button` attribute, aligning the opt-in across default-static components (`nldd-list-item`, `nldd-status-bar`): `href` = link, `button` = button, neither = static. The `ListItemType` export is removed.
- **`nldd-breadcrumbs`** — trails of four or more levels now collapse by default to `Home › … › {parent} › {current}`. The ellipsis is a button that reveals the hidden levels in place (they stay in the DOM for crawlers). Set `no-collapse` to always show the full trail.
- **`nldd-rich-text` width zones** — children other than text now span wider by default. Text (headings, paragraphs, lists, `div` / `section`) and blockquotes stay at the reading measure; `img` / `figure` / `video` / `iframe` and tables take the wide accent; code blocks and components span the full column. Override per child with `data-width="main|wide|full"`.
- **`coolgray` removed** — no longer a color/category value on `nldd-badge`, `nldd-tag`, `nldd-progress-bar`, `nldd-progress-circle` or the hero `main-background`; the matching filled-semantics and component tokens are gone. The `neutral` palette (which aliases the coolgray primitives) is unaffected.
- **`--components-banner-content-secondary-color` removed** — banner supporting text now always uses the primary content color. Consumers who overrode this token to recolor the supporting text will need to remove that override.
- **Category tokens renamed and regrouped** — `--semantics-categories-filled-{color}-*` is now `--semantics-categories-{color}-filled-*`, grouped per color and moved directly below the content colors. `border-color` is renamed `highlight-border-color`, and `content-color` splits into `primary-content-color` / `secondary-content-color`.
- **Per-component category tokens removed** — the `--components-{badge,tag,progress-bar,progress-circle,banner}-{color}-{background,border,content,icon}-color` pass-throughs are gone; these components now read the `--semantics-categories-{color}-{style}-*` tokens directly. Point any external references at the semantic category tokens.

### Changed

- **Banner supporting text** now uses the primary content color instead of the secondary color.
- **`nldd-button-group`** keeps full width in its horizontal orientation, so full-width children stretch; content-sized buttons still sit at the start of the row.
- **`nldd-tag`** now uses the `tinted` category style — a soft tinted fill with same-hue text and a subtle same-hue outline, replacing the saturated filled look.
- **`nldd-banner`** is repainted from the shared category `tinted` tokens (its bundled `--components-banner-{color}-*` tokens are removed); the icon takes the saturated `reference` brand color (it is decorative, so the softer contrast against the tint is acceptable).

### Fixed

- **`nldd-code-viewer`** — prevent iOS text autosizing from inflating the code on mobile.

## <small>0.8.57 (2026-06-09)</small>

* feat!: lg size, highlight borders, new icons, and toolbar/input refinements (#122) ([e9f0570](https://github.com/MinBZK/storybook/commit/e9f0570)), closes [#122](https://github.com/MinBZK/storybook/issues/122)

### Highlights

- **A coordinated `lg` size** across the action and navigation controls — `nldd-button`, `nldd-icon-button`, `nldd-button-bar`, `nldd-split-button`, `nldd-toolbar`, `nldd-tab-bar`, `nldd-toggle-button`, and `nldd-segmented-control` — for larger touch targets and stacked icon-over-text action-bar affordances.
- **`neutral-base` button variant** — a new low-emphasis variant backed by a dedicated token set (neutral-base, per-state secondary-content, highlight-border).
- **Highlight border for controls and control groups** — a per-state highlight border drawn through an `::after` overlay (so it spans dismiss buttons instead of being clipped), both on individual controls (buttons, tokens, dropdowns) and as a single grouped border around control groups (steppers, pagination, tab bars, toggle and segmented controls, document tabs, split buttons, button bars).
- **`nldd-toolbar` items and title as elements** — `nldd-toolbar-item` and `nldd-toolbar-title` are declared custom elements that render and size their own box (`width` / `min-width` / `max-width`); the toolbar measures and lays them out, accepts `nldd-menu-group` in the overflow menu, and overflows items that share an explicit `priority` together.
- **35 new icons** — `accessibility` (`a11y`), `app`, `arrow-left-right`, `binoculars` (`explore`, `discover`), `blocks-9` (`building-blocks`), `book-batch-play`, `brick-wall`, `centralized-network`, `cylinder-2-big-small-split` (`coins`), `cylinder-split-badge-lock`, `desk-with-screen` (`workplace`), `diamond` (`gem`, `quality`), `file-box` (`archive`), `file-text-batch-check-mark`, `file-text-pencil`, `foundation`, `globe-rack-server` (`dns`), `hand` (`privacy`), `handshake`, `key`, `leaf` (`sustainability`), `pencil-ruler` (`design`), `pipeline-corner-2` (`pipeline`), `pipeline-machine-gear` (`pipeline-runner`), `pipeline-valve`, `point-bottom-left-to-point-top-right-s-curve-path` (`path`, `traject`), `radar` (`monitoring`), `score-meter`, `seal-check-mark` (`certified`), `shield` (`protection`), `shield-lock`, `shopping-cart` (`cart`), `square-and-arrow-down` (`save`, `import`), `stack-code`, `table-cells` (`table`).
- **Breadcrumbs** keep the full trail and wrap on small screens — the small-screen collapse-to-back-link is gone.

### Added

- **`lg` size** on `nldd-button`, `nldd-icon-button`, `nldd-button-bar`, `nldd-split-button`, `nldd-toolbar`, `nldd-tab-bar`, `nldd-toggle-button`, and `nldd-segmented-control`.
- **`neutral-base` button variant** plus the `--semantics-*` neutral-base, per-state secondary-content, and highlight-border tokens.
- **Highlight border**, drawn via an `::after` overlay (so it spans dismiss buttons instead of being clipped): a per-state border on individual controls (`nldd-button`, `nldd-token`, `nldd-dropdown`), and a single grouped border around control groups (`nldd-stepper`, `nldd-pagination` — focus drawn above the selected item, `nldd-tab-bar`, `nldd-toggle-button`, `nldd-segmented-control`, `nldd-document-tab-bar`, `nldd-split-button`, `nldd-button-bar`).
- **`icon-placeholder` fallback** on `nldd-tab-bar`, `nldd-toggle-button`, `nldd-segmented-control`, and `nldd-icon-button` — the icon and icon-and-text variants show a placeholder when no icon is supplied.
- **`nldd-button`**: a `supporting-text` attribute.
- **`nldd-icon-button`**: `hide-lg-text` — an icon-only `lg` control with a 28px icon and edge-stable padding.
- **`nldd-split-button`**: a full-width, left-aligned action with `no-highlight-border` on the nested controls, plus a `width` attribute (and `nldd-menu` press-drag-release now pierces shadow boundaries so it works inside the split button).
- **`nldd-document-tab-bar`**: per-state secondary content.
- **`nldd-image`**: `loaded` and `errored` host attributes for consumer CSS, and a transparent media background (gray only on error, LQIP while loading).
- **`nldd-page-sections`** (`one-half-one-half`, `one-third-two-thirds`, `two-thirds-one-third`): `__header` and `__footer` slots, rendered only when slotted.
- **`nldd-toolbar`**: `nldd-toolbar-item` and `nldd-toolbar-title` are now declared elements that render their own box and own their sizing — item `width` / `min-width` / `max-width` / `label` / `priority`, title `text` / `supporting-text` / `align` / `min-width` / `width` / `max-width`. The overflow menu also accepts `nldd-menu-group`, and items that share an explicit `priority` move in and out of the overflow menu together.
- **Icons** — the new icons (listed in Highlights) are normalized to the house format. New aliases for existing icons: `export` (→ square-arrow-up) and `settings` (→ gear).

### Changed

- **`nldd-image`**: the default shape is now square (was rounded); the `image__error-card` wrapper is dropped (the errored media provides the backdrop).
- **`nldd-card`**: square corners (border-radius removed).
- **`nldd-inline-dialog`**: smaller icons (md 48 → 40px, lg 56 → 48px).
- **`nldd-breadcrumbs`**: keeps the full trail and wraps on small screens; the small-screen collapse-to-back-link and its container-query machinery are removed.
- **Input fields**: autofill stays light in both color schemes — a light-yellow background with dark-amber text — instead of inverting in dark mode, via the new `--semantics-input-fields-is-autofill-content-color` token.

### Breaking

- **`nldd-tab-bar`**: the `compact` variant is removed. Use `size="lg"` — the icon-and-text variant at `lg` stacks the icon over the text, which is what `compact` did.
- **Button content-color tokens renamed**: `--semantics-buttons-*-content-color` → `--semantics-buttons-*-primary-content-color`, system-wide. Update any custom CSS that references them.
- **Button font tokens renamed**: `--semantics-buttons-{xs,sm,md,lg}-font` → `--semantics-buttons-{size}-primary-text-font`, system-wide. The supporting text gets its own per-size token (`--semantics-buttons-{size}-supporting-text-font`) instead of an inline primitive. Update any custom CSS that references the old names.
- **`nldd-button`**: the `horizontal-align` attribute is renamed to `horizontal-alignment`.
- **Icon renamed**: `table-badge-arrow-down` → `table-cells-badge-arrow-down`.
- **`nldd-image`**: the error translation key is renamed to `error-text`.

### Fixed

- **`nldd-rich-text`**: the table-header underline is kept (the last-row border is scoped to `tbody`).
- **`nldd-code-viewer`**: the actions button gets an isolated stacking context.
- **`nldd-table`**: the empty state no longer scrolls horizontally — the message spans the box width instead of the data columns.
- **`nldd-tab-bar`, `nldd-document-tab-bar`, `nldd-menu-bar-item`**: the link (anchor) variant shows the link cursor, matching `nldd-button`.

## <small>0.8.56 (2026-06-03)</small>

* feat(plugin): marktplaats voor de nldd-plugin (#121) ([a883ba0](https://github.com/MinBZK/storybook/commit/a883ba0)), closes [#121](https://github.com/MinBZK/storybook/issues/121)

## <small>0.8.55 (2026-06-03)</small>

* feat(plugin): consumentenskill voor het design system (#118) ([118c607](https://github.com/MinBZK/storybook/commit/118c607)), closes [#118](https://github.com/MinBZK/storybook/issues/118)

### Added

- **Consumer plugin (`nldd`)** — a Claude Code plugin with a single skill for developers building applications on `@nldd/design-system`, separate from the maintainer skills (`/component`, `/css`) that exist for the system itself. It pairs a handwritten vision and usage patterns (`skills/nldd/SKILL.md`) with a generated component reference (`skills/nldd/reference.md`, every `nldd-*` element with its attributes, slots, and events from JSDoc, plus the full icon set) and a generated copy of this changelog. Working examples cover plain HTML, Vue 3, layout/CSS tokens, and a full content page. The reference and changelog are regenerated and committed by the release pipeline so they stay in sync with the shipped version.

## <small>0.8.54 (2026-06-02)</small>

* feat!: data tables, activity indicator + loading buttons, and category reorg ([90f4951](https://github.com/MinBZK/storybook/commit/90f4951))

### Highlights

- **Data tables** — new `nldd-table` + `nldd-table-row` bring column-aligned layouts built on the existing cells. Columns are a CSS grid track list that every row shares through subgrid, a `header` slot pins the column headers, and rows are individually selectable. The table is always a boxed surface with a `base` or `tinted` background and full-bleed dividers; overflowing tables inside `nldd-rich-text` adopt the same look.
- **Activity indicator** — `nldd-progress` becomes `nldd-activity-indicator`, now defaulting to an inline, icon-sized `currentColor` ring that scales like an icon, with a `timing` choice between the 1000 ms anti-flash delay and an instant fade-in.
- **Loading buttons** — `nldd-button` and `nldd-icon-button` gain a `loading` state that overlays a centered `nldd-activity-indicator`: the label is hidden without a width jump, and the control stays focusable while it announces `aria-busy` and blocks activation.
- **Reorganized categories** — `menu` moves to **Actions** and **Lists & Menus** becomes **Lists & Tables**, making room for the new table family (import paths and Storybook nav change — see Breaking).
- **Two new icons** — `book` (aliases `guide`, `read`) and `lightbulb` (alias `idea`).

### Added

- **`nldd-table` + `nldd-table-row`**: a `columns` grid-track list applied once and shared by every row via subgrid for true column alignment; reuses `nldd-cell` (generic cells default to full width inside a table); a `header` slot rendered first with `columnheader` roles; per-row `selected` styling; an empty state ("Geen items"); and keyboard focus when the table scrolls horizontally. Always a boxed surface — `background="base"` (default) or `"tinted"`, full-bleed row dividers, inline padding on the rows.
- **`nldd-button` / `nldd-icon-button`**: a `loading` boolean that overlays a centered `nldd-activity-indicator`, hides the label without shifting width, sets `aria-busy`, blocks activation while staying focusable, and matches the control's size and color.
- **`nldd-activity-indicator`** (renamed from `nldd-progress`): a new default inline indicator — an icon-sized `currentColor` ring whose stroke scales with `size` (the `nldd-icon` scale, default `28`). A new `timing` (`'default' | 'instant'`, like `nldd-tooltip`) keeps the 1000 ms anti-flash delay or skips straight to the fade-in. `show-text` (default off) replaces `no-label`, with the accessible name always present via `aria-label`. `text`, `translations`, `complete`, and the overridable default slot are retained.
- **Cells**: `hide-below` / `hide-above` accept named breakpoints, resolved against the surrounding list/table width.
- **`nldd-rich-text`**: `<table>` elements are styled to match `nldd-table` (rounded boxed frame, full-bleed dividers, edge-inset cells).
- **Icons**: `book` (aliases `guide`, `read`) and `lightbulb` (alias `idea`).
- **Tokens**: a shared `--semantics-tables-*` range (border color/width, row padding, column gap, row min-height, selected-row colors) used by `nldd-table` and the rich-text tables.
- **`nldd-progress-bar` / `nldd-progress-circle`**: the indeterminate indicator now carries the same 1px token-colored highlight border as the determinate segment-indicators.

### Breaking

- **Component categories moved.** Import paths change: `…/lists-and-menus/*` → `…/lists-and-tables/*`, and `menu` moves to `…/actions/menu`. Storybook nav follows (`Components/Lists & Menus/*` → `Components/Lists & Tables/*`, `Menu` → `Components/Actions/Menu`).
- **`nldd-progress` → `nldd-activity-indicator`.** The element, class (`NLDDProgress` → `NLDDActivityIndicator`), and translation key are renamed with no alias. `no-label` is replaced by `show-text` (the label is now hidden by default).
- **Progress `segment` → `segment-indicator`.** `nldd-progress-bar-segment` → `nldd-progress-bar-segment-indicator` (and the circle equivalent); exported classes `NLDDProgress{Bar,Circle}Segment` → `…SegmentIndicator`; and the `--components-progress-*-segment-*` custom properties gain `-indicator`.
- **Surface tokens renamed** (same values) so the default variant is named alongside `tinted`:
  - `--semantics-surfaces-background-color` → `--semantics-surfaces-base-background-color`
  - `--semantics-surfaces-border-color` → `--semantics-surfaces-base-border-color`

### Fixed

- **`nldd-rich-text`**: the host now fills its container's width so a slotted grid resolves its `1fr` tracks in Firefox (Chrome/Safari already did).
- **`nldd-code-viewer`**: the copy button no longer sticks to the corner — it scrolls with the code.

## <small>0.8.53 (2026-05-31)</small>

* feat!: isolate slotted content, unify progress + corner-radius APIs, and refine components ([f84cfe2](https://github.com/MinBZK/storybook/commit/f84cfe2))

### Highlights

- **Slotted content is isolated from host CSS** across the text components — projected text no longer accidentally inherits host styles, keeping rendering predictable and accessible.
- **The progress bar and circle are more consistent** — they share a unified `value-display` API and aligned naming, so switching shapes is largely a one-name change: swap `nldd-progress-bar` for `nldd-progress-circle` and the attributes carry over.
- **A consistent corner-radius hierarchy** via one semantic surface token: banner, list, box and card share a single radius, and the menu aligns with the (sharp) overlay radius.

### Added

- **`nldd-segmented-control`**: an `icon-and-text` variant — items render an icon and label together (like the toggle button); the visible text carries the accessible name.
- **`nldd-toggle-button`**: shows an `icon-placeholder` when an icon variant has no icon (and for `icon-and-text` only when there is no text to fall back on).
- **`nldd-card`**: an inner highlight border that paints over the content (including full-width media), white-with-opacity and light/dark aware.
- **`nldd-banner`**: an `accent` variant with its own default icon and color.
- **`nldd-progress-circle`**: a 1px token-colored highlight border with per-size stroke widths.
- **Tokens**: `--semantics-surfaces-corner-radius` (a unified surface radius) and a medium body font-weight variant.

### Changed

- **BREAKING — `nldd-progress` / `nldd-progress-circle`**: unified `value-display` (`inline` / `tooltip` / `none`), added `value-text` to the circle, and aligned naming across the bar and circle (e.g. `header`→`caption`, `value`→`supporting-text`, `fill`→`background`, `hover-area`→`tooltip-area`). `accessible-label` now maps to `aria-valuetext` only — use `value-text` to override the visible value (inline and tooltip).
- **BREAKING — Icons**: `login`/`logout` replaced by `arrow-right-in-bucket` / `arrow-right-out-bucket` (the glyph changed; `login`/`logout`/`exit` remain as aliases).
- **Corner radius**: banner, list, box and card now share one surface tier, and the menu container follows the (sharp) overlay radius. The medium body font-weight is adopted where appropriate.

### Fixed

- **`nldd-code-editor`**: a 16px font on touch devices prevents the iOS focus-zoom (without disabling pinch-zoom).
- **`nldd-form-field`**: a tighter gap for the top-aligned header; the label stays readable over the focus ring.

## <small>0.8.52 (2026-05-29)</small>

* fix(image): use relative sample-image paths so they load under GH Pages base ([4c3150b](https://github.com/MinBZK/storybook/commit/4c3150b))

## <small>0.8.51 (2026-05-29)</small>

* feat: banner, progress family, image with LQIP, and new icons (#115) ([d217812](https://github.com/MinBZK/storybook/commit/d217812)), closes [#115](https://github.com/MinBZK/storybook/issues/115)
* docs: fix ndd -> nldd in skills en bestandsnamen uitlijnen met codebase (#117) ([50c5c68](https://github.com/MinBZK/storybook/commit/50c5c68)), closes [#117](https://github.com/MinBZK/storybook/issues/117)

### Highlights

- **Five new components**: `nldd-banner`, `nldd-progress-bar`, `nldd-progress-circle`, `nldd-progress`, and `nldd-image`. Between them they cover status messaging, loading-state visualization (single-value, multi-segment, distribution, indeterminate), and design-token-aware image presentation. The progress bar and circle share an API so swapping the shape is a one-attribute change; `nldd-progress` is a layout wrapper that delays the indicator by 1000 ms so quick loads don't flash a spinner.
- **Multi-color CSS-only LQIP placeholder** on `nldd-image`. Extends Lean Rada's CSS-only LQIP technique ([leanrada.com](https://leanrada.com/notes/css-only-lqip/)) with one quantized Oklab color per cell instead of grayscale-only cells, so photos with distinct hues (sky + foliage + warm subject) render as a multi-color placeholder rather than collapsing to a single dominant tint. No JS decoder, no blend modes — seven inline CSS variables drive seven background layers natively. A bundled `<nldd-lqip-encoder>` Storybook tool generates the `lqip` attribute string client-side.
- **Copy-to-clipboard on `nldd-code-viewer`**: a top-right button copies the rendered code with a one-shot "Copied" confirmation. Combined with the new `variant` + `background` attributes, snippets now look and behave like proper code blocks out of the box.
- **Six new icons**: `bell`, `bookmark`, `flag`, `star`, `tag`, and `photo-slash` (with a `broken-image` alias used by `nldd-image`'s error fallback). The icon gallery story also gains a search filter for easier discovery.

### Added

- `nldd-banner`: status/feedback component with semantic variants (info / success / warning / critical), filled default icons, optional dismiss button, and primary/secondary actions.
- `nldd-progress-bar` + `nldd-progress-bar-segment`: single `value` or multi-segment use, `progress` and `distribution` modes, 24 color variants (semantic + Rijkskleuren), indeterminate animation that cross-fades into and out of the determinate state, translatable copy.
- `nldd-progress-circle` + `nldd-progress-circle-segment`: circular sibling with the same API as the bar. Radius scales per size so the stroke (2–6 px on size 16–96) always stays inside the viewBox; the track color aliases the bar's so the two stay in lockstep.
- `nldd-progress`: layout placeholder that fills its parent and centers an indeterminate circle after a 1000 ms grace period. Caption defaults to a translated "Laden"; override the indicator via the default slot.
- `nldd-image`: styled `<img>` wrapper with `shape` (square / rounded / circle), `aspect-ratio` for CLS-free layout reservation, `object-fit`, `object-position`, `caption` + `credit`, a `width` attribute (`'full'` or numeric), `decorative`, and `srcset` / `sizes`. Renders `<figure>` + `<figcaption>` only when a caption or credit is present; consumer-supplied `<img>` / `<picture>` in the default slot override the internal one. Error fallback overlays a small neutral card with the new `broken-image` icon and the alt text.
- **CSS-only multi-color LQIP** for `nldd-image`. Extends Lean Rada's CSS-only LQIP technique ([leanrada.com](https://leanrada.com/notes/css-only-lqip/)) with per-cell color: the `lqip` attribute takes a CSV string `"base,c1,c2,c3,c4,c5,c6"` of seven 0-255 bytes, each packing an 8-bit Oklab triplet (2 bits L + 3 bits a + 3 bits b). The decoder renders six per-cell radial-gradients with smooth alpha falloff over the base color — no blend modes, no JS, native browser rendering. Cross-fades into the image on `load`, hides under `prefers-reduced-motion`, and the gradient is suppressed in the error state so the fallback card sits on a neutral background.
- `<nldd-lqip-encoder>` element + "LQIP encoder tool" Storybook page so consumers can generate the LQIP string in-browser. Encoder picks the base color from the dominant Oklab bucket (histogram) and quantizes every cell via brute-force `findOklabBits()` for accuracy near quantization boundaries; the tool renders the produced placeholder side-by-side with the source for visual verification.
- `nldd-code-viewer`: `variant` (`'simple' | 'box'`) and `background` (`'tinted' | 'base'`) attributes for shell-style framing, plus a copy-to-clipboard button. With `variant="simple"` + the copy button, the action pins flush to the host's top-right corner and the snippet keeps a minimum height of the button so the layout never clips it.
- `nldd-box`: `background` attribute (`'tinted'` default for a box on a plain page, `'base'` for a box on an already-tinted parent — the border ring picks the +2-step semantic so the frame still reads card-on-card).
- New surface tokens: `--semantics-surfaces-border-color` / `--semantics-surfaces-tinted-border-color` (+ matching `--components-box-*-border-color` pair). Used as a 1px inset ring across `nldd-box`, `nldd-banner`, `nldd-list`, and `nldd-code-viewer`.
- `nldd-progress`: `complete` boolean attribute clears `aria-busy` and hides the indicator while keeping the element mounted (for consumers who can't unmount). `no-label` boolean attribute suppresses the visible "Laden" caption when the surrounding UI already conveys loading.
- `nldd-image`: visually-hidden `aria-live="polite"` status region announces load failures mid-session (WCAG 4.1.3 Status Messages). The region stays empty until `_imageErrored` flips, so screen readers learn about a dynamic `src` swap that errored even though the visible error overlay was already there. Decorative images stay silent.
- `nldd-image`: `loading` and `fetchpriority` exposed as Storybook controls with LCP guidance; the `loading` JSDoc now warns that leaving `lazy` on a hero / LCP image silently regresses Core Web Vitals.
- `nldd-tooltip`: `nldd-tooltip-dismiss` event fired when Escape is pressed while `open=true`. The consumer controls the open lifecycle (e.g. an action-feedback timer) so we can't unilaterally clear it; the event lets them honor WCAG 1.4.13 (dismissible hover / focus content) without losing control.
- DEV-mode warnings on `nldd-image` for missing `alt` on non-decorative images and for non-positive `width` values that silently fall back to `full`.
- `nldd-collection`: arrow-key navigation when horizontal-scroll regions overflow, with a keyboard focus state on the scroll container.
- `nldd-tooltip`: `open` attribute for forced visibility.
- Generic horizontal-scroll regions (e.g. inside `nldd-code-viewer` and overflowing tables in `nldd-rich-text`) become keyboard-focusable when their content overflows.
- Icons: bell, bookmark, flag, star, tag, photo-slash (with `broken-image` alias).

### Changed

- `nldd-toggle-button`: variant styling is now driven from the rendered content (icon-and-text / icon-only / text-only) — the manual `variant` attribute is no longer needed.
- `nldd-collection`: focus ring renders as a shadow-DOM `::after` so it can sit above slotted cards.
- `nldd-banner` (post-initial iterations): filled default icons, lighter border + background, dismiss button alignment + spacing polished, accent variant dropped (use `nldd-inline-dialog` for accent emphasis), stories rebuilt around the new actions pattern. The edge changed from a real `border` to an inset box-shadow so child content keeps its exact position regardless of the edge weight, with a `forced-colors` fallback restoring a real border.
- `nldd-tag` and `nldd-badge` stories: `Variants` + `Rijkskleuren` merged into a single `Colors` story per component; tag color labels switched from concept-style strings (concept / nieuw / gepubliceerd / let op / afgewezen) to the semantic color names.
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

- `text-field`, `password-field`, `search-field`, `combo-box`, `multi-line-text-field`: autofill text color pinned to the content-color token via `-webkit-text-fill-color` so dark-mode autofill no longer paints dark browser-default text on the dark-amber autofill background.
- `nldd-collection`: initial left-arrow disabled state on first render.
- `nldd-top-navigation-bar`: website-title gets vertical breathing room at sm so it no longer kisses the top edge.
- Tokens: light-mode `--semantics-content-color` and link colors bumped so the new page-footer meets WCAG contrast.

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

- `background="default"` is now `background="base"` on `nldd-app-view`, `nldd-page` and the five split-view components (`nldd-split-view-pane`, `bar`, `navigation`, `side-by-side`, `stacked`). Same paint behavior, just a clearer name that matches the new `PageSectionMixin` vocabulary. Migration: search/replace `background="default"` → `background="base"` on these elements.
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

- **menu**: drill-in chain reworked — opener no longer toggles its submenu; anchor state is synced. Open/close behavior changes; review any code reaching into menu internals.
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
