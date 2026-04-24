#!/usr/bin/env python3
"""
OKLCH Color Palette Generator
==============================

Generates perceptually uniform color palettes using the OKLCH color space.
Each palette has 25 color steps (0-1000) with equal perceptual contrast ratios.

Features:
- Perfect hue consistency throughout the palette
- Equal contrast ratio (1.164:1) between every 50 steps
- Automatic light/dark scheme generation with CSS light-dark() function
- sRGB gamut clipping for consistent display across all screens
- Special "neutral" mode with reduced chroma for gray palettes

Usage:
    python generate-palette.py <hex_color> <name> [--neutral]

Examples:
    python generate-palette.py "#154273" lintblauw
    python generate-palette.py "#d52b1e" rood
    python generate-palette.py "#64748B" coolgray --neutral

Output:
    CSS custom properties with OKLCH values and HEX comments
"""

import math
import sys
import argparse


# =============================================================================
# Color Space Conversion Functions
# =============================================================================

def hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
	"""Convert HEX color to RGB tuple (0-255)."""
	hex_color = hex_color.lstrip('#')
	return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def rgb_to_hex(rgb: tuple[int, int, int]) -> str:
	"""Convert RGB tuple to HEX string."""
	return f"#{rgb[0]:02X}{rgb[1]:02X}{rgb[2]:02X}"


def srgb_to_linear(c: float) -> float:
	"""Convert sRGB component (0-1) to linear RGB."""
	if c <= 0.04045:
		return c / 12.92
	return ((c + 0.055) / 1.055) ** 2.4


def linear_to_srgb(c: float) -> float:
	"""Convert linear RGB component to sRGB (0-1)."""
	if c <= 0.0031308:
		return c * 12.92
	return 1.055 * (c ** (1/2.4)) - 0.055


def linear_srgb_to_oklab(r: float, g: float, b: float) -> tuple[float, float, float]:
	"""Convert linear sRGB to Oklab."""
	l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
	m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
	s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b

	l_ = l ** (1/3) if l >= 0 else -((-l) ** (1/3))
	m_ = m ** (1/3) if m >= 0 else -((-m) ** (1/3))
	s_ = s ** (1/3) if s >= 0 else -((-s) ** (1/3))

	L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
	a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
	b_out = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

	return (L, a, b_out)


def oklab_to_linear_srgb(L: float, a: float, b: float) -> tuple[float, float, float]:
	"""Convert Oklab to linear sRGB."""
	l_ = L + 0.3963377774 * a + 0.2158037573 * b
	m_ = L - 0.1055613458 * a - 0.0638541728 * b
	s_ = L - 0.0894841775 * a - 1.2914855480 * b

	l = l_ ** 3
	m = m_ ** 3
	s = s_ ** 3

	r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
	g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
	b_out = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

	return (r, g, b_out)


def rgb_to_oklch(rgb: tuple[int, int, int]) -> tuple[float, float, float]:
	"""Convert RGB (0-255) to OKLCH (L: 0-1, C: 0-0.4+, H: radians)."""
	r, g, b = rgb
	r_lin = srgb_to_linear(r / 255)
	g_lin = srgb_to_linear(g / 255)
	b_lin = srgb_to_linear(b / 255)

	L, a, b_lab = linear_srgb_to_oklab(r_lin, g_lin, b_lin)
	C = math.sqrt(a**2 + b_lab**2)
	H = math.atan2(b_lab, a)

	return (L, C, H)


def oklch_to_rgb(L: float, C: float, H: float) -> tuple[int, int, int]:
	"""Convert OKLCH to RGB (0-255), clamping to sRGB gamut."""
	a = C * math.cos(H)
	b = C * math.sin(H)

	r_lin, g_lin, b_lin = oklab_to_linear_srgb(L, a, b)

	r_lin = max(0, min(1, r_lin))
	g_lin = max(0, min(1, g_lin))
	b_lin = max(0, min(1, b_lin))

	r = round(linear_to_srgb(r_lin) * 255)
	g = round(linear_to_srgb(g_lin) * 255)
	b = round(linear_to_srgb(b_lin) * 255)

	return (max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b)))


