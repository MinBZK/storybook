# Plan — CodeMirror 6 in NLDD DS

- **Branch:** `feat/codemirror-editors` · worktree `.worktrees/feat/codemirror-editors`
- **Status:** concept (beta-traject)
- **Scope:** `nldd-code-editor`, `nldd-code-viewer` (migraties) + `nldd-text-editor` (nieuw)

## Doel

Eén bewezen editor-engine (CodeMirror 6) onder drie componenten. Uitgangspunt: **platte tekst is de bron van waarheid; alle opmaak en annotatie is een decoratielaag erbovenop.**

- `nldd-code-editor` — van `<textarea>` naar CM6 (bewerkbaar; optioneel highlighting/regelnummers)
- `nldd-code-viewer` — van Prism naar read-only CM6 EditorView
- `nldd-text-editor` — nieuw: hybride markdown-editor (iA Writer / Kirby), v1 incl. @mentions en W3C-annotatielaag

## Vastgestelde ontwerpkeuzes

| Keuze | Besluit |
|---|---|
| Text-editor typografie | sans default, monospace optie (`font="sans\|mono"`) |
| Markdown-weergave | markers zichtbaar + gestyled (iA/Kirby); Obsidian-verbergen = later |
| Code-viewer | volledige read-only CM EditorView |
| Text-editor v1 | kern + @mentions + annotatielaag |
| Box-styling | `code-editor` + `text-editor` default `simple` (kaal); `box` = variant. `code-viewer` houdt default `box` |
| Annotatie-kleur | één kleur; type wordt via tekst gecommuniceerd (popover/pane) |
| Diff/wijzigingen | aparte laag, latere fase (na annotaties) |

## Dependencies

Losse packages (tree-shaking), niet de `codemirror` meta-package:

- **Kern:** `@codemirror/state`, `@codemirror/view`, `@codemirror/commands`
- **Taal/highlight:** `@codemirror/language`, `@lezer/highlight`
- **Talen:** `@codemirror/lang-markdown`, `-yaml`, `-json`, `-javascript`, `-css`, `-html`, `-xml`, `-python`, `-rust`, `-sql`
  - **Grammatica-gap:** `bash/shell`, `toml`, `gherkin` → `@codemirror/legacy-modes` of community-pakket; verifiëren
- **Mentions:** `@codemirror/autocomplete`
- **Markdown-uitbreiding (toekomst Rijks Markdown):** `@lezer/markdown`
- **Annotatie-anchoring:** evalueer `apache-annotator` / `dom-anchor-text-quote` + `-text-position`
- **Diff (latere fase):** evalueer `@codemirror/merge` (`unifiedMergeView`)

Lockfile: deps via `npm install`; root-`version` niet handmatig wijzigen (semantic-release).

## Fase 0 — Gedeelde fundering (eerst; alle drie delen dit)

1. **Mount-mixin / helper** (`CodeMirrorElement` of `createEditorView(host, config)`)
   - EditorView aanmaken in `firstUpdated`, opruimen in `disconnectedCallback`
   - **Shadow DOM**: in shadow root mounten; `view.root` correct zetten; selectie/focus over de shadow-grens valideren (`delegatesFocus: true` is er al). Eenmalig oplossen + documenteren
   - value ↔ doc-synchronisatie (docChanged → property + event)
2. **Theming-brug** (`cmTheme`, gedeelde module)
   - `EditorView.theme(...)` leest `--primitives/semantics/components`-variabelen
   - `HighlightStyle` gekoppeld aan een gedeeld token-palet; hergebruik `--components-code-viewer-token-*` zodat editor én viewer identiek kleuren
   - Dark mode: hergebruik `onColorSchemeChange` + repaint-util
3. **Lazy taal-loader** (`loadLanguage(name)`) — dynamische import per grammatica, gedeeld door editor + viewer
4. **A11y-basis** — focus-ring op host via `:focus-within`, `prefers-reduced-motion`, `forced-colors`, aria-label door naar CM content

## Fase 1 — `nldd-code-editor` op CM6 (valideert de fundering, laagste risico)

- Vervang `<textarea>` door bewerkbare CM EditorView via de mixin
- **API 1-op-1 behouden:** value, placeholder, disabled, name, readonly, required, wrap, rows, resize, accessible-label, `input`/`change`, form-callbacks, `_internals.setFormValue`
  - placeholder → `placeholder`-extensie; readonly → `EditorState.readOnly`; disabled → `editable:false` + opacity; wrap → `lineWrapping`; rows → min-height; resize `auto` → grow
