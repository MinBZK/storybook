---
name: rr-component-reference
description: Complete API reference for all 60+ RegelRecht Design System components — attributes, slots, events, CSS parts, and override hooks
user-invocable: true
argument-hint: [component-name]
---

# RegelRecht Component Reference

Complete API reference for `@minbzk/storybook`. Use `/rr-component-reference` to see all components, or `/rr-component-reference button` to look up a specific one.

**Filter:** $ARGUMENTS

**Live documentation:** https://minbzk.github.io/storybook/

---

## Actions

### rr-button

Primary interactive element.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | string | 'neutral-tinted' | `accent-filled | accent-outlined | accent-transparent | neutral-tinted | neutral-transparent | danger-tinted | primary | secondary | destructive` |
| `size` | string | 'md' | `xs | sm | md` |
| `disabled` | boolean | false | Disabled state |
| `type` | string | 'button' | `button | submit | reset` |
| `full-width` | boolean | false | Stretch to container width |
| `is-expandable` | boolean | false | Show chevron (for menu triggers) |
| `popovertarget` | string | '' | ID of popover to toggle |
| `accessible-label` | string | '' | aria-label override |

**Slots:** default (text + icons). Automatically detects `<rr-icon>` children for leading/trailing icon positioning.
**Events:** `click` (native, not fired when disabled)

```html
<rr-button variant="accent-filled" size="md">
  <rr-icon name="plus"></rr-icon>
  Add Item
</rr-button>
```

### rr-icon-button

Icon-only button. **Must have** `accessible-label` for screen readers.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | string | 'neutral-tinted' | Same as rr-button |
| `size` | string | 'md' | `xs | sm | md` |
| `disabled` | boolean | false | Disabled state |
| `type` | string | 'button' | `button | submit | reset` |
| `is-expandable` | boolean | false | Show chevron |
| `popovertarget` | string | '' | Popover ID |

**Slots:** default (icon + optional text label)

```html
<rr-icon-button accessible-label="Delete" variant="danger-tinted">
  <rr-icon name="trash"></rr-icon>
</rr-icon-button>
```

### rr-split-button

Combined action button with dropdown arrow.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | string | 'neutral-tinted' | Button variant |
| `size` | string | 'md' | `sm | md` |
| `disabled` | boolean | false | Disabled state |

**Slots:** default (label text and icons)
**Events:** `action-click` (main button), `menu-click` (dropdown arrow)

### rr-button-group

Groups up to 3 related buttons vertically or horizontally.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | 'md' | Button size |
| `flow` | string | 'vertical' | `vertical | horizontal` |

**Slots:** default (max 3 `rr-button` elements)
**CSS Parts:** `group`

### rr-button-bar

Connected row of buttons (toolbar style).

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | 'md' | Button size |
| `variant` | string | 'neutral-tinted' | Variant for all buttons |
| `disabled` | boolean | false | Disable all |

**Slots:** default (`rr-button`, `rr-icon-button`, `rr-button-bar-divider`)
**CSS Parts:** `bar`

### rr-toolbar

Horizontal toolbar with overflow menu support.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | 'md' | `sm | md` |
| `show-item-labels` | boolean | false | Show labels under items |
| `label` | string | '' | Accessible label (required) |

**Slots:** default (`rr-toolbar-start-area`, `rr-toolbar-center-area`, `rr-toolbar-end-area`, `rr-toolbar-overflow-area`)
**Override hooks:** `--rr-toolbar-overflow-button-width`, `--rr-toolbar-start-width`, `--rr-toolbar-center-width`, `--rr-toolbar-end-width`, `--rr-toolbar-width`

**Helper elements:** `rr-toolbar-item` (wraps tools, `label` attribute), `rr-toolbar-title-group`

---

## Content

### rr-icon

SVG icon from the bundled icon set.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | string | 'circle-dashed' | Icon name |

