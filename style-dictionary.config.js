import StyleDictionary from 'style-dictionary';
import { createFigmaVariablesParser } from './src/parser/figma-variables-parser.js';
import { FONT_WEIGHT_MAP } from './src/parser/font-weights.js';

// Theme definitions
const THEMES = [
  {
    name: 'light',
    mode: 'Light',
    selector: ':root',
    parserName: 'figma-variables-light',
    files: [
      { destination: 'tokens.css' },
      { destination: 'primitives.css', filter: (token) => token.path[0] === 'primitives' },
      { destination: 'semantics.css', filter: (token) => token.path[0] === 'semantics' },
      { destination: 'components.css', filter: (token) => token.path[0] === 'components' },
    ],
  },
  {
    name: 'dark',
    mode: 'Dark',
    selector: '[data-theme="dark"]',
    parserName: 'figma-variables-dark',
    files: [
      { destination: 'theme-dark.css' },
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
function registerThemeFormat(formatName, selector) {
  StyleDictionary.registerFormat({
    name: formatName,
    format: ({ dictionary }) => {
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

      return `${header}${selector} {\n${tokens}\n}\n`;
    },
  });
}

// Build each theme
for (const theme of THEMES) {
  const parser = createFigmaVariablesParser(theme.mode, theme.parserName);
  StyleDictionary.registerParser(parser);

  const formatName = `css/custom-properties-${theme.name}`;
  registerThemeFormat(formatName, theme.selector);

  const platforms = {};

  // CSS platforms for this theme
  theme.files.forEach((file, index) => {
    const platformName = index === 0 ? `css-${theme.name}` : `css-${theme.name}-${file.destination.replace('.css', '')}`;
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

  // JSON output only for light theme
  if (theme.name === 'light') {
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
    source: ['tokens/rr-tokens.json'],
    parsers: [theme.parserName],
    platforms,
  };

  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();
}

console.log('Design tokens built successfully!');
