---
name: rr-form-patterns
description: Form composition patterns using RegelRecht form fields — labels, validation, error messages, and input wiring
user-invocable: true
---

# RegelRecht Form Patterns

> **Note:** Dedicated form container components (`<rr-form>`, `<rr-fieldset>`, etc.) do not exist yet and are planned for a future release. The individual input components below are available and can be used with standard HTML `<form>` and `<fieldset>` elements.

Guide for building forms with RegelRecht input components. Covers form field composition, validation states, error messages, and input types.

---

## Basic Form Field

Wrap any input in `<rr-form-field>` to get labels, help text, and error handling:

```html
<rr-form-field label="Email address">
  <rr-text-field type="email" placeholder="you@example.com"></rr-text-field>
</rr-form-field>
```

This auto-wires:
- Label → input via `accessible-label` / `aria-label`
- Unique IDs for inputs and labels
- `aria-describedby` for help/error text

---

## rr-form-field API

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | string | '' | Label text (omit for no label) |
| `label-alignment` | string | 'top' | `top | left | right` |
| `supporting-label` | string | '' | Small text below label |
| `optional` | boolean | false | Shows "Optioneel" badge |
| `optional-label` | string | 'Optioneel' | Custom optional text |

**Label alignment behavior:**
- `top` — label above the input (default)
- `left` / `right` — label beside input in a 240px column
- Automatically collapses to `top` when container < 640px

**Slots:** default (input), help text and error text auto-slot

---

## Input Components

### rr-text-field

```html
<rr-text-field
  value=""
  placeholder="Enter text"
  size="md"
  type="text"
  name="field-name"
  required
  autocomplete="given-name"
></rr-text-field>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | string | '' | Current value |
| `placeholder` | string | '' | Placeholder text |
| `size` | string | 'md' | `sm | md` |
| `type` | string | 'text' | `text | email | tel | url` |
| `name` | string | '' | Form field name |
| `disabled` | boolean | false | Disabled state |
| `readonly` | boolean | false | Read-only state |
| `required` | boolean | false | Required field |
| `invalid` | boolean | false | Show error state |
| `valid` | boolean | false | Show valid state |
| `autocomplete` | string | '' | Browser autocomplete hint |
| `accessible-label` | string | '' | aria-label (auto-set by form-field) |
| `error-message` | string | '' | Space-separated IDs of error elements |
| `input-id` | string | '' | Custom ID for the internal input |

**Events:** `input` (detail: {value}), `change` (detail: {value})
**CSS Parts:** `container`, `input`

### rr-password-field

```html
<rr-password-field placeholder="Enter password" autocomplete="current-password"></rr-password-field>
```

Same attributes as text-field plus:

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `masked` | boolean | true | Password hidden |
| `show-label` | string | 'Toon' | Show button text |
| `hide-label` | string | 'Verberg' | Hide button text |

**CSS Parts:** `field`, `input`, `toggle`

### rr-search-field

```html
<rr-search-field placeholder="Zoeken" size="md"></rr-search-field>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | string | '' | Current value |
| `placeholder` | string | 'Zoeken' | Placeholder |
| `size` | string | 'md' | `sm | md` |
| `disabled` | boolean | false | Disabled state |

**Events:** `input`, `change`, `search` (all with detail: {value})

### rr-number-field

```html
<rr-number-field value="0" min="0" max="100" step="1"></rr-number-field>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | number | 0 | Current value |
| `min` | number | -Infinity | Minimum value |
| `max` | number | Infinity | Maximum value |
| `step` | number | 1 | Increment step |
| `disabled` | boolean | false | Disabled state |

**Events:** `input`, `change` (detail: {value})

### rr-drop-down-field

```html
<rr-drop-down-field placeholder="Choose an option" size="md">
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</rr-drop-down-field>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | string | '' | Selected value |
| `placeholder` | string | '' | Placeholder |
| `size` | string | 'md' | `sm | md` |
| `disabled` | boolean | false | Disabled state |

**Slots:** default (option elements)
**Events:** `change` (detail: {value})

### rr-combo-box-field

```html
<rr-combo-box-field placeholder="Search or select"></rr-combo-box-field>
```

Combines text input with dropdown picker. Events: `input`, `change`, `picker-click`.

---

## Toggle Inputs

### rr-checkbox / rr-checkbox-field

```html
<!-- Standalone (needs accessible-label) -->
<rr-checkbox accessible-label="Accept terms" checked></rr-checkbox>

<!-- With label -->
<rr-checkbox-field checked>Accept terms and conditions</rr-checkbox-field>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `checked` | boolean | false | Checked state |
| `indeterminate` | boolean | false | Mixed state |
| `disabled` | boolean | false | Disabled state |
| `value` | string | 'on' | Form value |
| `name` | string | '' | Form field name |

**Events:** `change` (detail: {checked, value})

### rr-radio-button-group

```html
<rr-radio-button-group name="size">
  <rr-radio-button-field value="sm">Small</rr-radio-button-field>
  <rr-radio-button-field value="md" checked>Medium</rr-radio-button-field>
  <rr-radio-button-field value="lg">Large</rr-radio-button-field>
</rr-radio-button-group>
```

| Attribute (group) | Type | Default | Description |
|-------------------|------|---------|-------------|
| `name` | string | '' | Form field name |
| `disabled` | boolean | false | Disable all |
| `required` | boolean | false | Require selection |
| `accessible-labelledby` | string | '' | ID of labelling element |

**Events:** `change` (detail: {checked, value})

### rr-switch / rr-switch-field

```html
<!-- Standalone -->
<rr-switch size="md" checked></rr-switch>

