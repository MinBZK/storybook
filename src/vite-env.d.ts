/// <reference types="vite/client" />

/* @types/prismjs ships no declarations for the per-grammar submodules.
 * They register themselves with Prism.languages on load — the import
 * itself is a side effect, the default export is unused. */
declare module 'prismjs/components/*' {
	const _: unknown;
	export default _;
}