```html
<rr-icon name="search"></rr-icon>
<rr-icon name="chevron-down"></rr-icon>
```

### rr-rich-text

Styled container for rich text / HTML content.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `spacing` | string | 'snug' | Line spacing |

**Slots:** default (HTML content)
**Note:** No shadow DOM — styles apply to light DOM children.

---

## Forms

### rr-form-field

Wraps inputs with label, help text, and error messages. See `/rr-form-patterns` for detailed usage.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | string | '' | Label text |
| `label-alignment` | string | 'top' | `top | left | right` |
| `supporting-label` | string | '' | Text below label |
| `optional` | boolean | false | Show "Optioneel" badge |
| `optional-label` | string | 'Optioneel' | Custom optional text |

**Slots:** default (input), auto-slots for `rr-form-field-help-text` and `rr-form-field-error-text`

### rr-form-field-help-text

Help text that auto-slots into `rr-form-field`. Gets auto-generated ID for `aria-describedby`.

**Slots:** default (help text, may contain links)

### rr-form-field-error-text

Error message that auto-slots into `rr-form-field`. Visibility controlled by input's `invalid` + `error-message` attributes.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | string | — | Referenced by input's `error-message` attribute |

**Slots:** default (error message text)

---

## Inputs

### rr-text-field

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | string | '' | Current value |
| `placeholder` | string | '' | Placeholder text |
| `size` | string | 'md' | `sm | md` |
| `type` | string | 'text' | `text | email | tel | url` |
| `name` | string | '' | Form name |
| `disabled` | boolean | false | Disabled |
| `readonly` | boolean | false | Read-only |
| `required` | boolean | false | Required |
| `invalid` | boolean | false | Error state |
| `valid` | boolean | false | Valid state |
| `autocomplete` | string | '' | Browser hint |
| `accessible-label` | string | '' | aria-label |
| `error-message-ids` | string | '' | Error element IDs |
| `input-id` | string | '' | Custom input ID |

**Events:** `input` (detail: {value}), `change` (detail: {value})
**CSS Parts:** `container`, `input`

### rr-password-field

Same as text-field plus:

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `masked` | boolean | true | Password hidden |
| `show-label` | string | 'Toon' | Show button text |
| `hide-label` | string | 'Verberg' | Hide button text |

**Events:** `input`, `change`
**CSS Parts:** `field`, `input`, `toggle`

### rr-search-field

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | string | '' | Current value |
| `placeholder` | string | 'Zoeken' | Placeholder |
| `size` | string | 'md' | `sm | md` |
| `disabled` | boolean | false | Disabled |

**Events:** `input`, `change`, `search` (all with detail: {value})
**CSS Parts:** `container`, `input`, `icon`

### rr-number-field

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | number | 0 | Current value |
| `min` | number | -Infinity | Minimum |
| `max` | number | Infinity | Maximum |
| `step` | number | 1 | Increment |
| `disabled` | boolean | false | Disabled |

**Events:** `input`, `change` (detail: {value})
**CSS Parts:** `container`, `input`, `decrease-button`, `increase-button`

### rr-drop-down-field

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | string | '' | Selected value |
| `placeholder` | string | '' | Placeholder |
| `size` | string | 'md' | `sm | md` |
| `disabled` | boolean | false | Disabled |

**Slots:** default (option elements)
**Events:** `change` (detail: {value})
**CSS Parts:** `container`, `select`, `icon`

### rr-combo-box-field

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | string | '' | Current value |
| `placeholder` | string | 'Selecteer een optie' | Placeholder |
| `disabled` | boolean | false | Disabled |

**Events:** `input`, `change` (detail: {value}), `picker-click`
**CSS Parts:** `container`, `input`, `button`

### rr-checkbox

Standalone checkbox. Use `accessible-label` for screen readers.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `checked` | boolean | false | Checked state |
| `indeterminate` | boolean | false | Mixed/partial state |
| `disabled` | boolean | false | Disabled |
| `value` | string | 'on' | Form value |
| `name` | string | '' | Form name |
| `accessible-label` | string | '' | aria-label |

