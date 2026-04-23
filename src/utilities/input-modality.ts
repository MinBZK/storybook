export type InputModality = 'keyboard' | 'mouse' | 'touch';

let modality: InputModality = 'mouse';
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

	// pointerdown carries `pointerType` ('mouse' | 'pen' | 'touch'). Use it so
	// we can distinguish touch from mouse in one listener. Pen is grouped with
	// mouse: stylus users generally expect the same hover/focus semantics.
	document.addEventListener('pointerdown', (e: PointerEvent) => {
		modality = e.pointerType === 'touch' ? 'touch' : 'mouse';
	}, { signal });
}

export function getInputModality(): InputModality {
	init();
	return modality;
}

export function isKeyboardMode(): boolean {
	return getInputModality() === 'keyboard';
}

/** True for mouse OR touch — any non-keyboard input. */
export function isPointerMode(): boolean {
	const m = getInputModality();
	return m === 'mouse' || m === 'touch';
}

export function isMouseMode(): boolean {
	return getInputModality() === 'mouse';
}

export function isTouchMode(): boolean {
	return getInputModality() === 'touch';
}

/** @internal Reset state for testing only. */
export function _resetInputModalityForTesting(): void {
	controller?.abort();
	controller = null;
	modality = 'mouse';
	initialized = false;
}