<!-- With label -->
<rr-switch-field>Enable notifications</rr-switch-field>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `checked` | boolean | false | On/off state |
| `disabled` | boolean | false | Disabled state |
| `size` | string | 'md' | `sm | md` |

**Events:** `change` (detail: {checked})

### rr-toggle-button

```html
<rr-toggle-button selected>
  <rr-icon slot="icon" name="bold"></rr-icon>
  Bold
</rr-toggle-button>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `selected` | boolean | false | Toggle state |
| `disabled` | boolean | false | Disabled state |
| `size` | string | 'md' | `xs | sm | md` |

**Slots:** default (label text), `icon`
**Events:** `toggle` (detail: {selected})

### rr-segmented-control

```html
<rr-segmented-control value="grid" size="md">
  <rr-segmented-control-item value="list">List</rr-segmented-control-item>
  <rr-segmented-control-item value="grid">Grid</rr-segmented-control-item>
</rr-segmented-control>
```

**Events:** `change` (detail: {value})

### rr-stepper

```html
<rr-stepper value="1" min="0" max="10" step="1" size="md"></rr-stepper>
```

**Events:** `change` (detail: {value})

### rr-token

```html
<rr-token control="dismiss">Selected Tag</rr-token>
<rr-token control="picker">Filter</rr-token>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `control` | string | 'none' | `none | dismiss | picker` |
| `open` | boolean | false | Picker open state |
| `disabled` | boolean | false | Disabled state |

**Events:** `dismiss` (when dismissed), `toggle` (detail: {open})

---

## Help Text

```html
<rr-form-field label="Username">
  <rr-form-field-help-text>
    Choose a unique username. <a href="/help">Learn more</a>.
  </rr-form-field-help-text>
  <rr-text-field></rr-text-field>
</rr-form-field>
```

`<rr-form-field-help-text>` automatically:
- Slots into the `help` area
- Gets an auto-generated ID
- Is referenced by the input's `aria-describedby`

---

## Error Messages

```html
<rr-form-field label="Password">
  <rr-text-field
    invalid
    error-message="err-required err-length"
  ></rr-text-field>

  <rr-form-field-error-text id="err-required">
    This field is required.
  </rr-form-field-error-text>

  <rr-form-field-error-text id="err-length">
    Must be at least 8 characters.
  </rr-form-field-error-text>
</rr-form-field>
```

**How it works:**

1. Set `invalid` attribute on the input to enable error state styling
2. Set `error-message="id1 id2"` with space-separated IDs of error text elements
3. `rr-form-field` automatically:
   - Shows only error elements whose IDs are listed
   - Sets `aria-describedby` on the input to reference visible errors + help text
   - Adds `has-errors` class to the container

**Programmatic validation:**

```javascript
const input = document.querySelector('rr-text-field');

// Show errors
input.setAttribute('invalid', '');
input.setAttribute('error-message', 'err-required');

// Clear errors
input.removeAttribute('invalid');
input.removeAttribute('error-message');
```

---

## Complete Form Example

```html
<form>
  <rr-form-field label="Full name">
    <rr-text-field name="name" required autocomplete="name"></rr-text-field>
  </rr-form-field>

  <rr-spacer size="16"></rr-spacer>

  <rr-form-field label="Email" supporting-label="We'll never share your email">
    <rr-form-field-help-text>Used for account recovery</rr-form-field-help-text>
    <rr-text-field name="email" type="email" required autocomplete="email"></rr-text-field>
    <rr-form-field-error-text id="email-err">Please enter a valid email</rr-form-field-error-text>
  </rr-form-field>

  <rr-spacer size="16"></rr-spacer>

  <rr-form-field label="Password">
    <rr-password-field name="password" required autocomplete="new-password"></rr-password-field>
    <rr-form-field-error-text id="pw-length">At least 8 characters</rr-form-field-error-text>
  </rr-form-field>

  <rr-spacer size="16"></rr-spacer>

  <rr-form-field label="Role">
    <rr-radio-button-group name="role" required>
      <rr-radio-button-field value="user" checked>User</rr-radio-button-field>
      <rr-radio-button-field value="admin">Admin</rr-radio-button-field>
    </rr-radio-button-group>
  </rr-form-field>

  <rr-spacer size="16"></rr-spacer>

  <rr-form-field label="Preferences" label-alignment="top">
    <rr-checkbox-field name="newsletter">Subscribe to newsletter</rr-checkbox-field>
  </rr-form-field>

  <rr-spacer size="16"></rr-spacer>

  <rr-form-field label="Notifications" optional>
    <rr-switch-field name="notifications">Enable email notifications</rr-switch-field>
  </rr-form-field>

  <rr-spacer size="24"></rr-spacer>

  <rr-button variant="accent-filled" type="submit">Create Account</rr-button>
  <rr-button variant="neutral-transparent" type="reset">Reset</rr-button>
</form>
```

---

## Listening to Events

All input events use `CustomEvent` with `bubbles: true, composed: true`:

```javascript
// Listen on individual input
document.querySelector('rr-text-field').addEventListener('change', (e) => {
  console.log('New value:', e.detail.value);
});

// Listen on form (events bubble)
document.querySelector('form').addEventListener('change', (e) => {
  const target = e.target;
  console.log(`${target.tagName} changed:`, e.detail);
});

// Checkbox/switch/radio
document.querySelector('rr-checkbox-field').addEventListener('change', (e) => {
  console.log('Checked:', e.detail.checked, 'Value:', e.detail.value);
});

// Pagination
document.querySelector('rr-pagination').addEventListener('page-change', (e) => {
  console.log('Page:', e.detail.page);
});
```
