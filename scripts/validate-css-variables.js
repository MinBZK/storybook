#!/usr/bin/env node

/**
 * CSS Variables Validation Script
 *
 * Validates that all CSS custom properties used in components are defined.
 * Token categories:
 * - --rr-* : Override hooks for consumers (SKIPPED - not defined in tokens)
 * - --_* : Internal variables (validated within same file)
 * - --components-*, --semantics-*, --primitives-* : Design tokens (validated against tokens.css)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Configuration
const TOKENS_FILE = path.join(ROOT_DIR, 'dist/css/tokens.css');
const DARK_TOKENS_FILE = path.join(ROOT_DIR, 'dist/css/scheme-dark.css');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'src/components');

// Patterns
const VAR_USAGE_PATTERN = /var\(\s*(--[\w-]+)/g;
const VAR_DEFINITION_PATTERN = /(--[\w-]+)\s*:/g;

/**
 * Parse tokens.css to extract all defined CSS variables
 */
function parseTokensFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Tokens file not found: ${filePath}`);
    console.error('   Run "npm run build:tokens" first.');
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const tokens = new Set();

  let match;
  while ((match = VAR_DEFINITION_PATTERN.exec(content)) !== null) {
    tokens.add(match[1]);
  }

  return tokens;
}

/**
 * Find all component files (.ts and .js)
 */
function findComponentFiles(dir) {
  const files = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (
        (entry.name.endsWith('.ts') || entry.name.endsWith('.js')) &&
        !entry.name.endsWith('.stories.js') &&
        !entry.name.endsWith('.stories.ts') &&
        entry.name.startsWith('rr-')
      ) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

/**
 * Parse a component file for CSS variable usages and definitions
 */
function parseComponentFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Find all variable usages
  const usages = new Set();
  let match;
  while ((match = VAR_USAGE_PATTERN.exec(content)) !== null) {
    usages.add(match[1]);
  }

  // Find all variable definitions (internal --_* variables)
  const definitions = new Set();
  VAR_DEFINITION_PATTERN.lastIndex = 0;
  while ((match = VAR_DEFINITION_PATTERN.exec(content)) !== null) {
    definitions.add(match[1]);
  }

  // Also detect dynamically set variables via styleMap or direct assignment
  // Pattern: styles['--_var-name'] = ... or styles["--_var-name"] = ...
  const dynamicVarPattern = /styles\[['"](-{2}_[\w-]+)['"]\]\s*=/g;
  while ((match = dynamicVarPattern.exec(content)) !== null) {
    definitions.add(match[1]);
  }

  return { usages, definitions };
}

/**
 * Categorize a CSS variable by its prefix
 */
function categorizeVariable(varName) {
  if (varName.startsWith('--rr-')) return 'override';
  if (varName.startsWith('--_')) return 'internal';
  if (varName.startsWith('--components-')) return 'token';
  if (varName.startsWith('--semantics-')) return 'token';
  if (varName.startsWith('--primitives-')) return 'token';
  return 'unknown';
}

/**
 * Main validation function
 */
function validate() {
  console.log('🔍 Validating CSS variables...\n');

  // Parse tokens
  const tokens = parseTokensFile(TOKENS_FILE);
  console.log(`📦 Found ${tokens.size} tokens in tokens.css\n`);

  // Find component files
  const componentFiles = findComponentFiles(COMPONENTS_DIR);
  console.log(`📁 Found ${componentFiles.length} component files\n`);

  const errors = [];
  const warnings = [];
  const stats = {
    totalUsages: 0,
    overrideVars: 0,
    internalVars: 0,
    tokenVars: 0,
    unknownVars: 0,
  };

  // Process each component file
  for (const filePath of componentFiles) {
    const relativePath = path.relative(ROOT_DIR, filePath);
    const { usages, definitions } = parseComponentFile(filePath);

    for (const varName of usages) {
      stats.totalUsages++;
      const category = categorizeVariable(varName);

      switch (category) {
        case 'override':
          // --rr-* variables are consumer hooks, skip validation
          stats.overrideVars++;
          break;

        case 'internal':
          // --_* variables must be defined in the same file
          stats.internalVars++;
          if (!definitions.has(varName)) {
            errors.push({
              file: relativePath,
              variable: varName,
              message: `Internal variable "${varName}" is used but not defined in this file`,
            });
          }
          break;

        case 'token':
          // Design tokens must exist in tokens.css
          stats.tokenVars++;
          if (!tokens.has(varName)) {
            errors.push({
              file: relativePath,
              variable: varName,
              message: `Token "${varName}" is not defined in tokens.css`,
            });
          }
          break;

        case 'unknown':
          // Unknown prefix - warn but don't fail
          stats.unknownVars++;
          warnings.push({
            file: relativePath,
            variable: varName,
            message: `Variable "${varName}" has unknown prefix`,
          });
          break;
      }
    }
  }

  // Print statistics
  console.log('📊 Statistics:');
  console.log(`   Total variable usages: ${stats.totalUsages}`);
  console.log(`   Override hooks (--rr-*): ${stats.overrideVars} (skipped)`);
  console.log(`   Internal variables (--_*): ${stats.internalVars}`);
  console.log(`   Design tokens: ${stats.tokenVars}`);
  if (stats.unknownVars > 0) {
    console.log(`   Unknown prefix: ${stats.unknownVars}`);
  }
  console.log('');

  // Print warnings
  if (warnings.length > 0) {
    console.log(`⚠️  ${warnings.length} warning(s):\n`);
    for (const warning of warnings) {
      console.log(`   ${warning.file}`);
      console.log(`   └─ ${warning.message}\n`);
    }
  }

  // Print errors
  if (errors.length > 0) {
    console.log(`❌ ${errors.length} error(s):\n`);
    for (const error of errors) {
      console.log(`   ${error.file}`);
      console.log(`   └─ ${error.message}\n`);
    }
    console.log('Validation failed!');
    process.exit(1);
  }

  // Dark scheme consistency check (warning only, not blocking)
  validateDarkSchemeConsistency(tokens);

  console.log('✅ All CSS variables validated successfully!\n');
}

/**
 * Check that scheme-dark.css defines the same token names as tokens.css.
 * This is a warning-only check to catch token drift between schemes.
 */
function validateDarkSchemeConsistency(lightTokens) {
  if (!fs.existsSync(DARK_TOKENS_FILE)) return;

  console.log('🌙 Dark scheme consistency check...\n');
  const darkTokens = parseTokensFile(DARK_TOKENS_FILE);

  const missingInDark = [...lightTokens].filter(t => !darkTokens.has(t));
  const extraInDark = [...darkTokens].filter(t => !lightTokens.has(t));

  if (missingInDark.length > 0) {
    console.log(`   ⚠️  ${missingInDark.length} token(s) in light but missing in dark scheme`);
    for (const token of missingInDark.slice(0, 5)) {
      console.log(`      └─ ${token}`);
    }
    if (missingInDark.length > 5) {
      console.log(`      ... and ${missingInDark.length - 5} more`);
    }
  }

  if (extraInDark.length > 0) {
    console.log(`   ⚠️  ${extraInDark.length} token(s) in dark but missing in light scheme`);
    for (const token of extraInDark.slice(0, 5)) {
      console.log(`      └─ ${token}`);
    }
    if (extraInDark.length > 5) {
      console.log(`      ... and ${extraInDark.length - 5} more`);
    }
  }

  if (missingInDark.length === 0 && extraInDark.length === 0) {
    console.log(`   ✅ Dark scheme has same ${darkTokens.size} tokens as light scheme\n`);
  } else {
    console.log('');
  }
}

// Run validation
validate();
