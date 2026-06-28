import type { LanguageSupport } from '@codemirror/language';

/* Lazy per-language loading: each grammar is a separate dynamic import, so a
 * page only downloads the grammars it actually renders (mirrors how the old
 * Prism-based code-viewer loaded grammars on demand). More languages are added
 * here as the code-viewer migrates. */
type Loader = () => Promise<LanguageSupport>;

const loaders: Record<string, Loader> = {
	json: async () => (await import('@codemirror/lang-json')).json(),
	yaml: async () => (await import('@codemirror/lang-yaml')).yaml(),
	javascript: async () => (await import('@codemirror/lang-javascript')).javascript(),
	typescript: async () => (await import('@codemirror/lang-javascript')).javascript({ typescript: true }),
};

const cache = new Map<string, Promise<LanguageSupport>>();

export function isLanguageSupported(name: string): boolean {
	return Object.prototype.hasOwnProperty.call(loaders, name);
}

export function loadLanguage(name: string): Promise<LanguageSupport> | undefined {
	const loader = loaders[name];
	if (!loader) return undefined;
	let pending = cache.get(name);
	if (!pending) {
		// Drop the cache entry on failure so a later attempt can retry
		// (e.g. a transient chunk-load failure on a flaky network).
		pending = loader().catch((err) => {
			cache.delete(name);
			throw err;
		});
		cache.set(name, pending);
	}
	return pending;
}
