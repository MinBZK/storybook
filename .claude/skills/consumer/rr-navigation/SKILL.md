---
name: rr-navigation
description: Navigation patterns using RegelRecht components — top nav bars, tab bars, pagination, menus, and toolbar
user-invocable: true
---

# RegelRecht Navigation Patterns

Guide for implementing navigation with RegelRecht components.

---

## Top Navigation Bar

The main header for government applications. Includes Rijksoverheid logo, title, utility controls, and skip link.

```html
<rr-top-navigation-bar
  title="App Name"
  container="lg"
  logo-title="Rijksoverheid"
  skip-link-target="#main-content"
></rr-top-navigation-bar>
```

### Full API

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | 'Titel' | App/site title |
| `container` | string | 'md' | Width: `sm | md | lg` |
| `skip-link-target` | string | '#main-content' | Skip link anchor |
| **Logo** | | | |
| `no-logo` | boolean | false | Hide logo |
| `no-title` | boolean | false | Hide title |
| `logo-title` | string | '' | Organization name |
| `logo-subtitle` | string | '' | Subtitle under logo |
| `logo-has-wordmark` | boolean | false | Show wordmark logo |
| `logo-supporting-text-1` | string | '' | Supporting line 1 |
| `logo-supporting-text-2` | string | '' | Supporting line 2 |
| **Utility bar** | | | |
| `no-utility-bar` | boolean | false | Hide entire utility bar |
| `utility-no-language-switch` | boolean | false | Hide language toggle |
| `utility-no-search` | boolean | false | Hide search |
| `utility-no-account` | boolean | false | Hide account button |
| `utility-has-help` | boolean | false | Show help button |
| `utility-has-settings` | boolean | false | Show settings button |
| `utility-language` | string | 'NL' | Current language |
| `utility-account-label` | string | '' | Account button label |
| **Back button** | | | |
| `has-back-button` | boolean | false | Show back button |
| `back-href` | string | '' | Back button URL |
| `back-label` | string | 'Terug' | Back button text |
| **Menu** | | | |
| `no-menu` | boolean | false | Hide main menu |

### Examples

```html
<!-- Minimal -->
<rr-top-navigation-bar title="My App" no-utility-bar></rr-top-navigation-bar>

<!-- With back button -->
<rr-top-navigation-bar
  title="Detail Page"
  has-back-button
  back-href="/list"
  back-label="Back to list"
></rr-top-navigation-bar>

<!-- Full government header -->
<rr-top-navigation-bar
  title="Portal"
  container="lg"
  logo-title="Rijksoverheid"
  logo-subtitle="Ministry of X"
  logo-has-wordmark
  utility-has-help
  utility-has-settings
></rr-top-navigation-bar>
```

---

## Top Title Bar

Compact header for detail pages or modal-like views with optional toolbar.

```html
<rr-top-title-bar title="Edit Document" container="sm">
  <rr-button slot="toolbar-start" variant="neutral-transparent">
    <rr-icon name="undo"></rr-icon> Undo
  </rr-button>
  <rr-button slot="toolbar-end" variant="accent-filled">Save</rr-button>
</rr-top-title-bar>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | 'Title' | Title text |
| `container` | string | 'sm' | Width: `sm | md | lg` |
| `compact` | boolean | false | Compact mode |
| `toolbar` | string | 'default' | Toolbar style |
| `dismiss-label` | string | 'Sluit' | Close button label |

**Slots:** `toolbar-start`, `toolbar-end`
**Events:** `dismiss` (close button clicked)
**Override hook:** `--rr-top-title-bar-title-color`

---

## Tab Bar

Horizontal tab navigation for switching between views.

```html
<rr-tab-bar>
  <rr-tab-bar-item selected>Overview</rr-tab-bar-item>
  <rr-tab-bar-item>Details</rr-tab-bar-item>
  <rr-tab-bar-item>Settings</rr-tab-bar-item>
  <rr-tab-bar-item disabled>Archive</rr-tab-bar-item>
