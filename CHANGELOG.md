# Changelog

All notable changes to the NLDD design system are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Versions are bumped automatically by semantic-release on merge to main —
the type of conventional-commit determines the release. Conventional types
`chore`, `docs`, `ci`, `style`, `test`, `build` are intentionally omitted
here; consult the commit history if you need that level of detail.

### Highlights

- **New `nldd-date-picker`.** A calendar for a single date or a period. Usable on its own (inline in a page or a filter panel) and used inside `nldd-date-field`. Follows the W3C APG date picker grid: arrow keys move day by day, Page Up/Down a month, Home/End to the week's edges, and the month heading announces itself as you page. Optional ISO week numbers, a configurable first day of the week, and an `isDateUnavailable` callback to block dates. On a narrow screen or a touch device it switches to a compact layout with the month arrows and "Vandaag" along the bottom.
- **`nldd-date-field` opens that calendar instead of the browser's.** The native `showPicker()` could not be dismissed in Safari, so the button now opens `nldd-date-picker` in an `nldd-popover` — a bottom sheet on small screens, with a title bar and "Annuleer". `no-picker` still hides the button entirely.
- **`nldd-date-field` chooses a period.** With `range` the field shows two inputs with "t/m" between them and puts the calendar in range mode. The value is one ISO 8601 interval (`2026-07-06/2026-07-20`) under one `name`, so a form gets one field rather than two that can disagree. Picking a second date before the first completes the period backwards instead of starting over.
- **Bring your own calendar.** Put an `nldd-date-picker` in the field's `picker` slot to control what only a calendar knows — week numbers, first day of the week, blocked dates, its own translations. The field keeps writing `value`, `min`, `max` and `range`, so the form value cannot drift from what the calendar shows.
- **Relative bounds.** `min` and `max` accept `today` and `today±Nd/w/m/y` besides an ISO date, so "no earlier than today" or "at most three months out" needs no date arithmetic in the consumer.
- **New icons.** Media controls: `play`, `pause`, `play-pause`, `stop`, `forward`, `backward`, `forward-end`, `backward-end`, `forward-frame`, `backward-frame` (each with a filled variant). Plus `person-badge-plus` (alias `add-user`), `antenna-radio-waves` (alias `broadcast`), `megaphone`, `exclamation-2-circle`, `exclamation-3-circle`, `circle-grid-2x2-top-left-check-mark` and `square-corner-4`.

### Added

- **`nldd-date-picker`** (inputs) — new component. `value` for a single date, or `range` with `start` / `end`; `min` / `max` accept an ISO date, `today`, or `today±Nd/w/m/y`; `week-numbers` adds an ISO week column; `first-day-of-week` sets the leading column; `isDateUnavailable` (property) blocks individual dates while keeping them reachable with the keyboard; `accessible-label` names the grid; `translations` overrides the Dutch defaults. Fires `input` while a period is half-chosen and `change` once a value is complete.
- **`nldd-date-field`** — `range` for a period as a single ISO 8601 interval value; a `picker` slot for your own `nldd-date-picker`; `min` / `max` now also take `today` and `today±Nd/w/m/y`.

### Added

- **Vue template types.** `import '@nldd/design-system/vue'` declares every `nldd-*` tag for Vue's template type-checking, so a Vue consumer no longer maintains a hand-written declaration that falls behind. Generated from the manifest, so it cannot: props carry the component's own types (`size` is `'md' | 'sm'`, not `string`), attributes work both as written in markup (`week-numbers`) and in the form Vue normalises them to (`weekNumbers`), and events are the prop Vue derives from `@change`.
- **Custom Elements Manifest.** The package now ships `custom-elements.json` and points at it with the `customElements` field, so VS Code and JetBrains give autocomplete and hover documentation for `nldd-*` tags in plain HTML, with no extra setup. It is generated from the source rather than from the documentation, so a union like `'md' | 'sm'` stays a union instead of flattening to `string`. It is also the input for generated framework type declarations.

### Breaking

