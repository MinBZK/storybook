let keyboardMode = false;
let initialized = false;

function init(): void {
	if (initialized) return;
	initialized = true;

	document.addEventListener('keydown', (e: KeyboardEvent) => {
		if (e.key === 'Tab') keyboardMode = true;
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