# =============================================================================
# Luminance and Contrast Functions
# =============================================================================

def relative_luminance(rgb: tuple[int, int, int]) -> float:
	"""Calculate relative luminance for contrast ratio (WCAG formula)."""
	r, g, b = rgb
	r_lin = srgb_to_linear(r / 255)
	g_lin = srgb_to_linear(g / 255)
	b_lin = srgb_to_linear(b / 255)
	return 0.2126 * r_lin + 0.7152 * g_lin + 0.0722 * b_lin


def contrast_ratio(lum1: float, lum2: float) -> float:
	"""Calculate WCAG contrast ratio between two luminances."""
	lighter = max(lum1, lum2)
	darker = min(lum1, lum2)
	return (lighter + 0.05) / (darker + 0.05)


# =============================================================================
# Gamut Mapping
# =============================================================================

def is_in_srgb_gamut(L: float, C: float, H: float, tolerance: float = 0.001) -> bool:
	"""Check if OKLCH color is within sRGB gamut."""
	a = C * math.cos(H)
	b = C * math.sin(H)
	r_lin, g_lin, b_lin = oklab_to_linear_srgb(L, a, b)
	return all(-tolerance <= x <= 1 + tolerance for x in [r_lin, g_lin, b_lin])


def find_max_chroma_in_gamut(L: float, H: float) -> float:
	"""Binary search for maximum chroma at given L and H within sRGB gamut."""
	low, high = 0.0, 0.4

	for _ in range(50):
		mid = (low + high) / 2
		if is_in_srgb_gamut(L, mid, H):
			low = mid
		else:
			high = mid

	return low


# =============================================================================
# Palette Generation
# =============================================================================

def format_oklch(oklch: tuple[float, float, float]) -> str:
	"""Format OKLCH tuple as CSS string."""
	L, C, H = oklch
	H_deg = (H * 180 / math.pi) % 360
	return f"oklch({L:.3f} {C:.3f} {H_deg:.1f})"