- **Icons: `batch` in a name is now `badge`.** Three icons show a small badge in the bottom-right corner, sharing that sub-glyph with `person-badge-gear` and `cylinder-split-badge-lock`. None of them shows a stack, so the name was simply wrong. Rename in your markup:

  | was | is |
  | --- | --- |
  | `book-batch-play` | `book-badge-play` |
  | `file-text-batch-check-mark` | `file-text-badge-check-mark` |
  | `file-text-batch-check-plus` | `file-text-badge-check-plus` |

  The old names are gone, also as aliases: a misspelling kept alive as an alias is a misspelling you keep reading in code review. The `new-text-document` alias follows the rename and needs no change.

### Fixed

- **`nldd-sheet` and `nldd-window` report closing through every route.** The public `close` event came only from `hide()`, but Escape on a `modeless` overlay closes through the browser's CloseWatcher, which the `cancel` handler cannot reliably stop. A modeless sheet therefore closed silently. Both now emit from whichever route actually closed, once per open cycle.
- **`nldd-popover` moves focus itself on Tab.** Safari does not tab into the contents of a top-layer element: with the popover focused it skipped the whole thing and landed on whatever followed in the document, leaving the popover open behind you. Tab and Shift+Tab now walk the popover's own focusables, and only leave (closing it) past the last one.
- **`nldd-popover` absorbs the first tap outside itself on a small screen.** There it renders as a bottom sheet with a dimmed backdrop, but a popover backdrop is paint and not a barrier, so one tap dismissed the sheet and activated whatever sat under the dimming. Tapping the anchor still closes it as before.

- **`nldd-side-by-side-split-view` and `nldd-stacked-split-view` follow the scroll mode.** Two of the five split views never took part in the root-scroll distribution, so on a narrow screen they kept clipping at viewport height while the layers inside them had already handed their scrolling to the document. Nothing scrolled at all. The side-by-side view is the one that decides the mode for everyone, since it fires `single-column-change`, but it never applied the result to itself.
- **`nldd-sheet` and `nldd-window` no longer take space in the flow.** Both render a `position: fixed` dialog, so the host only added an empty box. As a block it was a flex item like any other, and inside an `nldd-split-view-pane` it collected the pane's `::slotted` flex-grow and ate the height its siblings needed. Both are `display: contents` now, matching `nldd-modal-dialog` and `nldd-tooltip`. Every overlay in the system now measures zero in a flex column.
- **`nldd-just-in-time-education`** — the callout no longer shows the browser's own focus ring around the whole box, text and arrow included. The container takes focus on open so Escape and the dismiss button are reachable, and it now carries the design system's ring instead, with an offset, and only when the coach-mark was opened from the keyboard.
- **`nldd-popover`** — Tab no longer gets stuck inside a popover that contains a roving-tabindex widget (a calendar grid, a toolbar). The focus scan counted every `tabindex="-1"` element as focusable, so with a calendar inside it saw 41 "focusable" day buttons and never let focus move on.
- **Text selection on controls** — buttons, menu items, tabs and other controls no longer show a text selection highlight when dragged over on iOS and older Safari (`-webkit-user-select` alongside the standard property).

## <small>0.8.69 (2026-07-16)</small>

