---
description: Create a PR with FigmaComparison screenshots for changed components
argument-hint: [--all | --component <name>]
---

Create a pull request with FigmaComparison screenshots for visual verification.

## Arguments

- `--all`: Capture screenshots for ALL components with FigmaComparison stories
- `--component <name>`: Capture screenshots for a specific component (e.g., `button`, `checkbox`)
- No arguments: Auto-detect changed components based on git diff against main

## Workflow

### Step 1: Detect Changed Components

**If no arguments provided:**

Run git diff to find changed component files:

```bash
git diff --name-only main...HEAD -- "src/components/**/*"
```

Extract component names from paths:
- `src/components/button/...` → `button`
- `src/components/toggle-button/...` → `toggle-button`

**Filter to components with FigmaComparison stories:**

Only include components that have a `FigmaComparison` export in their `.stories.js` file. Check by grepping:

```bash
grep -l "FigmaComparison" src/components/*/rr-*.stories.js
```

**If `--all` provided:**

Use all components that have FigmaComparison stories.

**If `--component <name>` provided:**

Use only the specified component.

### Step 2: Start Storybook

Use the storybook-manager to start Storybook:

```bash
npm run sb:start
```

This auto-assigns a port (6006-6020) and registers in `~/.storybook-instances.json`.

**Read the registry to get the assigned port:**

```javascript
// Registry file: ~/.storybook-instances.json
// Find entry where path matches current working directory
```

**Wait for Storybook to be ready:**

```bash
npx wait-on http://localhost:{port} --timeout 60000
```

### Step 3: Capture Screenshots

For each component, navigate to the FigmaComparison story and capture screenshots.

**URL Pattern:**
```
http://localhost:{port}/iframe.html?viewMode=story&id=components-{name}--figma-comparison
```

Where `{name}` is the kebab-case component name:
- `button` → `components-button--figma-comparison`
- `toggle-button` → `components-toggle-button--figma-comparison`
- `icon-button` → `components-icon-button--figma-comparison`

**Screenshot Process using Playwright MCP:**

1. Navigate to the story URL: `mcp__playwright__browser_navigate`
2. Wait for ftl-holster to load: `mcp__playwright__browser_wait_for` with time: 3
3. Take a snapshot to find button refs: `mcp__playwright__browser_snapshot`
4. Verify `ftl-holster` is present with mode buttons (Toggle, Overlay, Side By Side)
5. **Click** the "Side By Side" button using `mcp__playwright__browser_click` with the ref from snapshot
   - Note: Keyboard shortcuts (S/O/T) are unreliable, always click the buttons directly
6. Wait for mode change: `mcp__playwright__browser_wait_for` with time: 1
7. Take Side-by-Side screenshot: `mcp__playwright__browser_take_screenshot` with:
   - filename: `{name}-side-by-side.png` (relative path only)
   - fullPage: true (Side-by-Side shows Figma above Code vertically)
8. **Click** the "Overlay" button using `mcp__playwright__browser_click`
9. Wait briefly: `mcp__playwright__browser_wait_for` with time: 1
10. Take Overlay screenshot: `mcp__playwright__browser_take_screenshot` with:
    - filename: `{name}-overlay.png`
    - fullPage: true

**Important: Playwright MCP output directory**

Screenshots are saved to `.playwright-mcp/` directory (restricted by Playwright MCP).
After capturing, copy screenshots to `docs/pr-screenshots/`:

```bash
cp .playwright-mcp/{name}-side-by-side.png docs/pr-screenshots/
cp .playwright-mcp/{name}-overlay.png docs/pr-screenshots/
```

### Step 4: Commit Screenshots

```bash
git add docs/pr-screenshots/*.png
git commit -m "docs: add FigmaComparison screenshots for PR

Screenshots captured in Side-by-Side and Overlay modes for visual verification."
```

### Step 5: Create or Update Pull Request

**Check if PR already exists:**

```bash
gh pr list --head $(git branch --show-current) --json number,url
```

**Build the PR body with a screenshot table:**

Use raw GitHub URLs for images (relative paths don't work in PR descriptions):

```markdown
## Summary

Visual updates for {N} component(s) with FigmaComparison verification.

## Screenshots

{For each component:}

### {Component Name}

| Side-by-Side | Overlay |
|--------------|---------|
| ![side-by-side](https://raw.githubusercontent.com/{owner}/{repo}/{branch}/docs/pr-screenshots/{name}-side-by-side.png) | ![overlay](https://raw.githubusercontent.com/{owner}/{repo}/{branch}/docs/pr-screenshots/{name}-overlay.png) |

---

## How to Verify

1. Check the Side-by-Side screenshots to see Code (bottom) vs Figma (top)
2. Check the Overlay screenshots to see any pixel differences
3. Minor differences in anti-aliasing are expected
```

**Create or update the PR:**

```bash
# If PR exists:
git push
gh pr edit {number} --body "{PR body}"

# If no PR exists:
git push -u origin {branch}
gh pr create --title "feat: {summary of changes}" --body "{PR body}"
```

## Error Handling

| Error | Solution |
|-------|----------|
| Storybook timeout | Suggest running `npm run sb:start` manually |
| No changes detected | Prompt to use `--all` or `--component <name>` |
| ftl-holster not loading | Check `STORYBOOK_FIGMA_TOKEN` is set in `.env` |
| gh CLI not authenticated | Run `gh auth login` |
| Component has no FigmaComparison | Skip component with warning |
| Keyboard shortcuts not working | Click buttons directly via snapshot refs |

## Component Map

Components with FigmaComparison stories:

| Component | Story ID | Figma Node |
|-----------|----------|------------|
| button | `components-button--figma-comparison` | 20-27 |
| checkbox | `components-checkbox--figma-comparison` | 236:41408 |
| radio | `components-radio-button--figma-comparison` | 236:41398 |
| switch | `components-switch--figma-comparison` | 236:41353 |
| toggle-button | `components-toggle-button--figma-comparison` | 309:3542 |
| icon-button | `components-icon-button--figma-comparison` | 240:1391 |
| menu-bar | `components-menu-bar--figma-comparison` | 48:2135 |

## Notes

- Screenshots are committed to `docs/pr-screenshots/` for GitHub to render in PRs
- Playwright MCP restricts output to `.playwright-mcp/`, so copy files after capture
- Use raw GitHub URLs in PR descriptions (relative paths don't render)
- The `ftl-holster` component provides keyboard shortcuts (T/O/S) but clicking buttons is more reliable
- Always use `fullPage: true` for screenshots - Side-by-Side layout is vertical