- **`variant="box|simple"`, default `simple`** (kaal: geen border/bg/padding/radius); `box` = opt-in framing. Let op: wijzigt het huidige default-uiterlijk (was box)
- **Nieuw:** optioneel `language` (highlighting) + optioneel `line-numbers`, via de gedeelde modules
- Tests: smoke, value-sync, form-reset, readonly/disabled, highlighting
- Stories uitbreiden (language, line-numbers, variant)

## Fase 2 — `nldd-code-viewer` op read-only CM6

- Viewer wordt **read-only EditorView** (`editable:false`, geen caret, niet-focusbaar tenzij scrollbaar)
- **API behouden:** variant box/simple (default blijft `box`, anders dan de editors), background tinted/base, language, no-copy, wrap, translations, copy-knop, scroll-a11y, color-scheme repaint
- **Aandachtspunten:** slot-tekst → CM doc (kies één bron voor copy); scroll/a11y rond CM's DOM; token-thema via gedeelde `HighlightStyle`; lazy per-taal loading
- **Prism verwijderen** ná migratie + visuele regressiecheck per taal

## Fase 3 — `nldd-text-editor` (nieuw, hybride markdown) — v1 incl. mentions + annotaties

Map: `src/components/inputs/text-editor/` (form-associated). Engine: CM6 + `@codemirror/lang-markdown` (Lezer, GFM).

### 3a — Kern hybride bewerken
- Mark-decoraties: `**vet**` echt vet, *cursief*, `# Kop` groter, links gekleurd/klikbaar, inline code mono, lijst-/quote-inspringing. Markers zichtbaar maar subtiel (iA/Kirby)
- Typografie: `font="sans|mono"` (default sans); mono krijgt slimme inspringing (Kirby-stijl)
- `variant="box|simple"`, default `simple` (zoals code-editor)
- Sneltoetsen: `@codemirror/commands` keymap (Cmd/Ctrl+B etc.) zit ín het component — opmaken werkt ook zonder toolbar
- **Geen ingebouwde toolbar** — die is voor de consumer of een toekomstig component (bv. `nldd-message-field`). Headless qua UI, maar met publieke **command- + state-API**:
  - **Commands**: `toggleBold()`, `toggleItalic()`, `toggleHeading(level)`, `toggleBulletList()`, `toggleLink(href)`, … + `runCommand(name)`. Werken op de selectie en geven focus terug aan de editor
  - **State**: event `nldd-text-editor-state` + getter `getState()` met `active`/`enabled` per command
  - **Selectiebehoud**: commands werken ook als focus naar een knop ging; documenteer de `mousedown`+`preventDefault()`-knoptruc
- Form-associated API consistent met code-editor

### 3b — @mentions (in én buiten content)
- Typeahead op `@` via `@codemirror/autocomplete` (bron = async user-lijst van de consumer)
- **In content**: markdown-compatibel token met stabiele id (`[@Naam](user:123)`), als chip gerenderd; degradeert netjes buiten de editor
- **Buiten content**: dezelfde mention kan als annotatie bestaan (chat/opmerkingen)
- Component emit `mention`-event (user-id + range); notificatie/toewijzing is app-verantwoordelijkheid

### 3c — W3C-annotatielaag

**Datamodel & anchoring**
- Annotaties in een aparte datastructuur (niet in de markdown); tekst blijft schoon
- Ankeren via W3C-selectors: `TextQuoteSelector` (quote + prefix/suffix, primair) + `TextPositionSelector` (offset, hint); evalueer `apache-annotator` / `dom-anchor-text-*`
- Renderen als CM-decoraties; position-mapping verschuift ankers mee bij live edits

**Weergave**
- Eén kleur voor alle annotaties; het *type* wordt via tekst getoond in de popover/pane (niet via kleur)
- Rust: dashed underline + lichte tint + telbadge (solide gevuld element met witte tekst; count bij meerdere)
- Meerdere annotaties op dezelfde tekst → **gemerged tot één dashed underline + één telbadge**
- Annotatie-dashed en validatie-wavy **stapelen verticaal** als beide op dezelfde tekst zitten (aparte families)
- Positie: annotatie-badge aan het **einde** van de range; (diff-)symbolen +/− aan het **begin** (operator vs. badge)
- Solide nub/badge + lichte body-tint = "voelt als één element"; tokens dark-mode-safe (rol-fill + witte tekst voor de nub, rol-`bg` voor de body); regel voor lange ranges + wrapping (nub blijft aan begin geplakt, tint loopt door)

