---
name: rr-accessibility
description: DigiToegankelijk (WCAG 2.1 AA) accessibility checklist and ARIA patterns for @minbzk/storybook components
user-invocable: true
---

# RegelRecht Accessibility Guide

All RegelRecht components are built to comply with **DigiToegankelijk** (Dutch Digital Accessibility Standard), **WCAG 2.1 Level AA**, and **WAI-ARIA 1.2**. This guide helps you use them accessibly.

---

## Quick Checklist for Consumers

### Page Structure
- [ ] Use `<rr-page>` with `<rr-top-navigation-bar>` (includes skip link to `#main-content`)
- [ ] Set `lang="nl"` on `<html>` element
- [ ] Use semantic heading levels via `<rr-title-bar level="1|2|3...">` — don't skip levels
- [ ] Ensure a `<main id="main-content">` element exists as skip-link target

### Forms
- [ ] Every input has a label — use `<rr-form-field label="...">` to wrap inputs
- [ ] Error messages use `<rr-form-field-error-text>` (auto-wired to `aria-describedby`)
- [ ] Required fields marked with `required` attribute
- [ ] Group related radio buttons in `<rr-radio-button-group>` with `accessible-labelledby`

### Interactive Elements
- [ ] Icon-only buttons have `accessible-label` attribute: `<rr-icon-button accessible-label="Delete">`
- [ ] All custom controls are keyboard accessible (built-in for all `rr-*` components)
- [ ] Don't remove or override focus styles

### Color & Motion
- [ ] Don't rely on color alone to convey information
- [ ] Content works at 200% zoom without horizontal scrolling
- [ ] Test with `prefers-reduced-motion: reduce` (components handle this internally)
- [ ] Test with Windows High Contrast Mode / `forced-colors: active`

---

## ARIA Patterns Per Component

### Buttons (`rr-button`, `rr-icon-button`)
- Uses native `<button>` — no ARIA role needed
- `aria-disabled` reflects `disabled` attribute
- **Icon-only buttons MUST have** `accessible-label`:

```html
<!-- Good -->
<rr-icon-button accessible-label="Delete item">
  <rr-icon name="trash"></rr-icon>
</rr-icon-button>

<!-- Bad — screen reader announces nothing meaningful -->
<rr-icon-button>
  <rr-icon name="trash"></rr-icon>
</rr-icon-button>
```

### Checkbox (`rr-checkbox`, `rr-checkbox-field`)
- `role="checkbox"` with `aria-checked="true|false|mixed"`
- `mixed` = indeterminate state
- Keyboard: `Space` = toggle, `Tab` = move focus

```html
<rr-checkbox-field checked>Accept terms and conditions</rr-checkbox-field>
<rr-checkbox indeterminate accessible-label="Select all items"></rr-checkbox>
```

### Radio Buttons (`rr-radio-button-group`)
- Container: `role="radiogroup"` with `aria-labelledby`
- Items: `role="radio"` with `aria-checked`
- Keyboard: `Arrow Up/Left` = previous, `Arrow Down/Right` = next, `Space/Enter` = select

```html
<span id="color-label">Choose color</span>
<rr-radio-button-group name="color" accessible-labelledby="color-label">
  <rr-radio-button-field value="red" checked>Red</rr-radio-button-field>
  <rr-radio-button-field value="blue">Blue</rr-radio-button-field>
</rr-radio-button-group>
```

### Switch (`rr-switch`, `rr-switch-field`)
- `role="switch"` with `aria-checked="true|false"`
- Keyboard: `Space/Enter` = toggle

```html
<rr-switch-field>Enable dark mode</rr-switch-field>
```

### Menu (`rr-menu`)
- Uses popover API with `role="menu"` and `role="menuitem"`
- Trigger button needs `aria-haspopup="menu"` and `aria-expanded`
- Keyboard: `Arrow Down/Up` = navigate items, `Home/End` = jump, `Escape` = close

### Tab Bar (`rr-tab-bar`)
- `role="tablist"` with `role="tab"` items
- Keyboard: `Arrow Left/Right` = navigate tabs, `Home/End` = jump

### Dialog (`rr-dialog`)
- Uses native `<dialog>` element — manages focus trap automatically
- `Escape` closes the dialog
- Focus returns to trigger element on close

### Toolbar (`rr-toolbar`)
- `role="toolbar"` with `aria-label`
- Always set the `label` attribute for screen readers:

```html
<rr-toolbar label="Text formatting">...</rr-toolbar>
```

### Pagination (`rr-pagination`)
- `role="navigation"` with `aria-label`
- Current page: `aria-current="page"`
- Disabled prev/next at boundaries

---

## Focus Ring Implementation

All components use a consistent double-ring focus indicator using design tokens:

```css
/* Inner ring */
--semantics-focus-ring-center-color: #364B6D
--semantics-focus-ring-center-thickness: 4px

/* Outer ring */
--semantics-focus-ring-edge-color    /* matches background */
--semantics-focus-ring-edge-thickness: 6px
```

**Do not override** these tokens unless you maintain at least 3:1 contrast ratio against adjacent colors.

---

## Reduced Motion

All components respect `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

If you add custom animations around RegelRecht components, apply this same pattern.

---

## High Contrast Mode (Forced Colors)

Components include `forced-colors: active` support. If you add custom styling, include:

```css
@media (forced-colors: active) {
  .my-element:focus-visible {
    outline: 2px solid CanvasText !important;
    outline-offset: 2px !important;
  }

  /* Use system colors: CanvasText, Canvas, Highlight, HighlightText, etc. */
}
```

---

## Visually Hidden Content

For screen-reader-only text (outside shadow DOM), use this CSS class:

```css
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
```

```html
<rr-button>
  <rr-icon name="trash"></rr-icon>
  <span class="sr-only">Delete selected items</span>
</rr-button>
```

---

## Keyboard Shortcuts Reference

| Component | Key | Action |
|-----------|-----|--------|
| All | `Tab` | Next focusable element |
| All | `Shift+Tab` | Previous focusable element |
| Button | `Enter/Space` | Activate |
| Checkbox | `Space` | Toggle checked |
| Radio | `Arrow Up/Left` | Previous option |
| Radio | `Arrow Down/Right` | Next option |
| Radio | `Space/Enter` | Select option |
| Switch | `Space/Enter` | Toggle on/off |
| Tab Bar | `Arrow Left/Right` | Navigate tabs |
| Tab Bar | `Home/End` | First/last tab |
| Menu | `Arrow Down/Up` | Navigate items |
| Menu | `Home/End` | First/last item |
| Menu | `Escape` | Close menu |
| Dialog | `Escape` | Close dialog |
| Pagination | `Enter` | Select page |

---

## Testing Recommendations

1. **Keyboard-only navigation** — unplug your mouse and navigate the entire page
2. **Screen reader** — test with VoiceOver (macOS), NVDA (Windows), or Orca (Linux)
3. **Zoom** — verify layout at 200% browser zoom
4. **Contrast** — use browser DevTools contrast checker or axe-core
5. **Automated** — run `axe-core` or `pa11y` against your pages
