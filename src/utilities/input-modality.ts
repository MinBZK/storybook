export type InputModality = 'keyboard' | 'pointer';

let modality: InputModality = 'pointer';
let initialized = false;
let controller: AbortController | null = null;

function init(): void {
	if (initialized) return;
	initialized = true;
	controller = new AbortController();
	const { signal } = controller;

	document.addEventListener('keydown', (e: KeyboardEvent) => {
		if (['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' ', 'Escape'].includes(e.key)) {
			modality = 'keyboard';
		}
	}, { signal });

	document.addEventListener('mousedown', () => {
		modality = 'pointer';
	}, { signal });

	document.addEventListener('touchstart', () => {
		modality = 'pointer';
	}, { passive: true, signal });
}

export function getInputModality(): InputModality {
	init();
	return modality;
}

export function isKeyboardMode(): boolean {
	return getInputModality() === 'keyboard';
}

export function isPointerMode(): boolean {
	return getInputModality() === 'pointer';
}

/** @internal Reset state for testing only. */
export function _resetInputModalityForTesting(): void {
	controller?.abort();
	controller = null;
	modality = 'pointer';
	initialized = false;
}
