import { describe, it, expect } from 'vitest';
import { reflectNonDefault } from './reflect-non-default.ts';

describe('reflectNonDefault', () => {
	const conv = reflectNonDefault<string>('md');

	it('reflects a non-default value to the attribute', () => {
		expect(conv.toAttribute!('lg')).toBe('lg');
	});

	it('omits the default from the attribute (returns null so Lit removes it)', () => {
		expect(conv.toAttribute!('md')).toBeNull();
	});

	it('parses a present attribute to its value', () => {
		expect(conv.fromAttribute!('lg')).toBe('lg');
	});

	it('falls back to the default when the attribute is absent', () => {
		expect(conv.fromAttribute!(null)).toBe('md');
	});
});
