---
name: pixel-perfect
description: Make a component pixel-perfect compared to Figma design
user-invocable: true
argument-hint: <component-name>
---

Make component **$ARGUMENTS** pixel-perfect compared to the Figma design.

## WORKFLOW OVERVIEW

This command uses a subagent architecture with critical review:

1. **Main agent**: Initialization (identify component, start Storybook)
2. **Main agent**: Fetch Figma data and extract style values (ONCE)
3. **Main agent**: Spawn verification subagent with Figma values as context
4. **Subagent**: Execute verification cycle (compare, fix, screenshot - NO Figma fetch)
5. **Main agent**: Critical review of subagent result
6. **On issues**: Retry with feedback (max 3 iterations) - Figma values stay the same
7. **Report** final result

### Iteration limits

- Subagent: max 3 verification cycles per run
- Critical review retries: max 3 iterations
- Total maximum: 9 verification cycles

### Optimization: Figma data caching

Figma data is fetched **once** by the main agent and passed to all subagents. This prevents:
- Rate limit issues with Figma MCP
- Unnecessary API calls
- Inconsistent data between iterations

---

## STEP 1: INITIALIZATION

### 1.1 Identify component

Determine the component name and location:

```
Input: "button" or "toggle-button"
Story ID: components-{name}--figma-comparison
Component: src/components/{name}/rr-{name}.ts
Stories: src/components/{name}/rr-{name}.stories.js
```

### 1.2 Verify FigmaComparison story exists

```bash
grep -l "FigmaComparison" src/components/{name}/rr-{name}.stories.js
```

If not found: STOP with error message "Component has no FigmaComparison story"

### 1.3 Get Figma Node ID

Read the stories file and extract the node ID from the `ftl-holster` element:

```javascript
// Find: <ftl-holster node="309:3542" ...>
// Or: <ftl-holster node="20-27" ...>
```

---

## STEP 2: START STORYBOOK

### 2.1 Check if Storybook is already running

```bash
npm run sb:status
```

### 2.2 Start if needed

```bash
npm run sb:start
```

### 2.3 Read port from registry

```bash
cat ~/.claude/storybook-instances.json
```

Find entry where `path` matches current working directory.

### 2.4 Wait for Storybook to be ready

```bash
npx wait-on http://localhost:{port} --timeout 60000
```

---

## STEP 3: FETCH FIGMA DATA

### 3.1 Use Figma MCP tool

```
mcp__figma-with-token__get_figma_data(
  fileKey: "5DyHMXUNVxbgH7ZjhQxPZe",
  nodeId: "{extracted-node-id}"
)
```

### 3.2 Analyze layout structure

Extract from the response:

| Property | Where to find | Meaning |
|----------|---------------|---------|
| Layout mode | `globalVars.styles.layout_XXX.mode` | `"column"` or `"row"` |
| Gap | `globalVars.styles.layout_XXX.gap` | Space between items in px |
| Padding | `globalVars.styles.layout_XXX.padding` | Container padding in px |
| Sizing | `globalVars.styles.layout_XXX.sizing` | `"hug"` or `"fixed"` |
| Dimensions | `globalVars.styles.layout_XXX.dimensions` | Width/height for fixed |

### 3.3 Extract variants

Analyze the children of the component set:
- Each variant has properties (size, state, selected, disabled)
- Note the **order** of variants
- Note **exact dimensions** of each variant

### 3.4 Check for absolute positioning

If nodes have `position: "absolute"`:
- Note x/y coordinates
- Use absolute positioning in the story

---

## STEP 3.5: STYLE EXTRACTION (Automated Checks)

> **See:** [style-extraction.md](./style-extraction.md) for the full reference on:
> - Figma style value extraction
> - Color conversion utility (RGBA 0-1 → CSS)
> - Browser computed styles extraction with Playwright
> - Comparison tolerances per property

---

## STEP 4: VERIFICATION CYCLE (max 3 iterations per subagent)

### For each iteration:

### 4.1 Read current FigmaComparison story

```
Read: src/components/{name}/rr-{name}.stories.js
```

Extract the current HTML structure from the FigmaComparison function.

### 4.2 Open story in Playwright

```
mcp__playwright__browser_navigate(
  url: "http://localhost:{port}/iframe.html?viewMode=story&id=components-{name}--figma-comparison"
)
```

### 4.3 Wait for ftl-holster to load

```
mcp__playwright__browser_wait_for(time: 3)
```

### 4.4 Take snapshot

```
mcp__playwright__browser_snapshot()
```

