import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { detectOS, _setOSOverride, isMac, isWindows, isLinux, _resetOSDetectionCache } from './os.js';

const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(Navigator.prototype, 'platform')
	?? Object.getOwnPropertyDescriptor(navigator, 'platform');
const originalUaDataDescriptor = Object.getOwnPropertyDescriptor(navigator, 'userAgentData');

function mockPlatform(value: string): void {
	Object.defineProperty(navigator, 'platform', {
		value,
		configurable: true,
		writable: false,
	});
	// userAgentData.platform takes precedence over navigator.platform in
	// modern browsers, so clear it for the duration of the test.
	Object.defineProperty(navigator, 'userAgentData', {
		value: undefined,
		configurable: true,
		writable: false,
	});
	_resetOSDetectionCache();
}

function restorePlatform(): void {
	if (originalPlatformDescriptor) {
		Object.defineProperty(navigator, 'platform', originalPlatformDescriptor);
	}
	if (originalUaDataDescriptor) {
		Object.defineProperty(navigator, 'userAgentData', originalUaDataDescriptor);
	} else {
		// userAgentData wasn't defined originally — drop our test override.
		delete (navigator as { userAgentData?: unknown }).userAgentData;
	}
	_resetOSDetectionCache();
}

describe('os detection', () => {
	beforeEach(() => {
		_setOSOverride(null);
		_resetOSDetectionCache();
	});

	afterEach(() => {
		_setOSOverride(null);
		restorePlatform();
	});

	it('classifies macOS', () => {
		mockPlatform('MacIntel');
		expect(detectOS()).toBe('mac');
		expect(isMac()).toBe(true);
		expect(isWindows()).toBe(false);
		expect(isLinux()).toBe(false);
	});

	it('classifies iPhone / iPad / iPod as mac', () => {
		mockPlatform('iPhone');
		expect(detectOS()).toBe('mac');

		mockPlatform('iPad');
		expect(detectOS()).toBe('mac');

		mockPlatform('iPod');
		expect(detectOS()).toBe('mac');
	});

	it('classifies Windows', () => {
		mockPlatform('Win32');
		expect(detectOS()).toBe('windows');
		expect(isWindows()).toBe(true);
		expect(isMac()).toBe(false);
	});

	it('classifies Linux', () => {
		mockPlatform('Linux x86_64');
		expect(detectOS()).toBe('linux');
		expect(isLinux()).toBe(true);
		expect(isMac()).toBe(false);
	});

	it('classifies ChromeOS as linux', () => {
		mockPlatform('CrOS x86_64');
		expect(detectOS()).toBe('linux');
	});

	it('falls back to "other" for unknown platforms', () => {
		mockPlatform('SomethingExotic');
		expect(detectOS()).toBe('other');
	});

	it('falls back to "other" for empty platform', () => {
		mockPlatform('');
		expect(detectOS()).toBe('other');
	});

	it('caches the result of the first detection', () => {
		mockPlatform('MacIntel');
		expect(detectOS()).toBe('mac');

		// Mutating navigator.platform after first detect doesn't change result —
		// without re-resetting the cache, the original value sticks.
		Object.defineProperty(navigator, 'platform', {
			value: 'Win32',
			configurable: true,
			writable: false,
		});
		expect(detectOS()).toBe('mac');
	});

	it('respects an override regardless of detection', () => {
		mockPlatform('Win32');
		_setOSOverride('mac');
		expect(detectOS()).toBe('mac');
		expect(isMac()).toBe(true);
	});

	it('clears the override when set to null', () => {
		mockPlatform('Win32');
		_setOSOverride('mac');
		expect(detectOS()).toBe('mac');
		_setOSOverride(null);
		expect(detectOS()).toBe('windows');
	});
});
