/**
 * Sanitizes a URL by stripping leading/trailing whitespace (including unicode)
 * and blocking dangerous protocols (javascript:, data:, vbscript:).
 * Returns null for empty or dangerous URLs, the original URL otherwise.
 */
export function sanitizeUrl(url: string | null): string | null {
	if (!url) return null;
	const trimmed = url.replace(/^[\s\u00A0\u200B\u2028\u2029]+|[\s\u00A0\u200B\u2028\u2029]+$/g, '').toLowerCase();
	if (
		trimmed.startsWith('javascript:') ||
		trimmed.startsWith('data:') ||
		trimmed.startsWith('vbscript:')
	) {
		return null;
	}
	return url;
}