</rr-tab-bar>
```

### rr-tab-bar-item

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `selected` | boolean | false | Active tab |
| `disabled` | boolean | false | Disabled state |

**Events on rr-tab-bar:** `tabchange` — fired when a tab is selected

**Keyboard:** `Arrow Left/Right` = navigate, `Home/End` = first/last tab

### Usage with content panels

```html
<rr-tab-bar id="tabs">
  <rr-tab-bar-item selected>Tab 1</rr-tab-bar-item>
  <rr-tab-bar-item>Tab 2</rr-tab-bar-item>
</rr-tab-bar>

<div id="panel-1">Content 1</div>
<div id="panel-2" hidden>Content 2</div>

<script>
  document.getElementById('tabs').addEventListener('tabchange', (e) => {
    // Toggle panels based on selected tab
    const tabs = e.target.querySelectorAll('rr-tab-bar-item');
    tabs.forEach((tab, i) => {
      document.getElementById(`panel-${i + 1}`).hidden = !tab.selected;
    });
  });
</script>
```

---

## Document Tab Bar

Browser-style tabs with close buttons (for document/editor interfaces).

```html
<rr-document-tab-bar>
  <rr-document-tab-bar-item selected>Document 1</rr-document-tab-bar-item>
  <rr-document-tab-bar-item>Document 2</rr-document-tab-bar-item>
  <rr-button slot="end" variant="neutral-transparent">
    <rr-icon name="plus"></rr-icon>
  </rr-button>
</rr-document-tab-bar>
```

**Events:**
- `tabchange` — tab selected
- `tabdismiss` — tab close button clicked

**Slots:** default (tab items), `end` (action buttons after tabs)

---

## Pagination

Page navigation for paginated content.

```html
<rr-pagination current-page="3" total-pages="10"></rr-pagination>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `current-page` | number | 1 | Active page (1-based) |
| `total-pages` | number | 1 | Total number of pages |
| `disabled` | boolean | false | Disable all buttons |

**Events:** `page-change` (detail: {page})

**Features:**
- Shows 7 page slots for consistent width
- Ellipsis (...) for skipped ranges
- Previous/Next buttons auto-disable at boundaries
- `aria-current="page"` on active page

```javascript
document.querySelector('rr-pagination').addEventListener('page-change', (e) => {
  console.log('Navigate to page:', e.detail.page);
  // Update your data and set current-page
  e.target.currentPage = e.detail.page;
});
```

---

## Menu

Popover dropdown menu anchored to a trigger element.

```html
<rr-button id="menu-trigger" popovertarget="my-menu" is-expandable>
  Options
</rr-button>

<rr-menu id="my-menu" anchor="menu-trigger" placement="bottom-start">
  <rr-menu-item text="Edit"></rr-menu-item>
  <rr-menu-item text="Duplicate"></rr-menu-item>
  <rr-menu-divider></rr-menu-divider>
  <rr-menu-item text="Delete"></rr-menu-item>
</rr-menu>
```

### rr-menu

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `anchor` | string | '' | ID of trigger element |
| `placement` | string | 'bottom-start' | Position relative to anchor |

**Slots:** default (menu items and dividers)
**Events:** `toggle` (native popover), `select` (bubbles from items)

### rr-menu-item

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | '' | Item label |
| `details` | string | '' | Secondary text |
| `type` | string | 'button' | Item type |
| `selected` | boolean | false | Selected state |
| `disabled` | boolean | false | Disabled state |

**Events:** `select` (fires on click, bubbles)

### Placement options

Uses `@floating-ui/dom` for positioning:
- `top`, `top-start`, `top-end`
- `bottom`, `bottom-start`, `bottom-end`
- `left`, `left-start`, `left-end`
- `right`, `right-start`, `right-end`

```javascript
document.querySelector('rr-menu').addEventListener('select', (e) => {
  const item = e.target.closest('rr-menu-item');
  console.log('Selected:', item.text);
});
```

---

## Split Button

Combined action button with dropdown menu.

