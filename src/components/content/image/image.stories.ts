import { html, nothing } from 'lit';
import './image.ts';
import './lqip-encoder.ts';

// Lokale voorbeeldafbeelding (public/sample-images/), zodat de stories niet
// afhankelijk zijn van een externe host en consumers van offline Storybook-builds.
// Foto: Bart van de Biezen — De Pier van Scheveningen bij avondlicht.
const SAMPLE_SRC = '/sample-images/scheveningen-pier-1200.jpg';
const SAMPLE_ALT = 'De Pier van Scheveningen bij avondlicht';

const SAMPLE_SRCSET =
	'/sample-images/scheveningen-pier-480.jpg 480w, ' +
	'/sample-images/scheveningen-pier-960.jpg 960w, ' +
	'/sample-images/scheveningen-pier-1600.jpg 1600w';

/** LQIP CSV string berekend uit de bron (zeven 0-255 Oklab bytes). Regenereer
 *  via de "LQIP encoder tool" story als je de afbeelding vervangt. */
const SAMPLE_LQIP = '98,154,162,99,99,99,100';

/**
 * Een gestylede wrapper rond `<img>` met de design system tokens voor radius,
 * achtergrond en caption. Reserveert ruimte via `aspect-ratio` om layout-shift
 * te voorkomen tijdens het laden. Voor avatars: `shape="circle"` met
 * `aspect-ratio="1/1"`.
 *
 * Slot je eigen `<img>` of `<picture>` (bv. met art-direction sources) in de
 * default slot om de interne fallback te overschrijven.
 */
export default {
	title: 'Components/Content/Image',
	component: 'nldd-image',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/image/image.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	args: {
		src: SAMPLE_SRC,
		alt: SAMPLE_ALT,
		width: 'full',
		aspectRatio: '16/9',
		objectFit: 'cover',
		objectPosition: 'center',
		shape: 'rounded',
		srcset: '',
		sizes: '',
		lqip: '',
		caption: '',
		credit: '',
		decorative: false,
	},
	argTypes: {
		src: {
			control: 'text',
			description: 'Image URL',
		},
		alt: {
			control: 'text',
			description: 'Alt-tekst. Verplicht tenzij `decorative` is gezet.',
		},
		width: {
			control: 'select',
			options: ['full', 160, 240, 320, 480, 640],
			description: 'Display-breedte. `full` vult de parent, een numerieke waarde zet max-width + img-hint.',
			table: { defaultValue: { summary: 'full' } },
		},
		aspectRatio: {
			name: 'aspect-ratio',
			control: 'select',
			options: ['(geen)', '21/9', '16/9', '3/2', '4/3', '1/1', '3/4', '2/3'],
			mapping: { '(geen)': '' },
			description: 'Reserveert ruimte tijdens laden om layout-shift te voorkomen',
			table: { defaultValue: { summary: '(geen)' } },
		},
		objectFit: {
			name: 'object-fit',
			control: 'select',
			options: ['cover', 'contain', 'fill', 'scale-down', 'none'],
			description: 'Hoe de afbeelding past binnen het kader',
			table: { defaultValue: { summary: 'cover' } },
		},
		objectPosition: {
			name: 'object-position',
			control: 'select',
			options: ['center', 'top', 'bottom', 'left', 'right'],
			description: 'Welk deel zichtbaar blijft bij `object-fit: cover`',
			table: { defaultValue: { summary: 'center' } },
		},
		shape: {
			control: 'select',
			options: ['square', 'rounded', 'circle'],
			description: 'Hoekvorm',
			table: { defaultValue: { summary: 'rounded' } },
		},
		srcset: {
			control: 'text',
			description: `Responsive bron-set met varianten per pixel-breedte. Voorbeeld: ${SAMPLE_SRCSET}`,
		},
		sizes: {
			control: 'text',
			description: 'Sizes hint voor srcset — bv. `100vw` of `(max-width: 640px) 100vw, 50vw`',
		},
		lqip: {
			control: 'text',
			description: `CSS-only multi-color LQIP. CSV-string van 7 bytes (base + 6 cellen, 3×2 raster) — elke byte is een 8-bit Oklab triplet. Voorbeeld: \`${SAMPLE_LQIP}\`. Genereer eigen waarden via de "LQIP encoder tool" story.`,
		},
		caption: {
			control: 'text',
			description: 'Caption tekst onder de afbeelding',
		},
		credit: {
			control: 'text',
			description: 'Kleinere credit/attributie naast de caption',
		},
		decorative: {
			control: 'boolean',
			description: 'Decoratieve afbeelding: alt wordt leeg en aria-hidden gezet',
			table: { defaultValue: { summary: false } },
		},
	},
};

const Template = ({
	src,
	alt,
	width,
	aspectRatio,
	objectFit,
	objectPosition,
	shape,
	srcset,
	sizes,
	lqip,
	caption,
	credit,
	decorative,
}: Record<string, unknown>) => html`
	<nldd-image
		src=${src as string}
		alt=${alt as string}
		width=${width as string}
		aspect-ratio=${aspectRatio as string}
		object-fit=${objectFit as string}
		object-position=${objectPosition as string}
		shape=${shape as string}
		srcset=${srcset as string}
		sizes=${sizes as string}
		lqip=${(lqip as string) || nothing}
		caption=${caption as string}
		credit=${credit as string}
		?decorative=${decorative}
	></nldd-image>
`;

export const Default = {
	render: Template,
};

export const WithCaption = {
	name: 'With caption',
	render: Template,
	args: {
		caption: 'De Pier van Scheveningen vlak na zonsondergang.',
		credit: 'Foto: Bart van de Biezen',
	},
};

