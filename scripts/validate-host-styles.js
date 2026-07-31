#!/usr/bin/env node

/**
 * Host Styles Validation Script
 *
 * Outer-document rules that match a shadow host (e.g. a consumer's universal
 * reset like `* { margin: 0; padding: 0; border: 0 }`) beat every normal
 * `:host` declaration, regardless of specificity (CSS Scoping: for normal
 * declarations the outer encapsulation context wins). Only `!important`
 * declarations inside the shadow tree win from the outer context.
 *
 * This script therefore flags margin, padding and border declarations with a
 * non-zero value directly on a top-level `:host` selector that lack
 * `!important`. The preferred fix is moving the visual framework to a wrapper
 * element inside the shadow root; `!important` on the host is the fallback
 * for declarations that cannot move inward (subgrid participants, negative
 * margins). See docs/plan-host-reset-hardening.md.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'src/components');

// Properties a consumer reset realistically zeroes. border-radius and
// friends are excluded: no common reset touches them.
const VULNERABLE_PROPERTY_PATTERN =
  /^(margin|padding)(-[\w-]+)?$|^border(-(top|right|bottom|left|inline|block|width|style|color)[\w-]*)?$/;

// Values that match what a reset would set anyway, so losing them is harmless.
const HARMLESS_VALUE_PATTERN = /^(0|0px|none|initial|unset|revert)$/;

function findStyleFiles(dir) {
  const files = [];

  function walk(currentDir) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.styles.ts')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

/**
 * True when every compound in the selector list targets the host itself
 * (`:host` or `:host(...)`), with no descendant part — those are the only
 * selectors whose declarations an outer-document rule can override.
 */
function isHostSelector(selector) {
  return selector
    .split(',')
    .map((part) => part.trim())
    .every((part) => /^:host(\((?:[^()]|\([^()]*\))*\))?$/.test(part));
}

/**
 * Walks the CSS text of one lit `css` template and collects offending
 * declarations. Tracks a selector stack so nested at-rules stay transparent
 * and only declarations directly on a `:host` frame are inspected.
 */
function findViolations(cssText) {
  const violations = [];
  // Stack frames: { host: boolean } — at-rules inherit the parent frame.
  const stack = [];
  let buffer = '';

  for (let i = 0; i < cssText.length; i++) {
    const char = cssText[i];

    if (char === '{') {
      const selector = buffer.trim();
      const parent = stack[stack.length - 1];
      const isAtRule = selector.startsWith('@');
      stack.push({
        host: isAtRule ? (parent?.host ?? false) : isHostSelector(selector),
      });
      buffer = '';
    } else if (char === '}') {
      stack.pop();
      buffer = '';
    } else if (char === ';') {
      const declaration = buffer.trim();
      buffer = '';
      if (!stack[stack.length - 1]?.host) continue;

      const match = declaration.match(/^([a-z-]+)\s*:\s*([\s\S]+)$/);
      if (!match) continue;
      const [, property, rawValue] = match;
      if (!VULNERABLE_PROPERTY_PATTERN.test(property)) continue;

      const important = /!important\s*$/.test(rawValue);
      const value = rawValue.replace(/!important\s*$/, '').trim();
      if (important || HARMLESS_VALUE_PATTERN.test(value)) continue;

      const line = cssText.slice(0, i).split('\n').length;
      violations.push({ line, property, value });
    } else {
      buffer += char;
    }
  }

  return violations;
}

/**
 * Blanks everything outside the css`...` template literals (imports, export
 * statements) so JS text never pollutes the selector buffer of the CSS
 * parser. Newlines are kept for stable line numbers.
 */
function blankNonCss(source) {
  let result = '';
  let cursor = 0;
  const open = /css`/g;
  let match;

  while ((match = open.exec(source)) !== null) {
    const start = match.index + match[0].length;
    const end = source.indexOf('`', start);
    if (end === -1) break;
    result += source.slice(cursor, start).replace(/[^\n]/g, ' ');
    result += source.slice(start, end);
    cursor = end;
    open.lastIndex = end + 1;
  }

  result += source.slice(cursor).replace(/[^\n]/g, ' ');
  return result;
}

function main() {
  const files = findStyleFiles(COMPONENTS_DIR);
  let total = 0;

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf-8');
    const cleaned = blankNonCss(
      source
        .replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '))
        .replace(/\$\{[^}]*\}/g, (expr) => expr.replace(/[^\n]/g, ' '))
    );

    const violations = findViolations(cleaned);
    if (violations.length === 0) continue;

    total += violations.length;
    const relative = path.relative(ROOT_DIR, file);
    console.error(`❌ ${relative}`);
    for (const { line, property, value } of violations) {
      console.error(`   ${relative}:${line} — \`${property}: ${value}\` on :host`);
    }
  }

  if (total > 0) {
    console.error(
      `\n${total} host declaration(s) a consumer reset would override.\n` +
        'Move the visual framework to a wrapper element inside the shadow root,\n' +
        'or add `!important` when the declaration cannot move inward\n' +
        '(subgrid participants, negative margins). See docs/plan-host-reset-hardening.md.'
    );
    process.exit(1);
  }

  console.log(`✅ Host styles validated (${files.length} files): no reset-vulnerable declarations.`);
}

main();
