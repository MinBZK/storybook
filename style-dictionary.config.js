import StyleDictionary from 'style-dictionary';
import { FONT_WEIGHT_MAP } from './src/parser/font-weights.js';

// Scheme definitions
const SCHEMES = [
  {
    name: 'light',
    source: ['tokens/rr-tokens-light.json'],
    selector: ':root',
    files: [
      { destination: 'tokens.css' },
      { destination: 'primitives.css', filter: (token) => token.path[0] === 'primitives' },
      { destination: 'semantics.css', filter: (token) => token.path[0] === 'semantics' },
      { destination: 'components.css', filter: (token) => token.path[0] === 'components' },
    ],
  },
  {
    name: 'dark',
    source: ['tokens/rr-tokens-dark.json'],
    selector: '[data-scheme="dark"]',
    files: [
      { destination: 'scheme-dark.css' },
    ],
  },
];

const TRANSFORMS = ['name/kebab', 'size/px', 'number/value', 'fontWeight/number', 'typography/css', 'color/css'];

// Register global transforms (once)
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  filter: (token) => token.$type === 'dimension' && typeof token.$value === 'number',
  transform: (token) => `${token.$value}px`,
});

StyleDictionary.registerTransform({
  name: 'number/value',
  type: 'value',
  filter: (token) => token.$type === 'number' && typeof token.$value === 'number',
  transform: (token) => token.$value,
});

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

StyleDictionary.registerTransform({
  name: 'typography/css',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'typography',
  transform: (token) => {
    const val = token.$value;
    if (typeof val === 'object') {
      return `${val.fontWeight} ${val.fontSize}/${val.lineHeight} ${val.fontFamily}, system-ui`;
    }
    return val;
  },
});

/**
 * Register a CSS custom properties format with a specific selector.
 */
function registerSchemeFormat(formatName, selector) {
  StyleDictionary.registerFormat({
    name: formatName,
    format: ({ dictionary }) => {
      const header = `/**
 * RegelRecht Design System Tokens
 * Auto-generated from design tokens - Do not edit directly
 * Generated: ${new Date().toISOString()}
 */\n\n`;

      const tokens = dictionary.allTokens
        .map((token) => {
          const value =
            typeof token.$value === 'object' ? JSON.stringify(token.$value) : token.$value;
          return `  --${token.name}: ${value};`;
        })
        .join('\n');

      return `${header}${selector} {\n${tokens}\n}\n`;
    },
  });
}

// Build each scheme
for (const scheme of SCHEMES) {
  const formatName = `css/custom-properties-${scheme.name}`;
  registerSchemeFormat(formatName, scheme.selector);

  const platforms = {};

  // CSS platforms for this scheme
  scheme.files.forEach((file, index) => {
    const platformName = index === 0 ? `css-${scheme.name}` : `css-${scheme.name}-${file.destination.replace('.css', '')}`;
    platforms[platformName] = {
      transforms: TRANSFORMS,
      buildPath: 'dist/css/',
      files: [
        {
          destination: file.destination,
          format: formatName,
          ...(file.filter && { filter: file.filter }),
        },
      ],
    };
  });

  // JSON output only for light scheme
  if (scheme.name === 'light') {
    platforms['json'] = {
      transforms: ['name/kebab', 'size/px', 'number/value', 'fontWeight/number'],
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
      ],
    };
  }

  const config = {
    source: scheme.source,
    platforms,
  };

  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();
}

console.log('Design tokens built successfully!');