**Events:** `change` (detail: {checked, value})

### rr-checkbox-field

Checkbox with built-in label.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `checked` | boolean | false | Checked |
| `indeterminate` | boolean | false | Mixed |
| `disabled` | boolean | false | Disabled |
| `value` | string | 'on' | Form value |
| `name` | string | '' | Form name |

**Slots:** default (label text)
**Events:** `change` (detail: {checked, value})
**CSS Parts:** `container`, `checkbox`, `label`

### rr-radio-button

Standalone radio. Must be used within `rr-radio-button-group`.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `checked` | boolean | false | Selected |
| `disabled` | boolean | false | Disabled |
| `required` | boolean | false | Required |
| `value` | string | '' | Form value |
| `name` | string | '' | Form name |
| `accessible-label` | string | '' | aria-label |

**Slots:** default (label text)
**Events:** `change` (detail: {checked, value, name})

### rr-radio-button-field

Radio with built-in label (preferred over standalone).

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `checked` | boolean | false | Selected |
| `disabled` | boolean | false | Disabled |
| `value` | string | '' | Form value |
| `name` | string | '' | Form name |

**Slots:** default (label text)
**Events:** `change` (detail: {checked, value})

### rr-radio-button-group

Container for radio buttons. Manages mutual exclusion.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | string | '' | Form name for all radios |
| `disabled` | boolean | false | Disable all |
| `required` | boolean | false | Require selection |
| `accessible-labelledby` | string | '' | ID of labelling element |

**Slots:** default (`rr-radio-button-field` elements)
**Events:** `change` (bubbles from selected radio)

### rr-switch

Standalone toggle switch.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `checked` | boolean | false | On/off state |
| `disabled` | boolean | false | Disabled |
| `size` | string | 'md' | `sm | md` |

**Events:** `change` (detail: {checked})
**CSS Parts:** `switch`, `thumb`, `check`
**Override hooks:** `--rr-switch-background-color`, `--rr-switch-thumb-color`

### rr-switch-field

Switch with built-in label.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `checked` | boolean | false | On/off |
| `disabled` | boolean | false | Disabled |
| `value` | string | 'on' | Form value |
| `name` | string | '' | Form name |

**Slots:** default (label text)
**Events:** `change` (detail: {checked, value})
**CSS Parts:** `container`, `switch`, `label`

### rr-toggle-button

Button that toggles between selected/deselected states.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `selected` | boolean | false | Toggle state |
| `disabled` | boolean | false | Disabled |
| `size` | string | 'md' | `xs | sm | md` |

**Slots:** default (label), `icon`
**Events:** `toggle` (detail: {selected})
**CSS Parts:** `button`, `content`
**Override hooks:** `--rr-toggle-button-background-color`, `--rr-toggle-button-content-color`

### rr-segmented-control

Mutually exclusive segmented selector.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | string | '' | Selected value |
| `size` | string | 'md' | `xs | sm | md` |
| `disabled` | boolean | false | Disable all |
| `full-width` | boolean | false | Stretch to fill |

**Slots:** default (`rr-segmented-control-item` elements with `value` attribute)
**Events:** `change` (detail: {value})
**CSS Parts:** `container`

### rr-stepper

Numeric stepper with increment/decrement buttons.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | number | 0 | Current value |
| `min` | number | 0 | Minimum |
| `max` | number | 100 | Maximum |
| `step` | number | 1 | Increment |
| `disabled` | boolean | false | Disabled |
| `size` | string | 'md' | `sm | md` |

**Events:** `change` (detail: {value})
**CSS Parts:** `stepper`, `button`, `divider`

### rr-token

Dismissible or picker-style tag/chip.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `control` | string | 'none' | `none | dismiss | picker` |
| `open` | boolean | false | Picker open state |
| `disabled` | boolean | false | Disabled |

