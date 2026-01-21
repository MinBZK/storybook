import StyleDictionary from 'style-dictionary';
import { figmaVariablesParser } from './src/parser/figma-variables-parser.js';
import { FONT_WEIGHT_MAP } from './src/parser/font-weights.js';

// Register custom parser for Figma variables2json format
StyleDictionary.registerParser(figmaVariablesParser);

// Custom transform for dimension values (number to px)
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  filter: (token) => {
    return token.$type === 'dimension' && typeof token.$value === 'number';
  },
  transform: (token) => {
    return `${token.$value}px`;
  },
});

// Custom transform for number values that should stay as numbers
StyleDictionary.registerTransform({
  name: 'number/value',
  type: 'value',
  filter: (token) => {
    return token.$type === 'number' && typeof token.$value === 'number';
  },
  transform: (token) => {
    // Keep opacity, line-height etc as plain numbers
    return token.$value;
  },
});

// Custom transform for fontWeight tokens - convert string names to numeric values
StyleDictionary.registerTransform({
  name: 'fontWeight/number',
  type: 'value',
  filter: (token) => token.$type === 'fontWeight',
  transform: (token) => {
    if (typeof token.$value === 'string') {
      const mapped = FONT_WEIGHT_MAP[token.$value];
      if (mapped === undefined) {
        throw new Error(`Unknown fontWeight value: "${token.$value}" in token ${token.name}`);
      }
      return mapped;
    }
    return token.$value;
  },
});

// Custom transform for typography to CSS font shorthand
StyleDictionary.registerTransform({
  name: 'typography/css',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'typography',
  transform: (token) => {
    const val = token.$value;
    if (typeof val === 'object') {
      // Return CSS font shorthand
      return `${val.fontWeight} ${val.fontSize}/${val.lineHeight} ${val.fontFamily}, system-ui`;
    }
    return val;
  },
});

// Custom format for CSS with organized sections
StyleDictionary.registerFormat({
  name: 'css/custom-properties-grouped',
  format: ({ dictionary, options }) => {
    const header = `/**
 * RegelRecht Design System Tokens
 * Auto-generated from Figma - Do not edit directly
 * Generated: ${new Date().toISOString()}
 */\n\n`;

    const tokens = dictionary.allTokens
      .map((token) => {
        const value =
          typeof token.$value === 'object' ? JSON.stringify(token.$value) : token.$value;
        return `  --${token.name}: ${value};`;
      })
      .join('\n');

    return `${header}:root {\n${tokens}\n}\n`;
  },
});

const config = {
  source: ['tokens/rr-tokens.json'],
  parsers: ['figma-variables'],

  platforms: {
    // All tokens combined
    css: {
      transforms: ['name/kebab', 'size/px', 'number/value', 'fontWeight/number', 'typography/css', 'color/css'],
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/custom-properties-grouped',
        },
      ],
    },

    // Primitives only
    'css-primitives': {
      transforms: ['name/kebab', 'size/px', 'number/value', 'fontWeight/number', 'typography/css', 'color/css'],
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'primitives.css',
          format: 'css/custom-properties-grouped',
          filter: (token) => token.path[0] === 'primitives',
        },
      ],
    },

    // Semantics only
    'css-semantics': {
      transforms: ['name/kebab', 'size/px', 'number/value', 'fontWeight/number', 'typography/css', 'color/css'],
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'semantics.css',
          format: 'css/custom-properties-grouped',
          filter: (token) => token.path[0] === 'semantics',
        },
      ],
    },

    // Component tokens only
    'css-components': {
      transforms: ['name/kebab', 'size/px', 'number/value', 'fontWeight/number', 'typography/css', 'color/css'],
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'components.css',
          format: 'css/custom-properties-grouped',
          filter: (token) => token.path[0] === 'components',
        },
      ],
    },

    // JSON output for debugging/reference
    json: {
      transforms: ['name/kebab', 'size/px', 'number/value', 'fontWeight/number'],
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
      ],
    },
  },
};

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

console.log('Design tokens built successfully!');
