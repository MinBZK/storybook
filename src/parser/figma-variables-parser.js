/**
 * Custom parser for Figma variables2json plugin format
 * Transforms to Style Dictionary DTCG format
 */

export const figmaVariablesParser = {
  name: 'figma-variables',
  pattern: /\.json$/,

  parser: ({ contents, filePath }) => {
    const figmaTokens = JSON.parse(contents);
    const result = {};

    // Process all collections
    for (const collection of figmaTokens.collections || []) {
      for (const mode of collection.modes || []) {
        for (const variable of mode.variables || []) {
          const pathParts = variable.name.split('/');
          let current = result;

          // Navigate/create nested structure
          for (let i = 0; i < pathParts.length - 1; i++) {
            const part = pathParts[i];
            if (!current[part]) {
              current[part] = {};
            }
            current = current[part];
          }

          const tokenName = pathParts[pathParts.length - 1];
          const token = {
            $type: mapType(variable.type, variable.name),
          };

          // Handle alias vs direct value
          if (variable.isAlias && typeof variable.value === 'object' && variable.value.name) {
            // Convert alias reference to Style Dictionary format
            const aliasPath = variable.value.name.split('/').join('.');
            token.$value = `{${aliasPath}}`;
          } else {
            token.$value = transformValue(variable.type, variable.value, variable.name);
          }

          current[tokenName] = token;
        }
      }
    }

    return result;
  }
};

/**
 * Map Figma variable types to DTCG types
 */
function mapType(figmaType, name) {
  const typeMap = {
    'color': 'color',
    'number': 'number',
    'string': 'string',
    'typography': 'typography',
    'effect': 'shadow'
  };

  // Infer more specific types from name patterns
  if (figmaType === 'number') {
    if (name.includes('space') || name.includes('padding') || name.includes('margin')) {
      return 'dimension';
    }
    if (name.includes('corner-radius') || name.includes('border-radius')) {
      return 'dimension';
    }
    if (name.includes('font-size')) {
      return 'dimension';
    }
    if (name.includes('border-thickness') || name.includes('thickness')) {
      return 'dimension';
    }
    if (name.includes('min-size') || name.includes('area') || name.includes('breakpoint')) {
      return 'dimension';
    }
  }

  if (figmaType === 'string') {
    if (name.includes('font-family')) {
      return 'fontFamily';
    }
    if (name.includes('font-weight')) {
      return 'fontWeight';
    }
  }

  return typeMap[figmaType] || figmaType;
}

/**
 * Transform values based on type
 */
function transformValue(type, value, name) {
  switch (type) {
    case 'color':
      return value; // Keep hex colors as-is

    case 'number':
      return value;

    case 'string':
      return value;

    case 'typography':
      return transformTypography(value);

    case 'effect':
      return transformEffect(value);

    default:
      return value;
  }
}

/**
 * Transform Figma typography to DTCG format
 */
function transformTypography(value) {
  if (!value || typeof value !== 'object') return value;

  const lineHeight = value.lineHeightUnit === 'PERCENT'
    ? value.lineHeight / 100
    : value.lineHeight;

  return {
    fontFamily: value.fontFamily,
    fontSize: `${value.fontSize}px`,
    fontWeight: mapFontWeight(value.fontWeight),
    lineHeight: lineHeight,
    letterSpacing: value.letterSpacing === 0 ? 'normal' : `${value.letterSpacing}%`,
    textTransform: value.textCase === 'ORIGINAL' ? 'none' : value.textCase?.toLowerCase(),
    textDecoration: value.textDecoration === 'NONE' ? 'none' : value.textDecoration?.toLowerCase()
  };
}

/**
 * Map Figma font weight names to CSS values
 */
function mapFontWeight(weight) {
  const weightMap = {
    'Thin': '100',
    'ExtraLight': '200',
    'Light': '300',
    'Regular': '400',
    'Medium': '500',
    'SemiBold': '600',
    'Bold': '700',
    'ExtraBold': '800',
    'Black': '900'
  };
  return weightMap[weight] || weight;
}

/**
 * Transform Figma effects to CSS box-shadow format
 */
function transformEffect(value) {
  if (!value?.effects) return value;

  return value.effects
    .filter(e => e.type === 'DROP_SHADOW')
    .map(e => {
      const { r, g, b, a } = e.color;
      const rgba = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
      return `${e.offset.x}px ${e.offset.y}px ${e.radius}px ${e.spread}px ${rgba}`;
    })
    .join(', ');
}
