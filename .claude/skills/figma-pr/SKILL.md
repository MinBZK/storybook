---
name: figma-pr
description: Create a PR with FigmaComparison screenshots for changed components
user-invocable: true
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

This auto-assigns a port (6006-6020) and registers in `~/.claude/storybook-instances.json`.

**Read the registry to get the assigned port:**

```javascript
// Registry file: ~/.claude/storybook-instances.json
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
   - **element**: Use the `ftl-holster` element ref from snapshot
   - **ref**: The ref of the `ftl-holster` element
   - Do NOT use fullPage - screenshot only the ftl-holster element (the red bordered box)
8. **Click** the "Overlay" button using `mcp__playwright__browser_click`
9. Wait briefly: `mcp__playwright__browser_wait_for` with time: 1
10. **Set overlay opacity to 50%** for half-half comparison:
    - Take a new snapshot to find the opacity slider ref
    - The slider is a `<input type="range">` element in the ftl-holster controls
    - Use `mcp__playwright__browser_evaluate` to set slider value to 50:
      ```javascript
      function: "(slider) => { slider.value = 50; slider.dispatchEvent(new Event('input', { bubbles: true })); }",
      ref: "{slider-ref}",
      element: "Opacity slider"
      ```
11. Wait for opacity change: `mcp__playwright__browser_wait_for` with time: 0.5
12. Take Overlay screenshot: `mcp__playwright__browser_take_screenshot` with:
    - filename: `{name}-overlay.png`
    - **element**: Use the `ftl-holster` element ref from snapshot
    - **ref**: The ref of the `ftl-holster` element
    - Do NOT use fullPage - screenshot only the ftl-holster element

**Important: 50% opacity for overlay screenshots**

Overlay screenshots MUST be taken at 50% opacity to show a half-half blend of Code and Figma. This makes differences easier to spot while still being able to see both layers clearly.

**Important: Element Screenshots (not fullPage)**

Always screenshot the `ftl-holster` element directly, NOT fullPage. This gives clean screenshots of just the comparison area without surrounding whitespace and Storybook UI.

**Important: Playwright MCP output directory**

Screenshots are saved to `.playwright-mcp/` directory (restricted by Playwright MCP).

### Step 4: Upload Screenshots to 0x0.st

Upload each screenshot to 0x0.st (no authentication required):

```bash
# Upload and capture the returned URL
SIDE_BY_SIDE_URL=$(curl -s -F "file=@.playwright-mcp/{name}-side-by-side.png" https://0x0.st)
OVERLAY_URL=$(curl -s -F "file=@.playwright-mcp/{name}-overlay.png" https://0x0.st)
```

Store the URLs for each component to use in the PR body.

**0x0.st details:**
- No authentication required
- Returns direct image URL (e.g., `https://0x0.st/PKCB.png`)
- Retention: 30 days to 1 year (small files last longer)
- No view limits

### Step 5: Create or Update Pull Request

**Check if PR already exists:**

```bash
gh pr list --head $(git branch --show-current) --json number,url
```

**Build the PR body with a screenshot table:**

Use the 0x0.st URLs from Step 4:

```markdown
## Summary

Visual updates for {N} component(s) with FigmaComparison verification.

## Screenshots

{For each component:}

### {Component Name}

| Side-by-Side | Overlay |
|--------------|---------|
| ![side-by-side]({SIDE_BY_SIDE_URL}) | ![overlay]({OVERLAY_URL}) |

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
| Figma designs not loading in worktree | Copy `.env` from main repo to worktree (see below) |
| gh CLI not authenticated | Run `gh auth login` |
| Component has no FigmaComparison | Use fallback: screenshot Default story (see below) |
| Keyboard shortcuts not working | Click buttons directly via snapshot refs |
| 0x0.st upload fails | Retry or use alternative host |

### Worktree .env Issue

When working in a git worktree, the `.env` file is not included by default. Figma designs won't load in Storybook without it. Solution:

```bash
# Copy .env from main repository to worktree
cp /path/to/main/repo/.env /path/to/worktree/.env
```

Or relative from the worktree:
```bash
cp ../../.env .
```

## Fallback: Components zonder FigmaComparison

Als een component GEEN FigmaComparison story heeft, maak dan een screenshot van de **Default** story:

**URL Pattern:**
```
http://localhost:{port}/iframe.html?viewMode=story&id=components-{name}--default
```

**Screenshot Process:**
1. Navigate to Default story URL
2. Wait for component to load: `mcp__playwright__browser_wait_for` with time: 2
3. Take snapshot: `mcp__playwright__browser_snapshot`
4. Find the component element (usually `rr-{name}` or wrapper div)
5. Take element screenshot: `mcp__playwright__browser_take_screenshot` with:
   - filename: `{name}-default.png`
   - element: The component or its container
   - ref: The ref from snapshot

**PR body voor components zonder FigmaComparison:**

```markdown
### {Component Name}

> ⚠️ Geen FigmaComparison story - alleen Default screenshot

| Default |
|---------|
| ![default]({DEFAULT_URL}) |
```

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

- Screenshots are uploaded to 0x0.st (external hosting) - not committed to repo
- Playwright MCP restricts output to `.playwright-mcp/`
- 0x0.st URLs work directly in GitHub PR descriptions
- The `ftl-holster` component provides keyboard shortcuts (T/O/S) but clicking buttons is more reliable
- Always screenshot the `ftl-holster` element directly (NOT fullPage) for clean, focused screenshots
- 0x0.st retention: 30 days minimum, up to 1 year for small files
