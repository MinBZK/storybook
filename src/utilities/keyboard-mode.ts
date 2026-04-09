let keyboardMode = false;
let initialized = false;
let controller: AbortController | null = null;

function init(): void {
	if (initialized) return;
	initialized = true;
	controller = new AbortController();
	const { signal } = controller;

	document.addEventListener('keydown', (e: KeyboardEvent) => {
		if (['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' ', 'Escape'].includes(e.key)) {
			keyboardMode = true;
		}
	}, { signal });

	document.addEventListener('mousedown', () => {
		keyboardMode = false;
	}, { signal });

	document.addEventListener('touchstart', () => {
		keyboardMode = false;
	}, { passive: true, signal });
}

export function isKeyboardMode(): boolean {
	init();
	return keyboardMode;
}

/** @internal Reset state for testing only. */
export function _resetKeyboardModeForTesting(): void {
	controller?.abort();
	controller = null;
	keyboardMode = false;
	initialized = false;
}
