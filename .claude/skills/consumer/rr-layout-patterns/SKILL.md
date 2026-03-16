---
name: rr-layout-patterns
description: Page composition patterns using RegelRecht layout components — rr-page, split views, sections, containers, and responsive utilities
user-invocable: true
---

# RegelRecht Layout Patterns

Guide for composing page layouts with RegelRecht layout components.

---

## Page Shell

Every app starts with `rr-page` as the outermost container:

```html
<rr-page sticky-header>
  <rr-top-navigation-bar slot="header" title="My App"></rr-top-navigation-bar>

  <!-- Main content goes here (scrollable) -->
  <rr-simple-section>
    <rr-title-bar level="1">Page Title</rr-title-bar>
    <p>Content...</p>
  </rr-simple-section>

  <div slot="footer">Footer content</div>
</rr-page>
```

### rr-page

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `sticky-header` | boolean | false | Header stays fixed during scroll |
| `sticky-footer` | boolean | false | Footer stays fixed during scroll |
| `tinted` | boolean | false | Gray background instead of white |

**Slots:** `header`, default (main content), `footer`

Sticky headers/footers get a transparent-to-opaque gradient transition on scroll.

---

## Sections

Sections are the building blocks within a page. They control max-width, padding, and responsive gaps.

### rr-simple-section

Basic content section with responsive padding. No attributes — padding adjusts automatically via container queries (sm/md/lg).

```html
<rr-simple-section>
  <h2 slot="header">Section Title</h2>
  <p>Main content</p>
  <p slot="footer">Footer</p>
</rr-simple-section>
```

**Slots:** `header`, default, `footer`

### rr-full-bleed-section

Like simple-section but content stretches edge-to-edge (no max-width constraint).

```html
<rr-full-bleed-section>
  <img src="hero.jpg" alt="Full width hero" />
</rr-full-bleed-section>
```

**Slots:** `header`, default, `footer`

### Column Sections

For multi-column layouts within a section:

```html
<!-- 1/3 + 2/3 -->
<rr-one-third-two-thirds-section>
  <nav slot="left">Sidebar navigation</nav>
  <article>Main content (2/3 width)</article>
</rr-one-third-two-thirds-section>

<!-- 2/3 + 1/3 -->
<rr-two-thirds-one-third-section>
  <article>Main content (2/3 width)</article>
  <aside slot="right">Sidebar</aside>
</rr-two-thirds-one-third-section>

<!-- 1/2 + 1/2 -->
<rr-one-half-one-half-section>
  <div slot="left">Left column</div>
  <div slot="right">Right column</div>
</rr-one-half-one-half-section>
```

All column sections have `header` and `footer` slots too.

---

## Split Views

For app-level layout structures (sidebars, panels, multi-pane editors).

### rr-horizontal-split-view

Three-column layout: sidebar + content + inspector.

```html
<rr-horizontal-split-view show-sidebar show-inspector>
  <nav slot="sidebar">Navigation tree</nav>
  <article>Main content</article>
  <aside slot="inspector">Properties panel</aside>
</rr-horizontal-split-view>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `show-sidebar` | boolean | true | Toggle left panel |
| `show-inspector` | boolean | true | Toggle right panel |

**Responsive:** Inspector hides at < 962px, sidebar hides at < 641px.

**Slots:** `sidebar`, default (content), `inspector`

### rr-vertical-split-view

Three-row layout: header + content + footer.

```html
<rr-vertical-split-view show-header show-footer>
  <div slot="header">Toolbar area</div>
  <main>Main content</main>
  <div slot="footer">Status bar</div>
</rr-vertical-split-view>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `show-header` | boolean | true | Toggle top panel |
| `show-footer` | boolean | true | Toggle bottom panel |

**Slots:** `header`, default (content), `footer`

### rr-side-by-side-split-view

Multiple equal-width horizontal panels.

```html
<rr-side-by-side-split-view panes="3">
  <section slot="pane-1">Editor</section>
  <section slot="pane-2">Preview</section>
  <section slot="pane-3">Console</section>
</rr-side-by-side-split-view>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `panes` | number | 2 | Number of panels |

Each panel has a minimum width of 320px. Panels are hidden if insufficient space.

**Slots:** `pane-1`, `pane-2`, ... `pane-n`

### rr-stacked-split-view

Multiple equal-height vertical panels (same as side-by-side but vertical).

```html
<rr-stacked-split-view panes="2">
  <div slot="pane-1">Top panel</div>
  <div slot="pane-2">Bottom panel</div>
</rr-stacked-split-view>
```

---

## Container & Spacing

### rr-container

Generic container with configurable padding.

```html
<rr-container padding="32">
  Content with 32px padding all around
</rr-container>

<rr-container padding-block="24" padding-inline="16">
  Different vertical and horizontal padding
</rr-container>
```

**Padding attributes:** `padding`, `padding-inline`, `padding-block`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`

