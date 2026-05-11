/**
 * JavaScript-accessible design tokens for `@nldd/design-system`.
 *
 * Most tokens live in `settings.css` as CSS custom properties — that's the
 * right home for anything CSS consumes directly. This module re-exports the
 * subset of tokens that consumers also need from JavaScript: matchMedia
 * thresholds, IntersectionObserver root margins, container-query breakpoints
 * computed in JS, etc.
 *
 * Imported via the package's `./tokens` export:
 *
 * ```ts
 * import { breakpoints } from '@nldd/design-system/tokens';
 *
 * const isDesktop = matchMedia(`(min-width: ${breakpoints.lgMin})`).matches;
 * ```
 *
 * Add re-exports here as new JS-side tokens land. Keep CSS-only tokens out —
 * duplicating them here would invite drift. If something is needed in JS,
 * make the canonical source a `.ts` constants file (like `breakpoints.ts`)
 * and let `settings.css` derive from it via build-time generation, rather
 * than the other way around.
 */
export { breakpoints } from './breakpoints.js';