```html
<rr-split-button variant="accent-filled" size="md">
  <rr-icon name="save"></rr-icon>
  Save
</rr-split-button>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | string | 'neutral-tinted' | Button variant |
| `size` | string | 'md' | `sm | md` |
| `disabled` | boolean | false | Disabled state |

**Events:** `action-click` (main button), `menu-click` (dropdown arrow)

---

## Toolbar

Horizontal toolbar with overflow menu for responsive layouts.

```html
<rr-toolbar label="Text formatting" size="md" show-item-labels>
  <rr-toolbar-start-area>
    <rr-toolbar-item label="Font">
      <rr-drop-down-field>
        <option>Arial</option>
        <option>Times</option>
      </rr-drop-down-field>
    </rr-toolbar-item>
  </rr-toolbar-start-area>

  <rr-toolbar-center-area>
    <rr-toolbar-item label="Bold">
      <rr-toggle-button><rr-icon name="bold"></rr-icon></rr-toggle-button>
      <rr-menu-item slot="overflow" text="Bold"></rr-menu-item>
    </rr-toolbar-item>
  </rr-toolbar-center-area>

  <rr-toolbar-end-area>
    <rr-toolbar-item label="Align">
      <rr-button-bar>
        <rr-icon-button><rr-icon name="align-left"></rr-icon></rr-icon-button>
        <rr-icon-button><rr-icon name="align-center"></rr-icon></rr-icon-button>
      </rr-button-bar>
    </rr-toolbar-item>
  </rr-toolbar-end-area>
</rr-toolbar>
```

### rr-toolbar

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | 'md' | `sm | md` |
| `show-item-labels` | boolean | false | Show labels under items |
| `label` | string | '' | Accessible label (required for a11y) |

### Toolbar structure elements

| Element | Purpose |
|---------|---------|
| `rr-toolbar-start-area` | Left-aligned items |
| `rr-toolbar-center-area` | Center-aligned items |
| `rr-toolbar-end-area` | Right-aligned items |
| `rr-toolbar-overflow-area` | Custom overflow area |
| `rr-toolbar-item` | Wraps individual tool with `label` attribute |
| `rr-toolbar-title-group` | Group heading within toolbar |

### Overflow handling

Items that don't fit the toolbar are moved to an overflow menu. Provide an `<rr-menu-item slot="overflow">` inside each `<rr-toolbar-item>` for the menu version:

```html
<rr-toolbar-item label="Bold">
  <rr-toggle-button><rr-icon name="bold"></rr-icon></rr-toggle-button>
  <rr-menu-item slot="overflow" text="Bold"></rr-menu-item>
</rr-toolbar-item>
```

**Override hooks:**
```css
--rr-toolbar-overflow-button-width
--rr-toolbar-start-width
--rr-toolbar-center-width
--rr-toolbar-end-width
--rr-toolbar-width
```

---

## Button Group & Button Bar

### rr-button-group

Vertical or horizontal group of related buttons (max 3).

```html
<rr-button-group size="md" flow="vertical">
  <rr-button variant="accent-filled">Primary</rr-button>
  <rr-button variant="neutral-tinted">Secondary</rr-button>
  <rr-button variant="neutral-transparent">Cancel</rr-button>
</rr-button-group>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | 'md' | Button size |
| `flow` | string | 'vertical' | `vertical | horizontal` |

### rr-button-bar

Connected row of buttons (like a segmented control but for actions).

```html
<rr-button-bar size="md" variant="neutral-tinted">
  <rr-icon-button><rr-icon name="align-left"></rr-icon></rr-icon-button>
  <rr-icon-button><rr-icon name="align-center"></rr-icon></rr-icon-button>
  <rr-button-bar-divider></rr-button-bar-divider>
  <rr-icon-button><rr-icon name="bold"></rr-icon></rr-icon-button>
</rr-button-bar>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | 'md' | Button size |
| `variant` | string | 'neutral-tinted' | Button variant |
| `disabled` | boolean | false | Disable all |
