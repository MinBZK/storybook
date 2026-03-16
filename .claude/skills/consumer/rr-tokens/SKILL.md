---
name: rr-tokens
description: Design token reference for @minbzk/storybook — token hierarchy and key tokens by category
user-invocable: true
---

# RegelRecht Design Tokens Reference

The design system uses CSS custom properties organized in three layers. Import `@minbzk/storybook/css` to load all tokens.

## Token Hierarchy

```
Primitives (--primitives-*)  →  Base values (colors, spacing, fonts)
     ↓
Semantics (--semantics-*)    →  Meaningful values (buttons, controls, focus)
     ↓
Components (--components-*)  →  Component-specific tokens
```

Internal component variables use underscore prefixes (`--_*`) and are not intended for consumer use. No consumer override hooks are provided.

**Rule:** Always use the highest-level token available. Prefer `--semantics-*` over `--primitives-*`. Only use primitives when no semantic token exists.

---

## Color Tokens

### Primitives — Color Scales

Each scale has steps: `0, 25, 50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000`

| Scale | Token Pattern | Usage |
|-------|--------------|-------|
| Neutral | `--primitives-color-neutral-{step}` | Text, backgrounds, borders (blue-gray) |
| Accent | `--primitives-color-accent-{step}` | Primary brand color (blue) |
| Success | `--primitives-color-success-{step}` | Success states (green) |
| Warning | `--primitives-color-warning-{step}` | Warning states (orange) |
| Danger | `--primitives-color-danger-{step}` | Error/destructive states (red) |
| Highlight | `--primitives-color-highlight-{step}` | Highlight/info states (yellow) |

All colors support light/dark mode via `light-dark()`:

```css
--primitives-color-neutral-800: light-dark(oklch(0.159 0.018 249.6), oklch(0.882 0.008 247.8));
```

### Semantics — Meaningful Colors

```css
/* Surfaces */
--semantics-surfaces-background-color           /* Page background */
--semantics-surfaces-tinted-background-color    /* Tinted sections */

/* Content text */
--semantics-content-color                       /* Primary text */
--semantics-content-secondary-color             /* Secondary text */
--semantics-content-error-color                 /* Error text */

/* Links */
--semantics-links-color
--semantics-links-is-hovered-color
--semantics-links-is-active-color

/* Dividers */
--semantics-dividers-color
--semantics-dividers-thickness: 1px
```

---

## Spacing Tokens

```css
--primitives-space-{0|2|4|6|8|10|12|14|16|18|20|24|28|32|40|44|48|56|64|80|96}
```

Values are in `px`. Use for padding, margins, and gaps.

---

## Typography Tokens

```css
/* Font families */
--primitives-font-family-sans-serif    /* RijksSansVF, system-ui */
--primitives-font-family-body          /* Same as sans-serif */
--primitives-font-family-monospace     /* Monospace stack */

/* Font sizes (rem-based) */
--primitives-font-size-{70|80|90|100|200|300|400|500|600|700|800|900|1000}
/* 70 ≈ 13px, 100 ≈ 16px, 400 ≈ 24px, 1000 ≈ 52px */

/* Font weights */
--primitives-font-weight-body-{hairline|thin|light|regular|medium|semi-bold|bold|extra-bold|black}

/* Line heights */
--primitives-line-height-loose: 1.75
--primitives-line-height-snug: 1.5
--primitives-line-height-tight: 1.25
--primitives-line-height-flat: 1.125
```

---

## Control Tokens

Used for interactive UI elements (buttons, inputs, toggles):

```css
/* Min sizes (touch targets) */
--semantics-controls-xs-min-size: 24px
--semantics-controls-sm-min-size: 32px
--semantics-controls-md-min-size: 44px
--semantics-controls-lg-min-size: 56px

/* Corner radius per size */
--semantics-controls-xs-corner-radius
--semantics-controls-sm-corner-radius
--semantics-controls-md-corner-radius
--semantics-controls-lg-corner-radius

/* Selected state */
--semantics-controls-is-selected-indicator-color
--semantics-controls-is-selected-contrast-color
```

