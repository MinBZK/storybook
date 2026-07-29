import { describe, it, expect } from 'vitest';
import { encodeLqip, encodePixelDataToLqip } from './lqip-encoder.js';

/**
 * Renders a solid-color ImageBitmap of the given RGB so the encoder gets
 * a deterministic input. Every cell and the dominant histogram bucket all
 * end up with the same color, so all seven output bytes encode the same
 * Oklab quantisation of (r, g, b).
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

/** Parse the encoder's CSV output `"base,c1,c2,c3,c4,c5,c6"` into the seven
 *  bytes and their packed-Oklab fields (2 bits L, 3 bits a, 3 bits b each). */
function parseLqip(lqip: string): {
	base: number;
	cells: number[];
	bits: { byte: number; ll: number; aaa: number; bbb: number }[];
} {
	const parts = lqip.split(',').map(Number);
	const [base, ...cells] = parts;
	const bits = parts.map(byte => ({
		byte,
		ll: (byte >> 6) & 0b11,
		aaa: (byte >> 3) & 0b111,
		bbb: byte & 0b111,
	}));
	return { base, cells, bits };
}

describe('encodeLqip', () => {
	it('returns a 7-byte CSV string', async () => {
		const bitmap = await makeSolidBitmap(128, 128, 128);
		const lqip = await encodeLqip(bitmap);
		expect(typeof lqip).toBe('string');
		const parts = lqip.split(',');
		expect(parts).toHaveLength(7);
		for (const p of parts) {
			const n = Number(p);
			expect(Number.isInteger(n)).toBe(true);
			expect(n).toBeGreaterThanOrEqual(0);
			expect(n).toBeLessThanOrEqual(255);
		}
	});

	it('encodes pure black as lowest L + uniform cells', async () => {
		const bitmap = await makeSolidBitmap(0, 0, 0);
		const lqip = await encodeLqip(bitmap);
		const { base, cells, bits } = parseLqip(lqip);
		// All seven bytes identical for a uniform input.
		expect(cells.every(c => c === base)).toBe(true);
		// L quantises to the bottom of its 2-bit range.
		expect(bits[0].ll).toBe(0);
	});

	it('encodes pure white as highest L + uniform cells', async () => {
		const bitmap = await makeSolidBitmap(255, 255, 255);
		const lqip = await encodeLqip(bitmap);
		const { base, cells, bits } = parseLqip(lqip);
		expect(cells.every(c => c === base)).toBe(true);
		expect(bits[0].ll).toBe(3);
	});

	it('encodes mid-gray near the center of the L range', async () => {
		const bitmap = await makeSolidBitmap(128, 128, 128);
		const lqip = await encodeLqip(bitmap);
		const { bits } = parseLqip(lqip);
		// Mid-gray Oklab L ≈ 0.6 → quantised L lands at bucket 1 or 2 in the
		// 0..3 range that maps to [0.2, 0.8].
		expect(bits[0].ll === 1 || bits[0].ll === 2).toBe(true);
	});

	it('produces different strings for visibly different colors', async () => {
		const red = await encodeLqip(await makeSolidBitmap(220, 30, 30));
		const blue = await encodeLqip(await makeSolidBitmap(30, 30, 220));
		expect(red).not.toBe(blue);
	});
});

describe('encodePixelDataToLqip — pure-function snapshot tests', () => {
	/** Build a width×height RGBA buffer where every pixel has the given color. */
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
		expect(encodePixelDataToLqip(solid(0, 0, 0, 12, 8), 12, 8))
			.toBe('35,35,35,35,35,35,35');
	});

	it('locks the algorithm: solid white snapshot', () => {
		expect(encodePixelDataToLqip(solid(255, 255, 255, 12, 8), 12, 8))
			.toBe('227,227,227,227,227,227,227');
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
		const { bits } = parseLqip(lqip);
		// Cell layout is row-major: c1/c2/c3 = top row left/middle/right.
		// In a black-left → white-right gradient those three columns should
		// monotonically brighten.
		const [, c1, c2, c3] = bits;
		expect(c1.ll).toBeLessThanOrEqual(c2.ll);
		expect(c2.ll).toBeLessThanOrEqual(c3.ll);
		expect(c1.ll).toBeLessThan(c3.ll);
	});

	it('round-trips solid colors via the pure function and the browser wrapper to the same value', async () => {
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
