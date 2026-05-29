import { describe, it, expect } from 'vitest';
import { encodeLqip, encodePixelDataToLqip } from './lqip-encoder.js';

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

	it('encodes pure black as lowest base luminance + uniform cells', async () => {
		const bitmap = await makeSolidBitmap(0, 0, 0);
		const lqip = await encodeLqip(bitmap);
		const { cells, ll } = unpackLqip(lqip);
		// All six cells encode the same lightness offset vs the base. The
		// absolute value depends on where pure black quantises in the 2-bit L
		// space; what matters is that the placeholder is uniform.
		expect(cells.every(c => c === cells[0])).toBe(true);
		// Luminance L lands at the bottom of the 0-3 range.
		expect(ll).toBe(0);
	});

	it('encodes pure white as highest base luminance + uniform cells', async () => {
		const bitmap = await makeSolidBitmap(255, 255, 255);
		const lqip = await encodeLqip(bitmap);
		const { cells, ll } = unpackLqip(lqip);
		expect(cells.every(c => c === cells[0])).toBe(true);
		expect(ll).toBe(3);
	});

	it('encodes a solid mid-grey with cells centred on the neutral offset', async () => {
		const bitmap = await makeSolidBitmap(128, 128, 128);
		const lqip = await encodeLqip(bitmap);
		const { cells } = unpackLqip(lqip);
		// For a uniform image cell L equals base L, so the relative offset is
		// 0 → encoded as the centre bucket (1 or 2 after rounding 1.5).
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

describe('encodePixelDataToLqip — pure-function snapshot tests', () => {
	/** Build a width×height RGBA buffer where every pixel has the given colour. */
	function solid(r: number, g: number, b: number, width: number, height: number): Uint8ClampedArray {
		const buf = new Uint8ClampedArray(width * height * 4);
		for (let i = 0; i < buf.length; i += 4) {
			buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = 255;
		}
		return buf;
	}

	it('rejects images smaller than 3×2', () => {
		expect(() => encodePixelDataToLqip(solid(0, 0, 0, 2, 2), 2, 2)).toThrow();
	});

	it('locks the algorithm against silent regression: solid black snapshot', () => {
		// If you change the encoder math and this test fails, every previously
		// generated LQIP value will look different in the rendered placeholder.
		// Bump SAMPLE_LQIP in image.stories.ts and audit downstream uses.
		expect(encodePixelDataToLqip(solid(0, 0, 0, 12, 8), 12, 8)).toBe(-174813);
	});

	it('locks the algorithm: solid white snapshot', () => {
		expect(encodePixelDataToLqip(solid(255, 255, 255, 12, 8), 12, 8)).toBe(174819);
	});

	it('locks the algorithm: horizontal gradient (black left → white right)', () => {
		// 12px wide, 8px tall. Each column gets a stepped intensity so the
		// three cell columns see distinct averages (~21, ~127, ~233 luma).
		const buf = new Uint8ClampedArray(12 * 8 * 4);
		for (let y = 0; y < 8; y++) {
			for (let x = 0; x < 12; x++) {
				const v = Math.round((x / 11) * 255);
				const i = (y * 12 + x) * 4;
				buf[i] = v; buf[i + 1] = v; buf[i + 2] = v; buf[i + 3] = 255;
			}
		}
		const lqip = encodePixelDataToLqip(buf, 12, 8);
		// The three columns of cells should monotonically lighten: ca < cb < cc.
		const u = lqip + (1 << 19);
		const ca = (u >> 18) & 3;
		const cb = (u >> 16) & 3;
		const cc = (u >> 14) & 3;
		expect(ca).toBeLessThanOrEqual(cb);
		expect(cb).toBeLessThanOrEqual(cc);
		expect(ca).toBeLessThan(cc);
	});

	it('rounds-trips solid colours via the pure function and the browser wrapper to the same value', async () => {
		const wrapperResult = await encodeLqip(await (async () => {
			const c = document.createElement('canvas');
			c.width = 8; c.height = 6;
			const ctx = c.getContext('2d')!;
			ctx.fillStyle = 'rgb(200, 100, 50)';
			ctx.fillRect(0, 0, 8, 6);
			return createImageBitmap(c);
		})());
		const pureResult = encodePixelDataToLqip(solid(200, 100, 50, 8, 6), 8, 6);
		expect(wrapperResult).toBe(pureResult);
	});
});