---

## Button Tokens

```css
/* Font per size (includes weight, size, line-height, family) */
--semantics-buttons-md-font
--semantics-buttons-sm-font
--semantics-buttons-xs-font

/* Variant: accent-filled (primary) */
--semantics-buttons-accent-filled-background-color
--semantics-buttons-accent-filled-content-color
--semantics-buttons-accent-filled-is-hovered-background-color
--semantics-buttons-accent-filled-is-active-background-color

/* Variant: accent-outlined */
--semantics-buttons-accent-outlined-border-color
--semantics-buttons-accent-outlined-content-color

/* Variant: neutral-tinted (default) */
--semantics-buttons-neutral-tinted-background-color
--semantics-buttons-neutral-tinted-content-color
--semantics-buttons-neutral-tinted-is-hovered-background-color

/* Variant: neutral-transparent */
--semantics-buttons-neutral-transparent-content-color

/* Variant: danger-tinted */
--semantics-buttons-danger-tinted-background-color
--semantics-buttons-danger-tinted-content-color
```

---

## Input Field Tokens

```css
--semantics-input-fields-border-thickness: 2px
--semantics-input-fields-background-color
--semantics-input-fields-border-color
--semantics-input-fields-placeholder-color

/* Validation states */
--semantics-input-fields-is-valid-border-color
--semantics-input-fields-is-valid-icon-color
--semantics-input-fields-is-invalid-border-color
--semantics-input-fields-is-invalid-icon-color

/* Read-only */
--semantics-input-fields-is-read-only-background-color

/* Font per size */
--semantics-input-fields-sm-text-font
--semantics-input-fields-md-text-font
```

---

## Focus Ring Tokens

All interactive components use this consistent focus indicator:

```css
--semantics-focus-ring-center-color: light-dark(var(--primitives-color-accent-600), var(--primitives-color-accent-600))   /* Inner ring */
--semantics-focus-ring-center-thickness: 4px
--semantics-focus-ring-edge-color              /* Outer ring (matches background) */
--semantics-focus-ring-edge-thickness: 6px
```

**Implementation pattern:**

```css
.element:focus-visible {
  box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
  outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
}
```

---

## Component-Specific Tokens

```css
/* Checkbox */
--components-checkbox-border-thickness: 2px
--components-checkbox-border-color
--components-checkbox-is-selected-background-color
--components-checkbox-is-selected-icon-color

/* Radio Button */
--components-radio-button-border-thickness
--components-radio-button-is-selected-inner-shape-border-thickness

/* Switch */
--components-switch-border-thickness
--components-switch-thumb-border-thickness
--components-switch-is-selected-background-color

/* Box */
--components-box-background-color
--components-box-corner-radius: 16px
--components-box-padding: 16px

/* Form */
--components-form-gap: 16px

/* Menu Bar */
--components-menu-bar-menu-item-color
--components-menu-bar-menu-item-is-selected-color
--components-menu-bar-menu-item-font
```

---

## Breakpoints

```css
--primitives-breakpoint-sm-min: 320px
--primitives-breakpoint-sm-max: 640px
--primitives-breakpoint-md-min: 641px
--primitives-breakpoint-md-max: 1007px
--primitives-breakpoint-lg-min: 1008px
```

---

## Opacity

```css
--primitives-opacity-disabled: 0.38   /* Use for ALL disabled states */
--primitives-opacity-{0|5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95|100}
```

**Important:** `--primitives-opacity-disabled` is a decimal fraction (0.38), not a percentage. Use directly with `opacity: var(--primitives-opacity-disabled)`.

---

## Corner Radius

```css
--primitives-corner-radius-{none|xxs|xs|sm|md|lg|xl|xxl|xxxl|full}
```

---

## Page Section Tokens

```css
--semantics-page-sections-body-max-width: 1280px

/* Per breakpoint size (sm/md/lg) */
--semantics-page-sections-{sm|md|lg}-margin-inline
--semantics-page-sections-{sm|md|lg}-margin-block
--semantics-page-sections-{sm|md|lg}-gap
```