**Slots:** default (token text)
**Events:** `dismiss`, `toggle` (detail: {open})
**CSS Parts:** `token`, `text`, `icon`

---

## Layout

### rr-page

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `sticky-header` | boolean | false | Fixed header |
| `sticky-footer` | boolean | false | Fixed footer |
| `tinted` | boolean | false | Gray background |

**Slots:** `header`, default, `footer`

### rr-box

No attributes. Tinted rounded container.

### rr-container

**Padding attributes:** `padding`, `padding-inline`, `padding-block`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`
**Values:** `none | md | 2 | 4 | 6 | 8...96`

### rr-spacer

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | '16' | `flexible | md | 2-96` |
| `direction` | string | 'both' | `horizontal | vertical | both` |

### rr-divider

No attributes. Visual separator line.

### rr-show

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `above` | string | — | Show at breakpoint+ |
| `below` | string | — | Show up to breakpoint |
| `only` | string | — | Show only at breakpoint |
| `query` | string | 'container' | `viewport | container` |

### rr-title-bar

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `level` | number | 1 | Heading level (1-6) |
| `size` | number | 3 | Visual size (1-6) |
| `overline` | string | '' | Text above title |
| `subtitle` | string | '' | Text below title |

**Slots:** default (title), `actions`

### rr-collection

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `layout` | string | 'grid' | `grid | list | horizontal-scroll` |
| `show-load-more` | boolean | false | Show load more button |
| `load-more-label` | string | 'Toon meer' | Button text |
| `max-items` | number | 24 | Items per page |
| `lazy-load` | boolean | false | Auto-load on scroll |

**Slots:** default, `footer`
**Events:** `load-more`

### Split Views

**rr-horizontal-split-view** — `show-sidebar` (bool), `show-inspector` (bool). Slots: `sidebar`, default, `inspector`

**rr-vertical-split-view** — `show-header` (bool), `show-footer` (bool). Slots: `header`, default, `footer`

**rr-side-by-side-split-view** — `panes` (number, default 2). Slots: `pane-1`, `pane-2`, etc.

**rr-stacked-split-view** — `panes` (number, default 2). Slots: `pane-1`, `pane-2`, etc.

### Sections

**rr-simple-section** — Slots: `header`, default, `footer`

**rr-full-bleed-section** — Slots: `header`, default, `footer`

**rr-one-third-two-thirds-section** — Slots: `header`, `left` (1/3), default (2/3), `footer`

**rr-two-thirds-one-third-section** — Slots: `header`, default (2/3), `right` (1/3), `footer`

**rr-one-half-one-half-section** — Slots: `header`, `left`, `right`, `footer`

---

## Lists

### rr-list

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | string | 'simple' | List style |

**Slots:** default (`rr-list-item` elements)
**CSS Parts:** `list`, `main`

### rr-list-item

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | 'md' | Item size |
| `selected` | boolean | false | Selected state |

**Slots:** default (cells), `start`, `end`
**CSS Parts:** `item`, `start-area`, `main-area`, `end-area`, `indicator`

### Cell Types

All cells have `vertical-alignment` attribute (`center` default).

| Cell | Purpose | Extra Attributes |
|------|---------|-----------------|
| `rr-text-cell` | Text with overline/supporting text | `size`, `color`, `width`, `horizontal-alignment`, `selected`. Slots: `overline`, `text`/default, `supporting-text` |
| `rr-icon-cell` | Icon in a cell | `size`, `color`, `selected` |
| `rr-title-cell` | Title text | `size`, `color`, `horizontal-alignment` |
| `rr-label-cell` | Label text | `color`, `horizontal-alignment` |
| `rr-description-cell` | Label + description | `label` attribute |
| `rr-button-cell` | Button in a cell | — |
| `rr-custom-cell` | Any custom content | — |
| `rr-spacer-cell` | Spacing between cells | `size` |
| `rr-stepper-cell` | Stepper in a cell | — |
| `rr-text-field-cell` | Text field in a cell | `feedback-text` |
| `rr-drop-down-field-cell` | Dropdown in a cell | — |
| `rr-timeline-track-cell` | Timeline indicator | `step` (`past | current | future`), `child` (`first | between | last`) |

```html
<rr-list>
  <rr-list-item>
    <rr-icon-cell slot="start"><rr-icon name="file"></rr-icon></rr-icon-cell>
    <rr-text-cell>
      <span slot="overline">Category</span>
      Document Title
      <span slot="supporting-text">Last modified yesterday</span>
    </rr-text-cell>
    <rr-button-cell slot="end">
      <rr-icon-button accessible-label="More"><rr-icon name="ellipsis"></rr-icon></rr-icon-button>
    </rr-button-cell>
  </rr-list-item>
