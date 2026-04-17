import { describe, it, expect, beforeEach } from 'vitest';
import { getInputModality, isKeyboardMode, isPointerMode, _resetInputModalityForTesting } from './input-modality.ts';

describe('input-modality', () => {
	beforeEach(() => {
		_resetInputModalityForTesting();
		getInputModality(); // re-register listeners
	});

	it('defaults to pointer', () => {
		expect(getInputModality()).toBe('pointer');
		expect(isPointerMode()).toBe(true);
		expect(isKeyboardMode()).toBe(false);
	});

	it('switches to keyboard after Tab keydown', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
		expect(getInputModality()).toBe('keyboard');
		expect(isKeyboardMode()).toBe(true);
		expect(isPointerMode()).toBe(false);
	});

	it('switches to keyboard after ArrowDown keydown', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
		expect(isKeyboardMode()).toBe(true);
	});

	it('switches to keyboard after Enter keydown', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		expect(isKeyboardMode()).toBe(true);
	});

	it('switches back to pointer after mousedown', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
		expect(isKeyboardMode()).toBe(true);
		document.dispatchEvent(new MouseEvent('mousedown'));
		expect(isPointerMode()).toBe(true);
	});

	it('switches back to pointer after touchstart', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
		expect(isKeyboardMode()).toBe(true);
		document.dispatchEvent(new Event('touchstart'));
		expect(isPointerMode()).toBe(true);
	});

	it('does not switch to keyboard for unrelated keys', () => {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
		expect(isPointerMode()).toBe(true);
	});
});
