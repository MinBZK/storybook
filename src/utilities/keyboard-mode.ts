let keyboardMode = false;
let initialized = false;

function init(): void {
	if (initialized) return;
	initialized = true;

	document.addEventListener('keydown', (e: KeyboardEvent) => {
		if (['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' ', 'Escape'].includes(e.key)) {
			keyboardMode = true;
		}
	});

	document.addEventListener('mousedown', () => {
		keyboardMode = false;
	});

	document.addEventListener('touchstart', () => {
		keyboardMode = false;
	}, { passive: true });
}

export function isKeyboardMode(): boolean {
	init();
	return keyboardMode;
}

/** @internal Reset state for testing only. */
export function _resetKeyboardModeForTesting(): void {
	keyboardMode = false;
}
