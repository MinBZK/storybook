<!--
  GEGENEREERD BESTAND — niet handmatig bewerken.
  Bron: de JSDoc (@element / @attr / @slot / @fires) van elk component in
  src/components, plus de iconnamen uit content/icon/icons en icon-aliases.
  Hergenereren: npm run generate:component-reference
-->

# Componentreferentie — @nldd/design-system

Elk custom element met zijn attributen, slots en events. Dit is een offline
snelreferentie; de levende documentatie met voorbeelden staat in
[Storybook](https://minbzk.github.io/storybook/), en de exacte types staan in
de `.d.ts` bestanden van het pakket.

> Let op: deze referentie komt uit de JSDoc van de componenten. Een paar
> componenten documenteren niet al hun `@attr`s; daar tonen de `.d.ts` types
> of Storybook de volledige set. Raadpleeg die bij twijfel.

## Actions

### `<nldd-button>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `variant` | `string` | Button variant: 'primary' \| 'secondary' \| 'destructive' \| 'accent-filled' \| 'accent-transparent' \| 'neutral-tinted' \| 'neutral-base' \| 'neutral-transparent' \| 'critical-tinted' \| 'critical-transparent' \| 'inherit-filled' \| 'inherit-tinted'. De inherit-varianten leiden hun kleuren af van currentColor, voor knoppen op gekleurde vlakken; inherit-filled gebruikt de vlakkleur (--context-parent-background-color) als labelkleur met een wit/zwart-contrastflip als fallback. |
| `size` | `string` | Button size: 'xs' \| 'sm' \| 'md' \| 'lg' (default: 'md'). 'lg' uses larger text and 24px start/end icons. |
| `horizontal-alignment` | `string` | Horizontal alignment of the button content: 'left' \| 'center' \| 'right' (default: unset, centered). Most visible with width="full" or a fixed width. |
| `disabled` | `boolean` | Disabled state |
| `type` | `string` | Button type for form submission: 'button' \| 'submit' \| 'reset' (ignored when href is set) |
| `expandable` | `boolean` | Whether the button has a icon to indicate it opens a menu or popover |
| `expanded` | `boolean` | Whether the popover/menu controlled by this button is currently open. Forwarded as aria-expanded on the inner button; toggles the is-expanded visual state. |
| `popup-type` | `string` | Type of popup container this button opens: 'menu' \| 'listbox' \| 'dialog' \| 'tree' \| 'grid'. Sets aria-haspopup on the inner button and forces aria-expanded to always be present (true/false) so screen readers know the popup state. |
| `width` | `string` | Width mode: 'full' (stretches to container) or any CSS length (e.g. '240px') |
| `text` | `string` | Button text |
| `supporting-text` | `string` | Supporting text shown below the text (md/lg) or after it (sm/xs), in a secondary color. Part of the accessible name (unless `accessible-label` is set, which replaces the whole accessible name). |
| `single-line` | `boolean` | When true, truncates overflowing text with an ellipsis instead of letting it wrap. Requires the button (or an ancestor) to constrain the width. |
| `no-highlight-border` | `boolean` | Removes the per-variant highlight border (e.g. when nldd-button-bar draws a single group border instead). |
| `start-icon` | `string` | Icon name for the start icon (before text) |
| `end-icon` | `string` | Icon name for the end icon (after text) |
| `accessible-label` | `string` | Accessible label for the button, overrides text for screen readers |
| `href` | `string` | When set, renders an <a> element instead of <button> |
| `target` | `string` | Link target (e.g. '_blank'); only used when href is set. With '_blank' the button adds a visually hidden "opens in new tab" announcement for screen readers (WCAG 2.1 SC 3.2.2). |
| `rel` | `string` | Link rel attribute; defaults to 'noopener noreferrer' when target is '_blank' |
| `translations` | `object` | Override translation keys (e.g. the "opens in new tab" announcement); unset keys fall back to Dutch. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `text` | Slot for custom button content (e.g. text with inline markup). Used when the text attribute is empty or not set (an empty string counts as "not set", since the attribute and the unset property are indistinguishable). Provide accessible-label when the slotted content isn't plain text. |
| `start-icon` | Slot for a custom start icon (e.g. custom SVG). Only used when start-icon attribute is not set. |
| `end-icon` | Slot for a custom end icon (e.g. custom SVG). Only used when end-icon attribute is not set. |
| `popup` | A single `nldd-menu` or `nldd-popover` this button invokes. Slotting it auto-anchors the overlay to the button and toggles it on click (no id/anchor wiring). The overlay syncs `expanded` and `aria-haspopup` back onto the button. Add `expandable` for the disclosure chevron. Mirrors nldd-split-button; the manual `anchor`/`popovertarget` wiring keeps working when you don't slot an overlay. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `click` | When button is clicked (not fired when disabled) |

### `<nldd-button-bar>`

A horizontal container for grouping buttons with a neutral background. Automatically propagates its size and variant to all child nldd-button and nldd-icon-button elements. Renders nldd-button-bar-divider elements as internal dividers — no separate component needed.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `string` | Bar size: 'xs' \| 'sm' \| 'md' \| 'lg' (default: 'md'). At 'lg', icon-button children stack their label below the icon (mobile action-bar style). |
| `variant` | `string` | Button variant (default: 'neutral-tinted') |
| `disabled` | `boolean` | Disabled state |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Default slot for nldd-button, nldd-icon-button and nldd-button-bar-divider elements |

### `<nldd-button-group>`

A container for grouping related buttons together, either horizontally or vertically.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `string` | Button group size: 'sm' \| 'md' (default: 'md') |
| `orientation` | `string` | Layout direction: 'horizontal' \| 'vertical' (default: 'vertical') |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Default slot for buttons (max 3) |

### `<nldd-icon-button>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `variant` | `string` | Button variant: 'accent-filled' \| 'accent-transparent' \| 'neutral-tinted' \| 'neutral-transparent' \| 'critical-tinted' \| 'critical-transparent' \| 'inherit-filled' \| 'inherit-tinted' \| 'primary' \| 'secondary' \| 'destructive'. De inherit-varianten leiden hun kleuren af van currentColor, voor knoppen op gekleurde vlakken. |
| `size` | `string` | Button size: 'xs' \| 'sm' \| 'md' \| 'lg' (default: 'md') |
| `hide-lg-text` | `boolean` | In lg size, hides the text label and enlarges the icon by one step (28px) |
| `no-highlight-border` | `boolean` | Removes the per-variant highlight border (e.g. when a control group draws a single border instead). |
| `disabled` | `boolean` | Disabled state |
| `type` | `string` | Button type for form submission: 'button' \| 'submit' \| 'reset' (ignored when href is set) |
| `expandable` | `boolean` | Whether the button opens a menu or popover and shows chevron next to the icon |
| `expanded` | `boolean` | Whether the popover/menu controlled by this button is currently open. Forwarded as aria-expanded on the inner button; toggles the is-expanded visual state. |
| `popup-type` | `string` | Type of popup container this button opens: 'menu' \| 'listbox' \| 'dialog' \| 'tree' \| 'grid'. Sets aria-haspopup on the inner button and forces aria-expanded to always be present (true/false) so screen readers know the popup state. |
| `width` | `string` | Width mode: 'full' (stretches to container) or any CSS length (e.g. '240px') |
| `text` | `string` | Button text, used as aria-label and shown below the icon in lg size |
| `icon` | `string` | Icon name for the nldd-icon element. Defaults to a placeholder icon when neither this attribute nor the icon slot is set. |
| `accessible-label` | `string` | Accessible label for screen readers. Overrides text as aria-label and title tooltip. Use when the visible text alone lacks context for screen readers (e.g. text "Toon", accessible-label "Toon wachtwoord"). The text is still shown visually in lg size regardless. |
| `tooltip-timing` | `string` | Forwarded to the inner nldd-tooltip's `timing`: 'default' (700 ms show-delay), 'instant', or 'never' (suppress the visual tooltip; screen readers still get the aria-label). Use 'never' when the surrounding context already explains the button (e.g. spin buttons in nldd-number-field, the chevron in nldd-split-button). |
| `href` | `string` | When set, renders an <a> element instead of <button> |
| `target` | `string` | Link target (e.g. '_blank'); only used when href is set. With '_blank' the "opens in new tab" announcement is folded into the aria-label for screen readers (WCAG 2.1 SC 3.2.2). |
| `rel` | `string` | Link rel attribute; defaults to 'noopener noreferrer' when target is '_blank' |
| `translations` | `object` | Override translation keys (e.g. the "opens in new tab" announcement); unset keys fall back to Dutch. |
| `popovertarget` | `string` | ID of a popover element to toggle; forwarded to the inner <button> |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `icon` | Slot for a custom icon (e.g. custom SVG). Only used when icon attribute is not set; falls back to a placeholder icon when the slot is empty. |
| `popup` | A single `nldd-menu` or `nldd-popover` this button invokes. Slotting it auto-anchors the overlay to the button and toggles it on click (no id/anchor wiring). The overlay syncs `expanded` and `aria-haspopup` back onto the button. Add `expandable` for the disclosure chevron. Mirrors nldd-split-button; manual `popovertarget` wiring keeps working without a slotted overlay. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `click` | When button is clicked (not fired when disabled) |

### `<nldd-split-button>`

A split button combines a primary action button with a dropdown trigger. The main button performs the default action, while the icon button opens a menu or popover. Provide the dropdown by slotting an `nldd-menu` (with its `nldd-menu-item` / `nldd-menu-divider` children) or an `nldd-popover` directly: ```html <nldd-split-button text="Opslaan"> <nldd-menu> <nldd-menu-item text="Opslaan als…"></nldd-menu-item> </nldd-menu> </nldd-split-button> ``` The slotted overlay stays in the light DOM — no item-moving — so consumers keep their references and the full overlay API. The split-button anchors it to the chevron and opens it on click. When no overlay is slotted, the chevron dispatches `menu-click` and the consumer manages their own popover.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `string` | Button size: 'xs' \| 'sm' \| 'md' \| 'lg' (default: 'md') |
| `variant` | `string` | Button variant (default: 'neutral-tinted') |
| `disabled` | `boolean` | Disabled state |
| `width` | `string` | Width mode: 'full' (stretches to container) or any CSS length; the main action button fills the available space |
| `text` | `string` | Button text for the primary action |
| `icon` | `string` | Icon name shown before the text on the primary action button |
| `translations` | `object` | Translations; unset keys fall back to Dutch |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | A single `nldd-menu` or `nldd-popover` that the chevron opens. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `action-click` | Fired when the main button is clicked |
| `menu-click` | Fired when the dropdown trigger is clicked and no overlay is slotted |

### `<nldd-toolbar>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `string` | Toolbar size, propagated to all child controls: 'sm' \| 'md' \| 'lg' (default: 'md'). At 'lg' the overflow button (and lg-capable children like nldd-icon-button) stack their label below the icon. |
| `show-item-labels` | `boolean` | When true, shows a text label below each toolbar item and the overflow button |
| `label` | `string` | Accessible label for the toolbar. Only needed when multiple toolbars appear on the same page |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `start` | nldd-toolbar-item and nldd-toolbar-title elements placed at the start |
| `center` | nldd-toolbar-item and nldd-toolbar-title elements placed at the center |
| `end` | nldd-toolbar-item and nldd-toolbar-title elements placed at the end |
| `overflow` | nldd-menu-item, nldd-menu-divider and nldd-menu-group elements always shown in the overflow menu |

### `<nldd-toolbar-item>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `width` | `string` | Fluid width: a percentage (e.g. '40%') or any CSS length (e.g. '240px'). Setting it (or min-width or max-width) makes the item fluid so it grows to fill the available space. |
| `min-width` | `string` | Minimum (fluid) width as a CSS length (e.g. '240px'). Setting it also makes the item fluid. |
| `max-width` | `string` | Maximum (fluid) width as a CSS length (e.g. '480px'). Setting it also makes the item fluid. |
| `label` | `string` | Text label shown below the item when the toolbar has show-item-labels. |
| `priority` | `number` | Overflow order: items with a lower priority move into the overflow menu first (default 0). Items sharing a priority overflow together, regardless of position. |
| `fluid` | `boolean` | Set by nldd-toolbar, not a consumer attribute: marks an item that grows or shrinks to fill space. Toggled synchronously during measurement, so it can appear or disappear between layout frames — do not style against it. It is not reflected as a JS property — read it with hasAttribute('fluid'). |
| `solo-fluid` | `boolean` | Set by nldd-toolbar, not a consumer attribute: the sole fluid item, allowed to shrink below its content. Same synchronous-toggle and property-read caveats as fluid. |
| `hidden` | `boolean` | Set by nldd-toolbar, not a consumer attribute, when the item moves into the overflow menu. Same synchronous-toggle caveat. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | The control shown in the toolbar (e.g. nldd-icon-button) |
| `overflow` | nldd-menu-item / nldd-menu-divider / nldd-menu-group children, shown in the overflow menu when this item overflows |

### `<nldd-toolbar-title>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `text` | `string` | Title text. |
| `supporting-text` | `string` | Secondary supporting text shown below the title. |
| `align` | `string` | Text alignment: 'left' \| 'center' (default: 'left'). |
| `width` | `string` | Preferred (fluid) width as a CSS length or percentage; the title grows toward it and shrinks to min-width. |
| `min-width` | `string` | Minimum width as a CSS length (default: '0', so the title shrink-wraps its content and the next element sits against it). |
| `max-width` | `string` | Maximum width as a CSS length (default: '240px'); the title text truncates with an ellipsis beyond it. The cap is lifted while the title is the sole toolbar element (it then stretches to fill the row). |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `action` | Optional trailing control (e.g. an xs nldd-icon-button), shown inline after the title and tuned to sit against it. Empty by default. |

## Content

### `<nldd-blockquote>`

Toont een citaat met optionele bron-attributie.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `cite` | `string` | URL van de bron (wordt doorgegeven aan het <blockquote> element) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | De citaat-paragra(a)f(en) — gebruik bij voorkeur <p>-elementen |
| `attribution` | Optionele bronvermelding (auteur, titel, etc.). Ook een nldd-byline mag hier; het kastlijntje ("— ") wordt dan weggelaten. |

### `<nldd-byline>`

Een redactionele regel die auteurs of redacteuren toont: optionele avatar(s), een naamregel en ondersteunende tekst (bijvoorbeeld functie of datum). Alle onderdelen zijn optioneel. De naamregel en ondersteunende tekst kunnen als attribuut of als slot worden aangeleverd. Gebruik de slots voor rijkere inhoud, zoals een `<time datetime="…">` voor machine-leesbare datums of een link naar het auteursprofiel. Geslotte inhoud vervangt het bijbehorende attribuut (het attribuut is de fallback van de slot). Bij meerdere redacteuren overlappen de avatars elkaar subtiel; elke avatar krijgt een ring in de surface-kleur (zelfde mechaniek als badge) zodat ze visueel gescheiden blijven. Op een gekleurde ondergrond kan de ringkleur meegegeven worden via `--context-parent-background-color`. Op smalle breedtes (een sm-container, ≤ 640px) met meerdere avatars komt de avatarrij boven de namen te staan, zodat de tekst de volle breedte houdt; met één avatar blijft de byline op één regel. Avatars worden geslot als `<img slot="avatars">`. Zet `alt=""` wanneer de namen al in de tekst staan (decoratief); geef anders een beschrijvende alt-tekst op. Voor één avatar kun je in plaats van slotten ook `avatar-src` (met optioneel `avatar-srcset`) als attribuut meegeven; de afmetingen liggen vast (40px), dus `sizes` zet het component zelf. Meerdere avatars gaan altijd via de slot, en geslotte avatars hebben voorrang op `avatar-src`.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `text` | `string` | Naamregel (bijv. "Jan Jansen en Piet Pietersen"); fallback wanneer de text-slot leeg is |
| `supporting-text` | `string` | Ondersteunende tekst onder de naamregel (bijv. rol of datum); fallback wanneer de supporting-text-slot leeg is |
| `avatar-src` | `string` | Bron van één avatar (alternatief voor de avatars-slot); genegeerd zodra de avatars-slot gevuld is |
| `avatar-srcset` | `string` | Responsive source set voor de avatar-src-afbeelding |
| `avatar-alt` | `string` | Alt-tekst voor de avatar-src-afbeelding; leeg = decoratief |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `avatars` | Eén of meer img-elementen; gestyled als ronde, overlappende avatars |
| `text` | Naamregel als rijke inhoud (bijv. een link naar het auteursprofiel) |
| `supporting-text` | Ondersteunende tekst als rijke inhoud (bijv. een time-element) |

### `<nldd-code-viewer>`

A read-only block of code/text built on a non-editable CodeMirror 6 view. Visually pairs with nldd-code-editor (same engine, same token palette). Whitespace is preserved; long lines scroll horizontally by default. Set `wrap` to break long lines onto the next visual line. Set `language` to one of the supported grammars (yaml, json, javascript, typescript, css, html, xml, bash, markdown, rust, gherkin, toml, sql, python) to highlight the content. Without `language` the content renders plain. Grammars are loaded lazily on first use, so a page that never sets `language` ships zero grammar code. Token colors are the `--components-code-viewer-token-*` custom properties (shared with the editor via the CodeMirror highlight style). Override them per-instance to swap the theme.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `variant` | `'simple'\|'box'` | Visual style. `box` (default) is a framed card with rounded corners, padding, fill, and a 1px border ring. `simple` drops the entire frame — use when embedding inside a parent surface. |
| `background` | `'tinted'\|'base'` | Surface fill when `variant="box"`. |
| `language` | `string` | Grammar to highlight with. Empty disables highlighting. |
| `no-copy` | `boolean` | Hide the copy-to-clipboard button (shown by default). |
| `wrap` | `boolean` | Wrap long lines instead of horizontal scroll |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Default slot for the code/text content (also the copy source) |

### `<nldd-icon>`

A customizable icon component that renders SVG icons from a predefined library. Icons are decorative by default: the host gets `aria-hidden="true"` automatically. If you want the icon to be announced by assistive tech, set `aria-hidden="false"` on the consumer side together with an `aria-label`. Sizing: by default the icon fills its parent (existing behaviour). Set `size` to pin to a fixed spacer-aligned dimension (16–96px). Colour: by default the icon inherits its parent's `color`. Set `color` to one of the functional semantics (`primary-content`, `secondary-content`, `accent`, `critical`, `warning`, `success`) or a rijkskleur (`lintblauw`, `paars`, `groen`, …). For arbitrary one-off colours, set `style="color: …"` on the host — the inherited `color` still drives the SVG fill/stroke.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `name` | `string` | The name of the icon to display |
| `size` | `string` | Fixed size in px (spacer-aligned: 16, 20, 24, 28, 32, 40, 44, 48, 56, 64, 80, 96). Empty = inherit from parent. |
| `color` | `string` | Functional (`primary-content`, `secondary-content`, `accent`, `critical`, `warning`, `success`) or rijkskleur (`lintblauw`, `donkerblauw`, `hemelblauw`, `lichtblauw`, `paars`, `violet`, `robijnrood`, `roze`, `rood`, `oranje`, `donkergeel`, `geel`, `donkerbruin`, `bruin`, `donkergroen`, `groen`, `mosgroen`, `mintgroen`). Empty = inherit `color` from parent. |

### `<nldd-image>`

Wraps a native `<img>` with design-system styling: corner radius variants, aspect-ratio reservation, object-fit/position control, optional caption + credit. Renders as `<figure>` + `<figcaption>` only when a caption or credit is set — otherwise just the image, no extra wrapping. Hybrid source: the `src` attribute renders an internal `<img>`. To use a custom `<img>` or `<picture>` (e.g. with art-direction sources), slot it into the default slot and we'll style and wrap it like our own image.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `src` | `string` | Image URL |
| `alt` | `string` | Alt text. Required unless `decorative`. |
| `srcset` | `string` | Responsive source set |
| `sizes` | `string` | Source sizes hint |
| `width` | `number\|'full'` | Display width. `full` (default) fills the parent. A numeric value sets host `max-width` AND the `<img>` layout-hint width. |
| `height` | `number` | Intrinsic height (for layout reservation) |
| `loading` | `'lazy'\|'eager'` | Loading strategy (default: 'lazy'). Lazy defers fetch until the image is near the viewport — the right choice for below-the-fold content. Set to 'eager' on images that appear in the initial viewport, especially the LCP candidate (hero illustration, top-of-list thumbnail); leaving them lazy silently regresses Core Web Vitals because the LCP fetch waits for the intersection observer. Pair with `fetchpriority="high"` on the LCP image for the strongest signal. |
| `decoding` | `'async'\|'sync'\|'auto'` | Decoding hint (default: 'async') |
| `fetchpriority` | `'high'\|'low'\|'auto'` | Fetch priority hint |
| `aspect-ratio` | `string` | Aspect ratio in CSS form (e.g. "16/9", "1/1", "4/3"). "16:9" colon notation is also accepted for convenience. |
| `object-fit` | `'cover'\|'contain'\|'fill'\|'scale-down'\|'none'` | default: 'cover' |
| `object-position` | `'center'\|'top'\|'bottom'\|'left'\|'right'` | default: 'center' |
| `shape` | `'square'\|'rounded'\|'circle'` | Corner shape (default: 'square') |
| `caption` | `string` | Caption text shown below the image |
| `credit` | `string` | Smaller credit/attribution text shown beside the caption |
| `decorative` | `boolean` | Decorative image: alt is forced empty + aria-hidden |
| `lqip` | `string` | Low-quality image placeholder as a CSV string `"base,c1,c2,c3,c4,c5,c6"` — seven 0-255 bytes, each packing an 8-bit Oklab triplet (2 bits L, 3 bits a, 3 bits b). The first is the base color shown outside the cell gradients; the other six are per-cell colors in row-major 3×2 order. Generate via the encoder in `lqip-encoder.ts` or via the "LQIP encoder tool" Storybook story. Extends Lean Rada's CSS-only LQIP (https://leanrada.com/notes/css-only-lqip/) with per-cell hue — Lean's original format encodes grayscale cells only; ours encodes a color per cell so multi-color subjects survive the placeholder. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Custom `<img>` or `<picture>` (overrides the src-based default). The internal `error` listener is attached only to the built-in `<img>`, so slotted content does not trigger the error-state overlay automatically. Consumers slotting their own image are responsible for handling its error state (e.g. swapping the slot content or styling a fallback). |
| `caption` | Rich caption content (overrides the `caption` attribute) |

### `<nldd-keyboard-shortcut>`

Toont een toetsencombinatie (zoals Cmd+K of Ctrl+Shift+P) in één gecombineerde container met semantische <kbd>-elementen per toets. Op touch-only devices (geen hover-capable input) wordt de shortcut standaard verborgen omdat hij niet aanroepbaar is. Gebruik het `always-visible` attribuut wanneer de shortcut puur informatief is en altijd zichtbaar moet blijven. Voor cross-platform shortcuts kunnen `mac-keys`, `windows-keys` en `linux-keys` worden gezet — het component picks de juiste op basis van de gedetecteerde OS, met `keys` als fallback voor onbekende platforms.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `keys` | `string` | Toetsen gescheiden door '+' (bijv. 'Cmd+K' of 'Ctrl+Shift+P'). Gebruik '+++' voor een letterlijke '+' toets: 'Ctrl+++' wordt 'Ctrl' + '+'. Voor complexere scenario's (bijv. combo met meerdere '+' keys) kun je in plaats van het keys-attribuut de default slot gebruiken met eigen <kbd> elementen. |
| `mac-keys` | `string` | Optionele override voor macOS (incl. iPhone/iPad/iPod). |
| `windows-keys` | `string` | Optionele override voor Windows. |
| `linux-keys` | `string` | Optionele override voor Linux/ChromeOS. |
| `size` | `string` | Grootte: 'sm' \| 'md' \| 'inherit' (default: 'md'). 'inherit' neemt de font-size over van de container; bij de box-variant schalen de keycaps dan mee in em. |
| `variant` | `string` | 'box' (default) toont elke toets als keycap met vulling en highlight-rand; 'simple' toont de toetsen als platte tekst met scheidingstekens — lichter, voor inline gebruik zoals in een menu-item. |
| `always-visible` | `boolean` | Toon ook op touch-only devices waar shortcuts niet aanroepbaar zijn. |
| `color` | `string` | 'neutral' (default) gebruikt de eigen component-kleuren. 'inherit' laat de toetsen en scheidingstekens de omringende tekstkleur (currentColor) volgen, met een doorschijnende contrast-vulling en highlight-rand — handig op een gevulde vlakkleur of een gemarkeerde rij. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Optionele custom <kbd>-elementen. Wordt genegeerd als keys is opgegeven. |

### `<nldd-rich-text>`

A container for rich text content that automatically applies responsive typography. Uses no shadow DOM so styles apply to all nested elements. Import nldd-rich-text.css globally in your application. Kinderen worden in drie zones geplaatst: tekst (headings, paragrafen, lijsten, blockquote, div/section) leest op de `main`-maat; media en tabellen (img, figure, video, iframe, table) krijgen het `wide`-accent; al het overige — codeblokken en élke component — krijgt de volledige `full`-span met `justify-self: start`, zodat de ruimte beschikbaar is maar niet geforceerd wordt. Per kind te overschrijven met `data-width="main" | "wide" | "full"`. In de linkse layout lezen wide en full als bleed naar rechts; met `centered` zijn ze symmetrisch.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `spacing` | `string` | Spacing between elements: 'flat' \| 'tight' \| 'snug' (default) \| 'loose' |
| `centered` | `boolean` | Centers the main column inside the container; without it, content is left-aligned |
| `hyphens` | `boolean` | Opt-in automatische woordafbreking voor doorlopende tekst (p, li, dd). Vereist een correcte `lang` op de pagina (bijv. `lang="nl"` op `<html>`): zonder taalinfo breekt de browser niet af. Een `overflow-wrap: break-word`-vangnet op p/li staat altijd aan, los van dit attribuut, zodat lange URLs en samenstellingen ook zonder woordenboek netjes breken in plaats van te overlopen. |
| `color` | `string` | 'inherit' laat alle tekst de kleur van de ondergrond volgen (voor gekleurde vlakken zoals de filled-categories). Links blijven onderstreept als affordance; secundaire tekst (figcaption) krijgt dezelfde kleur op verlaagde dekking. Bekende v1-gaten: inline code, mark, tabellen en hr behouden hun eigen surfaces. Leeg = standaard contentkleuren. |
| `translations` | `object` | Override translation keys; unset keys fall back to Dutch |

### `<nldd-tag>`

Een compacte label voor categorieën, statussen of metadata. Niet interactief. Voor interactieve chips (filter, dismiss) gebruik je <nldd-token>.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `color` | `string` | Kleurvariant. Semantisch: 'neutral' \| 'accent' \| 'success' \| 'warning' \| 'critical'. Rijkskleuren: 'lintblauw' \| 'donkerblauw' \| 'hemelblauw' \| 'lichtblauw' \| 'paars' \| 'violet' \| 'robijnrood' \| 'roze' \| 'rood' \| 'oranje' \| 'donkergeel' \| 'geel' \| 'donkerbruin' \| 'bruin' \| 'donkergroen' \| 'groen' \| 'mosgroen' \| 'mintgroen'. (default: 'neutral') |
| `size` | `string` | Tag grootte: 'sm' \| 'md' (default: 'md') |
| `text` | `string` | Tag tekst (alternatief voor default slot) |
| `icon` | `string` | Icoon voor de tekst |
| `variant` | `string` | Wat zichtbaar is: 'text' \| 'icon' \| 'icon-and-text'. Onbepaald → auto-detect op basis van welke van text/icon aanwezig is. |
| `accessible-label` | `string` | Toegankelijk label voor screenreaders. Gebruik dit bij icon-only tags zonder zichtbare tekst. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Tag tekst |
| `icon` | Custom icoon voor de tekst |

### `<nldd-title>`

A title bar with an optional overline, title, and subtitle on the left, and a slot for actions on the right.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `number` | Visual size of the title: 1–6 (default: 3) |
| `color` | `string` | 'inherit' laat de titel de tekstkleur van de ondergrond volgen (voor gekleurde vlakken zoals de filled-categories); overline en subtitle krijgen dezelfde kleur op verlaagde dekking. Leeg = standaard contentkleuren. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `overline` | Optional overline above the title |
| _(default)_ | Title text (use h1–h6 for semantics) |
| `subtitle` | Optional subtitle below the title |
| `actions` | Actions to the right of the title (buttons, menus, etc.) |

### `<nldd-token>`

A token component representing a piece of data — such as a person in an address field or an active filter value. Optionally dismissable or interactive via a contextual menu.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `text` | `string` | Token text; falls back to the default slot when unset. |
| `control` | `'none' \| 'dismiss' \| 'menu'` | Control type (default: 'none') |
| `expanded` | `boolean` | Reflects whether the token's menu is open (control="menu"); managed by the token. |
| `disabled` | `boolean` | Disabled state |
| `dismiss-text` | `string` | Accessible label for the dismiss button (default: 'Verwijder') |
| `menu-text` | `string` | Accessible label for the menu button (default: 'Toon opties') |
| `roving` | `boolean` | Inside a roving-focus container (e.g. nldd-token-field): the host is the single tab stop, so the trailing control is not separately tabbable. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Token text |
| `menu` | An nldd-menu that the token opens from its menu button (control="menu"). |

**Events**

| Event | Beschrijving |
| --- | --- |
| `dismiss` | When the dismiss button is clicked |

### `<nldd-tooltip>`

Wrapper component dat een tooltip toont bij hover of focus op het child element. Gebruikt `display: contents` zodat het de layout van het child niet beïnvloedt.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `text` | `string` | Tooltip tekst |
| `open` | `boolean` | Forceer de tooltip zichtbaar, ongeacht hover/focus. Gebruik voor programmatische feedback (bv. "Gekopieerd"). Reset naar false om hover-gedrag te herstellen. |
| `placement` | `string` | Positie: 'top' \| 'bottom' \| 'left' \| 'right' (standaard: 'bottom'; op touch devices automatisch 'top') |
| `timing` | `string` | Wanneer de tooltip verschijnt op hover: 'instant'  — direct, zonder show-delay. 'default'  — na de standaard show-delay (700ms). 'never'    — tooltip wordt nooit getoond; hover/focus events worden genegeerd, aria-describedby wordt onderdrukt en een al zichtbare tooltip verdwijnt. Hide-delay en touch suppression blijven onder alle waarden van kracht. Focus-trigger is altijd instant. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Het element waarop de tooltip wordt getoond |

**Events**

| Event | Beschrijving |
| --- | --- |
| `nldd-tooltip-dismiss` | Wanneer een gebruiker Escape drukt terwijl `open=true` is. De consumer beheert dan de open-lifecycle (wij kunnen `open` niet eenzijdig wissen), dus dit event geeft de consumer de kans om `open` terug naar `false` te zetten. WCAG 1.4.13: persistent hover-/ focus-overlays moeten dismissible zijn zonder focus te verplaatsen. |

## Forms

### `<nldd-form>`

Nederlandse Digitale Dienst Form Component Plain custom element (extends HTMLElement, no Lit) — required for light-DOM autofill. Renders a real <form> element in the LIGHT DOM around its children. Chrome's autofill engine looks for native <input> elements that have a <form> ancestor in the light DOM; with shadow-DOM inputs it can't find them, so we keep this component shadow-less. **Differs from other nldd-* components:** - Geen shadowRoot — alle children leven in light DOM (binnen het inner <form>) - Geen Lit — pure HTMLElement met handmatige attribute-mirroring - **Vereist global stylesheet import** — vertical rhythm en form-section divider-suppression regels staan in `dist/css/form.css` (of `global.css`), niet in een component-specifieke shadow stylesheet. Import deze als deel van je app's globale CSS bundle. **Two usage modes:** 1. **Auto-wrap** (default): write children directly. Component creates a `<form>` element and migrates children into it via MutationObserver. Simplest API. 2. **User-provided form** (framework-friendly): write your own `<form>` as direct child. Component detects it, takes over attribute-mirroring, en skipt de migration. Children blijven waar je framework ze plaatst — geen DOM-shuffling die met React/Vue/Angular reconciliation conflicteert. **Framework interop:** In auto-wrap mode wordt elke direct child verplaatst naar het inner form via een MutationObserver. Voor de meeste React/Vue use cases werkt dit prima omdat frameworks alleen DOM-mutaties doen wanneer hun virtual DOM verandert. Voor edge cases (animatie-libs die DOM-positie tracken, SSR-hydration mismatches, frameworks die actief sibling-positions controleren) gebruik dan **user-provided form** mode. Voor programmatische manipulatie: gebruik de `form` getter zodat je direct met het inner `<form>` element werkt: const inner = document.querySelector('nldd-form').form; inner.checkValidity(); inner.appendChild(myInput); // skipt migration-overhead

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `name` | `string` | Form name |
| `action` | `string` | URL endpoint for submission |
| `method` | `string` | HTTP method ('get' \| 'post' \| 'dialog') |
| `novalidate` | `boolean` | Skip native browser validation |
| `enctype` | `string` | Encoding type for submission |
| `target` | `string` | Submit target ('_self' \| '_blank' \| ...) |
| `autocomplete` | `string` | 'on' \| 'off' (form-level autofill toggle) |
| `label-alignment` | `string` | Default `label-alignment` voor descendant nldd-form-field en nldd-form-actions ('top' \| 'right' \| 'left'). Wordt naar descendants gepropageerd als `form-label-alignment`. Een eigen `label-alignment` op de descendant heeft voorrang via CSS-cascade. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `submit` | — |
| `reset` | — |

### `<nldd-form-actions>`

Een layout-wrapper voor de actie-knoppen onderaan een formulier (typisch een submit-button of button-group). Volgt dezelfde responsive layout als `nldd-form-field`: met `label-alignment="right"` of `"left"` krijgt de inhoud dezelfde insprong als de invoervelden boven, dankzij een `::before`-pseudo-element dat fungeert als spacer-kolom waar de label zou staan. Erft `label-alignment` automatisch over van een wrappende `<nldd-form>`: de form propageert z'n eigen `label-alignment` als `form-label-alignment` naar descendant `nldd-form-actions` (en `nldd-form-field`) via een MutationObserver. Een expliciete eigen `label-alignment` op de form-actions wint via CSS-cascade — de form-code raakt het `label-alignment` attribuut van de descendant nooit aan. <nldd-form label-alignment="right"> <nldd-form-field>...</nldd-form-field> <nldd-form-actions> <nldd-button-group> <nldd-button variant="primary" type="submit" text="Opslaan"></nldd-button> </nldd-button-group> </nldd-form-actions> </nldd-form>

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `label-alignment` | `string` | 'top' (default) \| 'right' \| 'left'. Een eigen waarde wint altijd over de inherited form-label-alignment. |
| `form-label-alignment` | `string` | Door wrappende nldd-form gezet als fallback. Niet zelf zetten in consumer-code. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Actie-elementen (button, button-group, etc.) |

### `<nldd-form-field>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `label-alignment` | `string` | 'top' (default) \| 'right' \| 'left'. Een eigen waarde wint altijd over de inherited form-label-alignment. |
| `form-label-alignment` | `string` | Door wrappende nldd-form gezet als fallback. Niet zelf zetten in consumer-code. |
| `label` | `string` | Field label text. Omit for no-label layout. |
| `supporting-label` | `string` | Short supporting text below the label. Same typography as optional badge. |
| `optional` | `boolean` | Shows an optional badge next to the label. |
| `optional-label` | `string` | Text for the optional badge. Defaults to 'Optioneel'. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | The slotted input (e.g. nldd-text-field). Set `invalid` and `error-message="id1 id2"` on the input to wire up error texts. nldd-form-field-error-text elements assign themselves to the errors slot automatically. |

### `<nldd-form-field-error-text>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `id` | `string` | Referenced by the input's `error-message` attribute. |
| `invalid` | `boolean` | Visibility managed automatically by nldd-form-field. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | The error message text. |

### `<nldd-form-field-help-text>`

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Help text content. May contain inline elements including links. |

### `<nldd-form-section>`

Nederlandse Digitale Dienst Form Section Component Plain custom element (extends HTMLElement, no Lit) — light-DOM render lost een NVDA + Firefox a11y-bug op waar shadow-DOM <fieldset> + <legend> niet betrouwbaar als group-label aangekondigd worden voor slotted controls. Native fieldset/legend in light DOM werkt correct over alle AT/browser-combinaties. **Differs from shadow components:** - Geen shadowRoot — alle children leven in light DOM (binnen het gerenderde <fieldset>). - Geen Lit — pure HTMLElement met handmatige DOM-mutation. - **Vereist global stylesheet import** — `dist/css/form-section.css` (of `global.css`). Form-section heeft geen shadow stylesheet. Renders to: <nldd-form-section> <fieldset class="form-section"> <legend class="form-section__header"> <span class="form-section__title">Title</span> <span class="form-section__subtitle">Subtitle</span> </legend> <div class="form-section__main"> [user's children] </div> </fieldset> </nldd-form-section> **Accessibility note**: de title rendert als `<legend>`. Dat is semantisch een **groep-label**, geen heading. Screenreaders kondigen 't aan wanneer de gebruiker in de fieldset komt, maar gebruikers die met de H-toets door headings springen slaan 'm over. Visueel lijkt 't op een heading; gebruik dit component dus voor *form-grouping*, niet als pagina-structuur. Voor echte page-headings: gebruik een apart heading-element boven het form. **Supporting-text lengte**: de subtitle staat als `<span>` binnen de `<legend>` zodat SR 'm meeleest als group label. Bijwerking: bij elke field-entry binnen de sectie wordt de hele legend (titel + subtitel) opnieuw uitgesproken. Houd `supporting-text` daarom kort (richtlijn: ≤ ~80 tekens) en gebruik 'm voor groep-introductie ("Vul je adresgegevens in"), niet voor uitgebreide instructies. Voor langere uitleg op een specifiek veld: gebruik `nldd-form-field-help-text` op dat veld. <nldd-form> <nldd-form-section text="Persoonsgegevens" supporting-text="Vul je gegevens in."> <nldd-form-field label="Voornaam">...</nldd-form-field> <nldd-form-field label="Achternaam">...</nldd-form-field> </nldd-form-section> <nldd-form-section text="Adres"> <nldd-form-field label="Straat">...</nldd-form-field> </nldd-form-section> <nldd-form-actions>...</nldd-form-actions> </nldd-form>

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `text` | `string` | Heading-tekst (gerenderd in `<legend>`). |
| `supporting-text` | `string` | Korte beschrijving onder de heading. Houd ≤ ~80 tekens (zie a11y-note). |

## Inputs

### `<nldd-checkbox>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `checked` | `boolean` | Checked state |
| `disabled` | `boolean` | Disabled state |
| `indeterminate` | `boolean` | Indeterminate state (takes precedence over checked visually) |
| `value` | `string` | Value for form submission |
| `name` | `string` | Name for form submission |
| `accessible-label` | `string` | Accessible label forwarded as aria-label to the native input. Note: aria-labelledby is not supported as IDREF resolution cannot cross shadow DOM boundaries. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | Fired when the checkbox state changes; detail: { checked: boolean, value: string } |

### `<nldd-checkbox-field>`

A checkbox with an inline label for use in forms.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `checked` | `boolean` | Checked state |
| `indeterminate` | `boolean` | Indeterminate state |
| `disabled` | `boolean` | Disabled state |
| `value` | `string` | Value for form submission |
| `name` | `string` | Name for form submission |
| `label` | `string` | Label text for the checkbox |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | When checked state changes; detail: { checked: boolean, value: string } |

### `<nldd-code-editor>`

A monospace editor for code, YAML, JSON and other technical content, built on CodeMirror 6 (via NLDDCodeMirrorElement). Visually pairs with nldd-code-viewer for a matching read-only surface. Default `variant="simple"` is a bare, flush editor (no frame, no focus ring) for use inside an nldd-form-field or a consumer composition that owns its own chrome and focus treatment; the caret is rendered as a prominent accent as the focus cue. `variant="input-field"` adds the framed surface (border ring, tinted fill, inner padding, radius) and a focus ring for standalone use. The simple variant has no surrounding space of its own: let a layout container own the spacing and forward clicks with `focusFromPoint()` so clicking the padding still starts editing. Optional `language` enables lazy syntax highlighting; `line-numbers` adds a gutter (click a number to move the caret to that line).

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `string` | Editor content |
| `placeholder` | `string` | Placeholder text shown while empty |
| `input-id` | `string` | Sets the id on the editable element. Set automatically by nldd-form-field. |
| `disabled` | `boolean` | Disabled state |
| `name` | `string` | Field name for form submission |
| `readonly` | `boolean` | Readonly state (focusable and selectable, not editable) |
| `required` | `boolean` | Required state |
| `wrap` | `boolean` | Wrap long lines instead of horizontal scroll |
| `rows` | `number` | Minimum visible rows (the floor in every resize mode). Default: 6. |
| `resize` | `string` | 'none' (fixed) \| 'vertical' (drag) \| 'auto' (grow, default) |
| `variant` | `string` | 'simple' (default, bare) \| 'input-field' (framed surface) |
| `language` | `string` | Highlight grammar (yaml, json, javascript, typescript, css, html, xml, bash, markdown, rust, gherkin, toml, sql, python). Empty disables highlighting. |
| `line-numbers` | `boolean` | Show a line-number gutter |
| `accessible-label` | `string` | Accessible label forwarded to the editor. Set automatically by nldd-form-field. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `input` | When the content changes (detail: { value }) |
| `change` | When the content is committed on blur (detail: { value }) |

### `<nldd-combo-box>`

A text input with autocomplete dropdown via nldd-menu. Add a slotted nldd-menu with nldd-menu-item children to provide options. The slotted nldd-menu keeps its default focus behavior (menu container receives focus) so that typing keeps focus on the input. The picker button moves focus to the menu explicitly on activation. Note: Only nldd-menu-item type="button" is supported. Radio and checkbox types are not supported in this context.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `string` | The selected form value |
| `text` | `string` | The text shown in the input. May differ from `value` (e.g. value="nl" → text="Nederland"). Set this when pre-populating an existing record. If left empty and `value` matches a slotted menu item, the matching item's `text` is used automatically. |
| `placeholder` | `string` | Placeholder text for the input |
| `size` | `string` | Size: 'sm' \| 'md' (default: 'md') |
| `valid` | `boolean` | Marks the field as valid |
| `invalid` | `boolean` | Marks the field as invalid |
| `disabled` | `boolean` | Disabled state |
| `allow-custom` | `boolean` | Allow committing free-typed values that match no option (Enter/blur). Default false: only menu options are accepted. |
| `name` | `string` | Input name for form submission |
| `autocomplete` | `string` | Browser autofill hint. Default 'off' to prevent the native autofill panel from competing with the menu dropdown. Set to a valid token (e.g. 'country', 'organization') when browser autofill is desired. |
| `accessible-label` | `string` | Accessible label forwarded as aria-label to the input. Required for screen reader accessibility. |
| `max-items` | `number` | Maximum visible items before scrolling (default: 8) |
| `translations` | `object` | Override translation keys; unset keys fall back to Dutch |
| `no-spellcheck` | `boolean` | Disables browser spellchecking on the inner input |
| `width` | `string` | Optional fixed width (any CSS length, e.g. "240px"). Default: stretches to fill container. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | An nldd-menu element with nldd-menu-item and nldd-menu-divider children |

**Events**

| Event | Beschrijving |
| --- | --- |
| `input` | When the input value changes; detail: { value: string } |
| `change` | When an option is selected or a custom value is committed; detail: { value: string } |

### `<nldd-dropdown>`

A visual wrapper around a native `<select>` element. The consumer provides a native `<select>` as a slotted child — this way the browser retains full control over form submission, accessibility and keyboard navigation, including `<optgroup>`, `data-*` attributes and dynamic changes to options.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `string` | Size: 'xs' \| 'sm' \| 'md' (default: 'md') |
| `valid` | `boolean` | Marks the field as valid |
| `invalid` | `boolean` | Marks the field as invalid |
| `disabled` | `boolean` | Disabled state; also forwarded to the slotted select |
| `expanded` | `boolean` | Reflects whether the native picker popup is open (driven internally) |
| `width` | `string` | Optional fixed width (any CSS length, e.g. "240px"). Default: stretches to fill container. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | A native `<select>` element with `<option>` and/or `<optgroup>` children |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | Bubbles up from the slotted select; detail: { value: string } |

### `<nldd-multi-line-text-field>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `string` | The textarea value |
| `placeholder` | `string` | Placeholder text |
| `input-id` | `string` | Sets the id on the native textarea. Set automatically by nldd-form-field. |
| `size` | `string` | 'md' (default) \| 'sm'. Set automatically by nldd-form-field. |
| `invalid` | `boolean` | Marks the field as invalid |
| `valid` | `boolean` | Marks the field as valid |
| `disabled` | `boolean` | Disabled state |
| `name` | `string` | Textarea name for form submission |
| `readonly` | `boolean` | Readonly state |
| `required` | `boolean` | Required state |
| `autocomplete` | `string` | Autocomplete hint |
| `rows` | `number` | Initial visible rows (minimum height). Default: 3. |
| `resize` | `string` | 'none' \| 'vertical' \| 'auto' (default). 'auto' grows with content (native field-sizing), no manual handle. |
| `accessible-label` | `string` | Accessible label forwarded to the inner textarea. Set automatically by nldd-form-field. |
| `no-spellcheck` | `boolean` | Disables browser spellchecking on the inner textarea |
| `width` | `string` | Optional fixed width (any CSS length, e.g. "240px"). Default: stretches to fill container. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `input` | When value changes |
| `change` | When value is committed (blur) |

### `<nldd-number-field>`

A numeric input field with decrement and increment buttons.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `number` | Current value |
| `min` | `number` | Minimum value (default: -Infinity) |
| `max` | `number` | Maximum value (default: Infinity) |
| `step` | `number` | Step size (default: 1) |
| `size` | `string` | Size: 'sm' \| 'md' (default: 'md') |
| `disabled` | `boolean` | Disabled state |
| `name` | `string` | Name for form submission |
| `translations` | `object` | Translations; unspecified keys fall back to Dutch |
| `width` | `string` | Width mode: 'full' (stretches to container) or any CSS length (e.g. '240px') |
| `hide-spin-buttons` | `boolean` | When set, hides the decrement and increment buttons |
| `accessible-label` | `string` | Accessible label (aria-label) forwarded to the native input |

**Events**

| Event | Beschrijving |
| --- | --- |
| `input` | When the value changes (typing, +/- button, or on-commit correction); detail: { value: number } |
| `change` | When the value is committed (blur/Enter or +/- button), clamped to [min, max]; empty input falls back to the last valid value. When the committed value differs from the typed value, a matching input event is fired immediately before this one. detail: { value: number } |

### `<nldd-password-field>`

A password input field with visibility toggle and validation states.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `string` | The input value |
| `placeholder` | `string` | Placeholder text |
| `input-id` | `string` | Sets the id on the native input. Set automatically by nldd-form-field. |
| `size` | `string` | 'md' (default) \| 'sm'. Set automatically by nldd-form-field. |
| `valid` | `boolean` | Marks the field as valid |
| `invalid` | `boolean` | Marks the field as invalid |
| `disabled` | `boolean` | Disabled state |
| `masked` | `boolean` | Whether the password is masked (default: true) |
| `show-button-text` | `string` | Visible toggle button text when masked (default: 'Toon') |
| `hide-button-text` | `string` | Visible toggle button text when unmasked (default: 'Verberg') |
| `show-button-accessible-label` | `string` | aria-label for toggle when masked (default: 'Toon wachtwoord') |
| `hide-button-accessible-label` | `string` | aria-label for toggle when unmasked (default: 'Verberg wachtwoord') |
| `readonly` | `boolean` | Readonly state |
| `required` | `boolean` | Required state |
| `name` | `string` | Input name for form submission |
| `autocomplete` | `string` | Autocomplete hint |
| `accessible-label` | `string` | Accessible label forwarded to the inner input. Set automatically by nldd-form-field. |
| `width` | `string` | Optional fixed width (any CSS length, e.g. "240px"). Default: stretches to fill container. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `input` | When the input value changes ({ detail: { value } }) |
| `change` | When the input value is committed ({ detail: { value } }) |

### `<nldd-radio-button>`

WAI-ARIA: Wrap radio buttons in a <fieldset>/<legend> or a container with role="radiogroup" and aria-labelledby for proper group semantics. <fieldset> <legend>Kies een optie</legend> <nldd-radio-button name="options" value="1">Optie 1</nldd-radio-button> <nldd-radio-button name="options" value="2">Optie 2</nldd-radio-button> </fieldset>

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `checked` | `boolean` | Checked state |
| `disabled` | `boolean` | Disabled state |
| `accessible-label` | `string` | Accessible label forwarded as aria-label to the native input. Note: aria-labelledby is not supported as IDREF resolution cannot cross shadow DOM boundaries. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | When checked state changes; detail: { checked: boolean, value: string, name: string } |

### `<nldd-radio-button-field>`

A radio button with an inline label. Use inside nldd-radio-button-group for keyboard navigation and group semantics. The group sets the name.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `checked` | `boolean` | Checked state |
| `disabled` | `boolean` | Disabled state |
| `value` | `string` | Value for form submission |
| `label` | `string` | Label text for the radio button |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | When checked state changes; detail: { checked: boolean, value: string } |

### `<nldd-radio-button-group>`

Groups nldd-radio-button-field elements, handles keyboard navigation, and forwards name and disabled state to all child fields. Use inside nldd-form-field which provides the group label.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `name` | `string` | Forwarded to all slotted nldd-radio-button-field elements |
| `disabled` | `boolean` | Disables all slotted fields |
| `required` | `boolean` | Marks the group as required |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Slot for nldd-radio-button-field elements |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | Bubbles up from the checked field; detail: { checked: boolean, value: string } |

### `<nldd-search-field>`

A search input with a leading search icon, an optional dismiss button, and an optional search button.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `string` | The search value |
| `placeholder` | `string` | Placeholder text for the input |
| `accessible-label` | `string` | Accessible label (aria-label) for the native input. Falls back to placeholder when not set. Set explicitly when a value is already present and the placeholder is no longer visible. |
| `size` | `string` | Field size: 'sm' \| 'md' (default: 'md') |
| `disabled` | `boolean` | Disabled state |
| `name` | `string` | Input name for form submission |
| `show-search-button` | `boolean` | When set, shows a search button on the right |
| `translations` | `object` | Override translation keys; unset keys fall back to Dutch |
| `no-spellcheck` | `boolean` | Disables browser spellchecking on the inner input |
| `width` | `string` | Optional fixed width (any CSS length, e.g. "240px"). Default: stretches to fill container. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `input` | When the input value changes; detail: { value: string } |
| `change` | When the input value is committed; detail: { value: string } |
| `search` | When search is submitted via Enter or the search button; detail: { value: string } |

### `<nldd-segmented-control>`

A horizontal group of mutually exclusive (radio) or multi-select (checkbox) options. Exports both NLDDSegmentedControl and NLDDSegmentedControlItem.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `string` | Selected value for radio type |
| `size` | `string` | Control size: 'sm' \| 'md' \| 'lg' (default: 'md') |
| `type` | `string` | Input type: 'radio' \| 'checkbox' (default: 'radio'). |
| `variant` | `string` | Content type for all items: 'text' \| 'icon' \| 'icon-and-text' (default: 'text') |
| `disabled` | `boolean` | Disabled state for all items |
| `width` | `string` | Width mode: 'full' (stretches to container), 'fit-content' (per-item content size), or any CSS length (e.g. '240px') |
| `name` | `string` | Name for form submission, forwarded to native inputs |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | nldd-segmented-control-item elements |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | When selection changes; detail: { value: string } for radio, detail: { values: string[] } for checkbox |

### `<nldd-segmented-control-item>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `string` | Value for this item |
| `selected` | `boolean` | Whether this item is selected (set by parent) |
| `disabled` | `boolean` | Disabled state |
| `text` | `string` | Text label (shown for variant "text" and "icon-and-text"; used as aria-label and tooltip for variant "icon") |
| `icon` | `string` | Icon name for nldd-icon |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `icon` | Slot for a custom icon (e.g. custom SVG). Only used when icon attribute is not set. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `item-change` | When item is activated; detail: { value: string, checked: boolean } |

### `<nldd-stepper>`

A numeric control with increment and decrement buttons.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `number` | Current value |
| `min` | `number` | Minimum value (default: 0) |
| `max` | `number` | Maximum value (default: Infinity) |
| `step` | `number` | Step size (default: 1) |
| `disabled` | `boolean` | Disabled state |
| `size` | `string` | Size: 'xs' \| 'sm' \| 'md' (default: 'md') |
| `translations` | `object` | Translations; unspecified keys fall back to Dutch |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | When the value changes; detail: { value: number } |

### `<nldd-switch>`

A toggle control for on/off settings. Prefer nldd-switch-field for labeled usage — it combines the switch with a visible label. Direct use of nldd-switch requires an accessible-label attribute for screen reader accessibility.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `checked` | `boolean` | Whether the switch is on/off |
| `disabled` | `boolean` | Disabled state |
| `size` | `string` | Switch size: 'xs' \| 'sm' (default: 'sm') |
| `accessible-label` | `string` | Accessible label forwarded as aria-label to the native input. Required when using nldd-switch without nldd-switch-field. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | When the switch state changes; detail: { checked: boolean, value: string } |

### `<nldd-switch-field>`

A switch toggle with an inline label for use in forms.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `checked` | `boolean` | Checked state |
| `disabled` | `boolean` | Disabled state |
| `value` | `string` | Value for form submission |
| `name` | `string` | Name for form submission |
| `label` | `string` | Label text for the switch |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | When checked state changes; detail: { checked: boolean, value: string } |

### `<nldd-text-editor>`

A hybrid markdown editor built on CodeMirror 6 (via NLDDCodeMirrorElement): the document stays plain markdown text, but formatting is shown inline (bold is bold, headings are larger, links are coloured) while the syntax markers stay visible, only dimmed — the iA Writer / Kirby approach. No WYSIWYG tree, so the data stays portable. Default `variant="simple"` is bare (no frame, no focus ring) for use inside a composition (e.g. a message field) that owns its chrome and focus; the caret is a prominent accent. `variant="input-field"` adds a framed surface + focus ring. `font` is `sans` (default, best for prose) or `mono`. Headless: there is no built-in toolbar. A consumer drives formatting via the command methods (toggleBold/toggleItalic/toggleInlineCode/toggleStrikethrough/ toggleHeading/toggleBulletList/toggleQuote/toggleLink/runCommand to toggle, and setHeading/setList for picker-style "set" semantics), reads the active formats with getState(), listens to the nldd-text-editor-state event to render toggle states, and forwards padding clicks with focusFromPoint(). Cmd/Ctrl+B/I/E/K are bound out of the box. Commands keep focus on the editor. An @-mention typeahead (mentionSource) collapses to an atomic token, and a W3C-style annotation overlay (annotations) marks ranges with a dashed underline, light tint and a count badge without touching the underlying text.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `string` | Editor content (markdown) |
| `placeholder` | `string` | Placeholder text shown while empty |
| `input-id` | `string` | Sets the id on the editable element. Set automatically by nldd-form-field. |
| `disabled` | `boolean` | Disabled state |
| `name` | `string` | Field name for form submission |
| `readonly` | `boolean` | Readonly state (focusable and selectable, not editable) |
| `required` | `boolean` | Required state |
| `wrap` | `boolean` | Wrap long lines (default true; prose wraps) |
| `rows` | `number` | Minimum visible rows (the floor in every resize mode). Default: 6. |
| `resize` | `string` | 'none' (fixed) \| 'vertical' (drag) \| 'auto' (grow, default) |
| `variant` | `string` | 'simple' (default, bare) \| 'input-field' (framed surface) |
| `font` | `string` | 'sans' (default) \| 'mono' |
| `accessible-label` | `string` | Accessible label forwarded to the editor. Set automatically by nldd-form-field. |
| `annotatable` | `boolean` | Enable the annotation overlay (off by default). Annotations only render when this is set. |
| `translations` | `object` | Override the editor's assistive-tech strings (the open-in-new-tab link badge and the annotation count badge). Unset keys fall back to Dutch. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `input` | When the content changes (detail: { value }) |
| `change` | When the content is committed on blur (detail: { value }) |
| `nldd-text-editor-state` | When the selection or content changes (detail: TextEditorState), for toolbar toggle state |
| `nldd-text-editor-mention` | When an @-mention is inserted (detail: MentionInsertedDetail with id, label, from, to) |
| `nldd-text-editor-annotation-click` | When an annotation's count badge is clicked (detail: { ids: string[], rect: DOMRect }); rect is the badge's viewport box so a consumer can anchor its own note UI to it |

### `<nldd-text-field>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `string` | The input value |
| `placeholder` | `string` | Placeholder text |
| `input-id` | `string` | Sets the id on the native input. Set automatically by nldd-form-field. |
| `size` | `string` | 'md' (default) \| 'sm'. Set automatically by nldd-form-field. |
| `invalid` | `boolean` | Marks the field as invalid |
| `valid` | `boolean` | Marks the field as valid |
| `disabled` | `boolean` | Disabled state |
| `type` | `string` | Input type: 'text' \| 'email' \| 'tel' \| 'url' |
| `name` | `string` | Input name for form submission |
| `readonly` | `boolean` | Readonly state |
| `required` | `boolean` | Required state |
| `autocomplete` | `string` | Autocomplete hint |
| `accessible-label` | `string` | Accessible label forwarded to the inner input. Set automatically by nldd-form-field. |
| `no-spellcheck` | `boolean` | Disables browser spellchecking on the inner input |
| `width` | `string` | Optional fixed width (any CSS length, e.g. "240px"). Default: stretches to fill container. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `input` | When input value changes |
| `change` | When input value is committed |

### `<nldd-toggle-button>`

A selectable button that toggles between selected and unselected. Available as a button (aria-pressed), checkbox, or radio input.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `type` | `'button' \| 'checkbox' \| 'radio'` | Underlying element (default: 'button') |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | Button size (default: 'md') |
| `selected` | `boolean` | Selected state |
| `disabled` | `boolean` | Disabled state |
| `value` | `string` | Value for form submission (checkbox/radio) |
| `name` | `string` | Name for form submission (checkbox/radio) |
| `text` | `string` | Button text |
| `icon` | `string` | Icon name for nldd-icon |
| `variant` | `'text' \| 'icon' \| 'icon-and-text'` | What renders: text, icon, or both. Unset → auto-detect from text/icon attributes. |
| `accessible-label` | `string` | Accessible label; required for icon-only usage |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `icon` | Slot for a custom icon (e.g. custom SVG). Only used when icon attribute is not set. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | When selection changes; detail: { selected: boolean, value: string } |

### `<nldd-toggle-button-group>`

Groups nldd-toggle-button elements and manages selection, keyboard navigation, and forwarding of type, name, size, and disabled state to all buttons. For type="radio" (single-select), arrow keys navigate between buttons and automatically select the focused one. For type="checkbox" (multi-select), multiple buttons can be selected simultaneously.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `type` | `'button' \| 'checkbox' \| 'radio'` | Selection mode (default: 'checkbox') |
| `name` | `string` | Forwarded to all buttons |
| `size` | `'xs' \| 'sm' \| 'md'` | Forwarded to all buttons (default: 'md') |
| `disabled` | `boolean` | Disables all buttons |
| `accessible-label` | `string` | Accessible name for the group (aria-label) |
| `accessible-labelled-by` | `string` | ID of an external label element (aria-labelledby) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | nldd-toggle-button elements |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | Bubbles up from the changed button; detail: { selected: boolean, value: string } |

### `<nldd-token-field>`

A multi-select input that looks like a normal input field: chosen values show as dismissible tokens in a wrapping row, followed by an inline text input that stretches to fill the remaining space and wraps to a new line (growing the field) when it no longer fits. Options are supplied as a slotted nldd-menu, exactly like nldd-combo-box; the menu filters as you type, with a chevron picker button, arrow-key roving across the tokens and ElementInternals form participation.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `values` | `string` | Initial token values as a comma-separated string (e.g. "nl, be, de"). Not reflected; the live value is the `.values` array property. Values can't contain commas. |
| `placeholder` | `string` | Placeholder shown in the input |
| `type` | `string` | Input type forwarded to the inner input (e.g. 'email') |
| `autocomplete` | `string` | Autocomplete hint forwarded to the inner input |
| `accessible-label` | `string` | Accessible label forwarded as aria-label to the input |
| `allow-custom` | `boolean` | Allow free-typed values (not just menu options) |
| `valid` | `boolean` | Marks the field valid (shows the valid icon) |
| `invalid` | `boolean` | Marks the field invalid (shows the invalid icon) |
| `no-spellcheck` | `boolean` | Disables browser spellchecking on the inner input |
| `readonly` | `boolean` | Readonly: static tokens, no input/picker, read-only surface |
| `required` | `boolean` | Marks the field required (invalid when it has no tokens) |
| `disabled` | `boolean` | Disabled state |
| `token-control` | `string` | Trailing control per token: 'dismiss' (default, a ✕ that removes it) or 'menu' (a ⌄ opening a per-token action menu supplied by the template prototypes) |
| `name` | `string` | Name for form submission |
| `translations` | `object` | Override translation keys; unset keys fall back to Dutch |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | An nldd-menu with nldd-menu-item options; each item's `value`/`text` supplies a token's value and its display label. |
| `template` | `nldd-token` prototypes supplying each token's action menu when token-control="menu": a keyless one is the shared default, a `data-value="X"` one overrides value X. Only the prototype's nested `nldd-menu` is used today; its other props are ignored. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `change` | When the selected values change; detail: { values: string[] } |
| `input` | When the input text changes; detail: { value: string } |
| `token-action` | When a token's menu action is chosen (token-control="menu"); detail: { value: string, action: string } |

## Layout

### `<nldd-app-view>`

The required root shell of a Nederlandse Digitale Dienst application. Always contains a split view or an nldd-page as direct content. Set background="tinted" to give the whole application a tinted background. All descendants read --context-parent-background-color via --_background-color automatically. Individual components can override locally with their own background attribute. The same background color is forced on `document.body` so that browser- chrome surfaces (iOS overscroll bounce, status bar, page-margin areas) blend with the app instead of revealing the user-agent's default white. Cleared when the app-view disconnects. In nested (default) scroll mode `overscroll-behavior: none` is set on `document.documentElement` and `document.body` while the app-view is connected. Combined with `overscroll-behavior: contain` on `nldd-page`'s scroll target, this prevents iOS rubber-band on the viewport when scroll gestures land outside an `nldd-page` (e.g. on a top-bar). In root scroll mode the document itself is the scroller, so this is lifted to let the native rubber-band happen. Cleared on last disconnect.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `background` | `'base'\|'tinted'` | Background color (cascades to descendants) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Default slot for the application content |

### `<nldd-bar-split-view>`

A vertical split view with a main area and an unlimited number of bar panels. Each child determines its order per breakpoint via sm-order, md-order, and lg-order. Children without order attributes are sorted by DOM order. All bars are in normal flow at every breakpoint and stack vertically. A divider is drawn only where the main pane meets an adjacent bar — directly above and/or below main — at every breakpoint (including sm). Two stacked bars on the same side never get a divider between them, so a toolbar and a tab-bar read as one visual unit. Consumers never manage dividers themselves. Give each bar a unique slot name (e.g. slot="toolbar", slot="status-bar"). Use slot="bar-1", slot="bar-2" if no meaningful name applies. The main panel always uses slot="main". Sets --context-parent-background-color, which cascades to all descendants.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `background` | `'inherit'\|'base'\|'tinted'` | Background color variant (default: inherit) |
| `above` | `'sm'\|'md'\|'lg'` | Show this panel from this breakpoint and larger |
| `below` | `'sm'\|'md'\|'lg'` | Show this panel up to and including this breakpoint |
| `only` | `'sm'\|'md'\|'lg'` | Show this panel only at this breakpoint |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `main` | Central panel for primary content |
| `*` | Any other unique slot name creates a bar panel |

### `<nldd-box>`

Use a box to visually group related components in a distinct, contained region. Boxes draw attention to a set of controls or content that belong together, helping users understand their relationship at a glance.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `background` | `'tinted'\|'base'` | Surface fill. - `tinted` (default): for a box on a plain page bg. - `base`: for a box sitting on an already-tinted parent (the border ring gets +2 palette steps so it still reads against a card-on-card). |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Place components inside the box |

### `<nldd-card>`

Een visueel afgebakende kaart met optionele header, body en footer secties. De kaart heeft een elevated look als standaard. Padding wordt overgelaten aan geneste containers. Met `href` wordt de hele kaart een link (een overlay-anchor over de kaart). Geneste interactieve content (bijv. footer-knoppen) moet je erboven tillen met `position: relative; z-index: 1` om klikbaar te blijven.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `accessible-label` | `string` | Toegankelijke naam van de kaart; bij `href` benoemt deze de link, anders de kaart-region |
| `href` | `string` | Maakt de hele kaart een link naar deze URL (leeg = geen link) |
| `target` | `string` | Link target voor href (bijv. '_blank'); stelt rel automatisch bij en voegt bij '_blank' een "Opent in nieuw tabblad"-melding toe |
| `rel` | `string` | Link rel voor href; standaard 'noopener noreferrer' bij target='_blank' |
| `translations` | `object` | Overschrijf vertaalsleutels (bijv. de "Opent in nieuw tabblad"-melding) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `header` | Header-content (bijv. nldd-title) |
| _(default)_ | Body-content |
| `footer` | Footer-content (bijv. nldd-button-group) — altijd aan onderkant |

### `<nldd-collection>`

A container for displaying collections of items. Supports grid, stack, and horizontal scroll layouts. In grid and stack modes, items are paginated via a load-more button. In horizontal scroll, the prev/next controls and the edge fade appear only when the items overflow the container. With `lazy-load`, the next items are automatically loaded when the load-more button comes into view.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `layout` | `string` | Layout mode: 'grid' \| 'stack' \| 'horizontal-scroll' (default: 'grid') |
| `show-load-more` | `boolean` | Show load-more button in grid/stack (default: false) |
| `max-items` | `number` | Number of visible items per page (default: 24) |
| `lazy-load` | `boolean` | Automatically load more items when the button becomes visible |
| `item-width` | `string` | Preferred width for each item (e.g. '280px', '20rem'). In grid layout used as the minimum column width (columns will be at least this wide; 1fr if container allows more). In horizontal scroll used as flex-basis. Never forces horizontal overflow — the value is clamped to container width. |
| `gap` | `string` | Custom gap between items (any CSS length, e.g. '8px'). Overrides the responsive default at every breakpoint; unset keeps the default. |
| `translations` | `object` | Translation overrides; unset keys fall back to Dutch. Available keys: 'components.collection.previous-action', 'components.collection.next-action', 'components.collection.load-more-action' |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Default slot for collection items |
| `footer` | Slot for custom footer content |

**Events**

| Event | Beschrijving |
| --- | --- |
| `load-more` | When the load-more button is clicked |

### `<nldd-container>`

A simple layout primitive: pick a layout mode, give it a gap, optionally align contents, and add padding. Padding can be set for all sides, per axis (inline/block), or per individual side. Specificity: per side > per axis > all sides. Responsive padding and gap have sm/md/lg variants. Each variant emits both an @media (viewport) and @container (layout-container) query. When inside a layout-container the @container query wins; otherwise the @media query provides the viewport-based fallback. Layout modes: - `stack` (default): block items, stacked vertically. The "what you expect from DOM flow" mode. - `row`: flex row, no wrapping. Items shrink or overflow. - `wrap`: flex row, items wrap to new lines. - `grid`: CSS grid, auto-fit columns at min 280px wide. - `columns`: CSS multi-column flow, 280px minimum column width, items don't split across column breaks. Alignment maps to the layout's natural axis: - `stack`: vertical = main-axis (justify-content), horizontal = cross-axis (align-items) - `row` / `wrap`: horizontal = main-axis, vertical = cross-axis - `grid`: horizontal = justify-items, vertical = align-items (per cell) - `columns`: alignment props have no effect (CSS multicol doesn't expose alignment) Item order is set per-child via attributes on the slotted children themselves: `<child order="3">` for a fixed position, or `<child sm-order="N">` / `<child md-order="N">` / `<child lg-order="N">` to override per breakpoint (resolved against THIS container's width via @container queries, same scope as the responsive padding/gap). The container observes slot changes and child attribute mutations and bridges these to `--_slot-order` / `--_slot-sm-order` / etc. custom properties on each child's inline style, which the container's CSS then reads via `::slotted(*)` inside @container queries. Cascade: `sm-order` falls back to `order` falls back to `0` at sm (and analogously for md/lg). No-op for `layout="columns"` (CSS multicol has no per-item ordering hook). The `column-count` attribute (1-8) forces an exact column count for `layout="grid"` (overrides auto-fit) and `layout="columns"` (overrides the natural width-driven count). `sm-column-count` / `md-column-count` / `lg-column-count` resolve against this container's OWN width via an `@container (...)` query on the host — not against the viewport. That lets a footer in a narrow sidebar choose its own column count independent of the surrounding page width. `layout="lanes"` packs items into balanced columns using native CSS grid lanes where supported, falling back to CSS multicol (column-order) elsewhere. CSS-only, no JS. Honours `gap` on both axes and `column-count`.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `layout` | `string` | 'stack' \| 'row' \| 'wrap' \| 'grid' \| 'columns' \| 'lanes' (default: 'stack') |
| `column-count` | `number` | Force N columns (1-8) for layout=grid/columns/lanes |
| `sm-column-count` | `number` | Column count when this container is sm-wide |
| `md-column-count` | `number` | Column count when this container is md-wide |
| `lg-column-count` | `number` | Column count when this container is lg-wide |
| `gap` | `string` | Gap between children |
| `sm-gap` | `string` | Gap at sm breakpoint |
| `md-gap` | `string` | Gap at md breakpoint |
| `lg-gap` | `string` | Gap at lg breakpoint |
| `horizontal-alignment` | `string` | 'left' \| 'center' \| 'right' |
| `vertical-alignment` | `string` | 'top' \| 'center' \| 'bottom' |
| `padding` | `string` | Padding for all sides |
| `padding-inline` | `string` | Padding for left and right |
| `padding-block` | `string` | Padding for top and bottom |
| `padding-top` | `string` | Padding top |
| `padding-right` | `string` | Padding right |
| `padding-bottom` | `string` | Padding bottom |
| `padding-left` | `string` | Padding left |
| `sm-padding` | `string` | Padding for all sides at sm |
| `sm-padding-inline` | `string` | (and equivalents for inline/block/top/right/bottom/left) |
| `md-padding` | `string` | Padding at md (and per-side equivalents) |
| `lg-padding` | `string` | Padding at lg (and per-side equivalents) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Container content |

### `<nldd-divider>`

Een scheidingslijn die secties van inhoud visueel van elkaar scheidt.

### `<nldd-full-bleed-section>`

A section that spans the full width without horizontal padding. Useful for background colors, images, or other content that runs edge to edge. Vertical padding and gap adjust via container queries.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `background` | `'inherit'\|'base'\|'tinted'` | Surface background ('inherit' default; 'base'/'tinted' paint and cascade a surface). |
| `scheme` | `'inherit'\|'light'\|'dark'\|'inverted'` | Color scheme ('inherit' default; 'inverted' = opposite of the surrounding page scheme). |
| `width` | `string` | Body max-width: 'full' removes the constraint so the section spans the full available width. Any CSS length (e.g. '480px') overrides the default max-width. |
| `height` | `string` | Minimum section height (any CSS length, e.g. '400px', '100dvh') (mirrors width, which sets the body max-width). |
| `padding-block` | `string` | Block (top and bottom) padding override (token 0-96; '0' strips it). |
| `padding-top` | `string` | Top padding override. |
| `padding-bottom` | `string` | Bottom padding override. |
| `sm-padding-block` | `string` | Responsive block padding (sm/md/lg, also per edge: {sm,md,lg}-padding-{top,bottom}). |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `header` | Content above the main content |
| _(default)_ | Main content |
| `footer` | Content below the main content |

### `<nldd-hero>`

Een paginakop met een mediavlak en een tekstpaneel (de main) dat op zes posities kan staan. Alle vlakken zijn rechthoekig. Bij `main-width="full"` staat het mediavlak als losse strook boven of onder het paneel, niet erachter. Op mobiel stapelt de media altijd boven het volle-breedte paneel. Zonder media vult de main het volledige vlak; met `main-background="base"` krijgt dat vlak een rand zodat het zichtbaar blijft op de base-surface. Met `main-background` krijgt het paneel een vlakkleur uit de filled-categories; die leveren een pure witte of zwarte contentkleur mee, zodat componenten met `color="inherit"` (title, rich-text) gegarandeerd contrast houden.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `main-position` | `'top-left'\|'top-right'\|'bottom-left'\|'bottom-right'\|'left'\|'right'` | Positie van het tekstpaneel (default: 'bottom-left'); 'left'/'right' beslaan de volle hoogte |
| `main-width` | `'1/2'\|'2/3'\|'3/4'\|'full'` | Breedte van het paneel (default: '1/2'); 'full' maakt een volle boven- of onderstrook en wordt bij 'left'/'right' genegeerd |
| `main-background` | `string` | Vlakkleur van het paneel: 'base' (de base surface) of een categoriekleur — 'accent' (default) of een rijkskleur zoals 'lintblauw'\|'donkerblauw'\|'oranje' |
| `media-aspect-ratio` | `string` | Aspect ratio van het mediavlak (CSS-vorm, '16/9' of '16:9'); default '21/9'. Bepaalt op md/lg de hoogte van de hero, op sm de hoogte van het mediavlak |
| `media-src` | `string` | Bron van het mediavlak (alternatief voor de media-slot); genegeerd zodra de media-slot gevuld is |
| `media-srcset` | `string` | Responsive source set voor media-src |
| `media-sizes` | `string` | Source sizes-hint voor media-src |
| `media-alt` | `string` | Alt-tekst voor media-src; leeg = decoratief |
| `background` | `'inherit'\|'base'\|'tinted'` | Surface achter de hero (sectie-API) |
| `scheme` | `'inherit'\|'light'\|'dark'\|'inverted'` | Kleurschema (sectie-API) |
| `width` | `string` | Body max-width; 'full' verwijdert de begrenzing (sectie-API) |
| `height` | `string` | Minimale hoogte van de sectie (sectie-API) |
| `padding-block` | `string` | Blokpadding-override, ook per rand en responsief (sectie-API) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `media` | Afbeelding of illustratie (img of nldd-image); vult het vlak en wordt geclipt. Heeft voorrang op de media-src-attributen. Zet `alt=""` wanneer de afbeelding decoratief is; geef anders een beschrijvende alt-tekst op. |
| _(default)_ | Inhoud van het tekstpaneel (bijv. nldd-title en nldd-rich-text met color="inherit") |

### `<nldd-navigation-split-view>`

A four-column layout with a primary sidebar, secondary sidebar, main content area, and inspector. The sidebars show navigation or lists, the main area shows primary content, and the inspector shows additional details or properties of the selection. Panes are shown automatically when content is slotted into them.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `inspector-auto-hidden` | `boolean` | Inspector hidden to free up space for other panes (read-only, set by the split view) |
| `inspector-as-sheet` | `boolean` | Always show the inspector as a sheet regardless of available space |
| `primary-sidebar-as-sheet` | `boolean` | Always show the primary sidebar as a sheet, keeping main visible at full width |
| `inspector-accessible-label` | `string` | Accessible name for the inspector sheet dialog (default: 'Details') |
| `primary-sidebar-accessible-label` | `string` | Accessible name for the primary sidebar sheet dialog (default: 'Navigatie') |
| `sidebar-as-sheet` | `boolean` | @deprecated alias for primary-sidebar-as-sheet (kept for backwards compatibility) |
| `sidebar-accessible-label` | `string` | @deprecated alias for primary-sidebar-accessible-label (kept for backwards compatibility) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `primary-sidebar` | Left pane for primary navigation |
| `secondary-sidebar` | Second pane for secondary navigation (shown when slotted) |
| `main` | Center pane for primary content |
| `inspector` | Right pane for details or properties |
| `sidebar` | @deprecated alias for the primary-sidebar slot (kept for backwards compatibility) |

### `<nldd-one-half-one-half-section>`

A section with two equal columns side by side. The columns wrap automatically when they become smaller than 280px. Padding and gap adjust via container queries.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `background` | `'inherit'\|'base'\|'tinted'` | Surface background ('inherit' default; 'base'/'tinted' paint and cascade a surface). |
| `scheme` | `'inherit'\|'light'\|'dark'\|'inverted'` | Color scheme ('inherit' default; 'inverted' = opposite of the surrounding page scheme). |
| `width` | `string` | Body max-width: 'full' removes the constraint so the section spans the full available width. Any CSS length (e.g. '480px') overrides the default max-width. |
| `height` | `string` | Minimum section height (any CSS length, e.g. '400px', '100dvh') (mirrors width, which sets the body max-width). |
| `padding-block` | `string` | Block (top and bottom) padding override (token 0-96; '0' strips it). |
| `padding-top` | `string` | Top padding override. |
| `padding-bottom` | `string` | Bottom padding override. |
| `sm-padding-block` | `string` | Responsive block padding (sm/md/lg, also per edge: {sm,md,lg}-padding-{top,bottom}). |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `header` | Content above the columns |
| _(default)_ | Left column (1/2), alternative for slot="left" |
| `left` | Left column (1/2) |
| `right` | Right column (1/2) |
| `footer` | Content below the columns |

### `<nldd-one-third-two-thirds-section>`

A section with a 1/3 sidebar on the left and 2/3 main content on the right. The columns wrap automatically when they become smaller than 280px. Padding and gap adjust via container queries.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `background` | `'inherit'\|'base'\|'tinted'` | Surface background ('inherit' default; 'base'/'tinted' paint and cascade a surface). |
| `scheme` | `'inherit'\|'light'\|'dark'\|'inverted'` | Color scheme ('inherit' default; 'inverted' = opposite of the surrounding page scheme). |
| `width` | `string` | Body max-width: 'full' removes the constraint so the section spans the full available width. Any CSS length (e.g. '480px') overrides the default max-width. |
| `height` | `string` | Minimum section height (any CSS length, e.g. '400px', '100dvh') (mirrors width, which sets the body max-width). |
| `padding-block` | `string` | Block (top and bottom) padding override (token 0-96; '0' strips it). |
| `padding-top` | `string` | Top padding override. |
| `padding-bottom` | `string` | Bottom padding override. |
| `sm-padding-block` | `string` | Responsive block padding (sm/md/lg, also per edge: {sm,md,lg}-padding-{top,bottom}). |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `header` | Content above the columns |
| `left` | Left column (1/3) |
| _(default)_ | Right column (2/3), alternative for slot="right" |
| `right` | Right column (2/3) |
| `footer` | Content below the columns |

### `<nldd-page>`

A page layout with optional sticky header and footer. Without sticky-header, the host is the scroll container and the header is in normal flow. With sticky-header, the header becomes absolute and .page__scroll takes over scrolling. A ResizeObserver on the header sets padding-top on the scroll wrapper (only when not scrolled). In root-scroll mode (--context-scroll-mode: root, derived upstream by nldd-app-view) the page stops owning a scroller: the document scrolls and the sticky header/footer become position:sticky layers offset by --context-layer-top/bottom. The mode is read on connect/resize and reflected to [data-scroll] so the CSS can branch.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `sticky-header` | `boolean` | Sticky header |
| `sticky-footer` | `boolean` | Sticky footer |
| `background` | `'inherit'\|'base'\|'tinted'` | Use a grey background instead of white |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `header` | Header content |
| _(default)_ | Main content (scrollable) |
| `footer` | Footer content |

### `<nldd-page-footer>`

The footer band at the bottom of a page. Hosts three optional rows in a fixed order: breadcrumbs (top), consumer-defined main content (middle), and a legal-bar (bottom). Dividers are drawn automatically between non-empty rows. Establishes its own container query (`page-footer-container`) so the responsive padding and gap react to the footer's own width, not the viewport. The host has `id="page-footer"` so a skip-link can target it directly. Use the sub-components `nldd-page-footer-legal-bar` and `nldd-page-footer-legal-bar-item` for the bottom row.

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `breadcrumbs` | `nldd-breadcrumbs` for the top row. |
| _(default)_ | Main footer content (typically a container with a grid of link columns). |
| `legal-bar` | `nldd-page-footer-legal-bar` for the bottom row. |

### `<nldd-popover>`

Een non-modal floating panel dat is verankerd aan een trigger-element. Gebouwd op de native Popover API (popover="auto") met Floating UI voor positionering. De browser regelt open/toggle/light-dismiss; deze component regelt alleen positionering en focus. Aanbevolen gebruik via popovertarget zodat de browser de toggle regelt: <nldd-button id="info-trigger" popovertarget="info-popover">Info</nldd-button> <nldd-popover id="info-popover" anchor="info-trigger" accessible-label="Info"> <nldd-container> <p>Inhoud van de popover.</p> </nldd-container> </nldd-popover> Voor een custom focus-target binnen de popover: zet `autofocus` op het gewenste child-element. Anders krijgt de popover-host zelf focus.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `anchor` | `string` | ID van het trigger-element voor positionering |
| `placement` | `string` | Floating UI placement (default: 'bottom-start') |
| `width` | `string` | Expliciete width (default: 320px via --components-popover-default-width) |
| `top` | `string` | CSS top-positie. Wanneer gezet (alleen of samen met andere edge-attrs of `centered`) wordt Floating UI's anchor-positionering overgeslagen — de popover staat dan vrij op het scherm. De `anchor` blijft wel nodig voor ARIA-koppeling op de trigger. Geen effect op sm (bottom-sheet wint). |
| `left` | `string` | CSS left-positie. Zie `top` voor semantiek. |
| `right` | `string` | CSS right-positie. Zie `top` voor semantiek. |
| `bottom` | `string` | CSS bottom-positie. Zie `top` voor semantiek. |
| `centered` | `boolean` | Centreert beide assen op de viewport. Per as overrideable: `centered top="0"` = horizontaal gecentreerd, top-aligned. Mirrort CSS `place-items: center` met `align-items`/`justify-items` overrides. |
| `sm-full-height` | `boolean` | Op sm-viewport (waar de popover als bottom-sheet rendert) de volledige beschikbare hoogte vullen i.p.v. te krimpen naar content. Geen effect op md+ (anchored modus). Opt-in voor content-heavy use cases zoals zoek- resultaten of lange detail-views; volgt Apple/Material conventie van content- sized als default. |
| `accessible-label` | `string` | (verplicht) Toegankelijke naam (aria-label). Valt terug op de i18n default ('Popover') als niet gezet — geef altijd een unieke, beschrijvende naam. |
| `role` | `string` | ARIA role (default: 'dialog'). Voor informationele content (tooltip-callout, rich-text help-panel) zonder dialog- interactie-pattern: zet `role="region"`. Voor menu-style triggers: `role="menu"` + `aria-haspopup="menu"` op de anchor. De popover overschrijft een expliciet gezette role nooit. |
| `translations` | `object` | Override translation keys; unset keys vallen terug op de Nederlandse default. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Vrije content (bijv. nldd-container met form/info) |

**Events**

| Event | Beschrijving |
| --- | --- |
| `open` | Wanneer de popover wordt geopend |
| `close` | Wanneer de popover wordt gesloten |

### `<nldd-sheet>`

An overlay component that slides in from the side or bottom of the screen. Based on the native <dialog> element for built-in accessibility, focus management, and Escape key support. On small (sm) viewports the sheet always renders as a bottom sheet, regardless of the configured placement. Render the sheet at the document root (teleport/portal it to `document.body`), never inside a split view's content flow: as a slotted flex child it would steal pane height (see `nldd-split-view-pane`).

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `placement` | `string` | Sheet position: 'left' \| 'right' \| 'bottom' (default: 'right') |
| `height` | `string` | Custom height for bottom sheets (and for any sheet on sm viewports, where all placements collapse to bottom). Accepts: `'full'` (default — viewport minus top-inset, identical to omitting the attribute), `'fit-content'` (collapse to content size), or any CSS length/percentage (e.g. `'50dvh'`, `'480px'`, `'50%'`). Always clamped to `100dvh - top-inset` so the sheet can't extend past the dismiss-tap area. No effect on side sheets at md+. |
| `modeless` | `boolean` | Non-modal (no backdrop or focus lock); the sheet is modal by default |
| `accessible-label` | `string` | Accessible name for the dialog, forwarded as aria-label (default: 'Venster') |
| `width` | `string` | Custom width for side sheets (left/right) as a CSS length (e.g. '480px', '32rem'). Applied from the md breakpoint up; ignored on sm (bottom sheet) and for `placement="bottom"`. Clamped to `100vw - 2 * inset` so the sheet always fits. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Sheet content |

**Events**

| Event | Beschrijving |
| --- | --- |
| `open` | Fired when the sheet is opened |
| `close` | Fired when the sheet is fully closed |

### `<nldd-side-by-side-split-view>`

A horizontal split view with multiple equal panes side by side. The number of panes is set via the `panes` attribute. Each pane automatically gets a numbered slot: pane-1, pane-2, etc. Panes that do not fit the available width are automatically hidden.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `background` | `'inherit'\|'base'\|'tinted'` | Use a tinted background color (cascades to descendants) |
| `panes` | `number` | Number of panes (default: 2) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `pane-1` | First pane |
| `pane-2` | Second pane |
| `pane-n` | Each subsequent pane based on the `panes` attribute |

### `<nldd-sidebar-section>`

A page section with a left sidebar alongside the main content. - **Wide (section >= 1008px):** two columns. The sidebar is a sticky, scrollable tinted box (max-width 320px) beside the main content. Its sticky top/bottom insets default to 16px; override with `sticky-top` / `sticky-bottom` so it clears other sticky page elements (e.g. a sticky header). - **Narrow (section < 1008px):** the sidebar collapses behind a sheet (a left panel on md+ viewports, a bottom sheet on mobile), and the host reflects a `collapsed` attribute. The consumer owns the trigger: place any chrome (a button, a chosen-filters bar, …) wherever you want, show it only while collapsed (e.g. `nldd-sidebar-section[collapsed] .my-trigger { … }` or by reading `collapsed` / listening to `collapse-change`), and call `show()` / `toggle()` to open the sheet. Bind `aria-expanded` via the `open`/`close` events. The sheet gets a sticky title bar by default — the `sidebar-label` as title plus a "Sluit" button — overridable via the `sheet-top-title-bar` slot. The sidebar content lives in `slot="sidebar"`. Its slot outlet moves between the box (expanded) and the sheet (collapsed) so there is a single, never-duplicated copy — the light DOM (and its state) is preserved across the switch. The box <-> sheet switch follows the section's OWN width (a ResizeObserver on the host), not the viewport — so a sidebar-section in a narrow column or a split-view pane collapses to the sheet just like one in a narrow viewport, and the sidebar never stacks above or crowds the main. Set `no-collapse` to opt out: a narrow section then stacks the sidebar (full-width) above the main instead of using a sheet. Inherits block `padding` and `height` from PageSectionMixin.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `collapsed` | `boolean` | Read-only, reflected: true while the sidebar is a sheet (the section is narrower than lg). Target it via CSS to reveal sheet-only chrome. |
| `no-collapse` | `boolean` | Opt out of the sheet: a narrow section stacks the sidebar above the main instead of collapsing. `collapsed` then stays false. |
| `width` | `string` | Body max-width: 'full' removes the constraint; any CSS length overrides the default. |
| `sticky-top` | `string` | Sticky top inset on lg (CSS length; default = 16px). |
| `sticky-bottom]-` | `string` | Sticky bottom inset on lg (CSS length; default = 16px). |
| `sidebar-label]-` | `string` | Accessible name for the sidebar (the aside landmark on lg and the sheet on sm/md). Default 'Zijbalk'. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Main content |
| `sidebar` | Sidebar content (sticky box when expanded, a left/bottom sheet when collapsed). The box and the sheet add no padding of their own — wrap the content in a padded container (e.g. nldd-container) for inset spacing. |
| `sheet-top-title-bar` | Replaces the sheet's default title bar (when collapsed). Empty falls back to an `nldd-top-title-bar` with the `sidebar-label` as title and a "Sluit" button. |
| `header` | Content above the columns |
| `footer` | Content below the columns |

**Events**

| Event | Beschrijving |
| --- | --- |
| `open` | The sidebar sheet opened. |
| `close` | The sidebar sheet closed. |
| `collapse-change` | The collapsed state flipped because the section's width crossed the lg breakpoint; `{ collapsed }`. |

### `<nldd-simple-section>`

A basic section with responsive padding and gap based on container size. Contains optional header and footer slots. The padding and spacing between slots adjust automatically via container queries.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `background` | `'inherit'\|'base'\|'tinted'` | Surface background ('inherit' default; 'base'/'tinted' paint and cascade a surface). |
| `scheme` | `'inherit'\|'light'\|'dark'\|'inverted'` | Color scheme ('inherit' default; 'inverted' = opposite of the surrounding page scheme). |
| `width` | `string` | Body max-width: 'full' removes the constraint so the section spans the full available width. Any CSS length (e.g. '480px') overrides the default max-width. |
| `height` | `string` | Minimum section height (any CSS length, e.g. '400px', '100dvh') (mirrors width, which sets the body max-width). |
| `padding-block` | `string` | Block (top and bottom) padding override (token 0-96; '0' strips it). |
| `padding-top` | `string` | Top padding override. |
| `padding-bottom` | `string` | Bottom padding override. |
| `sm-padding-block` | `string` | Responsive block padding (sm/md/lg, also per edge: {sm,md,lg}-padding-{top,bottom}). |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `header` | Content above the main content |
| _(default)_ | Main content |
| `footer` | Content below the main content |

### `<nldd-spacer>`

Add explicit space between elements. Components in this design system have no margins of their own — all whitespace is set by a spacer. Use a single `size` attribute for whitespace that's the same at every viewport. Combine with `sm-size`, `md-size` and/or `lg-size` to override the size at specific breakpoints (mobile-first cascade is intentionally avoided — each breakpoint that needs a different value declares it explicitly): - `size` applies at every breakpoint that has no per-viewport override. - `sm-size` overrides at sm (max-width: 640px). - `md-size` overrides at md (641px–1007px). - `lg-size` overrides at lg (min-width: 1008px). Use `flexible` (in any of the four attributes) to fill the remaining space in a flex container.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `string` | Base spacer size. 'flexible' or one of the fixed tokens (2–96). Default: '16'. |
| `sm-size` | `string` | Spacer size at sm breakpoint (max-width: 640px). |
| `md-size` | `string` | Spacer size at md breakpoint (641px–1007px). |
| `lg-size` | `string` | Spacer size at lg breakpoint (min-width: 1008px). |
| `direction` | `string` | Direction: 'horizontal' \| 'vertical' \| 'both' (default: 'both') |

### `<nldd-split-view-divider>`

A divider line between panels in a split view. The divider runs from edge to edge in the direction perpendicular to the orientation. An optional drag handle indicates that the divider is draggable (future functionality).

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `orientation` | `string` | Orientation: 'vertical' \| 'horizontal' |
| `has-drag-handle` | `boolean` | Show a drag handle |

### `<nldd-split-view-pane>`

A simple pane container for use inside split views. The split view automatically sets context: whether a back button should be shown. The consumer sets `has-content` to indicate the pane has content. The consumer sets `back-text` on the `nldd-top-title-bar` inside the pane. The split view sets `hide-back` when the back button is not applicable. The pane automatically hides the back button via CSS when `hide-back` is active. The pane sets `--context-parent-background-color` which cascades down to all descendants. Set `background="tinted"` on a pane to give it a tinted background independently of sibling panes. Descendants such as `nldd-page` read `--context-parent-background-color` automatically. A pane stretches its slotted content to fill it (`::slotted(*) { flex-grow: 1 }`), so slot only layout content here. Overlays (`nldd-sheet`, popovers, dialogs, menus) belong at the document root — teleport/portal them to `document.body`. Do not leave an overlay as a light-DOM sibling of a split view: it gets slotted into the main pane and becomes an extra flex-grow child that steals pane height, so in document-scroll (root) mode a short page's sticky footer floats mid-screen instead of docking.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `has-content` | `boolean` | The pane has content (default: false) |
| `hide-back` | `boolean` | Hide the back button (set automatically by the split view) |
| `background` | `'inherit'\|'base'\|'tinted'` | Use a tinted background color (cascades to descendants) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Pane content |

### `<nldd-stacked-split-view>`

A vertical split view with multiple stacked panes. The number of panes is set via the `panes` attribute. Each pane automatically gets a numbered slot: pane-1, pane-2, etc. Panes that do not fit the available height are automatically hidden.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `background` | `'inherit'\|'base'\|'tinted'` | Use a tinted background color (cascades to descendants) |
| `panes` | `number` | Number of panes (default: 2) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `pane-1` | First pane |
| `pane-2` | Second pane |
| `pane-n` | Each subsequent pane based on the `panes` attribute |

### `<nldd-two-thirds-one-third-section>`

A section with 2/3 main content on the left and a 1/3 sidebar on the right. The columns wrap automatically when they become smaller than 280px. Padding and gap adjust via container queries.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `background` | `'inherit'\|'base'\|'tinted'` | Surface background ('inherit' default; 'base'/'tinted' paint and cascade a surface). |
| `scheme` | `'inherit'\|'light'\|'dark'\|'inverted'` | Color scheme ('inherit' default; 'inverted' = opposite of the surrounding page scheme). |
| `width` | `string` | Body max-width: 'full' removes the constraint so the section spans the full available width. Any CSS length (e.g. '480px') overrides the default max-width. |
| `height` | `string` | Minimum section height (any CSS length, e.g. '400px', '100dvh') (mirrors width, which sets the body max-width). |
| `padding-block` | `string` | Block (top and bottom) padding override (token 0-96; '0' strips it). |
| `padding-top` | `string` | Top padding override. |
| `padding-bottom` | `string` | Bottom padding override. |
| `sm-padding-block` | `string` | Responsive block padding (sm/md/lg, also per edge: {sm,md,lg}-padding-{top,bottom}). |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `header` | Content above the columns |
| _(default)_ | Left column (2/3), alternative for slot="left" |
| `left` | Left column (2/3) |
| `right` | Right column (1/3) |
| `footer` | Content below the columns |

### `<nldd-window>`

Een zwevend venster gebaseerd op het native <dialog>-element. Kan modaal of niet-modaal worden weergegeven. Positioneerbaar via CSS-waarden. Geen eigen header — consumers gebruiken nldd-page met sticky-header binnenin voor een title bar.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `modeless` | `boolean` | Niet-modaal (geen backdrop of focusvergrendeling); standaard is het venster modaal |
| `accessible-label` | `string` | (verplicht) Toegankelijke naam (aria-label). Valt terug op de i18n default ('Venster') als niet gezet — geef altijd een unieke, beschrijvende naam per venster. |
| `translations` | `object` | Override translation keys; unset keys vallen terug op de Nederlandse default. |
| `top` | `string` | CSS top positie van de bovenrand (bijv. '0', '100px') |
| `left` | `string` | CSS left positie van de linkerrand |
| `right` | `string` | CSS right waarde |
| `bottom` | `string` | CSS bottom waarde |
| `centered` | `boolean` | Centreert beide assen op de viewport. Per as overrideable: `centered top="0"` = horizontaal gecentreerd, top-aligned. Mirrort CSS `place-items: center` met `align-items`/`justify-items` overrides. |
| `width` | `string` | CSS width (standaard: var(--components-window-default-width)) |
| `height` | `string` | CSS height (standaard: content height) |
| `scheme` | `'inherit'\|'light'\|'dark'` | Color scheme (default 'inherit'). |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Volledige window content (bijv. nldd-page) |

**Events**

| Event | Beschrijving |
| --- | --- |
| `open` | Wanneer het venster wordt geopend |
| `close` | Wanneer het venster volledig is gesloten |

## Navigation

### `<nldd-breadcrumbs>`

A trail of `nldd-breadcrumbs-item`s separated by `›`, rendered as a `<nav>` landmark wrapping a `<div role="list">` (with each item carrying `role="listitem"`). Explicit ARIA roles travel reliably across the slot boundary where the implicit `<ol>`/`<li>` mapping is inconsistent across AT + browser combos. The trail wraps onto multiple lines when it doesn't fit, so it adapts to any width.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `accessible-label` | `string` | Override the nav's aria-label. Defaults to the i18n value (NL: "Kruimelpad"). |
| `translations` | `object` | Override translation keys; unset keys fall back to the Dutch default. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | `nldd-breadcrumbs-item` children. |

### `<nldd-document-tab-bar>`

A horizontal tab bar for document tabs with an automatic overflow button and an end slot for action buttons. Exports both NLDDDocumentTabBar and NLDDDocumentTabBarItem.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `accessible-label` | `string` | Accessible name for the navigation landmark |
| `translations` | `object` | Translation overrides; unset keys fall back to Dutch. Available keys: 'components.document-tab-bar.overflow-action' (default: 'Meer') |
| `navigation` | `boolean` | Renders a nav landmark instead of tablist; use when items have hrefs |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | nldd-document-tab-bar-item elements |
| `end` | Action buttons (e.g. new tab) |

**Events**

| Event | Beschrijving |
| --- | --- |
| `tabchange` | Fired when a tab is selected; detail: { item } |
| `tabdismiss` | Fired when a tab is dismissed; detail: { item, nextItem } |
| `tabempty` | Fired when the last tab is dismissed |
| `nldd-reorder` | Fired when tabs are reordered via drag; detail: { fromIndex, toIndex } |

### `<nldd-document-tab-bar-item>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `selected` | `boolean` | Selected state (managed by nldd-document-tab-bar) |
| `text` | `string` | Primary text |
| `supporting-text` | `string` | Supporting text |
| `short-text` | `string` | Short primary text (visible below 200px width) |
| `short-supporting-text` | `string` | Short supporting text (visible below 200px width) |
| `href` | `string` | Optional link URL; renders an anchor instead of a div |

**Events**

| Event | Beschrijving |
| --- | --- |
| `select` | Fired when the item is activated; detail: { item } |
| `dismiss` | Fired when the dismiss button is clicked; detail: { item } |

### `<nldd-link>`

Hyperlink component met twee modi: 1. **Standalone (sized)** — set `size="xs"|"sm"|"md"|"lg"` voor menu's, actiegebieden of overzichten. Vaste tekstgrootte, `display: inline-flex` met `gap` voor icon-spacing. 2. **Inline (inherit)** — laat `size` weg of zet expliciet `size="inherit"`. De link erft `font-size`, `line-height` en `font-family` van zijn omgeving. Tekst wraps natuurlijk over regels (`display: inline`). Icons werken ook hier; de natuurlijke whitespace tussen icon en tekst zorgt voor de spacing. Voor links in CMS/markdown-output (waar de `<a>` als HTML binnenkomt) blijft `<nldd-rich-text>` met raw `<a>` de aangewezen route.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `href` | `string` | Link doel |
| `target` | `string` | Link target (bijv. '_blank'); stelt rel automatisch bij. Bij '_blank' voegt de link een visueel verborgen "Opent in nieuw tabblad"-melding toe voor screenreaders (WCAG 2.1 SC 3.2.2). |
| `rel` | `string` | Link rel attribuut; standaard 'noopener noreferrer' bij target='_blank' |
| `size` | `string` | Tekstgrootte: 'xs' \| 'sm' \| 'md' \| 'lg' \| 'inherit'. Leeg = inherit. |
| `text` | `string` | Link tekst (alternatief voor default slot) |
| `start-icon` | `string` | Icoon voor de tekst |
| `end-icon` | `string` | Icoon na de tekst |
| `accessible-label` | `string` | Toegankelijk label voor screen readers |
| `disabled` | `boolean` | Uitgeschakelde staat |
| `translations` | `object` | Overschrijf vertaalsleutels (bijv. de "Opent in nieuw tabblad"-melding); niet-gezette sleutels vallen terug op Nederlands. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Link tekst (alternatief voor text attribuut) |
| `start-icon` | Custom icoon voor de tekst |
| `end-icon` | Custom icoon na de tekst |

### `<nldd-menu-bar>`

Horizontale rij van nldd-menu-bar-item elementen met automatische overflow detectie. Items die niet passen worden verborgen achter een overflow button met een popover menu.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `overflow-text` | `string` | Tekst voor de overflow button (standaard via i18n) |
| `accessible-label` | `string` | aria-label voor de nav landmark |
| `compact` | `boolean` | Propageert compact attribuut naar slotted items (activeert content-priority) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | nldd-menu-bar-item elementen |

### `<nldd-menu-bar-item>`

Interactief bouwblok voor gebruik in een menu bar. Rendert als <a> (met href) of <button> (zonder href). Ondersteunt icon, text, disclosure indicator, en een expandable popover via een geslotte `<nldd-menu>` (of ander popover-element).

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `text` | `string` | Tekst van het item |
| `current` | `boolean` | Markeer als actief/huidig item |
| `current-type` | `string` | aria-current waarde als current is true ('page', 'step', 'location', 'true'). Standaard: 'page' |
| `href` | `string` | Optionele link URL. Zonder href rendert als button. |
| `icon` | `string` | Optioneel icon naam (nldd-icon) |
| `expandable` | `boolean` | Toon disclosure icon en open de geslotte `<nldd-menu>` bij klik |
| `icon-only` | `boolean` | Verberg tekst visueel (altijd) |
| `content-priority` | `'icon'\|'text'` | Bepaalt wat zichtbaar blijft in compact modus: 'icon' verbergt tekst, 'text' verbergt icon |
| `compact` | `boolean` | Activeert content-priority gedrag (gezet door parent nldd-menu-bar) |
| `disabled` | `boolean` | Schakel interactie uit |
| `accessible-label` | `string` | Overschrijf aria-label |
| `haspopup` | `string` | aria-haspopup waarde (bijv. "menu", "dialog") |
| `open` | `boolean` | Of het gekoppelde popover/menu open is |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Inhoud van de expandable popover — wrap items in een `<nldd-menu>` zodat dit component de menu-API (variant, accessible-label, translations, filterFn, …) niet hoeft te dupliceren. Event listeners op items werken direct, omdat er niet meer gekloond wordt. |

**Events**

| Event | Beschrijving |
| --- | --- |
| `select` | Bij klik op non-expandable button item (bubbles, composed) |

### `<nldd-pagination>`

A pagination control for navigating between pages of content.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `current` | `number` | Currently active page (1-based) |
| `total` | `number` | Total number of pages (recommended max: 200 for compact select performance) |
| `disabled` | `boolean` | Disabled state |
| `centered` | `boolean` | Centreert de pagination in de container (host fills row, items grouped in the middle) |
| `href-pattern` | `string` | URL patroon met {page} placeholder, rendert links in plaats van buttons |

**Events**

| Event | Beschrijving |
| --- | --- |
| `page-change` | Bij paginawisseling (detail: { page: number, href?: string }). Alleen cancelable in href-mode: preventDefault() voorkomt navigatie (SPA). |

### `<nldd-skip-link>`

Accessibility-patroon dat keyboard-gebruikers toestaat om content over te slaan. Wraps content in een default slot — zonder href focust het het eerste element na de skip-link in het DOM (nextElementSibling). Zorg dat er een focusbaar element na het component staat, anders heeft de skip-link geen effect.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `text` | `string` | Tekst van de skip-link. Fallback naar i18n default. |
| `href` | `string` | Optioneel extern doel-ID. Zonder href springt naar eind van eigen content. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Content die overgeslagen kan worden |

### `<nldd-tab-bar>`

A horizontal navigation bar with mutually exclusive tabs. Exports both NLDDTabBar and NLDDTabBarItem.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `variant` | `string` | Visual mode: 'icon-and-text' \| 'text' \| 'icon'. When unset, the variant is inferred from each item's content. Drives the layout at every size. |
| `size` | `string` | Size: 'md' \| 'lg' (default: 'md'). 'lg' enlarges the touch target; the per-variant layout is preserved (icon-and-text stacks the icon over the text, text renders large text, icon renders a larger icon-only control). |
| `navigation` | `boolean` | Renders a nav landmark instead of tablist; use for href-based items that navigate between routes |
| `disabled` | `boolean` | Disables the whole bar: dims it, blocks pointer interaction, and takes the tabs out of the tab order |
| `centered` | `boolean` | Centers the tabs in the container (host fills the row, tabs group in the middle) |
| `accessible-label` | `string` | Accessible name for the navigation region; defaults to 'Tabs' |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | nldd-tab-bar-item elements |

**Events**

| Event | Beschrijving |
| --- | --- |
| `tabchange` | When a tab is selected; detail: { item: NLDDTabBarItem } |

### `<nldd-tab-bar-item>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `selected` | `boolean` | Selected state (managed by nldd-tab-bar) |
| `text` | `string` | Tab text; also used as accessible name for icon-only items |
| `href` | `string` | Optional link URL; renders an anchor instead of a button |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `icon` | Icon content |

**Events**

| Event | Beschrijving |
| --- | --- |
| `select` | When the item is activated; detail: { item: NLDDTabBarItem } |

### `<nldd-top-navigation-bar>`

Minimal typed interface for nldd-sheet API.

### `<nldd-top-title-bar>`

A toolbar for page and container headings with optional navigation and action buttons. The component has two states: - Default: the back button shows the previous page title as a text button - Compact (class `is-compact`): the back button is an icon button, a divider and the toolbar title are visible When `collapse-anchor` is set, the `is-compact` class is automatically applied as soon as the top of the anchor element reaches this bar's own top edge (the sticky header line). Measuring the bar rather than the page keeps it correct in both nested and root scroll modes; it also re-points at the live scroll target when the page switches mode. Without `collapse-anchor` the bar takes a static state: compact when `text` is set (so the title shows in the title-group), non-compact otherwise (so the `back-text` button stays visible).

## Status & feedback

### `<nldd-activity-indicator>`

Layout placeholder that fills its parent and centres an indeterminate activity indicator. By default the indicator is held back for 1000ms so brief loading states don't flash; once the delay passes it fades in. Set `timing="instant"` to skip the delay (the fade-in still plays) — this is what embedding components such as `nldd-button` use for their loading state. The default indicator is a simple icon-sized circle that follows the shared `--context-content-color` channel (set by list-item / table / menu on their content), falling back to `currentColor` wherever that channel is unset (buttons, rich-text, standalone) — so a spinner inside a cell tracks the row's state-aware content colour, while embedders relying on currentColor are unaffected. An optional label sits below (hidden unless `show-text` is set). Drop a `<nldd-progress-circle>`, `<nldd-progress-bar>` or any element in the `indicator` slot to override it. Overlay mode: put content in the default slot and the indicator wraps it — it becomes a `position: relative` container, renders the spinner over a dimming backdrop (opt out with `no-backdrop`), and makes the content `inert` so its controls can't be focused or clicked. Toggle loading with `complete` (`?complete=${!isLoading}`). With no slotted content it stays the standalone placeholder described above. Reconnect behaviour: every `connectedCallback` resets the timer and hides the indicator again. If a consumer toggles the element via a conditional render (remove + re-insert) the indicator disappears and re-fades after another delay. Keep the element mounted and toggle visibility / `hidden` instead if you want the timer to run only once. Accessibility: while connected and not `complete` the host is a polite live region (`role="status"`). The label (`text`, or the translated "Laden" fallback) always renders as the region's content — visually hidden when `show-text` is off (the default) — so assistive tech announces the loading state when the indicator appears. Set `complete` (or unmount) to clear it.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `string` | Circle diameter on the icon scale: 16,20,24,28,32,40,44,48,56,64,80,96 (default '32') |
| `show-text` | `boolean` | Show the label under the indicator (default false; the label still feeds the accessible name) |
| `text` | `string` | Label text. Falls back to the translated "Laden" when unset. |
| `timing` | `'default'\|'instant'` | 'default' waits 1000ms before showing (anti-flash); 'instant' shows immediately (the fade-in still plays). Default 'default'. |
| `complete` | `boolean` | Mark the loader as finished while keeping the element mounted; clears aria-busy and hides the indicator. |
| `no-backdrop` | `boolean` | Overlay mode dims and blurs the wrapped content with a frosted backdrop by default; set this to show only the indicator panel without dimming. No effect in standalone mode. |
| `translations` | `object` | Override translation keys; unset keys fall back to Dutch |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Content to wrap (overlay mode); made inert while loading. Leave empty for the standalone placeholder. |
| `indicator` | Optional custom indicator; overrides the default circle (and its visually-hidden label). Consumers replacing it supply their own indicator semantics; the host's role="status" still marks the loading region. |

### `<nldd-badge>`

Een notificatie-indicator, vaak voor ongelezen aantallen of statusdots. Kan tekst, een getal en/of een icoon tonen. Zonder inhoud verschijnt automatisch een stip. Gebruik in een hoek van een ander element (bijv. een icon) of standalone.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `color` | `string` | Semantisch ('critical' \| 'accent' \| 'neutral' \| 'warning' \| 'success') of een Rijkskleur ('lintblauw' \| 'hemelblauw' \| 'oranje' \| …). Default: 'critical' |
| `size` | `string` | Grootte: 'sm' \| 'md' (default: 'md') |
| `text` | `string` | Tekst (heeft voorrang op number) |
| `number` | `number` | Numerieke waarde. Wordt beknopt als meer dan max |
| `max` | `number` | Maximum waarde boven welke number wordt getoond als "{max}+" (default: 99) |
| `icon` | `string` | Icoon naam. Icon-only wordt als vierkant gerenderd; met text/number komt het icoon links. |
| `accessible-label` | `string` | Toegankelijk label voor screenreaders. Fallback naar text/number; anders naar i18n default ("Notificatie"). |

### `<nldd-banner>`

An inline notification with a tinted background per variant. Use for persistent, page-level feedback (e.g. an error summary at the top of a form). Banner is more visually present than nldd-inline-dialog — the tinted colour catches the eye. If you need a quieter component, pick a different one rather than overriding the banner's ARIA. Layout: icon left, text + supporting text + optional rich content + actions in the centre, optional dismiss button right. Buttons wrap to a second row on narrow viewports via nldd-button-group's flex wrapping. role and aria-live are set automatically from the variant: - critical → role="alert" (interrupts screen reader) - others → role="status" aria-live="polite" Not overridable — if you need a less prominent component, use one. aria-atomic="true" is also set so that updates to the structured region (icon + heading + supporting-text + actions) are announced as one unit rather than as a partial subtree. Trade-off: any programmatic content mutation re-reads the entire banner. Banners are designed for short, heading-scale copy — if you slot in a paragraph of rich body text and then toggle variant or supporting-text at runtime, AT will re-announce the whole thing. Keep banner content concise, or render long-form messages in a different surface.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `variant` | `'neutral'\|'accent'\|'success'\|'warning'\|'critical'` | Colour and default icon (default: 'neutral') |
| `icon` | `string` | Icon override. Default per variant: neutral → info-circle-filled, accent → info-circle-filled, success → check-circle-filled, warning → exclamation-triangle-filled, critical → exclamation-circle-filled |
| `text` | `string` | Main text (heading or paragraph, depending on heading-level) |
| `supporting-text` | `string` | Supporting text below the heading |
| `heading-level` | `1\|2\|3\|4\|5\|6` | Renders text as h1–h6; absent renders a p |
| `dismissible` | `boolean` | Show a close button in the top-right; emits `dismiss` when clicked |
| `translations` | `object` | Override translation keys; unset keys fall back to Dutch |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Optional rich content between text and actions (e.g. nldd-rich-text) |
| `actions` | nldd-button elements, wrapped in a horizontal nldd-button-group |

**Events**

| Event | Beschrijving |
| --- | --- |
| `dismiss` | Fired when the dismiss button is clicked. The consumer is responsible for removing/hiding the banner. |

### `<nldd-inline-dialog>`

An inline status component for empty state, confirmations and feedback. Fills the container and has no minimum width.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `variant` | `'alert'\|'success'` | Semantic variant; 'alert' or 'success' forces a matching icon and color |
| `size` | `'md'\|'lg'` | Typography size: 'md' (default) keeps body-md text + body-sm supporting; 'lg' bumps both up a step. |
| `icon` | `string` | Name of the nldd-icon icon above the text; absent when not set. Ignored when variant is set. |
| `icon-color` | `string` | 'secondary' \| 'accent' \| 'critical' \| 'warning' \| 'success'. Overrides the default and variant icon color. |
| `text` | `string` | Main text (heading or paragraph, depending on heading-level) |
| `supporting-text` | `string` | Supporting text below the heading |
| `heading-level` | `1\|2\|3\|4\|5\|6` | Renders text as h1–h6; absent renders a p |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Optional custom content between text and actions |
| `actions` | nldd-button elements, wrapped in nldd-button-group (max 3) |

### `<nldd-just-in-time-education>`

Een guided-discovery coach-mark. Plaats een control (bijv. nldd-search-field) in de default slot; zolang `active` is gezet tilt het component een callout (titel + supporting text + dismiss) in de top layer via de Popover API (`popover="manual"`), geankerd aan het control met Floating UI. Geen backdrop, non-modaal: de achtergrond blijft interactief. Het control zelf blijft op zijn plek in de flow staan. Met `dismissable` beheert het component het sluiten en vuurt het nldd-close: - de gebruiker voert de geadviseerde interactie uit op het control -> close{completed} - de dismiss-knop -> close{dismissed} - een klik/toets BUITEN de coach-mark -> close{ignored} Zonder `dismissable` sluit niets vanzelf (geen knop, geen buiten- of slot-klik); dan bepaalt de consumer het sluiten zelf via `active` of `complete()`. `complete()` werkt altijd en sluit met close{completed} (bijv. pas bij een echte zoekopdracht).

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `active` | `boolean` | Toon de coach-mark. App-gestuurd; standaard false. |
| `text` | `string` | Titel van de callout. |
| `supporting-text` | `string` | Ondersteunende tekst onder de titel. |
| `placement` | `string` | 'auto' \| 'top' \| 'bottom' \| 'left' \| 'right' (standaard 'auto'). |
| `dismissable` | `boolean` | Toon de dismiss-knop en sta sluiten toe via 1 klik/toets buiten de coach-mark. Standaard false: dan beheert de consumer het sluiten zelf. |
| `arrow-length` | `string` | Pijllengte en dus de afstand tussen card en control, als CSS-lengte (bijv. \`333px\`, \`30vh\`). Leeg = DS-standaard; onder 40px wordt geklemd. |
| `no-arrow` | `boolean` | Verberg de pijl; de card staat dan dicht tegen het control. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Het control waar de coach-mark naar wijst (blijft in de normale flow). |

**Events**

| Event | Beschrijving |
| --- | --- |
| `nldd-close` | Wanneer de coach-mark sluit. detail: { reason: 'completed' \| 'dismissed' \| 'ignored' }. |

### `<nldd-modal-dialog>`

A modal window with overlay backdrop, based on the native <dialog> element. Internally renders an <nldd-inline-dialog> for the visual structure.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `variant` | `'alert'` | Forwarded to nldd-inline-dialog; 'alert' forces icon and color |
| `icon` | `string` | Forwarded to nldd-inline-dialog; absent when not set |
| `text` | `string` | Forwarded to nldd-inline-dialog; main text |
| `supporting-text` | `string` | Forwarded to nldd-inline-dialog; supporting text |
| `accessible-label` | `string` | Accessible name for the dialog (aria-label); falls back to text |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Optional custom content, forwarded to nldd-inline-dialog |
| `actions` | nldd-button elements, forwarded to nldd-inline-dialog |

**Events**

| Event | Beschrijving |
| --- | --- |
| `open` | When the dialog is opened |
| `close` | When the dialog is fully closed |

### `<nldd-progress-bar>`

Exports both NLDDProgressBar and NLDDProgressBarSegmentIndicator. A progress bar that supports a single value (loading-style) or multiple segments (multi-stage progress, or distribution like storage usage). The consumer provides raw values; the component computes percentages from `max`. Two modes: - `progress` (default): segments sum toward `max`; remaining space is empty track. ARIA reads "X% voltooid". - `distribution`: segments fill the bar; ARIA enumerates segments. If the sum of segment values exceeds `max`, segments are normalized proportionally to fit and a warning is logged.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `mode` | `'progress'\|'distribution'` | Semantics for ARIA and visualization (default: 'progress') |
| `max` | `number` | Total value (default: 100) |
| `value` | `number` | Single-segment shorthand (ignored when segment children are present) |
| `color` | `string` | Color for the single-segment shorthand (default: 'accent') |
| `size` | `'sm'\|'md'\|'lg'` | Height of the bar (default: 'md') |
| `text` | `string` | Label above the bar (left) |
| `value-format` | `'percentage'\|'absolute'\|'fraction'` | Format for the displayed value (default: 'percentage') |
| `value-display` | `'inline'\|'tooltip'\|'none'` | Where the value shows: inline in the caption, in a tooltip on the bar, or hidden (default: 'inline') |
| `value-text` | `string` | Full override of the displayed value |
| `accessible-label` | `string` | Full override of aria-valuetext |
| `indeterminate` | `boolean` | Shows a sliding indicator animation (only without segments) |
| `translations` | `object` | Override translation keys; unset keys fall back to Dutch |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Place for nldd-progress-bar-segment-indicator elements |

### `<nldd-progress-bar-segment-indicator>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `number` | Share of the parent's total (default 0; <=0 hides segment) |
| `color` | `string` | Color. Semantic (neutral, accent, success, warning, critical) or a Rijkskleur. Default 'accent'. |
| `name` | `string` | Name for screenreader text (optional) |
| `tooltip-text` | `string` | Override of the auto-generated tooltip text |

### `<nldd-progress-circle>`

Exports both NLDDProgressCircle and NLDDProgressCircleSegmentIndicator. A circular progress indicator that mirrors the API of nldd-progress-bar: single-value or multi-segment, progress or distribution mode, 24 colours, fade transitions between determinate/indeterminate, indeterminate indicator. Visual differences vs the bar: - SVG arcs instead of rectangular bars. - Label below the circle (not above). - No centre text; the consumer can wrap the circle if needed. - One combined tooltip on the whole circle showing all segment info (no per-segment tooltips). - Indeterminate uses a rotating elastic arc (Material-style) instead of the bar's Knight Rider scanner.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `mode` | `'progress'\|'distribution'` | Semantics for ARIA and gap behaviour (default: 'progress') |
| `max` | `number` | Total value (default: 100) |
| `value` | `number` | Single-segment shorthand (ignored when segment children exist) |
| `color` | `string` | Color. Semantic (neutral, accent, success, warning, critical) or a Rijkskleur. Default 'accent'. |
| `size` | `string` | Circle diameter in px. Matches nldd-icon sizes: 16, 20, 24, 28, 32, 40, 44, 48, 56, 64, 80, 96 (default: '28') |
| `text` | `string` | Label below the circle |
| `value-format` | `'percentage'\|'absolute'\|'fraction'` | Format of the displayed value (default: 'percentage') |
| `value-display` | `'inline'\|'tooltip'\|'none'` | Where the value shows: inline below the label, in a tooltip, or hidden (default: 'tooltip') |
| `value-text` | `string` | Full override of the displayed value (inline + tooltip) |
| `accessible-label` | `string` | Full override of aria-valuetext |
| `indeterminate` | `boolean` | Renders the rotating elastic arc animation |
| `translations` | `object` | Override translation keys; unset keys fall back to Dutch |

### `<nldd-progress-circle-segment-indicator>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `value` | `number` | Share of the parent's total (default 0; <=0 hides segment) |
| `color` | `string` | Color (semantic or Rijkskleur). Default 'accent'. |
| `name` | `string` | Optional name used in the combined tooltip + screenreader text |

### `<nldd-status-bar>`

Een smalle, paginabrede statusbalk (24px) met een diepe achtergrondkleur per variant. Gebruik voor persistente systeemtoestand: een storing, gepland onderhoud, een conceptweergave of een lopende opname. De balk toont bewust geen icoon en ondersteunt alleen tekst — de tekst zelf moet de status benoemen ("Storing: …", "Gepland onderhoud …"), zodat de betekenis niet alleen uit kleur volgt (WCAG 1.4.1). Houd de tekst kort: de balk toont één regel en kapt af met ellipsis, zeker op smallere schermen. Bij een lang bericht met veel informatie hoort alleen de kern in de balk; verwijs voor de rest naar een losse pagina of sheet (bijvoorbeeld via `href` of `button`) waar de gebruiker verder kan lezen. De hele balk kan klikbaar zijn: zet `href` (rendert een `<a>`) of `button` (rendert een `<button>`; luister naar het native `click` event). Zonder beide is de balk statisch. Bij interactie verschijnt een chevron als affordance. Maximaal één actie per balk; meerdere acties of links in lopende tekst horen in nldd-banner. role en aria-live worden automatisch gezet op basis van de variant: - critical → role="alert" (impliceert aria-live="assertive"; onderbreekt de screen reader) - overige → role="status" aria-live="polite" Niet overschrijfbaar — is een rustiger component nodig, kies dan een ander. Gebruik `critical` alleen voor een echte noodsituatie: role="alert" onderbreekt de screen reader bij élke wijziging van de inhoud, dus plaats er geen tekst in die regelmatig verandert (zoals een aftellende timer).

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `variant` | `'neutral'\|'accent'\|'success'\|'warning'\|'critical'` | Kleur van de balk (standaard: 'neutral') |
| `text` | `string` | De statustekst (één regel; afgekapt met ellipsis) |
| `href` | `string` | Maakt de hele balk een link (rendert een <a>) |
| `target` | `string` | Link target (bijv. '_blank'); alleen gebruikt bij href |
| `rel` | `string` | Link rel; standaard 'noopener noreferrer' bij target='_blank' |
| `button` | `boolean` | Maakt de hele balk een button; genegeerd als href is gezet |

## lists-and-tables

### `<nldd-cell>`

A generic cell for wrapping arbitrary content in a list item. Controls vertical alignment and sizing without imposing content opinions. `vertical-alignment="center"` (default) stretches the cell to fill the full row height and centers its content within that space. Use `min-height` to set a minimum centered region. For strict top alignment without a minimum height, use `vertical-alignment="top"`.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `width` | `string` | 'full' \| 'fit-content' \| CSS length (e.g. '120px', '10rem'). Default: 'fit-content' |
| `min-width` | `string` | Minimum width as CSS length (e.g. '80px', '5rem') |
| `max-width` | `string` | Maximum width as CSS length (e.g. '200px', '20rem') |
| `min-height` | `string` | Minimum height as CSS length (e.g. '44px', '3rem') |
| `vertical-alignment` | `'top' \| 'center' \| 'bottom'` | Vertical alignment of slotted content (default: 'center') |
| `horizontal-alignment` | `'left' \| 'center' \| 'right'` | Horizontal alignment of slotted content (default: 'left') |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Default slot for any content (buttons, switches, icons, etc.) |

### `<nldd-description-cell>`

A cell component for displaying a title-description pair in lists. `vertical-alignment="center"` (default) stretches the cell to fill the full row height and centers its content within that space. Use `min-height` to set a minimum centered region. For strict top alignment without a minimum height, use `vertical-alignment="top"`.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `width` | `string` | 'full' \| 'fit-content' \| CSS length (e.g. '200px', '20rem'). Default: 'full' |
| `min-width` | `string` | Minimum width as CSS length (e.g. '80px', '5rem') |
| `max-width` | `string` | Maximum width as CSS length (e.g. '300px', '20rem') |
| `min-height` | `string` | Minimum height as CSS length (e.g. '44px', '3rem') |
| `vertical-alignment` | `'top' \| 'center' \| 'bottom'` | Vertical alignment (default: 'center') |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `title` | The label displayed above the description |
| `description` | The description content |

### `<nldd-drag-handle-cell>`

A cell that displays a drag handle for reorderable list items. Always vertically centered and sized to fit the handle. To enable drag-to-reorder, add the `reorderable-only` attribute to this element. This attribute is required for `nldd-list` to detect the drag handle in the composed event path and activate pointer and keyboard drag mode: ```html <nldd-list reorderable> <nldd-list-item> <nldd-drag-handle-cell slot="start" reorderable-only></nldd-drag-handle-cell> <nldd-text-cell text="Item"></nldd-text-cell> </nldd-list-item> </nldd-list> ``` Without `reorderable-only`, pointer and keyboard drag will never trigger.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `string` | Handle size: 'sm' \| 'md' (default: 'md') |

### `<nldd-icon-cell>`

A cell component for displaying icons in lists with configurable alignment and size. Set `icon` to render an `nldd-icon` by name, or slot custom content as an escape hatch for non-standard iconography.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `vertical-alignment` | `string` | Vertical alignment: 'top' \| 'center' \| 'bottom' (default: 'center') |
| `size` | `string` | Size: '16' \| '20' \| '24' \| '32' (default: '24') |
| `color` | `'default' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'critical'` | Color variant of the icon (default: 'default') |
| `icon` | `string` | Icon name (renders `<nldd-icon>`). Takes precedence over the default slot. |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | Fallback for custom icon content when `icon` is not set. |

### `<nldd-list>`

A container for `nldd-list-item` elements. The `type` attribute switches the list's a11y role and behavior: - `list` (default) — `role="list"`, items `role="listitem"`. Reorderable allowed. Items may individually be buttons or links; the list itself has no special keyboard semantics. - `navigation` — host `role="navigation"`, items with `selected` get `aria-current="page"` on their inner `<a>` or `<button>`. - `listbox` — an accessible, filterable listbox (combobox pattern). The list renders its OWN search input (`role="combobox"`) pinned above the options; `.list__items` becomes `role="listbox"` and items become `role="option"`. Focus stays in the input, the active option moves via `aria-activedescendant`, and filtering is consumer-managed via the `input` event (toggle `[hidden]` on items). See "Listbox" below. Selection state is consumer-managed: the list never mutates `selected` itself. In `type="listbox"` the list owns a native `<input role="combobox">` (mirroring how `nldd-combo-box` wires an input to a slotted listbox). Keyboard, handled on the input so focus never leaves it: - ArrowDown / ArrowUp — move the active option among the VISIBLE (non-`[hidden]`) options (wrap around). - Home / End — first / last visible option. - Enter — activate the active option by triggering its inner action (a link navigates, a button fires the consumer's handler). Selection stays consumer-managed. - Escape — clear the search value (and refire `input`). On every active change the input's `aria-activedescendant` is set to the active option's id and the option is scrolled into view. The active option (`_highlighted` on the item, a highlight) is distinct from `selected`. Filtering is the consumer's job: listen to `input` (`{ detail: { value } }`) and toggle `[hidden]` on items; after the visible set changes the list resets the active option to the first visible one. `reorderable` and `arrow-navigation` are ignored in listbox mode (listbox has its own keyboard). On reorder (type="list" + reorderable), the list dispatches `nldd-reorder` with `fromIndex` / `toIndex` and expects the consumer to mutate the DOM (or their data model that renders the DOM). Focus is restored to the moved item's drag handle via a single `requestAnimationFrame` — this assumes the consumer reorders **synchronously** in the event handler. Async renderers (React, Vue, …) that update the DOM on a later tick will miss the focus restore and should manage focus themselves after their render commits. view toggles). Available for every type; collapses when empty. search field (e.g. a filter or options button). Listbox only; collapses when empty. to `nldd-inline-dialog` with `empty-text` / `empty-supporting-text` (falling back to Dutch i18n "Geen items"). Slot content overrides the default dialog entirely. In `type="listbox"` it is suppressed while the search field is empty (no query yet), so the consumer can show just the search field or its own hint outside the list. `[hidden]` on items to filter.

### `<nldd-list-item>`

A row within an `nldd-list`, providing layout for start, main and end areas. Renders as a link when `href` is set, as a button when `button` is set, or as a plain container otherwise. When it renders as a link, `target` and `rel` are forwarded to the inner `<a>` (e.g. `target="_blank" rel="noopener noreferrer"`). With `target="_blank"` the item also injects a visually hidden "opens in new tab" announcement for assistive technology (WCAG 2.1 SC 3.2.2). The item synchronises its ARIA with its parent `nldd-list`'s `type`: - `list` parent → `role="listitem"` - `navigation` parent → `role="listitem"` + `aria-current="page"` on the inner `<a>` / `<button>` when `selected` - `listbox` parent → `role="option"` + `aria-selected` reflecting `selected`. The list points its search input's `aria-activedescendant` at the active option via `_highlighted` (separate from `selected`).

### `<nldd-spacer-cell>`

A cell component that provides fixed horizontal spacing within list items.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `string` | Spacer size in pixels: '2' \| '4' \| '6' \| '8' \| '10' \| '12' \| '16' \| '20' \| '24' \| '28' \| '32' \| '40' \| '44' \| '48' \| '56' \| '64' \| '80' \| '96' (default: '16') |

### `<nldd-table>`

Exports both NLDDTable and NLDDTableRow. A data table presented as a boxed surface (rounded corners, an inset border ring, a base or tinted fill) that aligns content into shared columns using a CSS grid + subgrid. Row dividers run full-bleed to the edges; the inline padding lives on the rows, so it insets the cell content but not the dividers. Column widths are defined ONCE on the table via the `columns` attribute (a CSS grid track list), like an HTML `<colgroup>`. Rows are `<nldd-table-row>` elements whose children are the existing `nldd-cell` family — every row uses `grid-template-columns: subgrid`, so all rows snap to the same columns. Header: put one `<nldd-table-row slot="header">` in the `header` slot. Its cells become column headers (role="columnheader"). Responsive: two complementary strategies. (1) Give columns a minimum width (e.g. `minmax(160px,1fr)`) — the table is its own scroll container, so it scrolls horizontally when too narrow (no wrapper needed). (2) Drop columns at breakpoints: provide `sm-columns`/`md-columns`/ `lg-columns` (shorter track lists) and hide the dropped columns' cells with `hide-below`/`hide-above` at the matching breakpoint. The table picks the track list for its own width via the standard sm/md/lg breakpoints. Selection and sorting are intentionally NOT built in: add a column with an `nldd-cell` + `nldd-checkbox` for selection, and drive sorting from an external control (e.g. a dropdown).

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `background` | `'base'\|'tinted'` | Surface fill of the box (default 'base') |
| `columns` | `string` | CSS grid track list defining the columns once, e.g. "minmax(200px,1fr) 120px 80px" |
| `sm-columns` | `string` | Track list when the table is sm-wide (≤640px); falls back to `columns` |
| `md-columns` | `string` | Track list when the table is md-wide (641–1007px); falls back to `columns` |
| `lg-columns` | `string` | Track list when the table is lg-wide (≥1008px); falls back to `columns` |
| `accessible-label` | `string` | Accessible name for the table. Strongly recommended — role="table" needs a name. A missing label is DEV-warned and a generic fallback name is used. |
| `selectable` | `boolean` | Opt into row selection: body rows expose aria-selected (true/false). Without it, rows omit aria-selected so a non-selectable table isn't announced as selectable. |
| `empty-text` | `string` | Text for the default empty-state dialog (falls back to the Dutch i18n default). Ignored when `[slot=empty]` is filled |
| `empty-supporting-text` | `string` | Supporting text for the default empty-state dialog. Ignored when `[slot=empty]` is filled |
| `translations` | `object` | Override translation keys; unset keys fall back to Dutch |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `header` | One `<nldd-table-row slot="header">` carrying the column headers |
| _(default)_ | The body rows (`<nldd-table-row>`) |
| `empty` | Shown when there are no visible body rows (the header is hidden too). Defaults to `nldd-inline-dialog` with `empty-text` / `empty-supporting-text` |

### `<nldd-table-row>`

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `selected` | `boolean` | Highlights the row (same treatment as nldd-list-item[selected]) |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| _(default)_ | The row's cells (`nldd-cell` and variants), one per column |

### `<nldd-text-cell>`

A cell component for displaying text content in lists with configurable alignment, size and color. This is the most fundamental list cell component. `vertical-alignment="center"` (default) stretches the cell to fill the full row height and centers its content within that space. Use `min-height` to set a minimum centered region. For strict top alignment without a minimum height, use `vertical-alignment="top"`. Each text region (overline, main text, supporting text) accepts either a string attribute or slotted DOM content. The slot is the source of truth: if the consumer provides slotted content, it replaces the attribute-based render for that region. Use slots when you need inline elements like `<nldd-tag>`, `<a>` or `<nldd-icon>` mixed with text. Note that `query` highlighting and `**bold**` parsing only apply to the attribute path — slotted content is rendered as-is.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `string` | Cell size: 'sm' \| 'md' (default: 'md') |
| `color` | `string` | Text color variant: 'default' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'critical' (default: 'default'). All non-default/-secondary variants apply to all three text fields so the cell reads as a coherent state. |
| `width` | `string` | 'full' \| 'fit-content' \| CSS length (e.g. '200px', '20rem'). Default: 'full' |
| `min-width` | `string` | Minimum width as CSS length (e.g. '80px', '5rem') |
| `max-width` | `string` | Maximum width as CSS length (e.g. '200px', '20rem') |
| `min-height` | `string` | Minimum height as CSS length (e.g. '44px', '3rem') |
| `horizontal-alignment` | `string` | Horizontal alignment: 'left' \| 'center' \| 'right' (default: 'left') |
| `vertical-alignment` | `string` | Vertical alignment: 'top' \| 'center' \| 'bottom' (default: 'center') |
| `text` | `string` | Main text content. Supports **bold** syntax for inline bold segments. Falls back to default slot. |
| `overline` | `string` | Optional overline text displayed above the main content. Supports **bold**. Falls back to `overline` slot. |
| `supporting-text` | `string` | Optional supporting text displayed below the main content. Supports **bold**. Falls back to `supporting-text` slot. |
| `query` | `string` | Query substring to bold-highlight across text fields. Empty = no marking. |
| `query-mark-mode` | `string` | 'match' \| 'predictive' (default: 'predictive') |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `overline` | Rich content for the overline region. Overrides the `overline` attribute when content is assigned. |
| _(default)_ | (default) Rich content for the main text region. Overrides the `text` attribute when content is assigned. |
| `supporting-text` | Rich content for the supporting text region. Overrides the `supporting-text` attribute when content is assigned. |

### `<nldd-timeline-track-cell>`

A cell component for displaying timeline track indicators in lists. Shows a vertical line with a dot indicating timeline position and state. The line extends into the surrounding list-item's block padding via the `--context-list-item-padding-block` cascade so consecutive steps connect without gaps.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `step` | `'past' \| 'future' \| 'none'` | Timeline step state (default: 'past') |
| `child` | `'first' \| 'between' \| 'last'` | Position in timeline (default: 'between') |

### `<nldd-title-cell>`

A cell component for displaying a title with optional overline and subtitle in lists. `vertical-alignment="center"` (default) stretches the cell to fill the full row height and centers its content within that space. Use `min-height` to set a minimum centered region. For strict top alignment without a minimum height, use `vertical-alignment="top"`. Each text region (overline, title, supporting text) accepts either a string attribute or slotted DOM content. The slot is the source of truth: if the consumer provides slotted content, it replaces the attribute-based render for that region. Use slots when you need inline elements like `<nldd-tag>`, `<nldd-icon>` or other components mixed with text. Note that `query` highlighting and `**bold**` parsing only apply to the attribute path — slotted content is rendered as-is.

**Attributes**

| Attribuut | Type | Beschrijving |
| --- | --- | --- |
| `size` | `1\|2\|3\|4\|5\|6` | Visual size of the title (default: 5) |
| `color` | `'default' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'critical'` | Text color variant (default: 'default'). `secondary` demotes the title to match the muted overline/supporting-text. `accent`, `success`, `warning` and `critical` tint all three regions so the cell reads as a coherent state. |
| `width` | `string` | 'full' \| 'fit-content' \| CSS length (e.g. '200px', '20rem'). Default: 'full' |
| `min-width` | `string` | Minimum width as CSS length (e.g. '80px', '5rem') |
| `max-width` | `string` | Maximum width as CSS length (e.g. '300px', '20rem') |
| `min-height` | `string` | Minimum height as CSS length (e.g. '44px', '3rem') |
| `horizontal-alignment` | `'left' \| 'center' \| 'right'` | Horizontal alignment (default: 'left') |
| `vertical-alignment` | `'top' \| 'center' \| 'bottom'` | Vertical alignment (default: 'center') |
| `text` | `string` | Title text content. Supports **bold** syntax for inline bold segments. Falls back to default slot. |
| `overline` | `string` | Optional overline text displayed above the title. Supports **bold**. Falls back to `overline` slot. |
| `supporting-text` | `string` | Optional supporting text displayed below the title. Supports **bold**. Falls back to `supporting-text` slot. |
| `heading-level` | `number` | Heading level for the title element: 1–6 (default: none, renders a <p>) |
| `query` | `string` | Query substring to bold-highlight across text fields. Empty = no marking. |
| `query-mark-mode` | `string` | 'match' \| 'predictive' (default: 'predictive') |

**Slots**

| Slot | Beschrijving |
| --- | --- |
| `overline` | Rich content for the overline region. Overrides the `overline` attribute when content is assigned. |
| _(default)_ | (default) Rich content for the title. Overrides the `text` attribute when content is assigned. |
| `supporting-text` | Rich content for the supporting text region. Overrides the `supporting-text` attribute when content is assigned. |

## Iconen

Geldige `name`-waarden voor `<nldd-icon>` (235 iconen + 200 aliassen). Verzin geen naam; kies er een uit deze set.

**Iconen**

`accessibility`, `apartment-building`, `app`, `arrow-2-counter-clockwise`, `arrow-down`, `arrow-down-in-bucket`, `arrow-left`, `arrow-left-right`, `arrow-left-to-line`, `arrow-right`, `arrow-right-in-bucket`, `arrow-right-out-bucket`, `arrow-right-to-line`, `arrow-u-turn-backward`, `arrow-u-turn-forward`, `arrow-up`, `arrow-up-arrow-down`, `arrow-up-out-bucket`, `at`, `bell`, `binoculars`, `blocks-9`, `bold`, `book`, `book-batch-play`, `bookmark`, `bookmark-filled`, `books-vertical`, `brackets-ellipsis`, `brick-wall`, `bullet-list`, `business-suitcase`, `calendar-event`, `caret-down`, `caret-down-extra-small`, `caret-down-small`, `caret-left`, `caret-left-extra-small`, `caret-left-small`, `caret-right`, `caret-right-extra-small`, `caret-right-small`, `caret-up`, `caret-up-extra-small`, `caret-up-small`, `centralized-structure`, `certificate`, `chart-x-y-axis-line`, `check-circle-filled`, `check-list`, `check-mark`, `check-mark-circle`, `check-mark-extra-small`, `check-mark-small`, `chevron-double-left`, `chevron-double-left-extra-small`, `chevron-double-left-small`, `chevron-double-right`, `chevron-double-right-extra-small`, `chevron-double-right-small`, `chevron-down`, `chevron-down-extra-small`, `chevron-down-small`, `chevron-left`, `chevron-left-chevron-right`, `chevron-left-extra-small`, `chevron-left-forward-slash-chevron-right`, `chevron-left-small`, `chevron-left-to-line`, `chevron-left-to-line-extra-small`, `chevron-left-to-line-small`, `chevron-right`, `chevron-right-extra-small`, `chevron-right-small`, `chevron-right-to-line`, `chevron-right-to-line-extra-small`, `chevron-right-to-line-small`, `chevron-up`, `chevron-up-chevron-down`, `chevron-up-extra-small`, `chevron-up-small`, `circle-dashed`, `circle-filled`, `circle-filled-extra-small`, `circle-filled-small`, `clipboard`, `clipboard-square`, `clock`, `clock-arrow-clockwise`, `clock-arrow-counter-clockwise`, `cloud`, `cloud-arrow-down`, `cloud-arrow-up`, `cylinder-2-big-small-split`, `cylinder-split`, `cylinder-split-badge-lock`, `cylinder-split-slash`, `desk-with-screen`, `diamond`, `dismiss`, `dismiss-circle`, `dismiss-circle-filled`, `dismiss-extra-small`, `dismiss-small`, `ellipsis`, `envelope`, `euro-sign`, `exclamation-circle`, `exclamation-circle-filled`, `exclamation-triangle`, `exclamation-triangle-filled`, `eye`, `eye-slash`, `eyeglasses`, `face-frowning`, `face-smiling`, `face-smiling-badge-plus`, `file`, `file-box`, `file-text`, `file-text-batch-check-mark`, `file-text-batch-check-plus`, `file-text-pencil`, `file-text-stack`, `flag`, `flag-filled`, `folder`, `folder-stack`, `foundation`, `gear`, `globe`, `globe-rack-server`, `hand`, `handshake`, `heading-1`, `heading-2`, `heading-3`, `heading-4`, `heading-5`, `heading-6`, `heart`, `heart-filled`, `highlighter`, `house`, `house-and-appartment-building`, `inbox`, `indent-decrease`, `indent-increase`, `info-circle`, `info-circle-filled`, `italic`, `key`, `leaf`, `lifebuoy`, `lightbulb`, `link`, `list`, `list-arrow-down`, `list-arrow-up`, `list-decreasing-lines`, `lock-closed`, `lock-open`, `magnifier`, `markdown-rectangle`, `message-rectangle-text`, `minus`, `minus-extra-small`, `minus-small`, `moon`, `network-structure`, `numbered-list`, `paper-plane`, `paperclip`, `paragraph-sign`, `parking-sign-square`, `pencil`, `pencil-on-square`, `pencil-ruler`, `person`, `person-2`, `person-badge-gear`, `person-circle`, `person-circle-badge-plus`, `photo`, `photo-slash`, `pipeline-corner-2`, `pipeline-machine-gear`, `pipeline-valve`, `plus`, `plus-small`, `point-bottom-left-to-point-top-right-s-curve-path`, `puzzle-piece`, `puzzle-piece-filled`, `question-mark-circle`, `radar`, `rectangle`, `rectangle-chevron-left-forward-slash-chevron-right`, `rectangle-split-2x1`, `rectangle-split-2x3`, `rectangle-split-2x3-badge-arrow-down`, `rectangle-split-3x1`, `rectangle-stack`, `scissor`, `score-meter`, `seal-check-mark`, `shield`, `shield-check-mark`, `shield-lock`, `ship-wheel`, `shopping-cart`, `sidebar-left`, `sidebar-right`, `slash-circle`, `sparkles`, `square-and-arrow-down`, `square-arrow-right-top`, `square-arrow-up`, `square-grid-3x3`, `square-on-square`, `square-plus-on-square`, `stack-code`, `stack-text`, `star`, `star-filled`, `starburst-filled`, `strikethrough`, `sun`, `tag`, `terminal`, `text-quote`, `timer`, `trash`, `tree-structure`, `underlined`, `wheat`

**Aliassen** (verwijzen naar een icoon hierboven)

`a11y`, `account`, `add`, `add-emoji`, `add-small`, `ai`, `alarm`, `alert`, `analytics`, `annotation`, `apps`, `archive`, `attach`, `attachment`, `back`, `backlog`, `backup-in-cloud`, `blocked`, `blockquote`, `bookmarked`, `books`, `broken-image`, `building`, `building-blocks`, `calendar`, `cart`, `category`, `centralized-network`, `certified`, `chart-line`, `checked`, `checked-extra-small`, `checked-small`, `checklist`, `cli`, `code`, `code-block`, `coins`, `columns-2`, `columns-3`, `comment`, `console`, `copy`, `countdown`, `cut`, `dark-mode`, `database`, `database-disabled`, `database-unavailable`, `day`, `delete`, `deploy`, `design`, `diploma`, `directories`, `directory`, `discover`, `dns`, `document`, `documents`, `download`, `download-from-cloud`, `download-table`, `duplicate`, `edit`, `email`, `embed`, `error`, `event`, `exit`, `explore`, `export`, `extension`, `external-link`, `favorite`, `filter`, `flagged`, `forbidden`, `forward`, `frowning`, `future`, `gem`, `global-settings`, `graph`, `group`, `guide`, `happy`, `harvest`, `help`, `hidden`, `hide`, `hierarchy`, `history`, `home`, `hyperlink`, `icon-placeholder`, `idea`, `image`, `import`, `indent`, `info`, `information`, `invalid`, `k8s`, `kubernetes`, `label`, `languages`, `license`, `light-mode`, `lock`, `locked`, `login`, `logout`, `love`, `magic`, `mail`, `markdown`, `menu`, `module`, `monitoring`, `more`, `network`, `new`, `new-account`, `new-text-document`, `night`, `notification`, `notifications`, `now`, `office`, `open-new-page`, `outdent`, `paragraph`, `parking`, `paste`, `path`, `pipeline`, `pipeline-runner`, `plugin`, `privacy`, `profile`, `promotion`, `protection`, `quality`, `question`, `rated`, `rating`, `read`, `reading-list`, `redo`, `refresh`, `reload`, `remove`, `remove-extra-small`, `remove-small`, `sad`, `save`, `search`, `secure`, `security`, `send`, `settings`, `share`, `show`, `sitemap`, `smiling`, `sort`, `sort-ascending`, `sort-descending`, `stack`, `success`, `support`, `sustainability`, `sync`, `table`, `table-cells`, `tasks`, `team`, `text-document`, `text-documents`, `time`, `todos`, `traject`, `undo`, `unlocked`, `unsecure`, `upload`, `upload-to-cloud`, `url`, `user`, `user-admin`, `user-settings`, `users`, `valid`, `verified`, `visible`, `warning`, `work`, `workplace`, `write`
