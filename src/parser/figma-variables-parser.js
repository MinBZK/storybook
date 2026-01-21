/**
 * Custom parser for Figma variables2json plugin format
 * Transforms to Style Dictionary DTCG format
 */

import { FONT_WEIGHT_MAP } from './font-weights.js';

export const figmaVariablesParser = {
  name: 'figma-variables',
  pattern: /\.json$/,

  parser: ({ contents, _filePath }) => {
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
  },
};

/**
 * Map Figma variable types to DTCG types
 */
function mapType(figmaType, name) {
  const typeMap = {
    color: 'color',
    number: 'number',
    string: 'string',
    typography: 'typography',
    effect: 'shadow',
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
function transformValue(type, value, _name) {
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

  const lineHeight = value.lineHeightUnit === 'PERCENT' ? value.lineHeight / 100 : value.lineHeight;

  return {
    fontFamily: value.fontFamily,
    fontSize: `${value.fontSize}px`,
    fontWeight: mapFontWeight(value.fontWeight),
    lineHeight: lineHeight,
    letterSpacing: value.letterSpacing === 0 ? 'normal' : `${value.letterSpacing}%`,
    textTransform: value.textCase === 'ORIGINAL' ? 'none' : value.textCase?.toLowerCase(),
    textDecoration: value.textDecoration === 'NONE' ? 'none' : value.textDecoration?.toLowerCase(),
  };
}

/**
 * Map Figma font weight names to CSS values
 * Handles both string values (from Figma text styles) and numeric values
 * Throws on invalid input to fail fast during build
 */
function mapFontWeight(weight) {
  if (weight === undefined || weight === null) {
    throw new Error('fontWeight is required in typography token but was undefined');
  }

  if (typeof weight === 'string') {
    const mapped = FONT_WEIGHT_MAP[weight];
    if (mapped === undefined) {
      throw new Error(`Unknown fontWeight value: "${weight}"`);
    }
    return mapped;
  }

  if (typeof weight === 'number') {
    return weight;
  }

  throw new Error(`Invalid fontWeight type: ${typeof weight}`);
}

/**
 * Transform Figma effects to CSS box-shadow format
 */
function transformEffect(value) {
  if (!value?.effects) return value;

  return value.effects
    .filter((e) => e.type === 'DROP_SHADOW')
    .map((e) => {
      const { r, g, b, a } = e.color;
      const rgba = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
      return `${e.offset.x}px ${e.offset.y}px ${e.radius}px ${e.spread}px ${rgba}`;
    })
    .join(', ');
}
