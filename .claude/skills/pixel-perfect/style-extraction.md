# Style Extraction Reference

Deze referentie beschrijft hoe style waarden uit Figma geëxtraheerd en vergeleken worden met browser computed styles.

## Figma Style Waarden

Uit de Figma MCP response, extraheer:

| Property | Figma locatie | Beschrijving |
|----------|---------------|--------------|
| **Colors** | `fills[].color` (RGBA 0-1) | Achtergrond kleuren |
| **Stroke colors** | `strokes[].color` | Border kleuren |
| **Font size** | `style.fontSize` | Font grootte in px |
| **Font weight** | `style.fontWeight` | Font weight numeriek |
| **Line height** | `style.lineHeightPx` | Line height in px |
| **Stroke weight** | `strokeWeight` | Border dikte in px |
| **Stroke align** | `strokeAlign` | `"INSIDE"`, `"OUTSIDE"`, `"CENTER"` |
| **Border radius** | `cornerRadius` | Uniform radius |
| **Border radius (asymm)** | `rectangleCornerRadii` | Array [TL, TR, BR, BL] |
| **Padding** | `paddingTop/Right/Bottom/Left` | Padding per zijde |
| **Min dimensions** | `minWidth`, `minHeight` | Minimum afmetingen |
| **Box shadow** | `effects[]` waar `type === "DROP_SHADOW"` | Shadow effect |

## Color Conversion Utility

Converteer Figma RGBA (0-1 range) naar CSS:

```javascript
// Figma RGBA (0-1) naar CSS rgba()
function figmaToCSS(r, g, b, a) {
  return `rgba(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)}, ${a})`;
}

// Voorbeeld: Figma { r: 0.059, g: 0.090, b: 0.165, a: 1 }
// Wordt: rgba(15, 23, 42, 1) oftewel #0f172a
```

## Browser Computed Styles Extraheren

Gebruik Playwright om computed styles te extraheren:

```javascript
mcp__playwright__browser_evaluate({
  function: `() => {
    const el = document.querySelector('rr-{name}').shadowRoot.querySelector('.{main-class}');
    const styles = getComputedStyle(el);
    return {
      // Colors
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      borderColor: styles.borderColor,
      // Typography
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      lineHeight: styles.lineHeight,
      // Borders & radius
      borderWidth: styles.borderWidth,
      borderRadius: styles.borderRadius,
      // Spacing
      paddingTop: styles.paddingTop,
      paddingRight: styles.paddingRight,
      paddingBottom: styles.paddingBottom,
      paddingLeft: styles.paddingLeft,
      // Dimensions
      minHeight: styles.minHeight,
      minWidth: styles.minWidth,
      // Effects
      boxShadow: styles.boxShadow
    };
  }`
})
```

## Vergelijkingstoleranties

| Property | Tolerantie | Vergelijkingsmethode |
|----------|------------|----------------------|
| Colors | Exact | Converteer Figma RGBA naar CSS, vergelijk strings |
| Font size | 0px | Figma px === computed px |
| Font weight | Exact | Figma value === computed value |
| Line height | 1px | Figma lineHeightPx vs computed (parse px value) |
| Border width | 0px | Figma strokeWeight === parsed border-width |
| Border radius | 1px | Figma cornerRadius vs parsed border-radius |
| Padding | 1px | Vergelijk alle 4 zijdes apart (asymmetrisch!) |
| Min dimensions | 1px | Figma minWidth/Height vs computed |
| Box shadow | Visual | Vergelijk offset, blur, spread, color |
