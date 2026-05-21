import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
	onColorSchemeChange,
	forceScrollLayerRepaint,
	_resetColorSchemeRepaintForTesting,
} from './color-scheme-repaint.js';

function setScheme(scheme: 'light' | 'dark'): void {
	document.documentElement.setAttribute('data-scheme', scheme);
}

function clearScheme(): void {
	document.documentElement.removeAttribute('data-scheme');
}

// Microtask flush — MutationObserver callbacks queue as microtasks.
function flushMicrotasks(): Promise<void> {
	return Promise.resolve();
}

describe('color-scheme-repaint', () => {
	beforeEach(() => {
		_resetColorSchemeRepaintForTesting();
		clearScheme();
	});

	afterEach(() => {
		_resetColorSchemeRepaintForTesting();
		clearScheme();
	});

	describe('onColorSchemeChange', () => {
		it('fires the callback when data-scheme changes', async () => {
			const cb = vi.fn();
			onColorSchemeChange(cb);
			setScheme('dark');
			await flushMicrotasks();
			expect(cb).toHaveBeenCalledTimes(1);
		});

		it('fires for each change', async () => {
			const cb = vi.fn();
			onColorSchemeChange(cb);
			setScheme('dark');
			await flushMicrotasks();
			setScheme('light');
			await flushMicrotasks();
			expect(cb).toHaveBeenCalledTimes(2);
		});

		it('does not fire after unsubscribing', async () => {
			const cb = vi.fn();
			const unsub = onColorSchemeChange(cb);
			unsub();
			setScheme('dark');
			await flushMicrotasks();
			expect(cb).not.toHaveBeenCalled();
		});

		it('fans out to multiple subscribers', async () => {
			const a = vi.fn();
			const b = vi.fn();
			onColorSchemeChange(a);
			onColorSchemeChange(b);
			setScheme('dark');
			await flushMicrotasks();
			expect(a).toHaveBeenCalledTimes(1);
			expect(b).toHaveBeenCalledTimes(1);
		});

		it('ignores unrelated attribute changes on the root', async () => {
			const cb = vi.fn();
			onColorSchemeChange(cb);
			document.documentElement.setAttribute('lang', 'nl');
			await flushMicrotasks();
			expect(cb).not.toHaveBeenCalled();
			document.documentElement.removeAttribute('lang');
		});
	});

	describe('forceScrollLayerRepaint', () => {
		it('preserves scrollLeft and scrollTop', () => {
			const el = document.createElement('div');
			el.style.width = '100px';
			el.style.height = '100px';
			el.style.overflow = 'auto';
			const inner = document.createElement('div');
			inner.style.width = '500px';
			inner.style.height = '500px';
			el.appendChild(inner);
			document.body.appendChild(el);
			el.scrollLeft = 42;
			el.scrollTop = 17;
			forceScrollLayerRepaint(el);
			expect(el.scrollLeft).toBe(42);
			expect(el.scrollTop).toBe(17);
			document.body.removeChild(el);
		});

		it('leaves the element visible (display reset)', () => {
			const el = document.createElement('div');
			document.body.appendChild(el);
			forceScrollLayerRepaint(el);
			expect(el.style.display).toBe('');
			document.body.removeChild(el);
		});

		it('restores a pre-existing inline display value', () => {
			const el = document.createElement('div');
			el.style.display = 'flex';
			document.body.appendChild(el);
			forceScrollLayerRepaint(el);
			expect(el.style.display).toBe('flex');
			document.body.removeChild(el);
		});
	});
});