export const Shapes = {
	render: () => html`
		<div style="display: flex; gap: 24px; align-items: flex-end;">
			<div style="width: 200px;">
				<nldd-image
					src=${SAMPLE_SRC}
					alt=${SAMPLE_ALT}
					aspect-ratio="4/3"
					shape="square"
					caption="square"
				></nldd-image>
			</div>
			<div style="width: 200px;">
				<nldd-image
					src=${SAMPLE_SRC}
					alt=${SAMPLE_ALT}
					aspect-ratio="4/3"
					shape="rounded"
					caption="rounded"
				></nldd-image>
			</div>
			<div style="width: 120px;">
				<nldd-image
					src=${SAMPLE_SRC}
					alt=${SAMPLE_ALT}
					aspect-ratio="1/1"
					shape="circle"
					caption="circle"
				></nldd-image>
			</div>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const AspectRatios = {
	name: 'Aspect ratios',
	render: () => html`
		<div style="display: flex; gap: 16px; flex-wrap: wrap;">
			${['21/9', '16/9', '3/2', '4/3', '1/1', '3/4', '2/3'].map(ratio => html`
				<div style="width: 240px;">
					<nldd-image
						src=${SAMPLE_SRC}
						alt=${SAMPLE_ALT}
						aspect-ratio=${ratio}
						caption=${ratio}
					></nldd-image>
				</div>
			`)}
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const ObjectFit = {
	name: 'Object-fit comparison',
	render: () => html`
		<div style="display: flex; gap: 16px; flex-wrap: wrap;">
			${['cover', 'contain', 'fill', 'scale-down', 'none'].map(fit => html`
				<div style="width: 180px;">
					<nldd-image
						src=${SAMPLE_SRC}
						alt=${SAMPLE_ALT}
						aspect-ratio="1/1"
						object-fit=${fit}
						caption=${fit}
					></nldd-image>
				</div>
			`)}
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const Decorative = {
	name: 'Decorative (background-style)',
	render: () => html`
		<div style="max-width: 480px;">
			<nldd-image
				src=${SAMPLE_SRC}
				aspect-ratio="16/9"
				decorative
			></nldd-image>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const SlottedImage = {
	name: 'Slotted img (consumer-provided)',
	render: () => html`
		<div style="max-width: 480px;">
			<nldd-image aspect-ratio="16/9" shape="rounded">
				<img
					src=${SAMPLE_SRC}
					alt=${SAMPLE_ALT}
					loading="lazy"
					decoding="async"
				>
			</nldd-image>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * CSS-only multi-color Low Quality Image Placeholder — geïnspireerd op
 * https://leanrada.com/notes/css-only-lqip/, uitgebreid met per-cel kleur
 * (Lean's originele encoding heeft alleen grijswaarde-cellen rondom één
 * dominante hue). Onze versie encodeert 7 bytes: een base color + 6 per-cel
 * Oklab kleuren in een 3×2 raster. Zichtbaar tot het echte beeld is geladen.
 *
 * Links: alleen de placeholder (geen src) zodat je het LQIP gradient los ziet.
 * Rechts: met src — placeholder is even zichtbaar en wordt overlapt zodra de
 * afbeelding geladen is.
 */
export const LQIPPlaceholder = {
	name: 'LQIP placeholder',
	render: () => html`
		<div style="display: flex; gap: 24px; flex-wrap: wrap;">
			<div style="width: 320px;">
				<nldd-image
					alt="Placeholder zonder image"
					aspect-ratio="16/9"
					lqip=${SAMPLE_LQIP}
					caption="Alleen LQIP (geen src)"
				></nldd-image>
			</div>
			<div style="width: 320px;">
				<nldd-image
					src=${SAMPLE_SRC}
					alt=${SAMPLE_ALT}
					aspect-ratio="16/9"
					lqip=${SAMPLE_LQIP}
					caption="LQIP + image"
				></nldd-image>
			</div>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * Wanneer een image niet geladen kan worden (404, netwerk-fout, decode-fout)
 * toont het component een fallback: een icoon + de alt-tekst in een kleine
 * neutrale container, met de neutrale media-achtergrond erachter. Een
 * eventueel gezet `lqip` gradient wordt verborgen in error state — de
 * placeholder dient alleen tijdens het laden, niet ná een mislukking.
 *
 * Een decoratieve afbeelding (`decorative`) toont alleen het icoon, geen tekst.
 */
export const ErrorState = {
	name: 'Error state',
	render: () => html`
		<div style="display: flex; gap: 24px; flex-wrap: wrap;">
			<div style="width: 320px;">
				<nldd-image
					src="/this-does-not-exist.jpg"
					alt="De Pier van Scheveningen bij avondlicht"
					aspect-ratio="16/9"
					caption="Met alt-tekst"
				></nldd-image>
			</div>
			<div style="width: 320px;">
				<nldd-image
					src="/this-does-not-exist.jpg"
					aspect-ratio="16/9"
					decorative
					caption="Decoratief (alleen icoon)"
				></nldd-image>
			</div>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * Encodeer je eigen afbeelding tot een LQIP integer. Volledig client-side —
 * niets wordt geüpload. De berekende waarde plak je in het `lqip` attribuut
 * van `nldd-image`.
 *
 * Mocht de [originele tool van Lean Rada](https://leanrada.com/notes/css-only-lqip/)
 * ooit offline gaan, dan kun je je placeholders nog steeds genereren met dit
 * lokale alternatief.
 */
export const LQIPEncoderTool = {
	name: 'LQIP encoder tool',
	render: () => html`<nldd-lqip-encoder></nldd-lqip-encoder>`,
	parameters: { controls: { disable: true } },
};