* feat: nldd-avatar, content-color token cleanup (breaking), and component fixes (#139) ([482a04f](https://github.com/MinBZK/storybook/commit/482a04f)), closes [#139](https://github.com/MinBZK/storybook/issues/139)
* ci(release): stop releasing on ci/chore/test, keep releasing what ships (#142) ([25b7645](https://github.com/MinBZK/storybook/commit/25b7645)), closes [#142](https://github.com/MinBZK/storybook/issues/142)
* ci(review): always post the review as a sticky PR comment (#143) ([d5aa290](https://github.com/MinBZK/storybook/commit/d5aa290)), closes [#143](https://github.com/MinBZK/storybook/issues/143)
* ci(review): enable track_progress so the review comment can actually be posted (#144) ([38b8483](https://github.com/MinBZK/storybook/commit/38b8483)), closes [#144](https://github.com/MinBZK/storybook/issues/144)

### Highlights

- **New `nldd-avatar`.** A person or organisation avatar: an image, auto-fitting initials (derived from `name` or given explicitly), or a type icon (`person` = circle with a person icon, `organization` = rounded with a building icon). Sizes on the `nldd-icon` scale and fills its container by default. `color="inherit"` fills with the surrounding content colour, and `icon-aligned` shrinks the disc to an icon's optical size so it lines up when it replaces an icon.
- **New icon.** `file-text-batch-check-plus` (`new-text-document`).
- **`nldd-activity-indicator` follows its context's content colour.** The default spinner now tracks the shared `--context-content-color` channel (so a loader inside a selected list row matches the row's text), falling back to `currentColor` everywhere else.
- **`nldd-button`, `nldd-icon-button` and `nldd-split-button` open a slotted overlay.** Drop an `nldd-menu` or `nldd-popover` in the `popup` slot and the button anchors and toggles it automatically, with no `id`/`anchor` wiring.
- **`nldd-rich-text` opt-in hyphenation.** The `hyphens` attribute enables automatic word breaking for running text (p, li, dd), tuned for long Dutch compounds in narrow columns.
- **`nldd-text-editor` badges and colours bare URLs.** A plainly pasted URL (GFM autolink) now gets the same open-in-new-tab badge and link colour as a Markdown link, including `www.` (→ https) and email (→ mailto).
- **`nldd-menu` header and footer slots.** Root-only `header` / `footer` slots hold free content (an account identity header, a short note, a link) outside `role="menu"` — reached with Tab, skipped by arrow navigation. `role="menu"` now lives statically on the item list.
- **Content-colour token names standardised** (breaking). The buttons and categories content tokens now follow the global `content-color` / `content-secondary-color` word order, and the cross-component `--context-cell-content-*` channel is renamed to `--context-content-*`.

### Added

- **Icon** — `file-text-batch-check-plus`, with the `new-text-document` alias.
- **`nldd-rich-text`** — `hyphens` attribute for opt-in automatic hyphenation on running text (requires a correct `lang`); plus an always-on `overflow-wrap: break-word` safety net on paragraphs and list items.
- **`nldd-button` / `nldd-icon-button`** — a `popup` slot that auto-wires a nested `nldd-menu` or `nldd-popover` (anchors it, toggles on click, syncs `expanded` / `aria-haspopup`), mirroring `nldd-split-button`, which now also accepts a slotted `nldd-popover`.
- **`nldd-text-editor`** — a bare / autolinked URL (plain https, `www.`, or an email) now gets the open-in-new-tab badge and the link colour, matching Markdown links; scheme-less forms are normalised (`www.` → https, email → mailto). The Markdown link's own address stays the dimmed grey.
- **`nldd-menu`** — root-only `header` / `footer` slots for free content above/below the items, outside `role="menu"` (so they may hold non-menuitem content such as an `nldd-byline`, buttons or links; reached with Tab, skipped by arrow navigation). The regions are unpadded (control spacing with your own content, e.g. `nldd-container`); `role="menu"` is now static on the item list, with the empty-state and drill-in back button as siblings outside it.
- **`nldd-inline-dialog`** — a `variant="loading"` that shows an `nldd-activity-indicator` (a `role="status"` spinner announcing "Laden") in place of the icon, for an empty state that is still loading. Sized to the icon (md/lg), shown instantly, and it overrides an explicit `icon`.
- **`nldd-avatar`** (content) — new component for a person or organisation. Fallback chain image → initials → type icon; `type` (`person` / `organization`) drives shape and fallback icon; `size` on the `nldd-icon` scale (empty = fill the container, with initials and icon scaling to the box via container queries); `color` (`default` / `inherit`, where inherit fills with the `--context-content-color` channel or `currentColor` and uses the contrast colour for the text); `icon-aligned` shrinks the disc to 5/6 for optical alignment with an icon; wide initials always scale to fit; a dead `src` falls back automatically; `role="img"` with the name as label, or `decorative`.
- **`nldd-page-footer`** — a `width` attribute mirroring a page section: `full` removes the body max-width, or a CSS length overrides it.

### Changed

- **`nldd-activity-indicator`** — the default circle and arc now colour from `var(--context-content-color, currentColor)` instead of `currentColor` alone. Behaviour is unchanged wherever the channel is unset.
- **`nldd-popover`** — now syncs its open state to a control trigger via the trigger's `expanded` / `popup-type` IDL props (so the trigger's inner button ARIA and disclosure chevron reflect the popover), falling back to `aria-*` attributes for plain element anchors. It also bails on its own anchor-click toggle when driven via `anchorElement`, so it can be nested and driven from a button.
- **`nldd-byline`** — renders its avatars with `nldd-avatar` (both the `avatar-src` path and slotted `nldd-avatar`), so a byline without an image shows initials; a slotted `<img>` still works.
- **`--semantics-buttons-neutral-tinted-divider-color`** — slightly lighter in dark mode (`neutral-450` → `neutral-350`).

### Breaking

- **Semantics content-colour tokens renamed** (no aliases): `--semantics-buttons-*-primary-content-color` and the `categories` equivalents become `--semantics-*-content-color` (drop `primary`); `--semantics-*-secondary-content-color` become `--semantics-*-content-secondary-color` (qualifier after `content`). Update any consumer CSS that references them.
- **`--context-cell-content-*` renamed to `--context-content-*`** (whole family: `color`, `secondary-color`, `accent-color`, `success-color`, `warning-color`, `critical-color`). Update any consumer CSS that sets or reads these context custom properties.
- **`nldd-button` / `nldd-icon-button` overlay slot renamed `menu` → `popup`** — the slot now accepts an `nldd-menu` or an `nldd-popover`. Change `<nldd-menu slot="menu">` to `slot="popup"`. (`nldd-token` / `nldd-token-field` keep their own menu-only `slot="menu"`.)

### Fixed

- **`nldd-toolbar`** — an `align="center"` title now stays centred when it is the only visible element, including when a `slot="start"` / `slot="end"` item is `display:none` (e.g. a back button hidden on wide viewports). It previously jumped to the left. Centre-only routing is measured from real rendering, so a hidden item no longer strands the title.
- **`nldd-toolbar`** — an `align="center"` title also stays centred when only one side (start or end) has items; it previously shifted by one gap toward the empty side, because the balancing spacer subtracted a gap that only exists when that side is non-empty.
- **`nldd-menu`** — a group that is the first item no longer draws a stray top divider when a `header` slot is present (the header's light-DOM element made the group lose `:first-child`).
- **`nldd-sheet`** — a drag that begins inside the sheet (selecting text in an input, dragging a control) and ends on the backdrop no longer dismisses it; only a genuine backdrop click, where the press and the release are both on the backdrop, closes.
- **`nldd-page-footer`** — when the footer is empty and only the Rijksoverheid lintje shows, it now keeps space above the lintje so a preceding tinted page section no longer butts right up against it.
## <small>0.8.68 (2026-07-16)</small>

* ci(review): let the review post inline comments and see the full diff (#141) ([819f241](https://github.com/MinBZK/storybook/commit/819f241)), closes [#141](https://github.com/MinBZK/storybook/issues/141)

## <small>0.8.67 (2026-07-15)</small>

* ci(review): fetch full history so the review can compute the PR diff (#140) ([a076e03](https://github.com/MinBZK/storybook/commit/a076e03)), closes [#140](https://github.com/MinBZK/storybook/issues/140)

## <small>0.8.66 (2026-07-13)</small>

* Text-editor improvements, icon set, toolbar & token-field commit-on-blur (#138) ([ca77ddb](https://github.com/MinBZK/storybook/commit/ca77ddb)), closes [#138](https://github.com/MinBZK/storybook/issues/138)

### Highlights

- **`nldd-text-editor` Markdown refinements.** Indent and outdent are symmetric (one outdent exactly reverses one indent), and ordered lists inside a blockquote are renumbered in sequence like any list.
- **`nldd-token-field` keeps undelimited input.** A value typed without pressing `Enter` or comma is no longer dropped — it commits as a token on blur (with `allow-custom`).
- **`nldd-app-view` document scroll mode.** The layout can hand page scrolling to the document (root) instead of an inner pane (nested), so iOS rubber-band and the collapsing Safari toolbar behave natively.
- **New icons.** `heading-1`…`heading-6`, `paragraph-sign`, `lifebuoy`, `network-structure`, `stack-text`, `wheat` (`harvest`) and `person-circle-badge-plus` (`new-account`).

### Added

- **Icons** — `heading-1`…`heading-6`, `paragraph-sign`, `lifebuoy`, `network-structure`, `stack-text`, `wheat` and `person-circle-badge-plus`, with `harvest` and `new-account` aliases.

### Changed

- **`nldd-token-field`** — free-typed text now commits as a token on blur (with `allow-custom`), so a value typed without pressing `Enter` or comma is no longer dropped when focus leaves the field.
- **`nldd-toolbar`** — the title can size to `fit-content` with an action slot beside it.
- **`nldd-app-view`** — derives a document-level scroll mode (root vs nested) so the document can own iOS rubber-band and Safari-toolbar scrolling instead of an inner pane.
- **Icons renamed** (old names kept as aliases, so nothing breaks): `centralized-network` → `centralized-structure`, `table-cells` → `rectangle-split-2x3`.

### Breaking

- **`clipboard-rectangle` icon renamed to `clipboard-square`** — the `paste` icon is reshaped from a rectangle to a square, and the old name is *not* kept as an alias, so `icon="clipboard-rectangle"` no longer resolves. Switch to `clipboard-square`; the `paste` alias already points to it.

### Fixed

- **`nldd-text-editor`** — indent and outdent are symmetric (one outdent exactly reverses one indent), and ordered lists inside a blockquote are renumbered in sequence like any list (so a quoted `> 4.` isn't left as a misleading stray number that renders as 1).

## <small>0.8.65 (2026-07-08)</small>

* feat: CodeMirror text/code editors + viewer, token-field, FOUC guard, flatter surfaces & fixes (#136 ([e490366](https://github.com/MinBZK/storybook/commit/e490366)), closes [#136](https://github.com/MinBZK/storybook/issues/136)

### Highlights

- **`nldd-text-editor` — a hybrid Markdown editor.** A CodeMirror 6 editor that shows Markdown source with live styling instead of a separate preview: headings, bold, italic, strikethrough, inline code and fenced code blocks (tinted as one surface, darker where selected), links (with an open-in-new-tab badge), bullet lists (drawn as a filled dot) and ordered lists (auto-renumbered to run in sequence as you type). It stays headless: a command API drives every action and it emits its active state back so a consumer toolbar can own the chrome. `@`-mentions collapse to a token, and opt-in annotations render a tinted range with a count badge that stays anchored across typing, undo/redo, drag-to-move and same-editor cut/paste.
- **`nldd-token-field` — a multi-select input.** Chosen values become dismissible tokens in a wrapping row; options come from a slotted `nldd-menu` that filters as you type, with a chevron picker and full keyboard support (arrow-key roving across tokens, `Backspace` to step onto and remove one, comma or `Enter` to add free-typed values with `allow-custom`). It participates in forms through `ElementInternals` (one submitted entry per value), supports `readonly` / `required`, and seeds its initial values from a comma-separated `values` attribute.
- **New icons.** Seventeen icons — `at`, `highlighter`, `strikethrough`, `indent-increase` / `indent-decrease`, `markdown-rectangle`, `rectangle-chevron-left-forward-slash-chevron-right`, `house-and-appartment-building`, `parking-sign-square`, `arrow-up-out-bucket`, `rectangle`, `rectangle-split-2x1` / `rectangle-split-3x1`, `square-grid-3x3`, `tree-structure` and `sidebar-left` / `sidebar-right` — with `indent` / `outdent`, `code-block`, `markdown`, `parking`, `upload`, `columns-2` / `columns-3`, `apps` and `hierarchy` aliases.
- **`nldd-code-editor` and `nldd-code-viewer` on CodeMirror 6.** Both are rebuilt on the same CodeMirror 6 foundation as the new text editor, for consistent syntax highlighting across many grammars (yaml, json, javascript, typescript, css, html, xml, bash, markdown, rust, gherkin, toml, sql, python). The code editor gains `simple` (bare, caret-only) and `input-field` variants, `rows` / `resize` sizing, line numbers and line wrapping; the read-only code viewer keeps its copy button and gains `simple` / `box` variants and a `tinted` / `base` background.
- **Built-in FOUC guard.** `@nldd/design-system/styles` now keeps the page hidden until every custom element has upgraded (or a 200ms fallback), so pre-upgrade web components no longer flash unstyled.
- **No more position flash on popovers.** `nldd-menu`, `nldd-popover`, `nldd-tooltip` and `nldd-just-in-time-education` no longer flash at the popover's default spot before Floating UI places them; each stays hidden until it is positioned.
- **Flatter, rectangular surfaces.** Corner radii are removed from `nldd-hero` (every element is now rectangular) and from `nldd-blockquote` (and blockquotes inside `nldd-rich-text`), which also drops its top border and top padding so a quote sits flush against a plain left rule.

### Breaking

- **`accessible-labelledby` renamed to `accessible-labelled-by`** — the design-system attribute on `nldd-segmented-control`, `nldd-radio-button-group` and `nldd-toggle-button-group` now separates the words. The property stays `accessibleLabelledBy` and the forwarded native `aria-labelledby` is unchanged; only the DS attribute name changes. Consumers using `accessible-labelledby` must switch to `accessible-labelled-by`.
- **Default values are kept out of the DOM** — reflected enum and empty-string defaults are no longer written as attributes (e.g. a `nldd-button` with the default size no longer renders `size="md"`, and an empty `supporting-text` is omitted). Non-default values still reflect, so `:host([attr=…])` styling, framework property binding and inspector editing keep working. External CSS or scripts that matched a *default* attribute (e.g. `nldd-button[size="md"]` or `getAttribute('size') === 'md'`) should read the property instead. `type` and `inherit`-style props are intentionally left reflected for now.
- **`nldd-combo-box` no longer commits free-typed values by default** — a typed value that matches no menu option is now discarded on Enter/blur (the input reverts to the current value) unless the new `allow-custom` attribute is set. Previously such values were always emitted via `change`.
- **`nldd-hero` corners removed** — `nldd-hero` is now always rectangular and the `media-corner-position` attribute (added in 0.8.64) is gone. A no-media `main-background="base"` hero takes a full border instead of only the two corner-adjacent sides.

### Added

- **Button inline-padding tokens** — `--semantics-buttons-{size}-inline-padding`, `--semantics-buttons-{size}-has-supporting-text-inline-padding` and `--semantics-buttons-{size}-is-icon-only-inline-padding` encode the icon-centering padding `(min-size − icon-size) / 2` once in the semantic layer. `nldd-button`, `nldd-icon-button`, `nldd-toggle-button`, `nldd-segmented-control` and `nldd-tab-bar` items all reference them, with `--_block-padding` / `--_inline-padding` locals.
- **`nldd-text-editor`** — a headless, hybrid Markdown editor (CodeMirror 6). Live source styling for headings, `**bold**`, `*italic*`, `~~strikethrough~~`, inline code, fenced code blocks (one tinted surface), links (plus an open-in-new-tab badge), bullet lists (a styleable filled dot) and ordered lists (renumbered to stay 1, 2, 3). `simple` and `input-field` variants, `sans` / `mono` fonts, `rows` / `resize` / `wrap`, and a form value that is always clean Markdown. A command API (`toggleBold`, `setList`, `setHeading`, `indent` / `outdent`, `toggleLink`, `toggleCodeBlock`, `undo` / `redo`, `copy` / `cut` / `paste`, `runCommand`) plus a `nldd-text-editor-state` event let a consumer toolbar own the chrome; selected text can be dragged to move it (shadow-DOM-safe). `@`-mentions collapse to a token from a consumer `mentionSource` and fire `nldd-text-editor-mention`. Opt-in annotations (`annotatable` + `annotations`) render a tinted range with a count badge, anchored by clean offset and preserved across edits, undo/redo, drag and same-editor cut/paste.
- **FOUC guard in `@nldd/design-system/styles`** — the page stays hidden until every custom element upgrades (`:defined`) or a 200ms fallback, whichever comes first; pure CSS, no JS. Also available standalone at `@nldd/design-system/styles/fouc`.
- **Icons** — `at`, `highlighter`, `strikethrough`, `indent-increase`, `indent-decrease`, `markdown-rectangle`, `rectangle-chevron-left-forward-slash-chevron-right`, `house-and-appartment-building`, `parking-sign-square`, `arrow-up-out-bucket`, `rectangle`, `rectangle-split-2x1`, `rectangle-split-3x1`, `square-grid-3x3`, `tree-structure`, `sidebar-left` and `sidebar-right`, with `indent` / `outdent`, `code-block`, `markdown`, `parking`, `upload`, `columns-2` / `columns-3`, `apps` and `hierarchy` aliases.
- **`nldd-token-field`** — a multi-select input: chosen values render as dismissible `nldd-token`s, options come from a slotted `nldd-menu` (filtered as you type) with a chevron picker button. Keyboard navigation with a single roving tab stop over the tokens (arrow keys move between them; removing a token — via `Backspace` / `Delete`, its ✕, or a menu action — keeps focus in the row, on the next token or the input); when the input is hidden (every value chosen, no custom values, no options left) the token row is the field's only tab stop, so tabbing in lands on the first token and choosing the final value moves focus onto that last token. With `token-control="menu"` each token trades its ✕ for a ⌄ that opens a per-token action menu, supplied as `nldd-token` prototypes in `slot="template"` — a keyless one is the shared menu, a `data-value="X"` one overrides value X — cloned into each token and opened with Enter / Space / ArrowDown when the token is focused; a choice fires `token-action` (`{ value, action }`) for the app to handle. Comma / `Enter` custom values via `allow-custom`, `type` / `autocomplete` / `no-spellcheck`, `readonly` / `required`, `ElementInternals` form participation (one submitted entry per value) and a comma-separated `values` attribute for declarative use.
- **`nldd-combo-box` `allow-custom`** — opt in to committing free-typed values that match no menu option (see Breaking). On open the first option is now highlighted so `Enter` selects it.
- **`nldd-collection` `gap`** — a `gap` attribute sets a fixed inter-item gap, overriding the responsive default.
- **`nldd-icon-button` `no-tab`** — takes the button out of the tab order (`tabindex="-1"`) for a control owned by a roving container (e.g. an `nldd-token` in `nldd-token-field`); it stays mouse- and script-focusable.
- **`nldd-tab-bar` `disabled`** — disables the whole bar: it dims, stops responding to pointer input, and drops every tab out of the tab order with `aria-disabled` set, so keyboard activation and link navigation are suppressed too.

### Changed

- **`nldd-code-editor`** — rebuilt on CodeMirror 6, sharing a foundation and highlight style with the code viewer and text editor. A `simple` (bare, flush, caret-only) and an `input-field` (framed surface) variant, `rows` / `resize` / `wrap` sizing, `line-numbers`, and highlight grammars for yaml, json, javascript, typescript, css, html, xml, bash, markdown, rust, gherkin, toml, sql and python. Clicking the padding or a line number now places the caret, and the accent caret is used in both variants.
- **`nldd-code-viewer`** — rebuilt on a read-only CodeMirror 6 view, so its highlighting matches the editors. `simple` / `box` variants, a `tinted` / `base` box background, `language`, `wrap`, and the copy-to-clipboard button (hide it with `no-copy`).
- **Consistent item padding** — `nldd-button`, `nldd-icon-button`, `nldd-toggle-button`, `nldd-segmented-control` and `nldd-tab-bar` items now share one block/inline padding mechanism driven by the new tokens. `nldd-toggle-button` (xs/sm) and `nldd-segmented-control` (sm) gain slightly tighter inline padding to match the button family, resolving a prior inconsistency.
- **`nldd-multi-line-text-field` default `resize`** — the default changed from `resize="vertical"` to `resize="auto"`: the field now auto-grows with its content (no drag handle) by default. Consumers who relied on the implicit vertical drag handle must set `resize="vertical"` explicitly.
- **`nldd-token`** — reworked and moved to the content category. Its label now comes from a `text` attribute (the default slot stays as a fallback). `control="menu"` renders a trailing chevron button (matching the dismiss ✕) that opens a slotted `nldd-menu` as a popover the token owns — open/close, `expanded` state, focus, and Enter / Space / ArrowDown to open it when the token itself is focused in a roving container such as `nldd-token-field`; the menu items own their `select`. This replaces the old whole-token menu button and its consumer-managed `toggle` / `controls` wiring. The whole-token focus ring is forced on a scripted focus so roving containers highlight it (incl. Safari), a `dismiss`/`menu` control button now shows its own border, a `menu-text` label was added, and a `roving` attribute takes the control button out of the tab order so a container like `nldd-token-field` stays a single tab stop.

### Fixed

- **Popover positioning** — `nldd-menu`, `nldd-popover`, `nldd-tooltip` and `nldd-just-in-time-education` no longer flash at the popover's default position for a frame before Floating UI places them.
- **`nldd-multi-line-text-field`** — the configured `rows` is now the minimum height in every resize mode, not only `resize="auto"`; a fixed or non-resizable field no longer collapses below its `rows`.
- **`nldd-banner` renders under frameworks that build elements via `document.createElement`** — aria attributes are now set in `connectedCallback` instead of the constructor, which previously threw `NotSupportedError` (e.g. under Vue) and aborted the render, so banners never appeared.
- **`nldd-text-editor` annotation undo** — annotation offsets are clamped to the document length, preventing a range error during undo when the history transiently shrinks the document.
- **`nldd-menu` empty state** — a menu whose items are all disabled no longer shows the "no options" empty state on top of the still-visible items; emptiness counts shown items, not just navigable ones.
- **`nldd-sheet` and `nldd-window` close** — only the overlay's own `nldd-top-title-bar` dismiss closes it; a `dismiss` bubbling up from another component inside it (an `nldd-token` remove button, an `nldd-banner`, an `nldd-document-tab-bar`) no longer closes the whole overlay.
- **`nldd-toolbar` overflow menu** — items that collapse into the overflow `⋯` menu now forward their activation to the original item (so a click in the overflow menu fires the item's `select`) and keep their state in sync with the originals, instead of the overflow clones going stale.
- **`nldd-sheet` content sizing** — only a slotted `nldd-page` grows to fill the sheet, so other direct children keep their intrinsic height instead of being stretched.

## <small>0.8.64 (2026-07-01)</small>

* feat: filterable listbox, sidebar-section, hero media, container lanes + box-sizing hardening (#135) ([bf48d70](https://github.com/MinBZK/storybook/commit/bf48d70)), closes [#135](https://github.com/MinBZK/storybook/issues/135)

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
- **`nldd-collection`** — the `list` layout is renamed to `stack` to match `nldd-container`.

### Fixed

- **`nldd-list`** — switching `variant` at runtime (box to simple) no longer leaves items wrongly boxed; the list now drives `variant`/`type` onto its items instead of relying on a per-item observer.
- **`nldd-just-in-time-education`** — the callout is positioned absolutely so it scrolls natively with the page, fixing the Safari bounce.
- **`nldd-rich-text`** — table columns size to their content: the `th` min-width is unset on containers ≥ 641px (the data cells already did this), and inline code inside cells may wrap so long tokens (e.g. `type_spec.precision`) no longer force a column wide.
- **`nldd-rich-text` / `nldd-container`** — the rich-text host (and container slotted items) now use `box-sizing: border-box`, so padding or a border no longer makes the element overflow its slot or grid/column track.
- **All component hosts** now pin `box-sizing: border-box`, so a consumer's global box-sizing reset (e.g. Tailwind Preflight) can no longer change a component host's box model.

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