**Staten** (rust → hover → highlighted)
- highlighted = benadrukte staat (vollere tint), getriggerd door hover, klik in de editor, óf programmatisch vanuit de pane
- Renderregel: een annotatie tekent als (categorie zichtbaar) **OF** (zij is highlighted). De highlighted-override wint altijd — zo kan de pane een verborgen/opgeloste annotatie "peeken" zonder de rest te tonen
- Status open/opgelost: opgelost is een categorie die default **verborgen** is (ruis vermijden); consumer kan togglen

**Aanmaken (gebaar in het component)**
- Selecteer tekst → zwevende "+ annotatie"-affordance → maakt het anker + emit `annotation-create` (id + range + rect). Werkt ook in `readonly` (comment-modus)
- De invoer-UI (opmerking schrijven) is van de consumer

**Orphans**
- Bij bewerken/verwijderen van geankerde tekst: her-ankeren proberen (`TextQuoteSelector`); mislukt → state `orphaned` + emit `annotation-orphaned`. Component verliest nooit stil iets, maar rendert geen orphan-lijst (consumer beslist)

**API & events (headless)**
- Methods: `highlightAnnotation(id)` / `clearHighlight()`, `goToNextAnnotation()` / `goToPrevAnnotation()`, annotaties zetten/ophalen
- Events: `annotation-create`, `annotation-activate` (id(s) + rect), `annotation-orphaned`
- Consumer bezit lijst/popover/pane; component bezit inline-rendering + anchoring + creation-gebaar

**Toegankelijkheid**
- Badge = échte `button`: entry point voor toetsenbord, touch én screenreader
- Niet op kleur alleen (dashed + badge zijn de cues); tekstcontrast op tint ≥ 4.5:1; `forced-colors`-fallback (dashed/symbool blijft zichtbaar)
- ARIA zodat AT annotaties aankondigt; next/prev-commands voor navigatie (geen gutter)

### 3d — Render-pipeline (publicatie) — apart, los van het component
- markdown → toegankelijke HTML via remark/markdown-it; custom constructs → NLDD-componenten. `nldd-rich-text` bestaat al als mogelijk render-doel (verifiëren). Niet in het editor-component zelf

### Beta
- Publiceren met beta-markering (`status: { type: 'beta' }` in stories/docs)

## Fase 4 — Wijzigingen/diff (latere fase)

- Aparte laag (twee tekstversies), ná de annotatielaag. Evalueer `@codemirror/merge` (`unifiedMergeView`: inline diff met getoonde verwijderingen + accept/reject) i.p.v. from-scratch
- **Weergave:** code (`code-editor`/`code-viewer`) → GitHub-stijl (tint + doorhaling). Proza (`text-editor`) → compound tag: solide symbool-nub (+/−) + lichte body-tint, één element; nub kan een telling dragen bij gegroepeerde wijzigingen
- Verwijderde tekst altijd **doorgehaald** (symbool/tint alleen leest niet als "weg")
- Semantiek: `<ins>`/`<del>` of ARIA voor screenreaders
- Kan naast de annotatielaag bestaan (comment op een gewijzigde regel)

## Volgorde & afhankelijkheden

`0 fundering` → `1 code-editor` (valideert) → `2 code-viewer` → `3 text-editor` (3a→3b→3c→3d) → `4 diff` (later)

Elke fase volgens `/component`: `.ts` / `.styles.ts` / `.template.ts` / (`.i18n.ts`) / `.stories.ts` / `.test.ts`, BEM, concentric CSS, CSS-lagen, US-English comments / NL docs. Na JSDoc/API-wijziging `npm run generate:component-reference` + `skills/nldd/reference.md` committen.

## Risico's / open punten

- **Bundle size** — CM6 core + talen + markdown; alles lazy houden; meten met build
- **Shadow DOM selectie/focus** — eenmalig in fundering oplossen, in Storybook valideren
- **Code-viewer-migratie** — copy/scroll/a11y-herwerk (bewuste keuze)
- **Annotatie-anchoring** — het echte harde stuk; quote-anchoring + mapping + orphans testen op edits
- **Grammatica-gap** — bash/toml/gherkin via legacy-modes/community; mappen + verifiëren
- **Lockfile** — root-version niet handmatig wijzigen
