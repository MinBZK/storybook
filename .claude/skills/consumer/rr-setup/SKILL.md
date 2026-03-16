---
name: rr-setup
description: Setup guide for installing and configuring @minbzk/storybook (RegelRecht Design System) in a consumer project
user-invocable: true
---

# RegelRecht Design System — Project Setup

Use this guide to install and configure `@minbzk/storybook` in your project.

## Step 1: Configure npm Registry

Create or update `.npmrc` in your project root:

```
@minbzk:registry=https://npm.pkg.github.com
```

Authenticate (one-time):

```bash
npm login --registry=https://npm.pkg.github.com
# Use GitHub username + personal access token with `read:packages` scope
```

## Step 2: Install

```bash
npm install @minbzk/storybook
```

`lit` and `@floating-ui/dom` are direct dependencies and will be installed automatically.

## Step 3: Import CSS Tokens (Required)

Import tokens **once** in your app entry point. This provides all design tokens (colors, spacing, typography, etc.):

```javascript
import '@minbzk/storybook/css';
```

Or in HTML:

```html
<link rel="stylesheet" href="node_modules/@minbzk/storybook/dist/css/tokens.css" />
```

## Step 4: Import Components

```javascript
// All components at once
import '@minbzk/storybook';

// Or import specific classes
import { RRButton, RRCheckbox, RRSwitch } from '@minbzk/storybook';
```

Components auto-register their custom element tag on import. No manual `customElements.define()` needed.

## Step 5: Use in HTML

```html
<rr-button variant="accent-filled">Primary Action</rr-button>
<rr-checkbox>Accept terms</rr-checkbox>
<rr-switch>Enable notifications</rr-switch>
```

## Step 6: Font Setup

RegelRecht uses the **RijksSansVF** font with `system-ui` fallback. The font files ship in the package under `fonts/`. Copy or serve them from your project:

```css
@font-face {
  font-family: 'RijksSansVF';
  src: url('/fonts/RijksSansVF-Regular.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'RijksSansVF';
  src: url('/fonts/RijksSansVF-Italic.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
```

Or reference the package path directly depending on your bundler.

## Step 7: Color Scheme

Enable light/dark mode support by setting the color scheme on your root element:

```css
:root {
  color-scheme: light dark; /* Enables automatic light-dark() token switching */
}

/* Force light mode */
:root[data-scheme="light"] { color-scheme: light; }

/* Force dark mode */
:root[data-scheme="dark"] { color-scheme: dark; }
```

## Step 8: Enable Claude Skills (Optional)

To give Claude access to the RegelRecht component reference skills in this project, add to `.claude/settings.json`:

```json
{
  "skills": ["node_modules/@minbzk/storybook/.claude/skills/consumer"]
}
```

Available skills:
- `/rr-setup` — This guide
- `/rr-component-reference` — Full API reference for all 60+ components
- `/rr-layout-patterns` — Page composition with layout components
- `/rr-form-patterns` — Form building with validation and error states
- `/rr-tokens` — Design token hierarchy and reference
- `/rr-accessibility` — DigiToegankelijk (WCAG 2.1 AA) compliance checklist
- `/rr-navigation` — Navigation bars, tabs, pagination, menus

## Verification

After setup, verify everything works:

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RegelRecht Test</title>
</head>
<body>
  <script type="module">
    import '@minbzk/storybook/css';
    import '@minbzk/storybook';
  </script>

  <rr-page>
    <rr-top-navigation-bar slot="header" title="My App"></rr-top-navigation-bar>
    <rr-simple-section>
      <rr-title-bar>Hello RegelRecht</rr-title-bar>
      <rr-button variant="accent-filled">It works!</rr-button>
    </rr-simple-section>
  </rr-page>
</body>
</html>
```

## Live Documentation

Interactive component demos: **https://minbzk.github.io/storybook/**