</rr-list>
```

---

## Navigation

### rr-top-navigation-bar

See `/rr-navigation` for full API. Key attributes: `title`, `container`, `skip-link-target`.

### rr-top-title-bar

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | 'Title' | Title text |
| `container` | string | 'sm' | `sm | md | lg` |
| `compact` | boolean | false | Compact mode |
| `dismiss-label` | string | 'Sluit' | Close button text |

**Slots:** `toolbar-start`, `toolbar-end`
**Events:** `dismiss`
**Override hooks:** `--rr-top-title-bar-title-color`

### rr-tab-bar

**Slots:** default (`rr-tab-bar-item` elements)
**Events:** `tabchange`
**CSS Parts:** `container`, `items`

### rr-tab-bar-item

| Attribute | Type | Default |
|-----------|------|---------|
| `selected` | boolean | false |
| `disabled` | boolean | false |

**Slots:** default (label text)
**Events:** `select`

### rr-document-tab-bar

**Slots:** default (`rr-document-tab-bar-item`), `end`
**Events:** `tabchange`, `tabdismiss`
**CSS Parts:** `container`, `items`, `divider`, `end`

### rr-pagination

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `current-page` | number | 1 | Active page (1-based) |
| `total-pages` | number | 1 | Total pages |
| `disabled` | boolean | false | Disable all |

**Events:** `page-change` (detail: {page})
**CSS Parts:** `container`, `button`, `button-active`

---

## Menus

### rr-menu

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `anchor` | string | '' | Trigger element ID |
| `placement` | string | 'bottom-start' | Popover position |

**Slots:** default (`rr-menu-item`, `rr-menu-divider`)
**Events:** `toggle` (popover), `select` (from items)

### rr-menu-item

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | '' | Label |
| `details` | string | '' | Secondary text |
| `type` | string | 'button' | Item type |
| `selected` | boolean | false | Selected |
| `disabled` | boolean | false | Disabled |

**Events:** `select`

### rr-menu-divider

No attributes. Visual separator in menus.

---

## Overlays

### rr-tooltip

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `position` | string | 'top' | `top | bottom | left | right` |
| `pointer-position` | string | 'center' | Arrow position |
| `text` | string | '' | Tooltip text |

**CSS Parts:** `tooltip`, `text`, `arrow`
**Override hooks:** `--rr-tooltip-arrow-color`

### rr-dialog

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `open` | boolean | false | Show/hide dialog |
| `heading` | string | '' | Dialog title |

**Slots:** default (body), `icon`, `footer` (action buttons)
**Events:** `close`
**CSS Parts:** `dialog`, `icon`, `header`, `body`, `footer`

```html
<rr-dialog heading="Confirm Delete" open>
  <rr-icon slot="icon" name="warning"></rr-icon>
  Are you sure you want to delete this item?
  <div slot="footer">
    <rr-button variant="neutral-tinted">Cancel</rr-button>
    <rr-button variant="danger-tinted">Delete</rr-button>
  </div>
</rr-dialog>
```
