import { describe, it, expect, beforeEach } from 'vitest';
import { isKeyboardMode, _resetKeyboardModeForTesting } from './keyboard-mode.ts';

describe('isKeyboardMode', () => {
	beforeEach(() => {
		_resetKeyboardModeForTesting();
		isKeyboardMode(); // re-register listeners
	});

	it('returns false by default', () => {
		expect(isKeyboardMode()).toBe(false);
	});

	it('returns true after Tab keydown', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
		expect(isKeyboardMode()).toBe(true);
	});

	it('returns true after ArrowDown keydown', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
		expect(isKeyboardMode()).toBe(true);
	});

	it('returns true after Enter keydown', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		expect(isKeyboardMode()).toBe(true);
	});

	it('returns false after mousedown', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
		expect(isKeyboardMode()).toBe(true);
		document.dispatchEvent(new MouseEvent('mousedown'));
		expect(isKeyboardMode()).toBe(false);
	});

	it('returns false after touchstart', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
		expect(isKeyboardMode()).toBe(true);
		document.dispatchEvent(new Event('touchstart'));
		expect(isKeyboardMode()).toBe(false);
	});

	it('does not set keyboard mode for unrelated keys', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
		expect(isKeyboardMode()).toBe(false);
	});
});