Verify that `ftl-holster` is present with mode buttons.

### 4.5 Activate Overlay mode

Click on "Overlay" button (more reliable than keyboard shortcut):

```
mcp__playwright__browser_click(
  element: "Overlay button",
  ref: "{ref-from-snapshot}"
)
```

### 4.6 Set overlay opacity to 50%

**IMPORTANT:** Overlay screenshots must ALWAYS be taken at 50% opacity for a half-half comparison.

1. Take a new snapshot to find the opacity slider ref
2. The slider is an `<input type="range">` element with range 0.0-1.0
3. Set the slider to 50% (value 0.5, NOT 50!):

```
mcp__playwright__browser_evaluate(
  function: "(slider) => { slider.value = 0.5; slider.dispatchEvent(new Event('input', { bubbles: true })); }",
  ref: "{slider-ref}",
  element: "Opacity slider"
)
```

4. Wait briefly for the opacity change:

```
mcp__playwright__browser_wait_for(time: 0.5)
```

**Why 50% opacity?** At 50% opacity you see a half-half blend of Code and Figma. This makes it easier to:
- Spot deviations (they don't "shimmer" due to extreme transparency)
- See both layers clearly
- Detect subtle color and position differences

### 4.7 Take screenshot in Overlay mode

Screenshot only the `ftl-holster` element (the red box), NOT fullPage.

**Note:** Playwright saves screenshots to `.playwright-mcp/` in the folder where Claude Code was started (main repo), NOT the current worktree.

```
mcp__playwright__browser_take_screenshot(
  filename: "{name}-overlay-cycle-{n}.png",
  element: "ftl-holster comparison container",
  ref: "{ftl-holster-ref-from-snapshot}"
)
```

**Important:** Always use element screenshot of the `ftl-holster`, not fullPage. This gives clean screenshots without surrounding whitespace and Storybook UI.

### 4.8 Analyze with automated checks + visual inspection

Perform both **automated comparisons** and **visual checks**:

| Check | Automated comparison | Visual check |
|-------|---------------------|--------------|
| **Colors** | Compare Figma fill/stroke vs computed background/border/color | Check overlay for color bleeding |
| **Font sizes** | Compare Figma fontSize vs computed font-size | Check text alignment in overlay |
| **Font weight** | Compare Figma fontWeight vs computed font-weight | Check text boldness |
| **Line height** | Compare Figma lineHeightPx vs computed line-height | Check vertical text alignment |
| **Line thickness** | Compare Figma strokeWeight vs computed border-width | Check border crispness in overlay |
| **Border radius** | Compare Figma cornerRadius vs computed border-radius | Check corner smoothness |
| **Padding** | Compare all 4 Figma padding values vs computed padding | Check content positioning |
| **Min dimensions** | Compare Figma minWidth/Height vs computed min-width/height | Check sizing constraints |
| **Box shadows** | Compare Figma DROP_SHADOW effect vs computed box-shadow | Check shadow visibility/blur |
| **Positioning** | n/a | Are components in the same place as Figma? |
| **Variants** | n/a | Are all Figma variants present? No extras? |
| **Sizing** | n/a | Is the size of each component correct? |
| **Spacing/Gap** | n/a | Is gap between elements correct? |

**Report deviations in table format:**

```markdown
| Property | Figma value | Computed value | Status |
|----------|-------------|----------------|--------|
| fontSize | 14px | 14px | ✅ |
| backgroundColor | rgba(15, 23, 42, 1) | rgb(15, 23, 42) | ✅ |
| paddingTop | 8px | 10px | ❌ -2px |
```

### 4.9 On deviations: Identify fix

**Positioning deviation:**
- Check if layout mode (column/row) is correct
- Check if gap value is correct
- Check if padding is correct
- Check if absolute positioning is needed

**Variants deviation:**
- Compare Figma variants with story variants
- Add missing ones, remove extras

**Styling deviation:**
- Identify which CSS property deviates
- Find correct token in `dist/css/tokens.css`
- Adjust component or story

**Token deviation (IMPORTANT):**
If a deviation is caused by an **incorrect token value** (token doesn't match Figma):
- Do **NOT** override the token with a hardcoded value
- Do **NOT** modify the token file directly (it's generated from Figma)
- Instead: **Report in the PR** that the token needs to be updated in Figma
- The component should use the token as-is, even if it doesn't match visually yet
- Format: "TODO: Figma token `{token-name}` should be `{correct-value}` (currently `{wrong-value}`)"

### 4.10 Modify files

**Adjust story (layout/variants):**
```
Edit: src/components/{name}/rr-{name}.stories.js
```

**Adjust component (styling):**
```
Edit: src/components/{name}/rr-{name}.ts
```

### 4.11 Wait for hot reload

```
mcp__playwright__browser_wait_for(time: 2)
```

### 4.12 Repeat from step 4.2

---

## STEP 5: SUBAGENT WORKFLOW

### 5.1 Spawn verification subagent

Use the Task tool to spawn a subagent. **Important:** Pass the Figma values as context - the subagent does NOT fetch Figma data.

```javascript
Task({
  subagent_type: "general-purpose",
  description: "Pixel-perfect verification {name}",
  prompt: `Perform pixel-perfect verification for component {name}.

Context:
- Storybook running on port {port}
- Story URL: http://localhost:{port}/iframe.html?viewMode=story&id=components-{name}--figma-comparison
- Component file: src/components/{name}/rr-{name}.ts
- Stories file: src/components/{name}/rr-{name}.stories.js

## Figma reference values (DO NOT fetch again):

Layout:
- Mode: {layout.mode}
- Gap: {layout.gap}px
- Padding: {layout.padding}

Variants: {variantList}

Style values per variant:
{for each variant}
### {variantName}
- backgroundColor: {figmaBackgroundColor}
- color: {figmaTextColor}
- borderColor: {figmaBorderColor}
- fontSize: {figmaFontSize}px
- fontWeight: {figmaFontWeight}
- lineHeight: {figmaLineHeight}px
- borderWidth: {figmaStrokeWeight}px
- borderRadius: {figmaBorderRadius}px
- paddingTop: {figmaPaddingTop}px
- paddingRight: {figmaPaddingRight}px
- paddingBottom: {figmaPaddingBottom}px
- paddingLeft: {figmaPaddingLeft}px
- minHeight: {figmaMinHeight}px
- minWidth: {figmaMinWidth}px
{/for each variant}

## Task:

1. Open story in Playwright
2. Extract computed styles with browser_evaluate
3. Compare against above Figma values (tolerance: exact for colors, ±1px for dimensions)
4. Take overlay screenshot
5. Analyze visually: positioning, variants, sizing, spacing
6. On deviations: **consult [known-issues.md](./known-issues.md)** for known fixes
7. Adjust component/story if needed
8. Report result with comparison table

## For unknown issues:

If you encounter an issue that is NOT in the Known Issues Database and was significant to solve:
- Document it in your final report under "## Newly discovered issue"
- Use format: Symptom, Root cause, Fix, Prevention
- Main agent will add this to the database

## IMPORTANT - Changes tracking:

For EVERY Edit tool call, note:
- File + line number
- Old value → new value
- Reason (which Figma value this fixes)

Example:
\`src/components/button/rr-button.ts:45\`: \`padding: 8px\` → \`padding: 8px 8px 6px 8px\` (Figma paddingBottom=6px)

Report ALL changes at the end, even if there were none.

Max 3 verification cycles. Report after each cycle.
{previousFeedback}`
})
```

### 5.2 Critical review checklist

> **⚠️ IMPORTANT: Be VERY critical!**
>
> Pixel-perfect verification is a difficult task that often goes wrong. Subagents:
> - Regularly forget to check properties
> - Sometimes report "passed" while there are deviations
> - Miss asymmetric padding (top ≠ bottom)
> - Don't look at all variants
> - Make superficial visual analyses
>
> **Do NOT trust the result blindly. Verify EVERY claim.**

After receiving subagent result, check **critically**:

**Automated checks (VERIFY these were actually performed):**
- [ ] Color comparisons: Is there a concrete Figma value AND computed value in the table?
- [ ] Font size: Is the exact px value compared (not "looks correct")?
- [ ] Font weight: Is the numeric value compared (400, 500, 600, etc.)?
- [ ] Line height: Is the px value compared?
- [ ] Border/stroke: Is strokeWeight compared with border-width?
- [ ] Padding: Are ALL 4 sides checked separately? (top, right, bottom, left)
- [ ] Min-dimensions: Are minHeight and minWidth checked?
- [ ] Is the comparison table COMPLETE with concrete values (no "n/a" or "correct")?

**Visual checks (LOOK at the screenshot yourself):**
- [ ] Count the variants: Does the number in the story match Figma?
- [ ] Check positioning: Are items in the same place in overlay?
- [ ] Check sizing: Are there visible size differences?
- [ ] Check spacing: Is the gap between elements consistent?
- [ ] Check the overlay: Are there ANY visible pixel differences?
- [ ] Check Edit tool calls: Are changes syntactically correctly applied?

**Changes tracking:**
- [ ] Did subagent report a changes list?
- [ ] Does each change contain: file, line number, old→new value?
- [ ] Is the reason for each change mentioned (which Figma value)?
- [ ] If no changes: is "no changes needed" explicitly stated?

**Red flags (trigger retry):**
- Subagent says "everything looks good" without concrete comparisons
- Comparison table misses properties or has vague values
- No overlay screenshot taken
- Padding only mentioned as "8px" instead of all 4 sides separately
- "Visually correct" without specific analysis per variant

**Check for new issues:**
- [ ] Did subagent report a "Newly discovered issue" section?
- [ ] If so: is the issue valuable enough to add to the database?
  - Did it occur multiple times?
  - Was it non-trivial to diagnose?
  - Does it have a non-obvious root cause?
- [ ] If so: add to Known Issues Database after successful verification

### 5.3 Retry with feedback

If critical review finds issues, spawn new subagent with **specific, actionable feedback**.

**Feedback template:**

```markdown
## Previous verification was INCOMPLETE

### Missing checks:
- paddingBottom: You only reported paddingTop. Check ALL 4 sides.
- fontWeight: Missing in comparison table. Figma value is {x}, check computed.
- borderRadius: No concrete value mentioned, only "correct".

### Errors in analysis:
- You said "visually correct" but the overlay shows clear offset at variant X.
- Variant "disabled" is missing in your analysis but is in Figma.

### Concrete task for this iteration:
1. Extract computed styles for EACH variant separately
2. Fill comparison table with CONCRETE px/color values
3. Compare padding per side: top={x}px, right={y}px, bottom={z}px, left={w}px
4. Take new overlay screenshot AFTER any fixes
```

**Be specific:** Name exact property names, expected values, and which variant it concerns. Vague feedback like "check better" doesn't help.

### 5.4 Max retries

- Maximum 3 retry iterations with feedback
- If still issues after 3 retries: report and ask for human review

---

## STEP 6: RESULT

### Changes tracking

Keep a list of all adjustments during execution:

```markdown
## Changes made:

### Component (src/components/{name}/rr-{name}.ts)
1. **Line 45**: `padding: 8px` → `padding: 8px 8px 6px 8px` (asymmetric padding)
2. **Line 52**: `border-radius: 8px` → `border-radius: 6px` (was incorrect)
3. **Line 67**: Added `min-height: 32px`

### Stories (src/components/{name}/rr-{name}.stories.js)
1. **Line 120**: `gap: 8px` → `gap: 12px` (now matches Figma layout)
2. **Line 135**: Variant "disabled" added to grid

### No changes needed
(If everything was already correct)
```

**Instruction to subagent:** After each Edit tool call, note:
- Filename and line number
- Old value → new value
- Reason for change

### On success (pixel-perfect):

```
✅ Component {name} is pixel-perfect!

Iterations needed: {n}

## Automated checks: all passed
| Property | Figma | Computed | Status |
|----------|-------|----------|--------|
| fontSize | 14px | 14px | ✅ |
| paddingTop | 8px | 8px | ✅ |
| paddingBottom | 6px | 6px | ✅ |
| ... | ... | ... | ✅ |

## Visual checks: all passed
- ✅ All variants present (5/5)
- ✅ Positioning correct
- ✅ Sizing correct
- ✅ Spacing correct
- ✅ Overlay screenshot clean

## Changes made:

### src/components/{name}/rr-{name}.ts
- Line 45: `padding: 8px` → `padding: 8px 8px 6px 8px`
- Line 52: `border-radius: 8px` → `border-radius: 6px`

### src/components/{name}/rr-{name}.stories.js
- Line 120: `gap: 8px` → `gap: 12px`
```

### On success without changes:

```
✅ Component {name} is pixel-perfect!

Iterations needed: 1

## Automated checks: all passed
[table]

## Visual checks: all passed
[list]

## Changes made:
None - component was already pixel-perfect.
```

### On failure (max iterations reached):

```
❌ Component {name} is NOT pixel-perfect after {n} iterations.

## Remaining deviations (automated):
| Property | Figma | Computed | Difference |
|----------|-------|----------|------------|
| paddingTop | 8px | 10px | -2px |
| ... | ... | ... | ... |

## Remaining deviations (visual):
- ❌ Gap between rows deviates
- ❌ Variant "disabled" missing

## Changes made (but insufficient):

### src/components/{name}/rr-{name}.ts
- Line 45: `padding: 8px` → `padding: 8px 8px 6px 8px`

## Suggestions:
- paddingTop token possibly incorrect in design tokens
- Gap value not available as token, consider hardcoding
```

### Database update (if new issues discovered):

If the subagent reported a "Newly discovered issue" that is valuable:

1. Add the issue to [known-issues.md](./known-issues.md)
2. Use the standard format (Symptom, Root cause, Diagnostics, Fix, Prevention)
3. Place it in the right location (sort by frequency/relevance)
4. Confirm the addition in the final report:

```
## Database updated:
- New issue added: "[Issue name]"
- Reason: [Why this is valuable for future verifications]
```

---

## LAYOUT MATCHING RULES

### Figma uses GRID layout:

Generate HTML with CSS Grid:

```html
<div style="
  display: grid;
  grid-template-columns: repeat({cols}, auto);
  gap: {gap}px;
  padding: {padding}px;
">
```

### Figma uses FLEX layout (column):

```html
<div style="
  display: flex;
  flex-direction: column;
  gap: {gap}px;
  padding: {padding}px;
  align-items: flex-start;
">
```

### Figma uses FLEX layout (row):

```html
<div style="
  display: flex;
  flex-direction: row;
  gap: {gap}px;
  padding: {padding}px;
  align-items: center;
">
```

### Figma uses ABSOLUTE positioning:

```html
<div style="
  position: relative;
  width: {width}px;
  height: {height}px;
  background: #ffffff;
">
  <rr-{name} style="position: absolute; left: {x}px; top: {y}px;">...</rr-{name}>
  ...
</div>
```

---

## VARIANT MAPPING

### Figma variant properties → HTML attributes

| Figma Property | Component Attribute |
|----------------|---------------------|
| `size=md` / `size=lg` | `size="m"` / `size="s"` |
| `is-selected=true` | `selected` |
| `is-disabled=true` | `disabled` |
| `is-checked=true` | `checked` |
| `is-hovered=true` | Skip (hover state) |
| `is-focused=true` | Skip (focus state) |
| `variant=...` | `variant="..."` |

**NOTE:** Hover and focus states are NOT rendered in the FigmaComparison story. These states are only shown visually, not as separate components.

---

## KNOWN ISSUES DATABASE

> **See:** [known-issues.md](./known-issues.md) for the full database with:
> - Known issues and their fixes (asymmetric padding, font weight, border sizing, etc.)
> - Common fixes quick reference
> - Instructions for adding new issues

---

## ERROR HANDLING

| Error | Solution |
|-------|----------|
| FigmaComparison not found | Create story first with `/component` |
| Storybook won't start | Check `npm run sb:status`, possible port conflict |
| ftl-holster not loading | Check `STORYBOOK_FIGMA_TOKEN` is set in `.env` |
| Figma design not loading in worktree | Copy `.env` from main to worktree (see below) |
| Figma MCP rate limit | Wait 60-120 seconds |
| Playwright crash | Close browser: `mcp__playwright__browser_close()` |
| browser_evaluate fails | Check shadowRoot selector, element must be in DOM |
| Screenshots not in worktree | Playwright saves to `.playwright-mcp/` in main repo where Claude started, not in worktree |

### Worktree .env issue

When working in a git worktree, it doesn't contain an `.env` file by default. Figma designs won't load in Storybook without it. Solution:

```bash
# Copy .env from main repository to worktree
cp /path/to/main/repo/.env /path/to/worktree/.env
```

Or relative from the worktree:
```bash
cp ../../.env .
```

---

## PIXEL-PERFECT CHECKLIST

### Automated checks (must pass 100%):

- [ ] Colors match (fill → background, stroke → border)
- [ ] Font size matches exactly
- [ ] Font weight matches exactly
- [ ] Line height matches (±1px)
- [ ] Border/stroke width matches exactly
- [ ] Border radius matches (±1px)
- [ ] Padding matches all 4 sides (±1px)
- [ ] Min-width/height matches (±1px)
- [ ] Box-shadow matches (offset, blur, spread, color)

### Visual checks (must pass 100%):

- [ ] Layout mode matches Figma (column/row/grid/absolute)
- [ ] Gap matches Figma exactly
- [ ] Padding matches Figma exactly (including asymmetric!)
- [ ] All Figma variants present
- [ ] No extra variants added
- [ ] Variant order matches Figma
- [ ] Container dimensions match Figma
- [ ] Component sizing correct per variant
- [ ] Colors match visually
- [ ] Typography matches visually
- [ ] Border radius matches visually
- [ ] No visible pixel differences in overlay mode
