import { describe, it, expect } from 'vitest';
import { sanitizeUrl } from './sanitize-url.ts';

describe('sanitizeUrl', () => {
	it('allows valid relative URLs', () => {
		expect(sanitizeUrl('/page')).toBe('/page');
	});

	it('allows valid https URLs', () => {
		expect(sanitizeUrl('https://example.com')).toBe('https://example.com');
	});

	it('blocks javascript: URLs', () => {
		expect(sanitizeUrl('javascript:alert(1)')).toBeNull();
	});

	it('blocks data: URLs', () => {
		expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
	});

	it('blocks vbscript: URLs', () => {
		expect(sanitizeUrl('vbscript:MsgBox("XSS")')).toBeNull();
	});

	it('blocks blob: URLs', () => {
		expect(sanitizeUrl('blob:https://example.com/uuid')).toBeNull();
	});

	it('blocks uppercase javascript: URLs', () => {
		expect(sanitizeUrl('JAVASCRIPT:alert(1)')).toBeNull();
	});

	it('blocks mixed case JavaScript: URLs', () => {
		expect(sanitizeUrl('JavaScript:alert(1)')).toBeNull();
	});

	it('blocks whitespace-prefixed javascript: URLs', () => {
		expect(sanitizeUrl('  javascript:alert(1)')).toBeNull();
	});

	it('blocks non-breaking-space-prefixed javascript: URLs', () => {
		expect(sanitizeUrl('\u00A0javascript:alert(1)')).toBeNull();
	});

	it('blocks zero-width-space-prefixed javascript: URLs', () => {
		expect(sanitizeUrl('\u200Bjavascript:alert(1)')).toBeNull();
	});

	it('returns null for empty string', () => {
		expect(sanitizeUrl('')).toBeNull();
	});

	it('returns null for null', () => {
		expect(sanitizeUrl(null)).toBeNull();
	});
});
