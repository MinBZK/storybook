#!/usr/bin/env node

/**
 * Component Map Validation Script
 *
 * Validates that all file paths referenced in docs/component-map.json
 * actually exist on disk. Catches stale paths after file moves/renames.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const MAP_FILE = path.join(ROOT_DIR, 'docs/component-map.json');

const map = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
const errors = [];

for (const component of map.components) {
  const impl = component.implementation;
  if (!impl) continue;

  // Check main component file
  if (impl.file) {
    const fullPath = path.join(ROOT_DIR, impl.file);
    if (!fs.existsSync(fullPath)) {
      errors.push(`${impl.tagName}: ${impl.file}`);
    }
  }

  // Check additional component files
  if (impl.additionalComponents) {
    for (const sub of impl.additionalComponents) {
      if (sub.file) {
        const fullPath = path.join(ROOT_DIR, sub.file);
        if (!fs.existsSync(fullPath)) {
          errors.push(`${sub.tagName}: ${sub.file}`);
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`\n❌ ${errors.length} broken path(s) in component-map.json:\n`);
  for (const error of errors) {
    console.error(`   ${error}`);
  }
  console.error('');
  process.exit(1);
} else {
  console.log('✅ All component-map.json paths are valid.');
}