**Values:** `none | md | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 28 | 32 | 40 | 44 | 48 | 56 | 64 | 80 | 96`

**Specificity:** individual sides > axis > all sides.

### rr-spacer

Adds space between elements.

```html
<rr-title-bar>Title</rr-title-bar>
<rr-spacer size="24"></rr-spacer>
<p>Content below with 24px gap</p>

<!-- Flexible spacer fills remaining space -->
<rr-spacer size="flexible"></rr-spacer>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | '16' | `flexible | md | 2 | 4 | 6 | 8...96` |
| `direction` | string | 'both' | `horizontal | vertical | both` |

### rr-divider

Visual separator line. No attributes.

```html
<section>First section</section>
<rr-divider></rr-divider>
<section>Second section</section>
```

### rr-box

Visual container that groups content in a tinted rounded rectangle.

```html
<rr-box>
  <h3>Related Settings</h3>
  <rr-switch-field>Option A</rr-switch-field>
  <rr-switch-field>Option B</rr-switch-field>
</rr-box>
```

Uses `--components-box-background-color`, `--components-box-corner-radius: 16px`, `--components-box-padding: 16px`.

---

## Responsive Visibility

### rr-show

Conditionally show content based on viewport or container size.

```html
<!-- Show only on mobile -->
<rr-show only="sm">
  <rr-button>Mobile menu</rr-button>
</rr-show>

<!-- Show on tablet and up -->
<rr-show above="md">
  <nav>Desktop navigation</nav>
</rr-show>

<!-- Container query (responds to parent size, not viewport) -->
<rr-show above="md" query="container">
  <div>Wide layout content</div>
</rr-show>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `above` | string | — | Show at this breakpoint and larger |
| `below` | string | — | Show up to this breakpoint |
| `only` | string | — | Show only at this breakpoint |
| `query` | string | 'container' | `viewport | container` |

**Breakpoints:** `sm` (320-640px), `md` (641-1007px), `lg` (1008px+)

---

## Title Bar

### rr-title-bar

Semantic heading with optional overline, subtitle, and action area.

```html
<rr-title-bar level="1" size="2" overline="Category" subtitle="Last updated today">
  Page Title
  <rr-button slot="actions" variant="accent-filled">Save</rr-button>
</rr-title-bar>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `level` | number | 1 | Semantic heading level (h1-h6) |
| `size` | number | 3 | Visual size (independent of level) |
| `overline` | string | '' | Small text above title |
| `subtitle` | string | '' | Text below title |

**Slots:** default (title text), `actions`

---

## Collection

### rr-collection

Grid, list, or horizontal scroll layout for item collections.

```html
<rr-collection layout="grid" show-load-more max-items="12" lazy-load>
  <article>Card 1</article>
  <article>Card 2</article>
  <!-- ... -->
</rr-collection>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `layout` | string | 'grid' | `grid | list | horizontal-scroll` |
| `show-load-more` | boolean | false | Show "Load more" button |
| `load-more-label` | string | 'Toon meer' | Button text |
| `max-items` | number | 24 | Items per page |
| `lazy-load` | boolean | false | Auto-load on scroll |

**Slots:** default (items), `footer`
**Events:** `load-more`

---

## Common Composition Patterns

### Standard Content Page

```html
<rr-page sticky-header>
  <rr-top-navigation-bar slot="header" title="Portal"></rr-top-navigation-bar>

  <rr-simple-section>
    <rr-title-bar level="1" overline="Dashboard">
      Welcome
      <rr-button slot="actions" variant="accent-filled">New Item</rr-button>
    </rr-title-bar>
  </rr-simple-section>

  <rr-simple-section>
    <rr-collection layout="grid">
      <!-- cards -->
    </rr-collection>
  </rr-simple-section>
</rr-page>
```

### Sidebar App Layout

```html
<rr-page>
  <rr-top-navigation-bar slot="header" title="Admin"></rr-top-navigation-bar>

  <rr-horizontal-split-view show-sidebar>
    <nav slot="sidebar">
      <rr-list>
        <rr-list-item selected><rr-text-cell>Dashboard</rr-text-cell></rr-list-item>
        <rr-list-item><rr-text-cell>Settings</rr-text-cell></rr-list-item>
      </rr-list>
    </nav>

    <rr-simple-section>
      <rr-title-bar level="1">Dashboard</rr-title-bar>
      <p>Content here</p>
    </rr-simple-section>
  </rr-horizontal-split-view>
</rr-page>
```

### Editor with Panels

```html
<rr-page>
  <rr-top-title-bar slot="header" title="Document Editor">
    <rr-toolbar slot="toolbar-start" label="Formatting">
      <!-- toolbar items -->
    </rr-toolbar>
  </rr-top-title-bar>

  <rr-horizontal-split-view show-sidebar show-inspector>
    <div slot="sidebar">File tree</div>
    <main>Editor canvas</main>
    <div slot="inspector">Properties</div>
  </rr-horizontal-split-view>
</rr-page>
```
