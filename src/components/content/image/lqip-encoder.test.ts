import { describe, it, expect } from 'vitest';
import { encodeLqip } from './lqip-encoder.js';

/**
 * Renders a solid-colour ImageBitmap of the given RGB so the encoder gets
 * a deterministic input. Both downsamples (3×2 cells and 1×1 average) end
 * up with the same colour, so the resulting cells encode the greyscale of
 * (r, g, b) and the base colour encodes its Oklab.
 */
async function makeSolidBitmap(r: number, g: number, b: number): Promise<ImageBitmap> {
	const canvas = document.createElement('canvas');
	canvas.width = 16;
	canvas.height = 16;
	const ctx = canvas.getContext('2d')!;
	ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
	ctx.fillRect(0, 0, 16, 16);
	return createImageBitmap(canvas);
}

/** Decode the 20-bit packed integer back into its component fields the same
 *  way the CSS decoder does. Returns the 6 cell levels (0-3), the L level
 *  (0-3), and the a/b levels (0-7). */
function unpackLqip(lqip: number): {
	cells: number[];
	ll: number;
	aaa: number;
	bbb: number;
} {
	const u = lqip + (1 << 19);
	const cells: number[] = [];
	for (let i = 0; i < 6; i++) {
		const shift = 18 - i * 2;
		cells.push((u >> shift) & 0b11);
	}
	const ll = (u >> 6) & 0b11;
	const aaa = (u >> 3) & 0b111;
	const bbb = u & 0b111;
	return { cells, ll, aaa, bbb };
}

describe('encodeLqip', () => {
	it('returns an integer in the signed 20-bit range', async () => {
		const bitmap = await makeSolidBitmap(128, 128, 128);
		const lqip = await encodeLqip(bitmap);
		expect(Number.isInteger(lqip)).toBe(true);
		expect(lqip).toBeGreaterThanOrEqual(-(1 << 19));
		expect(lqip).toBeLessThan(1 << 19);
	});

	it('encodes pure black as the lowest greyscale + lowest luminance levels', async () => {
		const bitmap = await makeSolidBitmap(0, 0, 0);
		const lqip = await encodeLqip(bitmap);
		const { cells, ll } = unpackLqip(lqip);
		// All six cells share the same darkest greyscale level (0).
		expect(cells).toEqual([0, 0, 0, 0, 0, 0]);
		// Luminance L lands at the bottom of the 0-3 range.
		expect(ll).toBe(0);
	});

	it('encodes pure white as the highest greyscale + highest luminance levels', async () => {
		const bitmap = await makeSolidBitmap(255, 255, 255);
		const lqip = await encodeLqip(bitmap);
		const { cells, ll } = unpackLqip(lqip);
		expect(cells).toEqual([3, 3, 3, 3, 3, 3]);
		expect(ll).toBe(3);
	});

	it('encodes mid-grey near the middle of the greyscale range', async () => {
		const bitmap = await makeSolidBitmap(128, 128, 128);
		const lqip = await encodeLqip(bitmap);
		const { cells } = unpackLqip(lqip);
		// Mid-grey rec.709 luminance ≈ 0.5 → quantised cell value clamps to 1 or 2.
		for (const c of cells) {
			expect(c === 1 || c === 2).toBe(true);
		}
	});

	it('produces different integers for visibly different colours', async () => {
		const red = await encodeLqip(await makeSolidBitmap(220, 30, 30));
		const blue = await encodeLqip(await makeSolidBitmap(30, 30, 220));
		expect(red).not.toBe(blue);
	});
});