def generate_palette(hex_color: str, is_neutral: bool = False):
	"""Generate a 25-color palette from a reference color."""
	rgb = hex_to_rgb(hex_color)
	L_ref, C_ref, H_ref = rgb_to_oklch(rgb)

	center_lum = math.sqrt(1.05 * 0.05) - 0.05

	labels = [0, 25, 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500,
			  550, 600, 650, 700, 750, 800, 850, 900, 925, 950, 975, 1000]

	colors = []

	for i, label in enumerate(labels):
		if i == 0:
			oklch = (1.0, 0.0, 0.0)
			rgb_out = (255, 255, 255)
			hex_out = "#FFFFFF"
			actual_lum = 1.0
		elif i == len(labels) - 1:
			oklch = (0.0, 0.0, 0.0)
			rgb_out = (0, 0, 0)
			hex_out = "#000000"
			actual_lum = 0.0
		else:
			position = label / 1000.0

			if position <= 0.5:
				t = position / 0.5
				log_white = math.log(1.0 + 0.05)
				log_center = math.log(center_lum + 0.05)
				log_lum = log_white + t * (log_center - log_white)
			else:
				t = (position - 0.5) / 0.5
				log_center = math.log(center_lum + 0.05)
				log_black = math.log(0.0 + 0.05)
				log_lum = log_center + t * (log_black - log_center)

			target_lum = math.exp(log_lum) - 0.05
			target_lum = max(0.0001, min(0.9999, target_lum))

			L_min, L_max = 0.0, 1.0
			best_L = 0.5
			best_C = C_ref
			best_diff = float('inf')

			for _ in range(50):
				L_mid = (L_min + L_max) / 2

				if is_neutral:
					if L_mid > L_ref:
						distance_factor = (L_mid - L_ref) / (1.0 - L_ref)
						chroma_factor = 1.0 - distance_factor * 0.95
					elif L_mid < L_ref:
						distance_factor = (L_ref - L_mid) / L_ref
						chroma_factor = 1.0 - (distance_factor ** 0.7) * 1.0
					else:
						chroma_factor = 1.0
				else:
					if L_mid > L_ref:
						distance_factor = (L_mid - L_ref) / (1.0 - L_ref)
					else:
						distance_factor = (L_ref - L_mid) / L_ref
					chroma_factor = 1.0 - distance_factor * 0.95

				C_target = C_ref * chroma_factor
				C_max_gamut = find_max_chroma_in_gamut(L_mid, H_ref)
				C_use = min(C_target, C_max_gamut)

				try:
					test_rgb = oklch_to_rgb(L_mid, C_use, H_ref)
					test_lum = relative_luminance(test_rgb)
					diff = abs(test_lum - target_lum)

					if diff < best_diff:
						best_diff = diff
						best_L = L_mid
						best_C = C_use

					if test_lum < target_lum:
						L_min = L_mid
					else:
						L_max = L_mid
				except Exception:
					L_max = L_mid

			if is_neutral:
				if best_L > L_ref:
					distance_factor = (best_L - L_ref) / (1.0 - L_ref)
					chroma_factor = 1.0 - distance_factor * 0.95
				elif best_L < L_ref:
					distance_factor = (L_ref - best_L) / L_ref
					chroma_factor = 1.0 - (distance_factor ** 0.7) * 1.0
				else:
					chroma_factor = 1.0
			else:
				if best_L > L_ref:
					distance_factor = (best_L - L_ref) / (1.0 - L_ref)
				else:
					distance_factor = (L_ref - best_L) / L_ref
				chroma_factor = 1.0 - distance_factor * 0.95

			C_final = min(C_ref * chroma_factor, find_max_chroma_in_gamut(best_L, H_ref))

			oklch = (best_L, C_final, H_ref)
			rgb_out = oklch_to_rgb(best_L, C_final, H_ref)
			hex_out = rgb_to_hex(rgb_out)
			actual_lum = relative_luminance(rgb_out)

		colors.append((label, hex_out, oklch, actual_lum))

	return colors, L_ref, C_ref, H_ref


def print_css_variables(colors: list, color_name: str):
	"""Print CSS custom properties for the palette."""
	H_deg = (colors[12][2][2] * 180 / math.pi) % 360
	print(f"\t/* ### {color_name.capitalize()} - {H_deg:.1f}° */")
	print()

	for label, hex_color, oklch, _ in colors:
		light_oklch_str = format_oklch(oklch)

		dark_label = 1000 - label
		dark_oklch_str = None
		dark_hex = None

		for dl, dh, doklch, _ in colors:
			if dl == dark_label:
				dark_oklch_str = format_oklch(doklch)
				dark_hex = dh
				break

		if dark_oklch_str:
			print(f"\t--primitives-color-{color_name}-{label}: "
				  f"light-dark({light_oklch_str}, {dark_oklch_str}); "
				  f"/* light: {hex_color} | dark: {dark_hex} */")


def main():
	parser = argparse.ArgumentParser(
		description='Generate OKLCH color palettes with equal perceptual contrast.'
	)
	parser.add_argument('hex_color', help='Reference color in HEX format (e.g., "#154273")')
	parser.add_argument('name', help='Name for the color palette (e.g., "lintblauw")')
	parser.add_argument('--neutral', action='store_true',
						help='Apply aggressive chroma reduction for darker colors')

	args = parser.parse_args()

	colors, _, _, _ = generate_palette(args.hex_color, args.neutral)
	print_css_variables(colors, args.name)


if __name__ == "__main__":
	main()
