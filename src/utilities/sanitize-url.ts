/**
 * Sanitizes a URL for use in href attributes by stripping leading/trailing
 * whitespace (including unicode), removing embedded control characters that
 * browsers strip during URL parsing (tab, newline, carriage return), and
 * blocking dangerous protocols.
 *
 * Blocked protocols: javascript:, data:, vbscript:, blob:.
 *
 * Note: data: is blocked entirely (including data:image/) because this utility
 * is designed for href contexts (<a>, navigation), not for <img src> or CSS
 * where data:image/ would be legitimate.
 *
 * Returns null for empty or dangerous URLs, the trimmed URL otherwise.
 */
export function sanitizeUrl(url: string | null): string | null {
	if (!url) return null;
	const trimmed = url
		.replace(/^[\s\u00A0\u200B\u2028\u2029]+|[\s\u00A0\u200B\u2028\u2029]+$/g, '')
		.replace(/[\t\n\r]/g, '');
	const lower = trimmed.toLowerCase();
	if (
		lower.startsWith('javascript:') ||
		lower.startsWith('data:') ||
		lower.startsWith('vbscript:') ||
		lower.startsWith('blob:')
	) {
		return null;
	}
	return trimmed;
}
