import { describe, it, expect, beforeEach } from 'vitest';

// Fresh import per test by resetting module state
let isKeyboardMode: () => boolean;

async function loadFresh() {
	// Reset module state by re-importing
	const mod = await import('./keyboard-mode.ts');
	isKeyboardMode = mod.isKeyboardMode;
}

describe('isKeyboardMode', () => {
	beforeEach(async () => {
		await loadFresh();
	});

	it('returns false by default', () => {
		expect(isKeyboardMode()).toBe(false);
	});

	it('returns true after Tab keydown', () => {
		isKeyboardMode(); // init listeners
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
		expect(isKeyboardMode()).toBe(true);
	});

	it('returns true after ArrowDown keydown', () => {
		isKeyboardMode();
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
		expect(isKeyboardMode()).toBe(true);
	});

	it('returns true after Enter keydown', () => {
		isKeyboardMode();
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		expect(isKeyboardMode()).toBe(true);
	});

	it('returns false after mousedown', () => {
		isKeyboardMode();
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
		expect(isKeyboardMode()).toBe(true);
		document.dispatchEvent(new MouseEvent('mousedown'));
		expect(isKeyboardMode()).toBe(false);
	});

	it('returns false after touchstart', () => {
		isKeyboardMode();
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
		expect(isKeyboardMode()).toBe(true);
		document.dispatchEvent(new Event('touchstart'));
		expect(isKeyboardMode()).toBe(false);
	});

	it('does not set keyboard mode for unrelated keys', () => {
		isKeyboardMode();
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
		expect(isKeyboardMode()).toBe(false);
	});
});
